import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import Logo from './Logo';
import LanguageSwitch from './LanguageSwitch';
import { useTranslation } from '../hooks/useTranslation';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { t } = useTranslation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: t.nav.about, path: '/about' },
    { name: t.nav.services, path: '/services' },
    { name: t.nav.calculator, path: '/calculator' },
    { name: t.nav.contact, path: '/contact' },
  ];

  return (
    <div className="fixed w-full z-50 px-4 sm:px-6 lg:px-8 pt-4">
      <nav 
        className={`max-w-7xl mx-auto rounded-2xl transition-all duration-300 ${
          isScrolled 
            ? 'glass-effect shadow-lg'
            : 'bg-transparent'
        }`}
      >
        <div className="px-6 lg:px-8">
          <div className="flex justify-between items-center h-24">
            <Logo />
            
            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-white hover:text-accent transition-colors ${
                    location.pathname === link.path ? 'text-accent' : ''
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <LanguageSwitch />
              <Link
                to="/signup"
                className="btn btn-primary"
              >
                {t.nav.getStarted}
              </Link>
            </div>

            <div className="md:hidden flex items-center space-x-4">
              <LanguageSwitch />
              <button 
                onClick={() => setIsOpen(!isOpen)}
                className="text-white hover:text-accent transition-colors"
                aria-label="Toggle menu"
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {isOpen && (
          <div className="md:hidden absolute left-0 right-0 mt-2 px-4">
            <div className="glass-effect rounded-xl shadow-lg p-4 mx-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`block px-4 py-2 rounded-lg text-white hover:text-accent transition-colors ${
                    location.pathname === link.path ? 'text-accent' : ''
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <Link
                to="/signup"
                className="block w-full text-center btn btn-primary mt-2"
                onClick={() => setIsOpen(false)}
              >
                {t.nav.getStarted}
              </Link>
            </div>
          </div>
        )}
      </nav>
    </div>
  );
}