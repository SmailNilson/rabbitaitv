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

const INCLUDED = [
    'All 20,000+ live channels',
    '120,000+ movies & series',
    '4K · Full HD · HD quality',
    'Live sports — NFL, NBA, more',
    'Works on every device',
];

const STEPS = [
    'Fill in the quick form',
    'Get your trial access by email',
    'Start watching on any device',
];

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
                <div className="layout">
                    {/* LEFT — reassurance */}
                    <aside className="reassure">
                        <div className="eyebrow">
                            <span className="pulse-dot" aria-hidden="true"></span>
                            Free trial
                        </div>
                        <h1>Try RabbitAI TV free for 24 hours</h1>
                        <p className="subtitle">
                            Full access to every channel and title. No credit card, no
                            commitment — just press play.
                        </p>

                        <div className="block">
                            <h2 className="block-title">What&apos;s included</h2>
                            <ul className="checklist">
                                {INCLUDED.map((item) => (
                                    <li key={item}>
                                        <span className="check-icon" aria-hidden="true">
                                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                                <polyline points="20 6 9 17 4 12" />
                                            </svg>
                                        </span>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="block">
                            <h2 className="block-title">How it works</h2>
                            <ol className="steps">
                                {STEPS.map((step, i) => (
                                    <li key={step}>
                                        <span className="step-num" aria-hidden="true">{i + 1}</span>
                                        {step}
                                    </li>
                                ))}
                            </ol>
                        </div>

                        <div className="trust">
                            <span className="stars" aria-hidden="true">
                                {Array.from({ length: 5 }).map((_, i) => (
                                    <svg key={i} viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                                    </svg>
                                ))}
                            </span>
                            <span className="trust-text">Joined by 12,800+ members</span>
                        </div>
                    </aside>

                    {/* RIGHT — form / success / error */}
                    <div className="form-col">
                        {status === 'success' ? (
                            <div className="success-card">
                                <div className="success-icon" aria-hidden="true">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                                        <polyline points="22 4 12 14.01 9 11.01" />
                                    </svg>
                                </div>
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
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                                    </svg>
                                    Chat on WhatsApp
                                </a>
                            </div>
                        ) : (
                            <form className="trial-form" onSubmit={handleSubmit}>
                                <div className="card-head">
                                    <h2 className="card-title">Start your free trial</h2>
                                    <p className="card-sub">
                                        Takes 30 seconds — we&apos;ll email your trial access.
                                    </p>
                                </div>

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
                                    className="btn-primary submit-btn"
                                    disabled={status === 'sending'}
                                >
                                    {status === 'sending' ? (
                                        'Sending...'
                                    ) : (
                                        <>
                                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                                <polygon points="5 3 19 12 5 21 5 3" />
                                            </svg>
                                            Request My Free Trial
                                        </>
                                    )}
                                </button>

                                <p className="privacy-note">
                                    No credit card · 24-hour full access · we never spam
                                </p>
                            </form>
                        )}
                    </div>
                </div>
            </div>

            <style jsx>{`
                .trial-page {
                    padding: 3.5rem 2rem 5rem;
                    min-height: 80vh;
                    background: var(--background);
                }

                .container {
                    max-width: var(--container-max);
                    margin: 0 auto;
                }

                .layout {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 3.5rem;
                    align-items: start;
                }

                /* LEFT */
                .reassure {
                    padding-top: 0.5rem;
                }

                .eyebrow {
                    display: inline-flex;
                    align-items: center;
                    gap: 0.5rem;
                    background: var(--primary-soft);
                    color: var(--primary);
                    padding: 0.45rem 0.95rem;
                    border-radius: 50px;
                    font-size: 0.8rem;
                    font-weight: 700;
                    letter-spacing: 0.04em;
                    text-transform: uppercase;
                    margin-bottom: 1.4rem;
                }

                .pulse-dot {
                    width: 8px;
                    height: 8px;
                    background: var(--primary);
                    border-radius: 50%;
                    animation: pulse 2s infinite;
                }

                @keyframes pulse {
                    0%, 100% { opacity: 1; transform: scale(1); }
                    50% { opacity: 0.5; transform: scale(1.2); }
                }

                .reassure h1 {
                    font-size: clamp(2.1rem, 4vw, 3rem);
                    font-family: var(--font-heading);
                    font-weight: 800;
                    line-height: 1.08;
                    color: var(--text);
                    margin: 0 0 1rem;
                }

                .subtitle {
                    color: var(--text-muted);
                    font-size: 1.08rem;
                    line-height: 1.6;
                    max-width: 460px;
                    margin: 0 0 2.25rem;
                }

                .block {
                    margin-bottom: 2rem;
                }

                .block-title {
                    font-family: var(--font-heading);
                    font-size: 1rem;
                    font-weight: 700;
                    color: var(--text);
                    margin: 0 0 1rem;
                    letter-spacing: 0.01em;
                }

                .checklist {
                    list-style: none;
                    padding: 0;
                    margin: 0;
                    display: flex;
                    flex-direction: column;
                    gap: 0.85rem;
                }

                .checklist li {
                    display: flex;
                    align-items: center;
                    gap: 0.7rem;
                    color: var(--text-muted);
                    font-size: 1rem;
                }

                .check-icon {
                    flex-shrink: 0;
                    width: 24px;
                    height: 24px;
                    border-radius: 50%;
                    background: var(--primary-soft);
                    color: var(--primary);
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                }

                .check-icon svg {
                    width: 15px;
                    height: 15px;
                }

                .steps {
                    list-style: none;
                    padding: 0;
                    margin: 0;
                    display: flex;
                    flex-direction: column;
                    gap: 1rem;
                }

                .steps li {
                    display: flex;
                    align-items: center;
                    gap: 0.85rem;
                    color: var(--text-muted);
                    font-size: 1rem;
                }

                .step-num {
                    flex-shrink: 0;
                    width: 28px;
                    height: 28px;
                    border-radius: 50%;
                    background: var(--primary);
                    color: #fff;
                    font-size: 0.85rem;
                    font-weight: 700;
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                }

                .trust {
                    display: flex;
                    align-items: center;
                    gap: 0.7rem;
                    margin-top: 2.25rem;
                    padding-top: 1.5rem;
                    border-top: 1px solid var(--border);
                }

                .stars {
                    display: inline-flex;
                    gap: 2px;
                    color: var(--gold);
                }

                .stars svg {
                    width: 18px;
                    height: 18px;
                }

                .trust-text {
                    color: var(--text-muted);
                    font-size: 0.95rem;
                    font-weight: 600;
                }

                /* RIGHT */
                .form-col {
                    position: relative;
                }

                .trial-form {
                    background: var(--card);
                    border: 1px solid var(--border);
                    border-radius: 18px;
                    padding: 1.75rem;
                }

                .card-head {
                    margin-bottom: 1.5rem;
                }

                .card-title {
                    font-family: var(--font-heading);
                    font-size: 1.4rem;
                    font-weight: 800;
                    color: var(--text);
                    margin: 0 0 0.4rem;
                }

                .card-sub {
                    color: var(--text-muted);
                    font-size: 0.95rem;
                    margin: 0;
                }

                .form-grid {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 1.1rem;
                }

                .form-field {
                    display: flex;
                    flex-direction: column;
                    gap: 0.45rem;
                }

                .full-width {
                    grid-column: 1 / -1;
                }

                label {
                    color: var(--text);
                    font-weight: 600;
                    font-size: 0.9rem;
                }

                input,
                select,
                textarea {
                    background: #0e0e10;
                    border: 1px solid var(--border-strong);
                    border-radius: 10px;
                    padding: 0.85rem 1rem;
                    color: var(--text);
                    font-size: 1rem;
                    font-family: inherit;
                    transition: border-color 0.2s ease, box-shadow 0.2s ease;
                    width: 100%;
                }

                input::placeholder,
                textarea::placeholder {
                    color: var(--text-dim);
                }

                input:focus,
                select:focus,
                textarea:focus {
                    outline: none;
                    border-color: var(--primary);
                    box-shadow: 0 0 0 3px var(--primary-soft);
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
                    gap: 0.5rem;
                }

                .chip {
                    background: #0e0e10;
                    border: 1px solid var(--border-strong);
                    border-radius: 50px;
                    padding: 0.5rem 1rem;
                    color: var(--text-muted);
                    font-size: 0.85rem;
                    font-weight: 500;
                    cursor: pointer;
                    transition: all 0.2s ease;
                }

                .chip:hover {
                    border-color: var(--primary);
                    color: var(--text);
                }

                .chip.selected {
                    background: var(--primary-soft);
                    border-color: var(--primary);
                    color: var(--text);
                }

                .submit-btn {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 0.55rem;
                    width: 100%;
                    margin-top: 1.5rem;
                    font-size: 1.05rem;
                    font-weight: 700;
                    cursor: pointer;
                }

                .submit-btn svg {
                    width: 18px;
                    height: 18px;
                }

                .submit-btn:disabled {
                    opacity: 0.6;
                    cursor: wait;
                }

                .privacy-note {
                    text-align: center;
                    color: var(--text-dim);
                    font-size: 0.8rem;
                    margin-top: 0.9rem;
                }

                .error-message {
                    margin-top: 1.25rem;
                    background: var(--primary-soft);
                    border: 1px solid var(--primary);
                    border-radius: 10px;
                    padding: 0.9rem 1rem;
                    color: #ff8fa3;
                    font-size: 0.92rem;
                    text-align: center;
                }

                .error-message a {
                    color: #25d366;
                    font-weight: 600;
                }

                .success-card {
                    background: var(--card);
                    border: 1px solid rgba(37, 211, 102, 0.25);
                    border-radius: 18px;
                    padding: 2.75rem 1.75rem;
                    text-align: center;
                }

                .success-icon {
                    width: 72px;
                    height: 72px;
                    border-radius: 50%;
                    background: rgba(37, 211, 102, 0.15);
                    color: #25d366;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin: 0 auto 1.5rem;
                }

                .success-icon svg {
                    width: 36px;
                    height: 36px;
                }

                .success-card h2 {
                    color: var(--text);
                    font-size: 1.7rem;
                    font-family: var(--font-heading);
                    font-weight: 800;
                    margin-bottom: 1rem;
                }

                .success-card p {
                    color: var(--text-muted);
                    font-size: 1rem;
                    line-height: 1.6;
                    max-width: 420px;
                    margin: 0 auto 0.75rem;
                }

                .success-card strong {
                    color: var(--text);
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

                .btn-whatsapp svg {
                    width: 18px;
                    height: 18px;
                }

                .btn-whatsapp:hover {
                    background: #20bd5a;
                    transform: translateY(-2px);
                }

                @media (max-width: 900px) {
                    .layout {
                        grid-template-columns: 1fr;
                        gap: 2.5rem;
                    }

                    .subtitle {
                        max-width: none;
                    }
                }

                @media (max-width: 640px) {
                    .trial-page {
                        padding: 2.5rem 1.25rem 3rem;
                    }

                    .trial-form {
                        padding: 1.5rem 1.25rem;
                    }

                    .form-grid {
                        grid-template-columns: 1fr;
                        gap: 1rem;
                    }
                }
            `}</style>
        </div>
    );
}
