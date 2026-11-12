import type { Module } from '../types';

// ============================================================
// Module 15 — Stylisation et interfaces
// ============================================================

export const module15: Module = {
  id: 'm15',
  number: 15,
  icon: '🎨',
  level: 'Intermédiaire',
  title: 'Stylisation et interfaces',
  description: 'Habillez vos applications : CSS, CSS Modules, Tailwind, Styled Components et responsive.',
  lessons: [
    // --------------------------------------------------------
    // Leçon 1 : CSS avec React
    // --------------------------------------------------------
    {
      id: 'm15-l01',
      title: 'CSS avec React',
      minutes: 8,
      objectives: [
        'Ajouter une classe CSS à un élément JSX avec className',
        'Appliquer un style en ligne avec l’attribut style',
        'Choisir entre classe CSS et style inline',
      ],
      blocks: [
        { type: 'p', text: 'Vous avez créé un composant React, mais à l’écran tout est en noir et blanc, empilé sans style : c’est normal. React ne s’occupe que de la structure. Le CSS est la couche qui donne la couleur, l’espacement et la mise en page. Voyons comment l’intégrer dans un composant.' },
        { type: 'h', text: 'Explication simple' },
        { type: 'p', text: 'En HTML classique, on écrit l’attribut class. Ce mot est réservé en JavaScript, donc JSX utilise className à la place. Pour des styles propres à un seul élément, on peut aussi passer un objet JavaScript à l’attribut style : les noms de propriétés y sont écrits en camelCase.' },
        { type: 'list', items: ['className : la méthode recommandée. Elle référence une classe définie dans un fichier CSS.', 'style : un objet pour un style ponctuel, propre à cet élément uniquement.', 'Dans style, les tirets disparaissent : background-color devient backgroundColor.', 'Les valeurs restent des chaînes : « 18px », « tomato ».'] },
        { type: 'code', lang: 'jsx', code: "import './Bouton.css';\n\nfunction Bouton() {\n  return (\n    <div>\n      <button className=\"bouton-principal\">Cliquez ici</button>\n      <p style={{ color: 'tomato', fontSize: '18px' }}>\n        Texte mis en valeur\n      </p>\n    </div>\n  );\n}", caption: 'Une classe CSS et un style en ligne en JSX' },
        { type: 'list', items: ['Ligne 1 : `import \'./Bouton.css\'` charge le fichier CSS, ses règles s’appliquent à la page entière.', '`className="bouton-principal"` : React le transforme en attribut `class` dans le HTML final.', '`style={{ ... }}` : les doubles accolades signifient « un objet JavaScript à l’intérieur du JSX ».', '`color: \'tomato\'` et `fontSize: \'18px\'` : noms en camelCase, valeurs entre guillemets simples.'] },
        { type: 'result', text: 'À l’écran : un bouton habillé par la classe bouton-principal (fond bleu, texte blanc) et, sous le bouton, un paragraphe orange de 18 px.' },
        { type: 'mistake', text: 'Écrire `class="bouton-principal"` : React affiche un avertissement dans la console et la classe n’est pas appliquée.', fix: 'Utiliser toujours `className` en JSX.' },
        { type: 'mistake', text: 'Ouvrir une seule accolade : `style={{ color: \'tomato\' }` — le JSX ne compile plus.', fix: 'Fermer les deux accolades : `style={{ color: \'tomato\' }}`.' },
        { type: 'quote', text: 'Résumé : en React, on habille les éléments avec className pour les classes CSS, et avec style (un objet en camelCase) pour les styles ponctuels.' },
      ],
      exercises: [
        { id: 'm15-l01-e1', type: 'qcm', difficulty: 'facile', question: 'En JSX, quel attribut remplace l’attribut HTML class ?', options: ['class', 'className', 'classname', 'styleName'], answer: 1, explanation: 'class est un mot-clé JavaScript, JSX utilise donc className (et React le retransforme en class dans le HTML). styleName n’existe pas en React, et classname en minuscules n’est pas reconnu.' },
        { id: 'm15-l01-e2', type: 'fill', difficulty: 'facile', question: 'Dans un objet style en JSX, comment s’écrit la propriété CSS background-color ?', accepted: ['backgroundcolor'], explanation: 'Les noms de propriétés de l’objet style sont en camelCase : le tiret disparaît et la lettre suivante passe en majuscule, d’où backgroundColor.' },
        { id: 'm15-l01-e3', type: 'code', difficulty: 'intermédiaire', language: 'jsx', question: 'Créez un composant Etiquette qui affiche « Nouveau » dans un span avec la classe etiquette, puis un paragraphe avec le style en ligne fontSize: 24px et color: navy. Affichez le composant dans la page.', template: "function Etiquette() {\n  // votre code ici\n}\n", solution: "function Etiquette() {\n  return (\n    <div>\n      <span className=\"etiquette\">Nouveau</span>\n      <p style={{ fontSize: '24px', color: 'navy' }}>En vedette</p>\n    </div>\n  );\n}\n\nReactDOM.createRoot(document.getElementById('root')).render(<Etiquette />);", mustContain: ['className="etiquette"', 'fontSize'], hint: 'Le span utilise className, le paragraphe utilise un objet entre doubles accolades.', explanation: 'className="etiquette" applique la classe au span, conformément à la règle JSX. L’objet style doit contenir fontSize et color en camelCase avec des valeurs chaînes : c’est la seule forme acceptée par React pour un style en ligne.' },
        { id: 'm15-l01-e4', type: 'debug', difficulty: 'avancé', language: 'jsx', question: 'Ce composant ne compile pas et la classe ne s’applique pas. Trouvez les deux erreurs et corrigez le code.', template: "function Alerte() {\n  return (\n    <div class=\"alerte\">\n      <p style={{ color: 'red' }>Attention !</p>\n    </div>\n  );\n}\n", solution: "function Alerte() {\n  return (\n    <div className=\"alerte\">\n      <p style={{ color: 'red' }}>Attention !</p>\n    </div>\n  );\n}\n\nReactDOM.createRoot(document.getElementById('root')).render(<Alerte />);", mustContain: ['className="alerte"', '}}'], hint: 'Il y a un attribut interdit en JSX et une accolade manquante.', explanation: 'Première erreur : `class` n’est pas autorisé en JSX, il faut `className`. Deuxième erreur : l’objet style n’est pas fermé, il manque une accolade fermante — d’où l’erreur de compilation. La correction utilise className et referme `}}`.' },
      ],
    },
    // --------------------------------------------------------
    // Leçon 2 : CSS Modules
    // --------------------------------------------------------
    {
      id: 'm15-l02',
      title: 'CSS Modules',
      minutes: 8,
      objectives: [
        'Expliquer le problème des conflits de noms en CSS',
        'Créer et importer un fichier .module.css',
        'Appliquer une classe avec l’objet styles',
      ],
      blocks: [
        { type: 'p', text: 'Dans un grand projet, deux composants peuvent utiliser la même classe `.bouton` avec des styles différents. Le fichier CSS importé en dernier écrase silencieusement le premier : bienvenue dans les conflits de noms. Les CSS Modules règlent ce problème en une ligne de convention.' },
        { type: 'h', text: 'Explication simple' },
        { type: 'p', text: 'Un CSS Module est un fichier CSS classique renommé avec l’extension `.module.css`. À l’import, l’outil de build (Vite, Webpack) transforme chaque nom de classe en un identifiant unique, puis vous fournit un objet JavaScript qui associe vos noms à ces identifiants.' },
        { type: 'list', items: ['Le fichier s’appelle obligatoirement `Carte.module.css` (avec `.module`).', 'On importe : `import styles from \'./Carte.module.css\'`.', 'On utilise : `className={styles.carte}` — styles est un objet JavaScript.', 'Chaque classe devient unique dans toute l’application : zéro conflit.'] },
        { type: 'code', lang: 'jsx', code: "import styles from './Carte.module.css';\n\nfunction Carte({ titre }) {\n  return (\n    <div className={styles.carte}>\n      <h2 className={styles.titre}>{titre}</h2>\n      <button className={styles.bouton}>Voir plus</button>\n    </div>\n  );\n}", caption: 'Un composant qui importe son propre CSS Module' },
        { type: 'list', items: ['Ligne 1 : `import styles from \'./Carte.module.css\'` : styles est un objet dont les clés sont les noms de classes du fichier.', '`className={styles.carte}` : les accolades font appel à JavaScript, aucun guillemet autour.', '`styles.titre` et `styles.bouton` : deux classes du même module, chacune transformée en nom unique.', '`{titre}` : la prop reçue par le composant est affichée dans le h2.'] },
        { type: 'result', text: 'À l’écran : une carte mise en page exactement comme défini dans Carte.module.css, sans risque d’être modifiée par le CSS d’un autre composant.' },
        { type: 'mistake', text: 'Écrire `className="carte"` entre guillemets : l’outil de build ne peut pas associer le nom brut à la classe unique générée.', fix: 'Utiliser l’objet importé : `className={styles.carte}`.' },
        { type: 'mistake', text: 'Renommer le fichier `Carte.css` : le fichier n’est plus traité comme un module et perd ses noms uniques.', fix: 'Garder l’extension `.module.css` et l’import par défaut `import styles from ...`.' },
        { type: 'quote', text: 'Résumé : CSS Modules = fichier `.module.css` + objet styles importé → chaque classe devient unique et les conflits disparaissent.' },
      ],
      exercises: [
        { id: 'm15-l02-e1', type: 'qcm', difficulty: 'facile', question: 'Comment nomme-t-on un fichier CSS Module ?', options: ['Carte.css', 'Carte.module.css', 'module-Carte.css', 'Carte.styles.css'], answer: 1, explanation: 'Seule l’extension `.module.css` déclenche le traitement en module. Carte.css est un CSS classique (noms globaux), et les deux autres conventions ne sont pas prises en charge par défaut.' },
        { id: 'm15-l02-e2', type: 'short', difficulty: 'facile', question: 'Que contient la variable styles après `import styles from \'./Carte.module.css\'` ?', accepted: ['un objet', 'un objet javascript', 'objet'], explanation: 'L’import par défaut d’un CSS Module renvoie un objet : ses clés sont vos noms de classes, ses valeurs sont les identifiants uniques générés par le build.' },
        { id: 'm15-l02-e3', type: 'code', difficulty: 'intermédiaire', language: 'jsx', question: 'Le fichier Banniere.module.css contient les classes banniere et titre. Créez le composant Banniere qui les utilise pour afficher « Bienvenue ! » dans un h1, puis affichez-le.', template: "import styles from './Banniere.module.css';\n\nfunction Banniere() {\n  // votre code ici\n}\n", solution: "import styles from './Banniere.module.css';\n\nfunction Banniere() {\n  return (\n    <div className={styles.banniere}>\n      <h1 className={styles.titre}>Bienvenue !</h1>\n    </div>\n  );\n}\n\nReactDOM.createRoot(document.getElementById('root')).render(<Banniere />);", mustContain: ['styles.banniere', 'styles.titre'], hint: 'Les accolades `{...}` sont nécessaires : styles est une variable JavaScript.', explanation: 'Chaque balise référence sa classe via l’objet styles importé : `styles.banniere` pour le conteneur, `styles.titre` pour le titre. Écrire « banniere » entre guillemets ne fonctionnerait pas, car le build ne pourrait pas résoudre le nom unique.' },
        { id: 'm15-l02-e4', type: 'debug', difficulty: 'avancé', language: 'jsx', question: 'Le style du composant ne s’applique jamais, malgré un fichier Carte.module.css bien présent. Corrigez les erreurs.', template: "import './Carte.module.css';\n\nfunction Carte() {\n  return <div className=\"carte\">Contenu</div>;\n}\n\nReactDOM.createRoot(document.getElementById('root')).render(<Carte />);", solution: "import styles from './Carte.module.css';\n\nfunction Carte() {\n  return <div className={styles.carte}>Contenu</div>;\n}\n\nReactDOM.createRoot(document.getElementById('root')).render(<Carte />);", mustContain: ['import styles from', 'className={styles.carte}'], hint: 'Deux erreurs : la façon d’importer, et la façon de référencer la classe.', explanation: 'Import sans binding : `import \'./Carte.module.css\'` ne fournit pas l’objet des classes, il faut `import styles from ...`. Et `className="carte"` utilise un nom brut : la classe unique doit être lue dans l’objet, `className={styles.carte}`.' },
      ],
    },
    // --------------------------------------------------------
    // Leçon 3 : Tailwind CSS
    // --------------------------------------------------------
    {
      id: 'm15-l03',
      title: 'Tailwind CSS',
      minutes: 9,
      objectives: [
        'Définir un framework CSS utilitaire',
        'Composer des classes Tailwind dans le JSX',
        'Expliquer pourquoi le CSS final reste léger',
      ],
      blocks: [
        { type: 'p', text: 'Écrire un fichier CSS par composant, c’est propre, mais fastidieux : pour un simple bouton, il faut ouvrir deux fichiers, changer de contexte, revenir. Tailwind propose une autre voie : écrire les styles directement dans le JSX, sous forme de classes toutes faites.' },
        { type: 'h', text: 'Explication simple' },
        { type: 'p', text: 'Tailwind CSS est un framework CSS utilitaire. Au lieu d’inventer vos propres classes, vous composez de petites classes prédéfinies : `p-4` pour un padding, `text-white` du texte blanc, `bg-blue-500` un fond bleu. Chaque classe fait une seule chose, et le navigateur ne reçoit que les styles réellement utilisés dans vos fichiers.' },
        { type: 'list', items: ['`p-4` : padding de 16 px, `m-2` : marge.', '`bg-blue-500` : fond bleu, `text-white` : texte blanc.', '`flex`, `items-center`, `gap-4` : mise en page sans CSS externe.', '`rounded-lg`, `shadow-md`, `hover:bg-blue-700` : coins, ombre, survol.', 'Tailwind se configure une fois (fichier `tailwind.config.js`), puis tout se passe dans le JSX.'] },
        { type: 'code', lang: 'jsx', code: "function Bouton() {\n  return (\n    <button className=\"flex items-center gap-2 bg-blue-500 px-4 py-2 text-white rounded-lg hover:bg-blue-700\">\n      Envoyer\n    </button>\n  );\n}", caption: 'Un bouton entièrement stylé avec Tailwind' },
        { type: 'list', items: ['`className` reste l’attribut JSX : rien ne change côté React.', '`flex items-center gap-2` : flexbox horizontal, éléments centrés, 8 px entre eux.', '`bg-blue-500 ... text-white` : fond bleu, texte blanc.', '`px-4 py-2` : padding horizontal de 16 px, vertical de 8 px.', '`hover:bg-blue-700` : le fond fonce quand la souris passe dessus.'] },
        { type: 'result', text: 'À l’écran : un bouton bleu arrondi, centré, qui fonce au survol — sans un seul fichier CSS supplémentaire.' },
        { type: 'mistake', text: 'Se tromper dans le nom d’une classe, par exemple `bg-bluer-500` : Tailwind ne génère rien et le style est absent, sans erreur.', fix: 'Vérifier le nom dans la documentation Tailwind ; l’auto-complétion de l’IDE repère l’erreur.' },
        { type: 'mistake', text: 'Oublier le dossier `src` dans l’option `content` de `tailwind.config.js` : toutes les classes sont supprimées du CSS final.', fix: 'Indiquer `\'./src/**/*.{js,jsx,ts,tsx}\'` dans `content` pour que Tailwind analyse vos fichiers.' },
        { type: 'quote', text: 'Résumé : Tailwind écrit les styles dans le JSX sous forme de classes utilitaires ; le build ne produit que le CSS réellement utilisé.' },
      ],
      exercises: [
        { id: 'm15-l03-e1', type: 'qcm', difficulty: 'facile', question: 'Que fait la classe Tailwind `p-4` ?', options: ['Elle ajoute un padding de 16 px', 'Elle ajoute une marge de 16 px', 'Elle change la police en 16 px', 'Elle fixe la largeur à 16 px'], answer: 0, explanation: 'Le préfixe `p` désigne padding (marge = `m`, police = `text`, largeur = `w`). La valeur 4 correspond à l’échelle Tailwind, soit 4 × 4 px = 16 px.' },
        { id: 'm15-l03-e2', type: 'fill', difficulty: 'facile', question: 'Quelle classe Tailwind colore le texte en blanc ?', accepted: ['text-white'], explanation: 'Les utilitaires de couleur suivent le schéma `texte-valeur` : `text-white` colore le texte en blanc, pendant que `bg-white` colorerait le fond.' },
        { id: 'm15-l03-e3', type: 'short', difficulty: 'intermédiaire', question: 'Quelle option de `tailwind.config.js` indique à Tailwind quels fichiers analyser ?', accepted: ['content'], explanation: 'L’option `content` liste les fichiers à scanner. Sans elle, Tailwind ne voit aucune classe dans votre code et purgue toutes les règles inutilisées du CSS généré.' },
        { id: 'm15-l03-e4', type: 'code', difficulty: 'avancé', language: 'jsx', question: 'Créez une barre de navigation : une balise nav avec la classe flex, justify-between et p-4, contenant un titre « Masterclass » en gras (font-bold) et un lien « Connexion » en bleu (text-blue-600).', template: "function Navigation() {\n  // votre code ici\n}\n", solution: "function Navigation() {\n  return (\n    <nav className=\"flex justify-between p-4\">\n      <span className=\"font-bold\">Masterclass</span>\n      <a className=\"text-blue-600\" href=\"/connexion\">Connexion</a>\n    </nav>\n  );\n}\n\nReactDOM.createRoot(document.getElementById('root')).render(<Navigation />);", mustContain: ['className="flex justify-between p-4"', 'font-bold'], hint: 'justify-between repousse les éléments aux deux extrémités en flex.', explanation: 'La nav doit combiner `flex` (conteneur flex), `justify-between` (éléments écartés) et `p-4` (espacement). Le titre utilise `font-bold` et le lien `text-blue-600` : chaque effet est produit par une classe Tailwind distincte, composée dans le même className.' },
      ],
    },
    // --------------------------------------------------------
    // Leçon 4 : Styled Components
    // --------------------------------------------------------
    {
      id: 'm15-l04',
      title: 'Styled Components',
      minutes: 9,
      objectives: [
        'Installer et importer styled-components',
        'Créer un composant stylé avec styled.tag',
        'Utiliser les backticks pour écrire le CSS',
      ],
      blocks: [
        { type: 'p', text: 'CSS Modules et Tailwind séparent encore le style du composant : deux fichiers pour deux morceaux d’interface. Styled Components va plus loin : le style devient un composant JavaScript à part entière, écrit dans le même fichier que votre interface.' },
        { type: 'h', text: 'Explication simple' },
        { type: 'p', text: 'Styled Components est une bibliothèque externe, installée avec `npm install styled-components`. Elle transforme un morceau CSS écrit dans le code en un vrai composant React. Vous créez `Bouton = styled.button`, puis vous utilisez `<Bouton>` comme n’importe quel composant.' },
        { type: 'list', items: ['`styled.button` crée un composant qui rend une balise `<button>`.', 'Le CSS s’écrit entre des backticks (modèle littéraire JavaScript).', 'Chaque composant stylé reçoit une classe unique générée automatiquement.', 'Une prop peut modifier le CSS : `${props => props.danger ? \'red\' : \'blue\'}`.'] },
        { type: 'code', lang: 'jsx', code: "import styled from 'styled-components';\n\nconst Bouton = styled.button`\n  background-color: #2563eb;\n  color: white;\n  padding: 10px 20px;\n  border: none;\n  border-radius: 8px;\n\n  &:hover {\n    background-color: #1d4ed8;\n  }\n`;\n\nfunction App() {\n  return <Bouton>Je suis stylé !</Bouton>;\n}", caption: 'Un composant stylé créé avec Styled Components' },
        { type: 'list', items: ['Ligne 1 : `import styled from \'styled-components\'` : la bibliothèque doit d’abord être installée.', '`styled.button` : on appelle `styled` avec la balise voulue ; le résultat est un composant React.', 'Les backticks `` ` `` entourent le CSS : ce modèle littéraire JavaScript autorise les sauts de ligne.', '`&:hover` : `&` représente le bouton lui-même, donc « le bouton survolé ».', '`<Bouton>Je suis stylé !</Bouton>` : on utilise le composant comme une balise React.'] },
        { type: 'result', text: 'À l’écran : un bouton bleu arrondi qui fonce au survol, affiché par le composant App, sans aucun fichier CSS externe.' },
        { type: 'mistake', text: 'Oublier `import styled from \'styled-components\'` : la ligne `styled.button` provoque l’erreur « styled is not defined ».', fix: 'Toujours importer la bibliothèque en haut du fichier, avant de l’utiliser.' },
        { type: 'mistake', text: 'Écrire `<button className="bouton">` en espérant réutiliser le style : ce style n’appartient qu’au composant `Bouton`.', fix: 'Utiliser `<Bouton>` directement, ou passer une prop de variante au composant stylé.' },
        { type: 'quote', text: 'Résumé : Styled Components crée un composant React à partir d’un morceau CSS entre backticks — le style vit au même endroit que l’interface.' },
      ],
      exercises: [
        { id: 'm15-l04-e1', type: 'qcm', difficulty: 'facile', question: 'Que produit `styled.div` ?', options: ['Une feuille CSS externe', 'Un composant React qui rend une balise div', 'Une fonction de Node.js', 'Un hook React'], answer: 1, explanation: 'styled.tag fabrique un composant React : il rend la balise demandée avec une classe unique générée automatiquement. Ce n’est ni un fichier CSS, ni un hook (un hook commence par « use »).' },
        { id: 'm15-l04-e2', type: 'short', difficulty: 'facile', question: 'Quel nom de paquet installe-t-on pour utiliser Styled Components ?', accepted: ['styled-components'], explanation: 'La bibliothèque s’importe depuis le paquet `styled-components` : `npm install styled-components`, puis `import styled from \'styled-components\'`.' },
        { id: 'm15-l04-e3', type: 'code', difficulty: 'intermédiaire', language: 'jsx', question: 'Créez un composant Titre avec styled.h1 : couleur #1f2937, marge de 0, puis affichez « Module 15 » avec ce composant.', template: "// n'oubliez pas l'import\nconst Titre = // votre code ici\n", solution: "import styled from 'styled-components';\n\nconst Titre = styled.h1`\n  color: #1f2937;\n  margin: 0;\n`;\n\nfunction App() {\n  return <Titre>Module 15</Titre>;\n}\n\nReactDOM.createRoot(document.getElementById('root')).render(<App />);", mustContain: ['styled.h1', 'import styled from', '`'], hint: 'Le CSS se écrit entre deux backticks, comme un modèle littéraire.', explanation: '`styled.h1` crée le composant Titre qui rend un h1. Le CSS est un modèle littéraire entre backticks, et l’import de `styled` est indispensable : sans lui, `styled` est une variable indéfinie.' },
        { id: 'm15-l04-e4', type: 'debug', difficulty: 'avancé', language: 'jsx', question: 'Ce code affiche un bouton sans aucun style et plante à l’exécution. Corrigez les deux erreurs.', template: "const Bouton = styled.button`\n  background-color: #2563eb;\n  color: white;\n`;\n\nfunction App() {\n  return <button>OK</button>;\n}\n", solution: "import styled from 'styled-components';\n\nconst Bouton = styled.button`\n  background-color: #2563eb;\n  color: white;\n`;\n\nfunction App() {\n  return <Bouton>OK</Bouton>;\n}\n\nReactDOM.createRoot(document.getElementById('root')).render(<App />);", mustContain: ['import styled from', '<Bouton>'], hint: 'Deux choses manquent : une ligne en haut du fichier, et une balise dans le return.', explanation: 'Sans l’import, `styled` est inconnu d’où l’erreur d’exécution. Et le return affiche un `<button>` natif, pas le composant stylé : seul `<Bouton>` porte la classe unique générée, donc seul lui est bleu.' },
      ],
    },
    // --------------------------------------------------------
    // Leçon 5 : Design responsive
    // --------------------------------------------------------
    {
      id: 'm15-l05',
      title: 'Design responsive',
      minutes: 10,
      objectives: [
        'Définir un point de rupture (breakpoint)',
        'Écrire une media query mobile d’abord',
        'Construire une grille qui s’adapte à l’écran',
      ],
      blocks: [
        { type: 'p', text: 'Vos étudiants suivent vos leçons sur un téléphone de 375 px comme sur un écran de 1440 px. Une interface qui déborde sur mobile fait fuir l’utilisateur en trois secondes. Le design responsive consiste à construire un seul site qui s’adapte à toutes les tailles d’écran.' },
        { type: 'h', text: 'Explication simple' },
        { type: 'p', text: 'L’idée de base : ne pas figer des largeurs en pixels, mais utiliser des unités fluides (%, fr, vw) et des points de rupture. Un point de rupture est une taille d’écran à partir de laquelle on change la mise en page, grâce à une media query CSS.' },
        { type: 'list', items: ['Mobile d’abord : on dessine d’abord la version téléphone, puis on agrandit.', 'Media query : `@media (min-width: 640px) { ... }` signifie « si l’écran fait au moins 640 px ».', '`1fr` vaut une part de l’espace disponible ; `repeat(3, 1fr)` crée trois colonnes égales.', '`max-width: 100%` empêche les images de déborder de leur conteneur.', 'Dans `index.html`, la balise viewport est indispensable sur mobile.'] },
        { type: 'code', lang: 'css', code: ".grille {\n  display: grid;\n  grid-template-columns: 1fr;\n  gap: 16px;\n}\n\n@media (min-width: 640px) {\n  .grille {\n    grid-template-columns: repeat(2, 1fr);\n  }\n}\n\n@media (min-width: 768px) {\n  .grille {\n    grid-template-columns: repeat(3, 1fr);\n  }\n}", caption: 'Une grille responsive, mobile d’abord' },
        { type: 'list', items: ['Lignes 1 à 5 : par défaut, une seule colonne (`1fr`) — la version mobile.', '`gap: 16px` : 16 px de séparation entre les éléments de la grille.', '`@media (min-width: 640px)` : à partir de 640 px de large, la grille passe à deux colonnes.', 'À partir de 768 px, elle passe à trois colonnes.', 'L’ordre compte : les règles suivantes écrasent les précédentes.'] },
        { type: 'result', text: 'Sur un téléphone : une colonne. Sur une tablette (≥ 640 px) : deux colonnes. Sur un grand écran (≥ 768 px) : trois colonnes alignées.' },
        { type: 'mistake', text: 'Oublier la balise viewport dans index.html : le téléphone affiche la page en miniature, comme un bureau réduit.', fix: 'Ajouter `<meta name="viewport" content="width=device-width, initial-scale=1" />` dans le head.' },
        { type: 'mistake', text: 'Écrire les media queries dans le désordre : une règle de grand écran placée après une règle de petit écran l’écrase.', fix: 'Toujours écrire les points de rupture du plus petit au plus grand.' },
        { type: 'quote', text: 'Résumé : le responsive combine des unités fluides et des media queries mobile d’abord pour adapter la mise en page à chaque taille d’écran.' },
      ],
      exercises: [
        { id: 'm15-l05-e1', type: 'qcm', difficulty: 'facile', question: 'Que fait `@media (min-width: 640px)` ?', options: ['Applique les styles si l’écran fait au moins 640 px', 'Applique les styles si l’écran fait moins de 640 px', 'Applique les styles si la hauteur dépasse 640 px', 'Applique les styles si la fenêtre fait exactement 640 px'], answer: 0, explanation: 'min-width signifie « largeur minimale » : les styles s’activent à partir de 640 px et restent actifs au-delà. max-width viserait les petits écrans, et la media query par défaut porte sur la largeur, pas la hauteur.' },
        { id: 'm15-l05-e2', type: 'visual', difficulty: 'intermédiaire', question: 'Complétez le CSS pour que la grille passe d’une colonne à deux colonnes dès 768 px de large (mobile d’abord). Attendu : une colonne en dessous de 768 px, deux colonnes au-dessus.', template: ".grille {\n  display: grid;\n  grid-template-columns: 1fr;\n  gap: 16px;\n}\n\n/* votre media query ici */\n", solution: ".grille {\n  display: grid;\n  grid-template-columns: 1fr;\n  gap: 16px;\n}\n\n@media (min-width: 768px) {\n  .grille {\n    grid-template-columns: repeat(2, 1fr);\n  }\n}", mustContain: ['@media', 'min-width: 768px', 'repeat(2, 1fr)'], hint: 'Il faut une media query avec min-width et une grille à deux colonnes.', explanation: 'Le comportement attendu impose `min-width: 768px` (on augmente à partir de ce seuil, comme en mobile d’abord) et `repeat(2, 1fr)` pour deux colonnes égales. Un max-width inverserait la logique et casserait l’affichage demandé.' },
        { id: 'm15-l05-e3', type: 'fill', difficulty: 'intermédiaire', question: 'Quelle unité CSS représente une part de l’espace disponible dans une grille ?', accepted: ['fr', '1fr'], explanation: 'L’unité `fr` (fraction) partage l’espace libre : `1fr` vaut une part, `repeat(3, 1fr)` divise la largeur en trois parts égales. Elle reste fluide, contrairement aux pixels.' },
        { id: 'm15-l05-e4', type: 'code', difficulty: 'avancé', language: 'jsx', question: 'Créez un composant Cartes qui affiche trois div portant la classe carte à l’intérieur d’une div portant la classe grille (le CSS responsive est déjà écrit).', template: "function Cartes() {\n  // votre code ici\n}\n", solution: "function Cartes() {\n  return (\n    <div className=\"grille\">\n      <div className=\"carte\">Carte 1</div>\n      <div className=\"carte\">Carte 2</div>\n      <div className=\"carte\">Carte 3</div>\n    </div>\n  );\n}\n\nReactDOM.createRoot(document.getElementById('root')).render(<Cartes />);", mustContain: ['className=\"grille\"', 'className=\"carte\"'], hint: 'La classe grille est posée sur le conteneur parent, les cartes sont ses enfants.', explanation: 'La grille responsive s’applique au conteneur portant `className="grille"` ; les trois enfants avec `className="carte"` sont automatiquement répartis en colonnes par `grid-template-columns`. Sans ces classes, le CSS existant ne s’applique à rien.' },
      ],
    },
    // --------------------------------------------------------
    // Leçon 6 : Création de composants UI réutilisables
    // --------------------------------------------------------
    {
      id: 'm15-l06',
      title: 'Création de composants UI réutilisables',
      minutes: 10,
      objectives: [
        'Utiliser children pour recevoir le contenu',
        'Créer des variantes grâce à des props',
        'Construire une classe CSS dynamique en JavaScript',
      ],
      blocks: [
        { type: 'p', text: 'Le bouton « Envoyer » de votre formulaire ressemble au bouton « Annuler », sauf la couleur. Si vous recopiez le JSX à chaque fois, une modification devra être faite dix fois, et une seule sera oubliée. Un composant UI réutilisable écrit le style une seule fois et se paramètre par des props.' },
        { type: 'h', text: 'Explication simple' },
        { type: 'p', text: 'L’idée : créer des composants génériques — Bouton, Champ, Carte, Badge — qui acceptent des props décrivant leur variante et leur contenu, puis les réutiliser partout. C’est la méthode des bibliothèques d’interface comme Material UI.' },
        { type: 'list', items: ['`children` : tout ce que vous placez entre les balises du composant.', 'Une prop `variante` change l’apparence sans changer la structure.', 'Une prop booléenne (`large`) active un style supplémentaire.', 'Les classes CSS sont construites dans le composant, jamais recopiées.'] },
        { type: 'code', lang: 'jsx', code: "function Bouton({ children, variante = 'primaire', large = false, onClick }) {\n  const classes = ['ui-bouton', 'ui-bouton--' + variante];\n  if (large) classes.push('ui-bouton--large');\n\n  return (\n    <button className={classes.join(' ')} onClick={onClick}>\n      {children}\n    </button>\n  );\n}\n\nfunction Formulaire() {\n  return (\n    <div>\n      <Bouton onClick={() => console.log('Envoyé')}>Envoyer</Bouton>\n      <Bouton variante=\"secondaire\">Annuler</Bouton>\n      <Bouton variante=\"danger\" large>Supprimer tout</Bouton>\n    </div>\n  );\n}", caption: 'Un seul composant Bouton, trois apparitions différentes' },
        { type: 'list', items: ['`function Bouton({ children, variante, large, onClick })` : les props sont déclarées directement dans les accolades (déstructuration).', '`variante = \'primaire\'` : valeur par défaut si la prop n’est pas fournie.', '`large = false` : prop booléenne ; on l’écrit `large` (valeur true) sans valeur.', '`classes.join(\' \')` : transforme le tableau `[\'ui-bouton\', ...]` en chaîne d’classes séparées par des espaces.', '`{children}` : affiche le contenu passé entre `<Bouton>` et `</Bouton>`.', 'Dans `Formulaire`, un seul composant produit trois boutons d’apparence différente.'] },
        { type: 'result', text: 'À l’écran : trois boutons — bleu « Envoyer », clair « Annuler », rouge et large « Supprimer tout » — générés par un seul composant.' },
        { type: 'mistake', text: 'Oublier `{children}` dans le JSX : le bouton s’affiche vide, sans son libellé.', fix: 'Placer `{children}` exactement là où doit apparaître le texte du bouton.' },
        { type: 'mistake', text: 'Passer `variante="danger"` mais déstructurer `variant` dans les props : la valeur est perdue et la variante par défaut s’applique.', fix: 'Garder exactement le même nom de prop à l’appel et dans la fonction.' },
        { type: 'quote', text: 'Résumé : un composant UI réutilisable combine children, des props de variante et des classes construites en JavaScript — une seule définition, tous les usages.' },
      ],
      exercises: [
        { id: 'm15-l06-e1', type: 'qcm', difficulty: 'facile', question: 'Que contient la prop children d’un composant ?', options: ['Les props du composant', 'Le contenu placé entre les balises du composant', 'Le style CSS du composant', 'L’état interne du composant'], answer: 1, explanation: 'children reçoit tout ce qui est écrit entre l’ouverture et la fermeture du composant : texte, HTML, même d’autres composants. Les autres réponses décrivent des mécanismes différents (props, style, état).' },
        { id: 'm15-l06-e2', type: 'fill', difficulty: 'facile', question: 'Avec `({ variante = \'primaire\' })`, quelle valeur prend variante si on n’écrit rien ?', accepted: ['primaire'], explanation: 'C’est la valeur par défaut de la déstructuration JavaScript : elle s’applique uniquement si la prop est absente (ou vaut undefined).' },
        { id: 'm15-l06-e3', type: 'code', difficulty: 'intermédiaire', language: 'jsx', question: 'Créez un composant Badge qui affiche children dans un span avec les classes `badge` et `badge--` suivi de la prop couleur (par défaut « vert »). Affichez `<Badge>Validé</Badge>`.', template: "function Badge({ children, couleur }) {\n  // votre code ici\n}\n", solution: "function Badge({ children, couleur = 'vert' }) {\n  return (\n    <span className={'badge badge--' + couleur}>{children}</span>\n  );\n}\n\nReactDOM.createRoot(document.getElementById('root')).render(<Badge>Validé</Badge>);", mustContain: ['children', 'badge--'], hint: 'Concaténez la classe fixe et la classe dynamique dans un même className.', explanation: 'La classe dynamique `badge--` + couleur est construite en JavaScript, ce qui permet une seule définition pour toutes les couleurs. children doit être rendu dans le span, sinon le libellé disparaît : c’est le mécanisme qui rend le composant générique.' },
        { id: 'm15-l06-e4', type: 'debug', difficulty: 'avancé', language: 'jsx', question: 'Ce composant affiche trois boutons vides et ignore la prop variante. Trouvez les deux erreurs et corrigez le code.', template: "function Bouton({ children, variante = 'primaire' }) {\n  return <button className=\"ui-bouton\">ui-bouton</button>;\n}\n\nfunction Barre() {\n  return (\n    <div>\n      <Bouton variante=\"danger\">Supprimer</Bouton>\n      <Bouton variante=\"secondaire\">Annuler</Bouton>\n    </div>\n  );\n}\n", solution: "function Bouton({ children, variante = 'primaire' }) {\n  const classes = ['ui-bouton', 'ui-bouton--' + variante];\n  return <button className={classes.join(' ')}>{children}</button>;\n}\n\nfunction Barre() {\n  return (\n    <div>\n      <Bouton variante=\"danger\">Supprimer</Bouton>\n      <Bouton variante=\"secondaire\">Annuler</Bouton>\n    </div>\n  );\n}\n\nReactDOM.createRoot(document.getElementById('root')).render(<Barre />);", mustContain: ['children}', 'variante'], hint: 'Le libellé du bouton et la classe dynamique ne sont pas écrits au bon endroit.', explanation: 'Le return écrit le texte « ui-bouton » en dur au lieu d’afficher `{children}` : les libellés passés sont donc perdus. Et la classe est fixe : il faut construire `ui-bouton--` + variante pour que la prop reçue change réellement l’apparence.' },
      ],
    },
  ],
};
