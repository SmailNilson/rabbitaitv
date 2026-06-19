'use client';

import { useState } from 'react';
import { siteConfig } from '@/config/site';

// Price multipliers for additional simultaneous connections (devices)
const deviceMultipliers: { [key: number]: number } = {
  1: 1,
  2: 1.8,
  3: 2.5,
  4: 3.2,
  5: 3.8,
};

const waPhone = siteConfig.contact.whatsapp.replace(/\D/g, '');

export function PricingSection() {
  const [devices, setDevices] = useState(1);
  const mult = deviceMultipliers[devices];

  return (
    <section className="pricing-section" aria-labelledby="pricing-heading">
      <div className="container">
        <header className="pricing-header">
          <p className="eyebrow">Plans</p>
          <h2 id="pricing-heading" className="title">Pick your plan</h2>
          <p className="subtitle">Cancel anytime · 30-day money-back guarantee.</p>
        </header>

        {/* Device (connection) selector */}
        <div className="device-tabs" role="tablist" aria-label="Number of devices">
          {[1, 2, 3, 4, 5].map((n) => (
            <button
              key={n}
              role="tab"
              aria-selected={devices === n}
              className={`device-tab ${devices === n ? 'active' : ''}`}
              onClick={() => setDevices(n)}
            >
              {n} device{n > 1 ? 's' : ''}
            </button>
          ))}
        </div>

        <div className="pricing-grid">
          {siteConfig.plans.map((plan) => {
            const price = (plan.price * mult).toFixed(2);
            const original = (plan.originalPrice * mult).toFixed(2);
            const monthly = ((plan.price * mult) / plan.duration).toFixed(2);
            const waText = encodeURIComponent(
              `Hi! I'm interested in the ${plan.name} plan for ${devices} device${devices > 1 ? 's' : ''} at $${price}`
            );
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
                  <span className="original-price">${original}</span>
                  <span className="current-price">${price}</span>
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

                <a
                  href={`https://api.whatsapp.com/send?phone=${waPhone}&text=${waText}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={plan.popular ? 'btn-primary' : 'btn-ghost'}
                >
                  {plan.popular ? 'Start now' : 'Choose plan'}
                </a>
              </div>
            );
          })}
        </div>

        <p className="pricing-note">
          Prices shown are for {devices} simultaneous device{devices > 1 ? 's' : ''}. Need a custom setup? Message us on WhatsApp.
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
          margin-bottom: 2rem;
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

        .device-tabs {
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin-bottom: 2.5rem;
        }

        .device-tab {
          background: var(--surface);
          border: 1px solid var(--border);
          color: var(--text-muted);
          padding: 0.6rem 1.1rem;
          border-radius: 999px;
          font-family: inherit;
          font-weight: 600;
          font-size: 0.85rem;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .device-tab:hover {
          border-color: var(--border-strong);
          color: #fff;
        }

        .device-tab.active {
          background: var(--primary);
          border-color: var(--primary);
          color: #fff;
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
