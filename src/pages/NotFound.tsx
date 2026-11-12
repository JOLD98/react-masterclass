import { Link } from 'react-router-dom';

export function NotFound() {
  return (
    <section className="container section center">
      <h1>404</h1>
      <p className="muted">Cette page n’existe pas.</p>
      <Link to="/" className="btn btn-primary">Retour à l’accueil</Link>
    </section>
  );
}
