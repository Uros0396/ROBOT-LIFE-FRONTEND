import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  totalProducts: 0,
  totalPages: 0,
  currentPage: 1,
  paginatedProducts: [],
  paginatedTotalPages: 0,
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

export const getPagination = createAsyncThunk(
  "products/GETpagination",
  async ({ page = 1, pageSize = 4 }, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_SERVER_BASE_URL
        }/products/pagination?page=${page}&pageSize=${pageSize}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch paginated products");
      }
      const result = await response.json();
      console.log(result.products[1].category);
      return result.products;
    } catch (error) {
      console.error(error.message);
      return rejectWithValue("Couldn't retrieve paginated products");
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
      })
      .addCase(getPagination.pending, (state) => {
        (state.isLoading = true), (state.error = "");
      })
      .addCase(getPagination.fulfilled, (state, action) => {
        console.log(
          "API Response for Pagination:",
          action.payload
        )((state.isLoading = false)),
          (state.paginatedProducts = action.payload.products || []);

        state.totalProducts = action.payload.count || 0;
        state.totalPages = action.payload.totalPages || 0;
        state.currentPage = action.meta.arg.page || 1;
        state.paginatedTotalPages = action.payload.totalPages || 0;
      })

      .addCase(getPagination.rejected, (state, action) => {
        (state.isLoading = false),
          (state.error =
            action.payload || "Couldn't retrieve paginated products");
      });
  },
});
console.log(allProductSlice);

export const allProducts = (state) => state.productSlice.products;
export const isProductLoading = (state) => state.productSlice.isLoading;
export const errorProduct = (state) => state.productSlice.error;
export const paginatedProducts = (state) =>
  state.productSlice.paginatedProducts;
export const totalProducts = (state) => state.productSlice.totalProducts;
export const totalPages = (state) => state.productSlice.totalPages;
export const currentPage = (state) => state.productSlice.currentPage;
export const paginatedTotalPages = (state) =>
  state.productSlice.paginatedTotalPages;

export default allProductSlice.reducer;
