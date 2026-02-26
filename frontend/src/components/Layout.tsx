import { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  Container,
  Button,
  Stack,
  IconButton,
  Tooltip,
  TextField,
  Alert,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useAppDispatch } from '../store';
import { openSearch } from '../store/slices/searchSlice';
import GlobalSearch from './GlobalSearch';
import api from '../services/api';

const navItems = [
  { label: 'Home', path: '/' },
  { label: 'Über uns', path: '/ueber-uns' },
  { label: 'Produkte', path: '/produkte' },
  { label: 'Partner', path: '/partner' },
  { label: 'Jobs', path: '/jobs' },
  { label: 'Kontakt', path: '/kontakt' },
];

function Layout() {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterStatus, setNewsletterStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [newsletterMessage, setNewsletterMessage] = useState('');

  const handleOpenSearch = () => {
    dispatch(openSearch());
  };

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/newsletter/subscribe', { email: newsletterEmail });
      setNewsletterStatus('success');
      setNewsletterMessage('Anmeldung erfolgreich!');
      setNewsletterEmail('');
    } catch (error: any) {
      setNewsletterStatus('error');
      setNewsletterMessage(error.response?.data?.error || 'Anmeldung fehlgeschlagen');
    }
  };

  // Tastaturnavigation für Suche (Ctrl+K)
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
      e.preventDefault();
      dispatch(openSearch());
    }
  };

  return (
    <Box
      sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}
      onKeyDown={handleKeyDown}
    >
      {/* Skip Link für Tastaturnavigation - WCAG 2.1 AA */}
      <a
        href="#main-content"
        style={{
          position: 'absolute',
          left: '-9999px',
          top: 'auto',
          width: '1px',
          height: '1px',
          overflow: 'hidden',
        }}
        onFocus={(e) => {
          e.currentTarget.style.left = '10px';
          e.currentTarget.style.top = '10px';
          e.currentTarget.style.width = 'auto';
          e.currentTarget.style.height = 'auto';
          e.currentTarget.style.padding = '8px 16px';
          e.currentTarget.style.background = '#1976d2';
          e.currentTarget.style.color = '#fff';
          e.currentTarget.style.zIndex = '9999';
        }}
        onBlur={(e) => {
          e.currentTarget.style.left = '-9999px';
        }}
      >
        Zum Hauptinhalt springen
      </a>

      {/* Global Search Dialog */}
      <GlobalSearch />

      {/* Header - Semantisches HTML */}
      <AppBar
        component="header"
        position="static"
        color="default"
        elevation={0}
        sx={{ borderBottom: '2px solid #ccc' }}
        role="banner"
      >
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          {/* Logo mit aria-label */}
          <Link
            to="/"
            style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center', gap: 8 }}
            aria-label="openmedical - Zur Startseite"
          >
            <Box
              sx={{
                width: 40,
                height: 40,
                bgcolor: '#ddd',
                border: '2px dashed #999',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 10,
              }}
              role="img"
              aria-label="openmedical Logo"
            >
              LOGO
            </Box>
            <Typography variant="h6" component="span" sx={{ fontWeight: 400 }}>
              openmedical
            </Typography>
          </Link>

          {/* Navigation - Semantisches nav Element */}
          <Stack
            component="nav"
            direction="row"
            spacing={1}
            role="navigation"
            aria-label="Hauptnavigation"
          >
            {navItems.map((item) => (
              <Button
                key={item.path}
                component={Link}
                to={item.path}
                variant={location.pathname === item.path ? 'contained' : 'text'}
                size="small"
                aria-current={location.pathname === item.path ? 'page' : undefined}
                sx={{
                  // Fokus-Indikator für Tastaturnavigation - WCAG 2.1 AA
                  '&:focus-visible': {
                    outline: '3px solid #1976d2',
                    outlineOffset: '2px',
                  },
                }}
              >
                {item.label}
              </Button>
            ))}
          </Stack>

          {/* Search */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Tooltip title="Suchen (Ctrl+K)">
              <IconButton
                onClick={handleOpenSearch}
                size="small"
                aria-label="Suche öffnen"
                sx={{
                  '&:focus-visible': {
                    outline: '3px solid #1976d2',
                    outlineOffset: '2px',
                  },
                }}
              >
                <SearchIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Main Content - Semantisches main Element */}
      <Container
        component="main"
        id="main-content"
        sx={{ flex: 1, py: 4 }}
        maxWidth="lg"
        role="main"
        tabIndex={-1}
      >
        <Outlet />
      </Container>

      {/* Footer - Semantisches footer Element */}
      <Box
        component="footer"
        role="contentinfo"
        sx={{
          py: 3,
          px: 2,
          mt: 'auto',
          bgcolor: '#eee',
          borderTop: '2px solid #ccc',
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
            <Box>
              <Typography variant="body2" color="text.secondary">
                © 2024 openmedical AG
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Adresse | Telefon | Email
              </Typography>
            </Box>

            {/* Newsletter-Anmeldung */}
            <Box component="form" onSubmit={handleNewsletterSubmit} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography variant="body2" color="text.secondary" sx={{ mr: 1 }}>
                Newsletter:
              </Typography>
              <TextField
                size="small"
                placeholder="E-Mail"
                type="email"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                required
                aria-label="Newsletter E-Mail"
                sx={{ bgcolor: 'white', width: 200 }}
              />
              <Button type="submit" variant="contained" size="small">
                Anmelden
              </Button>
            </Box>
          </Box>

          {newsletterStatus !== 'idle' && (
            <Alert
              severity={newsletterStatus === 'success' ? 'success' : 'error'}
              sx={{ mt: 2 }}
              onClose={() => setNewsletterStatus('idle')}
            >
              {newsletterMessage}
            </Alert>
          )}
        </Container>
      </Box>
    </Box>
  );
}

export default Layout;
