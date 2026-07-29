import { useState, useEffect } from 'react';
import FeedbackAnimation from './FeedbackAnimation';

export default function QuestionCard({ question, currentIndex, totalQuestions, feedback, answered, onAnswer, onNext, t }) {
  const [showAnimation, setShowAnimation] = useState(false);

  useEffect(() => {
    if (feedback) setShowAnimation(true);
    else setShowAnimation(false);
  }, [feedback, currentIndex]);

  const handleNext = () => {
    setShowAnimation(false);
    onNext();
  };

  return (
    <div className="question-box">
      {showAnimation && feedback && (
        <FeedbackAnimation correct={feedback.correct} onComplete={() => setShowAnimation(false)} t={t} />
      )}
      
      <div className="question-counter">{t?.question || 'Question'} {currentIndex + 1} / {totalQuestions}</div>
      <div className="question-text">{question.question}</div>

      <div className="answers-grid">
        {question.answers.map((answer, idx) => (
          <button
            key={idx}
            className={`answer-button ${answered && idx === question.correct ? 'correct' : ''} ${answered && idx !== question.correct && feedback && !feedback.correct ? 'incorrect' : ''}`}
            onClick={() => !answered && onAnswer(idx)}
            disabled={answered}
          >
            {answer}
          </button>
        ))}
      </div>

      {feedback && !showAnimation && (
        <div>
          <div className={`feedback-message ${feedback.correct ? 'success' : 'error'}`}>
            {feedback.correct ? (t?.correct || '✓ Correct!') : (t?.incorrect || '✗ Incorrect!')}
          </div>
          {feedback.alreadyCompleted ? (
            <div className="feedback-message" style={{ background: 'rgba(127,119,221,0.2)', border: '1px solid #7f77dd', color: '#7f77dd' }}>
              {t?.alreadyDone || 'ℹ️ Question déjà complétée - Pas de points bonus'}
            </div>
          ) : (
            <div className="xp-reward">+{feedback.xpGain} XP</div>
          )}
          <div className="button-container">
            <button className="button" onClick={handleNext}>{t?.next || 'Suivant →'}</button>
          </div>
        </div>
      )}
    </div>
  );
}
