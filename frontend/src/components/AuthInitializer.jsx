import { useEffect } from 'react';
import { useAppDispatch } from '../store';
import { fetchCurrentUser } from '../store/slices/authSlice';

// Auth Initializer - Prüft Session beim App-Start
function AuthInitializer({ children }) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    // Benutzer-Session prüfen (Cookie/Token)
    dispatch(fetchCurrentUser());
  }, [dispatch]);

  return <>{children}</>;
}

export default AuthInitializer;
