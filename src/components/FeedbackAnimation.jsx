import React, { useEffect } from 'react';
import { SoundSystem } from '../utils/SoundSystem';
import { useParticles, ParticleCanvas } from '../utils/ParticleSystem';

export default function FeedbackAnimation({ correct, onComplete }) {
  const { particles, createConfetti } = useParticles();

  useEffect(() => {
    if (correct) {
      SoundSystem.playVictory();
      SoundSystem.playReward();
      // Confetti au centre et sur les côtés
      createConfetti(window.innerWidth / 2, window.innerHeight / 3, 50);
      createConfetti(window.innerWidth / 4, window.innerHeight / 2, 25);
      createConfetti((window.innerWidth * 3) / 4, window.innerHeight / 2, 25);
    } else {
      SoundSystem.playDefeat();
    }

    const timer = setTimeout(() => {
      onComplete && onComplete();
    }, 500);

    return () => clearTimeout(timer);
  }, [correct, createConfetti, onComplete]);

  return (
    <>
      <ParticleCanvas particles={particles} />
      {correct && (
        <div className="feedback-animation correct-animation">
          <div className="feedback-icon">✨</div>
          <div className="feedback-text">CORRECT!</div>
        </div>
      )}
      {!correct && (
        <div className="feedback-animation incorrect-animation">
          <div className="feedback-icon">✗</div>
          <div className="feedback-text">INCORRECT!</div>
        </div>
      )}
    </>
  );
}
