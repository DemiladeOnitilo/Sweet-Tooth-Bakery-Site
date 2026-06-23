import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
  amount: 0,
  total: 0,
  delivery_fee: 1500,
  currency: "₦",
};

// Recalculates total and amount from scratch after every mutation.
// Prevents floating point drift from incremental add/subtract operations.
const recalculate = (state) => {
  state.total = state.cartItems.reduce(
    (sum, item) => sum + parseFloat(item.price) * item.quantity,
    0
  );
  state.amount = state.cartItems.reduce(
    (sum, item) => sum + item.quantity,
    0
  );
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { product, selectedSize, price, quantity, customNotes } = action.payload;

      const existingProduct = state.cartItems.find(
        (item) => item.id === product.id && item.selectedSize === selectedSize
      );

      if (existingProduct) {
        existingProduct.quantity += quantity;
      } else {
        state.cartItems.push({
          ...product,
          price,
          selectedSize,
          quantity,
          customNotes: customNotes || null, // inscription/custom note now stored
        });
      }

      recalculate(state);
    },

    removeFromCart: (state, action) => {
      const { id, selectedSize } = action.payload;

      state.cartItems = state.cartItems.filter(
        (item) => !(item.id === id && item.selectedSize === selectedSize)
      );

      recalculate(state);
    },

    updateQuantity: (state, action) => {
      const { productId, selectedSize, newQuantity } = action.payload;
      const productToUpdate = state.cartItems.find(
        (item) => item.id === productId && item.selectedSize === selectedSize
      );

      if (productToUpdate) {
        productToUpdate.quantity = newQuantity;
        recalculate(state);
      }
    },

    // Required by Checkout.jsx on order completion
    clearCart: (state) => {
      state.cartItems = [];
      state.amount = 0;
      state.total = 0;
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;