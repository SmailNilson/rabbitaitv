'use client';

import { useState, useEffect } from 'react';

export default function ScrollToTop() {
    const [isVisible, setIsVisible] = useState(false);

    // Show button when page is scrolled down
    const toggleVisibility = () => {
        if (window.scrollY > 300) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    // Set the top cordinate to 0
    // make scrolling smooth
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    useEffect(() => {
        window.addEventListener('scroll', toggleVisibility);
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    return (
        <>
            <button
                type="button"
                onClick={scrollToTop}
                className={`scroll-to-top ${isVisible ? 'visible' : ''}`}
                aria-label="Scroll to top"
            >
                <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <path d="M18 15l-6-6-6 6" />
                </svg>
            </button>

            <style jsx>{`
                .scroll-to-top {
                    position: fixed;
                    bottom: 24px;
                    right: 24px;
                    z-index: 9999;
                    background: #F20732;
                    color: white;
                    width: 48px;
                    height: 48px;
                    border-radius: 50%;
                    border: none;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    box-shadow: 0 4px 20px rgba(242, 7, 50, 0.4);
                    opacity: 0;
                    visibility: hidden;
                    transform: translateY(20px);
                    transition: all 0.3s ease;
                }

                .scroll-to-top.visible {
                    opacity: 1;
                    visibility: visible;
                    transform: translateY(0);
                }

                .scroll-to-top:hover {
                    background: #d10629;
                    transform: translateY(-5px);
                    box-shadow: 0 6px 25px rgba(242, 7, 50, 0.6);
                }

                @media (max-width: 640px) {
                    .scroll-to-top {
                        width: 42px;
                        height: 42px;
                        bottom: 24px;
                        right: 16px;
                    }
                }
            `}</style>
        </>
    );
}
