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

const router = express.Router();

router.post("/register", createUser);
router.post("/bookVisit/:id", bookVisit);
router.post("/allBookings", allBookings);
router.post("/removeBookings/:id", cancelBooking);
router.post("/toFav/:rid",toFav)
router.post("/allFav",getAllFav)

export { router as userRoute };