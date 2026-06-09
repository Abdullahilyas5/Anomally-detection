import { createSlice } from '@reduxjs/toolkit'

/**
 * Auth State Shape:
 * - user:            the logged-in user object { id, name, email, role, isVerified }
 * - role:            "citizen" | "auditor" | "admin"
 * - status:          "active" | "inactive" | "blocked"  (admin-set approval status)
 * - isAuthenticated: true when accessToken is present
 * - isverified:      true when user has verified their email OTP
 * - email:           stored for OTP verification flow
 * - accessToken:     JWT access token
 */
const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        role: 'citizen',
        status: null,           // "active" | "inactive" | "blocked"
        isAuthenticated: false,
        isverified: false,
        email: '',
        accessToken: null,
    },
    reducers: {
        // Called after successful login - sets full auth state
        login: (state, action) => {
            const { user, accessToken } = action.payload;
            state.user = user;
            state.role = user?.role || 'citizen';
            state.status = user?.status || null;
            state.isAuthenticated = true;
            state.isverified = user?.isVerified ?? true;
            state.accessToken = accessToken;
        },

        // Logout - clear all auth state
        logout: (state) => {
            state.user = null;
            state.role = 'citizen';
            state.status = null;
            state.isAuthenticated = false;
            state.isverified = false;
            state.email = '';
            state.accessToken = null;
        },

        // Set access token only (used during token refresh)
        setAccessToken: (state, action) => {
            state.accessToken = action.payload;
            state.isAuthenticated = !!action.payload;
        },

        // Set email - used when user submits signup/login to persist for OTP flow
        setEmail: (state, action) => {
            state.email = action.payload;
        },

        // Set email verification status
        setisverified: (state, action) => {
            state.isverified = action.payload;
        },

        // Set user account status (active/inactive/blocked from admin approval)
        setStatus: (state, action) => {
            state.status = action.payload;
        },

        // Partial state update (used for signup flow before login)
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
