'use client';

import Link from 'next/link';

import { ArrowRight, User, Calendar, Clock } from 'lucide-react';
import styles from '@/styles/Home.module.css';

export default function BlogCards({ blogs }) {
  if (!blogs || blogs.length === 0) return null;

  const featured = blogs[0];
  const rest = blogs.slice(1);

  return (
    <>
      <Link href={`/blog/${featured._id}`} className={styles.featuredPost}>
        <div className={styles.featuredImageWrapper}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={featured.image}
            alt={featured.title}
            className={styles.featuredImage}
            onError={(e) => { e.currentTarget.src = 'https://placehold.co/800x450/1a1a2e/4facfe?text=BlogHub'; }}
          />
        </div>
        <div className={styles.featuredBody}>
          <span className={styles.featuredCategory}>{featured.category}</span>
          <h2 className={styles.featuredTitle}>{featured.title}</h2>
          <div className={styles.featuredMeta}>
            <span><User size={16} /> {featured.author || 'TechCodex'}</span>
            <span><Calendar size={16} /> {featured.createdAt ? new Date(featured.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Just now'}</span>
            <span><Clock size={16} /> 5 min read</span>
          </div>
          <p className={styles.featuredDesc}>{featured.description}</p>
          <span className={styles.readMoreBtn}>
            Read Story <ArrowRight size={18} />
          </span>
        </div>
      </Link>

      <div className={styles.blogGrid}>
        {rest.map((blog) => (
          <Link href={`/blog/${blog._id}`} key={blog._id} className={styles.blogCard}>
            <div className={styles.cardImageWrapper}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={blog.image}
                alt={blog.title}
                className={styles.cardImage}
                onError={(e) => { e.currentTarget.src = 'https://placehold.co/400x250/1a1a2e/4facfe?text=BlogHub'; }}
              />
              <span className={styles.cardCategory}>{blog.category}</span>
            </div>
            <h3 className={styles.cardTitle}>{blog.title}</h3>
            <div className={styles.cardMeta}>
              <span><User size={14} /> {blog.author || 'TechCodex'}</span>
              <span><Calendar size={14} /> {blog.createdAt ? new Date(blog.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : 'Just now'}</span>
              <span><Clock size={14} /> 5 min read</span>
            </div>
            <p className={styles.cardDescription}>{blog.description}</p>
            <span className={styles.readMoreBtn}>
              Read <ArrowRight size={16} />
            </span>
          </Link>
        ))}
      </div>
    </>
  );
}
