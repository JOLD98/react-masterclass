import { useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { useContent } from '../context/ContentContext';
import { useProgress } from '../context/ProgressContext';
import { Code } from '../components/Code';

export function ProjectDetail() {
  const { projectId } = useParams();
  const { projects } = useContent();
  const { progress, completeProject } = useProgress();

  const project = projects.find((p) => p.id === projectId);
  const [checked, setChecked] = useState<Record<number, boolean>>({});
  const [attempted, setAttempted] = useState(false);

  if (!project) return <Navigate to="/app/projets" replace />;

  const done = progress.completedProjects.includes(project.id);
  const allChecked = project.criteria.every((_, i) => checked[i]);
  const checkedCount = project.criteria.filter((_, i) => checked[i]).length;
  const unlocked = attempted || done;
  const index = projects.findIndex((p) => p.id === project.id);

  return (
    <div className="container" style={{ paddingTop: 30 }}>
      <div className="breadcrumb">
        <Link to="/app/projets">Projets</Link>
        <span>/</span>
        <span>{project.title}</span>
      </div>

      <div className="card" style={{ marginBottom: 24 }}>
        <div style={{ display: 'flex', gap: 20, alignItems: 'center', flexWrap: 'wrap' }}>
          <div className="feature-icon" style={{ margin: 0, width: 64, height: 64, fontSize: '2rem' }}>
            {['🧮', '📝', '🌤️', '📇', '🌤️', '📦', '👥', '📊', '🛒', '🔐'][index] ?? '🚀'}
          </div>
          <div style={{ flex: 1, minWidth: 260 }}>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 8 }}>
              <span className="tag">{project.level}</span>
              <span className="tag violet">Projet {index + 1}/10</span>
              {done && <span className="tag green">✓ Réalisé · +100 XP</span>}
            </div>
            <h1 style={{ fontSize: '1.8rem', margin: '0 0 6px' }}>{project.title}</h1>
            <p className="muted mb-0">{project.brief}</p>
          </div>
        </div>
      </div>

      <div className="grid-2" style={{ alignItems: 'start' }}>
        <div style={{ display: 'grid', gap: 20 }}>
          {/* Objectifs */}
          <div className="card">
            <div className="panel-title">
              <h3>🎯 Objectifs</h3>
            </div>
            <ul className="check-list" style={{ marginTop: 0 }}>
              {project.objectives.map((o, i) => (
                <li key={i}>{o}</li>
              ))}
            </ul>
            <div className="panel-title" style={{ marginTop: 22 }}>
              <h3>🧩 Compétences nécessaires</h3>
            </div>
            <div className="chips">
              {project.skills.map((s) => (
                <span className="chip" key={s}>
                  {s}
                </span>
              ))}
            </div>
          </div>

          {/* Maquette */}
          <div className="card">
            <div className="panel-title">
              <h3>🖼️ Résultat attendu (maquette)</h3>
            </div>
            <div className="preview-box">{project.preview}</div>
          </div>

          {/* Étapes */}
          <div className="card">
            <div className="panel-title">
              <h3>🧭 Étapes de réalisation</h3>
            </div>
            <ol className="steps">
              {project.steps.map((s, i) => (
                <li key={i}>
                  <strong>{s.title}</strong>
                  <span>{s.detail}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>

        <div style={{ display: 'grid', gap: 20, position: 'sticky', top: 90 }}>
          {/* Critères de validation */}
          <div className="card">
            <div className="panel-title">
              <h3>✅ Critères de validation</h3>
              <span className={`tag ${allChecked && checkedCount > 0 ? 'green' : 'gray'}`}>
                {checkedCount}/{project.criteria.length}
              </span>
            </div>
            <ul className="criteria-list">
              {project.criteria.map((c, i) => (
                <li key={i} className={checked[i] ? 'checked' : ''}>
                  <input
                    type="checkbox"
                    id={`crit-${i}`}
                    checked={!!checked[i]}
                    onChange={() => setChecked((prev) => ({ ...prev, [i]: !prev[i] }))}
                  />
                  <label htmlFor={`crit-${i}`}>{c}</label>
                </li>
              ))}
            </ul>

            <div style={{ display: 'grid', gap: 10, marginTop: 20 }}>
              {!done ? (
                <button
                  className="btn btn-primary"
                  disabled={!allChecked}
                  onClick={() => completeProject(project.id)}
                  title={allChecked ? '' : 'Cochez tous les critères pour valider'}
                >
                  🏆 Valider le projet (+100 XP)
                </button>
              ) : (
                <div className="form-success" style={{ margin: 0 }}>
                  Projet terminé ! Retrouvez-le dans votre tableau de bord.
                </div>
              )}
              {!attempted && !done && (
                <button className="btn btn-outline" onClick={() => setAttempted(true)}>
                  J’ai essayé — révéler la solution
                </button>
              )}
            </div>
          </div>

          {/* Solution */}
          <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
            {!unlocked ? (
              <div className="empty-state" style={{ border: 0, background: 'transparent' }}>
                <div className="icon">🔒</div>
                La correction détaillée se débloque après votre tentative.
                <p className="small muted mt-2">
                  Essayez d’abord par vous-même : c’est là que l’apprentissage est le plus efficace.
                </p>
              </div>
            ) : (
              <details className="solution" style={{ border: 0, borderRadius: 0 }}>
                <summary>📚 Correction détaillée du projet</summary>
                <div className="solution-body">
                  {project.solution.map((s, i) => (
                    <div key={i} style={{ marginBottom: 26 }}>
                      <h4 style={{ marginBottom: 6 }}>{s.title}</h4>
                      {s.note && (
                        <p className="small muted" style={{ marginTop: 0 }}>
                          {s.note}
                        </p>
                      )}
                      <Code code={s.code} caption={s.lang ?? 'jsx'} />
                    </div>
                  ))}
                </div>
              </details>
            )}
          </div>

          <div className="lesson-footer-nav" style={{ marginTop: 0 }}>
            <Link to="/app/projets" className="btn btn-ghost btn-sm">
              ← Tous les projets
            </Link>
            <Link to="/app" className="btn btn-ghost btn-sm">
              Tableau de bord →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
