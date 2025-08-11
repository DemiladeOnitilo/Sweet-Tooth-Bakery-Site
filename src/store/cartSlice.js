import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
  amount: 0,
  total: 0,
  delivery_fee: 1500,
  currency: "₦",
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const productToAdd = action.payload;

      const existingProduct = state.cartItems.find(
        (item) => item.id === productToAdd.id
      );

      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        state.cartItems.push({ ...productToAdd, quantity: 1 });
      }

      state.amount += 1;
      state.total += parseFloat(productToAdd.price);
    },
    removeFromCart: (state, action) => {
      const productIdToRemove = action.payload;
      const productToRemove = state.cartItems.find(
        (item) => item.id === productIdToRemove
      );

      if (productToRemove) {
        state.cartItems = state.cartItems.filter(
          (item) => item.id !== productIdToRemove
        );

        state.amount -= productToRemove.quantity;
        state.total -=
          productToRemove.quantity * parseFloat(productToRemove.price);
      }
    },
    updateTotal: (state) => {
      let newTotal = 0;
      let newAmount = 0;

      state.items.forEach((item) => {
        newTotal += parseFloat(item.price) * item.quantity;
        newAmount += item.quantity;
      });
      state.total = newTotal;
      state.amount = newAmount;
    },
    updateQuantity: (state, action) => {
      const { productId, newQuantity } = action.payload;
      const productToUpdate = state.cartItems.find(
        (item) => item.id === productId
      );

      if (productToUpdate) {
        productToUpdate.quantity = newQuantity;
        state.total = state.cartItems.reduce(
          (acc, item) => acc + item.price * item.quantity,
          0
        );
        state.amount = state.cartItems.reduce(
          (acc, item) => acc + item.quantity,
          0
        );
      }
    },
  },
});

export const { addToCart, removeFromCart, updateTotal, updateQuantity } =
  cartSlice.actions;
export default cartSlice.reducer;
