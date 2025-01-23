import mongoose from 'mongoose';

// Post Schema
const postSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  taskName: {
    type: String,
    required: true,
    trim: true,
  },
  status: {
    type: String,
    enum: [true,false],
    default: false,
  },
  priority: {
    type: String,
    enum: ['high', 'low'],
    default: 'low',
  },
  dueDate: {
    type: Date,
    default: null
  },
  remainder: {
    type: Date,
    default: null
  },
  repeat: {
    type: String,
    enum: ['none', 'daily', 'weekly', 'monthly'],
    default: 'none',
  },
}, {
  timestamps: true,
});

// Create and export the Post model
export const Post = mongoose.model('Post', postSchema);
