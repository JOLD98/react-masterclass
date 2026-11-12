import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { html } from '@codemirror/lang-html';
import { oneDark } from '@codemirror/theme-one-dark';

interface Props {
  value: string;
  onChange?: (value: string) => void;
  language?: 'js' | 'jsx' | 'html';
  height?: string;
  readOnly?: boolean;
}

/** Éditeur de code avec coloration syntaxique (CodeMirror) */
export function CodeEditor({ value, onChange, language = 'jsx', height = '260px', readOnly = false }: Props) {
  const extension =
    language === 'html' ? html({ autoCloseTags: true }) : javascript({ jsx: language === 'jsx', typescript: false });

  return (
    <CodeMirror
      value={value}
      height={height}
      theme={oneDark}
      readOnly={readOnly}
      editable={!readOnly}
      onChange={onChange}
      extensions={[extension]}
      basicSetup={{
        lineNumbers: true,
        foldGutter: false,
        highlightActiveLine: true,
        autocompletion: false,
      }}
      style={{ fontSize: '0.86rem' }}
    />
  );
}
