'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { siteConfig } from '@/config/site';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <nav className="nav-container">
        {/* Logo */}
        <Link href="/" className="logo">
          <Image
            src="/images/logo.png"
            alt="Rabbit IPTV"
            width={120}
            height={32}
            style={{ objectFit: 'contain' }}
          />
        </Link>

        {/* Desktop Menu */}
        <ul className="nav-links">
          {siteConfig.navigation.map((item, index) => (
            <li key={item.name}>
              <Link href={item.href} className="nav-link">
                {item.name}
              </Link>
              {index < siteConfig.navigation.length - 1 && (
                <span className="nav-separator">|</span>
              )}
            </li>
          ))}
        </ul>

        {/* CTA Button */}
        <Link href="/pricing" className="nav-cta">
          Get Started
        </Link>

        {/* Mobile Menu Button */}
        <button
          className="mobile-menu-btn"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <span className={`hamburger ${isMobileMenuOpen ? 'open' : ''}`}></span>
        </button>
      </nav>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}>
        <div className="mobile-menu-inner">
          <div className="mobile-menu-header">
            <Link href="/" onClick={() => setIsMobileMenuOpen(false)}>
              <Image
                src="/images/logo.png"
                alt="Rabbit IPTV"
                width={120}
                height={32}
                style={{ objectFit: 'contain' }}
              />
            </Link>
          </div>

          <ul className="mobile-nav-list">
            {siteConfig.navigation.map((item, index) => (
              <li key={item.name} style={{ '--index': index } as React.CSSProperties}>
                <Link
                  href={item.href}
                  className="mobile-nav-item"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <span className="mobile-nav-icon">
                    {item.name === 'Home' && <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>}
                    {item.name === 'Pricing' && <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect width="20" height="14" x="2" y="5" rx="2" /><line x1="2" x2="22" y1="10" y2="10" /></svg>}
                    {item.name === 'Setup Guide' && <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" /><path d="M8 6h10" /><path d="M8 10h10" /><path d="M8 14h10" /></svg>}
                    {item.name === 'Channels List' && <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect width="7" height="7" x="3" y="3" rx="1" /><rect width="7" height="7" x="14" y="3" rx="1" /><rect width="7" height="7" x="14" y="14" rx="1" /><rect width="7" height="7" x="3" y="14" rx="1" /></svg>}
                    {item.name === 'Blog' && <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2" /><path d="M18 14h-8" /><path d="M15 18h-5" /><path d="M10 6h8v4h-8V6Z" /></svg>}
                    {item.name === 'Reseller' && <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>}
                  </span>
                  {item.name}
                  <svg className="chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6" /></svg>
                </Link>
              </li>
            ))}
          </ul>

          <div className="mobile-menu-footer">
            <Link
              href="/pricing"
              className="mobile-cta-premium"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Get Started Now
            </Link>
            <div className="mobile-contact">
              <p>Need help?</p>
              <a href={`https://wa.me/${siteConfig.contact.whatsapp.replace('+', '')}`} className="whatsapp-link">
                Contact Support
              </a>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .logo {
          z-index: 1001;
          display: flex;
          align-items: center;
        }
        
        .mobile-menu-btn {
          display: none;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          cursor: pointer;
          width: 44px;
          height: 44px;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1001;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .mobile-menu-btn:active {
          transform: scale(0.9);
        }
        
        .hamburger {
          display: block;
          width: 20px;
          height: 1.5px;
          background: white;
          position: relative;
          transition: all 0.3s ease;
        }
        
        .hamburger::before,
        .hamburger::after {
          content: '';
          position: absolute;
          width: 20px;
          height: 1.5px;
          background: white;
          left: 0;
          transition: all 0.3s ease;
        }
        
        .hamburger::before {
          top: -6px;
        }
        
        .hamburger::after {
          top: 6px;
        }
        
        .hamburger.open {
          background: transparent;
        }
        
        .hamburger.open::before {
          transform: rotate(45deg);
          top: 0;
        }
        
        .hamburger.open::after {
          transform: rotate(-45deg);
          top: 0;
        }
        
        .mobile-menu {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(13, 13, 13, 0.85);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          z-index: 1000;
          opacity: 0;
          visibility: hidden;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .mobile-menu.open {
          opacity: 1;
          visibility: visible;
        }

        .mobile-menu-inner {
          height: 100%;
          display: flex;
          flex-direction: column;
          padding: 6rem 2rem 3rem;
          overflow-y: auto;
        }

        .mobile-menu-header {
            margin-bottom: 2rem;
            opacity: 0;
            transform: translateY(-20px);
            transition: all 0.5s ease 0.1s;
        }

        .mobile-menu.open .mobile-menu-header {
            opacity: 1;
            transform: translateY(0);
        }
        
        .mobile-nav-list {
          list-style: none;
          padding: 0;
          margin: 0;
          flex-grow: 1;
        }
        
        .mobile-nav-list li {
          opacity: 0;
          transform: translateX(20px);
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          transition-delay: calc(0.1s + (var(--index) * 0.05s));
        }

        .mobile-menu.open .mobile-nav-list li {
          opacity: 1;
          transform: translateX(0);
        }
        
        .mobile-nav-item {
          display: flex;
          align-items: center;
          padding: 1.25rem 0;
          color: white;
          font-size: 1.25rem;
          font-weight: 600;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
          transition: all 0.2s ease;
        }

        .mobile-nav-item:active {
            color: #F20732;
            padding-left: 0.5rem;
        }

        .mobile-nav-icon {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 40px;
            height: 40px;
            background: rgba(242, 7, 50, 0.1);
            color: #F20732;
            border-radius: 10px;
            margin-right: 1rem;
        }

        .chevron {
            margin-left: auto;
            opacity: 0.3;
        }
        
        .mobile-menu-footer {
          margin-top: 2rem;
          opacity: 0;
          transform: translateY(20px);
          transition: all 0.5s ease 0.4s;
        }

        .mobile-menu.open .mobile-menu-footer {
          opacity: 1;
          transform: translateY(0);
        }

        .mobile-cta-premium {
          display: block;
          background: linear-gradient(135deg, #F20732 0%, #d10629 100%);
          color: white;
          padding: 1.25rem;
          border-radius: 16px;
          text-align: center;
          font-weight: 700;
          font-size: 1.1rem;
          box-shadow: 0 10px 30px rgba(242, 7, 50, 0.3);
          margin-bottom: 2rem;
          transition: all 0.3s ease;
        }

        .mobile-cta-premium:active {
            transform: scale(0.98);
        }

        .mobile-contact {
            text-align: center;
        }

        .mobile-contact p {
            color: rgba(255, 255, 255, 0.5);
            font-size: 0.9rem;
            margin-bottom: 0.5rem;
        }

        .whatsapp-link {
            color: #F20732;
            font-weight: 600;
            text-decoration: underline;
        }
        
        @media (max-width: 768px) {
          .mobile-menu-btn {
            display: flex;
          }
          
          .nav-links, .nav-cta {
            display: none !important;
          }
        }
      `}</style>
    </header>
  );
}
