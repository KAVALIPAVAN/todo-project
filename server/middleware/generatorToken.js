import jwt from "jsonwebtoken";

const generateToken = (id, res) => {
  const token = jwt.sign({ id }, process.env.JWT_SEC, {
    expiresIn: "1d",
  });

  res.cookie("token", token, {
    httpOnly: true,
    secure: true, // ✅ Use secure cookies in production
    sameSite:  "None", // ✅ Fix for cross-origin
    path: "/",  
    maxAge: 24 * 60 * 60 * 1000, // 1 day
  });
};

export default generateToken;  
