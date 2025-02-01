import jwt from "jsonwebtoken";

import { throwCustomError } from "../../../auth-advanced/auth-serv/utils/throwCustomError.js";
import { User } from "../models/User.model.js";

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
