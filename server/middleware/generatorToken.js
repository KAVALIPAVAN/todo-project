import jwt from "jsonwebtoken";

const generateToken = (id, res) => {
  const token = jwt.sign({ id }, process.env.JWT_SEC, {
    expiresIn: "1d",
  });

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // ✅ Use secure cookies in production
    sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax", // ✅ Fix for cross-origin
    path: "/",  
    maxAge: 24 * 60 * 60 * 1000, // 1 day
  });
};

export default generateToken;  
