import { Outlet, Link } from 'react-router-dom';
import { Navbar } from '../components/Chrome';
import { useAuth } from '../context/AuthContext';

export function AppLayout() {
  const { user } = useAuth();
  return (
    <div className="layout">
      <Navbar />
      {!user && (
        <div className="guest-banner">
          <span>
            Vous êtes en mode invité : votre progression est sauvegardée sur cet appareil uniquement.
          </span>
          <Link to="/inscription">Créer un compte gratuit →</Link>
        </div>
      )}
      <main className="layout-main app-main">
        <Outlet />
      </main>
    </div>
  );
}
