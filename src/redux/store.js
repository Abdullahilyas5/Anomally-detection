
import { configureStore } from '@reduxjs/toolkit'
import { authReducer } from './features/auth/authSlice'
import { compReducer } from './features/misc/compSlice'
import {adminReducer} from './features/auth/adminSlice'

const store = configureStore({
    reducer: {
        auth: authReducer,
        Menu : compReducer,
        admin : adminReducer,
    },
})  

export default store