import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import api from '../../services/api';

// Typen für Suchergebnisse
interface SearchResult {
  id: string;
  result_type: 'partner' | 'content' | 'practice';
  name?: string;
  title?: string;
  praxisname?: string;
  category?: string;
  kategorie?: string;
  description?: string;
  content?: string;
  ort?: string;
}

interface SearchResults {
  partners: SearchResult[];
  contents: SearchResult[];
  practices: SearchResult[];
}

interface SearchState {
  query: string;
  results: SearchResults;
  totalResults: number;
  isSearching: boolean;
  isOpen: boolean;
  error: string | null;
}

const initialState: SearchState = {
  query: '',
  results: {
    partners: [],
    contents: [],
    practices: []
  },
  totalResults: 0,
  isSearching: false,
  isOpen: false,
  error: null,
};

// Async Thunk - Serverseitige Suche mit SQL LIKE
export const performSearch = createAsyncThunk(
  'search/performSearch',
  async (query: string, { rejectWithValue }) => {
    try {
      if (query.trim().length < 2) {
        return { query: '', totalResults: 0, results: { partners: [], contents: [], practices: [] } };
      }
      const response = await api.get(`/search?q=${encodeURIComponent(query)}`);
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.error || 'Suche fehlgeschlagen');
    }
  }
);

// Redux Slice
const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    // Suchfeld öffnen/schließen
    toggleSearch: (state) => {
      state.isOpen = !state.isOpen;
      if (!state.isOpen) {
        state.query = '';
        state.results = { partners: [], contents: [], practices: [] };
        state.totalResults = 0;
      }
    },
    openSearch: (state) => {
      state.isOpen = true;
    },
    closeSearch: (state) => {
      state.isOpen = false;
      state.query = '';
      state.results = { partners: [], contents: [], practices: [] };
      state.totalResults = 0;
    },
    // Lokale Query-Änderung (für reaktive UI)
    setQuery: (state, action: PayloadAction<string>) => {
      state.query = action.payload;
    },
    clearResults: (state) => {
      state.results = { partners: [], contents: [], practices: [] };
      state.totalResults = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(performSearch.pending, (state) => {
        state.isSearching = true;
        state.error = null;
      })
      .addCase(performSearch.fulfilled, (state, action) => {
        state.isSearching = false;
        state.results = action.payload.results;
        state.totalResults = action.payload.totalResults;
      })
      .addCase(performSearch.rejected, (state, action) => {
        state.isSearching = false;
        state.error = action.payload as string;
      });
  },
});

export const { toggleSearch, openSearch, closeSearch, setQuery, clearResults } = searchSlice.actions;
export default searchSlice.reducer;
