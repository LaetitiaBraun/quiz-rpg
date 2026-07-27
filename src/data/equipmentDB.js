export const EQUIPMENT_DB = {
  weapons: [
    {
      id: 'sword_wood',
      name: 'Épée de Bois',
      type: 'weapon',
      rarity: 'common',
      levelRequired: 1,
      stats: { strength: 2, intelligence: 0, wisdom: 0 },
      description: 'Une simple épée de bois. Le début de tout héros.',
      emoji: '🪵'
    },
    {
      id: 'sword_iron',
      name: 'Épée de Fer',
      type: 'weapon',
      rarity: 'uncommon',
      levelRequired: 5,
      stats: { strength: 5, intelligence: 0, wisdom: 0 },
      description: 'Une solide épée de fer. Pour les guerriers sérieux.',
      emoji: '⚔️'
    },
    {
      id: 'sword_silver',
      name: 'Épée Argentée',
      type: 'weapon',
      rarity: 'rare',
      levelRequired: 10,
      stats: { strength: 8, intelligence: 2, wisdom: 0 },
      description: 'Une épée légendaire en argent pur. Brille sous la lumière.',
      emoji: '✨'
    },
    {
      id: 'sword_celestial',
      name: 'Épée Céleste',
      type: 'weapon',
      rarity: 'epic',
      levelRequired: 20,
      stats: { strength: 12, intelligence: 5, wisdom: 3 },
      description: 'Forgée par les dieux eux-mêmes. Puissance inégalée.',
      emoji: '⚡'
    },
    {
      id: 'staff_mage',
      name: 'Bâton du Mage',
      type: 'weapon',
      rarity: 'uncommon',
      levelRequired: 3,
      stats: { strength: 0, intelligence: 6, wisdom: 2 },
      description: 'Un bâton amplifiant la magie. Parfait pour les lanceurs.',
      emoji: '🔮'
    },
    {
      id: 'staff_elder',
      name: 'Bâton de l\'Ancien',
      type: 'weapon',
      rarity: 'rare',
      levelRequired: 15,
      stats: { strength: 2, intelligence: 10, wisdom: 8 },
      description: 'Un bâton ancien chargé de sagesse. Immense puissance magique.',
      emoji: '🌙'
    }
  ],

  armor: [
    {
      id: 'armor_leather',
      name: 'Armure de Cuir',
      type: 'armor',
      rarity: 'common',
      levelRequired: 1,
      stats: { strength: 1, intelligence: 0, wisdom: 1 },
      description: 'Une légère armure de cuir. Confortable et fonctionnelle.',
      emoji: '🧥'
    },
    {
      id: 'armor_bronze',
      name: 'Armure de Bronze',
      type: 'armor',
      rarity: 'uncommon',
      levelRequired: 5,
      stats: { strength: 3, intelligence: 0, wisdom: 2 },
      description: 'Une armure en bronze. Protection décente.',
      emoji: '🛡️'
    },
    {
      id: 'armor_steel',
      name: 'Armure d\'Acier',
      type: 'armor',
      rarity: 'rare',
      levelRequired: 12,
      stats: { strength: 5, intelligence: 1, wisdom: 3 },
      description: 'Une plaque d\'acier solide. Très protectrice.',
      emoji: '⚙️'
    },
    {
      id: 'armor_dragon',
      name: 'Armure de Dragon',
      type: 'armor',
      rarity: 'epic',
      levelRequired: 25,
      stats: { strength: 8, intelligence: 3, wisdom: 5 },
      description: 'Faite de écailles de dragon. Protection légendaire.',
      emoji: '🐉'
    }
  ],

  accessories: [
    {
      id: 'ring_wisdom',
      name: 'Anneau de Sagesse',
      type: 'accessory',
      rarity: 'uncommon',
      levelRequired: 2,
      stats: { strength: 0, intelligence: 0, wisdom: 4 },
      description: 'Un anneau scintillant. Augmente la sagesse.',
      emoji: '💍'
    },
    {
      id: 'ring_power',
      name: 'Anneau de Puissance',
      type: 'accessory',
      rarity: 'rare',
      levelRequired: 10,
      stats: { strength: 4, intelligence: 0, wisdom: 0 },
      description: 'Un anneau rouge vibrant. Accroît la force.',
      emoji: '💎'
    },
    {
      id: 'amulet_magic',
      name: 'Amulette Magique',
      type: 'accessory',
      rarity: 'rare',
      levelRequired: 8,
      stats: { strength: 0, intelligence: 5, wisdom: 2 },
      description: 'Une amulette brillant d\'une lueur mystique.',
      emoji: '✨'
    },
    {
      id: 'crown_legend',
      name: 'Couronne Légendaire',
      type: 'accessory',
      rarity: 'epic',
      levelRequired: 30,
      stats: { strength: 3, intelligence: 5, wisdom: 7 },
      description: 'La couronne des rois. Puissance absolue.',
      emoji: '👑'
    }
  ]
};

export function getEquipmentById(id) {
  const allEquipment = [
    ...EQUIPMENT_DB.weapons,
    ...EQUIPMENT_DB.armor,
    ...EQUIPMENT_DB.accessories
  ];
  return allEquipment.find(eq => eq.id === id);
}

export function getAvailableEquipment(playerLevel) {
  const allEquipment = [
    ...EQUIPMENT_DB.weapons,
    ...EQUIPMENT_DB.armor,
    ...EQUIPMENT_DB.accessories
  ];
  return allEquipment.filter(eq => eq.levelRequired <= playerLevel);
}

export function getRarityColor(rarity) {
  const colors = {
    common: '#7f9d8c',
    uncommon: '#1d9e75',
    rare: '#7f77dd',
    epic: '#c9a961'
  };
  return colors[rarity] || '#e0d7f7';
}
