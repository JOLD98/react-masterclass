import { Link } from 'react-router-dom';
import { useContent } from '../context/ContentContext';
import { highlight } from '../components/Code';

/** Atome React animé (SVG) */
function Atom() {
  return (
    <div className="atom">
      <svg viewBox="-130 -120 260 240" aria-hidden="true">
        <g className="orbits">
          {[0, 60, 120].map((angle) => (
            <g key={angle} transform={`rotate(${angle})`}>
              <ellipse className="orbit-glow" rx="105" ry="40" />
              <ellipse className="orbit" rx="105" ry="40" />
            </g>
          ))}
        </g>
        <circle className="nucleus" r="11" />
        {[0, 60, 120].map((angle) => (
          <g key={angle} transform={`rotate(${angle})`}>
            <circle className="electron" r="7" cx="105" cy="0">
              <animateTransform
                attributeName="transform"
                type="rotate"
                from="0"
                to="360"
                dur="7s"
                repeatCount="indefinite"
              />
            </circle>
          </g>
        ))}
      </svg>
      <div className="atom-card">
        <span className="dot" />
        <span>
          <strong>{totalLessons > 0 ? totalLessons : '141'} leçons</strong> · exercices corrigés en direct
        </span>
      </div>
    </div>
  );
}

const ADVANTAGES = [
  {
    icon: '🎯',
    title: 'Parcours progressif',
    text: 'Du tout débutant à l’expert, chaque notion s’appuie sur la précédente. Aucun prérequis caché.',
  },
  {
    icon: '💻',
    title: 'Éditeur de code intégré',
    text: 'Écruez, exécutez et visualisez votre code React directement dans la leçon, sans installation.',
  },
  {
    icon: '✅',
    title: 'Exercices auto-corrigés',
    text: 'QCM, code à écrire, erreurs à trouver… vos réponses sont vérifiées instantanément avec explications.',
  },
  {
    icon: '🏗️',
    title: '10 projets concrets',
    text: 'Calculatrice, météo, e-commerce, dashboard admin : construisez un portfolio qui impressionne.',
  },
  {
    icon: '🏆',
    title: 'Niveaux, XP et badges',
    text: 'Gagnez des points, débloquez des badges, enchaînez les jours de série et restez motivé.',
  },
  {
    icon: '🔄',
    title: 'Espace révisions ciblé',
    text: 'La plateforme repère vos erreurs et vous propose de revoir exactement ce que vous maîtrisez mal.',
  },
];

const SHOWCASE_CODE = `function Compteur() {
  const [count, setCount] = useState(0);

  return (
    <div className="card">
      <h1>{count}</h1>
      <button onClick={() => setCount(count + 1)}>
        Incrémenter
      </button>
    </div>
  );
}`;

export function Home() {
  const { modules, projects } = useContent();
  const totalLessons = modules.reduce((s, m) => s + m.lessons.length, 0);
  const totalExercises = modules.reduce((s, m) => s + m.lessons.reduce((t, l) => t + l.exercises.length, 0), 0);

  return (
    <>
      {/* ================= HERO ================= */}
      <section className="hero">
        <div className="container hero-grid">
          <div>
            <span className="hero-eyebrow">⚛️ Formation React JS · 100 % en français</span>
            <h1>
              Maîtrisez <span className="grad">React JS</span> de zéro à expert
            </h1>
            <p className="hero-sub">
              La plateforme d’apprentissage la plus complète pour devenir développeur React :
              {totalLessons > 0 ? ` ${totalLessons} leçons` : ' des centaines de leçons'} guidées,
              des exercices corrigés instantanément, un éditeur de code intégré et 10 projets
              professionnels à réaliser.
            </p>
            <div className="hero-cta">
              <Link to="/inscription" className="btn btn-primary btn-lg">
                Commencer à apprendre →
              </Link>
              <a href="#modules" className="btn btn-outline btn-lg">
                Découvrir le programme
              </a>
            </div>
            <div className="hero-stats">
              <div>
                <strong>{modules.length || 18}</strong>
                <span>modules structurés</span>
              </div>
              <div>
                <strong>{totalLessons || '141'}</strong>
                <span>leçons guidées</span>
              </div>
              <div>
                <strong>{totalExercises || '500+'}</strong>
                <span>exercices pratiques</span>
              </div>
              <div>
                <strong>10</strong>
                <span>projets réels</span>
              </div>
            </div>
          </div>
          <div>
            <Atom />
          </div>
        </div>
      </section>

      {/* ================= AVANTAGES ================= */}
      <section className="section" id="avantages">
        <div className="container">
          <div className="section-head">
            <span className="tag">Pourquoi cette formation ?</span>
            <h2>Tout ce qu’il faut pour réussir, rien de superflu</h2>
            <p>
              Une méthode éprouvée : comprendre, pratiquer, corriger, projeter. Vous n’êtes jamais
              seul face à l’écran.
            </p>
          </div>
          <div className="grid-3">
            {ADVANTAGES.map((a) => (
              <article className="card hover feature-card" key={a.title}>
                <div className="feature-icon">{a.icon}</div>
                <h3>{a.title}</h3>
                <p>{a.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ================= MODULES ================= */}
      <section className="section" id="modules">
        <div className="container">
          <div className="section-head">
            <span className="tag violet">Le programme</span>
            <h2>18 modules pour construire votre maîtrise</h2>
            <p>
              Des fondations web jusqu’aux tests et au déploiement : un parcours complet et
              progressif, chaque leçon terminée vous rapproche du niveau Expert.
            </p>
          </div>
          <div className="grid-3">
            {(modules.length > 0 ? modules : []).slice(0, 6).map((m) => (
              <Link to="/app/programme" key={m.id} className="card hover module-card">
                <span className="module-num">Module {String(m.number).padStart(2, '0')}</span>
                <h3>
                  {m.icon} {m.title}
                </h3>
                <p>{m.description}</p>
                <div className="module-meta">
                  <span className="tag">{m.lessons.length} leçons</span>
                  <span className="tag gray">{m.level}</span>
                </div>
              </Link>
            ))}
            {modules.length === 0 && (
              <div className="empty-state" style={{ gridColumn: '1 / -1' }}>
                <div className="icon">⏳</div>
                Le contenu des modules est en cours de chargement…
              </div>
            )}
          </div>
          <div className="center mt-4">
            <Link to="/app/programme" className="btn btn-outline">
              Voir les {modules.length || 18} modules →
            </Link>
          </div>
        </div>
      </section>

      {/* ================= EXERCICES ================= */}
      <section className="section" id="exercices">
        <div className="container showcase">
          <div>
            <span className="tag green">Exercices pratiques</span>
            <h2 className="mt-2">Codez dans la leçon, voyez le résultat immédiatement</h2>
            <p className="muted">
              Chaque notion est suivie de 3 à 5 exercices progressifs. Vous écrivez du code dans
              l’intégrateur, vous exécutez, la plateforme vérifie votre réponse et vous explique
              pourquoi elle est juste — ou pourquoi elle ne l’est pas.
            </p>
            <ul className="check-list">
              <li>QCM, réponses courtes, code à écrire et code à corriger</li>
              <li>Vérification automatique de votre code exécuté en environnement isolé</li>
              <li>Corrections détaillées : jamais seulement « la solution est… »</li>
              <li>Historique de vos erreurs pour réviser au bon moment</li>
            </ul>
            <div className="hero-cta">
              <Link to="/inscription" className="btn btn-primary">
                Tester un exercice
              </Link>
            </div>
          </div>

          <div className="mock-editor" aria-hidden="true">
            <div className="mock-editor-bar">
              <span className="dots">
                <i /><i /><i />
              </span>
              <span>Compteur.jsx — exercice 2/4 · intermédiaire</span>
            </div>
            <pre>
              <code>{highlight(SHOWCASE_CODE)}</code>
            </pre>
            <div className="mock-editor-result">✓ Compilation réussie · Console sans erreur · +10 XP</div>
          </div>
        </div>
      </section>

      {/* ================= PROJETS ================= */}
      <section className="section" id="projets">
        <div className="container">
          <div className="section-head">
            <span className="tag amber">Bibliothèque de projets</span>
            <h2>10 projets pour prouver vos compétences</h2>
            <p>
              Objectifs, consignes, étapes, critères de validation et correction détaillée : chaque
              projet vous fait passer de la théorie au portfolio.
            </p>
          </div>
          <div className="grid-3">
            {(projects.length > 0 ? projects : []).slice(0, 6).map((p, i) => (
              <Link to="/app/projets" key={p.id} className="card hover project-card">
                <div className="p-icon">
                  {['🧮', '📝', '🌤️', '📦', '📊', '🛒'][i] ?? '🚀'}
                </div>
                <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
                  <span className="tag">{p.level}</span>
                  <span className="small muted">{p.skills.length} compétences</span>
                </div>
                <h3>{p.title}</h3>
                <p>{p.objectives[0]}</p>
              </Link>
            ))}
            {projects.length === 0 && (
              <div className="empty-state" style={{ gridColumn: '1 / -1' }}>
                <div className="icon">⏳</div>
                Les projets arrivent…
              </div>
            )}
          </div>
          <div className="center mt-4">
            <Link to="/app/projets" className="btn btn-outline">
              Explorer les 10 projets →
            </Link>
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="section">
        <div className="container">
          <div className="cta-band">
            <h2>Prêt à devenir développeur React ?</h2>
            <p className="muted" style={{ maxWidth: 560, margin: '0 auto 26px' }}>
              Créez votre compte gratuit, suivez votre progression depuis votre tableau de bord et
              obtenez votre certificat en fin de parcours.
            </p>
            <div className="hero-cta" style={{ justifyContent: 'center' }}>
              <Link to="/inscription" className="btn btn-primary btn-lg">
                Commencer gratuitement
              </Link>
              <Link to="/connexion" className="btn btn-outline btn-lg">
                J’ai déjà un compte
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
