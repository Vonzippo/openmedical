import { useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  Button,
  CircularProgress,
  Alert,
} from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store';
import { logout } from '../store/slices/authSlice';
import { fetchPracticeById } from '../store/slices/practiceSlice';

function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // Redux State
  const { user } = useAppSelector((state) => state.auth);
  const { currentPractice, isLoading, error } = useAppSelector((state) => state.practice);

  // Praxisdaten laden wenn User eine Praxis hat
  useEffect(() => {
    if (user?.practice?.id) {
      dispatch(fetchPracticeById(user.practice.id));
    }
  }, [dispatch, user?.practice?.id]);

  // Logout Handler
  const handleLogout = async () => {
    await dispatch(logout());
    navigate('/login');
  };

  // Ladeindikator
  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Box>
          <Typography variant="h3" gutterBottom>
            Dashboard
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Willkommen zurück, {user?.email || 'Benutzer'}
          </Typography>
        </Box>
        <Button
          variant="outlined"
          color="inherit"
          startIcon={<LogoutIcon />}
          onClick={handleLogout}
        >
          Logout
        </Button>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {/* Profile Section */}
      <Card sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom>
          {currentPractice ? 'Praxisprofil' : 'Benutzerprofil'}
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3 }}>
          {/* Profile Details */}
          <Box sx={{ flex: 1 }}>
            {currentPractice ? (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Praxisname
                  </Typography>
                  <Typography fontWeight="medium">{currentPractice.praxisname}</Typography>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2 }}>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="body2" color="text.secondary">
                      Adresse
                    </Typography>
                    <Typography>
                      {currentPractice.strasse} {currentPractice.hausnummer}, {currentPractice.plz} {currentPractice.ort}
                    </Typography>
                  </Box>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="body2" color="text.secondary">
                      Telefon
                    </Typography>
                    <Typography>{currentPractice.telefon}</Typography>
                  </Box>
                </Box>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    E-Mail
                  </Typography>
                  <Typography>{currentPractice.email}</Typography>
                </Box>
              </Box>
            ) : (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    E-Mail
                  </Typography>
                  <Typography fontWeight="medium">{user?.email}</Typography>
                </Box>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Rolle
                  </Typography>
                  <Typography>
                    {user?.role === 'admin' ? 'Administrator' : user?.role === 'practice' ? 'Praxis' : 'Benutzer'}
                  </Typography>
                </Box>
              </Box>
            )}
          </Box>
        </Box>
      </Card>
    </Box>
  );
}

export default Dashboard;
