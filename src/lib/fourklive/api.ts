/* ──────────────────────────────────────────────────────────────────────────
   4Klive device API (v2) — the calls /activate and /admin make to the Worker.

   Each TV has a FIXED 8-character code (shown "7F3A-9B2C") and a 6-digit PIN.
   - Client (/activate): code + PIN → a 2 h session token → the TV's playlists.
   - Admin (/admin): every call carries the admin password as a Bearer token.
   The Worker stores playlists encrypted and returns them to the TV on its next poll.
   ────────────────────────────────────────────────────────────────────────── */

import { siteConfig } from '@/config/site';

const DEFAULT_API_BASE = 'https://4klive-provision.contact-rabbitaitv.workers.dev';

// A `?api=` override is honoured ONLY for same-origin or localhost (a dev backend):
// a crafted link must never send a PIN, a session or the admin password elsewhere.
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

export function resolveApiBase(): string {
  const override = new URLSearchParams(location.search).get('api');
  const base = override && isAllowedApiOverride(override) ? override : DEFAULT_API_BASE;
  return base.replace(/\/+$/, '');
}

/* ------------------------------------------------------------------ codes */

const ALPHABET = '0123456789ABCDEFGHJKMNPQRSTVWXYZ';

/** Same normalisation as the Worker: no dash/space, upper-case, Crockford look-alikes. */
export function normalizeCode(raw: string): string {
  return raw.trim().toUpperCase().replace(/[\s-]/g, '').replace(/O/g, '0').replace(/[IL]/g, '1').replace(/U/g, 'V');
}

export function isValidCode(code: string): boolean {
  return code.length === 8 && [...code].every((c) => ALPHABET.includes(c));
}

export const prettyCode = (code: string): string => (code.length === 8 ? `${code.slice(0, 4)}-${code.slice(4)}` : code);

/* ------------------------------------------------------------------ types */

export interface Playlist {
  id: string;
  name: string;
  type: 'xtream' | 'm3u';
  host?: string;
  port?: number;
  username?: string;
  /** Empty on the client page (never sent back to the browser). */
  password?: string;
  useHttps?: boolean;
  url?: string;
  epgUrl?: string;
  createdAt: number;
  updatedAt: number;
}

/** What a form sends: an edit with an empty password keeps the current one. */
export type PlaylistInput = Omit<Playlist, 'id' | 'createdAt' | 'updatedAt'>;

export interface License {
  status: 'trial' | 'active' | 'expired';
  plan: 'trial' | 'lifetime' | 'yearly' | 'revoked';
  expiresAt: number | null;
}

export interface ClientDevice {
  code: string;
  platform: string;
  appVersion: string;
  lastSeenAt: number;
  license: License | null;
  playlists: Playlist[];
  playlistsRev: number;
}

export interface AdminDeviceRow {
  code: string;
  platform: string;
  appVersion: string;
  model: string;
  blocked: boolean;
  lastSeenAt: number;
  createdAt: number;
  playlists: number;
  license: License | null;
}

export interface AdminDevice extends ClientDevice {
  model: string;
  blocked: boolean;
  createdAt: number;
}

/* ------------------------------------------------------------------ calls */

export class ApiError extends Error {
  constructor(
    readonly status: number,
    readonly code: string,
    message: string,
  ) {
    super(message);
  }
}

async function call<T>(path: string, opts: { method?: string; token?: string; body?: unknown } = {}): Promise<T> {
  const headers: Record<string, string> = {};
  if (opts.body !== undefined) headers['Content-Type'] = 'application/json';
  if (opts.token) headers.Authorization = `Bearer ${opts.token}`;
  let res: Response;
  try {
    res = await fetch(resolveApiBase() + path, {
      method: opts.method ?? 'GET',
      headers,
      body: opts.body !== undefined ? JSON.stringify(opts.body) : undefined,
      cache: 'no-store',
    });
  } catch {
    throw new ApiError(0, 'network', 'Network error');
  }
  const data = (await res.json().catch(() => null)) as { error?: { code?: string; message?: string } } | null;
  if (!res.ok) throw new ApiError(res.status, data?.error?.code ?? 'http', data?.error?.message ?? `HTTP ${res.status}`);
  return data as T;
}

export const clientApi = {
  signIn: (code: string, pin: string) =>
    call<{ token: string; code: string; expiresAt: number }>('/v2/client/session', { method: 'POST', body: { code, pin } }),
  device: (token: string) => call<ClientDevice>('/v2/client/device', { token }),
  addPlaylist: (token: string, p: PlaylistInput) => call<{ playlist: Playlist }>('/v2/client/playlists', { method: 'POST', token, body: p }),
  updatePlaylist: (token: string, id: string, p: PlaylistInput) =>
    call<{ playlist: Playlist }>(`/v2/client/playlists/${encodeURIComponent(id)}`, { method: 'PUT', token, body: p }),
  deletePlaylist: (token: string, id: string) => call<unknown>(`/v2/client/playlists/${encodeURIComponent(id)}`, { method: 'DELETE', token }),
};

const dev = (code: string) => `/v2/admin/devices/${encodeURIComponent(normalizeCode(code))}`;

export const adminApi = {
  devices: (token: string, cursor?: string | null) =>
    call<{ devices: AdminDeviceRow[]; cursor: string | null }>(`/v2/admin/devices${cursor ? `?cursor=${encodeURIComponent(cursor)}` : ''}`, { token }),
  device: (token: string, code: string) => call<AdminDevice>(dev(code), { token }),
  grant: (token: string, code: string, plan: 'lifetime' | 'yearly') => call<unknown>(`${dev(code)}/license`, { method: 'POST', token, body: { plan } }),
  extendTrial: (token: string, code: string, days: number) => call<unknown>(`${dev(code)}/license`, { method: 'POST', token, body: { extendDays: days } }),
  revoke: (token: string, code: string) => call<unknown>(`${dev(code)}/license`, { method: 'DELETE', token }),
  block: (token: string, code: string, blocked: boolean) => call<unknown>(`${dev(code)}/block`, { method: 'POST', token, body: { blocked } }),
  addPlaylist: (token: string, code: string, p: PlaylistInput) => call<unknown>(`${dev(code)}/playlists`, { method: 'POST', token, body: p }),
  updatePlaylist: (token: string, code: string, id: string, p: PlaylistInput) =>
    call<unknown>(`${dev(code)}/playlists/${encodeURIComponent(id)}`, { method: 'PUT', token, body: p }),
  deletePlaylist: (token: string, code: string, id: string) =>
    call<unknown>(`${dev(code)}/playlists/${encodeURIComponent(id)}`, { method: 'DELETE', token }),
};

/** WhatsApp chat (same number as the rest of the site) with the TV code pre-filled. */
export function whatsappFor(message: string): string {
  return `${siteConfig.contact.whatsappLink}&text=${encodeURIComponent(message)}`;
}
