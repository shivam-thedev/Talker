import { User } from "../models/user.model.js"
import bcrypt from "bcryptjs"
import { generateToken } from "../utils/generateToken.js"

export const signup = async (req,res) => {
    const {fullName,email,password} = req.body
    try {
        if(!fullName || !email || !password){
            return res.status(400).json({message:"All fields are required"})
        }

        if(password<6){
            return res.status(400).json({message:"Password must be at least 6 characters"})
        }

        const existedUser = await User.findOne({email})

        if(existedUser){
            return res.status(400).json({message:"Email already exists"})
        }

        const hashPassword = bcrypt.hash(password,10)

        const user = new User({
            fullName,
            email,
            password:hashPassword
        })

        if(user){
            generateToken(user._id,res)
            await user.save()

            res.status(201).json({
                id:user._id,
                fullName:user.fullName,
                email:user.fullName,
                profilePic:user.profilePic
            })
        }else{
            res.status(400).json({message:"Invalid user data"})
        }
    } catch (error) {
        console.log("Error in signup",error.message)
        res.status(500).json({message:"Internal server error"})
    }
}