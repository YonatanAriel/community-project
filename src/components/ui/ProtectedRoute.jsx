import { Navigate } from 'react-router-dom';
import { useUserStore } from '@/store/userStore';

function ProtectedRoute({ children, requireAdmin = false }) {
  const { isAuthenticated, user } = useUserStore();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (requireAdmin && !user?.is_admin) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default ProtectedRoute;
