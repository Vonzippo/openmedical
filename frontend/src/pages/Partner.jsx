import { useEffect, useState, useMemo } from 'react';
import { Box, Typography, Card, Grid, Chip, TextField, InputAdornment, CircularProgress, Alert } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useAppDispatch, useAppSelector } from '../store';
import { fetchPartners, fetchCategories, setSelectedCategory, clearFilter } from '../store/slices/partnerSlice';
import { keyframes } from '@mui/system';

// CSS Keyframe Animation für Logo-Bewegung
const slideIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const pulse = keyframes`
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
`;

function Partner() {
  const dispatch = useAppDispatch();
  const { partners, categories, selectedCategory, isLoading, error } = useAppSelector((state) => state.partner);
  const [searchTerm, setSearchTerm] = useState('');

  // Daten beim Mount laden
  useEffect(() => {
    dispatch(fetchPartners());
    dispatch(fetchCategories());
  }, [dispatch]);

  // Lokale Filterfunktion
  const filteredPartners = useMemo(() => {
    return partners.filter((partner) => {
      const matchesCategory = !selectedCategory || partner.category === selectedCategory;
      const matchesSearch = !searchTerm ||
        partner.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        partner.category.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [partners, selectedCategory, searchTerm]);

  const handleCategoryClick = (category) => {
    if (category === null) {
      dispatch(clearFilter());
    } else {
      dispatch(setSelectedCategory(category));
    }
  };

  if (isLoading && partners.length === 0) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h3" gutterBottom>
        Partner
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Übersicht aller kompatiblen Softwareanbieter und Partner
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {/* Filter & Search */}
      <Card sx={{ mb: 4, p: 2 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              placeholder="Partner suchen..."
              size="small"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              <Chip
                label="Alle"
                variant={selectedCategory === null ? 'filled' : 'outlined'}
                color={selectedCategory === null ? 'primary' : 'default'}
                onClick={() => handleCategoryClick(null)}
                sx={{ cursor: 'pointer' }}
              />
              {categories.map((cat) => (
                <Chip
                  key={cat}
                  label={cat}
                  variant={selectedCategory === cat ? 'filled' : 'outlined'}
                  color={selectedCategory === cat ? 'primary' : 'default'}
                  onClick={() => handleCategoryClick(cat)}
                  sx={{ cursor: 'pointer' }}
                />
              ))}
            </Box>
          </Grid>
        </Grid>
      </Card>

      {/* Partner Grid */}
      <Grid container spacing={3}>
        {filteredPartners.map((partner, index) => (
          <Grid item xs={6} sm={4} md={3} key={partner.id}>
            <Card
              sx={{
                p: 2,
                textAlign: 'center',
                height: '100%',
                cursor: 'pointer',
                animation: `${slideIn} 0.4s ease-out ${index * 0.1}s both`,
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: 4,
                  '& .partner-logo': {
                    animation: `${pulse} 0.6s ease-in-out`,
                  },
                },
              }}
              onClick={() => partner.website && window.open(partner.website, '_blank')}
            >
              <Box
                className="partner-logo"
                sx={{
                  width: '100%',
                  height: 80,
                  bgcolor: '#f5f5f5',
                  border: '1px solid #e0e0e0',
                  borderRadius: 1,
                  mb: 2,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  overflow: 'hidden',
                }}
              >
                {partner.logo_path ? (
                  <img
                    src={partner.logo_path}
                    alt={partner.name}
                    style={{ maxWidth: '80%', maxHeight: '80%', objectFit: 'contain' }}
                  />
                ) : (
                  <Typography variant="h6" color="text.secondary" sx={{ fontWeight: 'bold' }}>
                    {partner.name.substring(0, 2).toUpperCase()}
                  </Typography>
                )}
              </Box>
              <Typography variant="subtitle2" sx={{ fontWeight: 'medium' }}>
                {partner.name}
              </Typography>
              <Chip
                label={partner.category}
                size="small"
                sx={{ mt: 1 }}
                color="primary"
                variant="outlined"
              />
              {partner.description && (
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{
                    display: 'block',
                    mt: 1,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap'
                  }}
                >
                  {partner.description}
                </Typography>
              )}
            </Card>
          </Grid>
        ))}
      </Grid>

      {filteredPartners.length === 0 && !isLoading && (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography color="text.secondary">
            Keine Partner gefunden
          </Typography>
        </Box>
      )}

      {/* Info Section */}
      <Card sx={{ mt: 4, p: 3, bgcolor: '#e8e8e8' }}>
        <Typography variant="h6" gutterBottom>
          Partner werden?
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Interessiert an einer Partnerschaft? Kontaktieren Sie uns für Integrationsmöglichkeiten.
        </Typography>
      </Card>
    </Box>
  );
}

export default Partner;
