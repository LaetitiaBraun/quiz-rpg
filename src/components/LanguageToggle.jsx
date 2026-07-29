export default function LanguageToggle({ lang, setLanguage }) {
  return (
    <div className="lang-toggle">
      <button
        className={`lang-btn ${lang === 'fr' ? 'active' : ''}`}
        onClick={() => setLanguage('fr')}
      >
        FR
      </button>
      <button
        className={`lang-btn ${lang === 'en' ? 'active' : ''}`}
        onClick={() => setLanguage('en')}
      >
        EN
      </button>
    </div>
  );
}
