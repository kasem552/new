import React from 'react';

interface DateRangeSelectorProps {
  value: string;
  onChange: (range: '24h' | '7d' | '30d' | 'all') => void;
}

export default function DateRangeSelector({ value, onChange }: DateRangeSelectorProps) {
  const ranges = [
    { value: '24h', label: 'Last 24h' },
    { value: '7d', label: 'Last 7 days' },
    { value: '30d', label: 'Last 30 days' },
    { value: 'all', label: 'All time' }
  ];

  return (
    <div className="flex space-x-2">
      {ranges.map((range) => (
        <button
          key={range.value}
          onClick={() => onChange(range.value as '24h' | '7d' | '30d' | 'all')}
          className={`px-4 py-2 rounded-lg transition-colors ${
            value === range.value
              ? 'bg-accent text-white'
              : 'bg-white/10 text-white/70 hover:bg-white/20'
          }`}
        >
          {range.label}
        </button>
      ))}
    </div>
  );
}