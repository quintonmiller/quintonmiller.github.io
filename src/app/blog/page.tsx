import { getAllBlogPosts, getAllTags } from '@/lib/blog';
import BlogSearch from '@/components/BlogSearch';
import styles from './page.module.css';

export const metadata = {
  title: 'Blog - Quinton Miller',
  description: 'Articles and thoughts on web development, programming, and technology',
};

export default function BlogPage() {
  const posts = getAllBlogPosts();
  const tags = getAllTags();

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Blog</h1>
        <p className={styles.subtitle}>
          Thoughts, tutorials, and insights on web development, software engineering, and technology.
        </p>
      </header>

      <BlogSearch posts={posts} allTags={tags} />
    </div>
  );
}
