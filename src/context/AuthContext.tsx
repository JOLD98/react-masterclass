import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import type { User } from '../types';
import { load, save } from '../lib/storage';

const USERS_KEY = 'users';
const SESSION_KEY = 'session';

/** Hachage léger (démo locale — un vrai projet utiliserait bcrypt côté serveur) */
function hashPassword(text: string): string {
  let h1 = 0xdeadbeef ^ text.length;
  let h2 = 0x41c6ce57 ^ text.length;
  for (let i = 0; i < text.length; i++) {
    const ch = text.charCodeAt(i);
    h1 = Math.imul(h1 ^ ch, 2654435761);
    h2 = Math.imul(h2 ^ ch, 1597334677);
  }
  h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909);
  h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909);
  return (4294967296 * (2097151 & h2) + (h1 >>> 0)).toString(16);
}

interface AuthContextValue {
  user: User | null;
  register: (name: string, email: string, password: string) => { ok: boolean; error?: string };
  login: (email: string, password: string) => { ok: boolean; error?: string };
  logout: () => void;
  updateName: (name: string) => { ok: boolean; error?: string };
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => load<User | null>(SESSION_KEY, null));

  useEffect(() => {
    if (user) save(SESSION_KEY, user);
    else localStorage.removeItem('rm:' + SESSION_KEY);
  }, [user]);

  const register = useCallback((name: string, email: string, password: string) => {
    const cleanEmail = email.trim().toLowerCase();
    const cleanName = name.trim();
    if (cleanName.length < 2) return { ok: false, error: 'Veuillez saisir un nom d’au moins 2 caractères.' };
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) return { ok: false, error: 'Adresse e-mail invalide.' };
    if (password.length < 6) return { ok: false, error: 'Le mot de passe doit contenir au moins 6 caractères.' };

    const users = load<User[]>(USERS_KEY, []);
    if (users.some((u) => u.email === cleanEmail)) {
      return { ok: false, error: 'Un compte existe déjà avec cette adresse e-mail.' };
    }
    const newUser: User = {
      id: 'u_' + Date.now().toString(36) + Math.random().toString(36).slice(2, 7),
      name: cleanName,
      email: cleanEmail,
      passwordHash: hashPassword(password),
      createdAt: Date.now(),
    };
    save(USERS_KEY, [...users, newUser]);
    setUser(newUser);
    return { ok: true };
  }, []);

  const login = useCallback((email: string, password: string) => {
    const cleanEmail = email.trim().toLowerCase();
    const users = load<User[]>(USERS_KEY, []);
    const found = users.find((u) => u.email === cleanEmail);
    if (!found) return { ok: false, error: 'Aucun compte trouvé avec cette adresse e-mail.' };
    if (found.passwordHash !== hashPassword(password)) return { ok: false, error: 'Mot de passe incorrect.' };
    setUser(found);
    return { ok: true };
  }, []);

  const logout = useCallback(() => setUser(null), []);

  const updateName = useCallback(
    (name: string) => {
      const cleanName = name.trim();
      if (cleanName.length < 2) return { ok: false, error: 'Le nom doit contenir au moins 2 caractères.' };
      setUser((current) => {
        if (!current) return current;
        const updated = { ...current, name: cleanName };
        const users = load<User[]>(USERS_KEY, []);
        save(
          USERS_KEY,
          users.map((u) => (u.id === updated.id ? updated : u)),
        );
        return updated;
      });
      return { ok: true };
    },
    [],
  );

  const value = useMemo(() => ({ user, register, login, logout, updateName }), [user, register, login, logout, updateName]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth doit être utilisé dans AuthProvider');
  return ctx;
}
