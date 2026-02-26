import { useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  Grid,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Button,
  Chip,
  LinearProgress,
  CircularProgress,
  Alert,
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import DescriptionIcon from '@mui/icons-material/Description';
import NotificationsIcon from '@mui/icons-material/Notifications';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store';
import { logout } from '../store/slices/authSlice';
import { fetchPracticeById } from '../store/slices/practiceSlice';

function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // Redux State - Zentrale Zustandsverwaltung
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
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <Chip
            label={user?.role === 'admin' ? 'Administrator' : user?.role === 'practice' ? 'Praxis' : 'Benutzer'}
            variant="outlined"
          />
          <Button
            variant="outlined"
            color="inherit"
            startIcon={<LogoutIcon />}
            onClick={handleLogout}
          >
            Logout
          </Button>
        </Box>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      <Grid container spacing={3}>
        {/* Sidebar Navigation */}
        <Grid size={{ xs: 12, md: 3 }}>
          <Card sx={{ p: 2 }}>
            <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 2 }}>
              Navigation
            </Typography>
            <List>
              {[
                { icon: <PersonIcon />, label: 'Profil', active: true },
                { icon: <SettingsIcon />, label: 'Einstellungen' },
                { icon: <DescriptionIcon />, label: 'Dokumente' },
                { icon: <NotificationsIcon />, label: 'Benachrichtigungen' },
              ].map((item) => (
                <ListItem
                  key={item.label}
                  sx={{
                    borderRadius: 1,
                    mb: 0.5,
                    bgcolor: item.active ? '#e8e8e8' : 'transparent',
                    cursor: 'pointer',
                    '&:hover': { bgcolor: '#f0f0f0' },
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 40 }}>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.label} />
                </ListItem>
              ))}
            </List>
          </Card>
        </Grid>

        {/* Main Content */}
        <Grid size={{ xs: 12, md: 9 }}>
          {/* Stats Cards - Daten aus API */}
          <Grid container spacing={2} sx={{ mb: 3 }}>
            {[
              { label: 'Aktive Verbindungen', value: '12' },
              { label: 'Dokumente', value: '48' },
              { label: 'Nachrichten', value: '3' },
            ].map((stat) => (
              <Grid size={{ xs: 12, sm: 4 }} key={stat.label}>
                <Card sx={{ p: 2, textAlign: 'center' }}>
                  <Typography variant="h4">{stat.value}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {stat.label}
                  </Typography>
                </Card>
              </Grid>
            ))}
          </Grid>

          {/* Profile Section - Praxisdaten aus Redux Store */}
          <Card sx={{ p: 3, mb: 3 }}>
            <Typography variant="h5" gutterBottom>
              {currentPractice ? 'Praxisprofil' : 'Benutzerprofil'}
            </Typography>
            <Grid container spacing={3}>
              <Grid size={{ xs: 12, md: 4 }}>
                <Box
                  sx={{
                    width: '100%',
                    height: 150,
                    bgcolor: '#f5f5f5',
                    border: '2px dashed #ccc',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 1,
                  }}
                >
                  <Typography color="text.secondary">
                    {currentPractice ? currentPractice.praxisname?.charAt(0)?.toUpperCase() : user?.email?.charAt(0)?.toUpperCase()}
                  </Typography>
                </Box>
                <Button fullWidth variant="outlined" sx={{ mt: 2 }}>
                  Logo ändern
                </Button>
              </Grid>
              <Grid size={{ xs: 12, md: 8 }}>
                <Grid container spacing={2}>
                  {currentPractice ? (
                    <>
                      <Grid size={{ xs: 12 }}>
                        <Typography variant="body2" color="text.secondary">
                          Praxisname
                        </Typography>
                        <Typography fontWeight="medium">{currentPractice.praxisname}</Typography>
                      </Grid>
                      <Grid size={{ xs: 12, sm: 6 }}>
                        <Typography variant="body2" color="text.secondary">
                          Adresse
                        </Typography>
                        <Typography>
                          {currentPractice.strasse} {currentPractice.hausnummer}, {currentPractice.plz} {currentPractice.ort}
                        </Typography>
                      </Grid>
                      <Grid size={{ xs: 12, sm: 6 }}>
                        <Typography variant="body2" color="text.secondary">
                          Telefon
                        </Typography>
                        <Typography>{currentPractice.telefon}</Typography>
                      </Grid>
                      <Grid size={{ xs: 12 }}>
                        <Typography variant="body2" color="text.secondary">
                          E-Mail
                        </Typography>
                        <Typography>{currentPractice.email}</Typography>
                      </Grid>
                    </>
                  ) : (
                    <>
                      <Grid size={{ xs: 12 }}>
                        <Typography variant="body2" color="text.secondary">
                          E-Mail
                        </Typography>
                        <Typography fontWeight="medium">{user?.email}</Typography>
                      </Grid>
                      <Grid size={{ xs: 12 }}>
                        <Typography variant="body2" color="text.secondary">
                          Rolle
                        </Typography>
                        <Typography>{user?.role}</Typography>
                      </Grid>
                    </>
                  )}
                  <Grid size={{ xs: 12 }}>
                    <Button variant="contained" sx={{ mt: 2 }}>
                      Stammdaten bearbeiten
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Card>

          {/* Status Section */}
          <Card sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom>
              Systemstatus
            </Typography>
            <Box sx={{ mb: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body2">Profil vollständig</Typography>
                <Typography variant="body2">{currentPractice ? '100%' : '50%'}</Typography>
              </Box>
              <LinearProgress variant="determinate" value={currentPractice ? 100 : 50} />
            </Box>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <Box sx={{ p: 2, bgcolor: '#f5f5f5', borderRadius: 1 }}>
                  <Typography variant="subtitle2">Benutzer-ID</Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ fontFamily: 'monospace', fontSize: '0.75rem' }}>
                    {user?.id || '-'}
                  </Typography>
                </Box>
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <Box sx={{ p: 2, bgcolor: '#f5f5f5', borderRadius: 1 }}>
                  <Typography variant="subtitle2">Account Status</Typography>
                  <Chip label="Aktiv" size="small" color="success" sx={{ mt: 0.5 }} />
                </Box>
              </Grid>
            </Grid>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Dashboard;
