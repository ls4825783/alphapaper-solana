'use client';
import { useWallet } from '@solana/wallet-adapter-react';
import { useState } from 'react';
import { Upload, Loader2 } from 'lucide-react';

export default function UploadZone() {
  const { publicKey } = useWallet();
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !publicKey) return alert('Connect wallet first');

    setUploading(true);
    const form = new FormData();
    form.append('pdf', file);
    form.append('pubkey', publicKey.toBase58());

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/scan-pdf`, {
        method: 'POST',
        body: form,
      });
      const data = await res.json();
      alert(`Scan complete! Report ID: ${data.report.id}`);
    } catch (err) {
      alert('Upload failed');
    }
    setUploading(false);
  };

  return (
    <div className="border-2 border-dashed border-zinc-700 rounded-3xl p-16 text-center hover:border-purple-500 transition-all">
      <input type="file" accept=".pdf" onChange={handleUpload} className="hidden" id="pdf-upload" />
      <label htmlFor="pdf-upload" className="cursor-pointer flex flex-col items-center">
        {uploading ? <Loader2 className="w-16 h-16 animate-spin text-purple-500" /> : <Upload className="w-16 h-16 mb-6" />}
        <p className="text-2xl font-bold">Drop Whitepaper PDF</p>
        <p className="text-zinc-500 mt-2">Max 40 pages • Instant AI Analysis</p>
      </label>
    </div>
  );
}