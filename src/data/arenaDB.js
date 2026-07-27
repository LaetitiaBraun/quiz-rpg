export const ARENA_OPPONENTS = [
  {
    id: 'goblin-fighter',
    name: 'Gobelin Combattant',
    level: 1,
    stats: { strength: 8, intelligence: 5, wisdom: 4 },
    emoji: '🐢',
    difficulty: 'Facile',
    reward: 50,
  },
  {
    id: 'orc-warrior',
    name: 'Guerrier Orc',
    level: 3,
    stats: { strength: 15, intelligence: 8, wisdom: 7 },
    emoji: '🧟',
    difficulty: 'Moyen',
    reward: 150,
  },
  {
    id: 'dragon-slayer',
    name: 'Chasseur de Dragon',
    level: 5,
    stats: { strength: 18, intelligence: 14, wisdom: 12 },
    emoji: '⚔️',
    difficulty: 'Difficile',
    reward: 300,
  },
  {
    id: 'shadow-assassin',
    name: 'Assassin de l\'Ombre',
    level: 7,
    stats: { strength: 12, intelligence: 16, wisdom: 10 },
    emoji: '🗡️',
    difficulty: 'Extrême',
    reward: 500,
  },
  {
    id: 'ancient-mage',
    name: 'Mage Ancien',
    level: 10,
    stats: { strength: 10, intelligence: 20, wisdom: 18 },
    emoji: '🧙',
    difficulty: 'Légendaire',
    reward: 1000,
  },
];

export const getOpponentById = (id) => {
  return ARENA_OPPONENTS.find(opponent => opponent.id === id);
};

export const getDifficultyColor = (difficulty) => {
  const colors = {
    'Facile': '#5dcaa5',
    'Moyen': '#c9a961',
    'Difficile': '#f07a42',
    'Extrême': '#d85a30',
    'Légendaire': '#ffd700',
  };
  return colors[difficulty] || '#b8a8d8';
};

export const getRecommendedLevel = (difficulty) => {
  const levels = {
    'Facile': 1,
    'Moyen': 3,
    'Difficile': 5,
    'Extrême': 7,
    'Légendaire': 10,
  };
  return levels[difficulty] || 1;
};
