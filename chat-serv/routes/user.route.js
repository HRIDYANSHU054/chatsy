import express from "express";

import { isAuthenticated } from "../middlewares/isAuthenticated.js";
import { updateProfile } from "../controllers/user.controller.js";

const router = express.Router();

router.put("/update-profile", isAuthenticated, updateProfile);

export default router;
