import {
  BookOpenText,
  BrainCircuit,
  Code2,
  Database,
  Gauge,
  Globe2,
  Layers3,
  LayoutDashboard,
  LockKeyhole,
  Megaphone,
  MonitorSmartphone,
  PenTool,
  Rocket,
  Search,
  ServerCog,
  ShieldCheck,
  Sparkles,
  Video,
  Workflow,
} from 'lucide-react';

export const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'Blog', path: '/blog' },
  { label: 'About', path: '/about' },
  { label: 'Contact', path: '/contact' },
];

export const heroSlides = [
  {
    eyebrow: 'Creator-owned platform',
    title: 'Publish, teach, sell, and scale from one sharp digital home.',
    phrase: ['blogs', 'videos', 'SaaS products', 'subscriber content'],
    body: 'A next-generation portfolio and content hub designed for practical technology learning, product thinking, and long-term audience ownership.',
    cta: 'Explore Blog',
    ctaPath: '/blog',
    stat: '85+',
    statLabel: 'Lighthouse target',
  },
  {
    eyebrow: 'Built for builders',
    title: 'Turn experiments into case studies, tutorials, and real product launches.',
    phrase: ['React systems', 'Node APIs', 'dashboards', 'marketplace ideas'],
    body: 'The structure is ready for dynamic posts, videos, projects, and future subscription experiences without losing a clean public brand.',
    cta: 'See Skills',
    ctaPath: '/about',
    stat: '4',
    statLabel: 'Core public pages',
  },
  {
    eyebrow: 'Future-ready brand',
    title: 'A professional front door for learning, shipping, and sharing.',
    phrase: ['SEO content', 'modern UI', 'dark mode', 'global reach'],
    body: 'The design balances futuristic motion with readable content, strong navigation, and responsive layouts for mobile-first visitors.',
    cta: 'Start Contact',
    ctaPath: '/contact',
    stat: '24/7',
    statLabel: 'Creator presence',
  },
];

export const services = [
  {
    title: 'Frontend Interfaces',
    description: 'React, Vite, Tailwind, responsive UI systems, animation, dashboards, portfolio sites, and modern landing pages.',
    icon: MonitorSmartphone,
  },
  {
    title: 'Backend Foundations',
    description: 'Node.js, Express APIs, basic authentication, JSON handling, CRUD logic, and frontend-backend integration.',
    icon: ServerCog,
  },
  {
    title: 'Content Platforms',
    description: 'Blog management, WordPress knowledge, SEO basics, search, filters, pagination, categories, and dynamic routing.',
    icon: BookOpenText,
  },
  {
    title: 'Product Systems',
    description: 'SaaS planning, admin panels, marketplace architecture, database design, deployment, and performance optimization.',
    icon: Workflow,
  },
];

export const blogPosts = [
  {
    id: 1,
    slug: 'creator-owned-platform-roadmap',
    title: 'Creator-Owned Platform Roadmap: Blog, Video, SaaS, and Subscriptions',
    excerpt:
      'A practical roadmap for building a self-owned creator platform that can publish content, sell tools, and grow subscriber trust.',
    category: 'Product Planning',
    date: '2026-06-30',
    readTime: '7 min read',
    author: 'The Om Prajapati',
    premium: false,
    featured: true,
    tags: ['Creator Platform', 'SaaS', 'MVP'],
    icon: Rocket,
    content: [
      {
        heading: 'Own the audience relationship',
        body: 'The main goal is simple: keep content, payment state, and user data under the creator brand instead of scattering the business across platforms. That gives the site room to become a blog, video library, podcast archive, and marketplace without losing control.',
      },
      {
        heading: 'Start with useful public surfaces',
        body: 'A focused MVP should launch with home, blog, video highlights, about, contact, and a strong content architecture. This makes the site useful immediately while leaving clear paths for auth, subscriptions, marketplace products, and admin controls later.',
      },
      {
        heading: 'Design for the next build',
        body: 'Even the frontend should hint at future systems: premium badges, project cards, content filters, and reusable data structures. That keeps the public site polished today and easier to connect to APIs tomorrow.',
      },
    ],
  },
  {
    id: 2,
    slug: 'react-vite-tailwind-workflow',
    title: 'React, Vite, and Tailwind Workflow for Fast Portfolio Builds',
    excerpt:
      'How a modern frontend stack helps you ship responsive pages, route-based content, and dark mode without heavy setup.',
    category: 'Frontend',
    date: '2026-06-26',
    readTime: '5 min read',
    author: 'The Om Prajapati',
    premium: false,
    featured: false,
    tags: ['React', 'Vite', 'Tailwind'],
    icon: Code2,
    content: [
      {
        heading: 'Use components as the product language',
        body: 'A good frontend is easier to scale when the layout is broken into real components: header, hero, cards, filters, sections, and route pages. Each piece can improve without rewriting the whole application.',
      },
      {
        heading: 'Keep design tokens close',
        body: 'CSS variables make theme switching practical. They also help the UI keep one visual system across cards, buttons, forms, and section backgrounds.',
      },
      {
        heading: 'Build mobile-first',
        body: 'Responsive design is not only screen resizing. It is about deciding which information matters first, keeping controls reachable, and making every page scannable on a small display.',
      },
    ],
  },
  {
    id: 3,
    slug: 'search-filter-blog-architecture',
    title: 'Planning Search and Filters for a Dynamic Blog Architecture',
    excerpt:
      'A clean approach to searchable blog categories, tags, and dynamic detail pages before the backend is connected.',
    category: 'CMS',
    date: '2026-06-18',
    readTime: '6 min read',
    author: 'The Om Prajapati',
    premium: true,
    featured: false,
    tags: ['Search', 'Filters', 'CMS'],
    icon: Search,
    content: [
      {
        heading: 'Search begins with clean content data',
        body: 'Before adding a database, the frontend can model the shape of future posts with slugs, tags, categories, excerpts, and publish dates. This makes the UI logic feel close to the real backend contract.',
      },
      {
        heading: 'Filters should reduce effort',
        body: 'Good category filtering helps visitors move from broad interest to a specific topic quickly. The interface should make filtering obvious without turning the blog into an admin dashboard.',
      },
      {
        heading: 'Dynamic routes create momentum',
        body: 'Single post pages turn the blog from a list into a real content platform. They are also the natural place for SEO metadata, related posts, newsletter prompts, and future premium gates.',
      },
    ],
  },
  {
    id: 4,
    slug: 'backend-api-basics-for-content-products',
    title: 'Backend API Basics for Content Products',
    excerpt:
      'The core Node and Express concepts behind content browsing, CRUD operations, login systems, and future paywall logic.',
    category: 'Backend',
    date: '2026-06-10',
    readTime: '8 min read',
    author: 'The Om Prajapati',
    premium: false,
    featured: false,
    tags: ['Node.js', 'Express', 'REST API'],
    icon: Database,
    content: [
      {
        heading: 'APIs protect the business rules',
        body: 'The frontend can hide buttons and labels, but important checks belong on the server. Authentication, premium access, user roles, and payment status must be verified by backend logic.',
      },
      {
        heading: 'CRUD is the admin foundation',
        body: 'Create, read, update, and delete operations power posts, videos, users, subscriptions, products, and orders. A simple CRUD layer is often the first serious step toward a real admin dashboard.',
      },
      {
        heading: 'Design the API around future growth',
        body: 'Clear endpoints, predictable JSON, and consistent error handling make it easier to add search, filters, subscriptions, and marketplace purchases later.',
      },
    ],
  },
  {
    id: 5,
    slug: 'deployment-hosting-dns-notes',
    title: 'Deployment, Hosting, and DNS Notes for First Launches',
    excerpt:
      'What matters when moving a polished frontend from local development to a hosted domain with clean production behavior.',
    category: 'Deployment',
    date: '2026-05-30',
    readTime: '4 min read',
    author: 'The Om Prajapati',
    premium: false,
    featured: false,
    tags: ['Hosting', 'DNS', 'Performance'],
    icon: Globe2,
    content: [
      {
        heading: 'Production should feel calm',
        body: 'A first deployment needs clear build output, reliable hosting, readable URLs, and a fallback strategy for client-side routes. Visitors should never see the build process.',
      },
      {
        heading: 'Domains are part of the product',
        body: 'DNS, HTTPS, redirects, and caching affect trust as much as visual polish. The site should feel stable from the first click.',
      },
      {
        heading: 'Measure before optimizing deeply',
        body: 'Use Lighthouse and browser tools to find the real bottlenecks. Images, unused JavaScript, and layout shifts are usually the first areas to inspect.',
      },
    ],
  },
  {
    id: 6,
    slug: 'modern-dashboard-ui-principles',
    title: 'Modern Dashboard UI Principles for Admin Panels',
    excerpt:
      'How to make admin interfaces feel professional, scannable, and useful without turning every screen into decoration.',
    category: 'UI/UX',
    date: '2026-05-22',
    readTime: '6 min read',
    author: 'The Om Prajapati',
    premium: true,
    featured: false,
    tags: ['Dashboard', 'Admin Panel', 'UI/UX'],
    icon: LayoutDashboard,
    content: [
      {
        heading: 'Density beats decoration',
        body: 'Operational interfaces need structure, strong hierarchy, and predictable controls. The best dashboard helps the user compare information quickly and act without confusion.',
      },
      {
        heading: 'Motion should clarify',
        body: 'Animation can make state changes feel smooth, but it should never hide important information or slow down repeated tasks.',
      },
      {
        heading: 'Reusable components create consistency',
        body: 'Tables, stat cards, filters, action menus, and forms should share a design system. That consistency makes the admin feel mature even in early versions.',
      },
    ],
  },
];

export const videos = [
  {
    title: 'Building a Blog System in React',
    category: 'Frontend',
    duration: '12:48',
    icon: Video,
    accent: 'var(--accent)',
  },
  {
    title: 'Node.js API Planning for Beginners',
    category: 'Backend',
    duration: '16:20',
    icon: ServerCog,
    accent: 'var(--accent-2)',
  },
  {
    title: 'Portfolio UI with Dark Mode',
    category: 'UI/UX',
    duration: '09:35',
    icon: Layers3,
    accent: 'var(--accent-3)',
  },
];

export const upcomingProjects = [
  {
    title: 'Creator CMS Admin',
    status: 'Designing',
    description: 'A clean dashboard for managing blogs, videos, users, subscriptions, and settings.',
    icon: LayoutDashboard,
  },
  {
    title: 'SaaS Marketplace',
    status: 'Planning',
    description: 'Product listings, checkout flow, access delivery, and license-aware account pages.',
    icon: Rocket,
  },
  {
    title: 'AI Content Tools',
    status: 'Researching',
    description: 'Search, recommendations, summaries, and AI-assisted publishing workflows.',
    icon: BrainCircuit,
  },
];

export const skillGroups = [
  {
    title: 'Frontend Development',
    icon: Code2,
    skills: ['HTML5', 'CSS3', 'JavaScript ES6+', 'React.js', 'React Router DOM', 'Vite', 'Tailwind CSS', 'Dark Mode', 'AOS', 'Framer Motion'],
  },
  {
    title: 'Backend Development',
    icon: ServerCog,
    skills: ['Node.js', 'Express.js', 'REST APIs', 'CRUD Operations', 'Basic Login System', 'JSON Handling', 'API Integration'],
  },
  {
    title: 'Database and Full Stack',
    icon: Database,
    skills: ['MySQL', 'SQL Queries', 'Database Design', 'MERN Stack', 'Frontend-Backend Integration', 'PHP MySQL Connection'],
  },
  {
    title: 'CMS and Blogging',
    icon: PenTool,
    skills: ['WordPress', 'Astra Theme', 'Blog Management', 'SEO Basics', 'Dynamic Blog Architecture', 'Web Stories'],
  },
  {
    title: 'Tools and Deployment',
    icon: Globe2,
    skills: ['Git', 'GitHub', 'npm', 'VS Code', 'Cursor AI', 'XAMPP', 'Chrome DevTools', 'Hostinger', 'DNS Basics'],
  },
  {
    title: 'UI/UX and Concepts',
    icon: Sparkles,
    skills: ['Dashboard Design', 'Admin Panel Design', 'Glassmorphism', 'Minimal UI', 'Mobile-first Design', 'DOM Manipulation', 'Fetch API'],
  },
];

export const metrics = [
  { label: 'Skill Areas', value: '12+', icon: Layers3 },
  { label: 'Public Pages', value: '5', icon: MonitorSmartphone },
  { label: 'Content Types', value: '3', icon: BookOpenText },
  { label: 'Future Modules', value: '8+', icon: Gauge },
];

export const roadmap = [
  { title: 'Public Website', detail: 'Home, blog, detail pages, about, contact, videos, projects, and responsive UI.', icon: MonitorSmartphone },
  { title: 'Dynamic Content', detail: 'Connect blog posts, videos, categories, tags, and search to real APIs.', icon: Search },
  { title: 'Auth and Paywall', detail: 'Add login, subscriber access, protected premium content, and secure checks.', icon: LockKeyhole },
  { title: 'Admin Dashboard', detail: 'Manage users, content, subscriptions, revenue, marketplace products, and settings.', icon: ShieldCheck },
  { title: 'Growth Engine', detail: 'SEO pages, newsletters, analytics, performance optimization, and launch campaigns.', icon: Megaphone },
];

export const blogCategories = ['All', ...Array.from(new Set(blogPosts.map((post) => post.category)))];

export function getBlogBySlug(slug) {
  return blogPosts.find((post) => post.slug === slug);
}

export function getRelatedPosts(slug) {
  const current = getBlogBySlug(slug);
  if (!current) return blogPosts.slice(0, 3);
  return blogPosts
    .filter((post) => post.slug !== slug && (post.category === current.category || post.tags.some((tag) => current.tags.includes(tag))))
    .slice(0, 3);
}
