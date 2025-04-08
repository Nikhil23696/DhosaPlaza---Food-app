import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        requird: true
    },
    rating: {
        type: Number,
        required: true,
    },
    comment: {
        type: String,
        required: true
    },
    createdAt:{
        type: Date,
        default:Date.now
    }
});
export const Review = mongoose.model("Review", reviewSchema)