import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import authReducer from './slices/authSlice';
import practiceReducer from './slices/practiceSlice';
import contentReducer from './slices/contentSlice';
import partnerReducer from './slices/partnerSlice';
import searchReducer from './slices/searchSlice';

// Redux Store - Zentrale Zustandsverwaltung
export const store = configureStore({
  reducer: {
    auth: authReducer,
    practice: practiceReducer,
    content: contentReducer,
    partner: partnerReducer,
    search: searchReducer,
  },
});

// Hooks
export const useAppDispatch = () => useDispatch();
export const useAppSelector = useSelector;
