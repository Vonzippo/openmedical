import { Box, Typography, Button, Card, CardContent, Grid, Stack } from '@mui/material';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <Box>
      {/* Hero Section */}
      <Card sx={{ mb: 4, p: 4, textAlign: 'center', bgcolor: '#e8e8e8' }}>
        <Typography variant="h3" gutterBottom>
          EINFACH, EFFIZIENT UND SICHER
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ mb: 3 }}>
          [Hero Subtitle - Beschreibung der Dienstleistung]
        </Typography>
        <Box
          sx={{
            width: '100%',
            height: 200,
            bgcolor: '#ddd',
            border: '2px dashed #999',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mb: 3,
          }}
        >
          <Typography color="text.secondary">[HERO IMAGE PLACEHOLDER]</Typography>
        </Box>
        <Stack direction="row" spacing={2} justifyContent="center">
          <Button variant="contained" size="large">
            Jetzt registrieren
          </Button>
          <Button variant="outlined" size="large">
            Mehr erfahren
          </Button>
        </Stack>
      </Card>

      {/* Features Section */}
      <Typography variant="h4" gutterBottom sx={{ mb: 3 }}>
        Unsere Leistungen
      </Typography>
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {[1, 2, 3].map((item) => (
          <Grid item xs={12} md={4} key={item}>
            <Card sx={{ height: '100%', p: 2 }}>
              <Box
                sx={{
                  width: 60,
                  height: 60,
                  bgcolor: '#ddd',
                  border: '2px dashed #999',
                  mb: 2,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Typography variant="caption">ICON</Typography>
              </Box>
              <CardContent sx={{ p: 0 }}>
                <Typography variant="h6" gutterBottom>
                  [Feature {item} Titel]
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  [Beschreibung der Feature {item} - Lorem ipsum dolor sit amet]
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* About Preview */}
      <Card sx={{ mb: 4, p: 3 }}>
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography variant="h5" gutterBottom>
              Über openmedical
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
              [Kurze Beschreibung - 20+ Jahre Erfahrung im Schweizer Gesundheitswesen]
            </Typography>
            <Button variant="outlined" component={Link} to="/ueber-uns">
              Mehr erfahren
            </Button>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                width: '100%',
                height: 150,
                bgcolor: '#ddd',
                border: '2px dashed #999',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Typography color="text.secondary">[IMAGE PLACEHOLDER]</Typography>
            </Box>
          </Grid>
        </Grid>
      </Card>

      {/* CTA Section */}
      <Card sx={{ p: 4, textAlign: 'center', bgcolor: '#e0e0e0' }}>
        <Typography variant="h5" gutterBottom>
          Bereit für den nächsten Schritt?
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          [Call-to-Action Beschreibung]
        </Typography>
        <Button variant="contained" size="large" component={Link} to="/kontakt">
          Kontakt aufnehmen
        </Button>
      </Card>
    </Box>
  );
}

export default Home;
