import { cn } from "@/lib/cn";

export default function ChartCard({ title, subtitle, children, className }) {
  return (
    <div className={cn("border border-ink/10 bg-ivory p-6", className)}>
      <div className="flex items-baseline justify-between">
        <div>
          <h3 className="font-display text-xl">{title}</h3>
          {subtitle && (
            <p className="text-taupe text-xs">{subtitle}</p>
          )}
        </div>
      </div>
      <div className="mt-6">
        {children || <FakeLineChart />}
      </div>
    </div>
  );
}

function FakeLineChart() {
  // Just SVG decorative — wireframe placeholder
  return (
    <svg viewBox="0 0 400 120" className="w-full h-32">
      <defs>
        <linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--brass)" stopOpacity="0.3" />
          <stop offset="100%" stopColor="var(--brass)" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path
        d="M0 90 L40 80 L80 70 L120 75 L160 50 L200 55 L240 35 L280 40 L320 25 L360 30 L400 15 L400 120 L0 120 Z"
        fill="url(#g)"
      />
      <path
        d="M0 90 L40 80 L80 70 L120 75 L160 50 L200 55 L240 35 L280 40 L320 25 L360 30 L400 15"
        stroke="var(--brass)"
        strokeWidth="1.5"
        fill="none"
      />
      {[0, 60, 120].map((y) => (
        <line
          key={y}
          x1="0"
          x2="400"
          y1={y + 15}
          y2={y + 15}
          stroke="var(--ink)"
          strokeOpacity="0.05"
        />
      ))}
    </svg>
  );
}
