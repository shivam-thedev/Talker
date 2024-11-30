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

