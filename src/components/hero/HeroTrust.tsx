import React from 'react';
import { useTranslation } from '../../hooks/useTranslation';

export default function HeroTrust() {
  const { t } = useTranslation();

  return (
    <div className="mt-16 flex flex-wrap justify-center items-center gap-8 animate-fade-in-delay">
      {[
        t.hero.trust.creators,
        t.hero.trust.results,
        t.hero.trust.support
      ].map((text, index) => (
        <div 
          key={index}
          className="group relative"
        >
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-accent rounded-full animate-pulse" 
              style={{ animationDelay: `${index * 0.2}s` }} 
            />
            <span className="text-white relative">
              <span className="relative">
                <span className="absolute inset-0 bg-gradient-to-r from-white via-accent to-white bg-clip-text text-transparent animate-shine opacity-0 group-hover:opacity-100">
                  {text}
                </span>
                <span className="relative bg-gradient-to-r from-white/80 to-white/80 bg-clip-text text-transparent transition-opacity duration-300 group-hover:opacity-0">
                  {text}
                </span>
              </span>
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}