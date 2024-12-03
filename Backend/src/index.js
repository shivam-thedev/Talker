import { connectDB } from "./db/index.js";
import { app } from "./app.js";
import dotenv from "dotenv"

dotenv.config()

const PORT = process.env.PORT || 8000

app.listen(PORT,()=>{
    console.log("Server is listening on the PORT : ",PORT)
    connectDB();
})


