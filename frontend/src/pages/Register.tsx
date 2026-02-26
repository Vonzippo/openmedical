import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
  Box,
  Typography,
  Card,
  TextField,
  Button,
  Stack,
  Alert,
  CircularProgress,
} from '@mui/material';
import { useAppDispatch, useAppSelector } from '../store';
import { register as registerUser, clearError } from '../store/slices/authSlice';

const schema = yup.object({
  email: yup
    .string()
    .required('E-Mail ist erforderlich')
    .email('Ungültige E-Mail-Adresse'),
  password: yup
    .string()
    .required('Passwort ist erforderlich')
    .min(8, 'Passwort muss mindestens 8 Zeichen haben'),
  confirmPassword: yup
    .string()
    .required('Passwort bestätigen')
    .oneOf([yup.ref('password')], 'Passwörter stimmen nicht überein'),
});

type FormData = yup.InferType<typeof schema>;

function Register() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isLoading, error, isAuthenticated } = useAppSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  // Redirect wenn bereits eingeloggt
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  // Fehler zurücksetzen beim Verlassen
  useEffect(() => {
    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);

  const onSubmit = async (data: FormData) => {
    const result = await dispatch(registerUser({
      email: data.email,
      password: data.password,
    }));
    if (registerUser.fulfilled.match(result)) {
      navigate('/dashboard');
    }
  };

  return (
    <Box sx={{ maxWidth: 400, mx: 'auto', mt: 8 }}>
      <Card sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom textAlign="center">
          Registrieren
        </Typography>
        <Typography variant="body2" color="text.secondary" textAlign="center" sx={{ mb: 3 }}>
          Erstellen Sie ein neues Benutzerkonto
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={3}>
            <TextField
              fullWidth
              label="E-Mail"
              type="email"
              {...register('email')}
              error={!!errors.email}
              helperText={errors.email?.message}
              autoComplete="email"
            />
            <TextField
              fullWidth
              label="Passwort"
              type="password"
              {...register('password')}
              error={!!errors.password}
              helperText={errors.password?.message}
              autoComplete="new-password"
            />
            <TextField
              fullWidth
              label="Passwort bestätigen"
              type="password"
              {...register('confirmPassword')}
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword?.message}
              autoComplete="new-password"
            />
            <Button
              type="submit"
              variant="contained"
              size="large"
              fullWidth
              disabled={isLoading}
              startIcon={isLoading ? <CircularProgress size={20} /> : null}
            >
              {isLoading ? 'Wird registriert...' : 'Registrieren'}
            </Button>
          </Stack>
        </form>

        <Box sx={{ mt: 3, textAlign: 'center' }}>
          <Typography variant="body2">
            Bereits ein Konto?{' '}
            <Link to="/login" style={{ color: 'inherit' }}>
              Jetzt anmelden
            </Link>
          </Typography>
        </Box>
      </Card>
    </Box>
  );
}

export default Register;
