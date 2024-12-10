import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
  totalAmount: 0,
  totalQuantity: 0,
  isLoading: false,
  error: "",
};

export const checkout = createAsyncThunk(
  "cart/checkout",
  async (orderDetails, { rejectWithValue }) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_SERVER_BASE_URL}/order`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderDetails),
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      return await res.json();
    } catch (error) {
      console.error(error);
      return rejectWithValue("Payment failed. Try again.");
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItemToCart: (state, action) => {
      const { product, quantity } = action.payload;
      const existingItem = state.cartItems.find(
        (item) => item.product.id === product.id
      );

      if (existingItem) {
        existingItem.quantity += quantity;
        existingItem.totalPrice =
          parseFloat(existingItem.product.price) * existingItem.quantity;
      } else {
        state.cartItems.push({
          product,
          quantity,
          totalPrice: parseFloat(product.price) * quantity,
        });
      }

      state.totalQuantity += quantity;
      state.totalAmount += parseFloat(product.price) * quantity;
    },

    removeItemFromCart: (state, action) => {
      const productId = action.payload;
      const existingItem = state.cartItems.find(
        (item) => item.product.id === productId
      );

      if (existingItem) {
        state.totalQuantity -= existingItem.quantity;
        state.totalAmount -= existingItem.totalPrice;
        state.cartItems = state.cartItems.filter(
          (item) => item.product.id !== productId
        );
      }
    },

    updateItemQuantity: (state, action) => {
      const { productId, quantity } = action.payload;
      const existingItem = state.cartItems.find(
        (item) => item.product.id === productId
      );

      if (existingItem) {
        const difference = quantity - existingItem.quantity;
        existingItem.quantity = quantity;
        existingItem.totalPrice =
          parseFloat(existingItem.product.price) * quantity;

        state.totalQuantity += difference;
        state.totalAmount +=
          parseFloat(existingItem.product.price) * difference;
      }
    },

    clearCart: (state) => {
      state.cartItems = [];
      state.totalAmount = 0;
      state.totalQuantity = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkout.pending, (state) => {
        state.isLoading = true;
        state.error = "";
      })
      .addCase(checkout.fulfilled, (state) => {
        state.isLoading = false;
        state.cartItems = [];
        state.totalAmount = 0;
        state.totalQuantity = 0;
      })
      .addCase(checkout.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Checkout failed.";
      });
  },
});

export const {
  addItemToCart,
  removeItemFromCart,
  updateItemQuantity,
  clearCart,
} = cartSlice.actions;

export const selectCartItems = (state) => state.cart.cartItems;
export const selectTotalAmount = (state) => state.cart.totalAmount;
export const selectTotalQuantity = (state) => state.cart.totalQuantity;
export const selectCartLoading = (state) => state.cart.isLoading;
export const selectCartError = (state) => state.cart.error;

export default cartSlice.reducer;
