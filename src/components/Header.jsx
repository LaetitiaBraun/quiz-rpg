import '../styles/Header.css';

export default function Header() {
  return (
    <header className="app-header">
      <div className="header-content">
        <div className="header-logo">
          <span className="logo-icon">🎮</span>
          <h1>Quiz RPG</h1>
          <span className="logo-subtitle">The Hero's Destiny</span>
        </div>
      </div>
    </header>
  );
}
