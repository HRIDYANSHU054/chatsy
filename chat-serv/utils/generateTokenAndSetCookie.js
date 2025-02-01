import jwt from "jsonwebtoken";

export function generateTokenAndSetCookie(resp, userId) {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  resp.cookie("token", token, {
    httpOnly: true, //Saves from XSS attacks, can't access using client side js
    secure: process.env.NODE_ENV === "production", //Only works on https (where s stands for secure)
    sameSite: "strict", //Cookie can only be set in the same domain, protects from CSRF attacks
    maxAge: 7 * 24 * 60 * 60 * 1000, //7 days in milliseconds
  });
}
