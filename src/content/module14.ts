import type { Module } from '../types';

export const module14: Module = {
  id: 'm14',
  number: 14,
  icon: '🗄️',
  level: 'Avancé',
  title: "Gestion avancée des données",
  description: "Centralisez l'état global avec Redux Toolkit et découvrez Zustand.",
  lessons: [
    {
      id: 'm14-l01',
      title: "Introduction à Redux Toolkit",
      minutes: 7,
      objectives: [
        "Définir le rôle de Redux",
        "Expliquer ce qu’apporte Redux Toolkit",
        "Citer deux cas d’usage de l’état global",
      ],
      blocks: [
        { type: 'p', text: "Votre application grandit : le panier, l’utilisateur connecté, le thème choisi… L’état se multiplie et se disperse dans des dizaines de composants. Quand chaque composant garde sa propre copie, les valeurs divergent. Redux propose une autre approche : un seul endroit pour tout stocker." },
        { type: 'h', text: 'Explication simple' },
        { type: 'p', text: "Redux est une bibliothèque qui conserve tout l’état global de l’application dans un seul objet appelé le store (le « magasin »). Chaque composant lit ce même store et signale ses changements en y envoyant des actions. Redux Toolkit est la version officielle simplifiée : elle réduit drastiquement le code à écrire par rapport à l’ancien Redux, et ajoute des vérifications utiles pendant le développement." },
        { type: 'list', items: ["Un seul store unique pour toute l’application.", "Le state est en lecture seule : on le change en envoyant une action.", "Redux Toolkit fournit configureStore, createSlice et createAction.", "À réserver à l’état réellement partagé, pas à un état local d’un seul composant."] },
        { type: 'code', lang: 'js', code: `import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    compteur: function (etat = { valeur: 0 }, action) {
      if (action.type === "compteur/incrementer") {
        return { valeur: etat.valeur + 1 };
      }
      return etat;
    }
  }
});

console.log(store.getState().compteur.valeur);
store.dispatch({ type: "compteur/incrementer" });
console.log(store.getState().compteur.valeur);`, caption: "Un store Redux Toolkit minimal" },
        { type: 'list', items: ["Ligne 1 : `configureStore` crée le store, c’est l’entrée de Redux Toolkit.", "`reducer` est un objet : chaque clé devient une branche du state.", "`etat = { valeur: 0 }` donne la valeur initiale à la première lecture.", "`action.type` identifie l’événement ; sinon on renvoie l’état inchangé.", "`getState()` lit l’état, `dispatch()` envoie une action, `subscribe()` prévient les abonnés."] },
        { type: 'result', text: "La console affiche 0 puis 1 : le store a bien enregistré l’incrément." },
        { type: 'mistake', text: "Modifier le state directement : store.getState().compteur.valeur = 5.", fix: "Toujours passer par dispatch, avec une action qui décrit le changement." },
        { type: 'mistake', text: "Utiliser Redux pour un état qui ne sert qu’à un seul composant.", fix: "Commencer par useState ; n’ajouter le store que quand la donnée est partagée entre composants éloignés." },
        { type: 'quote', text: "Résumé : Redux centralise l’état global dans un store unique, et Redux Toolkit simplifie énormement l’écriture du code Redux." },
      ],
      exercises: [
        { id: 'm14-l01-e1', type: 'qcm', difficulty: 'facile', question: "Quel est le rôle principal de Redux ?", options: ["gérer la navigation entre les pages", "centraliser l’état global de l’application dans un store unique", "styliser les composants", "compiler le code JSX"], answer: 1, explanation: "Redux stocke tout l’état au même endroit pour que tous les composants lisent la même donnée. Le routage, le style et la compilation sont d’autres responsabilités (React Router, CSS, Babel)." },
        { id: 'm14-l01-e2', type: 'short', difficulty: 'facile', question: "Comment appelle-t-on le magasin unique qui contient tout l’état Redux ?", accepted: ["store", "le store", "magasin"], explanation: "Le store est l’objet central : on lit son contenu avec getState() et on le modifie en y envoyant des actions avec dispatch()." },
        { id: 'm14-l01-e3', type: 'fill', difficulty: 'intermédiaire', question: "Redux Toolkit est la version ___ de Redux, conçue pour réduire le code à écrire.", accepted: ["officielle", "officiel"], hint: "C’est l’équipe de Redux elle-même qui la publie.", explanation: "Redux Toolkit est le paquet officiel recommandé par l’équipe de Redux : il fournit des outils prêts à l’emploi (configureStore, createSlice) et supprime le boilerplate de l’ancien Redux." },
      ],
    },
    {
      id: 'm14-l02',
      title: "Gestion globale du State",
      minutes: 8,
      objectives: [
        "Distinguer état local et état global",
        "Reconnaître un problème de prop drilling",
        "Choisir entre useState, Context et un store",
      ],
      blocks: [
        { type: 'p', text: "Votre composant App connaît le nom de l’utilisateur, et c’est un composant cinq niveaux plus bas qui doit l’afficher. Vous passez donc la prop de composant en composant, sans que les intermédiaires s’en servent. Ce phénomène a un nom : le prop drilling (« percer les props »)." },
        { type: 'h', text: 'Explication simple' },
        { type: 'p', text: "L’état local (useState) appartient au composant qui l’utilise : c’est l’outil par défaut. Quand la même donnée doit être visible par plusieurs composants éloignés, trois solutions s’offrent à vous : faire descendre les props (simple mais lourd), utiliser un Contexte React (bon pour un partage rare), ou installer un store global comme Redux ou Zustand (accès partout, changements traçables)." },
        { type: 'list', items: ["État local : useState, dans le composant qui s’en sert réellement.", "Prop drilling : la même prop traverse des composants qui ne l’utilisent pas.", "Contexte React : partage simple, sans bibliothèque externe, mais sans historique.", "Store global : accès depuis n’importe quel composant et actions traçables."] },
        { type: 'code', lang: 'jsx', code: `function Utilisateur(props) {
  return <BoutonDeconnexion nom={props.nom} />;
}

function BoutonDeconnexion(props) {
  return <button>Déconnexion de {props.nom}</button>;
}

function App() {
  return <Utilisateur nom="Marie" />;
}`, caption: "Exemple de prop drilling" },
        { type: 'list', items: ["`App` possède la donnée `nom` et doit la faire descendre.", "`Utilisateur` ne s’en sert pas : elle sert uniquement de tuyau, elle retransmet `props.nom`.", "`BoutonDeconnexion` est le seul composant qui affiche réellement la donnée.", "Si un intermédiaire avait aussi besoin du nom, il faudrait le lui passer aussi : le drilling s’épaissit."] },
        { type: 'result', text: "À l’écran : un bouton « Déconnexion de Marie »." },
        { type: 'mistake', text: "Placer dans le store un état qui ne concerne qu’un seul composant.", fix: "Garder useState tant que la donnée n’est partagée que localement." },
        { type: 'mistake', text: "Créer un Contexte pour chaque prop qui descend.", fix: "Réserver le Contexte (ou le store) aux données réellement partagées par de nombreux composants." },
        { type: 'quote', text: "Résumé : useState pour le local, le Contexte pour un partage simple, un store global (Redux, Zustand) quand la donnée circule partout." },
      ],
      exercises: [
        { id: 'm14-l02-e1', type: 'qcm', difficulty: 'facile', question: "Le prop drilling consiste à…", options: ["passer la même prop de composant en composant jusqu’à celui qui en a besoin", "copier l’état dans chaque composant", "stocker l’état dans localStorage", "découper un composant en plusieurs sous-composants"], answer: 0, explanation: "Le prop drilling, c’est la transmission verticale d’une prop à travers des composants intermédiaires qui ne s’en servent pas. Copier l’état, utiliser localStorage et découper des composants sont d’autres pratiques sans rapport." },
        { id: 'm14-l02-e2', type: 'fill', difficulty: 'facile', question: "L’état partagé par tous les composants de l’application s’appelle l’état ___.", accepted: ["global"], explanation: "On parle d’état global (global state) lorsqu’une même donnée est lue et modifiée par plusieurs composants, par opposition à l’état local contenu dans un seul composant." },
        { id: 'm14-l02-e3', type: 'visual', difficulty: 'intermédiaire', language: 'jsx', question: "Que voit l’utilisateur à l’écran avec ce code ?", template: `function Panier(props) {
  return <p>Panier de {props.nom} : {props.articles.length} articles</p>;
}

function App() {
  return <Panier nom="Marie" articles={["pain", "lait"]} />;
}`, solution: "Un paragraphe contenant « Panier de Marie : 2 articles ».", mustContain: ["Marie", "2 articles"], explanation: "App fournit deux props : nom = « Marie » et un tableau de deux éléments. Panier les retransmet dans un <p> : le nombre d’articles s’affiche via articles.length, soit 2. C’est exactement le rendu produit par le JSX." },
      ],
    },
    {
      id: 'm14-l03',
      title: "Création d'un Store",
      minutes: 9,
      objectives: [
        "Créer un store avec configureStore",
        "Structurer le state en branches",
        "Lire l’état du store",
      ],
      blocks: [
        { type: 'p', text: "Passons à la pratique. Avant de pouvoir lire ou modifier quoi que ce soit, il faut construire le magasin lui-même. Avec Redux Toolkit, une dizaine de lignes suffisent." },
        { type: 'h', text: 'Explication simple' },
        { type: 'p', text: "configureStore est la fonction qui fabrique le store. On lui donne un objet reducer : chaque clé de cet objet devient une branche du state. Un reducer est une fonction qui reçoit l’état actuel et une action, et renvoie le nouvel état. Tant qu’aucune action n’a été envoyée, on lit la valeur initiale avec store.getState(). Il n’y a qu’un seul store par application, créé une fois et partagé par tous les composants." },
        { type: 'list', items: ["configureStore remplace l’ancien createStore et ajoute des vérifications.", "Chaque clé de reducer devient une branche du state : clé « taches » → state.taches.", "Un reducer est une fonction pure : (etat, action) → nouvel état.", "getState() lit l’état courant, dispatch() envoie une action, subscribe() abonne un observateur."] },
        { type: 'code', lang: 'js', code: `import { configureStore } from "@reduxjs/toolkit";

function reducerTaches(etat = [], action) {
  return etat;
}

const store = configureStore({
  reducer: { taches: reducerTaches }
});

console.log(JSON.stringify(store.getState()));`, caption: "Créer un store avec une branche « taches »" },
        { type: 'list', items: ["Ligne 1 : import de `configureStore` depuis Redux Toolkit.", "Ligne 3 : `reducerTaches` reçoit l’état et l’action ; ici elle renvoie l’état inchangé.", "`etat = []` : la valeur initiale, utilisée à la première lecture.", "Ligne 7 : `reducer: { taches: reducerTaches }` donne au state la forme `{ taches: [...] }`.", "Ligne 10 : `getState()` renvoie tout l’état, `JSON.stringify` l’affiche sous forme de texte."] },
        { type: 'result', text: 'La console affiche {"taches":[]} : le store existe et sa branche taches est vide.' },
        { type: 'mistake', text: "Créer un store différent dans chaque composant : chaque composant lit alors un état distinct.", fix: "Créer le store une seule fois, dans un fichier dédié, et l’importer partout." },
        { type: 'mistake', text: "Oublier la valeur initiale du reducer : le state commence à undefined et les composants plantent.", fix: "Toujours donner un état par défaut grâce au second paramètre de la fonction." },
        { type: 'quote', text: "Résumé : configureStore assemble les reducers en un seul store ; chaque clé devient une branche du state lisible avec getState()." },
      ],
      exercises: [
        { id: 'm14-l03-e1', type: 'qcm', difficulty: 'facile', question: "Combien de stores Redux recommande-t-on dans une application ?", options: ["un seul", "un par composant", "un par page", "autant que nécessaire"], answer: 0, explanation: "Tout l’intérêt de Redux est la centralisation : un store unique garantit que tous les composants lisent la même donnée. Plusieurs stores recréeraient le problème de la dispersion." },
        { id: 'm14-l03-e2', type: 'code', difficulty: 'intermédiaire', language: 'js', question: "Écrivez le reducer reducerTaches (état initial vide, renvoie l’état inchangé) et le store qui l’utilise sous la clé taches, puis affichez l’état.", template: `import { configureStore } from "@reduxjs/toolkit";

// votre reducer ici

const store = configureStore({
  // votre store ici
});

console.log(JSON.stringify(store.getState()));`, solution: `import { configureStore } from "@reduxjs/toolkit";

function reducerTaches(etat = [], action) {
  return etat;
}

const store = configureStore({
  reducer: { taches: reducerTaches }
});

console.log(JSON.stringify(store.getState()));`, mustContain: ["reducerTaches", "taches"], expectedOutput: '{"taches":[]}', hint: "Le state doit avoir la forme { taches: [...] }.", explanation: "reducerTaches renvoie l’état reçu, initialisé à [] par son paramètre par défaut. configureStore le range sous la clé taches, donc getState() vaut { taches: [] } et JSON.stringify affiche {\"taches\":[]}. Utiliser reducer: reducerTaches sans clé donnerait un state qui n’est pas un objet avec taches." },
        { id: 'm14-l03-e3', type: 'fill', difficulty: 'facile', question: "Le store se crée avec la fonction ___ fournie par Redux Toolkit.", accepted: ["configurestore", "configure store"], hint: "configure… store", explanation: "configureStore est la fonction recommandée : elle assemble les reducers, ajoute la vérification d’actions et prépare les outils de développement. createStore est l’ancienne API, déconseillée." },
      ],
    },
    {
      id: 'm14-l04',
      title: "Actions et Reducers",
      minutes: 10,
      objectives: [
        "Définir une action et un reducer",
        "Créer un slice avec createSlice",
        "Envoyer une action avec dispatch",
      ],
      blocks: [
        { type: 'p', text: "Le store existe, mais il est figé : rien ne le modifie. Dans Redux, on ne touche jamais au state directement. On envoie un message, une action, qui décrit ce qui s’est passé ; le reducer décide alors du nouvel état." },
        { type: 'h', text: 'Explication simple' },
        { type: 'p', text: "Une action est un petit objet contenant un type, par exemple { type: \"compteur/incrementer\" } : c’est l’événement à traiter. Le reducer est la fonction qui, à partir de l’état et de l’action, calcule le nouvel état. Écrire tout cela à la main est fastidieux : createSlice fabrique en une fois le reducer, les types d’actions et les créateurs d’actions. Il ne reste qu’à dispatcher." },
        { type: 'list', items: ["Action : objet { type } décrit l’événement, éventuellement avec un payload (donnée).", "createSlice(name, initialState, reducers) génère tout le code répétitif.", "Chaque fonction du slice devient une action et une branche du reducer.", "store.dispatch(action) est le seul moyen de faire évoluer le state.", "Avec Redux Toolkit, on écrit le reducer « comme d’habitude » : Immer gère l’immutabilité."] },
        { type: 'code', lang: 'js', code: `import { createSlice, configureStore } from "@reduxjs/toolkit";

const compteurSlice = createSlice({
  name: "compteur",
  initialState: { valeur: 0 },
  reducers: {
    incrementer: function (etat) {
      etat.valeur += 1;
    }
  }
});

const store = configureStore({
  reducer: { compteur: compteurSlice.reducer }
});

store.dispatch(compteurSlice.actions.incrementer());
console.log(store.getState().compteur.valeur);`, caption: "Un slice Redux Toolkit complet" },
        { type: 'list', items: ["`createSlice` reçoit un `name`, un `initialState` et un objet `reducers`.", "Chaque fonction de `reducers` devient une action : `incrementer` → type `compteur/incrementer`.", "`etat.valeur += 1` modifie l’état : Immer, inclus dans Redux Toolkit, crée automatiquement la nouvelle version.", "`compteurSlice.reducer` est le reducer à passer au store sous la clé `compteur`.", "`compteurSlice.actions.incrementer()` fabrique l’action, `store.dispatch` l’envoie.", "`getState().compteur.valeur` relit la valeur mise à jour."] },
        { type: 'result', text: "La console affiche 1 : le compteur a bien été incrémenté." },
        { type: 'mistake', text: "Oublier le dispatch : appeler compteurSlice.actions.incrementer() seul ne change rien au state.", fix: "Toujours envelopper l’action dans store.dispatch(...)." },
        { type: 'mistake', text: "Ne pas associer le reducer du slice à une clé : getState().compteur renvoie undefined.", fix: "Écrire reducer: { compteur: compteurSlice.reducer } pour conserver le nom du slice." },
        { type: 'quote', text: "Résumé : une action décrit le changement, le slice fabrique le reducer et les actions, et dispatch est le seul chemin vers le state." },
      ],
      exercises: [
        { id: 'm14-l04-e1', type: 'qcm', difficulty: 'facile', question: "Comment le state Redux est-il modifié ?", options: ["en appelant directement une fonction du reducer", "en dispatchant une action", "en modifiant getState()", "en utilisant useState"], answer: 1, explanation: "La seule porte d’entrée est store.dispatch(action) : le store transmet l’action au reducer qui renvoie le nouvel état. Modifier getState() n’a aucun effet (le résultat est une copie), useState n’existe pas dans Redux et appeler le reducer directement contourne le store." },
        { id: 'm14-l04-e2', type: 'debug', difficulty: 'avancé', language: 'js', question: "Ce code doit afficher 1 mais affiche 0. Trouvez les deux erreurs (nom de propriété et dispatch manquant) et corrigez-le.", template: `import { createSlice, configureStore } from "@reduxjs/toolkit";

const compteurSlice = createSlice({
  name: "compteur",
  initialState: { valeur: 0 },
  reducers: {
    incrementer: function (etat) {
      etat.valeur += 1;
    }
  }
});

const store = configureStore({
  reducer: { compteur: compteurSlice.reducer }
});

compteurSlice.action.incrementer();
console.log(store.getState().compteur.valeur);`, solution: `import { createSlice, configureStore } from "@reduxjs/toolkit";

const compteurSlice = createSlice({
  name: "compteur",
  initialState: { valeur: 0 },
  reducers: {
    incrementer: function (etat) {
      etat.valeur += 1;
    }
  }
});

const store = configureStore({
  reducer: { compteur: compteurSlice.reducer }
});

store.dispatch(compteurSlice.actions.incrementer());
console.log(store.getState().compteur.valeur);`, mustContain: ["dispatch", "actions.incrementer"], expectedOutput: "1", hint: "Le créateur d’actions vit dans « actions » (au pluriel), et il doit être envoyé.", explanation: "D’abord compteurSlice.action doit s’écrire compteurSlice.actions (au pluriel, c’est le nom généré par createSlice). Ensuite, fabriquer l’action ne suffit pas : il faut la transmettre au store avec store.dispatch(...). Sans cela, le reducer ne s’exécute jamais et la valeur reste 0." },
        { id: 'm14-l04-e3', type: 'fill', difficulty: 'intermédiaire', question: "Le state ne peut pas être modifié directement : on envoie une ___ au store pour décrire le changement.", accepted: ["action", "les actions"], hint: "Objet contenant un type.", explanation: "L’action est le message décrivant l’événement (type, payload). C’est elle qui déclenche le passage du reducer, d’où le nom du pattern « Flux d’actions »." },
      ],
    },
    {
      id: 'm14-l05',
      title: "Introduction à Zustand",
      minutes: 8,
      objectives: [
        "Créer un store avec Zustand",
        "Lire et modifier l’état depuis un composant",
        "Comparer Zustand et Redux Toolkit",
      ],
      blocks: [
        { type: 'p', text: "Redux Toolkit reste une solution complète, mais parfois lourde pour un projet moyen : un Provider, des slices, des imports multiples. Zustand est une bibliothèque d’état global minimaliste qui tient en quelques lignes." },
        { type: 'h', text: 'Explication simple' },
        { type: 'p', text: "Zustand crée un store avec la fonction create(). Ce store expose deux choses : getState() pour lire l’état hors composant, et un hook (commençant par use) à appeler dans les composants React. Pas de Provider à imbriquer : n’importe quel composant importe le hook et s’abonne automatiquement. Les mises à jour se font avec set(), qui remplace une partie de l’état." },
        { type: 'list', items: ["create() définit l’état initial et les fonctions de mise à jour.", "Le hook retourné s’usage comme un hook React : useMonStore((etat) => ...).", "getState() permet de lire ou d’appeler le store hors composant.", "set() remplace l’état, en général en renvoyant un nouvel objet.", "Aucun Provider, aucune configuration : c’est tout l’intérêt de Zustand."] },
        { type: 'code', lang: 'js', code: `import { create } from "zustand";

const useCompteur = create(function (set) {
  return {
    valeur: 0,
    incrementer: function () {
      set(function (etat) {
        return { valeur: etat.valeur + 1 };
      });
    }
  };
});

console.log(useCompteur.getState().valeur);
useCompteur.getState().incrementer();
console.log(useCompteur.getState().valeur);`, caption: "Un store Zustand minimal" },
        { type: 'list', items: ["Ligne 1 : `zustand` s’installe avec npm install zustand puis s’importe.", "Ligne 3 : `create` reçoit une fonction qui renvoie l’état initial et les actions.", "`set` est fourni par Zustand : il remplace l’état avec l’objet renvoyé.", "`getState()` lit l’état et déclenche les actions même hors d’un composant React.", "Dans un composant, on écrirait `const valeur = useCompteur((etat) => etat.valeur);`."] },
        { type: 'result', text: "La console affiche 0 puis 1 : l’action a bien modifié l’état du store." },
        { type: 'mistake', text: "Appeler le hook sans le nommer use… ni dans un composant : React signale une règle de hooks violée.", fix: "Dans les composants, appelez le hook retourné par create() comme useState." },
        { type: 'mistake', text: "Penser qu’un Provider est nécessaire autour de l’application.", fix: "Zustand n’a pas de Provider : chaque composant importe directement le hook." },
        { type: 'quote', text: "Résumé : Zustand crée un store en quelques lignes, sans Provider, lu via un hook dans les composants et modifié avec set()." },
      ],
      exercises: [
        { id: 'm14-l05-e1', type: 'qcm', difficulty: 'facile', question: "Quel avantage principal de Zustand par rapport à Redux Toolkit ?", options: ["il ne nécessite pas de Provider et beaucoup moins de code", "il remplace React", "il gère le routage de l’application", "il est intégré à React par défaut"], answer: 0, explanation: "Zustand se limite au strict nécessaire : un create(), un hook, pas de Provider ni de boilerplate. Il ne remplace pas React, ne gère pas le routage et n’est pas inclus dans React : il s’installe comme une dépendance." },
        { id: 'm14-l05-e2', type: 'code', difficulty: 'intermédiaire', language: 'js', question: "Créez le store Zustand useTaches : tableau taches et action ajouter(tache) qui l’ajoute à la fin.", template: `import { create } from "zustand";

// votre store ici
`, solution: `import { create } from "zustand";

const useTaches = create(function (set) {
  return {
    taches: [],
    ajouter: function (tache) {
      set(function (etat) {
        return { taches: [...etat.taches, tache] };
      });
    }
  };
});`, mustContain: ["create", "set", "ajouter"], hint: "create reçoit set en argument ; l’action renvoie un nouvel objet partiel.", explanation: "create définit l’état initial taches = [] et l’action ajouter. Cette action utilise set avec un nouvel tableau construit par [...etat.taches, tache], ce qui remplace proprement la branche taches. Il manque soit la fonction set, soit la propriété taches, si l’une des deux n’est pas présente." },
        { id: 'm14-l05-e3', type: 'short', difficulty: 'facile', question: "Zustand a-t-il besoin d’un Provider autour de l’application ? Répondez par oui ou non.", accepted: ["non", "no"], explanation: "Non : le store Zustand est accessible partout via le hook importé, sans envelopper l’arbre d’components. C’est une différence majeure avec le Contexte React et Redux, qui exigent un Provider." },
      ],
    },
    {
      id: 'm14-l06',
      title: "Choisir une solution de gestion d'état",
      minutes: 8,
      objectives: [
        "Comparer useState, Context, Redux et Zustand",
        "Poser les bonnes questions avant d’installer",
        "Justifier un choix d’architecture",
      ],
      blocks: [
        { type: 'p', text: "Vous connaissez maintenant plusieurs outils. Le piège consiste à en installer un parce qu’il est populaire. Le bon réflexe : partir du besoin réel de votre application et choisir la solution la plus simple qui le couvre." },
        { type: 'h', text: 'Explication simple' },
        { type: 'p', text: "Quatre solutions se répondent. useState gère un état local, simple et suffisant dans la majorité des cas. Le Contexte React partage une donnée sans dépendance externe, mais ne fournit ni historique ni outillage. Redux Toolkit convient aux gros projets et aux équipes : état unique, actions traçables, middleware pour les requêtes asynchrones et les logs. Zustand offre un état global avec un minimum de code, idéal pour un projet moyen. En cas de doute, commencez simple : il est facile d’ajouter un store, beaucoup plus dur d’en retirer un." },
        { type: 'list', items: ["useState : un état local, aucun partage nécessaire.", "Context : une donnée partagée par quelques composants proches.", "Redux Toolkit : de nombreux composants, actions à tracer, équipe nombreuse.", "Zustand : état global, mais projet qui veut rester léger.", "Question de départ : combien de composants partagent la donnée, et à quelle fréquence change-t-elle ?"] },
        { type: 'code', lang: 'js', code: `function choisirSolution(partage, complexite) {
  if (!partage) {
    return "useState local";
  }
  if (complexite === "haute") {
    return "Redux Toolkit";
  }
  return "Context ou Zustand";
}

console.log(choisirSolution(false, "basse"));
console.log(choisirSolution(true, "haute"));
console.log(choisirSolution(true, "moyenne"));`, caption: "Une petite aide à la décision" },
        { type: 'list', items: ["Ligne 1 : la fonction reprend les deux questions à se poser.", "`!partage` : si personne d’autre n’a besoin de la donnée, useState suffit.", "`complexite === \"haute\"` : beaucoup d’actions et d’acteurs → Redux Toolkit.", "Sinon, un outil léger (Context ou Zustand) répond au besoin.", "Chaque appel affiche la solution recommandée pour un cas de figure."] },
        { type: 'result', text: 'La console affiche : « useState local », puis « Redux Toolkit », puis « Context ou Zustand ».' },
        { type: 'mistake', text: "Installer Redux dès la première ligne d’un petit projet.", fix: "Attendre que le partage d’état devienne réellement douloureux avant d’ajouter une dépendance." },
        { type: 'mistake', text: "Choisir une solution parce qu’elle est populaire, pas parce qu’elle répond au besoin.", fix: "Lister d’abord les composants qui partagent la donnée et la fréquence des changements." },
        { type: 'quote', text: "Résumé : useState pour le local, Context pour un partage simple, Zustand pour un global léger, Redux Toolkit pour un projet complexe et traçable." },
      ],
      exercises: [
        { id: 'm14-l06-e1', type: 'qcm', difficulty: 'intermédiaire', question: "Dans quels cas installe-t-on plutôt une solution d’état global comme Redux ?", options: ["un compteur utilisé dans un seul composant", "un panier partagé entre de nombreux composants, avec un historique des actions", "une variable locale pour ouvrir ou fermer un menu", "un thème modifié par deux composants proches"], answer: [1], explanation: "Seul le panier justifie un store : beaucoup de composants éloignés partagent la donnée et on veut tracer les actions. Un compteur ou un menu relèvent de useState ; un thème modifié par deux composants proches se gère avec un Contexte. Toutes les autres propositions conduiraient à une surcharge inutile." },
        { id: 'm14-l06-e2', type: 'fill', difficulty: 'facile', question: "Pour un état local, on utilise par défaut le hook ___.", accepted: ["usestate", "use state"], hint: "Hook d’état vu dès le début du cours.", explanation: "useState conserve l’état dans le composant qui l’utilise : c’est l’outil le plus simple dès que la donnée n’est pas partagée. Context et les stores ne deviennent nécessaires qu’au-delà." },
        { id: 'm14-l06-e3', type: 'short', difficulty: 'intermédiaire', question: "Parmi Redux Toolkit et Zustand, quelle solution est réputée la plus légère ?", accepted: ["zustand"], hint: "Elle ne demande ni Provider ni configuration.", explanation: "Zustand se limite à un create() et un hook, sans Provider ni boilerplate : c’est la solution légère. Redux Toolkit, plus complet (slices, middleware, outillage d’équipe), pèse davantage en code et en apprentissage." },
      ],
    },
  ],
};
