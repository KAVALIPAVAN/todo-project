import express from "express";
// import uploadFile from "../middlewares/multer.js";
import uploadFile from "../middleware/multer.js";
import { createPost, createUser, deletePost, getSinglePost, getUserPosts, loginUser, logOutUser, myProfile, updatePost } from "../controllers/userController.js";
import { isAuth } from "../middleware/isAuth.js";

const router = express.Router();

router.post("/newuser",uploadFile,createUser);
router.post("/newpost",isAuth, createPost);
router.get("/user",isAuth, myProfile);
router.post("/login", loginUser);
router.get("/:id",isAuth, getUserPosts);
router.get("/posts/:id",isAuth, getSinglePost);
router.put("/posts/:id",isAuth, updatePost);
router.delete("/posts/:id",isAuth, deletePost);
router.post("/logout",isAuth,logOutUser);

export default router;