import { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  TextField,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import LanguageIcon from '@mui/icons-material/Language';
import PeopleIcon from '@mui/icons-material/People';
import DesktopWindowsIcon from '@mui/icons-material/DesktopWindows';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import api from '../services/api';

function Layout() {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [produkteAnchor, setProdukteAnchor] = useState(null);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterStatus, setNewsletterStatus] = useState('');

  const navItems = [
    { label: 'Produkte', path: '/produkte', hasDropdown: true },
    { label: 'Über uns', path: '/ueber-uns' },
    { label: 'Partner', path: '/partner' },
    { label: 'Karriere', path: '/jobs' },
    { label: 'Support', path: '/support' },
    { label: 'Kontakt', path: '/kontakt' },
  ];

  const produkteItems = [
    { label: 'mednet web', icon: <LanguageIcon />, path: '/produkte#mednet-web' },
    { label: 'mednet patient', icon: <PeopleIcon />, path: '/produkte#mednet-patient' },
    { label: 'mednet desktop', icon: <DesktopWindowsIcon />, path: '/produkte#mednet-desktop' },
  ];

  const handleProdukteClick = (event) => {
    setProdukteAnchor(event.currentTarget);
  };

  const handleProdukteClose = () => {
    setProdukteAnchor(null);
  };

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    if (!newsletterEmail) return;

    try {
      await api.post('/newsletter/subscribe', { email: newsletterEmail });
      setNewsletterStatus('success');
      setNewsletterEmail('');
      setTimeout(() => setNewsletterStatus(''), 3000);
    } catch (error) {
      setNewsletterStatus('error');
      setTimeout(() => setNewsletterStatus(''), 3000);
    }
  };

  const isActive = (path) => location.pathname === path;

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* Header */}
      <AppBar position="sticky" color="inherit" elevation={0} sx={{ borderBottom: '1px solid #E2E8F0' }}>
        <Container maxWidth="lg">
          <Toolbar disableGutters sx={{ height: 72 }}>
            {/* Logo */}
            <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 400,
                  color: '#0077B6',
                  mr: 0.5,
                }}
              >
                open
              </Typography>
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 600,
                  color: '#4A5568',
                }}
              >
                medical
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  ml: 1,
                  color: '#0077B6',
                  fontSize: '0.65rem',
                  lineHeight: 1.2,
                }}
              >
                So kommuniziert man<br />im Gesundheitswesen
              </Typography>
            </Link>

            {/* Desktop Navigation */}
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'center', gap: 1 }}>
              {navItems.map((item) => (
                item.hasDropdown ? (
                  <Button
                    key={item.label}
                    onClick={handleProdukteClick}
                    endIcon={<KeyboardArrowDownIcon />}
                    sx={{
                      color: isActive(item.path) ? '#0077B6' : '#4A5568',
                      fontWeight: isActive(item.path) ? 600 : 400,
                      '&:hover': { color: '#0077B6', bgcolor: 'transparent' },
                    }}
                  >
                    {item.label}
                  </Button>
                ) : (
                  <Button
                    key={item.label}
                    component={Link}
                    to={item.path}
                    sx={{
                      color: isActive(item.path) ? '#0077B6' : '#4A5568',
                      fontWeight: isActive(item.path) ? 600 : 400,
                      bgcolor: isActive(item.path) ? '#E6F3F8' : 'transparent',
                      borderRadius: 2,
                      px: 2,
                      '&:hover': { color: '#0077B6', bgcolor: '#E6F3F8' },
                    }}
                  >
                    {item.label}
                  </Button>
                )
              ))}
            </Box>

            {/* Produkte Dropdown */}
            <Menu
              anchorEl={produkteAnchor}
              open={Boolean(produkteAnchor)}
              onClose={handleProdukteClose}
              PaperProps={{
                sx: { mt: 1, borderRadius: 2, boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }
              }}
            >
              {produkteItems.map((item) => (
                <MenuItem
                  key={item.label}
                  component={Link}
                  to={item.path}
                  onClick={handleProdukteClose}
                  sx={{ py: 1.5, px: 3 }}
                >
                  <ListItemIcon sx={{ color: '#0077B6' }}>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.label} />
                </MenuItem>
              ))}
            </Menu>

            {/* Auth Buttons */}
            <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1, alignItems: 'center' }}>
              <Button
                component={Link}
                to="/anmeldung"
                variant="contained"
                sx={{
                  bgcolor: '#0077B6',
                  '&:hover': { bgcolor: '#005A8C' },
                }}
              >
                Registrierung
              </Button>
              <Button
                component={Link}
                to="/login"
                variant="outlined"
                sx={{
                  borderColor: '#0077B6',
                  color: '#0077B6',
                  '&:hover': { borderColor: '#005A8C', bgcolor: '#E6F3F8' },
                }}
              >
                Login
              </Button>
            </Box>

            {/* Mobile Menu Button */}
            <IconButton
              sx={{ display: { md: 'none' } }}
              onClick={() => setMobileOpen(true)}
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
      >
        <Box sx={{ width: 280, pt: 2 }}>
          <List>
            {navItems.map((item) => (
              <ListItem
                key={item.label}
                component={Link}
                to={item.path}
                onClick={() => setMobileOpen(false)}
                sx={{ color: '#4A5568' }}
              >
                <ListItemText primary={item.label} />
              </ListItem>
            ))}
            <Divider sx={{ my: 2 }} />
            <ListItem
              component={Link}
              to="/anmeldung"
              onClick={() => setMobileOpen(false)}
            >
              <Button variant="contained" fullWidth>Registrierung</Button>
            </ListItem>
            <ListItem
              component={Link}
              to="/login"
              onClick={() => setMobileOpen(false)}
            >
              <Button variant="outlined" fullWidth>Login</Button>
            </ListItem>
          </List>
        </Box>
      </Drawer>

      {/* Main Content */}
      <Box component="main" sx={{ flexGrow: 1 }}>
        <Outlet />
      </Box>

      {/* Footer */}
      <Box
        component="footer"
        sx={{
          bgcolor: '#1A202C',
          color: 'white',
          pt: 6,
          pb: 4,
        }}
      >
        <Container maxWidth="lg">
          {/* Newsletter Section */}
          <Box sx={{ textAlign: 'center', mb: 5 }}>
            <Typography variant="body1" sx={{ mb: 2, color: '#CBD5E0' }}>
              Bleiben Sie informiert über digitale Lösungen im Gesundheitswesen
            </Typography>
            <Box
              component="form"
              onSubmit={handleNewsletterSubmit}
              sx={{ display: 'flex', justifyContent: 'center', gap: 1, maxWidth: 500, mx: 'auto' }}
            >
              <TextField
                size="small"
                placeholder="E-Mail-Adresse eingeben"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                sx={{
                  flex: 1,
                  bgcolor: 'white',
                  borderRadius: 1,
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': { border: 'none' },
                  },
                }}
              />
              <Button
                type="submit"
                variant="contained"
                sx={{ bgcolor: '#0077B6', '&:hover': { bgcolor: '#005A8C' } }}
              >
                Abonnieren
              </Button>
            </Box>
            {newsletterStatus === 'success' && (
              <Typography variant="body2" sx={{ mt: 1, color: '#48BB78' }}>
                Erfolgreich angemeldet!
              </Typography>
            )}
            {newsletterStatus === 'error' && (
              <Typography variant="body2" sx={{ mt: 1, color: '#FC8181' }}>
                Anmeldung fehlgeschlagen
              </Typography>
            )}
          </Box>

          <Divider sx={{ borderColor: '#2D3748', mb: 5 }} />

          {/* Footer Links */}
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 4, justifyContent: 'space-between' }}>
            {/* Company Info */}
            <Box sx={{ minWidth: 200 }}>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                openmedical
              </Typography>
              <Typography variant="body2" sx={{ color: '#A0AEC0', mb: 2, maxWidth: 250 }}>
                Digitale Kommunikation für das Gesundheitswesen - sicher, integriert, zuverlässig.
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                <LocationOnIcon sx={{ fontSize: 18, color: '#A0AEC0' }} />
                <Typography variant="body2" sx={{ color: '#A0AEC0' }}>
                  Reinach, Schweiz
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                <EmailIcon sx={{ fontSize: 18, color: '#A0AEC0' }} />
                <Typography variant="body2" sx={{ color: '#A0AEC0' }}>
                  info@openmedical.swiss
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <PhoneIcon sx={{ fontSize: 18, color: '#A0AEC0' }} />
                <Typography variant="body2" sx={{ color: '#A0AEC0' }}>
                  +41 44 123 45 67
                </Typography>
              </Box>
            </Box>

            {/* Produkte */}
            <Box sx={{ minWidth: 150 }}>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                Produkte
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Link to="/produkte#mednet-web" style={{ color: '#A0AEC0', textDecoration: 'none' }}>
                  mednet web
                </Link>
                <Link to="/produkte#mednet-patient" style={{ color: '#A0AEC0', textDecoration: 'none' }}>
                  mednet patient
                </Link>
                <Link to="/produkte#mednet-desktop" style={{ color: '#A0AEC0', textDecoration: 'none' }}>
                  mednet desktop
                </Link>
                <Link to="/partner" style={{ color: '#A0AEC0', textDecoration: 'none' }}>
                  Softwareanbieter
                </Link>
              </Box>
            </Box>

            {/* Support & Rechtliches */}
            <Box sx={{ minWidth: 150 }}>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                Support & Rechtliches
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Link to="/kontakt" style={{ color: '#A0AEC0', textDecoration: 'none' }}>
                  Support
                </Link>
                <Link to="#" style={{ color: '#A0AEC0', textDecoration: 'none' }}>
                  Dokumentation
                </Link>
                <Link to="#" style={{ color: '#A0AEC0', textDecoration: 'none' }}>
                  Sicherheit
                </Link>
                <Link to="#" style={{ color: '#A0AEC0', textDecoration: 'none' }}>
                  Datenschutz
                </Link>
                <Link to="#" style={{ color: '#A0AEC0', textDecoration: 'none' }}>
                  Impressum
                </Link>
              </Box>
            </Box>
          </Box>

          <Divider sx={{ borderColor: '#2D3748', my: 4 }} />

          {/* Bottom Footer */}
          <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: 2 }}>
            <Typography variant="body2" sx={{ color: '#A0AEC0' }}>
              © 2025 openmedical. Alle Rechte vorbehalten. | Developed by novcom
            </Typography>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <IconButton size="small" sx={{ color: '#A0AEC0', '&:hover': { color: 'white' } }}>
                <FacebookIcon />
              </IconButton>
              <IconButton size="small" sx={{ color: '#A0AEC0', '&:hover': { color: 'white' } }}>
                <TwitterIcon />
              </IconButton>
              <IconButton size="small" sx={{ color: '#A0AEC0', '&:hover': { color: 'white' } }}>
                <InstagramIcon />
              </IconButton>
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}

export default Layout;
