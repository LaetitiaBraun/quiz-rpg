import { useState } from 'react';
import './styles/global.css';
import './styles/HubScreen.css';
import './styles/BattleScreen.css';
import './styles/NarrativeScreen.css';
import './styles/EquipmentScreen.css';
import './styles/animations.css';
import './styles/LevelUpAnimation.css';
import './styles/FeedbackAnimation.css';
import { useCharacter } from './hooks/useCharacter';
import { QUESTIONS_DB } from './data/questionsDB';
import { SoundSystem } from './utils/SoundSystem';
import HubScreen from './components/HubScreen';
import BattleScreen from './components/BattleScreen';
import StoryBattleScreen from './components/StoryBattleScreen';
import EquipmentScreen from './components/EquipmentScreen';
import LevelUpAnimation from './components/LevelUpAnimation';

export default function App() {
  const { character, addXP, equipItem, unequipItem, getEquipmentStats } = useCharacter();
  const [gameState, setGameState] = useState('hub');
  const [currentUniverse, setCurrentUniverse] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [feedback, setFeedback] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [showNarrative, setShowNarrative] = useState(true);
  const [showLevelUp, setShowLevelUp] = useState(false);
  const [newLevel, setNewLevel] = useState(null);

  const equipmentStats = getEquipmentStats();

  // ===== GAME LOGIC =====
  
  const handleStartQuest = (universe) => {
    setCurrentUniverse(universe);
    setGameState('battle');
    setCurrentQuestionIndex(0);
    setFeedback(null);
    setAnswered(false);
    // Show narrative at start for story quest
    if (universe === 'story') {
      setShowNarrative(true);
    } else {
      setShowNarrative(false);
    }
  };

  const handleAnswer = (selectedIndex) => {
    if (answered) return;

    const questions = QUESTIONS_DB[currentUniverse];
    const currentQuestion = questions[currentQuestionIndex];
    const isCorrect = selectedIndex === currentQuestion.correct;

    const xpGain = isCorrect ? currentQuestion.xp : Math.floor(currentQuestion.xp * 0.3);
    const result = addXP(xpGain, currentUniverse, currentQuestion.id);

    // Trigger sound on click
    SoundSystem.playClick();

    // Check if leveled up
    if (result.levelUp) {
      setShowLevelUp(true);
      setNewLevel(character.level + 1);
    }

    setFeedback({
      correct: isCorrect,
      xpGain: result.xpGained,
      alreadyCompleted: result.alreadyCompleted
    });
    setAnswered(true);
  };

  const handleNextQuestion = () => {
    const questions = QUESTIONS_DB[currentUniverse];
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setFeedback(null);
      setAnswered(false);
      // Show narrative for story quest
      if (currentUniverse === 'story') {
        setShowNarrative(true);
      }
    } else {
      goToHub();
    }
  };

  const handleContinueNarrative = () => {
    setShowNarrative(false);
  };

  const goToHub = () => {
    setGameState('hub');
    setCurrentUniverse(null);
    setFeedback(null);
    setAnswered(false);
  };

  const openEquipment = () => {
    setGameState('equipment');
  };

  // ===== RENDER =====
  return (
    <div style={{ background: 'linear-gradient(135deg, #0f0a1f 0%, #1a0f2e 100%)', minHeight: '100vh' }}>
      <LevelUpAnimation 
        level={newLevel} 
        show={showLevelUp} 
        onComplete={() => setShowLevelUp(false)} 
      />
      
      <div className="app-container">
        {gameState === 'hub' ? (
          <HubScreen 
            character={character}
            onStartQuest={handleStartQuest}
            equipmentStats={equipmentStats}
            onOpenEquipment={openEquipment}
          />
        ) : gameState === 'equipment' ? (
          <EquipmentScreen 
            character={character}
            onEquip={equipItem}
            onUnequip={unequipItem}
            onBack={goToHub}
          />
        ) : currentUniverse === 'story' ? (
          <StoryBattleScreen 
            universe={currentUniverse}
            currentQuestion={QUESTIONS_DB[currentUniverse][currentQuestionIndex]}
            currentQuestionIndex={currentQuestionIndex}
            totalQuestions={QUESTIONS_DB[currentUniverse].length}
            feedback={feedback}
            answered={answered}
            onAnswer={handleAnswer}
            onNext={handleNextQuestion}
            onBack={goToHub}
            showNarrative={showNarrative}
            onContinueNarrative={handleContinueNarrative}
          />
        ) : (
          <BattleScreen 
            universe={currentUniverse}
            currentQuestion={QUESTIONS_DB[currentUniverse][currentQuestionIndex]}
            currentQuestionIndex={currentQuestionIndex}
            totalQuestions={QUESTIONS_DB[currentUniverse].length}
            feedback={feedback}
            answered={answered}
            onAnswer={handleAnswer}
            onNext={handleNextQuestion}
            onBack={goToHub}
          />
        )}
      </div>
    </div>
  );
}
