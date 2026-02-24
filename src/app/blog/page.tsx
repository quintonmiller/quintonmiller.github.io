import { getAllBlogPosts, getAllTags } from '@/lib/blog';
import BlogSearch from '@/components/BlogSearch';
import Link from 'next/link';
import styles from './page.module.css';

export const metadata = {
  title: 'Blog',
  description: 'Articles on front-end architecture, performance, and building software at scale',
};

export default function BlogPage() {
  const posts = getAllBlogPosts();
  const tags = getAllTags();
  const heroPost = posts[0];
  const remainingPosts = posts.slice(1);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Blog</h1>
        <p className={styles.subtitle}>
          Writing on front-end architecture, performance, and lessons from building software at scale.
        </p>
      </header>

      {heroPost && (
        <Link href={`/blog/${heroPost.slug}`} className={styles.heroBlog}>
          <p className={styles.heroBlogMeta}>
            {new Date(heroPost.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
            {heroPost.readingTime && ` · ${heroPost.readingTime}`}
          </p>
          <h2 className={styles.heroBlogTitle}>{heroPost.title}</h2>
          <p className={styles.heroBlogDescription}>{heroPost.description}</p>
          {heroPost.tags.length > 0 && (
            <div className={styles.heroBlogTags}>
              {heroPost.tags.map((tag) => (
                <span key={tag} className={styles.heroBlogTag}>
                  {tag}
                </span>
              ))}
            </div>
          )}
        </Link>
      )}

      <BlogSearch posts={remainingPosts} allTags={tags} />
    </div>
  );
}
