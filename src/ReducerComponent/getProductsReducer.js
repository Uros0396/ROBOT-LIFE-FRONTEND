import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  totalProducts: 0,
  isLoading: false,
  products: [],
  error: "",
};

export const getAllProducts = createAsyncThunk(
  "products/GETproducts",
  async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_SERVER_BASE_URL}/products`
      );

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      return await res.json();
    } catch (error) {
      console.error(error);
      throw new Error("Error Retrieving Products");
    }
  }
);

const allProductSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllProducts.pending, (state) => {
        state.isLoading = true;
        state.error = "";
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products = action.payload.products || [];
      })
      .addCase(getAllProducts.rejected, (state) => {
        state.isLoading = false;
        state.error = "Unable to retrieve products";
      });
  },
});

export const allProducts = (state) => state.productSlice.products;
export const isProductLoading = (state) => state.productSlice.isLoading;
export const errorProduct = (state) => state.productSlice.error;

export default allProductSlice.reducer;
