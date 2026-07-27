export default function BattleHeader() {
  return (
    <div className="battle-header">
      <div className="player-stats">
        <div className="entity-name">Vous</div>
        <div className="entity-hp">
          <div className="hp-bar">
            <div className="hp-fill" style={{ width: '100%' }}></div>
          </div>
          <span>100/100</span>
        </div>
      </div>
      
      <div className="vs-text">VS</div>
      
      <div className="enemy-stats">
        <div className="entity-name">Ennemi</div>
        <div className="entity-hp">
          <div className="hp-bar">
            <div className="hp-fill" style={{ width: '75%' }}></div>
          </div>
          <span>75/100</span>
        </div>
      </div>
    </div>
  );
}
