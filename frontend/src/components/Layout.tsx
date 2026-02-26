import { Outlet, Link, useLocation } from 'react-router-dom';
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  Container,
  Button,
  Stack,
  Select,
  MenuItem,
  FormControl,
} from '@mui/material';

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

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* Header */}
      <AppBar position="static" color="default" elevation={0} sx={{ borderBottom: '2px solid #ccc' }}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          {/* Logo Placeholder */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
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
            >
              LOGO
            </Box>
            <Typography variant="h6" sx={{ fontWeight: 400 }}>
              openmedical
            </Typography>
          </Box>

          {/* Navigation */}
          <Stack direction="row" spacing={1}>
            {navItems.map((item) => (
              <Button
                key={item.path}
                component={Link}
                to={item.path}
                variant={location.pathname === item.path ? 'contained' : 'text'}
                size="small"
              >
                {item.label}
              </Button>
            ))}
          </Stack>

          {/* Language Selector */}
          <FormControl size="small" sx={{ minWidth: 80 }}>
            <Select defaultValue="de" variant="outlined">
              <MenuItem value="de">DE</MenuItem>
              <MenuItem value="fr">FR</MenuItem>
              <MenuItem value="it">IT</MenuItem>
              <MenuItem value="en">EN</MenuItem>
            </Select>
          </FormControl>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Container component="main" sx={{ flex: 1, py: 4 }} maxWidth="lg">
        <Outlet />
      </Container>

      {/* Footer */}
      <Box
        component="footer"
        sx={{
          py: 3,
          px: 2,
          mt: 'auto',
          bgcolor: '#eee',
          borderTop: '2px solid #ccc',
          textAlign: 'center',
        }}
      >
        <Typography variant="body2" color="text.secondary">
          [FOOTER PLACEHOLDER]
        </Typography>
        <Typography variant="caption" color="text.secondary">
          © 2024 openmedical AG | Adresse | Telefon | Email
        </Typography>
      </Box>
    </Box>
  );
}

export default Layout;
