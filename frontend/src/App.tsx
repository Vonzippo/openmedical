import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { Provider } from 'react-redux';
import { store, useAppDispatch } from './store';
import { fetchCurrentUser } from './store/slices/authSlice';
import theme from './theme';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import UeberUns from './pages/UeberUns';
import Produkte from './pages/Produkte';
import Partner from './pages/Partner';
import Jobs from './pages/Jobs';
import Kontakt from './pages/Kontakt';
import Anmeldung from './pages/Anmeldung';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';

// Auth Initializer - Prüft Session beim App-Start
function AuthInitializer({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    // Benutzer-Session prüfen (Cookie/Token)
    dispatch(fetchCurrentUser());
  }, [dispatch]);

  return <>{children}</>;
}

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <AuthInitializer>
            <Routes>
              <Route path="/" element={<Layout />}>
                {/* Öffentliche Seiten */}
                <Route index element={<Home />} />
                <Route path="ueber-uns" element={<UeberUns />} />
                <Route path="produkte" element={<Produkte />} />
                <Route path="partner" element={<Partner />} />
                <Route path="jobs" element={<Jobs />} />
                <Route path="kontakt" element={<Kontakt />} />
                <Route path="anmeldung" element={<Anmeldung />} />
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />

                {/* Geschützte Seiten - Nur für eingeloggte Benutzer */}
                <Route
                  path="dashboard"
                  element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  }
                />
              </Route>
            </Routes>
          </AuthInitializer>
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
