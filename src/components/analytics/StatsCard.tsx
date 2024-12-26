import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: number | string;
  icon: LucideIcon;
  trend: string;
  description: string;
}

export default function StatsCard({ title, value, icon: Icon, trend, description }: StatsCardProps) {
  const isPositiveTrend = trend.startsWith('+');

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 p-6 hover:border-accent/50 transition-all duration-300">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-white/70">{title}</p>
          <p className="text-3xl font-bold mt-2 text-white">{value}</p>
        </div>
        <div className="w-12 h-12 bg-accent/20 rounded-xl flex items-center justify-center">
          <Icon className="text-accent" size={24} />
        </div>
      </div>
      <div className="mt-4 flex items-center justify-between">
        <span className={`text-sm ${isPositiveTrend ? 'text-green-400' : 'text-red-400'}`}>
          {trend}
        </span>
        <span className="text-white/70 text-sm">{description}</span>
      </div>
    </div>
  );
}