import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import SplineBackground from '../components/SplineBackground';
import { useTranslation } from '../hooks/useTranslation';

export default function ServiceDetails() {
  const { serviceId } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();

  // Find the service details from translations
  const service = Object.entries(t.services.items).find(([key]) => 
    key.toLowerCase().replace(/\s+/g, '-') === serviceId
  )?.[1];

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Service Not Found</h1>
          <button
            onClick={() => navigate('/services')}
            className="text-accent hover:text-accent-hover transition-colors flex items-center gap-2"
          >
            <ArrowLeft size={20} />
            Back to Services
          </button>
        </div>
      </div>
    );
  }

  return (
    <main className="flex-grow">
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <SplineBackground />
        
        <div className="relative z-10 w-full py-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="animate-gradient-shine backdrop-blur-xl bg-gradient-to-br from-black/40 via-primary/40 to-accent/20 rounded-3xl p-8 md:p-12 border border-white/10">
              <div className="max-w-3xl mx-auto">
                <button
                  onClick={() => navigate('/services')}
                  className="text-accent hover:text-accent-hover transition-colors flex items-center gap-2 mb-8"
                >
                  <ArrowLeft size={20} />
                  Back to Services
                </button>

                <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">
                  {service.title}
                </h1>
                
                <p className="text-xl text-white/90 mb-12">
                  {service.description}
                </p>

                <div className="space-y-8">
                  <h2 className="text-2xl font-bold text-white mb-4">Key Features</h2>
                  <ul className="grid gap-4">
                    {service.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-4 bg-white/10 rounded-xl p-6 border border-white/20">
                        <div className="w-2 h-2 bg-accent rounded-full mt-2" />
                        <p className="text-white/90">{feature}</p>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-12 flex justify-center">
                  <button
                    onClick={() => navigate('/signup')}
                    className="px-8 py-4 bg-accent text-white rounded-xl hover:bg-accent-hover transition-all duration-300 flex items-center gap-2 group"
                  >
                    Get Started Now
                    <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}