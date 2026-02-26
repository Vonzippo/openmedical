import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
  Box,
  Typography,
  Card,
  Grid,
  TextField,
  Button,
  Stack,
  Stepper,
  Step,
  StepLabel,
  Alert,
  CircularProgress,
  MenuItem,
} from '@mui/material';
import api from '../services/api';

// Yup Validierungsschema - Clientseitige Validierung
const schemaStep1 = yup.object({
  praxisname: yup.string().required('Praxisname ist erforderlich'),
  strasse: yup.string().required('Strasse ist erforderlich'),
  hausnummer: yup.string(),
  plz: yup
    .string()
    .required('PLZ ist erforderlich')
    .matches(/^\d{4}$/, 'PLZ muss 4 Ziffern haben'),
  ort: yup.string().required('Ort ist erforderlich'),
  telefon: yup
    .string()
    .required('Telefon ist erforderlich')
    .matches(/^[\d\s+]+$/, 'Ungültige Telefonnummer'),
  email: yup
    .string()
    .required('E-Mail ist erforderlich')
    .email('Ungültige E-Mail-Adresse'),
  software: yup.string(),
});

const schemaStep2 = yup.object({
  anrede: yup.string().required('Anrede ist erforderlich'),
  vorname: yup.string().required('Vorname ist erforderlich'),
  nachname: yup.string().required('Nachname ist erforderlich'),
  funktion: yup.string(),
  kontaktEmail: yup
    .string()
    .required('E-Mail ist erforderlich')
    .email('Ungültige E-Mail-Adresse'),
  kontaktTelefon: yup.string(),
});

type FormDataStep1 = yup.InferType<typeof schemaStep1>;
type FormDataStep2 = yup.InferType<typeof schemaStep2>;

const steps = ['Praxisdaten', 'Kontaktperson', 'Bestätigung'];

const softwareOptions = [
  { value: '', label: 'Bitte wählen' },
  { value: 'ines', label: 'INES' },
  { value: 'vitomed', label: 'Vitomed' },
  { value: 'aeskulap', label: 'Aeskulap' },
  { value: 'triamed', label: 'TriaMed' },
  { value: 'tomedo', label: 'tomedo' },
  { value: 'other', label: 'Andere' },
];

function Anmeldung() {
  const [activeStep, setActiveStep] = useState(0);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [practiceId, setPracticeId] = useState<string | null>(null);

  // react-hook-form für Step 1 - Echtzeit State-Verwaltung
  const formStep1 = useForm<FormDataStep1>({
    resolver: yupResolver(schemaStep1),
    mode: 'onChange', // Echtzeit-Validierung bei jeder Änderung
    defaultValues: {
      praxisname: '',
      strasse: '',
      hausnummer: '',
      plz: '',
      ort: '',
      telefon: '',
      email: '',
      software: '',
    },
  });

  // react-hook-form für Step 2
  const formStep2 = useForm<FormDataStep2>({
    resolver: yupResolver(schemaStep2),
    mode: 'onChange',
    defaultValues: {
      anrede: '',
      vorname: '',
      nachname: '',
      funktion: '',
      kontaktEmail: '',
      kontaktTelefon: '',
    },
  });

  const handleNext = async () => {
    if (activeStep === 0) {
      const isValid = await formStep1.trigger();
      if (isValid) setActiveStep(1);
    } else if (activeStep === 1) {
      const isValid = await formStep2.trigger();
      if (isValid) setActiveStep(2);
    }
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  // Absenden - HTTP-Anfrage an Server (Axios, AJAX, asynchron)
  const handleSubmit = async () => {
    setSubmitStatus('loading');
    setErrorMessage('');

    // Datenobjekt (JSON) für den Server
    const practiceData = {
      ...formStep1.getValues(),
      contact: formStep2.getValues(),
    };

    try {
      // POST Request an Backend - Request-Response-Prinzip
      const response = await api.post('/practices', practiceData);
      setPracticeId(response.data.data.id);
      setSubmitStatus('success');
    } catch (error: any) {
      setSubmitStatus('error');
      setErrorMessage(
        error.response?.data?.error || 'Ein Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.'
      );
    }
  };

  // Step 1: Praxisdaten
  const renderStep1 = () => (
    <Stack spacing={3}>
      <Typography variant="subtitle1" fontWeight="medium">
        Praxisinformationen
      </Typography>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12 }}>
          <TextField
            fullWidth
            label="Praxisname"
            required
            {...formStep1.register('praxisname')}
            error={!!formStep1.formState.errors.praxisname}
            helperText={formStep1.formState.errors.praxisname?.message}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 8 }}>
          <TextField
            fullWidth
            label="Strasse"
            required
            {...formStep1.register('strasse')}
            error={!!formStep1.formState.errors.strasse}
            helperText={formStep1.formState.errors.strasse?.message}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 4 }}>
          <TextField
            fullWidth
            label="Nr."
            {...formStep1.register('hausnummer')}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 4 }}>
          <TextField
            fullWidth
            label="PLZ"
            required
            {...formStep1.register('plz')}
            error={!!formStep1.formState.errors.plz}
            helperText={formStep1.formState.errors.plz?.message}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 8 }}>
          <TextField
            fullWidth
            label="Ort"
            required
            {...formStep1.register('ort')}
            error={!!formStep1.formState.errors.ort}
            helperText={formStep1.formState.errors.ort?.message}
          />
        </Grid>
      </Grid>

      <Typography variant="subtitle1" fontWeight="medium" sx={{ mt: 2 }}>
        Kontaktdaten
      </Typography>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            fullWidth
            label="Telefon"
            required
            {...formStep1.register('telefon')}
            error={!!formStep1.formState.errors.telefon}
            helperText={formStep1.formState.errors.telefon?.message}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            fullWidth
            label="E-Mail"
            type="email"
            required
            {...formStep1.register('email')}
            error={!!formStep1.formState.errors.email}
            helperText={formStep1.formState.errors.email?.message}
          />
        </Grid>
      </Grid>

      <Typography variant="subtitle1" fontWeight="medium" sx={{ mt: 2 }}>
        Praxissoftware
      </Typography>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12 }}>
          <TextField
            fullWidth
            label="Aktuelle Praxissoftware"
            select
            {...formStep1.register('software')}
            defaultValue=""
          >
            {softwareOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
      </Grid>
    </Stack>
  );

  // Step 2: Kontaktperson
  const renderStep2 = () => (
    <Stack spacing={3}>
      <Typography variant="subtitle1" fontWeight="medium">
        Ansprechperson
      </Typography>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, sm: 4 }}>
          <TextField
            fullWidth
            label="Anrede"
            select
            required
            {...formStep2.register('anrede')}
            error={!!formStep2.formState.errors.anrede}
            helperText={formStep2.formState.errors.anrede?.message}
            defaultValue=""
          >
            <MenuItem value="">Bitte wählen</MenuItem>
            <MenuItem value="herr">Herr</MenuItem>
            <MenuItem value="frau">Frau</MenuItem>
            <MenuItem value="divers">Divers</MenuItem>
          </TextField>
        </Grid>
        <Grid size={{ xs: 12, sm: 4 }}>
          <TextField
            fullWidth
            label="Vorname"
            required
            {...formStep2.register('vorname')}
            error={!!formStep2.formState.errors.vorname}
            helperText={formStep2.formState.errors.vorname?.message}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 4 }}>
          <TextField
            fullWidth
            label="Nachname"
            required
            {...formStep2.register('nachname')}
            error={!!formStep2.formState.errors.nachname}
            helperText={formStep2.formState.errors.nachname?.message}
          />
        </Grid>
        <Grid size={{ xs: 12 }}>
          <TextField
            fullWidth
            label="Funktion"
            {...formStep2.register('funktion')}
            placeholder="z.B. Praxisinhaber, MPA, IT-Verantwortlicher"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            fullWidth
            label="E-Mail"
            type="email"
            required
            {...formStep2.register('kontaktEmail')}
            error={!!formStep2.formState.errors.kontaktEmail}
            helperText={formStep2.formState.errors.kontaktEmail?.message}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            fullWidth
            label="Telefon direkt"
            {...formStep2.register('kontaktTelefon')}
          />
        </Grid>
      </Grid>
    </Stack>
  );

  // Step 3: Bestätigung
  const renderStep3 = () => {
    const step1Data = formStep1.getValues();
    const step2Data = formStep2.getValues();

    return (
      <Stack spacing={3}>
        {submitStatus === 'success' ? (
          <Alert severity="success">
            <Typography variant="subtitle1" fontWeight="medium">
              Anmeldung erfolgreich!
            </Typography>
            <Typography variant="body2">
              Ihre Praxis wurde erfolgreich registriert.
              {practiceId && ` Referenz-ID: ${practiceId}`}
            </Typography>
          </Alert>
        ) : (
          <>
            <Typography variant="subtitle1" fontWeight="medium">
              Bitte überprüfen Sie Ihre Angaben
            </Typography>

            <Card variant="outlined" sx={{ p: 2 }}>
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                Praxisdaten
              </Typography>
              <Typography><strong>Praxis:</strong> {step1Data.praxisname}</Typography>
              <Typography>
                <strong>Adresse:</strong> {step1Data.strasse} {step1Data.hausnummer}, {step1Data.plz} {step1Data.ort}
              </Typography>
              <Typography><strong>Telefon:</strong> {step1Data.telefon}</Typography>
              <Typography><strong>E-Mail:</strong> {step1Data.email}</Typography>
              {step1Data.software && (
                <Typography><strong>Software:</strong> {step1Data.software}</Typography>
              )}
            </Card>

            <Card variant="outlined" sx={{ p: 2 }}>
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                Kontaktperson
              </Typography>
              <Typography>
                <strong>Name:</strong> {step2Data.anrede} {step2Data.vorname} {step2Data.nachname}
              </Typography>
              {step2Data.funktion && (
                <Typography><strong>Funktion:</strong> {step2Data.funktion}</Typography>
              )}
              <Typography><strong>E-Mail:</strong> {step2Data.kontaktEmail}</Typography>
              {step2Data.kontaktTelefon && (
                <Typography><strong>Telefon:</strong> {step2Data.kontaktTelefon}</Typography>
              )}
            </Card>

            {submitStatus === 'error' && (
              <Alert severity="error">{errorMessage}</Alert>
            )}
          </>
        )}
      </Stack>
    );
  };

  return (
    <Box>
      <Typography variant="h3" gutterBottom>
        Anmeldung
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Anmeldeformular für Praxen und Ärzte
      </Typography>

      {/* Stepper */}
      <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      {/* Form */}
      <Card sx={{ p: 4 }}>
        <Typography variant="h5" gutterBottom>
          {steps[activeStep]}
        </Typography>

        {activeStep === 0 && renderStep1()}
        {activeStep === 1 && renderStep2()}
        {activeStep === 2 && renderStep3()}

        {/* Navigation */}
        {submitStatus !== 'success' && (
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
            <Button variant="outlined" onClick={handleBack} disabled={activeStep === 0}>
              Zurück
            </Button>
            {activeStep < 2 ? (
              <Button variant="contained" onClick={handleNext}>
                Weiter
              </Button>
            ) : (
              <Button
                variant="contained"
                onClick={handleSubmit}
                disabled={submitStatus === 'loading'}
                startIcon={submitStatus === 'loading' ? <CircularProgress size={20} /> : null}
              >
                {submitStatus === 'loading' ? 'Wird gesendet...' : 'Anmeldung absenden'}
              </Button>
            )}
          </Box>
        )}
      </Card>

      {/* Info Box */}
      <Card sx={{ mt: 3, p: 2, bgcolor: '#f5f5f5' }}>
        <Typography variant="body2" color="text.secondary">
          Alle mit * markierten Felder sind Pflichtfelder. Ihre Daten werden verschlüsselt übertragen (HTTPS).
        </Typography>
      </Card>
    </Box>
  );
}

export default Anmeldung;
