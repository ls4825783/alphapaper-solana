'use client';
import { useState } from 'react';
export default function PaperChat({ reportId }: any) {
  const [messages, setMessages] = useState([]);
  return (
    <div className="mt-12 bg-zinc-900 p-6 rounded-3xl">
      <h3 className="text-xl font-bold mb-4">Chat with this Paper</h3>
      {/* Chat UI */}
    </div>
  );
}