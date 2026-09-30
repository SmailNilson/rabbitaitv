'use client';

import { useMemo, useRef, useState, type FormEvent } from 'react';
import PlaylistForm from '@/components/fourklive/PlaylistForm';
import s from '@/components/fourklive/fourklive.module.css';
import {
  ApiError,
  adminApi,
  isValidCode,
  normalizeCode,
  type AdminDevice,
  type AdminDeviceRow,
  type Playlist,
  type PlaylistInput,
} from '@/lib/fourklive/api';
import { fmtDate, fmtDateTime, licenseLabel, useLang, type Strings } from '@/lib/fourklive/i18n';

/* ──────────────────────────────────────────────────────────────────────────
   /admin — the service owner's panel for 4Klive TVs.

   Sign in with the admin password (the Worker's LICENSE_ADMIN_TOKEN). It is kept
   in memory only — never stored — so closing or reloading the tab signs out.
   Lists every TV; for one TV: license (lifetime / 1 year / trial +7 days /
   revoke), block / unblock, and its playlists (readable, editable).
   ────────────────────────────────────────────────────────────────────────── */

type Status = { msg: string; kind: 'error' | 'success' } | null;

function errorText(t: Strings, e: unknown): string {
  if (!(e instanceof ApiError) || e.status === 0) return t.common.network;
  if (e.status === 429) return t.admin.errRateLimited;
  if (e.status === 401) return t.admin.errPassword;
  if (e.status === 404) return t.admin.errUnknownCode;
  if (e.code === 'too_many') return t.activate.tooMany;
  return t.common.generic(e.status);
}

function badgeClass(lic: AdminDeviceRow['license']): string {
  if (!lic || lic.status === 'expired') return s.badgeBad;
  return lic.status === 'trial' ? s.badgeTrial : s.badgeOk;
}

export default function AdminContent() {
  const { lang, t, setLang } = useLang();
  const A = t.admin;

  const [password, setPassword] = useState('');
  const [token, setToken] = useState<string | null>(null);
  const [rows, setRows] = useState<AdminDeviceRow[]>([]);
  const [cursor, setCursor] = useState<string | null>(null);
  const [filter, setFilter] = useState('');
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState<Status>(null);
  const [device, setDevice] = useState<AdminDevice | null>(null);
  const [showPw, setShowPw] = useState<Record<string, boolean>>({});
  const [adding, setAdding] = useState(false);
  const [editing, setEditing] = useState<Playlist | null>(null);
  const detailRef = useRef<HTMLDivElement>(null);

  async function signIn(event: FormEvent) {
    event.preventDefault();
    if (!password) return;
    setBusy(true);
    setStatus(null);
    try {
      const page = await adminApi.devices(password);
      setToken(password);
      setPassword('');
      setRows(page.devices);
      setCursor(page.cursor);
    } catch (e) {
      setStatus({ msg: errorText(t, e), kind: 'error' });
    } finally {
      setBusy(false);
    }
  }

  function signOut() {
    setToken(null);
    setRows([]);
    setCursor(null);
    setDevice(null);
    setStatus(null);
  }

  async function reloadList() {
    if (!token) return;
    try {
      const page = await adminApi.devices(token);
      setRows(page.devices);
      setCursor(page.cursor);
    } catch (e) {
      handleError(e);
    }
  }

  async function loadMore() {
    if (!token || !cursor) return;
    try {
      const page = await adminApi.devices(token, cursor);
      setRows((prev) => [...prev, ...page.devices.filter((d) => !prev.some((p) => p.code === d.code))]);
      setCursor(page.cursor);
    } catch (e) {
      handleError(e);
    }
  }

  function handleError(e: unknown) {
    if (e instanceof ApiError && e.status === 401) {
      signOut();
      setStatus({ msg: t.admin.errPassword, kind: 'error' });
      return;
    }
    setStatus({ msg: errorText(t, e), kind: 'error' });
  }

  async function open(code: string) {
    if (!token) return;
    setStatus(null);
    setAdding(false);
    setEditing(null);
    setShowPw({});
    try {
      setDevice(await adminApi.device(token, code));
      requestAnimationFrame(() => detailRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }));
    } catch (e) {
      handleError(e);
    }
  }

  /** Runs an action on the open TV, then refreshes it and its row. */
  async function act(fn: (tok: string, code: string) => Promise<unknown>, confirmText?: string) {
    if (!token || !device) return;
    if (confirmText && !window.confirm(confirmText)) return;
    try {
      await fn(token, device.code);
      const fresh = await adminApi.device(token, device.code);
      setDevice(fresh);
      setAdding(false);
      setEditing(null);
      setStatus({ msg: A.done, kind: 'success' });
      setRows((prev) =>
        prev.map((r) =>
          r.code === fresh.code
            ? { ...r, blocked: fresh.blocked, playlists: fresh.playlists.length, license: fresh.license }
            : r,
        ),
      );
    } catch (e) {
      handleError(e);
    }
  }

  const shown = useMemo(() => {
    const q = filter.trim().toLowerCase();
    const qCode = normalizeCode(filter);
    const list = [...rows].sort((a, b) => (b.lastSeenAt ?? 0) - (a.lastSeenAt ?? 0));
    if (!q) return list;
    return list.filter(
      (r) =>
        normalizeCode(r.code).includes(qCode) ||
        r.model?.toLowerCase().includes(q) ||
        r.platform?.toLowerCase().includes(q) ||
        t.platform(r.platform).toLowerCase().includes(q),
    );
  }, [rows, filter, t]);

  const header = (
    <div className={s.top}>
      <div className={s.brand}><span className={s.brand4k}>4K</span>live · admin</div>
      <div className={s.actions}>
        <button type="button" className={s.langBtn} onClick={() => { setStatus(null); setLang(lang === 'fr' ? 'en' : 'fr'); }}>{t.otherLanguage}</button>
        {token && <button type="button" className={s.langBtn} onClick={signOut}>{t.common.signOut}</button>}
      </div>
    </div>
  );

  const statusBox = status && (
    <p className={`${s.status} ${status.kind === 'error' ? s.statusError : s.statusSuccess}`} role="status">{status.msg}</p>
  );

  /* ------------------------------ sign in ------------------------------ */
  if (!token) {
    return (
      <div className={s.page}>
        <div className={s.card}>
          {header}
          <h1 className={s.h1}>{A.title}</h1>
          <form className={s.form} onSubmit={signIn} noValidate>
            <label className={s.field}>
              <span>{A.password}</span>
              <input className={s.input} type="password" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="current-password" />
            </label>
            <button type="submit" className={s.btn} disabled={busy || !password}>{A.signIn}</button>
            {statusBox}
          </form>
        </div>
      </div>
    );
  }

  /* ------------------------------ panel ------------------------------ */
  const codeTyped = normalizeCode(filter);

  return (
    <div className={s.page}>
      <div className={`${s.card} ${s.wide}`}>
        {header}
        <h1 className={s.h1}>{A.title}</h1>

        {device && (
          <div ref={detailRef} className={s.panel} style={{ marginBottom: '1.4rem' }}>
            <div className={s.tv}>
              <div>
                <div className={s.tvCode}>{device.code}</div>
                <div className={s.meta}>
                  {t.platform(device.platform)}{device.model ? ` · ${device.model}` : ''} · {A.version(device.appVersion || '?')}
                  <br />
                  {A.created(fmtDate(t, device.createdAt))} · {t.activate.lastSeen(fmtDateTime(t, device.lastSeenAt))}
                </div>
              </div>
              <div className={s.actions}>
                {device.blocked && <span className={`${s.badge} ${s.badgeBad}`}>{A.blocked}</span>}
                <span className={`${s.badge} ${badgeClass(device.license)}`}>{licenseLabel(t, device.license)}</span>
                <button type="button" className={`${s.btn} ${s.btnGhost} ${s.btnSmall}`} onClick={() => setDevice(null)}>{t.common.close}</button>
              </div>
            </div>

            <h2 className={s.h2}>{A.sectionLicense}</h2>
            <div className={s.actions}>
              <button type="button" className={`${s.btn} ${s.btnGold} ${s.btnSmall}`}
                onClick={() => act((tok, c) => adminApi.grant(tok, c, 'lifetime'), A.confirmGrant(A.planName('lifetime'), device.code))}>
                {A.grantLifetime}
              </button>
              <button type="button" className={`${s.btn} ${s.btnGhost} ${s.btnSmall}`}
                onClick={() => act((tok, c) => adminApi.grant(tok, c, 'yearly'), A.confirmGrant(A.planName('yearly'), device.code))}>
                {A.grantYearly}
              </button>
              <button type="button" className={`${s.btn} ${s.btnGhost} ${s.btnSmall}`} onClick={() => act((tok, c) => adminApi.extendTrial(tok, c, 7))}>
                {A.extendTrial}
              </button>
              <button type="button" className={`${s.btn} ${s.btnDanger} ${s.btnSmall}`} onClick={() => act((tok, c) => adminApi.revoke(tok, c), A.confirmRevoke(device.code))}>
                {A.revoke}
              </button>
            </div>

            <h2 className={s.h2}>{A.sectionAccess}</h2>
            {device.blocked ? (
              <button type="button" className={`${s.btn} ${s.btnGhost} ${s.btnSmall}`} onClick={() => act((tok, c) => adminApi.block(tok, c, false))}>
                {A.unblock}
              </button>
            ) : (
              <button type="button" className={`${s.btn} ${s.btnDanger} ${s.btnSmall}`} onClick={() => act((tok, c) => adminApi.block(tok, c, true), A.confirmBlock(device.code))}>
                {A.block}
              </button>
            )}

            <h2 className={s.h2}>{A.sectionPlaylists}</h2>
            {device.playlists.length === 0 && !adding && <p className={s.empty}>{t.activate.empty}</p>}
            <ul className={s.list}>
              {device.playlists.map((p) =>
                editing?.id === p.id ? (
                  <li key={p.id} className={s.formBox}>
                    <PlaylistForm t={t} initial={p} submitLabel={t.common.save}
                      onSubmit={(input: PlaylistInput) => act((tok, c) => adminApi.updatePlaylist(tok, c, p.id, input))}
                      onCancel={() => setEditing(null)} />
                  </li>
                ) : (
                  <li key={p.id} className={s.item}>
                    <div className={s.itemMain}>
                      <div className={s.itemName}>{p.name}</div>
                      <div className={s.itemMeta}>
                        {p.type === 'xtream' ? (
                          <>
                            {t.form.xtream} · {p.useHttps ? 'https' : 'http'}://{p.host}:{p.port} · {p.username} ·{' '}
                            <span className={s.secret}>{showPw[p.id] ? p.password : '••••••'}</span>{' '}
                            <button type="button" className={s.langBtn} onClick={() => setShowPw((v) => ({ ...v, [p.id]: !v[p.id] }))}>
                              {showPw[p.id] ? A.hidePassword : A.showPassword}
                            </button>
                          </>
                        ) : (
                          <>{t.form.m3u} · <span className={s.secret}>{p.url}</span></>
                        )}
                      </div>
                    </div>
                    <div className={s.actions}>
                      <button type="button" className={`${s.btn} ${s.btnGhost} ${s.btnSmall}`} onClick={() => { setAdding(false); setEditing(p); }}>
                        {t.common.edit}
                      </button>
                      <button type="button" className={`${s.btn} ${s.btnDanger} ${s.btnSmall}`}
                        onClick={() => act((tok, c) => adminApi.deletePlaylist(tok, c, p.id), A.confirmDelete(p.name))}>
                        {t.common.delete}
                      </button>
                    </div>
                  </li>
                ),
              )}
            </ul>
            {adding ? (
              <div className={s.formBox}>
                <PlaylistForm t={t} submitLabel={A.add}
                  onSubmit={(input) => act((tok, c) => adminApi.addPlaylist(tok, c, input))}
                  onCancel={() => setAdding(false)} />
              </div>
            ) : (
              <p style={{ margin: '0.9rem 0 0' }}>
                <button type="button" className={`${s.btn} ${s.btnGhost} ${s.btnSmall}`} onClick={() => { setEditing(null); setAdding(true); }}>
                  + {A.add}
                </button>
              </p>
            )}
          </div>
        )}

        {statusBox && <div style={{ marginBottom: '1rem' }}>{statusBox}</div>}

        <div className={s.toolbar}>
          <input className={s.input} value={filter} onChange={(e) => setFilter(e.target.value)} placeholder={A.filter} autoComplete="off" spellCheck={false} />
          {isValidCode(codeTyped) && (
            <button type="button" className={`${s.btn} ${s.btnSmall}`} onClick={() => open(codeTyped)}>{A.open} {codeTyped.slice(0, 4)}-{codeTyped.slice(4)}</button>
          )}
          <button type="button" className={`${s.btn} ${s.btnGhost} ${s.btnSmall}`} onClick={reloadList}>{t.common.refresh}</button>
          <span className={s.meta}>{A.tvs(rows.length)}{cursor ? '+' : ''}</span>
        </div>

        {rows.length === 0 ? (
          <p className={s.empty}>{A.empty}</p>
        ) : (
          <div className={s.tableWrap}>
            <table className={s.table}>
              <thead>
                <tr>
                  <th>{A.colCode}</th>
                  <th>{A.colDevice}</th>
                  <th>{A.colLastSeen}</th>
                  <th>{A.colLicense}</th>
                  <th>{A.colPlaylists}</th>
                </tr>
              </thead>
              <tbody>
                {shown.map((r) => (
                  <tr key={r.code} className={s.clickable} onClick={() => open(r.code)}>
                    <td><span className={s.secret}>{r.code}</span>{r.blocked && <> <span className={`${s.badge} ${s.badgeBad}`}>{A.blocked}</span></>}</td>
                    <td>{t.platform(r.platform)}{r.model ? <div className={s.itemMeta}>{r.model} · {A.version(r.appVersion || '?')}</div> : null}</td>
                    <td>{fmtDateTime(t, r.lastSeenAt)}</td>
                    <td><span className={`${s.badge} ${badgeClass(r.license)}`}>{licenseLabel(t, r.license)}</span></td>
                    <td>{r.playlists}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {cursor && (
          <p style={{ marginTop: '1rem' }}>
            <button type="button" className={`${s.btn} ${s.btnGhost} ${s.btnSmall}`} onClick={loadMore}>{A.loadMore}</button>
          </p>
        )}
      </div>
    </div>
  );
}
