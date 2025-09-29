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
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE', 'REGISTER'], 
        ignoredPaths: ['register'], 
      },
    }),
});

export const persistor = persistStore(store);
