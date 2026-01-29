'use client';

import { useEffect, Suspense } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

function ScrollToHashContent() {
    const pathname = usePathname();
    const searchParams = useSearchParams();

    useEffect(() => {
        // Force scroll to top on every page change
        if (typeof window !== 'undefined') {
            window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
        }
    }, [pathname, searchParams]);

    return null;
}

export default function ScrollToHash() {
    return (
        <Suspense fallback={null}>
            <ScrollToHashContent />
        </Suspense>
    );
}
