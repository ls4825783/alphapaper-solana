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
      alert('Connect wallet first!');
      return;
    }

    setUploading(true);

    const form = new FormData();
    form.append('pdf', file);
    form.append('pubkey', publicKey.toBase58());

    try {
      const res = await fetch(
        process.env.NEXT_PUBLIC_SUPABASE_URL + '/functions/v1/scan-pdf',
        { method: 'POST', body: form }
      );

      const data = await res.json();
      setResult(data);
      alert('✅ Scan Complete! Check console (F12)');
      console.log(data);
    } catch (err) {
      alert('Error: ' + err);
    }

    setUploading(false);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white flex items-center justify-center p-8">
      <div className="max-w-xl w-full">
        <div className="flex justify-between mb-12">
          <h1 className="text-6xl font-bold">AlphaPaper</h1>
          <WalletMultiButton />
        </div>

        <div className="border-2 border-dashed border-zinc-700 rounded-3xl p-24 text-center hover:border-purple-600 transition">
          <input type="file" accept=".pdf" onChange={handleUpload} className="hidden" id="pdf" />
          <label htmlFor="pdf" className="cursor-pointer block">
            {uploading ? <Loader2 className="mx-auto w-20 h-20 animate-spin text-purple-500" /> : <Upload className="mx-auto w-20 h-20" />}
            <p className="text-2xl font-bold mt-8">
              {uploading ? "Analyzing with DeepSeek AI..." : "Drop Whitepaper PDF Here"}
            </p>
          </label>
        </div>

        {result && <pre className="mt-8 bg-black p-6 rounded-2xl text-xs overflow-auto">{JSON.stringify(result, null, 2)}</pre>}
      </div>
    </div>
  );
}
