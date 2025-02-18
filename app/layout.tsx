import './globals.css';

import { Navbar } from '@/components/navbar';
import { Providers } from '@/components/providers';
import { geistMono, inter } from '@/lib/fonts';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          src="https://unpkg.com/react-scan/dist/auto.global.js"
          async
        />
      </head>
      <body className={`${inter.variable} ${geistMono.variable} antialiased`}>
        <Navbar />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
