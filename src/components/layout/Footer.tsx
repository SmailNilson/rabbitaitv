'use client';

import Link from 'next/link';
import Image from 'next/image';
import { siteConfig } from '@/config/site';

export function Footer() {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-grid">
                    {/* Logo & Description */}
                    <div className="footer-brand">
                        <Image
                            src="/images/logo.png"
                            alt="Rabbit IPTV"
                            width={140}
                            height={40}
                            style={{ objectFit: 'contain' }}
                        />
                        <p>
                            Experience premium IPTV streaming with over 120K+ channels,
                            movies, and series. The best entertainment at affordable prices.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div className="footer-links">
                        <h4>Quick Links</h4>
                        <ul>
                            {siteConfig.navigation.map((item) => (
                                <li key={item.name}>
                                    <Link href={item.href}>{item.name}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div className="footer-contact">
                        <h4>Contact Us</h4>
                        <ul>
                            <li>
                                <a
                                    href={`https://api.whatsapp.com/send?phone=${siteConfig.contact.whatsapp}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    📱 WhatsApp: +1 (757) 535-7760
                                </a>
                            </li>
                            <li>
                                <a href={`mailto:${siteConfig.contact.email}`}>
                                    ✉️ {siteConfig.contact.email}
                                </a>
                            </li>
                            <li>
                                <span>📍 {siteConfig.contact.address}</span>
                            </li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div className="footer-newsletter">
                        <h4>Stay Updated</h4>
                        <p>Subscribe for the latest updates and exclusive offers.</p>
                        <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
                            <input type="email" placeholder="Your email address" />
                            <button type="submit">Subscribe</button>
                        </form>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p>© {new Date().getFullYear()} Rabbit AI TV. All rights reserved.</p>
                    <div className="footer-legal">
                        <Link href="/privacy-policy">Privacy Policy</Link>
                        <span>|</span>
                        <Link href="/terms">Terms of Service</Link>
                    </div>
                </div>
            </div>

            <style jsx>{`
        .footer {
          background: #0a0a0a;
          padding: 4rem 1.5rem 2rem;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .container {
          max-width: 1200px;
          margin: 0 auto;
        }
        
        .footer-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 2.5rem;
          margin-bottom: 3rem;
        }
        
        .footer-brand p {
          color: rgba(255, 255, 255, 0.6);
          font-size: 0.9rem;
          margin-top: 1rem;
          line-height: 1.6;
        }
        
        .footer-links h4,
        .footer-contact h4,
        .footer-newsletter h4 {
          color: white;
          font-size: 1.1rem;
          margin-bottom: 1rem;
        }
        
        .footer-links ul,
        .footer-contact ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        
        .footer-links li,
        .footer-contact li {
          margin-bottom: 0.75rem;
        }
        
        .footer-links a,
        .footer-contact a,
        .footer-contact span {
          color: rgba(255, 255, 255, 0.6);
          font-size: 0.9rem;
          transition: color 0.3s ease;
        }
        
        .footer-links a:hover,
        .footer-contact a:hover {
          color: white;
        }
        
        .footer-newsletter p {
          color: rgba(255, 255, 255, 0.6);
          font-size: 0.9rem;
          margin-bottom: 1rem;
        }
        
        .newsletter-form {
          display: flex;
          gap: 0.5rem;
        }
        
        .newsletter-form input {
          flex: 1;
          padding: 0.75rem 1rem;
          background: #1a1a1a;
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 6px;
          color: white;
          font-size: 0.9rem;
        }
        
        .newsletter-form input::placeholder {
          color: rgba(255, 255, 255, 0.4);
        }
        
        .newsletter-form button {
          padding: 0.75rem 1.25rem;
          background: #F20732;
          color: white;
          border: none;
          border-radius: 6px;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.3s ease;
        }
        
        .newsletter-form button:hover {
          background: #d10629;
        }
        
        .footer-bottom {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 2rem;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          flex-wrap: wrap;
          gap: 1rem;
        }
        
        .footer-bottom p {
          color: rgba(255, 255, 255, 0.5);
          font-size: 0.85rem;
        }
        
        .footer-legal {
          display: flex;
          gap: 1rem;
          align-items: center;
        }
        
        .footer-legal a {
          color: rgba(255, 255, 255, 0.5);
          font-size: 0.85rem;
          transition: color 0.3s ease;
        }
        
        .footer-legal a:hover {
          color: white;
        }
        
        .footer-legal span {
          color: rgba(255, 255, 255, 0.3);
        }
        
        @media (max-width: 768px) {
          .footer-grid {
            grid-template-columns: 1fr;
            text-align: center;
          }
          
          .newsletter-form {
            flex-direction: column;
          }
          
          .footer-bottom {
            flex-direction: column;
            text-align: center;
          }
        }
      `}</style>
        </footer>
    );
}
