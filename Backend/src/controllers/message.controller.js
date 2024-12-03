import { Message } from "../models/message.model.js"
import cloudinary from "../utils/cloudinary.js"
import { User } from "../models/user.model.js"

export const getUserForSidebar = async (req,res) => {
    try {
        const loggedInUsers = req.user._id
        const filteredUsers = await User.find({_id:{$ne:loggedInUsers}}).select("-password")

        res.status(201).json(filteredUsers)
    } catch (error) {
        console.log("Error in getting users from sidebar",error.message)
        res.status(500).json({message:"Internal server error"})
    }
}

export const getMessages = async (req,res) => {
    try {
        const {id:userToChatId} = req.params
        const myId = req.user._id
        
        const messages = await Message.find({
            $or:[
                {senderId:myId,receiverId:userToChatId},
                {senderId:userToChatId,receiverId:myId}
            ]  
        })

        res.status(200).json(messages)
    } catch (error) {
        console.log("Error in getting messages",error.message)
        res.status(500).json({message:"Internal server error"})
    }
}

export const sendMessage = async (req,res) =>{
    try {
        const {text,image} = req.body
        console.log(text)
        const {id:receiverId} = req.params
        const senderId = req.user._id
        
        let imageUrl
        if(image){
            const response = await cloudinary.uploader.upload(image)
            imageUrl = response.secure_url
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            text,
            image:imageUrl
        })

        await newMessage.save()

        // todo: realtime functionality goes here => socket.io
        
        res.status(200).json(newMessage)
    } catch (error) {
        console.log("Error in sending messages",error.message)
        res.status(500).json({message:"Internal server error"})
    }
}



