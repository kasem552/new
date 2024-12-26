import React from 'react';
import { Instagram, Send } from 'lucide-react';
import { Link } from 'react-router-dom';
import Logo from './Logo';
import { useTranslation } from '../hooks/useTranslation';

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="bg-gradient-to-br from-primary to-primary-light/90 text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {/* Brand Section */}
          <div className="space-y-6">
            <Logo />
            <p className="text-white/80 leading-relaxed">
              {t.hero.description}
            </p>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-white">{t.footer.quickLinks}</h4>
            <ul className="space-y-4">
              {[
                { name: t.nav.about, path: '/about' },
                { name: t.nav.services, path: '/services' },
                { name: t.nav.calculator, path: '/calculator' },
                { name: t.nav.contact, path: '/contact' },
              ].map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.path}
                    className="text-white/70 hover:text-accent transition-colors duration-300 flex items-center gap-2"
                  >
                    <span className="w-1.5 h-1.5 bg-accent rounded-full" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Connect */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-white">{t.footer.connect}</h4>
            <div className="space-y-4">
              <a 
                href="#" 
                className="flex items-center gap-3 text-white/70 hover:text-accent transition-colors duration-300 group"
              >
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors duration-300">
                  <Instagram size={20} className="group-hover:scale-110 transition-transform duration-300" />
                </div>
                <span className="font-medium">Instagram</span>
              </a>
              <a 
                href="#" 
                className="flex items-center gap-3 text-white/70 hover:text-accent transition-colors duration-300 group"
              >
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors duration-300">
                  <svg 
                    viewBox="0 0 24 24" 
                    fill="currentColor" 
                    className="w-5 h-5 group-hover:scale-110 transition-transform duration-300"
                  >
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                  </svg>
                </div>
                <span className="font-medium">TikTok</span>
              </a>
            </div>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="pt-8 mt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/60 text-sm">
              &copy; {new Date().getFullYear()} Canaan Culture Media. {t.footer.rights}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}