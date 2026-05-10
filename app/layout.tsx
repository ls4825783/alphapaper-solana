import type { Metadata } from 'next';
import './globals.css';
import { Providers } from './providers';

export const metadata: Metadata = {
  title: 'AlphaPaper - Solana AI Research',
  description: 'AI Whitepaper Scanner on Solana',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}