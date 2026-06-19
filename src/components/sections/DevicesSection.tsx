'use client';

import { siteConfig } from '@/config/site';
import type { JSX } from 'react';

type IconKind = 'monitor' | 'phone' | 'tv' | 'flame';

// Map each device (by name) to a clean line icon.
function iconKindFor(name: string): IconKind {
    const n = name.toLowerCase();
    if (n.includes('windows') || n.includes('mac')) return 'monitor';
    if (n.includes('ios') || n.includes('android') && !n.includes('tv')) return 'phone';
    if (n.includes('fire')) return 'flame';
    return 'tv';
}

const icons: Record<IconKind, JSX.Element> = {
    monitor: (
        <>
            <rect x="2" y="3" width="20" height="14" rx="2" />
            <path d="M8 21h8M12 17v4" />
        </>
    ),
    phone: (
        <>
            <rect x="6" y="2" width="12" height="20" rx="2.5" />
            <path d="M11 18h2" />
        </>
    ),
    tv: (
        <>
            <rect x="2" y="6" width="20" height="13" rx="2" />
            <path d="M8 3l4 3 4-3" />
        </>
    ),
    flame: (
        <>
            <path d="M12 2c1 3-1.5 4-1.5 6.5A2.5 2.5 0 0012 11a2.5 2.5 0 002.5-2.5C14.5 7 14 6 14 6c2 1.5 3 3.8 3 6a5 5 0 11-10 0c0-3 2-5 3-7 .8-1.5 1.5-2 2-3z" />
        </>
    ),
};

export function DevicesSection() {
    return (
        <section className="devices-section">
            <div className="container">
                <div className="header">
                    <span className="eyebrow">Compatibility</span>
                    <h2 className="section-title">Works on everything you own</h2>
                    <p className="section-subtitle">
                        Set up in minutes on any screen in your home.
                    </p>
                </div>

                <div className="device-grid">
                    {siteConfig.devices.map((device) => (
                        <div key={device.name} className="device-card">
                            <svg
                                className="device-icon"
                                viewBox="0 0 24 24"
                                width="28"
                                height="28"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.8"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                aria-hidden="true"
                            >
                                {icons[iconKindFor(device.name)]}
                            </svg>
                            <span className="device-name">{device.name}</span>
                        </div>
                    ))}
                </div>
            </div>

            <style jsx>{`
        .devices-section {
          padding: 5rem 1.5rem;
          background: var(--background);
        }

        .container {
          max-width: var(--container-max);
          margin: 0 auto;
        }

        .header {
          text-align: center;
          max-width: 640px;
          margin: 0 auto 3rem;
        }

        .eyebrow {
          display: inline-block;
          color: var(--gold);
          font-size: 0.8rem;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          margin-bottom: 0.75rem;
        }

        .section-title {
          font-family: var(--font-heading);
          color: var(--text);
          font-size: clamp(1.6rem, 3.5vw, 2.25rem);
          line-height: 1.15;
          margin: 0 0 0.75rem;
        }

        .section-subtitle {
          color: var(--text-muted);
          font-size: 1rem;
          margin: 0;
        }

        .device-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
          gap: 1rem;
        }

        .device-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
          text-align: center;
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 12px;
          padding: 1.25rem 1rem;
          transition: border-color 0.2s ease, transform 0.2s ease;
        }

        .device-card:hover {
          border-color: var(--border-strong);
          transform: translateY(-2px);
        }

        .device-icon {
          color: rgba(255, 255, 255, 0.85);
          flex-shrink: 0;
        }

        .device-name {
          color: var(--text-muted);
          font-size: 0.85rem;
          line-height: 1.3;
        }
      `}</style>
        </section>
    );
}
