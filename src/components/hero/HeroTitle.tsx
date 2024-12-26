import React from 'react';
import { useTranslation } from '../../hooks/useTranslation';

export default function HeroTitle() {
  const { t } = useTranslation();
  
  return (
    <div className="mb-8 animate-fade-in max-w-4xl mx-auto">
      <h1 className="uppercase tracking-wider leading-tight">
        <span className="block text-[36px] font-normal text-[#F6F8F8] tracking-[1px] mb-2">
          {t.hero.title}
        </span>
        <span className="block text-[48px] font-bold tracking-[1px] leading-[1.3] bg-gradient-to-r from-[#1FDCEA] via-white to-[#1FDCEA] text-transparent bg-clip-text bg-300% animate-shine">
          {t.hero.subtitle} <span className="text-sm font-normal text-white opacity-70">(Middle East and North Africa)</span>
        </span>
      </h1>
      <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto mt-6 animate-fade-in-delay">
        {t.hero.description}
      </p>
    </div>
  );
}