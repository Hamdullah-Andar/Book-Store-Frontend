import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../redux/features/cart/cartSlice";
import booksApi from "./features/books/booksApi";
import ordersApi from "./features/orders/ordersApi";
import subscriberApi from "./features/subscriber/subscriberApi";

export default configureStore({
  reducer: {
    cart: cartReducer,
    [booksApi.reducerPath]: booksApi.reducer,
    [ordersApi.reducerPath]: ordersApi.reducer,
    [subscriberApi.reducerPath]: subscriberApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(booksApi.middleware, ordersApi.middleware, subscriberApi.middleware), 
});
