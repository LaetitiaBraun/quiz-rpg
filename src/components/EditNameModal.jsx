import { useState } from 'react';
import '../styles/EditNameModal.css';

export default function EditNameModal({ currentName, onSave, onClose, t }) {
  const [newName, setNewName] = useState(currentName);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newName.trim()) { onSave(newName.trim()); onClose(); }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{t?.editHeroName || 'Éditer le nom du héros'}</h2>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>
        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label htmlFor="heroName">{t?.heroNameLabel || 'Nom du Héros:'}</label>
            <input id="heroName" type="text" value={newName} onChange={(e) => setNewName(e.target.value)}
              placeholder={t?.heroNameLabel || 'Entrez le nom de votre héros'} maxLength="20" autoFocus />
          </div>
          <div className="form-actions">
            <button type="button" className="button button-cancel" onClick={onClose}>{t?.cancel || 'Annuler'}</button>
            <button type="submit" className="button button-submit">{t?.validate || 'Valider'}</button>
          </div>
        </form>
      </div>
    </div>
  );
}
