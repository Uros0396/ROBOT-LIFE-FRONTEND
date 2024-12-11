import React from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import productReducer from "./ReducerComponent/getProductsReducer";
import cartReducer from "./ReducerComponent/cartSlice";
import commentReducer from "./ReducerComponent/commentSlice.js";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import App from "./App.jsx";

const cartPersistConfig = {
  key: "cart",
  storage,
};

const reducer = combineReducers({
  productSlice: productReducer,
  cartSlice: persistReducer(cartPersistConfig, cartReducer),
  comments: commentReducer,
});

const store = configureStore({
  reducer,
});

const persistor = persistStore(store);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      {" "}
      <App />
    </Provider>
  </StrictMode>
);

export { store, persistor };
