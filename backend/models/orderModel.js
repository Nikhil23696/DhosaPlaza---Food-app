import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    shippingInfo: {
        address: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
        country: { type: String, required: true },
        pinCode: { type: Number, required: true },
        phoneNo: { type: Number, },
    },
    orderItems: [
        {
            name: { type: String, required: true },
            price: { type: Number, required: true },
            quantity: { type: Number, required: true },
            image: { type: String,  },
            menu: { type: mongoose.Schema.ObjectId, ref: "Menu", required: true }
        }
    ],
    user: {
        type: mongoose.Schema.ObjectId,  
        ref: "User",
        required: true
    },
    paymentInfo: {
        id: { type: String, required: true }, 
        status: { type: String, required: true },
    },
    paidAt: { type: Date, required: true },
    shippingPrice: { type: Number, default: 0, required: true },
    totalPrice: { type: Number, default: 0, required: true },
    orderStatus: { type: String, default: "Processing" },
    deliveredAt: Date,
    createdAt: {
        type: Date,
        default: Date.now
    }
});
export const Order = mongoose.model("Order", orderSchema)