# ⚛️ React Masterclass — Plateforme d'apprentissage React JS

Application web moderne, entièrement en français, pour apprendre React JS **de zéro à expert** :
leçons guidées, exercices auto-corrigés avec éditeur de code intégré, 10 projets concrets,
système de niveaux/XP/badges, espace de révisions, administration du contenu et certificat.

## 🚀 Démarrage

```bash
npm install        # installe les dépendances + copie React UMD dans public/vendor
npm run dev        # serveur de développement (Vite)
npm run build      # build de production (tsc + vite build)
npm run preview    # prévisualisation du build
```

Puis ouvrez `http://localhost:5173` (ou le port affiché dans le terminal).

## 🧱 Stack technique

| Bloc | Technologie |
| --- | --- |
| Framework | React 18 + TypeScript |
| Build | Vite 5 |
| Routage | React Router 6 |
| Éditeur de code | CodeMirror 6 (`@uiw/react-codemirror`) |
| Exécution du code | Babel standalone + iframe `sandbox` isolée (React UMD en local, hors-ligne) |
| Persistance | `localStorage` (progression, comptes, contenu administré) |

## 📁 Structure

```
src/
├── components/        # Code, CodeEditor, CodePlayground, ExerciseCard, Blocks, Chrome, BadgeToast
├── content/           # Contenu pédagogique : module01…module18.ts + projects.ts
├── context/           # AuthContext, ContentContext (contenu éditable), ProgressContext (XP, badges)
├── layouts/           # MarketingLayout (landing) / AppLayout (espace étudiant)
├── lib/               # storage (persistance), levels (XP & badges), stats (progression)
├── pages/             # Home, Dashboard, Programme, ModulePage, LessonPage, Review,
│                      # Projects, ProjectDetail, Admin, Profile, Certificate, AuthPage, NotFound
├── styles/global.css  # Design system complet (#0B1120 / #151E30 / #61DAFB)
└── types.ts           # Types du contenu pédagogique (Module, Lesson, Exercise, Project…)
```

## 📚 Contenu pédagogique

- **18 modules**, ~140 leçons, chacune structurée en 8 étapes :
  introduction → explication simple → exemple concret → code commenté ligne par ligne →
  résultat attendu → erreurs fréquentes → résumé → **3 à 5 exercices progressifs**.
- **Types d'exercices** : QCM, réponse courte, compléter le code, corriger du code (debug),
  écrire du code, reproduire un rendu — avec vérification automatique (sortie console +
  fragments obligatoires) et explication de la correction.
- **10 projets** : objectifs, consignes, maquette, étapes, critères de validation, correction
  détaillée débloquée après tentative.
- Le contenu est **données** (fichiers `src/content/*`), jamais collé aux composants : il est
  éditable depuis l'interface **Admin** (surchargé en `localStorage`, restaurable).

## 🎮 Fonctionnalités clés

- **Tableau de bord** : progression globale, XP, niveau, série de jours, objectif quotidien,
  badges, modules, dernière leçon, « Continuer mon apprentissage ».
- **Éditeur intégré** : coloration syntaxique, numérotation, Exécuter / Réinitialiser,
  aperçu en direct + console, erreurs affichées, comparaison avec la solution.
- **Environnement isolé** : le code s'exécute dans une iframe `sandbox="allow-scripts"`
  sans accès au stockage ni aux ressources de l'application.
- **Révisions** : erreurs en cours, leçons à consolider, notions faibles par module.
- **Auth** : inscription / connexion / déconnexion / profil (démo locale, hachage basique).
- **Certificat** : débloqué à 80 % du parcours + 5 projets, imprimable (PDF).

## ✍️ Ajouter une leçon sans toucher au code

1. Via l'interface : **Admin → Modules & leçons → + Ajouter une leçon** (blocs et exercices en JSON validé).
2. Ou en fichier : créez/exportez dans `src/content/moduleXX.ts` en suivant `CONTENT_GUIDE.md`
   (interfaces `Module`, `Lesson`, `Exercise`, `Block` dans `src/types.ts`).

## 📝 Notes

- Les comptes et la progression sont stockés localement (démo) — un projet réel utiliserait
  une base de données et une API côté serveur.
- Les badges, XP et objectifs quotidiens sont calculés dans `src/lib/levels.ts`.
