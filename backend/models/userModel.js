import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter your name"],
    },
    email: {
        type: String,
        required: [true, "Please enter your email"],
    },
    password: {
        type: String,
        required: [true, "Please enter your password"],
        select: false,
    },
    avatar: {
       public_id:
        {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }

    },
    role:{
        type:String,
        default: "user"
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
})
export const User = mongoose.model("User", userSchema)