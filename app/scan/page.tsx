'use client';

import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider, WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { PhantomWalletAdapter, SolflareWalletAdapter } from '@solana/wallet-adapter-wallets';
import { clusterApiUrl } from '@solana/web3.js';
import { useMemo, useState } from 'react';
import { Upload, Loader2 } from 'lucide-react';

export default function ScanPage() {
  const network = 'devnet';
  const endpoint = useMemo(() => clusterApiUrl(network), []);
  const wallets = useMemo(() => [
    new PhantomWalletAdapter(),
    new SolflareWalletAdapter(),
  ], []);

  const [uploading, setUploading] = useState(false);
  const [result, setResult] = useState(null);

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) {
      alert("Select a PDF");
      return;
    }

    setUploading(true);

    const form = new FormData();
    form.append("pdf", file);
    form.append("pubkey", "temp-wallet"); // temporary until wallet is connected

    try {
      const res = await fetch(
        process.env.NEXT_PUBLIC_SUPABASE_URL + "/functions/v1/scan-pdf",
        { method: "POST", body: form }
      );
      const data = await res.json();
      setResult(data);
      alert("✅ Scan Complete!");
      console.log(data);
    } catch (err) {
      alert("Error: " + err);
    }

    setUploading(false);
  };

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          <div className="min-h-screen bg-zinc-950 text-white p-8">
            <div className="max-w-2xl mx-auto">
              <div className="flex justify-between items-center mb-12">
                <h1 className="text-6xl font-bold">AlphaPaper</h1>
                <WalletMultiButton />
              </div>

              <div className="border-2 border-dashed border-zinc-700 rounded-3xl p-24 text-center hover:border-purple-500">
                <input type="file" accept=".pdf" onChange={handleUpload} className="hidden" id="pdf" />
                <label htmlFor="pdf" className="cursor-pointer block">
                  {uploading ? <Loader2 className="mx-auto w-24 h-24 animate-spin text-purple-500" /> : <Upload className="mx-auto w-24 h-24" />}
                  <p className="mt-8 text-2xl font-bold">Drop Whitepaper PDF</p>
                </label>
              </div>

              {result && (
                <div className="mt-10 bg-zinc-900 p-6 rounded-2xl">
                  <h3 className="font-bold mb-3">Result:</h3>
                  <pre className="text-xs overflow-auto">{JSON.stringify(result, null, 2)}</pre>
                </div>
              )}
            </div>
          </div>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}
