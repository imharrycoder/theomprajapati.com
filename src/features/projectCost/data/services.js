/**
 * Service data for the Project Cost Planner.
 * Each service has an icon name (from lucide-react), category, and label.
 */
export const SERVICE_CATEGORIES = [
  {
    name: 'Web Development',
    services: [
      { label: 'Website Development', icon: 'Globe' },
      { label: 'Landing Page', icon: 'Layout' },
      { label: 'Portfolio Website', icon: 'User' },
      { label: 'Business Website', icon: 'Building2' },
      { label: 'Corporate Website', icon: 'Building' },
      { label: 'Ecommerce Website', icon: 'ShoppingCart' },
      { label: 'Blog Website', icon: 'BookOpen' },
      { label: 'WordPress Website', icon: 'FileCode' },
    ],
  },
  {
    name: 'Software Development',
    services: [
      { label: 'Custom Web Application', icon: 'AppWindow' },
      { label: 'Mobile Application', icon: 'Smartphone' },
      { label: 'Desktop Software', icon: 'Monitor' },
      { label: 'SaaS Development', icon: 'Cloud' },
      { label: 'CRM Development', icon: 'Users' },
      { label: 'ERP Development', icon: 'Database' },
      { label: 'Admin Dashboard', icon: 'LayoutDashboard' },
      { label: 'API Development', icon: 'Code' },
    ],
  },
  {
    name: 'AI & Automation',
    services: [
      { label: 'AI Chat Integration', icon: 'Bot' },
      { label: 'ChatGPT Integration', icon: 'MessageSquare' },
      { label: 'WhatsApp Automation', icon: 'MessageCircle' },
    ],
  },
  {
    name: 'SEO & Marketing',
    services: [
      { label: 'SEO', icon: 'Search' },
      { label: 'Google Indexing', icon: 'FileSearch' },
      { label: 'Technical SEO', icon: 'Settings' },
      { label: 'Local SEO', icon: 'MapPin' },
      { label: 'Digital Marketing', icon: 'Megaphone' },
      { label: 'Google Ads', icon: 'Target' },
      { label: 'Meta Ads', icon: 'Share2' },
    ],
  },
  {
    name: 'Content & Media',
    services: [
      { label: 'Content Writing', icon: 'PenTool' },
      { label: 'Blog Writing', icon: 'FileText' },
      { label: 'Video Editing', icon: 'Film' },
      { label: 'Shorts Editing', icon: 'Scissors' },
      { label: 'Reel Editing', icon: 'Clapperboard' },
      { label: 'Motion Graphics', icon: 'Sparkles' },
      { label: 'Video Shooting', icon: 'Camera' },
    ],
  },
  {
    name: 'Design & Maintenance',
    services: [
      { label: 'Graphic Design', icon: 'Palette' },
      { label: 'UI/UX Design', icon: 'Figma' },
      { label: 'Website Maintenance', icon: 'Wrench' },
      { label: 'Website Migration', icon: 'ArrowRightLeft' },
      { label: 'Hosting Setup', icon: 'Server' },
      { label: 'Domain Setup', icon: 'Link' },
      { label: 'Custom Requirement', icon: 'Puzzle' },
    ],
  },
];

export const ALL_SERVICES = SERVICE_CATEGORIES.flatMap(cat => cat.services.map(s => s.label));
