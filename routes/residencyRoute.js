// import express from "express";
// import { createResidency } from "../controllers/resdCntrl.js";
// const router = express.Router();

// router.post("/create",createResidency)


// export {router as residencyRoute}



import express from "express";
import { createResidency } from "../controllers/resdCntrl.js";

const router = express.Router();

// Route to create a residency
router.post("/create", createResidency);

export { router as residencyRoute };
