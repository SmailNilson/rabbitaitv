'use client';

import { useCallback, useEffect, useState, type FormEvent } from 'react';
import PlaylistForm from '@/components/fourklive/PlaylistForm';
import s from '@/components/fourklive/fourklive.module.css';
import {
  ApiError,
  clientApi,
  isValidCode,
  normalizeCode,
  prettyCode,
  whatsappFor,
  type ClientDevice,
  type Playlist,
  type PlaylistInput,
} from '@/lib/fourklive/api';
import { fmtDateTime, licenseLabel, useLang, type Strings } from '@/lib/fourklive/i18n';

/* ──────────────────────────────────────────────────────────────────────────
   /activate (v2) — the TV owner's page.

   The TV shows a fixed code + 6-digit PIN and a QR that opens this page with
   ?code=… filled in. After code + PIN, the owner manages the TV's playlists:
   add / edit / delete. The TV polls every few seconds and connects on its own.
   The 2 h session token lives in sessionStorage (this tab only).
   ────────────────────────────────────────────────────────────────────────── */

const SESSION_KEY = '4klive-session';

interface Session {
  token: string;
  code: string;
  expiresAt: number;
}

type Status = { msg: string; kind: 'error' | 'pending' | 'success' } | null;

function readSession(): Session | null {
  try {
    const raw = sessionStorage.getItem(SESSION_KEY);
    const v = raw ? (JSON.parse(raw) as Session) : null;
    return v && v.expiresAt > Date.now() + 60_000 ? v : null;
  } catch {
    return null;
  }
}

function writeSession(v: Session | null): void {
  try {
    if (v) sessionStorage.setItem(SESSION_KEY, JSON.stringify(v));
    else sessionStorage.removeItem(SESSION_KEY);
  } catch {
    /* private mode — the session just won't survive a reload */
  }
}

/** API error → a sentence for the owner. */
function errorText(t: Strings, e: unknown): string {
  if (!(e instanceof ApiError)) return t.common.network;
  if (e.status === 0) return t.common.network;
  if (e.code === 'locked' || e.status === 429) return t.activate.errLocked;
  if (e.code === 'blocked') return t.activate.errBlocked;
  if (e.code === 'bad_credentials') return t.activate.errFormat;
  if (e.code === 'too_many') return t.activate.tooMany;
  if (e.status === 401) return t.activate.errWrong;
  return t.common.generic(e.status);
}

export default function ActivateV2() {
  const { lang, t, setLang } = useLang();
  const a = t.activate;

  const [code, setCode] = useState('');
  const [pin, setPin] = useState('');
  const [session, setSession] = useState<Session | null>(null);
  const [device, setDevice] = useState<ClientDevice | null>(null);
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState<Status>(null);
  const [adding, setAdding] = useState(false);
  const [editing, setEditing] = useState<Playlist | null>(null);

  const signOut = useCallback((msg?: string) => {
    writeSession(null);
    setSession(null);
    setDevice(null);
    setEditing(null);
    setAdding(false);
    setPin('');
    setStatus(msg ? { msg, kind: 'error' } : null);
  }, []);

  const load = useCallback(
    async (sess: Session) => {
      try {
        const d = await clientApi.device(sess.token);
        setDevice(d);
        if (d.playlists.length === 0) setAdding(true);
      } catch (e) {
        if (e instanceof ApiError && e.status === 401) signOut(t.activate.errSession);
        else setStatus({ msg: errorText(t, e), kind: 'error' });
      }
    },
    [signOut, t],
  );

  // Prefill the code from the TV's QR (?code=…), then drop it from the address bar.
  // A session opened earlier in this tab is resumed.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const raw = params.get('code');
    if (raw) {
      const c = normalizeCode(raw);
      if (isValidCode(c)) setCode(prettyCode(c));
      params.delete('code');
      const rest = params.toString();
      window.history.replaceState(null, '', window.location.pathname + (rest ? `?${rest}` : ''));
    }
    const saved = readSession();
    if (saved && (!raw || normalizeCode(raw) === normalizeCode(saved.code))) {
      setSession(saved);
      void load(saved);
    }
    // Run once on mount; `load` only needs the strings for error text.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function signIn(event: FormEvent) {
    event.preventDefault();
    const c = normalizeCode(code);
    if (!isValidCode(c) || !/^\d{6}$/.test(pin)) return setStatus({ msg: a.errFormat, kind: 'error' });
    setBusy(true);
    setStatus({ msg: a.checking, kind: 'pending' });
    try {
      const res = await clientApi.signIn(c, pin);
      const sess = { token: res.token, code: res.code, expiresAt: res.expiresAt };
      writeSession(sess);
      setSession(sess);
      setStatus(null);
      await load(sess);
    } catch (e) {
      setStatus({ msg: errorText(t, e), kind: 'error' });
    } finally {
      setBusy(false);
    }
  }

  /** Runs a playlist change, then reloads the list. */
  async function mutate(fn: (token: string) => Promise<unknown>, done: string) {
    if (!session) return;
    try {
      await fn(session.token);
      setAdding(false);
      setEditing(null);
      setStatus({ msg: done, kind: 'success' });
      await load(session);
    } catch (e) {
      if (e instanceof ApiError && e.status === 401) signOut(a.errSession);
      else setStatus({ msg: errorText(t, e), kind: 'error' });
    }
  }

  const header = (
    <div className={s.top}>
      <div className={s.brand}><span className={s.brand4k}>4K</span>live</div>
      <button type="button" className={s.langBtn} onClick={() => { setStatus(null); setLang(lang === 'fr' ? 'en' : 'fr'); }}>{t.otherLanguage}</button>
    </div>
  );

  const statusBox = status && (
    <p className={`${s.status} ${status.kind === 'error' ? s.statusError : status.kind === 'success' ? s.statusSuccess : s.statusPending}`} role="status">
      {status.msg}
    </p>
  );

  /* ------------------------------ sign in ------------------------------ */
  if (!session) {
    return (
      <div className={s.page}>
        <div className={s.card}>
          {header}
          <h1 className={s.h1}>{a.title}</h1>
          <p className={s.sub}>{a.sub}</p>
          <form className={s.form} onSubmit={signIn} noValidate>
            <label className={s.field}>
              <span>{a.code}</span>
              <input className={`${s.input} ${s.mono}`} value={code} placeholder="XXXX-XXXX" maxLength={9}
                onChange={(e) => {
                  const c = normalizeCode(e.target.value).slice(0, 8);
                  setCode(c.length > 4 ? `${c.slice(0, 4)}-${c.slice(4)}` : c);
                }}
                autoComplete="off" autoCapitalize="characters" autoCorrect="off" spellCheck={false} />
            </label>
            <label className={s.field}>
              <span>{a.pin}</span>
              <input className={`${s.input} ${s.pin}`} value={pin} placeholder="000000" maxLength={6}
                onChange={(e) => setPin(e.target.value.replace(/\D/g, '').slice(0, 6))}
                inputMode="numeric" autoComplete="off" />
            </label>
            <button type="submit" className={s.btn} disabled={busy}>{busy ? a.checking : a.continue}</button>
            {statusBox}
          </form>
          <Privacy text={a.privacy} />
        </div>
      </div>
    );
  }

  /* ------------------------------ dashboard ------------------------------ */
  const lic = device?.license ?? null;
  const licensed = lic && lic.status === 'active';
  const badgeClass = !lic || lic.status === 'expired' ? s.badgeBad : lic.status === 'trial' ? s.badgeTrial : s.badgeOk;

  return (
    <div className={s.page}>
      <div className={s.card}>
        {header}
        <h1 className={s.h1}>{a.yourTv}</h1>

        <div className={s.tv}>
          <div>
            <div className={s.tvCode}>{session.code}</div>
            {device && (
              <div className={s.meta}>
                {t.platform(device.platform)} · {a.lastSeen(fmtDateTime(t, device.lastSeenAt))}
              </div>
            )}
          </div>
          {device && <span className={`${s.badge} ${badgeClass}`}>{licenseLabel(t, lic)}</span>}
        </div>

        {device && !licensed && (
          <p style={{ margin: '0.8rem 0 0' }}>
            <a className={`${s.btn} ${s.btnGold} ${s.btnSmall}`} href={whatsappFor(a.whatsappMessage(session.code))} target="_blank" rel="noopener noreferrer">
              {a.buy}
            </a>
          </p>
        )}

        <h2 className={s.h2}>{a.playlists}</h2>
        {device && device.playlists.length === 0 && !adding && <p className={s.empty}>{a.empty}</p>}
        {device && device.playlists.length > 0 && (
          <ul className={s.list}>
            {device.playlists.map((p) =>
              editing?.id === p.id ? (
                <li key={p.id} className={s.formBox}>
                  <PlaylistForm t={t} initial={p} submitLabel={t.common.save}
                    onSubmit={(input: PlaylistInput) => mutate((tok) => clientApi.updatePlaylist(tok, p.id, input), a.saved)}
                    onCancel={() => setEditing(null)} />
                </li>
              ) : (
                <li key={p.id} className={s.item}>
                  <div className={s.itemMain}>
                    <div className={s.itemName}>{p.name}</div>
                    <div className={s.itemMeta}>
                      {p.type === 'xtream' ? `${t.form.xtream} · ${p.host}:${p.port} · ${p.username}` : `${t.form.m3u} · ${shortUrl(p.url)}`}
                    </div>
                  </div>
                  <div className={s.actions}>
                    <button type="button" className={`${s.btn} ${s.btnGhost} ${s.btnSmall}`} onClick={() => { setAdding(false); setEditing(p); setStatus(null); }}>
                      {t.common.edit}
                    </button>
                    <button type="button" className={`${s.btn} ${s.btnDanger} ${s.btnSmall}`}
                      onClick={() => {
                        if (window.confirm(a.confirmDelete(p.name))) void mutate((tok) => clientApi.deletePlaylist(tok, p.id), a.deleted);
                      }}>
                      {t.common.delete}
                    </button>
                  </div>
                </li>
              ),
            )}
          </ul>
        )}

        {adding ? (
          <div className={s.formBox}>
            <PlaylistForm t={t} submitLabel={a.add}
              onSubmit={(input) => mutate((tok) => clientApi.addPlaylist(tok, input), a.saved)}
              onCancel={device && device.playlists.length > 0 ? () => setAdding(false) : undefined} />
          </div>
        ) : (
          device && (
            <p style={{ margin: '0.9rem 0 0' }}>
              <button type="button" className={`${s.btn} ${s.btnGhost}`} onClick={() => { setEditing(null); setAdding(true); setStatus(null); }}>
                + {a.add}
              </button>
            </p>
          )
        )}

        {statusBox && <div style={{ marginTop: '1rem' }}>{statusBox}</div>}

        <div className={s.actions} style={{ marginTop: '1.4rem' }}>
          <button type="button" className={`${s.btn} ${s.btnGhost} ${s.btnSmall}`} onClick={() => { setStatus(null); void load(session); }}>
            {t.common.refresh}
          </button>
          <button type="button" className={`${s.btn} ${s.btnGhost} ${s.btnSmall}`} onClick={() => signOut()}>
            {t.common.signOut}
          </button>
        </div>

        <Privacy text={a.privacy} />
      </div>
    </div>
  );
}

/** "provider.com/get.php…" — enough to recognise a link without showing its credentials. */
function shortUrl(url?: string): string {
  if (!url) return '';
  try {
    const u = new URL(url);
    return `${u.host}${u.pathname}`;
  } catch {
    return url.slice(0, 40);
  }
}

function Privacy({ text }: { text: string }) {
  return (
    <p className={s.privacy}>
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
      {text}
    </p>
  );
}
