'use client';

type League = {
  name: string;
  tag: string;
  icon: 'football' | 'basketball' | 'baseball' | 'star' | 'soccer' | 'trophy';
  live?: boolean;
};

const leagues: League[] = [
  { name: 'NFL', tag: 'Sunday Night Football', icon: 'football', live: true },
  { name: 'NBA', tag: 'Regular season & playoffs', icon: 'basketball' },
  { name: 'MLB', tag: 'Every team, every inning', icon: 'baseball' },
  { name: 'ESPN+', tag: 'Exclusive live events', icon: 'star' },
  { name: 'Premier League', tag: 'Matchday, live in 4K', icon: 'soccer', live: true },
  { name: 'UEFA Champions League', tag: 'Europe’s biggest nights', icon: 'trophy' },
];

function LeagueIcon({ icon }: { icon: League['icon'] }) {
  const common = {
    width: 28,
    height: 28,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.8,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    'aria-hidden': true,
  };

  switch (icon) {
    case 'football':
      return (
        <svg {...common}>
          <path d="M4 4c8 0 16 8 16 16C12 20 4 12 4 4Z" />
          <path d="M9 9l6 6M11 8l5 5M8 11l5 5" />
        </svg>
      );
    case 'basketball':
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
          <path d="M3 12h18M12 3v18M5.6 5.6c3.6 3.6 9.2 3.6 12.8 0M5.6 18.4c3.6-3.6 9.2-3.6 12.8 0" />
        </svg>
      );
    case 'baseball':
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
          <path d="M6.5 5.5c2 2 2 11 0 13M17.5 5.5c-2 2-2 11 0 13" />
        </svg>
      );
    case 'star':
      return (
        <svg {...common}>
          <path d="M12 3l2.6 5.6 6 .8-4.4 4.2 1.1 6L12 16.9 6.7 19.6l1.1-6L3.4 9.4l6-.8L12 3Z" />
        </svg>
      );
    case 'soccer':
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
          <path d="M12 8l3.2 2.3-1.2 3.7h-4l-1.2-3.7L12 8ZM12 8V3.2M15.2 10.3l4.4-1.6M13.9 14l2.8 3.6M10.1 14l-2.8 3.6M8.8 10.3L4.4 8.7" />
        </svg>
      );
    case 'trophy':
      return (
        <svg {...common}>
          <path d="M7 4h10v4a5 5 0 0 1-10 0V4Z" />
          <path d="M17 5h2.5a2.5 2.5 0 0 1-2.5 4M7 5H4.5A2.5 2.5 0 0 0 7 9" />
          <path d="M12 13v3M9 20h6M10 16h4v4h-4Z" />
        </svg>
      );
  }
}

export function SportsSection() {
  return (
    <section className="sports-section" aria-labelledby="sports-heading">
      <div className="container">
        <header className="intro">
          <span className="eyebrow">
            <span className="eyebrow-dot" aria-hidden="true" />
            Live sports
          </span>
          <h2 id="sports-heading">Never miss a game</h2>
          <p className="subtitle">Every major league, every match — live and in HD/4K.</p>
        </header>

        <ul className="grid" role="list">
          {leagues.map((league) => (
            <li key={league.name} className="card">
              <div className="card-top">
                <span className="icon-wrap" aria-hidden="true">
                  <LeagueIcon icon={league.icon} />
                </span>
                {league.live && (
                  <span className="live-pill">
                    <span className="live-dot" aria-hidden="true" />
                    live
                  </span>
                )}
              </div>
              <h3 className="card-name">{league.name}</h3>
              <p className="card-tag">{league.tag}</p>
            </li>
          ))}
        </ul>

        <div className="cta-row">
          <a href="/free-trial" className="btn-primary">
            Start watching sports
          </a>
        </div>
      </div>

      <style jsx>{`
        .sports-section {
          padding: 5rem 1.5rem;
          background: var(--surface);
        }

        .container {
          max-width: var(--container-max, 1200px);
          margin: 0 auto;
        }

        .intro {
          text-align: center;
          max-width: 640px;
          margin: 0 auto 3rem;
        }

        .eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.78rem;
          font-weight: 600;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--text-muted);
          padding: 0.4rem 0.85rem;
          border: 1px solid var(--border);
          border-radius: 999px;
          background: var(--card);
        }

        .eyebrow-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: var(--primary);
          box-shadow: 0 0 0 0 rgba(242, 7, 50, 0.5);
          animation: pulse 2s ease-out infinite;
        }

        .intro h2 {
          font-family: var(--font-heading, inherit);
          color: var(--text);
          font-size: clamp(1.9rem, 4vw, 2.75rem);
          line-height: 1.1;
          margin: 1.1rem 0 0.75rem;
        }

        .subtitle {
          color: var(--text-muted);
          font-size: 1.05rem;
          line-height: 1.6;
          margin: 0;
        }

        .grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 1rem;
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .card {
          position: relative;
          background: var(--card);
          border: 1px solid var(--border);
          border-radius: 14px;
          padding: 1.35rem 1.4rem 1.5rem;
          overflow: hidden;
          transition: transform 0.25s ease, border-color 0.25s ease,
            box-shadow 0.25s ease;
        }

        .card::after {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(
            120% 80% at 100% 0%,
            var(--primary-soft) 0%,
            transparent 55%
          );
          opacity: 0;
          transition: opacity 0.25s ease;
          pointer-events: none;
        }

        .card:hover {
          transform: translateY(-4px);
          border-color: var(--border-strong);
          box-shadow: 0 16px 40px rgba(0, 0, 0, 0.4);
        }

        .card:hover::after {
          opacity: 1;
        }

        .card-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 1rem;
        }

        .icon-wrap {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 46px;
          height: 46px;
          border-radius: 12px;
          color: var(--gold);
          background: rgba(232, 177, 76, 0.1);
          border: 1px solid var(--border);
        }

        .live-pill {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--text);
          padding: 0.28rem 0.6rem;
          border-radius: 999px;
          background: var(--primary-soft);
          border: 1px solid rgba(242, 7, 50, 0.35);
        }

        .live-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--primary);
          box-shadow: 0 0 0 0 rgba(242, 7, 50, 0.5);
          animation: pulse 1.6s ease-out infinite;
        }

        .card-name {
          font-family: var(--font-heading, inherit);
          color: var(--text);
          font-size: 1.2rem;
          line-height: 1.25;
          margin: 0 0 0.35rem;
        }

        .card-tag {
          color: var(--text-muted);
          font-size: 0.9rem;
          line-height: 1.45;
          margin: 0;
        }

        .cta-row {
          display: flex;
          justify-content: center;
          margin-top: 2.75rem;
        }

        @keyframes pulse {
          0% {
            box-shadow: 0 0 0 0 rgba(242, 7, 50, 0.5);
          }
          70% {
            box-shadow: 0 0 0 8px rgba(242, 7, 50, 0);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(242, 7, 50, 0);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .eyebrow-dot,
          .live-dot {
            animation: none;
          }
          .card {
            transition: none;
          }
        }

        @media (max-width: 540px) {
          .sports-section {
            padding: 3.5rem 1.25rem;
          }
        }
      `}</style>
    </section>
  );
}
