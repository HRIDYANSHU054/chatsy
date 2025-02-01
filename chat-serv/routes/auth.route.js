import express from "express";

import {
  checkAuth,
  login,
  logout,
  signup,
} from "../controllers/auth.controller.js";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";

const router = express.Router();

router.get("/check-auth", isAuthenticated, checkAuth);

router.post("/signup", signup);

router.post("/login", login);

router.post("/logout", logout);

export default router;
