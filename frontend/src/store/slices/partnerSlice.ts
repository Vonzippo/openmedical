import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

// Partner Type
interface Partner {
  id: string;
  name: string;
  logo_path: string | null;
  category: string;
  website: string | null;
  description: string | null;
  is_active: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

interface PartnerState {
  partners: Partner[];
  categories: string[];
  selectedCategory: string | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: PartnerState = {
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
    } catch (error: any) {
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
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.error || 'Kategorien konnten nicht geladen werden');
    }
  }
);

// Redux Slice
const partnerSlice = createSlice({
  name: 'partner',
  initialState,
  reducers: {
    // Lokaler Filter - Kategorie setzen (ohne Server-Anfrage)
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
    // Filter zurücksetzen
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
        state.error = action.payload as string;
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
        state.error = action.payload as string;
      });
  },
});

export const { setSelectedCategory, clearFilter } = partnerSlice.actions;
export default partnerSlice.reducer;
