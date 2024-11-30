import { Message } from "../models/message.model.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js"

export const getUserForSidebar = async (req,res) => {
    try {
        const loggedInUsers = req.user._id
        const filteredUsers = await User.find({$ne:loggedInUsers}).select("-password")

        res.status(201).json(filteredUsers)
    } catch (error) {
        console.log("Error in getting users fro sidebar",error.message)
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
        const {id:receiverId} = req.params
        const senderId = req.user._id
        
        let imageUrl
        if(image){
            const response = await uploadOnCloudinary(image)
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



