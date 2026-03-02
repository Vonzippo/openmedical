import { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Card,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
  Alert,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { useAppDispatch, useAppSelector } from '../store';
import {
  fetchContents,
  createContent,
  updateContent,
  deleteContent,
} from '../store/slices/contentSlice';

function CMS() {
  const dispatch = useAppDispatch();
  const { contents, isLoading, error } = useAppSelector((state) => state.content);

  // Dialog State
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    type: 'news',
  });

  // Inhalte laden beim Mount
  useEffect(() => {
    dispatch(fetchContents());
  }, [dispatch]);

  // Dialog öffnen für neuen Inhalt
  const handleAdd = () => {
    setEditingId(null);
    setFormData({ title: '', content: '', type: 'news' });
    setDialogOpen(true);
  };

  // Dialog öffnen für Bearbeitung
  const handleEdit = (item) => {
    setEditingId(item.id);
    setFormData({ title: item.title, content: item.content, type: item.type });
    setDialogOpen(true);
  };

  // Speichern (Create oder Update)
  const handleSave = async () => {
    if (editingId) {
      await dispatch(updateContent({ id: editingId, data: formData }));
    } else {
      await dispatch(createContent(formData));
    }
    setDialogOpen(false);
    dispatch(fetchContents());
  };

  // Löschen
  const handleDelete = async (id) => {
    if (window.confirm('Inhalt wirklich löschen?')) {
      await dispatch(deleteContent(id));
    }
  };

  if (isLoading && contents.length === 0) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h3">Inhaltsverwaltung</Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={handleAdd}>
          Neuer Inhalt
        </Button>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      <Card>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Titel</TableCell>
                <TableCell>Typ</TableCell>
                <TableCell>Erstellt</TableCell>
                <TableCell align="right">Aktionen</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {contents.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.title}</TableCell>
                  <TableCell>
                    {item.type === 'news' ? 'News' : item.type === 'product' ? 'Produkt' : 'Seite'}
                  </TableCell>
                  <TableCell>{new Date(item.created_at).toLocaleDateString('de-CH')}</TableCell>
                  <TableCell align="right">
                    <IconButton onClick={() => handleEdit(item)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(item.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
              {contents.length === 0 && (
                <TableRow>
                  <TableCell colSpan={4} align="center">
                    Keine Inhalte vorhanden
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>

      {/* Dialog für Create/Update */}
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>{editingId ? 'Inhalt bearbeiten' : 'Neuer Inhalt'}</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
            <TextField
              label="Titel"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              fullWidth
            />
            <FormControl fullWidth>
              <InputLabel>Typ</InputLabel>
              <Select
                value={formData.type}
                label="Typ"
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              >
                <MenuItem value="news">News</MenuItem>
                <MenuItem value="product">Produkt</MenuItem>
                <MenuItem value="page">Seite</MenuItem>
              </Select>
            </FormControl>
            <TextField
              label="Inhalt"
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              multiline
              rows={6}
              fullWidth
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Abbrechen</Button>
          <Button variant="contained" onClick={handleSave}>
            Speichern
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default CMS;
