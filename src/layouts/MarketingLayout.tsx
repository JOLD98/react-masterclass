import { Outlet } from 'react-router-dom';
import { Navbar, Footer } from '../components/Chrome';

export function MarketingLayout() {
  return (
    <div className="layout">
      <Navbar />
      <main className="layout-main">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
