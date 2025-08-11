<<<<<<< HEAD
import { configureStore } from '@reduxjs/toolkit'; 
import cartReducer from './cartSlice';
import productReducer from './productSlice';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'cart',
  storage,
};

const persistedCartReducer = persistReducer(persistConfig, cartReducer);

export const store = configureStore({
  reducer: {
    cart: persistedCartReducer,
    product: productReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE', 'REGISTER'], // Add 'REGISTER' action here if needed
        ignoredPaths: ['register'], // Optionally, ignore paths that contain non-serializable data
      },
    }),
});

export const persistor = persistStore(store);
=======
import { configureStore } from '@reduxjs/toolkit'; 
import cartReducer from './cartSlice';
import productReducer from './productSlice';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'cart',
  storage,
};

const persistedCartReducer = persistReducer(persistConfig, cartReducer);

export const store = configureStore({
  reducer: {
    cart: persistedCartReducer,
    product: productReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE', 'REGISTER'], // Add 'REGISTER' action here if needed
        ignoredPaths: ['register'], // Optionally, ignore paths that contain non-serializable data
      },
    }),
});

export const persistor = persistStore(store);
>>>>>>> 7d7a2436ccf69969488ba6446911d1363f65354f
