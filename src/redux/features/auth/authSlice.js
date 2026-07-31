import { createSlice } from '@reduxjs/toolkit'

// -------------------------------------------------------------
// Synchronous Rehydration: Check localStorage BEFORE app renders
// -------------------------------------------------------------
const savedUser = localStorage.getItem("user");
const savedRole = localStorage.getItem("role");
const savedToken = localStorage.getItem("accessToken");

let initialUser = null;
let initialRole = null; // Changed to null so it doesn't assume 'citizen' on boot
let initialIsAuthenticated = false;
let initialIsVerified = false;
let initialStatus = null;

if (savedToken) {
    initialRole = savedRole || null;
    initialIsAuthenticated = !!savedRole;

    if (savedUser) {
        try {
            const parsedUser = JSON.parse(savedUser);
            initialUser = parsedUser;
            initialRole = parsedUser?.role || savedRole || null;
            initialStatus = parsedUser?.status || null;
            initialIsVerified = parsedUser?.isVerified ?? true;
            initialIsAuthenticated = true;
        } catch (err) {
            console.error("Invalid user string in localStorage", err);
            localStorage.removeItem("user");
        }
    }
}

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: initialUser,
        role: initialRole, // Starts with actual role, or null if logged out
        status: initialStatus,
        isAuthenticated: initialIsAuthenticated, // Starts true if user & token exist
        isverified: initialIsVerified,
        email: '',
        accessToken: savedToken || null,
        isLoggedOut: false,
    },

    reducers: {
        // LOGIN
        login: (state, action) => {
            const { user, accessToken } = action.payload;

            state.user = user;
            state.role = user?.role || null;
            state.status = user?.status || null;
            state.isAuthenticated = true;
            state.isverified = user?.isVerified ?? true;
            state.accessToken = accessToken;

            state.isLoggedOut = false;
        },

        // LOGOUT
        logout: (state) => {
            state.user = null;
            state.role = null; // Revert to null instead of forcing 'citizen'
            state.status = null;
            state.isAuthenticated = false;
            state.isverified = false;
            state.email = '';
            state.accessToken = null;
            state.isLoggedOut = true;
        },

        // TOKEN REFRESH SAFE UPDATE
        setAccessToken: (state, action) => {
            state.accessToken = action.payload;
            state.isAuthenticated = !!action.payload;

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