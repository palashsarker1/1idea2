import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Providers } from '@/components/providers';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { PWAInstallPrompt } from '@/components/pwa-install-prompt';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: {
    default: '1Idea - Turn Ideas Into Reality',
    template: '%s | 1Idea',
  },
  description:
    'AI-powered platform for turning your ideas into reality with cutting-edge tools, resources, and insights. The future of innovation starts here.',
  keywords: [
    'AI',
    'innovation',
    'ideas',
    'tools',
    'productivity',
    'creativity',
    'SaaS',
    'platform',
  ],
  authors: [{ name: '1Idea Team' }],
  creator: '1Idea',
  publisher: '1Idea',
  metadataBase: new URL('https://1idea.ai'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://1idea.ai',
    siteName: '1Idea',
    title: '1Idea - Turn Ideas Into Reality',
    description:
      'AI-powered platform for turning your ideas into reality with cutting-edge tools and resources.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: '1Idea - Turn Ideas Into Reality',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '1Idea - Turn Ideas Into Reality',
    description:
      'AI-powered platform for turning your ideas into reality with cutting-edge tools and resources.',
    images: ['/og-image.png'],
    creator: '@1idea',
  },
  icons: {
    icon: [
      { url: '/icons/favicon.ico', sizes: 'any' },
      { url: '/icons/favicon.png', type: 'image/png' },
    ],
    apple: [{ url: '/icons/apple-touch-icon.png', sizes: '180x180' }],
  },
  manifest: '/manifest.json',
  themeColor: '#8B5CF6',
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="light">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="1Idea" />
        <link rel="apple-touch-icon" href="/icons/apple-touch-icon.png" />
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
        <Providers>
          <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
            <PWAInstallPrompt />
          </div>
        </Providers>
      </body>
    </html>
  );
}
