import type { Module } from '../types';

export const module03: Module = {
  id: 'm03',
  number: 3,
  title: 'Les composants React',
  description: 'Créez, réutilisez et organisez vos premiers composants React.',
  icon: '🧩',
  level: 'Débutant',
  lessons: [
    {
      id: 'm03-l01',
      title: 'Comprendre les composants',
      minutes: 8,
      objectives: [
        'Définir un composant React en une phrase',
        'Repérer un composant répété dans une page',
        'Citer trois avantages des composants',
      ],
      blocks: [
        {
          type: 'p',
          text: "Imaginez une page de résultats sportifs où la même carte apparaît dix fois : le nom de l’équipe, le score, l’heure. Si vous deviez copier-coller ce bloc de code dix fois, la moindre modification serait à refaire dix fois. C’est exactement le problème que résolvent les composants React.",
        },
        { type: 'h', text: 'Explication simple' },
        {
          type: 'p',
          text: "Un composant, c’est un morceau de page que l’on écrit une seule fois et que l’on place autant de fois que nécessaire. Pensez à un tampon encreur ou à une brique LEGO : vous fabriquez la brique une fois, puis vous l’utilisez vingt fois. En React, un composant est une fonction JavaScript qui renvoie du JSX, c’est-à-dire le code qui décrit ce qu’il faut afficher.",
        },
        {
          type: 'list',
          items: [
            'Un composant est une fonction JavaScript qui renvoie du JSX.',
            'Son nom commence par une majuscule : `Carte`, `Bouton`, `Entete`.',
            'Le même composant peut apparaître plusieurs fois sur la page.',
            'Chaque composant décrit une partie de l’interface : un titre, un bouton, une carte…',
          ],
        },
        {
          type: 'code',
          lang: 'jsx',
          code: "function Carte() {\n  return <div>Match du soir</div>;\n}\n\nfunction Page() {\n  return (\n    <div>\n      <Carte />\n      <Carte />\n      <Carte />\n    </div>\n  );\n}",
          caption: 'Un même composant utilisé trois fois',
        },
        {
          type: 'list',
          items: [
            'Ligne 1 : `function Carte()` déclare le composant `Carte`.',
            'Ligne 2 : `return` renvoie le contenu affiché, ici un `div` qui contient du texte.',
            'Ligne 5 : `function Page()` est un second composant qui sert de conteneur.',
            'Lignes 8 à 10 : `<Carte />` est écrit trois fois, donc le contenu s’affiche trois fois.',
          ],
        },
        { type: 'result', text: "À l’écran : trois blocs « Match du soir », identiques, empilés les uns sous les autres." },
        {
          type: 'mistake',
          text: "Écrire le composant en minuscule : `function carte()`. React distingue les majuscules et ne reconnaîtrait pas votre composant.",
          fix: "Toujours commencer le nom d’un composant par une majuscule.",
        },
        {
          type: 'mistake',
          text: "Copier-coller le même bloc de HTML au lieu d’utiliser le composant plusieurs fois.",
          fix: "Insérer `<Carte />` autant de fois que nécessaire : une seule version du code à maintenir.",
        },
        {
          type: 'quote',
          text: "Résumé : un composant React est une fonction JavaScript réutilisable qui renvoie du JSX ; on l’écrit une fois et on l’affiche autant de fois que besoin.",
        },
      ],
      exercises: [
        {
          id: 'm03-l01-e1',
          type: 'qcm',
          difficulty: 'facile',
          question: 'Un composant React est…',
          options: [
            'une balise HTML inventée par React',
            'une fonction JavaScript qui renvoie du JSX',
            'un fichier CSS spécialisé',
            'un serveur qui affiche des pages',
          ],
          answer: 1,
          hint: 'Pensez à la définition : une fonction qui retourne du code d’affichage.',
          explanation:
            "Un composant est bien une fonction JavaScript qui retourne du JSX : React appelle cette fonction pour construire l’affichage. Ce n’est pas une balise HTML (le JSX en contient, mais le composant lui-même reste une fonction), ni un fichier CSS, ni un serveur.",
        },
        {
          id: 'm03-l01-e2',
          type: 'short',
          difficulty: 'facile',
          question: 'Un composant React est une ______ JavaScript qui renvoie du JSX.',
          accepted: ['fonction', 'une fonction'],
          hint: 'C’est le mot-clé que l’on écrit avant le nom du composant : function …',
          explanation:
            "Le composant est une fonction : on le déclare avec `function` ou avec une flèche, puis React l’appelle pour obtenir du JSX. « Variable » ou « balise » seraient faux : une variable ne renvoie pas d’affichage et une balise n’est qu’un morceau du résultat.",
        },
        {
          id: 'm03-l01-e3',
          type: 'code',
          difficulty: 'intermédiaire',
          language: 'jsx',
          question:
            "Créez un composant `Banniere` qui affiche « Bienvenue ! » dans un `h1`, puis affichez-le deux fois dans la page.",
          template: "function Banniere() {\n  // votre code ici\n}\n",
          solution:
            "function Banniere() {\n  return <h1>Bienvenue !</h1>;\n}\n\nReactDOM.createRoot(document.getElementById('root')).render(\n  <div>\n    <Banniere />\n    <Banniere />\n  </div>\n);",
          mustContain: ['<h1>Bienvenue !</h1>', '<Banniere />'],
          hint: 'Le composant renvoie un h1 ; pour l’afficher deux fois, écrivez <Banniere /> deux fois.',
          explanation:
            "Le composant `Banniere` renvoie un élément `<h1>` : c’est ce que React affiche. L’affichage se fait dans un `div` qui contient `<Banniere />` deux fois, car un composant qui retourne du JSX doit être utilisé dans un autre JSX. `ReactDOM.createRoot` puis `render` demandent à React d’insérer le résultat dans le conteneur `root` de la page.",
        },
        {
          id: 'm03-l01-e4',
          type: 'visual',
          difficulty: 'avancé',
          language: 'jsx',
          question: "Exécutez mentalement ce code et décrivez précisément ce que l’utilisateur voit à l’écran.",
          template:
            "function Badge() {\n  return <span>Nouveau</span>;\n}\n\nfunction Page() {\n  return (\n    <div>\n      <Badge />\n      <p>Offre du mois</p>\n    </div>\n  );\n}\n\nReactDOM.createRoot(document.getElementById('root')).render(<Page />);",
          solution:
            "L’utilisateur voit, dans un même conteneur div, le mot « Nouveau » (venu du composant Badge) puis le paragraphe « Offre du mois », dans cet ordre.",
          mustContain: ['Nouveau', 'Offre du mois'],
          hint: 'Suivez l’ordre des balises : d’abord <Badge />, ensuite <p>.',
          explanation:
            "`Page` insère `<Badge />` qui affiche « Nouveau », puis le paragraphe « Offre du mois ». Les deux s’affichent dans l’ordre du code, à l’intérieur du `div`. Aucun autre texte n’apparaît : `Badge` n’est utilisé qu’une seule fois ici.",
        },
      ],
    },
    {
      id: 'm03-l02',
      title: 'Créer un composant',
      minutes: 7,
      objectives: [
        'Écrire un composant en trois lignes',
        'Nommer correctement un composant',
        'Afficher un composant dans la page',
      ],
      blocks: [
        {
          type: 'p',
          text: "Vous avez déjà suivi un premier composant : maintenant, vous allez en créer un vous-même, depuis une ligne blanche. L’opération tient en trois gestes : déclarer une fonction, renvoyer du JSX, puis utiliser le composant dans la page.",
        },
        { type: 'h', text: 'Explication simple' },
        {
          type: 'p',
          text: "Un composant se écrit comme n’importe quelle fonction JavaScript, avec deux particularités : son nom commence par une majuscule, et son corps contient un `return` qui livre le JSX à afficher. Une fois déclaré, on l’utilise comme une balise : `<NomDuComposant />`.",
        },
        {
          type: 'list',
          ordered: true,
          items: [
            'Déclarer la fonction : `function MonComposant() { … }`.',
            'Renvoyer le JSX : `return <p>du texte</p>;` (le mot-clé `return` est obligatoire).',
            'Utiliser le composant : `<MonComposant />` à l’endroit où il doit apparaître.',
          ],
        },
        {
          type: 'code',
          lang: 'jsx',
          code: "function Salutation() {\n  return <p>Bonjour à tous !</p>;\n}\n\nfunction App() {\n  return <Salutation />;\n}",
          caption: 'Un composant créé, puis affiché par un autre composant',
        },
        {
          type: 'list',
          items: [
            'Ligne 1 : `function Salutation()` déclare le composant, avec la majuscule obligatoire.',
            'Ligne 2 : `return` livre le JSX ; sans lui, le composant n’affiche rien.',
            'Ligne 5 : `function App()` est le composant principal qui assemble la page.',
            'Ligne 6 : `<Salutation />` insère le composant ; le `/` ferme la balise.',
          ],
        },
        { type: 'result', text: "À l’écran : une ligne de texte « Bonjour à tous ! »." },
        {
          type: 'mistake',
          text: "Oublier le mot-clé `return` : la fonction existe mais son corps ne renvoie rien.",
          fix: "Écrire `return <p>…</p>;` juste après l’ouverture de la fonction.",
        },
        {
          type: 'mistake',
          text: "Écrire `<Salutation>` sans slash : le JSX ne sait pas où se termine la balise.",
          fix: "Utiliser l’auto-fermure `<Salutation />` quand le composant n’a pas d’enfant.",
        },
        {
          type: 'quote',
          text: "Résumé : créer un composant, c’est déclarer une fonction nommée avec une majuscule qui renvoie du JSX, puis l’insérer avec `<Nom />`.",
        },
      ],
      exercises: [
        {
          id: 'm03-l02-e1',
          type: 'qcm',
          difficulty: 'facile',
          question: 'Comment affiche-t-on le composant `Titre` dans du JSX ?',
          options: ['<Titre />', '<titre />', 'Titre()', '<Titre></titre>'],
          answer: 0,
          hint: 'Il faut la majuscule et la balise auto-fermée.',
          explanation:
            "`<Titre />` respecte les deux règles : majuscule (pour que React reconnaisse un composant) et slash de fermeture. `<titre />` est en minuscule, donc React le prendrait pour une balise HTML inconnue ; `Titre()` serait un appel de fonction écrit dans le JSX ; `<Titre></titre>` mélange deux noms différents.",
        },
        {
          id: 'm03-l02-e2',
          type: 'fill',
          difficulty: 'facile',
          question: "Complétez la ligne qui renvoie le contenu du composant : `______ <p>Salut !</p>;`",
          accepted: ['return'],
          hint: 'Mot-clé anglais que l’on retrouve dans toutes les fonctions qui renvoient une valeur.',
          explanation:
            "`return` est le mot-clé qui livre le JSX au composant appelant : sans lui, la fonction ne renvoie rien et la page reste vide. Ce n’est ni `print` (Python) ni `yield`, qui n’ont aucun rôle ici.",
        },
        {
          id: 'm03-l02-e3',
          type: 'code',
          difficulty: 'intermédiaire',
          language: 'jsx',
          question:
            "Créez un composant `Titre` qui affiche « Bienvenue dans mon site » dans un `h1`, puis affichez-le depuis `App`.",
          template: "function Titre() {\n  // votre code ici\n}\n\nfunction App() {\n  // affichez <Titre /> ici\n}\n",
          solution:
            "function Titre() {\n  return <h1>Bienvenue dans mon site</h1>;\n}\n\nfunction App() {\n  return <Titre />;\n}\n\nReactDOM.createRoot(document.getElementById('root')).render(<App />);",
          mustContain: ['<h1>Bienvenue dans mon site</h1>', '<Titre />'],
          hint: 'Deux return : un dans Titre (le h1), un dans App (l’usage du composant).',
          explanation:
            "`Titre` renvoie le `<h1>` demandé, et `App` renvoie `<Titre />` : c’est la chaîne classique d’un composant qui en appelle un autre. Le rendu final passe par `ReactDOM.createRoot(...).render(<App />)` qui insère le tout dans le conteneur `root`.",
        },
        {
          id: 'm03-l02-e4',
          type: 'debug',
          difficulty: 'avancé',
          language: 'jsx',
          question: "Ce code devrait afficher « Bonjour ! » une seule fois. Trouvez les erreurs et corrigez le tout.",
          template:
            "function Salut() {\n  <p>Bonjour !</p>;\n}\n\nfunction App() {\n  return <salut />;\n}",
          solution:
            "function Salut() {\n  return <p>Bonjour !</p>;\n}\n\nfunction App() {\n  return <Salut />;\n}\n\nReactDOM.createRoot(document.getElementById('root')).render(<App />);",
          mustContain: ['return <p>Bonjour !</p>;', '<Salut />'],
          hint: 'Deux erreurs : une dans le corps de Salut, une dans la façon de l’utiliser.',
          explanation:
            "Première erreur : `Salut` n’a pas de `return`, donc elle ne renvoie aucun JSX. Deuxième erreur : `<salut />` est en minuscule, alors que React exige une majuscule pour reconnaître un composant. Après correction, `App` renvoie `<Salut />`, qui affiche « Bonjour ! ».",
        },
      ],
    },
    {
      id: 'm03-l03',
      title: 'Composants fonctionnels',
      minutes: 8,
      objectives: [
        'Expliquer pourquoi un composant est une fonction',
        'Distinguer déclaration et utilisation d’un composant',
        'Écrire un composant avec la syntaxe flèche',
      ],
      blocks: [
        {
          type: 'p',
          text: "Le mot « composant » peut paraître intimidant, mais derrière il n’y a rien d’exotique : c’est une fonction JavaScript. React se contente de l’appeler pour récupérer le JSX que vous avez écrit, puis d’afficher le résultat.",
        },
        { type: 'h', text: 'Explication simple' },
        {
          type: 'p',
          text: "Une fonction est un bloc de code nommé que l’on peut appeler autant de fois qu’on veut. Un composant fonctionnel est exactement cela, avec une règle d’or : on écrit son nom avec une majuscule, et on ne met pas de parenthèses quand on l’utilise dans le JSX. Il existe deux syntaxes équivalentes : la fonction classique (`function`) et la fonction flèche (`=>`).",
        },
        {
          type: 'list',
          items: [
            'React appelle votre fonction à chaque affichage : c’est elle qui fabrique le JSX.',
            'Déclarer : `function Slogan() { … }` ou `const Slogan = () => { … }`.',
            'Utiliser : `<Slogan />` — sans parenthèses, comme une balise.',
            'La fonction flèche s’écrit avec `=>`, le symbole « flèche ».',
          ],
        },
        {
          type: 'code',
          lang: 'jsx',
          code: "function Slogan() {\n  return <p>J’apprends React !</p>;\n}\n\nconst Accueil = () => {\n  return <p>Bienvenue !</p>;\n};",
          caption: 'Deux syntaxes équivalentes pour un composant fonctionnel',
        },
        {
          type: 'list',
          items: [
            'Ligne 1 : `function Slogan()` déclare le composant avec la syntaxe classique.',
            'Ligne 5 : `const Accueil = () => {` utilise la syntaxe flèche ; `=>` est le symbole de la fonction flèche.',
            'Lignes 2 et 6 : les deux composants renvoient du JSX, c’est tout ce que React demande.',
            'Quelle que soit la syntaxe, le nom commence par une majuscule et se termine par `;` pour la flèche.',
          ],
        },
        { type: 'result', text: "À l’écran : si vous utilisez l’un ou l’autre, une phrase dans un paragraphe : « J’apprends React ! » ou « Bienvenue ! »." },
        {
          type: 'mistake',
          text: "Appeler le composant dans le JSX : `<Slogan>()`. Les parenthèses sont interdites à cet endroit.",
          fix: "Écrire `<Slogan />` : React sait qu’il doit appeler la fonction lui-même.",
        },
        {
          type: 'mistake',
          text: "Confondre la déclaration et l’utilisation : définir `Salut` mais afficher `<Accueil />` alors qu’`Accueil` n’existe pas.",
          fix: "Vérifier que le nom utilisé dans le JSX correspond exactement à celui déclaré.",
        },
        {
          type: 'quote',
          text: "Résumé : un composant fonctionnel est une fonction JavaScript nommée avec une majuscule qui renvoie du JSX ; on le déclare avec `function` ou avec `=>`, et on l’utilise comme une balise.",
        },
      ],
      exercises: [
        {
          id: 'm03-l03-e1',
          type: 'qcm',
          difficulty: 'facile',
          question: 'Que fait React avec votre composant ?',
          options: [
            'Il le transforme en fichier CSS',
            'Il appelle la fonction pour récupérer du JSX et l’affiche',
            'Il le supprime du code après usage',
            'Il le copie dans la page toutes les secondes sans raison',
          ],
          answer: 1,
          hint: 'Le composant est une fonction : on l’appelle pour obtenir un résultat.',
          explanation:
            "React appelle la fonction, récupère le JSX qu’elle renvoie et l’insère dans la page : c’est tout le mécanisme. React ne produit pas de CSS, ne supprime pas votre code et n’a aucune raison de le recopier en boucle.",
        },
        {
          id: 'm03-l03-e2',
          type: 'short',
          difficulty: 'facile',
          question: 'Un composant React est appelé par vous (avec des parenthèses) ou par React ?',
          accepted: ['react', 'par react'],
          hint: 'Dans le JSX, on écrit `<Nom />`, pas `<Nom />()`.',
          explanation:
            "C’est React qui appelle la fonction : dans le JSX vous écrivez `<Slogan />` sans parenthèses, et React transforme cela en appel de fonction. Si vous ajoutiez `()`, vous afficheriez le résultat de l’appel écrit dans du JSX, ce qui n’est pas la façon correcte d’utiliser un composant.",
        },
        {
          id: 'm03-l03-e3',
          type: 'fill',
          difficulty: 'intermédiaire',
          question: "Complétez : `const Slogan = ______ => { … }` — le symbole `=>` définit une fonction ______.",
          accepted: ['flèche', 'fleche', 'arrow'],
          hint: 'Son nom vient du symbole lui-même, qui ressemble à une flèche.',
          explanation:
            "La fonction flèche (arrow function en anglais) se reconnaît à son symbole `=>`. Elle est équivalente à `function Slogan() { … }` : seul le style change, le comportement du composant est identique.",
        },
        {
          id: 'm03-l03-e4',
          type: 'code',
          difficulty: 'avancé',
          language: 'jsx',
          question:
            "Écrivez le composant `Citation` avec la syntaxe `function`, puis réécrivez-le avec la syntaxe flèche (nommez cette seconde version `Citation2` pour éviter un conflit de noms). Affichez ensuite la version de votre choix dans `App`.",
          template: "// version classique\n\n// version flèche\n",
          solution:
            "function Citation() {\n  return <p>Rien n’est impossible</p>;\n}\n\nconst Citation2 = () => {\n  return <p>Rien n’est impossible</p>;\n};\n\nfunction App() {\n  return <Citation />;\n}\n\nReactDOM.createRoot(document.getElementById('root')).render(<App />);",
          mustContain: ['function Citation()', 'const Citation2 = () =>'],
          hint: 'Même contenu, deux déclarations différentes ; la flèche se termine par `};`.',
          explanation:
            "Les deux déclarations produisent le même affichage : `function Citation()` et `const Citation2 = () => { … };` sont deux façons d’écrire une fonction. Seule la seconde utilise la syntaxe flèche et se termine par `};` (accolade fermante + point-virgule). Dans l’exemple, `App` affiche la première version.",
        },
      ],
    },
    {
      id: 'm03-l04',
      title: 'Réutilisation des composants',
      minutes: 8,
      objectives: [
        'Utiliser plusieurs fois le même composant',
        'Comprendre l’intérêt de ne pas dupliquer le code',
        'Modifier un composant à un seul endroit',
      ],
      blocks: [
        {
          type: 'p',
          text: "Votre page contient le même bouton dans l’en-tête et en pied de page. Deux boutons à entretenir ? Non : un seul composant, utilisé deux fois. C’est la grande force des composants : on écrit une fois, on affiche partout.",
        },
        { type: 'h', text: 'Explication simple' },
        {
          type: 'p',
          text: "Un composant peut être utilisé autant de fois que nécessaire, dans autant de parents différents. Chaque usage est indépendant visuellement, mais toutes les occurrences partagent le même code : si vous changez le texte du bouton, il change partout en une seule modification.",
        },
        {
          type: 'list',
          items: [
            'Un composant s’insère avec `<Nom />` où que ce soit dans le JSX.',
            'Écrire `<Bouton />` quatre fois, c’est afficher quatre boutons.',
            'Modifier le composant change toutes ses apparitions en même temps.',
            'Règle d’or : si un morceau de code se répète, il devient un composant.',
          ],
        },
        {
          type: 'code',
          lang: 'jsx',
          code: "function Bouton() {\n  return <button>Réserver</button>;\n}\n\nfunction Entete() {\n  return (\n    <header>\n      <Bouton />\n    </header>\n  );\n}\n\nfunction Pied() {\n  return (\n    <footer>\n      <Bouton />\n    </footer>\n  );\n}",
          caption: 'Le même composant utilisé dans deux endroits différents',
        },
        {
          type: 'list',
          items: [
            'Ligne 1 : `function Bouton()` crée un seul composant bouton.',
            'Lignes 5 et 13 : `Entete` et `Pied` sont deux composants parents différents.',
            'Lignes 8 et 16 : `<Bouton />` apparaît dans chacun d’eux.',
            'Le texte « Réserver » n’est écrit qu’une fois, en ligne 2.',
          ],
        },
        { type: 'result', text: "À l’écran : un bouton « Réserver » dans l’en-tête et un bouton identique en pied de page." },
        {
          type: 'mistake',
          text: "Copier le code du bouton dans `Pied` au lieu d’utiliser `<Bouton />` : vous devrez corriger les deux copies à chaque changement.",
          fix: "Réutiliser `<Bouton />` dans chaque parent : une seule version du code à maintenir.",
        },
        {
          type: 'mistake',
          text: "Modifier le texte de `Bouton` en pensant ne changer qu’une seule apparition.",
          fix: "Retenir que toutes les occurrences changent ensemble : c’est justement l’avantage.",
        },
        {
          type: 'quote',
          text: "Résumé : un composant s’utilise autant de fois que nécessaire avec `<Nom />` ; le code reste écrit une seule fois et se met à jour partout.",
        },
      ],
      exercises: [
        {
          id: 'm03-l04-e1',
          type: 'qcm',
          difficulty: 'facile',
          question: 'Pourquoi réutiliser un composant plutôt que copier son code ?',
          options: [
            'Pour écrire plus de lignes de code',
            'Pour modifier le contenu à un seul endroit',
            'Parce que React interdit les pages d’une seule pièce',
            'Pour éviter d’utiliser JavaScript',
          ],
          answer: 1,
          hint: 'Imaginez 30 copies à corriger à chaque changement…',
          explanation:
            "La réutilisation signifie une seule source de vérité : un changement dans le composant se propage à tous ses usages, ce qui évite les erreurs de maintenance. L’objectif n’est certainement pas d’écrire plus de code, et rien n’interdit en React d’avoir un composant unique.",
        },
        {
          id: 'm03-l04-e2',
          type: 'short',
          difficulty: 'facile',
          question: 'Si `<Bouton />` est écrit 4 fois dans la page, combien de boutons s’affichent ?',
          accepted: ['4', 'quatre'],
          hint: 'Une occurrence = un affichage.',
          explanation:
            "Chaque `<Bouton />` insère une nouvelle occurrence du composant dans l’arbre affiché : quatre écritures donnent quatre boutons. C’est la réutilisation en action : le même code produit plusieurs éléments.",
        },
        {
          id: 'm03-l04-e3',
          type: 'code',
          difficulty: 'intermédiaire',
          language: 'jsx',
          question:
            "Créez un composant `Carte` qui affiche « Promo du jour » dans un `p`, puis affichez-le trois fois dans une `section`.",
          template: "function Carte() {\n  // votre code ici\n}\n\nfunction Page() {\n  // votre code ici\n}\n",
          solution:
            "function Carte() {\n  return <p>Promo du jour</p>;\n}\n\nfunction Page() {\n  return (\n    <section>\n      <Carte />\n      <Carte />\n      <Carte />\n    </section>\n  );\n}\n\nReactDOM.createRoot(document.getElementById('root')).render(<Page />);",
          mustContain: ['<p>Promo du jour</p>', '<Carte />'],
          hint: 'Une seule définition de Carte, trois utilisations dans le return de Page.',
          explanation:
            "`Carte` est déclaré une seule fois et renvoie le paragraphe demandé ; `Page` l’insère trois fois dans une `section`, donc le texte « Promo du jour » apparaît trois fois. Coder une seule définition permet de corriger le texte plus tard à un seul endroit.",
        },
        {
          id: 'm03-l04-e4',
          type: 'debug',
          difficulty: 'avancé',
          language: 'jsx',
          question: "Ce code doit afficher deux boutons « Réserver », l’un dans l’en-tête, l’autre en pied de page. Trouvez les erreurs.",
          template:
            "function Bouton() {\n  return <button>Réserver</button>;\n}\n\nfunction Entete() {\n  return <header><bouton /></header>;\n}\n\nfunction Pied() {\n  return <button>Réserver</button>;\n}",
          solution:
            "function Bouton() {\n  return <button>Réserver</button>;\n}\n\nfunction Entete() {\n  return <header><Bouton /></header>;\n}\n\nfunction Pied() {\n  return <footer><Bouton /></footer>;\n}\n\nReactDOM.createRoot(document.getElementById('root')).render(\n  <div>\n    <Entete />\n    <Pied />\n  </div>\n);",
          mustContain: ['<Bouton />', '<header>'],
          hint: 'Deux défauts : un nom de balise et un code dupliqué.',
          explanation:
            "Première erreur : `<bouton />` est en minuscule, React ne le reconnaît pas comme le composant `Bouton`. Deuxième erreur : dans `Pied`, le bouton est recopié en dur au lieu d’appeler `<Bouton />`, ce qui casse le principe de réutilisation. Après correction, un seul code de bouton sert aux deux parents.",
        },
      ],
    },
    {
      id: 'm03-l05',
      title: 'Organisation des fichiers',
      minutes: 7,
      objectives: [
        'Placer chaque composant dans son propre fichier',
        'Utiliser le dossier `src/components`',
        'Nommer un fichier comme le composant qu’il contient',
      ],
      blocks: [
        {
          type: 'p',
          text: "Votre premier projet tient dans un fichier, mais une vraie application contiendra des dizaines de composants. Si tout se mélange dans `App.jsx`, personne ne retrouvera plus rien : rangez chaque composant dans son fichier.",
        },
        { type: 'h', text: 'Explication simple' },
        {
          type: 'p',
          text: "La convention la plus courante dans un projet Vite est de créer un dossier `src/components/` et d’y déposer un fichier par composant, en donnant au fichier le même nom que le composant. Ainsi, chercher `Carte`, c’est ouvrir `Carte.jsx`.",
        },
        {
          type: 'list',
          items: [
            'Un composant = un fichier : `Bouton.jsx` contient le composant `Bouton`.',
            'Les composants sont rangés dans `src/components/`.',
            'L’extension est `.jsx` (ou `.tsx` si votre projet utilise TypeScript).',
            'Le fichier reste du JavaScript : rien de magique, juste du rangement.',
          ],
        },
        {
          type: 'code',
          lang: 'text',
          code: "src/\n├── components/\n│   ├── Entete.jsx\n│   └── Carte.jsx\n├── App.jsx\n└── main.jsx",
          caption: 'Une arborescence claire : un fichier par composant',
        },
        {
          type: 'list',
          items: [
            'Ligne 1 : `src/` est le dossier qui contient tout votre code source.',
            'Lignes 2 à 4 : `components/` regroupe les composants réutilisables.',
            'Lignes 5 et 6 : `App.jsx` assemble la page, `main.jsx` démarre l’application.',
            'Le nom du fichier (`Carte.jsx`) correspond au nom du composant (`Carte`).',
          ],
        },
        { type: 'result', text: "À l’écran : rien ne change visuellement ; en revanche, votre projet devient facile à parcourir et à faire évoluer." },
        {
          type: 'mistake',
          text: "Tout écrire dans `App.jsx` : le fichier grossit jusqu’à devenir illisible.",
          fix: "Extraire chaque composant réutilisable dans son propre fichier de `src/components/`.",
        },
        {
          type: 'mistake',
          text: "Nommer les fichiers au hasard : `compo1.jsx`, `truc.jsx`.",
          fix: "Reprendre exactement le nom du composant, avec la même majuscule : `Entete.jsx` pour `Entete`.",
        },
        {
          type: 'quote',
          text: "Résumé : un composant par fichier, rangé dans `src/components/`, avec un nom de fichier identique au nom du composant.",
        },
      ],
      exercises: [
        {
          id: 'm03-l05-e1',
          type: 'qcm',
          difficulty: 'facile',
          question: 'Où place-t-on en général un composant dans un projet Vite ?',
          options: [
            'Dans le fichier `index.html`',
            'Dans le dossier `src/components/`',
            'Dans le fichier CSS du projet',
            'Dans la ligne de commande',
          ],
          answer: 1,
          hint: 'Le code source vit dans `src/`.',
          explanation:
            "La convention d’un projet Vite est de ranger les composants dans `src/components/` : `src/` contient le code source, `components/` regroupe les morceaux réutilisables. `index.html` accueille uniquement le point d’entrée de la page, le CSS ne contient pas de composants JavaScript et la commande ne stocke aucun fichier.",
        },
        {
          id: 'm03-l05-e2',
          type: 'fill',
          difficulty: 'facile',
          question: "Complétez : le fichier qui contient le composant `Bouton` s’appelle `______`.",
          accepted: ['bouton.jsx', 'bouton'],
          hint: 'Même nom que le composant, en minuscules ou tel quel, avec l’extension du JSX.',
          explanation:
            "La convention impose de reprendre le nom du composant pour le fichier : `Bouton` vit dans `Bouton.jsx`, autrement dit `bouton.jsx` selon la casse choisie. Un nom de fichier sans rapport avec le composant rend le projet impossible à parcourir.",
        },
        {
          id: 'm03-l05-e3',
          type: 'code',
          difficulty: 'intermédiaire',
          language: 'jsx',
          question: "Écrivez le contenu du fichier `Entete.jsx` : un composant `Entete` qui affiche « Mon site » dans un `h1`.",
          template: "function Entete() {\n  // votre code ici\n}\n",
          solution: "function Entete() {\n  return <h1>Mon site</h1>;\n}",
          mustContain: ['function Entete()', '<h1>Mon site</h1>'],
          hint: 'Le fichier contient exactement une fonction nommée Entete qui renvoie du JSX.',
          explanation:
            "Le fichier `Entete.jsx` contient la fonction `Entete` qui renvoie le `h1` demandé : c’est un composant complet, prêt à être importé ailleurs (nous verrons l’import et l’export dans la leçon suivante). L’important est qu’un seul composant y figure, nommé comme le fichier.",
        },
        {
          id: 'm03-l05-e4',
          type: 'short',
          difficulty: 'avancé',
          question:
            "Un fichier contient deux composants, `Entete` et `Pied`. Que recommande l’organisation enseignée dans cette leçon ?",
          accepted: ['un fichier par composant', 'separer chaque composant dans son fichier', 'deux fichiers separes'],
          hint: 'Appliquez la règle : un composant = un fichier.',
          explanation:
            "La règle « un composant = un fichier » impose de scinder `Entete.jsx` et `Pied.jsx` : chacun devient indépendant, réutilisable et facile à retrouver. Garder les deux ensemble oblige à ouvrir le même fichier pour toute modification et mélange deux responsabilités différentes.",
        },
      ],
    },
    {
      id: 'm03-l06',
      title: 'Import et export',
      minutes: 9,
      objectives: [
        'Rendre un composant accessible avec `export`',
        'Récupérer un composant avec `import`',
        'Comprendre le chemin relatif d’un import',
      ],
      blocks: [
        {
          type: 'p',
          text: "Votre composant `Carte` est bien rangé dans `Carte.jsx`, mais `App.jsx` ne le connaît pas : chaque fichier JavaScript est isolé. Pour relier les deux, on utilise deux mots-clés complémentaires : `export` pour proposer, `import` pour récupérer.",
        },
        { type: 'h', text: 'Explication simple' },
        {
          type: 'p',
          text: "`export` déclare qu’un contenu du fichier est disponible à l’extérieur ; `import` récupère ce contenu dans un autre fichier. Dans un projet Vite, on écrit surtout `export default` (un composant principal par fichier) puis `import Nom from './chemin';`. Le chemin commence par `./` car il désigne un fichier voisin.",
        },
        {
          type: 'list',
          items: [
            'Dans `Carte.jsx` : `export default function Carte() { … }`.',
            "Dans `App.jsx` : `import Carte from './components/Carte';`.",
            'Le chemin est relatif : `./` veut dire « à partir d’ici ».',
            'Le nom choisi après `import` est libre, mais on garde celui du composant.',
          ],
        },
        {
          type: 'code',
          lang: 'jsx',
          code: "// Carte.jsx\nexport default function Carte() {\n  return <div>Carte réutilisable</div>;\n}\n\n// App.jsx\nimport Carte from \"./components/Carte\";\n\nfunction App() {\n  return <Carte />;\n}",
          caption: 'Export à gauche, import à droite : le même composant circule d’un fichier à l’autre',
        },
        {
          type: 'list',
          items: [
            'Ligne 2 : `export default` met le composant `Carte` à disposition des autres fichiers.',
            'Ligne 7 : `import Carte from …` récupère ce composant dans `App.jsx`.',
            'Le chemin `"./components/Carte"` indique où trouver le fichier, depuis le fichier courant.',
            'Ligne 10 : une fois importé, `<Carte />` s’utilise comme d’habitude.',
          ],
        },
        { type: 'result', text: "À l’écran : le texte « Carte réutilisable », affiché grâce à un composant écrit dans un autre fichier." },
        {
          type: 'mistake',
          text: "Oublier `export default` : l’import échoue et le composant est introuvable.",
          fix: "Placer `export default` devant la déclaration du composant à partager.",
        },
        {
          type: 'mistake',
          text: "Écrire le chemin sans le point : `import Carte from 'components/Carte'`.",
          fix: "Commencer le chemin par `./`, sinon le navigateur cherche un paquet externe au lieu d’un fichier local.",
        },
        {
          type: 'quote',
          text: "Résumé : `export` rend un composant disponible, `import` le récupère ; le chemin d’import est relatif et commence par `./`.",
        },
      ],
      exercises: [
        {
          id: 'm03-l06-e1',
          type: 'qcm',
          difficulty: 'facile',
          question: 'Quelle paire permet d’utiliser un composant écrit dans un autre fichier ?',
          options: [
            '`export` dans le fichier source et `import` dans le fichier qui l’utilise',
            '`send` et `receive`',
            '`copy` et `paste`',
            '`export` et `delete`',
          ],
          answer: 0,
          hint: 'L’un propose, l’autre récupère.',
          explanation:
            "`export` déclare que le contenu est partageable, `import` le récupère : c’est le duo des modules JavaScript. `send`/`receive` et `copy`/`paste` n’existent pas dans le langage, et `delete` supprimerait au lieu de récupérer.",
        },
        {
          id: 'm03-l06-e2',
          type: 'fill',
          difficulty: 'facile',
          question: "Complétez : `______ Carte from './components/Carte';`",
          accepted: ['import'],
          hint: 'C’est le mot-clé qui récupère un export.',
          explanation:
            "`import` est le mot-clé qui récupère l’export du fichier cible ; il est suivi du nom local, du mot `from` et du chemin. `export` serait écrit dans l’autre fichier, et `require` appartient à un ancien système de modules non utilisé par Vite.",
        },
        {
          id: 'm03-l06-e3',
          type: 'code',
          difficulty: 'intermédiaire',
          language: 'jsx',
          question:
            "Écrivez les deux fichiers : `Bouton.jsx` qui exporte un composant `Bouton` (un `button` avec le texte « Cliquer »), et `App.jsx` qui l’importe et l’affiche.",
          template: "// Bouton.jsx\n// votre code ici\n\n// App.jsx\n// votre code ici\n",
          solution:
            "export default function Bouton() {\n  return <button>Cliquer</button>;\n}\n\n// App.jsx\nimport Bouton from './Bouton';\n\nfunction App() {\n  return <Bouton />;\n}\n\nReactDOM.createRoot(document.getElementById('root')).render(<App />);",
          mustContain: ['export default', '<Bouton />'],
          hint: 'Deux mots-clés clés : l’un dans Bouton.jsx, l’autre dans App.jsx.',
          explanation:
            "`export default` dans `Bouton.jsx` rend le composant partageable, et `import Bouton from './Bouton'` le récupère dans `App.jsx` avant de l’insérer avec `<Bouton />`. Sans l’export, l’import échouerait ; sans l’import, `App` ne connaîtrait pas `Bouton`.",
        },
        {
          id: 'm03-l06-e4',
          type: 'debug',
          difficulty: 'avancé',
          language: 'jsx',
          question: "Ce code affiche une erreur : le composant `Bouton` ne peut pas être trouvé. Corrigez les deux fichiers.",
          template:
            "// App.jsx\nimport Bouton from 'Bouton';\n\nfunction App() {\n  return <Bouton />;\n}\n\n// Bouton.jsx\nfunction Bouton() {\n  return <button>Cliquer</button>;\n}",
          solution:
            "// App.jsx\nimport Bouton from './Bouton';\n\nfunction App() {\n  return <Bouton />;\n}\n\n// Bouton.jsx\nexport default function Bouton() {\n  return <button>Cliquer</button>;\n}\n\nReactDOM.createRoot(document.getElementById('root')).render(<App />);",
          mustContain: ['./Bouton', 'export default'],
          hint: 'Deux défauts : un chemin et un mot-clé manquant.',
          explanation:
            "Première erreur : le chemin `'Bouton'` sans `./` désigne un paquet externe, alors que le fichier est voisin — il faut `'./Bouton'`. Deuxième erreur : `Bouton` n’est pas exporté, donc l’import ne peut rien récupérer. Ajouter `export default` résout le problème.",
        },
      ],
    },
    {
      id: 'm03-l07',
      title: 'Composants imbriqués',
      minutes: 8,
      objectives: [
        'Composer un composant à partir d’autres composants',
        'Distinguer composant parent et composant enfant',
        'Assembler une page à plusieurs niveaux',
      ],
      blocks: [
        {
          type: 'p',
          text: "Une page ressemble à des poupées russes : l’écran global contient une en-tête, qui contient un logo et un menu, qui contiennent eux-mêmes des liens. En React, chaque niveau est un composant qui contient d’autres composants.",
        },
        { type: 'h', text: 'Explication simple' },
        {
          type: 'p',
          text: "Un composant peut utiliser d’autres composants dans son JSX, exactement comme on écrit des balises les unes dans les autres. Celui qui contient s’appelle le composant parent, celui qui est inséré dedans est le composant enfant. L’enfant reste autonome : il peut être utilisé ailleurs, dans d’autres parents.",
        },
        {
          type: 'list',
          items: [
            'Un composant enfant s’écrit à l’intérieur du JSX du parent : `<Parent><Enfant /></Parent>`.',
            'Le parent décrit la structure, l’enfant décrit un morceau précis.',
            'Un même enfant peut servir dans plusieurs parents.',
            'L’assemblage se fait niveau par niveau, jusqu’à la page complète.',
          ],
        },
        {
          type: 'code',
          lang: 'jsx',
          code: "function Titre() {\n  return <h1>Mon journal</h1>;\n}\n\nfunction Paragraphe() {\n  return <p>Aujourd’hui, j’apprends React.</p>;\n}\n\nfunction Article() {\n  return (\n    <article>\n      <Titre />\n      <Paragraphe />\n    </article>\n  );\n}\n\nfunction App() {\n  return <Article />;\n}",
          caption: 'Trois niveaux d’imbrication : App → Article → Titre et Paragraphe',
        },
        {
          type: 'list',
          items: [
            'Lignes 1 et 5 : `Titre` et `Paragraphe` sont les composants enfants.',
            'Ligne 9 : `Article` est leur parent : il les utilise dans son JSX.',
            'Lignes 12 et 13 : `<Titre />` puis `<Paragraphe />` sont imbriqués dans `<article>`.',
            'Ligne 18 : `App` est le parent de `Article` : la page s’assemble ainsi, de l’intérieur vers l’extérieur.',
          ],
        },
        { type: 'result', text: "À l’écran : un article contenant le titre « Mon journal » puis le paragraphe « Aujourd’hui, j’apprends React. »." },
        {
          type: 'mistake',
          text: "Réécrire `<h1>Mon journal</h1>` dans `Article` alors que le composant `Titre` existe déjà.",
          fix: "Utiliser `<Titre />` : l’imbrication sert justement à réutiliser les composants.",
        },
        {
          type: 'mistake',
          text: "Mélanger les niveaux : écrire `<Article />` à l’intérieur de `Titre`, alors que c’est l’inverse.",
          fix: "Partir du plus grand bloc (la page) et descendre vers les morceaux détaillés.",
        },
        {
          type: 'quote',
          text: "Résumé : les composants s’imbriquent comme des balises ; le parent contient les enfants, et chaque enfant reste réutilisable ailleurs.",
        },
      ],
      exercises: [
        {
          id: 'm03-l07-e1',
          type: 'qcm',
          difficulty: 'facile',
          question:
            "Un composant `Page` utilise `<Entete />` et `<Pied />` dans son JSX. Quel est le composant parent ?",
          options: ['Page', 'Entete', 'Pied', 'Aucun : ils sont indépendants'],
          answer: 0,
          hint: 'Le parent est celui qui contient les autres dans son JSX.',
          explanation:
            "`Page` écrit `<Entete />` et `<Pied />` dans son return : c’est donc le parent, et les deux autres sont ses enfants. Inverser les rôles serait faux, car `Entete` et `Pied` ne contiennent pas `Page`. Ils restent bien réutilisables, mais dans cette relation, ce sont les enfants.",
        },
        {
          id: 'm03-l07-e2',
          type: 'short',
          difficulty: 'facile',
          question: 'Quel mot désigne un composant utilisé à l’intérieur d’un autre ?',
          accepted: ['enfant', 'composant enfant', 'child'],
          hint: 'L’image familiale : celui qui est contenant s’appelle parent.',
          explanation:
            "On parle de composant enfant (child en anglais) pour celui qui est inséré dans le JSX d’un parent. « Parent » désignerait l’inverse, et « voisin » ou « frère » ne décrivent pas cette relation de contenance.",
        },
        {
          id: 'm03-l07-e3',
          type: 'code',
          difficulty: 'intermédiaire',
          language: 'jsx',
          question:
            "Créez un composant `Titre` qui affiche « Mes photos » dans un `h2`, puis un composant `Galerie` qui l’imbrique dans un `section`. Affichez `Galerie` depuis `App`.",
          template: "function Titre() {\n  // votre code ici\n}\n\nfunction Galerie() {\n  // votre code ici\n}\n",
          solution:
            "function Titre() {\n  return <h2>Mes photos</h2>;\n}\n\nfunction Galerie() {\n  return (\n    <section>\n      <Titre />\n    </section>\n  );\n}\n\nfunction App() {\n  return <Galerie />;\n}\n\nReactDOM.createRoot(document.getElementById('root')).render(<App />);",
          mustContain: ['<h2>Mes photos</h2>', '<Titre />'],
          hint: 'Galerie est le parent : il écrit <Titre /> à l’intérieur de son <section>.',
          explanation:
            "`Titre` renvoie le `h2` demandé, `Galerie` l’insère dans un `section` — c’est l’enfant de `Galerie`. `App` referme la chaîne en affichant `<Galerie />`, ce qui produit un article structuré à deux niveaux.",
        },
        {
          id: 'm03-l07-e4',
          type: 'debug',
          difficulty: 'avancé',
          language: 'jsx',
          question: "Ce code doit afficher un titre « Photos » dans un section. Deux erreurs se cachent dedans : trouvez-les.",
          template:
            "function Titre() {\n  return <h2>Photos</h2>;\n}\n\nfunction Galerie() {\n  return (\n    <section>\n      <titre>\n    </section>\n  );\n}",
          solution:
            "function Titre() {\n  return <h2>Photos</h2>;\n}\n\nfunction Galerie() {\n  return (\n    <section>\n      <Titre />\n    </section>\n  );\n}\n\nReactDOM.createRoot(document.getElementById('root')).render(<Galerie />);",
          mustContain: ['<Titre />'],
          hint: 'Regardez la casse du nom, puis la fermeture de la balise.',
          explanation:
            "Première erreur : `<titre>` est en minuscule, donc React le prend pour une balise HTML inconnue au lieu du composant `Titre`. Deuxième erreur : la balise n’est pas fermée (il manque le `/`), ce qui casse le JSX. La forme correcte est `<Titre />`.",
        },
      ],
    },
    {
      id: 'm03-l08',
      title: 'Bonnes pratiques',
      minutes: 9,
      objectives: [
        'Découper un composant qui a plusieurs responsabilités',
        'Écrire des noms de composants explicites',
        'Garder un code JSX lisible et indenté',
      ],
      blocks: [
        {
          type: 'p',
          text: "Vous savez créer, réutiliser et organiser des composants. Reste à prendre de bons réflexes dès le début : quelques habitudes simples évitent les fichiers géants, les noms mystérieux et les pages impossibles à modifier.",
        },
        { type: 'h', text: 'Explication simple' },
        {
          type: 'p',
          text: "Une bonne pratique, c’est une règle simple qui vous fait gagner du temps plus tard. Pour les composants, l’essentiel tient en cinq points : une responsabilité par composant, un nom explicite en majuscule, un fichier par composant, la composition plutôt que la copie, et un JSX proprement indenté.",
        },
        {
          type: 'list',
          items: [
            'Un composant = une seule responsabilité : s’il fait tout, découpez-le.',
            'Des noms lisibles : `BoutonValider` plutôt que `Btn2`.',
            'Un composant par fichier, dans `src/components/`.',
            'Composer (`<Entete /> + <Pied />`) plutôt que dupliquer du code.',
            'Indenter le JSX : chaque niveau d’imbrication recule d’une tabulation.',
          ],
        },
        {
          type: 'code',
          lang: 'jsx',
          code: "// Entete.jsx\nexport default function Entete() {\n  return <h1>Mon site</h1>;\n}\n\n// App.jsx\nimport Entete from \"./components/Entete\";\n\nfunction App() {\n  return (\n    <main>\n      <Entete />\n    </main>\n  );\n}",
          caption: 'Un exemple propre : nom explicite, fichier dédié, imbrication indentée',
        },
        {
          type: 'list',
          items: [
            'Ligne 2 : `Entete` a un nom clair et une responsabilité unique, l’en-tête.',
            'Ligne 7 : l’import récupère le composant depuis son fichier dédié.',
            'Lignes 10 à 12 : le JSX est indenté, on voit immédiatement la structure.',
            'Ligne 11 : `<Entete />` est composé dans `<main>` au lieu d’être réécrit.',
          ],
        },
        { type: 'result', text: "À l’écran : un titre « Mon site » dans la page ; dans le code : un fichier court, clair et facile à corriger." },
        {
          type: 'mistake',
          text: "Créer un composant `Page1` qui contient tout l’écran : en-tête, contenu, formulaire et pied de page.",
          fix: "Découper en sous-composants (`Entete`, `Contenu`, `Pied`) puis les composer.",
        },
        {
          type: 'mistake',
          text: "Écrire un JSX profondément imbriqué sur une seule ligne, impossible à relire.",
          fix: "Mettre chaque enfant sur sa ligne et indenter d’un niveau par imbrication.",
        },
        {
          type: 'quote',
          text: "Résumé : de bons composants sont simples, bien nommés, un par fichier, réutilisés plutôt que copiés, et indentés pour rester lisibles.",
        },
      ],
      exercises: [
        {
          id: 'm03-l08-e1',
          type: 'qcm',
          difficulty: 'facile',
          question: 'Quelle est la meilleure raison de découper une page en plusieurs composants ?',
          options: [
            'Pour réutiliser les morceaux et ne modifier qu’un seul endroit',
            'Pour écrire le plus de lignes possible',
            'Parce qu’une page d’un seul bloc est interdite en React',
            'Pour éviter d’utiliser JavaScript',
          ],
          answer: 0,
          hint: 'Pensez maintenance et réutilisation.',
          explanation:
            "Le découpe rend le code réutilisable et limité : chaque modification se fait à un seul endroit, et chaque fichier reste court. Une page d’un seul composant n’est pas interdite en React, écrire plus de lignes n’est pas un objectif, et ces composants sont justement du JavaScript.",
        },
        {
          id: 'm03-l08-e2',
          type: 'fill',
          difficulty: 'intermédiaire',
          question: "Complétez : un bon nom de composant commence par une ______ et décrit ce qu’il affiche.",
          accepted: ['majuscule', 'lettre majuscule'],
          hint: 'Sans elle, React croit qu’il s’agit d’une balise HTML.',
          explanation:
            "La majuscule est obligatoire : elle signale à React qu’il s’agit d’un composant. Et un nom explicite (`CarteProduit` plutôt que `X`) permet de comprendre le rôle du composant sans ouvrir le fichier.",
        },
        {
          id: 'm03-l08-e3',
          type: 'code',
          difficulty: 'intermédiaire',
          language: 'jsx',
          question:
            "Appliquez les bonnes pratiques : créez `Ligne` qui affiche « Étape 1 » dans un `li`, puis `Etapes` qui l’utilise deux fois dans un `ol`. Affichez `Etapes`.",
          template: "function Ligne() {\n  // votre code ici\n}\n\nfunction Etapes() {\n  // votre code ici\n}\n",
          solution:
            "function Ligne() {\n  return <li>Étape 1</li>;\n}\n\nfunction Etapes() {\n  return (\n    <ol>\n      <Ligne />\n      <Ligne />\n    </ol>\n  );\n}\n\nReactDOM.createRoot(document.getElementById('root')).render(<Etapes />);",
          mustContain: ['<li>Étape 1</li>', '<Ligne />'],
          hint: 'Un composant par rôle, puis composition dans le parent.',
          explanation:
            "`Ligne` a une responsabilité unique (un élément de liste) et `Etapes` la compose deux fois dans un `ol`, au lieu de dupliquer le `<li>` : c’est exactement la pratique enseignée. L’indentation rend la structure visible d’un coup d’œil.",
        },
        {
          id: 'm03-l08-e4',
          type: 'debug',
          difficulty: 'avancé',
          language: 'jsx',
          question: "Ce code enfreint deux bonnes pratiques et ne fonctionne pas. Corrigez-le.",
          template:
            "function carte() {\n  return <div>Contenu</div>\n}\n\nfunction App() {\n  return <carte /> <carte />\n}",
          solution:
            "function Carte() {\n  return <div>Contenu</div>;\n}\n\nfunction App() {\n  return (\n    <div>\n      <Carte />\n      <Carte />\n    </div>\n  );\n}\n\nReactDOM.createRoot(document.getElementById('root')).render(<App />);",
          mustContain: ['function Carte()', '<Carte />'],
          hint: 'Deux défauts : une casse de nom et deux balises côte à côte.',
          explanation:
            "Première erreur : `carte` est en minuscule, React ne le reconnaît pas comme composant — il faut `Carte`. Deuxième erreur : deux éléments JSX côte à côte dans le `return` n’ont pas de racine unique ; on les enveloppe dans un `div`. Le point-virgule final complète l’écriture propre du code.",
        },
      ],
    },
  ],
};
