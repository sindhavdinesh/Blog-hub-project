'use client';

import { Search } from 'lucide-react';
import styles from '@/styles/Home.module.css';

const CATEGORIES = [
  { label: 'All',       value: ''           },
  { label: 'Tech',      value: 'Tech'       },
  { label: 'Lifestyle', value: 'Lifestyle'  },
  { label: 'Business',  value: 'Business'  },
  { label: 'Travel',    value: 'Travel'     },
  { label: 'Food',      value: 'Food'       },
  { label: 'Other',     value: 'Other'      },
];

export default function Filtering({ search, setSearch, category, setCategory, sortBy, setSortBy, setPage }) {
  return (
    <div className={styles.controlPanel}>
      <div className={styles.topControlsRow}>
        <div className={styles.filterTabs}>
        {CATEGORIES.map(({ label, value }) => {
            const isActive = category === value;
            
            return (
              <button 
                key={label} 
                className={`${styles.tabBtn} ${isActive ? styles.activeTab : ''}`}
                onClick={() => {
                  setCategory(value);
                  setPage(1);
                }}
              >
                {label}
              </button>
            );
          })}
        </div>

        <div className={styles.sortWrapper}>
          <select 
            className={styles.selectDropdown}
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="desc" disabled hidden>Sort By</option>
            <option value="desc">Newest First</option>
            <option value="asc">Oldest First</option>
            <option value="a-z">A-Z</option>
            <option value="z-a">Z-A</option>
          </select>
        </div>
      </div>

      <div className={styles.searchWrapper}>
        <Search className={styles.searchIcon} size={20} />
        <input
          type="text"
          placeholder="Search articles..."
          className={styles.searchInput}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
    </div>
  );
}
