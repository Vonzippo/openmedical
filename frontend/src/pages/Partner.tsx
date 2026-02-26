import { Box, Typography, Card, Grid, Chip, TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const partnerCategories = ['AIS/PIS', 'LIS', 'KIS', 'Alle'];

function Partner() {
  return (
    <Box>
      <Typography variant="h3" gutterBottom>
        Partner
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        [Übersicht aller kompatiblen Softwareanbieter und Partner]
      </Typography>

      {/* Filter & Search */}
      <Card sx={{ mb: 4, p: 2 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              placeholder="Partner suchen..."
              size="small"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              {partnerCategories.map((cat) => (
                <Chip
                  key={cat}
                  label={cat}
                  variant={cat === 'Alle' ? 'filled' : 'outlined'}
                  onClick={() => {}}
                  sx={{ cursor: 'pointer' }}
                />
              ))}
            </Box>
          </Grid>
        </Grid>
      </Card>

      {/* Partner Grid */}
      <Grid container spacing={3}>
        {[1, 2, 3, 4, 5, 6, 7, 8].map((partner) => (
          <Grid size={{ xs: 6, sm: 4, md: 3 }} key={partner}>
            <Card sx={{ p: 2, textAlign: 'center', height: '100%' }}>
              <Box
                sx={{
                  width: '100%',
                  height: 80,
                  bgcolor: '#ddd',
                  border: '2px dashed #999',
                  mb: 2,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Typography variant="caption" color="text.secondary">
                  LOGO
                </Typography>
              </Box>
              <Typography variant="subtitle2">[Partner {partner}]</Typography>
              <Chip label="AIS/PIS" size="small" sx={{ mt: 1 }} />
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Info Section */}
      <Card sx={{ mt: 4, p: 3, bgcolor: '#e8e8e8' }}>
        <Typography variant="h6" gutterBottom>
          Partner werden?
        </Typography>
        <Typography variant="body2" color="text.secondary">
          [Informationen für potenzielle Partner - Kontaktaufnahme für Integrationen]
        </Typography>
      </Card>
    </Box>
  );
}

export default Partner;
