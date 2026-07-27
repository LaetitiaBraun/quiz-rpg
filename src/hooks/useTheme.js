import { useState, useEffect } from 'react';

export const useTheme = () => {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('quiz-rpg-theme');
    return saved ? saved === 'dark' : true;
  });

  useEffect(() => {
    localStorage.setItem('quiz-rpg-theme', isDark ? 'dark' : 'light');
    
    // Appliquer immédiatement les couleurs
    applyTheme(isDark);
  }, [isDark]);

  // S'assurer que le thème est appliqué au chargement
  useEffect(() => {
    applyTheme(isDark);
  }, []);

  const applyTheme = (dark) => {
    const root = document.documentElement;
    
    if (dark) {
      // DARK MODE
      root.style.setProperty('--bg-primary', '#0f0a1f');
      root.style.setProperty('--bg-secondary', '#1a0f2e');
      root.style.setProperty('--bg-tertiary', '#2d1a52');
      root.style.setProperty('--text-primary', '#b8a8d8');
      root.style.setProperty('--text-secondary', '#7f9d8c');
      root.style.setProperty('--text-tertiary', '#5a7a6f');
      root.style.setProperty('--border-color', '#7f77dd');
      root.style.setProperty('--accent-gold', '#ffd700');
      root.style.setProperty('--accent-green', '#5dcaa5');
      root.style.setProperty('--accent-red', '#ff6b6b');
      root.style.setProperty('--accent-orange', '#ffc107');
      document.body.style.backgroundColor = '#0f0a1f';
    } else {
      // LIGHT MODE
      root.style.setProperty('--bg-primary', '#f8f6fc');
      root.style.setProperty('--bg-secondary', '#ffffff');
      root.style.setProperty('--bg-tertiary', '#f0ecf8');
      root.style.setProperty('--text-primary', '#3d2566');
      root.style.setProperty('--text-secondary', '#6b5b7d');
      root.style.setProperty('--text-tertiary', '#8b7ba0');
      root.style.setProperty('--border-color', '#b8a8d8');
      root.style.setProperty('--accent-gold', '#d4a934');
      root.style.setProperty('--accent-green', '#2d9b6f');
      root.style.setProperty('--accent-red', '#c93838');
      root.style.setProperty('--accent-orange', '#e89c1c');
      document.body.style.backgroundColor = '#f8f6fc';
    }
  };

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  return { isDark, toggleTheme };
};
