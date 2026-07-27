import { createPortal } from 'react-dom';

export default function Header() {
  return createPortal(
    <header style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      width: '100%',
      zIndex: 9999,
      background: 'linear-gradient(135deg, rgba(31, 20, 76, 0.95), rgba(42, 25, 95, 0.95))',
      borderBottom: '2px solid #c9a961',
      padding: '20px 0',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.6)',
      margin: 0,
    }} className="app-header">
      <div className="header-content">
        <div className="header-logo">
          <span className="logo-icon">🎮</span>
          <h1>Quiz RPG</h1>
          <span className="logo-subtitle">The Hero's Destiny</span>
        </div>
      </div>
    </header>,
    document.body
  );
}
