import React, { createContext, useContext, useEffect } from 'react';
import { useLanguageStore } from '../store/language';
import type { Translations } from '../translations/types';
import en from '../translations/en';

interface TranslationContextType {
  t: Translations;
  language: string;
  dir: 'ltr' | 'rtl';
  setLanguage: (lang: 'en' | 'ar') => void;
}

const TranslationContext = createContext<TranslationContextType | null>(null);

export function TranslationProvider({ children }: { children: React.ReactNode }) {
  const { language, translations, setLanguage } = useLanguageStore();

  useEffect(() => {
    // Ensure translations are available on mount
    if (!translations) {
      setLanguage('en');
    }
  }, []);

  const value = {
    t: translations || en,
    language,
    dir: language === 'ar' ? 'rtl' : 'ltr',
    setLanguage,
  };

  return (
    <TranslationContext.Provider value={value}>
      {children}
    </TranslationContext.Provider>
  );
}

export function useTranslation() {
  const context = useContext(TranslationContext);
  if (!context) {
    throw new Error('useTranslation must be used within a TranslationProvider');
  }
  return context;
}