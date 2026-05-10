'use client';
import { useWallet } from '@solana/wallet-adapter-react';
import { useState } from 'react';
import { Upload, Loader2 } from 'lucide-react';
export default function UploadZone() {
  const { publicKey } = useWallet();
  const [uploading, setUploading] = useState(false);
  const handleUpload = async (e: any) => {
    const file = e.target.files[0];
    if (!file || !publicKey) return alert('Connect wallet first');
    setUploading(true);
    const form = new FormData();
    form.append('pdf', file);
    form.append('pubkey', publicKey.toBase58());
    const res = await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/scan-pdf`, { method: 'POST', body: form });
    const data = await res.json();
    alert('Scan complete! Check dashboard');
    setUploading(false);
  };
  return (
    <label className="border-2 border-dashed border-zinc-700 hover:border-purple-500 rounded-3xl p-16 text-center block cursor-pointer">
      <input type="file" accept=".pdf" onChange={handleUpload} className="hidden" />
      {uploading ? <Loader2 className="mx-auto w-12 h-12 animate-spin" /> : <Upload className="mx-auto w-12 h-12" />}
      <p className="mt-6 text-2xl font-bold">Drop Whitepaper Here</p>
      <p className="text-zinc-500">or click to browse • Powered by Solana</p>
    </label>
  );
}