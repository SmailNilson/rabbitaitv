'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { siteConfig } from '@/config/site';

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const isActive = (href: string): boolean =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  return (
    <header className={`nav ${scrolled ? 'scrolled' : ''}`}>
      <div className="inner">
        <Link href="/" className="logo" aria-label="RabbitAI TV — home">
          <Image
            src="/images/logo.png"
            alt="RabbitAI TV"
            width={120}
            height={30}
            style={{ height: '30px', width: 'auto', objectFit: 'contain' }}
            priority
          />
        </Link>

        <nav className="links" aria-label="Primary">
          {siteConfig.navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`link ${isActive(item.href) ? 'active' : ''}`}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="right">
          <Link href="/free-trial" className="cta">Free trial</Link>
          <button
            className="burger"
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen(!open)}
          >
            <span /><span /><span />
          </button>
        </div>
      </div>

      <div className={`panel ${open ? 'open' : ''}`} role="dialog" aria-modal="true">
        <div className="panel-backdrop" onClick={() => setOpen(false)} />
        <div className="panel-card">
          <div className="panel-head">
            <Image src="/images/logo.png" alt="RabbitAI TV" width={110} height={28} style={{ height: '28px', width: 'auto', objectFit: 'contain' }} />
            <button className="panel-close" aria-label="Close menu" onClick={() => setOpen(false)}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            </button>
          </div>
          <nav className="panel-links" aria-label="Mobile">
            {siteConfig.navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`panel-link ${isActive(item.href) ? 'active' : ''}`}
                onClick={() => setOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </nav>
          <Link href="/free-trial" className="panel-cta" onClick={() => setOpen(false)}>
            Start free trial
          </Link>
        </div>
      </div>

      <style jsx>{`
        .nav {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          height: var(--nav-height);
          display: flex;
          align-items: center;
          background: rgba(10, 10, 11, 0.82);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border-bottom: 1px solid var(--border);
          transition: background 0.3s ease, box-shadow 0.3s ease;
        }
        .nav.scrolled {
          background: rgba(10, 10, 11, 0.95);
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.5);
        }
        .inner {
          width: 100%;
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 1.5rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
        }
        .logo { display: flex; align-items: center; }
        .links { display: flex; align-items: center; gap: 1.75rem; }
        .link {
          font-size: 0.85rem;
          font-weight: 500;
          color: var(--text-muted);
          position: relative;
          padding: 0.25rem 0;
          transition: color 0.2s ease;
        }
        .link:hover { color: #fff; }
        .link.active { color: #fff; }
        .link.active::after {
          content: '';
          position: absolute;
          left: 0;
          right: 0;
          bottom: -4px;
          height: 2px;
          background: var(--primary);
          border-radius: 2px;
        }
        .right { display: flex; align-items: center; gap: 0.85rem; }
        .cta {
          background: var(--primary);
          color: #fff;
          font-weight: 700;
          font-size: 0.85rem;
          padding: 0.6rem 1.15rem;
          border-radius: 11px;
          transition: background 0.2s ease, transform 0.2s ease;
        }
        .cta:hover { background: var(--primary-hover); transform: translateY(-1px); }
        .burger {
          display: none;
          flex-direction: column;
          gap: 5px;
          background: none;
          border: none;
          cursor: pointer;
          padding: 6px;
        }
        .burger span { width: 24px; height: 2px; background: #fff; border-radius: 2px; }

        .panel { position: fixed; inset: 0; z-index: 1100; visibility: hidden; pointer-events: none; }
        .panel.open { visibility: visible; pointer-events: auto; }
        .panel-backdrop {
          position: absolute;
          inset: 0;
          background: rgba(0, 0, 0, 0.6);
          backdrop-filter: blur(4px);
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        .panel.open .panel-backdrop { opacity: 1; }
        .panel-card {
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          width: min(86%, 340px);
          background: #0c0c0e;
          border-left: 1px solid var(--border);
          padding: 1.5rem;
          transform: translateX(100%);
          transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);
          display: flex;
          flex-direction: column;
        }
        .panel.open .panel-card { transform: translateX(0); }
        .panel-head { display: flex; align-items: center; justify-content: space-between; margin-bottom: 2rem; }
        .panel-close { background: none; border: none; color: var(--text-muted); cursor: pointer; }
        .panel-links { display: flex; flex-direction: column; }
        .panel-link {
          font-size: 1.1rem;
          font-weight: 500;
          color: var(--text-muted);
          padding: 0.85rem 0;
          border-bottom: 1px solid var(--border);
          transition: color 0.2s ease;
        }
        .panel-link:hover { color: #fff; }
        .panel-link.active { color: var(--primary); }
        .panel-cta {
          margin-top: auto;
          background: var(--primary);
          color: #fff;
          text-align: center;
          font-weight: 700;
          padding: 1rem;
          border-radius: 12px;
        }

        @media (max-width: 900px) {
          .links { display: none; }
          .burger { display: flex; }
        }

        /* styled-jsx does not scope <Link>/<Image> components; target them via
           :global() under the scoped native ancestors (.nav / .panel).
           NOTE: var() does not resolve inside :global() in this setup — use literals. */
        .nav :global(.logo) { display: flex; align-items: center; }
        .nav :global(.link) {
          font-size: 0.85rem;
          font-weight: 500;
          color: rgba(255, 255, 255, 0.66);
          position: relative;
          padding: 0.25rem 0;
          transition: color 0.2s ease;
        }
        .nav :global(.link):hover { color: #fff; }
        .nav :global(.link.active) { color: #fff; }
        .nav :global(.link.active)::after {
          content: '';
          position: absolute;
          left: 0;
          right: 0;
          bottom: -4px;
          height: 2px;
          background: #F20732;
          border-radius: 2px;
        }
        .nav :global(.cta) {
          background: #F20732;
          color: #fff;
          font-weight: 700;
          font-size: 0.85rem;
          padding: 0.6rem 1.15rem;
          border-radius: 11px;
          transition: background 0.2s ease, transform 0.2s ease;
        }
        .nav :global(.cta):hover { background: #d10629; transform: translateY(-1px); }
        .panel :global(.panel-link) {
          display: block;
          font-size: 1.1rem;
          font-weight: 500;
          color: rgba(255, 255, 255, 0.66);
          padding: 0.85rem 0;
          border-bottom: 1px solid rgba(255, 255, 255, 0.09);
          transition: color 0.2s ease;
        }
        .panel :global(.panel-link):hover { color: #fff; }
        .panel :global(.panel-link.active) { color: #F20732; }
        .panel :global(.panel-cta) {
          display: block;
          margin-top: auto;
          background: #F20732;
          color: #fff;
          text-align: center;
          font-weight: 700;
          padding: 1rem;
          border-radius: 12px;
        }
      `}</style>
    </header>
  );
}
