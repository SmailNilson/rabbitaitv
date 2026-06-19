'use client';

import Link from 'next/link';
import Image from 'next/image';
import { siteConfig } from '@/config/site';

export function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Image src="/images/logo.png" alt="RabbitAI TV" width={140} height={36} style={{ objectFit: 'contain' }} />
            <p>
              Premium 4K IPTV — 20,000+ live channels and 120,000+ movies &amp; series,
              streamed to every screen with zero buffering.
            </p>
          </div>

          <div className="footer-links">
            <h4>Quick links</h4>
            <ul>
              {siteConfig.footerNavigation.map((item) => (
                <li key={item.name}>
                  <Link href={item.href}>{item.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-contact">
            <h4>Contact us</h4>
            <ul>
              <li>
                <a href={siteConfig.contact.whatsappLink} target="_blank" rel="noopener noreferrer">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                  </svg>
                  WhatsApp: +1 (757) 535-7760
                </a>
              </li>
              <li>
                <a href={`mailto:${siteConfig.contact.email}`}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-10 6L2 7" />
                  </svg>
                  {siteConfig.contact.email}
                </a>
              </li>
              <li>
                <span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
                  </svg>
                  {siteConfig.contact.address}
                </span>
              </li>
            </ul>
          </div>

          <div className="footer-newsletter">
            <h4>Stay updated</h4>
            <p>Subscribe for the latest updates and exclusive offers.</p>
            <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
              <input type="email" placeholder="Your email address" aria-label="Email address" />
              <button type="submit" className="btn-primary">Subscribe</button>
            </form>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} RabbitAI TV. All rights reserved.</p>
          <div className="footer-legal">
            <Link href="/privacy-policy">Privacy Policy</Link>
            <span>·</span>
            <Link href="/terms">Terms of Service</Link>
          </div>
        </div>
      </div>

      <style jsx>{`
        .footer {
          background: #0a0a0b;
          padding: 4rem 1.5rem 2rem;
          border-top: 1px solid var(--border);
        }
        .container { max-width: var(--container-max); margin: 0 auto; }
        .footer-grid {
          display: grid;
          grid-template-columns: 1.4fr 1fr 1.2fr 1.2fr;
          gap: 2.5rem;
          margin-bottom: 3rem;
        }
        .footer-brand p {
          color: var(--text-muted);
          font-size: 0.9rem;
          margin-top: 1rem;
          line-height: 1.65;
          max-width: 32ch;
        }
        h4 {
          color: #fff;
          font-size: 0.85rem;
          font-weight: 600;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          margin-bottom: 1.1rem;
        }
        .footer-links ul,
        .footer-contact ul { list-style: none; padding: 0; margin: 0; }
        .footer-links li { margin-bottom: 0.7rem; }
        .footer-contact li { margin-bottom: 0.85rem; }
        .footer-links a,
        .footer-contact a,
        .footer-contact span {
          color: var(--text-muted);
          font-size: 0.9rem;
          transition: color 0.2s ease;
          display: inline-flex;
          align-items: center;
          gap: 0.55rem;
        }
        .footer-contact svg { color: var(--primary); flex-shrink: 0; }
        .footer-links a:hover,
        .footer-contact a:hover { color: #fff; }
        .footer-newsletter p {
          color: var(--text-muted);
          font-size: 0.9rem;
          margin-bottom: 1rem;
          line-height: 1.6;
        }
        .newsletter-form { display: flex; gap: 0.5rem; }
        .newsletter-form input { flex: 1; min-width: 0; }
        .newsletter-form :global(.btn-primary) { padding: 0.7rem 1.1rem; font-size: 0.85rem; white-space: nowrap; }
        .footer-bottom {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 2rem;
          border-top: 1px solid var(--border);
          flex-wrap: wrap;
          gap: 1rem;
        }
        .footer-bottom p { color: var(--text-dim); font-size: 0.85rem; }
        .footer-legal { display: flex; gap: 0.75rem; align-items: center; }
        .footer-legal a { color: var(--text-dim); font-size: 0.85rem; transition: color 0.2s ease; }
        .footer-legal a:hover { color: #fff; }
        .footer-legal span { color: var(--text-dim); }

        @media (max-width: 900px) {
          .footer-grid { grid-template-columns: 1fr 1fr; gap: 2rem; }
        }
        @media (max-width: 560px) {
          .footer-grid { grid-template-columns: 1fr; text-align: left; }
          .footer-bottom { flex-direction: column; align-items: flex-start; }
        }
      `}</style>
    </footer>
  );
}
