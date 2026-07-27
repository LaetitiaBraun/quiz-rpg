import { useState, useEffect } from 'react';

export const useTheme = () => {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('quiz-rpg-theme');
    return saved ? saved === 'dark' : true;
  });

  useEffect(() => {
    localStorage.setItem('quiz-rpg-theme', isDark ? 'dark' : 'light');
    applyTheme(isDark);
  }, [isDark]);

  useEffect(() => {
    applyTheme(isDark);
  }, []);

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
      
      // Backgrounds semi-transparents (dark mode)
      root.style.setProperty('--bg-overlay-primary', 'rgba(127, 119, 221, 0.1)');
      root.style.setProperty('--bg-overlay-secondary', 'rgba(31, 20, 76, 0.3)');
      root.style.setProperty('--bg-overlay-tertiary', 'rgba(0, 0, 0, 0.2)');
      
      document.body.style.backgroundColor = '#0f0a1f';
    } else {
      // ========== LIGHT MODE - TRÈS LISIBLE ==========
      root.style.setProperty('--bg-primary', '#faf9fc');
      root.style.setProperty('--bg-secondary', '#ffffff');
      root.style.setProperty('--bg-tertiary', '#f0ecf8');
      
      // Texte: HYPER FONCÉ pour maximum de contraste
      root.style.setProperty('--text-primary', '#0f0a1f');        // Presque noir
      root.style.setProperty('--text-secondary', '#2d1f4d');      // Violet très foncé
      root.style.setProperty('--text-tertiary', '#453366');       // Violet foncé
      
      // Bordures: Très visibles
      root.style.setProperty('--border-color', '#6b5598');        // Violet moyen
      
      // Accents: SUPER saturés et foncés
      root.style.setProperty('--accent-gold', '#aa6600');         // Or très foncé
      root.style.setProperty('--accent-green', '#0d5c42');        // Vert très foncé
      root.style.setProperty('--accent-red', '#aa1111');          // Rouge très foncé
      root.style.setProperty('--accent-orange', '#c46a00');       // Orange très foncé
      
      // Backgrounds semi-transparents (light mode) - PLUS VISIBLES
      root.style.setProperty('--bg-overlay-primary', 'rgba(107, 85, 152, 0.15)');    // Violet plus opaque
      root.style.setProperty('--bg-overlay-secondary', 'rgba(107, 85, 152, 0.08)');  // Violet léger
      root.style.setProperty('--bg-overlay-tertiary', 'rgba(0, 0, 0, 0.05)');        // Noir très léger
      
      document.body.style.backgroundColor = '#faf9fc';
    }
  };

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  return { isDark, toggleTheme };
};
