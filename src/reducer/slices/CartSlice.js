import { createSlice } from '@reduxjs/toolkit';
import { addToCart, removeFromCart, deleteCart, feachActiveCartsByUser } from '../services/CartService';

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cart: null,
        loading: false,
        error: null,
    },
    reducers: {
        setCart: (state, action) => {
            state.cart = action.payload;
        },
        clearCart: (state) => {
            state.cart = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(addToCart.pending, (state) => {
                state.loading = true;
            })
            .addCase(addToCart.fulfilled, (state, action) => {
                state.loading = false;
                state.cart = action.payload;
            })
            .addCase(addToCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(removeFromCart.pending, (state) => {
                state.loading = true;
            })
            .addCase(removeFromCart.fulfilled, (state, action) => {
                state.loading = false;
                state.cart = action.payload;
            })
            .addCase(removeFromCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(deleteCart.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteCart.fulfilled, (state, action) => {
                state.loading = false;
                state.cart = action.payload;
            })
            .addCase(deleteCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(feachActiveCartsByUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(feachActiveCartsByUser.fulfilled, (state, action) => {
                state.loading = false;
                state.cart = action.payload;
            })
            .addCase(feachActiveCartsByUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { setCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;