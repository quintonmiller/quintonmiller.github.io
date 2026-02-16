import Image from "next/image";
import { projects } from "@/../content/projects/projects-data";
import { getAllBlogPosts } from "@/lib/blog";
import styles from "./page.module.css";
import Link from "next/link";
import { ViewTransition } from "react";

export default function Home() {
  const featuredProjects = projects.slice(0, 3);
  const latestPosts = getAllBlogPosts().slice(0, 3);

  return (
    <div className={styles.container}>
      <section className={styles.hero}>
        <h1 className={styles.title}>
          Hi, I'm <span className={styles.highlight}>Quinton Miller</span>
        </h1>
        <p className={styles.subtitle}>
          Front-End Engineer II at Amazon, building delightful user experiences with React, TypeScript, and modern web technologies.
        </p>
        <div className={styles.ctas}>
          <Link href="/projects" className={styles.primaryBtn}>
            View Projects
          </Link>
          <Link href="/blog" className={styles.secondaryBtn}>
            Read Blog
          </Link>
        </div>
      </section>

      <section className={styles.about}>
        <h2>About Me</h2>
        <div className={styles.bioContent}>
          <p>
            I'm a Front-End Engineer based in Seattle, WA, currently working at Amazon.
            I specialize in building scalable, performant web applications with a focus on
            user experience and accessibility.
          </p>
          <p>
            I graduated from the University of Missouri - Columbia with a Bachelor's of Science
            in Computer Science and a minor in Mathematics. My journey in tech has been driven by
            a passion for solving complex problems and creating intuitive interfaces that users love.
          </p>
          <p>
            When I'm not coding, you can find me exploring new technologies, contributing to open
            source projects, or writing about web development best practices on my blog.
          </p>
        </div>

        <div className={styles.highlights}>
          <div className={styles.highlightCard}>
            <h3>Current Role</h3>
            <p>Front-End Engineer II</p>
            <p className={styles.company}>Amazon.com</p>
          </div>
          <div className={styles.highlightCard}>
            <h3>Location</h3>
            <p>Seattle, WA</p>
          </div>
          <div className={styles.highlightCard}>
            <h3>Education</h3>
            <p>B.S. Computer Science</p>
            <p className={styles.company}>University of Missouri</p>
          </div>
        </div>
      </section>

      <section className={styles.featured}>
        <div className={styles.sectionHeader}>
          <h2>Featured Projects</h2>
          <Link href="/projects" className={styles.viewAllLink}>
            View All →
          </Link>
        </div>
        <div className={styles.projectsGrid}>
          {featuredProjects.map((project) => (
            <ViewTransition key={project.title} name={project.title}>
              <article key={project.id} className={styles.projectCard}>
                {project.imageUrl && (
                  <div className={styles.projectImageWrapper}>
                    <Image
                      src={project.imageUrl}
                      alt={project.title}
                      width={600}
                      height={400}
                      className={styles.projectImage}
                    />
                  </div>
                )}
                <div className={styles.projectContent}>
                  <ViewTransition name={project.title + 'title'}>
                    <h3 className={styles.projectTitle}>{project.title}</h3>
                  </ViewTransition>
                  <ViewTransition name={project.description + 'desc'}>
                    <p className={styles.projectDescription}>{project.description}</p>
                  </ViewTransition>
                  <div className={styles.projectTags}>
                    {project.technologies.slice(0, 3).map((tech) => (
                      <span key={tech} className={styles.projectTag}>
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            </ViewTransition>
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
                <time className={styles.blogDate}>
                  {new Date(post.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </time>
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
