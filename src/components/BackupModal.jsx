import { useState, useRef } from 'react';
import { characterBackup, cloudAuth, cloudStorage } from '../utils/CloudSyncManager';
import '../styles/BackupModal.css';

export default function BackupModal({ character, onClose, onCharacterLoad }) {
  const [activeTab, setActiveTab] = useState('local'); // local, cloud, export
  const [cloudUser, setCloudUser] = useState(null);
  const [backups, setBackups] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const fileInputRef = useRef(null);

  // Charger les backups locaux au montage
  React.useEffect(() => {
    loadLocalBackups();
    checkCloudAuth();
  }, []);

  const loadLocalBackups = () => {
    const list = characterBackup.listLocalBackups();
    setBackups(list);
  };

  const checkCloudAuth = async () => {
    const user = await cloudAuth.getCurrentUser();
    setCloudUser(user);
  };

  // === LOCAL BACKUPS ===
  const handleCreateBackup = () => {
    characterBackup.createLocalBackup(character);
    loadLocalBackups();
    setMessage('✅ Backup créé!');
    setTimeout(() => setMessage(''), 3000);
  };

  const handleRestoreBackup = (backup) => {
    if (window.confirm(`Restaurer "${backup.name}" niveau ${backup.level}?`)) {
      onCharacterLoad(backup.data);
      setMessage('✅ Backup restauré!');
      setTimeout(() => setMessage(''), 3000);
    }
  };

  const handleDeleteBackup = (backupId) => {
    if (window.confirm('Supprimer ce backup?')) {
      characterBackup.deleteLocalBackup(backupId);
      loadLocalBackups();
      setMessage('✅ Backup supprimé!');
      setTimeout(() => setMessage(''), 3000);
    }
  };

  // === EXPORT/IMPORT ===
  const handleExport = () => {
    characterBackup.exportToJSON(character);
    setMessage('✅ Fichier exporté!');
    setTimeout(() => setMessage(''), 3000);
  };

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleImportFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setLoading(true);
      const imported = await characterBackup.importFromJSON(file);
      onCharacterLoad(imported);
      setMessage('✅ Character importé!');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage(`❌ Erreur: ${error.message}`);
    } finally {
      setLoading(false);
      e.target.value = ''; // Reset input
    }
  };

  // === CLOUD SYNC ===
  const handleCloudLogin = async () => {
    const email = prompt('Email:');
    if (!email) return;
    
    const password = prompt('Mot de passe:');
    if (!password) return;

    try {
      setLoading(true);
      await cloudAuth.login(email, password);
      await checkCloudAuth();
      setMessage('✅ Connecté!');
    } catch (error) {
      setMessage(`❌ Erreur: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleCloudSignup = async () => {
    const email = prompt('Email:');
    if (!email) return;
    
    const password = prompt('Mot de passe (min 6 caractères):');
    if (!password) return;

    try {
      setLoading(true);
      await cloudAuth.signup(email, password);
      await cloudAuth.login(email, password);
      await checkCloudAuth();
      setMessage('✅ Compte créé et connecté!');
    } catch (error) {
      setMessage(`❌ Erreur: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleCloudSave = async () => {
    try {
      setLoading(true);
      const success = await cloudStorage.saveCharacter(character);
      setMessage(success ? '✅ Sauvegardé au cloud!' : '❌ Erreur sauvegarde cloud');
    } finally {
      setLoading(false);
    }
  };

  const handleCloudLoad = async () => {
    try {
      setLoading(true);
      const loaded = await cloudStorage.loadCharacter();
      if (loaded) {
        onCharacterLoad(loaded);
        setMessage('✅ Character chargé du cloud!');
      } else {
        setMessage('❌ Aucun character trouvé au cloud');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCloudLogout = async () => {
    await cloudAuth.logout();
    setCloudUser(null);
    setMessage('✅ Déconnecté');
  };

  return (
    <div className="backup-modal-overlay" onClick={onClose}>
      <div className="backup-modal" onClick={(e) => e.stopPropagation()}>
        <div className="backup-modal-header">
          <h2>💾 Sauvegardes & Cloud</h2>
          <button className="backup-close" onClick={onClose}>✕</button>
        </div>

        <div className="backup-tabs">
          <button 
            className={`backup-tab ${activeTab === 'local' ? 'active' : ''}`}
            onClick={() => setActiveTab('local')}
          >
            📂 Local
          </button>
          <button 
            className={`backup-tab ${activeTab === 'export' ? 'active' : ''}`}
            onClick={() => setActiveTab('export')}
          >
            📤 Export/Import
          </button>
          <button 
            className={`backup-tab ${activeTab === 'cloud' ? 'active' : ''}`}
            onClick={() => setActiveTab('cloud')}
          >
            ☁️ Cloud Sync
          </button>
        </div>

        {message && <div className="backup-message">{message}</div>}

        <div className="backup-content">
          {/* LOCAL BACKUPS */}
          {activeTab === 'local' && (
            <div className="backup-section">
              <button 
                className="backup-btn-primary"
                onClick={handleCreateBackup}
                disabled={loading}
              >
                ➕ Créer un Backup Local
              </button>

              <div className="backup-list">
                {backups.length === 0 ? (
                  <p className="backup-empty">Aucun backup local</p>
                ) : (
                  backups.map(backup => (
                    <div key={backup.id} className="backup-item">
                      <div className="backup-info">
                        <strong>{backup.name}</strong>
                        <span className="backup-level">Niveau {backup.level}</span>
                        <small>{new Date(backup.timestamp).toLocaleString()}</small>
                      </div>
                      <div className="backup-actions">
                        <button 
                          className="backup-btn-restore"
                          onClick={() => handleRestoreBackup(backup)}
                          disabled={loading}
                        >
                          Restaurer
                        </button>
                        <button 
                          className="backup-btn-delete"
                          onClick={() => handleDeleteBackup(backup.id)}
                          disabled={loading}
                        >
                          Supprimer
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* EXPORT/IMPORT */}
          {activeTab === 'export' && (
            <div className="backup-section">
              <div className="backup-action-group">
                <h3>📥 Importer</h3>
                <p>Charger un fichier .json précédemment exporté</p>
                <button 
                  className="backup-btn-primary"
                  onClick={handleImportClick}
                  disabled={loading}
                >
                  Choisir un fichier
                </button>
                <input 
                  ref={fileInputRef}
                  type="file"
                  accept=".json"
                  onChange={handleImportFile}
                  style={{ display: 'none' }}
                />
              </div>

              <div className="backup-divider"></div>

              <div className="backup-action-group">
                <h3>📤 Exporter</h3>
                <p>Télécharger un backup en tant que fichier .json</p>
                <button 
                  className="backup-btn-primary"
                  onClick={handleExport}
                  disabled={loading}
                >
                  Exporter mon Character
                </button>
              </div>
            </div>
          )}

          {/* CLOUD SYNC */}
          {activeTab === 'cloud' && (
            <div className="backup-section">
              {!cloudUser ? (
                <div className="backup-auth-section">
                  <p>📡 Synchronisez votre progression entre appareils</p>
                  <button 
                    className="backup-btn-primary"
                    onClick={handleCloudSignup}
                    disabled={loading}
                  >
                    Créer un compte Cloud
                  </button>
                  <button 
                    className="backup-btn-secondary"
                    onClick={handleCloudLogin}
                    disabled={loading}
                  >
                    Se connecter
                  </button>
                </div>
              ) : (
                <div className="backup-auth-section">
                  <p className="backup-user-info">
                    ✅ Connecté en tant que: <strong>{cloudUser.email}</strong>
                  </p>
                  
                  <div className="backup-cloud-actions">
                    <button 
                      className="backup-btn-primary"
                      onClick={handleCloudSave}
                      disabled={loading}
                    >
                      💾 Sauvegarder au Cloud
                    </button>
                    <button 
                      className="backup-btn-primary"
                      onClick={handleCloudLoad}
                      disabled={loading}
                    >
                      📥 Charger du Cloud
                    </button>
                  </div>

                  <p className="backup-info-text">
                    💡 Astuce: Activez l'auto-sync dans les paramètres pour synchroniser automatiquement.
                  </p>

                  <button 
                    className="backup-btn-secondary"
                    onClick={handleCloudLogout}
                    disabled={loading}
                  >
                    Déconnexion
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
