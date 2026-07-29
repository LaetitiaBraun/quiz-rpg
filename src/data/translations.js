export const translations = {
  fr: {
    // === HUB ===
    editName: '✏️ Éditer Nom',
    equipment: '⚔️ Équipement',
    badges: '🏆 Badges',
    leaderboard: '🏅 Classement',
    dailyQuests: '📅 Quêtes Quotidiennes',
    saves: '💾 Sauvegardes',
    profile: '📊 Profil',

    // === QUEST CARDS ===
    victories: 'victoires',
    chapter: 'Chapitre',
    questions: 'questions',

    // === DIFFICULTY MODAL ===
    choosesDifficulty: 'Choisir la Difficulté',
    easy: 'Facile',
    medium: 'Moyen',
    hard: 'Difficile',
    easyDesc: 'Questions accessibles',
    mediumDesc: 'Connaissances solides',
    hardDesc: 'Expert seulement !',
    difficultyTip: '💡 Plus la difficulté est élevée, plus vous gagnez d\'XP!',
    toReview: 'à revoir',
    completed: 'Complété!',

    // === QUESTION CARD ===
    question: 'Question',
    correct: '✓ Correct!',
    incorrect: '✗ Incorrect!',
    alreadyDone: 'ℹ️ Question déjà complétée - Pas de points bonus',
    next: 'Suivant →',
    clickToContinue: 'Cliquer pour continuer',
    correctAnim: 'CORRECT !',
    incorrectAnim: 'INCORRECT !',

    // === CHARACTER CARD ===
    level: 'Niveau',
    xpText: (xp, max) => `${xp} / ${max} XP`,
    streak: '🔥 Streak',
    combo: '⚡ Combo',
    force: 'FORCE',
    intelligence: 'INTELLIGENCE',
    wisdom: 'SAGESSE',
    weapon: 'Arme',
    armor: 'Armure',
    accessory: 'Accessoire',

    // === BATTLE SCREEN ===
    backToHub: '← Retour au Hub',
    finishQuest: 'Terminer cette quête',

    // === PROFILE ===
    profileOf: (name) => `Profil de ${name}`,
    xpProgress: 'Progression XP',
    totalXP: 'XP Total:',
    successRate: 'Taux de Réussite',
    questionsAnswered: 'répondues',
    bestCombo: 'Meilleur Combo',
    consecutiveAnswers: 'réponses consécutives',
    arenaWins: 'Victoires Arena',
    battlesWon: 'combats remportés',
    achievements: 'Achievements',
    unlocked: 'débloqués',
    timePlayed: 'Temps Joué',
    estimated: 'estimé',
    progressByUniverse: 'Progression par Univers',
    characterStats: 'Stats du Personnage',
    back: '← Retour',

    // === DAILY QUESTS ===
    dailyQuestsTitle: '📅 Quêtes Quotidiennes',
    resetAtMidnight: 'Reset à minuit',
    todayXP: 'XP gagnés aujourd\'hui',
    xpToClaim: (xp) => `🎁 ${xp} XP à réclamer !`,
    claim: 'Claim',
    claimed: '✓ Claimée',
    notFinished: 'Pas finie',
    totalReward: 'Récompense totale',
    tip: '💡 Conseil',
    dailyTip: 'Complète les quêtes quotidiennes pour gagner des XP supplémentaires et progresser plus vite!',

    // === BADGES ===
    badgesTitle: '🏆 Badges & Accomplissements',
    badgesUnlocked: (n, total) => `${n} / ${total} badges débloqués`,
    epic: '● ÉPIQUE',
    rare: '● RARE',
    uncommon: '● PEU COMMUN',
    common: '● COMMUN',

    // === LEADERBOARD ===
    leaderboardTitle: '🏅 Classement des Héros',
    yourPosition: 'Ta position:',
    rank: 'RANG',
    heroName: 'NOM DU HÉROS',
    levelCol: 'NIVEAU',
    totalXPCol: 'XP TOTAL',
    autoUpdate: '📊 Le classement se met à jour automatiquement après chaque quête!',
    totalPlayers: 'Total des joueurs:',

    // === ARENA ===
    arenaTitle: '🏟️ Arène des Héros',
    chooseOpponent: 'Choisir un Adversaire',
    fight: 'Combattre',
    yourStats: 'Tes Stats',
    opponentStats: 'Stats Adversaire',
    victory: '🏆 Victoire!',
    defeat: '💀 Défaite!',

    // === EQUIPMENT ===
    equipmentTitle: '⚔️ Équipement',
    equipped: 'Équipé',
    equip: 'Équiper',
    unequip: 'Déséquiper',
    inventory: 'Inventaire',

    // === BACKUP ===
    savesTitle: '💾 Sauvegardes',
    createBackup: '➕ Créer un Backup Local',
    noBackup: 'Aucun backup local',
    restore: 'Restaurer',
    delete: 'Supprimer',
    export: '📤 Exporter',
    exportDesc: 'Télécharger ton character en fichier .json',
    exportBtn: 'Exporter mon Character',
    import: '📥 Importer',
    importDesc: 'Charger un fichier .json précédemment exporté',
    importBtn: 'Choisir un fichier',
    local: '📂 Local',
    exportImport: '📤 Export/Import',

    // === EDIT NAME ===
    editHeroName: 'Éditer le nom du héros',
    heroNameLabel: 'Nom du Héros:',
    cancel: 'Annuler',
    validate: 'Valider',

    // === LEGAL ===
    legalMentions: 'Mentions Légales',
    privacy: 'Politique de Confidentialité',
    cookies: 'Gestion des Cookies',

    // === LEVEL UP ===
    levelUp: '🎉 NIVEAU SUPÉRIEUR!',
    newLevel: (n) => `Niveau ${n}`,

    // === UNIVERSE CONFIG ===
    animeTitle: 'Anime Quest',
    animeDesc: 'Trivia anime/manga',
    codeTitle: 'Code Quest',
    codeDesc: 'Défis de programmation',
    storyTitle: 'Story Quest',
    storyDesc: 'Campagne narrative',
    arenaTitle2: 'Arène',
    arenaDesc: 'Duels multijoueur',
  },

  en: {
    // === HUB ===
    editName: '✏️ Edit Name',
    equipment: '⚔️ Equipment',
    badges: '🏆 Badges',
    leaderboard: '🏅 Leaderboard',
    dailyQuests: '📅 Daily Quests',
    saves: '💾 Saves',
    profile: '📊 Profile',

    // === QUEST CARDS ===
    victories: 'victories',
    chapter: 'Chapter',
    questions: 'questions',

    // === DIFFICULTY MODAL ===
    choosesDifficulty: 'Choose Difficulty',
    easy: 'Easy',
    medium: 'Medium',
    hard: 'Hard',
    easyDesc: 'Accessible questions',
    mediumDesc: 'Solid knowledge',
    hardDesc: 'Experts only!',
    difficultyTip: '💡 The higher the difficulty, the more XP you earn!',
    toReview: 'to review',
    completed: 'Completed!',

    // === QUESTION CARD ===
    question: 'Question',
    correct: '✓ Correct!',
    incorrect: '✗ Incorrect!',
    alreadyDone: 'ℹ️ Question already completed - No bonus points',
    next: 'Next →',
    clickToContinue: 'Click to continue',
    correctAnim: 'CORRECT!',
    incorrectAnim: 'INCORRECT!',

    // === CHARACTER CARD ===
    level: 'Level',
    xpText: (xp, max) => `${xp} / ${max} XP`,
    streak: '🔥 Streak',
    combo: '⚡ Combo',
    force: 'STRENGTH',
    intelligence: 'INTELLIGENCE',
    wisdom: 'WISDOM',
    weapon: 'Weapon',
    armor: 'Armor',
    accessory: 'Accessory',

    // === BATTLE SCREEN ===
    backToHub: '← Back to Hub',
    finishQuest: 'Finish this quest',

    // === PROFILE ===
    profileOf: (name) => `${name}'s Profile`,
    xpProgress: 'XP Progress',
    totalXP: 'Total XP:',
    successRate: 'Success Rate',
    questionsAnswered: 'answered',
    bestCombo: 'Best Combo',
    consecutiveAnswers: 'consecutive answers',
    arenaWins: 'Arena Wins',
    battlesWon: 'battles won',
    achievements: 'Achievements',
    unlocked: 'unlocked',
    timePlayed: 'Time Played',
    estimated: 'estimated',
    progressByUniverse: 'Progress by Universe',
    characterStats: 'Character Stats',
    back: '← Back',

    // === DAILY QUESTS ===
    dailyQuestsTitle: '📅 Daily Quests',
    resetAtMidnight: 'Resets at midnight',
    todayXP: 'XP earned today',
    xpToClaim: (xp) => `🎁 ${xp} XP to claim!`,
    claim: 'Claim',
    claimed: '✓ Claimed',
    notFinished: 'Not done',
    totalReward: 'Total reward',
    tip: '💡 Tip',
    dailyTip: 'Complete daily quests to earn bonus XP and progress faster!',

    // === BADGES ===
    badgesTitle: '🏆 Badges & Achievements',
    badgesUnlocked: (n, total) => `${n} / ${total} badges unlocked`,
    epic: '● EPIC',
    rare: '● RARE',
    uncommon: '● UNCOMMON',
    common: '● COMMON',

    // === LEADERBOARD ===
    leaderboardTitle: '🏅 Hero Leaderboard',
    yourPosition: 'Your position:',
    rank: 'RANK',
    heroName: 'HERO NAME',
    levelCol: 'LEVEL',
    totalXPCol: 'TOTAL XP',
    autoUpdate: '📊 The leaderboard updates automatically after each quest!',
    totalPlayers: 'Total players:',

    // === ARENA ===
    arenaTitle: '🏟️ Hero Arena',
    chooseOpponent: 'Choose an Opponent',
    fight: 'Fight',
    yourStats: 'Your Stats',
    opponentStats: 'Opponent Stats',
    victory: '🏆 Victory!',
    defeat: '💀 Defeat!',

    // === EQUIPMENT ===
    equipmentTitle: '⚔️ Equipment',
    equipped: 'Equipped',
    equip: 'Equip',
    unequip: 'Unequip',
    inventory: 'Inventory',

    // === BACKUP ===
    savesTitle: '💾 Saves',
    createBackup: '➕ Create Local Backup',
    noBackup: 'No local backup',
    restore: 'Restore',
    delete: 'Delete',
    export: '📤 Export',
    exportDesc: 'Download your character as a .json file',
    exportBtn: 'Export my Character',
    import: '📥 Import',
    importDesc: 'Load a previously exported .json file',
    importBtn: 'Choose a file',
    local: '📂 Local',
    exportImport: '📤 Export/Import',

    // === EDIT NAME ===
    editHeroName: 'Edit hero name',
    heroNameLabel: 'Hero Name:',
    cancel: 'Cancel',
    validate: 'Confirm',

    // === LEGAL ===
    legalMentions: 'Legal Notice',
    privacy: 'Privacy Policy',
    cookies: 'Cookie Settings',

    // === LEVEL UP ===
    levelUp: '🎉 LEVEL UP!',
    newLevel: (n) => `Level ${n}`,

    // === UNIVERSE CONFIG ===
    animeTitle: 'Anime Quest',
    animeDesc: 'Anime/manga trivia',
    codeTitle: 'Code Quest',
    codeDesc: 'Programming challenges',
    storyTitle: 'Story Quest',
    storyDesc: 'Narrative campaign',
    arenaTitle2: 'Arena',
    arenaDesc: 'Multiplayer duels',
  }
};
