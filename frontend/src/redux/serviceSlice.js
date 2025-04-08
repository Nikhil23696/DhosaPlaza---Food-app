import { createSlice } from '@reduxjs/toolkit'

const serviceSlice = createSlice({
    name:"service",
    initialState:{
        userMenu:null
    },
    reducers:{
        openUserMenu:(state,action)=>{
            state.userMenu = action.payload
        }
    }
})
export const {openUserMenu} = serviceSlice.actions;
export default serviceSlice.reducer