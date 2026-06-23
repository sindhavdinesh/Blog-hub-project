'use client';

import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Search } from 'lucide-react';
import styles from '@/styles/Home.module.css';
import { fetchBlogs } from '@/redux/action/blogAction';
import { setPage as setGlobalPage } from '@/redux/slice/blogSlice';
import Filtering from '@/Components/Filtering/Filtering';
import BlogCards from '@/Components/BlogCard/BlogCards';

export default function Home() {
  const dispatch = useDispatch();
  const { blogs, loading, pagination } = useSelector((state) => state.blogs);
  
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [sortBy, setSortBy] = useState('desc');
  const [debouncedSearch, setDebouncedSearch] = useState('');

  // Local pagination to trigger dispatch
  const handlePageChange = (newPage) => {
    dispatch(setGlobalPage(newPage));
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
      handlePageChange(1); // Reset page on search
    }, 500);
    return () => clearTimeout(timer);
  }, [search, dispatch]);

  useEffect(() => {
    const timer = setTimeout(() => {
       dispatch(fetchBlogs({
        search: debouncedSearch,
        category,
        sortBy,
        page: pagination.currentPage,
        limit: pagination.limit
      }));
    }, 0);
    return () => clearTimeout(timer);
  }, [debouncedSearch, category, sortBy, pagination.currentPage, pagination.limit, dispatch]);

  const setPage = (newPage) => {
    handlePageChange(newPage);
  };

  return (
    <div className="animate-fade-in">


      <Filtering 
        search={search} 
        setSearch={setSearch} 
        category={category} 
        setCategory={setCategory} 
        sortBy={sortBy}
        setSortBy={setSortBy}
        setPage={setPage} 
      />

      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', margin: '80px 0' }}>
          <div className={styles.spinner}></div>
        </div>
      ) : blogs.length === 0 ? (
        <div className={styles.emptyState}>
          <Search className={styles.emptyIcon} size={64} />
          <h2 className={styles.emptyTitle}>The cosmos is empty here</h2>
          <p style={{ marginTop: '12px', color: 'var(--text-dim)' }}>Try exploring a different dimension or search term.</p>
        </div>
      ) : (
        <>
          <BlogCards blogs={blogs} />

          {/* Pagination */}
          {pagination.totalPages > 1 && (
            <div className={styles.pagination}>
              <button
                className="btn-secondary"
                disabled={pagination.currentPage === 1}
                onClick={() => handlePageChange(Math.max(pagination.currentPage - 1, 1))}
              >
                Previous
              </button>
              <span className={styles.pageIndicator}>
                Page {pagination.currentPage} of {pagination.totalPages}
              </span>
              <button
                className="btn-secondary"
                disabled={pagination.currentPage === pagination.totalPages}
                onClick={() => handlePageChange(Math.min(pagination.currentPage + 1, pagination.totalPages))}
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
