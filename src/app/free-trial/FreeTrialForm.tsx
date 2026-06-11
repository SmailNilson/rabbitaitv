'use client';

import { useState } from 'react';
import { siteConfig } from '@/config/site';

const COUNTRIES = [
    'USA', 'Canada', 'United Kingdom', 'France', 'Germany', 'Spain', 'Italy',
    'Belgium', 'Netherlands', 'Switzerland', 'Portugal', 'Ireland', 'Sweden',
    'Norway', 'Denmark', 'Australia', 'New Zealand', 'Morocco', 'Algeria',
    'Tunisia', 'Saudi Arabia', 'UAE', 'Qatar', 'Mexico', 'Brazil', 'Other',
];

const CHANNEL_OPTIONS = [
    'USA Channels',
    'UK Channels',
    'Canada Channels',
    'Sports (NFL, NBA, ESPN...)',
    'French Channels',
    'Arabic Channels',
    'Latino / Spanish',
    'Movies & Series (VOD)',
    'Kids Channels',
];

type Status = 'idle' | 'sending' | 'success' | 'error';

export default function FreeTrialForm() {
    const [status, setStatus] = useState<Status>('idle');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [country, setCountry] = useState('');
    const [channels, setChannels] = useState<string[]>([]);
    const [note, setNote] = useState('');

    const toggleChannel = (channel: string) => {
        setChannels((prev) =>
            prev.includes(channel)
                ? prev.filter((c) => c !== channel)
                : [...prev, channel]
        );
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (status === 'sending') return;
        setStatus('sending');

        try {
            const res = await fetch(`https://formsubmit.co/ajax/${siteConfig.contact.email}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
                body: JSON.stringify({
                    _subject: `Free Trial Request - ${name}`,
                    _template: 'table',
                    _captcha: 'false',
                    Name: name,
                    Email: email,
                    Country: country,
                    'Channels wanted': channels.length > 0 ? channels.join(', ') : 'Not specified',
                    Note: note || 'No note',
                }),
            });
            const data = await res.json();
            if (res.ok && (data.success === 'true' || data.success === true)) {
                setStatus('success');
            } else {
                setStatus('error');
            }
        } catch {
            setStatus('error');
        }
    };

    return (
        <div className="trial-page">
            <div className="container">
                <header className="page-header">
                    <div className="badge">
                        <span className="pulse-dot"></span>
                        24-Hour Free Trial
                    </div>
                    <h1>Get Your Free Trial</h1>
                    <p>
                        Test 20,000+ live channels and 120,000+ movies & series in 4K on
                        any device. Fill out the form and receive your trial access by
                        email — no credit card required.
                    </p>
                </header>

                {status === 'success' ? (
                    <div className="success-card">
                        <div className="success-icon">✓</div>
                        <h2>Request Received!</h2>
                        <p>
                            Thank you <strong>{name}</strong>! Our team will send your free
                            trial access to <strong>{email}</strong> shortly (usually within
                            a few hours).
                        </p>
                        <p className="success-hint">
                            Need it faster? Contact us directly on WhatsApp:
                        </p>
                        <a
                            href={siteConfig.contact.whatsappLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-whatsapp"
                        >
                            💬 Chat on WhatsApp
                        </a>
                    </div>
                ) : (
                    <form className="trial-form" onSubmit={handleSubmit}>
                        <div className="form-grid">
                            <div className="form-field">
                                <label htmlFor="trial-name">Full Name *</label>
                                <input
                                    id="trial-name"
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="John Smith"
                                    required
                                    maxLength={100}
                                />
                            </div>

                            <div className="form-field">
                                <label htmlFor="trial-email">Email Address *</label>
                                <input
                                    id="trial-email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="you@email.com"
                                    required
                                    maxLength={150}
                                />
                            </div>

                            <div className="form-field full-width">
                                <label htmlFor="trial-country">Country *</label>
                                <select
                                    id="trial-country"
                                    value={country}
                                    onChange={(e) => setCountry(e.target.value)}
                                    required
                                >
                                    <option value="" disabled>
                                        Select your country
                                    </option>
                                    {COUNTRIES.map((c) => (
                                        <option key={c} value={c}>
                                            {c}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="form-field full-width">
                                <label>Which channels interest you? (optional)</label>
                                <div className="channel-chips">
                                    {CHANNEL_OPTIONS.map((channel) => (
                                        <button
                                            type="button"
                                            key={channel}
                                            className={`chip ${channels.includes(channel) ? 'selected' : ''}`}
                                            onClick={() => toggleChannel(channel)}
                                        >
                                            {channels.includes(channel) ? '✓ ' : ''}
                                            {channel}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="form-field full-width">
                                <label htmlFor="trial-note">Note (optional)</label>
                                <textarea
                                    id="trial-note"
                                    value={note}
                                    onChange={(e) => setNote(e.target.value)}
                                    placeholder="Your device (Firestick, Smart TV...), preferred apps, or any question..."
                                    rows={4}
                                    maxLength={1000}
                                />
                            </div>
                        </div>

                        {status === 'error' && (
                            <p className="error-message">
                                Something went wrong sending your request. Please try again,
                                or contact us directly on{' '}
                                <a
                                    href={siteConfig.contact.whatsappLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    WhatsApp
                                </a>
                                .
                            </p>
                        )}

                        <button
                            type="submit"
                            className="submit-btn"
                            disabled={status === 'sending'}
                        >
                            {status === 'sending' ? 'Sending...' : '🎁 Request My Free Trial'}
                        </button>

                        <p className="privacy-note">
                            We only use your information to set up your trial. No spam, ever.
                        </p>
                    </form>
                )}
            </div>

            <style jsx>{`
                .trial-page {
                    padding: 8rem 2rem 5rem;
                    min-height: 80vh;
                    background: var(--background);
                }

                .container {
                    max-width: 760px;
                    margin: 0 auto;
                }

                .page-header {
                    text-align: center;
                    margin-bottom: 3rem;
                }

                .badge {
                    display: inline-flex;
                    align-items: center;
                    gap: 0.5rem;
                    background: rgba(242, 7, 50, 0.2);
                    color: #f20732;
                    padding: 0.5rem 1rem;
                    border-radius: 50px;
                    font-size: 0.875rem;
                    font-weight: 600;
                    margin-bottom: 1.5rem;
                }

                .pulse-dot {
                    width: 8px;
                    height: 8px;
                    background: #f20732;
                    border-radius: 50%;
                    animation: pulse 2s infinite;
                }

                @keyframes pulse {
                    0%, 100% { opacity: 1; transform: scale(1); }
                    50% { opacity: 0.5; transform: scale(1.2); }
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
                    line-height: 1.6;
                }

                .trial-form {
                    background: var(--background-light);
                    border: 1px solid rgba(255, 255, 255, 0.05);
                    border-radius: 24px;
                    padding: 2.5rem;
                }

                .form-grid {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 1.5rem;
                }

                .form-field {
                    display: flex;
                    flex-direction: column;
                    gap: 0.5rem;
                }

                .full-width {
                    grid-column: 1 / -1;
                }

                label {
                    color: white;
                    font-weight: 600;
                    font-size: 0.95rem;
                }

                input,
                select,
                textarea {
                    background: rgba(255, 255, 255, 0.04);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    border-radius: 12px;
                    padding: 0.9rem 1rem;
                    color: white;
                    font-size: 1rem;
                    font-family: inherit;
                    transition: border-color 0.3s ease, background 0.3s ease;
                    width: 100%;
                }

                input::placeholder,
                textarea::placeholder {
                    color: rgba(255, 255, 255, 0.3);
                }

                input:focus,
                select:focus,
                textarea:focus {
                    outline: none;
                    border-color: #f20732;
                    background: rgba(255, 255, 255, 0.06);
                }

                select {
                    appearance: none;
                    background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='2'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
                    background-repeat: no-repeat;
                    background-position: right 1rem center;
                    background-size: 1em;
                    cursor: pointer;
                }

                select option {
                    background: #1a1a1a;
                    color: white;
                }

                textarea {
                    resize: vertical;
                    min-height: 100px;
                }

                .channel-chips {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 0.6rem;
                }

                .chip {
                    background: rgba(255, 255, 255, 0.04);
                    border: 1px solid rgba(255, 255, 255, 0.12);
                    border-radius: 50px;
                    padding: 0.55rem 1.1rem;
                    color: rgba(255, 255, 255, 0.8);
                    font-size: 0.9rem;
                    font-weight: 500;
                    cursor: pointer;
                    transition: all 0.25s ease;
                }

                .chip:hover {
                    border-color: rgba(242, 7, 50, 0.5);
                    color: white;
                }

                .chip.selected {
                    background: rgba(242, 7, 50, 0.18);
                    border-color: #f20732;
                    color: white;
                }

                .submit-btn {
                    display: block;
                    width: 100%;
                    margin-top: 2rem;
                    background: #f20732;
                    color: white;
                    border: none;
                    border-radius: 14px;
                    padding: 1.1rem 2rem;
                    font-size: 1.15rem;
                    font-weight: 700;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    font-family: inherit;
                }

                .submit-btn:hover:not(:disabled) {
                    background: #d10629;
                    transform: translateY(-2px);
                    box-shadow: 0 10px 30px rgba(242, 7, 50, 0.3);
                }

                .submit-btn:disabled {
                    opacity: 0.6;
                    cursor: wait;
                }

                .privacy-note {
                    text-align: center;
                    color: rgba(255, 255, 255, 0.4);
                    font-size: 0.85rem;
                    margin-top: 1rem;
                }

                .error-message {
                    margin-top: 1.5rem;
                    background: rgba(242, 7, 50, 0.1);
                    border: 1px solid rgba(242, 7, 50, 0.3);
                    border-radius: 12px;
                    padding: 1rem;
                    color: #ff8fa3;
                    font-size: 0.95rem;
                    text-align: center;
                }

                .error-message a {
                    color: #25d366;
                    font-weight: 600;
                }

                .success-card {
                    background: var(--background-light);
                    border: 1px solid rgba(37, 211, 102, 0.25);
                    border-radius: 24px;
                    padding: 3.5rem 2.5rem;
                    text-align: center;
                }

                .success-icon {
                    width: 72px;
                    height: 72px;
                    border-radius: 50%;
                    background: rgba(37, 211, 102, 0.15);
                    color: #25d366;
                    font-size: 2.2rem;
                    font-weight: 700;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin: 0 auto 1.5rem;
                }

                .success-card h2 {
                    color: white;
                    font-size: 1.9rem;
                    font-family: var(--font-heading);
                    margin-bottom: 1rem;
                }

                .success-card p {
                    color: var(--text-muted);
                    font-size: 1.05rem;
                    line-height: 1.6;
                    max-width: 480px;
                    margin: 0 auto 0.75rem;
                }

                .success-card strong {
                    color: white;
                }

                .success-hint {
                    margin-top: 1.5rem;
                }

                .btn-whatsapp {
                    display: inline-flex;
                    align-items: center;
                    gap: 0.5rem;
                    background: #25d366;
                    color: white;
                    padding: 0.9rem 1.8rem;
                    border-radius: 12px;
                    font-weight: 600;
                    text-decoration: none;
                    margin-top: 1rem;
                    transition: all 0.3s ease;
                }

                .btn-whatsapp:hover {
                    background: #20bd5a;
                    transform: translateY(-2px);
                }

                @media (max-width: 640px) {
                    .trial-page {
                        padding: 6rem 1.25rem 3rem;
                    }

                    .trial-form {
                        padding: 1.75rem 1.25rem;
                    }

                    .form-grid {
                        grid-template-columns: 1fr;
                        gap: 1.25rem;
                    }
                }
            `}</style>
        </div>
    );
}
