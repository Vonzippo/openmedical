import { Box, Typography, Card, Container, Grid, Button, Avatar } from '@mui/material';
import { Link } from 'react-router-dom';
import BusinessIcon from '@mui/icons-material/Business';
import GroupsIcon from '@mui/icons-material/Groups';

function UeberUns() {
  const team = [
    {
      name: 'Aleandra',
      position: 'Business Development',
      description: 'Für UPW-Z VIR dangif der tewe Leveregerdy new Zofs boway in Heaneltet',
    },
    {
      name: 'Anna',
      position: 'Finance und Logistik',
      description: 'Esaciert de Beié aperung de Finans for RCöuis tom der RCCCg Finanse beissel.',
    },
    {
      name: 'Max',
      position: 'Sales',
      description: 'Leidel aur des Schiag teu obuluous Ginmamon Hai..',
    },
  ];

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          bgcolor: '#4A6FA5',
          color: 'white',
          py: 8,
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Typography variant="h3" sx={{ fontWeight: 600, mb: 3 }}>
                WAS MACHEN WIR?
              </Typography>
              <Typography variant="body1" sx={{ lineHeight: 1.8 }}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                incididunt ut labore et dolore magna dolor magna aliqua. Ut enim ad minim
                veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                nuiuipa eiex ea commodo consequat.
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h3" sx={{ fontWeight: 600, mb: 3 }}>
                WER SIND WIR?
              </Typography>
              <Typography variant="body1" sx={{ lineHeight: 1.8 }}>
                For eisterts decSectn impact Gribb it unoes apphase.des kines venodcn
                Cesedés aux ichargpos Gimenoque creative complarul fon eneseilik
                Sanveit agée femaulanen de Ionun nacnanatíge Prajessoe Jul
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* CTA Section */}
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Box sx={{ textAlign: 'center', p: 3 }}>
              <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
                DEIN DRAHT ZU UNS
              </Typography>
              <Typography variant="body2" sx={{ color: '#4A5568', mb: 3 }}>
                Wir freuen uns über Nachrichten Anruf.
              </Typography>
              <Button
                component={Link}
                to="/kontakt"
                variant="contained"
                sx={{ bgcolor: '#0077B6', '&:hover': { bgcolor: '#005A8C' } }}
              >
                KONTAKT
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box sx={{ textAlign: 'center', p: 3 }}>
              <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
                WIR SUCHEN...
              </Typography>
              <Typography variant="body2" sx={{ color: '#4A5568', mb: 3 }}>
                ...Verstarkung in den Ideul'sche Team<br />Trishiten und Marketing
              </Typography>
              <Button
                component={Link}
                to="/jobs"
                variant="contained"
                sx={{ bgcolor: '#0077B6', '&:hover': { bgcolor: '#005A8C' } }}
              >
                ZU DEN STELLEN
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Container>

      {/* Team Section */}
      <Box sx={{ bgcolor: '#F7FAFC', py: 8 }}>
        <Container maxWidth="lg">
          <Typography variant="h4" sx={{ fontWeight: 600, textAlign: 'center', mb: 6 }}>
            DAS OPENMEDICAL-TEAM
          </Typography>

          <Grid container spacing={4}>
            {team.map((member) => (
              <Grid item xs={12} md={4} key={member.name}>
                <Card sx={{ p: 3, height: '100%' }}>
                  <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                    <Avatar
                      sx={{
                        width: 80,
                        height: 80,
                        bgcolor: '#E2E8F0',
                      }}
                    >
                      <GroupsIcon sx={{ fontSize: 40, color: '#4A5568' }} />
                    </Avatar>
                    <Box>
                      <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        {member.name}
                      </Typography>
                      <Typography variant="body2" sx={{ color: '#0077B6' }}>
                        {member.position}
                      </Typography>
                    </Box>
                  </Box>
                  <Typography variant="body2" sx={{ color: '#4A5568' }}>
                    {member.description}
                  </Typography>
                  <Box sx={{ mt: 2, pt: 2, borderTop: '1px solid #E2E8F0' }}>
                    <Typography variant="caption" sx={{ color: '#718096' }}>
                      {member.name}
                    </Typography>
                    <Typography variant="caption" sx={{ display: 'block', color: '#A0AEC0' }}>
                      {member.position === 'Business Development' ? 'Business Development Manager' :
                       member.position === 'Finance und Logistik' ? 'Devepment Happiness' : 'Sales'}
                    </Typography>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Company Info */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                bgcolor: '#E6F3F8',
                p: 4,
                borderRadius: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: 300,
              }}
            >
              <BusinessIcon sx={{ fontSize: 100, color: '#0077B6', opacity: 0.5 }} />
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h4" sx={{ fontWeight: 600, mb: 3 }}>
              Über openmedical AG
            </Typography>
            <Typography variant="body1" sx={{ color: '#4A5568', mb: 2 }}>
              Seit über 20 Jahren sind wir im Schweizer Gesundheitswesen tätig und
              haben uns als führender Anbieter für sichere Kommunikationslösungen etabliert.
            </Typography>
            <Typography variant="body1" sx={{ color: '#4A5568', mb: 2 }}>
              Unsere Mission ist es, die Kommunikation zwischen Ärzten, Spitälern und
              Patienten einfacher, effizienter und sicherer zu gestalten.
            </Typography>
            <Typography variant="body1" sx={{ color: '#4A5568' }}>
              Mit über 150 Partnern und mehr als 10'000 angeschlossenen Praxen sind wir
              der vertrauenswürdige Partner für das digitale Gesundheitswesen in der Schweiz.
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default UeberUns;
