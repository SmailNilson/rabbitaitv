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
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const leftNav = siteConfig.navigation.slice(0, Math.ceil(siteConfig.navigation.length / 2));
  const rightNav = siteConfig.navigation.slice(Math.ceil(siteConfig.navigation.length / 2));

  return (
        <header className={`nav-cosmic ${isScrolled ? 'scrolled' : ''}`}>
            <div className="nav-cosmic-container">
                <nav className="nav-cosmic-dock">
                    {/* Left Intelligence Side */}
                    <div className="nav-side left">
                        <ul className="nav-link-group">
                            {leftNav.map((item) => (
                                <li key={item.name}>
                                    <Link href={item.href} className="nav-cosmic-link">
                                        {item.name}
                                        <span className="link-glitch-line"></span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Central Brand Core */}
                    <div className="nav-center">
                        <Link href="/" className="cosmic-logo-orb">
                            <div className="logo-pulse"></div>
                            <Image
                                src="/images/logo.png"
                                alt="RabbitAI"
                                width={110}
                                height={28}
                                style={{ objectFit: 'contain' }}
                                priority
                            />
                        </Link>
                    </div>

                    {/* Right Intelligence Side */}
                    <div className="nav-side right">
                        <ul className="nav-link-group">
                            {rightNav.map((item) => (
                                <li key={item.name}>
                                    <Link href={item.href} className="nav-cosmic-link">
                                        {item.name}
                                        <span className="link-glitch-line"></span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                        <Link 
                            href="/pricing" 
                            className="nav-cosmic-cta desktop-only"
                            style={{ 
                                background: '#FF0000', 
                                color: '#FFFFFF', 
                                padding: '10px 24px', 
                                borderRadius: '14px',
                                fontWeight: '800',
                                fontSize: '0.85rem',
                                textTransform: 'uppercase',
                                letterSpacing: '0.05em',
                                display: 'inline-flex',
                                alignItems: 'center',
                                textDecoration: 'none',
                                boxShadow: '0 4px 15px rgba(255, 0, 0, 0.4)'
                            }}
                        >
                            Get Started
                        </Link>

                        {/* Mobile List/Menu Icon */}
                        <button
                            className="mobile-cosmic-toggle"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            aria-label="Toggle system"
                        >
                            <div className={`burger-icon-grid ${isMobileMenuOpen ? 'active' : ''}`}>
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                        </button>
                    </div>
                </nav>
            </div>

            {/* Futuristic Side Panel Meta (Mobile) */}
            <div className={`cosmic-panel-overlay ${isMobileMenuOpen ? 'visible' : ''}`}>
               <div className="panel-blur-node" onClick={() => setIsMobileMenuOpen(false)}></div>
               <div className="cosmic-panel-content">
                  <div className="panel-top">
                     <Image src="/images/logo.png" alt="RabbitAI" width={100} height={25} style={{ objectFit: 'contain' }} />
                     <button onClick={() => setIsMobileMenuOpen(false)} className="panel-close-node">
                       <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6 6 18M6 6l12 12"/></svg>
                     </button>
                  </div>
                  <div className="panel-nodes">
                     {siteConfig.navigation.map((item, index) => (
                        <Link 
                           key={item.name} 
                           href={item.href} 
                           className="node-link"
                           style={{ '--index': index } as React.CSSProperties}
                           onClick={() => setIsMobileMenuOpen(false)}
                        >
                           <span className="node-id">0{index + 1}</span>
                           <span className="node-text">{item.name}</span>
                        </Link>
                     ))}
                  </div>
                  <div className="panel-base">
                     <Link href="/pricing" className="panel-node-cta" onClick={() => setIsMobileMenuOpen(false)}>
                        Get Started
                     </Link>
                  </div>
               </div>
            </div>

            <style jsx>{`
        .nav-cosmic {
          position: fixed !important;
          top: 0 !important;
          left: 0 !important;
          width: 100% !important;
          z-index: 9999 !important;
          padding: 0;
          background: #0D0D0D;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .nav-cosmic-container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0.5rem 2rem;
          transition: height 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .nav-cosmic-dock {
          display: grid;
          grid-template-columns: 1fr auto 1fr;
          align-items: center;
          background: transparent;
          border: none;
          border-radius: 0;
          padding: 0.5rem 0;
          transition: all 0.4s ease;
          box-shadow: none;
        }

        .nav-cosmic.scrolled .nav-cosmic-dock {
          background: rgba(13, 13, 13, 0.92);
          backdrop-filter: blur(15px);
          -webkit-backdrop-filter: blur(15px);
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.6);
          border-color: rgba(255, 255, 255, 0.05);
        }

        .nav-cosmic.scrolled .nav-cosmic-container {
          height: 60px;
          padding: 0 2rem;
        }

        .nav-cosmic.scrolled .cosmic-logo-orb img {
          transform: scale(0.85);
        }

        .cosmic-logo-orb img {
          transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .nav-side {
          display: flex;
          align-items: center;
        }

        .nav-side.right {
          justify-content: flex-end;
          gap: 2rem;
        }

        .nav-link-group {
          display: flex;
          list-style: none;
          gap: 2.5rem;
          margin: 0;
          padding: 0;
        }

        .nav-cosmic-link {
          color: rgba(255, 255, 255, 0.7) !important;
          font-size: 0.9rem;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          position: relative;
          padding: 0.5rem 0;
          transition: 0.3s ease;
        }

        .nav-cosmic-link:hover {
          color: white !important;
          text-shadow: 0 0 10px rgba(255,255,255,0.3);
        }

        .link-glitch-line {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0;
          height: 1.5px;
          background: var(--primary);
          box-shadow: 0 0 15px var(--primary);
          transition: width 0.4s cubic-bezier(0.19, 1, 0.22, 1);
        }

        .nav-cosmic-link:hover .link-glitch-line {
          width: 100%;
        }

        /* Central Brand Core */
        .nav-center {
          display: flex;
          justify-content: center;
          padding: 0 2rem;
        }

        .cosmic-logo-orb {
          position: relative;
          z-index: 10;
          transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        .cosmic-logo-orb:hover {
          transform: scale(1.1);
        }

        .logo-pulse {
          position: absolute;
          width: 200%;
          height: 200%;
          left: -50%;
          top: -50%;
          background: radial-gradient(circle, rgba(242, 7, 50, 0.1) 0%, transparent 70%);
          opacity: 0;
          transition: opacity 0.4s ease;
          pointer-events: none;
        }

        .cosmic-logo-orb:hover .logo-pulse {
          opacity: 1;
        }

        /* Modern CTA */
        .nav-cosmic-cta {
          background: #FF0000 !important;
          color: #fff !important;
          padding: 0.7rem 1.75rem;
          border-radius: 14px;
          font-weight: 800;
          font-size: 0.9rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          position: relative;
          overflow: hidden;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(255, 0, 0, 0.4);
        }

        .nav-cosmic-cta:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(255, 0, 0, 0.5);
          background: #FF3333 !important;
        }

        .nav-cosmic-cta:active {
          transform: translateY(1px);
          box-shadow: 0 4px 10px rgba(255, 0, 0, 0.6), inset 0 2px 4px rgba(0,0,0,0.2);
          transition: all 0.1s ease;
          background: #CC0000 !important;
        }

        .cta-glimmer {
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
          transform: translateX(-100%);
          transition: transform 0.6s ease;
        }

        .nav-cosmic-cta:hover .cta-glimmer {
          transform: translateX(100%);
        }

        /* Mobile Cosmetics */
        .mobile-cosmic-toggle {
          display: none;
          background: none;
          border: none;
          padding: 0;
          cursor: pointer;
        }

        .burger-icon-grid {
          width: 28px;
          height: 18px;
          position: relative;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          transition: 0.3s ease;
        }

        .burger-icon-grid span {
          width: 100%;
          height: 2px;
          background: #fff;
          border-radius: 10px;
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          box-shadow: 0 0 10px rgba(255,255,255,0.2);
        }

        .burger-icon-grid span:nth-child(2) {
          width: 75%;
          align-self: flex-end;
        }

        .burger-icon-grid.active span:nth-child(1) {
          transform: translateY(8px) rotate(45deg);
        }

        .burger-icon-grid.active span:nth-child(2) {
          opacity: 0;
          transform: translateX(10px);
        }

        .burger-icon-grid.active span:nth-child(3) {
          transform: translateY(-8px) rotate(-45deg);
        }

        /* Mobile Center Panel */
        .cosmic-panel-overlay {
          position: fixed;
          inset: 0;
          z-index: 10000;
          visibility: hidden;
          pointer-events: none;
          transition: 0.3s ease;
        }

        .cosmic-panel-overlay.visible {
          visibility: visible;
          pointer-events: all;
        }

        .panel-blur-node {
          position: absolute;
          inset: 0;
          background: rgba(0,0,0,0.6);
          backdrop-filter: blur(10px);
          opacity: 0;
          transition: 0.5s ease;
        }

        .visible .panel-blur-node {
          opacity: 1;
        }

        .cosmic-panel-content {
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          width: 100%;
          max-width: 380px;
          background: #0a0a0a;
          border-left: 1px solid rgba(255, 255, 255, 0.1);
          transform: translateX(100%);
          transition: 0.6s cubic-bezier(0.16, 1, 0.3, 1);
          padding: 3rem 2rem;
          display: flex;
          flex-direction: column;
        }

        .visible .cosmic-panel-content {
          transform: translateX(0);
        }

        .panel-top {
           display: flex;
           justify-content: space-between;
           align-items: center;
           margin-bottom: 4rem;
        }

        .panel-close-node {
           background: none;
           border: none;
           color: white;
           opacity: 0.5;
        }

        .panel-nodes {
           display: flex;
           flex-direction: column;
           gap: 1.5rem;
           flex-grow: 1;
        }

        .node-link {
           display: flex;
           align-items: center;
           gap: 1.5rem;
           color: white !important;
           text-decoration: none;
           opacity: 0;
           transform: translateX(20px);
           transition: 0.5s ease calc(var(--index) * 0.05s);
        }

        .visible .node-link {
           opacity: 1;
           transform: translateX(0);
        }

        .node-id {
           font-family: monospace;
           color: var(--primary);
           font-size: 0.8rem;
        }

        .node-text {
           font-size: 1.8rem;
           font-weight: 700;
        }

        .panel-base {
           margin-top: 2rem;
        }

        .panel-node-cta {
           display: block;
           background: #FF0000 !important;
           color: white !important;
           padding: 1.25rem;
           border-radius: 16px;
           text-align: center;
           font-weight: 800;
           box-shadow: 0 10px 30px rgba(255, 0, 0, 0.4);
           text-transform: uppercase;
           letter-spacing: 0.05em;
        }

        @media (max-width: 1100px) {
          .nav-cosmic-container {
             padding: 0 1rem;
          }

          .nav-cosmic-dock {
             display: flex;
             justify-content: space-between;
             padding: 0.5rem 0.75rem;
             border-radius: 16px;
             grid-template-columns: none;
          }

          .nav-side {
             display: none;
          }

          /* Show only the essential actions on ultra-mobile */
          .nav-side.right {
             display: flex;
             gap: 0.75rem;
          }
          
          .nav-side.right .nav-link-group {
             display: none;
          }

          .desktop-only {
             display: none !important; /* Force hide on mobile devices */
          }

          .nav-center {
             padding: 0;
             flex-grow: 1;
             justify-content: flex-start;
          }

          .mobile-cosmic-toggle {
             display: block;
          }

          .nav-cosmic {
             padding: 0.75rem 0;
          }
        }
      `}</style>
        </header>




  );
}
