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
        <ul>
          {siteConfig.navigation.map((item) => (
            <li key={item.name}>
              <Link
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            </li>
          ))}
          <li>
            <Link
              href="/pricing"
              className="mobile-cta"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Get Started
            </Link>
          </li>
        </ul>
      </div>

      <style jsx>{`
        .logo {
          z-index: 10;
        }
        
        .mobile-menu-btn {
          display: none;
          background: none;
          border: none;
          cursor: pointer;
          padding: 0.5rem;
          z-index: 10;
        }
        
        .hamburger {
          display: block;
          width: 24px;
          height: 2px;
          background: white;
          position: relative;
          transition: all 0.3s ease;
        }
        
        .hamburger::before,
        .hamburger::after {
          content: '';
          position: absolute;
          width: 24px;
          height: 2px;
          background: white;
          left: 0;
          transition: all 0.3s ease;
        }
        
        .hamburger::before {
          top: -7px;
        }
        
        .hamburger::after {
          top: 7px;
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
          display: none;
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(13, 13, 13, 0.98);
          padding: 6rem 2rem 2rem;
          transform: translateX(100%);
          transition: transform 0.3s ease;
        }
        
        .mobile-menu.open {
          transform: translateX(0);
        }
        
        .mobile-menu ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        
        .mobile-menu li {
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .mobile-menu a {
          display: block;
          padding: 1rem 0;
          color: white;
          font-size: 1.1rem;
        }
        
        .mobile-cta {
          display: block;
          background: #F20732;
          color: white;
          padding: 1rem;
          border-radius: 8px;
          text-align: center;
          margin-top: 1rem;
          font-weight: 600;
        }
        
        @media (max-width: 768px) {
          .mobile-menu-btn {
            display: block;
          }
          
          .mobile-menu {
            display: block;
          }
        }
      `}</style>
    </header>
  );
}
