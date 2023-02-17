import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isActive: 'dashboard',
    toggleDrawer: false
}

export const sidebarSlice = createSlice({
    name: 'active',
    initialState,
    reducers:{
        setActive: (state, action ) => {
          state.isActive = action.payload
        },
        setToggleDrawer: (state, action) =>{
            state.toggleDrawer = action.payload
        }
    }
})

export const { setActive, setToggleDrawer } = sidebarSlice.actions;

export default sidebarSlice.reducer

