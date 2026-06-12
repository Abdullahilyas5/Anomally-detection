import { createSlice } from '@reduxjs/toolkit'


const compSlice = createSlice({
    name: 'comp',
    initialState: {
        showMenu : false,
        showMobileMenu : false,
        screentype : 'desktop', 
        Threshold : null ,    
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
        },
        setThreshold : (state , payload) => {
            state.Threshold = action.Threshold;
        }
    }
})

export const { setMenu, setScreenType, setMenuMobile } = compSlice.actions
export const compReducer = compSlice.reducer
