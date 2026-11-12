import { Link } from 'react-router-dom';
import { useContent } from '../context/ContentContext';
import { useProgress } from '../context/ProgressContext';
import { weakestModules } from '../lib/stats';

export function Review() {
  const { modules } = useContent();
  const { progress } = useProgress();

  // Index des exercices pour retrouver l'énoncé
  const exIndex = new Map<string, { question: string; lessonId: string; moduleId: string; lessonTitle: string; type: string }>();
  for (const m of modules) {
    for (const l of m.lessons) {
      for (const e of l.exercises) {
        exIndex.set(e.id, {
          question: e.question,
          lessonId: l.id,
          moduleId: m.id,
          lessonTitle: l.title,
          type: e.type,
        });
      }
    }
  }

  // Erreurs en cours (une par exercice, la plus récente)
  const mistakes = progress.mistakes
    .map((m) => ({ ...m, info: exIndex.get(m.exerciseId) }))
    .filter((m) => m.info)
    .slice(0, 30);

  // Leçons terminées dont tous les exercices ne sont pas réussis
  const incomplete = modules.flatMap((m) =>
    m.lessons
      .filter((l) => {
        if (!progress.completedLessons.includes(l.id)) return false;
        if (l.exercises.length === 0) return false;
        return l.exercises.some((e) => !progress.exercises[e.id]?.correct);
      })
      .map((l) => ({
        lesson: l,
        module: m,
        done: l.exercises.filter((e) => progress.exercises[e.id]?.correct).length,
      })),
  );

  const weak = weakestModules(modules, progress);
  const completed = modules.flatMap((m) =>
    m.lessons
      .filter((l) => progress.completedLessons.includes(l.id))
      .map((l) => ({ lesson: l, module: m })),
  );

  const results = Object.values(progress.exercises);
  const rate = results.length
    ? Math.round((results.filter((r) => r.correct).length / results.length) * 100)
    : 0;

  return (
    <div className="container" style={{ paddingTop: 34 }}>
      <div className="dash-head">
        <div>
          <span className="hello">Ancrer les acquis</span>
          <h1>Espace révisions</h1>
        </div>
        <span className={`tag ${rate >= 80 ? 'green' : rate >= 50 ? 'amber' : 'red'}`}>
          Taux de réussite global : {rate} %
        </span>
      </div>

      {/* ---------- Erreurs à réviser ---------- */}
      <div className="card" style={{ marginBottom: 22 }}>
        <div className="panel-title">
          <h2 style={{ fontSize: '1.15rem' }}>❌ Vos erreurs à réviser ({mistakes.length})</h2>
        </div>
        {mistakes.length === 0 ? (
          <div className="empty-state">
            <div className="icon">🌟</div>
            Aucune erreur enregistrée — continuez ainsi !
          </div>
        ) : (
          <div className="row-list">
            {mistakes.map((m) => (
              <div key={m.exerciseId} className="row-item mistake-item">
                <div className="grow">
                  <h4>{m.info!.question.slice(0, 110)}</h4>
                  <p>
                    {m.info!.lessonTitle} · {m.info!.type}
                  </p>
                </div>
                <Link
                  to={`/app/lecon/${m.info!.moduleId}/${m.info!.lessonId}#ex-${m.exerciseId}`}
                  className="btn btn-outline btn-sm"
                >
                  ↺ Refaire
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ---------- Leçons à consolider ---------- */}
      <div className="grid-2" style={{ alignItems: 'start' }}>
        <div className="card">
          <div className="panel-title">
            <h2 style={{ fontSize: '1.15rem' }}>📚 Leçons à consolider ({incomplete.length})</h2>
          </div>
          {incomplete.length === 0 ? (
            <div className="empty-state">
              <div className="icon">✅</div>
              Toutes vos leçons terminées ont leurs exercices réussis !
            </div>
          ) : (
            <div className="row-list">
              {incomplete.slice(0, 12).map(({ lesson, module, done }) => (
                <Link
                  key={lesson.id}
                  to={`/app/lecon/${module.id}/${lesson.id}`}
                  className="row-item"
                  style={{ textDecoration: 'none' }}
                >
                  <span className="row-status">📖</span>
                  <div className="grow">
                    <h4>{lesson.title}</h4>
                    <p>
                      {module.title} · {done}/{lesson.exercises.length} exercices réussis
                    </p>
                  </div>
                  <span className="tag amber">Revoir</span>
                </Link>
              ))}
            </div>
          )}
        </div>

        <div className="card">
          <div className="panel-title">
            <h2 style={{ fontSize: '1.15rem' }}>📉 Notions à renforcer</h2>
          </div>
          {weak.length === 0 ? (
            <div className="empty-state">
              <div className="icon">📊</div>
              Répondez à quelques exercices pour obtenir votre analyse par module.
            </div>
          ) : (
            <div style={{ display: 'grid', gap: 14 }}>
              {weak.slice(0, 8).map(({ module, rate: r }) => (
                <div className="bar-row" key={module.id}>
                  <span title={module.title}>
                    {module.icon} {module.title.slice(0, 22)}
                    {module.title.length > 22 ? '…' : ''}
                  </span>
                  <span className="bar">
                    <i className={r < 60 ? 'low' : ''} style={{ width: `${r}%` }} />
                  </span>
                  <span className="val">{r} %</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ---------- Leçons terminées ---------- */}
      <div className="card" style={{ marginTop: 22 }}>
        <div className="panel-title">
          <h2 style={{ fontSize: '1.15rem' }}>✅ Revoir mes leçons terminées ({completed.length})</h2>
        </div>
        {completed.length === 0 ? (
          <div className="empty-state">
            <div className="icon">🌱</div>
            Terminez votre première leçon pour la retrouver ici.
            <div className="mt-3">
              <Link to="/app/programme" className="btn btn-primary btn-sm">
                Ouvrir le programme
              </Link>
            </div>
          </div>
        ) : (
          <div className="chips">
            {completed.map(({ lesson, module }) => (
              <Link
                key={lesson.id}
                to={`/app/lecon/${module.id}/${lesson.id}`}
                className="chip"
                style={{ fontSize: '0.82rem', padding: '6px 13px' }}
              >
                ✓ {lesson.title}
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
