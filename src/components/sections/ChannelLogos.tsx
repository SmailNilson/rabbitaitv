'use client';

import Image from 'next/image';

const marqueeLogos = [
  { src: '/images/logos/ABC_c.avif', alt: 'ABC' },
  { src: '/images/logos/cbs_2020_c.avif', alt: 'CBS' },
  { src: '/images/logos/nbc_c.avif', alt: 'NBC' },
  { src: '/images/logos/fox_c.avif', alt: 'FOX' },
  { src: '/images/logos/fx_c.avif', alt: 'FX' },
  { src: '/images/logos/espn-logo-new_c.avif', alt: 'ESPN' },
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
    <section className="logos-band">
      <p className="logos-label">All your platforms, one subscription</p>

      {/* Decorative marquee — logos are duplicated for the loop, so hide from a11y tree */}
      <div className="marquee" aria-hidden="true">
        <div className="marquee-track">
          {[...marqueeLogos, ...marqueeLogos].map((logo, index) => (
            <div key={index} className="marquee-logo">
              <Image
                src={logo.src}
                alt={logo.alt}
                width={120}
                height={40}
                style={{ objectFit: 'contain', width: 'auto', height: '100%' }}
                unoptimized
              />
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .logos-band {
          width: 100%;
          background: var(--surface, #141417);
          border-top: 1px solid var(--border, rgba(255, 255, 255, 0.09));
          border-bottom: 1px solid var(--border, rgba(255, 255, 255, 0.09));
          padding: 2.25rem 0;
          font-family: var(--font-primary, inherit);
          overflow: hidden;
        }

        .logos-label {
          text-align: center;
          font-size: 0.8rem;
          color: var(--text-dim, rgba(255, 255, 255, 0.42));
          letter-spacing: 0.12em;
          text-transform: uppercase;
          margin: 0 auto 1.75rem;
          padding: 0 1.5rem;
          max-width: var(--container-max, 1200px);
        }

        .marquee {
          position: relative;
          width: 100%;
          overflow: hidden;
          -webkit-mask-image: linear-gradient(
            to right,
            transparent,
            black 12%,
            black 88%,
            transparent
          );
          mask-image: linear-gradient(
            to right,
            transparent,
            black 12%,
            black 88%,
            transparent
          );
        }

        .marquee-track {
          display: flex;
          align-items: center;
          gap: 3.5rem;
          width: max-content;
          animation: marquee-scroll 30s linear infinite;
        }

        .marquee:hover .marquee-track {
          animation-play-state: paused;
        }

        .marquee-logo {
          flex: 0 0 auto;
          height: 34px;
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0.7;
          filter: grayscale(100%) brightness(1.1);
          transition: opacity 0.3s ease, filter 0.3s ease;
        }

        .marquee-logo:hover {
          opacity: 1;
          filter: grayscale(0%) brightness(1);
        }

        @keyframes marquee-scroll {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .marquee-track {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
}
