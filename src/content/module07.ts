import type { Module } from '../types';

export const module07: Module = {
  id: 'm07',
  number: 7,
  icon: '🖱️',
  level: 'Débutant confirmé',
  title: "Les événements",
  description: "Réagissez aux clics, saisies et soumissions avec les événements React.",
  lessons: [
    // ============================================================
    // Leçon 1 — onClick
    // ============================================================
    {
      id: 'm07-l01',
      title: "onClick : réagir à un clic",
      minutes: 7,
      objectives: [
        "Brancher une fonction sur le clic d'un bouton",
        "Exécuter du code à chaque clic",
        "Distinguer onClick={maFonction} de onClick={maFonction()}",
      ],
      blocks: [
        { type: 'p', text: "Imaginez un bouton « Ajouter au panier ». Tant que le visiteur ne clique pas, rien ne se passe : c'est lui qui déclenche l'action. En React, on branche une fonction sur le clic grâce à la propriété onClick." },
        { type: 'h', text: "Explication simple" },
        { type: 'p', text: "Un événement est une action de l'utilisateur : un clic, une frappe au clavier, le passage de la souris... React décrit ces actions directement dans le JSX, avec un nom en camelCase. Pour le clic, on écrit onClick." },
        { type: 'list', items: [
          "onClick se déclenche à chaque clic sur l'élément qui le porte.",
          "Entre accolades { }, React attend une fonction : c'est elle qui s'exécute.",
          "Le nom est en camelCase : onClick, jamais onclick en minuscules.",
        ] },
        { type: 'code', lang: 'jsx', code: `function Panier() {
  function ajouter() {
    console.log("Article ajouté au panier !");
  }

  return <button onClick={ajouter}>Ajouter au panier</button>;
}

ReactDOM.createRoot(document.getElementById("root")).render(<Panier />);`, caption: "Un bouton qui réagit au clic" },
        { type: 'list', items: [
          "Ligne 1 : `function Panier()` déclare le composant.",
          "Ligne 2 : `ajouter` est la fonction qui contiendra ce qui se passe au clic.",
          "Ligne 3 : `console.log` écrit un message dans la console du navigateur (touche F12).",
          "`<button onClick={ajouter}>` : la fonction est branchée sur le bouton grâce aux accolades.",
          "Dernière ligne : React affiche le composant dans le conteneur `root` de la page.",
        ] },
        { type: 'result', text: "À l'écran : un bouton « Ajouter au panier ». Au clic, le message « Article ajouté au panier ! » s'écrit dans la console." },
        { type: 'mistake', text: "Écrire `onClick={ajouter()}` : les parenthèses exécutent la fonction pendant le rendu, au lieu de l'attendre. Le message s'affiche alors dès l'affichage de la page.", fix: "Écrire `onClick={ajouter}` : on donne la fonction elle-même, sans parenthèses." },
        { type: 'mistake', text: "Écrire `onclick` en minuscules : React n'attache rien et le clic ne déclenche rien.", fix: "Respecter exactement la casse : `onClick`." },
        { type: 'quote', text: "Résumé : onClick reçoit une fonction qui s'exécute à chaque clic ; on l'écrit entre accolades, sans parenthèses." },
      ],
      exercises: [
        {
          id: 'm07-l01-e1',
          type: 'qcm',
          difficulty: 'facile',
          question: "Que fait exactement `onClick={afficher}` ?",
          options: [
            "Elle appelle afficher au moment du rendu du composant",
            "Elle branche afficher sur le clic : elle sera appelée à chaque clic",
            "Elle écrit le texte de afficher dans le HTML",
            "Elle déclare une nouvelle fonction nommée afficher",
          ],
          answer: 1,
          explanation: "Entre accolades, React reçoit une référence vers la fonction : elle n'est pas appelée tout de suite, elle le sera à chaque clic. L'option 0 est fausse car appeler la fonction au rendu demanderait des parenthèses, ce qui déclencherait l'action immédiatement. L'option 2 confond branchement et affichage : onClick ne produit pas de texte. L'option 3 est fausse : afficher est déjà déclarée ailleurs, onClick ne la déclare pas.",
        },
        {
          id: 'm07-l01-e2',
          type: 'fill',
          difficulty: 'facile',
          question: "Complétez pour que le clic exécute la fonction : <button ______={afficher}>Clic</button>",
          accepted: ["onclick"],
          hint: "La propriété est en camelCase : une minuscule puis une majuscule.",
          explanation: "La propriété JSX s'écrit `onClick` : le `o` minuscule suivie du `N` majuscule. La comparaison se fait sans tenir compte de la casse, donc `onclick` accepté correspond bien à la bonne réponse `onClick`.",
        },
        {
          id: 'm07-l01-e3',
          type: 'code',
          difficulty: 'intermédiaire',
          language: 'jsx',
          question: "Créez un composant `Like` qui affiche un bouton « J'aime » et qui écrit « Clic enregistré ! » dans la console à chaque clic. Affichez le composant dans la page.",
          template: `function Like() {
  // votre code ici
}
`,
          solution: `function Like() {
  function aimer() {
    console.log("Clic enregistré !");
  }

  return <button onClick={aimer}>J'aime</button>;
}

ReactDOM.createRoot(document.getElementById("root")).render(<Like />);`,
          mustContain: ["onClick", "console.log"],
          hint: "Déclarez d'abord une fonction qui écrit dans la console, puis référencez-la dans onClick.",
          explanation: "Le composant définit une fonction `aimer` qui appelle `console.log`, puis passe cette fonction à `onClick` entre accolades : le message s'affiche uniquement au clic. `ReactDOM.createRoot(...).render(<Like />)` insère le bouton dans la page, sans quoi rien ne serait visible. Si l'élève avait écrit `onClick={aimer()}`, le message s'afficherait au rendu, pas au clic.",
        },
      ],
    },

    // ============================================================
    // Leçon 2 — onChange
    // ============================================================
    {
      id: 'm07-l02',
      title: "onChange : réagir à la saisie",
      minutes: 8,
      objectives: [
        "Réagir à chaque frappe dans un champ de saisie",
        "Lire la valeur courante d'un champ avec event.target.value",
        "Distinguer onChange de onClick sur un champ",
      ],
      blocks: [
        { type: 'p', text: "Vous avez sûrement déjà utilisé une barre de recherche qui affiche les suggestions pendant que vous tapez. Pour cela, il faut réagir à chaque lettre saisie : c'est le rôle de l'événement onChange." },
        { type: 'h', text: "Explication simple" },
        { type: 'p', text: "onChange se déclenche à chaque modification de la valeur d'un champ : <input>, <textarea> ou <select>. Le gestionnaire reçoit automatiquement un objet appelé event, qui décrit l'action. Sa propriété `event.target` désigne l'élément concerné, et `event.target.value` contient le texte actuellement saisi." },
        { type: 'list', items: [
          "onChange fonctionne sur les champs de saisie : input, textarea, select.",
          "L'événement reçu possède `target` : c'est l'élément qui a déclenché l'événement.",
          "`event.target.value` donne le texte contenu dans le champ au moment de la frappe.",
          "Le gestionnaire est appelé à chaque lettre tapée, pas seulement à la fin.",
        ] },
        { type: 'code', lang: 'jsx', code: `function Recherche() {
  function afficherSaisie(event) {
    console.log("Vous tapez : " + event.target.value);
  }

  return <input type="text" placeholder="Tapez ici" onChange={afficherSaisie} />;
}

ReactDOM.createRoot(document.getElementById("root")).render(<Recherche />);`, caption: "Un champ qui lit chaque frappe" },
        { type: 'list', items: [
          "`function afficherSaisie(event)` : le gestionnaire reçoit automatiquement un objet `event`.",
          "`event.target` : le champ qui a déclenché l'événement.",
          "`event.target.value` : le texte du champ au moment de la frappe.",
          "`onChange={afficherSaisie}` : appelé à chaque lettre tapée.",
          "Le `+` assemble le texte fixe et la saisie pour former un message complet.",
        ] },
        { type: 'result', text: "À l'écran : un champ de saisie. Chaque lettre tapée écrit dans la console « Vous tapez : h », puis « Vous tapez : he », puis « Vous tapez : hel », etc." },
        { type: 'mistake', text: "Utiliser onClick sur un champ de saisie : il ne se déclenche qu'au clic dans le champ, pas à chaque frappe.", fix: "Utiliser `onChange` pour réagir à chaque modification de la valeur." },
        { type: 'mistake', text: "Lire la saisie avec `event.value` : cette propriété n'existe pas sur l'événement, elle renvoie undefined.", fix: "Passer par `event.target.value` : le champ se trouve dans `target`." },
        { type: 'quote', text: "Résumé : onChange se déclenche à chaque modification d'un champ ; la saisie courante se lit dans event.target.value." },
      ],
      exercises: [
        {
          id: 'm07-l02-e1',
          type: 'qcm',
          difficulty: 'facile',
          question: "À quelle action onChange réagit-il ?",
          options: [
            "Au clic sur le champ de saisie",
            "À chaque modification de la valeur du champ",
            "À l'envoi du formulaire",
            "Au survol de la souris au-dessus du champ",
          ],
          answer: 1,
          explanation: "onChange est l'événement des champs : il se déclenche à chaque frappe qui change la valeur. Le clic (option 0) déclencherait onClick, la soumission (option 2) onSubmit, le survol (option 3) onMouseOver : ce sont trois événements différents.",
        },
        {
          id: 'm07-l02-e2',
          type: 'short',
          difficulty: 'intermédiaire',
          question: "Dans un gestionnaire onChange, quelle expression contient le texte actuellement saisi dans le champ ?",
          accepted: ["event.target.value", "e.target.value", "target.value"],
          hint: "L'événement, puis l'élément, puis la valeur.",
          explanation: "L'objet `event` décrit l'action, `event.target` est l'élément qui l'a déclenché (le champ), et `event.target.value` est sa valeur courante. `e.target.value` est simplement une convention d'abréviation de `event`, donc les deux formulations sont correctes.",
        },
        {
          id: 'm07-l02-e3',
          type: 'debug',
          difficulty: 'intermédiaire',
          language: 'jsx',
          question: "Ce champ affiche toujours « Saisie : » sans jamais rien ajouter, et rien ne se passe quand on tape. Trouvez les deux erreurs et corrigez le code.",
          template: `function Champ() {
  function afficher(event) {
    console.log("Saisie : " + event.value);
  }

  return <input type="text" onClick={afficher} />;
}

ReactDOM.createRoot(document.getElementById("root")).render(<Champ />);`,
          solution: `function Champ() {
  function afficher(event) {
    console.log("Saisie : " + event.target.value);
  }

  return <input type="text" onChange={afficher} />;
}

ReactDOM.createRoot(document.getElementById("root")).render(<Champ />);`,
          mustContain: ["onChange", "event.target.value"],
          hint: "Une erreur concerne le nom de l'événement, l'autre l'emplacement de la valeur.",
          explanation: "Première erreur : `onClick` ne convient pas à un champ, c'est `onChange` qui se déclenche à chaque frappe. Deuxième erreur : `event.value` n'existe pas, la valeur du champ se lit dans `event.target.value` (target est l'élément concerné). Corrigé ainsi, chaque frappe écrit « Saisie : suivi du texte saisi ».",
        },
      ],
    },

    // ============================================================
    // Leçon 3 — onSubmit
    // ============================================================
    {
      id: 'm07-l03',
      title: "onSubmit : gérer l'envoi d'un formulaire",
      minutes: 8,
      objectives: [
        "Brancher un gestionnaire sur la soumission d'un formulaire",
        "Empêcher le rechargement de la page avec preventDefault",
        "Lire la valeur d'un champ lors de l'envoi",
      ],
      blocks: [
        { type: 'p', text: "Newsletter, formulaire de contact, inscription : presque tous les sites demandent de valider un formulaire. Quand l'utilisateur clique sur « Envoyer » ou appuie sur Entrée, React doit le savoir : c'est l'événement onSubmit." },
        { type: 'h', text: "Explication simple" },
        { type: 'p', text: "onSubmit se déclenche lors de la soumission d'un formulaire, c'est-à-dire au clic sur un bouton `type=\"submit\"` ou à l'appui sur la touche Entrée dans un champ. Le gestionnaire reçoit l'objet `event`. En HTML classique, soumettre un formulaire recharge la page : on annule ce comportement avec `event.preventDefault()`." },
        { type: 'list', items: [
          "onSubmit se place sur l'élément <form>, pas sur le bouton.",
          "La soumission arrive au clic sur `type=\"submit\"` ou avec la touche Entrée.",
          "`event.preventDefault()` empêche le rechargement de la page.",
          "Sans preventDefault, React démonte l'interface et tout le travail est perdu.",
        ] },
        { type: 'code', lang: 'jsx', code: `function Inscription() {
  function envoyer(event) {
    event.preventDefault();
    console.log("Formulaire envoyé !");
  }

  return (
    <form onSubmit={envoyer}>
      <input type="email" placeholder="Votre adresse email" />
      <button type="submit">S'inscrire</button>
    </form>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<Inscription />);`, caption: "Un formulaire qui ne recharge pas la page" },
        { type: 'list', items: [
          "`onSubmit={envoyer}` : la fonction `envoyer` sera appelée à la soumission du formulaire.",
          "`event.preventDefault()` : annule l'action par défaut du HTML, à savoir le rechargement de la page.",
          "`<form>` englobe le champ et le bouton : c'est lui qui reçoit l'événement.",
          "`type=\"submit\"` indique que ce bouton soumet le formulaire.",
          "La dernière ligne affiche le formulaire dans la page.",
        ] },
        { type: 'result', text: "À l'écran : un champ email et un bouton « S'inscrire ». Au clic (ou avec Entrée), la page reste affichée et la console écrit « Formulaire envoyé ! »." },
        { type: 'mistake', text: "Oublier `event.preventDefault()` : la page se recharge, l'écran revient à son état initial et tout résultat disparaît.", fix: "Toujours appeler `event.preventDefault()` en premier dans le gestionnaire de soumission." },
        { type: 'mistake', text: "Placer onSubmit sur le bouton : l'événement de soumission appartient au formulaire lui-même, qui contient plusieurs champs.", fix: "Écrire `<form onSubmit={...}>` et laisser le bouton avec `type=\"submit\"`." },
        { type: 'quote', text: "Résumé : onSubmit se place sur <form> et reçoit un gestionnaire qui commence par event.preventDefault() pour éviter le rechargement de la page." },
      ],
      exercises: [
        {
          id: 'm07-l03-e1',
          type: 'qcm',
          difficulty: 'facile',
          question: "À quel moment onSubmit se déclenche-t-il ?",
          options: [
            "Dès que l'utilisateur tape une lettre dans un champ",
            "Quand la souris passe au-dessus du formulaire",
            "Au clic sur le bouton de soumission ou avec la touche Entrée",
            "Dès que le composant est affiché",
          ],
          answer: 2,
          explanation: "La soumission a lieu au clic sur un bouton `type=\"submit\"` ou à l'appui sur Entrée dans un champ du formulaire. Taper (option 0) déclenche onChange, survoler (option 1) onMouseOver, et l'affichage du composant (option 3) ne déclenche aucun gestionnaire.",
        },
        {
          id: 'm07-l03-e2',
          type: 'fill',
          difficulty: 'intermédiaire',
          question: "Complétez pour empêcher le rechargement de la page : function envoyer(event) { ______; console.log(\"Envoyé !\"); }",
          accepted: ["event.preventdefault()", "event.preventdefault"],
          hint: "La méthode s'appelle preventDefault, elle est appelée sur l'événement.",
          explanation: "`event.preventDefault()` annule le comportement par défaut du navigateur, qui est de recharger la page à la soumission. La comparaison ignore la casse, donc `event.preventDefault()` ou `event.preventDefault` sont acceptés : la méthode existe bien sur l'objet `event`.",
        },
        {
          id: 'm07-l03-e3',
          type: 'code',
          difficulty: 'intermédiaire',
          language: 'jsx',
          question: "Créez un formulaire avec un champ texte (état `saisie`, valeur initiale \"\") et un bouton « Envoyer ». À la soumission, écrivez dans la console « Message envoyé : » suivi du texte saisi, sans recharger la page.",
          template: `import { useState } from "react";

function Contact() {
  const [saisie, setSaisie] = useState("");

  // votre code ici

  return null;
}
`,
          solution: `import { useState } from "react";

function Contact() {
  const [saisie, setSaisie] = useState("");

  function envoyer(event) {
    event.preventDefault();
    console.log("Message envoyé : " + saisie);
  }

  return (
    <form onSubmit={envoyer}>
      <input value={saisie} onChange={(e) => setSaisie(e.target.value)} />
      <button type="submit">Envoyer</button>
    </form>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<Contact />);`,
          mustContain: ["onSubmit", "preventDefault"],
          hint: "Pensez à preventDefault et à relier le champ à l'état avec onChange.",
          explanation: "Le gestionnaire `envoyer` reçoit `event`, annule d'abord la soumission par défaut avec `preventDefault()`, puis lit la saisie grâce à l'état `saisie`. `onSubmit` est placé sur `<form>` et le bouton porte `type=\"submit\"`. Le champ est contrôlé par onChange : sans lui, `saisie` resterait vide et le message serait « Message envoyé : » sans texte.",
        },
      ],
    },

    // ============================================================
    // Leçon 4 — onMouseOver
    // ============================================================
    {
      id: 'm07-l04',
      title: "onMouseOver : réagir au survol",
      minutes: 6,
      objectives: [
        "Déclencher une action quand la souris survole un élément",
        "Connaître le couple onMouseOver / onMouseOut",
        "Distinguer le survol du clic",
      ],
      blocks: [
        { type: 'p', text: "Menu qui se déroule au passage de la souris, image qui grandit, info-bulle qui apparaît : ces effets reposent tous sur le survol. En React, l'événement correspondant s'écrit onMouseOver." },
        { type: 'h', text: "Explication simple" },
        { type: 'p', text: "onMouseOver se déclenche quand la souris entre dans l'élément qui le porte. Son événement opposé, onMouseOut, se déclenche quand la souris en sort. Comme pour onClick, on place entre accolades une fonction à appeler." },
        { type: 'list', items: [
          "onMouseOver : la souris entre dans l'élément.",
          "onMouseOut : la souris quitte l'élément.",
          "Les deux se placent sur l'élément à surveiller, en camelCase.",
          "Le survol ne remplace pas le clic : ce sont deux événements distincts.",
        ] },
        { type: 'code', lang: 'jsx', code: `function Infobulle() {
  function entrer() {
    console.log("La souris est sur le bouton !");
  }

  function sortir() {
    console.log("La souris est partie.");
  }

  return (
    <button onMouseOver={entrer} onMouseOut={sortir}>
      Survolez-moi
    </button>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<Infobulle />);`, caption: "Détecter l'entrée et la sortie de la souris" },
        { type: 'list', items: [
          "`entrer` et `sortir` sont deux fonctions distinctes, une pour chaque direction.",
          "`onMouseOver={entrer}` : appelée dès que la souris entre dans le bouton.",
          "`onMouseOut={sortir}` : appelée dès que la souris quitte le bouton.",
          "Le JSX s'écrit sur plusieurs lignes pour rester lisible, c'est sans effet sur le résultat.",
        ] },
        { type: 'result', text: "À l'écran : un bouton « Survolez-moi ». En passant la souris dessus, la console écrit « La souris est sur le bouton ! » ; en l'éloignant, elle écrit « La souris est partie. »." },
        { type: 'mistake', text: "Écrire `onMouseover` ou `onmouseOver` : React n'attache rien, car la casse doit être exacte.", fix: "Toujours écrire `onMouseOver` avec un M et un O majuscules." },
        { type: 'mistake', text: "Attendre un clic avec onMouseOver : le survol se produit à chaque passage de la souris, même sans clic.", fix: "Choisir l'événement adapté : `onClick` pour le clic, `onMouseOver` pour le survol." },
        { type: 'quote', text: "Résumé : onMouseOver réagit à l'entrée de la souris dans un élément, onMouseOut à sa sortie ; les deux attendent une fonction entre accolades." },
      ],
      exercises: [
        {
          id: 'm07-l04-e1',
          type: 'qcm',
          difficulty: 'facile',
          question: "Quel événement se déclenche quand la souris entre dans un élément ?",
          options: ["onClick", "onChange", "onSubmit", "onMouseOver"],
          answer: 3,
          explanation: "onMouseOver correspond exactement au passage de la souris dans l'élément. onClick attend un clic, onChange une modification de champ, onSubmit une soumission de formulaire : aucun de ces trois ne concerne le survol.",
        },
        {
          id: 'm07-l04-e2',
          type: 'short',
          difficulty: 'intermédiaire',
          question: "Quel est l'événement opposé de onMouseOver, qui se déclenche quand la souris quitte l'élément ?",
          accepted: ["onmouseout", "mouseout"],
          hint: "Opposé de over (entrer) : sortir.",
          explanation: "`onMouseOut` se déclenche quand la souris sort de l'élément, ce qui permet de fermer ce que onMouseOver a ouvert (un menu, une info-bulle). La réponse est comparée sans casse : `onMouseOut` et `onmouseout` sont donc acceptés tous les deux.",
        },
        {
          id: 'm07-l04-e3',
          type: 'visual',
          difficulty: 'intermédiaire',
          language: 'jsx',
          question: "Décrivez précisément ce qui s'affiche dans la console : au chargement de la page, puis à chaque fois que la souris entre dans le bouton.",
          template: `function Survol() {
  function montrer() {
    console.log("Survol détecté !");
  }

  return <button onMouseOver={montrer}>Passez la souris</button>;
}

ReactDOM.createRoot(document.getElementById("root")).render(<Survol />);`,
          solution: "Au chargement : rien ne s'écrit dans la console, car aucun événement n'a encore eu lieu. À chaque entrée de la souris dans le bouton : une ligne « Survol détecté ! ». Si la souris sort puis revient, la ligne s'écrit à nouveau.",
          mustContain: ["Survol détecté"],
          hint: "Pensez à ce qui se passe au rendu, avant toute action de l'utilisateur.",
          explanation: "Le gestionnaire `montrer` n'est appelé que lorsque l'événement onMouseOver se produit : au chargement, la page s'affiche sans rien écrire. Chaque passage de la souris dans le bouton déclenche une nouvelle ligne « Survol détecté ! ». Un élève qui croirait que le message s'affiche au rendu confondrait l'affichage du composant et le déclenchement d'un événement.",
        },
      ],
    },

    // ============================================================
    // Leçon 5 — Gestion des événements
    // ============================================================
    {
      id: 'm07-l05',
      title: "Gestion des événements : passer des paramètres",
      minutes: 9,
      objectives: [
        "Passer un argument à un gestionnaire d'événement",
        "Utiliser une fonction flèche pour envelopper l'appel",
        "Rester accessible à l'objet event dans un appel paramétré",
      ],
      blocks: [
        { type: 'p', text: "Jusqu'ici, le gestionnaire n'avait aucun paramètre. Sur un vrai site, la même fonction doit souvent servir plusieurs fois : ouvrir le profil d'Alice, celui de Bob... Il faut donc transmettre des informations à la fonction. C'est tout l'art de la gestion des événements." },
        { type: 'h', text: "Explication simple" },
        { type: 'p', text: "React appelle votre gestionnaire avec un objet `event`. Si vous voulez lui donner vos propres arguments, vous ne pouvez pas écrire `onClick={ouvrir(\"Alice\")}` : les parenthèses appelleraient la fonction immédiatement, au rendu. On enveloppe l'appel dans une fonction flèche, qui elle sera appelée au clic." },
        { type: 'list', items: [
          "Passer un argument : `onClick={() => ouvrir(\"Alice\")}`.",
          "Ne jamais écrire `onClick={ouvrir(\"Alice\")}` : appel immédiat, pas au clic.",
          "La fonction flèche peut aussi récupérer `event` : `onClick={(event) => ouvrir(\"Alice\", event)}`.",
          "Le même gestionnaire peut ainsi servir pour plusieurs boutons différents.",
        ] },
        { type: 'code', lang: 'jsx', code: `function Profils() {
  function ouvrir(nom, event) {
    console.log("Profil ouvert : " + nom);
    console.log("Élément cliqué : " + event.target.tagName);
  }

  return (
    <div>
      <button onClick={(event) => ouvrir("Alice", event)}>Ouvrir Alice</button>
      <button onClick={(event) => ouvrir("Bob", event)}>Ouvrir Bob</button>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<Profils />);`, caption: "Un même gestionnaire avec des arguments différents" },
        { type: 'list', items: [
          "`ouvrir(nom, event)` attend deux paramètres : le nom du profil et l'événement.",
          "`(event) => ouvrir(\"Alice\", event)` : une fonction flèche qui fabrique l'appel au moment du clic.",
          "Le clic sur le premier bouton passe \"Alice\", celui sur le second passe \"Bob\".",
          "`event.target.tagName` donne le nom de l'élément cliqué, ici BUTTON.",
          "Les deux boutons partagent donc une seule et même fonction de traitement.",
        ] },
        { type: 'result', text: "Clic sur « Ouvrir Alice » : la console écrit « Profil ouvert : Alice » puis « Élément cliqué : BUTTON ». Clic sur « Ouvrir Bob » : « Profil ouvert : Bob » puis « Élément cliqué : BUTTON »." },
        { type: 'mistake', text: "Écrire `onClick={ouvrir(\"Alice\")}` : la fonction s'exécute pendant le rendu et son résultat (undefined) est donné à onClick. L'action n'a plus lieu au clic.", fix: "Envelopper l'appel : `onClick={() => ouvrir(\"Alice\")}`." },
        { type: 'mistake', text: "Oublier `event` alors que la fonction l'utilise : `event.target` vaut undefined et le code plante au clic.", fix: "Recevoir l'événement dans la fonction flèche : `onClick={(event) => ouvrir(\"Alice\", event)}`." },
        { type: 'quote', text: "Résumé : pour passer des arguments, enveloppez l'appel dans une fonction flèche — onClick={() => ouvrir(nom)} — et transmettez event si la fonction en a besoin." },
      ],
      exercises: [
        {
          id: 'm07-l05-e1',
          type: 'qcm',
          difficulty: 'facile',
          question: "Comment passer l'argument \"Paris\" à la fonction choisir au clic ?",
          options: [
            "onClick={choisir(\"Paris\")}",
            "onClick={() => choisir(\"Paris\")}",
            "onClick={choisir, \"Paris\"}",
            "onclickParis={choisir}",
          ],
          answer: 1,
          explanation: "La fonction flèche `() => choisir(\"Paris\")` n'appelle choisir qu'au clic : c'est elle qui est branchée sur l'événement. L'option 0 appelle choisir pendant le rendu, donc au mauvais moment. L'option 2 n'est pas une syntaxe valide entre accolades. L'option 4 invente une propriété inexistante.",
        },
        {
          id: 'm07-l05-e2',
          type: 'debug',
          difficulty: 'intermédiaire',
          language: 'jsx',
          question: "Ce code affiche le profil indéfini dès l'affichage de la page, et le second bouton n'ouvre aucun profil. Trouvez les deux erreurs et corrigez le code.",
          template: `function Boutons() {
  function ouvrir(nom) {
    console.log("Ouverture du profil : " + nom);
  }

  return (
    <div>
      <button onClick={ouvrir("Alice")}>Alice</button>
      <button onClick={ouvrir}>Bob</button>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<Boutons />);`,
          solution: `function Boutons() {
  function ouvrir(nom) {
    console.log("Ouverture du profil : " + nom);
  }

  return (
    <div>
      <button onClick={() => ouvrir("Alice")}>Alice</button>
      <button onClick={() => ouvrir("Bob")}>Bob</button>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<Boutons />);`,
          mustContain: ["=> ouvrir"],
          hint: "Une erreur concerne l'appel immédiat, l'autre l'argument manquant.",
          explanation: "Première erreur : `onClick={ouvrir(\"Alice\")}` exécute la fonction pendant le rendu, d'où un message « undefined » affiché trop tôt. Deuxième erreur : `onClick={ouvrir}` appelle ouvrir sans argument au clic, donc `nom` vaut undefined. Il faut envelopper chaque appel dans une fonction flèche : `() => ouvrir(\"Alice\")` et `() => ouvrir(\"Bob\")`.",
        },
        {
          id: 'm07-l05-e3',
          type: 'fill',
          difficulty: 'intermédiaire',
          question: "Pour exécuter une fonction avec des arguments au clic, on enveloppe l'appel dans une ______ : onClick={() => ouvrir(nom)}.",
          accepted: ["fonction fleche", "fleche", "arrow function", "fonction anonyme"],
          hint: "C'est la fonction écrite avec => , sans nom.",
          explanation: "La fonction flèche `() => ouvrir(nom)` est créée uniquement pour être appelée au clic : elle reporte l'exécution de `ouvrir` au bon moment. Une fonction nommée classique ferait aussi l'affaire, d'où l'acceptation de « fonction anonyme ». Écrire `ouvrir(nom)` directement appellerait la fonction au rendu.",
        },
      ],
    },

    // ============================================================
    // Leçon 6 — Événements et State
    // ============================================================
    {
      id: 'm07-l06',
      title: "Événements et State",
      minutes: 9,
      objectives: [
        "Mettre à jour un état depuis un gestionnaire d'événement",
        "Faire réafficher l'interface grâce à useState",
        "Comprendre pourquoi on n'écrit jamais dans la variable d'état",
      ],
      blocks: [
        { type: 'p', text: "Un compteur qui n'affiche jamais le nouveau total après un clic ne sert à rien. La force des événements, c'est de modifier l'état du composant : React détecte le changement et redessine l'écran. C'est exactement ce que vous faites avec useState." },
        { type: 'h', text: "Explication simple" },
        { type: 'p', text: "Un état déclaré avec useState est comme un tableau d'affichage numérique : on ne le griffonne pas directement, on envoie une instruction au gestionnaire du tableau. Cette instruction, c'est la fonction setter (ici `setCompteur`). Quand elle est appelée, React met à jour l'état et réaffiche le composant." },
        { type: 'list', items: [
          "Un événement déclenche une fonction, cette fonction appelle le setter.",
          "Le setter provoque la nouvelle lecture du composant : React réaffiche l'écran.",
          "On ne modifie jamais la variable d'état elle-même : elle est en constante.",
          "Pour une valeur calculée, on peut écrire `setCompteur(compteur + 1)`.",
        ] },
        { type: 'code', lang: 'jsx', code: `import { useState } from "react";

function Compteur() {
  const [compteur, setCompteur] = useState(0);

  function incrementer() {
    setCompteur(compteur + 1);
  }

  return (
    <div>
      <p>Compteur : {compteur}</p>
      <button onClick={incrementer}>+1</button>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<Compteur />);`, caption: "Un clic met à jour l'état" },
        { type: 'list', items: [
          "`useState(0)` crée l'état `compteur`, initialisé à 0.",
          "`setCompteur(compteur + 1)` calcule la nouvelle valeur et la confie à React.",
          "`onClick={incrementer}` appelle cette fonction à chaque clic sur le bouton.",
          "`{compteur}` dans le JSX affiche la valeur courante de l'état.",
          "Après l'appel du setter, React relit le composant et réaffiche le nouveau total.",
        ] },
        { type: 'result', text: "À l'écran : « Compteur : 0 ». Après un clic : « Compteur : 1 », puis « Compteur : 2 », etc." },
        { type: 'mistake', text: "Écrire `compteur = compteur + 1` dans le gestionnaire : la variable est une constante et React n'est pas prévenu, l'écran ne change jamais.", fix: "Appeler le setter : `setCompteur(compteur + 1)`." },
        { type: 'mistake', text: "Écrire `onClick={incrementer()}` : la fonction s'exécute au rendu et le compteur grimpe tout seul sans clic.", fix: "Passer la fonction sans parenthèses : `onClick={incrementer}`." },
        { type: 'quote', text: "Résumé : un événement appelle le setter du state, le setter met à jour l'état, React réaffiche l'écran — c'est la boucle événement → état → rendu." },
      ],
      exercises: [
        {
          id: 'm07-l06-e1',
          type: 'qcm',
          difficulty: 'facile',
          question: "Que se passe-t-il quand un gestionnaire appelle setCompteur(compteur + 1) ?",
          options: [
            "Rien : la variable compteur est modifiée en mémoire sans impact",
            "React met à jour l'état et réaffiche le composant avec la nouvelle valeur",
            "La page entière se recharge complètement",
            "Le composant est supprimé du DOM",
          ],
          answer: 1,
          explanation: "Le setter est la façon unique de modifier un état : React enregistre la nouvelle valeur puis relit le composant pour réafficher l'écran. L'option 0 décrit l'erreur classique de modification directe, qui ne provoque aucun rendu. Un rechargement (option 2) ou une suppression (option 3) n'a jamais lieu : React met à jour seulement ce qui a changé.",
        },
        {
          id: 'm07-l06-e2',
          type: 'code',
          difficulty: 'intermédiaire',
          language: 'jsx',
          question: "Créez un composant `Partage` avec un état `part` initialisé à 0 et un bouton « +2 » qui ajoute 2 au part à chaque clic. Affichez « Part : X » au-dessus du bouton.",
          template: `import { useState } from "react";

function Partage() {
  // votre code ici
}

ReactDOM.createRoot(document.getElementById("root")).render(<Partage />);`,
          solution: `import { useState } from "react";

function Partage() {
  const [part, setPart] = useState(0);

  function ajouter() {
    setPart(part + 2);
  }

  return (
    <div>
      <p>Part : {part}</p>
      <button onClick={ajouter}>+2</button>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<Partage />);`,
          mustContain: ["useState", "setPart", "onClick"],
          hint: "Déclarez l'état, créez une fonction qui appelle le setter, puis branchez-la sur le bouton.",
          explanation: "L'état `part` est créé par `useState(0)`, la fonction `ajouter` calcule `part + 2` et le confie à `setPart`, et `onClick={ajouter}` déclenche cette chaîne au clic. `onClick={ajouter()}` échouerait car la fonction s'exécuterait au rendu, et `part = part + 2` échouerait car React ne serait pas prévenu du changement.",
        },
        {
          id: 'm07-l06-e3',
          type: 'short',
          difficulty: 'intermédiaire',
          question: "Dans `const [compteur, setCompteur] = useState(0);`, quelle fonction doit-on appeler pour mettre à jour l'état ?",
          accepted: ["setcompteur", "le setter", "setter"],
          hint: "C'est le deuxième élément renvoyé par useState.",
          explanation: "useState renvoie un tableau de deux éléments : la valeur actuelle et la fonction setter qui la remplace. Ici le setter s'appelle `setCompteur` (comparaison sans casse : `setcompteur` est acceptée). Appeler cette fonction déclenche un nouveau rendu avec la valeur mise à jour.",
        },
      ],
    },

    // ============================================================
    // Leçon 7 — Création d'interfaces interactives
    // ============================================================
    {
      id: 'm07-l07',
      title: "Création d'interfaces interactives",
      minutes: 10,
      objectives: [
        "Combiner plusieurs événements dans un même composant",
        "Faire dialoguer plusieurs états entre eux",
        "Construire un petit module complet de boutons et de messages",
      ],
      blocks: [
        { type: 'p', text: "Vous savez désormais cliquer, saisir et mettre à jour un état. Assemblons le tout : une mini-interface de notation où chaque bouton change à la fois un nombre et un message. C'est exactement de cette façon que se construisent les vraies applications." },
        { type: 'h', text: "Explication simple" },
        { type: 'p', text: "Une interface interactive, c'est une boucle : l'utilisateur déclenche un événement, le gestionnaire met à jour un ou plusieurs états, React réaffiche l'écran. Un composant peut posséder plusieurs états et plusieurs gestionnaires : chaque bouton appelle la fonction qui le concerne." },
        { type: 'list', items: [
          "Un composant peut déclarer autant d'états que nécessaire.",
          "Un même gestionnaire peut appeler plusieurs setters d'un coup.",
          "Les arguments passés avec une fonction flèche permettent de différencier les boutons.",
          "On part toujours d'un état initial clair, puis on le fait évoluer.",
        ] },
        { type: 'code', lang: 'jsx', code: `import { useState } from "react";

function Avis() {
  const [note, setNote] = useState(0);
  const [message, setMessage] = useState("Cliquez pour noter !");

  function noter(nouvelleNote) {
    setNote(nouvelleNote);
    setMessage("Merci pour votre note de " + nouvelleNote + " !");
  }

  function remercier() {
    setMessage("Votre avis compte, merci !");
  }

  return (
    <div>
      <p>Note : {note}</p>
      <button onClick={() => noter(1)}>1 étoile</button>
      <button onClick={() => noter(2)}>2 étoiles</button>
      <button onClick={remercier}>Remercier</button>
      <p>{message}</p>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<Avis />);`, caption: "Deux états pilotés par trois boutons" },
        { type: 'list', items: [
          "`useState(0)` et `useState(\"Cliquez pour noter !\")` déclarent deux états indépendants.",
          "`noter(nouvelleNote)` met à jour les deux états : la note et le message.",
          "`onClick={() => noter(1)}` transmet la note 1 au clic sur le premier bouton.",
          "`remercier` ne change que le message, la note reste intacte.",
          "Les trois boutons partagent le même composant mais appellent des fonctions différentes.",
        ] },
        { type: 'result', text: "À l'écran : « Note : 0 » et « Cliquez pour noter ! ». Clic sur « 2 étoiles » : « Note : 2 » et « Merci pour votre note de 2 ! ». Clic sur « Remercier » : la note reste 2 et le message devient « Votre avis compte, merci ! »." },
        { type: 'mistake', text: "Appeler deux fois le même setter avec des valeurs différentes dans un même gestionnaire : la seconde écraserait la première inutilement.", fix: "Un setter par état : `setNote(...)` pour la note, `setMessage(...)` pour le message." },
        { type: 'mistake', text: "Oublier les parenthèses de la fonction flèche : `onClick={noter(1)}` évalue la note au rendu, pas au clic.", fix: "Toujours envelopper : `onClick={() => noter(1)}`." },
        { type: 'quote', text: "Résumé : une interface interactive, c'est événement → gestionnaire → mise à jour du state → nouveau rendu ; avec plusieurs états, chaque bouton met à jour ceux qui le concernent." },
      ],
      exercises: [
        {
          id: 'm07-l07-e1',
          type: 'qcm',
          difficulty: 'facile',
          question: "Dans le composant Avis, que se passe-t-il si on clique sur « Remercier » ?",
          options: [
            "La note et le message sont réinitialisés tous les deux",
            "Seul le message change, la note reste ce qu'elle était",
            "La note augmente de 1",
            "Le composant disparaît de la page",
          ],
          answer: 1,
          explanation: "La fonction `remercier` n'appelle que `setMessage` : seul l'état `message` est remplacé. `note` n'est touché que par `noter`, appelée depuis les boutons d'étoiles. Aucun état n'est réinitialisé (option 0) et rien n'est supprimé de la page (option 3).",
        },
        {
          id: 'm07-l07-e2',
          type: 'code',
          difficulty: 'intermédiaire',
          language: 'jsx',
          question: "Créez un composant `Bouton` avec un état `nombre` initialisé à 10, deux boutons « +5 » et « -5 » qui l'incrémentent et le décrémentent, et l'affichage « Nombre : X ».",
          template: `import { useState } from "react";

function Bouton() {
  // votre code ici
}

ReactDOM.createRoot(document.getElementById("root")).render(<Bouton />);`,
          solution: `import { useState } from "react";

function Bouton() {
  const [nombre, setNombre] = useState(10);

  function augmenter() {
    setNombre(nombre + 5);
  }

  function reduire() {
    setNombre(nombre - 5);
  }

  return (
    <div>
      <p>Nombre : {nombre}</p>
      <button onClick={augmenter}>+5</button>
      <button onClick={reduire}>-5</button>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<Bouton />);`,
          mustContain: ["useState", "setNombre", "onClick"],
          hint: "Deux états différents ? Non : un seul état, deux fonctions de mise à jour.",
          explanation: "Un seul état `nombre` suffit : `augmenter` appelle `setNombre(nombre + 5)` et `reduire` appelle `setNombre(nombre - 5)`. Chaque bouton branche sa propre fonction avec `onClick`. Modifier `nombre` directement ne provoquerait aucun réaffichage, et mettre à jour l'état dans le JSX serait impossible.",
        },
        {
          id: 'm07-l07-e3',
          type: 'debug',
          difficulty: 'avancé',
          language: 'jsx',
          question: "Ce compteur ne bouge jamais malgré les clics. Trouvez l'erreur et corrigez le code.",
          template: `import { useState } from "react";

function Score() {
  const [score, setScore] = useState(0);

  function ajouter() {
    score = score + 1;
  }

  function reset() {
    setScore(0);
  }

  return (
    <div>
      <p>Score : {score}</p>
      <button onClick={ajouter}>+1</button>
      <button onClick={reset}>Réinitialiser</button>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<Score />);`,
          solution: `import { useState } from "react";

function Score() {
  const [score, setScore] = useState(0);

  function ajouter() {
    setScore(score + 1);
  }

  function reset() {
    setScore(0);
  }

  return (
    <div>
      <p>Score : {score}</p>
      <button onClick={ajouter}>+1</button>
      <button onClick={reset}>Réinitialiser</button>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<Score />);`,
          mustContain: ["setScore(score + 1)"],
          hint: "Comparez les deux fonctions : l'une fonctionne, l'autre non.",
          explanation: "`score = score + 1` écrit directement dans la variable d'état : React n'est pas prévenu, aucun nouveau rendu n'a lieu et l'écran reste identique. De plus, la variable est déclarée avec `const` et ne peut pas être réassignée. `reset` fonctionne parce qu'il passe bien par le setter. La correction `setScore(score + 1)` envoie la nouvelle valeur à React, qui réaffiche le score.",
        },
      ],
    },
  ],
};
