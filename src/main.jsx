import React from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import productReducer from "./ReducerComponent/getProductsReducer";
import cartReducer from "./ReducerComponent/cartSlice";
import commentReducer from "./ReducerComponent/commentSlice.js";
import App from "./App.jsx";

const reducer = combineReducers({
  productSlice: productReducer,
  cart: cartReducer,
  comments: commentReducer,
});

const store = configureStore({
  reducer,
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      {" "}
      <App />
    </Provider>
  </StrictMode>
);
