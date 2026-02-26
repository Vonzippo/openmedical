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
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import DescriptionIcon from '@mui/icons-material/Description';
import NotificationsIcon from '@mui/icons-material/Notifications';

function Dashboard() {
  return (
    <Box>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Box>
          <Typography variant="h3" gutterBottom>
            Dashboard
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Willkommen zurück, [Benutzername]
          </Typography>
        </Box>
        <Chip label="Praxis Admin" variant="outlined" />
      </Box>

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
          {/* Stats Cards */}
          <Grid container spacing={2} sx={{ mb: 3 }}>
            {[
              { label: 'Aktive Verbindungen', value: '[12]' },
              { label: 'Dokumente', value: '[48]' },
              { label: 'Nachrichten', value: '[3]' },
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

          {/* Profile Section */}
          <Card sx={{ p: 3, mb: 3 }}>
            <Typography variant="h5" gutterBottom>
              Praxisprofil
            </Typography>
            <Grid container spacing={3}>
              <Grid size={{ xs: 12, md: 4 }}>
                <Box
                  sx={{
                    width: '100%',
                    height: 150,
                    bgcolor: '#ddd',
                    border: '2px dashed #999',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Typography color="text.secondary">[PRAXIS LOGO]</Typography>
                </Box>
                <Button fullWidth variant="outlined" sx={{ mt: 2 }}>
                  Logo ändern
                </Button>
              </Grid>
              <Grid size={{ xs: 12, md: 8 }}>
                <Grid container spacing={2}>
                  <Grid size={{ xs: 12 }}>
                    <Typography variant="body2" color="text.secondary">
                      Praxisname
                    </Typography>
                    <Typography>[Praxis Muster AG]</Typography>
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <Typography variant="body2" color="text.secondary">
                      Adresse
                    </Typography>
                    <Typography>[Musterstrasse 1, 3000 Bern]</Typography>
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <Typography variant="body2" color="text.secondary">
                      Telefon
                    </Typography>
                    <Typography>[+41 XX XXX XX XX]</Typography>
                  </Grid>
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
                <Typography variant="body2">[75%]</Typography>
              </Box>
              <LinearProgress variant="determinate" value={75} />
            </Box>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <Box sx={{ p: 2, bgcolor: '#e8e8e8', borderRadius: 1 }}>
                  <Typography variant="subtitle2">Letzter Login</Typography>
                  <Typography variant="body2" color="text.secondary">
                    [DD.MM.YYYY, HH:MM]
                  </Typography>
                </Box>
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <Box sx={{ p: 2, bgcolor: '#e8e8e8', borderRadius: 1 }}>
                  <Typography variant="subtitle2">Account Status</Typography>
                  <Chip label="Aktiv" size="small" color="default" />
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
