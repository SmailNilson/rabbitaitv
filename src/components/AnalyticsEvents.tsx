'use client';

import { useEffect } from 'react';
import { trackEvent } from '@/lib/analytics';

const WHATSAPP = /(^|\/\/)(api\.whatsapp\.com|wa\.me)\//i;
const APK = /\.apk(\?|#|$)/i;

// One delegated listener instead of an onClick on every CTA: WhatsApp links
// live in a dozen components (pricing, footer, floating button, 4Klive…).
// Only the link text and page are sent, never the prefilled WhatsApp message
// (on /4klive it can contain the customer's Device Key).
export default function AnalyticsEvents() {
    useEffect(() => {
        const onClick = (e: MouseEvent) => {
            const link = (e.target as Element | null)?.closest?.('a[href]');
            if (!link) return;
            const href = link.getAttribute('href') ?? '';
            const params = {
                page_path: window.location.pathname,
                cta_text: (link.textContent ?? '').trim().slice(0, 100),
            };
            if (WHATSAPP.test(href)) trackEvent('whatsapp_click', params);
            else if (APK.test(href)) trackEvent('apk_download', params);
        };
        document.addEventListener('click', onClick, { capture: true });
        return () => document.removeEventListener('click', onClick, { capture: true });
    }, []);

    return null;
}
