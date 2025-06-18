import { createSlice } from "@reduxjs/toolkit";

const savedProduct = localStorage.getItem('productDetails');


const initialState ={
    productDetails: savedProduct ? JSON.parse(savedProduct) : null,
};

const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
      setProductDetails: (state, action) => {
        state.productDetails = action.payload;
        localStorage.setItem('productDetails', JSON.stringify(action.payload)); 
      },
      clearProductDetails: (state) => {
        state.productDetails = null;
        localStorage.removeItem('productDetails'); 
      },
    },
  });

export const { setProductDetails, clearProductDetails } = productSlice.actions;
export default productSlice.reducer;