import React, { useEffect, useRef } from 'react';
import { SoundSystem } from '../utils/SoundSystem';

export default function FeedbackAnimation({ correct, onComplete }) {
  const timerRef = useRef(null);

  useEffect(() => {
    if (correct) {
      SoundSystem.playVictory();
    } else {
      SoundSystem.playDefeat();
    }

    timerRef.current = setTimeout(() => {
      onComplete && onComplete();
    }, 1500);

    return () => clearTimeout(timerRef.current);
  }, [correct]);

  return (
    <div className={`feedback-animation ${correct ? 'correct-animation' : 'incorrect-animation'}`}>
      <div className="feedback-icon">{correct ? '✓' : '✗'}</div>
      <div className="feedback-text">{correct ? 'CORRECT !' : 'INCORRECT !'}</div>
    </div>
  );
}
