import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import type { Module, Project } from '../types';
import { baseModules, baseProjects } from '../content';
import { load, save, remove } from '../lib/storage';

const CONTENT_KEY = 'content';

interface StoredContent {
  modules?: Module[];
  projects?: Project[];
}

interface ContentContextValue {
  modules: Module[];
  projects: Project[];
  isCustom: boolean;
  saveModules: (modules: Module[]) => void;
  saveProjects: (projects: Project[]) => void;
  resetContent: () => void;
}

const ContentContext = createContext<ContentContextValue | null>(null);

export function ContentProvider({ children }: { children: ReactNode }) {
  const [stored, setStored] = useState<StoredContent>(() => load<StoredContent>(CONTENT_KEY, {}));

  const modules = stored.modules && stored.modules.length > 0 ? stored.modules : baseModules;
  const projects = stored.projects && stored.projects.length > 0 ? stored.projects : baseProjects;
  const isCustom = Boolean(stored.modules || stored.projects);

  const persist = useCallback((next: StoredContent) => {
    setStored(next);
    save(CONTENT_KEY, next);
  }, []);

  const saveModules = useCallback((next: Module[]) => persist({ ...stored, modules: next }), [persist, stored]);
  const saveProjects = useCallback((next: Project[]) => persist({ ...stored, projects: next }), [persist, stored]);
  const resetContent = useCallback(() => {
    remove(CONTENT_KEY);
    setStored({});
  }, []);

  const value = useMemo(
    () => ({ modules, projects, isCustom, saveModules, saveProjects, resetContent }),
    [modules, projects, isCustom, saveModules, saveProjects, resetContent],
  );

  return <ContentContext.Provider value={value}>{children}</ContentContext.Provider>;
}

export function useContent(): ContentContextValue {
  const ctx = useContext(ContentContext);
  if (!ctx) throw new Error('useContent doit être utilisé dans ContentProvider');
  return ctx;
}
