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
        url: 'https://i.ibb.co/SDL5CSgV/1idea.png',
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
    images: ['https://i.ibb.co/SDL5CSgV/1idea.png'],
    creator: '@1idea',
  },
  icons: {
    icon: [
      { url: 'https://i.ibb.co/SDL5CSgV/1idea.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [{ url: 'https://i.ibb.co/SDL5CSgV/1idea.png', sizes: '180x180' }],
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
        {/* PWA Meta Tags */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="1Idea" />
        <meta name="application-name" content="1Idea" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="msapplication-TileColor" content="#8B5CF6" />
        <meta name="msapplication-tap-highlight" content="no" />
        {/* Icons */}
        <link rel="apple-touch-icon" href="https://i.ibb.co/SDL5CSgV/1idea.png" />
        <link rel="apple-touch-icon" sizes="152x152" href="https://i.ibb.co/SDL5CSgV/1idea.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="https://i.ibb.co/SDL5CSgV/1idea.png" />
        <link rel="icon" href="https://i.ibb.co/SDL5CSgV/1idea.png" type="image/png" />
        <link rel="icon" sizes="32x32" href="https://i.ibb.co/SDL5CSgV/1idea.png" type="image/png" />
        <link rel="icon" sizes="16x16" href="https://i.ibb.co/SDL5CSgV/1idea.png" type="image/png" />
        {/* Manifest */}
        <link rel="manifest" href="/manifest.json" />
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
