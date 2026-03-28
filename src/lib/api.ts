import type {
  Profile,
  Experience,
  Project,
  Skill,
  Tool,
  Certification,
  Blog,
  Testimonial,
  Education,
  CustomTab,
  Message,
  ContactFormData,
  DashboardStats,
  AdminSettings,
} from '@/types';
import {
  mockProfile,
  mockExperiences,
  mockProjects,
  mockSkills,
  mockTools,
  mockCertifications,
  mockBlogs,
  mockTestimonials,
  mockEducation,
  mockCustomTabs,
  mockDashboardStats,
  mockMessages,
} from './mockData';

// Simulate network delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Profile API
export const profileApi = {
  get: async (): Promise<Profile> => {
    await delay(300);
    return mockProfile;
  },
  update: async (data: Partial<Profile>): Promise<Profile> => {
    await delay(500);
    Object.assign(mockProfile, data, { updatedAt: new Date().toISOString() });
    return mockProfile;
  },
  uploadMedia: async (file: File): Promise<{ url: string }> => {
    await delay(1000);
    // In a real app, this would upload to S3/Cloudinary
    // Mocking an upload by creating a local URL or just returning a static one
    const mockUrl = `/uploads/${file.name.replace(/\s+/g, '_')}`;
    console.log('[API] Uploaded media:', file.name, 'to', mockUrl);
    return { url: mockUrl };
  },
  deleteMedia: async (url: string): Promise<void> => {
    await delay(300);
    console.log('[API] Deleted media:', url);
  },
};


// Experience API
export const experienceApi = {
  getAll: async (): Promise<Experience[]> => {
    await delay(300);
    return [...mockExperiences].sort((a, b) => a.order - b.order);
  },
  get: async (id: string): Promise<Experience | undefined> => {
    await delay(200);
    return mockExperiences.find((e) => e.id === id);
  },
  create: async (data: Omit<Experience, 'id' | 'createdAt' | 'updatedAt'>): Promise<Experience> => {
    await delay(500);
    const newExperience: Experience = {
      ...data,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    mockExperiences.push(newExperience);
    return newExperience;
  },
  update: async (id: string, data: Partial<Experience>): Promise<Experience> => {
    await delay(400);
    const index = mockExperiences.findIndex((e) => e.id === id);
    if (index === -1) throw new Error('Experience not found');
    mockExperiences[index] = {
      ...mockExperiences[index],
      ...data,
      updatedAt: new Date().toISOString(),
    };
    return mockExperiences[index];
  },
  delete: async (id: string): Promise<void> => {
    await delay(300);
    const index = mockExperiences.findIndex((e) => e.id === id);
    if (index !== -1) mockExperiences.splice(index, 1);
  },
};

// Projects API
export const projectsApi = {
  getAll: async (options?: { featured?: boolean; limit?: number }): Promise<Project[]> => {
    await delay(300);
    let projects = [...mockProjects].sort((a, b) => a.order - b.order);
    if (options?.featured) {
      projects = projects.filter((p) => p.featured);
    }
    if (options?.limit) {
      projects = projects.slice(0, options.limit);
    }
    return projects;
  },
  get: async (slug: string): Promise<Project | undefined> => {
    await delay(200);
    return mockProjects.find((p) => p.slug === slug);
  },
  create: async (data: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>): Promise<Project> => {
    await delay(500);
    const newProject: Project = {
      ...data,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    mockProjects.push(newProject);
    return newProject;
  },
  update: async (id: string, data: Partial<Project>): Promise<Project> => {
    await delay(400);
    const index = mockProjects.findIndex((p) => p.id === id);
    if (index === -1) throw new Error('Project not found');
    mockProjects[index] = {
      ...mockProjects[index],
      ...data,
      updatedAt: new Date().toISOString(),
    };
    return mockProjects[index];
  },
  delete: async (id: string): Promise<void> => {
    await delay(300);
    const index = mockProjects.findIndex((p) => p.id === id);
    if (index !== -1) mockProjects.splice(index, 1);
  },
};

// Skills API
export const skillsApi = {
  getAll: async (): Promise<Skill[]> => {
    await delay(300);
    return [...mockSkills].sort((a, b) => a.order - b.order);
  },
  getByCategory: async (): Promise<Record<string, Skill[]>> => {
    await delay(300);
    const skills = [...mockSkills].sort((a, b) => a.order - b.order);
    return skills.reduce((acc, skill) => {
      if (!acc[skill.category]) acc[skill.category] = [];
      acc[skill.category].push(skill);
      return acc;
    }, {} as Record<string, Skill[]>);
  },
  create: async (data: Omit<Skill, 'id' | 'createdAt' | 'updatedAt'>): Promise<Skill> => {
    await delay(500);
    const newSkill: Skill = {
      ...data,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    mockSkills.push(newSkill);
    return newSkill;
  },
  update: async (id: string, data: Partial<Skill>): Promise<Skill> => {
    await delay(400);
    const index = mockSkills.findIndex((s) => s.id === id);
    if (index === -1) throw new Error('Skill not found');
    mockSkills[index] = {
      ...mockSkills[index],
      ...data,
      updatedAt: new Date().toISOString(),
    };
    return mockSkills[index];
  },
  delete: async (id: string): Promise<void> => {
    await delay(300);
    const index = mockSkills.findIndex((s) => s.id === id);
    if (index !== -1) mockSkills.splice(index, 1);
  },
};

// Tools API
export const toolsApi = {
  getAll: async (): Promise<Tool[]> => {
    await delay(300);
    return [...mockTools].sort((a, b) => a.order - b.order);
  },
  create: async (data: Omit<Tool, 'id' | 'createdAt' | 'updatedAt'>): Promise<Tool> => {
    await delay(500);
    const newTool: Tool = {
      ...data,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    mockTools.push(newTool);
    return newTool;
  },
  update: async (id: string, data: Partial<Tool>): Promise<Tool> => {
    await delay(400);
    const index = mockTools.findIndex((t) => t.id === id);
    if (index === -1) throw new Error('Tool not found');
    mockTools[index] = {
      ...mockTools[index],
      ...data,
      updatedAt: new Date().toISOString(),
    };
    return mockTools[index];
  },
  delete: async (id: string): Promise<void> => {
    await delay(300);
    const index = mockTools.findIndex((t) => t.id === id);
    if (index !== -1) mockTools.splice(index, 1);
  },
};

// Certifications API
export const certificationsApi = {
  getAll: async (): Promise<Certification[]> => {
    await delay(300);
    return [...mockCertifications].sort((a, b) => a.order - b.order);
  },
  create: async (data: Omit<Certification, 'id' | 'createdAt' | 'updatedAt'>): Promise<Certification> => {
    await delay(500);
    const newCert: Certification = {
      ...data,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    mockCertifications.push(newCert);
    return newCert;
  },
  update: async (id: string, data: Partial<Certification>): Promise<Certification> => {
    await delay(400);
    const index = mockCertifications.findIndex((c) => c.id === id);
    if (index === -1) throw new Error('Certification not found');
    mockCertifications[index] = {
      ...mockCertifications[index],
      ...data,
      updatedAt: new Date().toISOString(),
    };
    return mockCertifications[index];
  },
  delete: async (id: string): Promise<void> => {
    await delay(300);
    const index = mockCertifications.findIndex((c) => c.id === id);
    if (index !== -1) mockCertifications.splice(index, 1);
  },
};

// Blogs API
export const blogsApi = {
  getAll: async (options?: { featured?: boolean; limit?: number }): Promise<Blog[]> => {
    await delay(300);
    let blogs = [...mockBlogs].sort((a, b) => 
      new Date(b.publishedAt || 0).getTime() - new Date(a.publishedAt || 0).getTime()
    );
    if (options?.featured) {
      blogs = blogs.filter((b) => b.featured);
    }
    if (options?.limit) {
      blogs = blogs.slice(0, options.limit);
    }
    return blogs;
  },
  get: async (slug: string): Promise<Blog | undefined> => {
    await delay(200);
    return mockBlogs.find((b) => b.slug === slug);
  },
  create: async (data: Omit<Blog, 'id' | 'createdAt' | 'updatedAt'>): Promise<Blog> => {
    await delay(500);
    const newBlog: Blog = {
      ...data,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    mockBlogs.push(newBlog);
    return newBlog;
  },
  update: async (id: string, data: Partial<Blog>): Promise<Blog> => {
    await delay(400);
    const index = mockBlogs.findIndex((b) => b.id === id);
    if (index === -1) throw new Error('Blog not found');
    mockBlogs[index] = {
      ...mockBlogs[index],
      ...data,
      updatedAt: new Date().toISOString(),
    };
    return mockBlogs[index];
  },
  delete: async (id: string): Promise<void> => {
    await delay(300);
    const index = mockBlogs.findIndex((b) => b.id === id);
    if (index !== -1) mockBlogs.splice(index, 1);
  },
};

// Testimonials API
export const testimonialsApi = {
  getAll: async (): Promise<Testimonial[]> => {
    await delay(300);
    return [...mockTestimonials].sort((a, b) => a.order - b.order);
  },
  create: async (data: Omit<Testimonial, 'id' | 'createdAt' | 'updatedAt'>): Promise<Testimonial> => {
    await delay(500);
    const newTestimonial: Testimonial = {
      ...data,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    mockTestimonials.push(newTestimonial);
    return newTestimonial;
  },
  update: async (id: string, data: Partial<Testimonial>): Promise<Testimonial> => {
    await delay(400);
    const index = mockTestimonials.findIndex((t) => t.id === id);
    if (index === -1) throw new Error('Testimonial not found');
    mockTestimonials[index] = {
      ...mockTestimonials[index],
      ...data,
      updatedAt: new Date().toISOString(),
    };
    return mockTestimonials[index];
  },
  delete: async (id: string): Promise<void> => {
    await delay(300);
    const index = mockTestimonials.findIndex((t) => t.id === id);
    if (index !== -1) mockTestimonials.splice(index, 1);
  },
};

// Education API
export const educationApi = {
  getAll: async (): Promise<Education[]> => {
    await delay(300);
    return [...mockEducation].sort((a, b) => a.order - b.order);
  },
  create: async (data: Omit<Education, 'id' | 'createdAt' | 'updatedAt'>): Promise<Education> => {
    await delay(500);
    const newEducation: Education = {
      ...data,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    mockEducation.push(newEducation);
    return newEducation;
  },
  update: async (id: string, data: Partial<Education>): Promise<Education> => {
    await delay(400);
    const index = mockEducation.findIndex((e) => e.id === id);
    if (index === -1) throw new Error('Education not found');
    mockEducation[index] = {
      ...mockEducation[index],
      ...data,
      updatedAt: new Date().toISOString(),
    };
    return mockEducation[index];
  },
  delete: async (id: string): Promise<void> => {
    await delay(300);
    const index = mockEducation.findIndex((e) => e.id === id);
    if (index !== -1) mockEducation.splice(index, 1);
  },
};

// Custom Tabs API
export const customTabsApi = {
  getAll: async (): Promise<CustomTab[]> => {
    await delay(300);
    return [...mockCustomTabs]
      .filter((t) => t.isVisible)
      .sort((a, b) => a.order - b.order);
  },
  get: async (slug: string): Promise<CustomTab | undefined> => {
    await delay(200);
    return mockCustomTabs.find((t) => t.slug === slug);
  },
  create: async (data: Omit<CustomTab, 'id' | 'createdAt' | 'updatedAt'>): Promise<CustomTab> => {
    await delay(500);
    const newTab: CustomTab = {
      ...data,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    mockCustomTabs.push(newTab);
    return newTab;
  },
  update: async (id: string, data: Partial<CustomTab>): Promise<CustomTab> => {
    await delay(400);
    const index = mockCustomTabs.findIndex((t) => t.id === id);
    if (index === -1) throw new Error('Custom tab not found');
    mockCustomTabs[index] = {
      ...mockCustomTabs[index],
      ...data,
      updatedAt: new Date().toISOString(),
    };
    return mockCustomTabs[index];
  },
  delete: async (id: string): Promise<void> => {
    await delay(300);
    const index = mockCustomTabs.findIndex((t) => t.id === id);
    if (index !== -1) mockCustomTabs.splice(index, 1);
  },
};

// Contact API
export const contactApi = {
  submit: async (data: ContactFormData): Promise<Message> => {
    await delay(800);
    const newMessage: Message = {
      id: Math.random().toString(36).substr(2, 9),
      ...data,
      isRead: false,
      createdAt: new Date().toISOString(),
    };
    mockMessages.push(newMessage);
    return newMessage;
  },
  getAll: async (): Promise<Message[]> => {
    await delay(300);
    return [...mockMessages].sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  },
  markAsRead: async (id: string): Promise<void> => {
    await delay(200);
    const message = mockMessages.find((m) => m.id === id);
    if (message) message.isRead = true;
  },
  delete: async (id: string): Promise<void> => {
    await delay(300);
    const index = mockMessages.findIndex((m) => m.id === id);
    if (index !== -1) mockMessages.splice(index, 1);
  },
};

// Settings API
export const settingsApi = {
  get: async (): Promise<AdminSettings> => {
    await delay(300);
    // Initial mock settings
    const saved = localStorage.getItem('portfolio_settings');
    if (saved) return JSON.parse(saved);
    
    return {
      siteTitle: 'Tanveer Portfolio OS',
      siteDescription: 'Healthcare Data Analyst & AI Systems Integrator',
      primaryColor: '#0B3A45',
      accentColor: '#F6C76D',
      enableAnalytics: true,
      enableContactForm: true,
      enableWebhooks: false,
      uiDensity: 'comfortable',
      animationSpeed: 0.6,
      seoTitle: 'Tanveer Portfolio | Healthcare IT & AI Systems',
      seoDescription: 'Professional portfolio of Tanveer Bakshi A - Healthcare Data Analyst specializing in EMR/EHR and AI integrations.',
      seoKeywords: 'healthcare it, emr, ehr, data analyst, ai development, tanveer bakshi',
      systemIntegrity: 99.98,
      uatRate: 94.8,
      dqScore: 96.2,
      lastUpdated: new Date().toISOString()
    };
  },
  update: async (data: Partial<AdminSettings>): Promise<AdminSettings> => {
    await delay(500);
    const current = await settingsApi.get();
    const updated = { ...current, ...data, lastUpdated: new Date().toISOString() };
    localStorage.setItem('portfolio_settings', JSON.stringify(updated));
    console.log('[API] Settings updated:', updated);
    return updated;
  },
  reset: async (): Promise<AdminSettings> => {
    localStorage.removeItem('portfolio_settings');
    return settingsApi.get();
  }
};

// Dashboard Stats API
export const dashboardStatsApi = {
  get: async (): Promise<DashboardStats> => {
    await delay(400);
    return mockDashboardStats;
  },
};

// Analytics API
export const analyticsApi = {
  track: async (eventType: string, data?: Record<string, unknown>): Promise<void> => {
    // Silently track analytics
    console.log('[Analytics]', eventType, data);
  },
  trackPageView: async (page: string): Promise<void> => {
    mockDashboardStats.totalViews++;
    mockDashboardStats.pageViews[page] = (mockDashboardStats.pageViews[page] || 0) + 1;
    console.log('[Analytics] Page view:', page);
  },
};

// Auth API
export const authApi = {
  login: async (email: string, password: string): Promise<{ user: { id: string; email: string; name: string; role: string }; token: string }> => {
    await delay(800);
    if (email === 'tanveerbakshii@gmail.com' && password === 'admin123') {
      return {
        user: {
          id: '1',
          email: 'tanveerbakshii@gmail.com',
          name: 'Tanveer Bakshi',
          role: 'ADMIN',
        },
        token: 'mock-jwt-token',
      };
    }
    throw new Error('Invalid credentials');
  },
  logout: async (): Promise<void> => {
    await delay(200);
  },
  verifyToken: async (token: string): Promise<boolean> => {
    await delay(200);
    return token === 'mock-jwt-token';
  },
};