import type { Module } from '../types';

export const module18: Module = {
  id: 'm18',
  number: 18,
  icon: '🛠️',
  title: 'Projets pratiques',
  description: 'Méthode, git, déploiement et checklist qualité pour mener vos projets à bien.',
  level: 'Avancé',
  lessons: [
    // ============================================================
    // Leçon 1 — Méthode pour réaliser un projet
    // ============================================================
    {
      id: 'm18-l01',
      title: 'Méthode pour réaliser un projet',
      minutes: 10,
      objectives: [
        'Nommer les étapes d’un projet dans le bon ordre',
        'Expliquer le principe du MVP',
        'Construire un plan de projet sous forme de tableau',
      ],
      blocks: [
        {
          type: 'p',
          text: 'La fin de cette plateforme se joue en dix projets : le compteur, la calculatrice, la todo list et le gestionnaire de contacts pour prendre en main les composants, puis la météo avec une API, la gestion de produits et la gestion d’utilisateurs pour apprendre à parler au serveur. Viennent ensuite les grands défis : le tableau de bord admin, l’e-commerce, et enfin la gestion complète avec authentification et API. Chaque projet s’appuie sur le précédent.',
        },
        {
          type: 'p',
          text: 'Comment mener à bien tout cela ? En suivant une méthode : la même suite d’étapes, dans le même ordre, pour chaque projet. Ouvrir l’éditeur et taper au hasard fonctionne rarement au-delà du premier écran.',
        },
        { type: 'h', text: 'Explication simple' },
        {
          type: 'p',
          text: 'Une méthode, c’est une recette de cuisine : on ne l’invente pas à chaque plat. Elle évite la panique du milieu de projet (« je ne sais plus par où commencer »), évite les allers-retours inutiles et garantit qu’aucune étape essentielle n’est oubliée avant la livraison.',
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Comprendre : relire la demande, noter les fonctionnalités attendues et chercher les mots inconnus.',
            'Maquetter : dessiner l’écran sur papier — boîtes, boutons, champs — avant d’écrire une ligne de code.',
            'Découper : transformer le dessin en liste de petites tâches (structure, état, boutons, tests).',
            'Prioriser : commencer par la version minimale qui fonctionne, le MVP ; les détails viennent ensuite.',
            'Construire : coder tâche par tâche, en vérifiant souvent dans le navigateur.',
            'Vérifier : lancer les tests et le build, corriger les erreurs affichées dans la console.',
            'Livrer : déployer le site et écrire un README qui explique comment lancer le projet.',
          ],
        },
        {
          type: 'code',
          lang: 'javascript',
          code: 'const etapes = [\n  "Maquette sur papier",\n  "Structure du projet",\n  "État avec useState",\n  "Ajout et suppression",\n  "Tests",\n  "Déploiement",\n];\n\nconsole.log("Projet : Todo list");\netapes.forEach((etape, i) => {\n  console.log(i + 1 + ". " + etape);\n});',
          caption: 'Le plan d’un projet, sous forme de tableau',
        },
        {
          type: 'list',
          items: [
            'Lignes 1 à 8 : `etapes` est un tableau de chaînes de caractères ; chaque ligne est une tâche, dans l’ordre d’exécution.',
            'Ligne 10 : on affiche le titre du projet avant la liste.',
            'Lignes 11 à 13 : `forEach` parcourt le tableau ; le second paramètre `i` est l’indice de la tâche.',
            '`i + 1` parce que les indices commencent à 0 en JavaScript : la première tâche porte donc le numéro 1.',
            'Le `.` suivi d’un espace est ajouté entre le numéro et le texte pour former « 1. », « 2. », etc.',
          ],
        },
        {
          type: 'result',
          text: 'À la console : « Projet : Todo list » puis six lignes numérotées, de « 1. Maquette sur papier » à « 6. Déploiement ». Vous avez un plan : il ne reste plus qu’à cocher chaque ligne au fur et à mesure.',
        },
        {
          type: 'mistake',
          text: 'Commencer par les détails — couleurs, polices, animations — avant d’avoir la fonctionnalité principale qui fonctionne.',
          fix: 'Faites d’abord marcher le cas principal (« ajouter une tâche »), puis embellissez : c’est le principe du MVP, la version minimale qui prouve que le projet vit.',
        },
        {
          type: 'quote',
          text: 'Résumé : un projet réussi suit une méthode stable — comprendre, maquetter, découper, prioriser, construire, vérifier, livrer. Les dix projets de la plateforme, du compteur à la gestion complète avec authentification et API, suivent exactement cette démarche.',
        },
      ],
      exercises: [
        {
          id: 'm18-l01-e1',
          type: 'qcm',
          difficulty: 'facile',
          question: 'Quelle est la première étape de la méthode présentée ?',
          options: [
            'Déployer l’application sur Internet',
            'Choisir les polices et les couleurs',
            'Comprendre la demande et noter les fonctionnalités attendues',
            'Écrire tous les tests à la toute fin',
          ],
          answer: 2,
          explanation:
            'Tout commence par la compréhension : tant que les fonctionnalités attendues ne sont pas notées, on construit au hasard. Le déploiement est la dernière étape, et les tests se font au fil de l’eau (étape « Vérifier »), pas uniquement à la fin. Les polices et couleurs relèvent de la maquette, troisième étape, jamais de la première.',
        },
        {
          id: 'm18-l01-e2',
          type: 'short',
          difficulty: 'intermédiaire',
          question:
            'Comment appelle-t-on la version minimale d’un produit qui fonctionne déjà et qu’on livre en premier ?',
          accepted: ['mvp', 'produit viable minimum', 'minimum viable product', 'produit minimalement viable'],
          hint: 'Abréviation anglaise de trois lettres, reprise telle quelle dans la leçon.',
          explanation:
            'Le MVP (Minimum Viable Product, ou produit viable minimum) est la plus petite version qui apporte une vraie valeur : elle permet de valider l’idée avant d’investir dans les détails. Dans la todo list, le MVP est l’ajout et la suppression d’une tâche ; le tri par couleur viendra après.',
        },
        {
          id: 'm18-l01-e3',
          type: 'code',
          difficulty: 'intermédiaire',
          language: 'js',
          question:
            'Écrivez le tableau `fonctionnalites` avec exactement ces trois chaînes, dans l’ordre : « Ajouter une tâche », « Cocher une tâche », « Supprimer une tâche ». Affichez-les numérotées avec `forEach`.',
          template:
            'const fonctionnalites = [\n  // vos trois chaînes ici\n];\n\nfonctionnalites.forEach((f, i) => {\n  // votre code ici\n});\n',
          solution:
            'const fonctionnalites = [\n  "Ajouter une tâche",\n  "Cocher une tâche",\n  "Supprimer une tâche",\n];\n\nfonctionnalites.forEach((f, i) => {\n  console.log(i + 1 + ". " + f);\n});\n',
          mustContain: ['fonctionnalites', 'forEach', 'console.log'],
          expectedOutput: '1. Ajouter une tâche\n2. Cocher une tâche\n3. Supprimer une tâche',
          hint: 'Dans le `forEach`, affichez `i + 1`, un point, un espace et la fonctionnalité `f`.',
          explanation:
            'Le tableau contient les trois chaînes demandées, dans l’ordre donné. `forEach` fournit à chaque tour `f` (la fonctionnalité) et `i` (l’indice, qui commence à 0) : `i + 1` produit 1, 2, 3, d’où les trois lignes numérotées affichées.',
        },
      ],
    },

    // ============================================================
    // Leçon 2 — Git et versionnement
    // ============================================================
    {
      id: 'm18-l02',
      title: 'Git et versionnement',
      minutes: 10,
      objectives: [
        'Expliquer le rôle de Git et d’un commit',
        'Enregistrer son travail avec add puis commit',
        'Éviter les pièges classiques du versionnement',
      ],
      blocks: [
        {
          type: 'p',
          text: 'Vous venez de terminer la todo list, mais votre ordinateur tombe en panne — ou vous cassez une fonctionnalité sans savoir revenir en arrière. Git est votre filet de sécurité : un journal de bord qui enregistre chaque version de votre projet.',
        },
        { type: 'h', text: 'Explication simple' },
        {
          type: 'p',
          text: 'Git est un outil de versionnement. Il conserve l’historique complet de vos fichiers : chaque enregistrement s’appelle un commit, une photo nommée du projet. Vous pouvez comparer deux versions, revenir en arrière, travailler sur une branche sans toucher au code principal, puis fusionner le tout. Le service GitHub stocke ces commits en ligne pour que votre travail soit en sécurité ailleurs que sur votre machine.',
        },
        {
          type: 'list',
          items: [
            'Un dépôt (repository) : le dossier de votre projet suivi par Git, créé avec `git init`.',
            'La zone de préparation (staging) : `git add` sélectionne les fichiers à enregistrer.',
            'Un commit : `git commit -m "message"` fige la sélection avec un message descriptif.',
            'L’historique : `git log` liste les commits, du plus récent au plus ancien.',
            'Une branche : `git switch -b feature-x` ouvre une ligne de travail parallèle, fusionnée ensuite avec `git merge`.',
            'Le fichier `.gitignore` liste les fichiers à ne jamais suivre : `node_modules`, `dist`.',
          ],
        },
        {
          type: 'code',
          lang: 'bash',
          code: 'git init\ngit add .\ngit commit -m "Initialisation : projet compteur"\ngit log --oneline',
          caption: 'Les quatre commandes qui démarrent un projet',
        },
        {
          type: 'list',
          items: [
            '`git init` : transforme le dossier courant en dépôt Git (il crée un dossier caché `.git` qui stocke l’historique).',
            '`git add .` : met en préparation tous les fichiers modifiés du dossier courant.',
            '`git commit -m "..."` : enregistre un commit avec un message qui décrit le changement ; le message doit être court et explicite.',
            '`git log --oneline` : affiche l’historique, un commit par ligne.',
            'Après chaque tranche de travail terminée : `git add`, puis `git commit`. On ne commit pas « au cas où » : on commit quand une fonctionnalité est finie.',
          ],
        },
        {
          type: 'result',
          text: 'Après les quatre commandes, `git log --oneline` affiche : `a1b2c3d Initialisation : projet compteur`. Le projet est enregistré : même si vous cassez tout demain, ce commit reste intact et vous pourrez y revenir.',
        },
        {
          type: 'mistake',
          text: 'Oublier le `.gitignore` et envoyer `node_modules/` — des milliers de fichiers — sur GitHub, ce qui rend le dépôt gigantesque et illisible.',
          fix: 'Créez un fichier `.gitignore` contenant les lignes `node_modules` et `dist` avant votre premier commit.',
        },
        {
          type: 'mistake',
          text: 'Faire un seul commit géant « tout le projet » : impossible de revenir uniquement au moment juste avant le bug.',
          fix: 'Commitez petit et souvent, une fonctionnalité à la fois, avec un message en français qui décrit ce qui a changé.',
        },
        {
          type: 'quote',
          text: 'Résumé : Git enregistre l’historique de votre projet en commits. L’ordre est toujours le même — `git add` pour sélectionner, `git commit` pour enregistrer — et un `.gitignore` protège le dépôt de `node_modules` et `dist`.',
        },
      ],
      exercises: [
        {
          id: 'm18-l02-e1',
          type: 'qcm',
          difficulty: 'facile',
          question: 'Quelle commande crée un dépôt Git dans le dossier courant ?',
          options: ['git start', 'git create', 'npm git', 'git init'],
          answer: 3,
          explanation:
            '`git init` (initialiser) transforme le dossier courant en dépôt Git en créant le dossier caché `.git`. `git start` et `git create` n’existent pas, et `npm git` n’a aucun sens : npm sert à lancer des scripts et à installer des paquets, pas à initialiser Git.',
        },
        {
          id: 'm18-l02-e2',
          type: 'fill',
          difficulty: 'intermédiaire',
          question: 'Écrivez la commande qui affiche l’historique des commits (une ligne par commit).',
          accepted: ['git log', 'gitlog', 'git log --oneline'],
          hint: 'La commande Git pour consulter un journal.',
          explanation:
            'C’est `git log`. Elle liste les commits du plus récent au plus ancien avec leur message ; l’option `--oneline` réduit l’affichage à une ligne par commit, pratique pour un aperçu rapide. Aucune autre commande ne sert à consulter l’historique.',
        },
        {
          id: 'm18-l02-e3',
          type: 'debug',
          difficulty: 'intermédiaire',
          question:
            'Vous souhaitez enregistrer le fichier `src/Compteur.jsx` avec le message « Ajout du composant Compteur ». Cette séquence échoue : trouvez les erreurs et réécrivez les commandes dans le bon ordre.',
          template: 'git commit -m "Ajout du composant Compteur"\ngit add Compteur.jsx\ngit log --oneline\n',
          solution: 'git add src/Compteur.jsx\ngit commit -m "Ajout du composant Compteur"\ngit log --oneline\n',
          mustContain: ['git add', 'git commit'],
          hint: 'Deux problèmes : l’ordre des deux premières commandes, et le chemin du fichier.',
          explanation:
            'Git refuse un commit sans fichier en préparation : il faut d’abord `git add src/Compteur.jsx` (sélectionner), puis `git commit -m "..."` (enregistrer). De plus, le chemin doit pointer vers l’emplacement réel du fichier, `src/Compteur.jsx` ; sinon Git répond « pathspec did not match », car `Compteur.jsx` n’existe pas à la racine. `git log --oneline`, lui, est correct en dernière position.',
        },
      ],
    },

    // ============================================================
    // Leçon 3 — Déploiement d'une application React
    // ============================================================
    {
      id: 'm18-l03',
      title: 'Déploiement d’une application React',
      minutes: 9,
      objectives: [
        'Expliquer la différence entre développement et production',
        'Générer le dossier de production avec npm run build',
        'Déployer un projet sur un hébergeur gratuit',
      ],
      blocks: [
        {
          type: 'p',
          text: 'Votre projet marche sur votre machine avec la commande `npm run dev`. Mais pour que vos amis, votre famille ou un recruteur puissent le voir, il faut le mettre en ligne : c’est le déploiement.',
        },
        { type: 'h', text: 'Explication simple' },
        {
          type: 'p',
          text: 'En développement, Vite sert votre application en direct, avec un vrai serveur qui recharge la page à chaque modification. En production, on génère une version statique : un dossier `dist` contenant du HTML, du CSS et du JavaScript optimisés, que n’importe quel hébergeur peut servir. L’opération tient en deux temps : builder (construire) chez vous, puis téléverser (déployer) chez l’hébergeur.',
        },
        {
          type: 'list',
          items: [
            '`npm run build` lance la construction et remplit le dossier `dist/`.',
            'Un hébergeur gratuit (Vercel, Netlify, GitHub Pages) reçoit votre code et met le site à disposition sur une adresse publique.',
            'La plupart des hébergeurs reconnaissent un projet Vite : commande de build `npm run build`, dossier de sortie `dist`.',
            'Après chaque modification validée, on relance le build et on redéploie : le site reste à jour.',
            'On vérifie toujours le résultat final dans un nouvel onglet, pas seulement en développement.',
          ],
        },
        {
          type: 'code',
          lang: 'bash',
          code: 'npm run build\n# Résultat : le dossier dist/ est créé\n# Sur le site de l’hébergeur :\n#   commande de build : npm run build\n#   dossier de sortie  : dist\n# Adresse finale : https://mon-todo-list.netlify.app',
          caption: 'Construire puis régler son hébergeur',
        },
        {
          type: 'list',
          items: [
            '`npm run build` exécute le script `build` du fichier `package.json`, généralement `vite build`.',
            'Vite optimise le code, regroupe les fichiers et écrit le résultat dans `dist/`.',
            'Les lignes commençant par `#` sont des commentaires : ce sont les réglages à saisir dans le formulaire de l’hébergeur.',
            '« commande de build » : la ligne que l’hébergeur exécutera sur son serveur, ici `npm run build`.',
            '« dossier de sortie » : l’endroit où se trouvent les fichiers produits, ici `dist`, jamais `src`.',
          ],
        },
        {
          type: 'result',
          text: 'Après le build, `dist/` contient `index.html` et un dossier `assets/` avec le JavaScript et le CSS optimisés. Une fois le dépôt connecté, l’application est accessible à l’adresse publique affichée par l’hébergeur, sur n’importe quel appareil connecté.',
        },
        {
          type: 'mistake',
          text: 'Tester uniquement en `npm run dev` puis déployer sans jamais lancer `npm run build` : une erreur de compilation reste invisible chez vous et casse le site en ligne.',
          fix: 'Lancez `npm run build` avant chaque déploiement, puis `npm run preview` pour ouvrir la version construite et la vérifier.',
        },
        {
          type: 'mistake',
          text: 'Envoyer le dossier `src` au lieu du dossier `dist` : l’hébergeur affiche une page vide ou une erreur 404, car `src` contient le code source, pas les fichiers prêts à servir.',
          fix: 'Vérifiez le réglage « dossier de sortie » : pour un projet Vite, c’est toujours `dist`.',
        },
        {
          type: 'quote',
          text: 'Résumé : déployer, c’est construire une version statique avec `npm run build` (dossier `dist`), puis la confier à un hébergeur qui la sert sur une adresse publique. On teste toujours le build avant de livrer.',
        },
      ],
      exercises: [
        {
          id: 'm18-l03-e1',
          type: 'qcm',
          difficulty: 'facile',
          question: 'Quelle commande génère la version prête à mettre en ligne ?',
          options: ['npm run build', 'npm run dev', 'npm test', 'npm install'],
          answer: 0,
          explanation:
            '`npm run build` produit le dossier `dist` optimisé destiné à la production. `npm run dev` sert au développement local et ne crée rien de déployable, `npm test` exécute les tests et `npm install` installe les paquets sans construire le site.',
        },
        {
          id: 'm18-l03-e2',
          type: 'short',
          difficulty: 'intermédiaire',
          question: 'Quel est, par défaut, le nom du dossier de sortie d’un build Vite ?',
          accepted: ['dist'],
          hint: 'Six lettres, c’est le raccourci de « distribution ».',
          explanation:
            'Le dossier `dist/` contient les fichiers produits par le build : `index.html`, le JavaScript et le CSS optimisés. C’est ce dossier, et non `src`, que l’hébergeur doit servir ; c’est aussi celui qu’on ajoute au `.gitignore`.',
        },
        {
          id: 'm18-l03-e3',
          type: 'fill',
          difficulty: 'intermédiaire',
          question:
            'Dans `package.json`, le champ qui contient les commandes à lancer (`dev`, `build`, `test`) s’appelle…',
          accepted: ['scripts', 'le champ scripts'],
          hint: 'Au pluriel, c’est le mot anglais pour « scripts ».',
          explanation:
            'Le champ `scripts` de `package.json` définit les raccourcis exécutables avec `npm run`. Par exemple `"build": "vite build"` permet d’écrire `npm run build` au lieu de taper `vite build`. Sans ce champ, l’hébergeur ne saurait pas comment construire votre projet.',
        },
      ],
    },

    // ============================================================
    // Leçon 4 — Checklist qualité avant livraison
    // ============================================================
    {
      id: 'm18-l04',
      title: 'Checklist qualité avant livraison',
      minutes: 9,
      objectives: [
        'Composer une checklist de livraison complète',
        'Vérifier tests, build, console et affichage mobile',
        'Contrôler que le dépôt est propre avant de livrer',
      ],
      blocks: [
        {
          type: 'p',
          text: 'Le site est en ligne, tout a l’air de marcher… et un mois plus tard vous découvrez qu’un bouton ne fonctionnait pas sur mobile. Une checklist de livraison sert à éviter cette mauvaise surprise : une liste de vérifications à faire systématiquement, dans le calme, avant de dire « c’est fini ».',
        },
        { type: 'h', text: 'Explication simple' },
        {
          type: 'p',
          text: 'La checklist s’appuie sur tout ce que vous avez appris : les tests du module précédent, le build, la console du navigateur, l’organisation du code. Elle se parcourt en dix minutes et protège des oublis classiques. Chaque ligne est à cocher — par vous ou par un pair — et la livraison n’a lieu que lorsque tout est coché.',
        },
        {
          type: 'list',
          items: [
            'Les fonctionnalités demandées sont toutes présentes : relire le cahier des charges ligne par ligne.',
            '`npm test` se termine sans échec.',
            '`npm run build` réussit, puis `npm run preview` affiche le site correctement.',
            'La console du navigateur ne montre ni erreur ni avertissement.',
            'L’application s’affiche correctement sur un petit écran (largeur 375 px).',
            'Aucun `console.log` de débogage ne reste dans le code livré.',
            'Le dépôt est propre : `.gitignore` présent, historique commité, README qui explique comment lancer le projet.',
          ],
        },
        {
          type: 'code',
          lang: 'javascript',
          code: 'const checklist = [\n  "Fonctionnalités du cahier des charges présentes",\n  "npm test sans échec",\n  "npm run build réussi",\n  "Console du navigateur vide",\n  "Affichage mobile correct",\n  "README rédigé",\n];\n\nconst valides = [true, true, true, false, true, false];\n\nchecklist.forEach((point, i) => {\n  const etat = valides[i] ? "[x]" : "[ ]";\n  console.log(etat + " " + point);\n});\n\nconsole.log("Points validés : " + valides.filter(Boolean).length + "/" + checklist.length);',
          caption: 'Une checklist qui compte les points restants',
        },
        {
          type: 'list',
          items: [
            'Lignes 1 à 8 : `checklist` est le tableau des points à vérifier, dans l’ordre.',
            'Ligne 10 : `valides` note l’état de chaque point, `true` (coché) ou `false` (encore à faire).',
            'Lignes 12 à 15 : `forEach` parcourt la checklist ; l’opérateur `? :` choisit `[x]` ou `[ ]` selon la valeur.',
            'Ligne 17 : `filter(Boolean)` ne garde que les `true`, puis `.length` les compte : 4 pour l’instant.',
            'Tant que ce total n’est pas égal à `checklist.length`, la livraison n’est pas prête.',
          ],
        },
        {
          type: 'result',
          text: 'À la console : six lignes avec leurs coches — quatre en `[x]`, deux en `[ ]` — puis « Points validés : 4/6 ». Deux points restent ouverts (console et README) : on ne livre pas encore.',
        },
        {
          type: 'mistake',
          text: 'Livrer parce que « ça a l’air de marcher », après un test rapide à la souris sur un seul écran.',
          fix: 'Parcourez la checklist complète, y compris le build et le passage en largeur 375 px : les oublis se cachent toujours dans les derniers points.',
        },
        {
          type: 'mistake',
          text: 'Garder les `console.log` de débogage dans le code livré : ils polluent la console et peuvent afficher des informations inutiles.',
          fix: 'Recherchez `console.log` dans `src/` avant de committer et supprimez ceux qui ne servaient qu’à investiguer.',
        },
        {
          type: 'quote',
          text: 'Résumé : une checklist de livraison vérifie les fonctionnalités, les tests, le build, la console, l’affichage mobile et la propreté du dépôt. Tant qu’un point n’est pas coché, ce n’est pas fini — et cela s’applique à vos dix projets, du compteur jusqu’à la gestion complète avec authentification et API.',
        },
      ],
      exercises: [
        {
          id: 'm18-l04-e1',
          type: 'qcm',
          difficulty: 'facile',
          question: 'Quand passez-vous la checklist qualité ?',
          options: [
            'Une fois le projet terminé, avant de dire que c’est livré',
            'Pendant l’écriture du tout premier composant',
            'Jamais : les tests automatiques suffisent',
            'Seulement quand le client se plaint',
          ],
          answer: 0,
          explanation:
            'La checklist est l’avant-dernière étape, juste avant la livraison : elle contrôle le résultat global (fonctionnalités, build, mobile, dépôt) quand les tests, eux, vérifient le code au fil de l’eau. La faire avant d’écrire le premier composant n’a aucun sens, et se contenter des tests oublie tout ce qu’ils ne couvrent pas (l’affichage mobile, le README).',
        },
        {
          id: 'm18-l04-e2',
          type: 'short',
          difficulty: 'intermédiaire',
          question:
            'Quel dossier ne doit jamais figurer dans un dépôt Git ni dans la version livrée ?',
          accepted: ['node_modules', 'node modules'],
          hint: 'C’est le dossier créé par `npm install`.',
          explanation:
            '`node_modules/` contient des milliers de fichiers téléchargés : il est régénéré par `npm install`, donc inutile à versionner et énorme à envoyer. C’est la première ligne du `.gitignore`. La version livrée, elle, se trouve dans `dist/`, qui est également ignoré par Git.',
        },
        {
          id: 'm18-l04-e3',
          type: 'code',
          difficulty: 'intermédiaire',
          language: 'js',
          question:
            'Écrivez une fonction `toutPasse(resultats)` qui prend un tableau de booléens et renvoie `true` seulement si tous les éléments sont `true`. Affichez le résultat pour `[true, true, true]` puis pour `[true, false, true]`.',
          template:
            'function toutPasse(resultats) {\n  // votre code ici\n}\n\nconsole.log(toutPasse([true, true, true]));\nconsole.log(toutPasse([true, false, true]));\n',
          solution:
            'function toutPasse(resultats) {\n  return resultats.every((r) => r === true);\n}\n\nconsole.log(toutPasse([true, true, true]));\nconsole.log(toutPasse([true, false, true]));\n',
          mustContain: ['function toutPasse', 'return', 'console.log'],
          expectedOutput: 'true\nfalse',
          hint: 'Les tableaux JavaScript proposent une méthode qui vérifie une condition sur tous les éléments : `every`.',
          explanation:
            '`resultats.every(...)` renvoie `true` uniquement si tous les éléments satisfont la condition. Le premier tableau ne contient que des `true`, donc `true` ; le second contient un `false`, donc `false`. C’est exactement le calcul de votre checklist : tant qu’un point reste à faire, la livraison n’est pas validée. Une boucle avec un retour `false` au premier `false` donnerait le même résultat.',
        },
      ],
    },
  ],
};
