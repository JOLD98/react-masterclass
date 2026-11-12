import type { Module } from '../types';

export const module06: Module = {
  id: 'm06',
  number: 6,
  icon: '🧠',
  level: 'Débutant confirmé',
  title: 'Les states et useState',
  description: "Donnez la vie à vos composants avec l'état local et le Hook useState.",
  lessons: [
    {
      id: 'm06-l01',
      title: 'Comprendre le State',
      minutes: 8,
      objectives: ['Définir le state en une phrase', 'Distinguer props et state', 'Comprendre qu\'un changement de state rafraîchit l\'écran'],
      blocks: [
        { type: 'p', text: 'Un bouton « J\'aime » doit afficher 0, puis 1, puis 2… Or vos composants savent afficher, mais pas retenir. Pour garder une mémoire qui évolue au fil des clics, React dispose du state (« état » en français).' },
        { type: 'h', text: 'Explication simple' },
        { type: 'p', text: 'Le state est la mémoire interne d\'un composant. Contrairement aux props, il appartient au composant, il est modifiable par lui, et dès qu\'il change, React ré-affiche le composant automatiquement. Un state a une valeur de départ, puis évolue grâce à des fonctions de mise à jour.' },
        { type: 'list', items: ['Props : données externes, envoyées par le parent, en lecture seule.', 'State : données internes, possédées par le composant, modifiables.', 'Changer le state déclenche un nouveau rendu : l\'écran se met à jour tout seul.', 'Un state possède une valeur initiale définie à la création du composant.'] },
        { type: 'code', lang: 'jsx', caption: 'Un composant avec sa propre mémoire', code: `import { useState } from "react";

function Coeur() {
  const [likes, setLikes] = useState(0);

  function ajouter() {
    setLikes(likes + 1);
  }

  return <button onClick={ajouter}>{likes} like</button>;
}` },
        { type: 'list', items: ['Ligne 1 : `useState` est importé de React — c\'est la fonction qui crée un state.', 'Ligne 4 : `useState(0)` crée un state initialisé à 0 ; `likes` est la valeur, `setLikes` la fonction qui la change.', 'Ligne 7 : `setLikes(likes + 1)` demande une nouvelle valeur : React prévient l\'écran.', 'Ligne 10 : `{likes}` affiche la valeur courante du state dans le bouton.', 'La syntaxe exacte sera détaillée dans la leçon suivante : retenez surtout l\'idée de mémoire qui évolue.'] },
        { type: 'result', text: 'À l\'écran : un bouton « 0 like ». Après un clic : « 1 like », puis « 2 like »… sans jamais recharger la page.' },
        { type: 'mistake', text: 'Modifier une variable JavaScript ordinaire et s\'attendre à ce que l\'écran change : React ignore totalement cette variable.', fix: 'Une donnée qui doit apparaître à l\'écran et évoluer doit vivre dans un state, pas dans une variable locale.' },
        { type: 'mistake', text: 'Croire que React lit le state une seule fois : chaque changement provoque un nouveau rendu du composant.', fix: 'Pensez au state comme à une valeur affichée en continu : quand elle change, la vue change avec elle.' },
        { type: 'quote', text: 'Résumé : le state est la mémoire interne d\'un composant ; il est modifiable par le composant, et chaque changement met automatiquement l\'écran à jour.' },
      ],
      exercises: [
        {
          id: 'm06-l01-e1',
          type: 'qcm',
          difficulty: 'facile',
          question: 'Quelle est la vraie différence entre props et state ?',
          options: [
            'les props viennent du parent et sont en lecture seule, le state appartient au composant et est modifiable',
            'les props sont modifiables par l\'enfant, le state vient du parent',
            'les deux sont exactement la même chose',
            'le state sert à écrire du CSS, les props à afficher du texte',
          ],
          answer: 0,
          explanation: 'Les props descendent du parent et l\'enfant ne peut pas les changer ; le state est interne au composant, qui le modifie via ses fonctions de mise à jour. Les 3 autres propositions inversent, confondent ou inventent des rôles.',
        },
        {
          id: 'm06-l01-e2',
          type: 'short',
          difficulty: 'facile',
          question: 'Quel Hook React permet de créer un state dans un composant fonction ?',
          accepted: ['usestate', 'le hook usestate', 'hook usestate'],
          hint: 'Son nom commence par « use ».',
          explanation: '`useState` est le Hook qui crée un state : « use » + « state ». On l\'importe de React puis on l\'appelle dans le composant.',
        },
        {
          id: 'm06-l01-e3',
          type: 'code',
          difficulty: 'intermédiaire',
          language: 'jsx',
          question: 'Créez un composant `Visiteur` qui contient un state `nombre` initialisé à 1 et qui l\'affiche dans un `h2`.',
          template: `import { useState } from "react";

function Visiteur() {
  // votre code ici
}
`,
          solution: `import { useState } from "react";

function Visiteur() {
  const [nombre, setNombre] = useState(1);

  return <h2>Visiteur n° {nombre}</h2>;
}

ReactDOM.createRoot(document.getElementById('root')).render(<Visiteur />);`,
          mustContain: ['useState(1)', '<h2>'],
          hint: 'La ligne de déclaration ressemble à `const [valeur, setValeur] = useState(valeurInitiale) ;`.',
          explanation: '`useState(1)` crée le state avec la valeur initiale 1, déstructurée dans `nombre` (et sa fonction de mise à jour). Le `h2` affiche ensuite cette valeur.',
        },
      ],
    },
    {
      id: 'm06-l02',
      title: 'Introduction à useState',
      minutes: 9,
      objectives: ['Importer et appeler useState correctement', 'Déclarer un state et son setter', 'Respecter les règles des Hooks'],
      blocks: [
        { type: 'p', text: 'Vous avez vu `useState` en action : détaillons maintenant cette ligne qui fait toute la magie. Elle tient en un appel de fonction, mais renvoie deux choses à la fois.' },
        { type: 'h', text: 'Explication simple' },
        { type: 'p', text: 'Un Hook est une fonction fournie par React qui permet à un composant fonction d\'utiliser ses fonctionnalités internes. `useState(valeurInitiale)` retourne un tableau de deux éléments : la valeur actuelle du state, et la fonction pour la changer. On récupère ces deux éléments grâce à la destructuration vue dans le module précédent.' },
        { type: 'list', items: ['`import { useState } from "react";` est obligatoire en haut du fichier.', '`const [age, setAge] = useState(18);` : state `age` initialisé à 18.', '`age` lit la valeur courante, comme n\'importe quelle variable.', '`setAge` est la fonction à appeler pour changer cette valeur : son nom commence toujours par `set` suivi du nom du state.', 'Les Hooks s\'appellent toujours au début du corps du composant, jamais dans une condition ni dans une boucle.'] },
        { type: 'code', lang: 'jsx', caption: 'Déclarer un state', code: `import { useState } from "react";

function Age() {
  const [age, setAge] = useState(18);

  return <p>Vous avez {age} ans</p>;
}` },
        { type: 'list', items: ['Ligne 1 : import nommé `{ useState }` : on ne peut pas utiliser le Hook sans cet import.', 'Ligne 4 : `useState(18)` crée le state ; `18` est la valeur initiale.', 'Ligne 4 : la destructuration `[age, setAge]` sépare le tableau retourné en deux variables.', 'Ligne 6 : `{age}` affiche la valeur courante ; `setAge` sera utilisée dans la leçon suivante.', 'Si l\'ordre des deux variables est inversé, tout casse : le nom du setter est une convention respectée par React.'] },
        { type: 'result', text: 'À l\'écran : « Vous avez 18 ans ».' },
        { type: 'mistake', text: 'Oublier l\'import (`useState is not defined` dans la console) ou écrire `const age = useState(18);` sans destructurer : `age` contiendrait un tableau, pas le nombre 18.', fix: 'Toujours `import { useState } from "react";` en haut, puis `const [age, setAge] = useState(18);`.' },
        { type: 'mistake', text: 'Appeler `useState` après un `if` ou dans une boucle : React perd l\'ordre des Hooks et plante.', fix: 'Placer tous les appels `useState` au début du composant, à chaque rendu, dans le même ordre.' },
        { type: 'quote', text: 'Résumé : `useState(valeurInitiale)` renvoie la valeur actuelle et sa fonction de mise à jour ; on l\'importe de React et on l\'appelle en haut du composant.' },
      ],
      exercises: [
        {
          id: 'm06-l02-e1',
          type: 'qcm',
          difficulty: 'facile',
          question: 'Que renvoie l\'appel `useState(0)` ?',
          options: [
            'un tableau à deux éléments : la valeur du state et sa fonction de mise à jour',
            'le nombre 0 directement',
            'un composant React',
            'une promesse contenant la valeur',
          ],
          answer: 0,
          explanation: '`useState(0)` retourne un tableau `[0, setX]` que l\'on déstructure en deux variables. Ce n\'est pas la valeur seule (sinon on n\'aurait pas de setter), ni un composant, ni une promesse : `useState` est synchrone.',
        },
        {
          id: 'm06-l02-e2',
          type: 'fill',
          difficulty: 'facile',
          question: 'Complétez : `import { ____ } from "react";` puis `const [ville, setVille] = useState("Paris");`',
          accepted: ['usestate'],
          hint: 'Le Hook vu dans cette leçon.',
          explanation: 'Le Hook s\'appelle `useState` : c\'est lui qu\'il faut importer de React (l\'import nommé `{ useState }`), sinon le composant plante.',
        },
        {
          id: 'm06-l02-e3',
          type: 'debug',
          difficulty: 'avancé',
          language: 'jsx',
          question: 'Ce code comporte 3 erreurs liées aux Hooks. Corrigez-les pour que l\'écran affiche « Points : 10 ».',
          template: `function Score() {
  if (Date.now() > 0) {
    const [points, setPoints] = useState(10);
    console.log("Points : " + points);
  }

  return <p>Points : {points}</p>;
}
`,
          solution: `import { useState } from "react";

function Score() {
  const [points, setPoints] = useState(10);

  console.log("Points : " + points);

  return <p>Points : {points}</p>;
}

ReactDOM.createRoot(document.getElementById('root')).render(<Score />);`,
          mustContain: ['useState(10)', 'import { useState }'],
          expectedOutput: 'Points : 10',
          hint: 'Un Hook doit être importé, appelé au début du composant, et sa variable doit être visible dans le `return`.',
          explanation: 'Erreur 1 : `useState` n\'est pas importé. Erreur 2 : le Hook est appelé dans une condition — il doit toujours être au début du composant, à la racine. Erreur 3 : `points` était déclarée dans le bloc `if`, donc invisible dans le `return` (portée de variable). Déplacée en haut du composant, elle affiche bien « Points : 10 ».',
        },
      ],
    },
    {
      id: 'm06-l03',
      title: 'Modifier un State',
      minutes: 8,
      objectives: ['Changer un state avec son setter', 'Comprendre que l\'ancienne valeur reste jusqu\'au prochain rendu', 'Repérer les tentatives d\'affectation directe'],
      blocks: [
        { type: 'p', text: 'Vous savez créer un state : encore faut-il le changer. La tentation est grande d\'écrire `texte = "Au revoir"` comme avec n\'importe quelle variable. Dans React, cette ligne ne fait rien d\'utile — parfois même une erreur.' },
        { type: 'h', text: 'Explication simple' },
        { type: 'p', text: 'On ne réaffecte jamais la variable du state : on appelle la fonction `set...` reçue de `useState`. Cette fonction prévient React, qui recalcule le rendu du composant avec la nouvelle valeur. La fonction peut être appelée depuis n\'importe quelle fonction du composant — ici, un gestionnaire de clic, que nous étudierons en détail dans la leçon suivante.' },
        { type: 'list', items: ['`setTexte("Au revoir")` : la prochaine valeur affichée sera « Au revoir ».', 'La variable `texte` garde son ancienne valeur jusqu\'au prochain rendu.', 'On peut calculer la nouvelle valeur à partir de l\'ancienne : `setAge(age + 1)`.', 'La variable du state est constante : toute tentative d\'affectation provoque une erreur TypeScript.'] },
        { type: 'code', lang: 'jsx', caption: 'Changer un state avec son setter', code: `import { useState } from "react";

function Message() {
  const [texte, setTexte] = useState("Bonjour");

  function changer() {
    setTexte("Au revoir");
  }

  return (
    <div>
      <p>{texte}</p>
      <button onClick={changer}>Changer le message</button>
    </div>
  );
}` },
        { type: 'list', items: ['Ligne 4 : le state démarre sur « Bonjour ».', 'Ligne 7 : `setTexte("Au revoir")` demande à React de remplacer la valeur.', 'Ligne 11 : `{texte}` affiche la valeur courante : « Bonjour » puis, après le clic, « Au revoir ».', 'Ligne 12 : `onClick={changer}` appelle la fonction au clic — écriture détaillée dans la leçon suivante.', 'Rien ne se passe tant que `changer` n\'est pas appelée : déclarer une fonction ne l\'exécute pas.'] },
        { type: 'result', text: 'À l\'écran : « Bonjour » et un bouton « Changer le message ». Après le clic : « Au revoir ».' },
        { type: 'mistake', text: 'Écrire `texte = "Au revoir"` : la variable est déclarée avec `const`, donc erreur TypeScript — et même sans erreur, React ne serait pas prévenu.', fix: 'Passer par le setter : `setTexte("Au revoir")`.' },
        { type: 'mistake', text: 'S\'attendre à ce que `texte` change immédiatement dans la foulée du setter : la nouvelle valeur n\'est visible qu\'au prochain rendu.', fix: 'Après avoir appelé le setter, pensez que l\'écran sera réaffiché avec la nouvelle valeur, pas que la variable a changé dans le bloc en cours.' },
        { type: 'quote', text: 'Résumé : un state ne se modifie jamais directement, on appelle sa fonction `set...` ; React met alors à jour l\'écran.' },
      ],
      exercises: [
        {
          id: 'm06-l03-e1',
          type: 'qcm',
          difficulty: 'facile',
          question: 'Pour changer le state `age`, on écrit…',
          options: ['age = 20', 'setAge(20)', 'useState(20)', 'update(20)'],
          answer: 1,
          explanation: 'La fonction retournée par `useState` porte le nom `set` + nom du state : `setAge(20)`. `age = 20` modifierait la variable (interdit, elle est `const`), `useState(20)` recréerait un state, et `update` n\'existe pas en React.',
        },
        {
          id: 'm06-l03-e2',
          type: 'debug',
          difficulty: 'avancé',
          language: 'jsx',
          question: 'Ce code a 2 erreurs : le bouton ne change jamais le titre. Corrigez-les.',
          template: `import { useState } from "react";

function Titre() {
  const [titre, setTitre] = useState("React");

  function maj() {
    titre = "Vue";
  }

  return (
    <div>
      <h1>{titre}</h1>
      <button onClick={maj()}>Changer</button>
    </div>
  );
}
`,
          solution: `import { useState } from "react";

function Titre() {
  const [titre, setTitre] = useState("React");

  function maj() {
    setTitre("Vue");
  }

  return (
    <div>
      <h1>{titre}</h1>
      <button onClick={maj}>Changer</button>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<Titre />);`,
          mustContain: ['setTitre("Vue")', 'onClick={maj}'],
          hint: 'Une erreur est dans la fonction `maj`, l\'autre dans l\'attribut du bouton.',
          explanation: 'Erreur 1 : `titre = "Vue"` tente de réaffecter une variable `const` ; il faut appeler `setTitre("Vue")`. Erreur 2 : `onClick={maj()}` exécute la fonction au rendu ; il faut passer la référence `onClick={maj}`. Alors le clic affiche bien « Vue ».',
        },
        {
          id: 'm06-l03-e3',
          type: 'code',
          difficulty: 'intermédiaire',
          language: 'jsx',
          question: 'Créez un composant `Nom` avec un state `prenom` initialisé à « Léa », une fonction `changer` qui passe ce prénom à « Max », et un bouton qui appelle cette fonction au clic.',
          template: `import { useState } from "react";

function Nom() {
  const [prenom, setPrenom] = useState("Léa");

  // votre code ici
}
`,
          solution: `import { useState } from "react";

function Nom() {
  const [prenom, setPrenom] = useState("Léa");

  function changer() {
    setPrenom("Max");
  }

  return (
    <div>
      <p>{prenom}</p>
      <button onClick={changer}>Changer de prénom</button>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<Nom />);`,
          mustContain: ['setPrenom("Max")', 'onClick={changer}'],
          hint: 'Le setter s\'appelle exactement comme le state, avec un `set` devant.',
          explanation: 'Le state est créé avec `useState("Léa")`, la fonction `changer` appelle `setPrenom("Max")` (et non `prenom = ...`), et le bouton référence la fonction sans parenthèses.',
        },
      ],
    },
    {
      id: 'm06-l04',
      title: 'Gérer les événements',
      minutes: 9,
      objectives: ['Associer une fonction à un événement', 'Distinguer référence et appel de fonction', 'Respecter la casse des événements React'],
      blocks: [
        { type: 'p', text: 'Une page qui change toute seule est amusante un quart d\'heure. Une vraie interface réagit à l\'utilisateur : clics, frappes, survols. C\'est ce qu\'on appelle les événements.' },
        { type: 'h', text: 'Explication simple' },
        { type: 'p', text: 'Un événement est une action de l\'utilisateur (ou du navigateur). React propose des attributs spéciaux dont le nom commence par `on` suivi du nom de l\'événement en majuscule : `onClick`, `onChange`, `onSubmit`. On y associe une fonction, appelée gestionnaire (ou handler), qui s\'exécute à chaque fois que l\'événement se produit.' },
        { type: 'list', items: ['`onClick={maFonction}` : appelle `maFonction` quand on clique.', 'Écrire `onClick={maFonction()}` appelle la fonction immédiatement au rendu : erreur classique.', 'La fonction peut être déclarée avant le `return`, ou écrite en ligne : `onClick={() => ...}`.', 'La casse compte : `onclick` (minuscule) n\'est pas reconnu par React.'] },
        { type: 'code', lang: 'jsx', caption: 'Un bouton qui déclenche une fonction', code: `import { useState } from "react";

function Panneau() {
  const [visuel, setVisuel] = useState("Éteint");

  function allumer() {
    setVisuel("Allumé");
  }

  return (
    <div>
      <p>Lampe : {visuel}</p>
      <button onClick={allumer}>Allumer</button>
    </div>
  );
}` },
        { type: 'list', items: ['Ligne 4 : le state démarre sur « Éteint ».', 'Lignes 6 à 8 : la fonction `allumer` contient l\'action à réaliser.', 'Ligne 12 : `onClick={allumer}` transmet la fonction elle-même, sans parenthèses.', 'Ligne 13 : `{visuel}` réaffiche la valeur du state à chaque changement.', 'Équivalent en ligne : `onClick={() => setVisuel("Allumé")}` — la flèche crée une fonction qui sera appelée au clic.'] },
        { type: 'result', text: 'À l\'écran : « Lampe : Éteint » et le bouton « Allumer ». Après le clic : « Lampe : Allumé ».' },
        { type: 'mistake', text: 'Écrire `onClick={allumer()}` : la fonction s\'exécute dès le rendu, le bouton reçoit `undefined` et ne fait plus rien.', fix: 'Passer la fonction sans parenthèses : `onClick={allumer}`, ou une flèche : `onClick={() => allumer()}`.' },
        { type: 'mistake', text: 'Écrire `onclick` en minuscules, ou `onclick="allumer"` avec un texte : React utilise la casse camelCase et attend une fonction, pas une chaîne.', fix: 'Respecter la casse et passer la fonction entre accolades : `onClick={allumer}`.' },
        { type: 'quote', text: 'Résumé : un événement React associe une fonction à une action de l\'utilisateur ; on passe la référence de la fonction, jamais son résultat.' },
      ],
      exercises: [
        {
          id: 'm06-l04-e1',
          type: 'qcm',
          difficulty: 'facile',
          question: 'Quel attribut React utilise-t-on pour réagir à un clic ?',
          options: ['onclick', 'onClick', 'click', 'onClickEvent'],
          answer: 1,
          explanation: 'React écrit les événements en camelCase : `onClick`. `onclick` (minuscules) est le nom du DOM classique, ignoré par React ; `click` et `onClickEvent` n\'existent pas.',
        },
        {
          id: 'm06-l04-e2',
          type: 'fill',
          difficulty: 'facile',
          question: 'Complétez : `<button ____={sourire}>Rire</button>` pour exécuter la fonction `sourire` au clic.',
          accepted: ['onclick', 'on click'],
          hint: 'Le nom commence par `on` + le nom de l\'événement, en majuscule.',
          explanation: 'L\'événement du clic s\'écrit `onClick` : l\'attribut appelle la fonction `sourire` à chaque clic, sans parenthèses.',
        },
        {
          id: 'm06-l04-e3',
          type: 'debug',
          difficulty: 'avancé',
          language: 'jsx',
          question: 'Ce compteur affiche 0 en permanence : le clic ne change rien et une erreur subsiste. Corrigez les 2 erreurs.',
          template: `import { useState } from "react";

function Like() {
  const [likes, setLikes] = useState(0);

  function ajouter() {
    likes = likes + 1;
  }

  return (
    <div>
      <p>{likes} like</p>
      <button onclick={ajouter}>+1</button>
    </div>
  );
}
`,
          solution: `import { useState } from "react";

function Like() {
  const [likes, setLikes] = useState(0);

  function ajouter() {
    setLikes(likes + 1);
  }

  return (
    <div>
      <p>{likes} like</p>
      <button onClick={ajouter}>+1</button>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<Like />);`,
          mustContain: ['setLikes(likes + 1)', 'onClick'],
          hint: 'Une erreur concerne la mise à jour du state, l\'autre la casse de l\'attribut.',
          explanation: 'Erreur 1 : `likes = likes + 1` réaffecte une variable `const` ; il faut appeler `setLikes(likes + 1)` pour prévenir React. Erreur 2 : `onclick` doit s\'écrire `onClick` en camelCase. Une fois corrigé, chaque clic affiche 1 like, 2 likes…',
        },
      ],
    },
    {
      id: 'm06-l05',
      title: 'Incrémenter et décrémenter un compteur',
      minutes: 8,
      objectives: ['Créer un compteur numérique', 'Incrémenter et décrémenter avec le setter', 'Utiliser la forme fonctionnelle du setter'],
      blocks: [
        { type: 'p', text: 'Likes, score, nombre de visiteurs : le compteur est le « Hello world » du state. Deux boutons, un nombre, et des calculs à partir de la valeur actuelle.' },
        { type: 'h', text: 'Explication simple' },
        { type: 'p', text: 'Un compteur suit toujours le même schéma : un state numérique initialisé à 0 (ou à une autre valeur), puis deux setters qui calculent la valeur suivante. Quand la nouvelle valeur dépend de l\'ancienne, React propose une écriture plus sûre : passer une fonction au setter, qui recevra la toute dernière valeur.' },
        { type: 'list', items: ['Incrémenter : `setCompteur(compteur + 1)`.', 'Décrémenter : `setCompteur(compteur - 1)`.', 'Forme fonctionnelle : `setCompteur(c => c + 1)` — React applique `c` à la valeur la plus récente.', 'Un state numérique s\'initialise sans guillemets : `useState(0)`.', 'Remettre à zéro : `setCompteur(0)`.'] },
        { type: 'code', lang: 'jsx', caption: 'Un compteur avec deux boutons', code: `import { useState } from "react";

function Compteur() {
  const [compteur, setCompteur] = useState(0);

  return (
    <div>
      <p>Nombre : {compteur}</p>
      <button onClick={() => setCompteur(compteur - 1)}>-</button>
      <button onClick={() => setCompteur(compteur + 1)}>+</button>
    </div>
  );
}` },
        { type: 'list', items: ['Ligne 4 : `useState(0)` démarre le compteur à 0 (sans guillemets : ce n\'est pas un texte).', 'Ligne 7 : `{compteur}` affiche la valeur courante à chaque rendu.', 'Lignes 8 et 9 : chaque bouton crée une fonction flèche qui appelle le setter avec `compteur - 1` ou `compteur + 1`.', 'Équivalent avec la forme fonctionnelle : `setCompteur(c => c + 1)`.', 'Les deux boutons partagent le même state : le clic sur l\'un modifie la valeur affichée par l\'autre aussi.'] },
        { type: 'result', text: 'À l\'écran : « Nombre : 0 » et deux boutons. Après trois clics sur « + » : « Nombre : 3 ». Un clic sur « - » ramène à « Nombre : 2 ».' },
        { type: 'mistake', text: 'Initialiser avec `useState("0")` : le compteur devient un texte et `compteur + 1` affichera « 01 », puis « 011 ». Autre piège : incrémenter la variable soi-même (`setCompteur(++compteur)`).', fix: 'Un nombre sans guillemets, et toujours le setter : `useState(0)` puis `setCompteur(compteur + 1)` ou `setCompteur(c => c + 1)`.' },
        { type: 'mistake', text: 'Croire que les deux boutons ont chacun leur compteur : ils partagent le même state.', fix: 'Si deux compteurs doivent être indépendants, déclarez deux `useState` distincts.' },
        { type: 'quote', text: 'Résumé : un compteur est un state numérique modifié par des setters qui calculent la valeur suivante, soit à partir de la valeur courante, soit avec la forme fonctionnelle.' },
      ],
      exercises: [
        {
          id: 'm06-l05-e1',
          type: 'qcm',
          difficulty: 'facile',
          question: 'Quelle ligne décrémente le state `score` ?',
          options: ['setScore(score - 1)', 'score--', 'setScore(-1)', 'score = score - 1'],
          answer: 0,
          explanation: 'Décrémenter revient à demander la valeur `score - 1` via le setter. `score--` et `score = score - 1` modifient la variable directement (impossible, elle est `const`), et `setScore(-1)` mettrait le score à moins un, ce qui n\'est pas une décrémentation.',
        },
        {
          id: 'm06-l05-e2',
          type: 'code',
          difficulty: 'intermédiaire',
          language: 'jsx',
          question: 'Créez un composant `Score` initialisé à 10, avec un bouton « +1 », un bouton « -1 » et un bouton « Remise à zéro » qui remet le score à 0.',
          template: `import { useState } from "react";

function Score() {
  const [score, setScore] = useState(10);

  // votre code ici
}
`,
          solution: `import { useState } from "react";

function Score() {
  const [score, setScore] = useState(10);

  return (
    <div>
      <p>Score : {score}</p>
      <button onClick={() => setScore(score + 1)}>+1</button>
      <button onClick={() => setScore(score - 1)}>-1</button>
      <button onClick={() => setScore(0)}>Remise à zéro</button>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<Score />);`,
          mustContain: ['setScore(score + 1)', 'setScore(0)'],
          hint: 'Trois boutons, trois appels de setter différents.',
          explanation: '`setScore(score + 1)` et `setScore(score - 1)` calculent la valeur suivante à partir de la courante, `setScore(0)` réinitialise : les trois utilisent le même state, affiché par `Score : {score}`.',
        },
        {
          id: 'm06-l05-e3',
          type: 'short',
          difficulty: 'facile',
          question: 'Comment appelle-t-on la fonction retournée par `useState` pour changer la valeur du state `compteur` ?',
          accepted: ['setcompteur', 'la fonction setcompteur', 'set compteur'],
          hint: 'Le nom commence toujours par les trois lettres `set`.',
          explanation: 'La convention React nomme le setter `set` + nom du state : donc `setcompteur` (ou `setCompteur`, la comparaison ignore la casse).',
        },
      ],
    },
    {
      id: 'm06-l06',
      title: 'Gérer les formulaires',
      minutes: 9,
      objectives: ['Lier un champ de saisie à un state', 'Lire la saisie avec `event.target.value`', 'Comprendre le principe du champ contrôlé'],
      blocks: [
        { type: 'p', text: 'Formulaire de contact, inscription, recherche… Un site vivant demande des données à l\'utilisateur. Comment récupérer ce qui est tapé dans un champ ? En reliant le champ à un state.' },
        { type: 'h', text: 'Explication simple' },
        { type: 'p', text: 'Un champ contrôlé (ou « contrôlé par React ») est un champ dont la valeur est pilotée par un state : `value={...}` affiche la valeur courante, `onChange={...}` l\'écrit à chaque frappe. L\'utilisateur tape, React met à jour le state, le state réaffiche le champ : la boucle est bouclée.' },
        { type: 'list', items: ['`<input value={email} onChange={...} />` : les deux moitiés d\'un même circuit.', '`event.target.value` contient la nouvelle valeur tapée par l\'utilisateur.', 'Sans `value`, le champ garde sa mémoire interne : on perd le contrôle de l\'affichage.', 'Le même schéma fonctionne avec `<textarea>` et `<select>`.'] },
        { type: 'code', lang: 'jsx', caption: 'Un champ contrôlé par un state', code: `import { useState } from "react";

function Inscription() {
  const [email, setEmail] = useState("");

  return (
    <div>
      <label>
        Votre e-mail :
        <input
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
      </label>
      <p>Vous avez saisi : {email}</p>
    </div>
  );
}` },
        { type: 'list', items: ['Ligne 4 : le state démarre sur une chaîne vide, comme tout champ vide.', 'Ligne 11 : `value={email}` affiche la valeur du state dans le champ.', 'Ligne 12 : `onChange` se déclenche à chaque frappe ; `(event) => ...` est une fonction flèche qui reçoit l\'événement.', '`event.target.value` est la nouvelle saisie : `setEmail` la range dans le state.', 'Ligne 15 : `{email}` réaffiche ce qui a été tapé, en direct.'] },
        { type: 'result', text: 'À l\'écran : un champ vide. Après avoir tapé « ana@exemple.fr », le paragraphe affiche « Vous avez saisi : ana@exemple.fr » et le champ contient toujours ce texte.' },
        { type: 'mistake', text: 'Oublier `value={email}` : le champ n\'est plus piloté par React, les deux affichages se désynchronisent.', fix: 'Toujours lier les deux : `value={state}` et `onChange={e => setState(e.target.value)}`.' },
        { type: 'mistake', text: 'Écrire `onChange="setEmail(event.target.value)"` (un texte) : React n\'exécute rien.', fix: 'Passer une fonction entre accolades : `onChange={(event) => setEmail(event.target.value)}`.' },
        { type: 'quote', text: 'Résumé : un champ contrôlé lit son état dans un state (`value`) et l\'écrit via `onChange` avec `event.target.value`.' },
      ],
      exercises: [
        {
          id: 'm06-l06-e1',
          type: 'qcm',
          difficulty: 'facile',
          question: 'Quelle paire d\'attributs utilise-t-on pour un champ contrôlé ?',
          options: ['value + onChange', 'value + onClick', 'defaultValue + onChange', 'text + onInput'],
          answer: 0,
          explanation: '`value` affiche la valeur du state et `onChange` la met à jour à chaque frappe. `onClick` est pour les clics (2e proposition fausse), `defaultValue` crée un champ non contrôlé (3e proposition), et `text`/`onInput` ne sont pas des attributs React (4e proposition).',
        },
        {
          id: 'm06-l06-e2',
          type: 'code',
          difficulty: 'intermédiaire',
          language: 'jsx',
          question: 'Créez un composant `Pseudo` avec un state `pseudo` initialisé à une chaîne vide, un `<input>` contrôlé, et un paragraphe qui affiche « Bonjour » suivi du pseudo saisi.',
          template: `import { useState } from "react";

function Pseudo() {
  const [pseudo, setPseudo] = useState("");

  // votre code ici
}
`,
          solution: `import { useState } from "react";

function Pseudo() {
  const [pseudo, setPseudo] = useState("");

  return (
    <div>
      <input
        value={pseudo}
        onChange={(event) => setPseudo(event.target.value)}
      />
      <p>Bonjour {pseudo}</p>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<Pseudo />);`,
          mustContain: ['value={pseudo}', 'onChange', 'setPseudo(event.target.value)'],
          hint: 'Le champ a besoin de `value` et de `onChange`, qui partagent le même state.',
          explanation: '`value={pseudo}` affiche le state dans le champ, `onChange` écrit chaque frappe via `event.target.value` : c\'est le schéma complet du champ contrôlé.',
        },
        {
          id: 'm06-l06-e3',
          type: 'fill',
          difficulty: 'facile',
          question: 'Complétez : `onChange={(event) => ___(event.target.value)}` pour enregistrer la saisie dans le state `ville`.',
          accepted: ['setville'],
          hint: 'Le setter du state `ville`.',
          explanation: 'À chaque frappe, on range la nouvelle valeur dans le state grâce à `setVille(event.target.value)` (la casse est ignorée lors de la vérification).',
        },
      ],
    },
    {
      id: 'm06-l07',
      title: 'Affichage conditionnel',
      minutes: 8,
      objectives: ['Afficher un contenu selon une condition', 'Choisir entre le ternaire et `&&`', 'Éviter le piège du `0` avec `&&`'],
      blocks: [
        { type: 'p', text: '« Connectez-vous pour continuer » ne doit apparaître que si l\'utilisateur n\'est pas connecté. L\'écran change donc selon une condition : c\'est l\'affichage conditionnel.' },
        { type: 'h', text: 'Explication simple' },
        { type: 'p', text: 'Le JSX est une expression : on ne peut pas écrire `if` directement dedans. React utilise deux raccourcis JavaScript. Le ternaire `condition ? a : b` choisit entre deux contenus ; la courte-circuite `condition && élément` affiche un contenu seulement si la condition est vraie. Un `if` classique reste possible dans une fonction avant le `return`.' },
        { type: 'list', items: ['Ternaire : `{connecte ? "Bienvenue" : "Connexion requise"}` — deux choix.', 'Court-circuit : `{erreur && <p>{erreur}</p>}` — affiche seulement si `erreur` est vraie.', '`if` s\'écrit avant le `return`, jamais dans le JSX.', 'Attention : `0 && <p>…</p>` affiche `0`, car 0 est « faux » mais affichable en JavaScript.'] },
        { type: 'code', lang: 'jsx', caption: 'Basculer entre deux affichages', code: `import { useState } from "react";

function Message() {
  const [connecte, setConnecte] = useState(false);

  function basculer() {
    setConnecte(!connecte);
  }

  return (
    <div>
      <p>{connecte ? "Bienvenue !" : "Vous êtes déconnecté."}</p>
      <button onClick={basculer}>
        {connecte ? "Se déconnecter" : "Se connecter"}
      </button>
    </div>
  );
}` },
        { type: 'list', items: ['Ligne 4 : le state est un booléen, initialisé à `false`.', 'Ligne 7 : `!connecte` inverse la valeur : `false` devient `true`.', 'Ligne 11 : le ternaire choisit le texte affiché selon la valeur du state.', 'Ligne 14 : le même ternaire change le libellé du bouton.', 'Après le clic, React réaffiche tout : texte et bouton changent ensemble.'] },
        { type: 'result', text: 'À l\'écran : « Vous êtes déconnecté. » et le bouton « Se connecter ». Après le clic : « Bienvenue ! » et le bouton « Se déconnecter ».' },
        { type: 'mistake', text: 'Écrire `if (connecte) { ... }` directement dans le JSX : c\'est une erreur de syntaxe.', fix: 'Utiliser le ternaire `{condition ? a : b}` ou la courte-circuite `{condition && élément}`.' },
        { type: 'mistake', text: 'Utiliser `&&` avec un nombre : `{compteur && <p>Alerte</p>}` affiche « 0 » quand le compteur est à zéro.', fix: 'Exiger une vraie condition : `{compteur > 0 && <p>Alerte</p>}`.' },
        { type: 'quote', text: 'Résumé : dans le JSX, on affiche conditionnellement avec le ternaire (deux cas) ou `&&` (un cas), en se méfiant des valeurs numériques falses.' },
      ],
      exercises: [
        {
          id: 'm06-l07-e1',
          type: 'qcm',
          difficulty: 'facile',
          question: 'Que signifie `{erreur && <p>Une erreur est survenue</p>}` ?',
          options: [
            'si `erreur` contient une valeur vraie, React affiche le paragraphe, sinon rien',
            'React affiche toujours le paragraphe',
            'React affiche le paragraphe seulement si `erreur` vaut strictement `true`',
            'React affiche la valeur de `erreur` à la place du paragraphe',
          ],
          answer: 0,
          explanation: 'L\'opérateur `&&` renvoie l\'opérande de droite si celui de gauche est truthy (chaîne non vide, `true`…) : le paragraphe s\'affiche. Ce n\'est pas « toujours » (2e proposition), ni limité au strict `true` (3e proposition), et le contenu de droite s\'affiche, pas la valeur de gauche (4e proposition).',
        },
        {
          id: 'm06-l07-e2',
          type: 'code',
          difficulty: 'intermédiaire',
          language: 'jsx',
          question: 'Créez un composant `Session` avec un state `connecte` initialisé à `true` : un paragraphe affiche « Bonjour » si l\'utilisateur est connecté, sinon « Connexion requise ». Ajoutez un bouton qui inverse la valeur à chaque clic.',
          template: `import { useState } from "react";

function Session() {
  const [connecte, setConnecte] = useState(true);

  // votre code ici
}
`,
          solution: `import { useState } from "react";

function Session() {
  const [connecte, setConnecte] = useState(true);

  return (
    <div>
      <p>
        {connecte ? "Bonjour" : "Connexion requise"}
      </p>
      <button onClick={() => setConnecte(!connecte)}>
        Basculer
      </button>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<Session />);`,
          mustContain: ['connecte ?', 'setConnecte(!connecte)'],
          hint: 'Un ternaire dans le paragraphe, un setter qui inverse le booléen dans le bouton.',
          explanation: 'Le ternaire choisit entre les deux messages selon `connecte`, et `setConnecte(!connecte)` inverse la valeur : chaque clic bascule l\'affichage.',
        },
        {
          id: 'm06-l07-e3',
          type: 'debug',
          difficulty: 'avancé',
          language: 'jsx',
          question: 'Ce composant affiche une erreur de syntaxe : un `if` est écrit dans le JSX, et le bouton ne réagit pas. Corrigez les 2 erreurs.',
          template: `import { useState } from "react";

function Alerte() {
  const [compteur, setCompteur] = useState(0);

  return (
    <div>
      if (compteur > 0) {
        <p>Alerte déclenchée</p>;
      }
      <button onclick={() => setCompteur(compteur + 1)}>
        Déclencher
      </button>
    </div>
  );
}
`,
          solution: `import { useState } from "react";

function Alerte() {
  const [compteur, setCompteur] = useState(0);

  return (
    <div>
      {compteur > 0 && <p>Alerte déclenchée</p>}
      <button onClick={() => setCompteur(compteur + 1)}>
        Déclencher
      </button>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<Alerte />);`,
          mustContain: ['compteur > 0', 'Alerte déclenchée'],
          hint: 'Remplacez le `if` par une expression du JSX, et vérifiez la casse de l\'événement.',
          explanation: 'Erreur 1 : `if` est une instruction, impossible dans le JSX → on utilise `{compteur > 0 && <p>Alerte déclenchée</p>}` (le ternaire `{compteur > 0 ? <p>…</p> : null}` convient aussi). Erreur 2 : `onclick` doit s\'écrire `onClick`. Au clic, le compteur passe à 1 et l\'alerte apparaît.',
        },
      ],
    },
    {
      id: 'm06-l08',
      title: 'Manipuler les tableaux et objets dans le State',
      minutes: 10,
      objectives: ['Stocker un tableau ou un objet dans un state', 'Créer une copie plutôt que de muter', 'Ajouter, remplacer et retirer des éléments'],
      blocks: [
        { type: 'p', text: 'Liste de courses, panier, tâches du jour : vos données ressemblent à des tableaux et des objets. Les stocker dans un state est facile ; les faire évoluer sans casser l\'écran demande une seule discipline : ne jamais modifier l\'original.' },
        { type: 'h', text: 'Explication simple' },
        { type: 'p', text: 'React compare les références : si vous modifiez le tableau en place (`articles.push(...)`), il ne voit aucun changement et n\'actualise rien. Il faut créer un nouveau tableau ou un nouvel objet avec l\'opérateur de décomposition `...` (« spread »), puis le passer au setter.' },
        { type: 'list', items: ['Interdit : `articles.push(nouveau)` modifie l\'ancien tableau → l\'écran ne bouge pas.', 'Ajouter à la fin : `setArticles([...articles, nouveau])`.', 'Ajouter au début : `setArticles([nouveau, ...articles])`.', 'Objet : `setJoueur({ ...joueur, score: 10 })` — copie, puis la clé à changer.', 'Retirer : `setArticles(articles.filter(a => a !== "x"))` — `filter` renvoie un nouveau tableau.'] },
        { type: 'code', lang: 'jsx', caption: 'Ajouter un élément à un state-tableau', code: `import { useState } from "react";

function Courses() {
  const [articles, setArticles] = useState(["pain", "lait"]);

  function ajouter() {
    setArticles([...articles, "œufs"]);
  }

  return (
    <div>
      <ul>
        {articles.map((article) => (
          <li key={article}>{article}</li>
        ))}
      </ul>
      <button onClick={ajouter}>Ajouter des œufs</button>
    </div>
  );
}` },
        { type: 'list', items: ['Ligne 4 : le state démarre avec un tableau de deux chaînes.', 'Ligne 7 : `...articles` recopie tous les éléments, puis `"œufs"` est ajouté : le setter reçoit un tableau entièrement neuf.', 'Ligne 12 : `articles.map(...)` transforme chaque élément en un `<li>` ; `map` est une méthode JavaScript qui renvoie un nouveau tableau de JSX.', '`key={article}` : React demande une clé unique à chaque élément d\'une liste pour le suivre.', 'Jamais `articles.push("œufs")` : la référence ne changerait pas et l\'écran resterait figé.'] },
        { type: 'result', text: 'À l\'écran : la liste « pain », « lait ». Après le clic : « œufs » apparaît en troisième ligne.' },
        { type: 'mistake', text: 'Soit `articles.push("œufs")` : le tableau change mais React ne détecte rien, l\'écran reste figé. Soit `setArticles(["œufs"])` : tout le tableau est écrasé et « pain » et « lait » disparaissent.', fix: 'Copier l\'existant avant d\'ajouter : `setArticles([...articles, "œufs"])`.' },
        { type: 'mistake', text: 'Modifier un objet du state en place : `joueur.score = 10` ne déclenche aucun rendu.', fix: 'Passer une copie : `setJoueur({ ...joueur, score: 10 })`.' },
        { type: 'quote', text: 'Résumé : un state-tableau ou un state-objet se met toujours à jour en créant une nouvelle copie (spread, `map`, `filter`) — jamais en modifiant l\'original.' },
      ],
      exercises: [
        {
          id: 'm06-l08-e1',
          type: 'qcm',
          difficulty: 'facile',
          question: 'Quelle ligne ajoute « x » à la fin du state `todos` sans le modifier ?',
          options: ['todos.push("x")', 'setTodos([...todos, "x"])', 'setTodos(todos.push("x"))', 'todos = [...todos, "x"]'],
          answer: 1,
          explanation: '`setTodos([...todos, "x"])` crée un nouveau tableau et prévient React. `todos.push("x")` modifie l\'original sans rendu (1re proposition) ; `todos.push` renvoie la nouvelle longueur, donc on perdrait les tâches (3e proposition) ; `todos = ...` réaffecte une variable `const` (4e proposition).',
        },
        {
          id: 'm06-l08-e2',
          type: 'code',
          difficulty: 'intermédiaire',
          language: 'jsx',
          question: 'Créez un composant `Scores` avec un state `liste` initialisé à `[10, 20]`, un bouton qui ajoute le score 30 (avec spread), et une liste `<ul>` qui affiche chaque score dans un `<li>` avec `map` et `key`.',
          template: `import { useState } from "react";

function Scores() {
  const [liste, setListe] = useState([10, 20]);

  // votre code ici
}
`,
          solution: `import { useState } from "react";

function Scores() {
  const [liste, setListe] = useState([10, 20]);

  function ajouter() {
    setListe([...liste, 30]);
  }

  return (
    <div>
      <ul>
        {liste.map((score) => (
          <li key={score}>{score}</li>
        ))}
      </ul>
      <button onClick={ajouter}>Ajouter 30</button>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<Scores />);`,
          mustContain: ['setListe([...liste, 30])', 'map'],
          hint: 'L\'ajout se fait avec le spread, l\'affichage avec `map`.',
          explanation: '`[...liste, 30]` crée un tableau neuf contenant 10, 20 puis 30 : React détecte la nouvelle référence et réaffiche. `liste.map(...)` génère un `<li>` par score, avec `key` unique comme React l\'exige.',
        },
        {
          id: 'm06-l08-e3',
          type: 'debug',
          difficulty: 'avancé',
          language: 'jsx',
          question: 'Ce composant a 3 erreurs : le clic n\'ajoute rien et React signale un problème de clés. Corrigez-les.',
          template: `import { useState } from "react";

function Taches() {
  const [taches, setTaches] = useState(["Laver", "Ranger"]);

  function ajouter() {
    taches.push("Étudier");
  }

  return (
    <div>
      <ul>{taches.map((t) => <li>{t}</li>)}</ul>
      <button onclick={ajouter}>Ajouter</button>
    </div>
  );
}
`,
          solution: `import { useState } from "react";

function Taches() {
  const [taches, setTaches] = useState(["Laver", "Ranger"]);

  function ajouter() {
    setTaches([...taches, "Étudier"]);
  }

  return (
    <div>
      <ul>{taches.map((t) => <li key={t}>{t}</li>)}</ul>
      <button onClick={ajouter}>Ajouter</button>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<Taches />);`,
          mustContain: ['setTaches([...taches, "Étudier"])', 'onClick'],
          hint: 'Une erreur concerne la mise à jour du tableau, une autre la casse de l\'événement, la troisième se trouve dans la liste.',
          explanation: 'Erreur 1 : `taches.push(...)` modifie le state sans prévenir React → `setTaches([...taches, "Étudier"])`. Erreur 2 : `onclick` doit s\'écrire `onClick`. Erreur 3 : chaque élément rendu par `map` doit avoir une clé `key`. Après correction, le clic ajoute « Étudier » en fin de liste.',
        },
      ],
    },
  ],
};
