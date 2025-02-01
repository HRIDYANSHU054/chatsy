import jwt from "jsonwebtoken";

import { User } from "../models/User.model.js";
import { throwCustomError } from "../utils/throwCustomError.js";

export async function isAuthenticated(req, resp, next) {
  const { token } = req.cookies;
  if (!token)
    return throwCustomError(
      "Unauthorised - no token provided",
      401,
      true,
      next
    );

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) throwCustomError("Unauthorised - invalid token", 401);

    const user = await User.findById(decoded.userId);

    if (!user) throwCustomError("Unauthorised - invalid token", 401);

    req.user = user;
    next();
  } catch (error) {
    console.log("error in verifyToken", error.message);
    next(error);
  }
}
