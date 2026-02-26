import { useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Dialog,
  DialogContent,
  TextField,
  InputAdornment,
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Chip,
  CircularProgress,
  Divider,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import BusinessIcon from '@mui/icons-material/Business';
import ArticleIcon from '@mui/icons-material/Article';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import { useAppDispatch, useAppSelector } from '../store';
import { closeSearch, setQuery, performSearch } from '../store/slices/searchSlice';

// Debounce Hook für reaktive Suche
function useDebounce(callback: () => void, delay: number, deps: any[]) {
  useEffect(() => {
    const handler = setTimeout(callback, delay);
    return () => clearTimeout(handler);
  }, deps);
}

function GlobalSearch() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isOpen, query, results, totalResults, isSearching } = useAppSelector((state) => state.search);

  // Reaktive Suche - State-Änderung löst Suche aus (Virtual DOM)
  useDebounce(
    () => {
      if (query.length >= 2) {
        dispatch(performSearch(query));
      }
    },
    300,
    [query]
  );

  const handleClose = useCallback(() => {
    dispatch(closeSearch());
  }, [dispatch]);

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setQuery(e.target.value));
  };

  const handleResultClick = (type: string, id: string) => {
    handleClose();
    switch (type) {
      case 'partner':
        navigate('/partner');
        break;
      case 'content':
        navigate('/cms');
        break;
      case 'practice':
        navigate('/anmeldung');
        break;
    }
  };

  // Keyboard shortcut (Cmd/Ctrl + K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        handleClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, handleClose]);

  const getIcon = (type: string) => {
    switch (type) {
      case 'partner':
        return <BusinessIcon color="primary" />;
      case 'content':
        return <ArticleIcon color="secondary" />;
      case 'practice':
        return <LocalHospitalIcon color="success" />;
      default:
        return <SearchIcon />;
    }
  };

  const getLabel = (type: string) => {
    switch (type) {
      case 'partner':
        return 'Partner';
      case 'content':
        return 'Inhalt';
      case 'practice':
        return 'Praxis';
      default:
        return type;
    }
  };

  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      aria-labelledby="search-dialog-title"
      PaperProps={{
        sx: {
          position: 'absolute',
          top: '15%',
          m: 0,
        },
      }}
    >
      <DialogContent sx={{ p: 0 }} role="search">
        {/* Suchfeld - Reaktive Eingabe mit ARIA */}
        <TextField
          autoFocus
          fullWidth
          placeholder="Suchen..."
          value={query}
          onChange={handleQueryChange}
          aria-label="Suchbegriff eingeben"
          aria-describedby="search-hint"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                {isSearching ? <CircularProgress size={20} aria-label="Suche läuft" /> : <SearchIcon />}
              </InputAdornment>
            ),
            sx: { fontSize: '1.1rem', py: 1 },
          }}
          sx={{
            '& .MuiOutlinedInput-root': {
              '& fieldset': { border: 'none' },
            },
          }}
        />

        <Divider />

        {/* Suchergebnisse - Virtual DOM Rendering mit aria-live */}
        <Box sx={{ maxHeight: 400, overflow: 'auto' }} aria-live="polite" aria-atomic="true">
          {query.length < 2 ? (
            <Box sx={{ p: 3, textAlign: 'center' }} id="search-hint">
              <Typography color="text.secondary">
                Mindestens 2 Zeichen eingeben
              </Typography>
            </Box>
          ) : totalResults === 0 && !isSearching ? (
            <Box sx={{ p: 3, textAlign: 'center' }} role="status">
              <Typography color="text.secondary">
                Keine Ergebnisse für "{query}"
              </Typography>
            </Box>
          ) : (
            <List role="listbox" aria-label="Suchergebnisse">
              {/* Partner Ergebnisse */}
              {results.partners.length > 0 && (
                <>
                  <ListItem sx={{ bgcolor: 'grey.100' }}>
                    <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 'bold' }}>
                      PARTNER ({results.partners.length})
                    </Typography>
                  </ListItem>
                  {results.partners.map((item: any) => (
                    <ListItem
                      key={item.id}
                      onClick={() => handleResultClick('partner', item.id)}
                      onKeyDown={(e) => e.key === 'Enter' && handleResultClick('partner', item.id)}
                      role="option"
                      tabIndex={0}
                      sx={{ cursor: 'pointer', '&:hover': { bgcolor: 'action.hover' }, '&:focus': { bgcolor: 'action.hover', outline: '2px solid #1976d2' } }}
                    >
                      <ListItemIcon>{getIcon('partner')}</ListItemIcon>
                      <ListItemText
                        primary={item.name}
                        secondary={item.description || item.category}
                      />
                      <Chip label={item.category} size="small" variant="outlined" />
                    </ListItem>
                  ))}
                </>
              )}

              {/* Content Ergebnisse */}
              {results.contents.length > 0 && (
                <>
                  <ListItem sx={{ bgcolor: 'grey.100' }}>
                    <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 'bold' }}>
                      INHALTE ({results.contents.length})
                    </Typography>
                  </ListItem>
                  {results.contents.map((item: any) => (
                    <ListItem
                      key={item.id}
                      onClick={() => handleResultClick('content', item.id)}
                      onKeyDown={(e) => e.key === 'Enter' && handleResultClick('content', item.id)}
                      role="option"
                      tabIndex={0}
                      sx={{ cursor: 'pointer', '&:hover': { bgcolor: 'action.hover' }, '&:focus': { bgcolor: 'action.hover', outline: '2px solid #1976d2' } }}
                    >
                      <ListItemIcon>{getIcon('content')}</ListItemIcon>
                      <ListItemText
                        primary={item.title}
                        secondary={item.content?.substring(0, 100) + '...'}
                      />
                      <Chip label={item.type} size="small" variant="outlined" />
                    </ListItem>
                  ))}
                </>
              )}

              {/* Practice Ergebnisse */}
              {results.practices.length > 0 && (
                <>
                  <ListItem sx={{ bgcolor: 'grey.100' }}>
                    <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 'bold' }}>
                      PRAXEN ({results.practices.length})
                    </Typography>
                  </ListItem>
                  {results.practices.map((item: any) => (
                    <ListItem
                      key={item.id}
                      onClick={() => handleResultClick('practice', item.id)}
                      onKeyDown={(e) => e.key === 'Enter' && handleResultClick('practice', item.id)}
                      role="option"
                      tabIndex={0}
                      sx={{ cursor: 'pointer', '&:hover': { bgcolor: 'action.hover' }, '&:focus': { bgcolor: 'action.hover', outline: '2px solid #1976d2' } }}
                    >
                      <ListItemIcon>{getIcon('practice')}</ListItemIcon>
                      <ListItemText
                        primary={item.praxisname}
                        secondary={item.ort}
                      />
                      <Chip label={item.kategorie} size="small" variant="outlined" />
                    </ListItem>
                  ))}
                </>
              )}
            </List>
          )}
        </Box>

        {/* Footer */}
        <Divider />
        <Box sx={{ p: 1.5, display: 'flex', justifyContent: 'space-between', bgcolor: 'grey.50' }}>
          <Typography variant="caption" color="text.secondary">
            {totalResults} Ergebnis{totalResults !== 1 ? 'se' : ''}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            ESC zum Schließen
          </Typography>
        </Box>
      </DialogContent>
    </Dialog>
  );
}

export default GlobalSearch;
