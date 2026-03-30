interface Bar {
  label: string;
  value: number;
  highlight?: boolean; // 오늘 등 강조
}

interface BarChartProps {
  bars: Bar[];
  unit?: string;
  goal?: number;
  color?: string; // tailwind bg class
  highlightColor?: string;
}

export default function BarChart({ bars, unit = '', goal, color = 'bg-indigo-400', highlightColor = 'bg-indigo-600' }: BarChartProps) {
  const maxVal = Math.max(...bars.map((b) => b.value), goal ?? 0, 1);

  return (
    <div className="flex items-end gap-1.5 h-28 w-full">
      {bars.map((bar, i) => {
        const pct = Math.min((bar.value / maxVal) * 100, 100);
        const isEmpty = bar.value === 0;
        return (
          <div key={i} className="flex-1 flex flex-col items-center gap-1">
            {/* value label */}
            <span className="text-[9px] text-gray-400 leading-none">
              {isEmpty ? '' : bar.value >= 1000 ? `${(bar.value / 1000).toFixed(1)}k` : bar.value}
            </span>
            {/* bar */}
            <div className="w-full flex-1 flex items-end">
              <div
                className={`w-full rounded-t-md transition-all duration-500 ${
                  isEmpty ? 'bg-gray-100' : bar.highlight ? highlightColor : color
                }`}
                style={{ height: isEmpty ? '6px' : `${Math.max(pct, 8)}%` }}
              />
            </div>
            {/* day label */}
            <span className={`text-[10px] font-medium ${bar.highlight ? 'text-indigo-600' : 'text-gray-400'}`}>
              {bar.label}
            </span>
            {unit && !isEmpty && (
              <span className="text-[8px] text-gray-300">{unit}</span>
            )}
          </div>
        );
      })}
    </div>
  );
}
