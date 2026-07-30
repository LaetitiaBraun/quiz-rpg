import '../styles/BadgesScreen.css';
import { ALL_BADGES } from '../data/badgesDB';

export default function BadgesScreen({ character, onBack, t }) {
  const unlockedBadgeIds = character.unlockedBadges || [];
  const unlockedCount = unlockedBadgeIds.length;
  const totalBadges = ALL_BADGES.length;

  const rarityOrder = { common: 0, uncommon: 1, rare: 2, epic: 3 };
  const sortedBadges = [...ALL_BADGES].sort((a, b) => rarityOrder[b.rarity] - rarityOrder[a.rarity]);

  return (
    <div className="badges-screen">
      <button className="button button-back" onClick={onBack}>{t?.back || '← Retour'} au Hub</button>

      <div className="badges-header">
        <h1>{t?.badgesTitle || '🏆 Badges & Accomplissements'}</h1>
        <div className="badges-progress">
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${(unlockedCount / totalBadges) * 100}%` }}
            ></div>
          </div>
          <p className="progress-text">{unlockedCount} / {totalBadges} badges débloqués</p>
        </div>
      </div>

      <div className="badges-grid">
        {sortedBadges.map(badge => {
          const isUnlocked = unlockedBadgeIds.includes(badge.id);

          return (
            <div 
              key={badge.id} 
              className={`badge-card ${isUnlocked ? 'unlocked' : 'locked'} ${badge.rarity}`}
            >
              <div className="badge-emoji-wrapper">
                <div className="badge-emoji">{badge.emoji}</div>
              </div>

              <div className="badge-content">
                <h3 className="badge-name">{badge.name}</h3>
                <p className="badge-description">{badge.description}</p>
                <p className="badge-rarity">
                  {badge.rarity === 'common' && {t?.common || '● Commun'}}
                  {badge.rarity === 'uncommon' && {t?.uncommon || '● Peu Commun'}}
                  {badge.rarity === 'rare' && {t?.rare || '● Rare'}}
                  {badge.rarity === 'epic' && {t?.epic || '● Épique'}}
                </p>
              </div>

              {!isUnlocked && (
                <div className="badge-locked-overlay">
                  <span className="locked-icon">🔒</span>
                </div>
              )}

              {isUnlocked && (
                <div className="badge-unlocked-badge">
                  ✓
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="badges-footer">
        <p className="badges-tip">
          💡 Déverrouille des badges en progressant dans le jeu!
        </p>
      </div>
    </div>
  );
}
