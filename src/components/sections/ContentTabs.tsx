'use client';

import { useState } from 'react';
import Image from 'next/image';

const tabs = ['JUST ADDED', 'NEW SERIES', 'NEW MOVIES'];

const contentData = {
    'JUST ADDED': [
        { image: '/images/devices/552-44.jpg', title: 'Eat Slay Love' },
        { image: '/images/devices/552-45.jpg', title: 'Mama June' },
        { image: '/images/devices/552-46.jpg', title: 'Eat Slay Love' },
        { image: '/images/devices/552-47.jpg', title: 'Fast & Furious' },
        { image: '/images/devices/552-48.jpg', title: 'Furious 7' },
        { image: '/images/devices/552-49.jpg', title: "Eve's Bayou" },
    ],
    'NEW SERIES': [
        { image: '/images/devices/552-50.jpg', title: 'New Series 1' },
        { image: '/images/devices/552-51.jpg', title: 'New Series 2' },
        { image: '/images/devices/552-52.jpg', title: 'New Series 3' },
        { image: '/images/devices/552-53.jpg', title: 'New Series 4' },
        { image: '/images/devices/552-54.jpg', title: 'New Series 5' },
        { image: '/images/devices/552-55.jpg', title: 'New Series 6' },
    ],
    'NEW MOVIES': [
        { image: '/images/devices/552-56.jpg', title: 'New Movie 1' },
        { image: '/images/devices/552-57.jpg', title: 'New Movie 2' },
        { image: '/images/devices/552-58.jpg', title: 'New Movie 3' },
        { image: '/images/devices/552-59.jpg', title: 'New Movie 4' },
        { image: '/images/devices/552-44.jpg', title: 'New Movie 5' },
        { image: '/images/devices/552-45.jpg', title: 'New Movie 6' },
    ],
};

export function ContentTabs() {
    const [activeTab, setActiveTab] = useState('JUST ADDED');

    return (
        <section className="content-tabs-section">
            {/* Tab Headers */}
            <div className="tabs-header">
                {tabs.map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`tab-button ${activeTab === tab ? 'active' : ''}`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* Content Grid */}
            <div className="content-grid">
                {contentData[activeTab as keyof typeof contentData].map((item, index) => (
                    <div key={index} className="content-card">
                        <div className="content-image">
                            <Image
                                src={item.image}
                                alt={item.title}
                                fill
                                style={{ objectFit: 'cover' }}
                            />
                            <div className="content-overlay">
                                <span className="play-icon">▶</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <style jsx>{`
        .content-tabs-section {
          padding: 3rem 1.5rem;
          background: #0D0D0D;
        }
        
        .tabs-header {
          display: flex;
          justify-content: center;
          gap: 1rem;
          margin-bottom: 2rem;
          flex-wrap: wrap;
        }
        
        .tab-button {
          padding: 0.75rem 2rem;
          background: transparent;
          border: none;
          color: rgba(255, 255, 255, 0.6);
          font-size: 0.9rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          position: relative;
        }
        
        .tab-button::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 0;
          height: 2px;
          background: #F20732;
          transition: width 0.3s ease;
        }
        
        .tab-button.active {
          color: white;
        }
        
        .tab-button.active::after {
          width: 100%;
        }
        
        .tab-button:hover {
          color: white;
        }
        
        .content-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
          gap: 1rem;
          max-width: 1200px;
          margin: 0 auto;
        }
        
        .content-card {
          position: relative;
          border-radius: 8px;
          overflow: hidden;
          aspect-ratio: 2/3;
          cursor: pointer;
        }
        
        .content-image {
          position: relative;
          width: 100%;
          height: 100%;
        }
        
        .content-overlay {
          position: absolute;
          inset: 0;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        
        .content-card:hover .content-overlay {
          opacity: 1;
        }
        
        .play-icon {
          width: 50px;
          height: 50px;
          background: rgba(242, 7, 50, 0.9);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 1.25rem;
        }
        
        @media (max-width: 768px) {
          .content-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }
      `}</style>
        </section>
    );
}
