import type { Module } from '../types';

export const module01: Module = {
  id: 'm01',
  number: 1,
  icon: '🌐',
  level: 'Débutant',
  title: "Les bases du développement web",
  description: "HTML, CSS et JavaScript : les fondations indispensables avant de partir sur React.",
  lessons: [
    {
      id: 'm01-l01',
      title: 'Comprendre HTML',
      minutes: 8,
      objectives: [
        'Comprendre à quoi sert HTML',
        'Créer une page HTML simple avec des balises',
        'Identifier les balises principales : titre, paragraphe',
      ],
      blocks: [
        { type: 'p', text: "Ouvrez n'importe quel site web : chaque page que vous voyez a été écrite dans un fichier texte contenant des balises. HTML est ce fichier. Sans lui, pas de page : c'est la toute première brique du web." },
        { type: 'h', text: 'Explication simple' },
        { type: 'p', text: "HTML signifie HyperText Markup Language, « langage de balisage hypertexte ». HTML ne calcule rien : il décrit le contenu. On écrit des éléments avec des balises : une balise d'ouverture `<p>`, un contenu, puis une balise de fermeture `</p>` (le slash indique la fermeture)." },
        {
          type: 'list',
          items: [
            "Un élément : la balise d'ouverture + le contenu + la balise de fermeture, par exemple `<p>Bonjour</p>`.",
            "Un attribut : une information complémentaire écrite dans la balise d'ouverture, par exemple `<a href=\"https://exemple.com\">` pour un lien.",
            "Un document complet commence par `<!DOCTYPE html>`, puis contient `<html>`, `<head>` (les informations sur la page) et `<body>` (tout ce qui s'affiche).",
          ],
        },
        {
          type: 'code',
          lang: 'html',
          caption: "La structure minimale d'une page HTML",
          code: `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <title>Ma page</title>
</head>
<body>
  <h1>Bonjour !</h1>
  <p>C'est ma première page.</p>
</body>
</html>`,
        },
        {
          type: 'list',
          items: [
            "Ligne 1 : `<!DOCTYPE html>` indique au navigateur qu'il s'agit d'une page HTML moderne.",
            "Ligne 2 : `<html lang=\"fr\">` ouvre la racine de la page et annonce la langue, ici le français.",
            "Lignes 3 à 6 : `<head>` contient les informations invisibles (encodage des caractères, titre de l'onglet).",
            "Ligne 8 : `<h1>` crée le titre le plus important de la page.",
            "Ligne 9 : `<p>` crée un paragraphe de texte.",
            "Lignes 11 et 12 : `</body>` et `</html>` ferment les deux grandes parties de la page.",
          ],
        },
        { type: 'result', text: "À l'écran : un onglet intitulé « Ma page », un titre « Bonjour ! » et un paragraphe « C'est ma première page. »." },
        { type: 'mistake', text: "Oublier la balise de fermeture, par exemple écrire `<p>Bonjour` sans `</p>` : le navigateur devine, mais la page devient rapidement bancale.", fix: "Fermez toujours ce que vous ouvrez : `</p>`, `</h1>`, `</body>`…" },
        { type: 'mistake', text: "Écrire du texte directement dans `<head>` : ce texte n'apparaît jamais dans la page.", fix: "Le contenu visible va toujours dans `<body>`." },
        { type: 'quote', text: "Résumé : HTML structure la page avec des balises ; `<head>` décrit, `<body>` affiche, et chaque balise ouverte doit être fermée." },
      ],
      exercises: [
        {
          id: 'm01-l01-e1',
          type: 'qcm',
          difficulty: 'facile',
          question: "HTML est…",
          options: [
            "un langage de programmation qui calcule",
            "un langage de balisage qui structure le contenu d'une page",
            "un langage de style qui colore les pages",
            "un logiciel pour naviguer sur internet",
          ],
          answer: 1,
          explanation: "HTML (HyperText Markup Language) décrit la structure : titres, paragraphes, images… Ce n'est ni un langage de programmation (c'est le rôle de JavaScript), ni un langage de style (c'est le rôle de CSS), ni un logiciel (c'est le navigateur qui affiche la page).",
        },
        {
          id: 'm01-l01-e2',
          type: 'fill',
          difficulty: 'facile',
          question: "Complétez : la balise qui crée un paragraphe s'écrit ___.",
          accepted: ['<p>', 'p', 'balise p'],
          explanation: "Le paragraphe est l'élément de base du texte : `<p>Bonjour</p>`. Il n'existe aucune balise `<t>` ni `<paragraphe>` en HTML.",
        },
        {
          id: 'm01-l01-e3',
          type: 'code',
          difficulty: 'intermédiaire',
          question: "Complétez le fichier pour qu'il affiche un titre de niveau 1 « Ma première page » puis un paragraphe « Bienvenue ! ».",
          template: `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <title>Ma page</title>
</head>
<body>
  <!-- votre code ici -->
</body>
</html>
`,
          solution: `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <title>Ma page</title>
</head>
<body>
  <h1>Ma première page</h1>
  <p>Bienvenue !</p>
</body>
</html>`,
          mustContain: ['<h1>', '<p>', 'Ma première page'],
          hint: "Les deux éléments s'écrivent dans `<body>`, après la balise d'ouverture.",
          explanation: "`<h1>` crée le titre de niveau 1 et `<p>` le paragraphe, tous deux placés dans `<body>` pour être visibles. Les balises doivent être ouvertes puis fermées (`</h1>`, `</p>`), sinon le navigateur devine mal.",
        },
      ],
    },
    {
      id: 'm01-l02',
      title: 'Comprendre CSS',
      minutes: 8,
      objectives: [
        "Comprendre à quoi sert CSS",
        'Écrire une règle CSS : sélecteur, propriété, valeur',
        'Changer la couleur et la taille d’un texte',
      ],
      blocks: [
        { type: 'p', text: "Votre page HTML affiche du texte noir sur fond blanc : c'est le rendu par défaut du navigateur. Pour changer les couleurs, les polices, les tailles et les espacements, on utilise un second langage : CSS." },
        { type: 'h', text: 'Explication simple' },
        { type: 'p', text: "CSS signifie Cascading Style Sheets, « feuilles de style en cascade ». Une règle CSS se compose d'un sélecteur (quel élément viser), d'une propriété (quoi changer) et d'une valeur (comment). La propriété et la valeur sont séparées par deux-points, et chaque déclaration se termine par un point-virgule." },
        {
          type: 'list',
          items: [
            "Sélecteur : `p` vise tous les paragraphes, `.titre` vise les éléments portant la classe `titre`.",
            "Déclaration : `color: red;` signifie « couleur du texte : rouge ».",
            "Application : le plus souvent dans un fichier `.css` lié avec `<link rel=\"stylesheet\" href=\"style.css\">` dans `<head>` ; ici on utilise une balise `<style>` pour que l'exemple tienne dans un seul fichier.",
          ],
        },
        {
          type: 'code',
          lang: 'html',
          caption: 'Des règles CSS appliquées directement dans la page',
          code: `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <title>Mon style</title>
  <style>
    h1 {
      color: blue;
    }
    p {
      color: green;
      font-size: 20px;
    }
  </style>
</head>
<body>
  <h1>Titre bleu</h1>
  <p>Paragraphe vert et gros.</p>
</body>
</html>`,
        },
        {
          type: 'list',
          items: [
            "Ligne 7 : la balise `<style>` ouvre la zone CSS dans le document.",
            "Lignes 8 à 10 : la règle `h1 { … }` vise le titre et fixe `color` à `blue`.",
            "Lignes 11 à 15 : la règle `p { … }` vise les paragraphes : texte vert (`color: green`) et taille de 20 pixels (`font-size: 20px`).",
            "Ligne 16 : `</style>` ferme la zone CSS.",
            "Note : chaque déclaration finit par `;` ; sans lui, la règle suivante est ignorée.",
          ],
        },
        { type: 'result', text: "À l'écran : le titre « Titre bleu » en bleu, et le paragraphe « Paragraphe vert et gros. » en vert et en 20 pixels." },
        { type: 'mistake', text: "Écrire `color blue` sans deux-points, ou `color: blue` sans point-virgule : la déclaration est ignorée.", fix: "Retenez le modèle `propriété: valeur;` avec deux-points et point-virgule." },
        { type: 'quote', text: "Résumé : CSS met en forme la page avec des règles `sélecteur { propriété: valeur; }`, écrites dans un fichier lié ou dans une balise `<style>`." },
      ],
      exercises: [
        {
          id: 'm01-l02-e1',
          type: 'qcm',
          difficulty: 'facile',
          question: "Que signifie CSS ?",
          options: [
            'Computer Style Sheets',
            'Cascading Style Sheets',
            'Creative Style System',
            'Cascading Script Sheets',
          ],
          answer: 1,
          explanation: "CSS = Cascading Style Sheets, « feuilles de style en cascade ». « Computer Style Sheets » et « Creative Style System » sont des inventions, et « Script » renvoie à JavaScript, pas au style.",
        },
        {
          id: 'm01-l02-e2',
          type: 'code',
          difficulty: 'intermédiaire',
          question: "Faites en sorte que tous les paragraphes de cette page soient rouges.",
          template: `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <title>Mon style</title>
  <style>
    /* votre code ici */
  </style>
</head>
<body>
  <p>Premier paragraphe.</p>
  <p>Second paragraphe.</p>
</body>
</html>
`,
          solution: `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <title>Mon style</title>
  <style>
    p {
      color: red;
    }
  </style>
</head>
<body>
  <p>Premier paragraphe.</p>
  <p>Second paragraphe.</p>
</body>
</html>`,
          mustContain: ['p {', 'color: red'],
          hint: "Il faut une règle CSS visant `p` avec la propriété `color`.",
          explanation: "La règle `p { color: red; }` cible tous les paragraphes de la page et colore leur texte en rouge. Sans le sélecteur `p`, la déclaration ne s'applique à aucun élément.",
        },
        {
          id: 'm01-l02-e3',
          type: 'short',
          difficulty: 'avancé',
          question: "Quelle propriété CSS change la couleur du texte ?",
          accepted: ['color', 'couleur'],
          explanation: "`color` est la propriété qui fixe la couleur du texte. `font-size` change la taille et `background` change le fond : aucune des deux ne colore le texte.",
        },
      ],
    },
    {
      id: 'm01-l03',
      title: 'Comprendre JavaScript',
      minutes: 7,
      objectives: [
        'Savoir où écrire du JavaScript dans une page',
        'Utiliser console.log pour afficher une valeur',
        'Comprendre que JS rend la page interactive',
      ],
      blocks: [
        { type: 'p', text: "Une page HTML avec du CSS est jolie, mais si l'utilisateur clique sur un bouton, rien ne se passe : la page est figée. JavaScript apporte le comportement : il écoute les actions et fait réagir la page." },
        { type: 'h', text: 'Explication simple' },
        { type: 'p', text: "JavaScript (souvent abrégé JS) est un langage de programmation créé en 1995. Il s'exécute dans le navigateur, à côté du HTML et du CSS. On y écrit des instructions, des valeurs et des actions, par exemple afficher un message dans la console." },
        {
          type: 'list',
          items: [
            "Le HTML donne la structure, le CSS le style, le JavaScript le comportement : les trois travaillent ensemble.",
            "Le code JS s'écrit dans une balise `<script>`, généralement juste avant `</body>`.",
            "La console est un panneau de débogage du navigateur : on l'ouvre avec la touche F12.",
            "`console.log(valeur)` affiche une valeur dans la console : c'est votre outil de vérification quotidien.",
          ],
        },
        {
          type: 'code',
          lang: 'html',
          caption: 'Du JavaScript exécuté au chargement de la page',
          code: `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <title>Mon JS</title>
</head>
<body>
  <h1>Ma page</h1>
  <script>
    console.log("Salut depuis la console !");
  </script>
</body>
</html>`,
        },
        {
          type: 'list',
          items: [
            "Ligne 8 : `<h1>Ma page</h1>` reste du HTML classique.",
            "Ligne 9 : `<script>` ouvre la zone où s'écrit le JavaScript.",
            "Ligne 10 : `console.log(...)` envoie le message « Salut depuis la console ! » vers la console.",
            "Ligne 11 : `</script>` ferme la zone JavaScript.",
          ],
        },
        { type: 'result', text: "Dans la console du navigateur (F12) : « Salut depuis la console ! ». La page, elle, affiche le titre « Ma page »." },
        { type: 'mistake', text: "Écrire des instructions JS directement dans le HTML, hors de `<script>` : le navigateur les affiche comme du texte et ne les exécute pas.", fix: "Toujours envelopper le JavaScript dans `<script>` … `</script>`." },
        { type: 'mistake', text: "Modifier le fichier maisoublier de recharger la page : rien ne change à l'écran.", fix: "Rechargez la page (touche F5) après chaque modification." },
        { type: 'quote', text: "Résumé : JavaScript apporte le comportement de la page ; on l'écrit dans `<script>` et on vérifie son exécution avec `console.log` dans la console (F12)." },
      ],
      exercises: [
        {
          id: 'm01-l03-e1',
          type: 'qcm',
          difficulty: 'facile',
          question: "Où écrit-on du JavaScript dans une page HTML ?",
          options: [
            'dans la balise <script>',
            'dans la balise <style>',
            'dans un fichier .css',
            "nulle part, c'est le navigateur qui l'écrit tout seul",
          ],
          answer: 0,
          explanation: "Le JavaScript s'exécute dans les balises `<script>` (ou via un fichier JS lié). `<style>` sert au CSS, un fichier `.css` contient du style, et le navigateur n'écrit jamais votre code à votre place.",
        },
        {
          id: 'm01-l03-e2',
          type: 'fill',
          difficulty: 'facile',
          question: "Quelle fonction affiche un message dans la console du navigateur ?",
          accepted: ['console.log', 'console log', 'log'],
          explanation: "`console.log()` est la méthode standard d'affichage dans la console. Il n'existe pas de `print()` ni de `console.print()` en JavaScript navigateur.",
        },
        {
          id: 'm01-l03-e3',
          type: 'code',
          difficulty: 'intermédiaire',
          question: "Faites afficher « Bonjour le monde ! » dans la console.",
          template: `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <title>Ma page</title>
</head>
<body>
  <script>
    // votre code ici
  </script>
</body>
</html>
`,
          solution: `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <title>Ma page</title>
</head>
<body>
  <script>
    console.log("Bonjour le monde !");
  </script>
</body>
</html>`,
          mustContain: ['console.log', 'Bonjour le monde !'],
          hint: "Utilisez `console.log` et mettez le message entre guillemets.",
          expectedOutput: 'Bonjour le monde !',
          explanation: "`console.log(\"Bonjour le monde !\")` envoie le texte dans la console. Le message doit être une chaîne, donc entre guillemets : sans guillemets, JavaScript chercherait une variable inexistante.",
        },
      ],
    },
    {
      id: 'm01-l04',
      title: 'Variables et constantes',
      minutes: 8,
      objectives: [
        'Déclarer une variable avec let',
        'Utiliser const pour une valeur fixe',
        'Comprendre pourquoi on évite var',
      ],
      blocks: [
        { type: 'p', text: "Dans une recette, les quantités sont écrites une fois puis utilisées plusieurs fois. En JavaScript, une variable joue ce rôle : c'est une boîte étiquetée dans laquelle on met une valeur qu'on pourra relire ou changer." },
        { type: 'h', text: 'Explication simple' },
        { type: 'p', text: "Déclarer une variable, c'est créer la boîte avec `let`, puis y déposer une valeur avec le signe `=`. On peut ensuite changer cette valeur autant de fois qu'on veut. Si la valeur ne doit jamais changer, on utilise `const`." },
        {
          type: 'list',
          items: [
            "`let nom = valeur;` crée une variable modifiable.",
            "`const nom = valeur;` crée une constante : sa valeur ne peut plus être remplacée.",
            "Les noms sont sensibles à la casse : `age` et `Age` sont deux variables différentes.",
            "Convention : on écrit les noms en camelCase, par exemple `dateDeNaissance`.",
            "`var` est l'ancienne façon de déclarer : aujourd'hui on privilégie `let` et `const`.",
          ],
        },
        {
          type: 'code',
          lang: 'js',
          caption: 'Une variable modifiable et une constante',
          code: `let age = 25;
age = 26;

const anneeNaissance = 1999;

console.log(age);
console.log(anneeNaissance);`,
        },
        {
          type: 'list',
          items: [
            "Ligne 1 : `let age = 25;` crée la variable `age` avec la valeur 25.",
            "Ligne 2 : `age = 26;` remplace la valeur : 25 devient 26.",
            "Ligne 4 : `const anneeNaissance = 1999;` crée une constante.",
            "Ligne 6 : `console.log(age)` affiche la valeur actuelle, 26.",
            "Ligne 7 : `console.log(anneeNaissance)` affiche 1999.",
          ],
        },
        { type: 'result', text: "Dans la console : deux lignes, `26` puis `1999`." },
        { type: 'mistake', text: "Tenter de changer une constante : `anneeNaissance = 2000;` provoque l'erreur « Assignment to constant variable ».", fix: "Utilisez `let` pour les valeurs qui changent, `const` pour celles qui ne changent jamais." },
        { type: 'mistake', text: "Déclarer deux fois la même variable avec `let` dans le même bloc : `let age = 25; let age = 30;` est une erreur.", fix: "Une seule déclaration avec `let`, puis seulement des affectations : `age = 30;`." },
        { type: 'quote', text: "Résumé : `let` déclare une variable modifiable, `const` une valeur fixe ; les noms sont sensibles à la casse et `var` est l'ancienne méthode à éviter." },
      ],
      exercises: [
        {
          id: 'm01-l04-e1',
          type: 'qcm',
          difficulty: 'facile',
          question: "Quelle déclaration interdit de changer la valeur ensuite ?",
          options: ['let', 'const', 'var', 'return'],
          answer: 1,
          explanation: "`const` déclare une constante : toute réaffectation lève une erreur. `let` et `var` autorisent le changement, et `return` sert à renvoyer une valeur depuis une fonction.",
        },
        {
          id: 'm01-l04-e2',
          type: 'code',
          difficulty: 'intermédiaire',
          question: "Déclarez une variable `temperature` à 20, changez-la à 23, puis affichez la valeur dans la console.",
          template: '// votre code ici\n',
          solution: `let temperature = 20;
temperature = 23;
console.log(temperature);`,
          mustContain: ['let temperature', 'temperature = 23', 'console.log'],
          hint: "Une déclaration avec `let`, une affectation, puis un affichage.",
          expectedOutput: '23',
          explanation: "`let temperature = 20;` crée la variable, `temperature = 23;` la modifie, et `console.log(temperature)` affiche 23. Avec `const`, la modification provoquerait une erreur.",
        },
        {
          id: 'm01-l04-e3',
          type: 'short',
          difficulty: 'avancé',
          question: "Quel mot-clé déclare une variable dont on peut ensuite changer la valeur ?",
          accepted: ['let'],
          explanation: "`let` crée une variable réassignable. `const` interdit le changement, et `var` est l'ancien mot-clé, fonctionnel mais déconseillé.",
        },
      ],
    },
    {
      id: 'm01-l05',
      title: 'Types de données',
      minutes: 7,
      objectives: [
        'Connaître les types de base : string, number, boolean',
        'Utiliser typeof pour interroger un type',
        'Distinguer un nombre et un texte chiffré',
      ],
      blocks: [
        { type: 'p', text: "25, « 25 » et vrai : en JavaScript, ces trois écritures ne désignent pas la même chose. Connaître les types de données évite des bugs incompréhensibles, par exemple additionner du texte et des nombres." },
        { type: 'h', text: 'Explication simple' },
        { type: 'p', text: "Un type de données décrit la nature d'une valeur. L'opérateur `typeof` (« type of », le type de) renvoie le type d'une valeur sous forme de texte." },
        {
          type: 'list',
          items: [
            "`string` : du texte, entre guillemets, par exemple `'bonjour'` ou `\"bonjour\"`.",
            "`number` : un nombre entier ou décimal, par exemple `42` ou `3.14`.",
            "`boolean` : un booléen, uniquement `true` (vrai) ou `false` (faux).",
            "`array` : un tableau, une liste ordonnée comme `[1, 2, 3]` (détail dans une leçon dédiée).",
            "`object` : un objet qui regroupe des informations, comme `{ nom: \"Alice\" }`.",
            "`undefined` : variable déclarée sans valeur ; `null` : une valeur vide laissée volontairement.",
          ],
        },
        {
          type: 'code',
          lang: 'js',
          caption: 'Le type de chaque valeur avec typeof',
          code: `console.log(typeof "Bonjour");
console.log(typeof 42);
console.log(typeof true);
console.log(typeof [1, 2, 3]);
console.log(typeof { nom: "Alice" });`,
        },
        {
          type: 'list',
          items: [
            "Ligne 1 : `\"Bonjour\"` est du texte, le type affiché est `string`.",
            "Ligne 2 : `42` est un nombre, le type affiché est `number`.",
            "Ligne 3 : `true` est un booléen, le type affiché est `boolean`.",
            "Ligne 4 : un tableau est renvoyé comme `object` : c'est un cas particulier à connaître.",
            "Ligne 5 : un objet → `object`.",
          ],
        },
        { type: 'result', text: "Dans la console, cinq lignes : `string`, `number`, `boolean`, `object`, `object`." },
        { type: 'mistake', text: "Écrire `typeof \"42\"` : les guillemets font du nombre 42 une chaîne, le type affiché sera `string`, et `\"42\" + 1` donnerait `\"421\"`.", fix: "Les nombres ne s'écrivent pas entre guillemets : `42`, pas `\"42\"`." },
        { type: 'quote', text: "Résumé : chaque valeur a un type ; `string` pour le texte, `number` pour les nombres, `boolean` pour vrai/faux, et `typeof` le révèle." },
      ],
      exercises: [
        {
          id: 'm01-l05-e1',
          type: 'qcm',
          difficulty: 'facile',
          question: "Quel est le type de la valeur \"Salut\" ?",
          options: ['string', 'number', 'boolean', 'texte'],
          answer: 0,
          explanation: "Entre guillemets, c'est une chaîne de caractères : `string`. « texte » est le nom français, mais le type s'écrit `string` en JavaScript ; ce n'est ni un nombre ni un booléen.",
        },
        {
          id: 'm01-l05-e2',
          type: 'fill',
          difficulty: 'intermédiaire',
          question: "Quel opérateur renvoie le type d'une valeur en JavaScript ?",
          accepted: ['typeof', 'type of'],
          explanation: "`typeof` est l'opérateur qui renvoie le type sous forme de texte, par exemple `typeof 42` vaut `\"number\"`. Il n'existe pas d'opérateur `type()` en JavaScript.",
        },
        {
          id: 'm01-l05-e3',
          type: 'code',
          difficulty: 'avancé',
          question: "Affichez dans la console le type de \"Bonjour\", de 7 et de false, un par ligne.",
          template: '// votre code ici\n',
          solution: `console.log(typeof "Bonjour");
console.log(typeof 7);
console.log(typeof false);`,
          mustContain: ['typeof', 'console.log'],
          hint: "Trois `console.log`, chacun avec `typeof` devant la valeur.",
          expectedOutput: 'string\nnumber\nboolean',
          explanation: "`typeof \"Bonjour\"` renvoie `string` (texte entre guillemets), `typeof 7` renvoie `number`, et `typeof false` renvoie `boolean`. Chaque appel produit une ligne dans la console.",
        },
      ],
    },
    {
      id: 'm01-l06',
      title: 'Fonctions',
      minutes: 9,
      objectives: [
        'Déclarer une fonction avec function',
        'Passer des paramètres et utiliser return',
        'Appeler une fonction pour réutiliser un traitement',
      ],
      blocks: [
        { type: 'p', text: "Vous allez devoir calculer une somme à plusieurs endroits de votre programme. Recopier le même calcul dix fois serait long et sujet aux erreurs. Une fonction regroupe une fois un traitement, pour l'utiliser à volonté." },
        { type: 'h', text: 'Explication simple' },
        { type: 'p', text: "Une fonction est un bloc de code nommé, qu'on déclare avec `function`, qu'on appelle quand on veut, et qui peut renvoyer un résultat avec `return`. On lui donne des paramètres : ce sont ses données d'entrée." },
        {
          type: 'list',
          items: [
            "Déclaration : `function nom(params) { … }`.",
            "Appel : `nom(valeur1, valeur2)` exécute la fonction.",
            "`return` renvoie une valeur et arrête immédiatement la fonction.",
            "Sans `return`, la fonction renvoie `undefined`.",
          ],
        },
        {
          type: 'code',
          lang: 'js',
          caption: 'Une fonction qui calcule une somme',
          code: `function somme(a, b) {
  return a + b;
}

const resultat = somme(3, 4);
console.log(resultat);`,
        },
        {
          type: 'list',
          items: [
            "Ligne 1 : `function somme(a, b)` déclare une fonction nommée `somme` avec deux paramètres `a` et `b`.",
            "Ligne 2 : `return a + b;` renvoie la somme des deux paramètres.",
            "Ligne 5 : `somme(3, 4)` appelle la fonction avec 3 et 4 ; le résultat, 7, est stocké dans `resultat`.",
            "Ligne 6 : `console.log(resultat)` affiche 7.",
          ],
        },
        { type: 'result', text: "Dans la console : `7`." },
        { type: 'mistake', text: "Écrire le calcul sans `return` : `function somme(a, b) { a + b; }` renvoie `undefined`, car la valeur n'est jamais renvoyée.", fix: "Ajoutez `return` devant la valeur à renvoyer : `return a + b;`." },
        { type: 'mistake', text: "Oublier les accolades : `function somme(a, b) return a + b;` est une erreur de syntaxe.", fix: "Le corps d'une fonction est toujours entouré de `{ }`." },
        { type: 'quote', text: "Résumé : une fonction regroupe un traitement réutilisable ; on la déclare avec `function`, on l'appelle avec des parenthèses, et `return` renvoie le résultat." },
      ],
      exercises: [
        {
          id: 'm01-l06-e1',
          type: 'qcm',
          difficulty: 'facile',
          question: "Que fait le mot-clé return ?",
          options: [
            "affiche à l'écran",
            "renvoie une valeur vers l'appelant de la fonction",
            "arrête le programme entier",
            "déclare une variable",
          ],
          answer: 1,
          explanation: "`return` transmet la valeur au point d'appel et termine la fonction. L'affichage est fait par `console.log`, le programme continue après la fonction, et les variables se déclarent avec `let` ou `const`.",
        },
        {
          id: 'm01-l06-e2',
          type: 'code',
          difficulty: 'intermédiaire',
          question: "Écrivez une fonction `double(n)` qui renvoie le nombre multiplié par 2, puis affichez `double(5)` dans la console.",
          template: '// votre code ici\n',
          solution: `function double(n) {
  return n * 2;
}

console.log(double(5));`,
          mustContain: ['function double', 'return', 'console.log'],
          hint: "Déclaration, puis `return n * 2`, puis un appel dans `console.log`.",
          expectedOutput: '10',
          explanation: "La fonction reçoit `n`, renvoie `n * 2` avec `return` ; l'appel `double(5)` vaut donc 10, affiché par `console.log`.",
        },
        {
          id: 'm01-l06-e3',
          type: 'debug',
          difficulty: 'avancé',
          question: "Ce code doit afficher « Bonjour Alice » mais il affiche une erreur. Trouvez les deux erreurs et corrigez-le.",
          template: `function saluer(nom) {
  console.log("Bonjour " nom)
}

saluer(Alice)`,
          solution: `function saluer(nom) {
  console.log("Bonjour " + nom);
}

saluer("Alice");`,
          mustContain: ['+ nom', '"Alice"'],
          hint: "Deux chaînes ou mots se touchent sans opérateur, et un mot entre guillemets n'est pas la même chose qu'une variable.",
          expectedOutput: 'Bonjour Alice',
          explanation: "La concaténation exige l'opérateur `+` : `\"Bonjour \" + nom`. Et `Alice` sans guillemets est cherché comme variable inexistante : le texte doit s'écrire `\"Alice\"`. La déclaration de la fonction et l'appel étaient corrects.",
        },
      ],
    },
    {
      id: 'm01-l07',
      title: 'Conditions',
      minutes: 8,
      objectives: [
        'Écrire une condition avec if / else',
        'Utiliser les comparaisons ===, >=, <',
        'Combiner des conditions avec && et ||',
      ],
      blocks: [
        { type: 'p', text: "Selon le montant du panier, une boutique affiche « livraison offerte » ou « frais de livraison ». Le programme doit décider : c'est le rôle des conditions." },
        { type: 'h', text: 'Explication simple' },
        { type: 'p', text: "Une condition teste une expression et exécute un bloc de code seulement si elle est vraie. On écrit `if (test) { … }` et, pour le cas contraire, `else { … }`." },
        {
          type: 'list',
          items: [
            "Comparaisons : `===` égal, `!==` différent, `>`, `<`, `>=`, `<=`.",
            "Préférez toujours `===` (égalité stricte) : il compare aussi les types, donc `20 === \"20\"` est faux.",
            "`&&` signifie ET : les deux tests doivent être vrais.",
            "`||` signifie OU : un seul test doit être vrai.",
            "`!` inverse un booléen : `!true` vaut `false`.",
          ],
        },
        {
          type: 'code',
          lang: 'js',
          caption: 'Une condition qui teste un âge',
          code: `const age = 20;

if (age >= 18) {
  console.log("majeur");
} else {
  console.log("mineur");
}`,
        },
        {
          type: 'list',
          items: [
            "Ligne 1 : la variable `age` vaut 20.",
            "Ligne 3 : `if (age >= 18)` teste si 20 est supérieur ou égal à 18 : c'est vrai.",
            "Lignes 4 à 6 : le bloc `if` s'exécute et affiche « majeur ».",
            "Lignes 6 à 8 : le bloc `else` est ignoré, car le test est vrai.",
          ],
        },
        { type: 'result', text: "Dans la console : `majeur`." },
        { type: 'mistake', text: "Écrire `if (age = 18)` avec un seul `=` : c'est une affectation, pas une comparaison, et la condition devient toujours vraie.", fix: "Dans un test, utilisez `===`, `>=`, `<`… jamais `=` seul." },
        { type: 'quote', text: "Résumé : `if` exécute un bloc quand le test est vrai, `else` le bloc opposé ; on compare avec `===` et on combine avec `&&` et `||`." },
      ],
      exercises: [
        {
          id: 'm01-l07-e1',
          type: 'qcm',
          difficulty: 'facile',
          question: "Que vaut l'expression `5 > 3 && 2 > 1` ?",
          options: ['true', 'false', 'une erreur', 'undefined'],
          answer: 0,
          explanation: "`5 > 3` est vrai et `2 > 1` est vrai ; avec `&&`, les deux tests étant vrais, le résultat est `true`. Ce ne peut être `false` car aucun test n'est faux, et l'expression est parfaitement valide.",
        },
        {
          id: 'm01-l07-e2',
          type: 'code',
          difficulty: 'intermédiaire',
          question: "Écrivez une fonction `estMajeur(age)` qui renvoie « majeur » si l'âge est supérieur ou égal à 18, sinon « mineur ». Affichez `estMajeur(20)` puis `estMajeur(15)`.",
          template: '// votre code ici\n',
          solution: `function estMajeur(age) {
  if (age >= 18) {
    return "majeur";
  }
  return "mineur";
}

console.log(estMajeur(20));
console.log(estMajeur(15));`,
          mustContain: ['function estMajeur', 'age >= 18', 'mineur'],
          hint: "Un `if` avec `return`, puis un second `return` pour l'autre cas.",
          expectedOutput: 'majeur\nmineur',
          explanation: "La fonction teste `age >= 18` : pour 20 le test est vrai et `return \"majeur\"` s'exécute ; pour 15 le test est faux, on arrive au second `return \"mineur\"`. Les deux appels affichent donc `majeur` puis `mineur`.",
        },
        {
          id: 'm01-l07-e3',
          type: 'fill',
          difficulty: 'avancé',
          question: "Complétez la condition : `age >= 18 ___ age <= 65` (il faut que les deux tests soient vrais).",
          accepted: ['&&', 'et'],
          explanation: "`&&` exige que les deux tests soient vrais : l'âge doit être à la fois supérieur ou égal à 18 ET inférieur ou égal à 65. Avec `||`, un âge de 10 ou de 90 passerait aussi, ce qui ne correspond pas à la consigne.",
        },
      ],
    },
    {
      id: 'm01-l08',
      title: 'Boucles',
      minutes: 8,
      objectives: [
        'Comprendre à quoi sert une boucle',
        'Écrire une boucle for avec compteur',
        'Contrôler le début, la fin et le pas',
      ],
      blocks: [
        { type: 'p', text: "Afficher « Tour 1 » à « Tour 100 » à la main serait fastidieux. Une boucle répète automatiquement un bloc d'instructions : c'est la répétition au service du programmeur." },
        { type: 'h', text: 'Explication simple' },
        { type: 'p', text: "La boucle `for` est la plus utilisée quand on sait combien de tours on veut faire. Elle s'écrit `for (début; condition; pas)` : un compteur qui démarre, un test, puis une avance après chaque tour." },
        {
          type: 'list',
          items: [
            "`let i = 0;` : le compteur démarre à 0.",
            "`i < 5;` : la boucle continue tant que la condition est vraie.",
            "`i++;` : le compteur augmente de 1 après chaque tour, équivalent à `i = i + 1`.",
            "`while (condition)` répète tant que la condition reste vraie, utile quand on ne connaît pas le nombre de tours à l'avance.",
          ],
        },
        {
          type: 'code',
          lang: 'js',
          caption: 'Une boucle qui affiche cinq tours',
          code: `for (let i = 1; i <= 5; i++) {
  console.log("Tour " + i);
}`,
        },
        {
          type: 'list',
          items: [
            "Ligne 1 : la boucle démarre avec `i = 1`.",
            "`i <= 5` : elle continue tant que `i` est inférieur ou égal à 5.",
            "`i++` : après chaque tour, `i` augmente de 1.",
            "Ligne 2 : à chaque tour, « Tour » suivi du numéro est affiché.",
          ],
        },
        { type: 'result', text: "Dans la console, cinq lignes : `Tour 1`, `Tour 2`, `Tour 3`, `Tour 4`, `Tour 5`." },
        { type: 'mistake', text: "Écrire `i >= 5` au lieu de `i <= 5` : la condition ne devient jamais fausse et la boucle tourne indéfiniment, le navigateur finit par bloquer.", fix: "Vérifiez le sens du compteur : il doit se rapprocher de la fin (`i <= 5`), et gardez `i++`." },
        { type: 'quote', text: "Résumé : une boucle `for` répète un bloc un nombre précis de fois grâce à un compteur : départ, condition de fin, puis incrément." },
      ],
      exercises: [
        {
          id: 'm01-l08-e1',
          type: 'qcm',
          difficulty: 'facile',
          question: "Combien de fois s'exécute `for (let i = 0; i < 5; i++)` ?",
          options: ['4 fois', '5 fois', '6 fois', 'une infinité de fois'],
          answer: 1,
          explanation: "`i` prend les valeurs 0, 1, 2, 3, 4 : cinq tours. À `i = 5`, le test `i < 5` devient faux et la boucle s'arrête. Ce serait 4 tours avec `i <= 4`, et `i >= 5` provoquerait une boucle infinie.",
        },
        {
          id: 'm01-l08-e2',
          type: 'code',
          difficulty: 'intermédiaire',
          question: "Affichez les nombres 1 à 5, un par ligne, avec une boucle for.",
          template: '// votre code ici\n',
          solution: `for (let i = 1; i <= 5; i++) {
  console.log(i);
}`,
          mustContain: ['for (', 'i++', 'console.log'],
          hint: "Le compteur part à 1 et s'arrête à 5.",
          expectedOutput: '1\n2\n3\n4\n5',
          explanation: "Le compteur `i` vaut 1 puis 2, 3, 4, 5 ; `i <= 5` permet ces cinq valeurs, `i++` l'incrémente, et `console.log(i)` affiche chacune sur sa ligne.",
        },
        {
          id: 'm01-l08-e3',
          type: 'fill',
          difficulty: 'avancé',
          question: "Dans `for (let i = 0; i < 5; i++)`, quelle partie indique quand la boucle doit s'arrêter ?",
          accepted: ['i < 5', 'la condition', 'condition'],
          explanation: "C'est le test du milieu : dès qu'il devient faux (`i = 5`), la boucle s'arrête. `let i = 0` fixe le départ, `i++` fait avancer le compteur.",
        },
      ],
    },
    {
      id: 'm01-l09',
      title: 'Tableaux',
      minutes: 9,
      objectives: [
        'Créer un tableau avec des crochets',
        'Accéder aux éléments par leur index',
        'Ajouter un élément avec push et lire la longueur',
      ],
      blocks: [
        { type: 'p', text: "Liste de courses, classement d'une course, panier d'un site : les données arrivent souvent en série. Un tableau JavaScript range une liste de valeurs dans un ordre précis." },
        { type: 'h', text: 'Explication simple' },
        { type: 'p', text: "Un tableau (array) est une liste ordonnée entre crochets. Chaque élément possède un numéro d'appel, l'index, qui commence à 0 : le premier élément est donc à l'index 0, le deuxième à 1, et ainsi de suite." },
        {
          type: 'list',
          items: [
            "Création : `const fruits = [\"pomme\", \"banane\"];`",
            "Accès : `fruits[0]` renvoie « pomme ».",
            "Taille : `fruits.length` donne le nombre d'éléments.",
            "`fruits.push(\"datte\")` ajoute un élément à la fin.",
            "`fruits.pop()` retire le dernier élément.",
          ],
        },
        {
          type: 'code',
          lang: 'js',
          caption: 'Créer, compléter et parcourir un tableau',
          code: `const fruits = ["pomme", "banane", "cerise"];

console.log(fruits[0]);
fruits.push("datte");
console.log(fruits.length);
console.log(fruits[2]);`,
        },
        {
          type: 'list',
          items: [
            "Ligne 1 : le tableau contient trois chaînes, aux index 0 à 2.",
            "Ligne 3 : `fruits[0]` affiche le premier élément : « pomme ».",
            "Ligne 4 : `push` ajoute « datte » à la fin : le tableau compte maintenant 4 éléments.",
            "Ligne 5 : `fruits.length` affiche 4.",
            "Ligne 6 : `fruits[2]` affiche le troisième élément : « cerise » (« datte » est à l'index 3).",
          ],
        },
        { type: 'result', text: "Dans la console : `pomme`, puis `4`, puis `cerise`." },
        { type: 'mistake', text: "Chercher le premier élément avec `fruits[1]` : les index commencent à 0, donc `fruits[1]` renvoie le deuxième élément, et un index trop grand renvoie `undefined`.", fix: "Pensez « index 0 = premier » : le dernier index d'un tableau est `length - 1`." },
        { type: 'quote', text: "Résumé : un tableau est une liste indexée à partir de 0 ; on lit avec `tableau[i]`, on compte avec `.length` et on ajoute avec `.push()`." },
      ],
      exercises: [
        {
          id: 'm01-l09-e1',
          type: 'qcm',
          difficulty: 'facile',
          question: "Quel est l'index du premier élément d'un tableau ?",
          options: ['0', '1', "le numéro de l'élément", '-1'],
          answer: 0,
          explanation: "Les index démarrent toujours à 0 : le premier élément est `tableau[0]`, le deuxième `tableau[1]`. L'index 1 désigne donc le deuxième élément, et -1 n'est pas un index valide.",
        },
        {
          id: 'm01-l09-e2',
          type: 'code',
          difficulty: 'intermédiaire',
          question: "Créez un tableau `animaux` avec « chat » et « chien », ajoutez « lapin », puis affichez le premier élément et la longueur du tableau.",
          template: '// votre code ici\n',
          solution: `const animaux = ["chat", "chien"];
animaux.push("lapin");
console.log(animaux[0]);
console.log(animaux.length);`,
          mustContain: ['push', 'length', 'animaux[0]'],
          hint: "Un `push`, puis deux `console.log` : l'élément d'index 0 et `length`.",
          expectedOutput: 'chat\n3',
          explanation: "`push(\"lapin\")` ajoute à la fin : le tableau compte 3 éléments. `animaux[0]` renvoie « chat », et `animaux.length` vaut 3.",
        },
        {
          id: 'm01-l09-e3',
          type: 'short',
          difficulty: 'avancé',
          question: "Quelle méthode ajoute un élément à la fin d'un tableau ?",
          accepted: ['push', '.push'],
          explanation: "`push()` ajoute à la fin du tableau et augmente `length`. `pop()` fait l'inverse : il retire le dernier élément.",
        },
      ],
    },
    {
      id: 'm01-l10',
      title: 'Objets',
      minutes: 9,
      objectives: [
        'Créer un objet littéral avec des propriétés',
        'Lire et modifier une propriété avec le point',
        'Distinguer un tableau d’un objet',
      ],
      blocks: [
        { type: 'p', text: "Un tableau range des valeurs dans l'ordre, mais pour décrire une personne, on préfère des noms explicites : nom, âge, ville. C'est le rôle d'un objet." },
        { type: 'h', text: 'Explication simple' },
        { type: 'p', text: "Un objet regroupe des propriétés sous forme de paires clé : valeur, entre accolades. La clé nomme l'information, la valeur la porte. On accède à une propriété avec le point : `personne.nom`." },
        {
          type: 'list',
          items: [
            "Création : `const personne = { nom: \"Alice\", age: 30 };`",
            "Lecture : `personne.nom` renvoie « Alice ».",
            "Modification : `personne.age = 31;` met à jour la propriété.",
            "Les propriétés sont séparées par des virgules ; la dernière n'en a pas besoin.",
            "Un tableau est une liste indexée, un objet est un ensemble nommé : on choisit selon la forme des données.",
          ],
        },
        {
          type: 'code',
          lang: 'js',
          caption: 'Créer, lire et modifier un objet',
          code: `const personne = {
  nom: "Alice",
  age: 30,
  ville: "Lyon"
};

console.log(personne.nom);
personne.age = 31;
console.log(personne.age);`,
        },
        {
          type: 'list',
          items: [
            "Lignes 1 à 5 : l'objet `personne` regroupe trois propriétés.",
            "Ligne 7 : `personne.nom` lit la propriété `nom` → « Alice ».",
            "Ligne 8 : `personne.age = 31;` remplace 30 par 31.",
            "Ligne 9 : `personne.age` affiche la nouvelle valeur, 31.",
          ],
        },
        { type: 'result', text: "Dans la console : `Alice` puis `31`." },
        { type: 'mistake', text: "Écrire `personne nom` sans le point : JavaScript croit à une instruction invalide et affiche une erreur de syntaxe.", fix: "Toujours le point pour accéder à une propriété : `personne.nom`." },
        { type: 'mistake', text: "Oublier la virgule entre deux propriétés : `nom: \"Alice\" age: 30` casse l'objet.", fix: "Séparez chaque paire clé : valeur par une virgule." },
        { type: 'quote', text: "Résumé : un objet regroupe des propriétés nommées ; on les lit et les modifie avec le point, et les paires sont séparées par des virgules." },
      ],
      exercises: [
        {
          id: 'm01-l10-e1',
          type: 'qcm',
          difficulty: 'facile',
          question: "Comment accéder à la propriété `age` de l'objet `chat` ?",
          options: ['chat.age', 'age.chat', 'chat->age', 'chat(age)'],
          answer: 0,
          explanation: "L'accès se fait avec le point : `chat.age`. `age.chat` inverse les rôles, `->` n'existe pas en JavaScript et `chat(age)` serait un appel de fonction.",
        },
        {
          id: 'm01-l10-e2',
          type: 'code',
          difficulty: 'intermédiaire',
          question: "Créez un objet `voiture` avec `marque: \"Renault\"` et `km: 0`, passez `km` à 150, puis affichez la marque et le kilométrage.",
          template: '// votre code ici\n',
          solution: `const voiture = { marque: "Renault", km: 0 };
voiture.km = 150;
console.log(voiture.marque);
console.log(voiture.km);`,
          mustContain: ['const voiture', 'voiture.km = 150', 'console.log'],
          hint: "L'objet, puis une affectation avec le point, puis deux affichages.",
          expectedOutput: 'Renault\n150',
          explanation: "L'objet porte les clés `marque` et `km`. `voiture.km = 150;` met à jour le kilométrage, puis `voiture.marque` et `voiture.km` affichent les valeurs actuelles : `Renault` et `150`.",
        },
        {
          id: 'm01-l10-e3',
          type: 'fill',
          difficulty: 'avancé',
          question: "Un objet associe une ___ à une valeur.",
          accepted: ['cle', 'clé', 'propriete', 'propriété'],
          explanation: "Chaque propriété est une paire clé (le nom) : valeur. C'est bien la clé qui porte le nom de l'information, contrairement au tableau où l'élément est désigné par son index numérique.",
        },
      ],
    },
    {
      id: 'm01-l11',
      title: 'Fonctions fléchées',
      minutes: 7,
      objectives: [
        'Écrire une fonction fléchée avec =>',
        'Utiliser le renvoi automatique d’une expression',
        'Lire les fonctions fléchées rencontrées dans React',
      ],
      blocks: [
        { type: 'p', text: "Depuis ES6, JavaScript propose une écriture plus courte pour les fonctions. Elle est partout dans le code React : mieux vaut la reconnaître dès maintenant." },
        { type: 'h', text: 'Explication simple' },
        { type: 'p', text: "Une fonction fléchée (arrow function, « fonction à flèche ») s'écrit avec `=>` après les paramètres. Si le corps tient en une seule expression, on peut supprimer les accolades et le mot-clé `return` : la valeur est renvoyée automatiquement." },
        {
          type: 'list',
          items: [
            "Avec paramètres : `(a, b) => a + b`.",
            "Sans paramètre : `() => \"Bonjour\"`.",
            "Un seul paramètre : les parenthèses sont facultatives, `n => n * 2`.",
            "Avec plusieurs instructions : il faut les accolades et un `return` explicite.",
          ],
        },
        {
          type: 'code',
          lang: 'js',
          caption: 'Deux fonctions fléchées',
          code: `const double = (n) => n * 2;
const direBonjour = () => "Bonjour !";

console.log(double(5));
console.log(direBonjour());`,
        },
        {
          type: 'list',
          items: [
            "Ligne 1 : `double` est une fonction fléchée : `(n)` sont les paramètres, `=>` la flèche, `n * 2` le résultat renvoyé.",
            "Ligne 2 : sans paramètre, on écrit `()` avant la flèche.",
            "Ligne 4 : `double(5)` renvoie 10.",
            "Ligne 5 : `direBonjour()` renvoie « Bonjour ! ».",
          ],
        },
        { type: 'result', text: "Dans la console : `10` puis `Bonjour !`." },
        { type: 'mistake', text: "Écrire `const carre = (n) => { n * n };` : les accolades annulent le renvoi automatique, la fonction renvoie `undefined`.", fix: "Soit une expression sans accolades (`n => n * n`), soit des accolades avec `return n * n;`." },
        { type: 'quote', text: "Résumé : `params => expression` écrit une fonction en une ligne ; sans accolades, la valeur est renvoyée automatiquement." },
      ],
      exercises: [
        {
          id: 'm01-l11-e1',
          type: 'qcm',
          difficulty: 'facile',
          question: "Quelle est la forme correcte d'une fonction fléchée ?",
          options: [
            'const f = (x) => x + 1;',
            'const f = (x) -> x + 1;',
            'function f = (x) => x + 1;',
            'const f = => x + 1;',
          ],
          answer: 0,
          explanation: "La flèche `=>` suit les paramètres entre parenthèses. `->` n'est pas la syntaxe JavaScript, `function` ne se combine pas avec la flèche de cette façon, et la troisième option oublie les paramètres.",
        },
        {
          id: 'm01-l11-e2',
          type: 'code',
          difficulty: 'intermédiaire',
          question: "Écrivez une fonction fléchée `carre(n)` qui renvoie n multiplié par lui-même, puis affichez `carre(4)`.",
          template: '// votre code ici\n',
          solution: `const carre = (n) => n * n;
console.log(carre(4));`,
          mustContain: ['=>', 'carre', 'console.log'],
          hint: "Une seule expression après la flèche : pas besoin de `return` ni d'accolades.",
          expectedOutput: '16',
          explanation: "`(n) => n * n` renvoie automatiquement `n * n` car le corps est une expression unique. `carre(4)` vaut donc 16, affiché par `console.log`.",
        },
        {
          id: 'm01-l11-e3',
          type: 'short',
          difficulty: 'avancé',
          question: "Quel symbole caractérise une fonction fléchée ?",
          accepted: ['=>', 'fleche', 'flèche', 'arrow'],
          explanation: "C'est la flèche `=>` (« arrow » en anglais) placée après les paramètres. C'est elle qui distingue une fonction fléchée d'une déclaration `function` classique.",
        },
      ],
    },
    {
      id: 'm01-l12',
      title: 'Méthodes map, filter et reduce',
      minutes: 10,
      objectives: [
        'Transformer un tableau avec map',
        'Filtrer un tableau avec filter',
        'Cumuler les valeurs avec reduce',
      ],
      blocks: [
        { type: 'p', text: "Doubler chaque prix, ne garder que les petits prix, calculer un total : trois opérations classiques sur des listes. JavaScript les prévoit déjà avec map, filter et reduce." },
        { type: 'h', text: 'Explication simple' },
        { type: 'p', text: "Ce sont des méthodes : des fonctions déjà fournies avec les tableaux. Elles ne modifient pas le tableau d'origine, elles renvoient un nouveau résultat. On leur passe souvent une fonction fléchée." },
        {
          type: 'list',
          items: [
            "`map(fonction)` : transforme chaque élément et renvoie un nouveau tableau de même longueur.",
            "`filter(fonction)` : garde uniquement les éléments pour lesquels la fonction renvoie `true`.",
            "`reduce(fonction, valeurInitiale)` : accumule tous les éléments en une seule valeur (somme, compteur…).",
          ],
        },
        {
          type: 'code',
          lang: 'js',
          caption: 'map, filter et reduce sur une liste de prix',
          code: `const prix = [10, 20, 30];

const doubles = prix.map((p) => p * 2);
console.log(doubles);

const petits = prix.filter((p) => p < 25);
console.log(petits);

const total = prix.reduce((somme, p) => somme + p, 0);
console.log(total);`,
        },
        {
          type: 'list',
          items: [
            "Ligne 1 : `prix` contient trois nombres.",
            "Ligne 3 : `map` multiplie chaque prix par 2 → `[20, 40, 60]`, stocké dans `doubles`.",
            "Ligne 6 : `filter` garde les prix strictement inférieurs à 25 → `[10, 20]`.",
            "Ligne 9 : `reduce` additionne les prix en partant de 0 → 60 ; `somme` est l'accumulateur, `0` la valeur de départ.",
          ],
        },
        { type: 'result', text: "Dans la console : `[20, 40, 60]`, puis `[10, 20]`, puis `60`." },
        { type: 'mistake', text: "Écrire `prix.map((p) => p * 2);` sans stocker le résultat : le nouveau tableau existe mais rien ne l'affiche, et le tableau d'origine reste inchangé.", fix: "Affectez toujours le résultat : `const doubles = prix.map(...)`." },
        { type: 'mistake', text: "Écrire `prix.filter(\"p < 25\")` : la condition doit être une fonction, pas du texte entre guillemets.", fix: "`prix.filter((p) => p < 25)`." },
        { type: 'quote', text: "Résumé : `map` transforme, `filter` sélectionne, `reduce` cumule ; les trois renvoient un nouveau résultat sans modifier le tableau d'origine." },
      ],
      exercises: [
        {
          id: 'm01-l12-e1',
          type: 'qcm',
          difficulty: 'facile',
          question: "Que renvoie la méthode map ?",
          options: [
            'un nouveau tableau transformé',
            'le tableau modifié en place',
            'un seul nombre',
            "rien, elle affiche à l'écran",
          ],
          answer: 0,
          explanation: "`map` crée et renvoie un nouveau tableau, l'original restant intact. Elle ne modifie pas en place (c'est plutôt `push` ou `sort` qui agit ainsi), elle ne produit ni nombre unique (c'est `reduce`) et ne fait aucun affichage.",
        },
        {
          id: 'm01-l12-e2',
          type: 'code',
          difficulty: 'intermédiaire',
          question: "Avec `nombres = [1, 2, 3, 4, 5, 6]`, affichez d'abord les nombres pairs avec `filter`, puis la somme de tous avec `reduce`.",
          template: `const nombres = [1, 2, 3, 4, 5, 6];

// votre code ici
`,
          solution: `const nombres = [1, 2, 3, 4, 5, 6];

const pairs = nombres.filter((n) => n % 2 === 0);
console.log(pairs);

const somme = nombres.reduce((acc, n) => acc + n, 0);
console.log(somme);`,
          mustContain: ['filter', 'reduce', 'console.log'],
          hint: "Un par pair est un nombre dont le reste de la division par 2 est 0 (`%`).",
          expectedOutput: '[2, 4, 6]\n21',
          explanation: "`n % 2 === 0` teste la parité : `filter` garde 2, 4 et 6. `reduce` part de 0 et ajoute chaque nombre : 1+2+3+4+5+6 = 21. Les deux résultats s'affichent sur deux lignes.",
        },
        {
          id: 'm01-l12-e3',
          type: 'fill',
          difficulty: 'avancé',
          question: "___ conserve uniquement les éléments qui vérifient une condition.",
          accepted: ['filter'],
          explanation: "`filter` garde les éléments pour lesquels la fonction renvoie `true` et écarte les autres. `map` transforme tous les éléments sans en écarter, et `reduce` ne renvoie pas un tableau mais une seule valeur.",
        },
      ],
    },
    {
      id: 'm01-l13',
      title: 'Introduction à ES6',
      minutes: 8,
      objectives: [
        'Savoir ce qu’apporte ES6',
        'Utiliser les template literals avec ${}',
        'Découvrir la déstructuration et les modules',
      ],
      blocks: [
        { type: 'p', text: "En 2015, le JavaScript a reçu une grande mise à jour, appelée ES6 (ECMAScript 2015). Beaucoup de syntaxe que vous venez d'apprendre en vient. React s'appuie dessus : faisons le tour des ajouts que vous rencontrerez." },
        { type: 'h', text: 'Explication simple' },
        { type: 'p', text: "ES6 a modernisé le langage : variables `let` et `const`, fonctions fléchées (déjà vues), template literals pour les chaînes, déstructuration pour extraire des valeurs, et les modules `export` / `import` pour partager du code entre fichiers. Vite et React utilisent tous ces outils." },
        {
          type: 'list',
          items: [
            "`let` et `const` remplacent `var` (vu dans la leçon sur les variables).",
            "Les template literals s'écrivent entre accents graves et interpolent une valeur avec `${variable}`.",
            "La déstructuration extrait des valeurs d'un objet ou d'un tableau dans des variables, en une seule ligne.",
            "`export` / `import` partagent du code entre fichiers : c'est la base des composants React.",
          ],
        },
        {
          type: 'code',
          lang: 'js',
          caption: 'Template literals et déstructuration',
          code: 'const prenom = "Alice";\n\nconsole.log(`Bonjour ${prenom} !`);\n\nconst personne = { prenom: "Bob", ville: "Paris" };\nconst { prenom: nom, ville } = personne;\n\nconsole.log(nom);\nconsole.log(ville);',
        },
        {
          type: 'list',
          items: [
            "Ligne 1 : `const prenom = \"Alice\";` déclare le prénom.",
            "Ligne 3 : les accents graves délimitent la chaîne, `${prenom}` est remplacé par la valeur → « Bonjour Alice ! ».",
            "Ligne 5 : `personne` est un objet avec deux propriétés.",
            "Ligne 6 : la déstructuration crée `nom` (qui reçoit `prenom`) et `ville` en une seule ligne.",
            "Lignes 8 et 9 : `nom` vaut « Bob », `ville` vaut « Paris ».",
          ],
        },
        { type: 'result', text: "Dans la console : `Bonjour Alice !`, puis `Bob`, puis `Paris`." },
        { type: 'mistake', text: "Écrire `Bonjour {prenom}` sans le `$` : la valeur n'est pas remplacée, le navigateur affiche littéralement `{prenom}`.", fix: "N'oubliez jamais le dollar : `${prenom}`." },
        { type: 'quote', text: "Résumé : ES6 modernise JavaScript avec let/const, les fonctions fléchées, les template literals, la déstructuration et les modules — tout ce qu'utilise React." },
      ],
      exercises: [
        {
          id: 'm01-l13-e1',
          type: 'qcm',
          difficulty: 'facile',
          question: "À quoi servent les template literals (accents graves) ?",
          options: [
            "écrire une chaîne en y injectant des valeurs avec ${}",
            'déclarer des constantes',
            'commenter le code',
            'fermer une balise HTML',
          ],
          answer: 0,
          explanation: "Les accents graves délimitent une chaîne dans laquelle `${expression}` insère une valeur calculée. `const` sert à déclarer, `//` sert à commenter, et les balises HTML n'ont rien à voir avec les chaînes JavaScript.",
        },
        {
          id: 'm01-l13-e2',
          type: 'code',
          difficulty: 'intermédiaire',
          question: "Créez une variable `ville` contenant « Lyon », puis affichez avec un template literal : Nous sommes à Lyon.",
          template: '// votre code ici\n',
          solution: 'const ville = "Lyon";\nconsole.log(`Nous sommes à ${ville}.`);',
          mustContain: ['${ville}', 'const ville'],
          hint: "La chaîne s'ouvre avec un accent grave et contient `${ville}`.",
          expectedOutput: 'Nous sommes à Lyon.',
          explanation: "Les accents graves permettent d'injecter `${ville}` dans la chaîne : le navigateur remplace la variable par sa valeur « Lyon » et affiche « Nous sommes à Lyon. ». Avec des guillemets simples, `${ville}` resterait du texte brut.",
        },
        {
          id: 'm01-l13-e3',
          type: 'short',
          difficulty: 'avancé',
          question: "Quel mot-clé exporte une valeur depuis un module ?",
          accepted: ['export'],
          explanation: "`export` rend une valeur disponible pour les autres fichiers, qui la récupèrent avec `import`. C'est ainsi que chaque composant React est partagé entre les fichiers d'un projet.",
        },
      ],
    },
  ],
};
