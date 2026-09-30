/* ──────────────────────────────────────────────────────────────────────────
   English / French strings for the 4Klive pages (/activate, /admin).
   English by default — same rule as the TV apps; the choice is remembered in
   localStorage. `fr` is typed from `en`, so a missing translation fails the build.
   ────────────────────────────────────────────────────────────────────────── */

import { useCallback, useSyncExternalStore } from 'react';

export type Lang = 'en' | 'fr';

const en = {
  otherLanguage: 'Français',
  locale: 'en-US',

  common: {
    network: 'Network error — check your connection and try again.',
    generic: (status: number) => `Something went wrong (${status}). Please try again.`,
    cancel: 'Cancel',
    save: 'Save',
    saving: 'Saving…',
    edit: 'Edit',
    delete: 'Delete',
    close: 'Close',
    refresh: 'Refresh',
    signOut: 'Sign out',
    never: 'never',
  },

  platform: (p: string): string => ({ tizen: 'Samsung TV', android: 'Android TV / box', webos: 'LG TV' } as Record<string, string>)[p] ?? p,

  license: {
    trialUntil: (d: string) => `Free trial until ${d}`,
    lifetime: 'Lifetime license',
    yearlyUntil: (d: string) => `Yearly license until ${d}`,
    expired: 'License expired',
    revoked: 'License revoked',
    none: 'No license yet',
  },

  form: {
    name: 'Name',
    namePlaceholder: 'Home',
    xtream: 'Xtream Codes',
    m3u: 'M3U URL',
    host: 'Host',
    port: 'Port',
    username: 'Username',
    password: 'Password',
    passwordKeep: 'Leave empty to keep the current password',
    https: 'My provider uses HTTPS',
    m3uUrl: 'M3U URL',
    epgUrl: 'EPG URL',
    optional: '(optional)',
    errHost: 'Enter the Xtream host (no spaces).',
    errPort: 'Enter a valid port (1–65535).',
    errUsername: 'Enter your username.',
    errPassword: 'Enter your password.',
    errM3u: 'Enter a valid M3U URL (http:// or https://).',
    errEpg: 'The EPG URL must start with http:// or https://.',
  },

  activate: {
    title: 'Activate your TV',
    sub: 'Enter the TV code and the PIN shown on your TV. Then add your playlist: the TV connects on its own.',
    code: 'TV code',
    pin: 'PIN',
    continue: 'Continue',
    checking: 'Checking…',
    errFormat: 'Enter the 8-character TV code and the 6-digit PIN shown on your TV.',
    errWrong: 'Wrong code or PIN — check your TV screen.',
    errLocked: 'Too many wrong PINs — try again in 15 minutes.',
    errBlocked: 'This TV has been blocked. Contact us on WhatsApp.',
    errSession: 'Your session expired — enter the code and PIN again.',
    yourTv: 'Your TV',
    lastSeen: (d: string) => `Last seen ${d}`,
    buy: 'Get a license on WhatsApp',
    whatsappMessage: (code: string) => `Hello, I would like a 4Klive license for my TV (code ${code}).`,
    playlists: 'Playlists',
    empty: 'No playlist yet — add one below.',
    add: 'Add a playlist',
    editTitle: (name: string) => `Edit “${name}”`,
    confirmDelete: (name: string) => `Delete the playlist “${name}”? Your TV will stop using it.`,
    saved: 'Saved! Your TV picks it up within a few seconds — keep the 4Klive app open.',
    deleted: 'Playlist deleted.',
    tooMany: 'This TV already has the maximum number of playlists.',
    privacy: 'Your playlist details are stored encrypted and only used by your TV.',
    legacyTitle: 'Older 4Klive version',
  },

  admin: {
    title: '4Klive administration',
    password: 'Admin password',
    signIn: 'Sign in',
    errPassword: 'Wrong password.',
    errRateLimited: 'Too many failed attempts — wait a few minutes.',
    errUnknownCode: 'No TV with this code.',
    tvs: (n: number) => `${n} TV${n === 1 ? '' : 's'}`,
    filter: 'Filter by code, model…',
    open: 'Open',
    openCode: 'Open a TV by code',
    loadMore: 'Load more',
    colCode: 'Code',
    colDevice: 'Device',
    colLastSeen: 'Last seen',
    colLicense: 'License',
    colPlaylists: 'Playlists',
    blocked: 'Blocked',
    empty: 'No TV registered yet.',
    created: (d: string) => `Registered ${d}`,
    version: (v: string) => `app ${v}`,
    sectionLicense: 'License',
    grantLifetime: 'Lifetime',
    grantYearly: '1 year',
    extendTrial: 'Trial +7 days',
    revoke: 'Revoke',
    confirmGrant: (plan: string, code: string) => `Grant a ${plan} license to ${code}?`,
    confirmRevoke: (code: string) => `Revoke the license of ${code}? The TV locks at its next check.`,
    sectionAccess: 'Access',
    block: 'Block this TV',
    unblock: 'Unblock this TV',
    confirmBlock: (code: string) => `Block ${code}? The TV shows “This TV is blocked” and the owner can’t sign in on the site.`,
    sectionPlaylists: 'Playlists',
    showPassword: 'Show',
    hidePassword: 'Hide',
    add: 'Add a playlist',
    confirmDelete: (name: string) => `Delete the playlist “${name}”?`,
    done: 'Done.',
    planName: (plan: 'lifetime' | 'yearly'): string => (plan === 'lifetime' ? 'lifetime' : '1-year'),
  },
};

export type Strings = typeof en;

const fr: Strings = {
  otherLanguage: 'English',
  locale: 'fr-FR',

  common: {
    network: 'Erreur réseau — vérifiez votre connexion puis réessayez.',
    generic: (status: number) => `Un problème est survenu (${status}). Réessayez.`,
    cancel: 'Annuler',
    save: 'Enregistrer',
    saving: 'Enregistrement…',
    edit: 'Modifier',
    delete: 'Supprimer',
    close: 'Fermer',
    refresh: 'Actualiser',
    signOut: 'Se déconnecter',
    never: 'jamais',
  },

  platform: (p: string): string => ({ tizen: 'TV Samsung', android: 'TV / box Android', webos: 'TV LG' } as Record<string, string>)[p] ?? p,

  license: {
    trialUntil: (d: string) => `Essai gratuit jusqu’au ${d}`,
    lifetime: 'Licence à vie',
    yearlyUntil: (d: string) => `Licence annuelle jusqu’au ${d}`,
    expired: 'Licence expirée',
    revoked: 'Licence révoquée',
    none: 'Pas encore de licence',
  },

  form: {
    name: 'Nom',
    namePlaceholder: 'Maison',
    xtream: 'Xtream Codes',
    m3u: 'URL M3U',
    host: 'Serveur',
    port: 'Port',
    username: 'Nom d’utilisateur',
    password: 'Mot de passe',
    passwordKeep: 'Laissez vide pour garder le mot de passe actuel',
    https: 'Mon fournisseur utilise HTTPS',
    m3uUrl: 'URL M3U',
    epgUrl: 'URL du guide (EPG)',
    optional: '(facultatif)',
    errHost: 'Entrez le serveur Xtream (sans espace).',
    errPort: 'Entrez un port valide (1–65535).',
    errUsername: 'Entrez votre nom d’utilisateur.',
    errPassword: 'Entrez votre mot de passe.',
    errM3u: 'Entrez une URL M3U valide (http:// ou https://).',
    errEpg: 'L’URL du guide doit commencer par http:// ou https://.',
  },

  activate: {
    title: 'Activez votre TV',
    sub: 'Entrez le code et le PIN affichés sur votre TV, puis ajoutez votre playlist : la TV se connecte toute seule.',
    code: 'Code du TV',
    pin: 'PIN',
    continue: 'Continuer',
    checking: 'Vérification…',
    errFormat: 'Entrez le code de 8 caractères et le PIN à 6 chiffres affichés sur votre TV.',
    errWrong: 'Code ou PIN incorrect — vérifiez l’écran de votre TV.',
    errLocked: 'Trop de PIN incorrects — réessayez dans 15 minutes.',
    errBlocked: 'Ce TV a été bloqué. Contactez-nous sur WhatsApp.',
    errSession: 'Votre session a expiré — entrez à nouveau le code et le PIN.',
    yourTv: 'Votre TV',
    lastSeen: (d: string) => `Vu pour la dernière fois ${d}`,
    buy: 'Obtenir une licence sur WhatsApp',
    whatsappMessage: (code: string) => `Bonjour, je veux une licence 4Klive pour mon TV (code ${code}).`,
    playlists: 'Playlists',
    empty: 'Aucune playlist pour l’instant — ajoutez-en une ci-dessous.',
    add: 'Ajouter une playlist',
    editTitle: (name: string) => `Modifier « ${name} »`,
    confirmDelete: (name: string) => `Supprimer la playlist « ${name} » ? Votre TV ne l’utilisera plus.`,
    saved: 'Enregistré ! Votre TV la reçoit en quelques secondes — gardez l’app 4Klive ouverte.',
    deleted: 'Playlist supprimée.',
    tooMany: 'Ce TV a déjà le nombre maximum de playlists.',
    privacy: 'Les informations de votre playlist sont stockées chiffrées et servent uniquement à votre TV.',
    legacyTitle: 'Ancienne version de 4Klive',
  },

  admin: {
    title: 'Administration 4Klive',
    password: 'Mot de passe admin',
    signIn: 'Se connecter',
    errPassword: 'Mot de passe incorrect.',
    errRateLimited: 'Trop de tentatives — patientez quelques minutes.',
    errUnknownCode: 'Aucun TV avec ce code.',
    tvs: (n: number) => `${n} TV`,
    filter: 'Filtrer par code, modèle…',
    open: 'Ouvrir',
    openCode: 'Ouvrir un TV par son code',
    loadMore: 'Charger plus',
    colCode: 'Code',
    colDevice: 'Appareil',
    colLastSeen: 'Vu le',
    colLicense: 'Licence',
    colPlaylists: 'Playlists',
    blocked: 'Bloqué',
    empty: 'Aucun TV enregistré pour l’instant.',
    created: (d: string) => `Enregistré le ${d}`,
    version: (v: string) => `app ${v}`,
    sectionLicense: 'Licence',
    grantLifetime: 'À vie',
    grantYearly: '1 an',
    extendTrial: 'Essai +7 jours',
    revoke: 'Révoquer',
    confirmGrant: (plan: string, code: string) => `Donner une licence ${plan} à ${code} ?`,
    confirmRevoke: (code: string) => `Révoquer la licence de ${code} ? Le TV se bloque à sa prochaine vérification.`,
    sectionAccess: 'Accès',
    block: 'Bloquer ce TV',
    unblock: 'Débloquer ce TV',
    confirmBlock: (code: string) => `Bloquer ${code} ? Le TV affiche « Ce TV est bloqué » et le client ne peut plus se connecter sur le site.`,
    sectionPlaylists: 'Playlists',
    showPassword: 'Afficher',
    hidePassword: 'Masquer',
    add: 'Ajouter une playlist',
    confirmDelete: (name: string) => `Supprimer la playlist « ${name} » ?`,
    done: 'C’est fait.',
    planName: (plan: 'lifetime' | 'yearly') => (plan === 'lifetime' ? 'à vie' : 'd’un an'),
  },
};

const STORAGE_KEY = '4klive-lang';

// The choice lives in localStorage (shared by /activate and /admin); `memory` covers a
// browser that blocks storage, so the toggle still works for the current page.
let memory: Lang = 'en';
const listeners = new Set<() => void>();

function readLang(): Lang {
  try {
    const v = localStorage.getItem(STORAGE_KEY);
    return v === 'fr' || v === 'en' ? v : memory;
  } catch {
    return memory;
  }
}

function subscribe(onChange: () => void): () => void {
  listeners.add(onChange);
  window.addEventListener('storage', onChange);
  return () => {
    listeners.delete(onChange);
    window.removeEventListener('storage', onChange);
  };
}

/** Current language (English until the viewer picks French) + a setter that remembers it. */
export function useLang(): { lang: Lang; t: Strings; setLang: (l: Lang) => void } {
  const lang = useSyncExternalStore(subscribe, readLang, () => 'en' as Lang);
  const setLang = useCallback((l: Lang) => {
    memory = l;
    try {
      localStorage.setItem(STORAGE_KEY, l);
    } catch {
      /* not remembered — fine */
    }
    listeners.forEach((f) => f());
  }, []);
  return { lang, t: lang === 'fr' ? fr : en, setLang };
}

/** "Sep 30, 2026" / "30 sept. 2026". */
export function fmtDate(t: Strings, ms: number | null | undefined): string {
  if (!ms) return '—';
  return new Intl.DateTimeFormat(t.locale, { day: 'numeric', month: 'short', year: 'numeric' }).format(new Date(ms));
}

/** Date + time, for "last seen". */
export function fmtDateTime(t: Strings, ms: number | null | undefined): string {
  if (!ms) return t.common.never;
  return new Intl.DateTimeFormat(t.locale, { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' }).format(new Date(ms));
}

/** One line describing a license, in the viewer's language. */
export function licenseLabel(t: Strings, lic: { status: string; plan: string; expiresAt: number | null } | null): string {
  if (!lic) return t.license.none;
  if (lic.plan === 'revoked') return t.license.revoked;
  if (lic.status === 'expired') return t.license.expired;
  if (lic.plan === 'lifetime') return t.license.lifetime;
  if (lic.plan === 'yearly') return t.license.yearlyUntil(fmtDate(t, lic.expiresAt));
  return t.license.trialUntil(fmtDate(t, lic.expiresAt));
}
