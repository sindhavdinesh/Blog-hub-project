import { NextResponse } from 'next/server';
import connectDB from '../../../../config/db.js';
import Blog from '../../../../models/Blog.js';

export async function GET(req) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const search = searchParams.get('search') || '';
    const category = searchParams.get('category') || '';
    const sortBy = searchParams.get('sortBy') || 'desc';
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '6', 10);
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

    return NextResponse.json({
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
    return NextResponse.json({ success: false, error: 'Failed to fetch blogs' }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();
    const newBlog = await Blog.create(body);
    return NextResponse.json({ success: true, blog: newBlog }, { status: 201 });
  } catch (error) {
    console.error('API Error (POST /api/blogs):', error);
    return NextResponse.json({ success: false, error: error.message || 'Failed to create blog' }, { status: 400 });
  }
}
