import mongoose from "mongoose"

export const connectDB = async () =>{
    try {
        const connectionInstance = await mongoose.connect(process.env.MONGODB_URI)
        console.log("MongoDB connected: ",connectionInstance.connection.host)
    } catch (error) {
        console.log("MongoDB connection error ",error)
    }
}