import { createSlice } from '@reduxjs/toolkit'


const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isAuthenticated: false,
        user: null,
        // role : "citizen",
        // role : "auditor",
        role : "admin",
        
    },
    reducers: { 
        setauth :  (state , action)=>{
            state.isAuthenticated = action.payload.isAuthenticated;
            state.user = action.payload.user;
            state.role = action.payload.role;
        },
        login: (state, action) => {
            state.isAuthenticated = true;
            state.user = action.payload;
        }
    }
})

export const { login , setauth } = authSlice.actions
export const authReducer = authSlice.reducer
