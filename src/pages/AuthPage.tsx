import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Logo } from '../components/Chrome';

export function AuthPage({ mode }: { mode: 'login' | 'register' }) {
  const { register, login, user } = useAuth();
  const navigate = useNavigate();
  const isRegister = mode === 'register';

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  if (user) {
    return (
      <section className="container section center">
        <div className="card auth-card">
          <h2>Vous êtes déjà connecté·e</h2>
          <p className="muted">Rendez-vous dans votre espace pour reprendre votre progression.</p>
          <Link to="/app" className="btn btn-primary">
            Ouvrir mon tableau de bord
          </Link>
        </div>
      </section>
    );
  }

  const submit = (e: FormEvent) => {
    e.preventDefault();
    setError('');
    const result = isRegister ? register(name, email, password) : login(email, password);
    if (!result.ok) {
      setError(result.error ?? 'Une erreur est survenue.');
      return;
    }
    navigate('/app');
  };

  return (
    <section className="container">
      <div className="card auth-card">
        <Logo />
        <h2>{isRegister ? 'Créer votre compte' : 'Bon retour !'}</h2>
        <p className="muted">
          {isRegister
            ? 'Gratuit, sans engagement. Votre progression est sauvegardée automatiquement.'
            : 'Reprenez là où vous vous êtes arrêté.'}
        </p>

        {error && <div className="form-error">{error}</div>}

        <form onSubmit={submit} noValidate>
          {isRegister && (
            <div className="field">
              <label htmlFor="name">Votre prénom</label>
              <input
                id="name"
                className="input"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="ex. Camille"
                autoComplete="given-name"
              />
            </div>
          )}
          <div className="field">
            <label htmlFor="email">Adresse e-mail</label>
            <input
              id="email"
              type="email"
              className="input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="vous@exemple.fr"
              autoComplete="email"
            />
          </div>
          <div className="field">
            <label htmlFor="password">Mot de passe</label>
            <input
              id="password"
              type="password"
              className="input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={isRegister ? '6 caractères minimum' : '••••••••'}
              autoComplete={isRegister ? 'new-password' : 'current-password'}
            />
          </div>
          <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%' }}>
            {isRegister ? 'Créer mon compte et commencer' : 'Me connecter'}
          </button>
        </form>

        <p className="auth-switch">
          {isRegister ? (
            <>
              Déjà un compte ? <Link to="/connexion">Se connecter</Link>
            </>
          ) : (
            <>
              Pas encore de compte ? <Link to="/inscription">Créer un compte gratuit</Link>
            </>
          )}
        </p>
      </div>
    </section>
  );
}
