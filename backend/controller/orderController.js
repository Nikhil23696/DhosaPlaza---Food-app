import { Order } from "../models/orderModel.js";

// create order 
export const newOrder = async(req,res)=>{
    try {
        const {
            shippingInfo,
            orderItems,
            paymentInfo,
            shippingPrice,
            totalPrice
        } = req.body;
            
        const order = await Order.create({
            shippingInfo,
            orderItems,
            paymentInfo,
            shippingPrice,
            totalPrice,
            paidAt: Date.now(),
            user:req.id
        });
        res.status(201).json({
            success:true,
            order
        })

    } catch (error) {
        console.log(error) 
    }
}
// get all order - admin
export const getAllOrder = async(req,res)=>{
    try {
        const orders = await Order.find();
        res.status(200).json({
            success:true,
            orders
        })
    } catch (error) {
        console.log(error)
    }
}
// get my order
export const getMyOrder = async(req,res)=>{
    try {
        const orders = await Order.find({user:req.id});
        res.status(200).json({
            success:true,
            orders
        })
    } catch (error) {
        console.log(error)
    }
}
//update order status - admin
export const updateOrder = async(req,res)=>{
    try {
        const orderId = req.params.id;
        const order = Order.findById(orderId);
        if(!order){
            return res.status(400).json({
                success:false,
                message: 'Order not found'
            })
        }
        if(order.orderStatus === 'Delivered'){
            return res.status(400).json({
                message: "You have already delivered this product"
            })
        }
        
    } catch (error) {
        console.log(error)
    }
}
// delete order
export const deleteOrder = async(req,res)=>{
    try {
        const orderId = req.params.id;
        const order = Order.findById(orderId);
        if(!order){
            return res.status(400).json({
                success:false,
                message: 'Order not found'
            })
        }
        await order.deleteOne();
        res.status(200).json({ 
            success: true,
             message: 'Order deleted successfully'
        })
    } catch (error) {
        console.log(error)
    }
}
//get order details
export const getMyOrderDetails = async(req,re)=>{
    try {
        const orderId = req.params.id;
        const order = await Order.findById(orderId);
        res.status(200).json({
            success: true,
            order,
        })
    } catch (error) {
        console.log(error)
    }
}