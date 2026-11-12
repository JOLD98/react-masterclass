import { useMemo, useRef, useState } from 'react';
import type { Exercise, ExerciseDifficulty } from '../types';
import { useProgress } from '../context/ProgressContext';
import { normalizeAnswer, normalizeOutput } from '../lib/storage';
import { CodePlayground, type RunLog } from './CodePlayground';
import { Code } from './Code';

const DIFF_TAG: Record<ExerciseDifficulty, string> = {
  facile: 'green',
  intermédiaire: 'amber',
  avancé: 'red',
};

interface Props {
  exercise: Exercise;
  lessonId: string;
  index: number;
}

export function ExerciseCard({ exercise, lessonId, index }: Props) {
  const { progress, recordExercise } = useProgress();
  const stored = progress.exercises[exercise.id];

  const [selected, setSelected] = useState<number[]>([]);
  const [text, setText] = useState('');
  const [code, setCode] = useState(exercise.template ?? '');
  const [feedback, setFeedback] = useState<{ ok: boolean; message: string } | null>(null);
  const [showSolution, setShowSolution] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const logsRef = useRef<RunLog[]>([]);

  const multiple = Array.isArray(exercise.answer);
  const isCode = exercise.type === 'code' || exercise.type === 'debug' || exercise.type === 'visual';

  const attempts = stored?.attempts ?? 0;
  const previouslyCorrect = stored?.correct ?? false;

  const qcmOptions = useMemo(() => exercise.options ?? [], [exercise.options]);

  const validate = () => {
    let ok = false;
    let message = '';

    if (exercise.type === 'qcm') {
      const answer = Array.isArray(exercise.answer) ? exercise.answer : [exercise.answer ?? -1];
      const sortedSel = [...selected].sort().join(',');
      const sortedAns = [...answer].sort().join(',');
      ok = selected.length > 0 && sortedSel === sortedAns;
      message = ok
        ? 'Bonne réponse !'
        : selected.length === 0
          ? 'Sélectionnez une réponse avant de valider.'
          : 'Ce n’est pas la bonne réponse. Relisez l’énoncé et l’explication ci-dessous.';
    } else if (exercise.type === 'short' || exercise.type === 'fill') {
      const accepted = (exercise.accepted ?? []).map(normalizeAnswer);
      const given = normalizeAnswer(text);
      ok = given.length > 0 && accepted.includes(given);
      message = ok
        ? 'Exact !'
        : given.length === 0
          ? 'Saisissez votre réponse avant de valider.'
          : 'Votre réponse n’est pas celle attendue. Voyez l’explication ci-dessous.';
    } else {
      // code / debug / visual : vérification automatique
      const logs = logsRef.current;
      const output = normalizeOutput(logs.filter((l) => l.level !== 'warn').map((l) => l.text).join('\n'));
      const hasErrors = logs.some((l) => l.level === 'error');
      const containsOk =
        !exercise.mustContain || exercise.mustContain.every((f) => code.toLowerCase().includes(f.toLowerCase()));
      const expected = exercise.expectedOutput ? normalizeOutput(exercise.expectedOutput).split('\n').filter(Boolean) : [];
      const outputOk = expected.length === 0 || expected.every((line) => output.includes(line));

      if (hasErrors) {
        ok = false;
        message = 'Votre code affiche une erreur dans la console. Corrigez-la avant de valider.';
      } else if (!containsOk) {
        ok = false;
        message = 'Votre code ne contient pas encore tous les éléments attendus. Consultez l’indice si besoin.';
      } else if (expected.length > 0 && !outputOk) {
        ok = false;
        message = 'Le code s’exécute mais la sortie ne correspond pas à ce qui est attendu.';
      } else if (!exercise.mustContain && expected.length === 0) {
        // Aucun critère automatique : validation manuelle
        ok = true;
        message = 'Votre code s’exécute sans erreur. Relisez la consigne, puis confirmez.';
      } else {
        ok = true;
        message = 'Votre code correspond à la correction attendue !';
      }
    }

    recordExercise(lessonId, exercise.id, ok, text || (isCode ? code : undefined));
    setFeedback({ ok, message });
  };

  const reset = () => {
    setCode(exercise.template ?? '');
    setFeedback(null);
    setShowSolution(false);
    logsRef.current = [];
  };

  return (
    <article className="card exercise-card" id={`ex-${exercise.id}`}>
      <div className="exercise-head">
        <span className="ex-num">Exercice {index}</span>
        <span className={`tag ${DIFF_TAG[exercise.difficulty]}`}>{exercise.difficulty}</span>
        <span className="tag gray">
          {exercise.type === 'qcm'
            ? 'QCM'
            : exercise.type === 'short'
              ? 'Réponse courte'
              : exercise.type === 'fill'
                ? 'Compléter'
                : exercise.type === 'debug'
                  ? 'Corriger le code'
                  : exercise.type === 'visual'
                    ? 'Reproduire le rendu'
                    : 'Écrire du code'}
        </span>
        <span className="grow" />
        {previouslyCorrect && <span className="tag green">✓ Réussi</span>}
        {attempts > 0 && <span className="tag gray">{attempts} tentative{attempts > 1 ? 's' : ''}</span>}
      </div>

      <div className="exercise-body">
        <p className="exercise-question">{exercise.question}</p>

        {/* ---------- QCM ---------- */}
        {exercise.type === 'qcm' && (
          <div>
            {qcmOptions.map((opt, i) => {
              const answer = Array.isArray(exercise.answer) ? exercise.answer : [exercise.answer ?? -1];
              const isSelected = selected.includes(i);
              const show = feedback !== null;
              const cls = show
                ? answer.includes(i)
                  ? 'option correct'
                  : isSelected
                    ? 'option wrong'
                    : 'option'
                : isSelected
                  ? 'option selected'
                  : 'option';
              return (
                <label key={i} className={cls}>
                  <input
                    type={multiple ? 'checkbox' : 'radio'}
                    name={`ex-${exercise.id}`}
                    checked={isSelected}
                    onChange={() => {
                      setSelected((prev) =>
                        multiple
                          ? prev.includes(i)
                            ? prev.filter((x) => x !== i)
                            : [...prev, i]
                          : [i],
                      );
                      setFeedback(null);
                    }}
                  />
                  <span>{opt}</span>
                </label>
              );
            })}
          </div>
        )}

        {/* ---------- Réponse courte / compléter ---------- */}
        {(exercise.type === 'short' || exercise.type === 'fill') && (
          <input
            className="input"
            value={text}
            onChange={(e) => {
              setText(e.target.value);
              setFeedback(null);
            }}
            placeholder="Votre réponse…"
            onKeyDown={(e) => {
              if (e.key === 'Enter') validate();
            }}
          />
        )}

        {/* ---------- Code ---------- */}
        {isCode && (
          <>
            <CodePlayground
              code={code}
              onChange={(v) => {
                setCode(v);
                setFeedback(null);
              }}
              language={exercise.language ?? 'jsx'}
              fileName={exercise.type === 'debug' ? 'Bug.jsx' : 'Exercice.jsx'}
              onReset={reset}
              onLogs={(l) => {
                logsRef.current = l;
              }}
            />
            <div className="exercise-actions">
              <button className="btn btn-primary btn-sm" onClick={validate}>
                ✓ Vérifier ma réponse
              </button>
              {exercise.hint && (
                <button className="btn btn-outline btn-sm" onClick={() => setShowHint((v) => !v)}>
                  💡 {showHint ? 'Masquer l’indice' : 'Indice'}
                </button>
              )}
              <button className="btn btn-ghost btn-sm" onClick={() => setShowSolution((v) => !v)}>
                👁 {showSolution ? 'Masquer la solution' : 'Voir la solution'}
              </button>
            </div>
            {showHint && exercise.hint && (
              <div className="feedback ok" style={{ marginTop: 12 }}>
                <span className="fb-title ok">Indice</span>
                {exercise.hint}
              </div>
            )}
            {showSolution && exercise.solution && (
              <div style={{ marginTop: 14 }}>
                <p className="small muted">Correction détaillée :</p>
                <Code code={exercise.solution} caption="solution.jsx" />
              </div>
            )}
          </>
        )}

        {/* ---------- Validation (non-code) ---------- */}
        {!isCode && (
          <div className="exercise-actions">
            <button className="btn btn-primary btn-sm" onClick={validate}>
              ✓ Valider ma réponse
            </button>
            {exercise.hint && (
              <button className="btn btn-outline btn-sm" onClick={() => setShowHint((v) => !v)}>
                💡 {showHint ? 'Masquer l’indice' : 'Indice'}
              </button>
            )}
            {(exercise.type === 'qcm' || exercise.type === 'short' || exercise.type === 'fill') && (
              <button className="btn btn-ghost btn-sm" onClick={() => setShowSolution((v) => !v)}>
                👁 {showSolution ? 'Masquer la correction' : 'Voir la correction'}
              </button>
            )}
          </div>
        )}

        {!isCode && showHint && exercise.hint && (
          <div className="feedback ok" style={{ marginTop: 12 }}>
            <span className="fb-title ok">Indice</span>
            {exercise.hint}
          </div>
        )}
        {!isCode && showSolution && (
          <div style={{ marginTop: 14 }}>
            <p className="small muted">Correction :</p>
            <div className="feedback ok" style={{ marginTop: 0 }}>
              {exercise.type === 'qcm' &&
                (Array.isArray(exercise.answer)
                  ? exercise.answer.map((i) => qcmOptions[i]).join(' · ')
                  : qcmOptions[exercise.answer ?? 0])}
              {(exercise.type === 'short' || exercise.type === 'fill') && (exercise.accepted ?? []).join(' / ')}
            </div>
          </div>
        )}

        {/* ---------- Feedback ---------- */}
        {feedback && (
          <div className={`feedback ${feedback.ok ? 'ok' : 'ko'}`}>
            <span className={`fb-title ${feedback.ok ? 'ok' : 'ko'}`}>
              {feedback.ok ? '✅ Correct ! +10 XP' : '❌ Pas encore'}
            </span>
            {feedback.message}
            <div style={{ marginTop: 10 }}>
              <strong style={{ fontSize: '0.88rem' }}>Pourquoi :</strong>
              <div style={{ fontSize: '0.9rem', marginTop: 4 }}>{exercise.explanation}</div>
            </div>
          </div>
        )}
        {!feedback && exercise.explanation && attempts > 0 && (
          <p className="attempts">
            Dernière tentative : {stored?.correct ? 'réussie' : 'à revoir'} · reprenez autant de fois que nécessaire.
          </p>
        )}
      </div>
    </article>
  );
}
