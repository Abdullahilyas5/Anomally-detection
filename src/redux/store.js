
import { configureStore } from '@reduxjs/toolkit'
import { authReducer } from './features/auth/authSlice'
import { compReducer } from './features/misc/compSlice'

const store = configureStore({
    reducer: {
        auth: authReducer,
        Menu : compReducer,
    },
})  

export default store