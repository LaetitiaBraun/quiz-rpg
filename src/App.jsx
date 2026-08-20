import { useState, useEffect } from 'react';
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
import './styles/BackupModal.css';
import './styles/LegalScreen.css';
import './styles/ArenaScreen.css';
import './styles/ArenaBattle.css';
import './styles/ComboDisplay.css';
import './styles/DailyQuestsScreen.css';
import './styles/DifficultyModal.css';
import './styles/ProfileScreen.css';
import './styles/ThemeToggle.css';
import './styles/InstallButton.css';
import { useCharacter } from './hooks/useCharacter';
import { useTheme } from './hooks/useTheme';
import { QUESTIONS_DB } from './data/questionsDB';
import { SoundSystem } from './utils/SoundSystem';
import HubScreen from './components/HubScreen';
import BattleScreen from './components/BattleScreen';
import StoryBattleScreen from './components/StoryBattleScreen';
import EquipmentScreen from './components/EquipmentScreen';
import LevelUpAnimation from './components/LevelUpAnimation';
import BadgesScreen from './components/BadgesScreen';
import LeaderboardScreen from './components/LeaderboardScreen';
import EditNameModal from './components/EditNameModal';
import BackupModal from './components/BackupModal';
import LegalScreen from './components/LegalScreen';
import ArenaScreen from './components/ArenaScreen';
import ArenaBattle from './components/ArenaBattle';
import DailyQuestsScreen from './components/DailyQuestsScreen';
import DifficultyModal from './components/DifficultyModal';
import ProfileScreen from './components/ProfileScreen';
import ThemeToggle from './components/ThemeToggle';
import LanguageToggle from './components/LanguageToggle';
import InstallButton from './components/InstallButton';
import { useLanguage } from './hooks/useLanguage';

export default function App() {
  const { character, setCharacter, addXP, equipItem, unequipItem, getEquipmentStats } = useCharacter();
  const { isDark, toggleTheme } = useTheme();
  const { lang, t, setLanguage } = useLanguage();
  
  // Initialiser depuis localStorage
  const [gameState, setGameState] = useState(() => {
    return localStorage.getItem('quiz-rpg-gamestate') || 'hub';
  });
  const [currentUniverse, setCurrentUniverse] = useState(() => {
    return localStorage.getItem('quiz-rpg-universe') || null;
  });
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(() => {
    return parseInt(localStorage.getItem('quiz-rpg-questionindex') || '0');
  });
  const [currentArenaOpponent, setCurrentArenaOpponent] = useState(() => {
    const stored = localStorage.getItem('quiz-rpg-arena-opponent');
    return stored ? JSON.parse(stored) : null;
  });
  const [feedback, setFeedback] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [showNarrative, setShowNarrative] = useState(() => {
    return localStorage.getItem('quiz-rpg-shownarrative') !== 'false';
  });
  const [showLevelUp, setShowLevelUp] = useState(false);
  const [newLevel, setNewLevel] = useState(null);
  const [showBadges, setShowBadges] = useState(() => {
    return localStorage.getItem('quiz-rpg-showbadges') === 'true';
  });
  const [showLeaderboard, setShowLeaderboard] = useState(() => {
    return localStorage.getItem('quiz-rpg-showleaderboard') === 'true';
  });
  const [showEditName, setShowEditName] = useState(false);
  const [showLegal, setShowLegal] = useState(() => {
    return localStorage.getItem('quiz-rpg-showlegal') === 'true';
  });
  const [legalPage, setLegalPage] = useState(() => {
    return localStorage.getItem('quiz-rpg-legalpage') || null;
  });
  const [showDailyQuests, setShowDailyQuests] = useState(() => {
    return localStorage.getItem('quiz-rpg-showdailyquests') === 'true';
  });
  const [showBackup, setShowBackup] = useState(false);
  const [showDifficultyModal, setShowDifficultyModal] = useState(false);
  const [pendingUniverse, setPendingUniverse] = useState(null);
  const [showProfile, setShowProfile] = useState(false);
  const [currentDifficulty, setCurrentDifficulty] = useState(1);

  const equipmentStats = getEquipmentStats();

  // Helper: retourne le bon pool de questions selon univers + difficulté
  const getQuestions = (universe, difficulty) => {
    if (universe === 'story') return QUESTIONS_DB.story || [];
    const suffix = difficulty === 1 ? 'easy' : difficulty === 2 ? 'medium' : 'hard';
    return QUESTIONS_DB[`${universe}_${suffix}`] || QUESTIONS_DB[universe] || [];
  };

  // Sauvegarder gameState dans localStorage à chaque changement
  useEffect(() => {
    localStorage.setItem('quiz-rpg-gamestate', gameState);
  }, [gameState]);

  // Sauvegarder currentUniverse
  useEffect(() => {
    if (currentUniverse) {
      localStorage.setItem('quiz-rpg-universe', currentUniverse);
    } else {
      localStorage.removeItem('quiz-rpg-universe');
    }
  }, [currentUniverse]);

  // Sauvegarder currentQuestionIndex
  useEffect(() => {
    localStorage.setItem('quiz-rpg-questionindex', currentQuestionIndex.toString());
  }, [currentQuestionIndex]);

  // Sauvegarder currentArenaOpponent
  useEffect(() => {
    if (currentArenaOpponent) {
      localStorage.setItem('quiz-rpg-arena-opponent', JSON.stringify(currentArenaOpponent));
    } else {
      localStorage.removeItem('quiz-rpg-arena-opponent');
    }
  }, [currentArenaOpponent]);

  // Sauvegarder showBadges
  useEffect(() => {
    localStorage.setItem('quiz-rpg-showbadges', showBadges.toString());
  }, [showBadges]);

  // Sauvegarder showLeaderboard
  useEffect(() => {
    localStorage.setItem('quiz-rpg-showleaderboard', showLeaderboard.toString());
  }, [showLeaderboard]);

  // Sauvegarder showLegal
  useEffect(() => {
    localStorage.setItem('quiz-rpg-showlegal', showLegal.toString());
  }, [showLegal]);

  // Sauvegarder legalPage
  useEffect(() => {
    if (legalPage) {
      localStorage.setItem('quiz-rpg-legalpage', legalPage);
    } else {
      localStorage.removeItem('quiz-rpg-legalpage');
    }
  }, [legalPage]);

  // Sauvegarder showNarrative
  useEffect(() => {
    localStorage.setItem('quiz-rpg-shownarrative', showNarrative.toString());
  }, [showNarrative]);

  // Sauvegarder showDailyQuests
  useEffect(() => {
    localStorage.setItem('quiz-rpg-showdailyquests', showDailyQuests.toString());
  }, [showDailyQuests]);

  // Nettoyer localStorage si on est au hub
  useEffect(() => {
    if (gameState === 'hub') {
      localStorage.removeItem('quiz-rpg-universe');
      localStorage.removeItem('quiz-rpg-questionindex');
      localStorage.removeItem('quiz-rpg-arena-opponent');
      localStorage.removeItem('quiz-rpg-showbadges');
      localStorage.removeItem('quiz-rpg-showleaderboard');
      localStorage.removeItem('quiz-rpg-showlegal');
      localStorage.removeItem('quiz-rpg-legalpage');
      localStorage.removeItem('quiz-rpg-shownarrative');
    }
  }, [gameState]);

  // ===== GAME LOGIC =====
  
  const handleStartQuest = (universe) => {
    setPendingUniverse(universe);
    setShowDifficultyModal(true);
  };

  const handleSelectDifficulty = (level) => {
    setShowDifficultyModal(false);
    const universe = pendingUniverse;
    setCurrentDifficulty(level);
    const questions = getQuestions(universe, level);
    const completed = character.completedQuestions || {};
    const diffKey = universe === "story" ? "story" : `${universe}_${level === 1 ? "easy" : level === 2 ? "medium" : "hard"}`;

    const failedQuestions = questions.map((q, i) => ({ q, i })).filter(({ q }) => completed[`${diffKey}_${q.id}`] === false);
    const unseenQuestions = questions.map((q, i) => ({ q, i })).filter(({ q }) => completed[`${diffKey}_${q.id}`] === undefined);

    let startIndex = 0;
    if (unseenQuestions.length === 0 && failedQuestions.length > 0) {
      startIndex = failedQuestions[0].i;
    } else if (unseenQuestions.length > 0) {
      const lastSeenIndex = questions.reduce((last, q, i) => completed[`${diffKey}_${q.id}`] !== undefined ? i : last, -1);
      startIndex = lastSeenIndex >= 0 ? Math.min(lastSeenIndex + 1, questions.length - 1) : 0;
      if (completed[`${diffKey}_${questions[startIndex]?.id}`] !== undefined) startIndex = unseenQuestions[0].i;
    }

    setCurrentUniverse(universe);
    setGameState("battle");
    setCurrentQuestionIndex(startIndex);
    setFeedback(null);
    setAnswered(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
    if (universe === "story") setShowNarrative(true);
    else setShowNarrative(false);
  };
  const handleAnswer = (selectedIndex) => {
    if (answered) return;

    const questions = getQuestions(currentUniverse, currentDifficulty);
    const currentQuestion = questions[currentQuestionIndex];
    const isCorrect = selectedIndex === currentQuestion.correct;

    const xpGain = isCorrect ? currentQuestion.xp : Math.floor(currentQuestion.xp * 0.3);
    const diffSuffix = currentUniverse === "story" ? "story" : `${currentUniverse}_${currentDifficulty === 1 ? "easy" : currentDifficulty === 2 ? "medium" : "hard"}`;
    const result = addXP(xpGain, diffSuffix, currentQuestion.id, isCorrect, currentQuestion.act);

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
      alreadyCompleted: result.alreadyCompleted,
      comboBonus: result.comboBonus || 0,
      currentCombo: result.currentCombo || 0,
      lastAnswerCorrect: isCorrect  // pour handleNextQuestion
    });
    setAnswered(true);
  };

  const handleNextQuestion = () => {
    const questions = getQuestions(currentUniverse, currentDifficulty);

    // Scroll en haut à chaque nouvelle question
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Simuler l'état mis à jour de completedQuestions avec la réponse actuelle
    const currentQuestion = questions[currentQuestionIndex];
    const diffSuffix2 = currentUniverse === "story" ? "story" : `${currentUniverse}_${currentDifficulty === 1 ? "easy" : currentDifficulty === 2 ? "medium" : "hard"}`;
    const currentKey = `${diffSuffix2}_${currentQuestion.id}`;
    const lastCorrect = feedback?.lastAnswerCorrect;

    const completed = {
      ...(character.completedQuestions || {}),
      [currentKey]: lastCorrect === true ? true : (lastCorrect === false ? false : (character.completedQuestions || {})[currentKey])
    };

    // Questions encore ratées (excluant la question actuelle si on vient de la réussir)
    const remainingFailed = questions
      .map((q, i) => ({ q, i }))
      .filter(({ q, i }) => {
        if (i === currentQuestionIndex) return false;
        return completed[`${diffSuffix2}_${q.id}`] === false;
      });

    // Questions non vues après la position actuelle
    const nextUnseen = questions
      .map((q, i) => ({ q, i }))
      .filter(({ q, i }) =>
        i > currentQuestionIndex &&
        completed[`${diffSuffix2}_${q.id}`] === undefined
      );

    if (nextUnseen.length > 0) {
      // Il reste des questions non vues → aller à la prochaine
      setCurrentQuestionIndex(nextUnseen[0].i);
      setFeedback(null);
      setAnswered(false);
      if (currentUniverse === 'story') setShowNarrative(true);
    } else if (remainingFailed.length > 0) {
      // Plus de questions non vues mais des ratées → aller à la prochaine ratée
      setCurrentQuestionIndex(remainingFailed[0].i);
      setFeedback(null);
      setAnswered(false);
      if (currentUniverse === 'story') setShowNarrative(true);
    } else {
      // Tout vu et rien de raté → retour au hub
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
    setShowBadges(false);
    setShowLeaderboard(false);
    setShowLegal(false);
    setShowNarrative(true);
    setShowDailyQuests(false);
    // Nettoyer le localStorage
    localStorage.removeItem('quiz-rpg-universe');
    localStorage.removeItem('quiz-rpg-questionindex');
    localStorage.removeItem('quiz-rpg-arena-opponent');
    localStorage.removeItem('quiz-rpg-showbadges');
    localStorage.removeItem('quiz-rpg-showleaderboard');
    localStorage.removeItem('quiz-rpg-showlegal');
    localStorage.removeItem('quiz-rpg-legalpage');
    localStorage.removeItem('quiz-rpg-shownarrative');
    localStorage.removeItem('quiz-rpg-showdailyquests');
  };

  const handleClaimDailyReward = (quest) => {
    // Ajouter XP
    const newXP = character.xp + quest.reward;
    let levelUp = false;
    let newMaxXp = character.maxXp;
    let newLevel = character.level;
    let finalXp = newXP;

    if (newXP >= character.maxXp) {
      newLevel += 1;
      levelUp = true;
      newMaxXp = Math.floor(character.maxXp * 1.1);
      finalXp = newXP - character.maxXp;
    }

    // Mettre à jour le character
    const updatedCharacter = {
      ...character,
      xp: finalXp,
      level: newLevel,
      maxXp: newMaxXp,
      totalXP: (character.totalXP || 0) + quest.reward,
      dailyQuests: {
        ...character.dailyQuests,
        completed: [...(character.dailyQuests?.completed || []), quest.id]
      }
    };

    setCharacter(updatedCharacter);

    if (levelUp) {
      setShowLevelUp(true);
      setNewLevel(newLevel);
    }
  };

  const openEquipment = () => {
    setGameState('equipment');
  };

  const handleEditName = (newName) => {
    setCharacter({ ...character, name: newName });
  };

  const handleOpenLegal = (page) => {
    setLegalPage(page);
    setShowLegal(true);
  };

  const handleOpenArena = () => {
    setGameState('arena');
  };

  const handleStartDuel = (opponent) => {
    setCurrentArenaOpponent(opponent);
    setGameState('arena-battle');
  };

  const handleBattleEnd = (won) => {
    if (won) {
      const xpReward = currentArenaOpponent.reward;
      const result = addXP(xpReward, 'arena', currentArenaOpponent.id);
      
      if (result.levelUp) {
        setShowLevelUp(true);
        setNewLevel(character.level + 1);
      }

      // Update arena stats
      setCharacter(prev => ({
        ...prev,
        arenaWins: (prev.arenaWins || 0) + 1
      }));
    }
    
    setGameState('arena');
    setCurrentArenaOpponent(null);
  };

  // Setup footer legal links
  useEffect(() => {
    const mentionsLink = document.getElementById('legal-mentions');
    const politiqueLink = document.getElementById('legal-politique');
    const cookiesLink = document.getElementById('legal-cookies');

    if (mentionsLink) mentionsLink.addEventListener('click', (e) => { e.preventDefault(); handleOpenLegal('mentions'); });
    if (politiqueLink) politiqueLink.addEventListener('click', (e) => { e.preventDefault(); handleOpenLegal('politique'); });
    if (cookiesLink) cookiesLink.addEventListener('click', (e) => { e.preventDefault(); handleOpenLegal('cookies'); });
  }, []);

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-gradient)' }}>
      <ThemeToggle isDark={isDark} toggleTheme={toggleTheme} />
      <LanguageToggle lang={lang} setLanguage={setLanguage} />
      <InstallButton />

      <LevelUpAnimation 
        level={newLevel} 
        show={showLevelUp} 
        onComplete={() => setShowLevelUp(false)}
        t={t} 
      />

      {showDifficultyModal && (
        <DifficultyModal
          onSelectDifficulty={handleSelectDifficulty}
          onCancel={() => setShowDifficultyModal(false)}
          universeName={pendingUniverse}
          character={character}
          questionsEasy={pendingUniverse ? getQuestions(pendingUniverse, 1) : []}
          questionsMedium={pendingUniverse ? getQuestions(pendingUniverse, 2) : []}
          questionsHard={pendingUniverse ? getQuestions(pendingUniverse, 3) : []}
          t={t}
        />
      )}

      {showEditName && (
        <EditNameModal 
          currentName={character.name}
          onSave={handleEditName}
          onClose={() => setShowEditName(false)}
          t={t}
        />
      )}

      {showBackup && (
        <BackupModal 
          character={character}
          onClose={() => setShowBackup(false)}
          onCharacterLoad={setCharacter}
          t={t}
        />
      )}

      {showProfile && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 500, overflowY: 'auto', background: 'var(--bg-gradient)' }}>
          <ProfileScreen
            character={character}
            onBack={() => setShowProfile(false)}
          t={t}
          />
        </div>
      )}
      
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', minHeight: '60vh' }}>
      {showLegal ? (
        <LegalScreen 
          page={legalPage}
          onBack={() => setShowLegal(false)}
        />
      ) : showBadges ? (
        <BadgesScreen 
          character={character}
          onBack={() => setShowBadges(false)}
          t={t}
        />
      ) : showLeaderboard ? (
        <LeaderboardScreen 
          character={character}
          onBack={() => setShowLeaderboard(false)}
          t={t}
        />
      ) : showDailyQuests ? (
        <DailyQuestsScreen 
          character={character}
          onBack={() => setShowDailyQuests(false)}
          onClaimReward={handleClaimDailyReward}
          t={t}
        />
      ) : gameState === 'hub' ? (
        <HubScreen 
          character={character}
          onStartQuest={handleStartQuest}
          equipmentStats={equipmentStats}
          onOpenEquipment={openEquipment}
          onOpenBadges={() => setShowBadges(true)}
          onOpenLeaderboard={() => setShowLeaderboard(true)}
          onOpenDailyQuests={() => setShowDailyQuests(true)}
          onOpenArena={handleOpenArena}
          onEditName={() => setShowEditName(true)}
          onOpenBackup={() => setShowBackup(true)}
          onOpenProfile={() => setShowProfile(true)}
          t={t}
        />
      ) : gameState === 'equipment' ? (
        <EquipmentScreen 
          character={character}
          onEquip={equipItem}
          onUnequip={unequipItem}
          onBack={goToHub}
        />
      ) : gameState === 'arena' ? (
        <ArenaScreen 
          character={character}
          onBack={goToHub}
          onStartDuel={handleStartDuel}
          t={t}
        />
      ) : gameState === 'arena-battle' && currentArenaOpponent ? (
        <ArenaBattle 
          opponent={currentArenaOpponent}
          character={character}
          equipmentStats={equipmentStats}
          onBattleEnd={handleBattleEnd}
          t={t}
        />
      ) : currentUniverse === 'story' ? (
        <StoryBattleScreen 
          universe={currentUniverse}
          currentQuestion={getQuestions(currentUniverse, currentDifficulty)[currentQuestionIndex]}
          currentQuestionIndex={currentQuestionIndex}
          totalQuestions={getQuestions(currentUniverse, currentDifficulty).length}
          feedback={feedback}
          answered={answered}
          onAnswer={handleAnswer}
          onNext={handleNextQuestion}
          onBack={goToHub}
          showNarrative={showNarrative}
          onContinueNarrative={handleContinueNarrative}
          character={character}
        />
      ) : (
        <BattleScreen 
          universe={currentUniverse}
          currentQuestion={getQuestions(currentUniverse, currentDifficulty)[currentQuestionIndex]}
          currentQuestionIndex={currentQuestionIndex}
          totalQuestions={getQuestions(currentUniverse, currentDifficulty).length}
          feedback={feedback}
          answered={answered}
          onAnswer={handleAnswer}
          onNext={handleNextQuestion}
          onBack={goToHub}
          character={character}
          t={t}
        />
      )}
    </div>
    </div>
  );
}
