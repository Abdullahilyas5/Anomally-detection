import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    users: [],
    selectedUser: null,     // for role modal
    loading: false,
    error: null,
};

const adminSlice = createSlice({
    name: "admin",
    initialState,
    reducers: {

        // set all users
        setUsers: (state, action) => {
            state.users = action.payload;
        },

        // open role modal
        setSelectedUser: (state, action) => {
            state.selectedUser = action.payload;
        },

        // close modal
        clearSelectedUser: (state) => {
            state.selectedUser = null;
        },

        // update role locally (optimistic UI)
        updateUserRoleLocal: (state, action) => {
            const { id, role } = action.payload;

            state.users = state.users.map(user =>
                user.id === id ? { ...user, role } : user
            );
        },

        // block user locally
        blockUserLocal: (state, action) => {
            const id = action.payload;

            state.users = state.users.map(user =>
                user.id === id ? { ...user, status: "Blocked" } : user
            );
        },
    },
});

export const {
    setUsers,
    setSelectedUser,
    clearSelectedUser,
    updateUserRoleLocal,
    blockUserLocal,
} = adminSlice.actions;

export const adminReducer = adminSlice.reducer;