'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const stats: { value: string; label: string; gold?: boolean }[] = [
  { value: '20K+', label: 'Live channels' },
  { value: '120K+', label: 'Movies & series' },
  { value: '4K', label: 'Ultra HD', gold: true },
  { value: '24/7', label: 'Support' },
];

const thumbs = ['#10243B', '#0E3330', '#3A1220', '#2B2410'];

export function Hero() {
  // Defer the heavy hero video off the critical path: paint the optimized
  // poster immediately, then mount the autoplay video once the page is idle.
  const [showVideo, setShowVideo] = useState(false);
  useEffect(() => {
    const ric = (window as typeof window & {
      requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number;
    }).requestIdleCallback;
    if (ric) {
      ric(() => setShowVideo(true), { timeout: 2500 });
    } else {
      const t = setTimeout(() => setShowVideo(true), 1200);
      return () => clearTimeout(t);
    }
  }, []);

  return (
    <section className="hero">
      <div className="inner">
        <div className="grid">
          <div className="copy">
            <span className="eyebrow">#1 premium IPTV · 2026</span>
            <h1>
              Your favorite TV.
              <br />
              All of it, in <span className="accent">stunning 4K</span>.
            </h1>
            <p>
              20,000+ live channels and 120,000+ movies &amp; series — sports, Netflix,
              Disney+ and more, on every device, with zero buffering.
            </p>

            <div className="actions">
              <Link href="/free-trial" className="btn-primary">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M8 5v14l11-7z" />
                </svg>
                Start free trial
              </Link>
              <Link href="/pricing" className="btn-ghost">
                View pricing
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </Link>
            </div>

            <div className="trust">
              <span className="stars" aria-hidden="true">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg key={i} width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2l2.9 6.3 6.9.7-5.1 4.6 1.4 6.8L12 17.8 5.9 20.4l1.4-6.8L2.2 9l6.9-.7z" />
                  </svg>
                ))}
              </span>
              <span className="trust-text">4.9/5 · 12,800+ members · no card needed</span>
            </div>
          </div>

          <div className="preview">
            <div className="screen">
              <Image
                src="/images/blog/iptv-trends-2026.webp"
                alt=""
                fill
                priority
                sizes="(max-width: 900px) 100vw, 45vw"
                style={{ objectFit: 'cover' }}
                aria-hidden="true"
              />
              {showVideo && (
                <video autoPlay muted loop playsInline poster="/images/blog/iptv-trends-2026.webp">
                  <source src="/112024-motionwall-corner-extendttttttttttt.mp4" type="video/mp4" />
                </video>
              )}
              <div className="screen-grad" />
              <div className="badges">
                <span className="badge-live"><span className="dot" /> live</span>
                <span className="badge-4k">4K UHD</span>
              </div>
              <div className="caption">
                <div className="cap-title">Champions League · Final</div>
                <div className="cap-sub">ESPN · live now</div>
              </div>
            </div>
            <div className="thumbs">
              {thumbs.map((c) => (
                <div key={c} className="thumb" style={{ background: c }} />
              ))}
            </div>
            <div className="prev-foot">
              <span>20,000+ channels</span>
              <span>Updated daily</span>
            </div>
          </div>
        </div>

        <div className="stats">
          {stats.map((s) => (
            <div key={s.label} className="stat">
              <div className={`stat-value ${s.gold ? 'gold' : ''}`}>{s.value}</div>
              <div className="stat-label">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .hero {
          position: relative;
          padding: 3.5rem 1.5rem 4rem;
          background:
            radial-gradient(1100px 500px at 80% -10%, rgba(242, 7, 50, 0.1), transparent 60%),
            var(--background);
          overflow: hidden;
        }
        .inner { max-width: var(--container-max); margin: 0 auto; }
        .grid {
          display: grid;
          grid-template-columns: 1.1fr 0.9fr;
          gap: 2.5rem;
          align-items: center;
        }
        .copy h1 {
          font-family: var(--font-heading);
          font-size: clamp(2.1rem, 5vw, 3.4rem);
          font-weight: 800;
          line-height: 1.06;
          margin: 1rem 0 0;
          color: #fff;
        }
        .accent { color: var(--primary); }
        .copy p {
          font-size: 1.05rem;
          color: var(--text-muted);
          margin-top: 1.1rem;
          max-width: 44ch;
          line-height: 1.6;
        }
        .actions { display: flex; gap: 0.85rem; margin-top: 1.75rem; flex-wrap: wrap; }
        .trust { display: flex; align-items: center; gap: 0.6rem; margin-top: 1.5rem; flex-wrap: wrap; }
        .stars { display: inline-flex; gap: 1px; color: var(--gold); }
        .trust-text { font-size: 0.85rem; color: var(--text-muted); }

        .preview {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          padding: 0.6rem;
        }
        .screen {
          position: relative;
          aspect-ratio: 16 / 10;
          border-radius: var(--radius);
          overflow: hidden;
          background: #241030;
        }
        .screen video { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
        .screen-grad {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(0, 0, 0, 0.65) 0%, transparent 45%);
        }
        .badges {
          position: absolute;
          top: 0.7rem;
          left: 0.7rem;
          right: 0.7rem;
          display: flex;
          justify-content: space-between;
        }
        .badge-live {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          background: rgba(242, 7, 50, 0.92);
          color: #fff;
          font-size: 0.68rem;
          font-weight: 600;
          padding: 3px 9px;
          border-radius: 6px;
        }
        .badge-live .dot { width: 5px; height: 5px; border-radius: 50%; background: #fff; }
        .badge-4k {
          background: rgba(232, 177, 76, 0.16);
          color: var(--gold);
          border: 1px solid rgba(232, 177, 76, 0.3);
          font-size: 0.68rem;
          font-weight: 600;
          padding: 3px 9px;
          border-radius: 6px;
        }
        .caption { position: absolute; left: 0.85rem; bottom: 0.75rem; }
        .cap-title { font-size: 0.9rem; font-weight: 600; color: #fff; }
        .cap-sub { font-size: 0.75rem; color: rgba(255, 255, 255, 0.65); }
        .thumbs { display: grid; grid-template-columns: repeat(4, 1fr); gap: 0.5rem; margin-top: 0.5rem; }
        .thumb { height: 52px; border-radius: 10px; }
        .prev-foot {
          display: flex;
          justify-content: space-between;
          margin-top: 0.6rem;
          padding: 0 0.25rem;
          font-size: 0.72rem;
          color: var(--text-muted);
        }

        .stats {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 0.75rem;
          margin-top: 3rem;
        }
        .stat {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: var(--radius);
          padding: 1.1rem 1.2rem;
        }
        .stat-value { font-family: var(--font-heading); font-size: 1.5rem; font-weight: 800; color: #fff; }
        .stat-value.gold { color: var(--gold); }
        .stat-label { font-size: 0.85rem; color: var(--text-muted); margin-top: 0.15rem; }

        @media (max-width: 900px) {
          .grid { grid-template-columns: 1fr; gap: 2rem; }
        }
        @media (max-width: 560px) {
          .stats { grid-template-columns: 1fr 1fr; }
          .copy p { max-width: none; }
          .actions :global(.btn-primary),
          .actions :global(.btn-ghost) { flex: 1; }
        }
      `}</style>
    </section>
  );
}
