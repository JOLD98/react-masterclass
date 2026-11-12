import type { Module } from '../types';

export const module13: Module = {
  id: 'm13',
  number: 13,
  icon: '📡',
  level: 'Intermédiaire avancé',
  title: "API et requêtes HTTP",
  description: "Récupérez et affichez des données distantes avec fetch, async/await et Axios.",
  lessons: [
    {
      id: 'm13-l01',
      title: "Comprendre les API",
      minutes: 7,
      objectives: [
        "Définir une API en une phrase",
        "Distinguer une API d’un site web",
        "Reconnaître un endpoint et une réponse JSON",
      ],
      blocks: [
        { type: 'p', text: "Vous commandez un repas depuis votre téléphone : l’application affiche le menu, vous choisissez, et quelques minutes plus tard le restaurant reçoit votre commande. Entre votre écran et le restaurant, quelqu’un a fait le lien. Sur le web, ce lien s’appelle une API." },
        { type: 'h', text: 'Explication simple' },
        { type: 'p', text: "API est l’acronyme de Application Programming Interface, soit « interface de programmation » en français. Une API est un service qui met en relation deux programmes : celui qui demande des données (votre application React) et celui qui les possède (le serveur). Concrètement, c’est une adresse à laquelle vous envoyez une requête et qui renvoie une réponse : la météo d’une application, les scores d’un match ou les prix d’une crypto-monnaie viennent tous d’une API." },
        { type: 'list', items: ["Une API n’est pas un site web : elle renvoie des données, pas une page à afficher.", "Le plus souvent elle parle HTTP, le protocole des pages web, et répond au format JSON.", "L’adresse à laquelle on s’adresse s’appelle un endpoint (ou point d’accès).", "API REST : le style le plus courant, où chaque ressource a son adresse, par exemple /users ou /users/1."] },
        { type: 'code', lang: 'json', code: `{
  "id": 1,
  "nom": "Ada Lovelace",
  "email": "ada@example.com"
}`, caption: "Réponse typique d’une API REST" },
        { type: 'list', items: ["Ligne 1 : `{` ouvre l’objet JSON, le format de données échangé par les API.", "`\"id\": 1` : une paire clé/valeur, ici l’identifiant de l’utilisateur.", "`\"nom\": \"Ada Lovelace\"` : les guillemets doubles sont obligatoires autour des textes.", "Ligne 5 : `}` ferme l’objet, la réponse est terminée."] },
        { type: 'result', text: "À l’écran : les données de l’utilisateur 1, prêtes à être affichées dans un composant React." },
        { type: 'mistake', text: "Confondre une API avec un site web : on s’attend à recevoir une page HTML complète.", fix: "Demandez-vous si la réponse est destinée à un être humain (page) ou à votre programme (données)." },
        { type: 'mistake', text: "Penser qu’une API est une base de données : votre application ne parle jamais directement à la base.", fix: "Votre application interroge l’API, et c’est elle qui interroge la base de données." },
        { type: 'quote', text: "Résumé : une API est un service qui expose des données à d’autres programmes, généralement via HTTP et au format JSON." },
      ],
      exercises: [
        { id: 'm13-l01-e1', type: 'qcm', difficulty: 'facile', question: "Une API est…", options: ["un langage de programmation", "un service qui permet à deux programmes d’échanger des données", "un type de base de données", "un composant React"], answer: 1, explanation: "API signifie Application Programming Interface : c’est une interface, donc un intermédiaire entre deux programmes. Ce n’est ni un langage (HTML, JavaScript le sont), ni une base de données (MySQL l’est), ni un composant React." },
        { id: 'm13-l01-e2', type: 'short', difficulty: 'facile', question: "Quel format de données une API web renvoie-t-elle le plus souvent ?", accepted: ["json"], explanation: "JSON est le format texte standard du web : il est lisible par tous les langages et se convertit facilement en objet JavaScript avec JSON.parse()." },
        { id: 'm13-l01-e3', type: 'fill', difficulty: 'intermédiaire', question: "Dans l’URL https://api.exemple.com/utilisateurs/7, la partie /utilisateurs/7 désigne un ___ de l’API.", accepted: ["endpoint", "endpoints"], hint: "C’est le mot anglais pour « point d’accès ».", explanation: "Un endpoint est l’adresse précise d’une ressource de l’API. /utilisateurs/7 désigne l’utilisateur numéro 7 : c’est bien un endpoint. Ce n’est ni une méthode HTTP, ni un format de données." },
      ],
    },
    {
      id: 'm13-l02',
      title: "HTTP et JSON",
      minutes: 8,
      objectives: [
        "Expliquer le rôle du protocole HTTP",
        "Connaître les méthodes et codes de réponse principaux",
        "Convertir du JSON en objet JavaScript et l’inverse",
      ],
      blocks: [
        { type: 'p', text: "Quand vous cliquez sur un lien, votre navigateur envoie une requête au serveur et reçoit une réponse. Ce va-et-vient suit des règles précises : c’est HTTP. Et les données qui voyagent dans ces réponses sont écrites dans un format texte appelé JSON." },
        { type: 'h', text: 'Explication simple' },
        { type: 'p', text: "HTTP (HyperText Transfer Protocol) est le langage que navigateurs et serveurs utilisent pour se parler : une requête HTTP demande quelque chose, la réponse HTTP le renvoie accompagnée d’un code d’état qui indique si tout s’est bien passé. JSON (JavaScript Object Notation) est le format des données qui voyage dans ces réponses : il ressemble à un objet JavaScript mais est écrit sous forme de texte, ce qui permet à n’importe quel langage de le lire." },
        { type: 'list', items: ["Les méthodes principales : GET (lire), POST (créer), PUT ou PATCH (modifier), DELETE (supprimer).", "Les codes de réponse : 200 = OK, 201 = créé, 404 = introuvable, 500 = erreur du serveur.", "En JSON, les clés et les textes sont toujours entre guillemets doubles.", "JSON.parse() convertit du texte en objet, JSON.stringify() convertit un objet en texte."] },
        { type: 'code', lang: 'js', code: `const texte = '{"ville": "Lyon", "habitants": 520000}';
const objet = JSON.parse(texte);
console.log(objet.ville);

const retour = JSON.stringify(objet);
console.log(retour);`, caption: "Convertir du JSON en objet JavaScript, puis l’inverse" },
        { type: 'list', items: ["Ligne 1 : `texte` contient une chaîne JSON, du texte brut, pas encore un objet.", "Ligne 2 : `JSON.parse()` transforme ce texte en objet JavaScript utilisable.", "Ligne 3 : `objet.ville` accède à une propriété, comme sur n’importe quel objet.", "Ligne 5 : `JSON.stringify()` fait l’opération inverse : c’est indispensable pour envoyer des données à une API.", "Ligne 6 : la conversion conserve les clés et les valeurs à l’identique."] },
        { type: 'result', text: 'La console affiche « Lyon » puis « {"ville":"Lyon","habitants":520000} ».' },
        { type: 'mistake', text: "Confondre JSON et JavaScript : le texte {\"ville\": \"Lyon\"} est du JSON, pas du code exécutable.", fix: "JSON = texte d’échange, objet JavaScript = données en mémoire. On passe de l’un à l’autre avec JSON.parse() et JSON.stringify()." },
        { type: 'mistake', text: "Écrire du JSON avec des guillemets simples : {'ville': 'Lyon'} est invalide.", fix: "Dans le JSON, les clés et les chaînes sont obligatoirement entre guillemets doubles." },
        { type: 'quote', text: "Résumé : HTTP définit comment on demande et on reçoit des données (méthodes et codes), JSON définit leur format textuel." },
      ],
      exercises: [
        { id: 'm13-l02-e1', type: 'qcm', difficulty: 'facile', question: "Quel code HTTP indique que la requête a abouti ?", options: ["404", "500", "200", "403"], answer: 2, explanation: "200 signifie OK : la requête a réussi. 404 veut dire ressource introuvable, 500 une erreur côté serveur et 403 un accès refusé : ce sont des codes d’échec." },
        { id: 'm13-l02-e2', type: 'fill', difficulty: 'facile', question: "Le format texte utilisé pour échanger les données avec une API s’appelle ___.", accepted: ["json"], explanation: "JSON est le format standard échangé entre une application et une API : il se convertit en objet JavaScript grâce à JSON.parse()." },
        { id: 'm13-l02-e3', type: 'code', difficulty: 'intermédiaire', language: 'js', question: "Convertissez l’objet produit en texte JSON, affichez-le, puis reconvertissez ce texte en objet et affichez le prix.", template: `const produit = { nom: "Casque", prix: 59 };
// votre code ici
`, solution: `const produit = { nom: "Casque", prix: 59 };
const texte = JSON.stringify(produit);
console.log(texte);
const copie = JSON.parse(texte);
console.log(copie.prix);`, mustContain: ["JSON.stringify", "JSON.parse"], expectedOutput: '{"nom":"Casque","prix":59}\n59', hint: "Deux méthodes : une pour objet → texte, l’autre pour texte → objet.", explanation: "JSON.stringify(produit) produit le texte {\"nom\":\"Casque\",\"prix\":59}, affiché par le premier console.log. JSON.parse() reconstruit un objet, dont copie.prix vaut 59, affiché par le second console.log." },
      ],
    },
    {
      id: 'm13-l03',
      title: "fetch()",
      minutes: 8,
      objectives: [
        "Écrire une requête avec fetch()",
        "Comprendre le mécanisme des promesses et des .then()",
        "Convertir la réponse d’une API en objet JavaScript",
      ],
      blocks: [
        { type: 'p', text: "Vous savez maintenant ce qu’est une API et ce qui voyage dedans. Il reste une étape : envoyer la requête depuis votre code JavaScript. Pour cela, le navigateur met à disposition une fonction toute simple : fetch()." },
        { type: 'h', text: 'Explication simple' },
        { type: 'p', text: "fetch() envoie une requête HTTP vers l’adresse que vous indiquez et renvoie une promesse (Promise) : un objet qui représente un résultat à venir, comme un ticket de caisse qui promet un plat plus tard. Comme la requête prend du temps, on ne peut pas lire la réponse immédiatement : on s’abonne au résultat avec la méthode .then(). La première réponse reçue n’est pas encore le JSON : il faut la convertir avec .json(), d’où un second .then()." },
        { type: 'list', items: ["fetch(url) envoie par défaut une requête GET.", "La promesse se résout quand la réponse du serveur arrive.", "reponse.json() convertit le corps de la réponse en objet JavaScript.", "Les deux .then() s’enchaînent : le second reçoit ce que le premier renvoie."] },
        { type: 'code', lang: 'js', code: `fetch("https://jsonplaceholder.typicode.com/todos/1")
  .then((reponse) => reponse.json())
  .then((donnees) => {
    console.log(donnees.title);
  });`, caption: "Première requête vers une API publique" },
        { type: 'list', items: ["Ligne 1 : `fetch()` envoie la requête GET vers l’adresse indiquée.", "Ligne 2 : la première `.then()` reçoit la réponse HTTP et appelle `.json()` pour la convertir.", "Ligne 3 : la deuxième `.then()` reçoit l’objet converti, c’est-à-dire le résultat du `.then()` précédent.", "Ligne 4 : `donnees.title` lit le champ `title` de la tâche renvoyée par l’API.", "Chaque `.then()` attend la promesse de la ligne précédente : les deux s’enchaînent automatiquement."] },
        { type: 'result', text: 'La console affiche le titre de la tâche, par exemple « delectus aut autem ».' },
        { type: 'mistake', text: "S’arrêter après le premier .then() : on affiche alors l’objet de réponse, pas le contenu de l’API.", fix: "Ajouter un second .then() qui appelle reponse.json() pour obtenir les données." },
        { type: 'mistake', text: "Oublier que fetch ne signale pas une erreur 404 : le .then() s’exécute quand même.", fix: "Vérifier reponse.ok avant de convertir la réponse (voir la leçon sur les erreurs)." },
        { type: 'quote', text: "Résumé : fetch() envoie la requête et renvoie une promesse ; deux .then() permettent de convertir la réponse puis d’utiliser les données." },
      ],
      exercises: [
        { id: 'm13-l03-e1', type: 'qcm', difficulty: 'facile', question: "Que renvoie immédiatement l’appel fetch(...) ?", options: ["les données JSON déjà converties", "une promesse qui sera résolue plus tard", "un tableau d’objets", "une erreur si le serveur est lent"], answer: 1, explanation: "fetch() est asynchrone : il renvoie une promesse (Promise), jamais les données directement. Les données n’arrivent qu’après le .then() ou l’await. Un tableau n’apparaît que si l’API renvoie une liste, et un serveur lent ne déclenche pas d’erreur immédiate." },
        { id: 'm13-l03-e2', type: 'short', difficulty: 'facile', question: "Avec quelle méthode convertit-on la réponse de fetch en objet JavaScript ?", accepted: ["json", "reponse.json", "response.json"], hint: "Il faut appeler cette méthode sur l’objet reponse.", explanation: "reponse.json() renvoie une promesse résolue avec le contenu converti. Ce n’est ni reponse.body (texte brut), ni JSON.parse() (qui s’applique à une chaîne déjà obtenue)." },
        { id: 'm13-l03-e3', type: 'code', difficulty: 'intermédiaire', language: 'js', question: "L’objet reponse simulé ci-dessous possède une méthode json(). Enchaînez .then() pour afficher la ville « Lyon ».", template: `const reponse = {
  json: function () {
    return Promise.resolve({ ville: "Lyon", pays: "France" });
  }
};

// votre code ici
`, solution: `const reponse = {
  json: function () {
    return Promise.resolve({ ville: "Lyon", pays: "France" });
  }
};

reponse.json().then((donnees) => {
  console.log(donnees.ville);
});`, mustContain: [".then", "ville"], expectedOutput: "Lyon", hint: "reponse.json() renvoie une promesse : on peut y accrocher .then().", explanation: "reponse.json() renvoie une promesse résolue avec l’objet {ville: \"Lyon\", ...} ; le .then() reçoit donc donnees et donnees.ville vaut « Lyon ». Sans .then(), on afficherait une promesse et non la chaîne « Lyon »." },
      ],
    },
    {
      id: 'm13-l04',
      title: "async/await",
      minutes: 9,
      objectives: [
        "Décrire le rôle de async et de await",
        "Réécrire une chaîne de .then() en async/await",
        "Protéger une requête avec try/catch",
      ],
      blocks: [
        { type: 'p', text: "Quand plusieurs requêtes s’enchaînent, les .then() s’empilent et le code devient difficile à lire. JavaScript propose une autre écriture, plus proche du code classique : async et await." },
        { type: 'h', text: 'Explication simple' },
        { type: 'p', text: "Écrire async devant une fonction signale qu’elle travaille de façon asynchrone et qu’elle renverra une promesse. À l’intérieur, le mot-clé await met l’exécution en pause devant chaque promesse jusqu’à ce qu’elle soit résolue : la ligne suivante dispose alors de la valeur, comme si rien ne s’était interrompu. Les erreurs se gèrent avec try/catch, exactement comme dans un script JavaScript classique." },
        { type: 'list', items: ["async se place juste avant le mot function ou la définition d’une flèche.", "await s’utilise uniquement à l’intérieur d’une fonction async.", "await attend une promesse : reponse puis reponse.json().", "try/catch attrape les erreurs réseau ou de conversion."] },
        { type: 'code', lang: 'js', code: `async function chargerTodo() {
  try {
    const reponse = await fetch("https://jsonplaceholder.typicode.com/todos/1");
    const donnees = await reponse.json();
    console.log(donnees.title);
  } catch (erreur) {
    console.log("Erreur : " + erreur.message);
  }
}

chargerTodo();`, caption: "fetch() réécrit avec async/await" },
        { type: 'list', items: ["Ligne 1 : `async` avant `function` autorise l’usage de `await`.", "Ligne 3 : `await fetch(...)` attend la réponse du serveur avant de continuer.", "Ligne 4 : `await reponse.json()` attend la conversion en objet.", "Ligne 5 : `donnees.title` s’utilise comme une donnée normale, déjà disponible.", "Lignes 6 à 8 : `catch` attrape tout problème (réseau coupé, URL fausse) et affiche le message."] },
        { type: 'result', text: 'La console affiche le titre de la tâche ; si le réseau est coupé, elle affiche « Erreur : ... ».' },
        { type: 'mistake', text: "Utiliser await dans une fonction classique : JavaScript signale une erreur.", fix: "Préfixer la fonction par async avant d’utiliser await." },
        { type: 'mistake', text: "Oublier await : la variable contient une promesse, pas la donnée attendue.", fix: "Placer await juste devant chaque promesse dont on a besoin." },
        { type: 'quote', text: "Résumé : async déclare une fonction asynchrone, await met en pause l’exécution jusqu’au résultat d’une promesse, et try/catch protège la requête." },
      ],
      exercises: [
        { id: 'm13-l04-e1', type: 'qcm', difficulty: 'facile', question: "Où peut-on utiliser await ?", options: ["n’importe où dans le code", "uniquement dans une fonction marquée async", "uniquement dans un composant React", "uniquement après un .then()"], answer: 1, explanation: "await n’est valide que dans une fonction async (ou au niveau supérieur d’un module ES, que l’on évite ici). Ailleurs, JavaScript lève une erreur de syntaxe. Un composant React n’est pas requis, et .then() est une alternative à await, pas une condition." },
        { id: 'm13-l04-e2', type: 'debug', difficulty: 'intermédiaire', language: 'js', question: "Ce code doit afficher « Ville : Lyon ». Trouvez les erreurs (fonction non asynchrone et await manquant) et corrigez-le.", template: `async function chargerVille() {
  const promesse = Promise.resolve("Lyon");
  return await promesse;
}

function afficherVille() {
  const ville = chargerVille();
  console.log("Ville : " + ville);
}

afficherVille();
`, solution: `async function chargerVille() {
  const promesse = Promise.resolve("Lyon");
  return await promesse;
}

async function afficherVille() {
  const ville = await chargerVille();
  console.log("Ville : " + ville);
}

afficherVille();`, mustContain: ["async function afficherVille", "await chargerVille"], expectedOutput: "Ville : Lyon", hint: "chargerVille() renvoie une promesse : que faut-il placer devant l’appel ?", explanation: "chargerVille() est async, donc son appel renvoie une promesse. Sans await, ville contient cette promesse et la concatenation affiche « Ville : [object Promise] ». En marquant afficherVille en async et en plaçant await devant l’appel, ville vaut « Lyon » et la sortie attendue s’affiche." },
        { id: 'm13-l04-e3', type: 'short', difficulty: 'facile', question: "Quel mot-clé transforme une fonction en fonction asynchrone ?", accepted: ["async"], explanation: "async se place devant function et indique que la fonction renverra une promesse ; c’est lui qui autorise l’usage de await à l’intérieur." },
      ],
    },
    {
      id: 'm13-l05',
      title: "useEffect avec une API",
      minutes: 9,
      objectives: [
        "Déclencher une requête au montage d’un composant",
        "Stocker les données reçues avec useState",
        "Comprendre le tableau des dépendances",
      ],
      blocks: [
        { type: 'p', text: "Un composant React qui doit afficher des données distantes a besoin de les récupérer au moment où il apparaît à l’écran, puis de se mettre à jour dès qu’elles arrivent. C’est le rôle du hook useEffect, déjà vu avec les hooks : ici, on l’allie à une requête API." },
        { type: 'h', text: 'Explication simple' },
        { type: 'p', text: "Au montage du composant, useEffect déclenche la requête. Quand les données arrivent, on les stocke dans un état avec setUtilisateur : React réaffiche alors automatiquement le composant. Le second argument de useEffect, un tableau, liste les valeurs qui déclenchent à nouveau l’effet ; avec un tableau vide, l’effet ne se produit qu’une seule fois, au montage." },
        { type: 'list', items: ["useState(null) : les données n’existent pas encore au début.", "useEffect(..., []) : exécution unique au montage du composant.", "setUtilisateur(donnees) met à jour l’état et déclenche un nouveau rendu.", "On n’oublie pas d’afficher un état intermédiaire tant que les données ne sont pas là."] },
        { type: 'code', lang: 'jsx', code: `import { useState, useEffect } from "react";

function App() {
  const [utilisateur, setUtilisateur] = useState(null);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users/1")
      .then((reponse) => reponse.json())
      .then((donnees) => setUtilisateur(donnees));
  }, []);

  if (!utilisateur) {
    return <p>Chargement…</p>;
  }

  return <h1>{utilisateur.name}</h1>;
}`, caption: "Charger un utilisateur au montage du composant" },
        { type: 'list', items: ["Ligne 1 : `useState` et `useEffect` sont importés depuis React.", "Ligne 4 : `useState(null)` : l’utilisateur est inconnu au départ.", "Ligne 6 : `useEffect` déclenche la requête une seule fois, grâce au tableau vide de la ligne 11.", "Ligne 10 : `setUtilisateur(donnees)` enregistre les données et provoque un nouveau rendu.", "Ligne 13 : sans données, on affiche un message d’attente pour éviter un écran vide.", "Ligne 16 : une fois l’état rempli, le composant affiche le nom reçu de l’API."] },
        { type: 'result', text: 'À l’écran : d’abord « Chargement… », puis le titre « Leanne Graham ».' },
        { type: 'mistake', text: "Oublier le tableau des dépendances : l’effet se relance à chaque rendu et la requête part en boucle infinie.", fix: "Placer [] après la fonction de l’effet quand la requête ne doit partir qu’une fois." },
        { type: 'mistake', text: "Modifier l’état en dehors de useEffect ou directement pendant le rendu.", fix: "Ne modifier l’état qu’après la requête, dans le .then() de l’effet." },
        { type: 'quote', text: "Résumé : useEffect déclenche la requête au montage, useState stocke la réponse, et React réaffiche le composant automatiquement." },
      ],
      exercises: [
        { id: 'm13-l05-e1', type: 'qcm', difficulty: 'facile', question: "Pourquoi écrit-on useEffect(..., []) ?", options: ["pour que l’effet ne se déclenche qu’une fois, au montage", "pour limiter la taille de la requête", "pour débloquer fetch", "pour réinitialiser l’état"], answer: 0, explanation: "Le tableau vide signifie « aucune dépendance » : l’effet s’exécute donc une seule fois, au montage du composant. Les autres réponses n’ont aucun lien avec la sémantique de ce tableau." },
        { id: 'm13-l05-e2', type: 'code', difficulty: 'intermédiaire', language: 'jsx', question: "Créez le composant App : état animaux, remplissage via recupererAnimaux() dans un useEffect au montage, puis liste des noms dans un ul.", template: `function recupererAnimaux() {
  return Promise.resolve([{ nom: "Luna" }, { nom: "Rex" }]);
}

function App() {
  // votre code ici
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);`, solution: `import { useState, useEffect } from "react";

function recupererAnimaux() {
  return Promise.resolve([{ nom: "Luna" }, { nom: "Rex" }]);
}

function App() {
  const [animaux, setAnimaux] = useState([]);

  useEffect(() => {
    recupererAnimaux().then((donnees) => setAnimaux(donnees));
  }, []);

  return (
    <ul>
      {animaux.map((animal) => (
        <li key={animal.nom}>{animal.nom}</li>
      ))}
    </ul>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);`, mustContain: ["useEffect", "setAnimaux", "map"], hint: "useState pour les données, useEffect avec [] pour l’appel, map pour l’affichage.", explanation: "useState([]) stocke la liste, useEffect(..., []) appelle recupererAnimaux() une fois au montage puis setAnimaux() enregistre le résultat, et map transforme chaque animal en élément <li>. Sans useEffect, la promesse ne serait jamais résolue ; sans état, le rendu ne se mettrait pas à jour." },
        { id: 'm13-l05-e3', type: 'debug', difficulty: 'avancé', language: 'jsx', question: "Ce composant tourne en boucle et plante à l’affichage. Trouvez les deux erreurs (dépendances manquantes et objet affiché comme enfant React) et corrigez-le.", template: `function App() {
  const [nombre, setNombre] = useState(0);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos/1")
      .then((reponse) => reponse.json())
      .then((donnees) => setNombre(donnees));
  });

  return <p>{nombre}</p>;
}`, solution: `function App() {
  const [nombre, setNombre] = useState(0);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos/1")
      .then((reponse) => reponse.json())
      .then((donnees) => setNombre(donnees.id));
  }, []);

  return <p>{nombre}</p>;
}`, mustContain: ["donnees.id", "[]"], hint: "Deux problèmes : un qui relance l’effet en permanence, un qui affiche un objet.", explanation: "Le tableau de dépendances manquant relance l’effet à chaque rendu, donc la requête part en boucle infinie : on ajoute []. Et setNombre(donnees) stocke un objet, que React ne peut pas afficher comme enfant : on stocke donnees.id, un nombre." },
      ],
    },
    {
      id: 'm13-l06',
      title: "Axios",
      minutes: 8,
      objectives: [
        "Installer et appeler Axios",
        "Comparer Axios et fetch()",
        "Lire les données dans reponse.data",
      ],
      blocks: [
        { type: 'p', text: "fetch() fait le travail, mais il reste à écrire deux .then(), à vérifier reponse.ok soi-même, à convertir les erreurs… Axios est une bibliothèque externe qui simplifie tout cela en une API unique et cohérente." },
        { type: 'h', text: 'Explication simple' },
        { type: 'p', text: "Axios est une bibliothèque JavaScript qui envoie des requêtes HTTP, comme fetch, mais avec plus de confort : la réponse est déjà convertie en objet dans reponse.data, les erreurs HTTP (404, 500) déclenchent automatiquement le catch, et les paramètres d’URL se déclarent proprement. Elle s’installe avec npm et s’importe comme n’importe quel paquet." },
        { type: 'list', items: ["Installation : npm install axios.", "axios.get(url) renvoie une promesse, comme fetch.", "Les données se lisent dans reponse.data (et non reponse.json()).", "Les erreurs HTTP sont rejetées dans le catch : pas de vérification reponse.ok à écrire."] },
        { type: 'code', lang: 'js', code: `import axios from "axios";

async function chargerTodo() {
  try {
    const reponse = await axios.get("https://jsonplaceholder.typicode.com/todos/1");
    console.log(reponse.data.title);
  } catch (erreur) {
    console.log("Erreur : " + erreur.message);
  }
}

chargerTodo();`, caption: "Une requête GET avec Axios" },
        { type: 'list', items: ["Ligne 1 : `axios` doit être installé puis importé avant toute utilisation.", "Ligne 3 : la fonction est `async` pour autoriser `await`.", "Ligne 5 : `axios.get()` envoie la requête et attend la réponse.", "Ligne 6 : `reponse.data` contient déjà l’objet JavaScript converti.", "Lignes 7 à 9 : un code d’erreur ou un problème réseau tombe dans le `catch` sans vérification supplémentaire."] },
        { type: 'result', text: 'La console affiche le titre de la tâche, par exemple « delectus aut autem ».' },
        { type: 'mistake', text: "Appeler reponse.json() sur une réponse Axios : la méthode n’existe pas.", fix: "Avec Axios, les données sont déjà dans reponse.data, converties automatiquement." },
        { type: 'mistake', text: "Utiliser axios.get() sans l’avoir installé : le module n’est pas trouvé.", fix: "Exécuter npm install axios puis importer le paquet." },
        { type: 'quote', text: "Résumé : Axios est une alternative à fetch plus concise : reponse.data contient les données et les erreurs HTTP déclenchent directement le catch." },
      ],
      exercises: [
        { id: 'm13-l06-e1', type: 'qcm', difficulty: 'facile', question: "Où se trouvent les données d’une réponse Axios ?", options: ["reponse.data", "reponse.json()", "reponse.body", "reponse.content"], answer: 0, explanation: "Axios convertit la réponse automatiquement : les données sont dans reponse.data. reponse.json() est la méthode de fetch(), reponse.body est l’objet brut de l’API Fetch et reponse.content n’existe pas." },
        { id: 'm13-l06-e2', type: 'short', difficulty: 'facile', question: "Quelle commande installe Axios dans un projet ?", accepted: ["npm install axios", "npm i axios"], hint: "npm + un verbe d’installation + le nom du paquet.", explanation: "npm install axios (ou npm i axios) ajoute la bibliothèque dans node_modules et dans package.json. Ce n’est ni yarn ni un import : l’installation précède l’import." },
        { id: 'm13-l06-e3', type: 'code', difficulty: 'intermédiaire', language: 'js', question: "Une réponse Axios simulée est fournie. Écrivez la fonction titreDeLaReponse(reponse) qui renvoie le titre, puis affichez-le.", template: `const reponse = { data: { title: "Faire les courses" } };

// votre fonction ici

console.log(titreDeLaReponse(reponse));`, solution: `const reponse = { data: { title: "Faire les courses" } };

function titreDeLaReponse(reponse) {
  return reponse.data.title;
}

console.log(titreDeLaReponse(reponse));`, mustContain: ["data.title", "titreDeLaReponse"], expectedOutput: "Faire les courses", hint: "Avec Axios, on descend jusqu’à .data puis jusqu’au champ voulu.", explanation: "reponse.data.title descend jusqu’au titre : data est l’objet converti par Axios et title le champ demandé. Le console.log affiche donc « Faire les courses ». Lire directement reponse.title ou reponse.json() renverrait undefined ou une erreur." },
      ],
    },
    {
      id: 'm13-l07',
      title: "Chargement des données",
      minutes: 9,
      objectives: [
        "Représenter les trois états d’une requête",
        "Afficher un écran de chargement",
        "Éviter les rendus vides ou faux",
      ],
      blocks: [
        { type: 'p', text: "Une requête n’est pas instantanée : entre le clic et les données, il y a une fraction de seconde, parfois plusieurs secondes. Sans préparation, l’utilisateur voit un écran vide et pense que votre application est cassée. On gère alors explicitement le chargement." },
        { type: 'h', text: 'Explication simple' },
        { type: 'p', text: "Un écran qui récupère des données passe toujours par trois états : en cours de chargement, réussi (les données sont là), ou échoué. On stocke ces états dans un état React. Tant que la requête tourne, on affiche un message d’attente ; dès que les données arrivent, on les affiche ; si la promesse échoue, on montre un message d’erreur. Ce principe s’appelle la gestion des états de chargement." },
        { type: 'list', items: ["Un état boolean chargement initialisé à true.", "Les données reçues sont stockées dans un second état.", "Chargement passe à false quand la réponse arrive.", "On teste toujours l’état avant d’essayer d’afficher les données."] },
        { type: 'code', lang: 'jsx', code: `import { useState, useEffect } from "react";

function App() {
  const [villes, setVilles] = useState([]);
  const [chargement, setChargement] = useState(true);

  useEffect(() => {
    fetch("https://exemple.com/villes")
      .then((reponse) => reponse.json())
      .then((donnees) => {
        setVilles(donnees);
        setChargement(false);
      });
  }, []);

  if (chargement) {
    return <p>Chargement…</p>;
  }

  return (
    <ul>
      {villes.map((ville) => (
        <li key={ville}>{ville}</li>
      ))}
    </ul>
  );
}`, caption: "Écran de chargement puis liste des villes" },
        { type: 'list', items: ["Ligne 5 : `chargement` commence à `true` : la requête vient de partir.", "Lignes 8 à 13 : quand les données arrivent, on remplit la liste puis on passe `chargement` à false.", "Ligne 15 : tant que `chargement` est vrai, on renvoie un message d’attente et on s’arrête là.", "Ligne 19 : sinon, on parcourt `villes` avec `map` pour construire la liste."] },
        { type: 'result', text: 'À l’écran : d’abord « Chargement… », puis la liste des villes reçues.' },
        { type: 'mistake', text: "Oublier de passer chargement à false : l’écran d’attente reste affiché pour toujours.", fix: "Après avoir stocké les données, appelez setChargement(false)." },
        { type: 'mistake', text: "Afficher les données avant qu’elles arrivent : React tente de parcourir un tableau encore vide ou undefined.", fix: "Tester l’état de chargement avant le rendu des données." },
        { type: 'quote', text: "Résumé : chaque requête a trois états (chargement, succès, erreur) ; on les rend visibles pour que l’écran ne soit jamais vide." },
      ],
      exercises: [
        { id: 'm13-l07-e1', type: 'qcm', difficulty: 'facile', question: "Que voit l’utilisateur pendant que la requête est en cours ?", options: ["une erreur 404", "un message de chargement", "les données déjà remplies", "rien du tout, la page est blanche"], answer: 1, explanation: "Le bon réflexe est d’afficher un message de chargement tant que la promesse n’est pas résolue. Une page blanche donne l’impression d’un bug, et une erreur 404 n’a pas encore été détectée." },
        { id: 'm13-l07-e2', type: 'fill', difficulty: 'facile', question: "Pendant l’attente, on affiche souvent le message « ___… » (ou « Loading… » en anglais).", accepted: ["chargement", "loading"], explanation: "« Chargement » (ou « Loading ») est le message standard qui indique à l’utilisateur que la requête est en cours. Il disparaît dès que setChargement(false) est appelé." },
        { id: 'm13-l07-e3', type: 'code', difficulty: 'intermédiaire', language: 'jsx', question: "Complétez App : affichez « Chargement… » tant que la promesse n’est pas résolue, puis la liste des villes.", template: `function recupererVilles() {
  return Promise.resolve(["Lyon", "Paris", "Nantes"]);
}

function App() {
  // état chargement + useEffect + affichage conditionnel
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);`, solution: `import { useState, useEffect } from "react";

function recupererVilles() {
  return Promise.resolve(["Lyon", "Paris", "Nantes"]);
}

function App() {
  const [villes, setVilles] = useState([]);
  const [chargement, setChargement] = useState(true);

  useEffect(() => {
    recupererVilles().then((donnees) => {
      setVilles(donnees);
      setChargement(false);
    });
  }, []);

  if (chargement) {
    return <p>Chargement…</p>;
  }

  return (
    <ul>
      {villes.map((ville) => (
        <li key={ville}>{ville}</li>
      ))}
    </ul>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);`, mustContain: ["chargement", "map"], hint: "Deux états : la liste et le drapeau de chargement.", explanation: "Le drapeau chargement démarre à true, donc le message « Chargement… » s’affiche au premier rendu. Quand la promesse se résout, setVilles et setChargement(false) déclenchent un nouveau rendu qui affiche la liste via map. Sans drapeau, l’utilisateur verrait un ul vide pendant l’attente." },
      ],
    },
    {
      id: 'm13-l08',
      title: "Gestion des erreurs",
      minutes: 9,
      objectives: [
        "Prévoir les échecs d’une requête",
        "Utiliser try/catch et reponse.ok",
        "Afficher un message d’erreur lisible",
      ],
      blocks: [
        { type: 'p', text: "Réseau coupé, URL fausse, serveur en panne, identifiant inexistant : une requête peut échouer de bien des manières. Une application professionnelle ne montre jamais un écran blanc quand cela arrive : elle prévient l’utilisateur." },
        { type: 'h', text: 'Explication simple' },
        { type: 'p', text: "Deux pièges sont à connaître. D’abord, fetch() ne déclenche pas d’erreur quand le serveur répond 404 ou 500 : la promesse est résolue normalement, il faut donc vérifier reponse.ok soi-même. Ensuite, tout le reste (câble débranché, domaine inexistant) rejette la promesse : try/catch l’attrape. En pratique, on combine les deux pour afficher un message clair dans tous les cas." },
        { type: 'list', items: ["reponse.ok vaut true pour un code 2xx (succès).", "Un code 4xx ou 5xx laisse passer fetch : on lève alors nous-mêmes une erreur avec throw.", "try/catch attrape aussi les problèmes réseau.", "On affiche à l’écran un message simple, jamais la trace technique complète."] },
        { type: 'code', lang: 'js', code: `async function chargerUtilisateur(id) {
  try {
    const reponse = await fetch("https://jsonplaceholder.typicode.com/users/" + id);
    if (!reponse.ok) {
      throw new Error("Utilisateur introuvable (" + reponse.status + ")");
    }
    const donnees = await reponse.json();
    console.log(donnees.name);
  } catch (erreur) {
    console.log("Impossible de charger : " + erreur.message);
  }
}

chargerUtilisateur(1);`, caption: "Vérifier le code HTTP puis attraper l’erreur" },
        { type: 'list', items: ["Ligne 2 : `try` regroupe tout ce qui peut échouer.", "Ligne 4 : `if (!reponse.ok)` détecte les codes 4xx et 5xx que fetch laisse passer.", "Ligne 5 : `throw new Error(...)` déclenche le `catch` avec un message explicite.", "Ligne 7 : `donnees.name` ne s’exécute que si tout s’est bien passé.", "Lignes 8 à 10 : le `catch` recueille l’erreur et affiche un message compréhensible."] },
        { type: 'result', text: 'La console affiche le nom de l’utilisateur ; si l’identifiant n’existe pas, elle affiche « Impossible de charger : Utilisateur introuvable (404) ».' },
        { type: 'mistake', text: "Croire que fetch déclenche catch sur un 404 : la promesse est résolue, pas rejetée.", fix: "Vérifier reponse.ok et lancer une erreur soi-même avec throw." },
        { type: 'mistake', text: "Afficher la trace technique complète à l’utilisateur final.", fix: "Montrer un message court (« Réessayez plus tard ») et journaliser le détail en console." },
        { type: 'quote', text: "Résumé : vérifiez reponse.ok pour les erreurs HTTP, entourez la requête de try/catch pour le reste, et affichez toujours un message d’erreur à l’écran." },
      ],
      exercises: [
        { id: 'm13-l08-e1', type: 'qcm', difficulty: 'facile', question: "Que se passe-t-il quand fetch reçoit une réponse 404 ?", options: ["la promesse est rejetée automatiquement", "la promesse est résolue, il faut vérifier reponse.ok", "fetch déclenche une exception immédiate", "le navigateur bloque la page"], answer: 1, explanation: "fetch ne considère pas les codes HTTP comme des erreurs : il renvoie une réponse résolue, même pour 404 ou 500. C’est pourquoi on teste reponse.ok. Les autres options décrivent un comportement inexistant." },
        { id: 'm13-l08-e2', type: 'debug', difficulty: 'avancé', language: 'js', question: "Cette fonction ne protège ni les erreurs HTTP ni les problèmes réseau. Ajoutez try/catch et le contrôle de reponse.ok.", template: `async function chargerUtilisateur(id) {
  const reponse = await fetch("https://jsonplaceholder.typicode.com/users/" + id);
  const donnees = await reponse.json();
  console.log(donnees.name);
}

chargerUtilisateur(999);`, solution: `async function chargerUtilisateur(id) {
  try {
    const reponse = await fetch("https://jsonplaceholder.typicode.com/users/" + id);
    if (!reponse.ok) {
      throw new Error("Utilisateur introuvable (" + reponse.status + ")");
    }
    const donnees = await reponse.json();
    console.log(donnees.name);
  } catch (erreur) {
    console.log("Impossible de charger : " + erreur.message);
  }
}

chargerUtilisateur(999);`, mustContain: ["catch", "reponse.ok"], hint: "Deux manques : rien n’attrape les rejets, rien ne teste le code HTTP.", explanation: "Sans try/catch, un problème réseau provoque une promesse rejetée non traitée. Sans reponse.ok, un 404 passe inaperçu : donnees serait un objet vide et donnees.name afficherait undefined. Les deux correctifs couvrent les deux familles d’erreurs." },
        { id: 'm13-l08-e3', type: 'fill', difficulty: 'facile', question: "Le code HTTP ___ signifie « ressource introuvable ».", accepted: ["404"], explanation: "404 Not Found indique que la ressource demandée n’existe pas sur le serveur. 200 signifie succès, 500 une erreur interne du serveur et 403 un accès refusé." },
      ],
    },
    {
      id: 'm13-l09',
      title: "Affichage des données provenant d'une API",
      minutes: 10,
      objectives: [
        "Transformer une réponse JSON en interface",
        "Parcourir un tableau avec map et key",
        "Gérer l’absence de données",
      ],
      blocks: [
        { type: 'p', text: "Vous avez vos données : un tableau d’objets stocké dans un état. Reste la partie visible de l’application : les transformer en titres, en cartes, en listes. C’est ici que React est le plus agréable : une ligne de map suffit." },
        { type: 'h', text: 'Explication simple' },
        { type: 'p', text: "Le principe est toujours le même : on parcourt le tableau reçu de l’API avec la méthode map(), et pour chaque objet on renvoie un élément JSX. Chaque élément doit porter une prop key unique (l’id fourni par l’API est parfait pour cela), sinon React ne sait pas les identifier lors des mises à jour. Avant de mapper, on teste que les données sont présentes pour afficher un état de chargement ou un message vide." },
        { type: 'list', items: ["map() transforme chaque objet du tableau en élément JSX.", "key doit être une valeur unique, en général article.id.", "Les données n’arrivent pas au montage : on teste avant de parcourir.", "On affiche des champs lisibles (titre, prix…), pas l’objet brut."] },
        { type: 'code', lang: 'jsx', code: `import { useState, useEffect } from "react";

function App() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetch("https://exemple.com/articles")
      .then((reponse) => reponse.json())
      .then((donnees) => setArticles(donnees));
  }, []);

  if (articles.length === 0) {
    return <p>Aucun article pour le moment.</p>;
  }

  return (
    <ul>
      {articles.map((article) => (
        <li key={article.id}>
          {article.titre} — {article.vues} vues
        </li>
      ))}
    </ul>
  );
}`, caption: "Afficher une liste d’articles récupérée depuis une API" },
        { type: 'list', items: ["Ligne 4 : `articles` démarre sur un tableau vide, avant toute réponse.", "Lignes 6 à 10 : la requête remplit l’état dès que les données arrivent.", "Ligne 12 : le test vide évite un map sur un tableau sans contenu et affiche un message.", "Ligne 17 : `map` crée un `<li>` par article.", "`key={article.id}` donne à React une identité stable pour chaque ligne.", "`{article.titre}` insère le contenu de l’API dans le JSX."] },
        { type: 'result', text: 'À l’écran : « Aucun article pour le moment. » puis, une fois les données reçues, une liste « React — 120 vues », « Axios — 45 vues ».' },
        { type: 'mistake', text: "Oublier la prop key dans un map : React affiche un avertissement et les mises à jour deviennent instables.", fix: "Utiliser l’identifiant unique renvoyé par l’API : key={article.id}." },
        { type: 'mistake', text: "Parcourir les données avant leur arrivée : articles.map n’existe pas encore ou porte sur undefined.", fix: "Tester la longueur du tableau avant le map, sinon afficher l’état de chargement." },
        { type: 'quote', text: "Résumé : on stocke la réponse dans un état, on teste qu’elle est présente, puis map() la transforme en JSX avec une key unique." },
      ],
      exercises: [
        { id: 'm13-l09-e1', type: 'qcm', difficulty: 'facile', question: "À quoi sert la prop key dans un map React ?", options: ["à identifier chaque élément de la liste", "à styliser le composant", "à déclencher la requête", "à trier le tableau"], answer: 0, explanation: "key donne une identité stable à chaque élément, ce qui permet à React de savoir lequel a changé, été ajouté ou supprimé. Elle n’a aucun effet sur le style, les requêtes ou le tri." },
        { id: 'm13-l09-e2', type: 'fill', difficulty: 'facile', question: "On parcourt un tableau de données avec la méthode ___ de JavaScript.", accepted: ["map"], explanation: "map() renvoie un nouveau tableau en appliquant une transformation à chaque élément : dans React, cette transformation est la création d’un élément JSX." },
        { id: 'm13-l09-e3', type: 'code', difficulty: 'avancé', language: 'jsx', question: "Affichez les articles fournis : un li par article au format « Titre (N vues) », avec une key unique, et un message si le tableau est vide.", template: `const articles = [
  { id: 1, titre: "React", vues: 120 },
  { id: 2, titre: "Axios", vues: 45 }
];

function App() {
  // votre code ici
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);`, solution: `const articles = [
  { id: 1, titre: "React", vues: 120 },
  { id: 2, titre: "Axios", vues: 45 }
];

function App() {
  if (articles.length === 0) {
    return <p>Aucun article.</p>;
  }

  return (
    <ul>
      {articles.map((article) => (
        <li key={article.id}>
          {article.titre} ({article.vues} vues)
        </li>
      ))}
    </ul>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);`, mustContain: ["map", "key", "vues"], hint: "map sur le tableau, key sur le li, concaténation des champs dans le JSX.", explanation: "map construit un <li> par article, key={article.id} identifie chaque ligne et les interpolations {article.titre} et {article.vues} affichent les champs. Le test sur la longueur gère le cas d’un tableau vide. Sans key, React ne peut pas suivre les lignes ; sans map, seule la première apparaîtrait." },
        { id: 'm13-l09-e4', type: 'short', difficulty: 'intermédiaire', question: "Que faire à l’écran tant que les données de l’API ne sont pas arrivées ?", accepted: ["afficher un message de chargement", "afficher chargement", "afficher un etat de chargement"], hint: "On ne laisse jamais l’écran vide.", explanation: "Tant que l’état est vide, on affiche un message d’attente (« Chargement… ») : l’utilisateur comprend que l’application travaille. Un écran blanc ou un crash de map serait le signe d’un état non géré." },
      ],
    },
  ],
};
