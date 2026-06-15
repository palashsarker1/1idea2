import { NextResponse } from 'next/server';

export async function GET() {
  const manifest = {
    name: '1Idea',
    short_name: '1Idea',
    description: 'Turn Ideas Into Reality - AI-powered platform for innovation',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#8B5CF6',
    orientation: 'portrait-primary',
    icons: [
      {
        src: '/icons/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any maskable',
      },
      {
        src: '/icons/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any maskable',
      },
    ],
    shortcuts: [
      {
        name: 'Tools',
        short_name: 'Tools',
        description: 'Browse AI tools marketplace',
        url: '/tools',
        icons: [{ src: '/icons/icon-192.png', sizes: '192x192' }],
      },
      {
        name: 'Blog',
        short_name: 'Blog',
        description: 'Read latest articles',
        url: '/blog',
        icons: [{ src: '/icons/icon-192.png', sizes: '192x192' }],
      },
    ],
    categories: ['productivity', 'utilities'],
    screenshots: [
      {
        src: '/screenshots/home.png',
        sizes: '1280x720',
        type: 'image/png',
        form_factor: 'wide',
      },
    ],
  };

  return NextResponse.json(manifest, {
    headers: {
      'Content-Type': 'application/manifest+json',
    },
  });
}
