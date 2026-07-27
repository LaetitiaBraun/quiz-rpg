import { useState, useEffect } from 'react';
import { INITIAL_CHARACTER } from '../data/constants';
import { checkAndUnlockBadges } from '../data/badgesDB';
import { storageManager } from '../utils/StorageManager';
import { getEquipmentById } from '../data/equipmentDB';
import { QUESTIONS_DB } from '../data/questionsDB';

// Calcule le chapitre en fonction de l'acte max complété
const getChapterFromAct = (universe) => {
  if (!QUESTIONS_DB[universe]) return 1;
  
  const questions = QUESTIONS_DB[universe];
  const maxAct = Math.max(...questions.map(q => q.act || 1));
  return maxAct;
};

export const useCharacter = () => {
  const [character, setCharacter] = useState(INITIAL_CHARACTER);
  const [isLoaded, setIsLoaded] = useState(false);

  // Charger depuis IndexedDB au montage
  useEffect(() => {
    const loadCharacter = async () => {
      try {
        const saved = await storageManager.loadCharacter();
        if (saved) {
          // Migration: Ajoute fields manquants
          if (!saved.equipment) {
            saved.equipment = {
              weapon: 'sword_wood',
              armor: 'armor_leather',
              accessory: null
            };
          }
          if (!saved.inventory) {
            saved.inventory = ['sword_wood', 'armor_leather', 'ring_wisdom'];
          }
          if (!saved.totalXP) {
            saved.totalXP = 0;
          }
          if (!saved.perfectStreak) {
            saved.perfectStreak = 0;
          }
          if (!saved.unlockedBadges) {
            saved.unlockedBadges = [];
          }
          if (!saved.completedQuestions) {
            saved.completedQuestions = {};
          }

          // Vérifier si les quêtes quotidiennes doivent être réinitialisées
          const today = new Date().toDateString();
          if (!saved.dailyQuests) {
            saved.dailyQuests = {
              lastReset: today,
              completed: [],
              progress: { correctAnswers: 0, storyAnswers: 0, codeAnswers: 0, animeAnswers: 0 }
            };
          } else if (saved.dailyQuests.lastReset !== today) {
            // Reset des quêtes - nouvelle journée!
            saved.dailyQuests = {
              lastReset: today,
              completed: [],
              progress: { correctAnswers: 0, storyAnswers: 0, codeAnswers: 0, animeAnswers: 0 }
            };
          }

          setCharacter(saved);
        }
      } catch (error) {
        console.warn('IndexedDB load failed, using localStorage:', error);
        const saved = localStorage.getItem('quizrpg_character');
        if (saved) {
          try {
            setCharacter(JSON.parse(saved));
          } catch (e) {
            console.error('Failed to parse localStorage:', e);
          }
        }
      } finally {
        setIsLoaded(true);
      }
    };

    loadCharacter();
  }, []);

  // Sauvegarder dans IndexedDB quand character change (uniquement après chargement initial)
  useEffect(() => {
    if (!isLoaded) return;

    const saveCharacter = async () => {
      try {
        await storageManager.saveCharacter(character);
      } catch (error) {
        console.warn('IndexedDB save failed, using localStorage:', error);
        localStorage.setItem('quizrpg_character', JSON.stringify(character));
      }
    };

    const debounceTimer = setTimeout(saveCharacter, 500);
    return () => clearTimeout(debounceTimer);
  }, [character, isLoaded]);

  // Ajoute XP et gère la montée de niveau (une seule fois par question)
  const addXP = (xpAmount, universe, questionId, isCorrect = true, questionAct = null) => {
    // Initialise completedQuestions si n'existe pas
    if (!character.completedQuestions) {
      character.completedQuestions = {};
    }

    // Initialiser daily quests progress s'il n'existe pas
    if (!character.dailyQuests) {
      character.dailyQuests = {
        lastReset: new Date().toDateString(),
        completed: [],
        progress: { correctAnswers: 0, storyAnswers: 0, codeAnswers: 0, animeAnswers: 0 }
      };
    }

    const questionKey = `${universe}_${questionId}`;
    const alreadyCompleted = character.completedQuestions[questionKey];

    let newXp = character.xp;
    let levelUp = false;
    let newStreak = (character.perfectStreak || 0);
    let newCombo = character.currentCombo || 0;
    let comboBonus = 0;

    // Ajoute XP seulement si première fois que la question est réussie
    if (!alreadyCompleted && isCorrect) {
      // Gérer le combo
      newCombo = (character.currentCombo || 0) + 1;
      
      // Calcul du bonus combo (5% par niveau de combo, max 50%)
      const comboMultiplier = Math.min(1 + (newCombo * 0.05), 1.5);
      const bonusXp = Math.floor(xpAmount * (comboMultiplier - 1));
      comboBonus = bonusXp;
      
      newXp = character.xp + xpAmount + bonusXp;
      
      let newLevel = character.level;
      let newMaxXp = character.maxXp;

      if (newXp >= character.maxXp) {
        newLevel += 1;
        levelUp = true;
        newMaxXp = Math.floor(character.maxXp * 1.1);
        newXp = newXp - character.maxXp;
      }

      // Track perfect streak
      if (isCorrect) {
        newStreak = (character.perfectStreak || 0) + 1;
      }

      // Calculer le nouveau chapitre si story quest
      let updatedProgress = {
        ...character.progress,
        [universe]: {
          ...character.progress[universe],
          completed: character.progress[universe].completed + 1
        }
      };

      // Mettre à jour le chapitre pour story quest basé sur l'acte
      if (universe === 'story' && questionAct) {
        updatedProgress.story = {
          ...updatedProgress.story,
          chapter: Math.max(updatedProgress.story.chapter || 1, questionAct)
        };
      }

      // Tracker les daily quests
      const newDailyProgress = {
        ...character.dailyQuests.progress,
        correctAnswers: (character.dailyQuests.progress.correctAnswers || 0) + 1
      };

      if (universe === 'story') {
        newDailyProgress.storyAnswers = (newDailyProgress.storyAnswers || 0) + 1;
      } else if (universe === 'programming') {
        newDailyProgress.codeAnswers = (newDailyProgress.codeAnswers || 0) + 1;
      } else if (universe === 'anime') {
        newDailyProgress.animeAnswers = (newDailyProgress.animeAnswers || 0) + 1;
      }

      // Nouveau personnage avec tracking
      const updatedCharacter = {
        ...character,
        xp: newXp,
        level: newLevel,
        maxXp: newMaxXp,
        totalXP: (character.totalXP || 0) + xpAmount + comboBonus,
        perfectStreak: newStreak,
        currentCombo: newCombo,
        maxCombo: Math.max(character.maxCombo || 0, newCombo),
        completedQuestions: {
          ...character.completedQuestions,
          [questionKey]: true
        },
        progress: updatedProgress,
        dailyQuests: {
          ...character.dailyQuests,
          progress: newDailyProgress
        }
      };

      // Vérifier et débloquer les badges
      const newBadges = checkAndUnlockBadges(updatedCharacter);
      const unlockedBadges = character.unlockedBadges || [];
      newBadges.forEach(badge => {
        if (!unlockedBadges.includes(badge.id)) {
          unlockedBadges.push(badge.id);
        }
      });

      updatedCharacter.unlockedBadges = unlockedBadges;
      updatedCharacter.newlyUnlockedBadges = newBadges;

      setCharacter(updatedCharacter);
    } else if (!isCorrect) {
      // Reset combo et streak on wrong answer
      setCharacter({
        ...character,
        perfectStreak: 0,
        currentCombo: 0
      });
    } else {
      // Question déjà complétée - pas d'XP
      setCharacter({
        ...character,
        completedQuestions: character.completedQuestions
      });
    }

    return { 
      newLevel: character.level, 
      levelUp,
      alreadyCompleted,
      xpGained: (alreadyCompleted || !isCorrect) ? 0 : xpAmount + comboBonus,
      newStreak,
      comboBonus,
      currentCombo: newCombo
    };
  };

  // Équipe un objet
  const equipItem = (equipmentId) => {
    const equipment = getEquipmentById(equipmentId);
    if (!equipment) return;

    const slotMap = {
      weapon: 'weapon',
      armor: 'armor',
      accessory: 'accessory'
    };

    const slot = slotMap[equipment.type];

    setCharacter({
      ...character,
      equipment: {
        ...character.equipment,
        [slot]: equipmentId
      }
    });
  };

  // Déséquipe un objet
  const unequipItem = (slot) => {
    setCharacter({
      ...character,
      equipment: {
        ...character.equipment,
        [slot]: null
      }
    });
  };

  // Ajoute un objet à l'inventaire
  const addToInventory = (equipmentId) => {
    if (!character.inventory.includes(equipmentId)) {
      setCharacter({
        ...character,
        inventory: [...character.inventory, equipmentId]
      });
    }
  };

  // Calcule les stats bonus
  const getEquipmentStats = () => {
    const bonusStats = { strength: 0, intelligence: 0, wisdom: 0 };
    
    if (!character.equipment) return bonusStats;
    
    Object.values(character.equipment).forEach(equipId => {
      if (equipId) {
        const equipment = getEquipmentById(equipId);
        if (equipment && equipment.stats) {
          bonusStats.strength += equipment.stats.strength || 0;
          bonusStats.intelligence += equipment.stats.intelligence || 0;
          bonusStats.wisdom += equipment.stats.wisdom || 0;
        }
      }
    });

    return bonusStats;
  };

  // Réinitialise le personnage
  const resetCharacter = () => {
    setCharacter(INITIAL_CHARACTER);
    localStorage.removeItem('quizrpg_character');
  };

  return {
    character,
    setCharacter,
    addXP,
    equipItem,
    unequipItem,
    addToInventory,
    getEquipmentStats,
    resetCharacter
  };
};
