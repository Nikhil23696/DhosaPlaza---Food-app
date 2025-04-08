import jwt from 'jsonwebtoken'
import { User } from '../models/userModel.js'

export const isAuthenticated = async(req,res, next)=>{
   try {
    const {token} = req.cookies;
    if(!token){
        return res.status(401).json({
            success: false,
            message:'User not authenticated'
        })
    }
    const decode = await jwt.verify(token, process.env.SECRET_KEY);
    if(!decode){
        return res.status(401).json({
            success: false,
            message: 'Invalid token'
        })
    }
    req.id = decode.userId;
    next()
   } catch (error) {
    console.log(error)
   }
}
export const authorizeRole = (...roles)=>{
    return async(req,res,next)=>{
        const user = await User.findById(req.id); 
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        if(!roles.includes(user.role)){
            return res.status(403).json({
                message:`Role: ${user.role} is not authorized to access this resource`
            })
        }
        next()
    }
}