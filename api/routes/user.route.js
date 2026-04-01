// import express from "express";
// import { test } from "../controllers/user.controller.js";

// const router = express.Router();

// router.get(  '/test',test);

//  export default router;

/// update iamge

import express from "express";
import { test, updateUser } from "../controllers/user.controller.js";

const router = express.Router();

router.get("/test", test);
router.post("/update/:id", updateUser);

export default router;