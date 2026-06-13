import { createSlice } from '@reduxjs/toolkit'

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        role: 'citizen',
        status: null,
        isAuthenticated: false,
        isverified: false,
        email: '',
        accessToken: null,

        // ✅ IMPORTANT: prevents refresh loop after logout
        isLoggedOut: false,
    },

    reducers: {

        // LOGIN
        login: (state, action) => {
            const { user, accessToken } = action.payload;

            state.user = user;
            state.role = user?.role || 'citizen';
            state.status = user?.status || null;
            state.isAuthenticated = true;
            state.isverified = user?.isVerified ?? true;
            state.accessToken = accessToken;

            // reset logout flag
            state.isLoggedOut = false;
        },

        // LOGOUT (FIXED)
        logout: (state) => {
            state.user = null;
            state.role = 'citizen';
            state.status = null;
            state.isAuthenticated = false;
            state.isverified = false;
            state.email = '';
            state.accessToken = null;

            // ✅ IMPORTANT
            state.isLoggedOut = true;
        },

        // TOKEN REFRESH SAFE UPDATE
        setAccessToken: (state, action) => {
            state.accessToken = action.payload;
            state.isAuthenticated = !!action.payload;

            // if we got a token again, user is NOT logged out anymore
            if (action.payload) {
                state.isLoggedOut = false;
            }
        },

        setEmail: (state, action) => {
            state.email = action.payload;
        },

        setisverified: (state, action) => {
            state.isverified = action.payload;
        },

        setStatus: (state, action) => {
            state.status = action.payload;
        },

        setauth: (state, action) => {
            if (action.payload.user !== undefined) state.user = action.payload.user;
            if (action.payload.role !== undefined) state.role = action.payload.role;
            if (action.payload.isverified !== undefined) state.isverified = action.payload.isverified;
            if (action.payload.isAuthenticated !== undefined) state.isAuthenticated = action.payload.isAuthenticated;
            if (action.payload.status !== undefined) state.status = action.payload.status;
        },
    },
})

export const {
    login,
    logout,
    setAccessToken,
    setEmail,
    setisverified,
    setStatus,
    setauth,
} = authSlice.actions;

export const authReducer = authSlice.reducer;