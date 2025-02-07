export const isAuth = async (req, res, next) => {
  try {
    const token = req.cookies.token; 
    if (!token) {
      return res.status(401).json({ message: "Unauthorized, Please Login" });
    }

    const decodedData = jwt.verify(token, process.env.JWT_SEC);

    if (!decodedData || !decodedData.id) {
      res.clearCookie("token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
        path: "/",
      });

      return res.status(401).json({ message: "Session expired, please login again" });
    }

    req.user = await User.findById(decodedData.id);
    if (!req.user) {
      return res.status(404).json({ message: "User not found" });
    }

    next();
  } catch (error) {
    res.clearCookie("token");
    res.status(500).json({ message: "Invalid Token, Please login again" });
  }
};
