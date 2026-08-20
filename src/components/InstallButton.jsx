import { useState, useEffect } from 'react';

// Détecte si l'app tourne déjà en mode installé (standalone)
function isStandalone() {
  return (
    window.matchMedia('(display-mode: standalone)').matches ||
    window.navigator.standalone === true // iOS Safari
  );
}

function isIOS() {
  return /iphone|ipad|ipod/i.test(window.navigator.userAgent);
}

export default function InstallButton() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showIOSHint, setShowIOSHint] = useState(false);
  const [installed, setInstalled] = useState(isStandalone());

  useEffect(() => {
    if (installed) return;

    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    const handleAppInstalled = () => {
      setInstalled(true);
      setDeferredPrompt(null);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, [installed]);

  if (installed) return null;

  // Android / Chrome / Edge : le navigateur nous a donné l'event, on peut proposer l'install directement
  if (deferredPrompt) {
    const handleClick = async () => {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') setInstalled(true);
      setDeferredPrompt(null);
    };

    return (
      <button
        className="install-btn"
        onClick={handleClick}
        title="Installer l'application"
        aria-label="Installer l'application"
      >
        📲
      </button>
    );
  }

  // iOS Safari : pas d'API d'installation, on affiche juste les instructions au clic
  if (isIOS()) {
    return (
      <>
        <button
          className="install-btn"
          onClick={() => setShowIOSHint(true)}
          title="Installer l'application"
          aria-label="Installer l'application"
        >
          📲
        </button>
        {showIOSHint && (
          <div className="install-ios-overlay" onClick={() => setShowIOSHint(false)}>
            <div className="install-ios-modal" onClick={(e) => e.stopPropagation()}>
              <button className="install-ios-close" onClick={() => setShowIOSHint(false)}>✕</button>
              <h3>Installer Quiz RPG</h3>
              <p>
                Appuie sur <strong>Partager</strong> <span className="install-ios-icon">⬆️</span> en bas de Safari,
                puis choisis <strong>« Sur l'écran d'accueil »</strong>.
              </p>
            </div>
          </div>
        )}
      </>
    );
  }

  // Aucune option disponible (déjà installé, navigateur non compatible, etc.)
  return null;
}
