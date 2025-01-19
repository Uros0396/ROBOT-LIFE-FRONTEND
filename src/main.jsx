/*import React from "react";
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
  cartSlice: cartReducer,
  comments: commentReducer,
});

const store = configureStore({
  reducer,
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);

export { store };*/

import React from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import productReducer from "./ReducerComponent/getProductsReducer";
import cartReducer from "./ReducerComponent/cartSlice";
import commentReducer from "./ReducerComponent/commentSlice.js";
import App from "./App.jsx";

// Carica la tua chiave pubblica Stripe
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const reducer = combineReducers({
  productSlice: productReducer,
  cartSlice: cartReducer,
  comments: commentReducer,
});

const store = configureStore({
  reducer,
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      {/* Avvolgi App con Elements per Stripe */}
      <Elements stripe={stripePromise}>
        <App />
      </Elements>
    </Provider>
  </StrictMode>
);

export { store };
