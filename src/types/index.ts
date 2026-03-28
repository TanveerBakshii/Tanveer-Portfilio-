// Profile Types
export interface Profile {
  id: string;
  name: string;
  role: string;
  tagline?: string;
  experience: string;
  location: string;
  phone?: string;
  email: string;
  linkedin?: string;
  github?: string;
  website?: string;
  bio?: string;
  shortBio?: string;
  avatar?: string;
  resumeUrl?: string;
  heroImage?: string;
  isPublic: boolean;
  createdAt: string;
  updatedAt: string;
}

// Experience Types
export interface Experience {
  id: string;
  company: string;
  title: string;
  location?: string;
  startDate: string;
  endDate?: string;
  isCurrent: boolean;
  description: string;
  impact: string[];
  skills: string[];
  order: number;
  isPublic: boolean;
  createdAt: string;
  updatedAt: string;
}

// Project Types
export interface ProjectMetric {
  label: string;
  value: string;
  icon: any; // Lucide icon
}

export interface Project {
  id: string;
  title: string;
  slug: string;
  summary: string;
  description: string;
  challenge?: string;
  solution?: string;
  outcome?: string;
  metrics: ProjectMetric[];
  technologies: string[];
  skills: string[];
  images: string[];
  thumbnail?: string;
  githubUrl?: string;
  liveUrl?: string;
  caseStudyUrl?: string;
  featured: boolean;
  order: number;
  isPublic: boolean;
  createdAt: string;
  updatedAt: string;
}

// Skill Types
export type SkillCategory = 'DATA_REPORTING' | 'HEALTHCARE' | 'ENGINEERING' | 'COLLABORATION' | 'TOOLS';

export interface Skill {
  id: string;
  name: string;
  category: SkillCategory;
  proficiency: number;
  icon?: string;
  description?: string;
  order: number;
  isPublic: boolean;
  createdAt: string;
  updatedAt: string;
}

// Tool Types
export interface Tool {
  id: string;
  name: string;
  category: string;
  icon?: string;
  proficiency?: number;
  description?: string;
  isPublic: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
}

// Certification Types
export interface Certification {
  id: string;
  name: string;
  issuer: string;
  issueDate?: string;
  expiryDate?: string;
  credentialId?: string;
  url?: string;
  image?: string;
  isPublic: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
}

// Blog Types
export interface Blog {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage?: string;
  tags: string[];
  readTime?: number;
  featured: boolean;
  publishedAt?: string;
  isPublic: boolean;
  views: number;
  createdAt: string;
  updatedAt: string;
}

// Custom Tab Types
export type TabType = 'MARKDOWN' | 'HTML' | 'WIDGET' | 'EXTERNAL' | 'API_EMBED';

export interface CustomTab {
  id: string;
  title: string;
  slug: string;
  description?: string;
  content: string;
  type: TabType;
  widgets?: unknown;
  externalUrl?: string;
  icon?: string;
  order: number;
  isPublic: boolean;
  isVisible: boolean;
  createdAt: string;
  updatedAt: string;
}

// Media Types
export interface Media {
  id: string;
  filename: string;
  originalName: string;
  url: string;
  thumbnailUrl?: string;
  mimeType: string;
  size: number;
  width?: number;
  height?: number;
  alt?: string;
  tags: string[];
  folder: string;
  isPublic: boolean;
  createdAt: string;
  updatedAt: string;
}

// Message Types
export interface Message {
  id: string;
  name: string;
  email: string;
  subject?: string;
  message: string;
  ipAddress?: string;
  userAgent?: string;
  isRead: boolean;
  repliedAt?: string;
  createdAt: string;
}

// Testimonial Types
export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company?: string;
  avatar?: string;
  quote: string;
  isPublic: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
}

// Education Types
export interface Education {
  id: string;
  institution: string;
  degree: string;
  field?: string;
  startDate?: string;
  endDate?: string;
  isCurrent: boolean;
  description?: string;
  isPublic: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
}

// User Types
export type UserRole = 'ADMIN' | 'EDITOR' | 'VIEWER';

export interface User {
  id: string;
  email: string;
  name?: string;
  role: UserRole;
  isActive: boolean;
  lastLogin?: string;
  createdAt: string;
  updatedAt: string;
}

// API Key Types
export interface ApiKey {
  id: string;
  name: string;
  key: string;
  userId: string;
  permissions: string[];
  lastUsedAt?: string;
  expiresAt?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

// Webhook Types
export interface Webhook {
  id: string;
  name: string;
  url: string;
  userId: string;
  events: string[];
  secret?: string;
  isActive: boolean;
  retryCount: number;
  lastTriggered?: string;
  lastError?: string;
  createdAt: string;
  updatedAt: string;
}

// Analytics Types
export interface Analytics {
  id: string;
  sessionId?: string;
  page: string;
  section?: string;
  referrer?: string;
  ipAddress?: string;
  userAgent?: string;
  country?: string;
  city?: string;
  device?: string;
  browser?: string;
  os?: string;
  duration?: number;
  metadata?: unknown;
  createdAt: string;
}

// Dashboard Stats
export interface DashboardStats {
  totalViews: number;
  uniqueVisitors: number;
  pageViews: Record<string, number>;
  topProjects: Array<{ id: string; title: string; views: number }>;
  recentMessages: Message[];
  resumeDownloads: number;
}

// Contact Form
export interface ContactFormData {
  name: string;
  email: string;
  subject?: string;
  message: string;
}

// Settings
export interface AdminSettings {
  siteTitle: string;
  siteDescription: string;
  primaryColor: string;
  accentColor: string;
  enableAnalytics: boolean;
  enableContactForm: boolean;
  enableWebhooks: boolean;
  uiDensity: 'compact' | 'comfortable' | 'spacious';
  animationSpeed: number; // 0 to 1
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string;
  // Clinical Metrics (Accuracy)
  systemIntegrity: number; // e.g. 99.98
  uatRate: number; // e.g. 94.8
  dqScore: number; // e.g. 96.2
  lastUpdated: string;
}

export interface Setting {
  id: string;
  key: string;
  value: string;
  description?: string;
  isPublic: boolean;
  createdAt: string;
  updatedAt: string;
}

// Auth Types
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}