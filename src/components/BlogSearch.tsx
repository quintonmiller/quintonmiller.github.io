'use client';

import { useState, useMemo } from 'react';
import { BlogPost } from '@/lib/types';
import styles from './BlogSearch.module.css';
import Link from 'next/link';

interface BlogSearchProps {
  posts: BlogPost[];
  allTags: string[];
}

export default function BlogSearch({ posts, allTags }: BlogSearchProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchesSearch =
        searchQuery === '' ||
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.description.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesTag = selectedTag === null || post.tags.includes(selectedTag);

      return matchesSearch && matchesTag;
    });
  }, [posts, searchQuery, selectedTag]);

  return (
    <div>
      <div className={styles.searchBar}>
        <input
          type="text"
          placeholder="Search posts..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className={styles.searchInput}
        />
      </div>

      {allTags.length > 0 && (
        <div className={styles.tagsSection}>
          <h3>Filter by tag:</h3>
          <div className={styles.tags}>
            <button
              onClick={() => setSelectedTag(null)}
              className={`${styles.tag} ${selectedTag === null ? styles.tagActive : ''}`}
            >
              All
            </button>
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`${styles.tag} ${selectedTag === tag ? styles.tagActive : ''}`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className={styles.posts}>
        {filteredPosts.length === 0 ? (
          <p className={styles.empty}>
            {searchQuery || selectedTag
              ? 'No posts found matching your criteria.'
              : 'No blog posts yet. Check back soon!'}
          </p>
        ) : (
          filteredPosts.map((post) => (
            <article key={post.slug} className={styles.post}>
              <Link href={`/blog/${post.slug}`} className={styles.postLink}>
                <h2
                  className={styles.postTitle}
                  style={{ viewTransitionName: `blog-title-${post.slug}` } as React.CSSProperties}
                >
                  {post.title}
                </h2>
                <p className={styles.postMeta}>
                  {new Date(post.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
                <p className={styles.postDescription}>{post.description}</p>
                <div className={styles.postTags}>
                  {post.tags.map((tag) => (
                    <span key={tag} className={styles.postTag}>
                      {tag}
                    </span>
                  ))}
                </div>
              </Link>
            </article>
          ))
        )}
      </div>
    </div>
  );
}
