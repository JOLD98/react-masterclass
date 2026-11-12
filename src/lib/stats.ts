import type { Module, Lesson, ProgressState } from '../types';

export interface GlobalStats {
  totalLessons: number;
  completedLessons: number;
  totalExercises: number;
  correctExercises: number;
  totalProjects: number;
  completedProjects: number;
  /** Pourcentage global de progression (leçons terminées) */
  percent: number;
  /** Taux de réussite aux exercices (0-100) */
  exerciseSuccess: number;
  exercisesAttempted: number;
}

export function computeStats(modules: Module[], projectsCount: number, p: ProgressState): GlobalStats {
  const totalLessons = modules.reduce((s, m) => s + m.lessons.length, 0);
  const totalExercises = modules.reduce((s, m) => s + m.lessons.reduce((t, l) => t + l.exercises.length, 0), 0);
  const completedLessons = p.completedLessons.length;
  const results = Object.values(p.exercises);
  const attempted = results.length;
  const correct = results.filter((r) => r.correct).length;
  return {
    totalLessons,
    completedLessons,
    totalExercises,
    correctExercises: correct,
    totalProjects: projectsCount,
    completedProjects: p.completedProjects.length,
    percent: totalLessons === 0 ? 0 : Math.round((completedLessons / totalLessons) * 100),
    exerciseSuccess: attempted === 0 ? 0 : Math.round((correct / attempted) * 100),
    exercisesAttempted: attempted,
  };
}

export interface ModuleProgress {
  module: Module;
  completed: number;
  total: number;
  percent: number;
  done: boolean;
}

export function moduleProgress(modules: Module[], p: ProgressState): ModuleProgress[] {
  return modules.map((module) => {
    const total = module.lessons.length;
    const completed = module.lessons.filter((l) => p.completedLessons.includes(l.id)).length;
    return {
      module,
      completed,
      total,
      percent: total === 0 ? 0 : Math.round((completed / total) * 100),
      done: total > 0 && completed === total,
    };
  });
}

export function findLesson(
  modules: Module[],
  moduleId: string,
  lessonId: string,
): { module: Module; lesson: Lesson; index: number } | null {
  const module = modules.find((m) => m.id === moduleId);
  if (!module) return null;
  const index = module.lessons.findIndex((l) => l.id === lessonId);
  if (index === -1) return null;
  return { module, lesson: module.lessons[index], index };
}

/** Leçon suivante / précédente dans tout le parcours */
export function neighborLessons(
  modules: Module[],
  moduleId: string,
  lessonId: string,
): { prev: { moduleId: string; lessonId: string } | null; next: { moduleId: string; lessonId: string } | null } {
  const flat = modules.flatMap((m) => m.lessons.map((l) => ({ moduleId: m.id, lessonId: l.id })));
  const idx = flat.findIndex((x) => x.moduleId === moduleId && x.lessonId === lessonId);
  return {
    prev: idx > 0 ? flat[idx - 1] : null,
    next: idx !== -1 && idx < flat.length - 1 ? flat[idx + 1] : null,
  };
}

/** Réussite par module (pour la page Révisions) */
export function weakestModules(modules: Module[], p: ProgressState): { module: Module; rate: number; attempted: number }[] {
  return modules
    .map((module) => {
      const ids = new Set(module.lessons.flatMap((l) => l.exercises.map((e) => e.id)));
      const results = Object.values(p.exercises).filter((r) => ids.has(r.exerciseId));
      const attempted = results.length;
      const correct = results.filter((r) => r.correct).length;
      return { module, attempted, rate: attempted === 0 ? -1 : Math.round((correct / attempted) * 100) };
    })
    .filter((x) => x.attempted > 0)
    .sort((a, b) => a.rate - b.rate);
}
