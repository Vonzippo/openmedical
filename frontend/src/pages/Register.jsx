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
  Container,
  InputAdornment,
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import { useAppDispatch, useAppSelector } from '../store';
import { register as registerUser, clearError } from '../store/slices/authSlice';

const schema = yup.object({
  benutzername: yup
    .string()
    .required('Benutzername ist erforderlich'),
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

function Register() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isLoading, error, isAuthenticated } = useAppSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);

  const onSubmit = async (data) => {
    const result = await dispatch(registerUser({
      email: data.email,
      password: data.password,
    }));
    if (registerUser.fulfilled.match(result)) {
      navigate('/dashboard');
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #E6F3F8 0%, #F7FAFC 100%)',
        display: 'flex',
        alignItems: 'center',
        py: 4,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Decorative Elements */}
      <Box sx={{ position: 'absolute', top: 80, left: 100, opacity: 0.2 }}>
        <FavoriteIcon sx={{ fontSize: 40, color: '#0077B6' }} />
      </Box>
      <Box sx={{ position: 'absolute', bottom: 80, right: 100, opacity: 0.2 }}>
        <LocalHospitalIcon sx={{ fontSize: 50, color: '#0077B6' }} />
      </Box>
      <Box sx={{ position: 'absolute', top: 200, right: 150, opacity: 0.15 }}>
        <FavoriteIcon sx={{ fontSize: 30, color: '#0077B6' }} />
      </Box>

      <Container maxWidth="sm">
        <Card
          sx={{
            p: 5,
            borderRadius: 4,
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
          }}
        >
          <Typography variant="h4" sx={{ fontWeight: 600, textAlign: 'center', mb: 1, color: '#0077B6' }}>
            Registrierung
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: '#718096', textAlign: 'center', mb: 4 }}
          >
            Erstellen Sie ein neues Benutzerkonto
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={3}>
              <Box>
                <TextField
                  fullWidth
                  label="Benutzername *"
                  placeholder="Benutzerne eingeben"
                  {...register('benutzername')}
                  error={!!errors.benutzername}
                  helperText={errors.benutzername?.message || 'Benutzerne eingeben'}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonIcon sx={{ color: '#A0AEC0' }} />
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>
              <Box>
                <TextField
                  fullWidth
                  label="E-Mail *"
                  type="email"
                  placeholder="E-Mail eingeben"
                  {...register('email')}
                  error={!!errors.email}
                  helperText={errors.email?.message || 'E-Mail eingeben'}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailIcon sx={{ color: '#A0AEC0' }} />
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>
              <Box>
                <TextField
                  fullWidth
                  label="Passwort eingeben"
                  type="password"
                  {...register('password')}
                  error={!!errors.password}
                  helperText={errors.password?.message}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockIcon sx={{ color: '#A0AEC0' }} />
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>
              <Box>
                <TextField
                  fullWidth
                  label="Passwort bestätigen *"
                  type="password"
                  {...register('confirmPassword')}
                  error={!!errors.confirmPassword}
                  helperText={errors.confirmPassword?.message}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockIcon sx={{ color: '#A0AEC0' }} />
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>

              <Button
                type="submit"
                variant="contained"
                size="large"
                fullWidth
                disabled={isLoading}
                sx={{
                  bgcolor: '#0077B6',
                  py: 1.5,
                  borderRadius: 2,
                  textTransform: 'uppercase',
                  '&:hover': { bgcolor: '#005A8C' },
                }}
              >
                {isLoading ? (
                  <CircularProgress size={24} sx={{ color: 'white' }} />
                ) : (
                  'KONTO ERSTELLEN'
                )}
              </Button>
            </Stack>
          </form>

          <Box sx={{ mt: 4, textAlign: 'center' }}>
            <Typography variant="body2" sx={{ color: '#718096' }}>
              Haben Sie bereits ein Konto?{' '}
              <Link
                to="/login"
                style={{ color: '#0077B6', textDecoration: 'none', fontWeight: 600 }}
              >
                Anmelden
              </Link>
            </Typography>
          </Box>
        </Card>
      </Container>
    </Box>
  );
}

export default Register;
