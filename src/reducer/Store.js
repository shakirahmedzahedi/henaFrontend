import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/AuthSlice';
import cartReducer from './slices/CartSlice';
import productReducer from './slices/ProductSlice';
import couponReducer from './slices/DiscountCouponSlice'



export const Store = configureStore({
    reducer: {
        auth: authReducer,
        cart: cartReducer,
        product: productReducer,
        coupon: couponReducer
        /*
        cart: cartReducer,
        order: orderReducer */
    }
});

export default Store;