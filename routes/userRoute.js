import express from "express";
import { createUser, bookVisit, allBookings } from "../controllers/userCntrl.js";


const router = express.Router();



router.post("/register",createUser)
router.post("/bookVisit/:id",bookVisit)
router.post("/allBookings",allBookings)


export {router as userRoute}