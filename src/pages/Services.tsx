import React from 'react';
import { TrendingUp, Users, DollarSign, BarChart, MessageCircle, Target, ArrowRight } from 'lucide-react';
import SplineBackground from '../components/SplineBackground';
import { useTranslation } from '../hooks/useTranslation';

const serviceIcons = {
  monetization: DollarSign,
  audience: Users,
  growth: TrendingUp,
  brand: Target,
  content: MessageCircle,
  analytics: BarChart,
};

export default function Services() {
  const { t } = useTranslation();

  return (
    <main className="flex-grow">
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <SplineBackground />
        
        <div className="relative z-10 w-full py-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="animate-gradient-shine backdrop-blur-xl bg-gradient-to-br from-black/40 via-primary/40 to-accent/20 rounded-3xl p-8 md:p-12 border border-white/10">
              <div className="text-center mb-16">
                <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">
                  {t.services.title}
                  <span className="block text-accent mt-2">{t.services.subtitle}</span>
                </h1>
                <p className="text-xl text-white/90 max-w-3xl mx-auto">
                  {t.services.description}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {Object.entries(t.services.items).map(([key, service]) => {
                  const Icon = serviceIcons[key as keyof typeof serviceIcons];
                  
                  return (
                    <div
                      key={key}
                      className="group relative bg-white/10 rounded-2xl p-8 border border-white/20 hover:border-accent/50 transition-all duration-500 transform hover:-translate-y-1 overflow-hidden"
                    >
                      {/* Icon */}
                      <div className="mb-6">
                        <div className="w-14 h-14 bg-accent/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                          <Icon className="text-accent w-7 h-7" />
                        </div>
                      </div>

                      {/* Content */}
                      <div className="space-y-4">
                        <h3 className="text-2xl font-bold text-white group-hover:text-accent transition-colors duration-300">
                          {service.title}
                        </h3>
                        <p className="text-white/80 leading-relaxed">
                          {service.description}
                        </p>

                        {/* Features */}
                        <ul className="space-y-2 pt-4">
                          {service.features.map((feature, i) => (
                            <li key={i} className="flex items-center text-white/70">
                              <div className="w-1.5 h-1.5 bg-accent rounded-full mr-2" />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Hover Effect */}
                      <div className="absolute inset-0 bg-gradient-to-br from-accent/0 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>
                  );
                })}
              </div>

              {/* CTA Section */}
              <div className="text-center mt-16">
                <h3 className="text-2xl font-bold text-white mb-4">
                  {t.services.cta}
                </h3>
                <a
                  href="/contact"
                  className="inline-flex items-center justify-center px-8 py-4 bg-accent text-white rounded-xl hover:bg-accent-hover transition-all duration-300 transform hover:scale-105 group"
                >
                  {t.nav.getStarted}
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