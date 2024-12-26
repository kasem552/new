import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Translations } from '../translations/types';
import en from '../translations/en';
import ar from '../translations/ar';

type Language = 'en' | 'ar';

interface LanguageState {
  language: Language;
  translations: Translations;
  setLanguage: (lang: Language) => void;
}

export const useLanguageStore = create<LanguageState>()(
  persist(
    (set) => ({
      language: 'en',
      translations: en,
      setLanguage: (language) => set({ 
        language, 
        translations: language === 'en' ? en : ar 
      }),
    }),
    {
      name: 'language-storage',
      getStorage: () => ({
        getItem: (name) => {
          const str = localStorage.getItem(name);
          if (!str) return null;
          try {
            const state = JSON.parse(str);
            // Ensure translations are always available
            if (!state.state.translations) {
              state.state.translations = en;
            }
            return state;
          } catch {
            return null;
          }
        },
        setItem: (name, value) => localStorage.setItem(name, JSON.stringify(value)),
        removeItem: (name) => localStorage.removeItem(name),
      }),
    }
  )
);