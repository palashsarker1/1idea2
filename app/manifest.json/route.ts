import { NextResponse } from 'next/server';

export async function GET() {
  const manifest = {
    name: '1Idea AI SaaS',
    short_name: '1Idea',
    description: 'AI-powered productivity and automation platform. Turn your ideas into reality with cutting-edge AI tools.',
    start_url: '/',
    scope: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#8B5CF6',
    orientation: 'any',
    lang: 'en',
    dir: 'ltr',
    icons: [
      {
        src: 'https://i.ibb.co/SDL5CSgV/1idea.png',
        sizes: '72x72',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: 'https://i.ibb.co/SDL5CSgV/1idea.png',
        sizes: '96x96',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: 'https://i.ibb.co/SDL5CSgV/1idea.png',
        sizes: '128x128',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: 'https://i.ibb.co/SDL5CSgV/1idea.png',
        sizes: '144x144',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: 'https://i.ibb.co/SDL5CSgV/1idea.png',
        sizes: '152x152',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: 'https://i.ibb.co/SDL5CSgV/1idea.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any maskable',
      },
      {
        src: 'https://i.ibb.co/SDL5CSgV/1idea.png',
        sizes: '384x384',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: 'https://i.ibb.co/SDL5CSgV/1idea.png',
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
        icons: [{ src: 'https://i.ibb.co/SDL5CSgV/1idea.png', sizes: '192x192' }],
      },
      {
        name: 'Blog',
        short_name: 'Blog',
        description: 'Read latest articles',
        url: '/blog',
        icons: [{ src: 'https://i.ibb.co/SDL5CSgV/1idea.png', sizes: '192x192' }],
      },
      {
        name: 'Features',
        short_name: 'Features',
        description: 'Explore features',
        url: '/features',
        icons: [{ src: 'https://i.ibb.co/SDL5CSgV/1idea.png', sizes: '192x192' }],
      },
    ],
    categories: ['productivity', 'utilities', 'business'],
    prefer_related_applications: false,
    related_applications: [],
  };

  return NextResponse.json(manifest, {
    headers: {
      'Content-Type': 'application/manifest+json',
    },
  });
}
