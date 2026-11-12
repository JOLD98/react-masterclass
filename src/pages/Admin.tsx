import { useState } from 'react';
import type { Lesson, Module, Project } from '../types';
import { useContent } from '../context/ContentContext';
import { useProgress } from '../context/ProgressContext';
import { computeStats, moduleProgress, weakestModules } from '../lib/stats';
import { BADGES } from '../lib/levels';

type Tab = 'modules' | 'projets' | 'stats';

const LEVELS = ['Débutant', 'Débutant confirmé', 'Intermédiaire', 'Intermédiaire avancé', 'Avancé', 'Expert'];

function parseJson<T>(raw: string): { ok: true; value: T } | { ok: false; error: string } {
  try {
    return { ok: true, value: JSON.parse(raw) as T };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : 'JSON invalide' };
  }
}

/* ================= MODULE FORM ================= */
function ModuleForm({
  initial,
  onSave,
  onCancel,
}: {
  initial: Module;
  onSave: (m: Module) => void;
  onCancel: () => void;
}) {
  const [draft, setDraft] = useState<Module>({ ...initial });
  const [error, setError] = useState('');

  const set = <K extends keyof Module>(key: K, value: Module[K]) => setDraft((d) => ({ ...d, [key]: value }));

  return (
    <div className="card" style={{ marginBottom: 14, borderColor: 'var(--border-strong)' }}>
      <h3 style={{ fontSize: '1rem' }}>{initial.lessons.length === 0 && !initial.title ? 'Nouveau module' : `Modifier : ${initial.title}`}</h3>
      {error && <div className="form-error">{error}</div>}
      <div className="grid-2" style={{ gap: 14 }}>
        <div className="field">
          <label>Titre</label>
          <input className="input" value={draft.title} onChange={(e) => set('title', e.target.value)} />
        </div>
        <div className="field">
          <label>Icône (emoji)</label>
          <input className="input" value={draft.icon} onChange={(e) => set('icon', e.target.value)} maxLength={4} />
        </div>
      </div>
      <div className="field">
        <label>Description</label>
        <input className="input" value={draft.description} onChange={(e) => set('description', e.target.value)} />
      </div>
      <div className="grid-2" style={{ gap: 14 }}>
        <div className="field">
          <label>Niveau</label>
          <select className="select" value={draft.level} onChange={(e) => set('level', e.target.value as Module['level'])}>
            {LEVELS.map((l) => (
              <option key={l}>{l}</option>
            ))}
          </select>
        </div>
        <div className="field">
          <label>Numéro</label>
          <input
            className="input"
            type="number"
            value={draft.number}
            onChange={(e) => set('number', Number(e.target.value))}
          />
        </div>
      </div>
      <div className="exercise-actions">
        <button
          className="btn btn-primary btn-sm"
          onClick={() => {
            if (!draft.title.trim()) return setError('Le titre est obligatoire.');
            if (draft.number < 1) return setError('Le numéro doit être positif.');
            onSave(draft);
          }}
        >
          Enregistrer
        </button>
        <button className="btn btn-ghost btn-sm" onClick={onCancel}>
          Annuler
        </button>
      </div>
    </div>
  );
}

/* ================= LESSON FORM ================= */
function LessonForm({
  initial,
  onSave,
  onCancel,
}: {
  initial: Lesson;
  onSave: (l: Lesson) => void;
  onCancel: () => void;
}) {
  const [title, setTitle] = useState(initial.title);
  const [minutes, setMinutes] = useState(String(initial.minutes));
  const [objectives, setObjectives] = useState((initial.objectives ?? []).join('\n'));
  const [blocksRaw, setBlocksRaw] = useState(JSON.stringify(initial.blocks, null, 2));
  const [exercisesRaw, setExercisesRaw] = useState(JSON.stringify(initial.exercises, null, 2));
  const [error, setError] = useState('');

  const save = () => {
    setError('');
    if (!title.trim()) return setError('Le titre est obligatoire.');
    const blocks = parseJson<unknown[]>(blocksRaw);
    if (!blocks.ok) return setError('Blocs JSON invalides : ' + blocks.error);
    if (!Array.isArray(blocks.value)) return setError('Les blocs doivent être un tableau JSON.');
    const exercises = parseJson<unknown[]>(exercisesRaw);
    if (!exercises.ok) return setError('Exercices JSON invalides : ' + exercises.error);
    if (!Array.isArray(exercises.value)) return setError('Les exercices doivent être un tableau JSON.');
    for (const ex of exercises.value as Record<string, unknown>[]) {
      if (!ex.id || !ex.question || !ex.type || !ex.explanation) {
        return setError('Chaque exercice doit avoir : id, type, question, explanation.');
      }
    }
    onSave({
      ...initial,
      title: title.trim(),
      minutes: Math.max(1, Number(minutes) || 5),
      objectives: objectives.split('\n').map((s) => s.trim()).filter(Boolean),
      blocks: blocks.value as Lesson['blocks'],
      exercises: exercises.value as Lesson['exercises'],
    });
  };

  return (
    <div className="card" style={{ marginBottom: 14, borderColor: 'var(--border-strong)' }}>
      <h3 style={{ fontSize: '1rem' }}>Modifier la leçon</h3>
      {error && <div className="form-error">{error}</div>}
      <div className="grid-2" style={{ gap: 14 }}>
        <div className="field">
          <label>Titre</label>
          <input className="input" value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div className="field">
          <label>Durée (minutes)</label>
          <input className="input" type="number" value={minutes} onChange={(e) => setMinutes(e.target.value)} />
        </div>
      </div>
      <div className="field">
        <label>Objectifs (un par ligne)</label>
        <textarea className="textarea" style={{ minHeight: 70, fontFamily: 'var(--font)' }} value={objectives} onChange={(e) => setObjectives(e.target.value)} />
      </div>
      <div className="field">
        <label>Blocs de contenu (JSON) — types : p, h, code, list, result, mistake, quote</label>
        <textarea className="textarea json-area" value={blocksRaw} onChange={(e) => setBlocksRaw(e.target.value)} spellCheck={false} />
      </div>
      <div className="field">
        <label>Exercices (JSON) — 3 à 5 par leçon</label>
        <textarea className="textarea json-area" value={exercisesRaw} onChange={(e) => setExercisesRaw(e.target.value)} spellCheck={false} />
      </div>
      <div className="exercise-actions">
        <button className="btn btn-primary btn-sm" onClick={save}>
          Enregistrer
        </button>
        <button className="btn btn-ghost btn-sm" onClick={onCancel}>
          Annuler
        </button>
      </div>
    </div>
  );
}

/* ================= PROJECT FORM ================= */
function ProjectForm({
  initial,
  onSave,
  onCancel,
}: {
  initial: Project;
  onSave: (p: Project) => void;
  onCancel: () => void;
}) {
  const [title, setTitle] = useState(initial.title);
  const [level, setLevel] = useState(initial.level);
  const [raw, setRaw] = useState(JSON.stringify(initial, null, 2));
  const [error, setError] = useState('');

  const save = () => {
    setError('');
    const parsed = parseJson<Project>(raw);
    if (!parsed.ok) return setError('JSON invalide : ' + parsed.error);
    if (!parsed.value.id || !Array.isArray(parsed.value.steps) || !Array.isArray(parsed.value.criteria)) {
      return setError('Le projet doit contenir id, steps[], criteria[], objectives[], skills[], solution[].');
    }
    onSave({ ...parsed.value, title: title.trim() || parsed.value.title, level });
  };

  return (
    <div className="card" style={{ marginBottom: 14, borderColor: 'var(--border-strong)' }}>
      <h3 style={{ fontSize: '1rem' }}>Modifier le projet</h3>
      {error && <div className="form-error">{error}</div>}
      <div className="grid-2" style={{ gap: 14 }}>
        <div className="field">
          <label>Titre</label>
          <input className="input" value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div className="field">
          <label>Niveau</label>
          <select className="select" value={level} onChange={(e) => setLevel(e.target.value as Project['level'])}>
            {LEVELS.map((l) => (
              <option key={l}>{l}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="field">
        <label>Projet complet (JSON)</label>
        <textarea className="textarea json-area" value={raw} onChange={(e) => setRaw(e.target.value)} spellCheck={false} />
      </div>
      <div className="exercise-actions">
        <button className="btn btn-primary btn-sm" onClick={save}>
          Enregistrer
        </button>
        <button className="btn btn-ghost btn-sm" onClick={onCancel}>
          Annuler
        </button>
      </div>
    </div>
  );
}

/* ================= ADMIN ================= */
export function Admin() {
  const { modules, projects, saveModules, saveProjects, resetContent, isCustom } = useContent();
  const { progress } = useProgress();

  const [tab, setTab] = useState<Tab>('modules');
  const [openModule, setOpenModule] = useState<string | null>(null);
  const [moduleDraft, setModuleDraft] = useState<Module | null>(null);
  const [lessonDraft, setLessonDraft] = useState<{ moduleId: string; lesson: Lesson } | null>(null);
  const [projectDraft, setProjectDraft] = useState<Project | null>(null);
  const [notice, setNotice] = useState('');

  const flash = (msg: string) => {
    setNotice(msg);
    window.setTimeout(() => setNotice(''), 3000);
  };

  /* ---- Modules ---- */
  const addModule = () => {
    const number = modules.reduce((max, m) => Math.max(max, m.number), 0) + 1;
    const id = `m${String(number).padStart(2, '0')}`;
    const newModule: Module = {
      id,
      number,
      title: 'Nouveau module',
      description: 'Description du module…',
      icon: '📘',
      level: 'Débutant',
      lessons: [],
    };
    saveModules([...modules, newModule]);
    setModuleDraft(newModule);
    setOpenModule(id);
    flash('Module ajouté — modifiez-le puis ajoutez des leçons.');
  };

  const deleteModule = (m: Module) => {
    if (!window.confirm(`Supprimer le module « ${m.title} » et ses ${m.lessons.length} leçons ?`)) return;
    saveModules(modules.filter((x) => x.id !== m.id));
    flash('Module supprimé.');
  };

  const updateModule = (updated: Module) => {
    saveModules(modules.map((m) => (m.id === updated.id ? updated : m)));
    setModuleDraft(null);
    flash('Module enregistré.');
  };

  const addLesson = (m: Module) => {
    const n = m.lessons.length + 1;
    const lesson: Lesson = {
      id: `${m.id}-l${String(n).padStart(2, '0')}`,
      title: 'Nouvelle leçon',
      minutes: 6,
      objectives: ['Objectif 1'],
      blocks: [
        { type: 'p', text: 'Introduction de la leçon…' },
        { type: 'h', text: 'Explication simple' },
        { type: 'p', text: 'Explication…' },
        { type: 'quote', text: 'Résumé : …' },
      ],
      exercises: [
        {
          id: `${m.id}-l${String(n).padStart(2, '0')}-e1`,
          type: 'qcm',
          difficulty: 'facile',
          question: 'Question ?',
          options: ['Réponse A', 'Réponse B'],
          answer: 0,
          explanation: 'La réponse A est correcte car…',
        },
      ],
    };
    saveModules(modules.map((x) => (x.id === m.id ? { ...x, lessons: [...x.lessons, lesson] } : x)));
    setLessonDraft({ moduleId: m.id, lesson });
    flash('Leçon ajoutée.');
  };

  const updateLesson = (moduleId: string, lesson: Lesson) => {
    saveModules(
      modules.map((m) =>
        m.id === moduleId ? { ...m, lessons: m.lessons.map((l) => (l.id === lesson.id ? lesson : l)) } : m,
      ),
    );
    setLessonDraft(null);
    flash('Leçon enregistrée.');
  };

  const deleteLesson = (m: Module, lesson: Lesson) => {
    if (!window.confirm(`Supprimer la leçon « ${lesson.title} » ?`)) return;
    saveModules(modules.map((x) => (x.id === m.id ? { ...x, lessons: x.lessons.filter((l) => l.id !== lesson.id) } : x)));
    flash('Leçon supprimée.');
  };

  /* ---- Projets ---- */
  const addProject = () => {
    const n = projects.length + 1;
    const p: Project = {
      id: `p${String(n).padStart(2, '0')}`,
      title: 'Nouveau projet',
      level: 'Débutant',
      skills: ['React'],
      objectives: ['Objectif 1'],
      brief: 'Consigne générale…',
      preview: '• Zone principale\n• Bouton d’action',
      steps: [{ title: 'Étape 1', detail: 'Détail…' }],
      criteria: ['Critère 1'],
      solution: [{ title: 'Composant principal', lang: 'jsx', code: 'export default function App() {\n  return <div>À venir</div>;\n}', note: '' }],
    };
    saveProjects([...projects, p]);
    setProjectDraft(p);
    flash('Projet ajouté.');
  };

  const updateProject = (updated: Project) => {
    saveProjects(projects.map((p) => (p.id === updated.id ? updated : p)));
    setProjectDraft(null);
    flash('Projet enregistré.');
  };

  const deleteProject = (p: Project) => {
    if (!window.confirm(`Supprimer le projet « ${p.title} » ?`)) return;
    saveProjects(projects.filter((x) => x.id !== p.id));
    flash('Projet supprimé.');
  };

  /* ---- Stats ---- */
  const stats = computeStats(modules, projects.length, progress);
  const mods = moduleProgress(modules, progress);
  const weak = weakestModules(modules, progress);
  const totalExercises = modules.reduce((s, m) => s + m.lessons.reduce((t, l) => t + l.exercises.length, 0), 0);

  return (
    <div className="container" style={{ paddingTop: 34 }}>
      <div className="dash-head">
        <div>
          <span className="hello">Gestion du contenu</span>
          <h1>Administration</h1>
        </div>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          {isCustom && (
            <button
              className="btn btn-outline btn-sm"
              onClick={() => {
                if (window.confirm('Restaurer le contenu d’origine et annuler toutes vos modifications ?')) {
                  resetContent();
                  setModuleDraft(null);
                  setLessonDraft(null);
                  setProjectDraft(null);
                  flash('Contenu d’origine restauré.');
                }
              }}
            >
              ↺ Restaurer l’original
            </button>
          )}
        </div>
      </div>

      {notice && <div className="form-success">{notice}</div>}

      <div className="tabs">
        <button className={`tab ${tab === 'modules' ? 'active' : ''}`} onClick={() => setTab('modules')}>
          📚 Modules & leçons
        </button>
        <button className={`tab ${tab === 'projets' ? 'active' : ''}`} onClick={() => setTab('projets')}>
          🏗️ Projets
        </button>
        <button className={`tab ${tab === 'stats' ? 'active' : ''}`} onClick={() => setTab('stats')}>
          📈 Statistiques
        </button>
      </div>

      {/* ================= MODULES ================= */}
      {tab === 'modules' && (
        <div>
          <div style={{ marginBottom: 18 }}>
            <button className="btn btn-primary btn-sm" onClick={addModule}>
              + Ajouter un module
            </button>
          </div>

          {moduleDraft && (
            <ModuleForm initial={moduleDraft} onSave={updateModule} onCancel={() => setModuleDraft(null)} />
          )}

          {modules.map((m) => {
            const isOpen = openModule === m.id;
            return (
              <div key={m.id} className="admin-row" style={{ flexDirection: 'column', alignItems: 'stretch' }}>
                <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
                  <span style={{ fontSize: '1.3rem' }}>{m.icon}</span>
                  <div className="grow">
                    <h4>
                      {m.number}. {m.title}
                    </h4>
                    <p>
                      {m.lessons.length} leçon(s) · {m.level} · id: {m.id}
                    </p>
                  </div>
                  <button className="btn btn-outline btn-sm" onClick={() => setOpenModule(isOpen ? null : m.id)}>
                    {isOpen ? 'Masquer les leçons' : `Leçons (${m.lessons.length})`}
                  </button>
                  <button className="btn btn-outline btn-sm" onClick={() => setModuleDraft(m)}>
                    ✏️ Modifier
                  </button>
                  <button className="btn btn-danger btn-sm" onClick={() => deleteModule(m)}>
                    🗑
                  </button>
                </div>

                {isOpen && (
                  <div style={{ marginTop: 14, width: '100%' }}>
                    <button className="btn btn-ghost btn-sm" onClick={() => addLesson(m)} style={{ marginBottom: 10 }}>
                      + Ajouter une leçon
                    </button>

                    {lessonDraft?.moduleId === m.id && (
                      <LessonForm
                        initial={lessonDraft.lesson}
                        onSave={(l) => updateLesson(m.id, l)}
                        onCancel={() => setLessonDraft(null)}
                      />
                    )}

                    {m.lessons.map((l, i) => (
                      <div key={l.id} className="admin-row" style={{ marginBottom: 8 }}>
                        <span className="idx" style={{ width: 28 }}>
                          {i + 1}
                        </span>
                        <div className="grow">
                          <h4>{l.title}</h4>
                          <p>
                            {l.minutes} min · {l.blocks.length} blocs · {l.exercises.length} exercices · id: {l.id}
                          </p>
                        </div>
                        <button
                          className="btn btn-outline btn-sm"
                          onClick={() => setLessonDraft({ moduleId: m.id, lesson: l })}
                        >
                          ✏️ Modifier
                        </button>
                        <button className="btn btn-danger btn-sm" onClick={() => deleteLesson(m, l)}>
                          🗑
                        </button>
                      </div>
                    ))}
                    {m.lessons.length === 0 && <p className="small muted">Aucune leçon — ajoutez-en une !</p>}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* ================= PROJETS ================= */}
      {tab === 'projets' && (
        <div>
          <div style={{ marginBottom: 18 }}>
            <button className="btn btn-primary btn-sm" onClick={addProject}>
              + Ajouter un projet
            </button>
          </div>

          {projectDraft && (
            <ProjectForm initial={projectDraft} onSave={updateProject} onCancel={() => setProjectDraft(null)} />
          )}

          {projects.map((p) => (
            <div key={p.id} className="admin-row">
              <div className="grow">
                <h4>
                  {p.id} · {p.title}
                </h4>
                <p>
                  {p.level} · {p.steps.length} étapes · {p.criteria.length} critères · {p.solution.length} bloc(s) de
                  solution
                </p>
              </div>
              <button className="btn btn-outline btn-sm" onClick={() => setProjectDraft(p)}>
                ✏️ Modifier
              </button>
              <button className="btn btn-danger btn-sm" onClick={() => deleteProject(p)}>
                🗑
              </button>
            </div>
          ))}
        </div>
      )}

      {/* ================= STATISTIQUES ================= */}
      {tab === 'stats' && (
        <div>
          <div className="grid-4" style={{ marginBottom: 22 }}>
            <div className="card stat-card">
              <div className="stat-icon">📚</div>
              <div>
                <strong>{modules.length}</strong>
                <span>modules</span>
              </div>
            </div>
            <div className="card stat-card">
              <div className="stat-icon violet">📖</div>
              <div>
                <strong>{stats.totalLessons}</strong>
                <span>leçons</span>
              </div>
            </div>
            <div className="card stat-card">
              <div className="stat-icon green">✅</div>
              <div>
                <strong>{totalExercises}</strong>
                <span>exercices</span>
              </div>
            </div>
            <div className="card stat-card">
              <div className="stat-icon amber">🏗️</div>
              <div>
                <strong>{projects.length}</strong>
                <span>projets</span>
              </div>
            </div>
          </div>

          <div className="grid-2" style={{ alignItems: 'start' }}>
            <div className="card">
              <div className="panel-title">
                <h3>📊 Progression de l’étudiant connecté</h3>
              </div>
              <div className="progress-row">
                <span>Progression globale</span>
                <strong>{stats.percent} %</strong>
              </div>
              <div className="progress">
                <span style={{ width: `${stats.percent}%` }} />
              </div>
              <div className="progress-row" style={{ marginTop: 14 }}>
                <span>Réussite aux exercices</span>
                <strong>{stats.exerciseSuccess} %</strong>
              </div>
              <div className="progress">
                <span style={{ width: `${stats.exerciseSuccess}%` }} />
              </div>
              <p className="small muted" style={{ marginTop: 16, marginBottom: 0 }}>
                {stats.completedLessons} leçons terminées · {stats.correctExercises} exercices réussis ·{' '}
                {stats.completedProjects} projets réalisés · {progress.xp} XP · {progress.badges.length}/
                {BADGES.length} badges
              </p>
            </div>

            <div className="card">
              <div className="panel-title">
                <h3>📉 Modules les plus difficiles</h3>
              </div>
              {weak.length === 0 ? (
                <p className="muted small">Pas encore de données d’exercices.</p>
              ) : (
                <div style={{ display: 'grid', gap: 12 }}>
                  {weak.slice(0, 6).map(({ module, rate }) => (
                    <div className="bar-row" key={module.id}>
                      <span title={module.title}>
                        {module.icon} {module.title.slice(0, 20)}
                        {module.title.length > 20 ? '…' : ''}
                      </span>
                      <span className="bar">
                        <i className={rate < 60 ? 'low' : ''} style={{ width: `${rate}%` }} />
                      </span>
                      <span className="val">{rate} %</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="card" style={{ marginTop: 22 }}>
            <div className="panel-title">
              <h3>📚 Avancement par module</h3>
            </div>
            <div style={{ display: 'grid', gap: 12 }}>
              {mods.map(({ module, completed, total, percent }) => (
                <div className="bar-row" key={module.id}>
                  <span title={module.title}>
                    {module.icon} {module.title.slice(0, 20)}
                    {module.title.length > 20 ? '…' : ''}
                  </span>
                  <span className="bar">
                    <i style={{ width: `${percent}%` }} />
                  </span>
                  <span className="val">
                    {completed}/{total}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
