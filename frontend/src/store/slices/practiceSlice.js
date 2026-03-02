import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

const initialState = {
  currentPractice: null,
  practices: [],
  isLoading: false,
  error: null,
};

// Async Thunks - REST API Calls (JSON Format)

// Eigene Praxis laden
export const fetchMyPractice = createAsyncThunk(
  'practice/fetchMyPractice',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/practices/me');
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || 'Praxis konnte nicht geladen werden');
    }
  }
);

// Praxis nach ID laden
export const fetchPracticeById = createAsyncThunk(
  'practice/fetchPracticeById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.get(`/practices/${id}`);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || 'Praxis nicht gefunden');
    }
  }
);

// Alle Praxen laden (Admin)
export const fetchAllPractices = createAsyncThunk(
  'practice/fetchAllPractices',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/practices');
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || 'Praxen konnten nicht geladen werden');
    }
  }
);

// Praxis aktualisieren
export const updatePractice = createAsyncThunk(
  'practice/updatePractice',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await api.put(`/practices/${id}`, data);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || 'Aktualisierung fehlgeschlagen');
    }
  }
);

// Redux Slice
const practiceSlice = createSlice({
  name: 'practice',
  initialState,
  reducers: {
    clearPracticeError: (state) => {
      state.error = null;
    },
    clearCurrentPractice: (state) => {
      state.currentPractice = null;
    },
  },
  extraReducers: (builder) => {
    // Fetch My Practice
    builder
      .addCase(fetchMyPractice.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchMyPractice.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentPractice = action.payload;
      })
      .addCase(fetchMyPractice.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });

    // Fetch Practice By ID
    builder
      .addCase(fetchPracticeById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchPracticeById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentPractice = action.payload;
      })
      .addCase(fetchPracticeById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });

    // Fetch All Practices
    builder
      .addCase(fetchAllPractices.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAllPractices.fulfilled, (state, action) => {
        state.isLoading = false;
        state.practices = action.payload;
      })
      .addCase(fetchAllPractices.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });

    // Update Practice
    builder
      .addCase(updatePractice.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updatePractice.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentPractice = action.payload;
      })
      .addCase(updatePractice.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearPracticeError, clearCurrentPractice } = practiceSlice.actions;
export default practiceSlice.reducer;
