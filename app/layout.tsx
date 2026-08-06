import type { Metadata } from 'next';
import { Inter, Manrope, IBM_Plex_Mono } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const manrope = Manrope({ subsets: ['latin'], variable: '--font-manrope' });
const ibmPlexMono = IBM_Plex_Mono({ weight: ['400', '500', '600'], subsets: ['latin'], variable: '--font-ibm-plex-mono' });

export const metadata: Metadata = {
  title: 'Invoice Generator — The Inquisitive Mind',
  description: 'Create, manage and download professional invoices.',
};

import { Toaster } from 'sonner';
import { ThemeProvider } from '@/components/theme-provider';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
      </head>
      <body className={`${manrope.variable} ${inter.variable} ${ibmPlexMono.variable} font-sans antialiased text-text bg-background`} suppressHydrationWarning>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          {children}
          <Toaster position="top-center" richColors />
        </ThemeProvider>
      </body>
    </html>
  );
}
