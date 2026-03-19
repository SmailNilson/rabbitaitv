'use client';

import { useEffect } from 'react';

interface AdUnitProps {
  slot?: string;
  format?: 'auto' | 'fluid' | 'rectangle';
  style?: React.CSSProperties;
}

export default function AdUnit({ slot, format = 'auto', style }: AdUnitProps) {
  useEffect(() => {
    try {
      // @ts-ignore
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      console.error('AdSense error:', err);
    }
  }, []);

  return (
    <div className="ad-container" style={{ margin: '2rem 0', minHeight: '100px', ...style }}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-3235102292758932"
        data-ad-slot={slot || ""}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </div>
  );
}
