import { Metadata } from 'next';
import ContactContent from './ContactContent';

export const metadata: Metadata = {
    title: 'Contact Us',
    description: 'Get in touch with RabbitAI TV support team via WhatsApp or Email. We are available 24/7 to help you with your IPTV subscription questions.',
    openGraph: {
        title: 'Contact RabbitAI TV',
        description: 'Get in touch with RabbitAI TV support team via WhatsApp or Email.',
        type: 'website',
    },
};

export default function ContactPage() {
    return <ContactContent />;
}
