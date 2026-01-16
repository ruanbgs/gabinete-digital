interface KpiCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  className?: string;
}

export default function KpiCard({ title, value, subtitle, className = '' }: KpiCardProps) {
  return (
    <div
      className={`rounded-2xl border border-white/10 bg-white/5 p-6 ${className}`}
    >
      <p className="text-sm font-medium text-white/70">{title}</p>
      <p className="mt-2 text-3xl font-bold text-white">{value}</p>
      {subtitle && <p className="mt-1 text-xs text-white/60">{subtitle}</p>}
    </div>
  );
}
