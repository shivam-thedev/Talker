import { Message } from "../models/message.model.js"

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



