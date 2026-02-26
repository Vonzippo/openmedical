import { Box, Typography, Card, Grid } from '@mui/material';

function UeberUns() {
  return (
    <Box>
      <Typography variant="h3" gutterBottom>
        Über uns
      </Typography>

      {/* Company Info */}
      <Card sx={{ mb: 4, p: 3 }}>
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 8 }}>
            <Typography variant="h5" gutterBottom>
              openmedical AG
            </Typography>
            <Typography variant="body1" paragraph color="text.secondary">
              [Unternehmensgeschichte - Seit über 20 Jahren im Schweizer Gesundheitswesen tätig]
            </Typography>
            <Typography variant="body1" paragraph color="text.secondary">
              [Mission Statement - Lorem ipsum dolor sit amet, consectetur adipiscing elit]
            </Typography>
            <Typography variant="body1" color="text.secondary">
              [Kernkompetenzen und Werte des Unternehmens]
            </Typography>
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
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
              <Typography color="text.secondary">[FIRMEN BILD]</Typography>
            </Box>
          </Grid>
        </Grid>
      </Card>

      {/* Team Section */}
      <Typography variant="h4" gutterBottom sx={{ mb: 3 }}>
        Unser Team
      </Typography>
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {[1, 2, 3, 4].map((member) => (
          <Grid size={{ xs: 12, sm: 6, md: 3 }} key={member}>
            <Card sx={{ p: 2, textAlign: 'center' }}>
              <Box
                sx={{
                  width: 80,
                  height: 80,
                  bgcolor: '#ddd',
                  border: '2px dashed #999',
                  borderRadius: '50%',
                  mx: 'auto',
                  mb: 2,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Typography variant="caption">FOTO</Typography>
              </Box>
              <Typography variant="subtitle1">[Name {member}]</Typography>
              <Typography variant="body2" color="text.secondary">
                [Position]
              </Typography>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Values */}
      <Typography variant="h4" gutterBottom sx={{ mb: 3 }}>
        Unsere Werte
      </Typography>
      <Grid container spacing={3}>
        {['Sicherheit', 'Innovation', 'Qualität', 'Kundennähe'].map((value) => (
          <Grid size={{ xs: 12, sm: 6, md: 3 }} key={value}>
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
              <Typography variant="h6">{value}</Typography>
              <Typography variant="body2" color="text.secondary">
                [Beschreibung]
              </Typography>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default UeberUns;
