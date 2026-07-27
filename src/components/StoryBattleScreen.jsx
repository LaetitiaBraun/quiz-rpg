import '../styles/BattleScreen.css';
import '../styles/NarrativeScreen.css';
import NarrativeScreen from './NarrativeScreen';
import QuestionCard from './QuestionCard';
import ComboDisplay from './ComboDisplay';

export default function StoryBattleScreen({ 
  universe,
  currentQuestion, 
  currentQuestionIndex, 
  totalQuestions,
  feedback, 
  answered, 
  onAnswer, 
  onNext, 
  onBack,
  showNarrative,
  onContinueNarrative,
  character
}) {
  const narrative = currentQuestion?.narrative_before;
  const npc = currentQuestion?.npc;

  if (showNarrative && narrative) {
    return (
      <div>
        <button className="button button-back" onClick={onBack}>← Retour au Hub</button>
        <NarrativeScreen 
          narrative={narrative}
          npc={npc}
          onContinue={onContinueNarrative}
        />
      </div>
    );
  }

  return (
    <div className="battle-screen">
      <button className="button button-back" onClick={onBack}>← Retour au Hub</button>
      
      <ComboDisplay combo={character?.currentCombo} comboBonus={feedback?.comboBonus} />
      
      <div style={{ marginBottom: '20px', textAlign: 'center' }}>
        <span style={{ color: '#7f77dd', fontSize: '14px' }}>
          Acte {currentQuestion?.act} • Scène {currentQuestion?.scene + 1}
        </span>
      </div>

      <QuestionCard 
        question={currentQuestion}
        currentIndex={currentQuestionIndex}
        totalQuestions={totalQuestions}
        feedback={feedback}
        answered={answered}
        onAnswer={onAnswer}
        onNext={onNext}
      />

      {feedback && (
        <div style={{ marginTop: '30px', textAlign: 'center' }}>
          {currentQuestion?.narrative_after && (
            <p style={{ color: '#b8a8d8', fontSize: '15px', fontStyle: 'italic' }}>
              💭 {currentQuestion.narrative_after}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
