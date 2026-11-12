import type { Badge, ProgressState, StudentLevel } from '../types';

/** Paliers d'XP par niveau */
export const LEVELS: { level: StudentLevel; min: number }[] = [
  { level: 'Débutant', min: 0 },
  { level: 'Débutant confirmé', min: 400 },
  { level: 'Intermédiaire', min: 1000 },
  { level: 'Intermédiaire avancé', min: 2000 },
  { level: 'Avancé', min: 3500 },
  { level: 'Expert', min: 6000 },
];

/** XP attribuées */
export const XP = {
  lesson: 20,
  exercise: 10,
  project: 100,
  dailyGoal: 50,
};

export function levelFor(xp: number): StudentLevel {
  let current: StudentLevel = LEVELS[0].level;
  for (const l of LEVELS) if (xp >= l.min) current = l.level;
  return current;
}

export function levelIndex(xp: number): number {
  let idx = 0;
  LEVELS.forEach((l, i) => {
    if (xp >= l.min) idx = i;
  });
  return idx;
}

/** Progression (0-100) vers le niveau suivant */
export function nextLevelProgress(xp: number): { percent: number; next: StudentLevel | null; remaining: number } {
  const i = levelIndex(xp);
  const next = LEVELS[i + 1];
  if (!next) return { percent: 100, next: null, remaining: 0 };
  const prev = LEVELS[i].min;
  const percent = Math.round(((xp - prev) / (next.min - prev)) * 100);
  return { percent: Math.min(100, Math.max(0, percent)), next: next.level, remaining: next.min - xp };
}

/** Catalogue des badges */
export const BADGES: Badge[] = [
  { id: 'first-lesson', name: 'Premier pas', description: 'Terminer votre première leçon', icon: '🌱' },
  { id: 'lessons-10', name: 'En marche', description: 'Terminer 10 leçons', icon: '🚶' },
  { id: 'lessons-50', name: 'Régulier', description: 'Terminer 50 leçons', icon: '📚' },
  { id: 'lessons-all', name: 'Curieux complet', description: 'Terminer toutes les leçons', icon: '🎓' },
  { id: 'first-exercise', name: 'Premier exercice', description: 'Réussir un exercice', icon: '✅' },
  { id: 'exercises-50', name: 'Entraîné', description: 'Réussir 50 exercices', icon: '💪' },
  { id: 'exercises-200', name: 'Implacable', description: 'Réussir 200 exercices', icon: '🏅' },
  { id: 'first-project', name: 'Bâtisseur', description: 'Réaliser votre premier projet', icon: '🏗️' },
  { id: 'projects-5', name: 'Portfolio', description: 'Réaliser 5 projets', icon: '🧱' },
  { id: 'streak-3', name: '3 jours d’affilée', description: 'Apprendre 3 jours de suite', icon: '🔥' },
  { id: 'streak-7', name: 'Semaine parfaite', description: 'Apprendre 7 jours de suite', icon: '⚡' },
  { id: 'streak-30', name: 'Marathonien', description: 'Apprendre 30 jours de suite', icon: '🏆' },
  { id: 'daily-goal', name: 'Objectif du jour', description: 'Atteindre l’objectif quotidien de 50 XP', icon: '🎯' },
  { id: 'level-expert', name: 'Expert', description: 'Atteindre le niveau Expert', icon: '👑' },
];

export function badgeById(id: string): Badge | undefined {
  return BADGES.find((b) => b.id === id);
}

export interface BadgeContext {
  completedLessons: number;
  totalLessons: number;
  correctExercises: number;
  completedProjects: number;
  totalProjects: number;
  modulesCompleted: number;
}

/** Retourne les ids de badges à débloquer pour l'état donné */
export function evaluateBadges(p: ProgressState, ctx: BadgeContext): string[] {
  const unlocked = new Set(p.badges);
  const add = (id: string, cond: boolean) => {
    if (cond && !unlocked.has(id)) unlocked.add(id);
  };
  add('first-lesson', ctx.completedLessons >= 1);
  add('lessons-10', ctx.completedLessons >= 10);
  add('lessons-50', ctx.completedLessons >= 50);
  add('lessons-all', ctx.totalLessons > 0 && ctx.completedLessons >= ctx.totalLessons);
  add('first-exercise', ctx.correctExercises >= 1);
  add('exercises-50', ctx.correctExercises >= 50);
  add('exercises-200', ctx.correctExercises >= 200);
  add('first-project', ctx.completedProjects >= 1);
  add('projects-5', ctx.completedProjects >= 5);
  add('streak-3', p.streak.current >= 3 || p.streak.best >= 3);
  add('streak-7', p.streak.current >= 7 || p.streak.best >= 7);
  add('streak-30', p.streak.current >= 30 || p.streak.best >= 30);
  add('daily-goal', p.daily.xp >= XP.dailyGoal);
  add('level-expert', levelFor(p.xp) === 'Expert');
  return [...unlocked];
}
