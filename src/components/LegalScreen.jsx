import '../styles/LegalScreen.css';

export default function LegalScreen({ page, onBack }) {
  const getContent = () => {
    switch (page) {
      case 'mentions':
        return {
          title: 'Mentions Légales',
          content: (
            <div className="legal-content">
              <h2>Mentions Légales</h2>
              
              <h3>Éditeur</h3>
              <p>Quiz RPG est édité par Laetitia Braun.</p>
              
              <h3>Directeur de Publication</h3>
              <p>Laetitia Braun</p>
              
              <h3>Hébergement</h3>
              <p>Ce site est hébergé par Vercel Inc., San Francisco, États-Unis.</p>
              
              <h3>Propriété Intellectuelle</h3>
              <p>
                Tout le contenu présent sur ce site (textes, images, logos, etc.) 
                est la propriété exclusive de Laetitia Braun ou de ses partenaires. 
                Toute reproduction ou utilisation sans autorisation est interdite.
              </p>
              
              <h3>Limitation de Responsabilité</h3>
              <p>
                L'éditeur du site ne peut être tenu responsable des dommages directs ou indirects 
                résultant de l'utilisation du site ou de l'impossibilité d'y accéder.
              </p>
              
              <h3>Droit Applicable</h3>
              <p>Ce site est régi par la loi belge.</p>
            </div>
          )
        };
      case 'politique':
        return {
          title: 'Politique de Confidentialité',
          content: (
            <div className="legal-content">
              <h2>Politique de Confidentialité</h2>
              
              <h3>Collecte de Données</h3>
              <p>
                Quiz RPG collecte uniquement les données nécessaires pour fonctionner:
              </p>
              <ul>
                <li>Progression du jeu (niveau, XP, badges)</li>
                <li>Équipement et inventaire</li>
                <li>Classement des joueurs</li>
              </ul>
              
              <h3>Stockage des Données</h3>
              <p>
                Toutes les données sont stockées localement dans votre navigateur 
                via IndexedDB et localStorage. Aucune donnée n'est envoyée à nos serveurs.
              </p>
              
              <h3>Protection des Données</h3>
              <p>
                Vos données personnelles ne sont jamais partagées avec des tiers. 
                Vous conservez le contrôle total de vos données locales.
              </p>
              
              <h3>Droits des Utilisateurs</h3>
              <p>
                Vous pouvez à tout moment supprimer vos données en vidant le cache 
                de votre navigateur ou en réinitialisant le jeu.
              </p>
            </div>
          )
        };
      case 'cookies':
        return {
          title: 'Gestion des Cookies',
          content: (
            <div className="legal-content">
              <h2>Gestion des Cookies</h2>
              
              <h3>Qu'est-ce qu'un Cookie?</h3>
              <p>
                Un cookie est un petit fichier texte stocké sur votre appareil 
                pour améliorer votre expérience.
              </p>
              
              <h3>Cookies Utilisés</h3>
              <p>
                Quiz RPG utilise des cookies techniques uniquement pour:
              </p>
              <ul>
                <li>Maintenir votre session de jeu</li>
                <li>Mémoriser vos préférences</li>
                <li>Sauvegarder votre progression</li>
              </ul>
              
              <h3>Pas de Publicités</h3>
              <p>
                Quiz RPG n'utilise pas de cookies de suivi, d'analyse ou publicitaires. 
                Aucun cookie tiers n'est utilisé.
              </p>
              
              <h3>Contrôle des Cookies</h3>
              <p>
                Vous pouvez désactiver les cookies dans les paramètres de votre navigateur. 
                Cependant, cela pourrait affecter le fonctionnement du jeu.
              </p>
            </div>
          )
        };
      default:
        return { title: '', content: null };
    }
  };

  const { title, content } = getContent();

  return (
    <div className="legal-screen">
      <button className="button button-back" onClick={onBack}>← Retour</button>
      
      <div className="legal-container">
        {content}
      </div>
    </div>
  );
}
