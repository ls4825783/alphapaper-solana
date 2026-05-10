export default function ReportCard({ report }: any) {
  const a = report.analysis || {};
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 hover:border-purple-500">
      <h3 className="font-bold text-lg mb-3">{report.title}</h3>
      <p className="text-sm text-zinc-400 line-clamp-3 mb-4">{a.summary}</p>
      <div className="flex gap-4">
        <div className="bg-emerald-500/10 text-emerald-400 px-4 py-2 rounded-2xl text-sm">HYPE {a.hype_score}</div>
        <div className="bg-red-500/10 text-red-400 px-4 py-2 rounded-2xl text-sm">RISK {a.risk_score}</div>
      </div>
    </div>
  );
}