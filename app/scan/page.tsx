'use client';
import UploadZone from '@/components/UploadZone';
import { WalletButton } from '@/components/WalletButton';

export default function ScanPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <nav className="border-b border-zinc-800 p-6 flex justify-between items-center">
        <div className="text-2xl font-bold text-purple-500">AlphaPaper</div>
        <WalletButton />
      </nav>
      <div className="max-w-4xl mx-auto pt-20 px-6 text-center">
        <h1 className="text-6xl font-bold mb-6">Instant Whitepaper Alpha</h1>
        <p className="text-xl text-zinc-400 mb-12">Upload any PDF → AI Summary + Hype/Risk Scores + cNFT</p>
        <UploadZone />
      </div>
    </div>
  );
}