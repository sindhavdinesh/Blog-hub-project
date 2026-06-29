'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';

import { useDispatch, useSelector } from 'react-redux';
import { ArrowLeft, Upload, X, Save, Link as LinkIcon } from 'lucide-react';
import styles from '@/styles/Form.module.css';
import { fetchBlogById, updateBlog } from '@/redux/action/blogAction';
import { validateBlogForm } from '@/utils/validateForm';

export default function UpdatePostForm() {
  const params = useParams();
  const router = useRouter();
  const dispatch = useDispatch();
  const { id } = params;
  
  const { currentBlog, loading } = useSelector((state) => state.blogs);

  // Form states
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Tech');
  const [author, setAuthor] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [imageMode, setImageMode] = useState('url');

  // Action states
  const [fetching, setFetching] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  
  // Validation errors
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!id) return;
    setFetching(true);
    dispatch(fetchBlogById(id)).then((action) => {
      if (fetchBlogById.fulfilled.match(action)) {
        const blog = action.payload;
        setTitle(blog.title);
        setCategory(blog.category);
        setAuthor(blog.author);
        setDescription(blog.description);
        setImage(blog.image || '');
        // Auto-detect: if image starts with http it's a URL, otherwise treat as upload
        if (blog.image && blog.image.startsWith('http')) {
          setImageMode('url');
        } else if (blog.image) {
          setImageMode('upload');
        }
      } else {
        alert('Failed to load blog post data.');
        router.push('/');
      }
      setFetching(false);
    });
  }, [id, dispatch, router]);

  // Client-side image upload handler
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setErrors((prev) => ({ ...prev, image: '' }));
    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || '/api';
      const res = await fetch(`${apiUrl}/upload`, {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (res.ok && data.url) {
        setImage(data.url);
      } else {
        setErrors((prev) => ({ ...prev, image: data.error || 'Failed to upload image.' }));
      }
    } catch (err) {
      console.error(err);
      setErrors((prev) => ({ ...prev, image: 'An error occurred during upload.' }));
    } finally {
      setUploading(false);
    }
  };

  const handleRemoveImage = () => {
    setImage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validation = validateBlogForm(title, author, description, image);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setSubmitting(true);
    try {
      const resultAction = await dispatch(updateBlog({
        id,
        blogData: { title, category, author, description, image }
      }));

      if (updateBlog.fulfilled.match(resultAction)) {
        alert('Blog post updated successfully!');
        router.push(`/blog/${id}`);
      } else {
        alert(resultAction.payload || 'Failed to update blog post.');
      }
    } catch (err) {
      console.error(err);
      alert('An error occurred while submitting.');
    } finally {
      setSubmitting(false);
    }
  };

  if (fetching || (loading && !submitting)) {
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

  return (
    <div className={styles.formContainer}>
      <Link href={`/blog/${id}`} className={styles.backLink} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--accent-cyan)', marginBottom: '24px' }}>
        <ArrowLeft size={16} />
        Back to Story
      </Link>

      <div className="glass-panel" style={{ padding: '40px' }}>
        <h1 className={styles.formTitle}>Edit Story</h1>
        <p className={styles.formSubtitle}>Modify details and refine this post details.</p>

        <form onSubmit={handleSubmit}>
          {/* Title */}
          <div className={styles.formGroup}>
            <label className={styles.label}>Title</label>
            <input
              type="text"
              placeholder="e.g. Entering the Quantum Web Development Era"
              className={`${styles.input} ${errors.title ? styles.inputError : ''}`}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            {errors.title && <span className={styles.errorText}>{errors.title}</span>}
          </div>

          {/* Grid Layout for Category & Author */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            {/* Category */}
            <div className={styles.formGroup}>
              <label className={styles.label}>Category</label>
              <select
                className={styles.select}
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="Tech">Tech</option>
                <option value="Lifestyle">Lifestyle</option>
                <option value="Travel">Travel</option>
                <option value="Food">Food</option>
                <option value="Business">Business</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Author */}
            <div className={styles.formGroup}>
              <label className={styles.label}>Author Name</label>
              <input
                type="text"
                placeholder="e.g. John Doe"
                className={`${styles.input} ${errors.author ? styles.inputError : ''}`}
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
              />
              {errors.author && <span className={styles.errorText}>{errors.author}</span>}
            </div>
          </div>

          {/* Image Upload Box */}
          <div className={styles.formGroup}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <label className={styles.label} style={{ margin: 0 }}>Cover Image</label>
              <div className={styles.toggleGroup}>
                <button type="button" className={`${styles.toggleBtn} ${imageMode === 'url' ? styles.activeToggle : ''}`} onClick={() => { setImageMode('url'); setImage(''); setErrors(p => ({...p, image: ''})); }}>URL</button>
                <button type="button" className={`${styles.toggleBtn} ${imageMode === 'upload' ? styles.activeToggle : ''}`} onClick={() => { setImageMode('upload'); setImage(''); setErrors(p => ({...p, image: ''})); }}>Upload</button>
              </div>
            </div>

            {imageMode === 'url' && (
              <div className={styles.urlInputWrapper}>
                <LinkIcon size={20} className={styles.urlIcon} />
                <input
                  type="url"
                  placeholder="Paste high-res image URL here..."
                  className={`${styles.input} ${errors.image ? styles.inputError : ''}`}
                  style={{ paddingLeft: '44px', marginBottom: '12px' }}
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                />
              </div>
            )}

            {imageMode === 'upload' && !image && (
              <div className={styles.uploadBox}>
                {uploading ? (
                  <div className={styles.spinner}></div>
                ) : (
                  <>
                    <Upload className={styles.uploadIcon} size={28} />
                    <div className={styles.uploadPlaceholder}>
                      <span className={styles.uploadTextStrong}>Click to upload</span> or drag and drop
                    </div>
                  </>
                )}
                <input
                  type="file"
                  accept="image/*"
                  className={styles.fileInput}
                  onChange={handleImageUpload}
                  disabled={uploading}
                />
              </div>
            )}

            {image && (
              <div className={styles.previewContainer} style={{ marginTop: imageMode === 'url' ? '0' : '8px' }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={image}
                  alt="Cover preview"
                  className={styles.previewImage}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  onError={(e) => { e.currentTarget.src = 'https://via.placeholder.com/800x240?text=Invalid+Image+URL'; }}
                />
                <button
                  type="button"
                  className={styles.removeImageBtn}
                  onClick={handleRemoveImage}
                >
                  <X size={18} />
                </button>
              </div>
            )}
            {errors.image && <span className={styles.errorText}>{errors.image}</span>}
          </div>

          {/* Description */}
          <div className={styles.formGroup}>
            <label className={styles.label}>Content / Story</label>
            <textarea
              placeholder="Write your story here..."
              className={`${styles.textarea} ${errors.description ? styles.inputError : ''}`}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            {errors.description && <span className={styles.errorText}>{errors.description}</span>}
          </div>

          {/* Action Buttons */}
          <div className={styles.formActions}>
            <Link href={`/blog/${id}`} className="btn-secondary">
              Cancel
            </Link>
            <button
              type="submit"
              className="btn-primary"
              disabled={submitting || uploading}
            >
              <Save size={18} />
              {submitting ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
