import { createSlice } from '@reduxjs/toolkit';
import { addNewOrder, fetchAllOrders, fetchOrderById, fetchOrdersByUser, updateOrder, clearError } from '../services/OrderService';

const initialState = {
    orders: [],
    allorders: [],
    order: null,
    loading: false,
    error: null,
    success: null,
};

// Create slice
const orderSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(clearError, (state) => {
                state.error = null;
            })
            // Fetch all products
            .addCase(fetchAllOrders.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAllOrders.fulfilled, (state, action) => {
                state.loading = false;
                state.allorders = action.payload;
            })
            .addCase(fetchAllOrders.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            // Fetch product by ID
            .addCase(fetchOrderById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchOrderById.fulfilled, (state, action) => {
                state.loading = false;
                state.order = action.payload;
            })
            .addCase(fetchOrderById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(addNewOrder.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addNewOrder.fulfilled, (state, action) => {
                state.loading = false;
                state.order = action.payload;
            })
            .addCase(addNewOrder.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(updateOrder.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateOrder.fulfilled, (state, action) => {
                state.loading = false;
                const updatedOrderIndex = state.allorders.findIndex(
                    (order) => order.id === action.payload.id
                  );
                  if (updatedOrderIndex !== -1) {
                    state.allorders[updatedOrderIndex] = action.payload; 
                  }
            })
            .addCase(updateOrder.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(fetchOrdersByUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchOrdersByUser.fulfilled, (state, action) => {
                state.loading = false;
                state.orders = action.payload;
            })
            .addCase(fetchOrdersByUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

    }
});

export default orderSlice.reducer;