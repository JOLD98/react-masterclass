import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useContent } from '../context/ContentContext';
import { useProgress } from '../context/ProgressContext';
import { moduleProgress } from '../lib/stats';

export function Programme() {
  const { modules } = useContent();
  const { progress } = useProgress();
  const mods = moduleProgress(modules, progress);
  const [open, setOpen] = useState<string | null>(modules[0]?.id ?? null);

  const totalLessons = mods.reduce((s, m) => s + m.total, 0);
  const doneLessons = mods.reduce((s, m) => s + m.completed, 0);
  const percent = totalLessons ? Math.round((doneLessons / totalLessons) * 100) : 0;

  return (
    <div className="container" style={{ paddingTop: 34 }}>
      <div className="dash-head">
        <div>
          <span className="hello">Le parcours complet</span>
          <h1>Programme de formation</h1>
        </div>
        <div style={{ minWidth: 280 }}>
          <div className="progress-row">
            <span>
              {doneLessons}/{totalLessons} leçons
            </span>
            <strong>{percent} %</strong>
          </div>
          <div className="progress progress-lg">
            <span style={{ width: `${percent}%` }} />
          </div>
        </div>
      </div>

      {mods.length === 0 && (
        <div className="empty-state">
          <div className="icon">⏳</div>
          Chargement du contenu pédagogique…
        </div>
      )}

      {mods.map(({ module, completed, total, percent: p, done }) => {
        const isOpen = open === module.id;
        return (
          <div className="module-block" key={module.id}>
            <div
              className="module-block-head"
              onClick={() => setOpen(isOpen ? null : module.id)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') setOpen(isOpen ? null : module.id);
              }}
            >
              <span className={`chevron ${isOpen ? 'open' : ''}`}>▶</span>
              <span className="m-icon">{module.icon}</span>
              <div className="grow">
                <h3>
                  Module {String(module.number).padStart(2, '0')} — {module.title}
                </h3>
                <p>{module.description}</p>
              </div>
              <div style={{ minWidth: 170 }}>
                <div className="progress-row">
                  <span>
                    {completed}/{total} leçons
                  </span>
                  <strong>{p} %</strong>
                </div>
                <div className="progress" style={{ height: 8 }}>
                  <span style={{ width: `${p}%` }} />
                </div>
              </div>
              <span className={`tag ${done ? 'green' : ''}`}>{done ? '✓ Terminé' : module.level}</span>
            </div>

            {isOpen && (
              <div>
                {module.lessons.map((lesson, i) => {
                  const isDone = progress.completedLessons.includes(lesson.id);
                  const isCurrent = progress.lastLesson === lesson.id;
                  const exDone = lesson.exercises.filter((e) => progress.exercises[e.id]?.correct).length;
                  return (
                    <Link
                      to={`/app/lecon/${module.id}/${lesson.id}`}
                      key={lesson.id}
                      className={`lesson-row ${isDone ? 'done' : ''} ${isCurrent ? 'current' : ''}`}
                      style={{ textDecoration: 'none' }}
                    >
                      <span className="idx">{isDone ? '✓' : i + 1}</span>
                      <div className="grow">
                        <div className="l-title">{lesson.title}</div>
                        <div className="l-meta">
                          ⏱ {lesson.minutes} min · {lesson.exercises.length} exercices
                          {lesson.exercises.length > 0 && ` · ${exDone}/${lesson.exercises.length} réussis`}
                          {isCurrent && ' · ▶ en cours'}
                        </div>
                      </div>
                      <span className={`tag ${isDone ? 'green' : 'gray'}`}>{isDone ? 'Terminée' : 'À faire'}</span>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
