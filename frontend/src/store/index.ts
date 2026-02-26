import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import type { TypedUseSelectorHook } from 'react-redux';
import authReducer from './slices/authSlice';
import practiceReducer from './slices/practiceSlice';
import contentReducer from './slices/contentSlice';
import partnerReducer from './slices/partnerSlice';
import searchReducer from './slices/searchSlice';

// Redux Store - Zentrale Zustandsverwaltung
// Hält globalen State konsistent über alle Komponenten
export const store = configureStore({
  reducer: {
    auth: authReducer,
    practice: practiceReducer,
    content: contentReducer,
    partner: partnerReducer,
    search: searchReducer,
  },
});

// TypeScript Types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Typed Hooks für bessere TypeScript-Unterstützung
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
