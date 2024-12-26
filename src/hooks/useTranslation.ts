import { useLanguageStore } from '../store/language';
import en from '../translations/en';

export function useTranslation() {
  const { language, translations } = useLanguageStore();

  // Fallback to English translations if translations are undefined
  const safeTranslations = translations || en;

  return {
    t: safeTranslations,
    language,
    dir: language === 'ar' ? 'rtl' : 'ltr',
  };
}