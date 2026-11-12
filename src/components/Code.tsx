import type { ReactNode } from 'react';

/**
 * Coloration syntaxique légère (JS / JSX) pour l'affichage des exemples.
 * Les blocs éditables utilisent CodeMirror ; ce composant sert à l'affichage
 * en lecture seule dans les leçons et la page d'accueil.
 */

const KEYWORDS =
  'function|const|let|var|return|if|else|import|from|export|default|new|class|extends|async|await|try|catch|finally|throw|for|while|do|switch|case|break|continue|typeof|instanceof|null|undefined|true|false|this|super|yield|void|delete';

const TOKEN_RE = new RegExp(
  [
    '(\\/\\/[^\\n]*|\\/\\*[\\s\\S]*?\\*\\/)', // 1 comment
    '("(?:[^"\\\\]|\\\\.)*"|\'(?:[^\'\\\\]|\\\\.)*\'|`(?:[^`\\\\]|\\\\.)*`)', // 2 chaînes
    `\\b(${KEYWORDS})\\b`, // 3 mots-clés
    '\\b(\\d+(?:\\.\\d+)?)\\b', // 4 nombres
    '([A-Za-z_$][\\w$]*)(?=\\s*\\()', // 5 appels de fonction
    '(<\\/?[A-Za-z][\\w.]*|\\/?>)', // 6 balises JSX
  ].join('|'),
  'g',
);

export function highlight(code: string): ReactNode[] {
  const out: ReactNode[] = [];
  let last = 0;
  let m: RegExpExecArray | null;
  TOKEN_RE.lastIndex = 0;
  let key = 0;

  while ((m = TOKEN_RE.exec(code)) !== null) {
    if (m.index > last) out.push(code.slice(last, m.index));
    const cls = m[1] ? 'c' : m[2] ? 's' : m[3] ? 'k' : m[4] ? 't' : m[5] ? 'f' : 't';
    out.push(
      <span className={cls} key={key++}>
        {m[0]}
      </span>,
    );
    last = m.index + m[0].length;
  }
  if (last < code.length) out.push(code.slice(last));
  return out;
}

export function Code({
  code,
  caption,
  className = '',
}: {
  code: string;
  caption?: string;
  className?: string;
}) {
  return (
    <div className={`code-block ${className}`}>
      {(caption || true) && (
        <div className="code-block-head">
          <span>{caption ?? 'jsx'}</span>
          <span>React</span>
        </div>
      )}
      <pre>
        <code>{highlight(code)}</code>
      </pre>
    </div>
  );
}
