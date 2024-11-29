import { createSlice } from '@reduxjs/toolkit';
import { fetchAllUsers, clearError, addRoleToUser } from '../services/UserService';

const initialState = {
    users: [],
    loading: false,
    error: null,
};

// Create slice
const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(clearError, (state) => {
                state.error = null;
            })
            // Fetch all products
            .addCase(fetchAllUsers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAllUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action.payload;
            })
            .addCase(fetchAllUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(addRoleToUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addRoleToUser.fulfilled, (state, action) => {
                state.loading = false;
                const userIndex = state.users.findIndex(
                    (user) => user.id === action.payload.id
                  );
                  if (userIndex !== -1) {
                    state.users[userIndex] = action.payload; 
                  }
            })
            .addCase(addRoleToUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
        }

    });

    export default userSlice.reducer;
