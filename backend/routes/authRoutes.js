import express from "express";
import {login , logout, signup} from '../controllers/authController.js'

const router = express.Router();

// router.get("/login",(req,res)=>{
//     res.send("Login Route")
// })


router.post("/signup",signup);
router.post("/login",login);
router.post("/logout",logout);

export default router;