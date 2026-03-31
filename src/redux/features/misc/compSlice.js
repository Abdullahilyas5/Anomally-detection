import { createSlice } from '@reduxjs/toolkit'


const compSlice = createSlice({
    name: 'comp',
    initialState: {
        showMenu : false,
        showMobileMenu : false,
        screentype : 'desktop',    
    },
    reducers: { 
        setMenu :  (state)=>{
          state.showMenu = !state.showMenu;
        },
        setScreenType :  (state, action)=>{
          state.screentype = action.payload;
        },
        setMenuMobile : (state) => {
            state.showMobileMenu = !state.showMobileMenu;
        }
    }
})

export const { setMenu, setScreenType, setMenuMobile } = compSlice.actions
export const compReducer = compSlice.reducer
