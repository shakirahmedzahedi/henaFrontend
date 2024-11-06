import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/AuthSlice';


export const Store = configureStore({
    reducer: {
        auth: authReducer
       /*  user: userReducer,
        product: productReducer,
        cart: cartReducer,
        order: orderReducer */
    }
});

export default Store;