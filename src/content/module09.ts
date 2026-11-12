import type { Module } from '../types';

export const module09: Module = {
  id: 'm09',
  number: 9,
  title: 'Les Hooks React',
  description: "Découvrez useState, useEffect, useRef et les autres Hooks essentiels.",
  icon: '🪝',
  level: 'Intermédiaire',
  lessons: [
    {
      id: 'm09-l01',
      title: 'Comprendre les Hooks',
      minutes: 7,
      objectives: [
        'Définir un Hook et expliquer son nom anglais',
        'Reconnaître un Hook grâce à son préfixe',
        'Citer les Hooks que vous allez apprendre dans ce module',
      ],
      blocks: [
        { type: 'p', text: "Jusqu'ici, vos composants affichaient des données, réagissaient aux clics et listaient des éléments. Mais une vraie application doit aussi garder un souvenir, mesurer le temps, lire une saisie... Dans un composant fonction, React met à disposition de petites fonctions spéciales qui servent exactement à ces besoins : les Hooks." },
        { type: 'h', text: 'Explication simple' },
        { type: 'p', text: "En anglais, hook signifie « crochet ». Un Hook est une fonction fournie par React qui permet d'accrocher une fonctionnalité au composant : mémoriser une donnée, réagir à un changement, toucher un élément de la page... Tous les Hooks sont des fonctions JavaScript normales exportées par React, et leur nom commence toujours par « use ». Ce préfixe est une convention : il signale à React — et à votre lecteur — que la fonction manipule la mémoire du composant." },
        {
          type: 'list',
          items: [
            "Un Hook est une fonction de React : on l'appelle, on ne réinvente rien.",
            "Tout Hook commence par `use` : `useState`, `useEffect`, `useRef`...",
            "On les appelle dans le corps d'un composant fonction.",
            "Dans ce module : useState, useEffect, useRef, useMemo, useCallback, useContext, puis les Hooks personnalisés.",
          ],
        },
        {
          type: 'code',
          lang: 'jsx',
          code: `import { useState } from "react";

function Compteur() {
  const [nombre, setNombre] = useState(0);

  return <button onClick={() => setNombre(nombre + 1)}>Clics : {nombre}</button>;
}

ReactDOM.createRoot(document.getElementById("root")).render(<Compteur />);`,
          caption: 'Un premier Hook : useState donne une mémoire au compteur',
        },
        {
          type: 'list',
          items: [
            'Ligne 1 : `import { useState } from "react";` — on importe le Hook depuis React.',
            "Ligne 4 : `const [nombre, setNombre] = useState(0)` — useState retourne un tableau à deux éléments, déstructuré en la valeur et sa fonction de mise à jour.",
            'Ligne 4 : `useState(0)` — la valeur initiale de la mémoire est 0.',
            'Ligne 6 : `setNombre(nombre + 1)` — le clic enregistre la nouvelle valeur ; React réaffiche alors le composant.',
            'Ligne 10 : `ReactDOM.createRoot(...).render(<Compteur />)` — le composant est inséré dans la page.',
          ],
        },
        { type: 'result', text: "À l'écran : un bouton « Clics : 0 ». Chaque clic affiche 1, 2, 3... et la page ne se recharge jamais." },
        {
          type: 'mistake',
          text: "Appeler un Hook à l'intérieur d'une condition, d'une boucle ou d'un callback : React perd la trace de la mémoire du composant.",
          fix: "Appelez les Hooks directement dans le corps du composant — la dernière leçon du module détaille ces règles.",
        },
        {
          type: 'mistake',
          text: "Écrire un nom de Hook sans le préfixe `use`, par exemple `compter()` : React n'y verrait pas un Hook.",
          fix: "Respectez la convention : tout nom de Hook commence par `use`.",
        },
        { type: 'quote', text: "Résumé : un Hook est une fonction de React reconnaissable à son préfixe use, qui permet d'ajouter état, effets et références à un composant fonction." },
      ],
      exercises: [
        {
          id: 'm09-l01-e1',
          type: 'qcm',
          difficulty: 'facile',
          question: 'Parmi ces noms, lesquels désignent de vrais Hooks React ?',
          options: ['useState', 'useEffect', 'getColor', 'useContext'],
          answer: [0, 1, 3],
          hint: 'Tous les Hooks partagent un même préfixe.',
          explanation:
            "Les Hooks sont des fonctions fournies par React dont le nom commence par `use` : `useState`, `useEffect` et `useContext` respectent cette convention. `getColor` ne commence pas par `use` et n'appartient pas à React : c'est une fonction ordinaire que vous pourriez écrire vous-même.",
        },
        {
          id: 'm09-l01-e2',
          type: 'short',
          difficulty: 'facile',
          question: 'Quel préfixe anglais doit porter tout nom de Hook ?',
          accepted: ['use', 'le prefixe use', 'le préfixe use'],
          hint: 'Cinq lettres, en minuscules.',
          explanation:
            "Le préfixe `use` (« utiliser ») signale qu'une fonction manipule la mémoire d'un React. C'est la convention officielle : elle permet de repérer un Hook au premier coup d'œil et permet à React de vérifier que les règles des Hooks sont respectées.",
        },
        {
          id: 'm09-l01-e3',
          type: 'code',
          difficulty: 'intermédiaire',
          language: 'jsx',
          question:
            "Créez un composant `Sonde` qui utilise `useState` pour obtenir la chaîne « Hook actif ! » et l'affiche dans un paragraphe, puis insérez-le dans la page.",
          template: `function Sonde() {
  // votre code ici
}
`,
          solution: `import { useState } from "react";

function Sonde() {
  const [texte] = useState("Hook actif !");
  return <p>{texte}</p>;
}

ReactDOM.createRoot(document.getElementById("root")).render(<Sonde />);`,
          mustContain: ['useState', '<p>'],
          hint: 'useState retourne [valeur, setter] : ici vous n avez besoin que de la valeur.',
          explanation:
            "L'appel `useState(\"Hook actif !\")` crée une mémoire contenant cette chaîne ; la déstructuration `const [texte]` n'en récupère que le premier élément, la valeur. Le paragraphe `{texte}` l'affiche enfin, et `ReactDOM.createRoot(...).render(<Sonde />)` insère le composant dans la page.",
        },
      ],
    },
    {
      id: 'm09-l02',
      title: 'useState',
      minutes: 8,
      objectives: [
        'Déclarer une variable d état avec useState',
        'Mettre à jour l état avec la fonction setter',
        'Expliquer pourquoi React réaffiche le composant',
      ],
      blocks: [
        { type: 'p', text: "Dans votre compteur, une simple variable `let compteur = 0` ne suffit pas : à chaque clic, React recrée le composant et la variable repart de zéro. Il faut une mémoire qui survive aux réaffichages. C'est le rôle de useState, le Hook le plus utilisé de React." },
        { type: 'h', text: 'Explication simple' },
        { type: 'p', text: "useState déclare une variable d'état (state en anglais) dans un composant. L'état est une donnée qui change au fil du temps et qui doit être réaffichée quand elle change. Le Hook retourne un tableau de deux éléments : la valeur actuelle, et une fonction qui enregistre une nouvelle valeur. Quand cette fonction est appelée, React met à jour la valeur puis réaffiche le composant." },
        {
          type: 'list',
          items: [
            "Le premier élément du tableau est la valeur, le second est la fonction de mise à jour.",
            "La valeur initiale n'est utilisée qu'au tout premier rendu.",
            "On ne modifie jamais la variable directement : on passe toujours par le setter.",
            "Chaque changement déclenche un nouvel affichage complet du composant.",
          ],
        },
        {
          type: 'code',
          lang: 'jsx',
          code: `import { useState } from "react";

function Compteur() {
  const [compteur, setCompteur] = useState(0);

  function ajouter() {
    setCompteur(compteur + 1);
  }

  return (
    <div>
      <p>Nombre de clics : {compteur}</p>
      <button onClick={ajouter}>Ajouter 1</button>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<Compteur />);`,
          caption: 'Un compteur piloté par useState',
        },
        {
          type: 'list',
          items: [
            'Ligne 4 : `useState(0)` — l état démarre à 0 ; ce 0 n est repris qu une seule fois.',
            "Ligne 7 : `setCompteur(compteur + 1)` — la nouvelle valeur est enregistrée et React est prévenu.",
            "Ligne 12 : `{compteur}` — le paragraphe affiche toujours la valeur courante de l état.",
            "Ligne 13 : `onClick={ajouter}` — le clic appelle la fonction qui déclenche la mise à jour.",
            "Après `setCompteur`, React relit tout le composant et reconstruit le JSX avec la valeur nouvelle.",
          ],
        },
        { type: 'result', text: "À l'écran : « Nombre de clics : 0 », puis 1, 2, 3... à chaque clic sur « Ajouter 1 »." },
        {
          type: 'mistake',
          text: "Écrire `compteur = compteur + 1` : la variable change dans le composant, mais React n'est pas prévenu et l'écran reste figé.",
          fix: "Utilisez `setCompteur(compteur + 1)` : c'est la fonction setter qui prévient React du changement.",
        },
        {
          type: 'mistake',
          text: "Penser que `useState(0)` remet le compteur à 0 à chaque affichage : après le premier rendu, React ignore la valeur initiale.",
          fix: "La valeur initiale ne sert qu'au démarrage ; pour revenir à zéro, appelez `setCompteur(0)`.",
        },
        { type: 'quote', text: "Résumé : useState retourne [valeur, setter] ; seule la fonction setter change la valeur, et chaque changement déclenche un nouvel affichage du composant." },
      ],
      exercises: [
        {
          id: 'm09-l02-e1',
          type: 'qcm',
          difficulty: 'facile',
          question: "Que retourne l'appel `useState(0)` ?",
          options: [
            'Le nombre 0 tout simplement',
            'Un tableau contenant la valeur actuelle et une fonction de mise à jour',
            'Un objet avec une propriété .value',
            'Rien du tout : il faut écrire la mémoire à la main',
          ],
          answer: 1,
          hint: 'Déstructurer le résultat donne deux variables.',
          explanation:
            "`useState(0)` renvoie un tableau à deux éléments : la valeur courante (0) et la fonction qui l'écrit. Le déstructurer en `const [compteur, setCompteur]` donne accès à ces deux morceaux. Ce n'est ni un nombre brut (option 0), ni un objet (option 2), et la mémoire existe bel et bien (option 3).",
        },
        {
          id: 'm09-l02-e2',
          type: 'code',
          difficulty: 'intermédiaire',
          language: 'jsx',
          question:
            "Créez un compteur qui démarre à 10 et augmente de 1 à chaque clic. Affichez « Compteur : valeur » puis un bouton « Incrémenter ».",
          template: `import { useState } from "react";

function Compteur() {
  // déclarez l état et écrivez le JSX
}
`,
          solution: `import { useState } from "react";

function Compteur() {
  const [compteur, setCompteur] = useState(10);

  return (
    <div>
      <p>Compteur : {compteur}</p>
      <button onClick={() => setCompteur(compteur + 1)}>Incrémenter</button>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<Compteur />);`,
          mustContain: ['useState(10)', 'setCompteur'],
          hint: 'La valeur initiale se passe à useState, et chaque clic passe par le setter.',
          explanation:
            "`useState(10)` initialise l'état à 10 — c'est la valeur de départ demandée. Le bouton appelle `setCompteur(compteur + 1)` : la valeur change et React réaffiche le paragraphe, qui affiche alors la valeur courante. Modifier `compteur` à la main ne déclencherait aucun affichage.",
        },
        {
          id: 'm09-l02-e3',
          type: 'debug',
          difficulty: 'intermédiaire',
          language: 'jsx',
          question:
            "Le bouton « Marquer un but » ne change jamais le score affiché. Trouvez l'erreur et corrigez le code.",
          template: `import { useState } from "react";

function Score() {
  const [score, setScore] = useState(0);

  function marquer() {
    score = score + 5;
  }

  return (
    <div>
      <p>Score : {score}</p>
      <button onClick={marquer}>Marquer un but</button>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<Score />);`,
          solution: `import { useState } from "react";

function Score() {
  const [score, setScore] = useState(0);

  function marquer() {
    setScore(score + 5);
  }

  return (
    <div>
      <p>Score : {score}</p>
      <button onClick={marquer}>Marquer un but</button>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<Score />);`,
          mustContain: ['setScore', 'score + 5'],
          hint: 'Qui doit être prévenu du changement pour réafficher le score ?',
          explanation:
            "L'affectation `score = score + 5` modifie bien la variable, mais React n'est pas informé : aucun nouvel affichage n'a lieu, le paragraphe reste à 0. `setScore(score + 5)` écrit la nouvelle valeur dans l'état et déclenche le rendu — c'est la seule façon de changer un état.",
        },
      ],
    },
    {
      id: 'm09-l03',
      title: 'useEffect',
      minutes: 9,
      objectives: [
        'Définir un effet de bord',
        'Utiliser useEffect avec un tableau de dépendances',
        'Nettoyer un effet avec la fonction de retour',
      ],
      blocks: [
        { type: 'p', text: "Vous aimeriez que le titre de l'onglet du navigateur suive votre compteur : « Compteur : 3 ». Où écrire ce code ? Ni dans le rendu, car il s'exécuterait inutilement à chaque affichage, ni dans le gestionnaire de clic, car il ne s'exécuterait qu'au moment des clics. React fournit useEffect pour tout ce qui doit se passer après l'affichage." },
        { type: 'h', text: 'Explication simple' },
        { type: 'p', text: "Un effet de bord (side effect en anglais) est une action qui parle au reste du monde : modifier le titre de l'onglet, démarrer un minuteur, enregistrer une préférence, appeler un serveur. useEffect enregistre une fonction que React appelle après le rendu. Le second argument est un tableau de dépendances qui indique quand la relancer : `[]` pour une seule fois, `[valeur]` à chaque fois que la valeur change. Si l'effet crée un minuteur, on retourne une fonction de nettoyage qui l'arrête." },
        {
          type: 'list',
          items: [
            "Un effet de bord : du code qui agit hors du composant (titre, minuteur, requête...).",
            "Le premier argument est la fonction à exécuter, le second le tableau des dépendances.",
            "`[]` : l'effet ne s'exécute qu'une fois, au montage du composant.",
            "Le `return` de l'effet sert à nettoyer : arrêter un minuteur, annuler une écoute.",
          ],
        },
        {
          type: 'code',
          lang: 'jsx',
          code: `import { useState, useEffect } from "react";

function CompteurTitre() {
  const [compteur, setCompteur] = useState(0);

  useEffect(() => {
    document.title = "Compteur : " + compteur;
  }, [compteur]);

  return <button onClick={() => setCompteur(compteur + 1)}>Clics : {compteur}</button>;
}

ReactDOM.createRoot(document.getElementById("root")).render(<CompteurTitre />);`,
          caption: "Le titre de l'onglet suit l'état grâce à useEffect",
        },
        {
          type: 'list',
          items: [
            "Lignes 6 à 8 : `useEffect` reçoit une fonction fléchée et un tableau de dépendances.",
            "Ligne 8 : `[compteur]` contient les valeurs lues dans l'effet ; ici, le titre change quand le compteur change.",
            "Ligne 7 : `document.title` agit sur le navigateur — c'est l'effet de bord lui-même.",
            "Ligne 10 : le return principal du composant n'a pas changé, l'effet n'affiche rien.",
            "Au premier rendu aussi, l'effet s'exécute : le titre affiche « Compteur : 0 ».",
          ],
        },
        { type: 'result', text: "À l'écran : un bouton « Clics : 0 ». Le titre de l'onglet affiche « Compteur : 0 », puis « Compteur : 1 », « Compteur : 2 »... à chaque clic." },
        {
          type: 'mistake',
          text: "Oublier le tableau de dépendances : `useEffect(() => {...})` sans second argument s'exécute à chaque rendu, ce qui peut créer une boucle infinie.",
          fix: "Fournissez toujours le tableau : `[]` pour une exécution unique, `[variable]` à chaque changement de cette variable.",
        },
        {
          type: 'mistake',
          text: "Lancer un minuteur sans nettoyage : même après la disparition du composant, le minuteur continue de tourner.",
          fix: "Retournez une fonction de nettoyage dans l'effet : `return () => clearInterval(id);`.",
        },
        { type: 'quote', text: "Résumé : useEffect exécute une fonction après le rendu selon ses dépendances, et permet de nettoyer ce qu'elle a démarré : c'est la porte du composant vers le reste du navigateur." },
      ],
      exercises: [
        {
          id: 'm09-l03-e1',
          type: 'qcm',
          difficulty: 'facile',
          question: 'À quel moment React appelle-t-il la fonction passée à useEffect ?',
          options: [
            'Avant le tout premier affichage du composant',
            'Après le rendu, quand les dépendances changent',
            'Uniquement quand on clique sur un bouton',
            'À chaque frappe au clavier dans un champ',
          ],
          answer: 1,
          hint: 'Le mot « effect » signifie après.',
          explanation:
            "useEffect place son action après le rendu : React affiche d'abord le composant, puis appelle l'effet, et le recommence quand une dépendance change. Ce n'est ni avant l'affichage (option 0), ni lié aux clics (option 2) ni à la frappe (option 3) : ces cas utilisent d'autres mécanismes.",
        },
        {
          id: 'm09-l03-e2',
          type: 'debug',
          difficulty: 'intermédiaire',
          language: 'jsx',
          question:
            "Ce minuteur accélère anormalement et continue de tourner même après la disparition du composant. Trouvez les erreurs (dépendances et nettoyage) et corrigez le code.",
          template: `import { useState, useEffect } from "react";

function Minuteur() {
  const [secondes, setSecondes] = useState(0);

  useEffect(() => {
    setInterval(() => {
      setSecondes(secondes + 1);
    }, 1000);
  });

  return <p>Temps : {secondes} s</p>;
}

ReactDOM.createRoot(document.getElementById("root")).render(<Minuteur />);`,
          solution: `import { useState, useEffect } from "react";

function Minuteur() {
  const [secondes, setSecondes] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setSecondes((s) => s + 1);
    }, 1000);
    return () => clearInterval(id);
  }, []);

  return <p>Temps : {secondes} s</p>;
}

ReactDOM.createRoot(document.getElementById("root")).render(<Minuteur />);`,
          mustContain: ['clearInterval', '[]'],
          hint: 'Combien de fois le minuteur doit-il démarrer ? Et que faut-il retourner pour l arrêter ?',
          explanation:
            "Deux erreurs. Sans tableau de dépendances, l'effet relance un nouvel intervalle à chaque affichage : les intervalles s'empilent et le compteur accélère. Sans nettoyage, l'ancien intervalle survit au démontage. La correction ajoute `[]` (un seul démarrage) et retourne `() => clearInterval(id)` (arrêt propre). Comme l'ancien `secondes` serait figé, on utilise aussi la forme fonctionnelle `setSecondes((s) => s + 1)` pour toujours partir de la valeur courante.",
        },
        {
          id: 'm09-l03-e3',
          type: 'code',
          difficulty: 'intermédiaire',
          language: 'jsx',
          question:
            "Créez un composant `Avertissement` qui affiche un paragraphe et écrit « Avertissement affiché » dans la console une seule fois, au chargement.",
          template: `import { useEffect } from "react";

function Avertissement() {
  // votre effet ici

  return <p>Attention : contenu réservé.</p>;
}
`,
          solution: `import { useEffect } from "react";

function Avertissement() {
  useEffect(() => {
    console.log("Avertissement affiché");
  }, []);

  return <p>Attention : contenu réservé.</p>;
}

ReactDOM.createRoot(document.getElementById("root")).render(<Avertissement />);`,
          mustContain: ['useEffect', '[]'],
          hint: 'Un tableau vide signifie : une seule exécution.',
          explanation:
            "`useEffect` exécute sa fonction après le rendu. Le tableau `[]` ne contient aucune dépendance : l'effet ne se relance jamais, donc le message apparaît une seule fois au montage. Sans le tableau, il serait répété à chaque affichage du composant.",
          expectedOutput: 'Avertissement affiché',
        },
        {
          id: 'm09-l03-e4',
          type: 'short',
          difficulty: 'facile',
          question: 'Que contient le second argument de useEffect, le tableau de dépendances ?',
          accepted: ['les dépendances', 'les dependances', 'un tableau de dependances'],
          hint: 'C est une liste de valeurs surveillées.',
          explanation:
            "Le tableau liste les valeurs lues par l'effet : dès qu'une d'elles change, React relance la fonction. S'il est vide, aucune valeur ne peut déclencher un nouveau lancement.",
        },
      ],
    },
    {
      id: 'm09-l04',
      title: 'useRef',
      minutes: 8,
      objectives: [
        'Créer une référence avec useRef',
        'Pointer un élément de la page grâce à l attribut ref',
        'Distinguer une ref d un état',
      ],
      blocks: [
        { type: 'p', text: "Vous voulez qu'un bouton « Répondre » place le curseur dans un champ de texte, ou que le composant compte ses affichages sans redessiner l'écran à chaque fois. useState déclenche un nouvel affichage à chaque changement : ce n'est pas toujours souhaitable. Il faut alors une boîte de rangement qui ne réaffiche rien : useRef." },
        { type: 'h', text: 'Explication simple' },
        { type: 'p', text: "useRef retourne un objet mutable nommé `current` qui persiste entre les rendus. Deux usages principaux : garder la référence d'un élément de la page, grâce à l'attribut `ref`, ou mémoriser une valeur qui n'a pas besoin d'affichage. Contrairement à un état, changer `ref.current` ne déclenche aucun réaffichage : l'écran reste tel quel." },
        {
          type: 'list',
          items: [
            "`useRef(valeur)` crée une boîte dont la propriété `current` contient la valeur.",
            "Sur un élément JSX, l'attribut `ref` range cet élément dans la boîte.",
            "On lit ou modifie `ref.current` dans un gestionnaire d'événements ou un effet.",
            "Changer `ref.current` ne provoque aucun réaffichage.",
          ],
        },
        {
          type: 'code',
          lang: 'jsx',
          code: `import { useRef } from "react";

function ChampReponse() {
  const champRef = useRef(null);

  function mettreEnFocus() {
    champRef.current.focus();
  }

  return (
    <div>
      <input ref={champRef} placeholder="Votre réponse" />
      <button onClick={mettreEnFocus}>Répondre</button>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<ChampReponse />);`,
          caption: 'Un bouton qui déplace le curseur dans le champ grâce à useRef',
        },
        {
          type: 'list',
          items: [
            'Ligne 4 : `useRef(null)` crée la boîte, encore vide au chargement.',
            'Ligne 9 : `<input ref={champRef} />` — dès le montage, l’élément input est rangé dans `champRef.current`.',
            'Ligne 6 : `champRef.current.focus()` — la méthode `focus()` place le curseur dans le champ.',
            "Ligne 11 : le clic appelle `mettreEnFocus` — à ce moment-là, l'élément existe déjà.",
            "Aucun état n'est déclaré : rien ne se réaffiche, la page réagit directement.",
          ],
        },
        { type: 'result', text: "À l'écran : un champ « Votre réponse » et un bouton « Répondre ». Au clic, le curseur se place dans le champ, qui devient actif." },
        {
          type: 'mistake',
          text: "Lire `ref.current` pendant le premier rendu pour obtenir la valeur du champ : l'élément n'existe pas encore et `current` vaut `null`.",
          fix: "Accédez à `ref.current` dans un gestionnaire d'événements ou un useEffect, après le montage.",
        },
        {
          type: 'mistake',
          text: "Utiliser useRef pour une valeur qui doit s'afficher : comme le rendu n'est pas déclenché, l'écran reste figé.",
          fix: "Pour afficher un changement, utilisez useState ; useRef sert aux valeurs qui n'ont pas besoin d'être affichées.",
        },
        { type: 'quote', text: "Résumé : useRef crée une boîte { current } persistante qui pointe vers un élément ou garde une valeur, sans jamais déclencher de réaffichage." },
      ],
      exercises: [
        {
          id: 'm09-l04-e1',
          type: 'qcm',
          difficulty: 'facile',
          question: 'Que se passe-t-il quand on modifie `ref.current` ?',
          options: [
            'React réaffiche automatiquement le composant',
            'Aucun réaffichage : seule la valeur interne de la boîte change',
            'Le composant est retiré de la page',
            "Une erreur s'affiche toujours",
          ],
          answer: 1,
          hint: 'Recherchez la différence avec useState.',
          explanation:
            "useRef est conçu pour des valeurs qui n'ont pas besoin d'être affichées : modifier `current` ne prévient pas React, donc aucun rendu n'a lieu (option 1). C'est justement ce qui distingue une ref d'un état : avec useState, tout changement provoque un affichage (option 0 faux), le composant reste en place (option 2 faux) et aucune erreur n'est levée (option 3 faux).",
        },
        {
          id: 'm09-l04-e2',
          type: 'code',
          difficulty: 'intermédiaire',
          language: 'jsx',
          question:
            "Créez un composant `Recherche` avec un champ texte et un bouton « Effacer » qui vide le champ puis replace le curseur dedans.",
          template: `import { useRef } from "react";

function Recherche() {
  const champRef = useRef(null);

  // écrivez la fonction effacer et le JSX
}
`,
          solution: `import { useRef } from "react";

function Recherche() {
  const champRef = useRef(null);

  function effacer() {
    champRef.current.value = "";
    champRef.current.focus();
  }

  return (
    <div>
      <input ref={champRef} type="text" placeholder="Rechercher" />
      <button onClick={effacer}>Effacer</button>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<Recherche />);`,
          mustContain: ['champRef.current', 'focus()'],
          hint: 'La valeur d un champ se lit et s écrit dans la propriété .value de l élément.',
          explanation:
            "L'attribut `ref={champRef}` range l'input dans `champRef.current`. Au clic, la fonction écrit une chaîne vide dans `.value` pour vider le champ, puis appelle `.focus()` pour y replacer le curseur : deux opérations directes sur l'élément, sans état ni réaffichage.",
        },
        {
          id: 'm09-l04-e3',
          type: 'fill',
          difficulty: 'facile',
          question: "useRef retourne un objet contenant une propriété nommée …",
          accepted: ['current', 'propriete current', 'la propriété current'],
          hint: 'Sept lettres, en anglais.',
          explanation:
            "La boîte renvoyée par useRef est toujours `{ current: ... }` : `current` contient soit la valeur passée à useRef, soit l'élément DOM pointé par l'attribut `ref`. C'est la seule porte d'entrée de la référence.",
        },
      ],
    },
    // SUITE_MODULE09
  ],
};
