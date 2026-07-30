import { useState, useRef, useEffect } from 'react';
import { characterBackup } from '../utils/CloudSyncManager';
import '../styles/BackupModal.css';

export default function BackupModal({ character, onClose, onCharacterLoad, t }) {
  const [activeTab, setActiveTab] = useState('local');
  const [backups, setBackups] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const fileInputRef = useRef(null);

  useEffect(() => { loadLocalBackups(); }, []);

  const loadLocalBackups = () => setBackups(characterBackup.listLocalBackups());

  const showMessage = (msg) => { setMessage(msg); setTimeout(() => setMessage(''), 3000); };

  const handleCreateBackup = () => {
    characterBackup.createLocalBackup(character);
    loadLocalBackups();
    showMessage('✅ Backup créé!');
  };

  const handleRestoreBackup = (backup) => {
    if (window.confirm(`Restaurer "${backup.name}" niveau ${backup.level}?`)) {
      onCharacterLoad(backup.data);
      showMessage('✅ Backup restauré!');
    }
  };

  const handleDeleteBackup = (backupId) => {
    if (window.confirm(t?.delete ? `${t.delete}?` : 'Supprimer ce backup?')) {
      characterBackup.deleteLocalBackup(backupId);
      loadLocalBackups();
      showMessage('✅ Supprimé!');
    }
  };

  const handleExport = () => { characterBackup.exportToJSON(character); showMessage('✅ Exporté!'); };

  const handleImportFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setLoading(true);
      const imported = await characterBackup.importFromJSON(file);
      onCharacterLoad(imported);
      showMessage('✅ Importé!');
    } catch (error) {
      showMessage(`❌ Erreur: ${error.message}`);
    } finally { setLoading(false); e.target.value = ''; }
  };

  return (
    <div className="backup-modal-overlay" onClick={onClose}>
      <div className="backup-modal" onClick={(e) => e.stopPropagation()}>
        <div className="backup-modal-header">
          <h2>{t?.savesTitle || '💾 Sauvegardes'}</h2>
          <button className="backup-close" onClick={onClose}>✕</button>
        </div>

        <div className="backup-tabs">
          <button className={`backup-tab ${activeTab === 'local' ? 'active' : ''}`} onClick={() => setActiveTab('local')}>
            {t?.local || '📂 Local'}
          </button>
          <button className={`backup-tab ${activeTab === 'export' ? 'active' : ''}`} onClick={() => setActiveTab('export')}>
            {t?.exportImport || '📤 Export/Import'}
          </button>
        </div>

        {message && <div className="backup-message">{message}</div>}

        <div className="backup-content">
          {activeTab === 'local' && (
            <div className="backup-section">
              <button className="backup-btn-primary" onClick={handleCreateBackup} disabled={loading}>
                {t?.createBackup || '➕ Créer un Backup Local'}
              </button>
              <div className="backup-list">
                {backups.length === 0 ? (
                  <p className="backup-empty">{t?.noBackup || 'Aucun backup local'}</p>
                ) : (
                  backups.map(backup => (
                    <div key={backup.id} className="backup-item">
                      <div className="backup-info">
                        <strong>{backup.name}</strong>
                        <span className="backup-level">{t?.level || 'Niveau'} {backup.level}</span>
                        <small>{new Date(backup.timestamp).toLocaleString()}</small>
                      </div>
                      <div className="backup-actions">
                        <button className="backup-btn-restore" onClick={() => handleRestoreBackup(backup)} disabled={loading}>
                          {t?.restore || 'Restaurer'}
                        </button>
                        <button className="backup-btn-delete" onClick={() => handleDeleteBackup(backup.id)} disabled={loading}>
                          {t?.delete || 'Supprimer'}
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {activeTab === 'export' && (
            <div className="backup-section">
              <div className="backup-action-group">
                <h3>{t?.export || '📤 Exporter'}</h3>
                <p>{t?.exportDesc || 'Télécharger ton character en fichier .json'}</p>
                <button className="backup-btn-primary" onClick={handleExport} disabled={loading}>
                  {t?.exportBtn || 'Exporter mon Character'}
                </button>
              </div>
              <div className="backup-divider"></div>
              <div className="backup-action-group">
                <h3>{t?.import || '📥 Importer'}</h3>
                <p>{t?.importDesc || 'Charger un fichier .json précédemment exporté'}</p>
                <button className="backup-btn-primary" onClick={() => fileInputRef.current?.click()} disabled={loading}>
                  {t?.importBtn || 'Choisir un fichier'}
                </button>
                <input ref={fileInputRef} type="file" accept=".json" onChange={handleImportFile} style={{ display: 'none' }} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
