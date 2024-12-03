import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

export const app = express()

app.use(cors({
    origin:process.env.CORS_ORIGIN || "http://localhost:5173",
    credentials:true
}))

app.use(express.json({limit:"10mb"}))
app.use(express.urlencoded({limit:"10mb",extended:true}))
app.use(cookieParser())

// Routes import
import userRouter from "./routes/user.route.js"
import messageRouter from "./routes/message.route.js"

app.use("/api/auth",userRouter)
app.use("/api/messages",messageRouter)

