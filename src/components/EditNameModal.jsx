import { useState } from 'react';
import '../styles/EditNameModal.css';

export default function EditNameModal({ currentName, onSave, onClose }) {
  const [newName, setNewName] = useState(currentName);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newName.trim() && newName.length > 0) {
      onSave(newName.trim());
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Éditer le nom du héros</h2>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label htmlFor="heroName">Nom du Héros:</label>
            <input
              id="heroName"
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="Entrez le nom de votre héros"
              maxLength="20"
              autoFocus
            />
          </div>

          <div className="form-actions">
            <button type="button" className="button button-cancel" onClick={onClose}>
              Annuler
            </button>
            <button type="submit" className="button button-submit">
              Valider
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
