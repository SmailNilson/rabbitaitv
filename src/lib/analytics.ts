// Thin wrapper over the gtag snippet loaded in app/layout.tsx.
// Never throws: tracking must not break a click or a form.

type GtagWindow = Window & { gtag?: (...args: unknown[]) => void };

export function trackEvent(name: string, params: Record<string, string | number> = {}) {
    if (typeof window === 'undefined') return;
    try {
        (window as GtagWindow).gtag?.('event', name, params);
    } catch {
        // analytics blocked or not loaded yet: ignore
    }
}
