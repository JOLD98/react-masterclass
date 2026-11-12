import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useContent } from '../context/ContentContext';
import { useProgress } from '../context/ProgressContext';
import { computeStats } from '../lib/stats';
import { levelFor } from '../lib/levels';

const MIN_PERCENT = 80;
const MIN_PROJECTS = 5;

export function Certificate() {
  const { user } = useAuth();
  const { modules, projects } = useContent();
  const { progress } = useProgress();

  const stats = computeStats(modules, projects.length, progress);
  const eligible = stats.percent >= MIN_PERCENT && stats.completedProjects >= MIN_PROJECTS;
  const name = user?.name ?? 'Invité';
  const date = new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });

  return (
    <div className="container" style={{ paddingTop: 34 }}>
      <div className="dash-head no-print">
        <div>
          <span className="hello">Récompense du parcours</span>
          <h1>Certificat de réussite</h1>
        </div>
        {eligible && (
          <button className="btn btn-primary" onClick={() => window.print()}>
            🖨 Imprimer / PDF
          </button>
        )}
      </div>

      {!eligible ? (
        <div className="card center" style={{ maxWidth: 640, margin: '0 auto' }}>
          <div style={{ fontSize: '3rem' }}>🔒</div>
          <h2>Certificat verrouillé</h2>
          <p className="muted">
            Atteignez <strong style={{ color: 'var(--primary)' }}>{MIN_PERCENT} % du parcours</strong> et
            réalisez <strong style={{ color: 'var(--primary)' }}>{MIN_PROJECTS} projets</strong> pour
            débloquer votre certificat.
          </p>
          <div style={{ maxWidth: 400, margin: '24px auto' }}>
            <div className="progress-row">
              <span>Progression</span>
              <strong>
                {stats.percent} / {MIN_PERCENT} %
              </strong>
            </div>
            <div className="progress">
              <span style={{ width: `${Math.min(100, (stats.percent / MIN_PERCENT) * 100)}%` }} />
            </div>
            <div className="progress-row" style={{ marginTop: 14 }}>
              <span>Projets réalisés</span>
              <strong>
                {stats.completedProjects} / {MIN_PROJECTS}
              </strong>
            </div>
            <div className="progress">
              <span style={{ width: `${Math.min(100, (stats.completedProjects / MIN_PROJECTS) * 100)}%` }} />
            </div>
          </div>
          <Link to="/app/programme" className="btn btn-primary">
            Continuer ma formation
          </Link>
        </div>
      ) : (
        <div className="certificate">
          <div style={{ fontSize: '2.4rem' }}>⚛️</div>
          <p style={{ letterSpacing: '0.3em', textTransform: 'uppercase', fontSize: '0.8rem', color: '#0891b2', fontWeight: 700 }}>
            React Masterclass
          </p>
          <h1>Certificat de réussite</h1>
          <p className="muted">Ce certificat est décerné à</p>
          <div className="cert-name">{name}</div>
          <div className="cert-line" />
          <p style={{ maxWidth: 560, margin: '0 auto', color: '#334155' }}>
            pour avoir suivi avec succès la formation complète{' '}
            <strong>« Maîtrisez React JS de zéro à expert »</strong> : {stats.totalLessons} leçons,
            {stats.correctExercises} exercices réussis et {stats.completedProjects} projets réalisés.
          </p>
          <p style={{ marginTop: 18 }}>
            <span className="tag" style={{ background: '#e0f2fe', color: '#0369a1', border: '1px solid #7dd3fc' }}>
              Niveau atteint : {levelFor(progress.xp)}
            </span>
          </p>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 40, fontSize: '0.85rem', color: '#475569' }}>
            <span>Émis le {date}</span>
            <span>ID : RM-{progress.xp}-{stats.completedLessons}L</span>
          </div>
        </div>
      )}
    </div>
  );
}
