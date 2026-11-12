import type { Module } from '../types';

export const module08: Module = {
  id: 'm08',
  number: 8,
  icon: '📋',
  level: 'Débutant confirmé',
  title: "Les listes et le rendu conditionnel",
  description: "Affichez des données dynamiques avec map(), filter() et des conditions.",
  lessons: [
    // ============================================================
    // Leçon 1 — Utiliser map()
    // ============================================================
    {
      id: 'm08-l01',
      title: "Utiliser map()",
      minutes: 8,
      objectives: [
        "Transformer un tableau en éléments JSX avec map()",
        "Comprendre que map() renvoie un nouveau tableau",
        "Afficher un tableau de chaînes sous forme de liste",
      ],
      blocks: [
        { type: 'p', text: "Votre page affiche les trois couleurs d'un drapeau. Demain, il y en aura trente. Écrire trente balises à la main n'est pas sérieux : il faut un moyen de répéter automatiquement la même balise pour chaque donnée. Ce moyen, c'est la méthode JavaScript map()." },
        { type: 'h', text: "Explication simple" },
        { type: 'p', text: "map() est une méthode des tableaux JavaScript : elle parcourt chaque élément, applique une fonction, et renvoie un nouveau tableau du même longueur. En React, on transforme chaque élément en JSX. React sait ensuite afficher tous les éléments d'un tableau, sans que vous écriviez chacun d'eux." },
        { type: 'list', items: [
          "tableau.map((element) => JSX) renvoie un tableau d'éléments JSX.",
          "Le tableau d'origine n'est jamais modifié : map() crée un nouveau tableau.",
          "React affiche automatiquement chaque élément du tableau renvoyé.",
          "Chaque élément devra porter une clé unique, nous l'étudierons dans la leçon 3.",
        ] },
        { type: 'code', lang: 'jsx', code: `const fruits = ["Pomme", "Banane", "Orange"];

function ListeFruits() {
  const items = fruits.map((fruit) => <li>{fruit}</li>);

  return <ul>{items}</ul>;
}

ReactDOM.createRoot(document.getElementById("root")).render(<ListeFruits />);`, caption: "Transformer un tableau de chaînes en liste HTML" },
        { type: 'list', items: [
          "`fruits` est un tableau de trois chaînes de caractères.",
          "`fruits.map((fruit) => ...)` appelle la fonction une fois pour chaque fruit.",
          "`(fruit) => <li>{fruit}</li>` transforme chaque chaîne en un élément `<li>`.",
          "`items` contient donc un tableau de trois éléments `<li>`.",
          "`<ul>{items}</ul>` : React insère tous les éléments du tableau à l'intérieur du `ul`.",
        ] },
        { type: 'result', text: "À l'écran : une liste à puces avec trois éléments — « Pomme », « Banane », « Orange » — dans cet ordre." },
        { type: 'mistake', text: "Oublier de renvoyer le JSX avec des accolades : `fruits.map((fruit) => { <li>{fruit}</li> })` renvoie undefined et la liste est vide.", fix: "Utiliser les parenthèses : `(fruit) => <li>{fruit}</li>`, ou écrire `return <li>{fruit}</li>;` dans les accolades." },
        { type: 'mistake', text: "Écrire `fruits.map(<li>)` : map() attend une fonction à appeler pour chaque élément, pas un élément déjà construit.", fix: "Passer une fonction : `fruits.map((fruit) => <li>{fruit}</li>)`." },
        { type: 'quote', text: "Résumé : map() parcourt un tableau et renvoie un nouveau tableau de JSX ; React affiche le résultat en une seule écriture." },
      ],
      exercises: [
        {
          id: 'm08-l01-e1',
          type: 'qcm',
          difficulty: 'facile',
          question: "Que renvoie `map((x) => <li>{x}</li>)` appliqué au tableau [\"a\", \"b\"] ?",
          options: [
            "Un seul élément <li> contenant « a » puis « b »",
            "Un tableau contenant deux éléments <li>",
            "La chaîne « <li>a</li><li>b</li> »",
            "Le tableau d'origine, modifié en place",
          ],
          answer: 1,
          explanation: "map() produit un nouveau tableau, ici de deux éléments JSX : `<li>a</li>` et `<li>b</li>`. Ce n'est pas un élément unique (option 0), ni une chaîne de caractères (option 2) : ce sont des objets JSX. Et le tableau d'origine reste intact (option 3), c'est précisément une des règles de map().",
        },
        {
          id: 'm08-l01-e2',
          type: 'fill',
          difficulty: 'facile',
          question: "Complétez pour transformer chaque fruit en élément de liste : fruits.______((fruit) => <li>{fruit}</li>)",
          accepted: ["map", "map()", ".map"],
          hint: "La méthode s'appelle comme une carte : elle transforme chaque élément.",
          explanation: "La méthode `map()` est celle qui applique une transformation à chaque élément d'un tableau et renvoie le nouveau tableau. `map()` avec ses parenthèses ou `.map` pointant vers la méthode donnent tous la même réponse une fois la normalisation appliquée.",
        },
        {
          id: 'm08-l01-e3',
          type: 'code',
          difficulty: 'intermédiaire',
          language: 'jsx',
          question: "Créez un composant `Couleurs` qui affiche le tableau `const couleurs = [\"Rouge\", \"Vert\", \"Bleu\"];` dans un `<ul>`, une balise `<li>` par couleur. Affichez-le dans la page.",
          template: `const couleurs = ["Rouge", "Vert", "Bleu"];

function Couleurs() {
  // votre code ici
}

ReactDOM.createRoot(document.getElementById("root")).render(<Couleurs />);`,
          solution: `const couleurs = ["Rouge", "Vert", "Bleu"];

function Couleurs() {
  const items = couleurs.map((couleur) => <li>{couleur}</li>);

  return <ul>{items}</ul>;
}

ReactDOM.createRoot(document.getElementById("root")).render(<Couleurs />);`,
          mustContain: ["map(", "<li>"],
          hint: "Une variable qui reçoit le résultat de map(), puis un ul qui l'affiche.",
          explanation: "`couleurs.map((couleur) => <li>{couleur}</li>)` crée un tableau de trois éléments `<li>`, que le composant place dans `<ul>` : React affiche donc trois éléments. Sans map(), il faudrait écrire les balises une par une ; avec `couleurs.map(<li>)`, map recevrait une balise au lieu d'une fonction et ne pourrait pas l'appliquer à chaque couleur.",
        },
      ],
    },

    // ============================================================
    // Leçon 2 — Afficher une liste
    // ============================================================
    {
      id: 'm08-l02',
      title: "Afficher une liste",
      minutes: 8,
      objectives: [
        "Afficher une liste de données issues d'un tableau d'objets",
        "Créer un composant répété pour chaque élément",
        "Passer les données d'un élément en props",
      ],
      blocks: [
        { type: 'p', text: "Une liste de produits n'est pas seulement des mots : chaque produit a un nom et un prix. Il faut donc afficher des objets, et pour garder le code propre, réutiliser le même composant pour chaque ligne." },
        { type: 'h', text: "Explication simple" },
        { type: 'p', text: "On combine deux choses déjà connues : map() pour parcourir le tableau, et un composant pour représenter une ligne. La fonction de map construit un composant à qui l'on passe les informations en props. React affiche alors autant de composants qu'il y a d'éléments." },
        { type: 'list', items: [
          "Les données sont souvent un tableau d'objets : `{ nom: \"Clavier\", prix: 29 }`.",
          "map() crée un composant par objet, avec les props correspondantes.",
          "Le composant de ligne se déclare une seule fois, hors du map().",
          "Les mêmes données peuvent être stockées dans un state pour évoluer plus tard.",
        ] },
        { type: 'code', lang: 'jsx', code: `function Produit({ nom, prix }) {
  return (
    <li>
      {nom} — {prix} €
    </li>
  );
}

function Catalogue() {
  const produits = [
    { nom: "Clavier", prix: 29 },
    { nom: "Souris", prix: 15 },
  ];

  return (
    <ul>
      {produits.map((produit) => (
        <Produit nom={produit.nom} prix={produit.prix} />
      ))}
    </ul>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<Catalogue />);`, caption: "Un composant par donnée, créé avec map()" },
        { type: 'list', items: [
          "`function Produit({ nom, prix })` récupère les deux props de la ligne.",
          "`{nom} — {prix} €` insère les valeurs dans le JSX.",
          "`produits` est un tableau de deux objets, chacun avec un nom et un prix.",
          "`<Produit nom={produit.nom} prix={produit.prix} />` fabrique une ligne et lui transmet ses données.",
          "map() renvoie deux composants : React les affiche l'un après l'autre dans le `ul`.",
        ] },
        { type: 'result', text: "À l'écran : une liste à puces contenant « Clavier — 29 € » puis « Souris — 15 € »." },
        { type: 'mistake', text: "Écrire `<Produit />` sans passer les props : la ligne s'affiche mais le nom et le prix sont vides.", fix: "Transmettre les données : `nom={produit.nom}` et `prix={produit.prix}`." },
        { type: 'mistake', text: "Déclarer le composant de ligne à l'intérieur de la fonction de map : React le recrée à chaque passage et perd son état.", fix: "Déclarer `Produit` une fois, en dehors de `Catalogue`." },
        { type: 'quote', text: "Résumé : afficher une liste, c'est faire map() sur un tableau de données et construire un composant par élément, en lui passant chaque propriété en props." },
      ],
      exercises: [
        {
          id: 'm08-l02-e1',
          type: 'qcm',
          difficulty: 'facile',
          question: "Dans `produits.map((produit) => <Produit nom={produit.nom} />)`, que représente `produit` ?",
          options: [
            "Le composant Produit lui-même",
            "L'objet courant du tableau, un produit à chaque passage",
            "Le tableau complet des produits",
            "La valeur de la prop nom",
          ],
          answer: 1,
          explanation: "La fonction passée à map() reçoit un élément du tableau à chaque appel : ici, un objet `{ nom, prix }`. Ce n'est ni le composant (option 0), ni le tableau entier (option 2), ni une valeur de prop (option 3) : c'est la donnée brute sur laquelle on lit ensuite `produit.nom`.",
        },
        {
          id: 'm08-l02-e2',
          type: 'short',
          difficulty: 'facile',
          question: "Répondez par vrai ou faux : map() modifie le tableau sur lequel elle est appelée.",
          accepted: ["faux", "false", "non"],
          hint: "Pensez au mot « nouveau » associé à map().",
          explanation: "map() renvoie un nouveau tableau et laisse l'original intact : c'est ce qui permet de comparer l'ancienne et la nouvelle version, utile pour React. Répondre « faux » est donc correct ; « vrai » décrirait plutôt la méthode `forEach()`, qui parcourt sans renvoyer de tableau.",
        },
        {
          id: 'm08-l02-e3',
          type: 'debug',
          difficulty: 'intermédiaire',
          language: 'jsx',
          question: "Cette liste s'affiche vide alors que le tableau contient trois mots. Trouvez les deux erreurs et corrigez le code.",
          template: `function Ligne({ texte }) {
  return <li>{texte}</li>;
}

function Liste() {
  const mots = ["un", "deux", "trois"];
  const elements = mots.map(Ligne);

  return <ul>{elements}</ul>;
}
`,
          solution: `function Ligne({ texte }) {
  return <li>{texte}</li>;
}

function Liste() {
  const mots = ["un", "deux", "trois"];
  const elements = mots.map((mot) => <Ligne texte={mot} />);

  return <ul>{elements}</ul>;
}

ReactDOM.createRoot(document.getElementById("root")).render(<Liste />);`,
          mustContain: ["<Ligne texte={mot}", "createRoot"],
          hint: "Une erreur concerne la façon de construire le composant, l'autre l'affichage dans la page.",
          explanation: "Première erreur : `mots.map(Ligne)` appelle `Ligne` comme une fonction ordinaire avec un simple mot, donc la destructuration `{ texte }` ne trouve rien et la ligne reste vide. Il faut construire le composant avec JSX : `mots.map((mot) => <Ligne texte={mot} />)`. Deuxième erreur : sans l'appel à `ReactDOM.createRoot(...).render(<Liste />)`, le composant n'est jamais inséré dans la page.",
        },
      ],
    },

    // ============================================================
    // Leçon 3 — Comprendre les Keys
    // ============================================================
    {
      id: 'm08-l03',
      title: "Comprendre les Keys",
      minutes: 7,
      objectives: [
        "Ajouter une prop key aux éléments d'une liste",
        "Choisir un identifiant stable et unique",
        "Comprendre à quoi servent les clés pour React",
      ],
      blocks: [
        { type: 'p', text: "Vous lancez votre première liste dans la console et React écrit un avertissement en rouge : « Each child in a list should have a unique key prop ». Ce n'est pas une panne, c'est une règle à respecter dès maintenant." },
        { type: 'h', text: "Explication simple" },
        { type: 'p', text: "Quand une liste change, React doit deviner quel élément du DOM correspond à quelle donnée. La clé (key) est l'étiquette d'identification que vous donnez à chaque élément : elle permet à React de suivre chaque ligne au milieu des autres, même quand la liste est réordonnée ou allongée." },
        { type: 'list', items: [
          "La clé s'écrit `key={...}` sur l'élément fabriqué par map().",
          "Elle doit être unique au sein de la liste, comme un numéro de dossier.",
          "Elle doit être stable : ne pas changer d'un rendu à l'autre.",
          "Mieux vaut une idée fournie par les données (id, nom) qu'un indice numérique.",
        ] },
        { type: 'code', lang: 'jsx', code: `const taches = [
  { id: 1, texte: "Acheter du pain" },
  { id: 2, texte: "Répondre aux mails" },
];

function ListeTaches() {
  return (
    <ul>
      {taches.map((tache) => (
        <li key={tache.id}>{tache.texte}</li>
      ))}
    </ul>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<ListeTaches />);`, caption: "Une clé unique pour chaque tâche" },
        { type: 'list', items: [
          "`key={tache.id}` donne à chaque `<li>` une étiquette unique (1 puis 2).",
          "`tache.id` vient des données : elle ne bougera jamais quand l'ordre change.",
          "La clé est posée sur l'élément construit dans map(), pas sur le `ul`.",
          "Grâce à ces clés, React saura mettre à jour chaque ligne sans tout réécrire.",
        ] },
        { type: 'result', text: "À l'écran : une liste avec « Acheter du pain » et « Répondre aux mails », et plus aucun avertissement dans la console." },
        { type: 'mistake', text: "Utiliser l'indice du map comme clé dans une liste qui se réordonne ou perd des éléments : React peut réutiliser la mauvaise ligne et afficher de mauvaises données.", fix: "Utiliser un identifiant stable des données : `key={tache.id}`." },
        { type: 'mistake', text: "Donner la même clé à deux éléments : React affiche une erreur en console et ne peut plus suivre la liste.", fix: "Vérifier que chaque clé est unique dans la liste, comme un id d'identité." },
        { type: 'quote', text: "Résumé : la prop key identifie chaque élément de liste ; elle doit être unique et stable, idéalement issue des données elles-mêmes." },
      ],
      exercises: [
        {
          id: 'm08-l03-e1',
          type: 'qcm',
          difficulty: 'facile',
          question: "À quoi sert la prop key dans une liste React ?",
          options: [
            "À styler chaque élément de la liste",
            "À identifier chaque élément pour que React suive les changements",
            "À trier la liste par ordre alphabétique",
            "À masquer les éléments en double",
          ],
          answer: 1,
          explanation: "La clé sert d'identifiant : quand la liste change, React la compare pour savoir quel élément mettre à jour, ajouter ou retirer. Elle n'a aucun effet sur le style (option 0), le tri (option 2) ni le dédoublonnage (option 3) : ce sont des traitements de données, pas le rôle de key.",
        },
        {
          id: 'm08-l03-e2',
          type: 'fill',
          difficulty: 'facile',
          question: "Complétez : <li ______={tache.id}>{tache.texte}</li>",
          accepted: ["key", "key="],
          hint: "C'est la propriété que réclame React dans ses avertissements.",
          explanation: "La prop `key` est celle que React demande pour chaque élément d'une liste ; la comparaison ignore la casse et les espaces, donc `key` ou `key=` (marquant l'attribut dans le JSX) sont acceptés. Les autres propositions comme id ou index ne sont pas la bonne écriture.",
        },
        {
          id: 'm08-l03-e3',
          type: 'code',
          difficulty: 'intermédiaire',
          language: 'jsx',
          question: "Cette liste déclenche un avertissement de clé manquante. Ajoutez une clé unique et stable à chaque élément, en vous basant sur le champ `id` de chaque ami, puis affichez le composant.",
          template: `function Amis() {
  const amis = [
    { id: "a1", nom: "Léa" },
    { id: "a2", nom: "Karim" },
    { id: "a3", nom: "Sofia" },
  ];

  return (
    <ul>
      {amis.map((ami) => (
        <li>{ami.nom}</li>
      ))}
    </ul>
  );
}
`,
          solution: `function Amis() {
  const amis = [
    { id: "a1", nom: "Léa" },
    { id: "a2", nom: "Karim" },
    { id: "a3", nom: "Sofia" },
  ];

  return (
    <ul>
      {amis.map((ami) => (
        <li key={ami.id}>{ami.nom}</li>
      ))}
    </ul>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<Amis />);`,
          mustContain: ["key={ami.id}"],
          hint: "La clé se pose sur l'élément fabriqué par map(), et chaque ami possède déjà un id.",
          explanation: "`key={ami.id}` donne à chaque `<li>` une étiquette unique et stable tirée des données, ce qui supprime l'avertissement de React et permet de suivre chaque ligne. Une clé basée sur le nom risquerait d'être dupliquée, et l'indice `index` serait instable si la liste était réordonnée. L'appel à `ReactDOM.createRoot(...).render(<Amis />)` est nécessaire pour voir la liste dans la page.",
        },
      ],
    },

    // ============================================================
    // Leçon 4 — Utiliser filter()
    // ============================================================
    {
      id: 'm08-l04',
      title: "Utiliser filter()",
      minutes: 8,
      objectives: [
        "Filtrer un tableau avec une condition",
        "Combiner filter() et map() pour n'afficher que ce qui compte",
        "Éviter les pièges de comparaison dans la condition",
      ],
      blocks: [
        { type: 'p', text: "Votre liste de courses contient vingt articles, mais vous ne voulez que les fruits. Plutôt que d'afficher tout puis de cacher le reste à la main, on demande au code de ne garder que les éléments qui répondent à une règle." },
        { type: 'h', text: "Explication simple" },
        { type: 'p', text: "filter() est une méthode de tableau qui renvoie un nouveau tableau contenant uniquement les éléments pour lesquels la condition renvoie true. La condition s'écrit dans une fonction flèche : `(element) => element.prix > 100`. Le tableau d'origine n'est pas modifié." },
        { type: 'list', items: [
          "tableau.filter((element) => condition) renvoie un nouveau tableau.",
          "Les éléments qui ne satisfont pas la condition sont écartés.",
          "Le tableau d'origine reste intact : filter ne supprime rien.",
          "On enchaîne ensuite avec map() pour afficher le résultat filtré.",
        ] },
        { type: 'code', lang: 'jsx', code: `const notes = [12, 8, 15, 6, 18];

function Reussites() {
  const reussites = notes.filter((note) => note >= 10);

  return (
    <div>
      <p>Réussites : {reussites.join(", ")}</p>
      <ul>
        {reussites.map((note) => <li key={note}>{note}</li>)}
      </ul>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<Reussites />);`, caption: "Ne garder que les notes qui passent la barre" },
        { type: 'list', items: [
          "`notes` contient cinq notes, certaines réussies, d'autres non.",
          "`filter((note) => note >= 10)` garde les notes supérieures ou égales à 10.",
          "`reussites` contient donc 12, 15 et 18 : le tableau filtré.",
          "`reussites.join(\", \")` relie les valeurs avec une virgule dans un seul texte.",
          "`map()` transforme ensuite chaque note réussie en élément de liste.",
        ] },
        { type: 'result', text: "À l'écran : « Réussites : 12, 15, 18 » suivi d'une liste contenant 12, 15 et 18." },
        { type: 'mistake', text: "Écrire `note = 10` ou `note = 10` avec un seul signe : un seul `=` affecte une valeur au lieu de comparer, et la condition n'est jamais ce que vous pensez.", fix: "Utiliser un opérateur de comparaison : `note >= 10`." },
        { type: 'mistake', text: "Filtrer mais afficher le tableau d'origine : `notes.map(...)` au lieu de `reussites.map(...)`, tout le tableau réapparaît.", fix: "Afficher bien le tableau renvoyé par filter, ici `reussites`." },
        { type: 'quote', text: "Résumé : filter() renvoie un nouveau tableau contenant seulement les éléments qui vérifient la condition ; on l'affiche ensuite avec map()." },
      ],
      exercises: [
        {
          id: 'm08-l04-e1',
          type: 'qcm',
          difficulty: 'facile',
          question: "Que renvoie `[3, 8, 12].filter((n) => n > 5)` ?",
          options: [
            "Le tableau [3, 8, 12], modifié",
            "Le tableau [8, 12]",
            "Le tableau [3]",
            "Un seul nombre : 12",
          ],
          answer: 1,
          explanation: "filter() garde les éléments dont la condition est vraie : 8 et 12 sont supérieurs à 5, 3 ne l'est pas. Le tableau d'origine n'est pas modifié (option 0), rien n'est retiré de l'original mais un nouveau tableau est créé, et le résultat reste un tableau (option 3) : filter ne renvoie jamais une valeur unique.",
        },
        {
          id: 'm08-l04-e2',
          type: 'code',
          difficulty: 'intermédiaire',
          language: 'jsx',
          question: "Créez un composant `Chers` qui affiche uniquement les prix strictement supérieurs à 100 du tableau `const prix = [80, 120, 45, 200];`, sous forme de liste à puces. Affichez-le dans la page.",
          template: `const prix = [80, 120, 45, 200];

function Chers() {
  // votre code ici
}
`,
          solution: `const prix = [80, 120, 45, 200];

function Chers() {
  const chers = prix.filter((p) => p > 100);

  return (
    <ul>
      {chers.map((p) => <li key={p}>{p}</li>)}
    </ul>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<Chers />);`,
          mustContain: ["filter(", "> 100"],
          hint: "Filtrez d'affichez ensuite le tableau filtré avec map().",
          explanation: "`prix.filter((p) => p > 100)` ne garde que 120 et 200, puis `map()` transforme ces deux valeurs en éléments `<li>`. La condition doit utiliser un opérateur de comparaison (`>`), car `p = 100` affecterait une valeur au lieu de filtrer. Afficher `prix.map(...)` après le filtre réafficherait les quatre prix d'origine.",
        },
        {
          id: 'm08-l04-e3',
          type: 'short',
          difficulty: 'intermédiaire',
          question: "Le tableau d'origine est-il modifié quand on appelle filter() sur lui ?",
          accepted: ["non", "no", "le tableau n est pas modifie", "il n est pas modifie"],
          hint: "filter crée un nouveau tableau.",
          explanation: "filter() ne modifie jamais le tableau reçu : elle renvoie un nouveau tableau, laissant l'original disponible pour un autre affichage. C'est un choix délibéré de JavaScript, qui rend les opérations prévisibles ; c'est aussi indispensable en React, où l'état doit être remplacé par une nouvelle valeur plutôt que modifié sur place.",
        },
      ],
    },

    // ============================================================
    // Leçon 5 — Afficher ou masquer des composants
    // ============================================================
    {
      id: 'm08-l05',
      title: "Afficher ou masquer des composants",
      minutes: 8,
      objectives: [
        "Masquer un composant en retournant null",
        "Décider de l'affichage avec une instruction if",
        "Contrôler la visibilité depuis un état",
      ],
      blocks: [
        { type: 'p', text: "Bannière de bienvenue, message de confirmation, panneau de dialogue : parfois il faut que tout un bloc disparaisse de l'écran. React le permet très simplement : un composant qui ne retourne rien n'affiche rien." },
        { type: 'h', text: "Explication simple" },
        { type: 'p', text: "Un composant doit toujours retourner du JSX, une chaîne, un nombre... ou `null`, qui signifie « ne rien afficher du tout ». En utilisant une instruction `if` avant le return principal, on décide si le contenu est affiché ou non, selon un état booléen." },
        { type: 'list', items: [
          "`return null;` indique à React de n'insérer aucun élément.",
          "L'instruction `if` se place AVANT le `return` principal du composant.",
          "L'état booléen (ici `visible`) pilote la décision.",
          "Quand l'état change, React relit le composant et masque ou réaffiche le bloc.",
        ] },
        { type: 'code', lang: 'jsx', code: `import { useState } from "react";

function Banniere() {
  const [visible, setVisible] = useState(true);

  function fermer() {
    setVisible(false);
  }

  if (!visible) {
    return null;
  }

  return (
    <div>
      <p>Bienvenue ! Profitez de 10 % de réduction.</p>
      <button onClick={fermer}>Fermer</button>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<Banniere />);`, caption: "Une bannière qui se masque après un clic" },
        { type: 'list', items: [
          "`useState(true)` : la bannière est visible au chargement.",
          "`fermer` passe l'état à false au clic sur « Fermer ».",
          "`if (!visible) return null;` : si la bannière n'est plus visible, le composant n'affiche rien.",
          "Le `if` est placé avant le return principal, sinon il serait inatteignable.",
          "Le reste du JSX n'est affiché que si `visible` est vrai.",
        ] },
        { type: 'result', text: "Au chargement : la bannière s'affiche avec son message et le bouton « Fermer ». Après le clic : le bloc disparaît complètement de la page." },
        { type: 'mistake', text: "Placer le `if` après le `return` principal : ce code est inatteignable et la bannière ne disparaît jamais.", fix: "Placer l'instruction `if` avant le `return` principal du composant." },
        { type: 'mistake', text: "Écrire `return ;` avec un point-virgule vide : ce n'est pas un retour de valeur autorisé dans un composant.", fix: "Écrire `return null;` pour indiquer l'absence d'affichage." },
        { type: 'quote', text: "Résumé : pour masquer un composant, testez un état avec une instruction if avant le return et retournez null : React n'affiche alors rien." },
      ],
      exercises: [
        {
          id: 'm08-l05-e1',
          type: 'qcm',
          difficulty: 'facile',
          question: "Que fait `return null;` dans un composant React ?",
          options: [
            "Il affiche le texte « null » à l'écran",
            "Il déclenche une erreur de compilation",
            "Il ne fait afficher aucun élément par le composant",
            "Il supprime le composant du projet",
          ],
          answer: 2,
          explanation: "`null` est la valeur qui indique l'absence de contenu : React n'insère rien dans la page, le composant devient invisible sans erreur. Le mot « null » ne s'affiche jamais (option 0), le code reste valide (option 1) et le composant reste déclaré, prêt à réapparaître si l'état change (option 3).",
        },
        {
          id: 'm08-l05-e2',
          type: 'debug',
          difficulty: 'intermédiaire',
          language: 'jsx',
          question: "Le bouton « Fermer » ne sert à rien : la bannière reste affichée en permanence. Trouvez les erreurs et corrigez le code.",
          template: `import { useState } from "react";

function Alerte() {
  const [ouverte, setOuverte] = useState(true);

  function fermer() {
    setOuverte(false);
  }

  return (
    <div>
      <p>Stock limité !</p>
      <button onClick={fermer}>Fermer</button>
    </div>
  );

  if (!ouverte) {
    return;
  }
}
`,
          solution: `import { useState } from "react";

function Alerte() {
  const [ouverte, setOuverte] = useState(true);

  function fermer() {
    setOuverte(false);
  }

  if (!ouverte) {
    return null;
  }

  return (
    <div>
      <p>Stock limité !</p>
      <button onClick={fermer}>Fermer</button>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<Alerte />);`,
          mustContain: ["return null"],
          hint: "Où se trouve le test, et que doit-il renvoyer ?",
          explanation: "Le bloc `if` est écrit APRÈS le `return` principal : ce code est inatteignable, jamais exécuté. De plus, `return;` sans valeur n'est pas la façon de masquer un composant. La correction place le test avant le `return` principal et utilise `return null;` : quand l'alerte est fermée, le composant n'affiche plus rien. L'appel à `ReactDOM.createRoot(...).render(<Alerte />)` insère le composant dans la page.",
        },
        {
          id: 'm08-l05-e3',
          type: 'visual',
          difficulty: 'intermédiaire',
          language: 'jsx',
          question: "Décrivez ce que voit l'utilisateur au chargement, puis après le clic sur « Fermer », et indiquez ce que renvoie le composant pour masquer la bannière.",
          template: `import { useState } from "react";

function Banniere() {
  const [visible, setVisible] = useState(true);

  function fermer() {
    setVisible(false);
  }

  if (!visible) {
    return null;
  }

  return (
    <div>
      <p>Offre spéciale : -20 %</p>
      <button onClick={fermer}>Fermer</button>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<Banniere />);`,
          solution: "Au chargement : l'utilisateur voit le message « Offre spéciale : -20 % » et le bouton « Fermer ». Après le clic : tout disparaît, car l'état visible devient false, le test !visible devient vrai et le composant retourne null — React ne montre alors aucun élément.",
          mustContain: ["null"],
          hint: "Suivez le chemin : clic → état → test → valeur retournée.",
          explanation: "L'état démarre à true, donc le JSX s'affiche. Au clic, `setVisible(false)` change l'état, React relit le composant, le test `!visible` devient vrai et `return null;` stoppe l'affichage : la page ne montre plus rien. Comprendre ce circuit évite l'erreur courante de croire que le composant est supprimé du projet : il est simplement masqué pour cet état.",
        },
      ],
    },

    // ============================================================
    // Leçon 6 — Opérateurs conditionnels
    // ============================================================
    {
      id: 'm08-l06',
      title: "Opérateurs conditionnels",
      minutes: 9,
      objectives: [
        "Utiliser l'opérateur ternaire dans le JSX",
        "Utiliser && pour afficher un élément seulement si une condition est vraie",
        "Choisir le bon opérateur selon la situation",
      ],
      blocks: [
        { type: 'p', text: "L'instruction if fonctionne très bien... mais elle s'écrase mal dans le JSX. Pour afficher « Bonjour Admin » ou « Bonjour Invité », ou pour montrer un message seulement quand c'est pertinent, React utilise deux opérateurs compacts : le ternaire et &&." },
        { type: 'h', text: "Explication simple" },
        { type: 'p', text: "Le ternaire `condition ? valeurSiVrai : valeurSiFaux` choisit entre deux branches et s'écrit directement dans les accolades du JSX. L'opérateur `&&` renvoie la partie de droite seulement si la partie de gauche est vraie : c'est idéal pour afficher un élément en plus, ou rien du tout." },
        { type: 'list', items: [
          "`condition ? a : b` : le ternaire, qui renvoie toujours l'une des deux valeurs.",
          "`condition && élément` : affiche l'élément uniquement si la condition est vraie.",
          "Les deux s'écrivent entre accolades `{ }` dans le JSX.",
          "Le ternaire gère deux cas, `&&` gère un cas affiché ou pas.",
        ] },
        { type: 'code', lang: 'jsx', code: `import { useState } from "react";

function Message() {
  const [connecte, setConnecte] = useState(false);

  function connecter() {
    setConnecte(true);
  }

  return (
    <div>
      <p>{connecte ? "Vous êtes connecté !" : "Invité"}</p>
      <button onClick={connecter}>Se connecter</button>
      {connecte && <p>Bienvenue parmi nous.</p>}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<Message />);`, caption: "Ternaire et && dans le même JSX" },
        { type: 'list', items: [
          "`connecte ? \"Vous êtes connecté !\" : \"Invité\"` : deux branches selon l'état.",
          "Au chargement, `connecte` vaut false : le paragraphe affiche « Invité ».",
          "`{connecte && <p>Bienvenue parmi nous.</p>}` : le second paragraphe n'existe que si connecte est vrai.",
          "`onClick={connecter}` passe l'état à true au clic, React réaffiche avec les deux conditions résolues.",
        ] },
        { type: 'result', text: "Au chargement : « Invité » et le bouton « Se connecter », sans le second paragraphe. Après le clic : « Vous êtes connecté ! » et « Bienvenue parmi nous. »." },
        { type: 'mistake', text: "Écrire `{connecte && ...}` sans accolades ou en dehors du JSX : l'expression n'est pas évaluée comme du contenu.", fix: "Entourer l'expression d'accordades : `{connecte && <p>...</p>}`." },
        { type: 'mistake', text: "Utiliser `&&` alors qu'il faut choisir entre deux textes différents : la condition ne peut renvoyer que la partie de droite.", fix: "Employer le ternaire `condition ? texteA : texteB` pour les deux branches." },
        { type: 'quote', text: "Résumé : le ternaire `? :` choisit entre deux branches, `&&` affiche un élément seulement si la condition est vraie — les deux vivent entre accolades du JSX." },
      ],
      exercises: [
        {
          id: 'm08-l06-e1',
          type: 'qcm',
          difficulty: 'facile',
          question: "Que fait `{age >= 18 && <p>Accès autorisé</p>}` ?",
          options: [
            "Affiche toujours « Accès autorisé »",
            "Affiche « Accès autorisé » seulement si age est supérieur ou égal à 18",
            "Affiche le nombre 18",
            "Affiche « Accès autorisé » seulement si age est inférieur à 18",
          ],
          answer: 1,
          explanation: "L'opérateur && renvoie la partie de droite uniquement quand la partie de gauche est vraie, donc quand age >= 18. Si la condition est fausse, rien ne s'affiche (et non un texte différent, contrairement au ternaire). Les options 0 et 3 inversent ou ignorent la condition, l'option 2 confond condition et affichage.",
        },
        {
          id: 'm08-l06-e2',
          type: 'fill',
          difficulty: 'intermédiaire',
          question: "Complétez : {connecte && <p>Bienvenue</p>} — la partie de droite s'affiche seulement si la partie de gauche est ______.",
          accepted: ["vraie", "true", "verifiee", "vrai"],
          hint: "Il s'agit de la valeur de vérité de la condition.",
          explanation: "&& ne retourne la partie de droite que si la partie de gauche vaut true, c'est-à-dire est vraie. Si `connecte` vaut false, l'expression n'affiche rien. Les réponses « vraie », « vrai » et « true » expriment toutes cette règle ; « fausse » serait l'inverse exact du comportement attendu.",
        },
        {
          id: 'm08-l06-e3',
          type: 'code',
          difficulty: 'intermédiaire',
          language: 'jsx',
          question: "Créez un composant `Accueil` avec un état `admin` initialisé à false. Avec un ternaire, affichez « Bonjour Admin » si admin est vrai, sinon « Bonjour Invité ». Ajoutez un bouton « Devenir admin » qui passe admin à true, et affichez « Accès complet » avec && seulement quand admin est vrai.",
          template: `import { useState } from "react";

function Accueil() {
  // votre code ici
}

ReactDOM.createRoot(document.getElementById("root")).render(<Accueil />);`,
          solution: `import { useState } from "react";

function Accueil() {
  const [admin, setAdmin] = useState(false);

  function promouvoir() {
    setAdmin(true);
  }

  return (
    <div>
      <p>{admin ? "Bonjour Admin" : "Bonjour Invité"}</p>
      <button onClick={promouvoir}>Devenir admin</button>
      {admin && <p>Accès complet</p>}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<Accueil />);`,
          mustContain: ["Bonjour Admin", "Accès complet"],
          hint: "Une seule condition, deux affichages différents pour la première phrase.",
          explanation: "Le ternaire `admin ? \"Bonjour Admin\" : \"Bonjour Invité\"` choisit entre deux textes, ce que `&&` ne peut pas faire (il ne renvoie que la partie de droite). L'expression `{admin && <p>Accès complet</p>}` n'ajoute le second paragraphe que lorsque admin est true. Le bouton met à jour l'état et React réaffiche les deux conditions résolues.",
        },
      ],
    },

    // ============================================================
    // Leçon 7 — Gestion des données dynamiques
    // ============================================================
    {
      id: 'm08-l07',
      title: "Gestion des données dynamiques",
      minutes: 12,
      objectives: [
        "Créer une liste modifiable depuis un état",
        "Ajouter un élément sans modifier le tableau existant",
        "Supprimer un élément avec filter()",
      ],
      blocks: [
        { type: 'p', text: "Vous savez afficher une liste, filtrer des données et réagir aux événements. Il ne reste qu'à les assembler : une vraie liste de tâches où l'on ajoute des éléments, où l'on en supprime, et où l'écran suit toujours l'état." },
        { type: 'h', text: "Explication simple" },
        { type: 'p', text: "En React, un état contenant un tableau ne se modifie pas : on lui remplace intégralement par un nouveau tableau. On ajoute avec l'opérateur `...` qui copie les éléments existants, et on supprime avec filter(). Le champ de saisie est lui aussi un état, pour que la liste sache toujours ce qui a été tapé." },
        { type: 'list', items: [
          "`[...ancien, nouveau]` crée un nouveau tableau contenant l'ancien plus le nouvel élément.",
          "`ancien.filter(...)` crée un nouveau tableau sans l'élément à retirer.",
          "Le champ contrôlé relie sa valeur à un état avec onChange.",
          "Après chaque mise à jour, React réaffiche la liste automatiquement.",
        ] },
        { type: 'code', lang: 'jsx', code: `import { useState } from "react";

function TodoList() {
  const [taches, setTaches] = useState(["Laver la voiture", "Écrire un mail"]);
  const [saisie, setSaisie] = useState("");

  function ajouterTache(event) {
    event.preventDefault();
    if (saisie.trim() === "") {
      return;
    }
    setTaches([...taches, saisie]);
    setSaisie("");
  }

  function supprimer(tache) {
    setTaches(taches.filter((t) => t !== tache));
  }

  return (
    <div>
      <form onSubmit={ajouterTache}>
        <input value={saisie} onChange={(e) => setSaisie(e.target.value)} />
        <button type="submit">Ajouter</button>
      </form>
      <ul>
        {taches.map((tache) => (
          <li key={tache}>
            {tache}
            <button onClick={() => supprimer(tache)}>X</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<TodoList />);`, caption: "Une liste complète : ajouter, afficher, supprimer" },
        { type: 'list', items: [
          "`useState([...])` déclare la liste des tâches, et `useState(\"\")` la saisie courante.",
          "`saisie.trim() === \"\"\"` vérifie que l'utilisateur n'a pas laissé un champ vide.",
          "`setTaches([...taches, saisie])` copie les anciennes tâches puis ajoute la nouvelle.",
          "`setSaisie(\"\")` vide le champ après l'ajout, pour la prochaine saisie.",
          "`taches.filter((t) => t !== tache)` renvoie la liste sans la tâche à supprimer.",
          "`onClick={() => supprimer(tache)}` transmet la bonne tâche au bouton X.",
        ] },
        { type: 'result', text: "Au chargement : deux tâches, « Laver la voiture » et « Écrire un mail », avec un champ vide. Après avoir tapé « Appeler Léa » et cliqué sur « Ajouter » : trois tâches et un champ vidé. Clic sur le X d'une tâche : elle disparaît de la liste." },
        { type: 'mistake', text: "Utiliser `taches.push(saisie)` puis `setTaches(taches)` : le tableau est modifié à la même adresse, React ne détecte aucun changement et l'écran reste figé.", fix: "Créer un nouveau tableau : `setTaches([...taches, saisie])`." },
        { type: 'mistake', text: "Oublier `setSaisie(\"\")` après l'ajout : le champ garde l'ancien texte et le prochain ajout crée un doublon.", fix: "Vider la saisie juste après avoir ajouté la tâche." },
        { type: 'quote', text: "Résumé : une liste dynamique, c'est un état tableau qu'on remplace toujours par un nouveau — [...ancien, élément] pour ajouter, filter() pour retirer — et un champ contrôlé pour la saisie." },
      ],
      exercises: [
        {
          id: 'm08-l07-e1',
          type: 'qcm',
          difficulty: 'facile',
          question: "Pour ajouter un élément à un état tableau en React, quelle est la bonne pratique ?",
          options: [
            "Appeler taches.push(nouvelle) puis setTaches(taches)",
            "Créer un nouveau tableau : setTaches([...taches, nouvelle])",
            "Modifier le tableau avec un index : taches[3] = nouvelle",
            "Réappeler useState avec la nouvelle liste",
          ],
          answer: 1,
          explanation: "React compare les tableaux par référence : un nouveau tableau (`[...taches, nouvelle]`) est détecté et déclenche un réaffichage. `push` modifie le même tableau (option 0) : la référence est identique, rien ne se passe. Modifier par index (option 2) a le même défaut. useState (option 3) ne doit être appelé qu'une seule fois, au premier rendu.",
        },
        {
          id: 'm08-l07-e2',
          type: 'code',
          difficulty: 'avancé',
          language: 'jsx',
          question: "Créez un composant `Courses` avec un état `courses` initialisé à `[\"Eau\"]`, un état `saisie` initialisé à \"\", un formulaire qui ajoute la saisie à la liste (champ vide ignoré, saisie vidée après l'ajout), et une liste affichée avec map().",
          template: `import { useState } from "react";

function Courses() {
  // votre code ici
}
`,
          solution: `import { useState } from "react";

function Courses() {
  const [courses, setCourses] = useState(["Eau"]);
  const [saisie, setSaisie] = useState("");

  function ajouter(event) {
    event.preventDefault();
    if (saisie.trim() === "") {
      return;
    }
    setCourses([...courses, saisie]);
    setSaisie("");
  }

  return (
    <div>
      <form onSubmit={ajouter}>
        <input value={saisie} onChange={(e) => setSaisie(e.target.value)} />
        <button type="submit">Ajouter</button>
      </form>
      <ul>
        {courses.map((course) => (
          <li key={course}>{course}</li>
        ))}
      </ul>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<Courses />);`,
          mustContain: ["useState", "setCourses", "map("],
          hint: "Deux états, un gestionnaire de soumission, un champ contrôlé et un map().",
          explanation: "Le composant combine tout le module : `useState` pour la liste et la saisie, `preventDefault` pour ne pas recharger, `setCourses([...courses, saisie])` pour ajouter sans muter le tableau, `setSaisie(\"\")` pour vider le champ, `onChange` pour contrôler l'input et `map()` pour afficher. Écrire `courses.push(saisie)` laisserait l'écran figé, et afficher `courses` sans map() afficherait le mot « courses » et non les éléments.",
        },
        {
          id: 'm08-l07-e3',
          type: 'debug',
          difficulty: 'avancé',
          language: 'jsx',
          question: "L'ajout d'articles ne fonctionne jamais : rien ne s'affiche de plus après l'envoi. Trouvez les erreurs et corrigez le code.",
          template: `import { useState } from "react";

function Panier() {
  const [articles, setArticles] = useState(["Pain"]);
  const [saisie, setSaisie] = useState("");

  function ajouter(event) {
    event.preventDefault();
    articles.push(saisie);
    setArticles(articles);
    setSaisie("");
  }

  return (
    <form onSubmit={ajouter}>
      <input value={saisie} onChange={(e) => setSaisie(e.target.value)} />
      <button type="submit">Ajouter</button>
    </form>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<Panier />);`,
          solution: `import { useState } from "react";

function Panier() {
  const [articles, setArticles] = useState(["Pain"]);
  const [saisie, setSaisie] = useState("");

  function ajouter(event) {
    event.preventDefault();
    setArticles([...articles, saisie]);
    setSaisie("");
  }

  return (
    <form onSubmit={ajouter}>
      <input value={saisie} onChange={(e) => setSaisie(e.target.value)} />
      <button type="submit">Ajouter</button>
    </form>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<Panier />);`,
          mustContain: ["...articles"],
          hint: "Regardez ce qui arrive au tableau avant de l'envoyer au setter.",
          explanation: "`articles.push(saisie)` modifie le tableau existant à la même adresse, puis `setArticles(articles)` transmet exactement la même référence : React considère que rien n'a changé et n'affiche rien de nouveau. La correction remplace ces deux lignes par `setArticles([...articles, saisie])`, qui fabrique un tableau neuf contenant les anciens articles plus le nouveau : React détecte la nouvelle référence et réaffiche la liste.",
        },
      ],
    },
  ],
};
