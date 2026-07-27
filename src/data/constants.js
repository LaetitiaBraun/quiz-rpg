export const UNIVERSE_CONFIG = {
  anime: {
    icon: '⚔️',
    title: 'Anime Quest',
    description: 'Trivia anime/manga',
    color: '#d85a30'
  },
  programming: {
    icon: '💻',
    title: 'Code Quest',
    description: 'Défis de programmation',
    color: '#1d9e75'
  },
  story: {
    icon: '📖',
    title: 'Story Quest',
    description: 'Campagne narrative',
    color: '#7f77dd'
  },
  arena: {
    icon: '🏆',
    title: 'Arena',
    description: 'Duels multijoueur',
    color: '#c9a961'
  }
};

export const INITIAL_CHARACTER = {
  name: "Héros",
  level: 1,
  xp: 0,
  maxXp: 100,
  totalXP: 0,
  health: 100,
  maxHealth: 100,
  perfectStreak: 0,
  currentCombo: 0,
  maxCombo: 0,
  stats: { strength: 10, intelligence: 12, wisdom: 10 },
  progress: {
    anime: { completed: 0, difficulty: 1 },
    programming: { completed: 0, difficulty: 1 },
    story: { chapter: 1, difficulty: 1 }
  },
  inventory: ['sword_wood', 'armor_leather', 'ring_wisdom'],
  equipment: {
    weapon: 'sword_wood',
    armor: 'armor_leather',
    accessory: null
  },
  completedQuestions: {},
  unlockedBadges: [],
  dailyQuests: {
    lastReset: new Date().toDateString(),
    completed: [],
    progress: {
      correctAnswers: 0,
      storyAnswers: 0,
      codeAnswers: 0,
      animeAnswers: 0
    }
  }
};


