import { Box, Typography, Card, Grid, TextField, Button, Stack, Stepper, Step, StepLabel } from '@mui/material';

const steps = ['Praxisdaten', 'Kontaktperson', 'Bestätigung'];

function Anmeldung() {
  return (
    <Box>
      <Typography variant="h3" gutterBottom>
        Anmeldung
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        [Anmeldeformular für Praxen und Ärzte]
      </Typography>

      {/* Stepper */}
      <Stepper activeStep={0} sx={{ mb: 4 }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      {/* Form */}
      <Card sx={{ p: 4 }}>
        <Typography variant="h5" gutterBottom>
          Schritt 1: Praxisdaten
        </Typography>

        <Stack spacing={3}>
          {/* Practice Info */}
          <Typography variant="subtitle1" sx={{ mt: 2 }}>
            Praxisinformationen
          </Typography>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12 }}>
              <TextField fullWidth label="Praxisname *" placeholder="[Praxisname]" />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField fullWidth label="Strasse *" placeholder="[Strasse]" />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField fullWidth label="Nr." placeholder="[Nr.]" />
            </Grid>
            <Grid size={{ xs: 12, sm: 4 }}>
              <TextField fullWidth label="PLZ *" placeholder="[PLZ]" />
            </Grid>
            <Grid size={{ xs: 12, sm: 8 }}>
              <TextField fullWidth label="Ort *" placeholder="[Ort]" />
            </Grid>
          </Grid>

          {/* Contact */}
          <Typography variant="subtitle1" sx={{ mt: 2 }}>
            Kontaktdaten
          </Typography>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField fullWidth label="Telefon *" placeholder="[Telefon]" />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField fullWidth label="E-Mail *" placeholder="[E-Mail]" type="email" />
            </Grid>
          </Grid>

          {/* Software */}
          <Typography variant="subtitle1" sx={{ mt: 2 }}>
            Praxissoftware
          </Typography>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                label="Aktuelle Praxissoftware"
                placeholder="[Software auswählen]"
                select
                SelectProps={{ native: true }}
              >
                <option value="">[Bitte wählen]</option>
                <option value="1">[Software 1]</option>
                <option value="2">[Software 2]</option>
                <option value="other">[Andere]</option>
              </TextField>
            </Grid>
          </Grid>

          {/* Navigation */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
            <Button variant="outlined" disabled>
              Zurück
            </Button>
            <Button variant="contained">Weiter</Button>
          </Box>
        </Stack>
      </Card>

      {/* Info Box */}
      <Card sx={{ mt: 3, p: 2, bgcolor: '#e8e8e8' }}>
        <Typography variant="body2" color="text.secondary">
          [Hinweis: Alle mit * markierten Felder sind Pflichtfelder]
        </Typography>
      </Card>
    </Box>
  );
}

export default Anmeldung;
