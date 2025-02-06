import User from "../model/userModel.js";
import {Post} from "../model/postModel.js";
import TryCatch from '../middleware/TryCatch.js'
import getDataUrl from "../controllers/urlGenerator.js";
import generateToken from "../middleware/generatorToken.js";

//export const maxDuration=50;

export const createUser = TryCatch(async (req, res) => {
  const { name,email } = req.body;

  const file = req.file;
  const fileUrl = getDataUrl(file);
//   console.log(fileUrl);


const newUser = await User.create({
    name,
    email,
    image:fileUrl.content,
  });
  await newUser.save();
  generateToken(newUser._id, res);
  res.json({
    message: "user Created",
    user: newUser,
  });
});

export const createPost = async (req, res) => {
    try {
      const { taskName, user, status, priority, dueDate, remainder, repeat } = req.body;
  
      // Ensure user exists in the User collection
      const existingUser = await User.findById(user);
      if (!existingUser) {
        return res.status(400).json({ message: 'User not found' });
      }
  
      // Create a new post
      const newPost = new Post({
        taskName,
        user, // User reference
        status,
        priority,
        dueDate,
        remainder,
        repeat,
      });
  
      await newPost.save();
  
      // Add the post to the user's posts array
      existingUser.posts.push(newPost._id);
      await existingUser.save();
  
      res.status(201).json({
        message: 'Post created successfully',
        post: newPost,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  export const loginUser = TryCatch(async (req, res) => {
    const { email } = req.body;
  
    // Check if email is provided
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }
  
    // Find the user by email
    const user = await User.findOne({ email });
  
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    generateToken(user._id, res);
    // Return the user details
    res.status(200).json({
      message: "Login successful",
      user,
    });
  });
  
  export const myProfile = TryCatch(async (req, res) => {
    // console.log(req.user._id)
    const user = await User.findById(req.user._id);
    res.json(user);
  });

  export const getUserPosts = async (req, res) => {
    try {
      const userId = req.params.id;
  
      // Find the user by ID and populate the posts field
      const user = await User.findById(userId).populate('posts');
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      res.status(200).json({
        user,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  export const getSinglePost = async (req, res) => {
    try {
      // Get the post ID from the URL parameters
      const postId = req.params.id;
  
      // Find the post by ID and populate the 'user' field to get user details
      const post = await Post.findById(postId).populate('user');
  
      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }
  
      res.status(200).json({
        message: 'Post retrieved successfully',
        post,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };


export const updatePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const updates = req.body;  // Form data will be in req.body
    
    if (!Object.keys(updates).length) {
      return res.status(400).json({ message: 'No fields provided for update' });
    }

    const updatedPost = await Post.findByIdAndUpdate(postId, updates, {
      new: true,
      runValidators: true,
    });

    if (!updatedPost) {
      return res.status(404).json({ message: 'Post not found' });
    }

    res.status(200).json({
      message: 'Post updated successfully',
      post: updatedPost,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

  export const deletePost = async (req, res) => {
    try {
      // Get the post ID from the URL parameters
      const postId = req.params.id;
  
      // Find the post by ID and delete it
      const deletedPost = await Post.findByIdAndDelete(postId);
  
      if (!deletedPost) {
        return res.status(404).json({ message: 'Post not found' });
      }
  
      res.status(200).json({
        message: 'Post deleted successfully',
        post: deletedPost,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

 
  export const logOutUser = async (req, res) => {
    try {
      res.clearCookie("token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // ✅ Keep secure in production
        sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
        path: "/",
      });
  
      return res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
      console.error("Logout error:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  };
  

  
