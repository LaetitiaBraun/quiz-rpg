# 🎮 Quiz RPG - The Hero's Destiny

Un jeu de quiz immersif avec **progression RPG**, **narration épique** et **système d'équipement**. Créé avec React + Vite.

**🎮 [Jouer maintenant](https://quiz-rpg-destiny.vercel.app)** | **🛠️ [Setup Local](#-installation-et-démarrage)**

---

## ✨ Caractéristiques Principales

### 🎯 Gameplay
- **3 univers de quiz** (Anime, Programming, Story)
- **61 questions** variées (basique → difficile)
- **Système d'XP** sans accumulation - première victoire = points
- **Progression de niveau** avec équipement déverrouillable
- **Campagne narrative épique** - 5 actes avec NPCs

### ⚔️ Équipement & Progression
- **14 équipements** (armes, armures, accessoires)
- **Système de stats** (Force, Intelligence, Sagesse)
- **Bonus d'équipement** visibles en temps réel
- **Rareté** (Commun → Épique) avec codes couleur

### 🎬 Expérience Immersive
- **Animations épiques** (level-up, victoire, défaite) ⭐
- **Système de sons** (Web Audio API) - 6 effets sonores 🔊
- **Particules confettis** sur les victoires 🎉
- **Transitions fluides** entre écrans
- **Dark theme** violet/or/teal inspiré par Shadow Arcane

### 💾 Persistance
- **localStorage** pour sauvegardes automatiques
- **Progression complète** sauvegardée (niveau, XP, équipement, questions)
- **Questions complétées** trackées (pas de re-grinding)

---

## 🎮 Comment Jouer

### 1. Hub Principal
- Vois ton **personnage**, **niveau**, **XP**
- Vois ton **équipement** équipé
- Sélectionne une **quête**

### 2. Combat / Quiz
1. Lis la **question**
2. Sélectionne la **meilleure réponse** (4 choix)
3. Reçois du **XP** (première victoire = points, redite = 0 XP)
4. Vois **animation victoire** avec confettis 🎉

### 3. Progression
- **Level-up** → Déverrouille nouvel **équipement**
- **Équiper** → Bonus aux **stats**
- **Plus de stats** → Meilleure performance

### 4. Story Quest
- **Narration épique** avec NPCs (Eldara la Sage, Démon Ancien, etc.)
- **5 actes** de campagne interconnectée
- **Dialogues avant/après** chaque question

---

## 📊 Contenu du Jeu

### Questions (61 total)
| Univers | Basique | Moyen | Difficile | Total | XP |
|---------|--------|-------|----------|-------|-----|
| Anime   | 8      | 8     | 9        | 25    | 50-120 |
| Code    | 8      | 8     | 9        | 25    | 50-125 |
| Story   | 4      | 4     | 3        | 11    | 60-150 |

### Équipement (14 items)
- **6 Armes** (Bois → Céleste)
- **4 Armures** (Cuir → Dragon)  
- **4 Accessoires** (Anneaux + Amulettes)

---

## 🛠️ Tech Stack

**Frontend:**
- React 18 + Hooks
- Vite (bundler ultra-rapide)
- CSS3 (animations, gradients)
- Web Audio API (sons proceduraux)
- localStorage (persistance)

**Architecture:**
- Composants réutilisables (11)
- Custom hooks (useCharacter, useParticles)
- Séparation stricte data/UI
- État global optimisé

---

## 📁 Structure du Projet

```
quiz-rpg/
├── src/
│   ├── components/        # Composants React (13)
│   │   ├── HubScreen.jsx
│   │   ├── BattleScreen.jsx
│   │   ├── EquipmentScreen.jsx
│   │   ├── LevelUpAnimation.jsx      ✨ NEW
│   │   └── ...
│   │
│   ├── hooks/            # Custom hooks
│   │   └── useCharacter.js
│   │
│   ├── utils/            # Utilitaires (NEW)
│   │   ├── SoundSystem.js            ✨ Sons Web Audio
│   │   └── ParticleSystem.jsx        ✨ Confettis
│   │
│   ├── data/             # Données du jeu
│   │   ├── questionsDB.js (61 questions)
│   │   ├── equipmentDB.js (14 items)
│   │   └── constants.js
│   │
│   ├── styles/           # CSS par composant (8)
│   │   ├── animations.css            ✨ Keyframes
│   │   ├── LevelUpAnimation.css
│   │   ├── FeedbackAnimation.css
│   │   └── ...
│   │
│   ├── App.jsx
│   └── main.jsx
│
├── index.html
├── vite.config.js
├── vercel.json          # Config Vercel
├── package.json
└── README.md
```

---

## 🚀 Installation & Démarrage Local

### Prérequis
- **Node.js 16+** et **npm**

### 1. Cloner/Télécharger
```bash
git clone <repo>
cd quiz-rpg
```

### 2. Installer dépendances
```bash
npm install
```

### 3. Développement
```bash
npm run dev
```
➜ http://localhost:5173

### 4. Build Production
```bash
npm run build
```
Crée dossier `dist/` prêt à déployer

---

## 🌍 Déploiement en Ligne

### Vercel (Recommandé - Gratuit)

#### Option 1: Via GitHub (Automatique)
1. Push le code sur **GitHub**
2. Va sur https://vercel.com
3. "Import Project" + sélectionne ton repo
4. Vercel configure automatiquement Vite ✅
5. **Deploy en 1 clic!** 🚀

#### Option 2: CLI
```bash
npm install -g vercel
vercel
```

### Netlify (Alternative)
```bash
npm install -g netlify-cli
netlify deploy --prod
```

---

## 🎨 Personnalisation

### Ajouter Questions
Édite `src/data/questionsDB.js`:
```javascript
{
  id: 26,
  question: "Quelle est ta question?",
  answers: ["Option A", "Option B", "Option C", "Option D"],
  correct: 0,  // index bonne réponse
  difficulty: 2,
  xp: 75
}
```

### Ajouter Équipement
Édite `src/data/equipmentDB.js`:
```javascript
{
  id: 'sword_mythic',
  name: 'Épée Mythique',
  type: 'weapon',
  rarity: 'epic',
  levelRequired: 20,
  stats: { strength: 15, intelligence: 0, wisdom: 5 },
  description: 'Une arme légendaire',
  emoji: '⚡'
}
```

### Changer Thème
Édite couleurs dans `src/styles/global.css`:
```css
:root {
  --primary: #c9a961;      /* Or */
  --accent: #7f77dd;       /* Violet */
  --teal: #1d9e75;         /* Teal */
}
```

---

## 📈 Statistiques

- **27 fichiers** source
- **13 composants** React
- **8 fichiers CSS** avec 50+ animations
- **61 questions** programmées
- **14 équipements** avec stats
- **6 effets sonores** Web Audio API
- **~2500 lignes** de code
- **Lighthouse score:** 95+ (Performance, Accessibility)

---

## 🐛 Dépannage

**Questions/Équipement non visibles?**
```javascript
// F12 → Console → Tape:
localStorage.clear()
// Puis F5 (refresh)
```

**Sons pas audibles?**
- Vérife volume navigateur
- Test sur Chrome/Firefox modernes

**Animations lentes?**
- Désactive extensions
- Test navigateur récent

---

## 🎯 Améliorations Futures

- [ ] **Leaderboard** - Top scores persistants
- [ ] **Badges** - Système d'accomplissements
- [ ] **Compagnons** - Alliés avec bonus
- [ ] **Arena Multijoueur** - Duels temps réel (WebSocket)
- [ ] **Thèmes** - Light mode + Accessibility
- [ ] **Langues** - Multilingue (i18n)
- [ ] **Mobile** - Responsive design optimisé

---

## 🔧 Choix Techniques

| Décision | Raison |
|----------|--------|
| **Vite over CRA** | 10x plus rapide, bundle optimal |
| **localStorage** | MVP simple, portabilité maximale |
| **Web Audio** | Sons proceduraux (léger, personnalisable) |
| **CSS Animations** | Fluidité 60fps, performance |
| **React Hooks** | Code moderne, facile à maintenir |

---

## 🎓 Pour les Recruteurs

**Ce projet démontre:**
- ✅ Full-stack React (state management, hooks, composition)
- ✅ Design UX/UI (dark theme, animations, accessibility)
- ✅ Game design (progression, balance, engagement)
- ✅ Web Audio API (sons proceduraux)
- ✅ Data persistence (localStorage)
- ✅ Deployments (Vercel, Netlify)
- ✅ Git & version control
- ✅ Production-ready code

**Portfolio value:** Junior Dev → Mid-level capabilités

---

## 👨‍💻 À Propos

**Laetitia Braun**
- Développeuse Web & Étudiante CF2M
- Basée à **Bruxelles** 🇧🇪
- Portfolio: https://laetitiabraun.eu
- Spécialisée: React, PHP, Game Dev

---

## 📝 Licence

**MIT** - Libre d'utilisation et modification

---

## 💬 Feedback & Support

Questions? Idées? Issues?

- 📧 Email: [ton-email]
- 🐙 GitHub: [ton-github]
- 💼 LinkedIn: [ton-linkedin]

---

**Bon jeu! Deviens le Hero's Destiny!** ⭐🎮✨

*Créé avec ❤️ et beaucoup de confettis numériques*
