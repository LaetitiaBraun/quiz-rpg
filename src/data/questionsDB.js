// QUESTIONS_DB organisé par univers ET niveau de difficulté
// Chaque niveau a ses propres questions indépendantes
// Facile: accessible à tous, Moyen: connaissances solides, Difficile: expert

export const QUESTIONS_DB = {

  // ============================================================
  // ANIME - FACILE (questions bien connues du grand public)
  // ============================================================
  anime_easy: [
    { id: 1, question: "Quel est le nom complet du protagoniste de Naruto?", answers: ["Naruto Uchiha", "Naruto Uzumaki", "Naruto Senju", "Naruto Hatake"], correct: 1, xp: 50 },
    { id: 2, question: "Combien de Pokémon y a-t-il dans la Gen 1?", answers: ["100", "150", "151", "200"], correct: 2, xp: 50 },
    { id: 3, question: "Quel est le manga le plus vendu de tous les temps?", answers: ["Naruto", "One Piece", "Dragon Ball", "Bleach"], correct: 1, xp: 50 },
    { id: 4, question: "Dans My Hero Academia, quel est le surnom d'All Might?", answers: ["The Symbol of Peace", "The Hero King", "The Mighty One", "The All Father"], correct: 0, xp: 50 },
    { id: 5, question: "Quel studio a produit Demon Slayer?", answers: ["Studio Ghibli", "ufotable", "Kyoto Animation", "Bones"], correct: 1, xp: 50 },
    { id: 6, question: "Quel anime suit un pirate à la recherche d'un trésor légendaire?", answers: ["Bleach", "One Piece", "Fairy Tail", "Hunter x Hunter"], correct: 1, xp: 50 },
    { id: 7, question: "Comment s'appelle le héros de Dragon Ball?", answers: ["Vegeta", "Gohan", "Goku", "Piccolo"], correct: 2, xp: 50 },
    { id: 8, question: "Dans Naruto, quel est le nom du village où il grandit?", answers: ["Village du Sable", "Village de la Feuille", "Village du Brouillard", "Village de la Pierre"], correct: 1, xp: 50 },
    { id: 9, question: "Quel personnage porte un chapeau de paille dans One Piece?", answers: ["Zoro", "Sanji", "Luffy", "Ace"], correct: 2, xp: 50 },
    { id: 10, question: "Dans Attack on Titan, contre quoi combattent les humains?", answers: ["Des dragons", "Des titans", "Des robots", "Des zombies"], correct: 1, xp: 50 },
    { id: 11, question: "Quel est le pouvoir de Goku dans Dragon Ball Z?", answers: ["La magie", "Le Kaméhaméha", "La télékinésie", "La foudre"], correct: 1, xp: 50 },
    { id: 12, question: "Dans Pokémon, quel est l'Pokémon préféré d'Ash?", answers: ["Ronflex", "Bulbizarre", "Pikachu", "Salamèche"], correct: 2, xp: 50 },
    { id: 13, question: "Comment s'appelle le demon slayer principal de Demon Slayer?", answers: ["Zenitsu", "Inosuke", "Tanjiro", "Genya"], correct: 2, xp: 50 },
    { id: 14, question: "Dans Fairy Tail, quel est le nom de la guilde principale?", answers: ["Blue Pegasus", "Fairy Tail", "Lamia Scale", "Sabertooth"], correct: 1, xp: 50 },
    { id: 15, question: "Quel anime se passe dans un monde de ninjas?", answers: ["Bleach", "One Piece", "Naruto", "Dragon Ball"], correct: 2, xp: 50 },
    { id: 16, question: "Dans My Hero Academia, comment s'appelle le pouvoir d'un héros?", answers: ["Quirk", "Jutsu", "Nen", "Chakra"], correct: 0, xp: 50 },
    { id: 17, question: "Quel personnage de Death Note possède un Death Note?", answers: ["L", "Light Yagami", "Misa Amane", "Ryuk"], correct: 1, xp: 50 },
    { id: 18, question: "Studio Ghibli est associé à quel réalisateur célèbre?", answers: ["Akira Toriyama", "Hayao Miyazaki", "Eiichiro Oda", "Masashi Kishimoto"], correct: 1, xp: 50 },
    { id: 19, question: "Dans One Piece, comment s'appelle l'équipage de Luffy?", answers: ["Les Pirates du Chapeau de Paille", "Les Pirates de la Mer Rouge", "Les Pirates du Nouveau Monde", "Les Pirates Noirs"], correct: 0, xp: 50 },
    { id: 20, question: "Quel est l'anime de sport le plus populaire des années 2010?", answers: ["Haikyuu!!", "Free!", "Kuroko's Basketball", "Hajime no Ippo"], correct: 2, xp: 50 },
    { id: 21, question: "Dans Bleach, que chasse Ichigo?", answers: ["Des monstres", "Des Hollow", "Des ninjas", "Des titans"], correct: 1, xp: 50 },
    { id: 22, question: "Comment s'appelle le démon lié à Tanjiro dans Demon Slayer?", answers: ["Muzan", "Nezuko", "Akaza", "Daki"], correct: 1, xp: 50 },
    { id: 23, question: "Dans SAO, où les joueurs sont-ils piégés?", answers: ["Dans une simulation", "Dans le jeu Sword Art Online", "Sur une île", "Dans l'espace"], correct: 1, xp: 50 },
    { id: 24, question: "Quel animal est Totoro dans Mon Voisin Totoro?", answers: ["Un chat", "Un ours", "Un esprit des forêts", "Un lapin"], correct: 2, xp: 50 },
    { id: 25, question: "Dans Hunter x Hunter, comment s'appelle le pouvoir des Hunters?", answers: ["Jutsu", "Nen", "Quirk", "Chakra"], correct: 1, xp: 50 },
  ],

  // ============================================================
  // ANIME - MOYEN (fans sérieux, connaissances approfondies)
  // ============================================================
  anime_medium: [
    { id: 1, question: "Dans Attack on Titan, quel est le vrai nom du Titane Colossal?", answers: ["Bertholdt Hoover", "Reiner Braun", "Zeke Yeager", "Eren Yeager"], correct: 0, xp: 80 },
    { id: 2, question: "Quel est le nom du fruit du démon de Luffy?", answers: ["Gomu Gomu no Mi", "Mera Mera no Mi", "Hie Hie no Mi", "Gura Gura no Mi"], correct: 0, xp: 80 },
    { id: 3, question: "Dans Fullmetal Alchemist, quelle loi fondamentale de l'alchimie existe?", answers: ["Loi de cause à effet", "Equivalent Exchange", "Law of Transmutation", "Rule of Balance"], correct: 1, xp: 80 },
    { id: 4, question: "Qui est le créateur de Death Note?", answers: ["Tsugumi Oba & Takeshi Obata", "Yoshihiro Togashi", "Kohei Horikoshi", "Gege Akutami"], correct: 0, xp: 80 },
    { id: 5, question: "Dans Naruto, quel est le jutsu signature de Kakashi?", answers: ["Rasengan", "Chidori", "Amaterasu", "Tsukuyomi"], correct: 1, xp: 80 },
    { id: 6, question: "Dans Dragon Ball Z, à quelle forme de Super Saiyan Vegeta atteint-il en premier?", answers: ["Super Saiyan 2", "Super Saiyan 3", "Super Saiyan Blue", "Super Saiyan 1"], correct: 3, xp: 80 },
    { id: 7, question: "Quel est le titre complet du manga de Demon Slayer en japonais?", answers: ["Kimetsu no Yaiba", "Oni Taijiya", "Yaiba no Kimetsu", "Oni no Ken"], correct: 0, xp: 80 },
    { id: 8, question: "Dans Bleach, quel est le nom du sabre spirituel d'Ichigo?", answers: ["Zabimaru", "Zangetsu", "Senbonzakura", "Hyorinmaru"], correct: 1, xp: 80 },
    { id: 9, question: "Dans HxH, à quel type de Nen Killua appartient?", answers: ["Enhancer", "Transmuter", "Emitter", "Manipulator"], correct: 1, xp: 80 },
    { id: 10, question: "Quel personnage dans My Hero Academia a le Quirk 'One For All'?", answers: ["Bakugo", "Todoroki", "Izuku Midoriya", "Iida"], correct: 2, xp: 80 },
    { id: 11, question: "Dans Jujutsu Kaisen, quel est le surnom de Yuji Itadori?", answers: ["Le Prince des Malédictions", "Pink Boy", "La Bête Maudite", "Sukuna Junior"], correct: 1, xp: 80 },
    { id: 12, question: "Dans FMA Brotherhood, qui sont les Homunculi?", answers: ["Les gardiens du roi", "Les péchés capitaux incarnés", "Les alchimistes du roi", "Les fantômes de l'autre côté"], correct: 1, xp: 80 },
    { id: 13, question: "Quel est le vrai nom de L dans Death Note?", answers: ["Lawliet", "Beyond", "Mello", "Near"], correct: 0, xp: 80 },
    { id: 14, question: "Dans One Piece, quel est le nom du monde sous-marin peuplé d'hommes-poissons?", answers: ["Fishman Island", "Water 7", "Enies Lobby", "Sabaody Archipelago"], correct: 0, xp: 80 },
    { id: 15, question: "Dans Naruto, quel est le clan d'Itachi?", answers: ["Clan Hyuga", "Clan Uzumaki", "Clan Uchiha", "Clan Senju"], correct: 2, xp: 80 },
    { id: 16, question: "Dans Attack on Titan, que signifie 'Eren Yeager' en turc?", answers: ["Saint homme", "Guerrier valeureux", "Wanderer/celui qui erre", "Titan sacré"], correct: 2, xp: 80 },
    { id: 17, question: "Quel studio a produit la majorité des animes de Makoto Shinkai?", answers: ["CoMix Wave Films", "Kyoto Animation", "MAPPA", "ufotable"], correct: 0, xp: 80 },
    { id: 18, question: "Dans Haikyuu, quel poste joue Hinata?", answers: ["Setter", "Libero", "Spiker/Middle Blocker", "Wing Spiker"], correct: 2, xp: 80 },
    { id: 19, question: "Dans Re:Zero, comment s'appelle la witch qui a le pouvoir de Subaru?", answers: ["Echidna", "Satella", "Carmilla", "Minerva"], correct: 1, xp: 80 },
    { id: 20, question: "Quel anime de 2021 a battu des records de popularité mondiaux sur Crunchyroll?", answers: ["Tokyo Revengers", "Demon Slayer S2", "Jujutsu Kaisen", "Attack on Titan Final"], correct: 2, xp: 80 },
    { id: 21, question: "Dans Vinland Saga, qui est le père adoptif de Thorfinn?", answers: ["Askeladd", "Thors", "Canute", "Floki"], correct: 0, xp: 80 },
    { id: 22, question: "Dans Steins;Gate, quel est le nom de l'organisation antagoniste?", answers: ["SERN", "CERN", "DARPA", "Amadeus"], correct: 0, xp: 80 },
    { id: 23, question: "Dans Code Geass, quel est le pouvoir de Lelouch?", answers: ["Sharingan", "Geass", "Quirk", "Death Note"], correct: 1, xp: 80 },
    { id: 24, question: "Quel mangaka a créé One Piece?", answers: ["Masashi Kishimoto", "Akira Toriyama", "Eiichiro Oda", "Tite Kubo"], correct: 2, xp: 80 },
    { id: 25, question: "Dans Berserk, quel est le nom de l'épée démesurée de Guts?", answers: ["Dragon Slayer", "Gram", "Excalibur", "Dragonbone"], correct: 0, xp: 80 },
  ],

  // ============================================================
  // ANIME - DIFFICILE (questions ultra pointues, vrais otaku seulement)
  // ============================================================
  anime_hard: [
    { id: 1, question: "Dans One Piece, quel est le vrai nom du Dr Vegapunk?", answers: ["Vegapunk Alpha", "Shaka", "Son vrai nom n'a pas été révélé", "Jewel"], correct: 2, xp: 120 },
    { id: 2, question: "Dans Naruto, combien y a-t-il de chakra nature transformations au total?", answers: ["5", "6", "7", "8"], correct: 0, xp: 120 },
    { id: 3, question: "Dans FMA, quelle est la date de naissance d'Edward Elric?", answers: ["1 février", "3 mars", "11 janvier", "Elle n'est pas précisée dans le manga"], correct: 3, xp: 120 },
    { id: 4, question: "Dans Berserk, quel numéro d'Apôtre est Zodd?", answers: ["Il ne porte pas de numéro", "13", "6", "Premier"], correct: 0, xp: 120 },
    { id: 5, question: "Dans HxH, combien de règles différentes peut-on imposer avec le Nen type Manipulator?", answers: ["5 maximum", "Illimité mais limité par la profondeur du Ren", "1 seule règle principale", "10 règles fixes"], correct: 1, xp: 120 },
    { id: 6, question: "Dans Steins;Gate, quel est le numéro de divergence du monde béta?", answers: ["1.048596%", "0.571024%", "0.337187%", "1.000000%"], correct: 1, xp: 120 },
    { id: 7, question: "Dans JJK, quelle est la technique innée de Gojo Satoru?", answers: ["Infinity et Purple", "Limitless (Mugen)", "Six Eyes seul", "Hollow Purple uniquement"], correct: 1, xp: 120 },
    { id: 8, question: "Dans Attack on Titan, en quelle année (dans la chronologie) Eren déclenche-t-il le Grondement?", answers: ["854", "857", "850", "860"], correct: 1, xp: 120 },
    { id: 9, question: "Dans Evangelion, qu'est-ce que le SEELE veut accomplir avec la Third Impact?", answers: ["Éliminer les Anges", "Complémentarité de l'humanité", "Ressusciter Yui Ikari", "Détruire NERV"], correct: 1, xp: 120 },
    { id: 10, question: "Dans One Piece, le Fruit Gomu Gomu no Mi appartient à quelle vraie catégorie?", answers: ["Paramecia", "Logia", "Zoan mythique", "Zoan ancien"], correct: 2, xp: 120 },
    { id: 11, question: "Dans Death Note, combien de règles le Death Note contient-il officiellement?", answers: ["6", "9", "12", "Aucun nombre précis"], correct: 2, xp: 120 },
    { id: 12, question: "Dans Bleach, quel est le vrai nom de Zangetsu (Hollow)?", answers: ["White Ichigo", "Shiro", "Son nom n'est pas révélé", "Yhwach"], correct: 3, xp: 120 },
    { id: 13, question: "Dans Vinland Saga saison 2, dans quelle ferme Thorfinn est-il esclave?", answers: ["La ferme de Ketil", "La ferme d'Olmar", "La ferme de Snake", "La ferme de Floki"], correct: 0, xp: 120 },
    { id: 14, question: "Dans Mushishi, que sont les Mushi?", answers: ["Des esprits élémentaires", "La forme de vie la plus primitive, entre vie et mort", "Des parasites magiques", "Des dieux mineurs"], correct: 1, xp: 120 },
    { id: 15, question: "Dans Paranoia Agent de Satoshi Kon, qui est en réalité Maromi?", answers: ["Un personnage fictif créé par Tsukiko", "Un vrai chien décédé", "Un esprit vengeur", "Un personnage de manga"], correct: 1, xp: 120 },
    { id: 16, question: "Dans Legend of the Galactic Heroes, quel est le vrai nom de Reinhard von Lohengramm?", answers: ["Reinhard von Müsel", "Reinhard von Kaiser", "Reinhard von Goldenbaum", "Reinhard von Stein"], correct: 0, xp: 120 },
    { id: 17, question: "Dans Texhnolyze, que signifie le mot 'Texhnolyze'?", answers: ["L'union de la chair et du métal", "Technologie + Lyse (décomposition)", "Le nom de la ville souterraine", "Un procédé de greffe de membres artificiels"], correct: 3, xp: 120 },
    { id: 18, question: "Dans HxH, quelle est la condition que Kurapika s'impose pour utiliser son Nen en chaîne contre les Ryodan?", answers: ["Ne jamais tuer innocents", "Mourir si utilisé sur un non-Ryodan", "Ne plus jamais parler", "Perdre sa capacité de Nen"], correct: 1, xp: 120 },
    { id: 19, question: "Dans Evangelion 3.0+1.0, quelle est la fin de Shinji?", answers: ["Il meurt dans la Third Impact", "Il recrée un monde sans AT Fields", "Il reste dans Instrumentality", "Il se sacrifie pour sauver Mari"], correct: 1, xp: 120 },
    { id: 20, question: "Dans Dororo (2019), combien de parties du corps Hyakkimaru doit-il récupérer?", answers: ["12", "48", "100", "24"], correct: 1, xp: 120 },
    { id: 21, question: "Dans Made in Abyss, que représente la 6ème couche de l'Abysse?", answers: ["L'enfer des malédictions définitives", "Le Retour Impossible/Sea of Corpses", "Le lieu de naissance des Narehate", "L'origine des reliques"], correct: 1, xp: 120 },
    { id: 22, question: "Dans Cowboy Bebop, quelle est la session (épisode) qui n'est PAS dans l'ordre chronologique?", answers: ["Session 5", "Session 6", "Session 18", "Tous sont dans l'ordre"], correct: 3, xp: 120 },
    { id: 23, question: "Dans Akira, dans quelle ville et quelle année se déroule l'histoire?", answers: ["Tokyo, 2019", "Neo-Tokyo, 2019", "Tokyo, 2029", "Neo-Tokyo, 2030"], correct: 1, xp: 120 },
    { id: 24, question: "Dans Neon Genesis Evangelion, que représente AT Field?", answers: ["Un bouclier d'énergie artificiel", "La barrière psychologique entre les individus (l'âme)", "Anti-Target Field", "Une technologie NERV"], correct: 1, xp: 120 },
    { id: 25, question: "Dans JoJo's Bizarre Adventure, quel est le nom du Stand de Giorno Giovanna et sa capacité ultime?", answers: ["Gold Experience / Requiem - annule tout acte et volonté", "King Crimson - efface le temps", "The World - stoppe le temps", "Star Platinum - ultra précision"], correct: 0, xp: 120 },
  ],

  // ============================================================
  // CODE - FACILE (bases du développement web)
  // ============================================================
  programming_easy: [
    { id: 1, question: "En PHP, quel est l'opérateur de concaténation?", answers: ["+", "&", ".", "~"], correct: 2, xp: 50 },
    { id: 2, question: "Quelle est la balise HTML pour un lien?", answers: ["<link>", "<a>", "<href>", "<url>"], correct: 1, xp: 50 },
    { id: 3, question: "En JavaScript, comment déclares-tu une constante?", answers: ["var", "let", "const", "def"], correct: 2, xp: 50 },
    { id: 4, question: "En CSS, comment sélectionnes-tu une classe?", answers: ["#nom", ".nom", "nom", ":nom"], correct: 1, xp: 50 },
    { id: 5, question: "Qu'est-ce qu'une API?", answers: ["Application Personal Interface", "Application Programming Interface", "Automated Process Interface", "Access Point Index"], correct: 1, xp: 50 },
    { id: 6, question: "Quel est le résultat de 2 + '2' en JavaScript?", answers: ["4", "'22'", "NaN", "undefined"], correct: 1, xp: 50 },
    { id: 7, question: "En HTML, quelle balise crée un titre principal?", answers: ["<title>", "<head>", "<h1>", "<p>"], correct: 2, xp: 50 },
    { id: 8, question: "En CSS, quelle propriété change la couleur du texte?", answers: ["background-color", "text-color", "color", "font-color"], correct: 2, xp: 50 },
    { id: 9, question: "En JavaScript, comment affiche-t-on quelque chose dans la console?", answers: ["print()", "echo()", "console.log()", "display()"], correct: 2, xp: 50 },
    { id: 10, question: "En PHP, comment commence-t-on un bloc de code?", answers: ["<?php", "<php>", "<?", "##php"], correct: 0, xp: 50 },
    { id: 11, question: "Qu'est-ce que HTML signifie?", answers: ["Hyper Text Markup Language", "Home Tool Markup Language", "Hyperlink Text Meta Language", "High Text Making Language"], correct: 0, xp: 50 },
    { id: 12, question: "En JavaScript, lequel est un tableau vide?", answers: ["{}", "[]", "()", "<>"], correct: 1, xp: 50 },
    { id: 13, question: "En CSS, quelle valeur de display crée une flexbox?", answers: ["block", "inline", "flex", "grid"], correct: 2, xp: 50 },
    { id: 14, question: "En PHP, quelle fonction affiche du texte?", answers: ["print()", "echo", "display()", "show()"], correct: 1, xp: 50 },
    { id: 15, question: "Qu'est-ce que CSS signifie?", answers: ["Computer Style Sheets", "Cascading Style Sheets", "Creative Style System", "Custom Style Sheets"], correct: 1, xp: 50 },
    { id: 16, question: "En JavaScript, quelle méthode ajoute un élément à la fin d'un tableau?", answers: ["add()", "push()", "append()", "insert()"], correct: 1, xp: 50 },
    { id: 17, question: "En HTML, quelle balise crée un paragraphe?", answers: ["<para>", "<text>", "<p>", "<par>"], correct: 2, xp: 50 },
    { id: 18, question: "En CSS, comment centrer un texte?", answers: ["text-align: center", "align: center", "center: text", "text: center"], correct: 0, xp: 50 },
    { id: 19, question: "En JavaScript, comment vérifie-t-on si une variable est undefined?", answers: ["x == null", "x === undefined", "x.isNull()", "typeof x == 'empty'"], correct: 1, xp: 50 },
    { id: 20, question: "En PHP, comment crée-t-on une variable?", answers: ["var x = 5", "$x = 5", "let x = 5", "x = 5"], correct: 1, xp: 50 },
    { id: 21, question: "Que fait la méthode .length en JavaScript sur un tableau?", answers: ["Retourne la valeur max", "Retourne le nombre d'éléments", "Retourne le dernier élément", "Retourne la taille en bytes"], correct: 1, xp: 50 },
    { id: 22, question: "En HTML, quel attribut définit l'URL d'un lien?", answers: ["link", "src", "href", "url"], correct: 2, xp: 50 },
    { id: 23, question: "En CSS, quelle propriété arrondit les coins d'un élément?", answers: ["corner-radius", "border-radius", "round-border", "border-round"], correct: 1, xp: 50 },
    { id: 24, question: "En JavaScript, qu'est-ce qu'une fonction fléchée?", answers: ["function() {}", "() => {}", "==> {}", "func() {}"], correct: 1, xp: 50 },
    { id: 25, question: "En PHP, quelle superglobale contient les données d'un formulaire POST?", answers: ["$_GET", "$_POST", "$_FORM", "$_REQUEST"], correct: 1, xp: 50 },
  ],

  // ============================================================
  // CODE - MOYEN (développeur junior/mid-level)
  // ============================================================
  programming_medium: [
    { id: 1, question: "Qu'est-ce que le DOM en JavaScript?", answers: ["Document Object Model", "Data Object Management", "Dynamic Output Method", "Document Order Map"], correct: 0, xp: 80 },
    { id: 2, question: "Quelle est la différence entre == et === en JavaScript?", answers: ["Aucune", "=== vérifie type ET valeur, == seulement la valeur", "== est plus rapide", "=== ne fonctionne que sur les nombres"], correct: 1, xp: 80 },
    { id: 3, question: "En React, qu'est-ce que le hook useState retourne?", answers: ["Une valeur uniquement", "Une valeur et une fonction pour la modifier", "Un objet avec des méthodes", "Un tableau de toutes les valeurs"], correct: 1, xp: 80 },
    { id: 4, question: "Qu'est-ce qu'une Promise en JavaScript?", answers: ["Une variable spéciale", "Un objet représentant une opération asynchrone", "Une fonction qui s'exécute immédiatement", "Un type de tableau"], correct: 1, xp: 80 },
    { id: 5, question: "En SQL, quelle clause filtre les résultats?", answers: ["FILTER", "WHERE", "SELECT", "HAVING"], correct: 1, xp: 80 },
    { id: 6, question: "Qu'est-ce que le CSS Flexbox?", answers: ["Un type de police", "Un système de mise en page 1D", "Un framework CSS", "Un système de grille 2D"], correct: 1, xp: 80 },
    { id: 7, question: "En JavaScript, qu'est-ce que le closure?", answers: ["Une fonction fermée", "Une fonction qui capture son environnement lexical", "Un bloc try/catch", "Une classe sans méthode"], correct: 1, xp: 80 },
    { id: 8, question: "Quelle méthode HTTP est utilisée pour créer une ressource?", answers: ["GET", "PUT", "POST", "PATCH"], correct: 2, xp: 80 },
    { id: 9, question: "En PHP, quelle est la différence entre include et require?", answers: ["Aucune", "require génère une erreur fatale si le fichier est absent", "include est plus rapide", "require est obsolète"], correct: 1, xp: 80 },
    { id: 10, question: "Qu'est-ce que JSON?", answers: ["JavaScript Object Notation", "Java Standard Object Notation", "JavaScript Online Network", "Java Script Object Node"], correct: 0, xp: 80 },
    { id: 11, question: "En CSS Grid, que fait 'grid-template-columns: repeat(3, 1fr)'?", answers: ["Crée 3 lignes égales", "Crée 3 colonnes égales", "Répète 3 fois le grid", "Crée une grille de 3x3"], correct: 1, xp: 80 },
    { id: 12, question: "En JavaScript, que retourne typeof null?", answers: ["'null'", "'undefined'", "'object'", "'nothing'"], correct: 2, xp: 80 },
    { id: 13, question: "En React, à quoi sert useEffect?", answers: ["Gérer l'état", "Effectuer des side effects après le rendu", "Créer des composants", "Gérer les événements"], correct: 1, xp: 80 },
    { id: 14, question: "Qu'est-ce que Git?", answers: ["Un langage de programmation", "Un système de contrôle de version", "Un framework web", "Un serveur web"], correct: 1, xp: 80 },
    { id: 15, question: "En SQL, quelle est la différence entre INNER JOIN et LEFT JOIN?", answers: ["Aucune", "LEFT JOIN garde toutes les lignes de gauche même sans correspondance", "INNER JOIN est plus lent", "LEFT JOIN ne fonctionne qu'avec 2 tables"], correct: 1, xp: 80 },
    { id: 16, question: "Qu'est-ce que le hoisting en JavaScript?", answers: ["Une technique CSS", "Le fait que les déclarations sont montées en haut de leur scope", "Une méthode de tableau", "Un type d'événement"], correct: 1, xp: 80 },
    { id: 17, question: "En PHP, comment empêche-t-on les injections SQL?", answers: ["En utilisant mysql_query", "En utilisant des prepared statements", "En échappant les espaces", "En utilisant htmlspecialchars"], correct: 1, xp: 80 },
    { id: 18, question: "Qu'est-ce qu'une RESTful API?", answers: ["Une API très rapide", "Une API suivant les principes REST (stateless, ressources, HTTP)", "Une API avec authentification", "Une API JavaScript uniquement"], correct: 1, xp: 80 },
    { id: 19, question: "En JavaScript, que fait Array.prototype.reduce()?", answers: ["Réduit la taille du tableau", "Accumule les valeurs en une seule valeur", "Filtre les doublons", "Trie le tableau"], correct: 1, xp: 80 },
    { id: 20, question: "Qu'est-ce que le box model en CSS?", answers: ["Un modèle 3D", "Content + Padding + Border + Margin", "Un système de grille", "La façon dont les couleurs sont calculées"], correct: 1, xp: 80 },
    { id: 21, question: "En React, qu'est-ce que le Virtual DOM?", answers: ["Une copie légère du DOM réel pour optimiser les mises à jour", "Un DOM dans un iframe", "Le DOM de Node.js", "Un DOM en mémoire cache"], correct: 0, xp: 80 },
    { id: 22, question: "En SQL, quelle clause regroupe les résultats?", answers: ["ORDER BY", "GROUP BY", "CLUSTER BY", "SORT BY"], correct: 1, xp: 80 },
    { id: 23, question: "Qu'est-ce que l'event bubbling en JavaScript?", answers: ["Un événement qui se répète", "La propagation d'un événement du fils vers le parent", "Un type de boucle", "Un événement d'animation CSS"], correct: 1, xp: 80 },
    { id: 24, question: "En Git, que fait 'git stash'?", answers: ["Sauvegarde les fichiers dans le cloud", "Met de côté les modifications non commitées", "Crée une nouvelle branche", "Supprime les fichiers non trackés"], correct: 1, xp: 80 },
    { id: 25, question: "En PHP, quelle est la différence entre session et cookie?", answers: ["Aucune", "Session stocke côté serveur, cookie côté client", "Cookie est plus sécurisé", "Session expire plus vite"], correct: 1, xp: 80 },
  ],

  // ============================================================
  // CODE - DIFFICILE (senior dev, concepts avancés)
  // ============================================================
  programming_hard: [
    { id: 1, question: "Qu'est-ce que le garbage collection en JavaScript et comment fonctionne-t-il?", answers: ["Suppression manuelle de la mémoire", "Mark-and-sweep: marque les objets inaccessibles puis les supprime", "Reference counting uniquement", "FIFO des allocations mémoire"], correct: 1, xp: 120 },
    { id: 2, question: "Qu'est-ce que le design pattern Observer?", answers: ["Un objet qui observe les autres", "Un sujet notifie automatiquement ses observers lors de changements d'état", "Un pattern pour les API REST", "Une façon de logger les erreurs"], correct: 1, xp: 120 },
    { id: 3, question: "En JavaScript, qu'est-ce que le prototype chain?", answers: ["Un tableau de prototypes", "Le mécanisme d'héritage via __proto__ remontant jusqu'à null", "Un type de classe ES6", "La chaîne d'appels de fonctions"], correct: 1, xp: 120 },
    { id: 4, question: "Qu'est-ce que CORS et pourquoi existe-t-il?", answers: ["Un protocole de compression", "Same-Origin Policy: contrôle les requêtes cross-domain pour la sécurité", "Un système de cache HTTP", "Un type d'authentification"], correct: 1, xp: 120 },
    { id: 5, question: "En SQL, quelle est la complexité d'un index B-Tree pour une recherche?", answers: ["O(n)", "O(log n)", "O(1)", "O(n²)"], correct: 1, xp: 120 },
    { id: 6, question: "Qu'est-ce que le currying en programmation fonctionnelle?", answers: ["Transformer une fonction à n args en n fonctions à 1 arg", "Un type de récursion", "Une technique de caching", "La composition de fonctions"], correct: 0, xp: 120 },
    { id: 7, question: "En React, pourquoi ne faut-il PAS muter le state directement?", answers: ["C'est une convention uniquement", "React ne peut pas détecter les changements et ne re-renderera pas", "Les mutations causent des memory leaks", "Le state est en lecture seule par définition"], correct: 1, xp: 120 },
    { id: 8, question: "Qu'est-ce que le CAP theorem en bases de données distribuées?", answers: ["Consistency, Availability, Partition tolerance: on ne peut garantir que 2 des 3", "Create, Add, Post: les 3 opérations SQL de base", "Cached, Active, Persistent: états d'une BDD", "Un théorème de complexité algorithmique"], correct: 0, xp: 120 },
    { id: 9, question: "En JavaScript, qu'est-ce que le Event Loop?", answers: ["Une boucle for sur les events DOM", "Le mécanisme qui gère la pile d'appels, la callback queue et le task queue", "Un type de Promise", "Un pattern d'architecture"], correct: 1, xp: 120 },
    { id: 10, question: "Qu'est-ce que l'injection de dépendances (DI)?", answers: ["Injecter du code malveillant", "Fournir les dépendances d'un objet de l'extérieur plutôt qu'il les crée lui-même", "Un type d'injection SQL", "Charger les modules dynamiquement"], correct: 1, xp: 120 },
    { id: 11, question: "En PHP, qu'est-ce que les Traits et à quoi servent-ils?", answers: ["Des variables globales", "Un mécanisme de réutilisation de code pour les classes (alternative à l'héritage multiple)", "Des interfaces typées", "Des constantes de classe"], correct: 1, xp: 120 },
    { id: 12, question: "Quelle est la différence entre TCP et UDP?", answers: ["Aucune", "TCP garantit la livraison et l'ordre, UDP est plus rapide mais non garanti", "UDP est plus sécurisé", "TCP est pour le web, UDP pour les emails"], correct: 1, xp: 120 },
    { id: 13, question: "En JavaScript, quelle est la sortie de: console.log(0.1 + 0.2 === 0.3)?", answers: ["true", "false", "undefined", "NaN"], correct: 1, xp: 120 },
    { id: 14, question: "Qu'est-ce que le sharding en base de données?", answers: ["Un type de backup", "Diviser horizontalement une base de données en plusieurs instances", "Un algorithme de tri", "Un type d'index"], correct: 1, xp: 120 },
    { id: 15, question: "En React, que résout useMemo?", answers: ["La gestion des erreurs", "Mémorise le résultat d'un calcul coûteux pour éviter de le recalculer inutilement", "La gestion du state global", "Les effets de bord asynchrones"], correct: 1, xp: 120 },
    { id: 16, question: "Qu'est-ce que le principe SOLID en POO?", answers: ["Single, Open/Closed, Liskov, Interface, Dependency - 5 principes de design orienté objet", "Un acronyme pour la sécurité web", "Un framework de test", "Un pattern d'architecture microservices"], correct: 0, xp: 120 },
    { id: 17, question: "En Git, quelle est la différence entre rebase et merge?", answers: ["Aucune", "Rebase réécrit l'historique en linéarisant, merge crée un commit de fusion", "Merge est plus dangereux", "Rebase ne fonctionne qu'en local"], correct: 1, xp: 120 },
    { id: 18, question: "Qu'est-ce que le XSS (Cross-Site Scripting)?", answers: ["Un type de SQL injection", "Injection de scripts malveillants dans des pages web vues par d'autres utilisateurs", "Un protocole de sécurité", "Une attaque sur les serveurs"], correct: 1, xp: 120 },
    { id: 19, question: "En JavaScript, qu'est-ce que WeakMap vs Map?", answers: ["WeakMap est plus petit", "WeakMap ne conserve pas de références fortes (garbage collectible) et non itérable", "Map est plus rapide", "WeakMap supporte tous les types de clés"], correct: 1, xp: 120 },
    { id: 20, question: "Qu'est-ce que le N+1 problem en ORM?", answers: ["Un bug mathématique", "1 requête pour la liste + N requêtes pour chaque relation, très inefficace", "Un type de deadlock", "Une erreur de pagination"], correct: 1, xp: 120 },
    { id: 21, question: "En CSS, quelle est la spécificité de: body #content .main p?", answers: ["0-1-1-2", "1-1-1-1", "0-1-1-1", "1-2-0-1"], correct: 0, xp: 120 },
    { id: 22, question: "Qu'est-ce que le concept de 'idempotence' en API REST?", answers: ["L'API ne change jamais", "Une opération peut être répétée plusieurs fois avec le même résultat", "L'API retourne toujours le même format", "Une requête ne peut être faite qu'une fois"], correct: 1, xp: 120 },
    { id: 23, question: "En PHP 8, qu'est-ce que les Fibers?", answers: ["Un type de tableau optimisé", "Des coroutines légères permettant la pause et reprise d'exécution", "Un système de cache", "Un type de classe abstraite"], correct: 1, xp: 120 },
    { id: 24, question: "Qu'est-ce que le two-phase locking en bases de données?", answers: ["Un backup en deux étapes", "Un protocole de concurrence: phase acquisition puis phase libération des locks", "Un type d'index", "Une technique de sharding"], correct: 1, xp: 120 },
    { id: 25, question: "En JavaScript, qu'est-ce que le Temporal Dead Zone (TDZ)?", answers: ["Un bug de setTimeout", "La période entre le début du scope et la déclaration d'une variable let/const où elle n'est pas accessible", "Un type d'erreur asynchrone", "La durée de vie d'une Promise rejetée"], correct: 1, xp: 120 },
  ],

  // ============================================================
  // STORY - garde le même format avec act/scene
  // ============================================================
  story: [
    { id: 1, act: 1, scene: 0, question: "Vous arrivez aux ruines du Village des Anciens. Une seule maison tient encore debout. Que faites-vous?", answers: ["Explorer la maison intacte", "Fouiller les décombres", "Écouter les sons autour", "Chercher des survivants"], correct: 0, difficulty: 1, xp: 60, npc: null, narrative_before: "Après des jours de voyage, vous arrivez au Village des Anciens. La légende parle d'une malédiction ancienne.", narrative_after: "Dans la maison, vous trouvez des parchemins anciens... et une silhouette qui bouge dans l'ombre." },
    { id: 2, act: 1, scene: 1, question: "La silhouette est une vieille sage. Elle dit: 'Pour obtenir mon aide, prouve ta valeur.' Comment réagis-tu?", answers: ["Accepter son défi", "Refuser et partir", "La menacer", "Lui offrir de l'aide"], correct: 0, difficulty: 1, xp: 70, npc: "Eldara la Sage", narrative_before: "Une vieille femme aux yeux brillants émerge de l'obscurité.", narrative_after: "Elle sourit. 'Bon choix. Écoute bien cette première énigme...'" },
    { id: 3, act: 2, scene: 0, question: "Dans la Forêt Maudite, une créature émerge. Que fais-tu?", answers: ["L'affronter directement", "Chercher une ruse", "Fuir rapidement", "Communiquer pacifiquement"], correct: 1, difficulty: 2, xp: 80, npc: null, narrative_before: "Vous entrez dans la forêt. L'air est lourd, électrique.", narrative_after: "Votre astuce fonctionne! La créature vous laisse passer." },
    { id: 4, act: 2, scene: 1, question: "Au cœur de la forêt, vous trouvez un cristal noir qui pulse. Eldara dit 'C'est la source de la malédiction.' Que fais-tu?", answers: ["Le détruire", "L'étudier d'abord", "Le prendre", "Le laisser"], correct: 1, difficulty: 2, xp: 85, npc: "Eldara la Sage", narrative_before: "Le cristal brille d'une lumière sinistre.", narrative_after: "Il contient une âme prisonnière... celle d'un ancien roi!" },
    { id: 5, act: 3, scene: 0, question: "Le cristal révèle un roi corrompu emprisonné depuis 200 ans. Comment l'aider?", answers: ["Le libérer immédiatement", "Chercher un moyen sûr", "Consulter Eldara", "Consulter les deux"], correct: 3, difficulty: 2, xp: 90, npc: null, narrative_before: "Les visions font mal à ta tête, mais tu comprends la vérité.", narrative_after: "Eldara et toi décidez de chercher les Trois Talismans." },
    { id: 6, act: 3, scene: 1, question: "Eldara propose: 'Je cherche deux Talismans, peux-tu trouver le troisième seul?' Que réponds-tu?", answers: ["Accepter confiant", "Demander plus d'infos", "Refuser", "Proposer d'y aller ensemble"], correct: 1, difficulty: 3, xp: 95, npc: "Eldara la Sage", narrative_before: "Eldara te regarde intensément.", narrative_after: "Elle te donne une carte ancienne et un pendentif brillant." },
    { id: 7, act: 4, scene: 0, question: "Un gardien spectral te pose une énigme: 'Je suis le chemin et la destination, le début et la fin. Qu'est-ce que je suis?'", answers: ["Le temps", "La vie", "L'infini", "La mort"], correct: 0, difficulty: 3, xp: 100, npc: "Le Gardien Spectral", narrative_before: "Une silhouette translucide apparaît dans le brouillard.", narrative_after: "Le Gardien s'incline. 'Sage réponse. Le Talisman est à toi.'" },
    { id: 8, act: 4, scene: 1, question: "Eldara est en danger! Que fais-tu?", answers: ["Courir vers elle immédiatement", "Méditer pour te connecter à elle", "Étudier le Talisman d'abord", "Appeler à l'aide"], correct: 1, difficulty: 2, xp: 100, npc: null, narrative_before: "Une vague d'énergie te traverse.", narrative_after: "En méditant, tu vois Eldara combattre une entité sombre." },
    { id: 9, act: 5, scene: 0, question: "Le Démon Ancien dit: 'Vous croyez vraiment pouvoir me vaincre?' Comment réponds-tu?", answers: ["Avec défi et courage", "Avec humilité et détermination", "En silence, prêt au combat", "Avec la sagesse d'Eldara"], correct: 1, difficulty: 3, xp: 120, npc: "Le Démon Ancien", narrative_before: "L'air tremble. Une créature de pure ténèbre se manifeste.", narrative_after: "Toi et Eldara, main dans la main, invoquez les Talismans..." },
    { id: 10, act: 5, scene: 1, question: "Les Talismans brillent! Eldara crie: 'Maintenant! Concentre-toi!' Que canalises-tu?", answers: ["La lumière des Talismans", "Ton amitié avec Eldara", "La sagesse du Roi", "Tout ensemble"], correct: 3, difficulty: 3, xp: 130, npc: "Eldara la Sage", narrative_before: "La puissance grandit autour de toi.", narrative_after: "Une explosion de lumière! Le Démon est vaincu! Le Roi est libéré!" },
    { id: 11, act: 5, scene: 2, question: "Le Roi libéré demande: 'Comment puis-je te remercier?' Que réponds-tu?", answers: ["Ramène la paix dans le royaume", "Enseigne-moi ta sagesse", "Rien, c'était mon devoir", "Aide-nous à rebâtir"], correct: 3, difficulty: 1, xp: 150, npc: "Le Roi Libéré", narrative_before: "Une silhouette dorée émerge du cristal brisé.", narrative_after: "Le Roi sourit. 'Une réponse digne d'un vrai héros.'" },
    { id: 12, act: 6, scene: 0, question: "Vous rencontrez des survivants cachés. Que fais-tu?", answers: ["Les forcer à aider", "Leur expliquer la situation", "Les ignorer", "Leur offrir refuge et protection"], correct: 3, difficulty: 1, xp: 90, npc: "Le Roi + Eldara", narrative_before: "Vous quittez la Forêt Maudite. La malédiction est brisée.", narrative_after: "Les survivants vous rejoignent. Une communauté se forme!" },
    { id: 13, act: 6, scene: 1, question: "Des tensions surgissent: un ancien chef veut le pouvoir absolu. Comment résous-tu ce conflit?", answers: ["Imposer l'autorité du Roi", "Proposer un conseil démocratique", "Laisser Eldara décider", "Combattre le chef"], correct: 1, difficulty: 2, xp: 110, npc: "Le Roi Libéré", narrative_before: "Pendant la reconstruction, les rivalités resurgissent.", narrative_after: "Un nouveau gouvernement se forme, basé sur la justice." },
    { id: 14, act: 7, scene: 0, question: "Un messager arrive: une autre région est frappée par la même malédiction. Le Roi te demande d'y aller. Acceptes-tu?", answers: ["Accepter immédiatement", "Demander du temps pour réfléchir", "Refuser, tu en as assez fait", "Demander des renforts d'abord"], correct: 0, difficulty: 2, xp: 120, npc: "Le Roi Libéré", narrative_before: "La reconstruction se passe bien, mais de nouvelles ombres apparaissent.", narrative_after: "Tu prends la route, Eldara à tes côtés. L'aventure continue..." },
    { id: 15, act: 7, scene: 1, question: "Avant de partir, Eldara te révèle qu'elle est la dernière gardienne d'un ancien ordre. Elle te propose de t'initier. Que dis-tu?", answers: ["Accepter l'initiation", "Refuser par humilité", "Demander ce que ça implique", "Proposer de décider après la mission"], correct: 2, difficulty: 3, xp: 150, npc: "Eldara la Sage", narrative_before: "Eldara pose une main sur ton épaule, les yeux emplis de sagesse.", narrative_after: "Elle hoche la tête. 'Sage réponse. Un gardien doit toujours savoir ce qu'il accepte.'" },
  ],

  // Garder les anciennes clés pour compatibilité
  get anime() { return this.anime_easy; },
  get programming() { return this.programming_easy; },
};
