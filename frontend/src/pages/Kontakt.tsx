import { Box, Typography, Card, Grid, TextField, Button, Stack } from '@mui/material';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

function Kontakt() {
  return (
    <Box>
      <Typography variant="h3" gutterBottom>
        Kontakt
      </Typography>

      <Grid container spacing={4}>
        {/* Contact Form */}
        <Grid size={{ xs: 12, md: 7 }}>
          <Card sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom>
              Nachricht senden
            </Typography>
            <Stack spacing={3}>
              <Grid container spacing={2}>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField fullWidth label="Vorname" placeholder="[Vorname]" />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField fullWidth label="Nachname" placeholder="[Nachname]" />
                </Grid>
              </Grid>
              <TextField fullWidth label="E-Mail" placeholder="[E-Mail Adresse]" type="email" />
              <TextField fullWidth label="Telefon" placeholder="[Telefonnummer]" />
              <TextField fullWidth label="Betreff" placeholder="[Betreff]" />
              <TextField
                fullWidth
                label="Nachricht"
                placeholder="[Ihre Nachricht]"
                multiline
                rows={4}
              />
              <Button variant="contained" size="large">
                Absenden
              </Button>
            </Stack>
          </Card>
        </Grid>

        {/* Contact Info */}
        <Grid size={{ xs: 12, md: 5 }}>
          <Card sx={{ p: 3, mb: 3 }}>
            <Typography variant="h5" gutterBottom>
              Kontaktdaten
            </Typography>
            <Stack spacing={2}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <LocationOnIcon color="action" />
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Adresse
                  </Typography>
                  <Typography>[Strasse, PLZ Ort]</Typography>
                </Box>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <PhoneIcon color="action" />
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Telefon
                  </Typography>
                  <Typography>[+41 XX XXX XX XX]</Typography>
                </Box>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <EmailIcon color="action" />
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    E-Mail
                  </Typography>
                  <Typography>[info@openmedical.ch]</Typography>
                </Box>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <AccessTimeIcon color="action" />
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Öffnungszeiten
                  </Typography>
                  <Typography>[Mo-Fr: 08:00-17:00]</Typography>
                </Box>
              </Box>
            </Stack>
          </Card>

          {/* Map Placeholder */}
          <Card sx={{ p: 0, overflow: 'hidden' }}>
            <Box
              sx={{
                width: '100%',
                height: 200,
                bgcolor: '#ddd',
                border: '2px dashed #999',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Typography color="text.secondary">[GOOGLE MAPS]</Typography>
            </Box>
          </Card>
        </Grid>
      </Grid>

      {/* Support Section */}
      <Card sx={{ mt: 6, p: 3, bgcolor: '#e8e8e8' }}>
        <Typography variant="h6" gutterBottom>
          Support
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          [TeamViewer Support - Für Remote-Unterstützung]
        </Typography>
        <Button variant="outlined">TeamViewer starten</Button>
      </Card>
    </Box>
  );
}

export default Kontakt;
