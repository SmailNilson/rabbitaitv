'use client';

import { useState, type FormEvent } from 'react';
import type { Playlist, PlaylistInput } from '@/lib/fourklive/api';
import type { Strings } from '@/lib/fourklive/i18n';
import s from './fourklive.module.css';

/**
 * Add / edit one playlist (Xtream Codes or M3U link) — used by /activate and /admin.
 * Validation mirrors the Worker's. When editing, an empty password keeps the current one.
 */
export default function PlaylistForm({
  t,
  initial,
  submitLabel,
  onSubmit,
  onCancel,
}: {
  t: Strings;
  initial?: Playlist;
  submitLabel: string;
  onSubmit: (input: PlaylistInput) => Promise<void>;
  onCancel?: () => void;
}) {
  const f = t.form;
  const editing = !!initial;
  const [name, setName] = useState(initial?.name ?? '');
  const [mode, setMode] = useState<'xtream' | 'm3u'>(initial?.type ?? 'xtream');
  const [host, setHost] = useState(initial?.host ?? '');
  const [port, setPort] = useState(initial?.port ? String(initial.port) : '');
  const [username, setUsername] = useState(initial?.username ?? '');
  const [password, setPassword] = useState('');
  const [useHttps, setUseHttps] = useState(initial?.useHttps ?? false);
  const [url, setUrl] = useState(initial?.url ?? '');
  const [epgUrl, setEpgUrl] = useState(initial?.epgUrl ?? '');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  function build(): PlaylistInput | string {
    const n = name.trim() || f.namePlaceholder;
    if (mode === 'xtream') {
      const h = host.trim().replace(/^https?:\/\//i, '').replace(/\/+$/, '');
      const p = Number.parseInt(port.trim(), 10);
      if (!h || /[\s/]/.test(h)) return f.errHost;
      if (!Number.isInteger(p) || p < 1 || p > 65535) return f.errPort;
      if (!username.trim()) return f.errUsername;
      // Editing an Xtream playlist: an empty password keeps the saved one.
      if (!password && !(editing && initial?.type === 'xtream')) return f.errPassword;
      return { name: n, type: 'xtream', host: h, port: p, username: username.trim(), password, useHttps };
    }
    const u = url.trim();
    if (!/^https?:\/\/\S+$/i.test(u)) return f.errM3u;
    const e = epgUrl.trim();
    if (e && !/^https?:\/\/\S+$/i.test(e)) return f.errEpg;
    return { name: n, type: 'm3u', url: u, ...(e ? { epgUrl: e } : {}) };
  }

  async function submit(event: FormEvent) {
    event.preventDefault();
    const built = build();
    if (typeof built === 'string') return setError(built);
    setError('');
    setBusy(true);
    try {
      await onSubmit(built);
    } finally {
      setBusy(false);
    }
  }

  return (
    <form className={s.form} onSubmit={submit} noValidate>
      <label className={s.field}>
        <span>{f.name}</span>
        <input className={s.input} value={name} onChange={(e) => setName(e.target.value.slice(0, 40))} placeholder={f.namePlaceholder} autoComplete="off" />
      </label>

      <div className={s.tabs} role="tablist">
        {(['xtream', 'm3u'] as const).map((m) => (
          <button key={m} type="button" role="tab" aria-selected={mode === m}
            className={`${s.tab} ${mode === m ? s.tabOn : ''}`} onClick={() => setMode(m)}>
            {m === 'xtream' ? f.xtream : f.m3u}
          </button>
        ))}
      </div>

      {mode === 'xtream' ? (
        <>
          <div className={s.row}>
            <label className={`${s.field} ${s.grow}`}>
              <span>{f.host}</span>
              <input className={s.input} value={host} onChange={(e) => setHost(e.target.value)} placeholder="example.provider.com"
                autoComplete="off" autoCapitalize="none" autoCorrect="off" spellCheck={false} inputMode="url" />
            </label>
            <label className={`${s.field} ${s.port}`}>
              <span>{f.port}</span>
              <input className={s.input} value={port} onChange={(e) => setPort(e.target.value.replace(/\D/g, '').slice(0, 5))}
                placeholder="80" inputMode="numeric" autoComplete="off" />
            </label>
          </div>
          <label className={s.field}>
            <span>{f.username}</span>
            <input className={s.input} value={username} onChange={(e) => setUsername(e.target.value)}
              autoComplete="off" autoCapitalize="none" autoCorrect="off" spellCheck={false} />
          </label>
          <label className={s.field}>
            <span>{f.password}</span>
            <input className={s.input} type="password" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="new-password" />
            {editing && initial?.type === 'xtream' && <em className={s.hint}>{f.passwordKeep}</em>}
          </label>
          <label className={s.check}>
            <input type="checkbox" checked={useHttps} onChange={(e) => setUseHttps(e.target.checked)} />
            <span>{f.https}</span>
          </label>
        </>
      ) : (
        <>
          <p className={s.hint}>
            {f.m3uHint}{' '}
            <a href="/blog/xtream-codes-vs-m3u-android-tv" target="_blank" rel="noopener noreferrer">{f.m3uHintLink}</a>
          </p>
          <label className={s.field}>
            <span>{f.m3uUrl}</span>
            <input className={s.input} value={url} onChange={(e) => setUrl(e.target.value)} placeholder="http://provider.com/get.php?username=…&type=m3u_plus"
              autoComplete="off" autoCapitalize="none" autoCorrect="off" spellCheck={false} inputMode="url" />
          </label>
          <label className={s.field}>
            <span>{f.epgUrl} <em>{f.optional}</em></span>
            <input className={s.input} value={epgUrl} onChange={(e) => setEpgUrl(e.target.value)} placeholder="http://provider.com/xmltv.php?username=…"
              autoComplete="off" autoCapitalize="none" autoCorrect="off" spellCheck={false} inputMode="url" />
          </label>
        </>
      )}

      {error && <p className={`${s.status} ${s.statusError}`} role="alert">{error}</p>}

      <div className={s.actions}>
        <button type="submit" className={s.btn} disabled={busy}>{busy ? t.common.saving : submitLabel}</button>
        {onCancel && (
          <button type="button" className={`${s.btn} ${s.btnGhost}`} onClick={onCancel} disabled={busy}>{t.common.cancel}</button>
        )}
      </div>
    </form>
  );
}
