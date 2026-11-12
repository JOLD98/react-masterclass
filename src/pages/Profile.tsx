import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useContent } from '../context/ContentContext';
import { useProgress } from '../context/ProgressContext';
import { computeStats } from '../lib/stats';
import { BADGES, levelFor, nextLevelProgress } from '../lib/levels';

export function Profile() {
  const { user, logout, updateName } = useAuth();
  const { modules, projects } = useContent();
  const { progress, resetProgress } = useProgress();
  const navigate = useNavigate();

  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(user?.name ?? '');
  const [message, setMessage] = useState('');

  const stats = computeStats(modules, projects.length, progress);
  const level = levelFor(progress.xp);
  const next = nextLevelProgress(progress.xp);

  const saveName = () => {
    const r = updateName(name);
    setMessage(r.ok ? 'Profil mis à jour ✓' : (r.error ?? ''));
    if (r.ok) setEditing(false);
  };

  const doLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="container" style={{ paddingTop: 34, maxWidth: 960 }}>
      <div className="dash-head">
        <div>
          <span className="hello">Votre espace</span>
          <h1>Profil étudiant</h1>
        </div>
      </div>

      <div className="card" style={{ marginBottom: 22 }}>
        <div className="profile-head">
          <div className="avatar-xl">{(user?.name ?? 'Invité').charAt(0).toUpperCase()}</div>
          <div style={{ flex: 1, minWidth: 240 }}>
            {editing ? (
              <div style={{ display: 'flex', gap: 10 }}>
                <input className="input" value={name} onChange={(e) => setName(e.target.value)} />
                <button className="btn btn-primary btn-sm" onClick={saveName}>
                  Enregistrer
                </button>
                <button className="btn btn-ghost btn-sm" onClick={() => setEditing(false)}>
                  Annuler
                </button>
              </div>
            ) : (
              <>
                <h2 style={{ marginBottom: 4 }}>{user?.name ?? 'Mode invité'}</h2>
                <p className="muted mb-0">
                  {user?.email ?? 'Aucun compte lié — votre progression reste sur cet appareil.'}
                </p>
                <div style={{ display: 'flex', gap: 8, marginTop: 10, flexWrap: 'wrap' }}>
                  <span className="tag">⭐ {level}</span>
                  <span className="xp-chip">⚡ {progress.xp} XP</span>
                  <span className="streak">🔥 {progress.streak.current} j</span>
                  {user && (
                    <button className="btn btn-ghost btn-sm" onClick={() => setEditing(true)}>
                      ✏️ Modifier le nom
                    </button>
                  )}
                </div>
              </>
            )}
            {message && <p className="small" style={{ color: 'var(--green)' }}>{message}</p>}
          </div>
        </div>

        <hr className="divider" />

        <div className="grid-4">
          <div className="stat-card" style={{ padding: 0 }}>
            <div>
              <strong>{stats.percent} %</strong>
              <span>progression globale</span>
            </div>
          </div>
          <div className="stat-card" style={{ padding: 0 }}>
            <div>
              <strong>
                {stats.completedLessons}/{stats.totalLessons}
              </strong>
              <span>leçons</span>
            </div>
          </div>
          <div className="stat-card" style={{ padding: 0 }}>
            <div>
              <strong>{stats.correctExercises}</strong>
              <span>exercices réussis</span>
            </div>
          </div>
          <div className="stat-card" style={{ padding: 0 }}>
            <div>
              <strong>
                {stats.completedProjects}/{stats.totalProjects}
              </strong>
              <span>projets</span>
            </div>
          </div>
        </div>

        <div style={{ marginTop: 22 }}>
          <div className="progress-row">
            <span>
              {level} → {next.next ?? 'Expert'}
            </span>
            <strong>{next.percent} %</strong>
          </div>
          <div className="progress">
            <span style={{ width: `${next.percent}%` }} />
          </div>
        </div>
      </div>

      <div className="card" style={{ marginBottom: 22 }}>
        <div className="panel-title">
          <h3>🏆 Mes badges ({progress.badges.length}/{BADGES.length})</h3>
        </div>
        <div className="badges-grid">
          {BADGES.map((b) => {
            const unlocked = progress.badges.includes(b.id);
            return (
              <div key={b.id} className={`badge-cell ${unlocked ? 'unlocked' : ''}`} title={b.description}>
                <div className="b-icon">{b.icon}</div>
                <div className="b-name">{b.name}</div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="grid-2">
        <div className="card">
          <div className="panel-title">
            <h3>🔗 Compte</h3>
          </div>
          <p className="muted small">
            {user
              ? 'Votre progression est liée à votre compte et conservée sur cet appareil.'
              : 'Créez un compte pour associer votre progression à votre identité.'}
          </p>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            {user ? (
              <button className="btn btn-outline btn-sm" onClick={doLogout}>
                Se déconnecter
              </button>
            ) : (
              <>
                <Link to="/inscription" className="btn btn-primary btn-sm">
                  Créer un compte
                </Link>
                <Link to="/connexion" className="btn btn-outline btn-sm">
                  Se connecter
                </Link>
              </>
            )}
            <Link to="/app/certificat" className="btn btn-ghost btn-sm">
              🎓 Mon certificat
            </Link>
          </div>
        </div>

        <div className="card" style={{ borderColor: 'rgba(248,113,113,.35)' }}>
          <div className="panel-title">
            <h3>Zone de danger</h3>
          </div>
          <p className="muted small">Remise à zéro de toute votre progression (leçons, XP, badges, projets).</p>
          <button
            className="btn btn-danger btn-sm"
            onClick={() => {
              if (window.confirm('Tout effacer définitivement ? Cette action est irréversible.')) {
                resetProgress();
                setMessage('Progression réinitialisée.');
              }
            }}
          >
            Réinitialiser ma progression
          </button>
        </div>
      </div>
    </div>
  );
}
