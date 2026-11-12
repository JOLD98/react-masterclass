import { Link, Navigate, useParams } from 'react-router-dom';
import { useContent } from '../context/ContentContext';
import { useProgress } from '../context/ProgressContext';

export function ModulePage() {
  const { moduleId } = useParams();
  const { modules } = useContent();
  const { progress } = useProgress();

  const index = modules.findIndex((m) => m.id === moduleId);
  if (index === -1) return <Navigate to="/app/programme" replace />;
  const module = modules[index];
  const prev = modules[index - 1];
  const next = modules[index + 1];

  const completed = module.lessons.filter((l) => progress.completedLessons.includes(l.id)).length;
  const percent = module.lessons.length ? Math.round((completed / module.lessons.length) * 100) : 0;
  const totalMinutes = module.lessons.reduce((s, l) => s + l.minutes, 0);

  return (
    <div className="container" style={{ paddingTop: 34 }}>
      <div className="breadcrumb">
        <Link to="/app/programme">Programme</Link>
        <span>/</span>
        <span>Module {String(module.number).padStart(2, '0')}</span>
      </div>

      <div className="card" style={{ marginBottom: 26 }}>
        <div style={{ display: 'flex', gap: 20, alignItems: 'center', flexWrap: 'wrap' }}>
          <div className="feature-icon" style={{ margin: 0, width: 64, height: 64, fontSize: '2rem' }}>
            {module.icon}
          </div>
          <div style={{ flex: 1, minWidth: 260 }}>
            <span className="module-num">Module {String(module.number).padStart(2, '0')}</span>
            <h1 style={{ fontSize: '1.7rem', margin: '4px 0 6px' }}>{module.title}</h1>
            <p className="muted mb-0">{module.description}</p>
          </div>
          <div style={{ minWidth: 220 }}>
            <div className="progress-row">
              <span>
                {completed}/{module.lessons.length} leçons · {totalMinutes} min
              </span>
              <strong>{percent} %</strong>
            </div>
            <div className="progress progress-lg">
              <span style={{ width: `${percent}%` }} />
            </div>
            <div style={{ marginTop: 10, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              <span className="tag">{module.level}</span>
              <span className="tag violet">{module.lessons.length} leçons</span>
            </div>
          </div>
        </div>
      </div>

      <div className="row-list">
        {module.lessons.map((lesson, i) => {
          const isDone = progress.completedLessons.includes(lesson.id);
          const isCurrent = progress.lastLesson === lesson.id;
          const exDone = lesson.exercises.filter((e) => progress.exercises[e.id]?.correct).length;
          return (
            <Link
              to={`/app/lecon/${module.id}/${lesson.id}`}
              key={lesson.id}
              className={`lesson-row ${isDone ? 'done' : ''} ${isCurrent ? 'current' : ''}`}
              style={{ border: '1px solid var(--border)', borderRadius: 10, textDecoration: 'none', marginBottom: 10 }}
            >
              <span className="idx">{isDone ? '✓' : i + 1}</span>
              <div className="grow">
                <div className="l-title">{lesson.title}</div>
                <div className="l-meta">
                  ⏱ {lesson.minutes} min · {lesson.exercises.length} exercices
                  {lesson.exercises.length > 0 && ` · ${exDone}/${lesson.exercises.length} réussis`}
                </div>
              </div>
              <span className={`tag ${isDone ? 'green' : 'gray'}`}>{isDone ? 'Terminée' : 'Commencer →'}</span>
            </Link>
          );
        })}
      </div>

      <div className="lesson-footer-nav">
        {prev ? (
          <Link to={`/app/module/${prev.id}`} className="btn btn-outline">
            ← Module {prev.number} : {prev.title}
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link to={`/app/module/${next.id}`} className="btn btn-primary">
            Module {next.number} : {next.title} →
          </Link>
        ) : (
          <Link to="/app/projets" className="btn btn-primary">
            Passer aux projets →
          </Link>
        )}
      </div>
    </div>
  );
}
