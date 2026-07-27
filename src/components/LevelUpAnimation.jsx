import React, { useEffect, useState } from 'react';
import { SoundSystem } from '../utils/SoundSystem';

export default function LevelUpAnimation({ level, show, onComplete }) {
  const [visible, setVisible] = useState(show);

  useEffect(() => {
    if (show) {
      setVisible(true);
      SoundSystem.playLevelUp();
      const timer = setTimeout(() => {
        setVisible(false);
        onComplete && onComplete();
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [show, onComplete]);

  if (!visible) return null;

  return (
    <div className="level-up-overlay">
      <div className="level-up-content animate-level-up-bounce">
        <div className="level-up-stars">⭐</div>
        <div className="level-up-text animate-level-up-text">
          LEVEL UP!
        </div>
        <div className="level-up-number">
          Niveau {level}
        </div>
        <div className="level-up-shine"></div>
      </div>
    </div>
  );
}
