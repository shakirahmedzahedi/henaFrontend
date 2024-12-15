import { createSlice } from '@reduxjs/toolkit';
import {signIn, signUp, updateAddress, addToFavorite, removeFromFavorite, fetchUserById, renewToken} from './../services/AuthService';

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        token: null,
        isAuthenticated: false,
        loading: false,
        error: null,
        text: null
    },
    reducers: {
        clearError: (state) => {
            state.error = null;
            state.text = null; // Action to clear error messages if needed
        },
        authCheck: (state, action) => {
            state.isAuthenticated = action.payload.isAuthenticated;
            state.token = action.payload.token;
            state.user = action.payload.data;
        },
        fetchFavorite: (state, action) => {
            console.log(action.payload);
            state.user = action.payload.data;
        },
        signout: (state) => {
            state.user = null;
            state.token = null;
            state.isAuthenticated = false;
            state.loading = false;
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(signIn.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(signIn.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
                state.token = action.payload.token;
                state.isAuthenticated = true;
            })
            .addCase(signIn.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(signUp.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(signUp.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                state.text = action.payload;
                console.log(state.text);
            })
            .addCase(signUp.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
               
            })
            .addCase(updateAddress.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateAddress.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
                
            })
            .addCase(updateAddress.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
               
            })
            .addCase(addToFavorite.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addToFavorite.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
                
            })
            .addCase(addToFavorite.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
               
            })
            .addCase(removeFromFavorite.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(removeFromFavorite.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
                
            })
            .addCase(removeFromFavorite.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
               
            })
            .addCase(fetchUserById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUserById.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
                
            })
            .addCase(fetchUserById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
               
            })
            .addCase(renewToken.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(renewToken.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
                state.token = action.payload.token;
                state.isAuthenticated = true;
                
            })
            .addCase(renewToken.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
               
            });
    }
});

export const { clearError, authCheck, signout, fetchFavorite } = authSlice.actions;
export default authSlice.reducer;