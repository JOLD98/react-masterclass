// Utilitaires de stockage local (persistance de la progression)
const PREFIX = 'rm:';

export function load<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(PREFIX + key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export function save<T>(key: string, value: T): void {
  try {
    localStorage.setItem(PREFIX + key, JSON.stringify(value));
  } catch {
    // Quota dépassé ou stockage indisponible : on ignore silencieusement
  }
}

export function remove(key: string): void {
  try {
    localStorage.removeItem(PREFIX + key);
  } catch {
    /* ignoré */
  }
}

/** Date locale au format AAAA-MM-JJ */
export function todayStr(date: Date = new Date()): string {
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${date.getFullYear()}-${m}-${d}`;
}

export function yesterdayStr(): string {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return todayStr(d);
}

/** Normalise une réponse texte pour la comparaison */
export function normalizeAnswer(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[.,!?;:]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

/** Normalise une sortie console pour la comparaison */
export function normalizeOutput(text: string): string {
  return text
    .split('\n')
    .map((l) => l.trim())
    .filter(Boolean)
    .join('\n')
    .toLowerCase();
}
