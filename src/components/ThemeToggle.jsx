export default function ThemeToggle({ isDark, toggleTheme }) {
  return (
    <button 
      className="theme-toggle" 
      onClick={toggleTheme}
      title={isDark ? 'Activer le mode clair' : 'Activer le mode sombre'}
      aria-label="Basculer le thème"
    >
      {isDark ? '☀️' : '🌙'}
    </button>
  );
}
