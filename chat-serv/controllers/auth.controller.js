import bcryptjs from "bcryptjs";

import { User } from "../models/User.model.js";
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";
import { throwCustomError } from "../utils/throwCustomError.js";

export async function signup(req, resp, next) {
  const { fullName, email, password } = req.body;

  if (!fullName || !email || !password) {
    return throwCustomError("Please fill all the details", 400, true, next);
  }

  if (password.length < 8) {
    return throwCustomError(
      "Password must be at least 8 characters long",
      400,
      true,
      next
    );
  }

  try {
    const user = await User.findOne({ email });

    if (user) {
      throwCustomError("User already exists", 400);
    }

    const hashedPassword = await bcryptjs.hash(password, 12);
    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
    });

    if (newUser) {
      generateTokenAndSetCookie(resp, newUser._id);
      await newUser.save();

      return resp.status(201).json({
        message: "User created",
        success: true,
        data: {
          user: {
            _id: newUser._id,
            fullName: newUser.fullName,
            email: newUser.email,
            profilePic: newUser.profilePic,
          },
        },
      });
    } else {
      throwCustomError("Invalid User data", 400);
    }
  } catch (error) {
    console.log("error in api/auth/signup", error.message);
    next(error);
  }
}

export async function login(req, resp, next) {
  const { email, password } = req.body;
  if (!email || !password) {
    return throwCustomError("Please fill all the details", 400, true, next);
  }
  try {
    const user = await User.findOne({ email });

    if (!user) {
      throwCustomError("Invalid credentials", 400);
    }

    const isCorrectPassword = await bcryptjs.compare(password, user.password);

    if (!isCorrectPassword) {
      throwCustomError("Invalid credentials", 400);
    }

    generateTokenAndSetCookie(resp, user._id);

    return resp.status(200).json({
      message: "User logged in",
      success: true,
      data: {
        user: {
          _id: user._id,
          fullName: user.fullName,
          email: user.email,
          profilePic: user.profilePic,
        },
      },
    });
  } catch (error) {
    console.log("error in api/auth/login", error.message);
    next(error);
  }
}

export async function logout(req, resp, next) {
  try {
    resp.clearCookie("token");
    return resp.status(200).json({
      message: "Logged out successfully",
      success: true,
    });
  } catch (error) {
    console.log("error in api/auth/logout", error.message);
    next(error);
  }
}

export async function checkAuth(req, resp, next) {
  const { user } = req;
  if (!user) return throwCustomError("User not found", 400);
  resp.status(200).json({
    message: "User is authenticated",
    success: true,
    data: {
      user: {
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
        profilePic: user.profilePic,
      },
    },
  });
}
