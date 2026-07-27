import { createPortal } from 'react-dom';

export default function Footer({ onOpenLegal }) {
  return createPortal(
    <footer style={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      width: '100%',
      zIndex: 9998,
      background: 'linear-gradient(135deg, rgba(31, 20, 76, 0.95), rgba(42, 25, 95, 0.95))',
      borderTop: '2px solid #c9a961',
      color: '#b8a8d8',
      padding: '30px 20px 20px',
      margin: 0,
    }} className="app-footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>Quiz RPG</h3>
          <p>Un jeu de quiz immersif avec progression RPG</p>
        </div>

        <div className="footer-section">
          <h3>Liens Rapides</h3>
          <ul className="footer-links">
            <li><a href="#" onClick={(e) => { e.preventDefault(); onOpenLegal('mentions'); }}>Mentions Légales</a></li>
            <li><a href="#" onClick={(e) => { e.preventDefault(); onOpenLegal('politique'); }}>Politique de Confidentialité</a></li>
            <li><a href="#" onClick={(e) => { e.preventDefault(); onOpenLegal('cookies'); }}>Gestion des Cookies</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Contact</h3>
          <p>
            <a href="https://laetitiabraun.eu" target="_blank" rel="noopener noreferrer">
              Portfolio
            </a>
          </p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2026 Quiz RPG - Créé par Laetitia Braun</p>
      </div>
    </footer>,
    document.body
  );
}
