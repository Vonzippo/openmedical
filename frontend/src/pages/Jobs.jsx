import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Typography,
  Card,
  Container,
  Grid,
  Button,
  Chip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import WorkIcon from '@mui/icons-material/Work';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';

function Jobs() {
  const jobs = [
    {
      id: 1,
      title: 'ICT-Supporter 1st und 2nd Level',
      type: '70-100%',
      icon: <SupportAgentIcon sx={{ fontSize: 50, color: '#0077B6' }} />,
      employment: 'Festanstellung',
      location: 'Schweiz',
      tasks: [
        'Unterstützung unserer Kunden bei oder Nutzung unserer Programme',
        'Bearbeitung von Anfragen bestehender Kunden sowie neuer Kunden.',
        'Beratung und Begleitung der Neukunden von der Anfrage bis zur internarsetshrra',
        'Installation unserer Software auf kundons genen Syslemen in Aburtéelkunn Drim Anbattelin int I Schidung und Anihauch Partner',
        'Eingejeinnelen. von Anfragen, Slezungenveldungen und muse tiefung von Verschiegen und ostengswagen',
        'Zeitnahe Dokumentation der Itongkeilen'
      ],
      requirements: [
        'Abgezchlorsene Benlcausbrldung. von Vörtelln der IT',
        'Basche Auflassungeaabe und hehe Affinnai, zer FI',
        'Guré Kormsrow ia Windowe, Nethvalkachnologien mactó von Vessi Lider Beretschisal\'ter Binstlkeftung',
        'Hiche :otude Kompetero und-stuayjor sangepake Komunikation',
        'Strisichest Sor\'chgewendiheit in Destsch (Mundeit willnomin), hillerticy - Lider Flanessichhehrilnisse sind en-Pus',
        'Qusiliétsbewurstséem'
      ],
      benefits: [
        'Ein dynamisches Aberlsumléd mit Frenaum für Idtes. und Kextólritie',
        'Elm foern aul merschlicher Ebenc, in dem sich jeder Irstoniger kami',
        'Flache Hezatchien',
        'Eine tarsusfodends Aufgabe, mit Verantwortung und Iorstlulänge(dediunr',
        'Musiben in spannenden Projekten in einem praliwemen lesar',
        'Abnechslungerehe fullgaben',
        'Fext sugswigsener Arbelrsaleie. und feste Arbeitszelten'
      ]
    },
    {
      id: 2,
      title: 'Werkstudent:in Softwareentwicklung',
      type: '40-80%',
      employment: 'Werkstudent',
      location: 'Schweiz',
      icon: <WorkIcon sx={{ fontSize: 50, color: '#0077B6' }} />,
    },
    {
      id: 3,
      title: 'Koordinator:in Datenschutz',
      type: '40-100%',
      employment: 'Festanstellung',
      location: 'Schweiz',
      icon: <WorkIcon sx={{ fontSize: 50, color: '#0077B6' }} />,
    },
    {
      id: 4,
      title: 'Social Media Manager:in',
      type: '40-100%',
      employment: 'Festanstellung',
      location: 'Schweiz',
      icon: <WorkIcon sx={{ fontSize: 50, color: '#0077B6' }} />,
    },
  ];

  const [selectedJob, setSelectedJob] = useState(jobs[0]);

  return (
    <Box>
      {/* Hero Section */}
      <Box sx={{ bgcolor: '#F7FAFC', py: 8 }}>
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={7}>
              <Typography variant="h2" sx={{ fontWeight: 600, mb: 2 }}>
                Karriere
              </Typography>
              <Typography variant="h5" sx={{ color: '#4A5568', mb: 4 }}>
                Gestalten Sie die Zukunft des Gesundheitssektors.
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                <Button
                  variant="contained"
                  sx={{ bgcolor: '#0077B6', '&:hover': { bgcolor: '#005A8C' } }}
                >
                  Jobs entdecken
                </Button>
                <Button
                  variant="outlined"
                  sx={{ borderColor: '#0077B6', color: '#0077B6' }}
                >
                  Mehr Infos anfordern
                </Button>
              </Box>
              <Typography variant="body1" sx={{ color: '#4A5568', mt: 4 }}>
                Als Anbieter von eHealth-Prozess gestalom unsentehmrender Zukunft des Gesundh-
                Heltsiextors. Wir unterstutzen unsere Kunden bel der Erbringung ihrer medi-
                zinischen Leistung und vereinfachen die Kommunikation von über 10.000.
              </Typography>
            </Grid>
            <Grid item xs={12} md={5}>
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <TrendingUpIcon sx={{ fontSize: 200, color: '#0077B6', opacity: 0.3 }} />
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Job Listings */}
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Grid container spacing={2}>
          {jobs.map((job) => (
            <Grid item xs={12} sm={6} key={job.id}>
              <Card
                sx={{
                  p: 3,
                  cursor: 'pointer',
                  border: selectedJob?.id === job.id ? '2px solid #0077B6' : '1px solid #E2E8F0',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    borderColor: '#0077B6',
                  },
                }}
                onClick={() => setSelectedJob(job)}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <CheckCircleIcon sx={{ color: '#0077B6' }} />
                  <Box>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                      {job.title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#718096' }}>
                      {job.type}
                    </Typography>
                  </Box>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Job Details */}
      {selectedJob && (
        <Box sx={{ bgcolor: '#F7FAFC', py: 8 }}>
          <Container maxWidth="lg">
            <Grid container spacing={4}>
              <Grid item xs={12} md={7}>
                <Typography variant="h3" sx={{ fontWeight: 600, mb: 2 }}>
                  {selectedJob.title}
                </Typography>
                <Typography variant="h5" sx={{ color: '#0077B6', mb: 4 }}>
                  {selectedJob.type}
                </Typography>

                <Box sx={{ display: 'flex', gap: 3, mb: 4 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <WorkIcon sx={{ color: '#718096' }} />
                    <Typography variant="body2">{selectedJob.employment}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <LocationOnIcon sx={{ color: '#0077B6' }} />
                    <Typography variant="body2">{selectedJob.location}</Typography>
                  </Box>
                </Box>

                {selectedJob.tasks && (
                  <>
                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                      Ihr Aufgabengebiet
                    </Typography>
                    <List dense>
                      {selectedJob.tasks.map((task, i) => (
                        <ListItem key={i}>
                          <ListItemIcon sx={{ minWidth: 32 }}>
                            <Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: '#0077B6' }} />
                          </ListItemIcon>
                          <ListItemText primary={task} />
                        </ListItem>
                      ))}
                    </List>

                    <Typography variant="h6" sx={{ fontWeight: 600, mt: 4, mb: 2 }}>
                      Ihre Qualifikationen
                    </Typography>
                    <List dense>
                      {selectedJob.requirements.map((req, i) => (
                        <ListItem key={i}>
                          <ListItemIcon sx={{ minWidth: 32 }}>
                            <Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: '#0077B6' }} />
                          </ListItemIcon>
                          <ListItemText primary={req} />
                        </ListItem>
                      ))}
                    </List>
                  </>
                )}
              </Grid>

              <Grid item xs={12} md={5}>
                <Card sx={{ p: 4 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
                    {selectedJob.icon}
                  </Box>

                  {selectedJob.benefits && (
                    <>
                      <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                        Wir bieten
                      </Typography>
                      <List dense>
                        {selectedJob.benefits.map((benefit, i) => (
                          <ListItem key={i}>
                            <ListItemIcon sx={{ minWidth: 32 }}>
                              <CheckCircleIcon sx={{ fontSize: 18, color: '#48BB78' }} />
                            </ListItemIcon>
                            <ListItemText primary={benefit} primaryTypographyProps={{ variant: 'body2' }} />
                          </ListItem>
                        ))}
                      </List>
                    </>
                  )}

                  <Box sx={{ mt: 4, p: 2, bgcolor: '#E6F3F8', borderRadius: 2 }}>
                    <Typography variant="body2" sx={{ mb: 1 }}>
                      Wir fjsuen uns auf Ilve Unterulagem an
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#0077B6', fontWeight: 600 }}>
                      jobs@openmedical.swiss
                    </Typography>
                  </Box>

                  <Button
                    variant="contained"
                    fullWidth
                    sx={{ mt: 3, bgcolor: '#0077B6', '&:hover': { bgcolor: '#005A8C' } }}
                  >
                    Jetzt bewerben
                  </Button>
                </Card>
              </Grid>
            </Grid>
          </Container>
        </Box>
      )}

      {/* Spontaneous Application */}
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Card sx={{ p: 4, textAlign: 'center', bgcolor: '#F7FAFC' }}>
          <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
            Keine passende Stelle gefunden?
          </Typography>
          <Typography variant="body1" sx={{ color: '#4A5568', mb: 3 }}>
            Wir freuen uns auf Ihre Spontanbewerbung!
          </Typography>
          <Button
            variant="outlined"
            sx={{ borderColor: '#0077B6', color: '#0077B6' }}
          >
            Spontan bewerben
          </Button>
        </Card>
      </Container>
    </Box>
  );
}

export default Jobs;
