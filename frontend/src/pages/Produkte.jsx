import { Box, Typography, Card, Grid, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';

function Produkte() {
  return (
    <Box>
      <Typography variant="h3" gutterBottom>
        Produkte
      </Typography>

      {/* mednet Main Product */}
      <Card sx={{ mb: 4, p: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Typography variant="h4" gutterBottom>
              mednet
            </Typography>
            <Typography variant="body1" paragraph color="text.secondary">
              [Hauptprodukt - Plattform für elektronischen Datenaustausch zwischen Arztpraxen und Institutionen]
            </Typography>
            <List>
              {['Elektronischer Datenaustausch', 'Sichere Kommunikation', 'Einfache Integration', 'Schweizer Hosting'].map(
                (feature) => (
                  <ListItem key={feature} sx={{ py: 0.5 }}>
                    <ListItemIcon sx={{ minWidth: 36 }}>
                      <CheckIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary={feature} />
                  </ListItem>
                )
              )}
            </List>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                width: '100%',
                height: 250,
                bgcolor: '#ddd',
                border: '2px dashed #999',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Typography color="text.secondary">[MEDNET SCREENSHOT]</Typography>
            </Box>
          </Grid>
        </Grid>
      </Card>

      {/* mednet patient */}
      <Card sx={{ mb: 4, p: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                width: '100%',
                height: 200,
                bgcolor: '#ddd',
                border: '2px dashed #999',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Typography color="text.secondary">[MOBILE APP SCREENSHOT]</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h5" gutterBottom>
              mednet patient
            </Typography>
            <Typography variant="body1" paragraph color="text.secondary">
              [Mobile Applikation für Patienten - Beschreibung der Funktionen]
            </Typography>
            <List>
              {['Termine verwalten', 'Dokumente einsehen', 'Sichere Kommunikation'].map((feature) => (
                <ListItem key={feature} sx={{ py: 0.5 }}>
                  <ListItemIcon sx={{ minWidth: 36 }}>
                    <CheckIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary={feature} />
                </ListItem>
              ))}
            </List>
          </Grid>
        </Grid>
      </Card>

      {/* Security Section */}
      <Typography variant="h4" gutterBottom sx={{ mb: 3 }}>
        Sicherheit
      </Typography>
      <Grid container spacing={3}>
        {[
          { title: 'Verschlüsselung', desc: 'Ende-zu-Ende Verschlüsselung' },
          { title: 'HTTPS', desc: 'Sichere Datenübertragung' },
          { title: 'Penetrationstests', desc: 'Regelmässige Sicherheitsprüfungen' },
          { title: 'Swiss Hosting', desc: 'Daten bleiben in der Schweiz' },
        ].map((item) => (
          <Grid item xs={12} sm={6} md={3} key={item.title}>
            <Card sx={{ p: 2, textAlign: 'center', height: '100%' }}>
              <Box
                sx={{
                  width: 50,
                  height: 50,
                  bgcolor: '#ddd',
                  border: '2px dashed #999',
                  mx: 'auto',
                  mb: 2,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Typography variant="caption">ICON</Typography>
              </Box>
              <Typography variant="h6">{item.title}</Typography>
              <Typography variant="body2" color="text.secondary">
                {item.desc}
              </Typography>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default Produkte;
