import type { Module } from '../types';

export const module04: Module = {
  id: 'm04',
  number: 4,
  title: 'JSX en profondeur',
  description: 'Maîtrisez la syntaxe JSX : texte, variables, expressions, conditions et classes CSS.',
  icon: '🏷️',
  level: 'Débutant',
  lessons: [
    {
      id: 'm04-l01',
      title: 'Syntaxe JSX',
      minutes: 8,
      objectives: [
        'Définir le JSX et son rôle',
        'Reconnaître une balise JSX bien formée',
        'Respecter la règle de la balise racine',
      ],
      blocks: [
        {
          type: 'p',
          text: "Depuis vos premiers composants, vous écrivez du code qui ressemble à du HTML à l’intérieur de JavaScript. Cette syntaxe s’écrit avec ses propres règles : le JSX. Connaître ces règles vous évitera les erreurs les plus fréquentes au quotidien.",
        },
        { type: 'h', text: 'Explication simple' },
        {
          type: 'p',
          text: "JSX signifie JavaScript XML : c’est une façon d’écrire du HTML dans vos fichiers JavaScript. Le JSX n’est pas compris directement par le navigateur : Vite le transforme en appels de fonction JavaScript avant le lancement. Ensuite, le JSX suit des règles précises, reprises du HTML.",
        },
        {
          type: 'list',
          items: [
            'Chaque balise ouvrante doit avoir sa balise fermante : `<p></p>`.',
            'Une balise sans enfant se ferme avec un slash : `<img />`, `<br />`.',
            'Tout le JSX d’un `return` doit être contenu dans une seule balise racine.',
            'Une majuscule au début signale un composant, une minuscule une balise HTML.',
            'Les attributs s’écrivent en camelCase, par exemple `className` (voir plus bas).',
          ],
        },
        {
          type: 'code',
          lang: 'jsx',
          code: "function Page() {\n  return (\n    <div>\n      <h1>Ma page</h1>\n      <p>Un paragraphe.</p>\n      <img src=\"photo.jpg\" alt=\"Paysage\" />\n    </div>\n  );\n}",
          caption: 'Un JSX bien formé : balises fermées, une seule racine',
        },
        {
          type: 'list',
          items: [
            'Ligne 1 : `function Page()` déclare le composant qui contient tout le JSX.',
            'Lignes 3 à 7 : le `div` est la balise racine : tout est dedans.',
            'Ligne 4 : `<h1>` est ouvert puis fermé par `</h1>`.',
            'Ligne 6 : `<img />` n’a pas d’enfant, elle se ferme avec `/>`.',
            'Ligne 7 : `</div>` referme la racine, puis la parenthèse du `return` se ferme.',
          ],
        },
        { type: 'result', text: "À l’écran : un titre « Ma page », un paragraphe « Un paragraphe. » et l’image `photo.jpg`." },
        {
          type: 'mistake',
          text: "Oublier de fermer une balise, par exemple écrire `<p>Bonjour` sans `</p>`.",
          fix: "Fermer chaque balise ouverte ; pour les vides, utiliser l’auto-fermure `/>`.",
        },
        {
          type: 'mistake',
          text: "Deux balises racines côte à côte : `return <h1>Titre</h1> <p>Texte</p>;`.",
          fix: "Envelopper le tout dans un conteneur unique : `<div><h1>…</h1><p>…</p></div>`.",
        },
        {
          type: 'quote',
          text: "Résumé : le JSX écrit du HTML dans JavaScript ; il faut fermer chaque balise, auto-fermer les vides et n’avoir qu’une seule balise racine.",
        },
      ],
      exercises: [
        {
          id: 'm04-l01-e1',
          type: 'qcm',
          difficulty: 'facile',
          question: 'Comment ferme-t-on une balise JSX qui n’a pas de contenu ?',
          options: ['Avec `</img>`', 'Avec `/>` à la fin', 'On n’a pas besoin de la fermer', 'Avec un point-virgule'],
          answer: 1,
          hint: 'La balise se termine par un slash suivi de l’accolade.',
          explanation:
            "Une balise sans enfant s’auto-ferme avec `/>` : c’est la règle JSX reprise du XML. `</img>` est une balise fermante sans ouvrante, « ne pas fermer » provoque une erreur de syntaxe, et le point-virgule termine une instruction JavaScript, pas une balise.",
        },
        {
          id: 'm04-l01-e2',
          type: 'short',
          difficulty: 'facile',
          question: 'Quel suffixe de fichier contient généralement du JSX dans un projet Vite ?',
          accepted: ['jsx', '.jsx'],
          hint: 'C’est le nom du langage lui-même.',
          explanation:
            "Les composants sont écrits dans des fichiers `.jsx` (ou `.tsx` dans un projet TypeScript) : l’extension indique à l’outil que le fichier contient du JSX à transformer. `.js` classique peut contenir du JSX aussi, mais la convention Vite est `.jsx`.",
        },
        {
          id: 'm04-l01-e3',
          type: 'code',
          difficulty: 'intermédiaire',
          language: 'jsx',
          question:
            "Créez un composant `Fiche` qui affiche, dans un `div` unique, un titre `h1` « Ma fiche » et un paragraphe « Prénom : Léa ».",
          template: "function Fiche() {\n  // votre code ici\n}\n",
          solution:
            "function Fiche() {\n  return (\n    <div>\n      <h1>Ma fiche</h1>\n      <p>Prénom : Léa</p>\n    </div>\n  );\n}\n\nReactDOM.createRoot(document.getElementById('root')).render(<Fiche />);",
          mustContain: ['<div>', '<h1>Ma fiche</h1>', '<p>Prénom : Léa</p>'],
          hint: 'Deux enfants côte à côte : il faut un conteneur autour.',
          explanation:
            "Le `return` contient un seul élément racine, le `div`, qui enveloppe le `h1` et le `p` : c’est la règle de la racine unique. Chaque balise est fermée correctement, et le rendu final est obtenu par `ReactDOM.createRoot(...).render(<Fiche />)`.",
        },
        {
          id: 'm04-l01-e4',
          type: 'fill',
          difficulty: 'avancé',
          question: "Complétez : une balise JSX sans enfant est ______-fermée, par exemple `<br />`.",
          accepted: ['auto', 'auto-fermee', 'auto-fermée'],
          hint: 'Le préfixe « auto » indique que la balise se ferme elle-même.',
          explanation:
            "On dit qu’une balise est auto-fermée quand elle porte `/>` : elle n’a pas d’enfant à délimiter, donc une seule écriture suffit. « Ouverte » serait l’inverse, et « double » ne désigne rien dans cette situation.",
        },
      ],
    },
    {
      id: 'm04-l02',
      title: 'Afficher du texte',
      minutes: 6,
      objectives: [
        'Écrire du texte brut dans du JSX',
        'Comprendre comment les espaces sont traités',
        'Éviter les erreurs d’affichage du texte',
      ],
      blocks: [
        {
          type: 'p',
          text: "Le cas le plus simple d’un composant : afficher une phrase. En HTML, on écrivait le texte entre deux balises ; en JSX, c’est exactement la même chose — avec quelques particularités d’espacement à connaître.",
        },
        { type: 'h', text: 'Explication simple' },
        {
          type: 'p',
          text: "Pour afficher du texte, écrivez-le simplement entre les balises ouvrante et fermante : `<p>Bonjour !</p>`. Pas besoin de `document.write` ni de `innerHTML` : React se charge d’insérer le texte. Attention toutefois : le JSX met les retours à la ligne du code sur la même ligne à l’écran, et il réduit les espaces multiples.",
        },
        {
          type: 'list',
          items: [
            'Le texte va directement entre les balises : `<h1>Titre</h1>`.',
            'Plusieurs espaces ou retours à la ligne dans le code n’affichent qu’un seul espace.',
            'Le texte s’affiche tel quel : les guillemets autour ne sont pas nécessaires.',
            'Les caractères `<`, `{` et `}` sont réservés : on les contourne (voir les leçons suivantes).',
          ],
        },
        {
          type: 'code',
          lang: 'jsx',
          code: "function Message() {\n  return (\n    <p>\n      Bonjour !\n      Ce texte est sur plusieurs lignes dans le code.\n    </p>\n  );\n}",
          caption: 'Du texte écrit sur plusieurs lignes dans le code',
        },
        {
          type: 'list',
          items: [
            'Ligne 1 : `function Message()` déclare le composant.',
            'Lignes 3 à 6 : le texte du paragraphe est réparti sur deux lignes dans le fichier.',
            'Le JSX fusionne ces lignes et les espaces : l’écran affiche une seule ligne continue.',
            'Aucune balise supplémentaire n’est nécessaire autour du texte.',
          ],
        },
        { type: 'result', text: "À l’écran : une seule ligne « Bonjour ! Ce texte est sur plusieurs lignes dans le code. » dans un paragraphe." },
        {
          type: 'mistake',
          text: "Mettre des guillemets autour du texte : `<p>\"Bonjour\"</p>` affiche les guillemets à l’écran.",
          fix: "Écrire le texte nu entre les balises, sans quotes ni apostrophes de JavaScript.",
        },
        {
          type: 'mistake',
          text: "Écrire du texte en dehors de toute balise : `return Bonjour ;`.",
          fix: "Entourer le texte d’une balise HTML, par exemple `<p>Bonjour</p>`.",
        },
        {
          type: 'quote',
          text: "Résumé : pour afficher du texte, placez-le entre les balises ; le JSX fusionne les espaces et les retours à la ligne du code.",
        },
      ],
      exercises: [
        {
          id: 'm04-l02-e1',
          type: 'qcm',
          difficulty: 'facile',
          question: 'Où écrit-on du texte dans un composant React ?',
          options: [
            'Dans une balise JSX, entre la balise ouvrante et la fermante',
            'Dans un fichier CSS',
            'Dans `console.log`',
            "Dans l'attribut `lang` du fichier HTML",
          ],
          answer: 0,
          hint: 'Le texte se place entre `<p>` et `</p>`, par exemple.',
          explanation:
            "Le texte s’écrit à l’intérieur d’une balise JSX, c’est le JSX qui le renvoie vers l’affichage. Un fichier CSS ne contient que du style, `console.log` écrit dans la console de développement (pas dans la page), et l’attribut `lang` du HTML décrit la langue de la page.",
        },
        {
          id: 'm04-l02-e2',
          type: 'fill',
          difficulty: 'facile',
          question: "Complétez pour afficher « Salut tout le monde » : `return <p>______</p>;`",
          accepted: ['salut tout le monde', 'salut tout le monde !'],
          hint: 'Écrivez simplement le texte demandé, sans guillemets.',
          explanation:
            "Le texte se place nu entre les balises : `<p>Salut tout le monde</p>` affiche exactement cette phrase. Ajouter des guillemets afficherait les guillemets, et écrire le texte sans balise provoquerait une erreur de syntaxe.",
        },
        {
          id: 'm04-l02-e3',
          type: 'code',
          difficulty: 'intermédiaire',
          language: 'jsx',
          question:
            "Créez un composant `Citation` qui affiche le texte « Le code, c’est simple » dans un `p`, puis affichez-le avec `App`.",
          template: "function Citation() {\n  // votre code ici\n}\n\nfunction App() {\n  // affichez <Citation />\n}\n",
          solution:
            "function Citation() {\n  return <p>Le code, c’est simple</p>;\n}\n\nfunction App() {\n  return <Citation />;\n}\n\nReactDOM.createRoot(document.getElementById('root')).render(<App />);",
          mustContain: ['<p>Le code, c’est simple</p>', '<Citation />'],
          hint: 'Le texte est déjà du JSX : il ne manque que le return.',
          explanation:
            "`Citation` renvoie un `p` qui contient le texte demandé, écrit nu entre les balises. `App` insère ensuite `<Citation />`, et le rendu final passe par `ReactDOM.createRoot(...).render(<App />)`.",
        },
        {
          id: 'm04-l02-e4',
          type: 'debug',
          difficulty: 'avancé',
          language: 'jsx',
          question: "Ce composant doit afficher « Bonjour ! » dans un paragraphe. Deux erreurs le bloquent.",
          template:
            "function Texte() {\n  return\n    <p>Bonjour !</p;\n}",
          solution:
            "function Texte() {\n  return <p>Bonjour !</p>;\n}\n\nReactDOM.createRoot(document.getElementById('root')).render(<Texte />);",
          mustContain: ['return <p>Bonjour !</p>;', '<Texte />'],
          hint: "Attention au retour à la ligne après return, et à la fermeture du paragraphe.",
          explanation:
            "Première erreur : `return` est seul sur sa ligne, donc JavaScript ajoute automatiquement un point-virgule et la fonction ne renvoie rien. Il faut écrire `return` juste avant le JSX. Deuxième erreur : `</p;` n’est pas une balise fermante valide, il faut `</p>`.",
        },
      ],
    },
    {
      id: 'm04-l03',
      title: 'Afficher des variables',
      minutes: 8,
      objectives: [
        'Déclarer une variable dans un composant',
        'Insérer une variable avec les accolades',
        'Comprendre la règle des `{ }` en JSX',
      ],
      blocks: [
        {
          type: 'p',
          text: "Jusqu’ici, vos composants affichent toujours les mêmes textes en dur. En pratique, le contenu vient d’une donnée : un nom, un prix, un score. Pour afficher la valeur d’une variable, React utilise les accolades `{ }`.",
        },
        { type: 'h', text: 'Explication simple' },
        {
          type: 'p',
          text: "Déclarez la variable dans le corps de la fonction, comme en JavaScript habituel, puis écrivez son nom entre accolades dans le JSX : `{nom}`. Les accolades ouvrent une fenêtre sur JavaScript : à cet endroit exact, vous pouvez écrire du code qui sera évalué avant l’affichage.",
        },
        {
          type: 'list',
          items: [
            'La variable se déclare avant le `return` : `const nom = "Léa";`.',
            "S'affiche avec `{nom}` : React remplace `{nom}` par sa valeur au moment de l’affichage.",
            'Sans accolades, le nom s’affiche comme du texte brut : vous verriez « nom ».',
            'Les accolades fonctionnent aussi avec les expressions du module suivant.',
          ],
        },
        {
          type: 'code',
          lang: 'jsx',
          code: "function Profil() {\n  const nom = \"Léa\";\n  const ville = \"Nantes\";\n\n  return (\n    <div>\n      <h1>Bonjour {nom}</h1>\n      <p>Ville : {ville}</p>\n    </div>\n  );\n}",
          caption: 'Deux variables insérées dans le JSX avec les accolades',
        },
        {
          type: 'list',
          items: [
            'Ligne 2 : `const nom = "Léa";` déclare la variable dans le composant.',
            'Ligne 3 : `const ville = "Nantes";` se déclare de la même façon.',
            'Ligne 7 : `{nom}` est remplacé par `Léa` au moment de l’affichage.',
            'Ligne 8 : `{ville}` devient `Nantes` ; le texte « Ville : » reste du texte.',
          ],
        },
        { type: 'result', text: "À l’écran : un titre « Bonjour Léa » et un paragraphe « Ville : Nantes »." },
        {
          type: 'mistake',
          text: "Oublier les accolades : écrire `Bonjour nom` affiche littéralement le mot « nom ».",
          fix: "Entourer la variable : `Bonjour {nom}`.",
        },
        {
          type: 'mistake',
          text: "Écrire `{nom}` alors que `nom` n’est pas déclarée : React affiche une erreur dans la console.",
          fix: "Déclarer la variable avant le `return`, avec `const` ou `let`.",
        },
        {
          type: 'quote',
          text: "Résumé : les accolades `{ }` en JSX laissent passer du JavaScript ; `{nom}` affiche la valeur de la variable `nom`.",
        },
      ],
      exercises: [
        {
          id: 'm04-l03-e1',
          type: 'qcm',
          difficulty: 'facile',
          question: 'Comment affiche-t-on la valeur d’une variable `nom` en JSX ?',
          options: ['{nom}', 'nom', '<nom>', '$nom'],
          answer: 0,
          hint: 'C’est le symbole des accolades.',
          explanation:
            "`{nom}` ouvre une expression JavaScript : React y calcule la valeur et l’affiche. Écrire `nom` nu afficherait le mot « nom », `<nom>` serait une balise HTML inconnue, et `$nom` est la syntaxe d’un autre langage (PHP, shell) sans effet ici.",
        },
        {
          id: 'm04-l03-e2',
          type: 'fill',
          difficulty: 'facile',
          question: "Complétez : les accolades `{ }` en JSX permettent d’insérer du ______.",
          accepted: ['javascript', 'js', 'code javascript'],
          hint: 'C’est le langage dans lequel est écrit votre fichier.',
          explanation:
            "Les accolades ouvrent une fenêtre sur JavaScript : tout ce qu’on y écrit est évalué comme du code (variable, calcul, condition). Ce n’est ni du CSS (qui stylise) ni du HTML brut.",
        },
        {
          id: 'm04-l03-e3',
          type: 'code',
          difficulty: 'intermédiaire',
          language: 'jsx',
          question:
            "Créez un composant `Sante` qui déclare `const etat = \"en forme\";` et affiche dans un `p` le texte « État : » suivi de la valeur de la variable.",
          template: "function Sante() {\n  const etat = \"en forme\";\n\n  // votre code ici\n}\n",
          solution:
            "function Sante() {\n  const etat = \"en forme\";\n\n  return <p>État : {etat}</p>;\n}\n\nReactDOM.createRoot(document.getElementById('root')).render(<Sante />);",
          mustContain: ['{etat}', '<p>'],
          hint: 'Le texte « État : » est brut, la variable passe entre accolades.',
          explanation:
            "La variable `etat` est déclarée avant le `return`, puis `{etat}` la fait passer dans le JSX : React affiche « État : en forme ». Sans accolades, le mot « etat » s’afficherait tel quel au lieu de sa valeur.",
        },
        {
          id: 'm04-l03-e4',
          type: 'short',
          difficulty: 'avancé',
          question: "Que se passe-t-il si vous écrivez `nom` (sans accolades) dans le JSX alors que la variable vaut « Léa » ?",
          accepted: ['on voit le mot nom', 'le mot nom s affiche', 'il s affiche litteralement'],
          hint: 'Le JSX ne distingue pas un mot écrit en dur d’un identifiant… sans accolades.',
          explanation:
            "Sans accolades, tout ce que vous écrivez est traité comme du texte brut : l’écran affiche « nom », pas « Léa ». Seule l’écriture `{nom}` déclenche l’évaluation JavaScript et remplace le marqueur par la valeur.",
        },
      ],
    },
    {
      id: 'm04-l04',
      title: 'Expressions JavaScript dans JSX',
      minutes: 9,
      objectives: [
        'Écrire un calcul entre accolades',
        'Utiliser une méthode sur une chaîne ou un tableau',
        'Comprendre que l’expression est évaluée avant l’affichage',
      ],
      blocks: [
        {
          type: 'p',
          text: "Une variable affiche une valeur, mais entre accolades, vous pouvez faire bien plus : additionner, multiplier, compter les caractères d’un texte, appeler une méthode. Toute expression JavaScript valide peut y figurer.",
        },
        { type: 'h', text: 'Explication simple' },
        {
          type: 'p',
          text: "Une expression, c’est du JavaScript qui produit une valeur : `2 + 2`, `prix * quantite`, `texte.length`. Écrite entre `{ }` dans le JSX, elle est calculée au moment de l’affichage, puis son résultat est inséré à la place des accolades.",
        },
        {
          type: 'list',
          items: [
            'Les calculs : `{prix * quantite}`, `{total / 2}`.',
            'Les méthodes de chaînes : `{titre.toUpperCase()}`, `{titre.length}`.',
            'Les méthodes de tableaux : `{fruits.length}`.',
            'Les opérateurs : `{age + 1}`, `{bonjour + " " + nom}`.',
            'Interdit : une instruction complète comme `if` ou `for` (voir la leçon sur les conditions).',
          ],
        },
        {
          type: 'code',
          lang: 'jsx',
          code: "function Panier() {\n  const prix = 12;\n  const quantite = 3;\n  const titre = \"Cahier\";\n\n  return (\n    <p>\n      {titre} : {prix * quantite} euros\n    </p>\n  );\n}",
          caption: 'Un calcul JavaScript affiché à côté d’une variable',
        },
        {
          type: 'list',
          items: [
            'Lignes 2 à 4 : les trois variables sont déclarées avant le JSX.',
            'Ligne 8 : `{titre}` affiche « Cahier ».',
            'Ligne 8 : `{prix * quantite}` vaut 36, calculé à chaque affichage.',
            'Le texte « : » et « euros » reste du texte brut, non évalué.',
          ],
        },
        { type: 'result', text: "À l’écran : « Cahier : 36 euros » dans un paragraphe." },
        {
          type: 'mistake',
          text: "Écrire du JavaScript sans accolades : `Total : prix * quantite` affiche cette phrase telle quelle.",
          fix: "Entourer l’expression : `Total : {prix * quantite}`.",
        },
        {
          type: 'mistake',
          text: "Attendre qu’un `console.log` s’affiche dans la page : il écrit uniquement dans la console du navigateur.",
          fix: "Pour voir une valeur à l’écran, l’insérer dans le JSX avec `{ }`.",
        },
        {
          type: 'quote',
          text: "Résumé : entre `{ }`, on peut écrire n’importe quelle expression JavaScript ; React la calcule et insère le résultat à l’affichage.",
        },
      ],
      exercises: [
        {
          id: 'm04-l04-e1',
          type: 'qcm',
          difficulty: 'facile',
          question: 'Que peut-on écrire entre les accolades `{ }` en JSX ?',
          options: [
            'N’importe quelle expression JavaScript valide',
            'Uniquement du texte brut',
            'Uniquement des nombres',
            'Du code CSS',
          ],
          answer: 0,
          hint: 'Calculez `2 + 2` entre accolades : que voit-on ?',
          explanation:
            "Les accolades acceptent toute expression JavaScript qui produit une valeur : calcul, variable, méthode, concaténation. Le texte brut s’écrit justement sans accolades, un nombre seul n’est qu’un cas particulier, et le CSS se place dans des fichiers `.css` ou des attributs.",
        },
        {
          id: 'm04-l04-e2',
          type: 'fill',
          difficulty: 'facile',
          question: "Complétez : `{prix * 2}` est une ______ JavaScript calculée au moment de l’affichage.",
          accepted: ['expression', 'expression javascript'],
          hint: 'Le terme désigne un bout de code qui produit une valeur.',
          explanation:
            "Une expression est un fragment de JavaScript qui évalue vers une valeur : `prix * 2` en est une. Ce n’est pas une instruction complète (comme `if`), qui ne peut pas figurer telle quelle entre accolades.",
        },
        {
          id: 'm04-l04-e3',
          type: 'code',
          difficulty: 'intermédiaire',
          language: 'jsx',
          question:
            "Créez un composant `Calcul` qui déclare `prix` (4) et `quantite` (7), affiche le total dans un `p`, puis écrit le même total dans la console avec `console.log`.",
          template: "function Calcul() {\n  const prix = 4;\n  const quantite = 7;\n\n  // votre code ici\n}\n",
          solution:
            "function Calcul() {\n  const prix = 4;\n  const quantite = 7;\n  const total = prix * quantite;\n\n  console.log(total);\n\n  return <p>Total : {total} euros</p>;\n}\n\nReactDOM.createRoot(document.getElementById('root')).render(<Calcul />);",
          mustContain: ['{total}', 'console.log'],
          expectedOutput: '28',
          hint: "Calculez d'abord le total, puis utilisez-le deux fois : une fois à l'écran, une fois en console.",
          explanation:
            "`prix * quantite` vaut 28 : la valeur est stockée dans `total`, affichée dans la page grâce à `{total}` et écrite en console avec `console.log(total)`. La page montre « Total : 28 euros » et la console affiche « 28 ».",
        },
        {
          id: 'm04-l04-e4',
          type: 'short',
          difficulty: 'avancé',
          question:
            "Écrivez l’expression JavaScript, entre accolades, qui calcule la moyenne de 8 et 12.",
          accepted: ['(8 + 12) / 2', '(8+12)/2'],
          hint: 'Additionnez d’abord, puis divisez : l’ordre des opérateurs compte.',
          explanation:
            "La moyenne s’obtient en additionnant puis en divisant par 2 : `(8 + 12) / 2` vaut 10. Écrire `8 + 12 / 2` donnerait 14 (la division passe avant l’addition), et omettre les parenthèses changerait donc le résultat.",
        },
      ],
    },
    {
      id: 'm04-l05',
      title: 'Conditions dans JSX',
      minutes: 9,
      objectives: [
        'Afficher un contenu selon une condition',
        'Utiliser l’opérateur ternaire',
        'Utiliser la courte-circuit `&&`',
      ],
      blocks: [
        {
          type: 'p',
          text: "Un message d’erreur qui disparaît quand tout va bien, un panier vide qui affiche « aucun article » : l’affichage change selon une condition. Le JSX ne permet pas d’écrire `if` n’importe où, mais deux formules suffisent pour tout gérer.",
        },
        { type: 'h', text: 'Explication simple' },
        {
          type: 'p',
          text: "La première formule est l’opérateur ternaire : `condition ? siVrai : siFaux`. Il renvoie l’un des deux morceaux de JSX selon le résultat de la condition. La seconde est `condition && contenu` : elle n’affiche le contenu que si la condition est vraie, sinon elle n’affiche rien.",
        },
        {
          type: 'list',
          items: [
            'Ternaire complet : `{estConnecte ? <Panneau /> : <Message />}`.',
            'Ternaire simplifié : `{age >= 18 ? <Majeur /> : null}`.',
            'Affichage conditionnel : `{erreur && <Alerte />}`.',
            'Le `if` classique reste interdit à l’intérieur du JSX (il s’écrit dans le corps de la fonction, avant le `return`).',
          ],
        },
        {
          type: 'code',
          lang: 'jsx',
          code: "function Connexion() {\n  const estConnecte = true;\n\n  return (\n    <div>\n      {estConnecte ? <p>Bienvenue !</p> : <p>Veuillez vous connecter.</p>}\n    </div>\n  );\n}",
          caption: 'Un ternaire qui choisit entre deux paragraphes',
        },
        {
          type: 'list',
          items: [
            'Ligne 2 : `const estConnecte = true;` est une condition, un booléen.',
            'Ligne 6 : `?` sépare la partie vraie de la partie fausse.',
            'Ligne 6 : `:` sépare la partie fausse du reste.',
            'Le JSX entre `{ }` est évalué : une seule branche s’affiche à la fois.',
          ],
        },
        { type: 'result', text: "À l’écran : « Bienvenue ! » dans un paragraphe, car `estConnecte` vaut `true`." },
        {
          type: 'mistake',
          text: "Oublier le deux-points du ternaire : `condition ? <A />` ne se termine jamais.",
          fix: "Écrire les trois parties : `condition ? <A /> : <B />`.",
        },
        {
          type: 'mistake',
          text: "Écrire un `if` directement dans le JSX : `return <if (x) { … } />`.",
          fix: "Utiliser le ternaire ou `&&` entre accolades, ou placer le `if` avant le `return`.",
        },
        {
          type: 'quote',
          text: "Résumé : pour afficher selon une condition, utilisez le ternaire `? :` (deux branches) ou `&&` (une seule branche affichée si vraie).",
        },
      ],
      exercises: [
        {
          id: 'm04-l05-e1',
          type: 'qcm',
          difficulty: 'facile',
          question: 'Quelle syntaxe affiche du JSX selon une condition ?',
          options: [
            'L’opérateur ternaire `condition ? a : b`',
            'Une balise `<if>`',
            'Le mot-clé `switch` écrit dans le JSX',
            'Un commentaire HTML',
          ],
          answer: 0,
          hint: 'Il faut trois parties : la condition, puis deux branches.',
          explanation:
            "Le ternaire `condition ? a : b` produit l’une des deux branches selon la condition : c’est la façon standard d’afficher conditionnellement du JSX. Il n’existe aucune balise `<if>` en HTML ni en JSX, `switch` est une instruction JavaScript qui ne s’écrit pas dans le JSX, et un commentaire n’affiche rien.",
        },
        {
          id: 'm04-l05-e2',
          type: 'fill',
          difficulty: 'facile',
          question: "Complétez : `{estVide ? <A /> : <B />}` affiche `<A />` si la condition est ______.",
          accepted: ['vraie', 'true'],
          hint: 'Un booléen peut valoir vrai ou faux.',
          explanation:
            "Dans `condition ? siVrai : siFaux`, la partie après `?` s’affiche quand la condition vaut `true` (vraie). Si elle vaut `false`, c’est la partie après `:` qui s’affiche.",
        },
        {
          id: 'm04-l05-e3',
          type: 'code',
          difficulty: 'intermédiaire',
          language: 'jsx',
          question:
            "Créez un composant `Age` qui déclare `const age = 17;` et affiche « Majeur » si `age >= 18`, sinon « Mineur », dans un `p`.",
          template: "function Age() {\n  const age = 17;\n\n  // votre code ici\n}\n",
          solution:
            "function Age() {\n  const age = 17;\n\n  return (\n    <p>\n      {age >= 18 ? \"Majeur\" : \"Mineur\"}\n    </p>\n  );\n}\n\nReactDOM.createRoot(document.getElementById('root')).render(<Age />);",
          mustContain: ['age >= 18 ?', ':'],
          hint: 'Trois parties : la comparaison, la valeur si vraie, la valeur si fausse.',
          explanation:
            "La condition `age >= 18` vaut `false` avec 17, donc le ternaire renvoie « Mineur », qui s’affiche dans le `p`. Les deux branches sont obligatoires : sans le deux-points, l’expression est incomplète et le code ne compile pas.",
        },
        {
          id: 'm04-l05-e4',
          type: 'debug',
          difficulty: 'avancé',
          language: 'jsx',
          question: "Ce composant doit afficher « Majeur » ou « Mineur » selon l’âge. Deux erreurs l’empêchent de fonctionner.",
          template:
            "function Age() {\n  const age = 15;\n\n  return (\n    <p>\n      {age => 18 ? <span>Majeur</span> <span>Mineur</span>}\n    </p>\n  );\n}",
          solution:
            "function Age() {\n  const age = 15;\n\n  return (\n    <p>\n      {age >= 18 ? <span>Majeur</span> : <span>Mineur</span>}\n    </p>\n  );\n}\n\nReactDOM.createRoot(document.getElementById('root')).render(<Age />);",
          mustContain: ['age >= 18', ': <span>Mineur</span>'],
          hint: 'Regardez l’opérateur de comparaison, puis la structure du ternaire.',
          explanation:
            "Première erreur : `age => 18` est une fonction flèche, pas une comparaison — il faut `age >= 18`. Deuxième erreur : le ternaire n’a que deux éléments séparés par un espace, sans deux-points : il manque la séparation `? … : …`. Une fois corrigé, `age` vaut 15 et « Mineur » s’affiche.",
        },
      ],
    },
    {
      id: 'm04-l06',
      title: 'Affichage dynamique',
      minutes: 10,
      objectives: [
        'Comprendre pourquoi une liste se génère automatiquement',
        'Transformer un tableau en éléments JSX avec `.map()`',
        'Fournir une `key` unique à chaque élément',
      ],
      blocks: [
        {
          type: 'p',
          text: "Votre application affichera cent produits, cinquante messages, douze pays : écrire cent balises à la main n’est pas possible. La solution : laisser JavaScript générer la liste à partir d’un tableau de données.",
        },
        { type: 'h', text: 'Explication simple' },
        {
          type: 'p',
          text: "La méthode `.map()` parcourt un tableau et transforme chaque élément en ce que vous renvoyez. Entre accolades, `{fruits.map(…)}` renvoie donc une liste de JSX, un `<li>` par fruit. Chaque élément généré doit recevoir une `key` : un identifiant unique qui aide React à suivre les éléments quand la liste change.",
        },
        {
          type: 'list',
          items: [
            'Le tableau se déclare avant le `return` : `const fruits = ["pomme", "banane"];`.',
            '`fruits.map((fruit) => <li>{fruit}</li>)` crée un `<li>` par fruit.',
            'Toute la génération s’écrit entre accolades `{ }` : c’est du JavaScript.',
            'Chaque élément généré porte `key`, avec une valeur unique (un identifiant, un code).',
          ],
        },
        {
          type: 'code',
          lang: 'jsx',
          code: "function Liste() {\n  const fruits = [\"pomme\", \"banane\", \"cerise\"];\n\n  return (\n    <ul>\n      {fruits.map((fruit) => (\n        <li key={fruit}>{fruit}</li>\n      ))}\n    </ul>\n  );\n}",
          caption: 'Un tableau transformé en liste HTML avec `.map()`',
        },
        {
          type: 'list',
          items: [
            'Ligne 2 : `fruits` est un tableau de trois chaînes de caractères.',
            'Ligne 6 : `fruits.map(…)` parcourt le tableau et renvoie un tableau de JSX.',
            'Ligne 6 : `(fruit)` reçoit l’élément courant, à chaque passage.',
            'Ligne 7 : `<li key={fruit}>` crée un élément de liste ; `key` identifie l’élément pour React.',
            'Lignes 6 à 8 : le tout reste entre `{ }` : une boucle `for` y serait interdite, `.map()` fait le travail.',
          ],
        },
        { type: 'result', text: "À l’écran : une liste à puces avec trois éléments : « pomme », « banane », « cerise »." },
        {
          type: 'mistake',
          text: "Oublier les accolades autour de `map` : le texte `fruits.map(…)` s’affiche littéralement.",
          fix: "Écrire `{fruits.map(…)}` pour que JavaScript soit évalué.",
        },
        {
          type: 'mistake',
          text: "Oublier `key` sur chaque élément généré : React affiche un avertissement et suit mal les changements.",
          fix: "Ajouter `key={valeurUnique}` sur le premier élément retourné par `.map()`.",
        },
        {
          type: 'quote',
          text: "Résumé : pour afficher une liste, on transforme un tableau en JSX avec `.map()` entre accolades, et chaque élément reçoit une `key` unique.",
        },
      ],
      exercises: [
        {
          id: 'm04-l06-e1',
          type: 'qcm',
          difficulty: 'facile',
          question: 'Pour transformer chaque élément d’un tableau en JSX, on utilise…',
          options: ['la méthode `.map()`', 'une boucle `for` écrite dans le JSX', 'l’attribut `key` seul', 'la fonction `console.log`'],
          answer: 0,
          hint: 'Cette méthode « carte » chaque élément vers un nouveau contenu.',
          explanation:
            "`.map()` parcourt le tableau et renvoie un nouveau tableau contenant du JSX : c’est l’outil standard pour les listes en React. Une boucle `for` n’est pas acceptée à l’intérieur du JSX, `key` est un attribut (pas une boucle) et `console.log` écrit dans la console sans rien afficher dans la page.",
        },
        {
          id: 'm04-l06-e2',
          type: 'short',
          difficulty: 'facile',
          question: 'Que fait `.map()` sur un tableau ?',
          accepted: ['transforme chaque element en jsx', 'transforme chaque element', 'transforme le tableau en liste de jsx'],
          hint: 'Elle parcourt le tableau et produit un nouveau contenu pour chaque élément.',
          explanation:
            "`.map()` applique une fonction à chaque élément et collecte les résultats : si la fonction renvoie du JSX, on obtient une liste de JSX. Elle ne supprime rien (ce serait `filter`) et ne recalcule pas une somme (ce serait `reduce`).",
        },
        {
          id: 'm04-l06-e3',
          type: 'code',
          difficulty: 'intermédiaire',
          language: 'jsx',
          question:
            "Créez un composant `Pays` qui affiche le tableau `const pays = [\"France\", \"Belgique\"];` dans un `ul`, avec un `li` par pays et la `key` correspondante.",
          template: "function Pays() {\n  const pays = [\"France\", \"Belgique\"];\n\n  // votre code ici\n}\n",
          solution:
            "function Pays() {\n  const pays = [\"France\", \"Belgique\"];\n\n  return (\n    <ul>\n      {pays.map((paysItem) => (\n        <li key={paysItem}>{paysItem}</li>\n      ))}\n    </ul>\n  );\n}\n\nReactDOM.createRoot(document.getElementById('root')).render(<Pays />);",
          mustContain: ['pays.map', 'key='],
          hint: 'Un seul `<li>` dans le return : il est fabriqué par `.map()`.',
          explanation:
            "`.map()` fabrique un `<li>` pour chaque pays, la variable reçue porte la valeur courante et `key` lui donne un identifiant unique. Écrire deux `<li>` en dur fonctionnerait pour deux pays, mais deviendrait impossible à maintenir avec une liste qui change.",
        },
        {
          id: 'm04-l06-e4',
          type: 'debug',
          difficulty: 'avancé',
          language: 'jsx',
          question: "Ce composant doit afficher une liste à puces « chien », « chat ». Deux défauts l’empêchent de fonctionner correctement.",
          template:
            "function Liste() {\n  const animaux = [\"chien\", \"chat\"];\n\n  return (\n    <ul>\n      animaux.map((animal) => <li>{animal}</li>)\n    </ul>\n  );\n}",
          solution:
            "function Liste() {\n  const animaux = [\"chien\", \"chat\"];\n\n  return (\n    <ul>\n      {animaux.map((animal) => <li key={animal}>{animal}</li>)}\n    </ul>\n  );\n}\n\nReactDOM.createRoot(document.getElementById('root')).render(<Liste />);",
          mustContain: ['{animaux.map', 'key='],
          hint: 'Une accolade manquante, et un attribut manquant.',
          explanation:
            "Première erreur : `animaux.map(…)` écrit sans accolades est traité comme du texte brut, on verrait « animaux.map(…) » à l’écran — il faut `{animaux.map(…)}`. Deuxième erreur : chaque élément généré doit porter une `key` unique, sinon React ne peut pas suivre la liste proprement.",
        },
      ],
    },
    {
      id: 'm04-l07',
      title: 'Gestion des classes CSS',
      minutes: 8,
      objectives: [
        'Utiliser `className` pour styliser un composant',
        'Comprendre pourquoi `class` ne fonctionne pas en JSX',
        'Combiner plusieurs classes dynamiquement',
      ],
      blocks: [
        {
          type: 'p',
          text: "Vos composants sont structurés, mais ils manquent de style : pas de couleur, pas de taille. En HTML, on stylise avec `class` et un fichier CSS. En JSX, il faut un petit ajustement, car `class` est un mot réservé de JavaScript.",
        },
        { type: 'h', text: 'Explication simple' },
        {
          type: 'p',
          text: "En JSX, l’attribut `class` s’écrit `className`, pour la même raison que `for` devient `htmlFor` : JavaScript réserve certains mots. `className` fonctionne exactement comme `class` en HTML : il pointe vers une ou plusieurs classes définies dans votre CSS.",
        },
        {
          type: 'list',
          items: [
            'Statique : `<button className="bouton-principal">`.',
            'Plusieurs classes : `className="carte grande"` (séparées par un espace).',
            'Dynamique : `className={"carte" + (estVide ? " carte-vide" : "")}`.',
            'Le CSS reste dans un fichier `.css` importé, ou dans une balise `<style>`.',
          ],
        },
        {
          type: 'code',
          lang: 'jsx',
          code: "function Bouton() {\n  return <button className=\"bouton-principal\">Envoyer</button>;\n}\n\nfunction Carte() {\n  const estVide = false;\n  const classes = \"carte\" + (estVide ? \" carte-vide\" : \"\");\n\n  return <div className={classes}>Contenu de la carte</div>;\n}",
          caption: 'Une classe fixe et une classe composée dynamiquement',
        },
        {
          type: 'list',
          items: [
            'Ligne 2 : `className="bouton-principal"` applique la classe CSS définie dans le fichier de style.',
            'Ligne 6 : `estVide` est une condition, vraie ou fausse.',
            'Ligne 7 : l’expression construit « carte », ou « carte carte-vide » selon la condition.',
            'Ligne 9 : `className={classes}` insère le résultat de l’expression entre accolades.',
          ],
        },
        { type: 'result', text: "À l’écran : un bouton « Envoyer » stylé par `.bouton-principal`, et une carte « Contenu de la carte » à la classe « carte »." },
        {
          type: 'mistake',
          text: "Écrire `class=\"carte\"` comme en HTML : l’attribut est ignoré et le style ne s’applique pas.",
          fix: "Utiliser `className=\"carte\"` : même rôle, autre nom.",
        },
        {
          type: 'mistake',
          text: "Écrire `className={carte}` alors que `carte` est une chaîne de caractères : React chercherait une variable nommée `carte`.",
          fix: "Utiliser les guillemets pour un texte fixe : `className=\"carte\"`.",
        },
        {
          type: 'quote',
          text: "Résumé : en JSX, `class` devient `className` ; les classes fixes vont entre guillemets, les classes dynamiques entre accolades `{ }`.",
        },
      ],
      exercises: [
        {
          id: 'm04-l07-e1',
          type: 'qcm',
          difficulty: 'facile',
          question: 'Quel attribut remplace `class` en JSX ?',
          options: ['className', 'class', 'cssClass', 'styleName'],
          answer: 0,
          hint: 'Le nom anglais de « nom de classe ».',
          explanation:
            "`class` est un mot-clé JavaScript (il sert à déclarer des classes) : React utilise donc `className`, qui porte exactement le même rôle que `class` en HTML. `class` serait ignoré ou refusé, et `cssClass` / `styleName` n’existent pas en React.",
        },
        {
          id: 'm04-l07-e2',
          type: 'fill',
          difficulty: 'facile',
          question: "Complétez : `<button ______=\"bouton-principal\">Cliquer</button>` donne sa classe CSS au bouton.",
          accepted: ['classname'],
          hint: 'Le mot-clé « nom de classe » en camelCase.',
          explanation:
            "`className` est l’attribut JSX qui transmet la classe au navigateur : le CSS peut ensuite cibler `.bouton-principal`. Écrire `class` ne fonctionne pas, car c’est un mot réservé de JavaScript.",
        },
        {
          id: 'm04-l07-e3',
          type: 'code',
          difficulty: 'intermédiaire',
          language: 'jsx',
          question:
            "Créez un composant `Banniere` qui affiche « Promotions ! » dans un `p` portant la classe CSS `alerte`, puis affichez-le avec `App`.",
          template: "function Banniere() {\n  // votre code ici\n}\n\nfunction App() {\n  // affichez <Banniere />\n}\n",
          solution:
            "function Banniere() {\n  return <p className=\"alerte\">Promotions !</p>;\n}\n\nfunction App() {\n  return <Banniere />;\n}\n\nReactDOM.createRoot(document.getElementById('root')).render(<App />);",
          mustContain: ['className="alerte"', '<Banniere />'],
          hint: 'L’attribut s’écrit className, la valeur entre guillemets.',
          explanation:
            "Le `p` porte `className=\"alerte\"` : la classe CSS `alerte` peut alors s’appliquer, alors que `class=\"alerte\"` serait ignorée. `App` affiche ensuite `<Banniere />` comme d’habitude.",
        },
        {
          id: 'm04-l07-e4',
          type: 'debug',
          difficulty: 'avancé',
          language: 'jsx',
          question: "Ce composant doit afficher une div à la classe « carte grand ». Deux erreurs bloquent le style.",
          template:
            "function Carte() {\n  const taille = \"grand\";\n\n  return <div class=\"carte\" + taille>Contenu</div>;\n}",
          solution:
            "function Carte() {\n  const taille = \"grand\";\n\n  return <div className={\"carte \" + taille}>Contenu</div>;\n}\n\nReactDOM.createRoot(document.getElementById('root')).render(<Carte />);",
          mustContain: ['className', '{"carte " + taille}'],
          hint: "Un attribut n'existe pas en JSX, et une expression JavaScript doit être entre accolades.",
          explanation:
            "Première erreur : `class` doit devenir `className` en JSX. Deuxième erreur : `+ taille` écrit à côté de l’attribut ne fait partie d’aucune expression — la concaténation doit passer entre accolades : `{\"carte \" + taille}`. La classe obtenue devient alors « carte grand ».",
        },
      ],
    },
  ],
};
