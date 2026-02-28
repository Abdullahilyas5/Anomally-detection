import { createSlice } from '@reduxjs/toolkit'


const compSlice = createSlice({
    name: 'comp',
    initialState: {
        showMenu : 'false'    
    },
    reducers: { 
        setMenu :  (state)=>{
          state.showMenu = !state.showMenu;
        },
    }
})

export const { setMenu } = compSlice.actions
export const compReducer = compSlice.reducer
