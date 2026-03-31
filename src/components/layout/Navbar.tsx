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

        </header>
    );
}
