import { projects } from '@/../content/projects/projects-data';
import { Project } from './types';

export function getAllProjects(): Project[] {
  return projects;
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}
