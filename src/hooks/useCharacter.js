import { useState, useEffect } from 'react';
import { INITIAL_CHARACTER } from '../data/constants';
import { getEquipmentById } from '../data/equipmentDB';

export const useCharacter = () => {
  const [character, setCharacter] = useState(() => {
    const saved = localStorage.getItem('quizrpg_character');
    let data = saved ? JSON.parse(saved) : INITIAL_CHARACTER;
    
    // Migration: Ajoute equipment et inventory si manquants
    if (!data.equipment) {
      data.equipment = {
        weapon: 'sword_wood',
        armor: 'armor_leather',
        accessory: null
      };
    }
    if (!data.inventory) {
      data.inventory = ['sword_wood', 'armor_leather', 'ring_wisdom'];
    }
    
    return data;
  });

  // Sauvegarde automatique
  useEffect(() => {
    localStorage.setItem('quizrpg_character', JSON.stringify(character));
  }, [character]);

  // Ajoute XP et gère la montée de niveau (une seule fois par question)
  const addXP = (xpAmount, universe, questionId) => {
    // Initialise completedQuestions si n'existe pas
    if (!character.completedQuestions) {
      character.completedQuestions = {};
    }

    const questionKey = `${universe}_${questionId}`;
    const alreadyCompleted = character.completedQuestions[questionKey];

    let newXp = character.xp;
    let levelUp = false;

    // Ajoute XP seulement si première fois que la question est réussie
    if (!alreadyCompleted) {
      newXp = character.xp + xpAmount;
      
      let newLevel = character.level;
      let newMaxXp = character.maxXp;

      if (newXp >= character.maxXp) {
        newLevel += 1;
        levelUp = true;
        newMaxXp = Math.floor(character.maxXp * 1.1);
        newXp = newXp - character.maxXp;
      }

      setCharacter({
        ...character,
        xp: newXp,
        level: newLevel,
        maxXp: newMaxXp,
        completedQuestions: {
          ...character.completedQuestions,
          [questionKey]: true
        },
        progress: {
          ...character.progress,
          [universe]: {
            ...character.progress[universe],
            completed: character.progress[universe].completed + 1
          }
        }
      });
    } else {
      // Question déjà complétée - pas d'XP, juste un message
      setCharacter({
        ...character,
        completedQuestions: character.completedQuestions
      });
    }

    return { 
      newLevel: character.level, 
      levelUp,
      alreadyCompleted,
      xpGained: alreadyCompleted ? 0 : xpAmount
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
