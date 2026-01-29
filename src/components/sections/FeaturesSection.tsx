'use client';

const features = [
    {
        icon: '📺',
        title: '120K+ Channels',
        description: 'Access over 120,000 live TV channels from around the world, including sports, news, entertainment, and more.'
    },
    {
        icon: '🎬',
        title: 'Movies & Series',
        description: 'Enjoy 100,000+ VOD content including the latest movies and TV series updated daily.'
    },
    {
        icon: '4K',
        title: '4K Ultra HD Quality',
        description: 'Stream in stunning 4K resolution with SD, HD, Full HD, and 4K quality options.'
    },
    {
        icon: '⚡',
        title: '99.9% Uptime',
        description: 'Reliable streaming with minimal buffering and maximum uptime guarantee.'
    },
    {
        icon: '📱',
        title: 'Multi-Device Support',
        description: 'Watch on up to 5 devices simultaneously - Smart TV, Phone, Tablet, PC, or Streaming Box.'
    },
    {
        icon: '🔧',
        title: 'Easy Setup',
        description: 'Simple installation with step-by-step guides and 24/7 customer support.'
    },
];

export function FeaturesSection() {
    return (
        <section className="features-section">
            <div className="container">
                <h2 className="section-title">WHY CHOOSE US?</h2>
                <p className="section-subtitle">
                    We provide the best IPTV experience with unmatched quality and support
                </p>

                <div className="features-grid">
                    {features.map((feature, index) => (
                        <div key={index} className="feature-card">
                            <div className="feature-icon">{feature.icon}</div>
                            <h3>{feature.title}</h3>
                            <p>{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>

            <style jsx>{`
        .features-section {
          padding: 4rem 1.5rem;
          background: #0D0D0D;
        }
        
        .container {
          max-width: 1200px;
          margin: 0 auto;
        }
        
        .section-title {
          text-align: center;
          color: white;
          font-size: clamp(1.5rem, 3vw, 2rem);
          margin-bottom: 0.75rem;
        }
        
        .section-subtitle {
          text-align: center;
          color: rgba(255, 255, 255, 0.7);
          margin-bottom: 3rem;
        }
        
        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 1.5rem;
        }
        
        .feature-card {
          background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
          border-radius: 12px;
          padding: 2rem;
          text-align: center;
          transition: transform 0.3s ease;
        }
        
        .feature-card:hover {
          transform: translateY(-5px);
        }
        
        .feature-icon {
          font-size: 2.5rem;
          margin-bottom: 1rem;
        }
        
        .feature-card h3 {
          color: white;
          font-size: 1.25rem;
          margin-bottom: 0.75rem;
        }
        
        .feature-card p {
          color: rgba(255, 255, 255, 0.7);
          font-size: 0.95rem;
          line-height: 1.6;
        }
        
        @media (max-width: 768px) {
          .features-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
        </section>
    );
}
