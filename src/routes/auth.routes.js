import { Router } from "express";
import * as authController from "../controllers/auth.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = Router();


router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/password-reset/request", authController.requestPasswordReset);
router.post("/password-reset/conform", authController.resetPassword);
router.get("/profile", authMiddleware, authController.profile);

export default router;