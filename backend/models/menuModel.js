import mongoose from "mongoose";

const menuShcema = new mongoose.Schema({
    name: {
        type: String,
        requird: [true, "Please enter product name"],
        trim: true
    },
    description: {
        type: String,
        requird: [true, "Please enter product description"]
    },
    price: {
        type: Number,
        requird: [true, "Please enter product price"],
        maxLength: [8, "price cannot exceed 8 figure"]
    },
    ratings: {
        type: Number,
        default: 0
    },
    images: [
        {
            public_id: {
                type: String,
                required: true,
            },
            url: {
                type: String,
                required: true,
            },
        },
    ],
    category: {
        type: String,
        required: [true, "please enter product category"]
    },
    stock: {
        type: Number,
        required: [true, "Please enter product stock"],
        maxLength: [4, "stock cannot exceed 4 character"]
    },
});
export const Menu = mongoose.model("Menu", menuShcema)