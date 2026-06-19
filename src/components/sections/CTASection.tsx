'use client';

import Link from 'next/link';
import { siteConfig } from '@/config/site';

export default function CTASection() {
  const whatsappLink =
    siteConfig.contact.whatsappLink ||
    `https://api.whatsapp.com/send?phone=${siteConfig.contact.whatsapp.replace(/\D/g, '')}`;

  return (
    <section className="cta-section">
      <div className="cta-inner">
        <div className="cta-panel">
          <h2 className="cta-heading">Start watching in 60 seconds</h2>
          <p className="cta-subtitle">
            Free trial · no credit card · instant activation.
          </p>

          <div className="cta-buttons">
            <Link href="/free-trial" className="btn-primary cta-btn-primary">
              <svg
                className="cta-icon"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M8 5v14l11-7L8 5z" />
              </svg>
              Start free trial
            </Link>

            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="cta-btn-whatsapp"
            >
              <svg
                className="cta-icon"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.9-4.45 9.9-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2zm0 18.13h-.01a8.2 8.2 0 0 1-4.18-1.15l-.3-.18-3.11.82.83-3.04-.2-.31a8.18 8.18 0 0 1-1.26-4.38c0-4.54 3.7-8.23 8.24-8.23 2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.01-.38.11-.51.11-.11.25-.29.37-.43.13-.14.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.22.25-.86.85-.86 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.25 3.74.59.26 1.06.41 1.42.52.6.19 1.14.16 1.57.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.14-1.18-.06-.1-.22-.16-.47-.28z" />
              </svg>
              Chat on WhatsApp
            </a>
          </div>

          <ul className="cta-trust">
            <li>30-day money-back</li>
            <li>24/7 support</li>
            <li>cancel anytime</li>
          </ul>
        </div>
      </div>

      <style jsx>{`
        .cta-section {
          padding: 5rem 1.5rem;
          background: var(--background);
        }

        .cta-inner {
          max-width: 900px;
          margin: 0 auto;
        }

        .cta-panel {
          background: #15070b;
          border: 1px solid rgba(242, 7, 50, 0.3);
          border-radius: 18px;
          padding: 2.5rem;
          text-align: center;
        }

        .cta-heading {
          font-family: var(--font-heading);
          font-weight: 800;
          font-size: clamp(1.9rem, 4.5vw, 3rem);
          line-height: 1.1;
          color: var(--text);
          margin: 0 0 0.85rem;
        }

        .cta-subtitle {
          color: var(--text-muted);
          font-size: 1.05rem;
          line-height: 1.5;
          margin: 0 0 2rem;
        }

        .cta-buttons {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 1rem;
          margin-bottom: 1.75rem;
        }

        .cta-btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 0.55rem;
        }

        .cta-btn-whatsapp {
          display: inline-flex;
          align-items: center;
          gap: 0.55rem;
          background: rgba(37, 211, 102, 0.14);
          border: 1px solid rgba(37, 211, 102, 0.4);
          color: #37d36a;
          border-radius: 12px;
          padding: 0.9rem 1.6rem;
          font-weight: 600;
          font-size: 1rem;
          text-decoration: none;
          transition: background 0.25s ease, transform 0.25s ease;
        }

        .cta-btn-whatsapp:hover {
          background: rgba(37, 211, 102, 0.24);
          transform: translateY(-2px);
        }

        .cta-btn-whatsapp:focus-visible,
        .cta-btn-primary:focus-visible {
          outline: 2px solid var(--text);
          outline-offset: 3px;
        }

        .cta-icon {
          flex-shrink: 0;
        }

        .cta-trust {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 1.25rem;
          list-style: none;
          margin: 0;
          padding: 0;
          color: var(--text-dim);
          font-size: 0.8rem;
        }

        .cta-trust li {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
        }

        .cta-trust li::before {
          content: '✓';
          color: var(--gold);
        }

        @media (max-width: 560px) {
          .cta-panel {
            padding: 2rem 1.5rem;
          }

          .cta-buttons {
            flex-direction: column;
          }

          .cta-btn-primary,
          .cta-btn-whatsapp {
            width: 100%;
            justify-content: center;
          }

          .cta-trust {
            flex-direction: column;
            gap: 0.6rem;
          }
        }
      `}</style>
    </section>
  );
}
