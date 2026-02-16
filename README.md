# Quinton Miller - Personal Website

A modern personal website built with Next.js, featuring a blog, projects showcase, and contact form.

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: CSS Modules
- **Content**: MDX for blog posts
- **Deployment**: Vercel (recommended)

## Features

- **About/Home Page**: Professional introduction with bio and highlights
- **Projects**: Showcase of personal and professional work
- **Blog**: MDX-powered blog with search and tag filtering
- **Contact**: Contact form with social links
- **SEO**: Comprehensive meta tags, sitemap, and robots.txt

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Run the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
├── content/
│   ├── blog/          # MDX blog posts
│   └── projects/      # Project data
├── docs/              # Project documentation
├── public/            # Static assets
└── src/
    ├── app/           # Next.js app router pages
    ├── components/    # React components
    ├── lib/           # Utility functions and types
    └── styles/        # CSS modules
```

## Customization

### Update Personal Information

Edit `docs/personal-info.md` and update the following:

1. Personal details (email, social links)
2. Professional experience
3. Education information
4. Projects list
5. Skills and expertise

### Update Content

#### Homepage
- Edit `src/app/page.tsx` to update the hero section and bio

#### Projects
- Edit `content/projects/projects-data.ts` to add/modify projects

#### Blog Posts
- Add new MDX files to `content/blog/`
- Include frontmatter with title, date, description, and tags

Example blog post frontmatter:
```yaml
---
title: "Your Post Title"
date: "2024-01-15"
description: "A brief description"
tags: ["Tag1", "Tag2"]
---
```

#### Footer & Header
- Update social links in `src/components/Footer.tsx`
- Update navigation in `src/components/Header.tsx`

### SEO Configuration

Update the following files before deployment:

1. `src/app/layout.tsx` - Update metadata and Open Graph tags
2. `src/app/sitemap.ts` - Update base URL to your domain
3. `public/robots.txt` - Update sitemap URL

### Contact Form

The contact form uses a Next.js API route (`src/app/api/contact/route.ts`). Currently, it logs submissions to the console. To enable email sending:

1. Choose an email service (Resend, SendGrid, AWS SES)
2. Install the appropriate SDK
3. Add your API keys to environment variables
4. Update the API route to send actual emails

Example with Resend:
```bash
npm install resend
```

Then update the API route to use Resend's SDK.

## Building for Production

```bash
npm run build
```

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository on [Vercel](https://vercel.com)
3. Configure environment variables (if using email service)
4. Deploy!

### Other Platforms

This is a standard Next.js app and can be deployed to any platform that supports Next.js:
- Netlify
- AWS Amplify
- Cloudflare Pages
- Railway
- Render

## Environment Variables

If you set up email functionality, create a `.env.local` file:

```env
# Email Service (example)
RESEND_API_KEY=your_api_key_here
```

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## License

MIT License - Feel free to use this template for your own website!

## Credits

Built by Quinton Miller using Next.js, React, and TypeScript.
