import React from 'react';
import { useLanguageStore } from '../store/language';

export default function LanguageSwitch() {
  const { language, setLanguage } = useLanguageStore();

  return (
    <button
      onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')}
      className="flex items-center justify-center w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 transition-colors"
      aria-label={`Switch to ${language === 'en' ? 'Arabic' : 'English'}`}
    >
      <span className="text-white font-medium">
        {language === 'en' ? 'ع' : 'EN'}
      </span>
    </button>
  );
}