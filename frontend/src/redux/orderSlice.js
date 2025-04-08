import {createSlice} from '@reduxjs/toolkit'

const orderSlice = createSlice({
    name: "order",
    initialState:{
        order:null,
        orderDetails:null,
        adminOrders: null,
    },
    reducers:{
        createOrder:(state,action)=>{
            state.order = [action.payload]
        },
        getMyOrderDetails:(state,action)=>{
            state.orderDetails = action.payload
        },
        getAdminOrders:(state,action)=>{
            state.adminOrders = action.payload
        },
        removeOrder:(state,action)=>{
            state.adminOrders = state.adminOrders.filter(order => order._id !== action.payload)
        }
    }
});
export const {createOrder,getMyOrderDetails,getAdminOrders, removeOrder} = orderSlice.actions;
export default orderSlice.reducer