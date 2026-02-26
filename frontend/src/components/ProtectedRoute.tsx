import { Navigate, useLocation } from 'react-router-dom';
import { useAppSelector } from '../store';
import { CircularProgress, Box } from '@mui/material';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: 'admin' | 'user' | 'practice';
}

// Protected Route - Nur für eingeloggte Benutzer
function ProtectedRoute({ children, requiredRole }: ProtectedRouteProps) {
  const location = useLocation();
  const { isAuthenticated, isLoading, user } = useAppSelector((state) => state.auth);

  console.log('ProtectedRoute:', { path: location.pathname, requiredRole, userRole: user?.role, isAuthenticated, isLoading });

  // Laden - Spinner anzeigen
  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  // Nicht eingeloggt - Redirect zu Login
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Rolle prüfen falls erforderlich (Admin hat immer Zugriff)
  if (requiredRole && user?.role !== requiredRole) {
    if (user?.role !== 'admin') {
      return <Navigate to="/dashboard" replace />;
    }
  }

  return <>{children}</>;
}

export default ProtectedRoute;
