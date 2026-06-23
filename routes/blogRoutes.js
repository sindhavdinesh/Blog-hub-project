import express from 'express';
import Blog from '../models/Blog.js';

const router = express.Router();

// GET all blogs with search, sorting, filtering, and pagination
router.get('/', async (req, res) => {
  try {
    const search = req.query.search || '';
    const category = req.query.category || '';
    const sortBy = req.query.sortBy || 'desc'; // 'desc' or 'asc'
    const page = parseInt(req.query.page || '1', 10);
    const limit = parseInt(req.query.limit || '6', 10);
    const skip = (page - 1) * limit;

    // Build query filter
    const filter = {};
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }
    if (category) {
      filter.category = category;
    }

    // Determine sort
    let sort = {};
    if (sortBy === 'asc') sort = { createdAt: 1 };
    else if (sortBy === 'desc') sort = { createdAt: -1 };
    else if (sortBy === 'a-z') sort = { title: 1 };
    else if (sortBy === 'z-a') sort = { title: -1 };
    else sort = { createdAt: -1 };

    // Execute query
    const totalBlogs = await Blog.countDocuments(filter);
    const blogs = await Blog.find(filter)
      .sort(sort)
      .skip(skip)
      .limit(limit);

    res.json({
      success: true,
      blogs,
      pagination: {
        totalBlogs,
        totalPages: Math.ceil(totalBlogs / limit),
        currentPage: page,
        limit,
      },
    });
  } catch (error) {
    console.error('API Error (GET /api/blogs):', error);
    res.status(500).json({ success: false, error: 'Failed to fetch blogs' });
  }
});

// POST create a new blog
router.post('/', async (req, res) => {
  try {
    const newBlog = await Blog.create(req.body);
    res.status(201).json({ success: true, blog: newBlog });
  } catch (error) {
    console.error('API Error (POST /api/blogs):', error);
    res.status(400).json({ success: false, error: error.message || 'Failed to create blog' });
  }
});

// GET single blog details
router.get('/:id', async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ success: false, error: 'Blog post not found' });
    }
    res.json({ success: true, blog });
  } catch (error) {
    console.error(`API Error (GET /api/blogs/${req.params.id}):`, error);
    res.status(500).json({ success: false, error: 'Invalid ID or query error' });
  }
});

// PUT update a blog post
router.put('/:id', async (req, res) => {
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedBlog) {
      return res.status(404).json({ success: false, error: 'Blog post not found' });
    }
    res.json({ success: true, blog: updatedBlog });
  } catch (error) {
    console.error(`API Error (PUT /api/blogs/${req.params.id}):`, error);
    res.status(400).json({ success: false, error: error.message || 'Failed to update blog' });
  }
});

// DELETE a blog post
router.delete('/:id', async (req, res) => {
  try {
    const deletedBlog = await Blog.findByIdAndDelete(req.params.id);
    if (!deletedBlog) {
      return res.status(404).json({ success: false, error: 'Blog post not found' });
    }
    res.json({ success: true, message: 'Blog post deleted successfully' });
  } catch (error) {
    console.error(`API Error (DELETE /api/blogs/${req.params.id}):`, error);
    res.status(500).json({ success: false, error: 'Failed to delete blog post' });
  }
});

export default router;
