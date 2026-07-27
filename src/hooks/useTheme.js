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
      // LIGHT MODE - PLUS LISIBLE!
      root.style.setProperty('--bg-primary', '#faf9fc');
      root.style.setProperty('--bg-secondary', '#ffffff');
      root.style.setProperty('--bg-tertiary', '#f0ecf8');
      
      // Texte: BEAUCOUP PLUS FONCÉ pour contraste
      root.style.setProperty('--text-primary', '#1f0f3f');      // Très foncé
      root.style.setProperty('--text-secondary', '#453366');    // Foncé
      root.style.setProperty('--text-tertiary', '#5d4a7a');     // Moyen-foncé
      
      // Bordures: Plus foncées
      root.style.setProperty('--border-color', '#8b77cc');
      
      // Accents: Plus saturés et visibles
      root.style.setProperty('--accent-gold', '#cc8800');       // Or foncé
      root.style.setProperty('--accent-green', '#1a7d5c');      // Vert foncé
      root.style.setProperty('--accent-red', '#bb2222');        // Rouge foncé
      root.style.setProperty('--accent-orange', '#d47c1a');     // Orange foncé
      
      document.body.style.backgroundColor = '#faf9fc';
    }
  };

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  return { isDark, toggleTheme };
};
