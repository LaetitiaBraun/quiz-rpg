import { useState, useEffect } from 'react';

export const useTheme = () => {
  // Lire depuis localStorage au démarrage
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('quiz-rpg-theme');
    return saved ? saved === 'dark' : true;
  });

  // Appliquer le thème quand isDark change
  useEffect(() => {
    localStorage.setItem('quiz-rpg-theme', isDark ? 'dark' : 'light');
    applyTheme(isDark);
  }, [isDark]);

  // S'assurer que le thème est appliqué au montage du composant
  useEffect(() => {
    applyTheme(isDark);
    
    // Écouter les changements de localStorage (si changement d'onglet/fenêtre)
    const handleStorageChange = () => {
      const saved = localStorage.getItem('quiz-rpg-theme');
      const newIsDark = saved ? saved === 'dark' : true;
      if (newIsDark !== isDark) {
        setIsDark(newIsDark);
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [isDark]);

  const applyTheme = (dark) => {
    const root = document.documentElement;
    
    if (dark) {
      // ========== DARK MODE ==========
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
      root.style.setProperty('--bg-overlay-primary', 'rgba(127, 119, 221, 0.1)');
      root.style.setProperty('--bg-overlay-secondary', 'rgba(31, 20, 76, 0.3)');
      root.style.setProperty('--bg-overlay-tertiary', 'rgba(0, 0, 0, 0.2)');
      document.body.style.backgroundColor = '#0f0a1f';
    } else {
      // ========== LIGHT MODE - ULTRA LISIBLE ==========
      root.style.setProperty('--bg-primary', '#faf9fc');
      root.style.setProperty('--bg-secondary', '#ffffff');
      root.style.setProperty('--bg-tertiary', '#f0ecf8');
      root.style.setProperty('--text-primary', '#0f0a1f');
      root.style.setProperty('--text-secondary', '#2d1f4d');
      root.style.setProperty('--text-tertiary', '#453366');
      root.style.setProperty('--border-color', '#6b5598');
      root.style.setProperty('--accent-gold', '#aa6600');
      root.style.setProperty('--accent-green', '#0d5c42');
      root.style.setProperty('--accent-red', '#aa1111');
      root.style.setProperty('--accent-orange', '#c46a00');
      root.style.setProperty('--bg-overlay-primary', 'rgba(107, 85, 152, 0.15)');
      root.style.setProperty('--bg-overlay-secondary', 'rgba(107, 85, 152, 0.08)');
      root.style.setProperty('--bg-overlay-tertiary', 'rgba(0, 0, 0, 0.05)');
      document.body.style.backgroundColor = '#faf9fc';
    }
  };

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  return { isDark, toggleTheme };
};
