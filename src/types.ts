// ============================================================
// Types du contenu pédagogique — React Masterclass
// ============================================================

export type Difficulty = 'Débutant' | 'Débutant confirmé' | 'Intermédiaire' | 'Intermédiaire avancé' | 'Avancé' | 'Expert';

export type ExerciseType = 'qcm' | 'short' | 'fill' | 'code' | 'debug' | 'visual';

export type ExerciseDifficulty = 'facile' | 'intermédiaire' | 'avancé';

/** Bloc de contenu d'une leçon */
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
  /** Énoncé en français */
  question: string;
  /** QCM : les propositions */
  options?: string[];
  /** QCM : index de la/des bonne(s) réponse(s), ex. 2 ou [0, 2] */
  answer?: number | number[];
  /** short / fill : réponses acceptées (comparaison normalisée, sans casse) */
  accepted?: string[];
  /** code / debug / visual : code de départ laissé à l'étudiant */
  template?: string;
  /** code / debug / visual : correction complète */
  solution?: string;
  /** Fragments qui doivent obligatoirement apparaître dans la réponse (relâchement) */
  mustContain?: string[];
  /** Sortie console attendue (normalisée) pour vérification automatique */
  expectedOutput?: string;
  /** Langage du code de l'exercice */
  language?: 'js' | 'jsx';
  /** Indice affichable */
  hint?: string;
  /** Pourquoi cette réponse est correcte — OBLIGATOIRE */
  explanation: string;
}

export interface Lesson {
  /** 'm01-l01' */
  id: string;
  title: string;
  /** Durée estimée en minutes */
  minutes: number;
  /** Objectifs d'apprentissage de la leçon */
  objectives?: string[];
  blocks: Block[];
  /** 3 à 5 exercices progressifs */
  exercises: Exercise[];
}

export interface Module {
  /** 'm01' ... 'm18' */
  id: string;
  number: number;
  title: string;
  description: string;
  /** Emoji illustrant le module */
  icon: string;
  level: Difficulty;
  lessons: Lesson[];
}

export interface ProjectStep {
  title: string;
  detail: string;
}

export interface Project {
  /** 'p01' ... 'p10' */
  id: string;
  title: string;
  level: Difficulty;
  /** Compétences nécessaires */
  skills: string[];
  /** Objectifs du projet */
  objectives: string[];
  /** Consigne générale */
  brief: string;
  /** Description du résultat visuel attendu (maquette) */
  preview: string;
  /** Étapes de réalisation */
  steps: ProjectStep[];
  /** Critères de validation (checklist) */
  criteria: string[];
  /** Solution détaillée : blocs de code avec explications */
  solution: { title: string; lang?: string; code: string; note?: string }[];
}

/** Niveaux de l'étudiant */
export type StudentLevel =
  | 'Débutant'
  | 'Débutant confirmé'
  | 'Intermédiaire'
  | 'Intermédiaire avancé'
  | 'Avancé'
  | 'Expert';

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
}

/** Résultat enregistré pour un exercice */
export interface ExerciseResult {
  exerciseId: string;
  lessonId: string;
  attempts: number;
  correct: boolean;
  /** Dernière réponse donnée */
  lastAnswer?: string;
  updatedAt: number;
}

export interface ProgressState {
  /** Leçons terminées */
  completedLessons: string[];
  /** Résultats d'exercices par identifiant d'exercice */
  exercises: Record<string, ExerciseResult>;
  /** Projets réalisés */
  completedProjects: string[];
  xp: number;
  badges: string[];
  /** Jours consécutifs d'apprentissage */
  streak: { current: number; best: number; lastDay: string };
  /** Objectif quotidien : XP gagné le jour courant */
  daily: { date: string; xp: number };
  /** Dernière leçon consultée */
  lastLesson: string | null;
  /** Historique des erreurs (pour la révision) */
  mistakes: { exerciseId: string; lessonId: string; at: number }[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  createdAt: number;
}
