import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ViewTransition } from 'react';
import { getAllProjects, getProjectBySlug } from '@/lib/projects';
import styles from './page.module.css';

export async function generateStaticParams() {
  const projects = getAllProjects();
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return {
      title: 'Project Not Found',
    };
  }

  return {
    title: `${project.title} - Quinton Miller`,
    description: project.description,
  };
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <Link href="/work" className={styles.backLink}>
          ← Back to Work
        </Link>

        <ViewTransition name={project.title + 'title'}>
          <h1 className={styles.title}>{project.title}</h1>
        </ViewTransition>

        <div className={styles.tags}>
          {project.technologies.map((tech) => (
            <span key={tech} className={styles.tag}>
              {tech}
            </span>
          ))}
        </div>
      </div>

      {project.imageUrl && (
        <div className={styles.imageWrapper}>
          <Image
            src={project.imageUrl}
            alt={project.title}
            width={1200}
            height={800}
            className={styles.image}
          />
        </div>
      )}

      <div className={styles.content}>
        <p className={styles.description}>{project.description}</p>

        {project.story && (
          <section className={styles.story}>
            <h2>The Story</h2>
            <p>{project.story}</p>
          </section>
        )}

        <div className={styles.links}>
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.primaryBtn}
            >
              {project.liveUrlText ?? 'Live Demo'} →
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.secondaryBtn}
            >
              GitHub →
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
