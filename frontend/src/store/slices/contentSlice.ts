import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

// Typen für Content State
interface Content {
  id: string;
  title: string;
  content: string;
  type: 'news' | 'product' | 'page';
  created_by: string;
  created_at: string;
  updated_at: string;
}

interface ContentState {
  contents: Content[];
  isLoading: boolean;
  error: string | null;
}

const initialState: ContentState = {
  contents: [],
  isLoading: false,
  error: null,
};

// CRUD Async Thunks - Axios Requests

// READ - Alle Inhalte laden
export const fetchContents = createAsyncThunk(
  'content/fetchContents',
  async (type?: string, { rejectWithValue }) => {
    try {
      const url = type ? `/contents?type=${type}` : '/contents';
      const response = await api.get(url);
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.error || 'Inhalte konnten nicht geladen werden');
    }
  }
);

// CREATE - Neuen Inhalt erstellen
export const createContent = createAsyncThunk(
  'content/createContent',
  async (data: { title: string; content: string; type: string }, { rejectWithValue }) => {
    try {
      const response = await api.post('/contents', data);
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.error || 'Inhalt konnte nicht erstellt werden');
    }
  }
);

// UPDATE - Inhalt aktualisieren
export const updateContent = createAsyncThunk(
  'content/updateContent',
  async ({ id, data }: { id: string; data: { title?: string; content?: string; type?: string } }, { rejectWithValue }) => {
    try {
      await api.put(`/contents/${id}`, data);
      return { id, ...data };
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.error || 'Inhalt konnte nicht aktualisiert werden');
    }
  }
);

// DELETE - Inhalt löschen
export const deleteContent = createAsyncThunk(
  'content/deleteContent',
  async (id: string, { rejectWithValue }) => {
    try {
      await api.delete(`/contents/${id}`);
      return id;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.error || 'Inhalt konnte nicht gelöscht werden');
    }
  }
);

// Redux Slice
const contentSlice = createSlice({
  name: 'content',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Fetch Contents
    builder
      .addCase(fetchContents.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchContents.fulfilled, (state, action) => {
        state.isLoading = false;
        state.contents = action.payload;
      })
      .addCase(fetchContents.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Create Content
    builder
      .addCase(createContent.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createContent.fulfilled, (state, action) => {
        state.isLoading = false;
        state.contents.unshift(action.payload);
      })
      .addCase(createContent.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Update Content
    builder
      .addCase(updateContent.fulfilled, (state, action) => {
        const index = state.contents.findIndex((c) => c.id === action.payload.id);
        if (index !== -1) {
          state.contents[index] = { ...state.contents[index], ...action.payload };
        }
      });

    // Delete Content
    builder
      .addCase(deleteContent.fulfilled, (state, action) => {
        state.contents = state.contents.filter((c) => c.id !== action.payload);
      });
  },
});

export const { clearError } = contentSlice.actions;
export default contentSlice.reducer;
