import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { Provider } from 'react-redux';
import { store } from './store';
import theme from './theme';
import Layout from './components/Layout';
import Home from './pages/Home';
import UeberUns from './pages/UeberUns';
import Produkte from './pages/Produkte';
import Partner from './pages/Partner';
import Jobs from './pages/Jobs';
import Kontakt from './pages/Kontakt';
import Anmeldung from './pages/Anmeldung';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="ueber-uns" element={<UeberUns />} />
              <Route path="produkte" element={<Produkte />} />
              <Route path="partner" element={<Partner />} />
              <Route path="jobs" element={<Jobs />} />
              <Route path="kontakt" element={<Kontakt />} />
              <Route path="anmeldung" element={<Anmeldung />} />
              <Route path="dashboard" element={<Dashboard />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
