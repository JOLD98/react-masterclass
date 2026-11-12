import type { Module, Project } from '../types';

// Chargement dynamique du contenu pédagogique :
// les fichiers moduleXX.ts et projects.ts sont produits séparément et
// sont tous agrégés ici, triés par numéro de module.
type FileExports = Record<string, unknown>;

const moduleFiles = import.meta.glob<FileExports>('./module*.ts', { eager: true });
const projectFiles = import.meta.glob<FileExports>('./projects.ts', { eager: true });

function isModule(value: unknown): value is Module {
  return (
    typeof value === 'object' &&
    value !== null &&
    typeof (value as Module).id === 'string' &&
    typeof (value as Module).number === 'number' &&
    Array.isArray((value as Module).lessons)
  );
}

function isProject(value: unknown): value is Project {
  return (
    typeof value === 'object' &&
    value !== null &&
    typeof (value as Project).id === 'string' &&
    Array.isArray((value as Project).steps)
  );
}

function collect<T>(files: Record<string, FileExports>, guard: (v: unknown) => v is T): T[] {
  return Object.values(files)
    .flatMap((exports) => Object.values(exports))
    .flat()
    .filter(guard);
}

export const baseModules: Module[] = collect(moduleFiles, isModule).sort((a, b) => a.number - b.number);
export const baseProjects: Project[] = collect(projectFiles, isProject);

/** Aplatit toutes les leçons de tous les modules */
export function allLessons(modules: Module[]): { module: Module; lesson: import('../types').Lesson }[] {
  return modules.flatMap((m) => m.lessons.map((lesson) => ({ module: m, lesson })));
}
