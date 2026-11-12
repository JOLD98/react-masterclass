import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useContent } from '../context/ContentContext';
import { useProgress } from '../context/ProgressContext';
import type { Difficulty } from '../types';

const LEVELS: (Difficulty | 'Tous')[] = [
  'Tous',
  'Débutant',
  'Débutant confirmé',
  'Intermédiaire',
  'Intermédiaire avancé',
  'Avancé',
  'Expert',
];

const ICONS = ['🧮', '📝', '🌤️', '📇', '🌤️', '📦', '👥', '📊', '🛒', '🔐'];

export function Projects() {
  const { projects } = useContent();
  const { progress } = useProgress();
  const [filter, setFilter] = useState<(typeof LEVELS)[number]>('Tous');

  const visible = projects.filter((p) => filter === 'Tous' || p.level === filter);
  const doneCount = progress.completedProjects.length;

  return (
    <div className="container" style={{ paddingTop: 34 }}>
      <div className="dash-head">
        <div>
          <span className="hello">Apprendre en construisant</span>
          <h1>Bibliothèque de projets</h1>
        </div>
        <span className="tag green">
          {doneCount}/{projects.length} réalisés
        </span>
      </div>

      <p className="muted" style={{ maxWidth: 720 }}>
        Chaque projet contient ses objectifs, ses consignes, ses étapes de réalisation, ses critères
        de validation et une correction détaillée à consulter après votre tentative.
      </p>

      <div className="tabs" style={{ marginTop: 18 }}>
        {LEVELS.map((l) => (
          <button key={l} className={`tab ${filter === l ? 'active' : ''}`} onClick={() => setFilter(l)}>
            {l}
          </button>
        ))}
      </div>

      <div className="grid-3">
        {visible.map((p, i) => {
          const done = progress.completedProjects.includes(p.id);
          return (
            <Link to={`/app/projet/${p.id}`} key={p.id} className="card hover project-card" style={{ textDecoration: 'none' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div className="p-icon">{ICONS[projects.indexOf(p)] ?? '🚀'}</div>
                {done && <span className="tag green">✓ Réalisé</span>}
              </div>
              <span className="tag">{p.level}</span>
              <h3>{p.title}</h3>
              <p>{p.objectives[0]}</p>
              <div className="chips">
                {p.skills.slice(0, 4).map((s) => (
                  <span className="chip" key={s}>
                    {s}
                  </span>
                ))}
                {p.skills.length > 4 && <span className="chip">+{p.skills.length - 4}</span>}
              </div>
              <span className="btn btn-outline btn-sm" style={{ width: '100%' }}>
                Ouvrir le projet →
              </span>
            </Link>
          );
        })}
      </div>

      {visible.length === 0 && (
        <div className="empty-state">
          <div className="icon">🔍</div>
          Aucun projet à ce niveau pour le moment.
        </div>
      )}
    </div>
  );
}
