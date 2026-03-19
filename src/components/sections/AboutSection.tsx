'use client';

import Image from 'next/image';

export default function AboutSection() {
    return (
        <section className="about-section">
            <div className="container">
                <div className="about-content">
                    <div className="about-text">
                        {/* <h2 className="section-title">ABOUT RABBIT AI TV</h2> */}
                        <h3 className="highlight-text" style={{ marginTop: '50px' }} >Your Premium IPTV Provider</h3>
                        <p>
                            Welcome to <strong>Rabbit AI TV</strong>, the leading provider of high-quality IPTV streaming services.
                            Our mission is to bring you the best entertainment experience directly to your home or on the go,
                            at prices that are accessible to everyone.
                        </p>
                        <p>
                            With over 10 years of experience in the streaming industry, we have built a robust
                            infrastructure that ensures 99.9% uptime and crystal-clear 4K quality. Whether you're
                            a sports fan, a movie buff, or just looking for international news, we have
                            something for everyone.
                        </p>

                        <div className="stats-grid">
                            <div className="stat-item">
                                <span className="stat-value">20K+</span>
                                <span className="stat-label">Live Channels</span>
                            </div>
                            <div className="stat-item">
                                <span className="stat-value">120K+</span>
                                <span className="stat-label">VOD Content</span>
                            </div>
                            <div className="stat-item">
                                <span className="stat-value">4K</span>
                                <span className="stat-label">Quality Ready</span>
                            </div>
                            <div className="stat-item">
                                <span className="stat-value">24/7</span>
                                <span className="stat-label">Customer Support</span>
                            </div>
                        </div>
                    </div>

                    <div className="about-image">
                        <div className="image-wrapper">
                            <Image
                                src="/images/about-us.png"
                                alt="Rabbit AI TV Entertainment"
                                width={600}
                                height={400}
                                style={{ objectFit: 'cover', borderRadius: '20px' }}
                            />
                            <div className="image-overlay"></div>
                        </div>
                    </div>
                </div>

                <div className="vision-mission">
                    <div className="vision-card">
                        <h3>Our Vision</h3>
                        <p>To redefine home entertainment by providing global access to high-quality streaming content without borders or limitations.</p>
                    </div>
                    <div className="vision-card">
                        <h3>Our Mission</h3>
                        <p>Providing our customers with the most reliable, affordable, and comprehensive IPTV service in the market today.</p>
                    </div>
                </div>
            </div>

            <style jsx>{`
                .about-section {
                    padding: 8rem 1.5rem 4rem;
                    background: #0D0D0D;
                    min-height: 80vh;
                }
                
                .container {
                    max-width: 1200px;
                    margin: 0 auto;
                }
                
                .about-content {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 4rem;
                    align-items: center;
                    margin-bottom: 5rem;
                }
                
                .section-title {
                    color: #F20732;
                    font-size: 0.9rem;
                    font-weight: 700;
                    letter-spacing: 0.2rem;
                    margin-bottom: 1rem;
                }
                
                .highlight-text {
                    color: white;
                    font-size: clamp(2rem, 4vw, 3rem);
                    margin-bottom: 2rem;
                    line-height: 1.2;
                }
                
                .about-text p {
                    color: rgba(255, 255, 255, 0.7);
                    font-size: 1.1rem;
                    line-height: 1.8;
                    margin-bottom: 1.5rem;
                }
                
                .stats-grid {
                    display: grid;
                    grid-template-columns: repeat(2, 1fr);
                    gap: 2rem;
                    margin-top: 3rem;
                }
                
                .stat-item {
                    display: flex;
                    flex-direction: column;
                }
                
                .stat-value {
                    color: #F20732;
                    font-size: 2rem;
                    font-weight: 800;
                    margin-bottom: 0.25rem;
                }
                
                .stat-label {
                    color: white;
                    font-size: 0.9rem;
                    font-weight: 500;
                }
                
                .about-image {
                    position: relative;
                }
                
                .image-wrapper {
                    position: relative;
                    box-shadow: 0 30px 60px rgba(0, 0, 0, 0.5);
                    border-radius: 20px;
                    overflow: hidden;
                    aspect-ratio: 1.5 / 1;
                }
                
                .image-overlay {
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: linear-gradient(45deg, rgba(242, 7, 50, 0.1), transparent);
                }
                
                .vision-mission {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                    gap: 2rem;
                }
                
                .vision-card {
                    background: rgba(255, 255, 255, 0.03);
                    padding: 3rem;
                    border-radius: 20px;
                    border: 1px solid rgba(255, 255, 255, 0.05);
                    transition: all 0.3s ease;
                }
                
                .vision-card:hover {
                    background: rgba(255, 255, 255, 0.05);
                    border-color: #F20732;
                    transform: translateY(-10px);
                }
                
                .vision-card h3 {
                    color: white;
                    font-size: 1.5rem;
                    margin-bottom: 1.5rem;
                }
                
                .vision-card p {
                    color: rgba(255, 255, 255, 0.6);
                    line-height: 1.6;
                }
                
                @media (max-width: 968px) {
                    .about-content {
                        grid-template-columns: 1fr;
                        text-align: center;
                        gap: 3rem;
                    }
                    
                    .stats-grid {
                        justify-content: center;
                        grid-template-columns: 1fr 1fr;
                    }
                    
                    .about-image {
                        order: -1;
                    }
                }
            `}</style>
        </section>
    );
}
