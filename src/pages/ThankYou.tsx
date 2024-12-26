import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import SplineBackground from '../components/SplineBackground';
import { useTranslation } from '../hooks/useTranslation';

export default function ThankYou() {
  const { t } = useTranslation();

  return (
    <main className="min-h-screen relative flex items-center justify-center">
      <SplineBackground />
      
      <div className="relative z-10 w-full max-w-2xl mx-auto px-4">
        <div className="animate-gradient-shine backdrop-blur-xl bg-gradient-to-br from-black/40 via-primary/40 to-accent/20 rounded-3xl p-8 md:p-12 border border-white/10 text-center">
          <div className="mb-8 flex justify-center">
            <div className="w-20 h-20 rounded-full bg-accent/20 flex items-center justify-center">
              <CheckCircle className="w-12 h-12 text-accent" />
            </div>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {t.thankYou.title}
          </h1>
          
          <p className="text-lg text-white/90 mb-8">
            {t.thankYou.message}
          </p>

          <div className="space-y-6">
            <div className="p-6 bg-white/10 rounded-xl">
              <h2 className="text-xl font-semibold text-white mb-4">
                {t.thankYou.nextSteps.title}
              </h2>
              <ul className="space-y-3 text-white/80">
                {t.thankYou.nextSteps.steps.map((step, index) => (
                  <li key={index} className="flex items-center">
                    <div className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center mr-3 flex-shrink-0">
                      <span className="text-accent text-sm">{index + 1}</span>
                    </div>
                    {step}
                  </li>
                ))}
              </ul>
            </div>

            <Link
              to="/"
              className="inline-block px-8 py-3 bg-accent text-white rounded-xl hover:bg-accent-hover transition-all duration-300"
            >
              {t.thankYou.backHome}
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}