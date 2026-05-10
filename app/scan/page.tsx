'use client';

import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useState } from 'react';
import { Upload, Loader2 } from 'lucide-react';

export default function ScanPage() {
  const { publicKey } = useWallet();
  const [uploading, setUploading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !publicKey) {
      alert('Please connect wallet first');
      return;
    }

    setUploading(true);

    const form = new FormData();
    form.append('pdf', file);
    form.append('pubkey', publicKey.toBase58());

    try {
      const res = await fetch(
        \/functions/v1/scan-pdf,
        { method: 'POST', body: form }
      );

      const data = await res.json();
      setResult(data);
      alert('✅ Scan Complete!');
      console.log('Report:', data);
    } catch (err) {
      alert('Upload failed');
    }

    setUploading(false);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white flex items-center justify-center p-6">
      <div className="max-w-2xl w-full">
        <div className="flex justify-between items-center mb-12">
          <h1 className="text-5xl font-bold">AlphaPaper</h1>
          <WalletMultiButton className="!bg-purple-600 hover:!bg-purple-700" />
        </div>

        <div className="text-center mb-10">
          <p className="text-2xl font-semibold">AI Whitepaper Scanner on Solana</p>
          <p className="text-zinc-500 mt-2">Upload → Get Summary + Hype/Risk Score</p>
        </div>

        <div className="border-2 border-dashed border-zinc-700 rounded-3xl p-20 text-center hover:border-purple-500 transition">
          <input
            type="file"
            accept=".pdf"
            onChange={handleUpload}
            className="hidden"
            id="pdf"
          />
          <label htmlFor="pdf" className="cursor-pointer flex flex-col items-center">
            {uploading ? (
              <Loader2 className="w-20 h-20 animate-spin text-purple-500" />
            ) : (
              <Upload className="w-20 h-20" />
            )}
            <p className="mt-8 text-2xl font-bold">
              {uploading ? 'Analyzing with DeepSeek...' : 'Drop Whitepaper PDF'}
            </p>
            <p className="text-zinc-500 mt-3">or click to select</p>
          </label>
        </div>

        {result && (
          <div className="mt-8 p-6 bg-zinc-900 rounded-2xl">
            <h3 className="font-bold text-xl">✅ Report Generated</h3>
            <pre className="text-sm mt-4 overflow-auto">{JSON.stringify(result, null, 2)}</pre>
          </div>
        )}
      </div>
    </div>
  );
}
