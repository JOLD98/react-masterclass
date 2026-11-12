import type { Project } from '../types';

export const projects: Project[] = [
  {
    id: 'p01',
    title: 'Compteur interactif',
    level: 'Débutant',
    skills: [
      'Le hook useState pour stocker une valeur qui change',
      "Les événements onClick des boutons",
      "L'affichage dynamique avec les accolades JSX",
      'Les props pour passer une valeur à un composant',
      'La gestion des nombres négatifs et du formatage',
    ],
    objectives: [
      'Créer un compteur qui démarre à 0 et s’incrémente à chaque clic sur le bouton +',
      'Réinitialiser la valeur à 0 avec le bouton Reset, quel que soit l’état courant',
      'Afficher la valeur y compris lorsqu’elle est négative, avec un signe lisible',
      'Ajouter un pas configurable (1, 5 ou 10) qui modifie le saut des boutons + et −',
      'Extraire l’affichage dans un composant `Affichage` réutilisable',
    ],
    brief:
      "Votre première application React : un compteur que l’on peut incrémenter, décrémenter et remettre à zéro, comme le total d’un panier au supermarché. Vous allez utiliser le hook useState, la boîte de mémoire de votre composant, pour garder la valeur à jour. Trois boutons (+, −, Reset) suffisent : à chaque clic, React réaffiche le composant avec la nouvelle valeur. Vous ajouterez ensuite un « pas » configurable pour avancer de 1, 5 ou 10 d’un seul coup.",
    preview:
      "• Page centrée, fond gris très clair (#f3f4f6), une seule carte blanche de 320 px, coins arrondis et ombre douce.\n• Titre « Compteur » en haut de la carte, texte foncé (#1f2937), centré.\n• Grand chiffre du compteur au centre : 72 px, gras, bleu (#2563eb) ; il passe en rouge (#dc2626) dès que la valeur devient négative.\n• Ligne de trois boutons arrondis sous le chiffre : « − » gris clair, « Reset » blanc à bordure grise, « + » bleu plein avec texte blanc.\n• Sous les boutons, un sélecteur de pastilles « Pas : 1 5 10 » ; la pastille active est entourée d’un anneau bleu.\n• Tous les éléments sont alignés au centre, espacés de 16 px, avec une ombre légère au survol des boutons.",
    steps: [
      {
        title: 'Créer le projet',
        detail:
          'Lancez `npm create vite@latest compteur -- --template react`, puis `npm install`. Ouvrez `src/App.jsx`, c’est là que vivra votre compteur.',
      },
      {
        title: 'Ajouter l’état du compteur',
        detail:
          'Dans `src/App.jsx`, importez le hook : `import { useState } from "react";` puis déclarez `const [count, setCount] = useState(0);` avant le `return`.',
      },
      {
        title: 'Afficher la valeur',
        detail:
          'Remplacez le contenu du `return` par un `<main>` contenant un `<h1>Compteur</h1>` et un `<p>{count}</p>` : le chiffre s’affiche et se met à jour tout seul.',
      },
      {
        title: 'Brancher les trois boutons',
        detail:
          'Ajoutez les boutons `<button onClick={() => setCount(count - 1)}>−</button>`, `<button onClick={() => setCount(0)}>Reset</button>` et `<button onClick={() => setCount(count + 1)}>+</button>`.',
      },
      {
        title: 'Extraire le composant Affichage',
        detail:
          'Créez `src/Affichage.jsx` qui reçoit `valeur` en prop et renvoie le `<p>` coloré. Importez-le dans `App.jsx` : `<Affichage valeur={count} />`.',
      },
      {
        title: 'Ajouter le pas configurable',
        detail:
          'Ajoutez un second state `const [step, setStep] = useState(1);` et un composant `src/Pas.jsx` avec les trois pastilles 1, 5, 10 qui appellent `onChange`.',
      },
      {
        title: 'Régler les boutons avec le pas',
        detail:
          'Dans `App.jsx`, remplacez `count - 1` par `count - step` et `count + 1` par `count + step` : le Reset, lui, reste toujours `setCount(0)`.',
      },
      {
        title: 'Styler et vérifier',
        detail:
          'Ajoutez `src/Compteur.css` (carte centrée, grands chiffres, boutons arrondis) et testez les cas limites : Reset après plusieurs clics, pas à 10, valeur négative.',
      },
    ],
    criteria: [
      'Le compteur démarre à 0 au chargement de la page.',
      'Le bouton + augmente la valeur exactement du pas sélectionné (1 par défaut).',
      'Le bouton − diminue la valeur du même pas, sans limite basse (les négatifs sont autorisés).',
      'Le bouton Reset ramène toujours à 0, même après un enchaînement de clics.',
      'Changer de pas (1, 5 ou 10) est immédiatement pris en compte par + et −.',
      'La valeur négative s’affiche en rouge, la positive en bleu.',
      'Aucun avertissement dans la console du navigateur et `npm run build` réussit.',
    ],
    solution: [
      {
        title: 'L’état du compteur dans App.jsx',
        lang: 'jsx',
        code: `import { useState } from 'react';
import Affichage from './Affichage';
import Pas from './Pas';
import './Compteur.css';

function App() {
  // L'état du compteur : un simple nombre qui démarre à 0
  const [count, setCount] = useState(0);
  // Le pas : de combien on avance à chaque clic (1, 5 ou 10)
  const [step, setStep] = useState(1);

  return (
    <main className="page">
      <section className="carte">
        <h1>Compteur</h1>

        {/* On délègue l'affichage au composant Affichage */}
        <Affichage valeur={count} />

        <div className="boutons">
          <button onClick={() => setCount(count - step)}>−</button>
          <button onClick={() => setCount(0)}>Reset</button>
          <button onClick={() => setCount(count + step)}>+</button>
        </div>

        <Pas pasActuel={step} onChange={setStep} />
      </section>
    </main>
  );
}

export default App;`,
        note:
          'useState renvoie un couple [valeur, fonctionDeMiseAJour]. Ici on peut passer `setStep` directement en prop car Pas l’appellera avec la nouvelle valeur.',
      },
      {
        title: 'Le composant d’affichage (Affichage.jsx)',
        lang: 'jsx',
        code: `// Ce composant n'a pas d'état : il reçoit une valeur et l'affiche.
function Affichage({ valeur }) {
  // On ajoute un signe + devant les positifs pour bien lire l'écran
  const signe = valeur > 0 ? '+' : '';

  return (
    <p className={valeur < 0 ? 'valeur negatif' : 'valeur'}>
      {signe}
      {valeur}
    </p>
  );
}

export default Affichage;`,
        note:
          'Le `className` conditionnel change la couleur grâce au CSS : `.valeur { color: #2563eb } .valeur.negatif { color: #dc2626 }`.',
      },
      {
        title: 'Le sélecteur de pas (Pas.jsx)',
        lang: 'jsx',
        code: `// Les trois valeurs proposées à l'utilisateur
const PAS_DISPONIBLES = [1, 5, 10];

function Pas({ pasActuel, onChange }) {
  return (
    <div className="pas">
      <span>Pas :</span>
      {PAS_DISPONIBLES.map((p) => (
        <button
          key={p}
          className={p === pasActuel ? 'pastille active' : 'pastille'}
          onClick={() => onChange(p)}
        >
          {p}
        </button>
      ))}
    </div>
  );
}

export default Pas;`,
        note:
          'Chaque bouton porte une `key` unique (obligatoire quand on utilise map). Le composant reste pur : il ne change pas lui-même l’état, il prévient le parent via `onChange`.',
      },
    ],
  },
  {
    id: 'p02',
    title: 'Calculatrice',
    level: 'Débutant',
    skills: [
      'Les conditions if / else pour choisir une opération',
      'La conversion des saisies en nombres avec Number()',
      "L'historique des calculs dans un tableau d'objets",
      'Les listes JSX avec la prop key',
      'La gestion des erreurs par un message affiché',
      'Les formulaires contrôlés et preventDefault',
    ],
    objectives: [
      'Réaliser les quatre opérations (+, −, ×, ÷) à partir de deux nombres saisis',
      'Afficher « Division impossible » lors d’une division par zéro au lieu de Infinity',
      'Conserver les 10 derniers calculs dans un historique et pouvoir le vider',
      'Reproduire un clavier visuel dont chaque touche met à jour la saisie',
      'Formater les résultats à 5 décimales maximum pour éviter les 0.30000000000000004',
    ],
    brief:
      "Vous allez construire la calculatrice de poche de tout le monde, mais en React : deux champs de saisie, un sélecteur d’opération et l’affichage du résultat. Vous ajouterez un historique des dix derniers calculs et un clavier visuel composé de chiffres, d’une virgule et de la touche C. Le piège classique à éviter : une division par zéro doit afficher un message clair, jamais le mot Infinity. Pensez à isoler la logique de calcul dans une fonction unique réutilisable.",
    preview:
      "• Cadre sombre (#111827) de 340 px, coins très arrondis, façon calculatrice de poche, centré sur un fond gris clair.\n• Écran gris foncé en haut : la ligne de calcul en petit gris (#9ca3af) et le résultat en grand (40 px, blanc, aligné à droite).\n• Grille du clavier en 4 colonnes : touches chiffres sur fond #374151, touches opérateurs sur fond orange (#f97316), touche C rouge (#ef4444), touche = bleue pleine.\n• Sous l’écran, un mini-formulaire « classique » : champ Nombre A, sélecteur d’opération (+ − × ÷), champ Nombre B, bouton =.\n• Message d’erreur rouge sous l’écran si le diviseur vaut 0 ou si une saisie est vide.\n• Panneau « Historique » à droite de la calculatrice : 10 lignes du type « 12 × 4 = 48 » et un bouton « Vider ».",
    steps: [
      {
        title: 'Créer la structure',
        detail:
          'Vite + React, puis créez `src/App.jsx`, `src/Calculatrice.css` et plus tard `src/Historique.jsx` et `src/Clavier.jsx`.',
      },
      {
        title: 'Déclarer les états',
        detail:
          'Dans `App.jsx` : `const [a, setA] = useState("")`, `const [b, setB] = useState("")`, `const [op, setOp] = useState("+")`, `const [resultat, setResultat] = useState(null)` et `const [erreur, setErreur] = useState("")`.',
      },
      {
        title: 'Écrire la fonction de calcul',
        detail:
          'Créez `calculer(e)` avec `e.preventDefault()`, convertissez avec `Number(a)` et `Number(b)`, testez le diviseur, puis choisissez l’opération avec une chaîne de if / else.',
      },
      {
        title: 'Afficher le résultat et l’erreur',
        detail:
          'Dans le JSX, affichez `erreur` si elle existe, sinon `resultat`, sinon le tiret « — ». La couleur du texte change en rouge quand `erreur` n’est pas vide.',
      },
      {
        title: 'Construire l’historique',
        detail:
          'Ajoutez `const [historique, setHistorique] = useState([])` et après chaque calcul réussi : `setHistorique([{ id: Date.now(), ligne: texte }, ...historique].slice(0, 10))`.',
      },
      {
        title: 'Créer le composant Historique',
        detail:
          'Créez `src/Historique.jsx` qui reçoit `lignes` et `onVider`, affiche un message vide si le tableau est vide, sinon un `<ul>` avec `lignes.map()` et une `key` par ligne.',
      },
      {
        title: 'Ajouter le clavier visuel',
        detail:
          'Créez `src/Clavier.jsx` avec un tableau `TOUCHES` de 4 × 4 boutons. Chaque touche appelle `onTouche(caractere)` ; dans `App.jsx`, la fonction `appuyer` complète le champ sélectionné (A ou B).',
      },
      {
        title: 'Styler et tester',
        detail:
          'Ajoutez `src/Calculatrice.css` (grille 4 colonnes, écran sombre). Testez : 0 ÷ 0, champ vide, décimales longues, opération négative, historique au-delà de 10 lignes.',
      },
    ],
    criteria: [
      'Les quatre opérations donnent le bon résultat, y compris avec des décimales.',
      'Diviser par 0 affiche « Division impossible » et n’ajoute rien à l’historique.',
      'Une saisie vide ou non numérique affiche un message d’erreur, jamais NaN.',
      'Chaque calcul réussi s’ajoute en tête de l’historique, qui n’excède jamais 10 lignes.',
      'Le bouton « Vider » supprime tout l’historique.',
      'Le clavier visuel permet de saisir les nombres sans clavier physique.',
      'Les résultats sont arrondis à 5 décimales maximum et la console reste propre.',
    ],
    solution: [
      {
        title: 'La logique de calcul et l’erreur de division',
        lang: 'jsx',
        code: `import { useState } from 'react';
import Historique from './Historique';
import Clavier from './Clavier';
import './Calculatrice.css';

// Formate un nombre : 5 décimales max, sans les zéros inutiles
function formater(n) {
  return Number(n.toFixed(5)).toString();
}

function App() {
  const [a, setA] = useState('');
  const [b, setB] = useState('');
  const [op, setOp] = useState('+');
  const [resultat, setResultat] = useState(null);
  const [erreur, setErreur] = useState('');
  const [historique, setHistorique] = useState([]);
  const [champ, setChamp] = useState('a'); // champ modifié par le clavier visuel

  function calculer(e) {
    if (e) e.preventDefault();
    const n1 = Number(a);
    const n2 = Number(b);

    if (a === '' || b === '' || Number.isNaN(n1) || Number.isNaN(n2)) {
      setErreur('Veuillez saisir deux nombres valides.');
      return;
    }
    if (op === '/' && n2 === 0) {
      setErreur('Division impossible : le diviseur vaut 0.');
      return;
    }

    let r;
    if (op === '+') r = n1 + n2;
    else if (op === '-') r = n1 - n2;
    else if (op === '*') r = n1 * n2;
    else r = n1 / n2;

    const ligne = formater(n1) + ' ' + op + ' ' + formater(n2) + ' = ' + formater(r);
    setErreur('');
    setResultat(r);
    setHistorique([{ id: Date.now(), ligne: ligne }, ...historique].slice(0, 10));
  }

  // Appelée par le clavier visuel : complète le champ choisi ou calcule
  function appuyer(touche) {
    if (touche === '=') {
      calculer(null);
      return;
    }
    const courant = champ === 'a' ? a : b;
    if (touche === 'C') {
      if (champ === 'a') setA(''); else setB('');
      return;
    }
    if (touche === '.' && courant.indexOf('.') !== -1) return;
    const nouvelle = courant + touche;
    if (champ === 'a') setA(nouvelle); else setB(nouvelle);
  }

  function vider() {
    setHistorique([]);
  }

  return (
    <main className="page">
      <section className="calculatrice">
        <div className="ecran">
          <p className="ligne">{erreur !== '' ? erreur : resultat === null ? '—' : formater(resultat)}</p>
        </div>

        <form onSubmit={calculer} className="saisie">
          <input value={a} onFocus={() => setChamp('a')} onChange={(e) => setA(e.target.value)} placeholder="Nombre A" />
          <select value={op} onChange={(e) => setOp(e.target.value)}>
            <option value="+">+</option>
            <option value="-">−</option>
            <option value="*">×</option>
            <option value="/">÷</option>
          </select>
          <input value={b} onFocus={() => setChamp('b')} onChange={(e) => setB(e.target.value)} placeholder="Nombre B" />
          <button type="submit">Calculer</button>
        </form>

        <Clavier onTouche={appuyer} />
      </section>

      <Historique lignes={historique} onVider={vider} />
    </main>
  );
}

export default App;`,
        note:
          'Le garde-fou `op === "/" && n2 === 0` est placé AVANT le calcul : c’est lui qui évite Infinity. On utilise la concaténation de chaînes ici pour rester simple, un littéral de gabarit conviendrait aussi.',
      },
      {
        title: 'Le panneau d’historique (Historique.jsx)',
        lang: 'jsx',
        code: `function Historique({ lignes, onVider }) {
  return (
    <aside className="historique">
      <h2>Historique</h2>

      {/* Rendu conditionnel : message si vide, liste sinon */}
      {lignes.length === 0 ? (
        <p className="vide">Aucun calcul pour l'instant.</p>
      ) : (
        <ul>
          {lignes.map((l) => (
            <li key={l.id}>{l.ligne}</li>
          ))}
        </ul>
      )}

      <button onClick={onVider} disabled={lignes.length === 0}>
        Vider
      </button>
    </aside>
  );
}

export default Historique;`,
        note:
          'Le bouton est désactivé quand il n’y a rien à vider : c’est un retour visuel qui évite les clics inutiles.',
      },
      {
        title: 'Le clavier visuel (Clavier.jsx)',
        lang: 'jsx',
        code: `// Les touches disposées sur 4 lignes de 4 colonnes
const TOUCHES = [
  ['7', '8', '9', '/'],
  ['4', '5', '6', '*'],
  ['1', '2', '3', '-'],
  ['0', '.', 'C', '+'],
];

// flatten() àplatit le tableau de tableaux en un seul tableau de touches
const PLAT = TOUCHES.flat();

function Clavier({ onTouche }) {
  return (
    <div className="clavier">
      {PLAT.map((t) => (
        <button
          key={t}
          type="button"
          className={['/', '*', '-', '+'].indexOf(t) !== -1 ? 'touche op' : 'touche'}
          onClick={() => onTouche(t)}
        >
          {t}
        </button>
      ))}
      <button type="button" className="touche egal" onClick={() => onTouche('=')}>
        =
      </button>
    </div>
  );
}

export default Clavier;`,
        note:
          'Chaque caractère n’apparaît qu’une seule fois : les `key` sont donc uniques. Le composant ne connaît pas l’état, il délègue tout à `onTouche`.',
      },
    ],
  },
  {
    id: 'p03',
    title: 'Liste de tâches (Todo List)',
    level: 'Débutant confirmé',
    skills: [
      'Le state de type tableau pour stocker la liste des tâches',
      'Les formulaires contrôlés avec useState',
      'La filtration avec filter et une condition sur un booléen',
      'La persistance localStorage et l’effet useEffect',
      'Le rendu de liste avec map et la prop key',
      'Les callbacks enfant → parent pour cocher et supprimer',
    ],
    objectives: [
      'Ajouter une tâche depuis un champ de saisie, sans accepter les saisies vides',
      'Basculer l’état terminée / active d’une tâche par un clic sur sa case',
      'Supprimer exactement la tâche cliquée sans toucher aux autres',
      'Filtrer la liste en trois vues : toutes, actives, terminées',
      'Sauvegarder les tâches dans localStorage et les retrouver au rechargement',
      'Afficher en temps réel le compteur « X tâches restantes »',
    ],
    brief:
      "La Todo List est l’application utile qui vous suivra tout au long de ce parcours : on y ajoute des tâches, on les coche, on les supprime. Vous gérerez une liste de trois vues (toutes, actives, terminées) grâce à un seul state `filtre` qui pilote un filtre. Le niveau confirmé ajoute une exigence réelle : les tâches doivent survivre à un rechargement de page grâce à localStorage. Séparez bien la logique (les fonctions de mise à jour dans App) de l’affichage (les composants qui reçoivent des props).",
    preview:
      "• Page centrée, fond #f9fafb, carte blanche de 480 px, coins arrondis, ombre douce.\n• Titre « Ma TODO List » en bleu #2563eb, suivi d’une barre de saisie : champ texte arrondi + bouton « + » orange.\n• Liste de lignes : case à cocher à gauche, texte au centre, bouton « ✕ » rouge qui apparaît au survol de la ligne.\n• Les tâches terminées sont barrées et en gris #9ca3af ; les actives restent en noir sur blanc.\n• Barre de filtres sous la liste : trois onglets « Toutes | Actives | Terminées », l’onglet actif a un fond bleu et du texte blanc.\n• Pied de carte : « 2 tâches restantes » à gauche, bouton « Effacer les terminées » à droite.\n• Ligne vide possible : « Aucune tâche pour ce filtre 🙂 » en italique gris.",
    steps: [
      {
        title: 'Poser la structure',
        detail:
          'Créez `src/App.jsx`, `src/TacheItem.jsx`, `src/Filtres.jsx` et `src/TodoList.css`. Commencez par le modèle d’une tâche : `{ id, texte, terminee }`.',
      },
      {
        title: 'Stocker les tâches',
        detail:
          'Dans `App.jsx` : `const [taches, setTaches] = useState([])` plus `const [nouvelleTache, setNouvelleTache] = useState("")` pour le champ contrôlé.',
      },
      {
        title: 'Ajouter une tâche',
        detail:
          'Sur le `<form onSubmit={ajouter}>`, appelez `e.preventDefault()`, testez `nouvelleTache.trim() !== ""`, puis `setTaches([...taches, { id: Date.now(), texte: texte, terminee: false }])` et videz le champ.',
      },
      {
        title: 'Cocher et supprimer',
        detail:
          'Dans `TacheItem.jsx`, passez `onBasculer` et `onSupprimer`. Dans App : `setTaches(taches.map((t) => t.id === id ? { ...t, terminee: !t.terminee } : t))` et `setTaches(taches.filter((t) => t.id !== id))`.',
      },
      {
        title: 'Calculer la liste filtrée',
        detail:
          'Ajoutez `const [filtre, setFiltre] = useState("toutes")` puis, avant le return, `const visibles = taches.filter((t) => filtre === "actives" ? !t.terminee : filtre === "terminees" ? t.terminee : true)`.',
      },
      {
        title: 'Persister dans localStorage',
        detail:
          'Lisez le JSON au démarrage avec l’initialiseur paresseux de useState, puis ajoutez `useEffect(() => { localStorage.setItem("mes-taches", JSON.stringify(taches)); }, [taches]);`.',
      },
      {
        title: 'Découper les composants',
        detail:
          'Passez en props `taches`, `onBasculer`, `onSupprimer` à `TacheItem` et `filtre`, `onFiltrer` à `Filtres`. Le JSX de App ne doit plus contenir que de l’assemblage.',
      },
      {
        title: 'Styler et vérifier',
        detail:
          'Ajoutez `src/TodoList.css` (ligne barrée, onglets, bouton ✕) puis testez : recharger la page, changer de filtre, vider les terminées, ajouter 20 tâches.',
      },
    ],
    criteria: [
      'Impossible d’ajouter une tâche vide ou composée uniquement d’espaces.',
      'Cocher ou décocher met à jour la ligne ET le compteur de restantes.',
      'Supprimer une tâche ne touche pas aux autres tâches.',
      'Les trois filtres affichent exactement les bonnes tâches (aucune en trop, aucune en moins).',
      'Le compteur « X tâches restantes » compte les tâches actives, quel que soit le filtre affiché.',
      'Après un rechargement complet de la page, toutes les tâches sont toujours là.',
      'Le bouton « Effacer les terminées » ne supprime que les tâches cochées.',
      'Aucun avertissement « key » manquant dans la console.',
    ],
    solution: [
      {
        title: 'L’état, les opérations et la persistance (App.jsx)',
        lang: 'jsx',
        code: `import { useState, useEffect } from 'react';
import TacheItem from './TacheItem';
import Filtres from './Filtres';
import './TodoList.css';

const CLE = 'mes-taches';

function App() {
  // Initialiseur paresseux : on lit localStorage une seule fois, au montage
  const [taches, setTaches] = useState(() => {
    const brut = localStorage.getItem(CLE);
    return brut ? JSON.parse(brut) : [];
  });
  const [nouvelleTache, setNouvelleTache] = useState('');
  const [filtre, setFiltre] = useState('toutes');

  // À chaque modification de la liste, on sauvegarde le JSON
  useEffect(() => {
    localStorage.setItem(CLE, JSON.stringify(taches));
  }, [taches]);

  function ajouter(e) {
    e.preventDefault();
    const texte = nouvelleTache.trim();
    if (texte === '') return; // jamais de tâche vide
    setTaches([...taches, { id: Date.now(), texte: texte, terminee: false }]);
    setNouvelleTache('');
  }

  function basculer(id) {
    setTaches(
      taches.map((t) => (t.id === id ? { ...t, terminee: !t.terminee } : t))
    );
  }

  function supprimer(id) {
    setTaches(taches.filter((t) => t.id !== id));
  }

  function effacerTerminees() {
    setTaches(taches.filter((t) => !t.terminee));
  }

  // La liste affichée est CALCULÉE à chaque rendu, ce n'est pas un state
  const visibles = taches.filter((t) => {
    if (filtre === 'actives') return !t.terminee;
    if (filtre === 'terminees') return t.terminee;
    return true;
  });
  const restantes = taches.filter((t) => !t.terminee).length;

  return (
    <main className="page">
      <section className="carte">
        <h1>Ma TODO List</h1>

        <form className="saisie" onSubmit={ajouter}>
          <input
            value={nouvelleTache}
            onChange={(e) => setNouvelleTache(e.target.value)}
            placeholder="Que faut-il faire ?"
          />
          <button type="submit">+</button>
        </form>

        <ul className="liste">
          {visibles.map((t) => (
            <TacheItem
              key={t.id}
              tache={t}
              onBasculer={basculer}
              onSupprimer={supprimer}
            />
          ))}
        </ul>

        <Filtres filtre={filtre} onFiltrer={setFiltre} />

        <footer className="pied">
          <span>{restantes} tâche(s) restante(s)</span>
          <button onClick={effacerTerminees}>Effacer les terminées</button>
        </footer>
      </section>
    </main>
  );
}

export default App;`,
        note:
          'Le filtre ne modifie jamais `taches` : il produit un nouveau tableau `visibles`. La source de vérité reste le state complet, sinon le compteur fausserait.',
      },
      {
        title: 'Une ligne de tâche (TacheItem.jsx)',
        lang: 'jsx',
        code: `function TacheItem({ tache, onBasculer, onSupprimer }) {
  return (
    <li className={tache.terminee ? 'tache terminee' : 'tache'}>
      {/* Case contrôlée : son état vient du state, pas du navigateur */}
      <input
        type="checkbox"
        checked={tache.terminee}
        onChange={() => onBasculer(tache.id)}
      />
      <span>{tache.texte}</span>
      <button
        className="supprimer"
        aria-label={"Supprimer " + tache.texte}
        onClick={() => onSupprimer(tache.id)}
      >
        ✕
      </button>
    </li>
  );
}

export default TacheItem;`,
        note:
          'Le composant ne possède aucune donnée : il reçoit `tache` et prévient le parent. C’est le pattern « composant contrôlé » que vous réutiliserez partout.',
      },
      {
        title: 'Les trois filtres (Filtres.jsx)',
        lang: 'jsx',
        code: `const FILTRES = [
  { cle: 'toutes', label: 'Toutes' },
  { cle: 'actives', label: 'Actives' },
  { cle: 'terminees', label: 'Terminées' },
];

function Filtres({ filtre, onFiltrer }) {
  return (
    <div className="filtres">
      {FILTRES.map((f) => (
        <button
          key={f.cle}
          className={f.cle === filtre ? 'onglet actif' : 'onglet'}
          onClick={() => onFiltrer(f.cle)}
        >
          {f.label}
        </button>
      ))}
    </div>
  );
}

export default Filtres;`,
        note:
          'Les libellés affichés et les clés de filtrage sont séparés : on peut changer le texte sans casser la logique de `filter` dans App.',
      },
    ],
  },
  {
    id: 'p04',
    title: 'Gestionnaire de contacts',
    level: 'Débutant confirmé',
    skills: [
      'Le CRUD complet : créer, lire, modifier, supprimer',
      'Les formulaires contrôlés et la validation d’email avec RegExp',
      'La recherche instantanée avec filter et toLowerCase',
      "La génération d'avatar à partir des initiales",
      'Un formulaire unique pour créer ET éditer (mode édition)',
      'La persistance des contacts dans localStorage',
    ],
    objectives: [
      'Créer un contact valide (nom + email) et l’insérer en tête de liste',
      'Modifier un contact existant sans jamais en créer un second',
      'Supprimer un contact avec confirmation puis mettre à jour l’affichage',
      'Rechercher un contact par nom ou par email, insensible à la casse',
      'Bloquer la soumission si l’email ne respecte pas le format a@b.c',
      'Afficher un avatar circulaire avec les initiales du contact',
    ],
    brief:
      "Vous allez construire le carnet d’adresses d’un téléphone : on y ajoute, on y modifie, on y supprime des contacts. Le vrai défi n’est pas d’afficher une liste, c’est de faire UN seul formulaire qui sert à la fois à créer et à éditer, en changeant juste son titre et son bouton. Vous y ajouterez une recherche instantanée et une validation stricte de l’email : un contact sans email valide ne doit jamais entrer dans la liste. Gardez un tableau de contacts comme unique source de vérité.",
    preview:
      "• En-tête blanc collant : titre « Mes contacts (12) » à gauche, champ de recherche arrondi avec loupe à droite.\n• Grille de cartes (3 colonnes au-delà de 900 px, 1 colonne sous 640 px), carte blanche, coins arrondis, ombre légère.\n• Chaque carte : rond coloré de 48 px avec les 2 initiales en blanc, nom en gras, email et téléphone en gris (#6b7280), puis deux liens « Modifier » (bleu) et « Supprimer » (rouge).\n• Formulaire au-dessus de la grille : champs Nom, Email, Téléphone, 4 pastilles de couleur, bouton bleu « Ajouter » et bouton gris « Annuler ».\n• En mode édition, le titre du formulaire devient « Modifier le contact », le bouton « Enregistrer » et l’annulation remet le formulaire à vide.\n• Ligne d’erreur rouge sous le champ email si le format est invalide : « L’adresse email n’est pas valide (ex. : jean@exemple.fr). »\n• Message central « Aucun contact ne correspond à votre recherche » quand le filtre ne retourne rien.",
    steps: [
      {
        title: 'Structurer les fichiers',
        detail:
          'Créez `src/App.jsx`, `src/ContactForm.jsx`, `src/ContactCard.jsx`, `src/SearchBar.jsx` et `src/Contacts.css`.',
      },
      {
        title: 'Définir le modèle d’un contact',
        detail:
          'Un contact est un objet `{ id, nom, email, telephone, couleur }`. `id` vaut `Date.now()` : il est unique et sert de clé de rendu.',
      },
      {
        title: 'Écrire les opérations CRUD',
        detail:
          'Dans App : `ajouter` insère en tête, `modifier(id)` mémorise l’id en édition, `supprimer(id)` filtre le tableau après `window.confirm`.',
      },
      {
        title: 'Créer le formulaire unique',
        detail:
          'Dans `ContactForm.jsx`, un state `form` (nom, email, telephone, couleur) et une prop `contactAModifier` : si elle vaut null on crée, sinon on pré-remplit via un useEffect.',
      },
      {
        title: 'Valider l’email',
        detail:
          'Déclarez `const EMAIL_VALIDE = /^[^ @]+@[^ @]+\\.[^ @]+$/;` puis testez `EMAIL_VALIDE.test(form.email)` avant d’appeler `onEnregistrer` ; sinon affichez `erreur`.',
      },
      {
        title: 'Rechercher instantanément',
        detail:
          'State `recherche` dans App, puis `contacts.filter((c) => c.nom.toLowerCase().includes(q) || c.email.toLowerCase().includes(q))` avec `q = recherche.trim().toLowerCase()`.',
      },
      {
        title: 'Construire l’avatar',
        detail:
          'Dans `ContactCard.jsx`, une fonction qui découpe le nom : `nom.split(" ").filter(Boolean).map((m) => m[0].toUpperCase()).slice(0, 2).join("")`.',
      },
      {
        title: 'Persister et tester',
        detail:
          'Sauvegardez dans localStorage à chaque changement et lisez-le au démarrage. Testez : email invalide, modification après recherche, suppression annulée, contacts vides.',
      },
    ],
    criteria: [
      'Impossible d’ajouter un contact sans nom ou avec un email invalide.',
      'Modifier un contact remplace ses données sans dupliquer l’entrée.',
      'Supprimer demande confirmation puis retire exactement cette carte.',
      'La recherche filtre sur le nom ET l’email, sans tenir compte de la casse.',
      'Le formulaire passe automatiquement en mode édition au clic sur « Modifier ».',
      'L’avatar affiche 2 initiales même pour un nom à trois mots.',
      'Les contacts survivent au rechargement de la page.',
      'La grille passe de 3 colonnes à 1 colonne sous 640 px.',
    ],
    solution: [
      {
        title: 'Le state global et les opérations CRUD (App.jsx)',
        lang: 'jsx',
        code: `import { useState, useEffect } from 'react';
import ContactForm from './ContactForm';
import ContactCard from './ContactCard';
import SearchBar from './SearchBar';
import './Contacts.css';

function App() {
  const [contacts, setContacts] = useState(() => {
    const brut = localStorage.getItem('contacts');
    return brut ? JSON.parse(brut) : [];
  });
  const [recherche, setRecherche] = useState('');
  // id du contact en édition, null = mode création
  const [enEdition, setEnEdition] = useState(null);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  function enregistrer(contact) {
    if (enEdition === null) {
      // Création : nouvel objet avec un id unique, inséré en tête
      setContacts([{ ...contact, id: Date.now() }, ...contacts]);
    } else {
      // Modification : on remplace uniquement le contact du même id
      setContacts(
        contacts.map((c) => (c.id === enEdition ? { ...contact, id: enEdition } : c))
      );
    }
    setEnEdition(null);
  }

  function supprimer(id) {
    if (!window.confirm('Supprimer ce contact ?')) return;
    setContacts(contacts.filter((c) => c.id !== id));
    if (enEdition === id) setEnEdition(null);
  }

  // Recherche insensible à la casse, sur le nom ET l'email
  const q = recherche.trim().toLowerCase();
  const visibles = contacts.filter(
    (c) => c.nom.toLowerCase().indexOf(q) !== -1 || c.email.toLowerCase().indexOf(q) !== -1
  );

  const contactEnEdition = contacts.find((c) => c.id === enEdition) ?? null;

  return (
    <main className="page">
      <header className="entete">
        <h1>Mes contacts ({contacts.length})</h1>
        <SearchBar valeur={recherche} onChange={setRecherche} />
      </header>

      <ContactForm
        contactAModifier={contactEnEdition}
        onEnregistrer={enregistrer}
        onAnnuler={() => setEnEdition(null)}
      />

      <section className="grille">
        {visibles.length === 0 ? (
          <p className="vide">Aucun contact ne correspond à votre recherche.</p>
        ) : (
          visibles.map((c) => (
            <ContactCard
              key={c.id}
              contact={c}
              onModifier={() => setEnEdition(c.id)}
              onSupprimer={() => supprimer(c.id)}
            />
          ))
        )}
      </section>
    </main>
  );
}

export default App;`,
        note:
          'Une seule fonction `enregistrer` gère les deux cas : c’est le cœur du CRUD. `enEdition` fait foi de mode, tout le reste en découle.',
      },
      {
        title: 'Le formulaire unique avec validation (ContactForm.jsx)',
        lang: 'jsx',
        code: `import { useState, useEffect } from 'react';

// Format attendu : quelque chose @ quelque chose . extension
const EMAIL_VALIDE = /^[^ @]+@[^ @]+\\.[^ @]+$/;

const VIDE = { nom: '', email: '', telephone: '', couleur: '#2563eb' };

function ContactForm({ contactAModifier, onEnregistrer, onAnnuler }) {
  const [form, setForm] = useState(VIDE);
  const [erreur, setErreur] = useState('');

  // Quand on passe en édition, on pré-remplit ; sinon on remet à zéro
  useEffect(() => {
    setForm(contactAModifier ? contactAModifier : VIDE);
    setErreur('');
  }, [contactAModifier]);

  function changer(e) {
    // Nom de champ = name de l'input : une seule fonction pour tous les champs
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function soumettre(e) {
    e.preventDefault();
    if (form.nom.trim() === '') {
      setErreur('Le nom est obligatoire.');
      return;
    }
    if (!EMAIL_VALIDE.test(form.email)) {
      setErreur("L'adresse email n'est pas valide (ex. : jean@exemple.fr).");
      return;
    }
    setErreur('');
    onEnregistrer({ ...form, nom: form.nom.trim() });
    if (!contactAModifier) setForm(VIDE);
  }

  return (
    <form className="formulaire" onSubmit={soumettre}>
      <h2>{contactAModifier ? 'Modifier le contact' : 'Nouveau contact'}</h2>

      <input name="nom" value={form.nom} onChange={changer} placeholder="Nom complet" />
      <input name="email" value={form.email} onChange={changer} placeholder="Email" />
      <input name="telephone" value={form.telephone} onChange={changer} placeholder="Téléphone" />

      <div className="couleurs">
        {['#2563eb', '#16a34a', '#dc2626', '#7c3aed'].map((c) => (
          <button
            key={c}
            type="button"
            className={form.couleur === c ? 'pastille active' : 'pastille'}
            style={{ backgroundColor: c }}
            onClick={() => setForm({ ...form, couleur: c })}
            aria-label={"Choisir la couleur " + c}
          />
        ))}
      </div>

      {erreur && <p className="erreur">{erreur}</p>}

      <div className="actions">
        <button type="submit">{contactAModifier ? 'Enregistrer' : 'Ajouter'}</button>
        <button type="button" onClick={onAnnuler}>Annuler</button>
      </div>
    </form>
  );
}

export default ContactForm;`,
        note:
          'La double apostrophe de la chaîne d’erreur est gérée par les guillemets doubles : `"L\'adresse..."` est écrit avec `"` autour, exactement comme ici.',
      },
      {
        title: 'La carte et son avatar (ContactCard.jsx)',
        lang: 'jsx',
        code: `function Avatar({ nom, couleur }) {
  // Initiales : première lettre du premier mot et du second mot
  const initiales = nom
    .split(' ')
    .filter(Boolean)
    .map((mot) => mot[0].toUpperCase())
    .slice(0, 2)
    .join('');

  return (
    <span className="avatar" style={{ backgroundColor: couleur }}>
      {initiales}
    </span>
  );
}

function ContactCard({ contact, onModifier, onSupprimer }) {
  return (
    <article className="carte-contact">
      <Avatar nom={contact.nom} couleur={contact.couleur} />

      <div className="infos">
        <h3>{contact.nom}</h3>
        <p>{contact.email}</p>
        <p>{contact.telephone || '—'}</p>
      </div>

      <div className="actions-carte">
        <button onClick={onModifier}>Modifier</button>
        <button className="danger" onClick={onSupprimer}>
          Supprimer
        </button>
      </div>
    </article>
  );
}

export default ContactCard;`,
        note:
          '`Avatar` n’est pas exporté : il sert uniquement à l’intérieur de ce fichier. C’est une bonne façon d’enfermer un détail d’affichage.',
      },
      {
        title: 'La barre de recherche (SearchBar.jsx)',
        lang: 'jsx',
        code: `function SearchBar({ valeur, onChange }) {
  return (
    <div className="search-bar">
      <span aria-hidden="true">🔍</span>
      <input
        type="search"
        value={valeur}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Rechercher un nom ou un email…"
      />
      {valeur !== '' && (
        <button onClick={() => onChange('')} aria-label="Effacer la recherche">
          ✕
        </button>
      )}
    </div>
  );
}

export default SearchBar;`,
        note:
          'Le composant est totalement contrôlé : il ne stocke rien, il renvoie la nouvelle valeur à App. Le bouton ✕ n’apparaît que si la saisie est non vide.',
      },
    ],
  },
  {
    id: 'p05',
    title: 'Application météo avec API',
    level: 'Intermédiaire',
    skills: [
      'Les requêtes asynchrones avec fetch et async / await',
      'Les trois états visibles : chargement, succès, erreur',
      'Le géocodage : convertir un nom de ville en coordonnées',
      "L'annulation des requêtes obsolètes avec AbortController",
      'La conversion des unités °C / °F sans nouvelle requête',
      'L’interpolation des données d’une API dans le JSX',
    ],
    objectives: [
      'Rechercher une ville et afficher sa météo actuelle via l’API Open-Meteo',
      'Afficher un spinner pendant le chargement et un message clair en cas d’erreur',
      'Distinguer « ville introuvable » de « service indisponible »',
      'Basculer entre °C et °F sans déclencher de nouvelle requête réseau',
      'Annuler une requête obsolète quand l’utilisateur relance vite une recherche',
      'Afficher une prévision sur 5 jours avec le bon icône selon le code météo',
    ],
    brief:
      "Votre première application qui parle au monde extérieur : vous allez interroger une vraie API gratuite, Open-Meteo, qui ne demande aucune clé d’accès. Le travail se fait en deux temps : convertir d’abord le nom de la ville en coordonnées (géocodage), puis demander la météo de ces coordonnées. Le plus important ici n’est pas le CSS mais la gestion des trois états : chargement, succès et erreur. Une API, c’est un ami lent et parfois indisponible : il faut toujours prévoir le cas où la réponse ne vient pas.",
    preview:
      "• Carte météo centrale de 400 px : bandeau dégradé bleu (#3b82f6) selon la météo, nom de la ville en blanc, température géante (64 px) avec le symbole °.\n• Bouton °C / °F en haut à droite de la carte, petit, blanc à bordure fine.\n• Sous la température : trois pastilles translucides — ressenti, vent (km/h), humidité (%).\n• Champ de recherche au-dessus de la carte avec bouton « Rechercher » ; pendant l’attente, le bouton affiche « Recherche… » et un spinner tourne à côté.\n• Bandeau d’erreur rouge sur fond rouge très clair avec le message et un bouton « Réessayer ».\n• Bande « Prévision sur 5 jours » sous la carte : 5 blocs (jour de la semaine, icône ☀️ ⛅ 🌧️, max / min).\n• Fond de page dégradé #dbeafe → #ede9fe, carte blanche à ombre douce, centrée.",
    steps: [
      {
        title: 'Créer le module d’API',
        detail:
          'Vite + React, puis `src/api.js` avec deux fonctions exportées : `geocoder(ville, signal)` et `meteo(lat, lon, signal)` qui retournent toutes deux des promesses.',
      },
      {
        title: 'Géocoder la ville',
        detail:
          'Dans `geocoder`, appelez `https://geocoding-api.open-meteo.com/v1/search?name=PARIS&count=1&language=fr` avec `encodeURIComponent`, puis lisez `data.results[0]` et jetez une erreur s’il est absent.',
      },
      {
        title: 'Récupérer la météo',
        detail:
          'Dans `meteo`, construisez l’URL avec `current=temperature_2m,relative_humidity_2m,apparent_temperature,wind_speed_10m,weather_code`, `daily=weather_code,temperature_2m_max,temperature_2m_min`, `forecast_days=5` et `timezone=auto`.',
      },
      {
        title: 'Câbler les trois états',
        detail:
          'Dans `App.jsx` : `const [statut, setStatut] = useState("chargement")` (puis `"succes"` ou `"erreur"`) et `const [erreur, setErreur] = useState("")`. Le JSX affiche un bloc différent pour chaque valeur.',
      },
      {
        title: 'Lancer la recherche au clic',
        detail:
          'State `saisie` pour le champ contrôlé et `villeCherchee` pour la valeur lancée ; au submit, `e.preventDefault()` puis `setVilleCherchee(saisie.trim())` si la saisie n’est pas vide.',
      },
      {
        title: 'Annuler l’obsolète',
        detail:
          'Dans le useEffect qui dépend de `villeCherchee`, créez `const controleur = new AbortController()`, passez `controleur.signal` à chaque fetch, et retournez `() => controleur.abort()` comme nettoyage.',
      },
      {
        title: 'Basculer les unités',
        detail:
          'State `unite` ("C" ou "F") et fonction `convertir(t)` : `unite === "C" ? Math.round(t) : Math.round((t * 9) / 5 + 32)`. Le bouton appelle simplement `setUnite`.',
      },
      {
        title: 'Composer les vues',
        detail:
          'Créez `src/VilleActuelle.jsx` (température, détails, bouton d’unité) et `src/Previsions.jsx` (5 cartes). Testez : ville inconnue, réseau coupé, double recherche rapide.',
      },
    ],
    criteria: [
      'Une ville valide affiche température, ressenti, vent et humidité.',
      'Une ville inconnue affiche « Ville introuvable » et provoque aucune erreur JavaScript.',
      'Le spinner est visible pendant toute la requête puis disparaît au succès comme à l’erreur.',
      'Le basculement °C / °F ne déclenche aucune nouvelle requête réseau (à vérifier dans l’onglet Network).',
      'Une seconde recherche pendant la première annule la première : aucune donnée périmée ne s’affiche.',
      'Une coupure réseau affiche un message lisible avec un bouton « Réessayer ».',
      'Les codes météo 0-3, 45-48, 51-67, 71-77, 80-82 et 95-99 choisissent la bonne icône.',
      'La page reste utilisable sur un écran de 375 px de large.',
    ],
    solution: [
      {
        title: 'Le module d’accès à l’API (src/api.js)',
        lang: 'jsx',
        code: `const BASE_GEO = 'https://geocoding-api.open-meteo.com/v1/search';
const BASE_METEO = 'https://api.open-meteo.com/v1/forecast';

// 1) Convertit un nom de ville en coordonnées géographiques
export async function geocoder(ville, signal) {
  const url =
    BASE_GEO + '?name=' + encodeURIComponent(ville) + '&count=1&language=fr';
  const reponse = await fetch(url, { signal: signal });
  if (!reponse.ok) throw new Error('Le service de géocodage ne répond pas.');

  const donnees = await reponse.json();
  if (!donnees.results || donnees.results.length === 0) {
    throw new Error('Ville introuvable : ' + ville);
  }
  const lieu = donnees.results[0];
  return {
    nom: lieu.name,
    pays: lieu.country || '',
    lat: lieu.latitude,
    lon: lieu.longitude,
  };
}

// 2) Récupère la météo actuelle et 5 jours de prévision
export async function meteo(lat, lon, signal) {
  const url =
    BASE_METEO +
    '?latitude=' + lat +
    '&longitude=' + lon +
    '&current=temperature_2m,relative_humidity_2m,apparent_temperature,wind_speed_10m,weather_code' +
    '&daily=weather_code,temperature_2m_max,temperature_2m_min' +
    '&forecast_days=5&timezone=auto';
  const reponse = await fetch(url, { signal: signal });
  if (!reponse.ok) throw new Error('Le service météo ne répond pas.');
  return reponse.json();
}`,
        note:
          'Chaque erreur lance une exception avec un message français : c’est elle qui s’affichera dans le bandeau rouge. `encodeURIComponent` protège les accents et les espaces dans l’URL.',
      },
      {
        title: 'Les trois états et l’annulation (App.jsx)',
        lang: 'jsx',
        code: `import { useState, useEffect } from 'react';
import { geocoder, meteo } from './api';
import VilleActuelle from './VilleActuelle';
import Previsions from './Previsions';
import './Meteo.css';

function App() {
  const [saisie, setSaisie] = useState('Paris');
  const [villeCherchee, setVilleCherchee] = useState('Paris');
  const [statut, setStatut] = useState('chargement'); // chargement | succes | erreur
  const [erreur, setErreur] = useState('');
  const [lieu, setLieu] = useState(null);
  const [donnees, setDonnees] = useState(null);
  const [unite, setUnite] = useState('C');

  // Cet effet se relance à chaque nouvelle ville recherchée
  useEffect(() => {
    const controleur = new AbortController();

    async function charger() {
      setStatut('chargement');
      setErreur('');
      try {
        const position = await geocoder(villeCherchee, controleur.signal);
        const instant = await meteo(position.lat, position.lon, controleur.signal);
        setLieu(position);
        setDonnees(instant);
        setStatut('succes');
      } catch (e) {
        // Une annulation n'est pas une erreur : on l'ignore silencieusement
        if (e.name === 'AbortError') return;
        setErreur(e.message);
        setStatut('erreur');
      }
    }

    charger();
    // Nettoyage : annule la requête si l'utilisateur relance ou quitte la page
    return () => controleur.abort();
  }, [villeCherchee]);

  function soumettre(e) {
    e.preventDefault();
    if (saisie.trim() !== '') setVilleCherchee(saisie.trim());
  }

  function convertir(t) {
    return unite === 'C' ? Math.round(t) : Math.round((t * 9) / 5 + 32);
  }

  return (
    <main className="page-meteo">
      <form onSubmit={soumettre} className="recherche-ville">
        <input
          value={saisie}
          onChange={(e) => setSaisie(e.target.value)}
          placeholder="Nom de la ville"
        />
        <button type="submit">Rechercher</button>
      </form>

      {statut === 'chargement' && <p className="etat">Chargement en cours…</p>}

      {statut === 'erreur' && (
        <div className="etat erreur">
          <p>{erreur}</p>
          <button onClick={() => setVilleCherchee(saisie)}>Réessayer</button>
        </div>
      )}

      {statut === 'succes' && donnees && lieu && (
        <>
          <VilleActuelle
            lieu={lieu}
            actuel={donnees.current}
            unite={unite}
            onUnite={setUnite}
            convertir={convertir}
          />
          <Previsions journal={donnees.daily} convertir={convertir} />
        </>
      )}
    </main>
  );
}

export default App;`,
        note:
          'Le nettoyage `return () => controleur.abort()` est LE point clé du projet : sans lui, deux recherches rapides peuvent afficher les résultats dans le désordre.',
      },
      {
        title: 'L’affichage de la ville (VilleActuelle.jsx)',
        lang: 'jsx',
        code: `// Dictionnaire : code météo de l'API → icône et libellé en français
const REGLES = [
  { test: (c) => c === 0, icone: '☀️', texte: 'Ciel dégagé' },
  { test: (c) => c >= 1 && c <= 3, icone: '⛅', texte: 'Partiellement nuageux' },
  { test: (c) => c >= 45 && c <= 48, icone: '🌫️', texte: 'Brouillard' },
  { test: (c) => c >= 51 && c <= 67, icone: '🌧️', texte: 'Pluie' },
  { test: (c) => c >= 71 && c <= 77, icone: '🌨️', texte: 'Neige' },
  { test: (c) => c >= 80 && c <= 82, icone: '🌦️', texte: 'Averses' },
  { test: (c) => c >= 95, icone: '⛈️', texte: 'Orage' },
];

function VilleActuelle({ lieu, actuel, unite, onUnite, convertir }) {
  // find renvoie la première règle qui correspond au code
  const regle = REGLES.find((r) => r.test(actuel.weather_code)) ?? {
    icone: '🌤️',
    texte: 'Temps variable',
  };

  return (
    <section className="carte-meteo">
      <header>
        <h1>
          {lieu.nom}
          {lieu.pays ? ', ' + lieu.pays : ''}
        </h1>
        <button onClick={() => onUnite(unite === 'C' ? 'F' : 'C')}>
          °{unite}
        </button>
      </header>

      <p className="temp">{convertir(actuel.temperature_2m)}°</p>
      <p className="desc">
        {regle.icone} {regle.texte}
      </p>

      <ul className="details">
        <li>Ressenti {convertir(actuel.apparent_temperature)}°</li>
        <li>Vent {Math.round(actuel.wind_speed_10m)} km/h</li>
        <li>Humidité {actuel.relative_humidity_2m} %</li>
      </ul>
    </section>
  );
}

export default VilleActuelle;`,
        note:
          'Le bouton d’unité ne fait que changer un state : React réaffiche les mêmes données converties, sans toucher au réseau. C’est tout l’intérêt de séparer données et affichage.',
      },
      {
        title: 'Les prévisions sur 5 jours (Previsions.jsx)',
        lang: 'jsx',
        code: `const JOURS = ['dim.', 'lun.', 'mar.', 'mer.', 'jeu.', 'ven.', 'sam.'];

function Previsions({ journal, convertir }) {
  // journal.time est un tableau de dates : ['2026-11-12', ...]
  return (
    <section className="previsions">
      <h2>Prévision sur 5 jours</h2>
      <div className="rangee">
        {journal.time.map((jour, i) => (
          <article className="carte-jour" key={jour}>
            <p className="jour">{JOURS[new Date(jour).getDay()]}</p>
            <p className="max">{convertir(journal.temperature_2m_max[i])}°</p>
            <p className="min">{convertir(journal.temperature_2m_min[i])}°</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Previsions;`,
        note:
          'Les tableaux `time`, `temperature_2m_max` et `temperature_2m_min` partagent le même index : l’indice `i` permet de relier les valeurs d’un même jour.',
      },
    ],
  },
  {
    id: 'p06',
    title: 'Gestion de produits',
    level: 'Intermédiaire',
    skills: [
      'Le tri avec sort et un comparateur sur prix ou nom',
      'Le filtrage combiné (catégorie ET prix maximum)',
      'Le panier : mise à jour d’un tableau d’objets avec quantités',
      'Les valeurs dérivées calculées à chaque rendu (filter, map, reduce)',
      'Les inputs contrôlés : radio de catégorie et curseur de prix',
      'La persistance du panier dans localStorage',
    ],
    objectives: [
      'Afficher un catalogue de 12 produits avec nom, catégorie et prix',
      'Trier le catalogue par prix croissant, prix décroissant ou nom',
      'Combiner un filtre de catégorie et un filtre de prix maximum',
      'Ajouter un produit au panier, puis en modifier la quantité (− / +)',
      'Afficher le nombre total d’articles et le montant exact du total',
      'Vider le panier et afficher un état vide compréhensible',
    ],
    brief:
      "Votre mission : la page d’une boutique en ligne. À gauche, des filtres et un tri ; au centre, une grille de produits ; à droite, un panier qui se met à jour en direct. Le cœur du sujet est la dérivation : le catalogue affiché n’est pas un state, c’est le résultat d’une chaîne filter puis sort recalculée à chaque rendu. Le panier, lui, est un state de lignes `{ id, quantite }` qu’il faut mettre à jour sans jamais modifier l’ancien tableau.",
    preview:
      "• Barre supérieure blanche : logo « Boutique », sélecteur de tri à droite (Prix croissant, Prix décroissant, Nom) et badge « 🛒 3 » indiquant le nombre d’articles.\n• Colonne de filtres à gauche de 220 px : titre « Filtres », 5 boutons radio de catégories (Toutes, Électronique, Maison, Sport, Mode) et curseur « Prix maximum : 120 € ».\n• Grille centrale de cartes produit : aplat coloré avec la première lettre, étiquette de catégorie, nom en gras, prix en vert (#16a34a), bouton bleu « Ajouter au panier ».\n• Panneau panier à droite de 300 px : lignes avec boutons − quantité +, prix partiel, puis « Total : 247,50 € » en gras et bouton rouge « Vider le panier ».\n• Si aucun produit ne correspond : message « Aucun produit ne correspond à ces filtres » avec bouton « Réinitialiser ».\n• Fond #f8fafc, cartes blanches, ombre douce et léger soulèvement au survol.",
    steps: [
      {
        title: 'Créer les données',
        detail:
          'Créez `src/produits.js` qui exporte `PRODUITS`, un tableau de 12 objets `{ id, nom, prix, categorie, couleur, description }` répartis en 4 catégories.',
      },
      {
        title: 'Déclarer les states',
        detail:
          'Dans `App.jsx` : `categorie` ("Toutes"), `prixMax` (200), `tri` ("prix-asc") et `panier` (tableau vide).',
      },
      {
        title: 'Calculer la liste affichée',
        detail:
          'Avant le return : `PRODUITS.filter((p) => (categorie === "Toutes" || p.categorie === categorie) && p.prix <= prixMax)` puis `.sort(...)` selon `tri`. Ne mettez jamais ce résultat dans un state.',
      },
      {
        title: 'Construire les filtres',
        detail:
          'Créez `src/Filtres.jsx` : un radio par catégorie (contrôlé par `checked`) et un `input type="range" min="10" max="200" step="10"` dont la valeur part en prop `prixMax`.',
      },
      {
        title: 'Construire le tri',
        detail:
          'Un `<select>` contrôlé avec trois options. Dans le comparateur : `a.prix - b.prix` pour les prix, `a.nom.localeCompare(b.nom, "fr")` pour les noms.',
      },
      {
        title: 'Implémenter le panier',
        detail:
          'Dans App, quatre fonctions : `ajouter(id)` (incrémente si la ligne existe, sinon la crée), `changerQuantite(id, delta)`, `retirer(id)` et `vider()`. Toutes utilisent le formateur de state fonctionnel `setPanier((prec) => ...)`.',
      },
      {
        title: 'Afficher le récapitulatif',
        detail:
          'Créez `src/Panier.jsx` : pour chaque ligne, retrouvez le produit avec `PRODUITS.find()`, affichez `prix * quantite`, puis le total avec `panier.reduce((somme, l) => somme + ..., 0)`.',
      },
      {
        title: 'Persister et vérifier',
        detail:
          'Sauvegardez le panier dans localStorage via un useEffect. Testez : ajouter 3 fois le même produit, passer à 0 quantité, cumuler filtres et tri, vider le panier, recharger la page.',
      },
    ],
    criteria: [
      'Le tri modifie immédiatement l’ordre des cartes, sans rechargement.',
      'Les filtres se cumulent : catégorie ET prix maximum doivent être satisfaits.',
      'Un produit plus cher que le prix maximum disparaît de la grille.',
      'Ajouter deux fois le même produit incrémente la quantité au lieu de dupliquer la ligne.',
      'Diminuer une quantité jusqu’à 0 retire la ligne du panier.',
      'Le total affiché est toujours la somme exacte de prix × quantité.',
      'Vider le panier remet le badge à 0 et affiche « Votre panier est vide ».',
      'Le panier est restauré à l’identique après un rechargement de la page.',
    ],
    solution: [
      {
        title: 'Le state, les valeurs dérivées et le panier (App.jsx)',
        lang: 'jsx',
        code: `import { useState, useEffect } from 'react';
import { PRODUITS } from './produits';
import Filtres from './Filtres';
import ProduitCard from './ProduitCard';
import Panier from './Panier';
import './Boutique.css';

function App() {
  const [categorie, setCategorie] = useState('Toutes');
  const [prixMax, setPrixMax] = useState(200);
  const [tri, setTri] = useState('prix-asc');
  const [panier, setPanier] = useState(() => {
    const brut = localStorage.getItem('panier');
    return brut ? JSON.parse(brut) : [];
  });

  useEffect(() => {
    localStorage.setItem('panier', JSON.stringify(panier));
  }, [panier]);

  // Le catalogue affiché est CALCULÉ, jamais stocké : ni filtre ni tri ne
  // peuvent donc désynchroniser l'écran.
  const visibles = PRODUITS.filter(
    (p) => (categorie === 'Toutes' || p.categorie === categorie) && p.prix <= prixMax
  ).sort((a, b) => {
    if (tri === 'prix-asc') return a.prix - b.prix;
    if (tri === 'prix-desc') return b.prix - a.prix;
    return a.nom.localeCompare(b.nom, 'fr');
  });

  function ajouter(id) {
    setPanier((prec) => {
      const existe = prec.find((l) => l.id === id);
      if (existe) {
        return prec.map((l) =>
          l.id === id ? { ...l, quantite: l.quantite + 1 } : l
        );
      }
      return [...prec, { id: id, quantite: 1 }];
    });
  }

  function changerQuantite(id, delta) {
    setPanier((prec) =>
      prec
        .map((l) => (l.id === id ? { ...l, quantite: l.quantite + delta } : l))
        .filter((l) => l.quantite > 0) // quantité 0 = ligne retirée
    );
  }

  function vider() {
    setPanier([]);
  }

  // Total : on parcourt les lignes et on additionne prix × quantité
  const total = panier.reduce((somme, ligne) => {
    const produit = PRODUITS.find((p) => p.id === ligne.id);
    return somme + (produit ? produit.prix * ligne.quantite : 0);
  }, 0);

  const nombreArticles = panier.reduce((n, l) => n + l.quantite, 0);

  return (
    <main className="boutique">
      <header className="barre">
        <h1>Boutique</h1>
        <select value={tri} onChange={(e) => setTri(e.target.value)}>
          <option value="prix-asc">Prix croissant</option>
          <option value="prix-desc">Prix décroissant</option>
          <option value="nom">Nom (A → Z)</option>
        </select>
        <span className="badge">🛒 {nombreArticles}</span>
      </header>

      <div className="colonnes">
        <Filtres
          categorie={categorie}
          onCategorie={setCategorie}
          prixMax={prixMax}
          onPrixMax={setPrixMax}
          onReset={() => {
            setCategorie('Toutes');
            setPrixMax(200);
          }}
        />

        <section className="grille">
          {visibles.length === 0 ? (
            <div className="vide">
              <p>Aucun produit ne correspond à ces filtres.</p>
              <button onClick={() => { setCategorie('Toutes'); setPrixMax(200); }}>
                Réinitialiser
              </button>
            </div>
          ) : (
            visibles.map((p) => (
              <ProduitCard key={p.id} produit={p} onAjouter={() => ajouter(p.id)} />
            ))
          )}
        </section>

        <Panier
          lignes={panier}
          total={total}
          onChangeQuantite={changerQuantite}
          onVider={vider}
        />
      </div>
    </main>
  );
}

export default App;`,
        note:
          '`filter` renvoie un nouveau tableau : le `sort` qui suit ne modifie donc jamais `PRODUITS`. Les formateurs de state `(prec) => ...` évitent de travailler sur une version périmée de `panier`.',
      },
      {
        title: 'La colonne des filtres (Filtres.jsx)',
        lang: 'jsx',
        code: `const CATEGORIES = ['Toutes', 'Électronique', 'Maison', 'Sport', 'Mode'];

function Filtres({ categorie, onCategorie, prixMax, onPrixMax, onReset }) {
  return (
    <aside className="filtres">
      <h2>Filtres</h2>

      <h3>Catégorie</h3>
      {CATEGORIES.map((c) => (
        <label key={c}>
          <input
            type="radio"
            name="categorie"
            checked={categorie === c}
            onChange={() => onCategorie(c)}
          />
          {c}
        </label>
      ))}

      <h3>Prix maximum : {prixMax} €</h3>
      <input
        type="range"
        min="10"
        max="200"
        step="10"
        value={prixMax}
        onChange={(e) => onPrixMax(Number(e.target.value))}
      />

      <button onClick={onReset}>Réinitialiser</button>
    </aside>
  );
}

export default Filtres;`,
        note:
          'La valeur d’un `input type="range"` est une chaîne : `Number(e.target.value)` est indispensable, sinon la comparaison `p.prix <= prixMax` deviendrait du texte.',
      },
      {
        title: 'Une carte produit (ProduitCard.jsx)',
        lang: 'jsx',
        code: `function ProduitCard({ produit, onAjouter }) {
  return (
    <article className="produit">
      {/* Aplat coloré qui tient lieu d'image */}
      <div className="visuel" style={{ backgroundColor: produit.couleur }}>
        {produit.nom.charAt(0)}
      </div>

      <span className="categorie">{produit.categorie}</span>
      <h3>{produit.nom}</h3>
      <p className="prix">{produit.prix.toFixed(2)} €</p>
      <button onClick={onAjouter}>Ajouter au panier</button>
    </article>
  );
}

export default ProduitCard;`,
        note:
          'Le bouton ne fait qu’une chose : prévenir le parent. C’est App qui décide comment le panier évolue — le composant reste réutilisable ailleurs.',
      },
      {
        title: 'Le panneau panier (Panier.jsx)',
        lang: 'jsx',
        code: `import { PRODUITS } from './produits';

function Panier({ lignes, total, onChangeQuantite, onVider }) {
  if (lignes.length === 0) {
    return (
      <aside className="panier">
        <h2>Panier</h2>
        <p className="vide">Votre panier est vide.</p>
      </aside>
    );
  }

  return (
    <aside className="panier">
      <h2>Panier ({lignes.length})</h2>
      <ul>
        {lignes.map((ligne) => {
          const produit = PRODUITS.find((p) => p.id === ligne.id);
          if (!produit) return null;
          return (
            <li key={ligne.id}>
              <span className="nom">{produit.nom}</span>
              <div className="quantite">
                <button onClick={() => onChangeQuantite(ligne.id, -1)}>−</button>
                <span>{ligne.quantite}</span>
                <button onClick={() => onChangeQuantite(ligne.id, 1)}>+</button>
              </div>
              <strong>{(produit.prix * ligne.quantite).toFixed(2)} €</strong>
            </li>
          );
        })}
      </ul>

      <p className="total">Total : {total.toFixed(2)} €</p>
      <button className="vider" onClick={onVider}>Vider le panier</button>
    </aside>
  );
}

export default Panier;`,
        note:
          'Le panier ne stocke que `id` et `quantite` : le prix vient toujours du catalogue. Une baisse de prix met donc à jour le total automatiquement.',
      },
    ],
  },
  {
    id: 'p07',
    title: 'Gestion d’utilisateurs',
    level: 'Intermédiaire',
    skills: [
      'fetch vers une API externe (JSONPlaceholder)',
      'La pagination avec start / limit et le nombre total de pages',
      'Les trois états asynchrones : chargement, succès, erreur',
      'Les routes paramétrées avec React Router (useParams)',
      'La modification optimiste d’une ressource (PATCH)',
      'L’annulation des requêtes obsolètes avec AbortController',
    ],
    objectives: [
      'Charger une liste paginée de 6 utilisateurs depuis JSONPlaceholder',
      'Naviguer vers la fiche détaillée sans recharger la page',
      'Modifier un utilisateur et voir la modification apparaître dans la liste',
      'Supprimer un utilisateur avec confirmation puis revenir à la liste',
      'Afficher un squelette de chargement et un message d’erreur avec Réessayer',
      'Renvoyer une page 404 personnalisée pour une URL inconnue',
    ],
    brief:
      "Vous allez construire l’espace administrateur d’un annuaire : une liste paginée, une fiche détaillée, et la possibilité de modifier ou supprimer un utilisateur. Les données viennent de l’API fictive JSONPlaceholder, qui répond mais n’enregistre rien : vous devrez donc reporter les changements dans le state React pour qu’ils restent visibles. C’est le projet idéal pour comprendre la navigation avec React Router et le cycle complet d’une requête : chargement, succès, erreur.",
    preview:
      "• Layout à deux volets : rail de navigation sombre à gauche (Utilisateurs, Profil, Paramètres) et zone principale claire à droite.\n• En-tête de la zone : titre « Utilisateurs », compteur « 10 résultats », bouton bleu « Nouvel utilisateur ».\n• Tableau zébré : colonnes Nom, Email, Entreprise, Ville, Actions ; en-têtes en gris foncé.\n• Sous le tableau : pagination « ← Précédent | Page 1 / 2 | Suivant → », boutons désactivés aux extrémités.\n• Pendant le chargement : 6 lignes gris animées (skeleton) à la place du tableau ; en erreur : panneau rouge « Erreur 500 : liste indisponible » + bouton « Réessayer ».\n• Fiche utilisateur : carte blanche avec pastille d’initiales, nom, email cliquable, société, téléphone, ville, puis boutons « Modifier » (bleu) et « Supprimer » (rouge).\n• Formulaire d’édition : champs Nom, Email, Téléphone, Site web pré-remplis, message « Modifications enregistrées ✓ » qui apparaît puis redirige après 1,2 s.\n• URL inconnue : écran 404 avec le texte « Cette page n’existe pas » et un lien « Retour à la liste ».",
    steps: [
      {
        title: 'Installer le routeur',
        detail:
          '`npm install react-router-dom`, puis enveloppez l’application dans `<BrowserRouter>` dans `src/main.jsx` et déclarez les routes dans `src/App.jsx`.',
      },
      {
        title: 'Créer le service API',
        detail:
          'Créez `src/api.js` avec `listerUtilisateurs(page, parPage, signal)`, `lireUtilisateur(id, signal)`, `modifierUtilisateur(id, donnees)` et `supprimerUtilisateur(id)` : une fonction = un appel réseau.',
      },
      {
        title: 'Modéliser la pagination',
        detail:
          'Constante `PAR_PAGE = 6`, states `page` et `pagesTotales`. Lisez l’en-tête `X-Total-Count` de la réponse pour calculer `Math.ceil(total / PAR_PAGE)`.',
      },
      {
        title: 'Afficher la liste',
        detail:
          'Créez `src/pages/ListeUtilisateurs.jsx` : un useEffect dépendant de `page` et de `recharge`, qui appelle l’API puis remplit le state de la liste.',
      },
      {
        title: 'Gérer les trois états',
        detail:
          'State `statut` : `"chargement"` affiche `<Skeleton />`, `"erreur"` affiche le message + un bouton qui incrémente `recharge`, `"succes"` affiche le tableau.',
      },
      {
        title: 'Déclarer les routes',
        detail:
          'Dans `App.jsx` : `<Routes>` avec `/`, `/users/:id`, `/users/:id/edit` et `*` qui rend `<Page404 />`. Les liens se font avec `<Link to={...}>`.',
      },
      {
        title: 'Éditer un utilisateur',
        detail:
          'Créez `src/pages/FormulaireEdition.jsx` : `useParams()` lit l’id, un useEffect pré-remplit le formulaire, la soumission appelle PATCH puis affiche une confirmation.',
      },
      {
        title: 'Supprimer et vérifier',
        detail:
          'Dans `DetailUtilisateur.jsx`, bouton avec `window.confirm`, appel à `supprimerUtilisateur(id)`, retrait dans le state global puis `navigate("/")`. Testez aussi l’URL inconnue et le clic rapide entre deux pages.',
      },
    ],
    criteria: [
      'La première page affiche 6 utilisateurs, la seconde 4 (10 au total).',
      'Cliquer sur un nom ouvre la fiche détaillée sans rechargement complet de la page.',
      'Les modifications apparaissent dans la liste après enregistrement.',
      'La suppression demande confirmation et redirige vers la liste.',
      'Un changement de page rapide n’affiche jamais les données de l’ancienne page.',
      'Une URL inconnue affiche une page 404 personnalisée, jamais un écran blanc.',
      'L’état d’erreur affiche un bouton « Réessayer » qui relance réellement la requête.',
      'Le squelette de chargement remplace le tableau pendant toute la requête.',
    ],
    solution: [
      {
        title: 'Le service API (src/api.js)',
        lang: 'jsx',
        code: `const BASE = 'https://jsonplaceholder.typicode.com';

// Liste paginée : on renvoie aussi le nombre de pages calculé
export async function listerUtilisateurs(page, parPage, signal) {
  const debut = (page - 1) * parPage;
  const url = BASE + '/users?_start=' + debut + '&_limit=' + parPage;
  const reponse = await fetch(url, { signal: signal });
  if (!reponse.ok) {
    throw new Error('Erreur ' + reponse.status + ' : liste indisponible.');
  }
  const liste = await reponse.json();
  // L'API renvoie le nombre total d'en-têtes dans X-Total-Count
  const total = Number(reponse.headers.get('X-Total-Count')) || liste.length;
  return { liste: liste, pages: Math.max(1, Math.ceil(total / parPage)) };
}

export async function lireUtilisateur(id, signal) {
  const reponse = await fetch(BASE + '/users/' + id, { signal: signal });
  if (reponse.status === 404) throw new Error('Utilisateur introuvable.');
  if (!reponse.ok) throw new Error('Erreur ' + reponse.status + ' .');
  return reponse.json();
}

export async function modifierUtilisateur(id, donnees) {
  const reponse = await fetch(BASE + '/users/' + id, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(donnees),
  });
  if (!reponse.ok) throw new Error('Enregistrement impossible.');
  // JSONPlaceholder simule : la réponse ne contient que l'id
  return donnees;
}

export async function supprimerUtilisateur(id) {
  const reponse = await fetch(BASE + '/users/' + id, { method: 'DELETE' });
  if (!reponse.ok) throw new Error('Suppression impossible.');
  return true;
}`,
        note:
          'Toutes les fonctions acceptent un `signal` optionnel : c’est ce qui permet d’annuler une requête dès qu’on change de page ou qu’on quitte le composant.',
      },
      {
        title: 'Le routeur dans App.jsx',
        lang: 'jsx',
        code: `import { useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import ListeUtilisateurs from './pages/ListeUtilisateurs';
import DetailUtilisateur from './pages/DetailUtilisateur';
import FormulaireEdition from './pages/FormulaireEdition';
import Page404 from './pages/Page404';

function App() {
  // La liste vit dans App : les pages d'édition et de détail peuvent la modifier
  const [utilisateurs, setUtilisateurs] = useState([]);

  function supprimer(id) {
    setUtilisateurs((prec) => prec.filter((u) => u.id !== id));
  }

  function enregistrer(modifie) {
    setUtilisateurs((prec) =>
      prec.map((u) => (u.id === modifie.id ? { ...u, ...modifie } : u))
    );
  }

  return (
    <BrowserRouter>
      <div className="layout">
        <nav className="rail">
          <Link to="/" className="logo">Annuaire</Link>
          <Link to="/">Utilisateurs</Link>
          <Link to="/users/1">Exemple de fiche</Link>
        </nav>

        <main className="contenu">
          <Routes>
            <Route
              path="/"
              element={
                <ListeUtilisateurs
                  utilisateurs={utilisateurs}
                  setUtilisateurs={setUtilisateurs}
                  onSupprimer={supprimer}
                />
              }
            />
            <Route
              path="/users/:id"
              element={<DetailUtilisateur onSupprimer={supprimer} />}
            />
            <Route
              path="/users/:id/edit"
              element={<FormulaireEdition onEnregistre={enregistrer} />}
            />
            <Route path="*" element={<Page404 />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;`,
        note:
          'La prop `*` attrape toutes les URL non reconnues : c’est le raccourci vers une page 404 sans écrire une route pour chaque faute de frappe.',
      },
      {
        title: 'La liste paginée avec ses trois états',
        lang: 'jsx',
        code: `import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { listerUtilisateurs } from '../api';

const PAR_PAGE = 6;

function ListeUtilisateurs({ utilisateurs, setUtilisateurs }) {
  const [page, setPage] = useState(1);
  const [recharge, setRecharge] = useState(0);
  const [statut, setStatut] = useState('chargement');
  const [erreur, setErreur] = useState('');
  const [pagesTotales, setPagesTotales] = useState(1);

  useEffect(() => {
    const controleur = new AbortController();

    async function charger() {
      setStatut('chargement');
      setErreur('');
      try {
        const data = await listerUtilisateurs(page, PAR_PAGE, controleur.signal);
        setUtilisateurs(data.liste);
        setPagesTotales(data.pages);
        setStatut('succes');
      } catch (e) {
        if (e.name === 'AbortError') return; // requête annulée : on ignore
        setErreur(e.message);
        setStatut('erreur');
      }
    }

    charger();
    return () => controleur.abort();
  }, [page, recharge, setUtilisateurs]);

  if (statut === 'chargement') {
    return (
      <div className="skeleton">
        {[0, 1, 2, 3, 4, 5].map((i) => <div className="ligne-squelette" key={i} />)}
      </div>
    );
  }

  if (statut === 'erreur') {
    return (
      <div className="etat-erreur">
        <p>{erreur}</p>
        <button onClick={() => setRecharge(recharge + 1)}>Réessayer</button>
      </div>
    );
  }

  return (
    <section>
      <h1>Utilisateurs</h1>
      <table>
        <thead>
          <tr><th>Nom</th><th>Email</th><th>Entreprise</th></tr>
        </thead>
        <tbody>
          {utilisateurs.map((u) => (
            <tr key={u.id}>
              <td><Link to={'/users/' + u.id}>{u.name}</Link></td>
              <td>{u.email}</td>
              <td>{u.company.name}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <nav className="pagination">
        <button disabled={page === 1} onClick={() => setPage(page - 1)}>
          ← Précédent
        </button>
        <span>Page {page} / {pagesTotales}</span>
        <button disabled={page === pagesTotales} onClick={() => setPage(page + 1)}>
          Suivant →
        </button>
      </nav>
    </section>
  );
}

export default ListeUtilisateurs;`,
        note:
          'Le compteur `recharge` permet de relancer la requête depuis l’état d’erreur : augmenter un state qui est déjà dans les dépendances relance l’effet.',
      },
      {
        title: 'La fiche détaillée (DetailUtilisateur.jsx)',
        lang: 'jsx',
        code: `import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { lireUtilisateur, supprimerUtilisateur } from '../api';

function DetailUtilisateur({ onSupprimer }) {
  const { id } = useParams(); // valeur de :id dans l'URL
  const navigate = useNavigate();
  const [utilisateur, setUtilisateur] = useState(null);
  const [erreur, setErreur] = useState('');

  useEffect(() => {
    const controleur = new AbortController();
    setUtilisateur(null);
    setErreur('');
    lireUtilisateur(id, controleur.signal)
      .then((u) => setUtilisateur(u))
      .catch((e) => {
        if (e.name !== 'AbortError') setErreur(e.message);
      });
    return () => controleur.abort();
  }, [id]);

  async function supprimer() {
    if (!window.confirm('Supprimer ' + utilisateur.name + ' ?')) return;
    try {
      await supprimerUtilisateur(utilisateur.id);
      onSupprimer(utilisateur.id);
      navigate('/'); // retour à la liste après suppression
    } catch (e) {
      setErreur(e.message);
    }
  }

  if (erreur) return <p className="etat-erreur">{erreur}</p>;
  if (!utilisateur) return <p>Chargement de la fiche…</p>;

  return (
    <article className="fiche">
      <h1>{utilisateur.name}</h1>
      <p>{utilisateur.email}</p>
      <p>{utilisateur.company.name}</p>
      <p>{utilisateur.address.city}</p>
      <p>{utilisateur.phone}</p>

      <div className="actions">
        <Link className="bouton" to={'/users/' + utilisateur.id + '/edit'}>
          Modifier
        </Link>
        <button className="danger" onClick={supprimer}>
          Supprimer
        </button>
      </div>
    </article>
  );
}

export default DetailUtilisateur;`,
        note:
          'Le state `null` pendant le chargement évite d’afficher `utilisateur.name` sur un objet inexistant : c’est le garde-fou classique des pages asynchrones.',
      },
      {
        title: 'Le formulaire d’édition (FormulaireEdition.jsx)',
        lang: 'jsx',
        code: `import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { lireUtilisateur, modifierUtilisateur } from '../api';

function FormulaireEdition({ onEnregistre }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    lireUtilisateur(id).then((u) =>
      setForm({ name: u.name, email: u.email, phone: u.phone, website: u.website })
    );
  }, [id]);

  if (!form) return <p>Chargement du formulaire…</p>;

  function changer(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function soumettre(e) {
    e.preventDefault();
    setMessage('Enregistrement…');
    try {
      await modifierUtilisateur(id, form);
      onEnregistre({ id: Number(id), ...form });
      setMessage('Modifications enregistrées ✓');
      setTimeout(() => navigate('/users/' + id), 1200);
    } catch (err) {
      setMessage('Échec : ' + err.message);
    }
  }

  return (
    <form className="edition" onSubmit={soumettre}>
      <h1>Modifier l’utilisateur</h1>
      <label>Nom <input name="name" value={form.name} onChange={changer} /></label>
      <label>Email <input name="email" value={form.email} onChange={changer} /></label>
      <label>Téléphone <input name="phone" value={form.phone} onChange={changer} /></label>
      <label>Site web <input name="website" value={form.website} onChange={changer} /></label>
      <p className="message">{message}</p>
      <button type="submit">Enregistrer</button>
    </form>
  );
}

export default FormulaireEdition;`,
        note:
          '`Number(id)` reconvertit le paramètre d’URL (toujours une chaîne) en nombre : sans cela, la comparaison `u.id === modifie.id` échouerait silencieusement.',
      },
    ],
  },
  {
    id: 'p08',
    title: 'Tableau de bord administratif',
    level: 'Intermédiaire avancé',
    skills: [
      'La décomposition en composants (layout, cartes, graphiques, tableaux)',
      'Les graphiques faits maison en SVG (barres et donut)',
      'Le tri de tableaux avec un comparateur polymorphe',
      'La navigation latérale responsive (menu hamburger + media queries)',
      "L'agrégation de données avec reduce pour calculer les KPI",
      'Le chargement paresseux des vues avec React.lazy et Suspense',
    ],
    objectives: [
      'Afficher 4 cartes KPI calculées depuis les données, sans chiffre codé en dur',
      'Réaliser un histogramme en SVG pur dont les barres s’adaptent aux valeurs',
      'Construire un donut dont les parts totalisent exactement 100 %',
      'Trier un tableau dans les deux sens, sur les nombres comme sur les chaînes',
      'Replier la barre latérale derrière un bouton ☰ sous 900 px',
      'Charger chaque vue en différé avec React.lazy et un squelette de repli',
    ],
    brief:
      "Vous passez du côté administrateur : votre tableau de bord doit répondre en un coup d’œil à trois questions, combien, depuis quand, et quelle tendance. Tous les graphiques seront faits maison, en SVG, sans aucune librairie : c’est la meilleure façon de comprendre ce qu’est vraiment un graphique, des rectangles et des chemins de tracé. L’exigence de ce niveau est la structure : un layout stable (sidebar + zone de contenu) et des composants isolés, chacun avec ses props.",
    preview:
      "• Layout : barre latérale sombre (#111827) de 240 px avec logo, 5 liens à icônes emoji et lien actif souligné en bleu ; zone de contenu gris clair (#f9fafb).\n• Sur mobile (< 900 px), la sidebar se replie derrière un bouton ☰ et glisse depuis la gauche, avec un voile sombre par-dessus.\n• 4 cartes KPI en haut : icône, libellé gris, valeur géante, variation en % vert avec ▲ ou rouge avec ▼.\n• Deux cartes côte à côte : histogramme 12 barres bleues avec axes et lignes de grille, et donut de 4 parts colorées avec légende à droite (nom + pourcentage).\n• Tableau « Dernières commandes » : colonnes Référence, Client, Montant, Statut (pastilles vert, orange, gris), en-têtes cliquables avec ▲ ou ▼.\n• Haut de page : fil d’Ariane, titre « Tableau de bord », sélecteur de période (7 jours / 30 jours / Année) et avatar administrateur.\n• Espacement généreux (24 px), ombres légères sur les cartes, coins arrondis 12 px.",
    steps: [
      {
        title: 'Poser le layout',
        detail:
          'Créez `src/layout/AdminLayout.jsx` avec `<Sidebar />`, `<Topbar />` et un `<Outlet />` pour la vue courante ; les routes sont imbriquées sous cette route parente.',
      },
      {
        title: 'Créer les données de démonstration',
        detail:
          'Créez `src/data/donnees.js` : `VENTES` (12 mois avec `{ mois, montant }`), `COMMANDES` (12 lignes) et `REPARTITION` (4 catégories avec `{ label, valeur, couleur }`).',
      },
      {
        title: 'Calculer les KPI',
        detail:
          'Créez `src/hooks/useKpi.js` : un hook qui additionne les montants avec `reduce`, compare le dernier mois au précédent et renvoie `{ total, variation }`.',
      },
      {
        title: 'Construire les cartes',
        detail:
          'Créez `src/components/KpiCard.jsx` : props `icone`, `label`, `valeur`, `variation` ; la flèche et la couleur dépendent de `variation >= 0`.',
      },
      {
        title: 'Dessiner l’histogramme',
        detail:
          'Créez `src/components/Histogramme.jsx` : un `<svg viewBox="0 0 640 240">`, une grille de `<line>` et un `<rect>` par mois, avec `hauteur = (valeur / max) * (H - marge)`.',
      },
      {
        title: 'Dessiner le donut',
        detail:
          'Créez `src/components/Donut.jsx` : un `<circle>` de fond, puis un cercle par part avec `strokeDasharray = part * circonference` et un `strokeDashoffset` cumulé, le tout pivoté de −90°.',
      },
      {
        title: 'Rendre le tableau triable',
        detail:
          'Créez `src/components/TableauTriable.jsx` : state `{ colonne, sens }`, clic sur `<th>` qui bascule le sens, et un comparateur qui choisit `-` ou `localeCompare` selon le type des valeurs.',
      },
      {
        title: 'Router et lazy loading',
        detail:
          'Dans les routes : `const Vue = lazy(() => import("./pages/Vue"))` enveloppé dans `<Suspense fallback={<Skeleton />}>`. Testez le clic rapide entre deux vues.',
      },
      {
        title: 'Rendre la sidebar responsive',
        detail:
          'State `ouvert` dans `AdminLayout`, bouton ☰ visible sous 900 px en CSS, voile cliquable qui referme le menu, et `NavLink` dont la classe active s’applique avec une fonction.',
      },
    ],
    criteria: [
      'Les 4 KPI sont recalculés quand la période change (aucun chiffre écrit en dur).',
      'L’histogramme s’adapte : la barre la plus haute occupe 90 % de la hauteur utile du SVG.',
      'Le donut totalise 100 % et la légende affiche les pourcentages arrondis.',
      'Cliquer un en-tête du tableau trie les lignes ; un second clic inverse le sens.',
      'Le tri fonctionne sur les nombres (montant) ET sur les chaînes (client).',
      'Sous 900 px, la sidebar est masquée et s’ouvre en overlay au clic sur ☰.',
      'Changer de route affiche le squelette puis la vue, sans écran blanc.',
      'Aucun avertissement de clé manquante dans la console.',
    ],
    solution: [
      {
        title: 'Le layout responsive (AdminLayout.jsx)',
        lang: 'jsx',
        code: `import { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';

const LIENS = [
  { vers: '/', icone: '📊', texte: 'Tableau de bord' },
  { vers: '/commandes', icone: '📦', texte: 'Commandes' },
  { vers: '/clients', icone: '👥', texte: 'Clients' },
  { vers: '/produits', icone: '🏷️', texte: 'Produits' },
  { vers: '/parametres', icone: '⚙️', texte: 'Paramètres' },
];

function AdminLayout() {
  const [ouvert, setOuvert] = useState(false);

  return (
    <div className={ouvert ? 'layout menu-ouvert' : 'layout'}>
      <button
        className="burger"
        onClick={() => setOuvert(!ouvert)}
        aria-label="Ouvrir le menu"
        aria-expanded={ouvert}
      >
        ☰
      </button>

      <aside className="sidebar">
        <div className="logo">AdminPro</div>
        {LIENS.map((l) => (
          <NavLink
            key={l.vers}
            to={l.vers}
            className={({ isActive }) => (isActive ? 'lien actif' : 'lien')}
            onClick={() => setOuvert(false)}
          >
            <span>{l.icone}</span> {l.texte}
          </NavLink>
        ))}
      </aside>

      {/* Voile visible uniquement en mobile quand le menu est ouvert */}
      {ouvert && <div className="voile" onClick={() => setOuvert(false)} />}

      <main className="contenu">
        <Outlet />
      </main>
    </div>
  );
}

export default AdminLayout;`,
        note:
          '`NavLink` fournit `isActive` en prop-fonction : c’est la façon propre de styler le lien courant sans recalculer l’URL à la main.',
      },
      {
        title: 'Les cartes KPI (useKpi.js + KpiCard.jsx)',
        lang: 'jsx',
        code: `import { useMemo } from 'react';

// Agrège les ventes en un seul objet de chiffres
export function useKpi(ventes) {
  return useMemo(() => {
    const total = ventes.reduce((somme, v) => somme + v.montant, 0);
    const dernier = ventes.length > 0 ? ventes[ventes.length - 1].montant : 0;
    const avant = ventes.length > 1 ? ventes[ventes.length - 2].montant : 0;
    const variation = avant === 0
      ? 0
      : Math.round(((dernier - avant) / avant) * 100);
    return { total: total, variation: variation };
  }, [ventes]);
}

function KpiCard({ icone, label, valeur, variation }) {
  const positif = variation >= 0;

  return (
    <article className="kpi">
      <span className="icone" aria-hidden="true">{icone}</span>
      <div>
        <p className="label">{label}</p>
        <p className="valeur">{valeur}</p>
        <p className={positif ? 'variation positif' : 'variation negatif'}>
          {positif ? '▲' : '▼'} {Math.abs(variation)} %
        </p>
      </div>
    </article>
  );
}

export default KpiCard;`,
        note:
          'Le hook renvoie un objet mémoïsé : tant que `ventes` ne change pas, aucun recalcul. C’est la différence entre un state et une valeur dérivée optimisée.',
      },
      {
        title: 'L’histogramme en SVG (Histogramme.jsx)',
        lang: 'jsx',
        code: `const L = 640; // largeur du repère
const H = 240; // hauteur du repère
const MARGE = 30;

function Histogramme({ donnees }) {
  const max = Math.max(...donnees.map((d) => d.valeur));

  return (
    <svg
      viewBox={'0 0 ' + L + ' ' + H}
      className="histogramme"
      role="img"
      aria-label="Ventes par mois"
    >
      {/* Lignes de grille horizontales */}
      {[0, 0.25, 0.5, 0.75, 1].map((t) => (
        <line
          key={t}
          x1={0}
          x2={L}
          y1={H - t * (H - MARGE)}
          y2={H - t * (H - MARGE)}
          stroke="#e5e7eb"
          strokeWidth="1"
        />
      ))}

      {/* Une barre + un libellé par mois */}
      {donnees.map((d, i) => {
        const largeur = L / donnees.length;
        const hauteur = max === 0 ? 0 : (d.valeur / max) * (H - MARGE);
        const x = i * largeur + largeur * 0.2;
        const y = H - hauteur;
        return (
          <g key={d.mois}>
            <rect
              x={x}
              y={y}
              width={largeur * 0.6}
              height={hauteur}
              rx="4"
              fill="#2563eb"
            />
            <text
              x={i * largeur + largeur / 2}
              y={H - 8}
              textAnchor="middle"
              fontSize="10"
              fill="#6b7280"
            >
              {d.mois}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

export default Histogramme;`,
        note:
          'Tout graphique SVG repose sur la même règle : proportionner. Ici `valeur / max` donne un ratio entre 0 et 1, multiplié par la hauteur disponible.',
      },
      {
        title: 'Le donut en SVG (Donut.jsx)',
        lang: 'jsx',
        code: `const RAYON = 60;
const CIRCONFERENCE = 2 * Math.PI * RAYON; // environ 377

function Donut({ parts }) {
  const total = parts.reduce((s, p) => s + p.valeur, 0);
  let decalage = 0; // on cumule les décalages au fil des parts

  return (
    <div className="donut">
      <svg viewBox="0 0 160 160" width="160" height="160">
        {/* Anneau de fond */}
        <circle cx="80" cy="80" r={RAYON} fill="none" stroke="#e5e7eb" strokeWidth="24" />

        {parts.map((p) => {
          const part = total === 0 ? 0 : p.valeur / total;
          const tiret = part * CIRCONFERENCE;
          const cercle = (
            <circle
              key={p.label}
              cx="80"
              cy="80"
              r={RAYON}
              fill="none"
              stroke={p.couleur}
              strokeWidth="24"
              strokeDasharray={tiret + ' ' + (CIRCONFERENCE - tiret)}
              strokeDashoffset={-decalage}
              transform="rotate(-90 80 80)"
            />
          );
          decalage += tiret;
          return cercle;
        })}
      </svg>

      <ul className="legende">
        {parts.map((p) => (
          <li key={p.label}>
            <span className="pastille" style={{ backgroundColor: p.couleur }} />
            {p.label} — {Math.round((p.valeur / total) * 100)} %
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Donut;`,
        note:
          'Le secret du donut : `strokeDasharray` découpe le tour de cercle en deux segments (visible, invisible) et `strokeDashoffset` décale le début du segment. La somme des parts vaut toujours la circonférence.',
      },
      {
        title: 'Le tableau triable (TableauTriable.jsx)',
        lang: 'jsx',
        code: `import { useState } from 'react';

function TableauTriable({ colonnes, lignes }) {
  const [tri, setTri] = useState({ colonne: 'reference', sens: 'asc' });

  function basculer(nom) {
    setTri((prec) =>
      prec.colonne === nom
        ? { colonne: nom, sens: prec.sens === 'asc' ? 'desc' : 'asc' }
        : { colonne: nom, sens: 'asc' }
    );
  }

  // Copie avant tri : on ne doit jamais muter le tableau du parent
  const copie = [...lignes].sort((a, b) => {
    const va = a[tri.colonne];
    const vb = b[tri.colonne];
    let r;
    if (typeof va === 'number' && typeof vb === 'number') r = va - vb;
    else r = String(va).localeCompare(String(vb), 'fr');
    return tri.sens === 'asc' ? r : -r;
  });

  return (
    <table className="tableau">
      <thead>
        <tr>
          {colonnes.map((c) => (
            <th key={c.cle} onClick={() => basculer(c.cle)} scope="col">
              {c.titre}
              {tri.colonne === c.cle ? (tri.sens === 'asc' ? ' ▲' : ' ▼') : ''}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {copie.map((l) => (
          <tr key={l.reference}>
            {colonnes.map((c) => (
              <td key={c.cle}>{c.rendu ? c.rendu(l[c.cle]) : l[c.cle]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default TableauTriable;`,
        note:
          'Le comparateur teste le type avant de choisir : sans cela, `10` serait trié avant `9` car la chaîne "10" précède "9". La fonction optionnelle `rendu` permet d’afficher une pastille de statut à la place du texte brut.',
      },
    ],
  },
  {
    id: 'p09',
    title: 'Commerce électronique',
    level: 'Avancé',
    skills: [
      'Context API et useReducer pour l’état global',
      'React Router : routes, params et navigation sans rechargement',
      'Les actions du panier traitées par un reducer pur',
      'La persistance localStorage via un useEffect dans le provider',
      'Le checkout en plusieurs étapes avec validation de formulaire',
      'Le debouncing du champ de recherche (300 ms)',
    ],
    objectives: [
      'Créer un contexte de panier partagé par toute l’application',
      'Gérer le panier avec useReducer : AJOUTER, CHANGER_QUANTITE, RETIRER, VIDER',
      'Naviguer entre catalogue, fiche produit et panier sans recharger la page',
      'Restaurer le panier à l’identique après un rechargement',
      'Réaliser un checkout en 3 étapes bloqué par la validation des champs',
      'Marquer un produit en favori et conserver les favoris après navigation',
    ],
    brief:
      "Ici, tout est relié : le panier, les favoris et la recherche doivent être visibles depuis n’importe quel écran, sans jamais redescendre une cascade de props. Vous allez donc créer un contexte global piloté par useReducer, une machine à états très lisible pour les actions du panier. S’ajoute le checkout simulé en trois étapes : coordonnées, paiement, confirmation. C’est le projet le plus proche d’une vraie boutique : traitez l’expérience utilisateur avec le même soin que le code.",
    preview:
      "• Barre de navigation fixe blanche : logo « ShopReact », liens Accueil / Catalogue / Favoris / Panier avec badge rouge du nombre d’articles, champ de recherche avec loupe.\n• Catalogue : grille de cartes produit avec note ★ en jaune, prix en gras, bouton « ♡ » en haut à droite (rempli rouge si favori) et bouton « Voir la fiche ».\n• Fiche produit : grande image à gauche, à droite nom, note, prix, description, sélecteur de quantité et bouton bleu « Ajouter au panier » qui devient « Ajouté ✓ » pendant 1,5 s ; fil d’Ariane au-dessus.\n• Panier : tableau des lignes avec quantités modifiables, récapitulatif (sous-total, TVA 20 %, total) et bouton « Passer la commande ».\n• Checkout : stepper « 1 Coordonnées → 2 Paiement → 3 Confirmation », un seul formulaire à la fois, messages de validation rouges sous les champs.\n• Confirmation : gros « Merci ! », numéro de commande #A-1042, bouton « Retour à la boutique ».\n• Favoris : même grille que le catalogue, sinon message « Aucun favori pour l’instant ❤️ ». Palette : bleu #2563eb, fond #f8fafc.",
    steps: [
      {
        title: 'Structurer le projet',
        detail:
          'Créez les dossiers `src/context/`, `src/pages/`, `src/components/`, `src/data/` avec `produits.js` (8 produits) et les CSS associées.',
      },
      {
        title: 'Écrire le reducer du panier',
        detail:
          'Créez `src/context/panierReducer.js` : `etatInitial = []` et un switch sur `action.type` gérant AJOUTER, CHANGER_QUANTITE, RETIRER et VIDER. Toujours renvoyer un nouveau tableau.',
      },
      {
        title: 'Exposer le contexte',
        detail:
          'Créez `src/context/PanierContext.jsx` : `createContext`, un `PanierProvider` qui utilise le reducer + un useEffect de sauvegarde, et un hook `usePanier()` qui lance une erreur si le provider manque.',
      },
      {
        title: 'Câbler le routeur',
        detail:
          'Dans `src/App.jsx` : `BrowserRouter`, `PanierProvider` qui enveloppe les routes `/`, `/catalogue`, `/produits/:id`, `/panier`, `/commande`, `/favoris` et `*` (404).',
      },
      {
        title: 'Construire le catalogue',
        detail:
          'Créez `src/pages/Catalogue.jsx` : grille de `ProduitCard`, champ de recherche débouncé (setTimeout de 300 ms nettoyé dans le return du useEffect) et tri par prix.',
      },
      {
        title: 'Construire la fiche produit',
        detail:
          'Créez `src/pages/FicheProduit.jsx` : `useParams()` pour l’id, sélecteur de quantité contrôlé et bouton qui appelle `ajouter(produit, quantite)` issu de `usePanier()`.',
      },
      {
        title: 'Ajouter les favoris',
        detail:
          'State `favoris` (tableau d’ids) dans un contexte dédié, avec une action basculer : `favoris.includes(id) ? favoris.filter(...) : [...favoris, id]`, persisté dans localStorage.',
      },
      {
        title: 'Réalisser le checkout',
        detail:
          'Créez `src/pages/Commande.jsx` : state `etape` (1, 2 ou 3), un formulaire par étape, une fonction `validerEtape()` qui remplit un objet `erreurs`, puis la génération du numéro de commande.',
      },
      {
        title: 'Tester l’ensemble',
        detail:
          'Vérifiez : rechargement en plein panier, retour arrière après paiement, champs invalides, favori conservé, badge de la navbar toujours synchronisé.',
      },
    ],
    criteria: [
      'Ajouter au panier depuis la fiche produit met à jour le badge de la navbar immédiatement.',
      'Le panier est restauré à l’identique après un rechargement de la page.',
      'Les actions du panier sont traitées par un reducer pur ; la sauvegarde localStorage est faite dans un useEffect.',
      'Passer à l’étape 2 est impossible si le nom est vide ou l’email invalide.',
      'La page de confirmation affiche un numéro de commande et vide le panier.',
      'La recherche ne filtre qu’après 300 ms d’arrêt de frappe (debounce).',
      'Un produit favori reste marqué après navigation et rechargement.',
      'Toutes les routes, y compris l’inconnue, rendent une page : jamais d’écran blanc.',
    ],
    solution: [
      {
        title: 'Le reducer pur du panier (panierReducer.js)',
        lang: 'jsx',
        code: `export const etatInitial = [];

// Reducer PUR : ni fetch, ni localStorage, ni variable externe.
// Il reçoit l'état et une action, et renvoie un NOUVEL état.
export function panierReducer(etat, action) {
  switch (action.type) {
    case 'AJOUTER': {
      const existe = etat.find((l) => l.id === action.produit.id);
      if (existe) {
        // Le produit est déjà là : on augmente seulement la quantité
        return etat.map((l) =>
          l.id === action.produit.id
            ? { ...l, quantite: l.quantite + action.quantite }
            : l
        );
      }
      return [...etat, { ...action.produit, quantite: action.quantite }];
    }

    case 'CHANGER_QUANTITE':
      return etat
        .map((l) => (l.id === action.id ? { ...l, quantite: action.quantite } : l))
        .filter((l) => l.quantite > 0); // quantité 0 : la ligne disparaît

    case 'RETIRER':
      return etat.filter((l) => l.id !== action.id);

    case 'VIDER':
      return [];

    default:
      return etat; // action inconnue : on ne casse rien
  }
}`,
        note:
          'Un reducer se teste en une ligne : `panierReducer(etat, action)` doit renvoyer un nouveau tableau sans modifier `etat`. C’est ce qui rend le code prévisible et testable.',
      },
      {
        title: 'Le contexte et son hook (PanierContext.jsx)',
        lang: 'jsx',
        code: `import { createContext, useContext, useEffect, useReducer, useState } from 'react';
import { panierReducer, etatInitial } from './panierReducer';

const PanierContext = createContext(null);

export function PanierProvider({ children }) {
  const [lignes, dispatch] = useReducer(panierReducer, etatInitial, (init) => {
    // Initialisation paresseuse : la lecture du disque n'a lieu qu'une fois
    const brut = localStorage.getItem('panier');
    return brut ? JSON.parse(brut) : init;
  });

  // Le reducer reste pur : la persistance est faite ici, dans un effet
  useEffect(() => {
    localStorage.setItem('panier', JSON.stringify(lignes));
  }, [lignes]);

  const nombreArticles = lignes.reduce((n, l) => n + l.quantite, 0);
  const total = lignes.reduce((s, l) => s + l.prix * l.quantite, 0);

  const valeur = {
    lignes: lignes,
    nombreArticles: nombreArticles,
    total: total,
    ajouter: (produit, quantite) =>
      dispatch({ type: 'AJOUTER', produit: produit, quantite: quantite }),
    changerQuantite: (id, quantite) =>
      dispatch({ type: 'CHANGER_QUANTITE', id: id, quantite: quantite }),
    retirer: (id) => dispatch({ type: 'RETIRER', id: id }),
    vider: () => dispatch({ type: 'VIDER' }),
  };

  return <PanierContext.Provider value={valeur}>{children}</PanierContext.Provider>;
}

// Hook personnalisé : un raccourci sûr pour lire le contexte
export function usePanier() {
  const ctx = useContext(PanierContext);
  if (!ctx) throw new Error('usePanier doit être utilisé dans <PanierProvider>.');
  return ctx;
}`,
        note:
          'Le contexte des favoris suit exactement le même modèle : un second provider avec un state d’ids et une action basculer. Une seule lecture dans le composant qui a besoin, zéro prop intermédiaire.',
      },
      {
        title: 'La fiche produit (FicheProduit.jsx)',
        lang: 'jsx',
        code: `import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { PRODUITS } from '../data/produits';
import { usePanier } from '../context/PanierContext';

function FicheProduit() {
  const { id } = useParams(); // valeur de :id dans l'URL
  const produit = PRODUITS.find((p) => p.id === id);
  const [quantite, setQuantite] = useState(1);
  const [ajoute, setAjoute] = useState(false);
  const { ajouter } = usePanier();

  if (!produit) {
    return (
      <section>
        <h1>Produit introuvable</h1>
        <Link to="/catalogue">Retour au catalogue</Link>
      </section>
    );
  }

  function ajouterAuPanier() {
    ajouter(produit, quantite);
    setAjoute(true);
    // Retour visuel : le bouton reprend son libellé après 1,5 s
    setTimeout(() => setAjoute(false), 1500);
  }

  return (
    <article className="fiche">
      <img src={produit.image} alt={produit.nom} />
      <div className="infos">
        <p className="note">★ {produit.note} / 5</p>
        <h1>{produit.nom}</h1>
        <p className="prix">{produit.prix.toFixed(2)} €</p>
        <p className="description">{produit.description}</p>

        <label>
          Quantité
          <input
            type="number"
            min="1"
            max="99"
            value={quantite}
            onChange={(e) => setQuantite(Math.max(1, Number(e.target.value)))}
          />
        </label>

        <button className="principal" onClick={ajouterAuPanier}>
          {ajoute ? 'Ajouté ✓' : 'Ajouter au panier'}
        </button>
      </div>
    </article>
  );
}

export default FicheProduit;`,
        note:
          'Le composant ne connaît ni le routeur ni le reducer au-delà de `useParams()` et `usePanier()` : c’est tout l’intérêt des hooks, deux lignes pour brancher un monde de logique.',
      },
      {
        title: 'La barre de navigation (Navbar.jsx)',
        lang: 'jsx',
        code: `import { Link, NavLink } from 'react-router-dom';
import { usePanier } from '../context/PanierContext';

function Navbar({ recherche, onRecherche }) {
  const { nombreArticles } = usePanier();

  return (
    <header className="navbar">
      <Link to="/" className="logo">ShopReact</Link>

      <input
        type="search"
        value={recherche}
        onChange={(e) => onRecherche(e.target.value)}
        placeholder="Rechercher un produit…"
        aria-label="Rechercher un produit"
      />

      <nav>
        <NavLink to="/catalogue" className={({ isActive }) => (isActive ? 'actif' : '')}>
          Catalogue
        </NavLink>
        <NavLink to="/favoris" className={({ isActive }) => (isActive ? 'actif' : '')}>
          Favoris
        </NavLink>
        <NavLink to="/panier" className={({ isActive }) => (isActive ? 'actif' : '')}>
          Panier
          {nombreArticles > 0 && (
            <span className="badge">{nombreArticles}</span>
          )}
        </NavLink>
      </nav>
    </header>
  );
}

export default Navbar;`,
        note:
          'Le badge n’affiche que `nombreArticles`, une valeur CALCULÉE par le provider : impossible qu’il soit en retard sur le panier, quelle que soit la page où il est affiché.',
      },
      {
        title: 'Le checkout en 3 étapes (Commande.jsx)',
        lang: 'jsx',
        code: `import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { usePanier } from '../context/PanierContext';

const ETAPES = ['Coordonnées', 'Paiement', 'Confirmation'];
const EMAIL = /^[^ @]+@[^ @]+\\.[^ @]+$/;

function Commande() {
  const { lignes, total, vider } = usePanier();
  const navigate = useNavigate();
  const [etape, setEtape] = useState(1);
  const [form, setForm] = useState({ nom: '', email: '', carte: '' });
  const [erreurs, setErreurs] = useState({});
  const [numero, setNumero] = useState('');

  function changer(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function validerEtape() {
    const err = {};
    if (etape === 1) {
      if (form.nom.trim() === '') err.nom = 'Le nom est obligatoire.';
      if (!EMAIL.test(form.email)) err.email = 'Email invalide (ex. : ana@mail.fr).';
    }
    if (etape === 2) {
      const chiffres = form.carte.split(' ').join('');
      if (chiffres.length !== 16) {
        err.carte = 'Le numéro de carte doit contenir 16 chiffres.';
      }
    }
    setErreurs(err);
    return Object.keys(err).length === 0;
  }

  function suivant() {
    if (!validerEtape()) return;
    if (etape === 2) {
      // Paiement simulé : numéro unique puis vidage du panier
      setNumero('A-' + Math.floor(1000 + Math.random() * 9000));
      vider();
      setEtape(3);
      return;
    }
    setEtape(etape + 1);
  }

  if (lignes.length === 0 && etape !== 3) {
    return (
      <section className="panier-vide">
        <h1>Votre panier est vide</h1>
        <Link to="/catalogue">Voir le catalogue</Link>
      </section>
    );
  }

  return (
    <section className="commande">
      <ol className="stepper">
        {ETAPES.map((e, i) => (
          <li key={e} className={etape === i + 1 ? 'actif' : etape > i + 1 ? 'fait' : ''}>
            {i + 1}. {e}
          </li>
        ))}
      </ol>

      {etape === 1 && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            suivant();
          }}
        >
          <label>
            Nom complet
            <input name="nom" value={form.nom} onChange={changer} />
          </label>
          {erreurs.nom && <p className="erreur">{erreurs.nom}</p>}

          <label>
            Email
            <input name="email" value={form.email} onChange={changer} />
          </label>
          {erreurs.email && <p className="erreur">{erreurs.email}</p>}

          <button type="submit">Continuer vers le paiement</button>
        </form>
      )}

      {etape === 2 && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            suivant();
          }}
        >
          <label>
            Numéro de carte
            <input
              name="carte"
              value={form.carte}
              onChange={changer}
              placeholder="4242 4242 4242 4242"
            />
          </label>
          {erreurs.carte && <p className="erreur">{erreurs.carte}</p>}

          <p className="recap">Total à payer : {total.toFixed(2)} €</p>
          <button type="submit">Payer (simulation)</button>
        </form>
      )}

      {etape === 3 && (
        <div className="confirmation">
          <h2>Merci {form.nom} !</h2>
          <p>Votre commande <strong>#{numero}</strong> est confirmée.</p>
          <button onClick={() => navigate('/catalogue')}>Retour à la boutique</button>
        </div>
      )}
    </section>
  );
}

export default Commande;`,
        note:
          'L’ordre est essentiel : on valide AVANT de changer d’étape, et on vide le panier seulement quand le paiement est accepté. Un rechargement à l’étape 3 renverrait au panier vide, comportement voulu.',
      },
    ],
  },
  {
    id: 'p10',
    title: 'Application complète avec authentification et API',
    level: 'Expert',
    skills: [
      "L'authentification simulée : jeton, stockage et expiration",
      'Les routes protégées et la redirection vers /connexion',
      'La gestion d’état globale avec Context et useReducer',
      'Le CRUD complet couplé à une API (méthodes HTTP, codes de retour)',
      'La centralisation des erreurs (ErrorBoundary + intercepteur fetch)',
      'Les tests automatisés avec Vitest et React Testing Library',
    ],
    objectives: [
      'Inscrire puis connecter un utilisateur ; le jeton survit à un rechargement',
      'Protéger /dashboard et /ressources : un visiteur non connecté est redirigé',
      'Réaliser les 4 opérations CRUD et afficher chaque erreur API proprement',
      'Déconnecter proprement : jeton effacé, state remis à zéro',
      'Intercepter les erreurs de rendu avec un ErrorBoundary et un bouton Réessayer',
      'Écrire au moins 6 tests verts : reducer, jeton et route protégée',
    ],
    brief:
      "Votre chef-d’œuvre : une application métier complète, avec comptes utilisateurs, routes protégées, CRUD sur une API et tests automatisés. Tout ce qui a été appris dans les neuf projets précédents se retrouve ici, réparti en plusieurs fichiers organisés par rôle (api, context, components, pages, tests). Le jeton JWT sera simulé : une chaîne encodée en base64 portant une date d’expiration que vous vérifiez vous-même. L’exigence de niveau Expert est la fiabilité : chaque erreur (réseau, session expirée, formulaire invalide, bug de rendu) doit être affichée clairement — et prouvée par des tests.",
    preview:
      "• Écran de connexion centré : carte blanche de 380 px sur fond dégradé #0f172a → #1e293b, logo « RM App », champs Email et Mot de passe, bouton bleu plein « Se connecter », lien « Créer un compte ».\n• Bandeau jaune au-dessus du formulaire quand on arrive protégé : « Vous devez vous connecter pour accéder à cette page. »\n• Après connexion : barre supérieure avec le nom de l’utilisateur et bouton « Déconnexion », barre latérale (Tableau de bord, Ressources, Profil).\n• Page Ressources : tableau avec colonnes Titre et Auteur, boutons « Modifier » et « Supprimer », bouton bleu « + Nouvelle ressource » ouvrant un formulaire.\n• Bandeau d’erreur rouge global sous la barre, avec le message (« Session expirée, reconnectez-vous ») et une croix de fermeture.\n• Chargement : blocs gris animés (skeleton) ; bug de rendu : panneau « Une erreur est survenue » avec bouton « Réessayer ».\n• Route protégée sans session : redirection vers /connexion, jamais d’écran blanc.\n• Console de test : bandeau « 🧪 6 tests réussis » après `npm test`.",
    steps: [
      {
        title: 'Structurer en dossiers',
        detail:
          'Créez `src/api/` (accès réseau), `src/context/` (états globaux), `src/components/` (ErrorBoundary, RouteProtegee, Skeleton), `src/pages/` et `src/tests/`.',
      },
      {
        title: 'Simuler le jeton',
        detail:
          'Dans `src/api/auth.js`, écrivez `creerJeton(utilisateur)` qui encode `{ sub, nom, email, exp }` en base64, et `verifierJeton(jeton)` qui renvoie la charge ou null si expiré.',
      },
      {
        title: 'Ajouter les comptes',
        detail:
          'Toujours dans `auth.js` : `inscrire(nom, email, motDePasse)` refuse les doublons d’email, `connecter(email, motDePasse)` vérifie les identifiants. Les comptes sont stockés dans localStorage (démo uniquement).',
      },
      {
        title: 'Créer le contexte d’auth',
        detail:
          'Dans `src/context/AuthContext.jsx`, un reducer avec CHARGER, CONNECTER et DECONNECTER, un useEffect qui relit le jeton au démarrage, et les fonctions `connecter`, `inscrire`, `deconnecter`.',
      },
      {
        title: 'Poser la route protégée',
        detail:
          'Créez `src/components/RouteProtegee.jsx` : si `statut === "chargement"` on affiche un message, sinon si personne n’est connecté on renvoie `<Navigate to="/connexion" state={{ depuis: location.pathname }} />`.',
      },
      {
        title: 'Centraliser les appels réseau',
        detail:
          'Dans `src/api/ressources.js`, une fonction `requete(url, options)` qui ajoute l’en-tête `Authorization`, transforme un 401 en déconnexion et une coupure réseau en message français lisible.',
      },
      {
        title: 'Écrire le CRUD et ses pages',
        detail:
          '`listerRessources`, `creerRessource`, `modifierRessource`, `supprimerRessource`, puis les pages `Connexion`, `Inscription`, `Dashboard`, `Ressources` et `Profil`.',
      },
      {
        title: 'Blinder les erreurs',
        detail:
          'Créez `src/components/ErrorBoundary.jsx` (composant de classe avec `componentDidCatch`) qui affiche « Une erreur est survenue » et un bouton Réessayer ; enveloppez-y le routeur.',
      },
      {
        title: 'Écrire les tests',
        detail:
          '`npm install -D vitest @testing-library/react @testing-library/jest-dom`, ajoutez `"test": "vitest"` dans `package.json` et créez `src/tests/auth.test.jsx` avec 6 assertions au minimum.',
      },
    ],
    criteria: [
      "S'inscrire crée un compte, connecte l'utilisateur et survit à un rechargement.",
      'Accéder à /ressources sans jeton redirige vers /connexion en conservant la destination.',
      'Un jeton expiré est refusé : l’utilisateur est déconnecté avec un message explicite.',
      'Les 4 opérations CRUD fonctionnent et rafraîchissent la liste sans rechargement.',
      'Une erreur réseau ou un code 500 affiche un message lisible, jamais un écran blanc.',
      'La déconnexion efface le jeton et rend impossible le retour vers /dashboard.',
      '`npm test` affiche au moins 6 tests verts (reducer, jeton, route protégée).',
      'Aucun mot de passe ni jeton n’est affiché dans la console du navigateur.',
    ],
    solution: [
      {
        title: 'Simuler le JWT (src/api/auth.js)',
        lang: 'jsx',
        code: `// JETON SIMULÉ : en production, c'est le serveur qui signe le jeton.
// Ici on encode la charge en base64 avec une date d'expiration.
const CLE_COMPTES = 'rm-comptes';
const CLE_JETON = 'rm-jeton';

function encoderCharge(charge) {
  // encodeURIComponent garantit une chaîne ASCII compatible avec btoa
  return btoa(encodeURIComponent(JSON.stringify(charge)));
}

function decoderCharge(jeton) {
  return JSON.parse(decodeURIComponent(atob(jeton)));
}

export function creerJeton(utilisateur) {
  const charge = {
    sub: utilisateur.id,
    nom: utilisateur.nom,
    email: utilisateur.email,
    exp: Date.now() + 1000 * 60 * 30, // valable 30 minutes
  };
  return encoderCharge(charge);
}

// Renvoie la charge si le jeton est lisible ET encore valide, sinon null
export function verifierJeton(jeton) {
  if (!jeton) return null;
  try {
    const charge = decoderCharge(jeton);
    if (typeof charge.exp !== 'number') return null;
    if (charge.exp < Date.now()) return null; // expiré
    return charge;
  } catch (e) {
    return null; // jeton corrompu : on ne fait pas exploser l'app
  }
}

function lireComptes() {
  const brut = localStorage.getItem(CLE_COMPTES);
  return brut ? JSON.parse(brut) : [];
}

export async function inscrire(nom, email, motDePasse) {
  const comptes = lireComptes();
  if (comptes.some((c) => c.email === email)) {
    throw new Error('Un compte existe déjà avec cet email.');
  }
  const compte = {
    id: Date.now(),
    nom: nom,
    email: email,
    motDePasse: motDePasse, // DÉMO UNIQUEMENT : jamais en production
    cree: Date.now(),
  };
  localStorage.setItem(CLE_COMPTES, JSON.stringify([...comptes, compte]));
  return creerJeton(compte);
}

export async function connecter(email, motDePasse) {
  const compte = lireComptes().find((c) => c.email === email);
  if (!compte || compte.motDePasse !== motDePasse) {
    throw new Error('Email ou mot de passe incorrect.');
  }
  return creerJeton(compte);
}`,
        note:
          'Toute la sécurité de la démo tient dans `verifierJeton` : jeton absent, jeton illisible ou date dépassée renvoient tous `null`, ce qui déclenche la déconnexion côté client.',
      },
      {
        title: 'L’état d’authentification (AuthContext.jsx)',
        lang: 'jsx',
        code: `import { createContext, useContext, useEffect, useReducer } from 'react';
import * as apiAuth from '../api/auth';

const AuthContext = createContext(null);

const etatInitial = { statut: 'chargement', utilisateur: null };
// statut : 'chargement' | 'connecte' | 'deconnecte'

export function authReducer(etat, action) {
  switch (action.type) {
    case 'CHARGER':
      return action.charge
        ? { statut: 'connecte', utilisateur: action.charge }
        : { statut: 'deconnecte', utilisateur: null };
    case 'CONNECTER':
      return { statut: 'connecte', utilisateur: action.charge };
    case 'DECONNECTER':
      return { statut: 'deconnecte', utilisateur: null };
    default:
      return etat;
  }
}

export function AuthProvider({ children }) {
  const [etat, dispatch] = useReducer(authReducer, etatInitial);

  // Au démarrage de l'app, on relit le jeton stocké
  useEffect(() => {
    const charge = apiAuth.verifierJeton(localStorage.getItem('rm-jeton'));
    dispatch({ type: 'CHARGER', charge: charge });
  }, []);

  async function connecter(email, motDePasse) {
    const jeton = await apiAuth.connecter(email, motDePasse);
    localStorage.setItem('rm-jeton', jeton);
    dispatch({ type: 'CONNECTER', charge: apiAuth.verifierJeton(jeton) });
  }

  async function inscrire(nom, email, motDePasse) {
    const jeton = await apiAuth.inscrire(nom, email, motDePasse);
    localStorage.setItem('rm-jeton', jeton);
    dispatch({ type: 'CONNECTER', charge: apiAuth.verifierJeton(jeton) });
  }

  function deconnecter() {
    localStorage.removeItem('rm-jeton');
    dispatch({ type: 'DECONNECTER' });
  }

  const valeur = {
    statut: etat.statut,
    utilisateur: etat.utilisateur,
    connecter: connecter,
    inscrire: inscrire,
    deconnecter: deconnecter,
  };

  return <AuthContext.Provider value={valeur}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth doit être utilisé dans <AuthProvider>.');
  return ctx;
}`,
        note:
          'Le state démarre sur « chargement » : c’est ce qui empêche la route protégée de rediriger à tort pendant la lecture du jeton. `authReducer` est exporté pour être testé isolément.',
      },
      {
        title: 'La route protégée (RouteProtegee.jsx)',
        lang: 'jsx',
        code: `import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function RouteProtegee({ children }) {
  const { statut } = useAuth();
  const location = useLocation();

  // Le jeton est en cours de lecture : on ne décide pas encore
  if (statut === 'chargement') {
    return <p className="chargement">Vérification de la session…</p>;
  }

  if (statut !== 'connecte') {
    // On mémorise la destination pour y revenir après connexion
    return (
      <Navigate
        to="/connexion"
        replace
        state={{ depuis: location.pathname + location.search }}
      />
    );
  }

  // Une fois la session confirmée, on affiche la page demandée
  return children;
}

export default RouteProtegee;`,
        note:
          'Utilisation dans les routes : `<Route path="/ressources" element={<RouteProtegee><Ressources /></RouteProtegee>} />`. La prop `state.depuis` sera relue avec `useLocation().state` sur la page de connexion pour y retourner ensuite.',
      },
      {
        title: 'L’intercepteur et le CRUD (src/api/ressources.js)',
        lang: 'jsx',
        code: `const BASE = 'https://jsonplaceholder.typicode.com';

// Tous les appels passent par ici : en-tête, erreurs et messages centralisés
async function requete(url, options = {}) {
  const jeton = localStorage.getItem('rm-jeton');
  const entetes = {
    'Content-Type': 'application/json',
    ...(jeton ? { Authorization: 'Bearer ' + jeton } : {}),
    ...(options.entetes || {}),
  };

  let reponse;
  try {
    reponse = await fetch(url, { ...options, headers: entetes });
  } catch (e) {
    throw new Error('Réseau indisponible : vérifiez votre connexion.');
  }

  if (reponse.status === 401) {
    // Session refusée : on nettoie et on laisse l'interface prévenir l'utilisateur
    localStorage.removeItem('rm-jeton');
    throw new Error('Session expirée, reconnectez-vous.');
  }
  if (!reponse.ok) {
    throw new Error('Erreur ' + reponse.status + ' : opération refusée.');
  }
  if (reponse.status === 204) return null;
  return reponse.json();
}

export function listerRessources(signal) {
  return requete(BASE + '/posts?_limit=10', { signal: signal });
}

export function creerRessource(donnees) {
  return requete(BASE + '/posts', {
    method: 'POST',
    body: JSON.stringify(donnees),
  });
}

export function modifierRessource(id, donnees) {
  return requete(BASE + '/posts/' + id, {
    method: 'PATCH',
    body: JSON.stringify(donnees),
  });
}

export function supprimerRessource(id) {
  return requete(BASE + '/posts/' + id, { method: 'DELETE' });
}`,
        note:
          'Une seule fonction gère les quatre situations (réseau, 401, autre code d’erreur, succès) : ajouter une route API ne demande plus que deux lignes, et le message affiché à l’utilisateur est toujours en français.',
      },
      {
        title: 'Les tests automatisés (src/tests/auth.test.jsx)',
        lang: 'jsx',
        code: `import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { authReducer } from '../context/AuthContext';
import { creerJeton, verifierJeton } from '../api/auth';
import RouteProtegee from '../components/RouteProtegee';
import { AuthProvider } from '../context/AuthContext';

describe('authReducer', () => {
  it('CONNECTER enregistre l’utilisateur', () => {
    const etat = authReducer(
      { statut: 'deconnecte', utilisateur: null },
      { type: 'CONNECTER', charge: { sub: 1, nom: 'Ana' } }
    );
    expect(etat.statut).toBe('connecte');
    expect(etat.utilisateur.nom).toBe('Ana');
  });

  it('DECONNECTER efface la session', () => {
    const etat = authReducer(
      { statut: 'connecte', utilisateur: { sub: 1 } },
      { type: 'DECONNECTER' }
    );
    expect(etat.statut).toBe('deconnecte');
    expect(etat.utilisateur).toBeNull();
  });
});

describe('verifierJeton', () => {
  it('accepte un jeton frais', () => {
    const jeton = creerJeton({ id: 1, nom: 'Ana', email: 'ana@mail.fr' });
    expect(verifierJeton(jeton).nom).toBe('Ana');
  });

  it('refuse un jeton expiré', () => {
    const perime = btoa(
      encodeURIComponent(JSON.stringify({ sub: 1, exp: Date.now() - 1000 }))
    );
    expect(verifierJeton(perime)).toBeNull();
  });
});

describe('RouteProtegee', () => {
  beforeEach(() => localStorage.removeItem('rm-jeton'));

  it('redirige vers /connexion sans session', () => {
    render(
      <MemoryRouter initialEntries={['/ressources']}>
        <AuthProvider>
          <RouteProtegee>
            <p>Ressources protégées</p>
          </RouteProtegee>
        </AuthProvider>
      </MemoryRouter>
    );
    // Le contenu protégé ne doit PAS apparaître
    expect(screen.queryByText('Ressources protégées')).toBeNull();
  });

  it('affiche le contenu avec un jeton valide', () => {
    localStorage.setItem(
      'rm-jeton',
      creerJeton({ id: 1, nom: 'Ana', email: 'ana@mail.fr' })
    );
    render(
      <MemoryRouter initialEntries={['/ressources']}>
        <AuthProvider>
          <RouteProtegee>
            <p>Ressources protégées</p>
          </RouteProtegee>
        </AuthProvider>
      </MemoryRouter>
    );
    expect(screen.getByText('Ressources protégées')).toBeTruthy();
  });
});`,
        note:
          'Six tests, trois couches : la logique pure (reducer), la sécurité (jeton) et le rendu (route protégée). Ce trio couvre l’essentiel : si l’un casse, un changement de code a cassé un comportement visible.',
      },
    ],
  },
];
