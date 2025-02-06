import jwt from "jsonwebtoken";

const generateToken = (id, res) => {
  const token = jwt.sign({ id }, process.env.JWT_SEC, {
    expiresIn: "1d",
  });

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // Only secure in production
    sameSite: "lax", // Allows cookies for navigation
    path: "/",  // Make it accessible for all routes
    maxAge: 24 * 60 * 60 * 1000, // 1 day
  });
};

export default generateToken;