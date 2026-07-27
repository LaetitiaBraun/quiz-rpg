import { useState, useEffect } from 'react';

export const useTheme = () => {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('quiz-rpg-theme');
    if (saved) return saved === 'dark';
    return true; // Dark par défaut
  });

  useEffect(() => {
    localStorage.setItem('quiz-rpg-theme', isDark ? 'dark' : 'light');
    
    // Appliquer le thème au document root
    const root = document.documentElement;
    
    if (isDark) {
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
      document.documentElement.style.backgroundColor = '#0f0a1f';
    } else {
      // LIGHT MODE - Couleurs révisées
      root.style.setProperty('--bg-primary', '#f8f6fc');       // Fond principal clair (violet très léger)
      root.style.setProperty('--bg-secondary', '#ffffff');     // Blanc pur
      root.style.setProperty('--bg-tertiary', '#f0ecf8');      // Fond tertiaire (violet léger)
      root.style.setProperty('--text-primary', '#3d2566');     // Texte principal foncé (violet foncé)
      root.style.setProperty('--text-secondary', '#6b5b7d');   // Texte secondaire (gris-violet)
      root.style.setProperty('--text-tertiary', '#8b7ba0');    // Texte tertiaire (gris clair)
      root.style.setProperty('--border-color', '#b8a8d8');     // Bordure (violet moyen)
      root.style.setProperty('--accent-gold', '#d4a934');      // Or ajusté (plus foncé)
      root.style.setProperty('--accent-green', '#2d9b6f');     // Vert ajusté (plus saturé)
      root.style.setProperty('--accent-red', '#c93838');       // Rouge ajusté (plus foncé)
      root.style.setProperty('--accent-orange', '#e89c1c');    // Orange ajusté
      document.body.style.backgroundColor = '#f8f6fc';
      document.documentElement.style.backgroundColor = '#f8f6fc';
    }
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  return { isDark, toggleTheme };
};

