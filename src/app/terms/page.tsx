'use client';

export default function TermsOfServicePage() {
    return (
        <div className="legal-page">
            <div className="container">
                <header className="legal-header">
                    <span className="eyebrow">Legal</span>
                    <h1>Terms of Service</h1>
                    <p className="last-updated">Last updated: January 2025</p>
                </header>

                <section>
                    <h2>1. Acceptance of Terms</h2>
                    <p>
                        By accessing and using RabbitAI TV services, you accept and agree to be bound by the terms and provisions
                        of this agreement. If you do not agree to abide by these terms, please do not use our services.
                    </p>
                </section>

                <section>
                    <h2>2. Service Description</h2>
                    <p>
                        RabbitAI TV provides IPTV streaming services that allow you to access live TV channels, movies, and series
                        through compatible devices. Our service includes:
                    </p>
                    <ul>
                        <li>Access to 20,000+ live TV channels</li>
                        <li>120,000+ movies and series on demand</li>
                        <li>HD, Full HD, and 4K quality streaming</li>
                        <li>Multi-device compatibility</li>
                        <li>24/7 customer support</li>
                    </ul>
                </section>

                <section>
                    <h2>3. Subscription and Payment</h2>
                    <p>
                        By subscribing to our service, you agree to pay the applicable subscription fees. All payments are
                        processed securely through our payment partners.
                    </p>
                    <ul>
                        <li>Subscription fees are charged based on your selected plan</li>
                        <li>Payments are non-refundable unless otherwise stated</li>
                        <li>We reserve the right to change pricing with prior notice</li>
                        <li>Your subscription will remain active for the purchased duration</li>
                    </ul>
                </section>

                <section>
                    <h2>4. User Responsibilities</h2>
                    <p>As a user of our service, you agree to:</p>
                    <ul>
                        <li>Provide accurate and complete information during registration</li>
                        <li>Keep your login credentials confidential</li>
                        <li>Use the service only for personal, non-commercial purposes</li>
                        <li>Not share your subscription with unauthorized users</li>
                        <li>Comply with all applicable laws and regulations</li>
                    </ul>
                </section>

                <section>
                    <h2>5. Prohibited Activities</h2>
                    <p>You are strictly prohibited from:</p>
                    <ul>
                        <li>Redistributing, reselling, or sharing your subscription access</li>
                        <li>Attempting to reverse engineer or hack our services</li>
                        <li>Using automated systems to access our services</li>
                        <li>Violating any intellectual property rights</li>
                        <li>Engaging in any illegal activities using our services</li>
                    </ul>
                </section>

                <section>
                    <h2>6. Service Availability</h2>
                    <p>
                        While we strive to provide uninterrupted service, we do not guarantee 100% uptime. Service may be
                        temporarily unavailable due to maintenance, updates, or circumstances beyond our control.
                    </p>
                </section>

                <section>
                    <h2>7. Limitation of Liability</h2>
                    <p>
                        RabbitAI TV shall not be liable for any indirect, incidental, special, consequential, or punitive damages
                        resulting from your use or inability to use our services.
                    </p>
                </section>

                <section>
                    <h2>8. Account Termination</h2>
                    <p>
                        We reserve the right to suspend or terminate your account at any time if you violate these terms of service
                        or engage in any activity that we deem harmful to our service or other users.
                    </p>
                </section>

                <section>
                    <h2>9. Changes to Terms</h2>
                    <p>
                        We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting
                        to our website. Your continued use of our services constitutes acceptance of the modified terms.
                    </p>
                </section>

                <section>
                    <h2>10. Contact Information</h2>
                    <p>
                        For any questions regarding these Terms of Service, please contact us via WhatsApp at{" "}
                        <a href="https://api.whatsapp.com/send?phone=17575357760">+1 (757) 535-7760</a> or email us at{" "}
                        <a href="mailto:contact.rabbitaitv@gmail.com">contact.rabbitaitv@gmail.com</a>.
                    </p>
                </section>
            </div>

            <style jsx>{`
                .legal-page {
                    background: var(--background);
                    color: var(--text);
                    min-height: 100vh;
                    padding: 3rem 0 6rem;
                }

                .container {
                    max-width: 780px;
                    margin: 0 auto;
                    padding: 0 1.5rem;
                }

                .legal-header {
                    margin-bottom: 3.5rem;
                    padding-bottom: 2rem;
                    border-bottom: 1px solid var(--border);
                }

                .legal-header .eyebrow {
                    display: block;
                    margin-bottom: 0.75rem;
                }

                h1 {
                    font-family: var(--font-heading);
                    font-size: clamp(2rem, 5vw, 2.75rem);
                    font-weight: 800;
                    line-height: 1.15;
                    margin: 0 0 0.75rem;
                    color: var(--text);
                }

                .last-updated {
                    color: var(--text-dim);
                    font-size: 0.9rem;
                    margin: 0;
                }

                section {
                    margin-bottom: 2.75rem;
                }

                h2 {
                    font-family: var(--font-heading);
                    font-size: 1.4rem;
                    font-weight: 700;
                    line-height: 1.3;
                    color: var(--text);
                    margin: 0 0 1rem;
                }

                p {
                    color: var(--text-muted);
                    font-size: 1rem;
                    line-height: 1.8;
                    margin: 0 0 1rem;
                }

                ul {
                    list-style: none;
                    padding: 0;
                    margin: 1rem 0;
                }

                li {
                    color: var(--text-muted);
                    font-size: 1rem;
                    padding: 0.4rem 0 0.4rem 1.5rem;
                    position: relative;
                    line-height: 1.7;
                }

                li::before {
                    content: "";
                    position: absolute;
                    left: 0.1rem;
                    top: 0.95rem;
                    width: 6px;
                    height: 6px;
                    border-radius: 50%;
                    background: var(--primary);
                }

                li strong {
                    color: var(--text);
                    font-weight: 600;
                }

                a {
                    color: var(--primary);
                    text-decoration: none;
                    transition: opacity 0.2s ease;
                }

                a:hover {
                    opacity: 0.8;
                    text-decoration: underline;
                }

                a:focus-visible {
                    outline: 2px solid var(--primary);
                    outline-offset: 2px;
                    border-radius: 2px;
                }

                @media (max-width: 768px) {
                    .legal-page {
                        padding: 2rem 0 4rem;
                    }
                    .legal-header {
                        margin-bottom: 2.5rem;
                    }
                }
            `}</style>
        </div>
    );
}
