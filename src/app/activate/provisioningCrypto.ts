/**
 * Client-side provisioning crypto for the 4Klive web-activation portal — the
 * ENCRYPT side of the zero-knowledge contract the TV apps DECRYPT. It MUST stay
 * byte-for-byte identical to the device mirrors (4Klive repo:
 * `tizen|webos/src/data/provisioningCrypto.ts`, `android/.../ProvisioningCrypto.kt`)
 * and the reference `portal/crypto.js`, or pairing silently fails:
 *
 *   lookupId  = hex( SHA-256("4klive:id:"   + deviceKey) )
 *   authToken = hex( SHA-256("4klive:auth:" + deviceKey + ":" + pin) )
 *   encKey    =      SHA-256("4klive:enc:"  + deviceKey + ":" + pin)   // AES-256-GCM key
 *
 * The Device Key is normalized to lowercase before every derivation (the TV shows
 * it uppercased for readability but stores/derives from the lowercase original).
 * Everything runs in the browser via Web Crypto: the plaintext playlist and the
 * PIN never leave the page; the backend only ever receives the opaque envelope and
 * the hashes, and can never decrypt (it never sees the raw Device Key).
 */

/** The opaque envelope the backend stores verbatim (produced by `encryptConfig`). */
export interface ProvisionEnvelope {
  /** Scheme version (currently 1). */
  v: number;
  /** Base64 of the 12-byte AES-GCM IV. */
  iv: string;
  /** Base64 of the ciphertext with the 128-bit GCM tag appended. */
  ct: string;
}

/** Xtream Codes config — `useHttps` maps to the device's `scheme`. */
export interface XtreamConfig {
  type: 'xtream';
  host: string;
  port: number;
  username: string;
  password: string;
  /** Present + true only when the provider is HTTPS; absent means HTTP. */
  useHttps?: boolean;
}

/** M3U playlist config, with an optional XMLTV EPG URL. */
export interface M3uConfig {
  type: 'm3u';
  url: string;
  epgUrl?: string;
}

/** The config the portal encrypts and the TV applies. */
export type ProvisionConfig = XtreamConfig | M3uConfig;

const enc = new TextEncoder();

/**
 * UTF-8 encode into a fresh ArrayBuffer-backed view. The extra copy narrows the
 * type to `Uint8Array<ArrayBuffer>` (not the widened `ArrayBufferLike`) so the
 * bytes satisfy WebCrypto's `BufferSource` under strict TS + lib.dom.
 */
function utf8(str: string): Uint8Array<ArrayBuffer> {
  return new Uint8Array(enc.encode(str));
}

/** Canonical form of a Device Key used for all derivations: trimmed + lowercased. */
export function normalizeDeviceKey(deviceKey: string): string {
  return deviceKey.trim().toLowerCase();
}

async function sha256Bytes(str: string): Promise<Uint8Array<ArrayBuffer>> {
  return new Uint8Array(await crypto.subtle.digest('SHA-256', utf8(str)));
}

function toHex(bytes: Uint8Array): string {
  let s = '';
  for (let i = 0; i < bytes.length; i++) s += bytes[i].toString(16).padStart(2, '0');
  return s;
}

function toBase64(bytes: Uint8Array): string {
  let s = '';
  for (let i = 0; i < bytes.length; i++) s += String.fromCharCode(bytes[i]);
  return btoa(s);
}

/** The backend record id / URL path segment (hash of the Device Key). */
export async function deriveLookupId(deviceKey: string): Promise<string> {
  return toHex(await sha256Bytes(`4klive:id:${normalizeDeviceKey(deviceKey)}`));
}

/** The read/write auth token (hash of Device Key + PIN). */
export async function deriveAuthToken(deviceKey: string, pin: string): Promise<string> {
  return toHex(await sha256Bytes(`4klive:auth:${normalizeDeviceKey(deviceKey)}:${pin}`));
}

async function deriveEncKey(deviceKey: string, pin: string): Promise<CryptoKey> {
  const raw = await sha256Bytes(`4klive:enc:${normalizeDeviceKey(deviceKey)}:${pin}`);
  return crypto.subtle.importKey('raw', raw, { name: 'AES-GCM' }, false, ['encrypt']);
}

/** Encrypts a config object into the opaque `{ v, iv, ct }` envelope the backend stores. */
export async function encryptConfig(
  deviceKey: string,
  pin: string,
  config: ProvisionConfig,
): Promise<ProvisionEnvelope> {
  const key = await deriveEncKey(deviceKey, pin);
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const ct = await crypto.subtle.encrypt(
    { name: 'AES-GCM', iv },
    key,
    utf8(JSON.stringify(config)),
  );
  return { v: 1, iv: toBase64(iv), ct: toBase64(new Uint8Array(ct)) };
}
