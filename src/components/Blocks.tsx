import type { Block } from '../types';
import { Code, highlight } from './Code';

/** Rendu d'un bloc de texte avec **gras** simple */
function RichText({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return (
    <>
      {parts.map((part, i) =>
        part.startsWith('**') && part.endsWith('**') ? (
          <strong key={i}>{part.slice(2, -2)}</strong>
        ) : (
          <span key={i}>{part}</span>
        ),
      )}
    </>
  );
}

export function Blocks({ blocks }: { blocks: Block[] }) {
  return (
    <div className="prose">
      {blocks.map((block, i) => {
        switch (block.type) {
          case 'h':
            return (
              <h2 key={i} id={`b-${i}`}>
                <RichText text={block.text} />
              </h2>
            );
          case 'p':
            return (
              <p key={i}>
                <RichText text={block.text} />
              </p>
            );
          case 'list':
            return block.ordered ? (
              <ol key={i}>
                {block.items.map((item, j) => (
                  <li key={j}>
                    <RichText text={item} />
                  </li>
                ))}
              </ol>
            ) : (
              <ul key={i}>
                {block.items.map((item, j) => (
                  <li key={j}>
                    <RichText text={item} />
                  </li>
                ))}
              </ul>
            );
          case 'code':
            return <Code key={i} code={block.code} caption={block.caption ?? block.lang ?? 'jsx'} />;
          case 'result':
            return (
              <div key={i} className="result-box">
                <RichText text={block.text} />
              </div>
            );
          case 'mistake':
            return (
              <div key={i} className="mistake-box">
                <RichText text={block.text} />
                {block.fix && (
                  <span className="fix">
                    <RichText text={block.fix} />
                  </span>
                )}
              </div>
            );
          case 'quote':
            return (
              <div key={i} className="summary-box">
                <RichText text={block.text} />
              </div>
            );
          default:
            return null;
        }
      })}
    </div>
  );
}

/** Table des matières (titres) d'une leçon */
export function lessonToc(blocks: Block[]): { id: string; text: string }[] {
  return blocks
    .map((b, i) => (b.type === 'h' ? { id: `b-${i}`, text: b.text } : null))
    .filter((x): x is { id: string; text: string } => x !== null);
}

export { highlight };
