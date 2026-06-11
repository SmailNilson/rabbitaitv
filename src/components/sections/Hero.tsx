'use client';

import Link from 'next/link';
import { siteConfig } from '@/config/site';

export function Hero() {
  return (
    <section className="hero-section">
      {/* Video Background */}
      <div className="hero-video-container">
        <video
          autoPlay
          muted
          loop
          playsInline
          poster="/images/blog/iptv-trends-2026.webp"
          className="hero-video"
        >
          <source src="/112024-motionwall-corner-extendttttttttttt.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Gradient Overlay */}
      <div className="hero-overlay"></div>

      {/* Content */}
      <div className="hero-content">
        <h1 className="hero-title">
          Best 4K IPTV Service for Streaming
        </h1>
        <p className="hero-subtitle">
          Unlock Endless Entertainment – Thousands of Global Channels, Movies, Series Await!
        </p>

        <div className="hero-buttons">
          <Link href="/pricing" className="btn-primary">
            Get Started
          </Link>
          <Link href="/free-trial" className="btn-trial">
            🎁 Free Trial
          </Link>
          <a
            href={`https://api.whatsapp.com/send?phone=${siteConfig.contact.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary"
          >
            Contact Us
          </a>
        </div>
      </div>

      <style jsx>{`
        .hero-section {
          position: relative;
          height: 100vh;
          min-height: 600px;
          max-height: 900px;
          overflow: hidden;
        }
        
        .hero-video-container {
          position: absolute;
          inset: 0;
          overflow: hidden;
        }
        
        .hero-video {
          position: absolute;
          top: 50%;
          left: 50%;
          min-width: 100%;
          min-height: 100%;
          width: auto;
          height: auto;
          transform: translate(-50%, -50%);
          object-fit: cover;
        }
        
        .hero-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to bottom,
            rgba(0, 0, 0, 0.3) 0%,
            rgba(0, 0, 0, 0.5) 50%,
            rgba(13, 13, 13, 1) 100%
          );
        }
        
        .hero-content {
          position: relative;
          z-index: 10;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100%;
          text-align: center;
          padding: 0 1.5rem;
          padding-top: 80px;
        }
        
        .hero-title {
          font-size: clamp(2.5rem, 6vw, 4rem);
          font-weight: 700;
          color: white;
          margin-bottom: 1rem;
          text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.5);
        }
        
        .hero-subtitle {
          font-size: clamp(1rem, 2vw, 1.25rem);
          color: rgba(255, 255, 255, 0.9);
          margin-bottom: 2rem;
          max-width: 600px;
          text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.5);
        }
        
        .hero-buttons {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
          justify-content: center;
        }
      `}</style>
    </section>
  );
}
