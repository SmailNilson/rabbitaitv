'use client';

export default function PrivacyPolicyPage() {
    return (
        <div className="legal-page">
            <div className="container">
                <header className="legal-header">
                    <span className="eyebrow">Legal</span>
                    <h1>Privacy Policy</h1>
                    <p className="last-updated">Last updated: January 2025</p>
                </header>

                <section>
                    <h2>1. Introduction</h2>
                    <p>
                        Welcome to RabbitAI TV. We respect your privacy and are committed to protecting your personal data.
                        This privacy policy will inform you about how we look after your personal data when you visit our website
                        and use our services.
                    </p>
                </section>

                <section>
                    <h2>2. Information We Collect</h2>
                    <p>We may collect the following types of information:</p>
                    <ul>
                        <li><strong>Personal Information:</strong> Name, email address, phone number, and payment information when you subscribe to our services.</li>
                        <li><strong>Usage Data:</strong> Information about how you use our website and services.</li>
                        <li><strong>Device Information:</strong> Information about the devices you use to access our services.</li>
                        <li><strong>Cookies:</strong> We use cookies to enhance your experience on our website.</li>
                    </ul>
                </section>

                <section>
                    <h2>3. How We Use Your Information</h2>
                    <p>We use your personal information to:</p>
                    <ul>
                        <li>Provide and maintain our IPTV services</li>
                        <li>Process your payments and subscriptions</li>
                        <li>Send you important updates about your account</li>
                        <li>Provide customer support</li>
                        <li>Improve our services and user experience</li>
                        <li>Comply with legal obligations</li>
                    </ul>
                </section>

                <section>
                    <h2>4. Data Security</h2>
                    <p>
                        We implement appropriate security measures to protect your personal information against unauthorized access,
                        alteration, disclosure, or destruction. However, no method of transmission over the Internet is 100% secure.
                    </p>
                </section>

                <section>
                    <h2>5. Third-Party Services</h2>
                    <p>
                        We may use third-party services for payment processing and analytics. These services have their own privacy
                        policies, and we encourage you to review them.
                    </p>
                </section>

                <section>
                    <h2>6. Your Rights</h2>
                    <p>You have the right to:</p>
                    <ul>
                        <li>Access your personal data</li>
                        <li>Correct inaccurate data</li>
                        <li>Request deletion of your data</li>
                        <li>Object to processing of your data</li>
                        <li>Data portability</li>
                    </ul>
                </section>

                <section>
                    <h2>7. Contact Us</h2>
                    <p>
                        If you have any questions about this Privacy Policy, please contact us via WhatsApp at{" "}
                        <a href="https://api.whatsapp.com/send?phone=17575357760">+1 (757) 535-7760</a> or email us at{" "}
                        <a href="mailto:contact.rabbitaitv@gmail.com">contact.rabbitaitv@gmail.com</a>.
                    </p>
                </section>

                <section>
                    <h2>8. Changes to This Policy</h2>
                    <p>
                        We may update this privacy policy from time to time. We will notify you of any changes by posting the new
                        privacy policy on this page and updating the &quot;Last updated&quot; date.
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
