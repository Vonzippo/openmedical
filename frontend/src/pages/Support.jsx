import {
  Box,
  Typography,
  Card,
  Container,
  Grid,
  Button,
  Stack,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import DescriptionIcon from '@mui/icons-material/Description';
import ComputerIcon from '@mui/icons-material/Computer';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { Link } from 'react-router-dom';

function Support() {
  const faqs = [
    {
      question: 'Wie kann ich mich bei mednet anmelden?',
      answer: 'Sie können sich über unsere Webseite oder die Desktop-Anwendung anmelden. Geben Sie dazu Ihre Zugangsdaten ein, die Sie bei der Registrierung erhalten haben.',
    },
    {
      question: 'Was tun bei Verbindungsproblemen?',
      answer: 'Überprüfen Sie zunächst Ihre Internetverbindung. Falls das Problem weiterhin besteht, starten Sie die Anwendung neu. Bei anhaltenden Problemen kontaktieren Sie unseren Support.',
    },
    {
      question: 'Wie aktualisiere ich die Software?',
      answer: 'Die Software aktualisiert sich in der Regel automatisch. Sie können Updates auch manuell über Einstellungen > Updates prüfen anstoßen.',
    },
    {
      question: 'Wo finde ich die Dokumentation?',
      answer: 'Die vollständige Dokumentation finden Sie in unserem Kundenportal unter dem Bereich "Hilfe & Dokumentation".',
    },
    {
      question: 'Wie richte ich einen neuen Benutzer ein?',
      answer: 'Neue Benutzer können über das Admin-Panel hinzugefügt werden. Gehen Sie zu Einstellungen > Benutzerverwaltung > Neuer Benutzer.',
    },
  ];

  return (
    <Box>
      {/* Hero Section */}
      <Box sx={{ bgcolor: '#F7FAFC', py: 8 }}>
        <Container maxWidth="lg">
          <Typography variant="h2" sx={{ fontWeight: 600, textAlign: 'center', mb: 2 }}>
            Support
          </Typography>
          <Typography variant="h6" sx={{ color: '#4A5568', textAlign: 'center' }}>
            Wir sind für Sie da - schnell, kompetent und zuverlässig
          </Typography>
        </Container>
      </Box>

      {/* Support Options */}
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Grid container spacing={4}>
          {/* Remote Support */}
          <Grid item xs={12} md={4}>
            <Card sx={{ p: 4, textAlign: 'center', height: '100%' }}>
              <ComputerIcon sx={{ fontSize: 50, color: '#0077B6', mb: 2 }} />
              <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
                Remote Support
              </Typography>
              <Typography variant="body2" sx={{ color: '#718096', mb: 3 }}>
                Starten Sie eine Remote-Support-Sitzung für schnelle Hilfe direkt auf Ihrem Computer.
              </Typography>
              <Button
                variant="contained"
                fullWidth
                sx={{
                  bgcolor: '#0077B6',
                  '&:hover': { bgcolor: '#005A8C' },
                }}
              >
                TeamViewer starten
              </Button>
            </Card>
          </Grid>

          {/* Phone Support */}
          <Grid item xs={12} md={4}>
            <Card sx={{ p: 4, textAlign: 'center', height: '100%' }}>
              <PhoneIcon sx={{ fontSize: 50, color: '#0077B6', mb: 2 }} />
              <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
                Telefon Support
              </Typography>
              <Typography variant="body2" sx={{ color: '#718096', mb: 2 }}>
                Rufen Sie uns an für persönliche Beratung und Unterstützung.
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 600, color: '#0077B6', mb: 1 }}>
                +41 61 123 45 67
              </Typography>
              <Typography variant="body2" sx={{ color: '#718096' }}>
                Mo-Fr: 08:00 - 17:00 Uhr
              </Typography>
            </Card>
          </Grid>

          {/* Email Support */}
          <Grid item xs={12} md={4}>
            <Card sx={{ p: 4, textAlign: 'center', height: '100%' }}>
              <EmailIcon sx={{ fontSize: 50, color: '#0077B6', mb: 2 }} />
              <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
                E-Mail Support
              </Typography>
              <Typography variant="body2" sx={{ color: '#718096', mb: 2 }}>
                Schreiben Sie uns eine E-Mail - wir antworten innerhalb von 24 Stunden.
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 600, color: '#0077B6' }}>
                support@openmedical.swiss
              </Typography>
            </Card>
          </Grid>
        </Grid>
      </Container>

      {/* FAQ Section */}
      <Box sx={{ bgcolor: '#F7FAFC', py: 6 }}>
        <Container maxWidth="md">
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <HelpOutlineIcon sx={{ fontSize: 40, color: '#0077B6', mb: 2 }} />
            <Typography variant="h4" sx={{ fontWeight: 600, mb: 1 }}>
              Häufig gestellte Fragen
            </Typography>
            <Typography variant="body1" sx={{ color: '#718096' }}>
              Finden Sie schnelle Antworten auf häufige Fragen
            </Typography>
          </Box>

          <Stack spacing={2}>
            {faqs.map((faq, index) => (
              <Accordion
                key={index}
                sx={{
                  boxShadow: 'none',
                  border: '1px solid #E2E8F0',
                  '&:before': { display: 'none' },
                  borderRadius: '8px !important',
                  '&.Mui-expanded': {
                    margin: 0,
                  },
                }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon sx={{ color: '#0077B6' }} />}
                  sx={{ py: 1 }}
                >
                  <Typography sx={{ fontWeight: 500 }}>{faq.question}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography variant="body2" sx={{ color: '#718096' }}>
                    {faq.answer}
                  </Typography>
                </AccordionDetails>
              </Accordion>
            ))}
          </Stack>
        </Container>
      </Box>

      {/* Documentation Section */}
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
            <DescriptionIcon sx={{ fontSize: 60, color: '#0077B6', mb: 2 }} />
            <Typography variant="h4" sx={{ fontWeight: 600, mb: 2 }}>
              Dokumentation
            </Typography>
            <Typography variant="body1" sx={{ color: '#718096', mb: 3 }}>
              Umfassende Anleitungen, Tutorials und technische Dokumentation für alle unsere Produkte.
            </Typography>
            <Button
              variant="outlined"
              sx={{
                borderColor: '#0077B6',
                color: '#0077B6',
                '&:hover': { bgcolor: '#E6F3F8' },
              }}
            >
              Dokumentation öffnen
            </Button>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card sx={{ p: 4, bgcolor: '#E6F3F8' }}>
              <Stack spacing={2}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#0077B6' }} />
                  <Typography>Installationsanleitungen</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#0077B6' }} />
                  <Typography>Benutzerhandbücher</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#0077B6' }} />
                  <Typography>API Dokumentation</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#0077B6' }} />
                  <Typography>Versionshinweise</Typography>
                </Box>
              </Stack>
            </Card>
          </Grid>
        </Grid>
      </Container>

      {/* Contact CTA */}
      <Box sx={{ bgcolor: '#0077B6', py: 6 }}>
        <Container maxWidth="md" sx={{ textAlign: 'center' }}>
          <SupportAgentIcon sx={{ fontSize: 50, color: 'white', mb: 2 }} />
          <Typography variant="h4" sx={{ color: 'white', fontWeight: 600, mb: 2 }}>
            Benötigen Sie weitere Hilfe?
          </Typography>
          <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.9)', mb: 4 }}>
            Unser Support-Team steht Ihnen gerne zur Verfügung. Kontaktieren Sie uns!
          </Typography>
          <Button
            component={Link}
            to="/kontakt"
            variant="contained"
            size="large"
            sx={{
              bgcolor: 'white',
              color: '#0077B6',
              '&:hover': { bgcolor: '#F7FAFC' },
            }}
          >
            Kontakt aufnehmen
          </Button>
        </Container>
      </Box>
    </Box>
  );
}

export default Support;
