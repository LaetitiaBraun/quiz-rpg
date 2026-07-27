import '../styles/BattleScreen.css';
import BattleHeader from './BattleHeader';
import QuestionCard from './QuestionCard';

export default function BattleScreen({ 
  universe, 
  currentQuestion, 
  currentQuestionIndex, 
  totalQuestions,
  feedback, 
  answered, 
  onAnswer, 
  onNext, 
  onBack 
}) {
  return (
    <div className="battle-screen">
      <button className="button button-back" onClick={onBack}>← Retour au Hub</button>
      
      <BattleHeader />
      
      <QuestionCard 
        question={currentQuestion}
        currentIndex={currentQuestionIndex}
        totalQuestions={totalQuestions}
        feedback={feedback}
        answered={answered}
        onAnswer={onAnswer}
        onNext={onNext}
      />
    </div>
  );
}
