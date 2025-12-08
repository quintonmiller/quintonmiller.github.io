# Personal Website - Design Specification

## Design Principles
1. **Minimalism**: Clean, uncluttered interface with plenty of whitespace
2. **Technical**: Showcase engineering skills through design details
3. **Professional**: Appropriate for career networking and opportunities
4. **Readable**: Content-focused with excellent typography

## Color Palette

### Light Mode (Primary)
- **Background**: `#FFFFFF` (white)
- **Surface**: `#F8F9FA` (light gray)
- **Text Primary**: `#1A1A1A` (near black)
- **Text Secondary**: `#6B7280` (gray)
- **Accent**: `#2563EB` (blue) - for links and CTAs
- **Border**: `#E5E7EB` (light gray)
- **Code Background**: `#F3F4F6` (light gray)

### Dark Mode (Future)
- To be defined if dark mode is implemented

## Typography

### Font Families
- **Headings**: Inter, system-ui, sans-serif
- **Body**: Inter, system-ui, sans-serif
- **Code**: 'JetBrains Mono', 'Fira Code', Consolas, monospace

### Font Scales
- **H1**: 2.5rem (40px) - Page titles
- **H2**: 2rem (32px) - Section headers
- **H3**: 1.5rem (24px) - Subsection headers
- **H4**: 1.25rem (20px) - Card titles
- **Body**: 1rem (16px) - Default text
- **Small**: 0.875rem (14px) - Metadata, captions

### Font Weights
- **Regular**: 400 (body text)
- **Medium**: 500 (emphasis)
- **Semibold**: 600 (subheadings)
- **Bold**: 700 (headings)

## Layout Structure

### Navigation (Header)
- Fixed/sticky header with name/logo on left
- Navigation links on right: About, Projects, Blog, Contact
- Minimal, horizontal layout
- Mobile: Hamburger menu or simplified navigation

### Homepage/About
- Hero section with name, title, and brief intro
- Profile photo (optional)
- 2-3 paragraph bio
- Key highlights (current role, location, expertise)
- CTA buttons (View Projects, Read Blog)

### Projects Page
- Grid layout (2 columns on desktop, 1 on mobile)
- Project cards with:
  - Thumbnail/screenshot
  - Title and description
  - Tech stack tags
  - Links (GitHub, Live Demo)
- Hover effects for interactivity

### Blog Index
- List/card layout of blog posts
- Each entry shows:
  - Title
  - Date
  - Description/excerpt
  - Tags
  - Read time (if implemented)
- Search bar at top
- Tag filter sidebar or horizontal tag list
- Pagination or infinite scroll (if many posts)

### Blog Post Page
- Clean, readable content area (max-width: ~700px)
- Blog post metadata at top (date, tags, read time)
- MDX content with proper formatting
- Code syntax highlighting
- Previous/Next post navigation
- Back to blog link

### Contact Page
- Simple form on left/center
- Social links prominently displayed
- Email address with copy button
- Success/error messages for form submission

### Footer
- Simple, minimal footer
- Copyright notice
- Social links (repeated)
- "Built with Next.js" or similar attribution

## Component Design

### Buttons
- **Primary**: Filled with accent color, white text
- **Secondary**: Outlined with accent color
- **Ghost**: Text-only with hover underline
- Rounded corners (4-6px)
- Hover states with subtle transitions

### Cards
- Light border or subtle shadow
- Rounded corners (8px)
- Padding: 1.5rem
- Hover effect: slight elevation or border color change

### Links
- Underline on hover
- Accent color
- Smooth transition

### Form Inputs
- Border: light gray
- Focus: accent color border
- Padding: 0.75rem
- Rounded corners (6px)

### Tags
- Small, rounded pills
- Background: light gray
- Text: dark gray
- Clickable for filtering

## Spacing System
- **xs**: 0.25rem (4px)
- **sm**: 0.5rem (8px)
- **md**: 1rem (16px)
- **lg**: 1.5rem (24px)
- **xl**: 2rem (32px)
- **2xl**: 3rem (48px)
- **3xl**: 4rem (64px)

## Responsive Breakpoints
- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

## Accessibility
- Minimum contrast ratio 4.5:1 for text
- Focus indicators on all interactive elements
- Semantic HTML elements
- Alt text for all images
- ARIA labels where needed
- Keyboard navigation support
