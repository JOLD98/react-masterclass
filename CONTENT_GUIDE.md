# CONTENT_GUIDE.md — Guide de rédaction du contenu REACT MASTERCLASS

Tu es rédacteur pédagogique pour **REACT MASTERCLASS**, une plateforme d'apprentissage React JS
**entièrement en français**, destinée à un débutant absolu.

## RÈGLES ABSOLUES

1. **Tout le contenu est en français** : titres, textes, commentaires de code, exercices, explications.
   (Les identifiants et noms de variables de code restent en anglais, c'est la convention.)
2. **Ne jamais supposer** que l'étudiant connaît une notion qui n'a pas encore été enseignée.
   Chaque concept nouveau est expliqué avant d'être utilisé.
3. Tu n'écris **que** les fichiers qui te sont assignés. Tu ne modifies aucun autre fichier.
4. Le code doit être **exact et fonctionnel** (pas de pseudo-code approximatif).
5. Utilise des guillemets doubles `"` pour les chaînes TypeScript contenant des apostrophes
   (ex. `"Qu'est-ce que React ?"`), sinon l'apostrophe casse la chaîne.
6. Respecte **exactement** les interfaces TypeScript ci-dessous. N'importe quel écart = erreur
   de compilation (`tsc --noEmit` en mode strict).
7. Qualité pédagogique : phrases courtes, analogies concrètes, exemples du quotidien,
   jamais de jargon non expliqué.

## Interfaces TypeScript (copie exacte de `src/types.ts`)

```ts
export type Difficulty = 'Débutant' | 'Débutant confirmé' | 'Intermédiaire' | 'Intermédiaire avancé' | 'Avancé' | 'Expert';
export type ExerciseType = 'qcm' | 'short' | 'fill' | 'code' | 'debug' | 'visual';
export type ExerciseDifficulty = 'facile' | 'intermédiaire' | 'avancé';

export type Block =
  | { type: 'p'; text: string }
  | { type: 'h'; text: string }
  | { type: 'code'; lang?: string; code: string; caption?: string }
  | { type: 'list'; items: string[]; ordered?: boolean }
  | { type: 'result'; text: string }
  | { type: 'mistake'; text: string; fix?: string }
  | { type: 'quote'; text: string };

export interface Exercise {
  id: string;
  type: ExerciseType;
  difficulty: ExerciseDifficulty;
  question: string;
  options?: string[];      // QCM
  answer?: number | number[]; // index de la/des bonne(s) réponse(s)
  accepted?: string[];     // short / fill : réponses acceptées (normalisées, sans casse)
  template?: string;       // code / debug / visual : code de départ
  solution?: string;       // correction complète
  mustContain?: string[];  // fragments devant apparaître dans la réponse de l'étudiant
  expectedOutput?: string; // sortie console attendue (lignes séparées par \n)
  language?: 'js' | 'jsx';
  hint?: string;
  explanation: string;     // OBLIGATOIRE : pourquoi la réponse est correcte
}

export interface Lesson {
  id: string;              // 'm01-l01', 'm01-l02', ...
  title: string;
  minutes: number;         // 5 à 12
  objectives?: string[];
  blocks: Block[];
  exercises: Exercise[];   // 3 à 5
}

export interface Module {
  id: string;              // 'm01' ... 'm18'
  number: number;
  title: string;
  description: string;
  icon: string;            // emoji
  level: Difficulty;
  lessons: Lesson[];
}

export interface ProjectStep { title: string; detail: string; }

export interface Project {
  id: string;              // 'p01' ... 'p10'
  title: string;
  level: Difficulty;
  skills: string[];
  objectives: string[];
  brief: string;
  preview: string;         // description du résultat visuel attendu (maquette textuelle)
  steps: ProjectStep[];
  criteria: string[];
  solution: { title: string; lang?: string; code: string; note?: string }[];
}
```

## Structure OBLIGATOIRE de chaque leçon

Chaque leçon doit couvrir, via ses `blocks`, dans cet ordre :

1. **Introduction à la notion** → `{ type: 'p' }` (1 à 2 paragraphes, accroche concrète)
2. **Explication simple et détaillée** → `{ type: 'h', text: 'Explication simple' }` + paragraphes
   (+ `{ type: 'list' }` pour les points clés)
3. **Exemple concret** → `{ type: 'code', lang, code, caption }`
4. **Explication du code ligne par ligne** → `{ type: 'list', items: [...] }` juste après le code
   (une ligne par élément clé : « Ligne 1 : ... », « `useState(0)` : ... »)
5. **Résultat attendu** → `{ type: 'result', text: '...' }`
6. **Erreurs fréquentes à éviter** → 1 à 3 blocs `{ type: 'mistake', text, fix }`
7. **Résumé de la leçon** → `{ type: 'quote', text: 'Résumé : ...' }`
8. **Exercices pratiques** → `exercises` (3 à 5, du facile à l'avancé)

Longueur : 4 à 10 blocs au total (les sections peuvent être fusionnées pour les leçons courtes,
mais les 8 étapes doivent être identifiables).

## Exercices

- **Progressifs** : facile → intermédiaire → avancé.
- **Types variés** dans chaque leçon : au moins un `qcm`, et un des types `fill` / `code` / `debug`
  / `short` / `visual` selon la nature de la notion. Alterne les types d'une leçon à l'autre.
- **`explanation` obligatoire** : explique POURQUOI la réponse est correcte (et pourquoi les
  distracteurs sont faux pour un QCM). Jamais juste « la solution est X ».
- **QCM** : 3 à 4 options, `answer` = index (0-based) de la bonne réponse (ou tableau pour
  plusieurs bonnes réponses).
- **short / fill** : `accepted` contient 1 à 3 formulations acceptées (sans casse, sans accents
  superflus — le système normalise : minuscules, espaces réduits).
- **code / debug / visual** : toujours fournir `template` (point de départ), `solution`
  (correction complète et fonctionnelle), `mustContain` (1 à 3 fragments exacts devant apparaître
  dans la réponse) et `expectedOutput` (sortie console normalisée) quand le code produit une sortie.
  Le code JSX doit être **auto-suffisant** : s'il faut afficher un composant, inclure
  `ReactDOM.createRoot(document.getElementById('root')).render(<App />);`.
  Les exercices `debug` contiennent volontairement 1 à 3 erreurs à trouver dans le `template`.
- `hint` : un indice court et utile (recommandé).
- `id` d'exercice : `{lessonId}-e1`, `-e2`, ... (unique).

## Conventions d'identifiants

- Module : `m01` … `m18`, export nommé `module01` … `module18`.
- Leçon : `m01-l01`, `m01-l02`, … (numérotation séquentielle dans l'ordre du programme).
- Chaque fichier de module : `import type { Module } from '../types';` puis
  `export const moduleXX: Module = { ... };`

## Exemple de leçon modèle

```ts
{
  id: 'm02-l01',
  title: "Qu'est-ce que React ?",
  minutes: 8,
  objectives: ['Définir React en une phrase', 'Citer trois raisons d’utiliser React'],
  blocks: [
    { type: 'p', text: "Vous avez peut-être déjà visité un site dont le contenu semblait réagir instantanément, sans jamais recharger la page. React est l'une des bibliothèques qui rendent cela possible." },
    { type: 'h', text: 'Explication simple' },
    { type: 'p', text: "React est une bibliothèque JavaScript créée par Facebook en 2013. Elle sert à construire des interfaces utilisateur (des pages web) sous forme de petits blocs réutilisables appelés composants." },
    { type: 'list', items: ['Une bibliothèque : React complète votre code, il ne remplace pas tout.', 'Des composants : chaque bouton, chaque carte est un bloc autonome.', 'Du dynamique : la page se met à jour sans rechargement.'] },
    { type: 'code', lang: 'jsx', code: "function Bonjour() {\n  return <h1>Bonjour React !</h1>;\n}", caption: 'Un premier composant React' },
    { type: 'list', items: ['Ligne 1 : `function Bonjour()` déclare un composant, c’est une fonction JavaScript nommée avec une majuscule.', 'Ligne 2 : `return` renvoie le contenu affiché ; `<h1>` est du JSX, une extension de JavaScript.'] },
    { type: 'result', text: 'À l’écran : un titre « Bonjour React ! » de taille principale.' },
    { type: 'mistake', text: 'Écrire le composant en minuscule : `function bonjour()`. React distingue les majuscules.', fix: 'Toujours commencer le nom d’un composant par une majuscule.' },
    { type: 'quote', text: 'Résumé : React est une bibliothèque JavaScript pour construire des interfaces dynamiques à partir de composants réutilisables.' },
  ],
  exercises: [
    { id: 'm02-l01-e1', type: 'qcm', difficulty: 'facile', question: 'React est…', options: ['un langage de programmation', 'une bibliothèque JavaScript pour construire des interfaces', 'un serveur web', 'un système d’exploitation'], answer: 1, explanation: 'React est une bibliothèque (pas un langage) écrite en JavaScript, utilisée pour construire des interfaces utilisateur. HTML et CSS sont des langages/markup, Node.js est un runtime : ce ne sont pas ces réponses.' },
    { id: 'm02-l01-e2', type: 'short', difficulty: 'facile', question: 'Quel mot-clé français/anglais désigne le bloc réutilisable central de React ?', accepted: ['composant', 'component', 'les composants', 'composants'], explanation: 'Le composant (component en anglais) est l’unité de base de React : on l’écrit une fois et on le réutilise.' },
    { id: 'm02-l01-e3', type: 'code', difficulty: 'intermédiaire', language: 'jsx', question: 'Créez un composant `Slogan` qui affiche « Apprenez React ! » dans un h2, puis affichez-le dans la page.', template: "function Slogan() {\n  // votre code ici\n}\n", solution: "function Slogan() {\n  return <h2>Apprenez React !</h2>;\n}\n\nReactDOM.createRoot(document.getElementById('root')).render(<Slogan />);", mustContain: ['<h2>', 'Slogan'], explanation: 'Le composant renvoie un élément `<h2>` : c’est ce que React affiche. `ReactDOM.createRoot` puis `render` demandent à React d’insérer ce composant dans le conteneur `root` de la page.' },
  ],
}
```
