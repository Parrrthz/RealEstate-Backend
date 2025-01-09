// import express from "express";
// import { createUser, bookVisit, allBookings } from "../controllers/userCntrl.js";


// const router = express.Router();



// router.post("/register",createUser)
// router.post("/bookVisit/:id",bookVisit)
// router.post("/allBookings",allBookings)


// export {router as userRoute}

import express from "express";
import {
  createUser,
  bookVisit,
  allBookings,
  cancelBooking,
  toFav,
  getAllFav
} from "../controllers/userCntrl.js";
import jwtCheck from "../config/auth0Config.js";

const router = express.Router();

router.post("/register",jwtCheck, createUser);
router.post("/bookVisit/:id",jwtCheck, bookVisit);
router.post("/allBookings", allBookings);
router.post("/removeBookings/:id",jwtCheck, cancelBooking);
router.post("/toFav/:rid",jwtCheck, toFav)
router.post("/allFav",jwtCheck, getAllFav)

export { router as userRoute };