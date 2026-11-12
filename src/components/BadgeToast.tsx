import { useEffect } from 'react';
import { useProgress } from '../context/ProgressContext';
import { badgeById } from '../lib/levels';

/** Toast de célébration lorsqu'un badge est débloqué */
export function BadgeToast() {
  const { celebration, dismissCelebration } = useProgress();

  useEffect(() => {
    if (!celebration) return;
    const t = setTimeout(dismissCelebration, 5000);
    return () => clearTimeout(t);
  }, [celebration, dismissCelebration]);

  if (!celebration) return null;
  const badge = badgeById(celebration);
  if (!badge) return null;

  return (
    <div className="badge-toast" role="status">
      <span className="badge-toast-icon">{badge.icon}</span>
      <div>
        <strong>Badge débloqué : {badge.name}</strong>
        <p>{badge.description}</p>
      </div>
      <button onClick={dismissCelebration} aria-label="Fermer">×</button>
    </div>
  );
}
