import jwt from "jsonwebtoken";
import User  from "../model/userModel.js";

export const isAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1]; // Get token from headers

    if (!token) {
      return res.status(403).json({ message: "Please Login" });
    }

    const decodedData = jwt.verify(token, process.env.JWT_SEC);

    req.user = await User.findById(decodedData.id);

    next();
  } catch (error) {
    res.status(500).json({ message: "Invalid token, please log in again." });
  }
};



//   try {
//     const token = req.cookies.token;

//     if (!token)
//       return res.status(403).json({
//         message: "Please Login",
//       });

//     const decodedData = jwt.verify(token, process.env.JWT_SEC);

//     if (!decodedData)
//       return res.status(403).json({
//         message: "token expired",
//       });

//     req.user = await User.findById(decodedData.id);

//     next();
//   } catch (error) {
//     res.status(500).json({
//       message: "Please Login",
//     });
//   }
// };