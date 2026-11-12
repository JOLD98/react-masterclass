import { useCallback, useEffect, useRef, useState } from 'react';
import * as Babel from '@babel/standalone';
import { CodeEditor } from './CodeEditor';

export interface RunLog {
  level: 'log' | 'warn' | 'error';
  text: string;
}

interface Props {
  code: string;
  onChange?: (code: string) => void;
  language?: 'js' | 'jsx' | 'html';
  fileName?: string;
  height?: string;
  readOnly?: boolean;
  /** Exécution automatique (debounce) */
  autoRun?: boolean;
  /** Appelé après chaque exécution avec les logs finaux */
  onLogs?: (logs: RunLog[]) => void;
  /** Boutons Exécuter / Réinitialiser */
  controls?: boolean;
  onReset?: () => void;
  /** N'afficher que l'aperçu (pas d'éditeur) */
  previewOnly?: boolean;
}

let runSeq = 0;

/** Détecte un document HTML complet (exercices des modules bases web) */
function looksHtml(code: string): boolean {
  return /^\s*<!doctype\s+html|^\s*<html[\s>]/i.test(code);
}

/** Construit le document HTML exécuté dans l'iframe isolée */
function buildDoc(code: string, language: 'js' | 'jsx' | 'html', id: string): string {
  // ---------- HTML : rendu direct du document ----------
  if (language === 'html' || looksHtml(code)) {
    const bridge = `<script>(function(){var id=${JSON.stringify(id)};function fmt(v){try{if(typeof v==='string')return v;if(v instanceof Error)return v.message;if(typeof v==='object'&&v!==null)return JSON.stringify(v);return String(v);}catch(e){return String(v);}}function send(level,args){try{parent.postMessage({__rm:true,id:id,level:level,text:Array.prototype.map.call(args,fmt).join(' ')},'*');}catch(e){}}['log','info','warn','error'].forEach(function(level){var o=console[level];console[level]=function(){send(level==='info'?'log':level,arguments);try{o.apply(console,arguments);}catch(e){}};});window.addEventListener('error',function(e){send('error',[e.message]);});})();</script>`;
    let html = code;
    if (/<\/head>/i.test(html)) html = html.replace(/<\/head>/i, `${bridge}</head>`);
    else html = bridge + html;
    return html;
  }

  let js = code;
  let compileError: string | null = null;

  if (language === 'jsx') {
    try {
      const out = Babel.transform(code, {
        presets: [['react', { runtime: 'classic' }]],
        filename: 'exercice.jsx',
        compact: false,
      });
      js = out.code;
    } catch (e) {
      compileError = e instanceof Error ? e.message : String(e);
      js = '';
    }
  }

  const escaped = js.replace(/<\/script/gi, '<\\/script');
  const errorScript = compileError
    ? `<script>parent.postMessage({__rm:true,id:${JSON.stringify(id)},level:"error",text:${JSON.stringify(
        'Erreur de syntaxe : ' + compileError,
      )}},"*");</script>`
    : '';

  return `<!doctype html>
<html lang="fr">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<style>
  html, body { margin: 0; padding: 14px; background: #ffffff; color: #0f172a; }
  body { font-family: 'Inter', system-ui, sans-serif; font-size: 15px; line-height: 1.55; }
  #root:empty::before { content: 'Aucun rendu (le composant ne retourne rien)'; color: #94a3b8; font-style: italic; }
  button { font-family: inherit; }
  .card { border: 1px solid #e2e8f0; border-radius: 10px; padding: 14px; }
</style>
</head>
<body>
<div id="root"></div>
<script>
(function () {
  var id = ${JSON.stringify(id)};
  function fmt(v) {
    try {
      if (typeof v === 'string') return v;
      if (v instanceof Error) return v.message;
      if (typeof v === 'object' && v !== null) return JSON.stringify(v);
      return String(v);
    } catch (e) { return String(v); }
  }
  function send(level, args) {
    try {
      parent.postMessage({ __rm: true, id: id, level: level, text: Array.prototype.map.call(args, fmt).join(' ') }, '*');
    } catch (e) {}
  }
  ['log', 'info', 'warn', 'error'].forEach(function (level) {
    var original = console[level];
    console[level] = function () {
      send(level === 'info' ? 'log' : level, arguments);
      try { original.apply(console, arguments); } catch (e) {}
    };
  });
  window.addEventListener('error', function (e) {
    send('error', [e.message + (e.lineno ? ' (ligne ' + e.lineno + ')' : '')]);
  });
  window.addEventListener('unhandledrejection', function (e) {
    send('error', ['Promesse rejetée : ' + (e.reason && e.reason.message ? e.reason.message : e.reason)]);
  });
})();
</script>
<script src="/vendor/react.js"></script>
<script src="/vendor/react-dom.js"></script>
<script>
try {
${escaped}
} catch (err) {
  parent.postMessage({ __rm: true, id: ${JSON.stringify(id)}, level: 'error', text: String((err && err.message) || err) }, '*');
}
</script>
${errorScript}
</body>
</html>`;
}

/**
 * Espace de code : éditeur + exécution isolée (iframe sandbox)
 * avec aperçu du rendu et console de sortie.
 */
export function CodePlayground({
  code,
  onChange,
  language = 'jsx',
  fileName = 'Exercice.jsx',
  height = '300px',
  readOnly = false,
  autoRun = true,
  onLogs,
  controls = true,
  onReset,
  previewOnly = false,
}: Props) {
  const [logs, setLogs] = useState<RunLog[]>([]);
  const [running, setRunning] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const idRef = useRef(`run_${++runSeq}`);
  const codeRef = useRef(code);
  const logsRef = useRef<RunLog[]>([]);
  const onLogsRef = useRef(onLogs);
  onLogsRef.current = onLogs;
  codeRef.current = code;

  const run = useCallback(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;
    const id = `run_${++runSeq}`;
    idRef.current = id;
    logsRef.current = [];
    setLogs([]);
    setRunning(true);
    const current = codeRef.current;
    const lang = looksHtml(current) ? 'html' : language;
    iframe.srcdoc = buildDoc(current, lang, id);
    // Sécurité : on laisse le temps aux messages d'arriver
    window.setTimeout(() => setRunning(false), 900);
  }, [language]);

  // Réception des messages de l'iframe
  useEffect(() => {
    const handler = (event: MessageEvent) => {
      const data = event.data as { __rm?: boolean; id?: string; level?: RunLog['level']; text?: string };
      if (!data || data.__rm !== true || data.id !== idRef.current) return;
      const entry: RunLog = {
        level: data.level === 'warn' || data.level === 'error' ? data.level : 'log',
        text: String(data.text ?? ''),
      };
      logsRef.current = [...logsRef.current, entry];
      setLogs(logsRef.current);
      onLogsRef.current?.(logsRef.current);
    };
    window.addEventListener('message', handler);
    return () => window.removeEventListener('message', handler);
  }, []);

  // Exécution automatique avec debounce
  useEffect(() => {
    if (!autoRun || previewOnly) return;
    const t = window.setTimeout(run, 800);
    return () => window.clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [code, language, autoRun, previewOnly]);

  return (
    <div className="editor-shell">
      <div className="editor-toolbar">
        <span className="file">⌨ {fileName}</span>
        {controls && (
          <>
            <button type="button" className="btn editor-run" onClick={run}>
              ▶ Exécuter
            </button>
            {onReset && (
              <button type="button" className="btn btn-ghost" onClick={onReset}>
                ↺ Réinitialiser
              </button>
            )}
          </>
        )}
        {running && <span className="small muted">exécution…</span>}
      </div>

      <div className={`editor-panes ${previewOnly ? 'single' : ''}`}>
        {!previewOnly && (
          <div className="editor-pane">
            <div className="pane-label">Votre code</div>
            <div className="pane-body">
              <CodeEditor
                value={code}
                onChange={onChange}
                language={looksHtml(code) ? 'html' : language}
                height={height}
                readOnly={readOnly}
              />
            </div>
          </div>
        )}
        <div className="editor-pane">
          <div className="pane-label">Aperçu</div>
          <div className="pane-body" style={{ display: 'flex', flexDirection: 'column' }}>
            <iframe
              ref={iframeRef}
              title="Aperçu du code exécuté"
              className="preview-frame"
              sandbox="allow-scripts"
              style={{ minHeight: 130, flex: 1 }}
            />
            <div className="pane-label" style={{ borderTop: '1px solid var(--border)' }}>
              Console
            </div>
            <div style={{ maxHeight: 140, overflow: 'auto', minHeight: 44 }}>
              {logs.length === 0 ? (
                <div className="console-empty">Aucune sortie — exécutez votre code pour voir le résultat.</div>
              ) : (
                logs.map((l, i) => (
                  <div key={i} className={`console-line ${l.level}`}>
                    {l.level === 'error' ? '✕ ' : l.level === 'warn' ? '⚠ ' : '› '}
                    {l.text}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
