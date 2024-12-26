import React from 'react';
import { ArrowRight } from 'lucide-react';
import SplineBackground from '../components/SplineBackground';
import { TeamGrid } from '../components/about/TeamGrid';
import { useTranslation } from '../hooks/useTranslation';
import { teamMembers } from '../data/team';

export default function About() {
  const { t } = useTranslation();

  // Filter leadership members (owner and supervisor roles)
  const leadershipMembers = teamMembers.filter(
    member => member.role === 'owner' || member.role === 'supervisor'
  );

  // Filter and order team members (agent role)
  const orderedTeamMembers = teamMembers
    .filter(member => member.role === 'agent')
    .sort((a, b) => a.name.localeCompare(b.name));

  return (
    <main className="flex-grow">
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <SplineBackground />
        
        <div className="relative z-10 w-full py-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="animate-gradient-shine backdrop-blur-xl bg-gradient-to-br from-black/40 via-primary/40 to-accent/20 rounded-3xl p-8 md:p-12 border border-white/10">
              {/* Header Section */}
              <div className="text-center mb-16">
                <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">
                  {t.about.title}
                  <span className="block text-accent mt-2">{t.about.subtitle}</span>
                </h1>
                <p className="text-xl text-white/90 max-w-3xl mx-auto">
                  {t.about.description}
                </p>
              </div>

              <TeamGrid 
                leadershipMembers={leadershipMembers}
                orderedTeamMembers={orderedTeamMembers}
              />

              {/* CTA Section */}
              <div className="text-center">
                <h3 className="text-2xl font-bold text-white mb-4">
                  {t.about.cta.title}
                </h3>
                <a
                  href="/signup"
                  className="inline-flex items-center justify-center px-8 py-4 bg-accent text-white rounded-xl hover:bg-accent-hover transition-all duration-300 transform hover:scale-105 group"
                >
                  {t.about.cta.button}
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}