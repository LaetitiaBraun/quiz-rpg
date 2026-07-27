import { useState, useEffect } from 'react';

export const useTheme = () => {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('quiz-rpg-theme');
    if (saved) return saved === 'dark';
    return true; // Dark par défaut
  });

  useEffect(() => {
    localStorage.setItem('quiz-rpg-theme', isDark ? 'dark' : 'light');
    
    // Appliquer le thème au document
    if (isDark) {
      document.documentElement.style.setProperty('--bg-primary', '#0f0a1f');
      document.documentElement.style.setProperty('--bg-secondary', '#1a0f2e');
      document.documentElement.style.setProperty('--text-primary', '#b8a8d8');
      document.documentElement.style.setProperty('--text-secondary', '#7f9d8c');
    } else {
      document.documentElement.style.setProperty('--bg-primary', '#f5f3f9');
      document.documentElement.style.setProperty('--bg-secondary', '#ffffff');
      document.documentElement.style.setProperty('--text-primary', '#2d1b4e');
      document.documentElement.style.setProperty('--text-secondary', '#5a5a5a');
    }
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  return { isDark, toggleTheme };
};
