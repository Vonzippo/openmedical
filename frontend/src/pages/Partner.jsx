import { useEffect, useState, useMemo } from 'react';
import { Box, Typography, Card, Container, Grid, Chip, Button, CircularProgress, Alert } from '@mui/material';
import SecurityIcon from '@mui/icons-material/Security';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import BusinessIcon from '@mui/icons-material/Business';
import CategoryIcon from '@mui/icons-material/Category';
import { useAppDispatch, useAppSelector } from '../store';
import { fetchPartners, fetchCategories, setSelectedCategory, clearFilter } from '../store/slices/partnerSlice';

function Partner() {
  const dispatch = useAppDispatch();
  const { partners, categories, selectedCategory, isLoading, error } = useAppSelector((state) => state.partner);

  useEffect(() => {
    dispatch(fetchPartners());
    dispatch(fetchCategories());
  }, [dispatch]);

  const filteredPartners = useMemo(() => {
    if (!selectedCategory) return partners;
    return partners.filter((p) => p.category === selectedCategory);
  }, [partners, selectedCategory]);

  const partnerCategories = [
    {
      icon: <SecurityIcon sx={{ fontSize: 40, color: '#0077B6' }} />,
      title: 'Arztpraxissoftware Anbieter',
      subtitle: 'AIS, PIS',
      link: '> mednet Kompatibilitätsliste',
    },
    {
      icon: <LocalHospitalIcon sx={{ fontSize: 40, color: '#0077B6' }} />,
      title: 'Laborinformationssystem Anbieter',
      subtitle: 'LIS',
      link: '> Liste herunterladen',
    },
    {
      icon: <BusinessIcon sx={{ fontSize: 40, color: '#0077B6' }} />,
      title: 'Klinikinformationssystem Anbieter',
      subtitle: 'KIS',
      link: '> Liste herunterladen',
    },
    {
      icon: <CategoryIcon sx={{ fontSize: 40, color: '#0077B6' }} />,
      title: 'Diverse',
      subtitle: 'DIV',
      link: '> Liste herunterladen',
    },
  ];

  // Demo partner logos
  const demoPartners = [
    'Valiant', 'Luzerner Kantonalbank', 'Raiffeisen', 'Raiffeisen Bank',
    'PostFinance', 'Deutsche Bank', 'BNP Paribas', 'Intesa Sanpaolo', 'UBS', 'next bank'
  ];

  if (isLoading && partners.length === 0) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      {/* Hero Section */}
      <Box sx={{ bgcolor: '#F7FAFC', py: 8 }}>
        <Container maxWidth="lg">
          <Typography variant="h2" sx={{ fontWeight: 600, textAlign: 'center', mb: 2 }}>
            Partner
          </Typography>
          <Typography variant="h6" sx={{ color: '#4A5568', textAlign: 'center' }}>
            Mehr als 150 Anbieter vertrauen darauf
          </Typography>
        </Container>
      </Box>

      {error && (
        <Container maxWidth="lg" sx={{ py: 2 }}>
          <Alert severity="error">{error}</Alert>
        </Container>
      )}

      {/* Categories Section */}
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Grid container spacing={4}>
          {partnerCategories.slice(0, 2).map((cat) => (
            <Grid item xs={12} md={6} key={cat.title}>
              <Card
                sx={{
                  p: 4,
                  textAlign: 'center',
                  height: '100%',
                  border: '1px solid #E2E8F0',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    borderColor: '#0077B6',
                    boxShadow: '0 4px 20px rgba(0, 119, 182, 0.1)',
                  },
                }}
              >
                <Box sx={{ mb: 2 }}>{cat.icon}</Box>
                <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>
                  {cat.title}
                </Typography>
                <Typography variant="body2" sx={{ color: '#718096', mb: 2 }}>
                  {cat.subtitle}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: '#0077B6', cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }}
                >
                  {cat.link}
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Partner Logos Carousel */}
      <Box sx={{ bgcolor: '#F7FAFC', py: 6 }}>
        <Container maxWidth="lg">
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 2,
              justifyContent: 'center',
            }}
          >
            {demoPartners.map((name) => (
              <Card
                key={name}
                sx={{
                  p: 2,
                  minWidth: 120,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '1px solid #E2E8F0',
                  bgcolor: 'white',
                }}
              >
                <Typography variant="body2" sx={{ fontWeight: 500, color: '#4A5568' }}>
                  {name}
                </Typography>
              </Card>
            ))}
          </Box>
        </Container>
      </Box>

      {/* More Categories */}
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Grid container spacing={4}>
          {partnerCategories.slice(2).map((cat) => (
            <Grid item xs={12} md={6} key={cat.title}>
              <Card
                sx={{
                  p: 4,
                  textAlign: 'center',
                  height: '100%',
                  border: '1px solid #E2E8F0',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    borderColor: '#0077B6',
                    boxShadow: '0 4px 20px rgba(0, 119, 182, 0.1)',
                  },
                }}
              >
                <Box sx={{ mb: 2 }}>{cat.icon}</Box>
                <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>
                  {cat.title}
                </Typography>
                <Typography variant="body2" sx={{ color: '#718096', mb: 2 }}>
                  {cat.subtitle}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: '#0077B6', cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }}
                >
                  {cat.link}
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Become Partner CTA */}
      <Box sx={{ bgcolor: '#0077B6', py: 8 }}>
        <Container maxWidth="md" sx={{ textAlign: 'center' }}>
          <Typography variant="h4" sx={{ color: 'white', fontWeight: 600, mb: 2 }}>
            Partner werden?
          </Typography>
          <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.9)', mb: 4 }}>
            Interessiert an einer Partnerschaft? Kontaktieren Sie uns für Integrationsmöglichkeiten.
          </Typography>
          <Button
            variant="contained"
            size="large"
            sx={{
              bgcolor: 'white',
              color: '#0077B6',
              '&:hover': { bgcolor: '#F7FAFC' },
            }}
          >
            Kontakt aufnehmen
          </Button>
        </Container>
      </Box>
    </Box>
  );
}

export default Partner;
