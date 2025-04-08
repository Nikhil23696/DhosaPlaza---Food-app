import getDataUri from "../utils/dataUri.js";
import cloudinary from 'cloudinary'
import { User } from '../models/userModel.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

//register
export const register = async (req, res) => {
    try {
        const file = req.file;
        const fileUri = getDataUri(file);
        const myCloud = await cloudinary.v2.uploader.upload(fileUri.content)

        const { name, email, password, role } = req.body;
        if (!name || !email || !password || !role) {
            return res.status(404).json({
                message: 'Something is missing!'
            })
        }
        const user = await User.findOne({ email });
        console.log(user)
        if (user) {
            return res.status(400).json({
                message: 'User already exist with this email'
            })
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create({
            name,
            email,
            password: hashedPassword,
            role,
            avatar: {
                public_id: myCloud.public_id,
                url: myCloud.secure_url
            },
        });
        return res.status(201).json({
            success:true,
            message: 'Account created Successfully'
        })
    } catch (error) {
        console.log(error)
    }
}
//login
export const login = async (req, res) => {
    try {
        const { email, password, role } = req.body;
        if (!email || !password || !role) {
            return res.status(404).json({
                message: 'Please Fill above Fields'
            })
        }
        const user = await User.findOne({ email }).select("+password");
        if (!user) {
            return res.status(400).json({
                message: 'Incorrect email or password'
            })
        }
        const comparePassword = await bcrypt.compare(password, user.password)
        if (!comparePassword) {
            return res.status(400).json({
                message: 'Incorrect email or password'
            })
        }
        const token = await jwt.sign({ userId: user._id }, process.env.SECRET_KEY, { expiresIn: '7d' });

        return res.status(200).cookie("token", token, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000
        }).json({
            success:true,
            message: `Welcome back ${user.name}`,
            user
        })
    } catch (error) {
        console.log(error)
    }
}
// logout 
export const logout = async (_, res) => {
    try {
        return res.status(200).cookie("token", "", { maxAge: 0 }).json({
            success:true,
            message: "Logged out successfully.",
        })
    } catch (error) {
        console.log(error)
    }
}
// get all user
export const getAllUser = async (req, res) => {
    try {
          const user = await User.find();
          res.status(200).json({
            success: true,
            user
          })
    } catch (error) {
        console.log(error)
    }
}