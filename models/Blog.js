import mongoose from 'mongoose';

const BlogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please provide a title for this blog post.'],
      maxlength: [100, 'Title cannot be more than 100 characters.'],
    },
    description: {
      type: String,
      required: [true, 'Please provide a description for this blog post.'],
    },
    category: {
      type: String,
      required: [true, 'Please specify a category.'],
      enum: ['Tech', 'Lifestyle', 'Travel', 'Food', 'Business', 'Other'],
      default: 'Tech',
    },
    author: {
      type: String,
      required: [true, 'Please specify the author name.'],
    },
    image: {
      type: String, // Cloudinary Image URL
      required: [true, 'Please upload a blog cover image.'],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Blog || mongoose.model('Blog', BlogSchema);
