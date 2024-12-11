import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";

const initialState = {
  items: [],
  totalAmount: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.items.find(
        (item) => item._id === action.payload._id
      );
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
      state.totalAmount = state.items.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
    },

    incrementQuantity: (state, action) => {
      const item = state.items.find((item) => item._id === action.payload);
      if (item) {
        item.quantity += 1;
      }
      state.totalAmount = state.items.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
    },

    decrementQuantity: (state, action) => {
      const item = state.items.find((item) => item._id === action.payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      }
      state.totalAmount = state.items.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
    },

    removeFromCart: (state, action) => {
      state.items = state.items.filter((item) => item._id !== action.payload);
      state.totalAmount = state.items.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
    },

    clearCart: (state) => {
      state.items = [];
      state.totalAmount = 0;
    },
  },
});

export const {
  addToCart,
  incrementQuantity,
  decrementQuantity,
  removeFromCart,
  clearCart,
} = cartSlice.actions;

const selectCartItemsBase = (state) => state.cartSlice?.items || [];

export const selectCartItems = createSelector(
  [selectCartItemsBase],
  (cartItems) => cartItems
);

export const selectTotalAmount = (state) => state.cartSlice?.totalAmount || 0;

export default cartSlice.reducer;
