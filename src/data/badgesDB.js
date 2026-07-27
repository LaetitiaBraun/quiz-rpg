export const BADGES_DB = {
  // Progression Badges
  first_victory: {
    id: 'first_victory',
    name: 'Première Victoire',
    description: 'Réponds correctement à une question',
    emoji: '⚔️',
    color: '#1d9e75',
    rarity: 'common',
    unlockCriteria: (character) => {
      // Vérifier si au moins une question est complétée correctement
      return Object.keys(character.completedQuestions || {}).length >= 1;
    }
  },

  level_5: {
    id: 'level_5',
    name: 'Guerrier Confirmé',
    description: 'Atteins le niveau 5',
    emoji: '🗡️',
    color: '#7f77dd',
    rarity: 'uncommon',
    unlockCriteria: (character) => character.level >= 5
  },

  level_10: {
    id: 'level_10',
    name: 'Héros Légendaire',
    description: 'Atteins le niveau 10',
    emoji: '👑',
    color: '#c9a961',
    rarity: 'rare',
    unlockCriteria: (character) => character.level >= 10
  },

  level_20: {
    id: 'level_20',
    name: 'Dieu du Jeu',
    description: 'Atteins le niveau 20',
    emoji: '⭐',
    color: '#ffd700',
    rarity: 'epic',
    unlockCriteria: (character) => character.level >= 20
  },

  // Quest Completion Badges
  anime_master: {
    id: 'anime_master',
    name: 'Maître Anime',
    description: 'Complète toutes les questions Anime Quest',
    emoji: '⚡',
    color: '#d85a30',
    rarity: 'rare',
    unlockCriteria: (character) => {
      const animeQuestions = Object.keys(character.completedQuestions || {}).filter(q => q.startsWith('anime_'));
      return animeQuestions.length >= 25;
    }
  },

  code_expert: {
    id: 'code_expert',
    name: 'Expert en Code',
    description: 'Complète toutes les questions Code Quest',
    emoji: '💻',
    color: '#1d9e75',
    rarity: 'rare',
    unlockCriteria: (character) => {
      const codeQuestions = Object.keys(character.completedQuestions || {}).filter(q => q.startsWith('programming_'));
      return codeQuestions.length >= 25;
    }
  },

  story_legend: {
    id: 'story_legend',
    name: 'Légende de l\'Histoire',
    description: 'Complète la campagne Story Quest',
    emoji: '📖',
    color: '#7f77dd',
    rarity: 'epic',
    unlockCriteria: (character) => {
      const storyQuestions = Object.keys(character.completedQuestions || {}).filter(q => q.startsWith('story_'));
      return storyQuestions.length >= 11;
    }
  },

  // Challenge Badges
  perfect_streak_10: {
    id: 'perfect_streak_10',
    name: 'Concentration Totale',
    description: '10 bonnes réponses d\'affilée',
    emoji: '🔥',
    color: '#d85a30',
    rarity: 'uncommon',
    unlockCriteria: (character) => (character.perfectStreak || 0) >= 10
  },

  perfect_streak_25: {
    id: 'perfect_streak_25',
    name: 'Machine de Guerre',
    description: '25 bonnes réponses d\'affilée',
    emoji: '💥',
    color: '#c9a961',
    rarity: 'rare',
    unlockCriteria: (character) => (character.perfectStreak || 0) >= 25
  },

  // Equipment Badges
  fully_equipped: {
    id: 'fully_equipped',
    name: 'Équipement Complet',
    description: 'Équipe tous les slots (arme, armure, accessoire)',
    emoji: '⚙️',
    color: '#7f77dd',
    rarity: 'uncommon',
    unlockCriteria: (character) => {
      const equipment = character.equipment || {};
      return equipment.weapon && equipment.armor && equipment.accessory;
    }
  },

  // Milestone Badges
  questions_100: {
    id: 'questions_100',
    name: 'Chercheur de Savoir',
    description: 'Réponds à 100 questions',
    emoji: '📚',
    color: '#1d9e75',
    rarity: 'rare',
    unlockCriteria: (character) => {
      const totalQuestions = Object.keys(character.completedQuestions || {}).length;
      return totalQuestions >= 100;
    }
  },

  xp_milestone: {
    id: 'xp_milestone',
    name: 'Accumulateur d\'Expérience',
    description: 'Accumule 10,000 XP au total',
    emoji: '✨',
    color: '#c9a961',
    rarity: 'rare',
    unlockCriteria: (character) => (character.totalXP || 0) >= 10000
  }
};

export const ALL_BADGES = Object.values(BADGES_DB);

// Fonction pour débloquer les badges automatiquement
export const checkAndUnlockBadges = (character) => {
  const unlockedBadges = character.unlockedBadges || [];
  const newlyUnlocked = [];

  ALL_BADGES.forEach(badge => {
    if (!unlockedBadges.includes(badge.id) && badge.unlockCriteria(character)) {
      newlyUnlocked.push(badge);
    }
  });

  return newlyUnlocked;
};
