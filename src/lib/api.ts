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
import { supabase } from './supabase';

// Simulate network delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Profile API
export const profileApi = {
  get: async (): Promise<Profile> => {
    const { data, error } = await supabase
      .from('profile')
      .select('*')
      .eq('id', '1') // Using id '1' as our default profile which we seeded
      .single();
    
    if (error) throw error;
    return data as Profile;
  },
  update: async (data: Partial<Profile>): Promise<Profile> => {
    const { data: updated, error } = await supabase
      .from('profile')
      .update(data)
      .eq('id', '1')
      .select()
      .single();
    
    if (error) throw error;
    return updated as Profile;
  },
  uploadMedia: async (file: File): Promise<{ url: string }> => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `uploads/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('media')
      .upload(filePath, file);

    if (uploadError) throw uploadError;

    const { data } = supabase.storage
      .from('media')
      .getPublicUrl(filePath);

    return { url: data.publicUrl };
  },
  deleteMedia: async (url: string): Promise<void> => {
    // Basic implementation: extract path from public URL
    const path = url.split('/').pop() || '';
    const { error } = await supabase.storage
      .from('media')
      .remove([`uploads/${path}`]);
    if (error) console.error('Error deleting media:', error);
  },
};


// Experience API
export const experienceApi = {
  getAll: async (): Promise<Experience[]> => {
    const { data, error } = await supabase
      .from('experience')
      .select('*')
      .order('order', { ascending: true });
    
    if (error) throw error;
    return data as Experience[];
  },
  get: async (id: string): Promise<Experience | undefined> => {
    const { data, error } = await supabase
      .from('experience')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) return undefined;
    return data as Experience;
  },
  create: async (data: Omit<Experience, 'id' | 'createdAt' | 'updatedAt'>): Promise<Experience> => {
    const { data: created, error } = await supabase
      .from('experience')
      .insert(data)
      .select()
      .single();
    
    if (error) throw error;
    return created as Experience;
  },
  update: async (id: string, data: Partial<Experience>): Promise<Experience> => {
    const { data: updated, error } = await supabase
      .from('experience')
      .update(data)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return updated as Experience;
  },
  delete: async (id: string): Promise<void> => {
    const { error } = await supabase
      .from('experience')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  },
};

// Projects API
export const projectsApi = {
  getAll: async (options?: { featured?: boolean; limit?: number }): Promise<Project[]> => {
    let query = supabase
      .from('projects')
      .select('*')
      .order('order', { ascending: true });
    
    if (options?.featured) {
      query = query.eq('featured', true);
    }
    
    if (options?.limit) {
      query = query.limit(options.limit);
    }
    
    const { data, error } = await query;
    if (error) throw error;
    return data as Project[];
  },
  get: async (slug: string): Promise<Project | undefined> => {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('slug', slug)
      .single();
    
    if (error) return undefined;
    return data as Project;
  },
  create: async (data: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>): Promise<Project> => {
    const { data: created, error } = await supabase
      .from('projects')
      .insert(data)
      .select()
      .single();
    
    if (error) throw error;
    return created as Project;
  },
  update: async (id: string, data: Partial<Project>): Promise<Project> => {
    const { data: updated, error } = await supabase
      .from('projects')
      .update(data)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return updated as Project;
  },
  delete: async (id: string): Promise<void> => {
    const { error } = await supabase
      .from('projects')
      .delete()
      .eq('id', id);
    if (error) throw error;
  },
};

// Skills API
export const skillsApi = {
  getAll: async (): Promise<Skill[]> => {
    const { data, error } = await supabase
      .from('skills')
      .select('*')
      .order('order', { ascending: true });
    
    if (error) throw error;
    return data as Skill[];
  },
  getByCategory: async (): Promise<Record<string, Skill[]>> => {
    const { data, error } = await supabase
      .from('skills')
      .select('*')
      .order('order', { ascending: true });
    
    if (error) throw error;
    
    return (data as Skill[]).reduce((acc, skill) => {
      if (!acc[skill.category]) acc[skill.category] = [];
      acc[skill.category].push(skill);
      return acc;
    }, {} as Record<string, Skill[]>);
  },
  create: async (data: Omit<Skill, 'id' | 'createdAt' | 'updatedAt'>): Promise<Skill> => {
    const { data: created, error } = await supabase
      .from('skills')
      .insert(data)
      .select()
      .single();
    
    if (error) throw error;
    return created as Skill;
  },
  update: async (id: string, data: Partial<Skill>): Promise<Skill> => {
    const { data: updated, error } = await supabase
      .from('skills')
      .update(data)
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return updated as Skill;
  },
  delete: async (id: string): Promise<void> => {
    const { error } = await supabase
      .from('skills')
      .delete()
      .eq('id', id);
    if (error) throw error;
  },
};

// Tools API
export const toolsApi = {
  getAll: async (): Promise<Tool[]> => {
    const { data, error } = await supabase
      .from('tools')
      .select('*')
      .order('order', { ascending: true });
    if (error) throw error;
    return data as Tool[];
  },
  create: async (data: Omit<Tool, 'id' | 'createdAt' | 'updatedAt'>): Promise<Tool> => {
    const { data: created, error } = await supabase
      .from('tools')
      .insert(data)
      .select()
      .single();
    if (error) throw error;
    return created as Tool;
  },
  update: async (id: string, data: Partial<Tool>): Promise<Tool> => {
    const { data: updated, error } = await supabase
      .from('tools')
      .update(data)
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return updated as Tool;
  },
  delete: async (id: string): Promise<void> => {
    const { error } = await supabase
      .from('tools')
      .delete()
      .eq('id', id);
    if (error) throw error;
  },
};

// Certifications API
export const certificationsApi = {
  getAll: async (): Promise<Certification[]> => {
    const { data, error } = await supabase
      .from('certifications')
      .select('*')
      .order('order', { ascending: true });
    if (error) throw error;
    return data as Certification[];
  },
  create: async (data: Omit<Certification, 'id' | 'createdAt' | 'updatedAt'>): Promise<Certification> => {
    const { data: created, error } = await supabase
      .from('certifications')
      .insert(data)
      .select()
      .single();
    if (error) throw error;
    return created as Certification;
  },
  update: async (id: string, data: Partial<Certification>): Promise<Certification> => {
    const { data: updated, error } = await supabase
      .from('certifications')
      .update(data)
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return updated as Certification;
  },
  delete: async (id: string): Promise<void> => {
    const { error } = await supabase
      .from('certifications')
      .delete()
      .eq('id', id);
    if (error) throw error;
  },
};

// Blogs API
export const blogsApi = {
  getAll: async (options?: { featured?: boolean; limit?: number }): Promise<Blog[]> => {
    let query = supabase
      .from('blogs')
      .select('*')
      .order('publishedAt', { ascending: false });
    
    if (options?.featured) {
      query = query.eq('featured', true);
    }
    
    if (options?.limit) {
      query = query.limit(options.limit);
    }
    
    const { data, error } = await query;
    if (error) throw error;
    return data as Blog[];
  },
  get: async (slug: string): Promise<Blog | undefined> => {
    const { data, error } = await supabase
      .from('blogs')
      .select('*')
      .eq('slug', slug)
      .single();
    if (error) return undefined;
    return data as Blog;
  },
  create: async (data: Omit<Blog, 'id' | 'createdAt' | 'updatedAt'>): Promise<Blog> => {
    const { data: created, error } = await supabase
      .from('blogs')
      .insert(data)
      .select()
      .single();
    if (error) throw error;
    return created as Blog;
  },
  update: async (id: string, data: Partial<Blog>): Promise<Blog> => {
    const { data: updated, error } = await supabase
      .from('blogs')
      .update(data)
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return updated as Blog;
  },
  delete: async (id: string): Promise<void> => {
    const { error } = await supabase
      .from('blogs')
      .delete()
      .eq('id', id);
    if (error) throw error;
  },
};

// Testimonials API
export const testimonialsApi = {
  getAll: async (): Promise<Testimonial[]> => {
    const { data, error } = await supabase
      .from('testimonials')
      .select('*')
      .order('order', { ascending: true });
    if (error) throw error;
    return data as Testimonial[];
  },
  create: async (data: Omit<Testimonial, 'id' | 'createdAt' | 'updatedAt'>): Promise<Testimonial> => {
    const { data: created, error } = await supabase
      .from('testimonials')
      .insert(data)
      .select()
      .single();
    if (error) throw error;
    return created as Testimonial;
  },
  update: async (id: string, data: Partial<Testimonial>): Promise<Testimonial> => {
    const { data: updated, error } = await supabase
      .from('testimonials')
      .update(data)
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return updated as Testimonial;
  },
  delete: async (id: string): Promise<void> => {
    const { error } = await supabase
      .from('testimonials')
      .delete()
      .eq('id', id);
    if (error) throw error;
  },
};

// Education API
export const educationApi = {
  getAll: async (): Promise<Education[]> => {
    const { data, error } = await supabase
      .from('education')
      .select('*')
      .order('order', { ascending: true });
    if (error) throw error;
    return data as Education[];
  },
  create: async (data: Omit<Education, 'id' | 'createdAt' | 'updatedAt'>): Promise<Education> => {
    const { data: created, error } = await supabase
      .from('education')
      .insert(data)
      .select()
      .single();
    if (error) throw error;
    return created as Education;
  },
  update: async (id: string, data: Partial<Education>): Promise<Education> => {
    const { data: updated, error } = await supabase
      .from('education')
      .update(data)
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return updated as Education;
  },
  delete: async (id: string): Promise<void> => {
    const { error } = await supabase
      .from('education')
      .delete()
      .eq('id', id);
    if (error) throw error;
  },
};

// Custom Tabs API
export const customTabsApi = {
  getAll: async (): Promise<CustomTab[]> => {
    const { data, error } = await supabase
      .from('custom_tabs')
      .select('*')
      .eq('isVisible', true)
      .order('order', { ascending: true });
    if (error) throw error;
    return data as CustomTab[];
  },
  get: async (slug: string): Promise<CustomTab | undefined> => {
    const { data, error } = await supabase
      .from('custom_tabs')
      .select('*')
      .eq('slug', slug)
      .single();
    if (error) return undefined;
    return data as CustomTab;
  },
  create: async (data: Omit<CustomTab, 'id' | 'createdAt' | 'updatedAt'>): Promise<CustomTab> => {
    const { data: created, error } = await supabase
      .from('custom_tabs')
      .insert(data)
      .select()
      .single();
    if (error) throw error;
    return created as CustomTab;
  },
  update: async (id: string, data: Partial<CustomTab>): Promise<CustomTab> => {
    const { data: updated, error } = await supabase
      .from('custom_tabs')
      .update(data)
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return updated as CustomTab;
  },
  delete: async (id: string): Promise<void> => {
    const { error } = await supabase
      .from('custom_tabs')
      .delete()
      .eq('id', id);
    if (error) throw error;
  },
};

// Contact API
export const contactApi = {
  submit: async (data: ContactFormData): Promise<Message> => {
    const { data: created, error } = await supabase
      .from('messages')
      .insert({
        ...data,
        isRead: false
      })
      .select()
      .single();
    if (error) throw error;
    return created as Message;
  },
  getAll: async (): Promise<Message[]> => {
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .order('createdAt', { ascending: false });
    if (error) throw error;
    return data as Message[];
  },
  markAsRead: async (id: string): Promise<void> => {
    const { error } = await supabase
      .from('messages')
      .update({ isRead: true })
      .eq('id', id);
    if (error) throw error;
  },
  delete: async (id: string): Promise<void> => {
    const { error } = await supabase
      .from('messages')
      .delete()
      .eq('id', id);
    if (error) throw error;
  },
};

// Settings API
export const settingsApi = {
  get: async (): Promise<AdminSettings> => {
    const { data, error } = await supabase
      .from('settings')
      .select('*');
    
    if (error) throw error;
    
    // Map array of {key, value} to AdminSettings object
    const settingsMap = (data as { key: string; value: string }[]).reduce((acc, s) => {
      acc[s.key] = s.value;
      return acc;
    }, {} as Record<string, any>);

    return {
      siteTitle: settingsMap.site_title || 'Tanveer Portfolio OS',
      siteDescription: settingsMap.site_description || 'Healthcare Data Analyst & AI Systems Integrator',
      primaryColor: settingsMap.theme_primary || '#0B3A45',
      accentColor: settingsMap.theme_accent || '#F6C76D',
      enableAnalytics: settingsMap.analytics_enabled === 'true',
      enableContactForm: settingsMap.contact_form_enabled === 'true',
      enableWebhooks: settingsMap.webhooks_enabled === 'true',
      uiDensity: settingsMap.ui_density || 'comfortable',
      animationSpeed: parseFloat(settingsMap.animation_speed || '0.6'),
      seoTitle: settingsMap.seo_title || 'Tanveer Portfolio | Healthcare IT & AI Systems',
      seoDescription: settingsMap.seo_description || 'Professional portfolio of Tanveer Bakshi A - Healthcare Data Analyst specializing in EMR/EHR and AI integrations.',
      seoKeywords: settingsMap.seo_keywords || 'healthcare it, emr, ehr, data analyst, ai development, tanveer bakshi',
      systemIntegrity: 99.98,
      uatRate: 94.8,
      dqScore: 96.2,
      lastUpdated: new Date().toISOString()
    };
  },
  update: async (data: Partial<AdminSettings>): Promise<AdminSettings> => {
    // Basic implementation: update matching keys in the table
    const updates = Object.entries(data).map(([key, value]) => ({
      key: key.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`), // camel to snake
      value: String(value)
    }));

    for (const update of updates) {
      await supabase
        .from('settings')
        .upsert(update, { onConflict: 'key' });
    }

    return settingsApi.get();
  },
  reset: async (): Promise<AdminSettings> => {
    // Specific logic for resetting to defaults would go here
    return settingsApi.get();
  }
};

// Dashboard Stats API
export const dashboardStatsApi = {
  get: async (): Promise<DashboardStats> => {
    // Fetch counts from various tables
    const [messages] = await Promise.all([
      supabase.from('messages').select('*', { count: 'exact' }).limit(5).order('createdAt', { ascending: false })
    ]);

    return {
      totalViews: 0,
      uniqueVisitors: 0,
      pageViews: {},
      topProjects: [],
      recentMessages: messages.data as Message[] || [],
      resumeDownloads: 0,
    };
  },
};

// Analytics API
export const analyticsApi = {
  track: async (eventType: string, data?: Record<string, unknown>): Promise<void> => {
    await supabase.from('analytics_events').insert({
      analyticsId: 'placeholder', // Ideally linked to a session
      eventType,
      metadata: data
    });
  },
  trackPageView: async (page: string): Promise<void> => {
    await supabase.from('analytics').insert({
      page,
      userAgent: navigator.userAgent
    });
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