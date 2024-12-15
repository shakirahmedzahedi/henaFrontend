import { createSlice } from '@reduxjs/toolkit';
import {
    fetchAllProducts,
    fetchProductById,
    addProduct,
    updateProduct,
    updateProductStock,
    deleteProduct,
    clearError,
} from './../services/ProductService';

const initialState = {
    products: [],
    filteredProducts: [],
    product: null,
    loading: false,
    error: null,
    success: null,
    searchQuery: '', // New field for the search query
};

const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        setSearchQuery: (state, action) => {
            state.searchQuery = action.payload;
            
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(clearError, (state) => {
                state.error = null;
            })
            .addCase(fetchAllProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAllProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload;
                state.filteredProducts = action.payload; // Initially show all products
            })
            .addCase(fetchAllProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(fetchProductById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProductById.fulfilled, (state, action) => {
                state.loading = false;
                state.product = action.payload;
            })
            .addCase(fetchProductById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(addProduct.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addProduct.fulfilled, (state, action) => {
                state.loading = false;
                state.products.push(action.payload);
                state.filteredProducts.push(action.payload);
                state.success = 'Successfully added a new product!';
            })
            .addCase(addProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(updateProduct.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateProduct.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.products.findIndex((p) => p.id === action.payload.id);
                if (index !== -1) {
                    state.products[index] = action.payload;
                    state.filteredProducts[index] = action.payload;
                }
            })
            .addCase(updateProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(updateProductStock.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateProductStock.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.products.findIndex((p) => p.id === action.payload.id);
                if (index !== -1) {
                    state.products[index].stock = action.payload.stock;
                    state.filteredProducts[index].stock = action.payload.stock;
                }
            })
            .addCase(updateProductStock.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(deleteProduct.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.loading = false;
                state.products = state.products.filter((p) => p.id !== action.payload.id);
                state.filteredProducts = state.filteredProducts.filter((p) => p.id !== action.payload.id);
            })
            .addCase(deleteProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export const { setSearchQuery } = productSlice.actions;

export default productSlice.reducer;
