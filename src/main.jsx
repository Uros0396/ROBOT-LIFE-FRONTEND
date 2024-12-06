{
  /*import React from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import productReducer from "./ReducerComponent/getProductsReducer";
import App from "./App.jsx";

const reducer = combineReducers({
  productSlice: productReducer,
});
const store = configureStore({ reducer });

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);*/
}

import React from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import productReducer from "./ReducerComponent/getProductsReducer"; // Reducer per i prodotti
import cartReducer from "./ReducerComponent/cartSlice"; // Reducer per il carrello
import App from "./App.jsx";

// Combina i tuoi reducer
const reducer = combineReducers({
  productSlice: productReducer,
  cart: cartReducer, // Aggiungi il cartSlice qui
});

// Crea lo store Redux
const store = configureStore({
  reducer,
});

// Rendering dell'app con il Provider per Redux
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      {" "}
      {/* Provider avvolge l'intera applicazione */}
      <App />
    </Provider>
  </StrictMode>
);
