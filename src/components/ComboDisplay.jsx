import '../styles/ComboDisplay.css';

export default function ComboDisplay({ combo, comboBonus }) {
  if (!combo) return null;

  return (
    <div className="combo-display">
      <div className="combo-counter">
        🔥 {combo} COMBO
      </div>
      {comboBonus > 0 && (
        <div className="combo-bonus">
          +{comboBonus} XP bonus!
        </div>
      )}
    </div>
  );
}
