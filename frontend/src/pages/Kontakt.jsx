import { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  Container,
  Grid,
  TextField,
  Button,
  Stack,
  InputAdornment,
} from '@mui/material';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PersonIcon from '@mui/icons-material/Person';
import SubjectIcon from '@mui/icons-material/Subject';
import MessageIcon from '@mui/icons-material/Message';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';

function Kontakt() {
  const [formData, setFormData] = useState({
    vorname: '',
    nachname: '',
    email: '',
    telefon: '',
    betreff: '',
    nachricht: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // TODO: Implement form submission
  };

  return (
    <Box>
      {/* Hero Section */}
      <Box sx={{ bgcolor: '#F7FAFC', py: 8 }}>
        <Container maxWidth="lg">
          <Typography variant="h2" sx={{ fontWeight: 600, textAlign: 'center', mb: 2 }}>
            Kontakt
          </Typography>
          <Typography variant="h6" sx={{ color: '#4A5568', textAlign: 'center' }}>
            Wir freuen uns auf Ihre Nachricht
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Grid container spacing={4}>
          {/* Contact Form */}
          <Grid item xs={12} md={7}>
            <Card sx={{ p: 4 }}>
              <Typography variant="h5" sx={{ fontWeight: 600, mb: 3 }}>
                Nachricht senden
              </Typography>
              <form onSubmit={handleSubmit}>
                <Stack spacing={3}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Vorname"
                        name="vorname"
                        value={formData.vorname}
                        onChange={handleChange}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <PersonIcon sx={{ color: '#A0AEC0' }} />
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Nachname"
                        name="nachname"
                        value={formData.nachname}
                        onChange={handleChange}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <PersonIcon sx={{ color: '#A0AEC0' }} />
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>
                  </Grid>
                  <TextField
                    fullWidth
                    label="E-Mail"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <EmailIcon sx={{ color: '#A0AEC0' }} />
                        </InputAdornment>
                      ),
                    }}
                  />
                  <TextField
                    fullWidth
                    label="Telefon"
                    name="telefon"
                    value={formData.telefon}
                    onChange={handleChange}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <PhoneIcon sx={{ color: '#A0AEC0' }} />
                        </InputAdornment>
                      ),
                    }}
                  />
                  <TextField
                    fullWidth
                    label="Betreff"
                    name="betreff"
                    value={formData.betreff}
                    onChange={handleChange}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SubjectIcon sx={{ color: '#A0AEC0' }} />
                        </InputAdornment>
                      ),
                    }}
                  />
                  <TextField
                    fullWidth
                    label="Nachricht"
                    name="nachricht"
                    multiline
                    rows={5}
                    value={formData.nachricht}
                    onChange={handleChange}
                  />
                  <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    sx={{
                      bgcolor: '#0077B6',
                      py: 1.5,
                      '&:hover': { bgcolor: '#005A8C' },
                    }}
                  >
                    Absenden
                  </Button>
                </Stack>
              </form>
            </Card>
          </Grid>

          {/* Contact Info */}
          <Grid item xs={12} md={5}>
            <Card sx={{ p: 4, mb: 3 }}>
              <Typography variant="h5" sx={{ fontWeight: 600, mb: 3 }}>
                Kontaktdaten
              </Typography>
              <Stack spacing={3}>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                  <LocationOnIcon sx={{ color: '#0077B6', mt: 0.5 }} />
                  <Box>
                    <Typography variant="body2" sx={{ color: '#718096', mb: 0.5 }}>
                      Adresse
                    </Typography>
                    <Typography sx={{ fontWeight: 500 }}>
                      openmedical AG<br />
                      Reinacherstrasse 131<br />
                      4053 Basel, Schweiz
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                  <PhoneIcon sx={{ color: '#0077B6', mt: 0.5 }} />
                  <Box>
                    <Typography variant="body2" sx={{ color: '#718096', mb: 0.5 }}>
                      Telefon
                    </Typography>
                    <Typography sx={{ fontWeight: 500 }}>
                      +41 61 123 45 67
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                  <EmailIcon sx={{ color: '#0077B6', mt: 0.5 }} />
                  <Box>
                    <Typography variant="body2" sx={{ color: '#718096', mb: 0.5 }}>
                      E-Mail
                    </Typography>
                    <Typography sx={{ fontWeight: 500 }}>
                      info@openmedical.swiss
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                  <AccessTimeIcon sx={{ color: '#0077B6', mt: 0.5 }} />
                  <Box>
                    <Typography variant="body2" sx={{ color: '#718096', mb: 0.5 }}>
                      Öffnungszeiten
                    </Typography>
                    <Typography sx={{ fontWeight: 500 }}>
                      Mo-Fr: 08:00 - 17:00 Uhr
                    </Typography>
                  </Box>
                </Box>
              </Stack>
            </Card>

            {/* Map Placeholder */}
            <Card sx={{ overflow: 'hidden' }}>
              <Box
                sx={{
                  width: '100%',
                  height: 200,
                  bgcolor: '#E6F3F8',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Box sx={{ textAlign: 'center' }}>
                  <LocationOnIcon sx={{ fontSize: 48, color: '#0077B6', mb: 1 }} />
                  <Typography variant="body2" sx={{ color: '#4A5568' }}>
                    Google Maps Placeholder
                  </Typography>
                </Box>
              </Box>
            </Card>
          </Grid>
        </Grid>
      </Container>

      {/* Support Section */}
      <Box sx={{ bgcolor: '#F7FAFC', py: 6 }}>
        <Container maxWidth="lg">
          <Card sx={{ p: 4, textAlign: 'center' }}>
            <SupportAgentIcon sx={{ fontSize: 48, color: '#0077B6', mb: 2 }} />
            <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
              Support
            </Typography>
            <Typography variant="body1" sx={{ color: '#4A5568', mb: 3 }}>
              Benötigen Sie technische Unterstützung? Starten Sie eine Remote-Support-Sitzung.
            </Typography>
            <Button
              variant="outlined"
              sx={{
                borderColor: '#0077B6',
                color: '#0077B6',
                '&:hover': { bgcolor: '#E6F3F8' },
              }}
            >
              TeamViewer Support starten
            </Button>
          </Card>
        </Container>
      </Box>
    </Box>
  );
}

export default Kontakt;
