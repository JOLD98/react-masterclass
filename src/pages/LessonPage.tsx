import { useEffect } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { useContent } from '../context/ContentContext';
import { useProgress } from '../context/ProgressContext';
import { findLesson, neighborLessons } from '../lib/stats';
import { Blocks, lessonToc } from '../components/Blocks';
import { ExerciseCard } from '../components/ExerciseCard';

export function LessonPage() {
  const { moduleId, lessonId } = useParams();
  const { modules } = useContent();
  const { progress, completeLesson, touchLesson } = useProgress();

  const found = findLesson(modules, moduleId ?? '', lessonId ?? '');

  // Mémorise la dernière leçon consultée
  useEffect(() => {
    if (found) touchLesson(found.lesson.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [found?.lesson.id]);

  if (!found) return <Navigate to="/app/programme" replace />;
  const { module, lesson, index } = found;
  const isDone = progress.completedLessons.includes(lesson.id);
  const { prev, next } = neighborLessons(modules, module.id, lesson.id);

  const toc = lessonToc(lesson.blocks);
  const exDone = lesson.exercises.filter((e) => progress.exercises[e.id]?.correct).length;

  return (
    <div className="container" style={{ paddingTop: 30 }}>
      <div className="lesson-layout">
        {/* ============ CONTENU ============ */}
        <div>
          <div className="breadcrumb">
            <Link to="/app/programme">Programme</Link>
            <span>/</span>
            <Link to={`/app/module/${module.id}`}>
              Module {module.number} : {module.title}
            </Link>
            <span>/</span>
            <span>Leçon {index + 1}</span>
          </div>

          <header className="lesson-head">
            <div className="lesson-meta">
              <span className="tag">{module.icon} {module.title}</span>
              <span className="tag gray">⏱ {lesson.minutes} min</span>
              <span className={`tag ${isDone ? 'green' : ''}`}>{isDone ? '✓ Terminée' : 'En cours'}</span>
              {lesson.exercises.length > 0 && (
                <span className="tag violet">
                  {exDone}/{lesson.exercises.length} exercices réussis
                </span>
              )}
            </div>
            <h1>{lesson.title}</h1>

            {lesson.objectives && lesson.objectives.length > 0 && (
              <div className="objectives">
                <h4>Objectifs de la leçon</h4>
                <ul>
                  {lesson.objectives.map((o, i) => (
                    <li key={i}>{o}</li>
                  ))}
                </ul>
              </div>
            )}
          </header>

          <Blocks blocks={lesson.blocks} />

          {/* ============ EXERCICES ============ */}
          {lesson.exercises.length > 0 && (
            <section style={{ marginTop: 46 }}>
              <div className="panel-title">
                <h2 style={{ fontSize: '1.4rem' }}>🏋️ Exercices pratiques</h2>
                <span className="tag">
                  {exDone}/{lesson.exercises.length} réussis
                </span>
              </div>
              <p className="muted">
                Appliquez tout de suite ce que vous venez d’apprendre. Les réponses sont vérifiées
                automatiquement et chaque correction vous explique le pourquoi du comment.
              </p>
              <div style={{ display: 'grid', gap: 22 }}>
                {lesson.exercises.map((ex, i) => (
                  <ExerciseCard key={ex.id} exercise={ex} lessonId={lesson.id} index={i + 1} />
                ))}
              </div>
            </section>
          )}

          {/* ============ FIN DE LEÇON ============ */}
          <div className="card" style={{ marginTop: 34, textAlign: 'center' }}>
            {isDone ? (
              <>
                <div style={{ fontSize: '2.4rem' }}>🎉</div>
                <h3>Leçon terminée !</h3>
                <p className="muted">Continuez ainsi — chaque leçon vous rapproche du niveau Expert.</p>
              </>
            ) : (
              <>
                <h3>Vous avez terminé cette leçon ?</h3>
                <p className="muted">Validez-la pour gagner 20 XP et débloquer les badges associés.</p>
                <button className="btn btn-primary btn-lg" onClick={() => completeLesson(lesson.id)}>
                  ✓ Marquer la leçon comme terminée (+20 XP)
                </button>
              </>
            )}
          </div>

          <nav className="lesson-footer-nav">
            {prev ? (
              <Link to={`/app/lecon/${prev.moduleId}/${prev.lessonId}`} className="btn btn-outline">
                ← Leçon précédente
              </Link>
            ) : (
              <Link to={`/app/module/${module.id}`} className="btn btn-outline">
                ← Module
              </Link>
            )}
            {next ? (
              <Link to={`/app/lecon/${next.moduleId}/${next.lessonId}`} className="btn btn-primary">
                Leçon suivante →
              </Link>
            ) : (
              <Link to="/app/projets" className="btn btn-primary">
                Passer aux projets →
              </Link>
            )}
          </nav>
        </div>

        {/* ============ ASIDE ============ */}
        <aside className="lesson-aside">
          <div className="card">
            <div className="panel-title">
              <h3 style={{ fontSize: '1rem' }}>Dans cette leçon</h3>
            </div>
            <nav className="toc">
              {toc.length > 0 ? (
                toc.map((t) => (
                  <a key={t.id} href={`#${t.id}`}>
                    {t.text}
                  </a>
                ))
              ) : (
                <span className="small muted">Lecture continue</span>
              )}
              {lesson.exercises.length > 0 && (
                <a href={`#ex-${lesson.exercises[0].id}`}>🏋️ Exercices ({lesson.exercises.length})</a>
              )}
            </nav>
          </div>

          <div className="card">
            <div className="panel-title">
              <h3 style={{ fontSize: '1rem' }}>Progression du module</h3>
            </div>
            {(() => {
              const total = module.lessons.length;
              const done = module.lessons.filter((l) => progress.completedLessons.includes(l.id)).length;
              const pct = total ? Math.round((done / total) * 100) : 0;
              return (
                <>
                  <div className="progress-row">
                    <span>
                      {done}/{total} leçons
                    </span>
                    <strong>{pct} %</strong>
                  </div>
                  <div className="progress">
                    <span style={{ width: `${pct}%` }} />
                  </div>
                  <Link to={`/app/module/${module.id}`} className="btn btn-outline btn-sm" style={{ marginTop: 14, width: '100%' }}>
                    Voir tout le module
                  </Link>
                </>
              );
            })()}
          </div>

          <div className="card" style={{ background: 'linear-gradient(140deg, rgba(97,218,251,.12), rgba(167,139,250,.08))' }}>
            <p className="small mb-0" style={{ color: '#dbe4f3' }}>
              💡 <strong style={{ color: 'var(--primary)' }}>Astuce :</strong> relisez les « erreurs
              fréquentes » avant les exercices — c’est là que se cachent les points faciles.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
