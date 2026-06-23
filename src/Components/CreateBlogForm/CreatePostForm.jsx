'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

import { useDispatch, useSelector } from 'react-redux';
import { ArrowLeft, Upload, X, Save, Link as LinkIcon } from 'lucide-react';
import styles from '@/styles/Form.module.css';
import { createBlog } from '@/redux/action/blogAction';
import { validateBlogForm } from '@/utils/validateForm';

export default function CreatePostForm() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { loading: submitting } = useSelector((state) => state.blogs);

  // Form states
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Tech');
  const [author, setAuthor] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(''); // Uploaded image URL
  const [imageMode, setImageMode] = useState('url'); // 'url' or 'upload'

  // Action states
  const [uploading, setUploading] = useState(false);
  
  // Validation errors
  const [errors, setErrors] = useState({});

  // Client-side image upload handler
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Clear previous image errors
    setErrors((prev) => ({ ...prev, image: '' }));

    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
      const res = await fetch(`${apiUrl}/upload`, {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (res.ok && data.url) {
        setImage(data.url);
      } else {
        setErrors((prev) => ({
          ...prev,
          image: data.error || 'Failed to upload image.',
        }));
      }
    } catch (err) {
      console.error(err);
      setErrors((prev) => ({
        ...prev,
        image: 'An error occurred during upload.',
      }));
    } finally {
      setUploading(false);
    }
  };

  const handleRemoveImage = () => {
    setImage('');
  };

  // Form submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    const validation = validateBlogForm(title, author, description, image);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    try {
      const resultAction = await dispatch(createBlog({
        title,
        category,
        author,
        description,
        image,
      }));

      if (createBlog.fulfilled.match(resultAction)) {
        alert('Blog post created successfully!');
        router.push('/');
      } else {
        alert(resultAction.payload || 'Failed to submit blog post.');
      }
    } catch (err) {
      console.error(err);
      alert('An error occurred while submitting.');
    }
  };

  return (
    <div className={styles.formContainer}>
      <Link href="/" className={styles.backLink} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--accent-cyan)', marginBottom: '24px' }}>
        <ArrowLeft size={16} />
        Back to Cosmos
      </Link>

      <div className="glass-panel" style={{ padding: '40px' }}>
        <h1 className={styles.formTitle}>Forge New Story</h1>
        <p className={styles.formSubtitle}>Create a brand-new blog entry and broadcast it to the cosmos.</p>

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
            <Link href="/" className="btn-secondary">
              Cancel
            </Link>
            <button
              type="submit"
              className="btn-primary"
              disabled={submitting || uploading}
            >
              <Save size={18} />
              {submitting ? 'Creating...' : 'Publish Blog'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
