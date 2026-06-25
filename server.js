import jsonServer from 'json-server';
import cors from 'cors';
import dotenv from 'dotenv';
import fs from 'fs/promises';
import crypto from 'crypto';
import uploadRoutes from './routes/uploadRoutes.js';

dotenv.config();

const server = jsonServer.create();
const router = jsonServer.router('blogs.json');
const middlewares = jsonServer.defaults();
const PORT = process.env.PORT || 5000;

// Sync _id to id in blogs.json on startup to support json-server's id lookups
try {
  const fileData = await fs.readFile('blogs.json', 'utf-8');
  const data = JSON.parse(fileData);
  let changed = false;
  if (data.blogs) {
    data.blogs = data.blogs.map(blog => {
      if (blog._id && !blog.id) {
        blog.id = blog._id;
        changed = true;
      }
      return blog;
    });
    if (changed) {
      await fs.writeFile('blogs.json', JSON.stringify(data, null, 2), 'utf-8');
      console.log('🔄 Synced _id to id in blogs.json');
    }
  }
} catch (err) {
  console.error('Error syncing blogs.json on startup:', err);
}

// Enable CORS
server.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:3001'],
  credentials: true
}));

server.use(jsonServer.bodyParser);
server.use(middlewares);

// 📤 Retain Cloudinary Media Upload Routes
server.use('/api/upload', uploadRoutes);

// 🔄 Middleware to translate custom frontend query parameters into json-server format
server.use((req, res, next) => {
  if (req.path.startsWith('/api/blogs') || req.path.startsWith('/blogs')) {
    // 1. search -> q (JSON Server full text search)
    if (req.query.search) {
      req.query.q = req.query.search;
    }
    delete req.query.search;

    // 2. sortBy -> _sort & _order
    if (req.query.sortBy) {
      if (req.query.sortBy === 'asc') {
        req.query._sort = 'createdAt';
        req.query._order = 'asc';
      } else if (req.query.sortBy === 'desc') {
        req.query._sort = 'createdAt';
        req.query._order = 'desc';
      } else if (req.query.sortBy === 'a-z') {
        req.query._sort = 'title';
        req.query._order = 'asc';
      } else if (req.query.sortBy === 'z-a') {
        req.query._sort = 'title';
        req.query._order = 'desc';
      }
    }
    delete req.query.sortBy;

    // 3. page -> _page
    if (req.query.page) {
      req.query._page = req.query.page;
    }
    delete req.query.page;

    // 4. limit -> _limit
    if (req.query.limit) {
      req.query._limit = req.query.limit;
    }
    delete req.query.limit;

    // 5. category -> remove if empty
    if (!req.query.category) {
      delete req.query.category;
    }

    // Sync req.url with modified req.query so json-server rewriter/router sees the updated values!
    const queryParams = new URLSearchParams();
    for (const [key, val] of Object.entries(req.query)) {
      if (val !== undefined) {
        queryParams.append(key, val);
      }
    }
    const queryString = queryParams.toString();
    req.url = req.path + (queryString ? '?' + queryString : '');
  }
  
  // Auto-fill _id and id for new post requests
  if (req.method === 'POST' && (req.path.startsWith('/api/blogs') || req.path.startsWith('/blogs'))) {
    const newId = crypto.randomBytes(12).toString('hex');
    req.body.id = newId;
    req.body._id = newId;
    req.body.createdAt = new Date().toISOString();
    req.body.updatedAt = new Date().toISOString();
  }
  
  // Sync ids for updates
  if ((req.method === 'PUT' || req.method === 'PATCH') && (req.path.includes('/blogs/') || req.path.includes('/api/blogs/'))) {
    if (req.body._id) {
      req.body.id = req.body._id;
    } else if (req.body.id) {
      req.body._id = req.body.id;
    }
    req.body.updatedAt = new Date().toISOString();
  }

  next();
});

// 🔀 Rewrite '/api/blogs' to '/blogs' so json-server router can resolve it
server.use(jsonServer.rewriter({
  '/api/*': '/$1'
}));

// 🎨 Intercept responses to format them as expected by Next.js Redux state
router.render = (req, res) => {
  // Check if target resource is blogs
  if (req.url.startsWith('/blogs') || req.url.startsWith('/api/blogs')) {
    const totalCount = res.get('X-Total-Count');
    const limit = parseInt(req.query._limit || '6', 10);
    const page = parseInt(req.query._page || '1', 10);

    // Handling GET List endpoint response format
    if (Array.isArray(res.locals.data)) {
      res.jsonp({
        success: true,
        blogs: res.locals.data,
        pagination: {
          totalBlogs: parseInt(totalCount || res.locals.data.length, 10),
          totalPages: Math.ceil((totalCount || res.locals.data.length) / limit),
          currentPage: page,
          limit: limit
        }
      });
    } 
    // Handling DELETE response format
    else if (req.method === 'DELETE') {
      res.jsonp({
        success: true,
        message: 'Blog post deleted successfully'
      });
    }
    // Handling GET Single, POST, PUT response format
    else {
      res.jsonp({
        success: true,
        blog: res.locals.data
      });
    }
  } else {
    // Fallback for default json-server endpoints
    res.jsonp(res.locals.data);
  }
};

// Use the JSON Server router
server.use(router);

// Global Error Handler
server.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, error: 'Internal Server Error' });
});

server.listen(PORT, () => {
  console.log(`📡 Programmatic JSON Server active on port ${PORT}`);
});

