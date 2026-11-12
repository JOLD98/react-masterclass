import type { Module } from '../types';

export const module05: Module = {
  id: 'm05',
  number: 5,
  icon: '📦',
  level: 'Débutant confirmé',
  title: 'Les props',
  description: 'Transmettez des données entre composants avec les propriétés (props).',
  lessons: [
    {
      id: 'm05-l01',
      title: 'Comprendre les props',
      minutes: 8,
      objectives: ['Définir une prop en une phrase', 'Lire une valeur reçue par un composant', 'Situer le sens de circulation des données'],
      blocks: [
        { type: 'p', text: 'Vous avez écrit un composant Bouton qui affiche « Ajouter au panier ». Problème : sur chaque produit, le texte doit être différent. Réécrire le composant dix fois ? Non : on l\'écrit une seule fois et on lui envoie le texte dont il a besoin. C\'est exactement le rôle des props.' },
        { type: 'h', text: 'Explication simple' },
        { type: 'p', text: 'Les props (abréviation de properties, « propriétés » en français) sont le moyen par lequel les données circulent d\'un composant vers un autre. Le composant parent écrit une propriété entre les chevrons du composant enfant, un peu comme un attribut HTML, et l\'enfant récupère la valeur correspondante.' },
        { type: 'list', items: ['Une prop est une information envoyée par le parent vers l\'enfant, jamais l\'inverse.', 'À l\'intérieur de l\'enfant, la prop se lit comme une variable : `{nom}`.', 'Les props sont en lecture seule : un composant ne peut pas modifier les props qu\'il reçoit.', 'Le nom de la prop est choisi par celui qui l\'envoie ; il doit être identique des deux côtés.'] },
        { type: 'code', lang: 'jsx', caption: 'Un composant qui reçoit une prop', code: `function Salut({ nom }) {
  return <h1>Bonjour {nom} !</h1>;
}

function App() {
  return <Salut nom="Marie" />;
}` },
        { type: 'list', items: ['Ligne 1 : `function Salut({ nom })` déclare le composant ; `{ nom }` signifie « je récupère la prop appelée nom ».', 'Ligne 2 : `Bonjour {nom} !` insère la valeur de la prop dans le JSX ; les accolades `{}` font passer du texte au JavaScript.', 'Ligne 5 : `<Salut nom="Marie" />` envoie la valeur : `nom` est le nom de la prop, `"Marie"` sa valeur.', 'Le nom du composant commence par une majuscule, sinon React le confondrait avec une balise HTML.'] },
        { type: 'result', text: 'À l\'écran : un titre de taille principale « Bonjour Marie ! ».' },
        { type: 'mistake', text: 'Écrire `<h1>Bonjour nom !</h1>` sans accolades : React affiche littéralement le mot « nom ».', fix: 'Entourer l\'expression de accolades : `<h1>Bonjour {nom} !</h1>`.' },
        { type: 'mistake', text: 'Tenter de changer la prop dans l\'enfant, par exemple `nom = "Paul"` : une prop est figée.', fix: 'Pour faire varier l\'information, c\'est le parent qui modifie la valeur qu\'il transmet.' },
        { type: 'quote', text: 'Résumé : les props font circuler les données du parent vers l\'enfant ; elles se lisent comme des variables et seul le parent peut les modifier.' },
      ],
      exercises: [
        {
          id: 'm05-l01-e1',
          type: 'qcm',
          difficulty: 'facile',
          question: 'Les props servent à…',
          options: ['envoyer des données d\'un composant parent vers un composant enfant', 'modifier le state d\'un autre composant', 'appliquer du CSS à un composant', 'compiler le JSX en JavaScript'],
          answer: 0,
          explanation: 'Les props sont le canal de données parent vers enfant : le parent écrit les valeurs, l\'enfant les lit. Un enfant ne modifie jamais les props qu\'il reçoit (donc la 2e proposition est fausse). Le state est une notion différente, interne au composant, et le CSS ainsi que la compilation JSX n\'ont rien à voir avec les props.',
        },
        {
          id: 'm05-l01-e2',
          type: 'short',
          difficulty: 'facile',
          question: 'Dans `<Salut nom="Marie" />`, comment s\'appelle la prop envoyée au composant ?',
          accepted: ['nom'],
          hint: 'C\'est le mot écrit avant le signe égal.',
          explanation: 'Le nom de la prop est le texte situé avant le `=` : ici `nom`. La valeur transmise, elle, est « Marie ». Aucune autre réponse n\'est correcte : « Marie » est la valeur, pas le nom.',
        },
        {
          id: 'm05-l01-e3',
          type: 'code',
          difficulty: 'intermédiaire',
          language: 'jsx',
          question: 'Créez un composant `Slogan` qui reçoit la prop `texte` et l\'affiche dans un `h1`, puis affichez ce composant avec la valeur « Apprenez React ! ».',
          template: `function Slogan() {
  // votre code ici
}
`,
          solution: `function Slogan({ texte }) {
  return <h1>{texte}</h1>;
}

function App() {
  return <Slogan texte="Apprenez React !" />;
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);`,
          mustContain: ['<h1>', '{texte}'],
          hint: 'Déclarez la prop entre accolades dans les paramètres du composant, puis lisez-la dans le JSX.',
          explanation: '`{ texte }` dans les paramètres récupère la prop envoyée, et `<h1>{texte}</h1>` l\'affiche. `ReactDOM.createRoot(...).render(<App />)` insère le composant dans la page : sans lui, rien ne serait affiché.',
        },
      ],
    },
    {
      id: 'm05-l02',
      title: 'Transmettre des données',
      minutes: 8,
      objectives: ['Distinguer les chaînes écrites entre guillemets et les expressions entre accolades', 'Transmettre un texte, un nombre et une variable', 'Lire une ligne de props étape par étape'],
      blocks: [
        { type: 'p', text: 'Vous savez envoyer un texte. Mais un prix, un nombre, un booléen, une variable calculée : comment les transmettre ? La règle tient en une phrase : le JSX accepte deux écritures, et chacune a son usage.' },
        { type: 'h', text: 'Explication simple' },
        { type: 'p', text: 'Pour transmettre une valeur, on écrit la prop comme un attribut. Entre guillemets, on écrit un texte brut (une chaîne de caractères). Dès qu\'on veut envoyer du JavaScript — un nombre, une variable, un calcul — on entoure l\'expression d\'accolades.' },
        { type: 'list', items: ['Texte brut : `nom="Marie"` → une chaîne de caractères, prise telle quelle.', 'Expression : `age={25}`, `actif={true}`, `total={prix * 2}` → évaluée par JavaScript.', 'Variable : `nom={prenom}` → le contenu de la variable est envoyé.', 'Les accolades ne font pas partie de la valeur : elles signifient « calcule ça ».'] },
        { type: 'code', lang: 'jsx', caption: 'Un texte, une variable et un nombre', code: `function Produit({ nom, prix }) {
  return (
    <div>
      <h2>{nom}</h2>
      <p>Prix : {prix} €</p>
    </div>
  );
}

function App() {
  const nom = "Clavier";
  return <Produit nom={nom} prix={29} />;
}` },
        { type: 'list', items: ['Ligne 1 : `function Produit({ nom, prix })` reçoit deux props.', 'Lignes 3 et 4 : `{nom}` et `{prix}` affichent les valeurs reçues.', 'Ligne 9 : `const nom = "Clavier"` crée une variable dans le parent.', 'Ligne 10 : `nom={nom}` envoie la variable (on\'est entre accolades), `prix={29}` envoie le nombre 29.'] },
        { type: 'result', text: 'À l\'écran : un titre « Clavier » puis la ligne « Prix : 29 € ».' },
        { type: 'mistake', text: 'Écrire `prix="29"` : React reçoit un texte, et un texte ne se calcule pas (`prix * 2` donnerait un résultat absurde).', fix: 'Pour un nombre, utiliser les accolades : `prix={29}`.' },
        { type: 'mistake', text: 'Écrire `nom={Clavier}` : React croit que `Clavier` est une variable ; elle n\'existe pas, donc le code plante.', fix: 'Un texte entre accolades doit être une chaîne : `nom={"Clavier"}`, ou plus simplement `nom="Clavier"`.' },
        { type: 'quote', text: 'Résumé : entre guillemets on envoie un texte brut, entre accolades on envoie une expression JavaScript (nombre, variable, calcul).' },
      ],
      exercises: [
        {
          id: 'm05-l02-e1',
          type: 'qcm',
          difficulty: 'facile',
          question: 'Comment transmettre le nombre 29 en prop `prix` ?',
          options: ['prix="29"', 'prix={29}', 'prix=(29)', 'prix::29'],
          answer: 1,
          explanation: '`prix={29}` place l\'expression `29` entre accolades : React reçoit un nombre. `prix="29"` envoie un texte (la 1re proposition) ; `prix=(29)` et `prix::29` ne sont pas des écritures valides en JSX.',
        },
        {
          id: 'm05-l02-e2',
          type: 'fill',
          difficulty: 'facile',
          question: 'Complétez : `<Salut ___="Léa" />` envoie la chaîne « Léa » dans la prop `nom`.',
          accepted: ['nom'],
          hint: 'Le nom de la prop est celui que le composant utilisera pour lire la valeur.',
          explanation: 'Le composant lit `nom`, donc le parent doit écrire `nom="Léa"`. C\'est le même nom des deux côtés qui permet la correspondance.',
        },
        {
          id: 'm05-l02-e3',
          type: 'code',
          difficulty: 'intermédiaire',
          language: 'jsx',
          question: 'Créez un composant `Etiquette` qui reçoit les props `marque` (texte) et `quantite` (nombre) et les affiche dans un paragraphe, puis utilisez-le avec « Sony » et 3.',
          template: `function Etiquette() {
  // votre code ici
}
`,
          solution: `function Etiquette({ marque, quantite }) {
  return (
    <p>
      {marque} : {quantite} exemplaires
    </p>
  );
}

function App() {
  return <Etiquette marque="Sony" quantite={3} />;
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);`,
          mustContain: ['Etiquette', 'quantite={3}'],
          hint: 'La marque est un texte (guillemets), la quantité un nombre (accolades).',
          explanation: '`marque="Sony"` envoie une chaîne et `quantite={3}` un nombre : c\'est la règle des deux écritures. Dans le composant, `{marque}` et `{quantite}` affichent ces valeurs.',
        },
      ],
    },
    {
      id: 'm05-l03',
      title: 'Props dynamiques',
      minutes: 8,
      objectives: ['Envoyer une variable ou un calcul en prop', 'Préparer la valeur avant de l\'envoyer', 'Comprendre qu\'une prop est un instantané'],
      blocks: [
        { type: 'p', text: 'Jusqu\'ici, les props étaient écrites en dur dans le JSX. Dans une vraie application, la plupart des valeurs proviennent de variables, d\'objets ou de calculs. On dit alors que les props sont dynamiques : c\'est le parent qui calcule, l\'enfant qui affiche.' },
        { type: 'h', text: 'Explication simple' },
        { type: 'p', text: 'Une prop devient dynamique dès que sa valeur est une expression JavaScript : le contenu d\'une variable, la propriété d\'un objet, le résultat d\'un calcul. React reçoit la valeur au moment du rendu ; si le parent recalcule, il renvoie la nouvelle valeur et l\'écran se met à jour.' },
        { type: 'list', items: ['`nom={prenom}` : on envoie le contenu d\'une variable.', '`titre={produit.nom}` : on envoie une propriété d\'un objet.', '`total={prix * quantite}` : on envoie le résultat d\'un calcul.', 'On calcule d\'abord, on envoie ensuite : le JSX reste simple, la logique vit dans le parent.'] },
        { type: 'code', lang: 'jsx', caption: 'Des props calculées par le parent', code: `function Bonjour({ nom, heure }) {
  return (
    <p>
      {nom}, il est {heure} h !
    </p>
  );
}

function App() {
  const nom = "Léa";
  const heure = 14;
  const nomMajuscule = nom.toUpperCase();

  return (
    <div>
      <Bonjour nom={nom} heure={heure} />
      <Bonjour nom={nomMajuscule} heure={heure + 1} />
    </div>
  );
}` },
        { type: 'list', items: ['Lignes 1 à 5 : le composant affiche simplement les deux props reçues.', 'Ligne 9 : `const nom = "Léa"` crée la variable de départ.', 'Ligne 11 : `nom.toUpperCase()` calcule une nouvelle valeur (« LÉA »).', 'Ligne 15 : `heure + 1` est un calcul envoyé en prop : 14 + 1 = 15.', 'Chaque appel de `<Bonjour />` reçoit ses propres valeurs : c\'est le même composant, deux affichages différents.'] },
        { type: 'result', text: 'À l\'écran : deux lignes — « Léa, il est 14 h ! » puis « LÉA, il est 15 h ! ».' },
        { type: 'mistake', text: 'Écrire `heure=14` sans accolades : le JSX n\'accepte pas de nombre « nu » entre guillemets, c\'est une erreur de syntaxe.', fix: 'Toujours entourer une expression d\'accolades : `heure={14}`.' },
        { type: 'mistake', text: 'Copier la prop dans une variable locale de l\'enfant puis la modifier : la copie change, pas la prop, et l\'écran reste identique.', fix: 'Une prop est un instantané : pour la faire changer, c\'est le parent qui recalcule et qui renvoie une nouvelle valeur.' },
        { type: 'quote', text: 'Résumé : une prop dynamique est une expression JavaScript évaluée par le parent au moment du rendu ; l\'enfant ne fait qu\'afficher ce qu\'il reçoit.' },
      ],
      exercises: [
        {
          id: 'm05-l03-e1',
          type: 'qcm',
          difficulty: 'facile',
          question: 'Quelle ligne transmet le double du prix dans la prop `promo` ?',
          options: ['promo={prix * 2}', 'promo="prix * 2"', 'promo=prix*2', 'promo={{ prix * 2 }}'],
          answer: 0,
          explanation: '`promo={prix * 2}` envoie le résultat du calcul : les accolades demandent à JavaScript d\'évaluer l\'expression. `promo="prix * 2"` envoie le texte littéral « prix * 2 » (2e proposition fausse). `promo=prix*2` n\'est pas valide en JSX, et `{{ prix * 2 }}` transmettrait un objet contenant une expression impossible.',
        },
        {
          id: 'm05-l03-e2',
          type: 'code',
          difficulty: 'intermédiaire',
          language: 'jsx',
          question: 'Dans `App`, créez `const montant = 10 + 5` et transmettez-le à un composant `Total` qui l\'affiche dans un paragraphe.',
          template: `function Total() {
  // votre code ici
}

function App() {
  // votre code ici
}
`,
          solution: `function Total({ montant }) {
  return <p>Montant : {montant} €</p>;
}

function App() {
  const montant = 10 + 5;
  return <Total montant={montant} />;
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);`,
          mustContain: ['montant={montant}', '<p>'],
          hint: 'Le calcul se fait dans `App`, le composant `Total` ne fait qu\'afficher.',
          explanation: 'Le parent calcule `10 + 5` (soit 15) puis l\'envoie avec `montant={montant}`. Le composant enfant reçoit déjà le résultat : il n\'a aucune logique à connaître.',
        },
        {
          id: 'm05-l03-e3',
          type: 'debug',
          difficulty: 'avancé',
          language: 'jsx',
          question: 'Ce code affiche une erreur de syntaxe et ne fonctionne pas. Trouvez les 2 erreurs et corrigez-les.',
          template: `function Carre(cote) {
  const aire = cote * cote;
  console.log("Aire : " + aire);
  return <p>Aire = {aire}</p>;
}

function App() {
  const cote = 5;
  return <Carre cote=cote />;
}
`,
          solution: `function Carre({ cote }) {
  const aire = cote * cote;
  console.log("Aire : " + aire);
  return <p>Aire = {aire}</p>;
}

function App() {
  const cote = 5;
  return <Carre cote={cote} />;
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);`,
          mustContain: ['{ cote }', 'cote={cote}'],
          expectedOutput: 'Aire : 25',
          hint: 'Regardez comment les props sont récupérées dans la fonction, puis comment elles sont écrites entre les chevrons.',
          explanation: 'Erreur 1 : les props arrivent sous forme d\'un objet, il faut écrire `function Carre({ cote })` pour extraire la prop (avec `cote` seul, `cote * cote` donnerait `NaN`). Erreur 2 : `cote=cote` est invalide en JSX, il faut `cote={cote}`. Une fois corrigé, le calcul `5 * 5` s\'affiche aussi dans la console.',
        },
      ],
    },
    {
      id: 'm05-l04',
      title: 'Plusieurs propriétés',
      minutes: 8,
      objectives: ['Passer plusieurs props en une seule balise', 'Lire l\'objet `props`', 'Comprendre que seul le nom des props compte'],
      blocks: [
        { type: 'p', text: 'Un vrai composant rarement une seule information à afficher : un article a un titre, une description, une note… Heureusement, une balise de composant accepte autant de propriétés que nécessaire.' },
        { type: 'h', text: 'Explication simple' },
        { type: 'p', text: 'Chaque attribut écrit entre les chevrons devient une prop. React les regroupe toutes dans un seul objet, traditionnellement appelé `props` : le composant le reçoit en paramètre et lit chaque valeur via `props.nomDeLaProp`.' },
        { type: 'list', items: ['Toutes les props sont réunies dans un objet : `props.titre`, `props.note`.', 'L\'ordre d\'écriture n\'a aucun importance : seul le nom compte.', 'Une prop oubliée vaut `undefined` : rien ne s\'affiche à sa place, sans erreur.', 'Les noms de props sont libres, au même titre que les noms de variables.'] },
        { type: 'code', lang: 'jsx', caption: 'Trois props lues dans l\'objet props', code: `function Carte(props) {
  return (
    <div>
      <h2>{props.titre}</h2>
      <p>{props.description}</p>
      <p>Note : {props.note} / 5</p>
    </div>
  );
}

function App() {
  return (
    <Carte
      titre="Pain au chocolat"
      description="Feuilletant, tout juste sorti du four"
      note={4}
    />
  );
}` },
        { type: 'list', items: ['Ligne 1 : `function Carte(props)` reçoit l\'objet complet contenant toutes les props.', 'Lignes 4, 5 et 6 : `props.titre`, `props.description` et `props.note` lisent chaque propriété de cet objet.', 'Lignes 12 à 15 : les trois props sont écrites sur plusieurs lignes pour la lisibilité, c\'est du même code.', 'Ligne 15 : `note={4}` est un nombre, les deux autres sont des textes.'] },
        { type: 'result', text: 'À l\'écran : un encadré avec le titre « Pain au chocolat », la description, puis « Note : 4 / 5 ».' },
        { type: 'mistake', text: 'Écrire `{titre}` alors que la variable `titre` n\'existe pas : React affiche `undefined` ou plante.', fix: 'Passer par l\'objet reçu : `{props.titre}`.' },
        { type: 'mistake', text: 'Croire que l\'ordre des props change quelque chose : `<Carte note={4} titre="X" />` fonctionne exactement pareil.', fix: 'Se fier aux noms, jamais à la position : chaque valeur est associée à son nom.' },
        { type: 'quote', text: 'Résumé : plusieurs props coexistent dans un même objet `props` ; on les lit avec `props.nom` et l\'ordre d\'écriture est indifférent.' },
      ],
      exercises: [
        {
          id: 'm05-l04-e1',
          type: 'qcm',
          difficulty: 'facile',
          question: 'Dans `function Carte(props)`, que contient `props` ?',
          options: ['un objet regroupant toutes les props reçues', 'un tableau des valeurs reçues', 'une chaîne de caractères', 'le nom du composant'],
          answer: 0,
          explanation: 'React envoie toutes les props dans un seul objet : `props.titre`, `props.note`… Ce n\'est ni un tableau (les valeurs n\'ont pas d\'index numérique), ni une chaîne, ni le nom du composant.',
        },
        {
          id: 'm05-l04-e2',
          type: 'fill',
          difficulty: 'facile',
          question: 'Complétez : `return <h2>{props.____}</h2>;` pour afficher la prop `titre`.',
          accepted: ['titre'],
          hint: 'Le nom est identique à celui écrit entre les chevrons.',
          explanation: 'La prop envoyée s\'appelle `titre`, donc on la lit avec `props.titre` dans l\'objet reçu.',
        },
        {
          id: 'm05-l04-e3',
          type: 'code',
          difficulty: 'intermédiaire',
          language: 'jsx',
          question: 'Créez un composant `Livre` qui reçoit `auteur` et `pages` et affiche : « auteur — pages pages » dans un paragraphe. Utilisez « Hugo » et 500.',
          template: `function Livre() {
  // votre code ici
}
`,
          solution: `function Livre(props) {
  return (
    <p>
      {props.auteur} — {props.pages} pages
    </p>
  );
}

function App() {
  return <Livre auteur="Hugo" pages={500} />;
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);`,
          mustContain: ['Livre', 'pages'],
          hint: 'Le composant reçoit l\'objet `props` : chaque valeur s\'écrit `props.auteur`, `props.pages`.',
          explanation: 'Les deux props sont lues dans l\'objet `props` avec leur nom exact. `pages={500}` transmet un nombre, `auteur="Hugo"` une chaîne.',
        },
      ],
    },
    {
      id: 'm05-l05',
      title: 'Destructuration des props',
      minutes: 8,
      objectives: ['Écrire un composant avec la destructuration', 'Relier la destructuration à l\'objet `props`', 'Éviter les erreurs de portée'],
      blocks: [
        { type: 'p', text: 'Répéter `props.` devant chaque valeur devient vite lourd : `props.titre`, `props.prix`, `props.description`… JavaScript propose un raccourci pour extraire les propriétés d\'un objet en une seule ligne. On l\'utilise partout dans React.' },
        { type: 'h', text: 'Explication simple' },
        { type: 'p', text: 'La destructuration consiste à écrire les noms des propriétés directement entre accolades dans les paramètres de la fonction. Elle crée, pour chaque prop, une variable portant le même nom. C\'est exactement l\'équivalent de `const { titre, prix } = props;` écrit à l\'intérieur du composant.' },
        { type: 'list', items: ['`function Carte({ titre, prix })` crée les variables `titre` et `prix`.', 'Les accolades portent sur l\'objet reçu, pas sur plusieurs paramètres séparés.', 'Le nom entre accolades doit correspondre à une prop réellement envoyée.', 'On peut extraire seulement certaines props, même s\'il en arrive d\'autres.'] },
        { type: 'code', lang: 'jsx', caption: 'La destructuration en action', code: `function Salon({ ville, habitants }) {
  return (
    <p>
      {ville} compte {habitants} habitants.
    </p>
  );
}

function App() {
  return <Salon ville="Nantes" habitants={320000} />;
}` },
        { type: 'list', items: ['Ligne 1 : `function Salon({ ville, habitants })` extrait les deux props de l\'objet reçu.', 'Équivalent interne : `const { ville, habitants } = props;` — même résultat, écriture plus courte.', 'Lignes 3 et 4 : `{ville}` et `{habitants}` utilisent les variables créées.', 'Ligne 9 : les props sont envoyées normalement, seul le côté réception change.'] },
        { type: 'result', text: 'À l\'écran : « Nantes compte 320000 habitants. ».' },
        { type: 'mistake', text: 'Écrire `function Salon(ville, habitants)` : React n\'envoie qu\'un objet ; `ville` recevrait tout l\'objet et `habitants` serait `undefined`.', fix: 'Toujours destructurer depuis l\'objet reçu : `function Salon({ ville, habitants })`.' },
        { type: 'mistake', text: 'Continuer à utiliser `props.ville` après avoir déstructuré : la variable `props` n\'existe plus dans ce cas.', fix: 'Après destructuration, utiliser directement `ville`.' },
        { type: 'quote', text: 'Résumé : la destructuration `{ nom1, nom2 }` extrait les props de l\'objet reçu en des variables simples ; c\'est l\'écriture standard dans React.' },
      ],
      exercises: [
        {
          id: 'm05-l05-e1',
          type: 'qcm',
          difficulty: 'facile',
          question: 'Que signifie `function Carte({ titre, prix })` ?',
          options: [
            'le composant reçoit un objet de props et en extrait les clés `titre` et `prix`',
            'le composant reçoit deux paramètres distincts',
            'le composant renvoie un objet contenant titre et prix',
            'le composant attend un tableau de deux éléments',
          ],
          answer: 0,
          explanation: 'Les accolades sont placées sur le paramètre unique reçu par le composant : l\'objet de props. Elles en extraient les propriétés `titre` et `prix` en variables. Ce n\'est pas deux paramètres séparés (2e proposition), ni un renvoi, ni un tableau.',
        },
        {
          id: 'm05-l05-e2',
          type: 'code',
          difficulty: 'intermédiaire',
          language: 'jsx',
          question: 'Écrivez un composant `Photo` qui reçoit `src` et `legende` grâce à la destructuration, puis affiche un `img` et un paragraphe. Utilisez `"/chat.jpg"` et « Mon chat ». (Le JSX d\'un `img` s\'écrit `<img src={src} alt={legende} />`.)',
          template: `function Photo() {
  // votre code ici
}
`,
          solution: `function Photo({ src, legende }) {
  return (
    <div>
      <img src={src} alt={legende} />
      <p>{legende}</p>
    </div>
  );
}

function App() {
  return <Photo src="/chat.jpg" legende="Mon chat" />;
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);`,
          mustContain: ['Photo({ src, legende })', '{legende}'],
          hint: 'Les deux noms vont entre accolades juste après le nom du composant.',
          explanation: 'La destructuration crée `src` et `legende` à partir de l\'objet de props ; ils sont ensuite lus directement dans le JSX. Sans les accolades autour des paramètres, le composant recevrait un seul objet et `src` serait `undefined`.',
        },
        {
          id: 'm05-l05-e3',
          type: 'short',
          difficulty: 'facile',
          question: 'Comment appelle-t-on le raccourci `{ titre, prix }` écrit directement dans les paramètres d\'un composant ?',
          accepted: ['destructuration', 'la destructuration', 'destructuring'],
          hint: 'C\'est un mot JavaScript que l\'on retrouve aussi pour les objets et les tableaux.',
          explanation: 'On parle de destructuration (« destructuring » en anglais) : elle « casse » l\'objet en variables séparées. Les autres réponses ne désignent pas cette écriture.',
        },
      ],
    },
    {
      id: 'm05-l06',
      title: 'Props par défaut',
      minutes: 7,
      objectives: ['Donner une valeur par défaut à une prop', 'Savoir quand la valeur par défaut s\'applique', 'Éviter les `undefined` à l\'écran'],
      blocks: [
        { type: 'p', text: 'Votre composant `Avatar` reçoit une taille d\'image. Un jour, un développeur l\'utilise sans préciser de taille : l\'image s\'affiche cassée. Une valeur par défaut évite ce genre de mauvaise surprise.' },
        { type: 'h', text: 'Explication simple' },
        { type: 'p', text: 'Une valeur par défaut s\'écrit directement dans la destructuration, comme un paramètre par défaut de JavaScript : `{ taille = 40 }`. Si le parent n\'envoie pas la prop, React utilise cette valeur ; sinon, la valeur envoyée l\'emporte.' },
        { type: 'list', items: ['Écriture : `{ nom = "valeur" }` dans les paramètres du composant.', 'La défaut ne s\'applique que si la prop vaut `undefined`, c\'est-à-dire si elle n\'est pas envoyée.', 'Une chaîne par défaut garde ses guillemets : `langue = "français"` ; un nombre, non : `niveau = 1`.', 'Une chaîne vide `""` est une valeur fournie : la valeur par défaut ne s\'applique pas.'] },
        { type: 'code', lang: 'jsx', caption: 'Deux props avec valeurs par défaut', code: `function Salut({ nom = "anonyme", langue = "français" }) {
  return (
    <p>
      Bonjour {nom} ! (message en {langue})
    </p>
  );
}

function App() {
  return (
    <div>
      <Salut nom="Marie" />
      <Salut />
    </div>
  );
}` },
        { type: 'list', items: ['Ligne 1 : deux valeurs par défaut sont déclarées dans la destructuration.', 'Ligne 14 : le premier appel envoie `nom="Marie"` ; `langue` n\'est pas envoyée → défaut utilisée.', 'Ligne 15 : le second appel n\'envoie rien → les deux défauts s\'appliquent.', 'Lignes 4 et 5 : `{nom}` et `{langue}` affichent la valeur reçue ou la défaut.'] },
        { type: 'result', text: 'À l\'écran : « Bonjour Marie ! (message en français) » puis « Bonjour anonyme ! (message en français) ».' },
        { type: 'mistake', text: 'Écrire `function Salut({ nom })` sans défaut et laisser le parent oublier la prop : l\'écran affiche « Bonjour ! » avec un `undefined` silencieux.', fix: 'Ajouter la valeur par défaut : `{ nom = "anonyme" }`.' },
        { type: 'mistake', text: 'Croire que la défaut remplace aussi les chaînes vides : `<Salut nom="" />` reste une valeur fournie.', fix: 'La défaut ne s\'applique qu\'en l\'absence de valeur (`undefined`) ; testez ce cas-là.' },
        { type: 'quote', text: 'Résumé : une valeur par défaut protège un composant contre les props oubliées ; elle ne s\'active que quand la prop vaut `undefined`.' },
      ],
      exercises: [
        {
          id: 'm05-l06-e1',
          type: 'qcm',
          difficulty: 'facile',
          question: 'Quand la valeur par défaut `couleur = "bleu"` s\'applique-t-elle ?',
          options: [
            'seulement quand la prop `couleur` n\'est pas envoyée (elle vaut `undefined`)',
            'à chaque rendu, même si le parent envoie une valeur',
            'quand la prop est une chaîne vide',
            'uniquement si le composant est appelé depuis un autre composant',
          ],
          answer: 0,
          explanation: 'En JavaScript, un paramètre par défaut ne remplace que `undefined`. Si le parent envoie `"rouge"`, c\'est `"rouge"` qui s\'affiche (2e proposition fausse). Une chaîne vide est une valeur existante (3e proposition fausse), et la 4e proposition n\'a aucun sens en React.',
        },
        {
          id: 'm05-l06-e2',
          type: 'fill',
          difficulty: 'facile',
          question: 'Complétez : `function Salut({ nom = ____ }) { ... }` — la valeur par défaut est le texte `invité`.',
          accepted: ['"invité"', '"invite"', 'invité'],
          hint: 'Une valeur texte par défaut garde ses guillemets.',
          explanation: 'Une chaîne par défaut s\'écrit entre guillemets : `nom = "invité"`. Sans guillemets, React chercherait une variable `invité` qui n\'existe pas.',
        },
        {
          id: 'm05-l06-e3',
          type: 'debug',
          difficulty: 'avancé',
          language: 'jsx',
          question: 'Ce code ne fonctionne pas : il y a 2 erreurs. Corrigez-les pour que l\'écran affiche « Sam — niveau débutant ».',
          template: `function Badge({ pseudo, niveau = débutant }) {
  return <p>{pseudo} — niveau {niveau}</p>;
}

function App() {
  return <Badge pseudo=Sam />;
}
`,
          solution: `function Badge({ pseudo, niveau = "débutant" }) {
  return <p>{pseudo} — niveau {niveau}</p>;
}

function App() {
  return <Badge pseudo="Sam" />;
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);`,
          mustContain: ['"débutant"', 'pseudo="Sam"'],
          hint: 'Une valeur par défaut qui est du texte a besoin de guillemets, et la valeur passée entre les chevrons aussi.',
          explanation: 'Erreur 1 : `débutant` entre accolades est interprété comme une variable inexistante ; la valeur par défaut doit être `"débutant"`. Erreur 2 : `pseudo=Sam` n\'est pas une écriture JSX valide (et `Sam` serait une variable) ; il faut `pseudo="Sam"`. Alors les deux défauts et la prop fonctionnent.',
        },
      ],
    },
    {
      id: 'm05-l07',
      title: 'Communication entre composants',
      minutes: 10,
      objectives: ['Décrire le flux unidirectionnel des props', 'Utiliser la prop spéciale `children`', 'Faire remonter une information avec une fonction en prop'],
      blocks: [
        { type: 'p', text: 'Une application est une arborescence de composants : `App` contient `En-tête`, `Panier`, `Pied`… Comment ces blocs s\'échangent-ils l\'information sans se rendre fou ? Avec deux mécanismes simples, déjà en partie entre vos mains.' },
        { type: 'h', text: 'Explication simple' },
        { type: 'p', text: 'Premier mécanisme : les props ne descendent que dans un sens, du parent vers l\'enfant. Quand un composant reçoit du JSX écrit entre ses balises, React le range automatiquement dans une prop spéciale appelée `children`. Second mécanisme : pour remonter une information, le parent envoie une fonction ; l\'enfant l\'appelle quand un événement se produit, et c\'est le parent qui décide quoi faire.' },
        { type: 'list', items: ['Le flux est unidirectionnel : parent → enfant, jamais l\'inverse.', '`children` contient tout ce qui est écrit entre les balises du composant.', 'Une fonction peut aussi être envoyée en prop : c\'est une « boîte aux lettres » pour prévenir le parent.', 'L\'enfant ne change jamais les données du parent : il les lui signale.'] },
        { type: 'code', lang: 'jsx', caption: 'children + fonction en prop', code: `function Carte({ onSupprimer, children }) {
  return (
    <div>
      {children}
      <button onClick={() => onSupprimer()}>Supprimer</button>
    </div>
  );
}

function App() {
  function supprimer() {
    console.log("Élément supprimé par le parent !");
  }

  return (
    <Carte onSupprimer={supprimer}>
      <h2>Course le dimanche</h2>
      <p>Départ à 9 h</p>
    </Carte>
  );
}` },
        { type: 'list', items: ['Ligne 1 : la carte reçoit deux props, une fonction `onSupprimer` et le contenu `children`.', 'Ligne 4 : `{children}` affiche le titre et le paragraphe écrits entre les balises de `Carte`.', 'Ligne 5 : `onClick` déclenche la fonction au clic — nous l\'expliquerons en détail dans le module suivant.', 'Ligne 11 : `onSupprimer={supprimer}` envoie la fonction du parent (sans parenthèses !).', 'Lignes 15 à 18 : le JSX écrit entre `<Carte>` et `</Carte>` devient la prop `children`.', 'Résultat : l\'enfant affiche, le parent traite : chacun reste responsable de son rôle.'] },
        { type: 'result', text: 'À l\'écran : une carte contenant « Course le dimanche », « Départ à 9 h » et le bouton « Supprimer ». Au clic sur ce bouton, la console affiche « Élément supprimé par le parent ! ».' },
        { type: 'mistake', text: 'Écrire `<Carte onSupprimer={supprimer()} />` : la fonction s\'exécute immédiatement au rendu et le parent reçoit son résultat (ici `undefined`).', fix: 'Passer la référence sans parenthèses : `onSupprimer={supprimer}` ; c\'est l\'enfant qui l\'appellera avec `()`.' },
        { type: 'mistake', text: 'Essayer de modifier les données du parent depuis l\'enfant : les props sont en lecture seule.', fix: 'L\'enfant appelle la fonction reçue en prop ; c\'est le parent, dans cette fonction, qui met à jour ses propres données.' },
        { type: 'quote', text: 'Résumé : les données descendent en props, les actions remontent sous forme de fonctions ; `children` permet d\'imbriquer du JSX dans un composant.' },
      ],
      exercises: [
        {
          id: 'm05-l07-e1',
          type: 'qcm',
          difficulty: 'intermédiaire',
          question: 'Pourquoi `<Carte onSupprimer={supprimer()} />` ne fonctionne-t-il pas ?',
          options: [
            'parce que les parenthèses appellent la fonction tout de suite, au moment du rendu',
            'parce qu\'on ne peut pas envoyer de fonction en prop',
            'parce que `onSupprimer` doit s\'appeler `onSuppression`',
            'parce que React interdit les props qui commencent par « on »',
          ],
          answer: 0,
          explanation: '`supprimer()` avec parenthèses exécute la fonction immédiatement et envoie sa valeur de retour (`undefined`). Sans parenthèses, on envoie bien la fonction elle-même. Les fonctions sont des valeurs comme les autres en JS, les props « on… » sont au contraire la convention React, donc les 3 autres propositions sont fausses.',
        },
        {
          id: 'm05-l07-e2',
          type: 'code',
          difficulty: 'intermédiaire',
          language: 'jsx',
          question: 'Créez un composant `Encadre` qui affiche la prop `titre` dans un `h3` et le contenu reçu dans `children` dans un `div`. Utilisez-le avec le titre « Ma journée » et, à l\'intérieur, un `h2` « Matin » et un `p` « Course ».',
          template: `function Encadre() {
  // votre code ici
}

function App() {
  // votre code ici
}
`,
          solution: `function Encadre({ titre, children }) {
  return (
    <div>
      <h3>{titre}</h3>
      {children}
    </div>
  );
}

function App() {
  return (
    <Encadre titre="Ma journée">
      <h2>Matin</h2>
      <p>Course</p>
    </Encadre>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);`,
          mustContain: ['children', 'titre="Ma journée"'],
          hint: 'Ce qui est écrit entre `<Encadre>` et `</Encadre>` arrive dans `children`.',
          explanation: 'React range automatiquement le JSX intérieur dans la prop `children`, qu\'on affiche avec `{children}`. La prop `titre` est envoyée normalement, comme dans les leçons précédentes.',
        },
        {
          id: 'm05-l07-e3',
          type: 'short',
          difficulty: 'facile',
          question: 'Dans quel sens circulent les données avec les props ?',
          accepted: ['du parent vers l\'enfant', 'parent vers enfant', 'vers l\'enfant depuis le parent'],
          hint: 'Une seule direction.',
          explanation: 'Les props descendent du composant parent vers l\'enfant ; l\'enfant ne peut pas les modifier. Toute autre direction est fausse : c\'est la règle du flux unidirectionnel de React.',
        },
      ],
    },
  ],
};
