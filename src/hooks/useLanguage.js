import { useState, useEffect } from 'react';
import { translations } from '../data/translations';

export const useLanguage = () => {
  const [lang, setLang] = useState(() => {
    return localStorage.getItem('quiz-rpg-lang') || 'fr';
  });

  useEffect(() => {
    localStorage.setItem('quiz-rpg-lang', lang);
  }, [lang]);

  const t = translations[lang] || translations.fr;

  const toggleLang = () => setLang(prev => prev === 'fr' ? 'en' : 'fr');
  const setLanguage = (l) => setLang(l);

  return { lang, t, toggleLang, setLanguage };
};
