import type { Metadata, Viewport } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({ 
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: '#0ea5e9',
};

export const metadata: Metadata = {
  title: {
    default: 'Infectio Cardiomaine - Moteur de Recherche Diagnostique Infectieux',
    template: '%s | Infectio Cardiomaine',
  },
  description: 'Moteur de recherche intelligent pour le diagnostic et la prise en charge des infections bactériennes, virales, parasitaires et fongiques. Recommandations SPILF, SFAR, SRLF, FRAR actualisées. Application PWA professionnelle.',
  keywords: ['infectiologie', 'SPILF', 'SFAR', 'SRLF', 'FRAR', 'antibiothérapie', 'diagnostic infectieux', 'moteur de recherche médical', 'infections bactériennes', 'infections virales', 'infections parasitaires', 'médecine', 'réanimation'],
  authors: [{ name: 'Infectio Cardiomaine' }],
  creator: 'Infectio Cardiomaine',
  publisher: 'Infectio Cardiomaine',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Infectio Guide',
  },
  applicationName: 'Infectio Cardiomaine',
  icons: {
    icon: [
      { url: '/icons/icon-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icons/icon-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/icons/icon-152x152.png', sizes: '152x152', type: 'image/png' },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <head>
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="mobile-web-app-capable" content="yes" />
      </head>
      <body className="font-sans antialiased">
        <div className="min-h-screen bg-background">
          {children}
        </div>
      </body>
    </html>
  );
}
