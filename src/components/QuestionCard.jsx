import { useState } from 'react';
import FeedbackAnimation from './FeedbackAnimation';

export default function QuestionCard({ 
  question, 
  currentIndex, 
  totalQuestions,
  feedback, 
  answered, 
  onAnswer, 
  onNext 
}) {
  const [showFeedback, setShowFeedback] = useState(false);

  return (
    <div className="question-box">
      {feedback && !showFeedback && (
        <FeedbackAnimation 
          correct={feedback.correct} 
          onComplete={() => setShowFeedback(true)}
        />
      )}
      
      <div className="question-counter">
        Question {currentIndex + 1} / {totalQuestions}
      </div>
      
      <div className="question-text">
        {question.question}
      </div>

      <div className="answers-grid">
        {question.answers.map((answer, idx) => (
          <button
            key={idx}
            className={`answer-button ${
              answered && idx === question.correct ? 'correct' : ''
            } ${
              answered && idx !== question.correct && feedback && !feedback.correct ? 'incorrect' : ''
            }`}
            onClick={() => onAnswer(idx)}
            disabled={answered}
          >
            {answer}
          </button>
        ))}
      </div>

      {feedback && (
        <div>
          <div className={`feedback-message ${feedback.correct ? 'success' : 'error'}`}>
            {feedback.correct ? '✓ Correct!' : '✗ Incorrect!'}
          </div>
          
          {feedback.alreadyCompleted ? (
            <div className="feedback-message" style={{ background: 'rgba(127, 119, 221, 0.2)', border: '1px solid #7f77dd', color: '#7f77dd' }}>
              ℹ️ Question déjà complétée - Pas de points bonus
            </div>
          ) : (
            <div className="xp-reward">+{feedback.xpGain} XP</div>
          )}
          
          <div className="button-container">
            <button className="button" onClick={onNext}>
              {currentIndex < totalQuestions - 1 ? 'Question suivante' : 'Terminer cette quête'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
