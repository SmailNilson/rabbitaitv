'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';

const sportsContent = [
  {
    image: '/images/WWE-1920x1080-1efcbd6baf.jpg',
    alt: 'WWE Live',
    title: 'WWE'
  },
  {
    image: '/images/LEAGUEPASS_SEO.webp',
    alt: 'NBA League Pass',
    title: 'NBA League Pass'
  },
  {
    image: '/images/channels4_profile-removebg-preview-1.png',
    alt: 'Premier League',
    title: 'Premier League'
  },
];

export function SportsSection() {
  const [activeSlide, setActiveSlide] = useState(0);

  // Auto-rotation every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % sportsContent.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="sports-section">
      <div className="container">
        <h2 className="section-label">Sports & Events</h2>

        <div className="sports-card">
          <h3>LIVE Sports</h3>
          <p>The LIVE sports you love all in one place, including the NFL, Premier League, Big Ten Football, and WWE.</p>

          {/* Carousel */}
          <div className="carousel-container">
            <div
              className="carousel-track"
              style={{ transform: `translateX(-${activeSlide * 100}%)` }}
            >
              {sportsContent.map((sport, index) => (
                <div key={index} className="carousel-slide">
                  <div className="sports-grid">
                    {sportsContent.map((s, i) => (
                      <div key={i} className="sport-item">
                        <Image
                          src={s.image}
                          alt={s.alt}
                          fill
                          style={{ objectFit: 'cover' }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Dots */}
          <div className="sports-dots">
            {sportsContent.map((_, index) => (
              <button
                key={index}
                className={`dot ${index === activeSlide ? 'active' : ''}`}
                onClick={() => setActiveSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
                .sports-section {
                    padding: 4rem 1.5rem;
                    background: #0D0D0D;
                }
                
                .container {
                    max-width: 1200px;
                    margin: 0 auto;
                }
                
                .section-label {
                    color: rgba(255, 255, 255, 0.6);
                    font-size: 0.9rem;
                    margin-bottom: 1rem;
                }
                
                .sports-card {
                    background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
                    border-radius: 16px;
                    padding: 2rem;
                    overflow: hidden;
                }
                
                .sports-card h3 {
                    color: white;
                    font-size: 1.5rem;
                    margin-bottom: 0.75rem;
                }
                
                .sports-card p {
                    color: rgba(255, 255, 255, 0.7);
                    font-size: 0.95rem;
                    margin-bottom: 1.5rem;
                }

                .carousel-container {
                    overflow: hidden;
                    border-radius: 12px;
                }

                .carousel-track {
                    display: flex;
                    transition: transform 0.6s ease-in-out;
                }

                .carousel-slide {
                    min-width: 100%;
                    flex-shrink: 0;
                }
                
                .sports-grid {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 1rem;
                }
                
                .sport-item {
                    position: relative;
                    aspect-ratio: 16/10;
                    border-radius: 12px;
                    overflow: hidden;
                    transition: transform 0.3s ease, box-shadow 0.3s ease;
                }

                .sport-item:hover {
                    transform: scale(1.02);
                    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
                }
                
                .sports-dots {
                    display: flex;
                    justify-content: center;
                    gap: 0.5rem;
                    margin-top: 1.5rem;
                }
                
                .dot {
                    width: 10px;
                    height: 10px;
                    border-radius: 50%;
                    background: rgba(255, 255, 255, 0.3);
                    border: none;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    padding: 0;
                }

                .dot:hover {
                    background: rgba(255, 255, 255, 0.5);
                }
                
                .dot.active {
                    background: #F20732;
                    width: 24px;
                    border-radius: 5px;
                }
                
                @media (max-width: 768px) {
                    .sports-grid {
                        grid-template-columns: 1fr;
                    }
                }
            `}</style>
    </section>
  );
}
