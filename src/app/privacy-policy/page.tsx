'use client';

export default function PrivacyPolicyPage() {
    return (
        <div className="legal-page">
            <div className="container">
                <h1>Privacy Policy</h1>
                <p className="last-updated">Last updated: January 2025</p>

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
                        privacy policy on this page and updating the "Last updated" date.
                    </p>
                </section>
            </div>

            <style jsx>{`
                .legal-page {
                    background: #0D0D0D;
                    color: white;
                    min-height: 100vh;
                    padding: 140px 0 80px;
                }

                .container {
                    max-width: 800px;
                    margin: 0 auto;
                    padding: 0 1.5rem;
                }

                h1 {
                    font-size: 2.5rem;
                    font-weight: 800;
                    margin-bottom: 0.5rem;
                    background: linear-gradient(135deg, #CB9500 0%, #F20732 100%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                }

                .last-updated {
                    color: rgba(255, 255, 255, 0.5);
                    font-size: 0.9rem;
                    margin-bottom: 3rem;
                }

                section {
                    margin-bottom: 2.5rem;
                }

                h2 {
                    font-size: 1.35rem;
                    font-weight: 700;
                    color: white;
                    margin-bottom: 1rem;
                    padding-bottom: 0.5rem;
                    border-bottom: 2px solid rgba(242, 7, 50, 0.3);
                }

                p {
                    color: rgba(255, 255, 255, 0.8);
                    line-height: 1.8;
                    margin-bottom: 1rem;
                }

                ul {
                    list-style: none;
                    padding: 0;
                    margin: 1rem 0;
                }

                li {
                    color: rgba(255, 255, 255, 0.8);
                    padding: 0.5rem 0 0.5rem 1.5rem;
                    position: relative;
                    line-height: 1.6;
                }

                li:before {
                    content: "•";
                    color: #F20732;
                    font-weight: bold;
                    position: absolute;
                    left: 0;
                }

                li strong {
                    color: #F20732;
                }

                a {
                    color: #F20732;
                    text-decoration: none;
                    transition: opacity 0.3s ease;
                }

                a:hover {
                    opacity: 0.8;
                }

                @media (max-width: 768px) {
                    .legal-page {
                        padding: 120px 0 60px;
                    }
                    h1 {
                        font-size: 2rem;
                    }
                }
            `}</style>
        </div>
    );
}
