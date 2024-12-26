import React from 'react';
import HeroSection from '../components/HeroSection';
import FeatureSection from '../components/FeatureSection';

export default function HomePage() {
  return (
    <main className="flex-grow">
      <HeroSection />
      <FeatureSection />
    </main>
  );
}