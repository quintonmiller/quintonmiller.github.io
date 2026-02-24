export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  description: string;
  tags: string[];
  content?: string;
  readingTime?: string;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  description: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  liveUrlText?: string;
  imageUrl?: string;
  featured?: boolean;
  story?: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}
