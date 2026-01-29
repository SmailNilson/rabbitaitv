'use client';

import { useState } from 'react';
import { siteConfig } from '@/config/site';

const features = [
  '+ 20K Live TV Channel',
  '+ 120K Movies & Series',
  'Updated Movies & Series',
  'SD / HD / FULL HD / 4K',
  'Netflix / Disney+ / HBO',
  'NBA, NFL, MLB, ESPN+',
  'Adults Option',
];

// Base prices for 1 device
const basePrices = [
  { duration: 1, name: '1 MONTH', price: 8.99 },
  { duration: 3, name: '3 MONTHS', price: 24.99 },
  { duration: 6, name: '6 MONTHS', price: 39.99 },
  { duration: 12, name: '12 MONTHS', price: 49.99, popular: true },
];

// Price multipliers for additional devices
const deviceMultipliers: { [key: number]: number } = {
  1: 1,
  2: 1.8,
  3: 2.5,
  4: 3.2,
  5: 3.8,
};

export function PricingSection() {
  const [selectedDevices, setSelectedDevices] = useState(1);

  const getPrice = (basePrice: number) => {
    const calculated = (basePrice * deviceMultipliers[selectedDevices]).toFixed(2);
    return parseFloat(calculated) < 10 ? `0${calculated}` : calculated;
  };

  return (
    <section className="pricing-section">
      <div className="container">
        {/* Device Selector Tabs */}
        <div className="device-tabs">
          {[1, 2, 3, 4, 5].map((deviceCount) => (
            <button
              key={deviceCount}
              className={`device-tab ${selectedDevices === deviceCount ? 'active' : ''}`}
              onClick={() => setSelectedDevices(deviceCount)}
            >
              {deviceCount} DEVICE{deviceCount > 1 ? 'S' : ''}
            </button>
          ))}
        </div>

        {/* Pricing Grid */}
        <div className="pricing-grid">
          {basePrices.map((plan, index) => (
            <div
              key={plan.duration}
              className={`pricing-card ${plan.popular ? 'popular' : ''}`}
            >
              {plan.popular && <div className="popular-badge">Le plus populaire</div>}

              <h3 className="plan-duration">{plan.name}</h3>
              <div className="plan-price">{getPrice(plan.price)} $</div>
              <p className="plan-tagline">Everything You Get With Premium, Plus :</p>

              <ul className="features-list">
                {features.map((feature, i) => (
                  <li key={i}>
                    <span className="check-icon">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>

              <a
                href={`https://api.whatsapp.com/send?phone=${siteConfig.contact.whatsapp}&text=Hi! I'm interested in the ${plan.name} plan for ${selectedDevices} device(s) at $${getPrice(plan.price)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="select-btn"
              >
                Select
              </a>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .pricing-section {
          padding: 4rem 1.5rem;
          background: #0D0D0D;
        }
        
        .container {
          max-width: 1300px;
          margin: 0 auto;
        }
        
        .device-tabs {
          display: flex;
          justify-content: center;
          gap: 0.5rem;
          margin-bottom: 3rem;
          flex-wrap: wrap;
        }
        
        .device-tab {
          padding: 0.75rem 1.5rem;
          border: 2px solid #333;
          background: transparent;
          color: white;
          font-size: 0.9rem;
          font-weight: 600;
          cursor: pointer;
          border-radius: 8px;
          transition: all 0.3s ease;
        }
        
        .device-tab:hover {
          border-color: #F20732;
          color: #F20732;
        }
        
        .device-tab.active {
          background: #F20732;
          border-color: #F20732;
          color: white;
        }
        
        .pricing-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.5rem;
        }
        
        .pricing-card {
          background: #FFFFFF;
          border-radius: 20px;
          padding: 2.5rem 2rem;
          text-align: center;
          position: relative;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        
        .pricing-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
        }
        
        .pricing-card.popular {
          transform: scale(1.05);
          z-index: 10;
        }
        
        .pricing-card.popular:hover {
          transform: scale(1.05) translateY(-5px);
        }
        
        .popular-badge {
          position: absolute;
          top: -15px;
          left: 50%;
          transform: translateX(-50%);
          background: #F20732;
          color: white;
          padding: 0.5rem 1.5rem;
          border-radius: 25px;
          font-size: 0.85rem;
          font-weight: 600;
          white-space: nowrap;
          box-shadow: 0 4px 6px rgba(242, 7, 50, 0.3);
        }
        
        .plan-duration {
          color: #1a1a1a;
          font-size: 1.5rem;
          font-weight: 500;
          margin-bottom: 0.5rem;
          text-transform: uppercase;
          letter-spacing: 1px;
        }
        
        .plan-price {
          color: #1a1a1a;
          font-size: 2.5rem;
          font-weight: 500;
          margin-bottom: 1.5rem;
        }
        
        .plan-tagline {
          color: #333;
          font-size: 0.9rem;
          margin-bottom: 2rem;
          line-height: 1.5;
          text-align: left;
        }
        
        .features-list {
          list-style: none;
          padding: 0;
          margin: 0 0 2rem 0;
          text-align: left;
        }
        
        .features-list li {
          color: #1a1a1a;
          padding: 0.4rem 0;
          font-size: 0.85rem;
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-weight: 600;
        }
        
        .check-icon {
          color: #1a1a1a;
          font-weight: bold;
          font-size: 1.1rem;
        }
        
        .select-btn {
          display: block;
          width: 100%;
          padding: 0.875rem 2rem;
          background: #F20732;
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          text-decoration: none;
          text-align: center;
          transition: all 0.3s ease;
        }
        
        .select-btn:hover {
          background: #d10629;
          transform: scale(1.02);
        }
        
        @media (max-width: 1024px) {
          .pricing-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        
        @media (max-width: 640px) {
          .pricing-grid {
            grid-template-columns: 1fr;
          }
          
          .device-tabs {
            gap: 0.5rem;
          }
          
          .device-tab {
            padding: 0.5rem 1rem;
            font-size: 0.8rem;
          }
        }
      `}</style>
    </section>
  );
}
