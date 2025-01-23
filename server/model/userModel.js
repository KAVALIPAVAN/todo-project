import mongoose from 'mongoose';

// User Schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true, // Ensure email is unique
    trim: true,
    lowercase: true, // Convert email to lowercase
  },
  image: {
    type: String,
    default: 'https://example.com/default-profile.png', // Default profile picture
  },
  posts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post', // Reference to Post model
  }],
}, {
  timestamps: true, // Automatically add createdAt and updatedAt fields
});

// Create the User model
const User = mongoose.model('User', userSchema);

export default User;
