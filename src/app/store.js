import { configureStore } from "@reduxjs/toolkit";
import authReducer from './features/Auth/reducer';
import cartReducer from './features/Carts/reducer';
import productReducer from './features/Product/reducer';
import addressReducer from "./features/Address/reducer";

const store = configureStore({
  reducer: {
    cart: cartReducer,
    auth: authReducer,
    product: productReducer,
    address: addressReducer
  },
});

export default store;
