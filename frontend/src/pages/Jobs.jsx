import { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
  Chip,
  Stack,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const jobs = [
  { id: 1, title: 'Software Entwickler/in', type: '100%', location: 'Bern' },
  { id: 2, title: 'Support Mitarbeiter/in', type: '80-100%', location: 'Bern' },
  { id: 3, title: 'Projektleiter/in', type: '100%', location: 'Bern' },
  { id: 4, title: 'UX Designer/in', type: '60-80%', location: 'Remote' },
  { id: 5, title: 'DevOps Engineer', type: '100%', location: 'Bern' },
];

function Jobs() {
  const [expanded, setExpanded] = useState(false);

  return (
    <Box>
      <Typography variant="h3" gutterBottom>
        Jobs
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        [Aktuelle Stellenangebote bei openmedical AG]
      </Typography>

      {/* Job Listings */}
      {jobs.map((job) => (
        <Accordion
          key={job.id}
          expanded={expanded === job.id}
          onChange={() => setExpanded(expanded === job.id ? false : job.id)}
          sx={{ mb: 2 }}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, width: '100%' }}>
              <Typography variant="h6" sx={{ flex: 1 }}>
                {job.title}
              </Typography>
              <Stack direction="row" spacing={1}>
                <Chip label={job.type} size="small" variant="outlined" />
                <Chip label={job.location} size="small" variant="outlined" />
              </Stack>
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <Box sx={{ p: 2 }}>
              <Typography variant="subtitle1" gutterBottom>
                Aufgaben
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                [Aufgabenbeschreibung - Lorem ipsum dolor sit amet]
              </Typography>

              <Typography variant="subtitle1" gutterBottom>
                Anforderungen
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                [Anforderungsprofil - Lorem ipsum dolor sit amet]
              </Typography>

              <Typography variant="subtitle1" gutterBottom>
                Wir bieten
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                [Benefits - Lorem ipsum dolor sit amet]
              </Typography>

              <Button variant="contained" sx={{ mt: 2 }}>
                Jetzt bewerben
              </Button>
            </Box>
          </AccordionDetails>
        </Accordion>
      ))}

      {/* Spontaneous Application */}
      <Card sx={{ mt: 4, p: 3, bgcolor: '#e8e8e8' }}>
        <Typography variant="h6" gutterBottom>
          Keine passende Stelle gefunden?
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          [Spontanbewerbung - Wir freuen uns auf deine Bewerbung]
        </Typography>
        <Button variant="outlined">Spontan bewerben</Button>
      </Card>
    </Box>
  );
}

export default Jobs;
