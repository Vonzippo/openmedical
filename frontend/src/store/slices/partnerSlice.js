import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

const initialState = {
  partners: [],
  categories: [],
  selectedCategory: null,
  isLoading: false,
  error: null,
};

// Async Thunks

// Alle Partner laden
export const fetchPartners = createAsyncThunk(
  'partner/fetchPartners',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/partners');
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || 'Partner konnten nicht geladen werden');
    }
  }
);

// Kategorien laden
export const fetchCategories = createAsyncThunk(
  'partner/fetchCategories',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/partners/categories');
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || 'Kategorien konnten nicht geladen werden');
    }
  }
);

// Redux Slice
const partnerSlice = createSlice({
  name: 'partner',
  initialState,
  reducers: {
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
    clearFilter: (state) => {
      state.selectedCategory = null;
    },
  },
  extraReducers: (builder) => {
    // Fetch Partners
    builder
      .addCase(fetchPartners.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchPartners.fulfilled, (state, action) => {
        state.isLoading = false;
        state.partners = action.payload;
      })
      .addCase(fetchPartners.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });

    // Fetch Categories
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { setSelectedCategory, clearFilter } = partnerSlice.actions;
export default partnerSlice.reducer;
