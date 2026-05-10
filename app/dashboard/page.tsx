'use client';
import { useWallet } from '@solana/wallet-adapter-react';
import { useEffect, useState } from 'react';
import ReportCard from '@/components/ReportCard';

export default function Dashboard() {
  const { publicKey } = useWallet();
  const [reports, setReports] = useState([]);

  // Fetch from Supabase here
  useEffect(() => {
    if (publicKey) {
      // supabase query
      console.log('Loading reports for', publicKey.toBase58());
    }
  }, [publicKey]);

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-8">Your Scans</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Report Cards */}
      </div>
    </div>
  );
}