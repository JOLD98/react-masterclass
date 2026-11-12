import { Routes, Route, Navigate } from 'react-router-dom';
import { MarketingLayout } from './layouts/MarketingLayout';
import { AppLayout } from './layouts/AppLayout';
import { Home } from './pages/Home';
import { AuthPage } from './pages/AuthPage';
import { Dashboard } from './pages/Dashboard';
import { Programme } from './pages/Programme';
import { ModulePage } from './pages/ModulePage';
import { LessonPage } from './pages/LessonPage';
import { Review } from './pages/Review';
import { Projects } from './pages/Projects';
import { ProjectDetail } from './pages/ProjectDetail';
import { Admin } from './pages/Admin';
import { Profile } from './pages/Profile';
import { Certificate } from './pages/Certificate';
import { NotFound } from './pages/NotFound';
import { BadgeToast } from './components/BadgeToast';

export default function App() {
  return (
    <>
      <Routes>
        <Route element={<MarketingLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/connexion" element={<AuthPage mode="login" />} />
          <Route path="/inscription" element={<AuthPage mode="register" />} />
        </Route>

        <Route path="/app" element={<AppLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="programme" element={<Programme />} />
          <Route path="module/:moduleId" element={<ModulePage />} />
          <Route path="lecon/:moduleId/:lessonId" element={<LessonPage />} />
          <Route path="revisions" element={<Review />} />
          <Route path="projets" element={<Projects />} />
          <Route path="projet/:projectId" element={<ProjectDetail />} />
          <Route path="admin" element={<Admin />} />
          <Route path="profil" element={<Profile />} />
          <Route path="certificat" element={<Certificate />} />
        </Route>

        <Route path="/app" element={<Navigate to="/app" replace />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <BadgeToast />
    </>
  );
}
