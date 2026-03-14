import express from "express";
import { 
  registerSendOtp,
  register,
  refreshAccessToken,
  login,
  logout,
  getUser
 } from "./admin.controllers.js";
import { verifyJWT } from "./authAdmin.middleware.js"

const router = express.Router();

// register 

router.post("/register-send-otp", registerSendOtp);
router.post("/register", register);

// refreshtoken 

router.route("/refresh-token").post(refreshAccessToken);

// login 

router.post("/login", login);
router.post("/logout", verifyJWT, logout);

router.get("/get-admin", verifyJWT, getUser);

export default router;