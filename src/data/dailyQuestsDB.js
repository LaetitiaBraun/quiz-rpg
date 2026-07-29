export const DAILY_QUESTS = [
  {
    id: 'daily_1',
    title: '🎯 Maître Quiz',
    description: 'Complète 5 questions correctes',
    goal: 5,
    progress: 0,
    reward: 500,
    difficulty: 'Moyen'
  },
  {
    id: 'daily_2',
    title: '⚡ Combo Master',
    description: 'Atteins un combo de 10',
    goal: 10,
    progress: 0,
    reward: 400,
    difficulty: 'Difficile'
  },
  {
    id: 'daily_3',
    title: '📖 Lecteur Passionné',
    description: 'Complète 3 questions de Story Quest',
    goal: 3,
    progress: 0,
    reward: 300,
    difficulty: 'Facile'
  },
  {
    id: 'daily_4',
    title: '💻 Hacker Pro',
    description: 'Complète 4 questions de Code Quest',
    goal: 4,
    progress: 0,
    reward: 350,
    difficulty: 'Moyen'
  },
  {
    id: 'daily_5',
    title: '🏆 Anime Fan',
    description: 'Complète 3 questions d\'Anime Quest',
    goal: 3,
    progress: 0,
    reward: 300,
    difficulty: 'Facile'
  }
];

export const QUICK_QUESTS = [
  {
    id: 'quick_anime_1',
    universe: 'anime',
    title: 'One-Shot Anime',
    reward: 50,
    description: '1 question rapide'
  },
  {
    id: 'quick_code_1',
    universe: 'programming',
    title: 'Code Challenge',
    reward: 60,
    description: '1 question rapide'
  },
  {
    id: 'quick_story_1',
    universe: 'story',
    title: 'Story Moment',
    reward: 70,
    description: '1 question rapide'
  }
];

export const generateDailyQuests = () => {
  return DAILY_QUESTS.map(quest => ({
    ...quest,
    progress: 0,
    completed: false
  }));
};

export const checkDailyQuestCompletion = (quest, character) => {
  // Utiliser character.dailyQuests.progress (le bon chemin!)
  const progress = character.dailyQuests?.progress || {};

  if (quest.id === 'daily_1') {
    return (progress.correctAnswers || 0) >= quest.goal;
  }
  if (quest.id === 'daily_2') {
    return (character.maxCombo || 0) >= quest.goal;
  }
  if (quest.id === 'daily_3') {
    return (progress.storyAnswers || 0) >= quest.goal;
  }
  if (quest.id === 'daily_4') {
    return (progress.codeAnswers || 0) >= quest.goal;
  }
  if (quest.id === 'daily_5') {
    return (progress.animeAnswers || 0) >= quest.goal;
  }
  return false;
};
