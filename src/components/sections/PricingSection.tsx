'use client';

import Link from 'next/link';
import { siteConfig } from '@/config/site';

export function PricingSection() {
  return (
    <section className="pricing-section" aria-labelledby="pricing-heading">
      <div className="container">
        <header className="pricing-header">
          <p className="eyebrow">Plans</p>
          <h2 id="pricing-heading" className="title">Pick your plan</h2>
          <p className="subtitle">Cancel anytime · 30-day money-back guarantee.</p>
        </header>

        <div className="pricing-grid">
          {siteConfig.plans.map((plan) => {
            const monthly = (plan.price / plan.duration).toFixed(2);
            return (
              <div
                key={plan.id}
                className={`plan-card ${plan.popular ? 'popular' : ''}`}
              >
                {plan.popular && (
                  <span className="popular-badge">Most popular</span>
                )}

                <h3 className="plan-name">{plan.name}</h3>

                <div className="price-block">
                  <span className="original-price">${plan.originalPrice}</span>
                  <span className="current-price">${plan.price}</span>
                  <span className="monthly-price">${monthly} / month</span>
                </div>

                <span className="save-chip">Save 50%</span>

                <ul className="features">
                  {plan.features.map((feature, i) => (
                    <li key={i}>
                      <svg
                        className="check"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        aria-hidden="true"
                      >
                        <path
                          d="M20 6L9 17l-5-5"
                          stroke="var(--primary)"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href="/free-trial"
                  className={plan.popular ? 'btn-primary' : 'btn-ghost'}
                >
                  {plan.popular ? 'Start now' : 'Choose plan'}
                </Link>
              </div>
            );
          })}
        </div>

        <p className="pricing-note">
          Prices are per connection. Need more screens at once? Message us on WhatsApp.
        </p>
      </div>

      <style jsx>{`
        .pricing-section {
          padding: 5rem 1.5rem;
          background: var(--background);
        }

        .container {
          max-width: var(--container-max, 1200px);
          margin: 0 auto;
        }

        .pricing-header {
          text-align: center;
          margin-bottom: 3rem;
        }

        .eyebrow {
          text-transform: uppercase;
          letter-spacing: 0.12em;
          font-size: 0.8rem;
          font-weight: 600;
          color: var(--primary);
          margin: 0 0 0.75rem;
        }

        .title {
          font-family: var(--font-heading);
          font-size: clamp(1.9rem, 4vw, 2.6rem);
          font-weight: 800;
          color: var(--text);
          margin: 0 0 0.75rem;
        }

        .subtitle {
          color: var(--text-muted);
          font-size: 1rem;
          margin: 0;
        }

        .pricing-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 1rem;
          align-items: stretch;
        }

        .plan-card {
          position: relative;
          display: flex;
          flex-direction: column;
          background: var(--card);
          border: 1px solid var(--border);
          border-radius: 16px;
          padding: 1.25rem;
        }

        .plan-card.popular {
          border: 2px solid var(--primary);
          background: rgba(242, 7, 50, 0.06);
        }

        .popular-badge {
          position: absolute;
          top: -0.75rem;
          left: 50%;
          transform: translateX(-50%);
          background: var(--primary);
          color: #fff;
          font-size: 0.72rem;
          font-weight: 700;
          padding: 0.3rem 0.85rem;
          border-radius: 999px;
          white-space: nowrap;
          letter-spacing: 0.02em;
        }

        .plan-name {
          font-family: var(--font-heading);
          font-size: 1.05rem;
          font-weight: 700;
          color: var(--text);
          margin: 0.25rem 0 1rem;
        }

        .price-block {
          display: flex;
          flex-direction: column;
          gap: 0.15rem;
          margin-bottom: 0.85rem;
        }

        .original-price {
          color: var(--text-dim);
          text-decoration: line-through;
          font-size: 0.9rem;
        }

        .current-price {
          font-family: var(--font-heading);
          font-weight: 800;
          font-size: 1.7rem;
          color: var(--text);
          line-height: 1.1;
        }

        .monthly-price {
          color: var(--gold);
          font-size: 0.85rem;
          font-weight: 600;
        }

        .save-chip {
          align-self: flex-start;
          background: var(--gold-soft);
          color: var(--gold);
          font-size: 0.72rem;
          font-weight: 700;
          padding: 0.25rem 0.6rem;
          border-radius: 999px;
          margin-bottom: 1.1rem;
        }

        .features {
          list-style: none;
          padding: 0;
          margin: 0 0 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
        }

        .features li {
          display: flex;
          align-items: flex-start;
          gap: 0.55rem;
          color: var(--text-muted);
          font-size: 0.88rem;
          line-height: 1.4;
        }

        .check {
          flex-shrink: 0;
          margin-top: 0.1rem;
        }

        .plan-card :global(.btn-primary),
        .plan-card :global(.btn-ghost) {
          width: 100%;
          margin-top: auto;
          text-align: center;
        }

        .pricing-note {
          text-align: center;
          color: var(--text-dim);
          font-size: 0.8rem;
          margin: 2rem auto 0;
          max-width: 38rem;
        }
      `}</style>
    </section>
  );
}
