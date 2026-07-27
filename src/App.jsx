import { useState } from 'react';
import './styles/global.css';
import './styles/HubScreen.css';
import './styles/BattleScreen.css';
import './styles/NarrativeScreen.css';
import './styles/EquipmentScreen.css';
import './styles/animations.css';
import './styles/LevelUpAnimation.css';
import './styles/FeedbackAnimation.css';
import './styles/BadgesScreen.css';
import './styles/LeaderboardScreen.css';
import './styles/Header.css';
import './styles/Footer.css';
import './styles/EditNameModal.css';
import './styles/LegalScreen.css';
import { useCharacter } from './hooks/useCharacter';
import { QUESTIONS_DB } from './data/questionsDB';
import { SoundSystem } from './utils/SoundSystem';
import HubScreen from './components/HubScreen';
import BattleScreen from './components/BattleScreen';
import StoryBattleScreen from './components/StoryBattleScreen';
import EquipmentScreen from './components/EquipmentScreen';
import LevelUpAnimation from './components/LevelUpAnimation';
import BadgesScreen from './components/BadgesScreen';
import LeaderboardScreen from './components/LeaderboardScreen';
import Header from './components/Header';
import Footer from './components/Footer';
import EditNameModal from './components/EditNameModal';
import LegalScreen from './components/LegalScreen';

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
  const [showBadges, setShowBadges] = useState(false);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [showEditName, setShowEditName] = useState(false);
  const [showLegal, setShowLegal] = useState(false);
  const [legalPage, setLegalPage] = useState(null);

  const setCharacter = (updatedCharacter) => {
    // This will be called from useCharacter hook
  };

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

  const handleEditName = (newName) => {
    // Update character name in the hook
    const updatedCharacter = { ...character, name: newName };
    // This triggers useCharacter to update and save
    const characterWithUpdates = {
      ...character,
      name: newName
    };
    // Force re-render by updating through character state
    window.dispatchEvent(new CustomEvent('characterUpdate', { detail: characterWithUpdates }));
  };

  const handleOpenLegal = (page) => {
    setLegalPage(page);
    setShowLegal(true);
  };
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: 'linear-gradient(135deg, #0f0a1f 0%, #1a0f2e 100%)', paddingTop: '90px' }}>
      <Header />
      
      <LevelUpAnimation 
        level={newLevel} 
        show={showLevelUp} 
        onComplete={() => setShowLevelUp(false)} 
      />

      {showEditName && (
        <EditNameModal 
          currentName={character.name}
          onSave={handleEditName}
          onClose={() => setShowEditName(false)}
        />
      )}
      
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        {showLegal ? (
          <LegalScreen 
            page={legalPage}
            onBack={() => setShowLegal(false)}
          />
        ) : showBadges ? (
          <BadgesScreen 
            character={character}
            onBack={() => setShowBadges(false)}
          />
        ) : showLeaderboard ? (
          <LeaderboardScreen 
            character={character}
            onBack={() => setShowLeaderboard(false)}
          />
        ) : gameState === 'hub' ? (
          <HubScreen 
            character={character}
            onStartQuest={handleStartQuest}
            equipmentStats={equipmentStats}
            onOpenEquipment={openEquipment}
            onOpenBadges={() => setShowBadges(true)}
            onOpenLeaderboard={() => setShowLeaderboard(true)}
            onEditName={() => setShowEditName(true)}
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

      <Footer onOpenLegal={handleOpenLegal} />
    </div>
  );
}
