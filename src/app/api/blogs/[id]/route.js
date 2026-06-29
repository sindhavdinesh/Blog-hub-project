import { NextResponse } from 'next/server';
import connectDB from '../../../../../config/db.js';
import Blog from '../../../../../models/Blog.js';

export async function GET(req, { params }) {
  try {
    await connectDB();
    const { id } = await params;
    const blog = await Blog.findById(id);
    if (!blog) {
      return NextResponse.json({ success: false, error: 'Blog post not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, blog });
  } catch (error) {
    const { id } = await params;
    console.error(`API Error (GET /api/blogs/${id}):`, error);
    return NextResponse.json({ success: false, error: 'Invalid ID or query error' }, { status: 500 });
  }
}

export async function PUT(req, { params }) {
  try {
    await connectDB();
    const { id } = await params;
    const body = await req.json();
    const updatedBlog = await Blog.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });
    if (!updatedBlog) {
      return NextResponse.json({ success: false, error: 'Blog post not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, blog: updatedBlog });
  } catch (error) {
    const { id } = await params;
    console.error(`API Error (PUT /api/blogs/${id}):`, error);
    return NextResponse.json({ success: false, error: error.message || 'Failed to update blog' }, { status: 400 });
  }
}

export async function DELETE(req, { params }) {
  try {
    await connectDB();
    const { id } = await params;
    const deletedBlog = await Blog.findByIdAndDelete(id);
    if (!deletedBlog) {
      return NextResponse.json({ success: false, error: 'Blog post not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, message: 'Blog post deleted successfully' });
  } catch (error) {
    const { id } = await params;
    console.error(`API Error (DELETE /api/blogs/${id}):`, error);
    return NextResponse.json({ success: false, error: 'Failed to delete blog post' }, { status: 500 });
  }
}
