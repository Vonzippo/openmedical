import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

const initialState = {
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
  async (query, { rejectWithValue }) => {
    try {
      if (query.trim().length < 2) {
        return { query: '', totalResults: 0, results: { partners: [], contents: [], practices: [] } };
      }
      const response = await api.get(`/search?q=${encodeURIComponent(query)}`);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || 'Suche fehlgeschlagen');
    }
  }
);

// Redux Slice
const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
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
    setQuery: (state, action) => {
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
        state.error = action.payload;
      });
  },
});

export const { toggleSearch, openSearch, closeSearch, setQuery, clearResults } = searchSlice.actions;
export default searchSlice.reducer;
