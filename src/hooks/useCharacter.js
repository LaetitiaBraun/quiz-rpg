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
        // Essayer localStorage d'abord (plus fiable sur Vercel/navigateur)
        const lsSaved = localStorage.getItem('quizrpg_character');
        let saved = lsSaved ? JSON.parse(lsSaved) : null;

        // Si pas dans localStorage, essayer IndexedDB
        if (!saved) {
          saved = await storageManager.loadCharacter();
        }

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

          // === STREAK DE JOURS CONSÉCUTIFS ===
          const todayStr = new Date().toDateString();
          const lastPlayedStr = saved.lastPlayedDate;

          if (!lastPlayedStr) {
            // Première fois → streak = 1
            saved.perfectStreak = 1;
            saved.lastPlayedDate = todayStr;
          } else if (lastPlayedStr === todayStr) {
            // Déjà joué aujourd'hui → streak inchangé
          } else {
            // Vérifier si c'était hier
            const yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);
            const yesterdayStr = yesterday.toDateString();

            if (lastPlayedStr === yesterdayStr) {
              // Joué hier → streak +1
              saved.perfectStreak = (saved.perfectStreak || 0) + 1;
            } else {
              // Plus d'un jour de pause → streak reset à 1
              saved.perfectStreak = 1;
            }
            saved.lastPlayedDate = todayStr;
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

  // Sauvegarder IMMÉDIATEMENT à chaque changement (pas de debounce)
  useEffect(() => {
    if (!isLoaded) return;
    // Sauvegarde synchrone localStorage en premier (toujours fiable)
    localStorage.setItem('quizrpg_character', JSON.stringify(character));
    // Sauvegarde IndexedDB en arrière-plan
    storageManager.saveCharacter(character).catch(() => {});
  }, [character, isLoaded]);

  // Ajoute XP et gère la montée de niveau (une seule fois par question)
  const addXP = (xpAmount, universe, questionId, isCorrect = true, questionAct = null) => {
    const questionKey = `${universe}_${questionId}`;

    const result = { levelUp: false, alreadyCompleted: false, xpGained: 0, comboBonus: 0, currentCombo: 0 };

    setCharacter(prev => {
      const cq = prev.completedQuestions || {};
      const previousResult = cq[questionKey];
      const alreadySucceeded = previousResult === true;
      const wasFailed = previousResult === false;
      const isFirstTime = previousResult === undefined;

      result.alreadyCompleted = alreadySucceeded;

      const dailyQuests = prev.dailyQuests || {
        lastReset: new Date().toDateString(),
        completed: [],
        progress: { correctAnswers: 0, storyAnswers: 0, codeAnswers: 0, animeAnswers: 0 }
      };

      if ((isFirstTime || wasFailed) && isCorrect) {
        const newCombo = (prev.currentCombo || 0) + 1;
        const comboMultiplier = Math.min(1 + (newCombo * 0.05), 1.5);
        const bonusXp = Math.floor(xpAmount * (comboMultiplier - 1));
        result.comboBonus = bonusXp;
        result.currentCombo = newCombo;
        result.xpGained = xpAmount + bonusXp;

        let newXp = prev.xp + xpAmount + bonusXp;
        let newLevel = prev.level;
        let newMaxXp = prev.maxXp;

        if (newXp >= prev.maxXp) {
          newLevel += 1;
          result.levelUp = true;
          newMaxXp = Math.floor(prev.maxXp * 1.1);
          newXp = newXp - prev.maxXp;
        }

        // Progress: incrémenter seulement si première fois
        let updatedProgress = { ...prev.progress };
        if (isFirstTime) {
          updatedProgress = {
            ...prev.progress,
            [universe]: {
              ...prev.progress[universe],
              completed: (prev.progress[universe]?.completed || 0) + 1
            }
          };
        }
        if (universe === 'story' && questionAct) {
          updatedProgress.story = {
            ...updatedProgress.story,
            chapter: Math.max(updatedProgress.story?.chapter || 1, questionAct)
          };
        }

        // Daily quests
        const dp = { ...dailyQuests.progress };
        dp.correctAnswers = (dp.correctAnswers || 0) + 1;
        if (universe === 'story') dp.storyAnswers = (dp.storyAnswers || 0) + 1;
        else if (universe === 'programming') dp.codeAnswers = (dp.codeAnswers || 0) + 1;
        else if (universe === 'anime') dp.animeAnswers = (dp.animeAnswers || 0) + 1;

        const updated = {
          ...prev,
          xp: newXp,
          level: newLevel,
          maxXp: newMaxXp,
          totalXP: (prev.totalXP || 0) + xpAmount + bonusXp,
          currentCombo: newCombo,
          maxCombo: Math.max(prev.maxCombo || 0, newCombo),
          completedQuestions: { ...cq, [questionKey]: true },
          progress: updatedProgress,
          dailyQuests: { ...dailyQuests, progress: dp }
        };

        const newBadges = checkAndUnlockBadges(updated);
        const unlockedBadges = [...(prev.unlockedBadges || [])];
        newBadges.forEach(b => { if (!unlockedBadges.includes(b.id)) unlockedBadges.push(b.id); });
        updated.unlockedBadges = unlockedBadges;
        updated.newlyUnlockedBadges = newBadges;

        return updated;

      } else if (!isCorrect) {
        result.currentCombo = 0;
        const failedUpdate = {
          ...prev,
          currentCombo: 0,
          completedQuestions: { ...cq, [questionKey]: false }
        };
        return failedUpdate;
      } else {
        // Déjà réussi - rien ne change
        result.currentCombo = prev.currentCombo || 0;
        return prev;
      }
    });

    return result;
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
