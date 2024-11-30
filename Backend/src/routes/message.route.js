import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { getUserForSidebar } from "../controllers/message.controller.js";

const router = Router()

// Protected routes
router.get("/users",verifyJWT,getUserForSidebar)

export default router