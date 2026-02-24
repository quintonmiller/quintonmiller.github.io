import Image from "next/image";
import { projects } from "@/../content/projects/projects-data";
import { getAllBlogPosts } from "@/lib/blog";
import styles from "./page.module.css";
import Link from "next/link";
import { ViewTransition } from "react";

export default function Home() {
  const featuredWork = projects.filter((p) => p.featured).slice(0, 3);
  const latestPosts = getAllBlogPosts().slice(0, 3);

  return (
    <div className={styles.container}>
      <section className={styles.hero}>
        <h1 className={styles.title}>
          Hi, I'm <span className={styles.highlight}>Quinton Miller</span>
        </h1>
        <p className={styles.subtitle}>
          I&apos;m a front-end engineer based in Seattle with over a decade of experience building high-scale web applications.
          My background spans UI systems, application architecture, and developer tooling.
        </p>
        <div className={styles.ctas}>
          <Link href="/work" className={styles.primaryBtn}>
            View Work
          </Link>
          <Link href="/blog" className={styles.secondaryBtn}>
            Read Blog
          </Link>
        </div>
      </section>

      <section className={styles.now}>
        <span className={styles.nowLabel}>Currently</span>
        <div className={styles.nowItems}>
          <div className={styles.nowItem}>
            <span className={styles.pulse} />
            Crafting advertiser tools & AI features at <Link href="/work/amazon-brand-stores">Amazon Brand Stores</Link>
          </div>
          <div className={styles.nowItem}>
            <span className={styles.pulse} />
            Designing AI-native products &amp; intelligent systems
          </div>
        </div>
      </section>

      <section className={styles.about}>
        <p className={styles.aboutText}>
          Over the past six years at Amazon, I&apos;ve contributed to products operating at significant scale, where performance, stability, and maintainability are fundamental constraints. My work has supported large-scale advertiser and customer experiences.
          <br />
          <br />
          Alongside my work at Amazon, I design and develop independent AI-centric products and frameworks. These projects explore AI-native systems, human-in-the-loop workflows, agent architectures, and productivity tooling.
        </p>
      </section>

      <section className={styles.featured}>
        <div className={styles.sectionHeader}>
          <h2>Selected Work</h2>
          <Link href="/work" className={styles.viewAllLink}>
            View All →
          </Link>
        </div>
        <div className={styles.workGrid}>
          {featuredWork.map((project) => (
            <article key={project.id} className={styles.workCard}>
              <Link href={`/work/${project.slug}`} className={styles.workCardLink}>
                {project.imageUrl && (
                  <div className={styles.workImageWrapper}>
                    <Image
                      src={project.imageUrl}
                      alt={project.title}
                      width={600}
                      height={400}
                      className={styles.workImage}
                    />
                  </div>
                )}
                <h3 className={styles.workTitle}>{project.title}</h3>
                <p className={styles.workDescription}>{project.description}</p>
                <div className={styles.workTags}>
                  {project.technologies.slice(0, 4).map((tech) => (
                    <span key={tech} className={styles.workTag}>
                      {tech}
                    </span>
                  ))}
                </div>
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.blog}>
        <div className={styles.sectionHeader}>
          <h2>Latest Posts</h2>
          <Link href="/blog" className={styles.viewAllLink}>
            View All →
          </Link>
        </div>
        <div className={styles.blogGrid}>
          {latestPosts.map((post) => (
            <article key={post.slug} className={styles.blogCard}>
              <Link href={`/blog/${post.slug}`} className={styles.blogCardLink}>
                <div className={styles.blogMeta}>
                  <time className={styles.blogDate}>
                    {new Date(post.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </time>
                  {post.readingTime && (
                    <span className={styles.blogReadingTime}>{post.readingTime}</span>
                  )}
                </div>
                <ViewTransition name={post.slug}>
                  <h3
                    className={styles.blogTitle}
                    style={{ viewTransitionName: `blog-title-${post.slug}` } as React.CSSProperties}
                  >
                    {post.title}
                  </h3>
                </ViewTransition>
                <p className={styles.blogDescription}>{post.description}</p>
                <div className={styles.blogTags}>
                  {post.tags.slice(0, 2).map((tag) => (
                    <span key={tag} className={styles.blogTag}>
                      {tag}
                    </span>
                  ))}
                </div>
              </Link>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
