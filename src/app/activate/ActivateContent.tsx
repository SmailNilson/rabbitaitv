'use client';

import { useEffect, useState, type FormEvent } from 'react';
import {
  deriveAuthToken,
  deriveLookupId,
  encryptConfig,
  normalizeDeviceKey,
  type M3uConfig,
  type ProvisionConfig,
  type XtreamConfig,
} from './provisioningCrypto';

/* ──────────────────────────────────────────────────────────────────────────
   4Klive web-activation portal (/activate).

   The TV shows a Device Key + 6-digit PIN (and a QR that opens this page with
   ?key=<deviceKey> prefilled). Here the user adds their own playlist; we derive
   the lookup id + auth token and encrypt the config IN THE BROWSER (Web Crypto),
   then POST only the opaque {v,iv,ct} envelope to the provisioning Worker. The
   TV is polling that record and pulls + decrypts it automatically.

   The backend is zero-knowledge: it never sees the Device Key, the PIN, or the
   plaintext config. Crypto + wire format mirror `provisioningCrypto.ts`, which is
   byte-identical to every TV client — do not diverge.
   ────────────────────────────────────────────────────────────────────────── */

// The live provisioning Worker (same origin the TV apps check in against). A
// `?api=` override is honoured ONLY for same-origin or localhost (a dev backend);
// an arbitrary cross-origin override is ignored, so a crafted link can't redirect
// the encrypted envelope + authToken to an attacker who could brute-force the PIN.
const DEFAULT_API_BASE = 'https://4klive-provision.contact-rabbitaitv.workers.dev';

// A lowercase UUIDv4 — the exact shape the TV apps generate as the Device Key.
const UUID_V4 = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/;

function isAllowedApiOverride(value: string): boolean {
  try {
    const u = new URL(value, location.href);
    if (u.protocol !== 'http:' && u.protocol !== 'https:') return false;
    if (u.origin === location.origin) return true;
    return u.hostname === 'localhost' || u.hostname === '127.0.0.1' || u.hostname === '[::1]';
  } catch {
    return false;
  }
}

function resolveApiBase(): string {
  const override = new URLSearchParams(location.search).get('api');
  const base = override && isAllowedApiOverride(override) ? override : DEFAULT_API_BASE;
  return base.replace(/\/+$/, '');
}

type Mode = 'xtream' | 'm3u';
type StatusKind = 'error' | 'pending' | 'success' | '';

export default function ActivateContent() {
  const [deviceKey, setDeviceKey] = useState('');
  const [pin, setPin] = useState('');
  const [mode, setMode] = useState<Mode>('xtream');

  // Xtream fields
  const [host, setHost] = useState('');
  const [port, setPort] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [useHttps, setUseHttps] = useState(false);

  // M3U fields
  const [m3uUrl, setM3uUrl] = useState('');
  const [epgUrl, setEpgUrl] = useState('');

  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState<{ msg: string; kind: StatusKind }>({ msg: '', kind: '' });

  // Prefill the Device Key from the TV QR / deep-link (?key=<uuid>), then scrub it
  // from the URL + history so the device identity isn't retained or re-shared.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const raw = params.get('key');
    if (raw) {
      const normalized = normalizeDeviceKey(raw);
      if (UUID_V4.test(normalized)) setDeviceKey(normalized);
      params.delete('key');
      const clean = window.location.pathname + (params.toString() ? '?' + params.toString() : '');
      window.history.replaceState(null, '', clean);
    }
  }, []);

  /** Builds + validates the playlist config from the active tab (mirrors portal/app.js). */
  function buildConfig(): { config: ProvisionConfig } | { error: string } {
    if (mode === 'xtream') {
      const h = host.trim();
      const p = Number.parseInt(port.trim(), 10);
      const u = username.trim();
      if (!h || /\s/.test(h)) return { error: 'Enter the Xtream host (no spaces).' };
      if (!Number.isInteger(p) || p < 1 || p > 65535) return { error: 'Enter a valid port (1–65535).' };
      if (!u) return { error: 'Enter your username.' };
      if (!password) return { error: 'Enter your password.' };
      const config: XtreamConfig = { type: 'xtream', host: h, port: p, username: u, password };
      if (useHttps) config.useHttps = true;
      return { config };
    }
    const url = m3uUrl.trim();
    if (!/^https?:\/\//i.test(url)) return { error: 'Enter a valid M3U URL (http:// or https://).' };
    const config: M3uConfig = { type: 'm3u', url };
    const epg = epgUrl.trim();
    if (epg) {
      if (!/^https?:\/\//i.test(epg)) return { error: 'EPG URL must start with http:// or https://.' };
      config.epgUrl = epg;
    }
    return { config };
  }

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    const key = normalizeDeviceKey(deviceKey);
    const cleanPin = pin.trim();

    if (!UUID_V4.test(key)) return setStatus({ msg: 'Enter the full Device Key shown on your TV.', kind: 'error' });
    if (!/^\d{6}$/.test(cleanPin)) return setStatus({ msg: 'Enter the 6-digit PIN shown on your TV.', kind: 'error' });

    const built = buildConfig();
    if ('error' in built) return setStatus({ msg: built.error, kind: 'error' });

    setBusy(true);
    setStatus({ msg: 'Encrypting and saving…', kind: 'pending' });
    try {
      const [lookupId, authToken, payload] = await Promise.all([
        deriveLookupId(key),
        deriveAuthToken(key, cleanPin),
        encryptConfig(key, cleanPin, built.config),
      ]);
      const res = await fetch(`${resolveApiBase()}/v1/provision/${lookupId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ authToken, payload }),
      });
      if (res.ok) {
        setStatus({
          msg: 'Saved! Your TV will connect automatically — open 4Klive on the TV if it hasn’t already.',
          kind: 'success',
        });
      } else if (res.status === 403) {
        setStatus({ msg: 'This Device Key is already linked with a different PIN. Double-check the PIN on your TV.', kind: 'error' });
      } else if (res.status === 429) {
        setStatus({ msg: 'Too many attempts — wait a moment and try again.', kind: 'error' });
      } else {
        const data = (await res.json().catch(() => null)) as { error?: { code?: string } } | null;
        const code = data?.error?.code ? ': ' + data.error.code : '';
        setStatus({ msg: `Couldn’t save (${res.status}${code}). Check the details and try again.`, kind: 'error' });
      }
    } catch {
      setStatus({ msg: 'Network error — check your connection and try again.', kind: 'error' });
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="ap">
      <div className="ap-card">
        <div className="ap-brand"><span className="ap-4k">4K</span>live</div>
        <h1>Activate your TV</h1>
        <p className="ap-sub">
          Enter the <strong>Device Key</strong> and <strong>PIN</strong> shown on your TV, add your playlist,
          and save. Your TV connects automatically — keep the activation screen open.
        </p>

        <form onSubmit={onSubmit} noValidate>
          <label className="ap-field">
            <span>Device Key</span>
            <input
              value={deviceKey}
              onChange={(e) => setDeviceKey(e.target.value)}
              placeholder="xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
              autoComplete="off" autoCapitalize="none" autoCorrect="off" spellCheck={false}
              inputMode="text"
            />
          </label>

          <label className="ap-field ap-pin">
            <span>Pairing PIN</span>
            <input
              value={pin}
              onChange={(e) => setPin(e.target.value.replace(/\D/g, '').slice(0, 6))}
              placeholder="000000"
              inputMode="numeric" autoComplete="off" maxLength={6}
            />
          </label>

          <div className="ap-tabs" role="tablist">
            <button type="button" role="tab" aria-selected={mode === 'xtream'}
              className={mode === 'xtream' ? 'is-active' : ''} onClick={() => setMode('xtream')}>
              Xtream Codes
            </button>
            <button type="button" role="tab" aria-selected={mode === 'm3u'}
              className={mode === 'm3u' ? 'is-active' : ''} onClick={() => setMode('m3u')}>
              M3U URL
            </button>
          </div>

          {mode === 'xtream' ? (
            <div className="ap-panel">
              <div className="ap-row">
                <label className="ap-field ap-grow">
                  <span>Host</span>
                  <input value={host} onChange={(e) => setHost(e.target.value)}
                    placeholder="example.provider.com" autoComplete="off" autoCapitalize="none"
                    autoCorrect="off" spellCheck={false} inputMode="url" />
                </label>
                <label className="ap-field ap-port">
                  <span>Port</span>
                  <input value={port} onChange={(e) => setPort(e.target.value.replace(/\D/g, '').slice(0, 5))}
                    placeholder="80" inputMode="numeric" autoComplete="off" />
                </label>
              </div>
              <label className="ap-field">
                <span>Username</span>
                <input value={username} onChange={(e) => setUsername(e.target.value)}
                  autoComplete="off" autoCapitalize="none" autoCorrect="off" spellCheck={false} />
              </label>
              <label className="ap-field">
                <span>Password</span>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}
                  autoComplete="off" />
              </label>
              <label className="ap-check">
                <input type="checkbox" checked={useHttps} onChange={(e) => setUseHttps(e.target.checked)} />
                <span>My provider uses HTTPS</span>
              </label>
            </div>
          ) : (
            <div className="ap-panel">
              <label className="ap-field">
                <span>M3U URL</span>
                <input value={m3uUrl} onChange={(e) => setM3uUrl(e.target.value)}
                  placeholder="http://provider.com/get.php?username=…&type=m3u_plus"
                  autoComplete="off" autoCapitalize="none" autoCorrect="off" spellCheck={false} inputMode="url" />
              </label>
              <label className="ap-field">
                <span>EPG URL <em>(optional)</em></span>
                <input value={epgUrl} onChange={(e) => setEpgUrl(e.target.value)}
                  placeholder="http://provider.com/xmltv.php?username=…"
                  autoComplete="off" autoCapitalize="none" autoCorrect="off" spellCheck={false} inputMode="url" />
              </label>
            </div>
          )}

          <button type="submit" className="ap-submit" disabled={busy}>
            {busy ? 'Saving…' : 'Activate TV'}
          </button>

          {status.msg && <p className={`ap-status is-${status.kind}`} role="status">{status.msg}</p>}
        </form>

        <p className="ap-privacy">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
          Your details are encrypted in your browser before they’re sent. We never see your password or playlist.
        </p>
      </div>

      <style jsx>{`
        .ap {
          min-height: 100vh;
          display: flex;
          align-items: flex-start;
          justify-content: center;
          padding: clamp(1rem, 4vw, 3rem) 1rem 4rem;
          background:
            radial-gradient(1100px 520px at 50% -10%, var(--primary-soft), transparent 70%),
            var(--background);
        }
        .ap-card {
          width: 100%;
          max-width: 480px;
          background: var(--card);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          padding: clamp(1.4rem, 5vw, 2.2rem);
          box-shadow: 0 24px 60px rgba(0, 0, 0, 0.45);
        }
        .ap-brand {
          font-family: var(--font-heading);
          font-weight: 800;
          font-size: 1.35rem;
          letter-spacing: -0.02em;
          margin-bottom: 1rem;
        }
        .ap-4k { color: var(--primary); }
        h1 {
          font-family: var(--font-heading);
          font-size: clamp(1.5rem, 6vw, 1.9rem);
          font-weight: 800;
          letter-spacing: -0.02em;
          margin: 0 0 0.5rem;
        }
        .ap-sub {
          color: var(--text-muted);
          font-size: 0.95rem;
          line-height: 1.55;
          margin: 0 0 1.6rem;
        }
        .ap-sub strong { color: var(--text); font-weight: 600; }
        form { display: flex; flex-direction: column; gap: 0.95rem; }
        .ap-field { display: flex; flex-direction: column; gap: 0.4rem; }
        .ap-field > span {
          font-size: 0.8rem;
          font-weight: 600;
          color: var(--text-muted);
        }
        .ap-field > span em { color: var(--text-dim); font-style: normal; font-weight: 400; }
        input[type='text'], input[type='password'], .ap-field input {
          width: 100%;
          background: var(--background);
          border: 1px solid var(--border-strong);
          border-radius: var(--radius-sm);
          color: var(--text);
          font-size: 1rem;
          padding: 0.75rem 0.85rem;
          transition: border-color 0.15s ease, box-shadow 0.15s ease;
        }
        .ap-field input::placeholder { color: var(--text-dim); }
        .ap-field input:focus {
          outline: none;
          border-color: var(--primary);
          box-shadow: 0 0 0 3px var(--primary-soft);
        }
        .ap-pin input { font-size: 1.4rem; letter-spacing: 0.35em; font-variant-numeric: tabular-nums; }
        .ap-row { display: flex; gap: 0.7rem; }
        .ap-grow { flex: 1 1 auto; }
        .ap-port { width: 96px; flex: 0 0 auto; }
        .ap-tabs {
          display: flex;
          gap: 0.4rem;
          background: var(--background);
          border: 1px solid var(--border);
          border-radius: var(--radius-sm);
          padding: 0.3rem;
          margin-top: 0.2rem;
        }
        .ap-tabs button {
          flex: 1;
          background: transparent;
          border: 0;
          color: var(--text-muted);
          font-size: 0.9rem;
          font-weight: 600;
          padding: 0.55rem;
          border-radius: 8px;
          cursor: pointer;
          transition: background 0.15s ease, color 0.15s ease;
        }
        .ap-tabs button.is-active { background: var(--primary); color: #fff; }
        .ap-panel { display: flex; flex-direction: column; gap: 0.95rem; }
        .ap-check {
          display: flex;
          align-items: center;
          gap: 0.55rem;
          color: var(--text-muted);
          font-size: 0.9rem;
          cursor: pointer;
        }
        .ap-check input { width: 18px; height: 18px; accent-color: var(--primary); }
        .ap-submit {
          margin-top: 0.4rem;
          background: var(--primary);
          color: #fff;
          border: 0;
          border-radius: var(--radius-sm);
          font-size: 1.02rem;
          font-weight: 700;
          padding: 0.9rem;
          cursor: pointer;
          transition: background 0.15s ease, transform 0.05s ease;
        }
        .ap-submit:hover:not(:disabled) { background: var(--primary-hover); }
        .ap-submit:active:not(:disabled) { transform: translateY(1px); }
        .ap-submit:disabled { opacity: 0.65; cursor: default; }
        .ap-status {
          margin: 0.2rem 0 0;
          font-size: 0.9rem;
          line-height: 1.5;
          padding: 0.7rem 0.85rem;
          border-radius: var(--radius-sm);
        }
        .ap-status.is-error { background: var(--primary-soft); border: 1px solid var(--primary-border); color: #ffb3c0; }
        .ap-status.is-pending { background: var(--elevated); border: 1px solid var(--border); color: var(--text-muted); }
        .ap-status.is-success { background: var(--gold-soft); border: 1px solid rgba(232, 177, 76, 0.35); color: var(--gold); }
        .ap-privacy {
          display: flex;
          align-items: flex-start;
          gap: 0.5rem;
          margin: 1.5rem 0 0;
          color: var(--text-dim);
          font-size: 0.82rem;
          line-height: 1.5;
        }
        .ap-privacy svg { flex: 0 0 auto; margin-top: 0.15rem; color: var(--gold); }
      `}</style>
    </div>
  );
}
