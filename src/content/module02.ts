import type { Module } from '../types';

export const module02: Module = {
  id: 'm02',
  number: 2,
  icon: '⚛️',
  level: 'Débutant',
  title: "Introduction à React JS",
  description: "Découvrez ce qu'est React, pourquoi l'utiliser et comment créer votre premier projet.",
  lessons: [
    {
      id: 'm02-l01',
      title: "Qu'est-ce que React ?",
      minutes: 8,
      objectives: [
        'Définir React en une phrase',
        'Citer trois raisons d’utiliser React',
        'Écrire un premier composant',
      ],
      blocks: [
        { type: 'p', text: "Vous avez peut-être déjà visité un site dont le contenu semblait réagir instantanément, sans jamais recharger la page. React est l'une des bibliothèques qui rendent cela possible." },
        { type: 'h', text: 'Explication simple' },
        { type: 'p', text: "React est une bibliothèque JavaScript créée par Facebook en 2013. Elle sert à construire des interfaces utilisateur (des pages web) sous forme de petits blocs réutilisables appelés composants." },
        {
          type: 'list',
          items: [
            "Une bibliothèque : React complète votre code, il ne remplace pas tout.",
            "Des composants : chaque bouton, chaque carte est un bloc autonome.",
            "Du dynamique : la page se met à jour sans rechargement.",
          ],
        },
        {
          type: 'code',
          lang: 'jsx',
          caption: 'Un premier composant React',
          code: `function Bonjour() {
  return <h1>Bonjour React !</h1>;
}`,
        },
        {
          type: 'list',
          items: [
            "Ligne 1 : `function Bonjour()` déclare un composant ; c'est une fonction JavaScript nommée avec une majuscule.",
            "Ligne 2 : `return` renvoie le contenu affiché ; `<h1>` est du JSX, une extension de JavaScript que nous étudierons à la fin du module.",
          ],
        },
        { type: 'result', text: "À l'écran : un titre « Bonjour React ! » de taille principale." },
        { type: 'mistake', text: "Écrire le composant en minuscule : `function bonjour()`. React distingue les majuscules.", fix: "Toujours commencer le nom d'un composant par une majuscule." },
        { type: 'quote', text: "Résumé : React est une bibliothèque JavaScript pour construire des interfaces dynamiques à partir de composants réutilisables." },
      ],
      exercises: [
        {
          id: 'm02-l01-e1',
          type: 'qcm',
          difficulty: 'facile',
          question: "React est…",
          options: [
            'un langage de programmation',
            'une bibliothèque JavaScript pour construire des interfaces',
            'un serveur web',
            "un système d'exploitation",
          ],
          answer: 1,
          explanation: "React est une bibliothèque (pas un langage) écrite en JavaScript, utilisée pour construire des interfaces utilisateur. HTML et CSS sont des langages de balisage et de style, Node.js est un runtime : ce ne sont pas ces réponses.",
        },
        {
          id: 'm02-l01-e2',
          type: 'short',
          difficulty: 'facile',
          question: "Quel mot désigne le bloc réutilisable central de React ?",
          accepted: ['composant', 'component', 'composants', 'components'],
          explanation: "Le composant (component en anglais) est l'unité de base de React : on l'écrit une fois et on le réutilise. Ce n'est ni une page ni une bibliothèque.",
        },
        {
          id: 'm02-l01-e3',
          type: 'code',
          difficulty: 'intermédiaire',
          language: 'jsx',
          question: "Créez un composant `Slogan` qui affiche « Apprenez React ! » dans un h2, puis affichez-le dans la page.",
          template: `function Slogan() {
  // votre code ici
}
`,
          solution: `function Slogan() {
  return <h2>Apprenez React !</h2>;
}

ReactDOM.createRoot(document.getElementById('root')).render(<Slogan />);`,
          mustContain: ['<h2>', 'Slogan'],
          hint: "Le composant renvoie un élément `<h2>` ; ensuite, `ReactDOM.createRoot` l'insère dans la page.",
          explanation: "Le composant renvoie un élément `<h2>` : c'est ce que React affiche. `ReactDOM.createRoot` puis `render` demandent à React d'insérer ce composant dans le conteneur `root` de la page.",
        },
      ],
    },
    {
      id: 'm02-l02',
      title: 'Pourquoi utiliser React ?',
      minutes: 7,
      objectives: [
        'Citer trois avantages de React',
        'Comprendre la réutilisation des composants',
        'Savoir quand React est (in)utile',
      ],
      blocks: [
        { type: 'p', text: "Imaginez un site e-commerce avec cinquante boutons identiques. Sans React, changer leur couleur signifie toucher cinquante endroits. Avec React, on écrit le bouton une fois, et on l'utilise cinquante fois." },
        { type: 'h', text: 'Explication simple' },
        { type: 'p', text: "React est adopté parce qu'il résout des problèmes concrets : il découpe l'interface en composants réutilisables, il met à jour la page efficacement, et il bénéficie d'une immense communauté. Facebook, Instagram, Netflix ou Airbnb l'utilisent au quotidien." },
        {
          type: 'list',
          items: [
            "Composants réutilisables : on écrit une fois, on utilise partout ; modifier le composant change tous ses usages d'un coup.",
            "Mises à jour efficaces : la page se met à jour sans rechargement (détail dans la leçon suivante).",
            "Écosystème complet : bibliothèques de routage, d'animations, de gestion d'état, et beaucoup d'offres d'emploi.",
            "React ne remplace ni HTML ni CSS : il complète votre projet pour le rendre dynamique.",
          ],
        },
        {
          type: 'code',
          lang: 'jsx',
          caption: 'Un même composant utilisé deux fois',
          code: `function Bouton() {
  return <button>Acheter</button>;
}

function App() {
  return (
    <div>
      <Bouton />
      <Bouton />
    </div>
  );
}`,
        },
        {
          type: 'list',
          items: [
            "Lignes 1 à 3 : `Bouton` est un composant qui affiche un bouton « Acheter ».",
            "Lignes 5 à 10 : `App` rassemble le contenu de la page.",
            "Lignes 7 et 8 : `<Bouton />` insère le bouton — deux appels, deux boutons affichés.",
            "Si vous changez « Acheter » en « Valider » dans `Bouton`, les deux boutons changent ensemble.",
          ],
        },
        { type: 'result', text: "À l'écran : deux boutons « Acheter » côte à côte." },
        { type: 'mistake', text: "Choisir React pour une page vitrine de trois sections écrite une seule fois : c'est un outil lourd pour un besoin simple.", fix: "Réservez React aux interfaces dynamiques et réutilisées ; pour une page statique, HTML et CSS suffisent." },
        { type: 'quote', text: "Résumé : React plaît parce qu'il rend le code réutilisable grâce aux composants, met à jour la page efficacement et s'appuie sur une large communauté." },
      ],
      exercises: [
        {
          id: 'm02-l02-e1',
          type: 'qcm',
          difficulty: 'facile',
          question: "Quel est un avantage de React ?",
          options: [
            'des composants réutilisables',
            'il remplace HTML et CSS',
            'il fonctionne sans navigateur',
            'c’est un langage de programmation',
          ],
          answer: 0,
          explanation: "La réutilisation des composants est l'atout central de React. React ne remplace ni HTML ni CSS (il s'y appuie), il s'exécute dans un navigateur, et c'est une bibliothèque JavaScript, pas un langage.",
        },
        {
          id: 'm02-l02-e2',
          type: 'fill',
          difficulty: 'facile',
          question: "React découpe l’interface en petits blocs appelés ___.",
          accepted: ['composants', 'component', 'components', 'composant'],
          explanation: "Les composants (components) sont les blocs de base : bouton, carte, formulaire… On les écrit une fois et on les réutilise. « Pages » ou « variables » ne désignent pas cette structure propre à React.",
        },
        {
          id: 'm02-l02-e3',
          type: 'short',
          difficulty: 'intermédiaire',
          question: "Quelle entreprise a créé React en 2013 ?",
          accepted: ['facebook', 'meta'],
          explanation: "React a été développé par Facebook en 2013 (l'entreprise s'appelle aujourd'hui Meta). Netflix et Airbnb utilisent React, mais ce ne sont pas ses créateurs.",
        },
      ],
    },
    {
      id: 'm02-l03',
      title: 'Comprendre le DOM et le Virtual DOM',
      minutes: 9,
      objectives: [
        'Définir le DOM',
        'Expliquer le Virtual DOM',
        'Comprendre pourquoi React met à jour la page efficacement',
      ],
      blocks: [
        { type: 'p', text: "Quand vous modifiez une page, le navigateur ne réécrit pas le fichier HTML à chaque fois : il travaille sur une représentation en mémoire, l'arbre du DOM. React ajoute une couche supplémentaire : le Virtual DOM." },
        { type: 'h', text: 'Explication simple' },
        { type: 'p', text: "DOM signifie Document Object Model : c'est l'arbre d'objets que le navigateur construit à partir de votre page HTML. Le JavaScript peut le lire et le modifier, et l'écran suit. Le Virtual DOM est une copie légère de cet arbre, gardée en mémoire par React." },
        {
          type: 'list',
          items: [
            "DOM réel : l'arbre que le navigateur affiche, modifiable avec des méthodes comme `document.getElementById`.",
            "Virtual DOM : une copie en mémoire, très rapide à créer et à comparer.",
            "Quand un composant change, React crée un nouveau Virtual DOM, le compare au précédent (on parle de différence, ou « diff »), puis ne met à jour dans le DOM réel que ce qui a réellement changé.",
            "Résultat : moins de manipulations coûteuses du DOM, donc une page plus fluide.",
          ],
        },
        {
          type: 'code',
          lang: 'html',
          caption: 'Modifier le DOM directement avec JavaScript',
          code: `<body>
  <h1 id="titre">Ancien titre</h1>

  <script>
    const titre = document.getElementById("titre");
    titre.textContent = "Nouveau titre";
    console.log(titre.textContent);
  </script>
</body>`,
        },
        {
          type: 'list',
          items: [
            "Ligne 2 : le titre porte l'identifiant `titre`.",
            "Ligne 5 : `document.getElementById(\"titre\")` cherche l'élément dans le DOM réel.",
            "Ligne 6 : `textContent = \"Nouveau titre\"` remplace le texte affiché.",
            "Ligne 7 : `console.log` affiche le nouveau texte.",
            "Avec React, vous n'écririez pas ces lignes : vous changez le contenu du composant, et React met à jour le DOM réel à votre place.",
          ],
        },
        { type: 'result', text: "À l'écran, le titre devient « Nouveau titre » ; dans la console : `Nouveau titre`." },
        { type: 'mistake', text: "Modifier le DOM à la main partout alors qu'on utilise React : les deux peuvent entrer en conflit et la page affiche des contenus incohérents.", fix: "Avec React, décrivez ce qui doit s'afficher dans le composant ; laissez React gérer le DOM réel." },
        { type: 'quote', text: "Résumé : le DOM est l'arbre affiché par le navigateur, le Virtual DOM sa copie en mémoire ; React compare les deux et ne modifie que ce qui change." },
      ],
      exercises: [
        {
          id: 'm02-l03-e1',
          type: 'qcm',
          difficulty: 'facile',
          question: "Le Virtual DOM est…",
          options: [
            'une copie légère de l’arbre de la page, gardée en mémoire',
            'le code HTML stocké sur le serveur',
            'un navigateur alternatif',
            'une base de données',
          ],
          answer: 0,
          explanation: "Le Virtual DOM est une représentation en mémoire que React compare pour détecter les changements. Ce n'est ni le HTML du serveur (le DOM réel vient du navigateur), ni un navigateur, ni une base de données.",
        },
        {
          id: 'm02-l03-e2',
          type: 'fill',
          difficulty: 'intermédiaire',
          question: "DOM signifie Document ___ Model.",
          accepted: ['object'],
          explanation: "DOM = Document Object Model : le modèle en arbre d'objets du document. « Object » est bien le mot manquant ; les autres mots ne forment pas l'acronyme.",
        },
        {
          id: 'm02-l03-e3',
          type: 'debug',
          difficulty: 'avancé',
          question: "Ce code provoque une erreur JavaScript. Trouvez la cause et corrigez-le.",
          template: `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <title>DOM</title>
</head>
<body>
  <script>
    const titre = document.getElementById("titre");
    titre.textContent = "Nouveau titre";
    console.log(titre.textContent);
  </script>
</body>
</html>
`,
          solution: `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <title>DOM</title>
</head>
<body>
  <h1 id="titre">Ancien titre</h1>
  <script>
    const titre = document.getElementById("titre");
    titre.textContent = "Nouveau titre";
    console.log(titre.textContent);
  </script>
</body>
</html>`,
          mustContain: ['id="titre"'],
          hint: "Que renvoie `getElementById` quand aucun élément ne porte cet identifiant ?",
          expectedOutput: 'Nouveau titre',
          explanation: "Aucun élément n'a l'identifiant `titre` : `getElementById` renvoie `null`, et lire `null.textContent` provoque une erreur. En ajoutant `<h1 id=\"titre\">`, l'élément est trouvé, son texte est remplacé et la console affiche « Nouveau titre ».",
        },
      ],
    },
    {
      id: 'm02-l04',
      title: 'Installation de Node.js',
      minutes: 7,
      objectives: [
        'Télécharger et installer Node.js',
        'Vérifier l’installation dans le terminal',
        'Comprendre pourquoi React a besoin de Node',
      ],
      blocks: [
        { type: 'p', text: "Les outils qui fabriquent et assemblent les projets React s'exécutent hors du navigateur, dans un environnement qui manie JavaScript : Node.js. Installation obligatoire avant de créer un projet." },
        { type: 'h', text: 'Explication simple' },
        { type: 'p', text: "Node.js est JavaScript exécuté sur votre ordinateur, sans navigateur. Il est accompagné de npm, le gestionnaire de paquets : un « magasin » qui télécharge les bibliothèques dont votre projet a besoin, React compris." },
        {
          type: 'list',
          items: [
            "Téléchargez Node.js sur le site officiel nodejs.org.",
            "Choisissez la version LTS (Long Term Support) : c'est la version stable recommandée pour débuter.",
            "npm est installé automatiquement avec Node : rien d'autre à installer pour l'instant.",
            "Vérifiez l'installation dans un terminal avec les commandes `node -v` et `npm -v`.",
          ],
        },
        {
          type: 'code',
          lang: 'bash',
          caption: 'Vérifier que Node.js et npm sont installés',
          code: `node -v
npm -v`,
        },
        {
          type: 'list',
          items: [
            "Ligne 1 : `node -v` affiche la version de Node.js, par exemple `v20.11.0`.",
            "Ligne 2 : `npm -v` affiche la version de npm, par exemple `10.2.4`.",
            "Si le terminal répond « commande introuvable », Node n'est pas installé ou le terminal doit être redémarré.",
          ],
        },
        { type: 'result', text: "Deux versions s'affichent dans le terminal, par exemple `v20.11.0` puis `10.2.4`." },
        { type: 'mistake', text: "Installer la version « Current » (la plus récente, parfois instable) en débutant.", fix: "Prenez toujours la version LTS : elle est testée et maintenue sur le long terme." },
        { type: 'mistake', text: "Installer Node puis garder le terminal ouvert : la commande reste introuvable.", fix: "Fermez et rouvrez le terminal (ou redémarrez VS Code) après l'installation." },
        { type: 'quote', text: "Résumé : Node.js exécute JavaScript hors du navigateur et fournit npm ; installez la version LTS et vérifiez avec `node -v` et `npm -v`." },
      ],
      exercises: [
        {
          id: 'm02-l04-e1',
          type: 'qcm',
          difficulty: 'facile',
          question: "Quelle version de Node.js installer pour débuter ?",
          options: [
            'la version LTS',
            'la plus ancienne possible',
            'aucune : npm suffit tout seul',
            'la version de test nightly',
          ],
          answer: 0,
          explanation: "LTS (Long Term Support) est la version stable et maintenue, recommandée pour tous les tutoriels. npm ne peut pas fonctionner sans Node, et les versions anciennes ou de test provoquent des incompatibilités.",
        },
        {
          id: 'm02-l04-e2',
          type: 'fill',
          difficulty: 'intermédiaire',
          question: "Node.js inclut le gestionnaire de paquets nommé ___.",
          accepted: ['npm'],
          explanation: "npm (Node Package Manager) est installé avec Node.js : il télécharge les dépendances du projet avec `npm install`. Il ne s'écrit pas « node » ni « pip ».",
        },
        {
          id: 'm02-l04-e3',
          type: 'short',
          difficulty: 'avancé',
          question: "Quelle commande affiche la version de Node installée ?",
          accepted: ['node -v', 'node --version'],
          explanation: "`node -v` (ou `node --version`) affiche la version de Node.js. `npm -v` donne celle de npm, et `node` tout seul lancerait l'interpréteur au lieu d'afficher la version.",
        },
      ],
    },
    {
      id: 'm02-l05',
      title: 'Installation de VS Code',
      minutes: 6,
      objectives: [
        'Installer VS Code',
        'Ouvrir un dossier de projet',
        'Connaître les extensions utiles',
      ],
      blocks: [
        { type: 'p', text: "Pour écrire du code confortablement, il vous faut un éditeur : un logiciel qui affiche vos fichiers, colore la syntaxe et repère vos erreurs. Le standard pour React est VS Code." },
        { type: 'h', text: 'Explication simple' },
        { type: 'p', text: "VS Code (Visual Studio Code) est un éditeur de code gratuit développé par Microsoft, disponible sur Windows, macOS et Linux. Il sert à écrire le code, voir les fichiers du projet et ouvrir un terminal intégré." },
        {
          type: 'list',
          items: [
            "Téléchargez-le sur code.visualstudio.com puis lancez l'installateur.",
            "Ouvrez un projet avec Fichier > Ouvrir le dossier (Ctrl+O) : le dossier entier apparaît à gauche.",
            "Le terminal intégré s'ouvre avec Ctrl+` (ou via le menu Terminal) : c'est là que vous lancerez les commandes npm.",
            "Extensions utiles : Prettier (forme automatiquement le code) et ESLint (signale les erreurs en rouge).",
          ],
        },
        {
          type: 'code',
          lang: 'html',
          caption: 'Un fichier index.html créé et enregistré dans VS Code',
          code: `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <title>Mon premier fichier</title>
</head>
<body>
  <h1>Salut depuis VS Code !</h1>
</body>
</html>`,
        },
        {
          type: 'list',
          items: [
            "Créez un nouveau fichier et nommez-le `index.html` : l'extension `.html` déclenche la coloration syntaxique.",
            "Collez ce code puis enregistrez avec Ctrl+S.",
            "Les mots entre balises s'affichent en couleurs : c'est la coloration syntaxique qui vous aide à repérer les erreurs.",
            "Le dossier ouvert à gauche affiche tous les fichiers du projet : c'est votre barre de navigation.",
          ],
        },
        { type: 'result', text: "Le fichier `index.html` apparaît dans l'arborescence de VS Code, coloré, et s'ouvre dans un navigateur avec le titre « Salut depuis VS Code ! »." },
        { type: 'mistake', text: "Enregistrer le fichier sans extension `.html`, par exemple `index.txt` : le navigateur ne l'ouvre pas comme une page web.", fix: "Nommez toujours le fichier `index.html` (le point et l'extension compris)." },
        { type: 'quote', text: "Résumé : VS Code est l'éditeur gratuit où vous écrirez tout le code ; on y ouvre un dossier de projet, on y installe Prettier et ESLint, et le terminal Ctrl+` sert à lancer npm." },
      ],
      exercises: [
        {
          id: 'm02-l05-e1',
          type: 'qcm',
          difficulty: 'facile',
          question: "Qu’est-ce que VS Code ?",
          options: [
            'un éditeur de code gratuit',
            'un navigateur web',
            'un langage de programmation',
            'un serveur internet',
          ],
          answer: 0,
          explanation: "VS Code (Visual Studio Code) est un éditeur de code gratuit de Microsoft. Un navigateur comme Chrome affiche les pages, un langage comme JavaScript s'écrit dedans, et un serveur héberge les sites : ce sont d'autres outils.",
        },
        {
          id: 'm02-l05-e2',
          type: 'code',
          difficulty: 'intermédiaire',
          question: "Créez dans VS Code un fichier `index.html` qui affiche un titre de niveau 1 « Bienvenue ! » dans le body.",
          template: `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <title>Ma page</title>
</head>
<body>
  <!-- votre code ici -->
</body>
</html>
`,
          solution: `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <title>Ma page</title>
</head>
<body>
  <h1>Bienvenue !</h1>
</body>
</html>`,
          mustContain: ['<h1>', 'Bienvenue !'],
          hint: "Le titre s'écrit dans `<body>`, avec une balise ouverte et fermée.",
          explanation: "Le contenu visible va dans `<body>` : `<h1>Bienvenue !</h1>` crée le titre de niveau 1. Les balises `<head>` et `<meta>` restent inchangées, elles servent aux informations de la page.",
        },
        {
          id: 'm02-l05-e3',
          type: 'short',
          difficulty: 'avancé',
          question: "Quelle extension formate automatiquement le code selon un style défini ?",
          accepted: ['prettier'],
          explanation: "Prettier est l'extension de formatage la plus utilisée : elle aligne, indente et uniformise le code à l'enregistrement. ESLint, lui, signale les erreurs : ce sont deux rôles différents.",
        },
      ],
    },
    {
      id: 'm02-l06',
      title: "Création d'un projet React avec Vite",
      minutes: 9,
      objectives: [
        'Lancer la commande de création avec Vite',
        'Choisir le bon modèle (template)',
        'Installer les dépendances du projet',
      ],
      blocks: [
        { type: 'p', text: "Un projet React, ce n'est pas trois fichiers écrits à la main : il faut assembler le code, lancer un serveur de développement, gérer les dépendances. Vite fait tout cela en une commande." },
        { type: 'h', text: 'Explication simple' },
        { type: 'p', text: "Vite (prononcé « vite », en français) est l'outil de création et de démarrage de projet recommandé aujourd'hui pour React. Il fabrique la structure complète du projet, puis fournit un serveur de développement ultra-rapide." },
        {
          type: 'list',
          items: [
            "La commande s'écrit dans un terminal, là où vous voulez créer le dossier du projet.",
            "`npm create vite@latest mon-app` crée le dossier `mon-app`.",
            "`--template react` choisit le modèle React (avec JSX).",
            "Node.js doit être installé au préalable (leçon précédente).",
          ],
        },
        {
          type: 'code',
          lang: 'bash',
          caption: 'Créer et préparer un projet React',
          code: `npm create vite@latest mon-app -- --template react
cd mon-app
npm install`,
        },
        {
          type: 'list',
          items: [
            "Ligne 1 : crée le dossier `mon-app` contenant la structure React.",
            "Ligne 2 : `cd mon-app` se place à l'intérieur du dossier créé.",
            "Ligne 3 : `npm install` télécharge toutes les dépendances dans `node_modules`.",
          ],
        },
        { type: 'result', text: "Le dossier `mon-app` contient `package.json`, `index.html`, `vite.config.js` et un dossier `src` : le projet est prêt à démarrer." },
        { type: 'mistake', text: "Oublier `npm install` après la création : la commande `npm run dev` échouera avec « commande introuvable ».", fix: "Lancez toujours `npm install` une fois placé dans le dossier du projet, avant tout démarrage." },
        { type: 'mistake', text: "Suivre un ancien tutoriel qui utilise create-react-app : cet outil n'est plus maintenu.", fix: "Utilisez la commande Vite de cette leçon, c'est la méthode actuelle." },
        { type: 'quote', text: "Résumé : `npm create vite@latest mon-app -- --template react` crée le projet, `cd mon-app` y entre, et `npm install` installe les dépendances." },
      ],
      exercises: [
        {
          id: 'm02-l06-e1',
          type: 'qcm',
          difficulty: 'facile',
          question: "Quel outil crée rapidement un projet React aujourd’hui ?",
          options: ['Vite', 'Paint', 'MySQL', 'Photoshop'],
          answer: 0,
          explanation: "Vite est l'outil de création de projet React recommandé actuellement. Paint et Photoshop sont des logiciels de dessin, MySQL est une base de données : aucun ne crée de projet JavaScript.",
        },
        {
          id: 'm02-l06-e2',
          type: 'fill',
          difficulty: 'intermédiaire',
          question: "Pour choisir React comme modèle, on ajoute l’option ___ react à la commande.",
          accepted: ['--template', 'template'],
          explanation: "`--template react` indique à Vite de générer un projet React. Sans cette option, Vite propose un choix interactif au démarrage de la commande.",
        },
        {
          id: 'm02-l06-e3',
          type: 'short',
          difficulty: 'avancé',
          question: "Quelle commande installe les dépendances d’un projet après sa création ?",
          accepted: ['npm install', 'npm i'],
          explanation: "`npm install` lit `package.json` et télécharge tout ce dont le projet a besoin dans `node_modules`. Sans elle, la commande `npm run dev` échouera avec « commande introuvable ».",
        },
      ],
    },
    {
      id: 'm02-l07',
      title: 'Comprendre la structure d’un projet',
      minutes: 8,
      objectives: [
        'Connaître le rôle des fichiers principaux',
        'Repérer le point d’entrée de l’application',
        'Savoir quel fichier modifier en premier',
      ],
      blocks: [
        { type: 'p', text: "Votre projet existe. Ouvrons-le dans VS Code : à première vue, il contient beaucoup de fichiers, mais chacun a un rôle précis. Les connaître vous fera gagner un temps précieux." },
        { type: 'h', text: 'Explication simple' },
        { type: 'p', text: "Un projet créé par Vite suit presque toujours le même plan : une page `index.html`, un contrat `package.json`, et un dossier `src` qui contient votre code. Le point d'entrée est `src/main.jsx`, et le composant principal est `src/App.jsx`." },
        {
          type: 'list',
          items: [
            "`index.html` : la page unique servie par Vite ; elle contient `<div id=\"root\"></div>`, le point d'accroche de React.",
            "`package.json` : la carte d'identité du projet : nom, dépendances et commandes comme `npm run dev`.",
            "`src/main.jsx` : le point d'entrée JavaScript qui monte l'application sur le div `root`.",
            "`src/App.jsx` : le composant racine, celui affiché en premier ; c'est souvent le premier fichier que vous modifierez.",
            "`node_modules` : les dépendances téléchargées par `npm install` ; ne pas y toucher.",
          ],
        },
        {
          type: 'code',
          lang: 'text',
          caption: 'L’arborescence du projet',
          code: `mon-app/
├── index.html
├── package.json
├── public/
└── src/
    ├── main.jsx
    ├── App.jsx
    └── index.css`,
        },
        {
          type: 'list',
          items: [
            "Ligne 1 : `mon-app/` est la racine du projet, ouverte dans VS Code.",
            "Ligne 2 : `index.html` est la page servie par le navigateur.",
            "Ligne 3 : `package.json` contient les dépendances et les commandes.",
            "Ligne 4 : `public/` reçoit les fichiers statiques (logo, images).",
            "Lignes 6 à 8 : `src/` contient le code : `main.jsx` (entrée), `App.jsx` (composant racine) et `index.css` (styles).",
          ],
        },
        { type: 'result', text: "Ouvrez le dossier dans VS Code : l'arborescence apparaît à gauche. Le site, lui, affiche le contenu de `src/App.jsx`." },
        { type: 'mistake', text: "Supprimer ou modifier à la main des fichiers de `node_modules` : le projet ne démarre plus.", fix: "Ne jamais y toucher ; en cas de doute, relancez `npm install` pour tout régénérer." },
        { type: 'quote', text: "Résumé : `index.html` accueille l'application, `main.jsx` la démarre, `App.jsx` l'affiche, et `package.json` décrit le projet." },
      ],
      exercises: [
        {
          id: 'm02-l07-e1',
          type: 'qcm',
          difficulty: 'facile',
          question: "Quel fichier est le point d’entrée JavaScript du projet ?",
          options: ['src/main.jsx', 'index.css', 'public/logo.svg', 'package-lock.json'],
          answer: 0,
          explanation: "`src/main.jsx` monte l'application sur le div `root` : c'est le point d'entrée. `index.css` contient des styles, `public/` des fichiers statiques, et `package-lock.json` est géré automatiquement par npm.",
        },
        {
          id: 'm02-l07-e2',
          type: 'fill',
          difficulty: 'intermédiaire',
          question: "Le fichier ___ contient le nom, les dépendances et les commandes du projet.",
          accepted: ['package.json', 'package json'],
          explanation: "`package.json` est la carte d'identité du projet : il liste les dépendances et les scripts (`dev`, `build`). Aucun autre fichier ne joue ce rôle.",
        },
        {
          id: 'm02-l07-e3',
          type: 'visual',
          difficulty: 'avancé',
          question: "Décrivez ce que voit l’utilisateur quand ce composant s’affiche. Citez les textes exacts à l’écran.",
          template: `function App() {
  return (
    <div>
      <h1>Mon site</h1>
      <p>Bienvenue à tous !</p>
    </div>
  );
}
`,
          solution: "L'utilisateur voit un titre « Mon site » suivi d'un paragraphe « Bienvenue à tous ! ».",
          mustContain: ['Mon site', 'Bienvenue'],
          hint: "Le h1 devient un titre, le p un paragraphe, dans l’ordre du code.",
          explanation: "Le composant renvoie un `div` contenant un `h1` puis un `p` : React les insère dans la page dans cet ordre. L'utilisateur lit donc le titre « Mon site » puis le paragraphe « Bienvenue à tous ! » ; les balises elles-mêmes ne se voient pas.",
        },
      ],
    },
    {
      id: 'm02-l08',
      title: 'Démarrer son premier projet',
      minutes: 7,
      objectives: [
        'Lancer le serveur de développement',
        'Ouvrir l’adresse locale dans le navigateur',
        'Modifier App.jsx et voir le résultat',
      ],
      blocks: [
        { type: 'p', text: "Tout est installé : il ne reste qu'une commande pour voir votre application s'afficher dans le navigateur. C'est le moment où le projet devient réel." },
        { type: 'h', text: 'Explication simple' },
        { type: 'p', text: "Le serveur de développement Vite surveille vos fichiers. Il affiche une adresse locale (localhost) : ouvrez-la et votre application apparaît. Dès que vous enregistrez une modification, la page se met à jour toute seule." },
        {
          type: 'list',
          items: [
            "`cd mon-app` se place dans le dossier du projet.",
            "`npm run dev` démarre le serveur de développement.",
            "L'adresse `http://localhost:5173/` s'ouvre dans votre navigateur.",
            "Modifier `src/App.jsx` puis enregistrer (Ctrl+S) recharge la page automatiquement (mise à jour à chaud).",
            "`Ctrl+C` dans le terminal arrête le serveur.",
          ],
        },
        {
          type: 'code',
          lang: 'bash',
          caption: 'Démarrer le serveur de développement',
          code: `cd mon-app
npm run dev`,
        },
        {
          type: 'list',
          items: [
            "Ligne 1 : `cd mon-app` entre dans le dossier du projet (une seule fois, à la création).",
            "Ligne 2 : `npm run dev` exécute le script `dev` défini dans `package.json` et lance Vite.",
            "Le terminal affiche ensuite l'adresse locale à ouvrir.",
          ],
        },
        { type: 'result', text: "Le terminal affiche « VITE ready » et `Local: http://localhost:5173/` ; le navigateur ouvert sur cette adresse affiche le contenu de `src/App.jsx`." },
        { type: 'mistake', text: "Fermer le terminal en croyant que le site est en ligne : `localhost` désigne uniquement votre ordinateur.", fix: "Le site n'est accessible qu'à vous ; le publier sur internet demandera un hébergement, vu plus tard." },
        { type: 'mistake', text: "Modifier `index.html` pour changer le contenu affiché : avec React, le contenu vient de `src/App.jsx`.", fix: "Modifiez le composant `App`, enregistrez, et la page se met à jour." },
        { type: 'quote', text: "Résumé : `npm run dev` lance le serveur, `http://localhost:5173/` ouvre la page, et chaque enregistrement de `App.jsx` met l'affichage à jour automatiquement." },
      ],
      exercises: [
        {
          id: 'm02-l08-e1',
          type: 'qcm',
          difficulty: 'facile',
          question: "Quelle commande démarre le serveur de développement ?",
          options: ['npm run dev', 'npm stop', 'node kill', 'vite-off'],
          answer: 0,
          explanation: "`npm run dev` exécute le script `dev` du projet et lance Vite. `npm stop`, `node kill` et `vite-off` n'existent pas : ce sont des commandes inventées.",
        },
        {
          id: 'm02-l08-e2',
          type: 'fill',
          difficulty: 'intermédiaire',
          question: "Le site s’ouvre sur l’adresse locale http://___:5173/ .",
          accepted: ['localhost', 'http://localhost'],
          explanation: "`localhost` est le nom de votre propre ordinateur vu par le navigateur ; associé au port 5173 (choisi par Vite), il donne l'adresse complète du serveur de développement.",
        },
        {
          id: 'm02-l08-e3',
          type: 'code',
          difficulty: 'avancé',
          language: 'jsx',
          question: "Modifiez le composant pour qu’il affiche « Mon premier projet React ! » dans un h1, puis affichez-le dans la page.",
          template: `function App() {
  return <h1>Bonjour</h1>;
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
`,
          solution: `function App() {
  return <h1>Mon premier projet React !</h1>;
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);`,
          mustContain: ['<h1>', 'Mon premier projet React !'],
          hint: "Seul le contenu entre les balises h1 change.",
          explanation: "Le composant renvoie le nouvel élément `<h1>` : c'est ce que React affiche dans le conteneur `root`. Le reste du fichier (la fonction `App` et l'appel `render`) reste identique.",
        },
      ],
    },
    {
      id: 'm02-l09',
      title: 'Comprendre JSX',
      minutes: 9,
      objectives: [
        'Définir le JSX',
        'Respecter les règles de base du JSX',
        'Utiliser className et les expressions entre accolades',
      ],
      blocks: [
        { type: 'p', text: "Dans vos fichiers React, du HTML semble s'écrire au milieu du JavaScript. Cette syntaxe a un nom : JSX. Elle a quelques règles qu'il faut connaître avant d'aller plus loin." },
        { type: 'h', text: 'Explication simple' },
        { type: 'p', text: "JSX signifie JavaScript XML : c'est une extension de syntaxe qui permet d'écrire des balises directement dans du JavaScript. Vite le transforme automatiquement en appels JavaScript classiques que le navigateur comprend." },
        {
          type: 'list',
          items: [
            "Le JSX vit dans le `return` d'un composant et doit être entouré d'une seule balise racine (souvent un `div`).",
            "Le HTML classique `class` devient `className` en JSX, et `for` devient `htmlFor`.",
            "Entre accolades `{ }`, on insère une variable ou une expression JavaScript.",
            "Les balises vides se ferment elles-mêmes : `<img />`, `<br />`.",
            "Tout ce que vous avez appris reste du JavaScript : variables, fonctions, conditions.",
          ],
        },
        {
          type: 'code',
          lang: 'jsx',
          caption: 'Un composant JSX complet',
          code: `function Accueil() {
  const titre = "Bienvenue";
  return (
    <div>
      <h1 className="titre">{titre}</h1>
      <p>Apprenez React en français.</p>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<Accueil />);`,
        },
        {
          type: 'list',
          items: [
            "Ligne 1 : `function Accueil()` déclare le composant, nommé avec une majuscule.",
            "Ligne 2 : la variable `titre` contient le texte à afficher.",
            "Lignes 3 à 8 : le `return` est entouré de parenthèses pour lire le JSX sur plusieurs lignes.",
            "Ligne 5 : `className=\"titre\"` remplace `class` : React utilise ce nom pour la compatibilité.",
            "Ligne 6 : `{titre}` insère la valeur de la variable dans le balisage.",
            "Ligne 5 : le `div` est la balise racine unique qui enveloppe le titre et le paragraphe.",
            "Ligne 12 : `render(<Accueil />)` insère le composant dans le div `root` de la page.",
          ],
        },
        { type: 'result', text: "À l'écran : un titre « Bienvenue » suivi du paragraphe « Apprenez React en français. »." },
        { type: 'mistake', text: "Écrire `class=\"titre\"` comme en HTML : React affiche un avertissement et ignore l'attribut.", fix: "En JSX, écrivez `className=\"titre\"`." },
        { type: 'mistake', text: "Deux balises racines côte à côte : `<h1>…</h1><p>…</p>` directement dans le return provoque une erreur JSX.", fix: "Enveloppez tout dans une balise unique, par exemple un `div`." },
        { type: 'quote', text: "Résumé : le JSX écrit du HTML dans du JavaScript ; une seule balise racine, `className` au lieu de `class`, et les variables entre accolades `{ }`." },
      ],
      exercises: [
        {
          id: 'm02-l09-e1',
          type: 'qcm',
          difficulty: 'facile',
          question: "JSX est…",
          options: [
            'une extension de syntaxe qui ressemble à du HTML, utilisable dans du JavaScript',
            'un langage de style',
            'un serveur web',
            'une base de données',
          ],
          answer: 0,
          explanation: "JSX (JavaScript XML) permet d'écrire des balises dans du JavaScript, comme dans le `return` d'un composant. Ce n'est ni du CSS (un langage de style), ni un serveur, ni une base de données.",
        },
        {
          id: 'm02-l09-e2',
          type: 'debug',
          difficulty: 'intermédiaire',
          language: 'jsx',
          question: "Ce composant contient deux erreurs JSX. Trouvez-les et corrigez-le.",
          template: `function Message() {
  return (
    <h1 class="titre">Salut</h1>
    <p>Bienvenue</p>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<Message />);
`,
          solution: `function Message() {
  return (
    <div>
      <h1 className="titre">Salut</h1>
      <p>Bienvenue</p>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<Message />);`,
          mustContain: ['className', '<div>'],
          hint: "Un attribut du HTML n'existe pas tel quel en JSX, et le return n'accepte qu'une seule balise racine.",
          explanation: "`class` n'est pas un attribut JSX : il faut `className`. Et les deux éléments (`h1` et `p`) sont racines côte à côte : ils doivent être enveloppés dans un `div` unique pour que le JSX reste valide.",
        },
        {
          id: 'm02-l09-e3',
          type: 'short',
          difficulty: 'avancé',
          question: "Quel attribut remplace class dans le JSX ?",
          accepted: ['classname', 'class name'],
          explanation: "En JSX, l'attribut s'écrit `className` (« nom de classe » en camelCase), car `class` est un mot réservé en JavaScript. C'est la seule différence à retenir avec le HTML pour l'instant.",
        },
      ],
    },
  ],
};
