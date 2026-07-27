# 🚀 Guide de Déploiement - Quiz RPG

Déploie ton jeu en ligne **GRATUITEMENT** en 5 minutes! 🎮

---

## Option 1: Vercel (RECOMMANDÉ - Le plus facile!)

### Étape 1: Préparer le code
```bash
cd quiz-rpg
npm install
npm run build
```
✅ Cela crée un dossier `dist/` avec ton jeu prêt

### Étape 2: Créer compte GitHub (si tu n'en as pas)
1. Va sur https://github.com
2. "Sign up"
3. Remplis les infos basiques

### Étape 3: Push ton code sur GitHub
```bash
git init
git add .
git commit -m "Initial commit - Quiz RPG"
git branch -M main
git remote add origin https://github.com/TON-USERNAME/quiz-rpg.git
git push -u origin main
```

**Note:** Remplace `TON-USERNAME` par ton username GitHub réel

### Étape 4: Déployer sur Vercel
1. Va sur https://vercel.com
2. Clique **"Sign Up"** → Sélectionne **"Continue with GitHub"**
3. Autorise Vercel à accéder à GitHub
4. Sur le dashboard Vercel, clique **"Import Project"**
5. Sélectionne ton repo `quiz-rpg`
6. Vercel détecte automatiquement **Vite** ✅
7. Clique **"Deploy"**

**⏳ Attends 1-2 minutes...**

### ✅ C'est fait!
Tu recevras une URL Vercel unique:
```
https://quiz-rpg-XXXXXX.vercel.app
```

**Partage ce lien partout!** 🎉

---

## Option 2: Netlify (Alternative)

### Étape 1-3: Même que Vercel (GitHub)

### Étape 4: Déployer sur Netlify
1. Va sur https://netlify.com
2. Clique **"Sign up"** → **"Continue with GitHub"**
3. Autorise Netlify
4. Clique **"Add new site"** → **"Import an existing project"**
5. Sélectionne ton repo GitHub
6. Build settings auto-détectés
7. Clique **"Deploy site"**

**⏳ Attends ~2 minutes...**

### ✅ Tu as un lien Netlify:
```
https://quiz-rpg-XXXXX.netlify.app
```

---

## Option 3: Déploiement Direct Vercel (CLI)

Si tu veux faire super rapide:

### Étape 1: Installer Vercel CLI
```bash
npm install -g vercel
```

### Étape 2: Déployer
```bash
cd quiz-rpg
vercel --prod
```

**⏳ Quelques secondes...**

### ✅ Ton lien en console:
```
https://quiz-rpg.vercel.app
```

---

## 📋 Checklist Avant Déploiement

- [ ] Code testé en local (`npm run dev` fonctionne)
- [ ] Pas de console errors (`F12` → aucun ❌ rouge)
- [ ] localStorage vidé lors du test final
- [ ] Tous les fichiers commitées sur Git
- [ ] `.gitignore` exclut `node_modules/` et `dist/`

---

## 🔧 Après Déploiement

### Mettre à jour le site en direct
Les changements se déploient **automatiquement** quand tu pushs sur GitHub! 🚀

```bash
git add .
git commit -m "Fix: level-up animation"
git push
```
→ Vercel re-déploie automatiquement

### Domaine personnalisé (Optionnel)
Tu peux ajouter ton domaine perso (ou sous-domaine):

**Vercel:**
1. Settings → Domains
2. Ajoute `https://quiz-rpg.laetitiabraun.eu`
3. Suis les instructions DNS

---

## 🐛 Dépannage

### "Build failed"
Vérife la console Vercel pour erreurs:
1. Dashboard Vercel
2. Sélectionne ton projet
3. Clique "Deployments"
4. Cherche le ❌ déploiement échoué
5. Clique pour voir les erreurs

### "Site blanc / 404"
- Vérife que `dist/index.html` existe
- Vérife que `vite.config.js` est correct
- Re-build en local: `npm run build`

### "localStorage ne persiste pas"
- C'est normal! localStorage est par **domaine**
- Les données se sauvent une fois en ligne ✅

---

## 📊 Monitoring & Analytics

### Vercel Analytics (Gratuit)
1. Dashboard Vercel
2. Settings → Analytics
3. "Enable Web Analytics"
4. Vois les metrics: visitors, latency, etc.

---

## 🎯 Prochaines Étapes

Une fois en ligne:

1. **Teste depuis le lien live** - Assure-toi que tout fonctionne
2. **Partage le lien** - Friends, Discord, Slack, etc.
3. **Ajoute à ton portfolio** - Section "Projets" avec lien + description
4. **Mets à jour CV** - "Quiz RPG: https://quiz-rpg.vercel.app"
5. **LinkedIn post** - Montre le projet avec screenshot

---

## 💡 Tips pour Montrer aux Recruteurs

**Post sur LinkedIn:**
```
🎮 J'ai créé un jeu de quiz RPG en React!

🎯 Features:
• 61 questions (Anime, Code, Story)
• Système d'équipement avec progression
• Animations + sons Web Audio
• Narration épique 5 actes
• Persistance localStorage

🔗 Jouer: [lien vercel]
💻 Code: [lien github]

Stack: React 18, Vite, CSS3, Web Audio API
```

**Email aux Recruteurs:**
```
"Voici un projet personnel que j'ai construit:
Quiz RPG (React + Vite) - [lien live]

Démontre: state management, animations, game design, deployment"
```

---

## ✨ Félicitations!

Tu viens de:
- ✅ Créer un jeu complet
- ✅ Deployer en production
- ✅ Avoir une URL shareable
- ✅ Avoir un portfolio impressive!

**Bienvenue en tant que Developer! 🚀**

---

**Questions?** Vérife les logs Vercel ou GitHub Actions pour détails techniques.

*Happy Deploying!* 🎉
