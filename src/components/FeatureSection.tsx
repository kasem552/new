import React from 'react';
import { TrendingUp, Users, DollarSign, BarChart, MessageCircle, Target, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from '../hooks/useTranslation';

export default function FeatureSection() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const services = [
    {
      icon: TrendingUp,
      title: "Live Growth Strategy",
      description: "Custom growth plans tailored to your live streaming goals, backed by data-driven insights.",
      features: ["Audience Analysis", "Content Strategy", "Performance Tracking"]
    },
    {
      icon: Users,
      title: "Audience Engagement",
      description: "Master the art of captivating your viewers and building a loyal community.",
      features: ["Interactive Sessions", "Community Building", "Engagement Tactics"]
    },
    {
      icon: DollarSign,
      title: "Monetization Guidance",
      description: "Transform your passion into profit with proven monetization strategies.",
      features: ["Revenue Optimization", "Brand Partnerships", "Gift Management"]
    },
    {
      icon: BarChart,
      title: "Analytics & Insights",
      description: "Make data-driven decisions with our comprehensive analytics tools.",
      features: ["Performance Metrics", "Growth Tracking", "Trend Analysis"]
    },
    {
      icon: MessageCircle,
      title: "Content Strategy",
      description: "Create compelling content that resonates with your target audience.",
      features: ["Content Planning", "Topic Research", "Trend Adaptation"]
    },
    {
      icon: Target,
      title: "Brand Development",
      description: "Build a strong, recognizable brand that stands out on TikTok.",
      features: ["Brand Identity", "Visual Design", "Brand Voice"]
    }
  ];

  return (
    <section id="services" className="py-20 bg-gradient-to-br from-primary/5 via-background to-primary/5 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            Comprehensive Services for
            <span className="text-accent block mt-2">TikTok Live Success</span>
          </h2>
          <p className="text-xl text-primary-light max-w-3xl mx-auto">
            Unlock your full potential with our expert-crafted solutions designed for modern content creators
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1 overflow-hidden animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative mb-6">
                <div className="w-14 h-14 bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                  <service.icon className="text-accent w-7 h-7 group-hover:text-primary transition-colors duration-500" />
                </div>
              </div>

              <div className="relative space-y-4">
                <h3 className="text-2xl font-bold text-primary group-hover:text-accent transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-primary-light leading-relaxed">
                  {service.description}
                </p>

                <ul className="space-y-2 pt-4">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-center text-primary-light">
                      <div className="w-1.5 h-1.5 bg-accent rounded-full mr-2" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="pt-6">
                  <button
                    onClick={() => navigate('/signup')}
                    className="inline-flex items-center text-accent font-semibold group-hover:text-primary transition-colors duration-300"
                  >
                    Get Started
                    <Zap className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </button>
                </div>
              </div>

              <div className="absolute top-0 right-0 w-20 h-20 transform translate-x-10 -translate-y-10">
                <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-primary/10 rounded-full blur-2xl group-hover:opacity-75 transition-opacity duration-500" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}