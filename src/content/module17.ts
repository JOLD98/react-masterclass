import type { Module } from '../types';

export const module17: Module = {
  id: 'm17',
  number: 17,
  icon: '✅',
  title: 'Tests et bonnes pratiques',
  description: 'Testez vos composants avec Vitest et React Testing Library, déboguez comme un pro.',
  level: 'Avancé',
  lessons: [
    // ============================================================
    // Leçon 1 — Introduction aux tests
    // ============================================================
    {
      id: 'm17-l01',
      title: 'Introduction aux tests',
      minutes: 8,
      objectives: [
        'Expliquer à quoi sert un test',
        'Distinguer test unitaire, test d’intégration et test de bout en bout',
        'Écrire une première vérification à la main',
      ],
      blocks: [
        {
          type: 'p',
          text: 'Vous venez de terminer une fonction qui calcule le prix TTC d’un panier. Elle « a l’air » de marcher… mais en êtes-vous certain ? Un test, c’est le contrôle technique d’une voiture : on ne livre pas un véhicule sans l’avoir vérifié.',
        },
        { type: 'h', text: 'Explication simple' },
        {
          type: 'p',
          text: 'Un test est un petit programme que vous écrivez pour vérifier qu’une partie de votre code se comporte exactement comme prévu. Si le code change et casse quelque chose, le test échoue immédiatement : vous l’apprenez avant vos utilisateurs, pas après.',
        },
        {
          type: 'list',
          items: [
            'Test unitaire : on vérifie une seule fonction ou un seul composant isolément, comme on vérifie chaque brique avant de construire un mur.',
            'Test d’intégration : on vérifie que plusieurs morceaux fonctionnent ensemble, par exemple un formulaire qui appelle une fonction de calcul.',
            'Test de bout en bout (E2E) : on simule le parcours complet d’un utilisateur dans le vrai navigateur, de la page d’accueil jusqu’à la confirmation de commande.',
          ],
        },
        {
          type: 'code',
          lang: 'javascript',
          code: 'function calculerTVA(prix) {\n  return prix * 0.2;\n}\n\nconst obtenu = calculerTVA(100);\nconst attendu = 20;\n\nif (obtenu === attendu) {\n  console.log("OK : la TVA est correcte");\n} else {\n  console.log("ÉCHEC : attendu " + attendu + ", obtenu " + obtenu);\n}',
          caption: 'Un premier test, écrit à la main',
        },
        {
          type: 'list',
          items: [
            'Lignes 1 à 3 : la fonction `calculerTVA` multiplie le prix par 0,2, soit 20 % de TVA.',
            'Ligne 5 : on appelle la fonction avec un prix de 100 et on stocke le résultat dans `obtenu`.',
            'Ligne 6 : on écrit la valeur qu’on attend, ici 20.',
            'Lignes 8 à 11 : on compare `obtenu` et `attendu`. Si les deux valeurs sont identiques, on affiche « OK », sinon on affiche ce qui ne va pas.',
            'Le test est « vert » tant que le code donne le bon résultat ; il devient « rouge » dès que la logique casse.',
          ],
        },
        {
          type: 'result',
          text: 'À la console : « OK : la TVA est correcte ». Si vous changez `0.2` en `0.3`, le message devient « ÉCHEC : attendu 20, obtenu 30 ».',
        },
        {
          type: 'mistake',
          text: 'Ne tester que le cas facile : 100 × 0,2 fonctionne, mais que se passe-t-il avec un prix de 0 ou avec une valeur négative ?',
          fix: 'Ajoutez toujours deux ou trois cas limites : 0, un nombre décimal, une valeur négative.',
        },
        {
          type: 'mistake',
          text: 'Écrire le test une seule fois, puis ne plus jamais le relancer après une modification du code.',
          fix: 'Relancez vos tests après chaque changement : c’est exactement leur rôle, vous prévenir qu’une ancienne fonctionnalité est cassée.',
        },
        {
          type: 'quote',
          text: 'Résumé : un test est un programme qui vérifie que votre code donne le résultat attendu. On distingue les tests unitaires (une fonction), d’intégration (plusieurs morceaux ensemble) et de bout en bout (tout le parcours utilisateur).',
        },
      ],
      exercises: [
        {
          id: 'm17-l01-e1',
          type: 'qcm',
          difficulty: 'facile',
          question: 'Quel est le rôle d’un test ?',
          options: [
            'Modifier automatiquement la feuille de style CSS',
            'Compiler le projet et le mettre en ligne',
            'Vérifier que le code se comporte comme prévu',
            'Remplacer le navigateur web',
          ],
          answer: 2,
          explanation:
            'Un test est un programme qui compare le résultat obtenu au résultat attendu : il vérifie le comportement du code. Un test ne modifie pas le style (c’est le travail du CSS), ne met pas en ligne le projet (c’est le rôle du build et de l’hébergeur) et ne remplace pas le navigateur, qui reste l’endroit où l’application s’affiche réellement.',
        },
        {
          id: 'm17-l01-e2',
          type: 'short',
          difficulty: 'facile',
          question: 'Combien de niveaux de tests cette leçon présente-t-elle (unitaire, d’intégration, de bout en bout) ?',
          accepted: ['3', 'trois'],
          hint: 'C’est un nombre en chiffres ou en lettres.',
          explanation:
            'La leçon présente exactement trois niveaux : test unitaire, test d’intégration et test de bout en bout. Ils vont du plus petit périmètre (une fonction) au plus large (tout le parcours dans le navigateur).',
        },
        {
          id: 'm17-l01-e3',
          type: 'code',
          difficulty: 'intermédiaire',
          language: 'js',
          question:
            'Écrivez une fonction `estMajeur(age)` qui renvoie `true` si l’âge est supérieur ou égal à 18, sinon `false`. Affichez ensuite le résultat pour 20 ans et pour 15 ans avec `console.log`.',
          template:
            'function estMajeur(age) {\n  // votre code ici\n}\n\nconsole.log(estMajeur(20));\nconsole.log(estMajeur(15));\n',
          solution:
            'function estMajeur(age) {\n  return age >= 18;\n}\n\nconsole.log(estMajeur(20));\nconsole.log(estMajeur(15));\n',
          mustContain: ['function estMajeur', 'return', 'console.log'],
          expectedOutput: 'true\nfalse',
          hint: 'Comparez l’âge avec l’opérateur `>=` et renvoyez le résultat avec `return`.',
          explanation:
            'L’instruction `return age >= 18;` renvoie `true` dès que l’âge atteint 18, sinon `false`. `console.log(estMajeur(20))` affiche donc `true` et `console.log(estMajeur(15))` affiche `false` : les deux cas, passant et défaillant, sont vérifiés, ce qui est l’essentiel d’un test.',
        },
      ],
    },

    // ============================================================
    // Leçon 2 — Vitest
    // ============================================================
    {
      id: 'm17-l02',
      title: 'Vitest',
      minutes: 8,
      objectives: [
        'Décrire le rôle d’un exécuteur de tests',
        'Structurer un fichier de test avec describe, it et expect',
        'Lancer les tests de son projet',
      ],
      blocks: [
        {
          type: 'p',
          text: 'À la main, comparer les résultats avec des `if` devient vite pénible : relancer le projet, chercher le résultat, comparer les yeux dans l’écran. Vitest est l’outil qui exécute tous vos tests d’un seul coup et vous dit lequel passe et lequel échoue.',
        },
        { type: 'h', text: 'Explication simple' },
        {
          type: 'p',
          text: 'Vitest est un exécuteur de tests (en anglais test runner) conçu pour les projets qui utilisent Vite, le même outil qui lance votre application en développement. Vous écrivez vos tests dans des fichiers nommés `*.test.js`, vous lancez une commande, et Vitest affiche un rapport : vert pour les tests réussis, rouge pour ceux qui échouent.',
        },
        {
          type: 'list',
          items: [
            'Un fichier de test porte le suffixe `.test.js` ou `.test.jsx`, par exemple `panier.test.js`.',
            '`describe(...)` regroupe des tests qui portent sur la même chose : c’est un titre de section dans le rapport.',
            '`it(...)` (ou `test(...)`) décrit un seul comportement : « il doit… ».',
            '`expect(valeur).toBe(attendu)` compare le résultat obtenu à celui qu’on attend.',
            'La commande qui lance les tests est `npm test`, définie dans le champ `scripts` du fichier `package.json`.',
          ],
        },
        {
          type: 'code',
          lang: 'javascript',
          code: "import { describe, it, expect } from 'vitest';\nimport { additionner } from './math.js';\n\ndescribe('additionner', () => {\n  it('additionne deux positifs', () => {\n    expect(additionner(2, 3)).toBe(5);\n  });\n\n  it('gère les nombres négatifs', () => {\n    expect(additionner(-2, -3)).toBe(-5);\n  });\n});",
          caption: 'Un fichier math.test.js avec deux tests',
        },
        {
          type: 'list',
          items: [
            'Ligne 1 : on importe les trois outils de Vitest — `describe` pour regrouper, `it` pour un cas de test, `expect` pour l’assertion (la vérification).',
            'Ligne 2 : on importe la fonction à tester depuis le fichier `math.js`.',
            'Ligne 4 : `describe(\'additionner\', ...)` ouvre une section de rapport consacrée à cette fonction.',
            'Lignes 5 à 7 : le premier test vérifie que 2 + 3 donne bien 5.',
            'Lignes 9 à 11 : le second test vérifie le cas des nombres négatifs.',
            '`toBe(5)` compare avec égalité stricte : la valeur doit être exactement 5, sinon le test échoue.',
          ],
        },
        {
          type: 'result',
          text: 'Rapport de Vitest : deux tests verts, « 2 passed ». Si vous changez `additionner` pour qu’il renvoie `a - b`, les deux tests passent au rouge et Vitest affiche « 1 failed » avec la ligne exacte qui a échoué.',
        },
        {
          type: 'mistake',
          text: 'Oublier d’importer `describe`, `it` et `expect` depuis `vitest` : la console affiche alors « describe is not defined » et aucun test ne démarre.',
          fix: 'Ajoutez toujours `import { describe, it, expect } from \'vitest\';` en tête de chaque fichier de test.',
        },
        {
          type: 'mistake',
          text: 'Utiliser `toBe` pour comparer deux objets : `toBe({ a: 1 })` échoue même si les deux objets ont les mêmes propriétés, car ce n’est pas la même référence en mémoire.',
          fix: 'Utilisez `toEqual({...})` pour les objets et les tableaux, et `toBe` pour les nombres, les chaînes et les booléens.',
        },
        {
          type: 'quote',
          text: 'Résumé : Vitest exécute vos fichiers `*.test.js`. Chaque cas est écrit avec `describe` + `it` et vérifié avec `expect(...).toBe(...)` ; un rapport vert signifie que votre code fonctionne comme prévu.',
        },
      ],
      exercises: [
        {
          id: 'm17-l02-e1',
          type: 'qcm',
          difficulty: 'facile',
          question: 'Quel outil exécute automatiquement les fichiers `*.test.js` dans un projet Vite ?',
          options: ['CSS Grid', 'React Router', 'Vitest', 'React DOM'],
          answer: 2,
          explanation:
            'Vitest est l’exécuteur de tests conçu pour les projets Vite : il trouve les fichiers `*.test.js`, les exécute et affiche le rapport. CSS Grid est une technique de mise en page, React Router gère les adresses URL et React DOM affiche les composants : aucun de ces outils n’exécute de tests.',
        },
        {
          id: 'm17-l02-e2',
          type: 'fill',
          difficulty: 'facile',
          question:
            'Complétez le nom de la méthode qui compare avec égalité stricte : `expect(resultat).…(5)`.',
          accepted: ['tobe'],
          hint: 'Trois lettres, en camelCase, commençant par « to ».',
          explanation:
            'La méthode est `toBe`. Elle vérifie que la valeur obtenue est exactement celle attendue (égalité stricte, sans conversion de type) : `expect(2 + 3).toBe(5)` passe, alors que `expect("5").toBe(5)` échoue car le type diffère.',
        },
        {
          id: 'm17-l02-e3',
          type: 'code',
          difficulty: 'intermédiaire',
          language: 'js',
          question:
            'Écrivez une petite fonction `verifier(obtenu, attendu)` qui affiche `OK` si les deux valeurs sont égales, sinon `ÉCHEC`. Testez-la avec (10, 10) puis avec (10, 20).',
          template:
            'function verifier(obtenu, attendu) {\n  // votre code ici\n}\n\nverifier(10, 10);\nverifier(10, 20);\n',
          solution:
            "function verifier(obtenu, attendu) {\n  if (obtenu === attendu) {\n    console.log('OK');\n  } else {\n    console.log('ÉCHEC');\n  }\n}\n\nverifier(10, 10);\nverifier(10, 20);\n",
          mustContain: ['function verifier', '===', 'console.log'],
          expectedOutput: 'OK\nÉCHEC',
          hint: 'Comparez avec `===` puis affichez le message correspondant avec `console.log`.',
          explanation:
            'La fonction compare `obtenu` et `attendu` avec `===`. Premier appel : 10 === 10, donc « OK ». Deuxième appel : 10 !== 20, donc « ÉCHEC ». C’est exactement le mécanisme d’une assertion : comparer l’obtenu à l’attendu et signaler l’écart.',
        },
      ],
    },

    // ============================================================
    // Leçon 3 — React Testing Library
    // ============================================================
    {
      id: 'm17-l03',
      title: 'React Testing Library',
      minutes: 9,
      objectives: [
        'Expliquer la philosophie de React Testing Library',
        'Rendre un composant dans un test',
        'Retrouver un élément avec getByRole et getByText',
      ],
      blocks: [
        {
          type: 'p',
          text: 'Vous savez tester une fonction. Mais un composant React, comment le tester ? On ne peut pas l’appeler comme une fonction : il faut l’afficher dans une fausse page, puis vérifier ce que l’utilisateur voit à l’écran.',
        },
        { type: 'h', text: 'Explication simple' },
        {
          type: 'p',
          text: 'React Testing Library (RTL) est une bibliothèque qui insère votre composant dans une page de test, puis vous permet de chercher des éléments exactement comme un utilisateur le ferait : en lisant le texte affiché ou en repérant un bouton par son rôle. Sa philosophie est simple : testez ce que voit l’utilisateur, pas l’intérieur du composant.',
        },
        {
          type: 'list',
          items: [
            '`render(<MonComposant />)` insère le composant dans la page de test.',
            '`screen.getByText("...")` cherche un élément qui contient ce texte exact.',
            '`screen.getByRole("button")` cherche un élément qui a le rôle de bouton : c’est préférable, car cela vérifie aussi l’accessibilité.',
            '`screen.getByPlaceholderText("...")` cherche un champ de saisie grâce à son texte d’exemple.',
            '`getBy...` lève une erreur si rien n’est trouvé : le test échoue, et c’est voulu.',
          ],
        },
        {
          type: 'code',
          lang: 'jsx',
          code: "import { test } from 'vitest';\nimport { render, screen } from '@testing-library/react';\nimport Connexion from './Connexion.jsx';\n\ntest('le formulaire affiche son titre', () => {\n  render(<Connexion />);\n  screen.getByRole('heading', { name: 'Connexion' });\n});",
          caption: 'Tester le titre d’un formulaire de connexion',
        },
        {
          type: 'list',
          items: [
            'Ligne 1 : `test` vient de Vitest et déclare un cas de test.',
            'Ligne 2 : `render` et `screen` viennent de React Testing Library.',
            'Ligne 3 : on importe le composant à tester depuis son fichier.',
            'Ligne 5 : le titre du test décrit le comportement vérifié, en français.',
            'Ligne 6 : `render(<Connexion />)` affiche le composant dans la page de test.',
            'Ligne 7 : `getByRole(\'heading\', { name: \'Connexion\' })` cherche un titre (balise `h1` à `h6`) portant ce texte ; s’il est absent, une erreur est levée et le test échoue.',
          ],
        },
        {
          type: 'result',
          text: 'Le test passe si un titre « Connexion » existe dans le composant. Sinon, Vitest affiche l’erreur « Unable to find an accessible element with the role heading » et indique le contenu réel de la page, ce qui aide à comprendre ce qui manque.',
        },
        {
          type: 'mistake',
          text: 'Chercher les éléments avec `document.querySelector(".titre")` ou vérifier les classes CSS : le test casse dès que vous renommez une classe, sans que le contenu ait changé.',
          fix: 'Utilisez les sélecteurs de React Testing Library (`getByRole`, `getByText`) : ils dépendent de ce que l’utilisateur voit, pas de votre feuille de style.',
        },
        {
          type: 'mistake',
          text: 'Utiliser `getByText` pour un texte qui arrive après un chargement asynchrone : l’élément n’existe pas encore au moment de la vérification.',
          fix: 'Utilisez `await screen.findByText(...)`, qui attend que l’apparition ait lieu, avec un délai maximum.',
        },
        {
          type: 'quote',
          text: 'Résumé : React Testing Library rend votre composant dans une page de test et vous laisse le chercher comme un utilisateur : par le texte (`getByText`) ou par le rôle d’accessibilité (`getByRole`). Une recherche infructueuse lève une erreur : le test échoue.',
        },
      ],
      exercises: [
        {
          id: 'm17-l03-e1',
          type: 'qcm',
          difficulty: 'facile',
          question: 'Quelle est la philosophie de React Testing Library ?',
          options: [
            'Tester ce que l’utilisateur voit et fait',
            'Tester l’état interne et les variables du composant',
            'Tester uniquement la feuille de style CSS',
            'Remplacer Vitest pour exécuter les tests',
          ],
          answer: 0,
          explanation:
            'RTL pousse à vérifier le résultat visible : le texte affiché, la présence d’un bouton, l’effet d’un clic. Tester les variables internes rendrait le test fragile (un simple renommage le casserait) et ne prouve pas que l’écran est correct. RTL ne remplace pas Vitest : Vitest exécute les tests, RTL fournit les outils pour manipuler le composant.',
        },
        {
          id: 'm17-l03-e2',
          type: 'short',
          difficulty: 'intermédiaire',
          question:
            'Quelle méthode de `screen` cherche un élément par son rôle d’accessibilité, par exemple un bouton ?',
          accepted: ['getbyrole'],
          hint: '« get » + « by » + le mot anglais « rôle ».',
          explanation:
            'C’est `getByRole`. On l’emploie avec le libellé : `screen.getByRole("button", { name: "Valider" })`. C’est le sélecteur recommandé car il vérifie en même temps que l’élément possède bien le rôle attendu, ce qui participe à l’accessibilité de la page.',
        },
        {
          id: 'm17-l03-e3',
          type: 'fill',
          difficulty: 'intermédiaire',
          question:
            'Complétez l’import qui fournit `render` et `screen` : `import { render, screen } from "…";`',
          accepted: ['@testing-library/react', 'testing-library/react'],
          hint: 'Le nom du paquet commence par un @ et contient le mot « testing ».',
          explanation:
            'Le paquet est `@testing-library/react`. `render` monte le composant dans la page de test et `screen` donne accès à cette page pour y chercher des éléments. Les autres propositions sont faux : `vitest` fournit `test` et `expect`, et `react-dom` sert à afficher l’application dans le navigateur, pas à lancer des tests.',
        },
      ],
    },

    // ============================================================
    // Leçon 4 — Tester les composants
    // ============================================================
    {
      id: 'm17-l04',
      title: 'Tester les composants',
      minutes: 9,
      objectives: [
        'Tester le contenu affiché par un composant',
        'Vérifier l’usage des props et l’état initial',
        'Corriger un test de composant qui échoue',
      ],
      blocks: [
        {
          type: 'p',
          text: 'Place aux tests concrets. Un composant React présente deux choses à vérifier : ce qu’il affiche au départ (ses props et son état initial) et ce qui change ensuite quand on l’utilise.',
        },
        { type: 'h', text: 'Explication simple' },
        {
          type: 'p',
          text: 'Pour tester un composant, on le monte avec `render`, puis on cherche un élément avec `screen`. Deux familles de vérifications existent : le contenu (le texte affiché, la valeur d’un champ) et la structure (un bouton existe bien, un titre est bien un titre). Si la recherche échoue, React Testing Library lève une erreur et le test devient rouge.',
        },
        {
          type: 'list',
          items: [
            'Les props : on rend `<Salut nom="Alice" />` pour vérifier que le composant les utilise bien.',
            'L’état initial : on vérifie ce qui s’affiche avant toute interaction, par exemple « 0 » dans un compteur.',
            'L’absence : `queryBy...` renvoie `null` au lieu de lever une erreur, pratique pour vérifier qu’un message d’erreur n’apparaît pas encore.',
            'Un bon test décrit un comportement en français, par exemple « affiche le prénom reçu en prop ».',
          ],
        },
        {
          type: 'code',
          lang: 'jsx',
          code: "import { test, expect } from 'vitest';\nimport { render, screen } from '@testing-library/react';\nimport Salut from './Salut.jsx';\n\ntest('affiche le prénom reçu en prop', () => {\n  render(<Salut nom=\"Alice\" />);\n  expect(screen.getByText('Bonjour Alice')).toBeTruthy();\n});",
          caption: 'Un test qui vérifie l’affichage d’une prop',
        },
        {
          type: 'list',
          items: [
            'Ligne 1 : `test` et `expect` viennent de Vitest.',
            'Ligne 2 : `render` et `screen` viennent de React Testing Library.',
            'Ligne 3 : le composant `Salut` est importé depuis son propre fichier.',
            'Ligne 5 : le titre du test annonce ce qui va être vérifié.',
            'Ligne 6 : `render(<Salut nom="Alice" />)` monte le composant avec la prop `nom`.',
            'Ligne 7 : `screen.getByText(\'Bonjour Alice\')` lève une erreur si ce texte n’existe pas ; `expect(...).toBeTruthy()` confirme qu’un élément a bien été trouvé.',
          ],
        },
        {
          type: 'result',
          text: 'Si `Salut` affiche « Bonjour Alice », le test est vert. S’il affiche « Bonjour » sans le prénom, le test échoue avec le message « Unable to find an element with the text: Bonjour Alice » et liste le contenu réel du composant.',
        },
        {
          type: 'mistake',
          text: 'Rendre le composant sans les props qu’il exige : `<Salut />` alors que le composant attend `nom`, ce qui affiche « Bonjour undefined ».',
          fix: 'Montez le composant exactement comme l’application le fait, avec toutes les props nécessaires au comportement testé.',
        },
        {
          type: 'mistake',
          text: 'Tester un composant qui dépend du navigateur (`localStorage`, `fetch`) sans prévoir de faux : le test s’arrête avant même de vérifier quoi que ce soit.',
          fix: 'Isolez la logique dans des fonctions pures, faciles à tester sans navigateur, et gardez le composant mince.',
        },
        {
          type: 'quote',
          text: 'Résumé : tester un composant, c’est le rendre avec `render`, chercher un élément avec `screen` et affirmer sa présence avec `expect(...).toBeTruthy()`. On vérifie les props, l’état initial et le texte visible, jamais les variables internes.',
        },
      ],
      exercises: [
        {
          id: 'm17-l04-e1',
          type: 'qcm',
          difficulty: 'facile',
          question: 'Que se passe-t-il si `screen.getByText("Bonjour")` ne trouve aucun élément ?',
          options: [
            'Le test réussit silencieusement',
            'Le composant est automatiquement supprimé',
            'Une erreur est levée et le test échoue',
            'Vitest se ferme sans message',
          ],
          answer: 2,
          explanation:
            '`getBy...` est strict : il renvoie l’élément trouvé, sinon il lève une erreur. Vitest la transforme en test rouge avec un message explicite. C’est voulu : un test qui réussit sans rien vérifier serait dangereux, car il donnerait une fausse confiance.',
        },
        {
          id: 'm17-l04-e2',
          type: 'code',
          difficulty: 'intermédiaire',
          language: 'jsx',
          question:
            'Le composant `Badge` reçoit la prop `niveau` et affiche « Niveau : Avancé ». Écrivez le test qui le monte avec `niveau="Avancé"` et vérifie le texte affiché.',
          template:
            "import { test, expect } from 'vitest';\nimport { render, screen } from '@testing-library/react';\nimport Badge from './Badge.jsx';\n\ntest('affiche le niveau', () => {\n  // votre code ici\n});\n",
          solution:
            "import { test, expect } from 'vitest';\nimport { render, screen } from '@testing-library/react';\nimport Badge from './Badge.jsx';\n\ntest('affiche le niveau', () => {\n  render(<Badge niveau=\"Avancé\" />);\n  expect(screen.getByText('Niveau : Avancé')).toBeTruthy();\n});\n",
          mustContain: ['render(<Badge', 'getByText'],
          hint: 'Deux lignes suffisent : monter le composant, puis chercher le texte final.',
          explanation:
            'Le test doit d’abord monter le composant avec la prop attendue (`render(<Badge niveau="Avancé" />)`), sinon rien n’existe dans la page de test. Ensuite, `screen.getByText(\'Niveau : Avancé\')` cherche le texte complet affiché : si le composant oublie la prop ou affiche autre chose, la recherche échoue et le test devient rouge.',
        },
        {
          id: 'm17-l04-e3',
          type: 'debug',
          difficulty: 'intermédiaire',
          language: 'jsx',
          question:
            'Le composant `Compteur` affiche la valeur initiale du compteur dans un texte « 0 ». Ce test échoue alors que l’affichage est correct : trouvez les deux erreurs et corrigez le test.',
          template:
            "import { test, expect } from 'vitest';\nimport { render, screen } from '@testing-library/react';\nimport Compteur from './Compteur.jsx';\n\ntest('le compteur démarre à zéro', () => {\n  render(<Compteur />);\n  expect(screen.getByText(0)).toBe(0);\n});\n",
          solution:
            "import { test, expect } from 'vitest';\nimport { render, screen } from '@testing-library/react';\nimport Compteur from './Compteur.jsx';\n\ntest('le compteur démarre à zéro', () => {\n  render(<Compteur />);\n  expect(screen.getByText('0')).toBeTruthy();\n});\n",
          mustContain: ["getByText('0')", 'toBeTruthy'],
          hint: 'Deux détails ne vont pas : le type du texte recherché, et ce que l’on compare ensuite.',
          explanation:
            'Première erreur : le contenu affiché dans le DOM est la chaîne `"0"`, pas le nombre `0`, donc `getByText` doit recevoir une chaîne. Deuxième erreur : `getByText` renvoie un élément HTML, pas un nombre ; on vérifie donc sa présence avec `toBeTruthy()` au lieu de le comparer à `0`. Corrigé, le test confirme que le compteur démarre bien à zéro.',
        },
      ],
    },

    // ============================================================
    // Leçon 5 — Tester les interactions
    // ============================================================
    {
      id: 'm17-l05',
      title: 'Tester les interactions',
      minutes: 9,
      objectives: [
        'Simuler un clic avec userEvent',
        'Vérifier le nouveau contenu après une interaction',
        'Comprendre pourquoi l’attente (await) est nécessaire',
      ],
      blocks: [
        {
          type: 'p',
          text: 'Un compteur qui affiche 0, c’est bien. Mais son seul intérêt est d’être cliqué. Tester les interactions, c’est simuler les gestes de l’utilisateur — clics, saisies au clavier — puis vérifier que l’écran a bien changé.',
        },
        { type: 'h', text: 'Explication simple' },
        {
          type: 'p',
          text: 'React Testing Library fournit `userEvent`, une API qui reproduit fidèlement les actions humaines : `click` pour cliquer, `type` pour saisir du texte, `keyboard` pour les touches. Après l’action, on relit la page avec `screen` pour vérifier le nouveau contenu. Attention : la mise à jour de l’état est asynchrone, on attend donc avec `await`.',
        },
        {
          type: 'list',
          items: [
            'On récupère d’abord l’élément : `screen.getByRole("button", { name: "Incrémenter" })`.',
            '`await userEvent.click(bouton)` clique sur ce bouton, comme le ferait une souris ou un doigt.',
            '`await userEvent.type(champ, "alice@mail.fr")` tape du texte dans un champ de saisie.',
            'Ensuite seulement, on fait une nouvelle assertion sur le contenu affiché.',
          ],
        },
        {
          type: 'code',
          lang: 'jsx',
          code: "import { test, expect } from 'vitest';\nimport { render, screen } from '@testing-library/react';\nimport userEvent from '@testing-library/user-event';\nimport Compteur from './Compteur.jsx';\n\ntest('cliquer sur Incrémenter passe le compteur à 1', async () => {\n  render(<Compteur />);\n  const bouton = screen.getByRole('button', { name: 'Incrémenter' });\n  await userEvent.click(bouton);\n  expect(screen.getByText('1')).toBeTruthy();\n});",
          caption: 'Tester un clic sur un bouton de compteur',
        },
        {
          type: 'list',
          items: [
            'Ligne 3 : `userEvent` simule les gestes réels de l’utilisateur (clic, clavier).',
            'Ligne 6 : `async` apparaît car nous allons attendre une mise à jour d’état.',
            'Ligne 8 : le bouton est repéré par son rôle et son libellé visible.',
            'Ligne 9 : `await userEvent.click(bouton)` déclenche le clic, puis React met à jour l’affichage.',
            'Ligne 10 : on vérifie que le texte « 1 » est apparu ; s’il manque, `getByText` lève une erreur et le test échoue.',
          ],
        },
        {
          type: 'result',
          text: 'Le test est vert : le compteur affiche « 1 » après le clic. Si le bouton oublie d’appeler `setNombre(nombre + 1)`, l’écran reste à « 0 » et le test échoue, même si le composant ne provoque aucune erreur.',
        },
        {
          type: 'mistake',
          text: 'Cliquer puis vérifier sans `await` : la vérification part avant que React n’ait redessiné l’écran, et le test échoue de façon aléatoire.',
          fix: 'Écrivez `await userEvent.click(...)` et déclarez la fonction de test `async`.',
        },
        {
          type: 'mistake',
          text: 'Cibler le bouton avec une classe CSS fragile (`.btn-primary`) : le test casse au moindre changement de style.',
          fix: 'Utilisez `getByRole("button", { name: "Texte visible" })` : le test survit à un changement de couleurs ou de classes.',
        },
        {
          type: 'quote',
          text: 'Résumé : pour tester une interaction, on récupère l’élément avec `screen`, on agit avec `await userEvent.click(...)` ou `await userEvent.type(...)`, puis on vérifie le nouveau contenu affiché.',
        },
      ],
      exercises: [
        {
          id: 'm17-l05-e1',
          type: 'code',
          difficulty: 'intermédiaire',
          language: 'jsx',
          question:
            'Le composant `Tache` affiche une case à cocher libellée « Faire les courses ». Quand on la coche, il affiche en plus le texte « (fait) ». Écrivez le test : cochez la case, puis vérifiez le nouveau texte.',
          template:
            "import { test, expect } from 'vitest';\nimport { render, screen } from '@testing-library/react';\nimport userEvent from '@testing-library/user-event';\nimport Tache from './Tache.jsx';\n\ntest('cocher la case ajoute (fait)', async () => {\n  // votre code ici\n});\n",
          solution:
            "import { test, expect } from 'vitest';\nimport { render, screen } from '@testing-library/react';\nimport userEvent from '@testing-library/user-event';\nimport Tache from './Tache.jsx';\n\ntest('cocher la case ajoute (fait)', async () => {\n  render(<Tache />);\n  const caseACocher = screen.getByRole('checkbox', { name: 'Faire les courses' });\n  await userEvent.click(caseACocher);\n  expect(screen.getByText('(fait)')).toBeTruthy();\n});\n",
          mustContain: ['userEvent.click', 'checkbox', 'getByText'],
          hint: 'Quatre étapes : rendre, trouver la case, cliquer dessus, vérifier le nouveau texte.',
          explanation:
            'Le test monte `Tache`, repère la case à cocher par son rôle (`checkbox`) et son libellé, clique dessus avec `await userEvent.click(...)`, puis vérifie que le texte « (fait) » est maintenant affiché. Sans `await`, la vérification pourrait avoir lieu avant la mise à jour d’état ; sans `render`, la page de test serait vide.',
        },
        {
          id: 'm17-l05-e2',
          type: 'qcm',
          difficulty: 'intermédiaire',
          question: 'Pourquoi écrit-on `await userEvent.click(...)` dans un test ?',
          options: [
            'Parce que l’action est asynchrone et que React met à jour l’écran après',
            'Pour accélérer l’exécution du test',
            'Parce que tous les boutons sont obligatoirement asynchrones',
            'Pour éviter d’importer `render`',
          ],
          answer: 0,
          explanation:
            '`userEvent` renvoie une promesse : l’action puis la mise à jour de l’interface se terminent plus tard. Sans `await`, le test continue immédiatement et peut lire l’écran avant que React n’ait affiché le nouveau contenu, ce qui produit un échec instable. Les autres réponses sont fausses : `await` ne rend rien plus rapide et n’a aucun lien avec `render`.',
        },
        {
          id: 'm17-l05-e3',
          type: 'short',
          difficulty: 'intermédiaire',
          question: 'Quelle méthode de `userEvent` permet de taper du texte dans un champ de saisie ?',
          accepted: ['usertype', 'user.type', 'user type'],
          hint: '« user » suivi du mot anglais pour « taper ».',
          explanation:
            'C’est `userEvent.type(champ, "texte")`. Elle simule la frappe clavier caractère par caractère et déclenche les gestionnaires d’événements liés à la saisie. `userEvent.click` ne sert qu’à cliquer, et il n’existe pas de méthode `userEvent.write`.',
        },
      ],
    },

    // ============================================================
    // Leçon 6 — Déboguer une application
    // ============================================================
    {
      id: 'm17-l06',
      title: 'Déboguer une application',
      minutes: 8,
      objectives: [
        'Appliquer une méthode de débogage en cinq étapes',
        'Utiliser console.log pour tracer les valeurs',
        'Identifier une erreur de boucle et la corriger',
      ],
      blocks: [
        {
          type: 'p',
          text: 'Un bug, c’est un comportement inattendu : un nombre qui affiche `NaN`, un bouton qui ne réagit pas, une page blanche. Déboguer n’est pas une question de chance, c’est une question de méthode.',
        },
        { type: 'h', text: 'Explication simple' },
        {
          type: 'p',
          text: 'Déboguer consiste à réduire le problème jusqu’à le comprendre : reproduire l’erreur, isoler la ligne fautive, trouver la cause, corriger, puis relancer les tests pour vérifier qu’on n’a rien cassé ailleurs. Vos outils : `console.log` pour afficher les valeurs en chemin, `console.table` pour lire un tableau sous forme de tableau, et le mot-clé `debugger` qui met en pause l’exécution dans les outils du navigateur.',
        },
        {
          type: 'list',
          items: [
            'Étape 1 : reproduire l’erreur de façon fiable, la même action donnant le même bug.',
            'Étape 2 : afficher les valeurs intermédiaires avec `console.log` pour trouver où ça déraille.',
            'Étape 3 : isoler, en commentant des morceaux de code jusqu’à ne garder que le fautif.',
            'Étape 4 : corriger, puis relancer les tests pour éviter de casser une autre fonctionnalité.',
            'Étape 5 : chercher la cause, pas seulement le symptôme : masquer le symptôme reviendrait au même bug demain.',
          ],
        },
        {
          type: 'code',
          lang: 'javascript',
          code: "function moyenne(notes) {\n  console.log('notes : ' + notes.join(','));\n  let total = 0;\n  for (let i = 0; i <= notes.length; i++) {\n    total += notes[i];\n  }\n  return total / notes.length;\n}\n\nconsole.log(moyenne([10, 12, 14]));",
          caption: 'Un bug retrouvé grâce à console.log',
        },
        {
          type: 'list',
          items: [
            'Ligne 2 : `console.log(\'notes : \' + notes.join(\',\'))` affiche les notes reçues : on sait immédiatement si l’entrée est correcte.',
            'Lignes 3 à 6 : on additionne les notes dans la variable `total`.',
            'Ligne 4 : la boucle s’arrête à `i <= notes.length`, soit 3, alors que les indices vont de 0 à 2.',
            'À `i = 3`, `notes[3]` vaut `undefined` : `total + undefined` donne `NaN`, et tout le calcul devient `NaN`.',
            'Ligne 8 : le résultat affiché révèle le bug et indique où chercher.',
          ],
        },
        {
          type: 'result',
          text: 'À la console : « notes : 10,12,14 » puis « NaN ». La trace montre que les notes sont bonnes : le problème vient de la boucle, pas des données. En changeant `<=` en `<`, le résultat devient « 12 ».',
        },
        {
          type: 'mistake',
          text: 'Corriger le symptôme en écrivant `return isNaN(resultat) ? 0 : resultat` : le bug reste, simplement masqué.',
          fix: 'Corrigez la cause (la condition de boucle) et ajoutez un test qui vérifie que `moyenne([10, 12, 14])` vaut bien 12.',
        },
        {
          type: 'mistake',
          text: 'Laisser des `console.log` de débogage dans le code livré : ils polluent la console et distraient les personnes qui maintiennent le projet.',
          fix: 'Faites une recherche de `console.log` avant de livrer et supprimez ceux qui ne servaient qu’à investiguer.',
        },
        {
          type: 'quote',
          text: 'Résumé : déboguer suit une méthode — reproduire, tracer avec `console.log`, isoler, comprendre la cause, corriger, revérifier. Un `NaN` vient presque toujours d’une valeur absente ou d’une boucle qui déborde : affichez les valeurs intermédiaires pour le prouver.',
        },
      ],
      exercises: [
        {
          id: 'm17-l06-e1',
          type: 'qcm',
          difficulty: 'facile',
          question: 'Quelle est la bonne ordre de débogage ?',
          options: [
            'Attendre que le bug disparaisse tout seul',
            'Reproduire, isoler, comprendre la cause, corriger, revérifier',
            'Supprimer le fichier fautif et recommencer',
            'Reformuler le cahier des charges',
          ],
          answer: 1,
          explanation:
            'Le débogage efficace suit cette séquence : reproduire pour être sûr du problème, isoler la zone fautive, comprendre la cause profonde, corriger, puis revérifier (tests et console). Attendre, supprimer ou reformuler ne résolvent rien : le bug subsisterait.',
        },
        {
          id: 'm17-l06-e2',
          type: 'debug',
          difficulty: 'avancé',
          language: 'js',
          question:
            'La fonction `prixTTC` doit renvoyer le prix TTC : pour 100 € HT avec une TVA de 20 %, elle doit afficher 120. Elle affiche actuellement 2000. Trouvez les deux erreurs et corrigez.',
          template:
            'function prixTTC(prixHT) {\n  const tva = 20;\n  return prixHT * tva;\n}\n\nconsole.log(prixTTC(100));\n',
          solution:
            'function prixTTC(prixHT) {\n  const tva = 0.2;\n  return prixHT * (1 + tva);\n}\n\nconsole.log(prixTTC(100));\n',
          mustContain: ['function prixTTC', 'return', 'console.log'],
          expectedOutput: '120',
          hint: 'Deux détails : la forme de la valeur de la TVA, et l’opération qui calcule le TTC.',
          explanation:
            'Première erreur : `tva` vaut 20 alors que la TVA s’exprime en fraction, 0.2 pour 20 %. Deuxième erreur : multiplier directement par la TVA donne la taxe seule (100 × 0.2 = 20), pas le prix TTC. Il faut multiplier par `1 + tva`, soit 100 × 1.2 = 120 : le test affiche maintenant « 120 ».',
        },
        {
          id: 'm17-l06-e3',
          type: 'short',
          difficulty: 'intermédiaire',
          question:
            'Quel mot-clé, placé dans le code, met en pause l’exécution dans les outils du navigateur pour inspecter les valeurs ?',
          accepted: ['debugger'],
          hint: 'Il s’écrit en anglais et commence par « debug ».',
          explanation:
            'Le mot-clé `debugger` arrête l’exécution à cet endroit et ouvre l’onglet Sources des outils de développement, où l’on peut lire les variables pas à pas. C’est l’équivalent interactif d’un `console.log`, à retirer du code livré une fois le bug corrigé.',
        },
      ],
    },

    // ============================================================
    // Leçon 7 — Organisation professionnelle du code
    // ============================================================
    {
      id: 'm17-l07',
      title: 'Organisation professionnelle du code',
      minutes: 8,
      objectives: [
        'Structurer les dossiers d’un projet React',
        'Placer composants, pages, hooks, services et utils',
        'Ranger les tests à côté du code qu’ils testent',
      ],
      blocks: [
        {
          type: 'p',
          text: 'Votre premier projet tenait dans un seul fichier `App.jsx`. Au bout de la dixième fonctionnalité, impossible de retrouver quoi que ce soit. Les équipes professionnelles organisent leur code pour que n’importe qui — vous, dans trois mois — sache où ouvrir en quelques secondes.',
        },
        { type: 'h', text: 'Explication simple' },
        {
          type: 'p',
          text: 'Organiser, c’est donner une place à chaque chose : un composant = un fichier, les tests à côté de ce qu’ils testent, les appels réseau dans un dossier `services`, les petites fonctions utilitaires dans `utils`, et les grands écrans du routeur dans `pages`. L’objectif est simple : pour modifier quoi que ce soit, vous savez immédiatement dans quel dossier aller.',
        },
        {
          type: 'list',
          items: [
            '`components/` : les blocs réutilisables (Bouton, Carte, EnTete).',
            '`pages/` : les écrans complets, un par adresse URL (Accueil, Produits, Panier).',
            '`hooks/` : vos propres hooks (usePanier, useUtilisateur).',
            '`services/` : tout ce qui parle au réseau, les appels `fetch` et les adresses d’API.',
            '`utils/` : fonctions pures sans React (formaterPrix, calculerTVA).',
            'Un test se place dans le même dossier que ce qu’il teste : `Carte.test.jsx` à côté de `Carte.jsx`.',
          ],
        },
        {
          type: 'code',
          lang: 'text',
          code: 'src/\n├── components/\n│   ├── Carte.jsx\n│   └── Carte.test.jsx\n├── pages/\n│   ├── Accueil.jsx\n│   └── Produits.jsx\n├── hooks/\n│   └── usePanier.js\n├── services/\n│   └── api.js\n└── utils/\n    └── formaterPrix.js',
          caption: 'Une arborescence de projet React professionnelle',
        },
        {
          type: 'list',
          items: [
            '`src/components/` contient les petits blocs réutilisables et leurs tests, qui voyagent ensemble.',
            '`src/pages/` regroupe les fichiers plus gros, qui assemblent les composants pour former un écran.',
            '`src/hooks/usePanier.js` centralise la logique du panier, réutilisable dans plusieurs pages.',
            '`src/services/api.js` concentre toutes les adresses d’API : une seule modification suffit si le serveur change.',
            '`src/utils/formaterPrix.js` transforme 12 en « 12,00 € » : une fonction pure, testable sans React.',
          ],
        },
        {
          type: 'result',
          text: 'Pour changer l’affichage d’un prix, vous ouvrez `utils/formaterPrix.js` ; pour ajouter un écran, vous créez un fichier dans `pages/` ; pour retrouver le test d’un composant, il est à côté de lui. Fini la chasse au trésor.',
        },
        {
          type: 'mistake',
          text: 'Entasser tous les composants dans `App.jsx` : le fichier dépasse 500 lignes et personne n’ose plus y toucher.',
          fix: 'Dès qu’un composant dépasse une centaine de lignes ou sert plusieurs fois, sortez-le dans son propre fichier de `components/`.',
        },
        {
          type: 'mistake',
          text: 'Créer un dossier pour chaque idée : `helpers2/`, `misc/`, `new/`, `tmp/`. L’arborescence devient illisible en deux semaines.',
          fix: 'Adoptez une arborescence courte et stable — `components`, `pages`, `hooks`, `services`, `utils` — et placez-y tout le reste.',
        },
        {
          type: 'quote',
          text: 'Résumé : un projet professionnel suit une arborescence stable — components, pages, hooks, services, utils — avec les tests à côté du code testé. Chaque chose a sa place, et chaque fichier a une seule responsabilité.',
        },
      ],
      exercises: [
        {
          id: 'm17-l07-e1',
          type: 'qcm',
          difficulty: 'facile',
          question:
            'Où placez-vous la fonction `formaterPrix`, qui transforme 12 en « 12,00 € » et n’utilise pas React ?',
          options: ['Dans components/', 'Dans utils/', 'Dans le fichier App.jsx', 'Dans services/'],
          answer: 1,
          explanation:
            '`utils/` est réservé aux fonctions pures, sans interface ni accès réseau : `formaterPrix` en fait partie. `components/` contient des composants JSX affichés à l’écran, `services/` contient les appels `fetch`, et tout mettre dans `App.jsx` est précisément ce qu’il faut éviter.',
        },
        {
          id: 'm17-l07-e2',
          type: 'fill',
          difficulty: 'intermédiaire',
          question: 'Dans quel dossier range-t-on les appels `fetch` vers une API et les adresses du serveur ?',
          accepted: ['services', 'service', 'le dossier services'],
          hint: 'Au pluriel, c’est le mot anglais pour « services ».',
          explanation:
            'Le dossier `services/` (souvent `api.js` à l’intérieur) centralise tout ce qui communique avec le réseau. Centraliser ces appels permet de changer d’adresse de serveur à un seul endroit, et de les remplacer par des données factices lors des tests.',
        },
        {
          id: 'm17-l07-e3',
          type: 'short',
          difficulty: 'intermédiaire',
          question:
            'Quel est le nom exact du fichier qui contient le test du composant `Accueil.jsx` ?',
          accepted: ['accueil.test.jsx'],
          hint: 'Le nom du composant, puis le suffixe de test, puis l’extension JSX.',
          explanation:
            'Le test se place dans le même dossier que le composant et reprend son nom avec le suffixe `.test.jsx` : `Accueil.test.jsx`. Ainsi, ouvrir un composant vous montre immédiatement son test à côté, et les outils de test trouvent automatiquement le fichier grâce au suffixe.',
        },
      ],
    },

    // ============================================================
    // Leçon 8 — Bonnes pratiques de développement
    // ============================================================
    {
      id: 'm17-l08',
      title: 'Bonnes pratiques de développement',
      minutes: 9,
      objectives: [
        'Appliquer le principe DRY et la responsabilité unique',
        'Découper un composant trop gros en sous-composants',
        'Repérer et corriger les mauvaises habitudes',
      ],
      blocks: [
        {
          type: 'p',
          text: 'Vous savez tester, déboguer et organiser vos dossiers. Reste la discipline quotidienne : ces habitudes séparent un code qui « marche » d’un code que l’on peut faire évoluer sans crainte.',
        },
        { type: 'h', text: 'Explication simple' },
        {
          type: 'p',
          text: 'Une bonne pratique est une règle simple que toute l’équipe adopte pour que le code reste lisible : nommer les choses clairement, découper les grosses fonctions, n’écrire qu’une seule façon de faire la même chose, garder l’état au minimum, commenter le pourquoi plutôt que le quoi, et vérifier son travail avec des tests.',
        },
        {
          type: 'list',
          items: [
            'DRY (Don’t Repeat Yourself) : si un même morceau de code apparaît deux fois, extrayez-le dans une fonction ou un composant unique.',
            'Responsabilité unique : une fonction fait une seule chose et la fait bien.',
            'Noms explicites : `ageUtilisateur` plutôt que `x`, `ajouterTache` plutôt que `faire1`.',
            'État minimal : ne stockez dans `useState` que ce qui change à l’affichage ; le reste se recalcule à la volée.',
            'Commentez le pourquoi : « on arrondit car le prix vient d’une API en virgule flottante ».',
            'Le code mort (commenté ou inutilisé) se supprime : un commentaire obscur qui traîne ralentit la lecture.',
          ],
        },
        {
          type: 'code',
          lang: 'jsx',
          code: '// Un composant qui cumule plusieurs responsabilités\nfunction Produit({ nom, prix, ajouterAuPanier }) {\n  return (\n    <article>\n      <h3>{nom}</h3>\n      <p>Prix : {prix} €</p>\n      <button onClick={ajouterAuPanier}>Ajouter au panier</button>\n    </article>\n  );\n}\n\n// Découpage : chaque bloc a une seule responsabilité\nfunction TitreProduit({ nom }) {\n  return <h3>{nom}</h3>;\n}\n\nfunction BoutonAjouter({ ajouterAuPanier }) {\n  return <button onClick={ajouterAuPanier}>Ajouter au panier</button>;\n}',
          caption: 'Avant / après : découper un composant',
        },
        {
          type: 'list',
          items: [
            'Lignes 1 à 9 : le premier composant cumule titre, prix et bouton ; il fonctionne, mais deviendra difficile à faire évoluer et à tester.',
            'Lignes 12 à 14 : `TitreProduit` n’affiche qu’un titre : un seul motif de changement, un test très court.',
            'Lignes 16 à 18 : `BoutonAjouter` ne gère qu’un clic : on peut le tester isolément, puis le réutiliser ailleurs.',
            'Le parent reste lisible : il assemble les morceaux au lieu de détailler chacun d’eux.',
          ],
        },
        {
          type: 'result',
          text: 'Chaque composant tient en quelques lignes, se teste en une ligne et se réutilise ailleurs. Si demain le bouton change de texte ou de comportement, un seul fichier bouge : le reste du projet reste intact.',
        },
        {
          type: 'mistake',
          text: 'Recopier-coller le même bloc dans trois composants : la première correction devra être refaite trois fois, et une oubliée.',
          fix: 'Appliquez DRY : extrayez le bloc dans un composant ou une fonction unique, puis réutilisez-la partout.',
        },
        {
          type: 'mistake',
          text: 'Laisser du code cassé en commentaire (`// ancienne version`) sous prétexte de le garder « au cas où ».',
          fix: 'Supprimez-le : du code mort qui ne sert plus embrouille plus qu’il n’aide. Si vous en avez besoin un jour, vous le réécrirez en quelques lignes.',
        },
        {
          type: 'quote',
          text: 'Résumé : les bonnes pratiques tiennent en quelques principes — DRY, responsabilité unique, noms explicites, état minimal, commentaires qui expliquent le pourquoi, aucun code mort. Elles rendent le code testable, lisible et facile à faire évoluer.',
        },
      ],
      exercises: [
        {
          id: 'm17-l08-e1',
          type: 'qcm',
          difficulty: 'facile',
          question: 'Parmi ces habitudes, laquelle est la MOINS recommandée ?',
          options: [
            'Découper les grosses fonctions en petites fonctions',
            'Laisser des `console.log` de débogage dans le code livré',
            'Commenter le pourquoi des décisions étranges',
            'Écrire des tests avant de livrer',
          ],
          answer: 1,
          explanation:
            'Les `console.log` de débogage n’ont pas leur place dans une livraison : ils encombrent la console et peuvent exposer des informations inutiles. Découper, commenter le pourquoi et tester sont au contraire les trois piliers des bonnes pratiques présentés dans cette leçon.',
        },
        {
          id: 'm17-l08-e2',
          type: 'debug',
          difficulty: 'intermédiaire',
          language: 'jsx',
          question:
            'Ce fichier contient deux erreurs de bonnes pratiques : React ne peut pas utiliser ce composant tel quel, et une variable inutile traîne. Corrigez les deux.',
          template:
            'function carte({ nom }) {\n  const inutile = 42;\n  return <h2>{nom}</h2>;\n}\n\nReactDOM.createRoot(document.getElementById("root")).render(<carte nom="Alice" />);\n',
          solution:
            'function Carte({ nom }) {\n  return <h2>{nom}</h2>;\n}\n\nReactDOM.createRoot(document.getElementById("root")).render(<Carte nom="Alice" />);\n',
          mustContain: ['function Carte', '<Carte'],
          hint: 'Regardez la casse du nom de fonction, et la ligne qui déclare une variable jamais utilisée.',
          explanation:
            'Première erreur : un composant React doit commencer par une majuscule, sinon React le considère comme une balise HTML inconnue ; la fonction `carte` devient `Carte`, et le JSX `<carte>` devient `<Carte>`. Deuxième erreur : `inutile` est déclarée mais jamais lue, c’est du code mort à supprimer. Le composant affiche alors « Alice » dans un `h2`.',
        },
        {
          id: 'm17-l08-e3',
          type: 'short',
          difficulty: 'facile',
          question:
            'Quelle abréviation anglaise désigne le principe « ne répétez jamais le même code » ?',
          accepted: ['dry'],
          hint: 'Trois lettres, les initiales de « Don’t Repeat Yourself ».',
          explanation:
            'DRY signifie « Don’t Repeat Yourself ». Ce principe impose d’extraire tout code dupliqué dans un seul endroit, pour qu’une correction soit faite une seule fois. Son contraire est parfois appelé WET (« Write Everything Twice »), à éviter.',
        },
      ],
    },
  ],
};
