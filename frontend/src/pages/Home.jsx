import { Box, Typography, Button, Card, Container, Grid, Stack, Chip } from '@mui/material';
import { Link } from 'react-router-dom';
import LanguageIcon from '@mui/icons-material/Language';
import PeopleIcon from '@mui/icons-material/People';
import DesktopWindowsIcon from '@mui/icons-material/DesktopWindows';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import SecurityIcon from '@mui/icons-material/Security';
import SpeedIcon from '@mui/icons-material/Speed';
import IntegrationInstructionsIcon from '@mui/icons-material/IntegrationInstructions';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

function Home() {
  const products = [
    {
      icon: <LanguageIcon sx={{ fontSize: 40, color: '#0077B6' }} />,
      title: 'mednet web',
      description: 'Webbasierte Plattform für die sichere Kommunikation zwischen medizinischen Einrichtungen und ...',
      link: '/produkte#mednet-web',
    },
    {
      icon: <PeopleIcon sx={{ fontSize: 40, color: '#0077B6' }} />,
      title: 'mednet patient',
      description: 'Patientenportal für Terminvereinbarungen, Befundübermittlung und direkte Kommunikation mit Ärzt:innen',
      link: '/produkte#mednet-patient',
    },
    {
      icon: <DesktopWindowsIcon sx={{ fontSize: 40, color: '#0077B6' }} />,
      title: 'mednet desktop',
      description: 'Desktop-Anwendung für die Integration in bestehende Praxissoftware mit lokaler Verschlüsselung',
      link: '/produkte#mednet-desktop',
    },
  ];

  const advantages = [
    {
      icon: <CheckCircleIcon sx={{ fontSize: 32, color: '#0077B6' }} />,
      title: 'Vertrauen',
      description: 'Schweizer Gesundheitsprofis vertrauen uns seit über 20 Jahren.',
    },
    {
      icon: <SecurityIcon sx={{ fontSize: 32, color: '#0077B6' }} />,
      title: 'Sicherheit',
      description: 'Höchste Sicherheitsstandards und Datenschutz nach Schweizer Recht.',
    },
    {
      icon: <SpeedIcon sx={{ fontSize: 32, color: '#0077B6' }} />,
      title: 'Effizienz',
      description: 'Optimierte Workflows für schnellere Kommunikation im Gesundheitswesen.',
    },
    {
      icon: <IntegrationInstructionsIcon sx={{ fontSize: 32, color: '#0077B6' }} />,
      title: 'Integration',
      description: 'Nahtlose Anbindung an über 150 Softwareanbieter im Schweizer Markt.',
    },
  ];

  const timeline = [
    { year: '2003', text: 'Gründung openmedical AG' },
    { year: '2008', text: 'Launch mednet web' },
    { year: '2015', text: '100+ Partner' },
    { year: '2020', text: 'mednet patient Portal' },
    { year: '2024', text: '10\'000+ Praxen' },
  ];

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #E6F3F8 0%, #F7FAFC 100%)',
          py: { xs: 6, md: 10 },
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography
                variant="h2"
                sx={{
                  fontWeight: 700,
                  color: '#1A202C',
                  mb: 2,
                  fontSize: { xs: '2rem', md: '2.5rem' },
                }}
              >
                EINFACH, EFFIZIENT<br />UND SICHER
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  color: '#4A5568',
                  mb: 4,
                  fontWeight: 400,
                  lineHeight: 1.6,
                }}
              >
                Die führende Kommunikationsplattform für das Schweizer Gesundheitswesen.
                Verbinden Sie Praxen, Spitäler und Patienten.
              </Typography>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <Button
                  variant="contained"
                  size="large"
                  component={Link}
                  to="/anmeldung"
                  sx={{
                    bgcolor: '#0077B6',
                    px: 4,
                    py: 1.5,
                    '&:hover': { bgcolor: '#005A8C' },
                  }}
                >
                  Jetzt starten
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  component={Link}
                  to="/produkte"
                  sx={{
                    borderColor: '#0077B6',
                    color: '#0077B6',
                    px: 4,
                    py: 1.5,
                    '&:hover': { borderColor: '#005A8C', bgcolor: '#E6F3F8' },
                  }}
                >
                  Produkte entdecken
                </Button>
              </Stack>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  position: 'relative',
                  height: { xs: 250, md: 350 },
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {/* Hero Illustration Placeholder */}
                <Box
                  sx={{
                    width: '100%',
                    height: '100%',
                    bgcolor: '#0077B6',
                    borderRadius: 4,
                    opacity: 0.1,
                    position: 'absolute',
                  }}
                />
                <TrendingUpIcon sx={{ fontSize: 150, color: '#0077B6', opacity: 0.5 }} />
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Stats Bar */}
      <Box sx={{ bgcolor: '#0077B6', py: 3 }}>
        <Container maxWidth="lg">
          <Grid container spacing={4} justifyContent="center">
            {[
              { value: '10\'000+', label: 'Praxen' },
              { value: '150+', label: 'Partner' },
              { value: '20+', label: 'Jahre Erfahrung' },
              { value: '99.9%', label: 'Uptime' },
            ].map((stat) => (
              <Grid item xs={6} sm={3} key={stat.label} sx={{ textAlign: 'center' }}>
                <Typography variant="h4" sx={{ color: 'white', fontWeight: 700 }}>
                  {stat.value}
                </Typography>
                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.8)' }}>
                  {stat.label}
                </Typography>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Products Section */}
      <Box sx={{ py: 8 }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Typography variant="h3" sx={{ fontWeight: 600, mb: 2 }}>
              Unsere Produkte
            </Typography>
            <Typography variant="body1" sx={{ color: '#4A5568', maxWidth: 600, mx: 'auto' }}>
              Entdecken Sie unsere Lösungen für sichere und effiziente Kommunikation im Gesundheitswesen
            </Typography>
          </Box>

          <Grid container spacing={4}>
            {products.map((product) => (
              <Grid item xs={12} md={4} key={product.title}>
                <Card
                  sx={{
                    height: '100%',
                    p: 3,
                    transition: 'all 0.3s ease',
                    border: '2px solid transparent',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      borderColor: '#0077B6',
                      boxShadow: '0 8px 24px rgba(0, 119, 182, 0.15)',
                    },
                  }}
                >
                  <Box sx={{ mb: 2 }}>{product.icon}</Box>
                  <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>
                    {product.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#4A5568', mb: 3 }}>
                    {product.description}
                  </Typography>
                  <Button
                    component={Link}
                    to={product.link}
                    variant="contained"
                    size="small"
                    sx={{
                      bgcolor: '#0077B6',
                      '&:hover': { bgcolor: '#005A8C' },
                    }}
                  >
                    Mehr erfahren
                  </Button>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Advantages Section */}
      <Box sx={{ bgcolor: '#F7FAFC', py: 8 }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Typography variant="h3" sx={{ fontWeight: 600, mb: 2 }}>
              Warum openmedical?
            </Typography>
          </Box>

          <Grid container spacing={3}>
            {advantages.map((adv) => (
              <Grid item xs={12} sm={6} md={3} key={adv.title}>
                <Card
                  sx={{
                    p: 3,
                    height: '100%',
                    textAlign: 'center',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)',
                    },
                  }}
                >
                  <Box sx={{ mb: 2 }}>{adv.icon}</Box>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                    {adv.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#4A5568' }}>
                    {adv.description}
                  </Typography>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Timeline Section */}
      <Box sx={{ py: 8 }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Typography variant="h3" sx={{ fontWeight: 600, mb: 2 }}>
              Unsere Geschichte
            </Typography>
          </Box>

          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: 2,
            }}
          >
            {timeline.map((item, index) => (
              <Box
                key={item.year}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  minWidth: 150,
                }}
              >
                <Chip
                  label={item.year}
                  sx={{
                    bgcolor: '#0077B6',
                    color: 'white',
                    fontWeight: 600,
                    fontSize: '1rem',
                    mb: 1,
                  }}
                />
                <Typography variant="body2" sx={{ textAlign: 'center', color: '#4A5568' }}>
                  {item.text}
                </Typography>
                {index < timeline.length - 1 && (
                  <Box
                    sx={{
                      display: { xs: 'none', md: 'block' },
                      position: 'absolute',
                      width: 50,
                      height: 2,
                      bgcolor: '#E2E8F0',
                      right: -30,
                      top: '50%',
                    }}
                  />
                )}
              </Box>
            ))}
          </Box>
        </Container>
      </Box>

      {/* CTA Section */}
      <Box
        sx={{
          bgcolor: '#0077B6',
          py: 8,
          textAlign: 'center',
        }}
      >
        <Container maxWidth="md">
          <Typography variant="h3" sx={{ color: 'white', fontWeight: 600, mb: 2 }}>
            Bereit für den nächsten Schritt?
          </Typography>
          <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.9)', mb: 4 }}>
            Kontaktieren Sie uns für eine persönliche Beratung oder registrieren Sie sich direkt.
          </Typography>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center">
            <Button
              variant="contained"
              size="large"
              component={Link}
              to="/kontakt"
              sx={{
                bgcolor: 'white',
                color: '#0077B6',
                px: 4,
                '&:hover': { bgcolor: '#F7FAFC' },
              }}
            >
              Kontakt aufnehmen
            </Button>
            <Button
              variant="outlined"
              size="large"
              component={Link}
              to="/anmeldung"
              sx={{
                borderColor: 'white',
                color: 'white',
                px: 4,
                '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' },
              }}
            >
              Jetzt registrieren
            </Button>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
}

export default Home;
