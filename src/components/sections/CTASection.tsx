'use client';

import Link from 'next/link';
import { siteConfig } from '@/config/site';

export default function CTASection() {
  return (
    <section className="cta-section">
      <div className="container">
        {/* Badge */}
        <div className="badge">
          <span className="pulse-dot"></span>
          Limited Time Offer
        </div>

        {/* Headline */}
        <h2 className="headline">
          Ready to Start <span className="gradient-text">Streaming?</span>
        </h2>

        {/* Subheadline */}
        <p className="subheadline">
          Join 10,000+ satisfied customers enjoying premium IPTV service.
          Get 50% off all plans today!
        </p>

        {/* CTA Buttons */}
        <div className="cta-buttons">
          <Link href="/pricing" className="btn-primary">
            Get Started Now →
          </Link>
          <Link href="/free-trial" className="btn-trial">
            🎁 Free Trial
          </Link>
          <a
            href={siteConfig.contact.whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-whatsapp"
          >
            💬 Chat on WhatsApp
          </a>
        </div>

        {/* Trust Indicators */}
        <div className="trust-indicators">
          <span>✓ No contract required</span>
          <span>✓ Money-back guarantee</span>
          <span>✓ Instant activation</span>
        </div>
      </div>

      <style jsx>{`
        .cta-section {
          padding: 5rem 1.5rem;
          background: #0D0D0D;
          text-align: center;
          position: relative;
          overflow: hidden;
        }
        
        .cta-section::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 600px;
          height: 600px;
          background: radial-gradient(circle, rgba(242, 7, 50, 0.1) 0%, transparent 70%);
          pointer-events: none;
        }
        
        .container {
          max-width: 800px;
          margin: 0 auto;
          position: relative;
          z-index: 10;
        }
        
        .badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: rgba(242, 7, 50, 0.2);
          color: #F20732;
          padding: 0.5rem 1rem;
          border-radius: 50px;
          font-size: 0.875rem;
          font-weight: 600;
          margin-bottom: 1.5rem;
        }
        
        .pulse-dot {
          width: 8px;
          height: 8px;
          background: #F20732;
          border-radius: 50%;
          animation: pulse 2s infinite;
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.2); }
        }
        
        .headline {
          font-size: clamp(2rem, 5vw, 3.5rem);
          font-weight: 700;
          color: white;
          margin-bottom: 1rem;
        }
        
        .gradient-text {
          background: linear-gradient(135deg, #CB9500 0%, #F20732 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        .subheadline {
          color: rgba(255, 255, 255, 0.7);
          font-size: 1.125rem;
          margin-bottom: 2.5rem;
          line-height: 1.6;
        }
        
        .cta-buttons {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 1rem;
          margin-bottom: 2.5rem;
        }
        
        .btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: #F20732;
          color: white;
          padding: 1rem 2rem;
          border-radius: 12px;
          font-size: 1.1rem;
          font-weight: 600;
          text-decoration: none;
          transition: all 0.3s ease;
        }
        
        .btn-primary:hover {
          background: #d10629;
          transform: translateY(-2px);
          box-shadow: 0 10px 30px rgba(242, 7, 50, 0.3);
        }
        
        .btn-whatsapp {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: #25D366;
          color: white;
          padding: 1rem 2rem;
          border-radius: 12px;
          font-size: 1.1rem;
          font-weight: 600;
          text-decoration: none;
          transition: all 0.3s ease;
        }
        
        .btn-whatsapp:hover {
          background: #20BD5A;
          transform: translateY(-2px);
        }
        
        .trust-indicators {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 1.5rem;
          color: rgba(255, 255, 255, 0.5);
          font-size: 0.9rem;
        }
        
        @media (max-width: 640px) {
          .cta-buttons {
            flex-direction: column;
          }
          
          .btn-primary, .btn-whatsapp {
            width: 100%;
            justify-content: center;
          }
          
          .trust-indicators {
            flex-direction: column;
            gap: 0.75rem;
          }
        }
      `}</style>
    </section>
  );
}
