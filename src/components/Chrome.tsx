import { Link, NavLink, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

/** Logo animé de React Masterclass */
export function Logo({ size = 34 }: { size?: number }) {
  return (
    <Link to="/" className="logo" aria-label="React Masterclass — accueil">
      <span className="logo-mark" style={{ width: size, height: size }}>
        <svg viewBox="-11.5 -10.23174 23 20.46348" width={size} height={size}>
          <circle r="2.05" fill="#61DAFB" />
          <g stroke="#61DAFB" strokeWidth="1" fill="none">
            <ellipse rx="11" ry="4.2" />
            <ellipse rx="11" ry="4.2" transform="rotate(60)" />
            <ellipse rx="11" ry="4.2" transform="rotate(120)" />
          </g>
        </svg>
      </span>
      <span className="logo-text">
        React <strong>Masterclass</strong>
      </span>
    </Link>
  );
}

export function Navbar() {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const inApp = location.pathname.startsWith('/app');

  const close = () => setOpen(false);

  return (
    <header className="navbar">
      <div className="container navbar-inner">
        <Logo />
        <button
          className="nav-burger"
          aria-label="Ouvrir le menu"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
        >
          <span /><span /><span />
        </button>
        <nav className={`nav-links ${open ? 'is-open' : ''}`}>
          {inApp ? (
            <>
              <NavLink to="/app" end onClick={close}>Tableau de bord</NavLink>
              <NavLink to="/app/programme" onClick={close}>Programme</NavLink>
              <NavLink to="/app/projets" onClick={close}>Projets</NavLink>
              <NavLink to="/app/revisions" onClick={close}>Révisions</NavLink>
              <NavLink to="/app/certificat" onClick={close}>Certificat</NavLink>
              <NavLink to="/app/admin" onClick={close}>Admin</NavLink>
              <NavLink to="/app/profil" onClick={close} className="nav-avatar">
                {user ? user.name.charAt(0).toUpperCase() : ' Invité'}
              </NavLink>
              {user && (
                <button className="btn btn-ghost btn-sm" onClick={() => { logout(); close(); }}>
                  Déconnexion
                </button>
              )}
            </>
          ) : (
            <>
              <a href="#avantages" onClick={close}>Avantages</a>
              <a href="#modules" onClick={close}>Modules</a>
              <a href="#exercices" onClick={close}>Exercices</a>
              <a href="#projets" onClick={close}>Projets</a>
              {user ? (
                <Link to="/app" className="btn btn-primary btn-sm" onClick={close}>
                  Mon espace
                </Link>
              ) : (
                <>
                  <Link to="/connexion" onClick={close}>Connexion</Link>
                  <Link to="/inscription" className="btn btn-primary btn-sm" onClick={close}>
                    Commencer
                  </Link>
                </>
              )}
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <Logo />
          <p className="muted">
            La plateforme française pour maîtriser React JS de zéro à expert : leçons,
            exercices corrigés et projets concrets.
          </p>
        </div>
        <div>
          <h4>Apprendre</h4>
          <Link to="/app/programme">Programme complet</Link>
          <Link to="/app/projets">Bibliothèque de projets</Link>
          <Link to="/app/revisions">Espace révisions</Link>
        </div>
        <div>
          <h4>Plateforme</h4>
          <Link to="/inscription">Créer un compte</Link>
          <Link to="/connexion">Connexion</Link>
          <Link to="/app/certificat">Certificat</Link>
        </div>
        <div>
          <h4>Contact</h4>
          <a href="mailto:contact@react-masterclass.fr">contact@react-masterclass.fr</a>
          <span className="muted">Paris, France</span>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© {new Date().getFullYear()} React Masterclass — Tous droits réservés.</span>
        <span>Fait avec ❤️ et React</span>
      </div>
    </footer>
  );
}
