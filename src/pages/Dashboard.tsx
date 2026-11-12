import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useContent } from '../context/ContentContext';
import { useProgress } from '../context/ProgressContext';
import { computeStats, moduleProgress } from '../lib/stats';
import { BADGES, XP, levelFor, nextLevelProgress } from '../lib/levels';
import { todayStr } from '../lib/storage';

export function Dashboard() {
  const { user } = useAuth();
  const { modules, projects } = useContent();
  const { progress } = useProgress();

  const stats = computeStats(modules, projects.length, progress);
  const level = levelFor(progress.xp);
  const next = nextLevelProgress(progress.xp);
  const mods = moduleProgress(modules, progress);
  const isToday = progress.daily.date === todayStr();
  const dailyXp = isToday ? progress.daily.xp : 0;
  const dailyPercent = Math.min(100, Math.round((dailyXp / XP.dailyGoal) * 100));

  // Dernière leçon consultée
  let last: { moduleId: string; lessonId: string; title: string; moduleTitle: string } | null = null;
  if (progress.lastLesson) {
    for (const m of modules) {
      const l = m.lessons.find((x) => x.id === progress.lastLesson);
      if (l) {
        last = { moduleId: m.id, lessonId: l.id, title: l.title, moduleTitle: m.title };
        break;
      }
    }
  }
  // Leçon de départ si aucune leçon vue
  const first = modules[0]?.lessons[0];
  const continueTarget =
    last !== null
      ? `/app/lecon/${last.moduleId}/${last.lessonId}`
      : first
        ? `/app/lecon/${modules[0].id}/${first.id}`
        : '/app/programme';

  const completedModules = mods.filter((m) => m.done).length;
  const unlockedCount = progress.badges.length;
  const nextBadge = BADGES.find((b) => !progress.badges.includes(b.id));

  return (
    <div className="container" style={{ paddingTop: 34 }}>
      {/* ---------- En-tête ---------- */}
      <div className="dash-head">
        <div>
          <span className="hello">
            {new Date().getHours() < 18 ? 'Bonjour' : 'Bonsoir'},{' '}
            <strong style={{ color: 'var(--text)' }}>{user ? user.name : 'Invité'} 👋</strong>
          </span>
          <h1>Prêt·e à progresser aujourd’hui ?</h1>
        </div>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center' }}>
          <span className="level-pill">⭐ {level}</span>
          <span className="streak">🔥 {progress.streak.current} jour{progress.streak.current > 1 ? 's' : ''} de série</span>
          <span className="xp-chip">⚡ {progress.xp} XP</span>
        </div>
      </div>

      {/* ---------- Statistiques ---------- */}
      <div className="grid-4" style={{ marginBottom: 22 }}>
        <div className="card stat-card">
          <div className="stat-icon">📚</div>
          <div>
            <strong>
              {stats.completedLessons}
              <span className="muted" style={{ fontSize: '0.9rem' }}> / {stats.totalLessons}</span>
            </strong>
            <span>leçons terminées</span>
          </div>
        </div>
        <div className="card stat-card">
          <div className="stat-icon green">✅</div>
          <div>
            <strong>{stats.correctExercises}</strong>
            <span>exercices réussis</span>
          </div>
        </div>
        <div className="card stat-card">
          <div className="stat-icon violet">🏗️</div>
          <div>
            <strong>
              {stats.completedProjects}
              <span className="muted" style={{ fontSize: '0.9rem' }}> / {stats.totalProjects}</span>
            </strong>
            <span>projets réalisés</span>
          </div>
        </div>
        <div className="card stat-card">
          <div className="stat-icon amber">🎓</div>
          <div>
            <strong style={{ fontSize: '1.1rem' }}>{level}</strong>
            <span>niveau actuel · {next.next ? `${next.remaining} XP avant ${next.next}` : 'niveau max'}</span>
          </div>
        </div>
      </div>

      {/* ---------- Progression globale + reprise ---------- */}
      <div className="card" style={{ marginBottom: 22 }}>
        <div className="panel-title">
          <h2>📊 Votre progression globale</h2>
          <span className="tag">{stats.percent} % du parcours</span>
        </div>
        <div className="progress progress-lg">
          <span style={{ width: `${stats.percent}%` }} />
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            gap: 18,
            flexWrap: 'wrap',
            marginTop: 20,
            alignItems: 'center',
          }}
        >
          <div style={{ minWidth: 260, flex: 1 }}>
            <p className="muted small mb-0">
              {last ? (
                <>
                  Dernière leçon consultée : <strong style={{ color: 'var(--text)' }}>{last.title}</strong>
                  <span className="muted"> · {last.moduleTitle}</span>
                </>
              ) : (
                'Aucune leçon consultée pour le moment — lancez-vous !'
              )}
            </p>
            <div className="progress-row" style={{ marginTop: 14, marginBottom: 6 }}>
              <span>Niveau {level} → {next.next ?? 'Expert'}</span>
              <strong>{next.percent} %</strong>
            </div>
            <div className="progress">
              <span style={{ width: `${next.percent}%` }} />
            </div>
          </div>
          <Link to={continueTarget} className="btn btn-primary btn-lg">
            ▶ Continuer mon apprentissage
          </Link>
        </div>
      </div>

      {/* ---------- Modules + objectifs ---------- */}
      <div className="grid-2" style={{ gridTemplateColumns: '1.4fr 1fr', alignItems: 'start' }}>
        <div className="card">
          <div className="panel-title">
            <h3>📚 Vos modules</h3>
            <Link to="/app/programme" className="small">
              Tout le programme →
            </Link>
          </div>
          <div className="row-list">
            {mods.slice(0, 8).map(({ module, completed, total, percent, done }) => (
              <Link to={`/app/module/${module.id}`} key={module.id} className="row-item" style={{ textDecoration: 'none' }}>
                <span className="row-status">{done ? '✅' : module.icon}</span>
                <div className="grow">
                  <h4>
                    {module.number}. {module.title}
                  </h4>
                  <div className="progress-row" style={{ margin: '6px 0 5px' }}>
                    <span>
                      {completed}/{total} leçons
                    </span>
                    <strong>{percent} %</strong>
                  </div>
                  <div className="progress" style={{ height: 7 }}>
                    <span style={{ width: `${percent}%` }} />
                  </div>
                </div>
              </Link>
            ))}
            {mods.length === 0 && (
              <div className="empty-state">
                <div className="icon">⏳</div>
                Le contenu est en cours de chargement…
              </div>
            )}
          </div>
        </div>

        <div style={{ display: 'grid', gap: 16 }}>
          {/* Objectifs */}
          <div className="card">
            <div className="panel-title">
              <h3>🎯 Objectifs</h3>
            </div>
            <div className="objective">
              <span className="icon">⚡</span>
              <div style={{ flex: 1 }}>
                <strong style={{ color: 'var(--text)' }}>Objectif quotidien : {XP.dailyGoal} XP</strong>
                <div className="progress-row" style={{ margin: '7px 0 5px' }}>
                  <span>{dailyXp} XP obtenus aujourd’hui</span>
                  <strong>{dailyPercent} %</strong>
                </div>
                <div className="progress" style={{ height: 8 }}>
                  <span style={{ width: `${dailyPercent}%` }} />
                </div>
              </div>
            </div>
            <div className="objective">
              <span className="icon">🔥</span>
              <div>
                <strong style={{ color: 'var(--text)' }}>Série d’apprentissage</strong>
                <p className="small muted mb-0">
                  {progress.streak.current > 0
                    ? `${progress.streak.current} jour(s) consécutifs · record : ${progress.streak.best}`
                    : 'Revenez aujourd’hui pour lancer une série !'}
                </p>
              </div>
            </div>
            <div className="objective">
              <span className="icon">🏅</span>
              <div>
                <strong style={{ color: 'var(--text)' }}>
                  {completedModules} module(s) terminé(s) sur {mods.length}
                </strong>
                <p className="small muted mb-0">
                  {nextBadge ? `Prochain badge : ${nextBadge.icon} ${nextBadge.name}` : 'Tous les badges débloqués !'}
                </p>
              </div>
            </div>
          </div>

          {/* Badges */}
          <div className="card">
            <div className="panel-title">
              <h3>🏆 Badges</h3>
              <span className="tag amber">
                {unlockedCount}/{BADGES.length}
              </span>
            </div>
            <div className="badges-grid">
              {BADGES.map((b) => {
                const unlocked = progress.badges.includes(b.id);
                return (
                  <div
                    key={b.id}
                    className={`badge-cell ${unlocked ? 'unlocked' : ''}`}
                    title={`${b.name} — ${b.description}`}
                  >
                    <div className="b-icon">{b.icon}</div>
                    <div className="b-name">{b.name}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
