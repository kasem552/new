import React from 'react';
import SplineBackground from '../components/SplineBackground';
import { useTranslation } from '../hooks/useTranslation';
import { SignUpFormComponent } from '../components/forms/SignUpForm';

export default function SignUp() {
  const { t } = useTranslation();

  return (
    <main className="min-h-screen relative">
      <SplineBackground />
      
      <div className="relative z-10 py-32">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-gradient-shine backdrop-blur-xl bg-gradient-to-br from-black/40 via-primary/40 to-accent/20 rounded-3xl p-8 md:p-12 border border-white/10">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                {t.signup.title}
              </h1>
              <p className="text-xl text-white/90">
                {t.signup.subtitle}
              </p>
            </div>

            <SignUpFormComponent />
          </div>
        </div>
      </div>
    </main>
  );
}