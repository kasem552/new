import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import SplineBackground from './SplineBackground';
import HeroTitle from './hero/HeroTitle';
import HeroStats from './hero/HeroStats';
import HeroTrust from './hero/HeroTrust';
import { useTranslation } from '../hooks/useTranslation';

export default function HeroSection() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleSignUp = () => {
    navigate('/signup');
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <SplineBackground />
      
      <div className="relative z-10 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
          <div className="animate-gradient-shine backdrop-blur-xl bg-gradient-to-br from-black/40 via-primary/40 to-accent/20 rounded-3xl p-8 md:p-12 border border-white/10">
            <div className="text-center">
              <HeroTitle />
              <HeroStats />
              <div className="flex justify-center animate-fade-in-delay">
                <button
                  onClick={handleSignUp}
                  className="glow-button group"
                >
                  {t.hero.cta.signUp}
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform rtl-flip" size={20} />
                </button>
              </div>
              <HeroTrust />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}