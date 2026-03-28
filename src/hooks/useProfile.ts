import { useState, useEffect, useCallback } from 'react';
import {
  profileApi,
  experienceApi,
  projectsApi,
  skillsApi,
  toolsApi,
  certificationsApi,
  blogsApi,
  testimonialsApi,
  educationApi,
  customTabsApi,
  contactApi,
  analyticsApi,
} from '@/lib/api';
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
} from '@/types';


// Profile hook
export function useProfile() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    profileApi
      .get()
      .then(setProfile)
      .catch(setError)
      .finally(() => setLoading(false));
  }, []);

  const updateProfile = useCallback(async (data: Partial<Profile>) => {
    const updated = await profileApi.update(data);
    setProfile(updated);
    return updated;
  }, []);

  return { profile, loading, error, updateProfile };
}

// Experience hook
export function useExperience() {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    experienceApi
      .getAll()
      .then(setExperiences)
      .catch(setError)
      .finally(() => setLoading(false));
  }, []);

  const createExperience = useCallback(async (data: Omit<Experience, 'id' | 'createdAt' | 'updatedAt'>) => {
    const created = await experienceApi.create(data);
    setExperiences((prev) => [...prev, created]);
    return created;
  }, []);

  const updateExperience = useCallback(async (id: string, data: Partial<Experience>) => {
    const updated = await experienceApi.update(id, data);
    setExperiences((prev) => prev.map((e) => (e.id === id ? updated : e)));
    return updated;
  }, []);

  const deleteExperience = useCallback(async (id: string) => {
    await experienceApi.delete(id);
    setExperiences((prev) => prev.filter((e) => e.id !== id));
  }, []);

  return { experiences, loading, error, createExperience, updateExperience, deleteExperience };
}

// Projects hook
export function useProjects(options?: { featured?: boolean; limit?: number }) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    projectsApi
      .getAll(options)
      .then(setProjects)
      .catch(setError)
      .finally(() => setLoading(false));
  }, [options?.featured, options?.limit]);

  const getProject = useCallback(async (slug: string) => {
    return projectsApi.get(slug);
  }, []);

  const createProject = useCallback(async (data: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>) => {
    const created = await projectsApi.create(data);
    setProjects((prev) => [...prev, created]);
    return created;
  }, []);

  const updateProject = useCallback(async (id: string, data: Partial<Project>) => {
    const updated = await projectsApi.update(id, data);
    setProjects((prev) => prev.map((p) => (p.id === id ? updated : p)));
    return updated;
  }, []);

  const deleteProject = useCallback(async (id: string) => {
    await projectsApi.delete(id);
    setProjects((prev) => prev.filter((p) => p.id !== id));
  }, []);

  return { projects, loading, error, getProject, createProject, updateProject, deleteProject };
}

// Skills hook
export function useSkills() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    skillsApi
      .getAll()
      .then(setSkills)
      .catch(setError)
      .finally(() => setLoading(false));
  }, []);

  const skillsByCategory = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) acc[skill.category] = [];
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, Skill[]>);

  const createSkill = useCallback(async (data: Omit<Skill, 'id' | 'createdAt' | 'updatedAt'>) => {
    const created = await skillsApi.create(data);
    setSkills((prev) => [...prev, created]);
    return created;
  }, []);

  const updateSkill = useCallback(async (id: string, data: Partial<Skill>) => {
    const updated = await skillsApi.update(id, data);
    setSkills((prev) => prev.map((s) => (s.id === id ? updated : s)));
    return updated;
  }, []);

  const deleteSkill = useCallback(async (id: string) => {
    await skillsApi.delete(id);
    setSkills((prev) => prev.filter((s) => s.id !== id));
  }, []);

  return { skills, skillsByCategory, loading, error, createSkill, updateSkill, deleteSkill };
}

// Tools hook
export function useTools() {
  const [tools, setTools] = useState<Tool[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    toolsApi
      .getAll()
      .then(setTools)
      .catch(setError)
      .finally(() => setLoading(false));
  }, []);

  const createTool = useCallback(async (data: Omit<Tool, 'id' | 'createdAt' | 'updatedAt'>) => {
    const created = await toolsApi.create(data);
    setTools((prev) => [...prev, created]);
    return created;
  }, []);

  const updateTool = useCallback(async (id: string, data: Partial<Tool>) => {
    const updated = await toolsApi.update(id, data);
    setTools((prev) => prev.map((t) => (t.id === id ? updated : t)));
    return updated;
  }, []);

  const deleteTool = useCallback(async (id: string) => {
    await toolsApi.delete(id);
    setTools((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return { tools, loading, error, createTool, updateTool, deleteTool };
}

// Certifications hook
export function useCertifications() {
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    certificationsApi
      .getAll()
      .then(setCertifications)
      .catch(setError)
      .finally(() => setLoading(false));
  }, []);

  const createCertification = useCallback(async (data: Omit<Certification, 'id' | 'createdAt' | 'updatedAt'>) => {
    const created = await certificationsApi.create(data);
    setCertifications((prev) => [...prev, created]);
    return created;
  }, []);

  const updateCertification = useCallback(async (id: string, data: Partial<Certification>) => {
    const updated = await certificationsApi.update(id, data);
    setCertifications((prev) => prev.map((c) => (c.id === id ? updated : c)));
    return updated;
  }, []);

  const deleteCertification = useCallback(async (id: string) => {
    await certificationsApi.delete(id);
    setCertifications((prev) => prev.filter((c) => c.id !== id));
  }, []);

  return { certifications, loading, error, createCertification, updateCertification, deleteCertification };
}

// Blog hook
export function useBlogs(options?: { featured?: boolean; limit?: number }) {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    blogsApi
      .getAll(options)
      .then(setBlogs)
      .catch(setError)
      .finally(() => setLoading(false));
  }, [options?.featured, options?.limit]);

  const getBlog = useCallback(async (slug: string) => {
    return blogsApi.get(slug);
  }, []);

  const createBlog = useCallback(async (data: Omit<Blog, 'id' | 'createdAt' | 'updatedAt'>) => {
    const created = await blogsApi.create(data);
    setBlogs((prev) => [...prev, created]);
    return created;
  }, []);

  const updateBlog = useCallback(async (id: string, data: Partial<Blog>) => {
    const updated = await blogsApi.update(id, data);
    setBlogs((prev) => prev.map((b) => (b.id === id ? updated : b)));
    return updated;
  }, []);

  const deleteBlog = useCallback(async (id: string) => {
    await blogsApi.delete(id);
    setBlogs((prev) => prev.filter((b) => b.id !== id));
  }, []);

  return { blogs, loading, error, getBlog, createBlog, updateBlog, deleteBlog };
}

// Testimonials hook
export function useTestimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    testimonialsApi
      .getAll()
      .then(setTestimonials)
      .catch(setError)
      .finally(() => setLoading(false));
  }, []);

  const createTestimonial = useCallback(async (data: Omit<Testimonial, 'id' | 'createdAt' | 'updatedAt'>) => {
    const created = await testimonialsApi.create(data);
    setTestimonials((prev) => [...prev, created]);
    return created;
  }, []);

  const updateTestimonial = useCallback(async (id: string, data: Partial<Testimonial>) => {
    const updated = await testimonialsApi.update(id, data);
    setTestimonials((prev) => prev.map((t) => (t.id === id ? updated : t)));
    return updated;
  }, []);

  const deleteTestimonial = useCallback(async (id: string) => {
    await testimonialsApi.delete(id);
    setTestimonials((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return { testimonials, loading, error, createTestimonial, updateTestimonial, deleteTestimonial };
}

// Education hook
export function useEducation() {
  const [education, setEducation] = useState<Education[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    educationApi
      .getAll()
      .then(setEducation)
      .catch(setError)
      .finally(() => setLoading(false));
  }, []);

  const createEducation = useCallback(async (data: Omit<Education, 'id' | 'createdAt' | 'updatedAt'>) => {
    const created = await educationApi.create(data);
    setEducation((prev) => [...prev, created]);
    return created;
  }, []);

  const updateEducation = useCallback(async (id: string, data: Partial<Education>) => {
    const updated = await educationApi.update(id, data);
    setEducation((prev) => prev.map((e) => (e.id === id ? updated : e)));
    return updated;
  }, []);

  const deleteEducation = useCallback(async (id: string) => {
    await educationApi.delete(id);
    setEducation((prev) => prev.filter((e) => e.id !== id));
  }, []);

  return { education, loading, error, createEducation, updateEducation, deleteEducation };
}

// Custom Tabs hook
export function useCustomTabs() {
  const [tabs, setTabs] = useState<CustomTab[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    customTabsApi
      .getAll()
      .then(setTabs)
      .catch(setError)
      .finally(() => setLoading(false));
  }, []);

  const getTab = useCallback(async (slug: string) => {
    return customTabsApi.get(slug);
  }, []);

  const createTab = useCallback(async (data: Omit<CustomTab, 'id' | 'createdAt' | 'updatedAt'>) => {
    const created = await customTabsApi.create(data);
    setTabs((prev) => [...prev, created]);
    return created;
  }, []);

  const updateTab = useCallback(async (id: string, data: Partial<CustomTab>) => {
    const updated = await customTabsApi.update(id, data);
    setTabs((prev) => prev.map((t) => (t.id === id ? updated : t)));
    return updated;
  }, []);

  const deleteTab = useCallback(async (id: string) => {
    await customTabsApi.delete(id);
    setTabs((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return { tabs, loading, error, getTab, createTab, updateTab, deleteTab };
}

// Contact form hook
export function useContactForm() {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [success, setSuccess] = useState(false);

  const submit = useCallback(async (data: { name: string; email: string; subject?: string; message: string }) => {
    setSubmitting(true);
    setError(null);
    setSuccess(false);

    try {
      await contactApi.submit(data);
      setSuccess(true);
    } catch (err) {
      setError(err as Error);
    } finally {
      setSubmitting(false);
    }
  }, []);

  return { submit, submitting, error, success };
}

// Analytics hook
export function useAnalytics() {
  const trackEvent = useCallback((eventType: string, data?: Record<string, unknown>) => {
    analyticsApi.track(eventType, data);
  }, []);

  const trackPageView = useCallback((page: string) => {
    analyticsApi.trackPageView(page);
  }, []);

  return { trackEvent, trackPageView };
}