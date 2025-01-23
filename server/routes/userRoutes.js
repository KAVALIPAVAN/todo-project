import express from "express";
// import uploadFile from "../middlewares/multer.js";
import uploadFile from "../middleware/multer.js";
import { createPost, createUser, deletePost, getSinglePost, getUserPosts, updatePost } from "../controllers/userController.js";

const router = express.Router();

router.post("/newuser",uploadFile,createUser);
router.post("/newpost", createPost);
router.get("/:id", getUserPosts);
router.get("/posts/:id", getSinglePost);
router.put("/posts/:id", updatePost);
router.delete("/posts/:id", deletePost);

export default router;