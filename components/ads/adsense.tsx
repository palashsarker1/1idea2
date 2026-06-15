"use client";

import { useEffect } from 'react';

interface AdSlotProps {
  slotId: string;
  format?: 'auto' | 'horizontal' | 'vertical' | 'rectangle';
  className?: string;
}

export function AdSlot({ slotId, format = 'auto', className = '' }: AdSlotProps) {
  useEffect(() => {
    // Push ad to Google AdSense
    try {
      // Adsbygoogle is a global defined by AdSense script
      const adsbygoogle = (window as { adsbygoogle?: unknown[] }).adsbygoogle || [];
      adsbygoogle.push({});
    } catch (error) {
      console.error('AdSense error:', error);
    }
  }, []);

  return (
    <div className={`ad-container ${className}`}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
        data-ad-slot={slotId}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </div>
  );
}

export function HeaderAd() {
  return (
    <div className="w-full bg-gray-50 py-2 flex items-center justify-center">
      <AdSlot slotId="header-ad" format="horizontal" className="w-full max-w-4xl" />
    </div>
  );
}

export function SidebarAd() {
  return (
    <div className="w-full flex items-center justify-center p-4">
      <AdSlot slotId="sidebar-ad" format="vertical" className="w-full max-w-xs" />
    </div>
  );
}

export function ContentAd() {
  return (
    <div className="w-full flex items-center justify-center py-6 my-6 border-y border-gray-100">
      <AdSlot slotId="content-ad" format="rectangle" className="w-full max-w-md" />
    </div>
  );
}

export function FooterAd() {
  return (
    <div className="w-full bg-gray-50 py-4 flex items-center justify-center">
      <AdSlot slotId="footer-ad" format="horizontal" className="w-full max-w-4xl" />
    </div>
  );
}
