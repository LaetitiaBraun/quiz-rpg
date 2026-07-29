import { useEffect, useRef } from 'react';
import { SoundSystem } from '../utils/SoundSystem';

export default function FeedbackAnimation({ correct, onComplete, onDismiss }) {
  const timerRef = useRef(null);

  useEffect(() => {
    if (correct) {
      SoundSystem.playVictory?.();
    } else {
      SoundSystem.playDefeat?.();
    }

    // Disparaît automatiquement après 1.2s
    timerRef.current = setTimeout(() => {
      onComplete?.();
    }, 1200);

    return () => clearTimeout(timerRef.current);
  }, []);

  const handleClick = () => {
    clearTimeout(timerRef.current);
    onComplete?.();
  };

  return (
    <div
      className={`feedback-animation ${correct ? 'correct-animation' : 'incorrect-animation'}`}
      onClick={handleClick}
    >
      <div className="feedback-icon">{correct ? '✓' : '✗'}</div>
      <div className="feedback-text">{correct ? 'CORRECT !' : 'INCORRECT !'}</div>
      <div className="feedback-hint">Cliquer pour continuer</div>
    </div>
  );
}
