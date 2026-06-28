'use client';

import { useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';

import { useDispatch, useSelector } from 'react-redux';
import { ArrowLeft, Edit, Trash2, Calendar, User } from 'lucide-react';
import styles from '@/styles/BlogDetail.module.css';
import { fetchBlogById, deleteBlog } from '@/redux/action/blogAction';
import { clearCurrentBlog } from '@/redux/slice/blogSlice';

export default function BlogDetail() {
  const params = useParams();
  const router = useRouter();
  const dispatch = useDispatch();
  const { id } = params;

  const { currentBlog: blog, loading, error } = useSelector((state) => state.blogs);

  useEffect(() => {
    if (!id) return;
    dispatch(fetchBlogById(id));
    
    return () => {
      dispatch(clearCurrentBlog());
    };
  }, [id, dispatch]);

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this blog post?')) {
      return;
    }

    try {
      const resultAction = await dispatch(deleteBlog(id));
      if (deleteBlog.fulfilled.match(resultAction)) {
        alert('Blog post deleted successfully.');
        window.location.href = '/';
      } else {
        alert(resultAction.payload || 'Failed to delete blog.');
      }
    } catch (err) {
      console.error(err);
      alert('Failed to delete blog.');
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (loading && !blog) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', margin: '120px 0' }}>
        <div className="spinner" style={{
          border: '3px solid rgba(255, 255, 255, 0.1)',
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          borderLeftColor: 'var(--accent-cyan)',
          animation: 'spin 1s linear infinite'
        }}></div>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className={styles.detailContainer}>
        <Link href="/" className={styles.backLink}>
          <ArrowLeft size={16} />
          Back to Cosmos
        </Link>
        <div className="glass-panel" style={{ padding: '40px', textAlign: 'center' }}>
          <h2 style={{ color: '#ff5858' }}>Error</h2>
          <p style={{ marginTop: '12px', color: 'var(--text-secondary)' }}>{error || 'Blog not found'}</p>
        </div>
      </div>
    );
  }

  return (
    <article className={styles.detailContainer}>
      <Link href="/" className={styles.backLink}>
        <ArrowLeft size={16} />
        Back to Cosmos
      </Link>

      <header className={styles.header}>
        <span className={styles.category}>{blog.category}</span>
        <h1 className={styles.title}>{blog.title}</h1>
        
        <div className={styles.metaInfo}>
          <div className={styles.authorBox}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <User size={16} style={{ color: 'var(--accent-cyan)' }} />
              <span className={styles.authorName}>{blog.author}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '4px' }}>
              <Calendar size={14} style={{ color: 'var(--text-muted)' }} />
              <span className={styles.publishDate}>{formatDate(blog.createdAt)}</span>
            </div>
          </div>

          <div className={styles.actionButtons}>
            <Link href={`/blog/edit/${blog._id}`} className="btn-secondary">
              <Edit size={16} />
              Edit
            </Link>
            <button 
              className="btn-danger" 
              onClick={handleDelete} 
              disabled={loading}
            >
              <Trash2 size={16} />
              {loading ? 'Deleting...' : 'Delete'}
            </button>
          </div>
        </div>
      </header>

      <div className={styles.imageWrapper}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={blog.image}
          alt={blog.title}
          className={styles.detailImage}
          onError={(e) => { e.currentTarget.src = 'https://placehold.co/800x400/1a1a2e/4facfe?text=No+Image'; }}
        />
      </div>

      <div className={`${styles.content} glass-panel`} style={{ padding: '40px', marginTop: '40px' }}>
        {blog.description}
      </div>
    </article>
  );
}
