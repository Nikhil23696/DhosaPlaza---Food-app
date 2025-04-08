import {createSlice} from '@reduxjs/toolkit'

const loadCartFromLocalStorage = ()=>{
    const menuCart = localStorage.getItem('menuCart');
    return menuCart ? JSON.parse(menuCart) : []
}
const loadShippingInfo = ()=>{
    const shippingInfo = sessionStorage.getItem('shippingInfo');
    return shippingInfo ? JSON.parse(shippingInfo) : []
}

const menuSlice = createSlice({
    name:"menu",
    initialState:{
        allmenu:null,
        menuDetails:null,
        cart: loadCartFromLocalStorage(),
        shipMenu: loadShippingInfo(),
        newMenu:null
    },
    reducers:{
        getAllMenu:(state,action)=>{
            state.allmenu = action.payload
        },
        getMenuDetails:(state,action)=>{
            state.menuDetails = action.payload
        },
        addMenuToCart:(state,action)=>{
            state.cart.push(action.payload);
            localStorage.setItem("menuCart", JSON.stringify(state.cart))
        },
        removeMenuFromCart:(state,action)=>{
            state.cart = state.cart.filter(item => item._id !== action.payload)
        },
        getMyShippingDetails:(state,action)=>{
            state.shipMenu = action.payload;
            sessionStorage.setItem("shippingInfo",JSON.stringify(action.payload))
        },
        addNewMenu:(state,action)=>{
            state.newMenu = action.payload
        },
        removeMenu:(state,action)=>{
            state.allmenu = state.allmenu.filter(menu=> menu._id !== action.payload)
        }
    }
})
export const {getAllMenu, getMenuDetails, addMenuToCart, removeMenuFromCart, getMyShippingDetails, addNewMenu, removeMenu} = menuSlice.actions;
export default menuSlice.reducer;