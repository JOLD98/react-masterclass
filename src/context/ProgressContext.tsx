import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import type { ProgressState } from '../types';
import { load, save, todayStr, yesterdayStr } from '../lib/storage';
import { XP, evaluateBadges, type BadgeContext } from '../lib/levels';
import { useAuth } from './AuthContext';
import { useContent } from './ContentContext';

function emptyProgress(): ProgressState {
  return {
    completedLessons: [],
    exercises: {},
    completedProjects: [],
    xp: 0,
    badges: [],
    streak: { current: 0, best: 0, lastDay: '' },
    daily: { date: '', xp: 0 },
    lastLesson: null,
    mistakes: [],
  };
}

interface Totals {
  lessons: number;
  exercises: number;
  projects: number;
}

interface ProgressContextValue {
  progress: ProgressState;
  totals: Totals;
  /** Badges récemment débloqués (à afficher en toast), à acquitter */
  celebration: string | null;
  dismissCelebration: () => void;
  completeLesson: (lessonId: string) => void;
  recordExercise: (lessonId: string, exerciseId: string, correct: boolean, answer?: string) => void;
  completeProject: (projectId: string) => void;
  touchLesson: (lessonId: string) => void;
  resetProgress: () => void;
}

const ProgressContext = createContext<ProgressContextValue | null>(null);

/** Ajoute de l'XP en mettant à jour la série de jours et l'objectif quotidien */
function awardXp(p: ProgressState, amount: number): ProgressState {
  const today = todayStr();
  let streak = { ...p.streak };
  if (p.streak.lastDay !== today) {
    streak.current = p.streak.lastDay === yesterdayStr() ? p.streak.current + 1 : 1;
    streak.best = Math.max(streak.best, streak.current);
    streak.lastDay = today;
  }
  const daily = p.daily.date === today ? { date: today, xp: p.daily.xp + amount } : { date: today, xp: amount };
  return { ...p, xp: p.xp + amount, streak, daily };
}

export function ProgressProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const { modules, projects } = useContent();
  const authKey = user ? `progress:${user.id}` : 'progress:guest';

  const [state, setState] = useState<{ key: string; data: ProgressState }>(() => ({
    key: authKey,
    data: load(authKey, emptyProgress()),
  }));
  const [celebration, setCelebration] = useState<string | null>(null);

  // Changement d'utilisateur : rechargement de sa progression
  useEffect(() => {
    if (state.key !== authKey) setState({ key: authKey, data: load(authKey, emptyProgress()) });
  }, [authKey, state.key]);

  // Sauvegarde automatique
  useEffect(() => {
    if (state.key === authKey) save(state.key, state.data);
  }, [state, authKey]);

  const progress = state.data;

  // Totaux du contenu
  const totals = useMemo<Totals>(() => {
    const lessons = modules.reduce((sum, m) => sum + m.lessons.length, 0);
    const exercises = modules.reduce((sum, m) => sum + m.lessons.reduce((s, l) => s + l.exercises.length, 0), 0);
    return { lessons, exercises, projects: projects.length };
  }, [modules, projects]);

  // Badges : évaluation à chaque changement de progression
  useEffect(() => {
    const modulesCompleted = modules.filter((m) =>
      m.lessons.length > 0 && m.lessons.every((l) => progress.completedLessons.includes(l.id)),
    ).length;
    const ctx: BadgeContext = {
      completedLessons: progress.completedLessons.length,
      totalLessons: totals.lessons,
      correctExercises: Object.values(progress.exercises).filter((e) => e.correct).length,
      completedProjects: progress.completedProjects.length,
      totalProjects: totals.projects,
      modulesCompleted,
    };
    const unlocked = evaluateBadges(progress, ctx);
    const fresh = unlocked.find((id) => !progress.badges.includes(id));
    if (fresh) {
      setState((s) => ({ ...s, data: { ...s.data, badges: unlocked } }));
      setCelebration(fresh);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [progress, totals]);

  const update = useCallback((fn: (p: ProgressState) => ProgressState) => {
    setState((s) => ({ ...s, data: fn(s.data) }));
  }, []);

  const completeLesson = useCallback(
    (lessonId: string) => {
      update((p) => {
        if (p.completedLessons.includes(lessonId)) return p;
        const withXp = awardXp({ ...p, completedLessons: [...p.completedLessons, lessonId] }, XP.lesson);
        return { ...withXp, lastLesson: lessonId, mistakes: p.mistakes };
      });
    },
    [update],
  );

  const recordExercise = useCallback(
    (lessonId: string, exerciseId: string, correct: boolean, answer?: string) => {
      update((p) => {
        const prev = p.exercises[exerciseId];
        const attempts = (prev?.attempts ?? 0) + 1;
        const wasCorrect = prev?.correct ?? false;
        const nowCorrect = correct || wasCorrect;

        let next: ProgressState = {
          ...p,
          exercises: {
            ...p.exercises,
            [exerciseId]: {
              exerciseId,
              lessonId,
              attempts,
              correct: nowCorrect,
              lastAnswer: answer ?? prev?.lastAnswer,
              updatedAt: Date.now(),
            },
          },
        };

        // Historique des erreurs (à réviser)
        const withoutMistake = next.mistakes.filter((m) => m.exerciseId !== exerciseId);
        next.mistakes = correct
          ? withoutMistake
          : [{ exerciseId, lessonId, at: Date.now() }, ...withoutMistake].slice(0, 100);

        // Première réussite = XP
        if (correct && !wasCorrect) next = awardXp(next, XP.exercise);
        return next;
      });
    },
    [update],
  );

  const completeProject = useCallback(
    (projectId: string) => {
      update((p) => {
        if (p.completedProjects.includes(projectId)) return p;
        return awardXp({ ...p, completedProjects: [...p.completedProjects, projectId] }, XP.project);
      });
    },
    [update],
  );

  const touchLesson = useCallback(
    (lessonId: string) => {
      update((p) => (p.lastLesson === lessonId ? p : { ...p, lastLesson: lessonId }));
    },
    [update],
  );

  const resetProgress = useCallback(() => {
    setState((s) => ({ ...s, data: emptyProgress() }));
  }, []);

  const dismissCelebration = useCallback(() => setCelebration(null), []);

  const value = useMemo(
    () => ({
      progress,
      totals,
      celebration,
      dismissCelebration,
      completeLesson,
      recordExercise,
      completeProject,
      touchLesson,
      resetProgress,
    }),
    [progress, totals, celebration, dismissCelebration, completeLesson, recordExercise, completeProject, touchLesson, resetProgress],
  );

  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>;
}

export function useProgress(): ProgressContextValue {
  const ctx = useContext(ProgressContext);
  if (!ctx) throw new Error('useProgress doit être utilisé dans ProgressProvider');
  return ctx;
}
