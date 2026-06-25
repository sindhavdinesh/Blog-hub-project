import express from 'express';
import fs from 'fs/promises';
import path from 'path';
import crypto from 'crypto';

const router = express.Router();
const filePath = path.resolve('blogs.json');

// Helper function to read blogs from local blogs.json
async function readBlogsFromFile() {
  try {
    const data = await fs.readFile(filePath, 'utf-8');
    const parsed = JSON.parse(data);
    return parsed.blogs || [];
  } catch (error) {
    console.error('Error reading blogs.json:', error);
    return [];
  }
}

// Helper function to write blogs back to local blogs.json
async function writeBlogsToFile(blogs) {
  try {
    await fs.writeFile(filePath, JSON.stringify({ blogs }, null, 2), 'utf-8');
    return true;
  } catch (error) {
    console.error('Error writing to blogs.json:', error);
    return false;
  }
}

// GET all blogs with search, sorting, filtering, and pagination
router.get('/', async (req, res) => {
  try {
    const search = req.query.search || '';
    const category = req.query.category || '';
    const sortBy = req.query.sortBy || 'desc'; // 'desc', 'asc', 'a-z', 'z-a'
    const page = parseInt(req.query.page || '1', 10);
    const limit = parseInt(req.query.limit || '6', 10);
    const skip = (page - 1) * limit;

    let blogs = await readBlogsFromFile();

    // 🔍 Build search filter (Title & Description case-insensitive)
    if (search) {
      const searchLower = search.toLowerCase();
      blogs = blogs.filter(blog => 
        (blog.title && blog.title.toLowerCase().includes(searchLower)) ||
        (blog.description && blog.description.toLowerCase().includes(searchLower))
      );
    }

    // 📁 Filter by category
    if (category) {
      blogs = blogs.filter(blog => blog.category === category);
    }

    // 🔃 Determine sorting
    if (sortBy === 'asc') {
      blogs.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    } else if (sortBy === 'desc') {
      blogs.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (sortBy === 'a-z') {
      blogs.sort((a, b) => (a.title || '').localeCompare(b.title || ''));
    } else if (sortBy === 'z-a') {
      blogs.sort((a, b) => (b.title || '').localeCompare(a.title || ''));
    } else {
      // Default: newest first
      blogs.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    // 📄 Calculate pagination
    const totalBlogs = blogs.length;
    const paginatedBlogs = blogs.slice(skip, skip + limit);

    res.json({
      success: true,
      blogs: paginatedBlogs,
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
    const blogs = await readBlogsFromFile();

    const newBlog = {
      _id: crypto.randomBytes(12).toString('hex'), // Generate 24-character hex ID (like MongoDB ObjectId)
      title: req.body.title,
      description: req.body.description,
      category: req.body.category,
      author: req.body.author,
      image: req.body.image || '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      __v: 0
    };

    blogs.push(newBlog);
    const success = await writeBlogsToFile(blogs);

    if (!success) {
      throw new Error('Failed to save data to file');
    }

    res.status(201).json({ success: true, blog: newBlog });
  } catch (error) {
    console.error('API Error (POST /api/blogs):', error);
    res.status(400).json({ success: false, error: error.message || 'Failed to create blog' });
  }
});

// GET single blog details
router.get('/:id', async (req, res) => {
  try {
    const blogs = await readBlogsFromFile();
    const blog = blogs.find(b => b._id === req.params.id);

    if (!blog) {
      return res.status(404).json({ success: false, error: 'Blog post not found' });
    }

    res.json({ success: true, blog });
  } catch (error) {
    console.error(`API Error (GET /api/blogs/${req.params.id}):`, error);
    res.status(500).json({ success: false, error: 'Query error' });
  }
});

// PUT update a blog post
router.put('/:id', async (req, res) => {
  try {
    const blogs = await readBlogsFromFile();
    const index = blogs.findIndex(b => b._id === req.params.id);

    if (index === -1) {
      return res.status(404).json({ success: false, error: 'Blog post not found' });
    }

    const updatedBlog = {
      ...blogs[index],
      title: req.body.title !== undefined ? req.body.title : blogs[index].title,
      description: req.body.description !== undefined ? req.body.description : blogs[index].description,
      category: req.body.category !== undefined ? req.body.category : blogs[index].category,
      author: req.body.author !== undefined ? req.body.author : blogs[index].author,
      image: req.body.image !== undefined ? req.body.image : blogs[index].image,
      updatedAt: new Date().toISOString()
    };

    blogs[index] = updatedBlog;
    const success = await writeBlogsToFile(blogs);

    if (!success) {
      throw new Error('Failed to save data to file');
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
    let blogs = await readBlogsFromFile();
    const originalLength = blogs.length;

    blogs = blogs.filter(b => b._id !== req.params.id);

    if (blogs.length === originalLength) {
      return res.status(404).json({ success: false, error: 'Blog post not found' });
    }

    const success = await writeBlogsToFile(blogs);

    if (!success) {
      throw new Error('Failed to save data to file');
    }

    res.json({ success: true, message: 'Blog post deleted successfully' });
  } catch (error) {
    console.error(`API Error (DELETE /api/blogs/${req.params.id}):`, error);
    res.status(500).json({ success: false, error: 'Failed to delete blog post' });
  }
});

export default router;
