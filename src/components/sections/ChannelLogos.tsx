'use client';

import Image from 'next/image';

const channelLogos = [
  { src: '/images/logos/ABC_c.avif', alt: 'ABC' },
  { src: '/images/logos/cbs_2020_c.avif', alt: 'CBS' },
  { src: '/images/logos/nbc_c.avif', alt: 'NBC' },
  { src: '/images/logos/fox_c.avif', alt: 'FOX' },
  { src: '/images/logos/fx_c.avif', alt: 'FX' },
  { src: '/images/logos/espn-logo-new_c.avif', alt: 'ESPN' },
];

const brandLogos = [
  { src: '/images/brand_item21-150x46-1.webp', alt: 'Videoland' },
  { src: '/images/brand_item05-150x46-1.webp', alt: 'NLZiet' },
  { src: '/images/brand_item06-150x46-1.webp', alt: 'Netflix' },
  { src: '/images/brand_item08-150x46-1.webp', alt: 'Film1' },
  { src: '/images/brand_item09-150x46-1.webp', alt: 'HBO' },
  { src: '/images/brand_item10-150x46-1.webp', alt: 'Fox' },
  { src: '/images/brand_item11.webp', alt: 'F1' },
  { src: '/images/brand_item12.webp', alt: 'Viaplay' },
  { src: '/images/brand_item13-150x46-1.webp', alt: 'Hulu' },
  { src: '/images/brand_item14-150x46-1.webp', alt: 'Eurosport' },
  { src: '/images/brand_item15-150x46-1.webp', alt: 'BeIN' },
  { src: '/images/brand_item16-150x46-1.webp', alt: 'DSTV' },
  { src: '/images/brand_item18-150x46-1.webp', alt: 'OSN' },
  { src: '/images/brand_item22-150x46-1.webp', alt: 'Shahid' },
];

export function ChannelLogos() {
  return (
    <section className="channel-logos-section">
      {/* Promo Banner */}
      <div className="promo-banner">
        <h2>Enjoy 4K IPTV at Half the Price – 50% Off All Plans!</h2>
        <p>Sign up today for a convenient and unmatched experience.</p>
      </div>

      {/* Channel Logos Grid */}
      <div className="channel-grid">
        {channelLogos.map((logo, index) => (
          <div key={index} className="channel-logo-item">
            <Image
              src={logo.src}
              alt={logo.alt}
              width={80}
              height={80}
              style={{ objectFit: 'contain' }}
              unoptimized
            />
          </div>
        ))}
        <div className="channel-logo-item more">
          <span>+MORE</span>
        </div>
      </div>

      {/* Brand Logos Carousel */}
      <div className="brand-carousel-container">
        <div className="brand-carousel">
          {[...brandLogos, ...brandLogos].map((logo, index) => (
            <div key={index} className="brand-logo-item">
              <Image
                src={logo.src}
                alt={logo.alt}
                width={120}
                height={46}
                style={{ objectFit: 'contain' }}
              />
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .channel-logos-section {
          padding: 3rem 1.5rem;
          background: #0D0D0D;
        }
        
        .promo-banner {
          text-align: center;
          margin-bottom: 2rem;
        }
        
        .promo-banner h2 {
          font-size: clamp(1.25rem, 3vw, 1.75rem);
          color: white;
          margin-bottom: 0.5rem;
        }
        
        .promo-banner p {
          color: rgba(255, 255, 255, 0.7);
          font-size: 0.95rem;
        }
        
        .channel-grid {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 1rem;
          max-width: 600px;
          margin: 0 auto 3rem;
        }
        
        .channel-logo-item {
          width: 90px;
          height: 90px;
          background: white;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 12px;
          transition: transform 0.3s ease;
        }
        
        .channel-logo-item:hover {
          transform: scale(1.05);
        }
        
        .channel-logo-item.more {
          background: linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }
        
        .channel-logo-item.more span {
          color: white;
          font-weight: 600;
          font-size: 0.9rem;
        }
        
        .brand-carousel-container {
          overflow: hidden;
          mask-image: linear-gradient(
            to right,
            transparent,
            black 10%,
            black 90%,
            transparent
          );
        }
        
        .brand-carousel {
          display: flex;
          gap: 3rem;
          animation: scroll 30s linear infinite;
          width: max-content;
        }
        
        .brand-logo-item {
          flex-shrink: 0;
          opacity: 0.85;
          transition: all 0.3s ease;
        }
        
        .brand-logo-item:hover {
          opacity: 1;
          transform: scale(1.1);
        }
        
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </section>
  );
}
