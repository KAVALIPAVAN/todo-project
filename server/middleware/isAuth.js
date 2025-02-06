// import jwt from "jsonwebtoken";
// import User from "../model/userModel.js";

// export const isAuth = async (req, res, next) => {
//   try {
//     const token = req.cookies.token;
//     console.log(req.cookies.token);
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

import jwt from "jsonwebtoken";
import User from "../model/userModel.js";

export const isAuth = async (req, res, next) => {
  try {
    const token = req.cookies.token; // Retrieve token from cookies
    // console.log("Token from cookies:", token); // Log the token for debugging

    if (!token) {
      return res.status(403).json({
        message: "Please Login",
      });
    }


    const decodedData = jwt.verify(token, process.env.JWT_SEC);

    if (!decodedData || !decodedData.id) {
      return res.status(403).json({
        message: "Token expired or invalid",
      });
    }

    req.user = await User.findById(decodedData.id);
    if (!req.user) {
      return res.status(404).json({
        message: "User  not found",
      });
    }
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    console.error("Authentication error:", error); // Log the error for debugging
    res.status(500).json({
      message: "Internal server error. Please try again later.",
    });
  }
};