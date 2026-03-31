'use client';

import { siteConfig } from '@/config/site';

export default function ContactContent() {
    return (
        <div className="contact-page">
            <div className="container">
                <header className="page-header">
                    <h1>Contact Us</h1>
                    <p>Have questions? We're here to help. Contact us via WhatsApp or Email.</p>
                </header>

                <div className="contact-grid">
                    {/* WhatsApp Card */}
                    <a 
                        href={`https://api.whatsapp.com/send?phone=${siteConfig.contact.whatsapp.replace(/\+/g, '')}`} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="contact-card whatsapp"
                    >
                        <div className="icon-wrapper">
                            <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                            </svg>
                        </div>
                        <h3>WhatsApp</h3>
                        <p>Immediate responses 24/7</p>
                        <span className="btn-text">Chat with us</span>
                    </a>

                    {/* Email Card */}
                    <a 
                        href={`mailto:${siteConfig.contact.email}`} 
                        className="contact-card email"
                    >
                        <div className="icon-wrapper">
                            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                            </svg>
                        </div>
                        <h3>Email</h3>
                        <p>Get a response within 2-4 hours</p>
                        <span className="btn-text">Send an email</span>
                    </a>
                </div>

                <div className="additional-info">
                    <h2>Our Information</h2>
                    <p>RabbitAI TV - Support Team</p>
                    <p style={{ marginTop: '0.5rem' }}>{siteConfig.contact.address}</p>
                </div>
            </div>

            <style jsx>{`
                .contact-page {
                    padding: 8rem 2rem 4rem;
                    min-height: 80vh;
                    background: var(--background);
                }

                .container {
                    max-width: 1000px;
                    margin: 0 auto;
                }

                .page-header {
                    text-align: center;
                    margin-bottom: 4rem;
                }

                .page-header h1 {
                    font-size: clamp(2.5rem, 5vw, 3.5rem);
                    font-family: var(--font-heading);
                    font-weight: 700;
                    margin-bottom: 1rem;
                    background: linear-gradient(to right, #fff, rgba(255, 255, 255, 0.4));
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                }

                .page-header p {
                    color: var(--text-muted);
                    font-size: 1.1rem;
                    max-width: 600px;
                    margin: 0 auto;
                }

                .contact-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                    gap: 2rem;
                    margin-bottom: 4rem;
                }

                .contact-card {
                    background: var(--background-light);
                    border: 1px solid rgba(255, 255, 255, 0.05);
                    border-radius: 24px;
                    padding: 3.5rem 2rem;
                    text-align: center;
                    text-decoration: none;
                    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                }

                .contact-card:hover {
                    background: #202020;
                    border-color: var(--primary);
                    transform: translateY(-10px);
                    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4), 0 0 20px rgba(242, 7, 50, 0.1);
                }

                .icon-wrapper {
                    width: 80px;
                    height: 80px;
                    border-radius: 24px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin-bottom: 2rem;
                    transition: all 0.3s ease;
                }

                .whatsapp .icon-wrapper {
                    background: rgba(37, 211, 102, 0.1);
                    color: #25D366;
                }

                .email .icon-wrapper {
                    background: rgba(242, 7, 50, 0.1);
                    color: var(--primary);
                }

                .contact-card:hover .icon-wrapper {
                    transform: scale(1.1) rotate(5deg);
                }

                .whatsapp:hover .icon-wrapper {
                    background: #25D366;
                    color: white;
                }

                .email:hover .icon-wrapper {
                    background: var(--primary);
                    color: white;
                }

                .contact-card h3 {
                    color: white;
                    font-size: 1.75rem;
                    margin-bottom: 0.5rem;
                    font-family: var(--font-heading);
                    font-weight: 600;
                }

                .contact-card p {
                    color: var(--text-dim);
                    font-size: 0.95rem;
                    margin-bottom: 2.5rem;
                }

                .btn-text {
                    color: white;
                    font-weight: 600;
                    padding: 0.9rem 2rem;
                    border-radius: 14px;
                    background: rgba(255, 255, 255, 0.05);
                    transition: all 0.3s ease;
                    font-size: 1rem;
                }

                .whatsapp:hover .btn-text {
                    background: #25D366;
                    box-shadow: 0 8px 20px rgba(37, 211, 102, 0.3);
                }

                .email:hover .btn-text {
                    background: var(--primary);
                    box-shadow: 0 8px 20px rgba(242, 7, 50, 0.3);
                }

                .additional-info {
                    text-align: center;
                    padding: 4rem 2rem;
                    background: linear-gradient(180deg, rgba(255, 255, 255, 0.02) 0%, transparent 100%);
                    border-radius: 32px;
                    border: 1px solid rgba(255, 255, 255, 0.03);
                }

                .additional-info h2 {
                    color: white;
                    font-size: 1.5rem;
                    margin-bottom: 1rem;
                    font-family: var(--font-heading);
                }

                .additional-info p {
                    color: var(--text-muted);
                    font-size: 1rem;
                }

                @media (max-width: 768px) {
                    .contact-page {
                        padding: 6rem 1.5rem 3rem;
                    }
                    
                    .page-header h1 {
                        font-size: 2.5rem;
                    }

                    .contact-card {
                        padding: 2.5rem 1.5rem;
                    }
                }
            `}</style>
        </div>
    );
}
