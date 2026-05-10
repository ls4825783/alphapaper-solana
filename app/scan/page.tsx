'use client';
import UploadZone from '@/components/UploadZone';
export default function ScanPage() {
  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
      <div className="max-w-2xl w-full px-6">
        <h1 className="text-6xl font-bold text-center mb-4">AlphaPaper</h1>
        <p className="text-xl text-center text-zinc-400 mb-12">Upload any whitepaper. Get instant alpha.</p>
        <UploadZone />
      </div>
    </div>
  );
}