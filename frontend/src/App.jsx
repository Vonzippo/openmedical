import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { Provider } from 'react-redux';
import { store } from './store';
import theme from './theme';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import AuthInitializer from './components/AuthInitializer';
import Home from './pages/Home';
import UeberUns from './pages/UeberUns';
import Produkte from './pages/Produkte';
import Partner from './pages/Partner';
import Jobs from './pages/Jobs';
import Kontakt from './pages/Kontakt';
import Support from './pages/Support';
import Anmeldung from './pages/Anmeldung';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import CMS from './pages/CMS';

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
                <Route path="support" element={<Support />} />
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
                <Route
                  path="cms"
                  element={
                    <ProtectedRoute requiredRole="admin">
                      <CMS />
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
