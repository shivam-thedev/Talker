import jwt from "jsonwebtoken"
import { User } from "../models/user.model"

export const verifyJWT = async (req, _, next) => {
    try {
        const token = req.cookie.jwt

        if(!token){
            res.status(400).json({message:"Unauthorised,No token provided"})
        }

        const decode = jwt.verify(token,process.env.JWT_SECRET)

        if(!decode){
            res.status(401).json({message:"Invalid Token"})
        }

        const user = User.findById(decode._id)

        if(!user){
            res.status(404).json({message:"User not found"})
        }
        
        req.user = user

    } catch (error) {
        console.log("Error in token verification",error.message)
        res.status(500).json({message:"Internal server error"})
    }
}