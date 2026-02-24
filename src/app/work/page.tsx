import Image from 'next/image';
import Link from 'next/link';
import { projects } from '@/../content/projects/projects-data';
import styles from './page.module.css';
import { ViewTransition } from 'react';

export const metadata = {
  title: 'Work',
  description: 'Software work by Quinton Miller — from Amazon-scale e-commerce to AI-powered tools',
};

export default function ProjectsPage() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Work</h1>
        <p className={styles.subtitle}>
          Side projects and professional work spanning full-stack web development,
          AI-powered tools, and large-scale e-commerce systems.
        </p>
      </header>

      <div className={styles.grid}>
        {projects.map((project) => (
          <ViewTransition key={project.title} name={project.title}>
            <article key={project.id} className={styles.card}>
              {project.imageUrl && (
                <div className={styles.imageWrapper}>
                  <Image
                    src={project.imageUrl}
                    alt={project.title}
                    width={600}
                    height={400}
                    className={styles.image}
                  />
                </div>
              )}
              <div className={styles.cardContent}>
                <ViewTransition name={project.title + 'title'}>
                  <h2 className={styles.cardTitle}>{project.title}</h2>
                </ViewTransition>
                <ViewTransition name={project.title + 'desc'}>
                  <p className={styles.cardDescription}>{project.description}</p>
                </ViewTransition>

                <div className={styles.tags}>
                  {project.technologies.map((tech) => (
                    <span key={tech} className={styles.tag}>
                      {tech}
                    </span>
                  ))}
                </div>

                <div className={styles.links}>
                  <Link href={`/work/${project.slug}`} className={styles.linkDetail}>
                    View Details →
                  </Link>
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.link}
                    >
                      GitHub →
                    </a>
                  )}
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.linkPrimary}
                    >
                      {project.liveUrlText ?? 'Live Demo'} →
                    </a>
                  )}
                </div>
              </div>
            </article>
          </ViewTransition>
        ))}
      </div>
    </div>
  );
}
