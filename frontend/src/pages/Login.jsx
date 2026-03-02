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
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import { useAppDispatch, useAppSelector } from '../store';
import { login, clearError } from '../store/slices/authSlice';

const schema = yup.object({
  email: yup
    .string()
    .required('E-Mail ist erforderlich')
    .email('Ungültige E-Mail-Adresse'),
  password: yup
    .string()
    .required('Passwort ist erforderlich'),
});

function Login() {
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
    const result = await dispatch(login(data));
    if (login.fulfilled.match(result)) {
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
      <Box sx={{ position: 'absolute', top: 50, left: 50, opacity: 0.2 }}>
        <FavoriteIcon sx={{ fontSize: 40, color: '#0077B6' }} />
      </Box>
      <Box sx={{ position: 'absolute', bottom: 100, right: 80, opacity: 0.2 }}>
        <LocalHospitalIcon sx={{ fontSize: 50, color: '#0077B6' }} />
      </Box>
      <Box sx={{ position: 'absolute', top: 150, right: 120, opacity: 0.15 }}>
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
          {/* Logo */}
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 2 }}>
              <Typography variant="h4" sx={{ fontWeight: 400, color: '#0077B6' }}>
                open
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 600, color: '#4A5568' }}>
                medical
              </Typography>
            </Box>
          </Box>

          <Typography variant="h4" sx={{ fontWeight: 600, textAlign: 'center', mb: 1 }}>
            Anmeldung
          </Typography>
          <Typography
            variant="body1"
            sx={{ color: '#718096', textAlign: 'center', mb: 4 }}
          >
            Geben Sie Ihre E-Mail-Adresse und Ihr Passwort ein, um sich anzumelden.
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
                label="E-Mail *"
                type="email"
                placeholder="uxlibraries@gmail.com"
                {...register('email')}
                error={!!errors.email}
                helperText={errors.email?.message}
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
                label="Passwort *"
                type="password"
                placeholder="Passwort eingeben"
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

              <Box sx={{ textAlign: 'right' }}>
                <Link
                  to="/passwort-vergessen"
                  style={{ color: '#0077B6', textDecoration: 'none', fontSize: '0.875rem' }}
                >
                  Passwort vergessen?
                </Link>
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
                  '&:hover': { bgcolor: '#005A8C' },
                }}
              >
                {isLoading ? (
                  <CircularProgress size={24} sx={{ color: 'white' }} />
                ) : (
                  'Anmelden'
                )}
              </Button>
            </Stack>
          </form>

          <Box sx={{ mt: 4, textAlign: 'center' }}>
            <Typography variant="body2" sx={{ color: '#718096' }}>
              Noch kein Konto?{' '}
              <Link
                to="/register"
                style={{ color: '#0077B6', textDecoration: 'none', fontWeight: 600 }}
              >
                Registrieren
              </Link>
            </Typography>
          </Box>
        </Card>
      </Container>
    </Box>
  );
}

export default Login;
