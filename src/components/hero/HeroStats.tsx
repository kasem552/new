import React from 'react';
import { useTranslation } from '../../hooks/useTranslation';
import { useCountUp } from '../../hooks/useCountUp';

export default function HeroStats() {
  const { t } = useTranslation();
  
  const stats = [
    {
      value: useCountUp({ end: 10, suffix: 'M+' }),
      label: t.hero.stats.views,
    },
    {
      value: useCountUp({ end: 1000, suffix: '+' }),
      label: t.hero.stats.creators,
    },
    {
      value: useCountUp({ end: 95, suffix: '%' }),
      label: t.hero.stats.successRate,
    },
    {
      value: '24/7',
      label: t.hero.stats.support,
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12 animate-fade-in-delay">
      {stats.map((stat, index) => (
        <div 
          key={index} 
          className="stats-card group animate-gradient-shine"
        >
          <div className="relative z-10">
            <div className="text-2xl md:text-3xl font-bold text-white group-hover:text-accent transition-colors">
              {stat.value}
            </div>
            <div className="text-sm text-white/80 group-hover:text-white transition-colors">
              {stat.label}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}