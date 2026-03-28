import { useState } from 'react';
import { 
  Plus, 
  Pencil, 
  Trash2, 
  FolderGit2, 
  Upload, 
  X, 
  TrendingUp,
  Activity,
  Database,
  Layers,
  Code2,
  Clock,
  Users,
  DollarSign
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useProjects } from '@/hooks/useProfile';
import { toast } from 'sonner';
import { profileApi } from '@/lib/api';
import type { Project, ProjectMetric } from '@/types';

const iconOptions = [
  { value: 'TrendingUp', label: 'Trending', Icon: TrendingUp },
  { value: 'Activity', label: 'Activity', Icon: Activity },
  { value: 'Database', label: 'Database', Icon: Database },
  { value: 'Layers', label: 'Layers', Icon: Layers },
  { value: 'Code2', label: 'Code', Icon: Code2 },
  { value: 'Clock', label: 'Time', Icon: Clock },
  { value: 'Users', label: 'Users', Icon: Users },
  { value: 'DollarSign', label: 'Revenue', Icon: DollarSign },
];

export function ProjectsManager() {
  const { projects, loading, deleteProject, createProject, updateProject } = useProjects();
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingProject, setEditingProject] = useState<Partial<Project> | null>(null);

  const resetForm = () => {
    setEditingId(null);
    setEditingProject(null);
    setShowModal(false);
  };

  const handleEdit = (project: Project) => {
    setEditingId(project.id);
    setEditingProject({ ...project });
    setShowModal(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this project?')) {
      await deleteProject(id);
      toast.success('Project deleted');
    }
  };

  const addMetric = () => {
    const newMetrics = [...(editingProject?.metrics || []), { label: '', value: '', icon: 'TrendingUp' }];
    setEditingProject({ ...editingProject, metrics: newMetrics as ProjectMetric[] });
  };

  const removeMetric = (index: number) => {
    const newMetrics = [...(editingProject?.metrics || [])];
    newMetrics.splice(index, 1);
    setEditingProject({ ...editingProject, metrics: newMetrics });
  };

  const updateMetric = (index: number, field: keyof ProjectMetric, value: string) => {
    const newMetrics = [...(editingProject?.metrics || [])];
    newMetrics[index] = { ...newMetrics[index], [field]: value };
    setEditingProject({ ...editingProject, metrics: newMetrics });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject?.title || !editingProject?.summary) {
      toast.error('Please fill in required fields');
      return;
    }

    try {
      if (editingId) {
        await updateProject(editingId, editingProject);
        toast.success('Project updated');
      } else {
        const projectData = {
          ...editingProject,
          slug: editingProject.slug || editingProject.title?.toLowerCase().replace(/\s+/g, '-'),
          order: projects.length + 1,
          technologies: editingProject.technologies || [],
          skills: editingProject.skills || [],
          images: editingProject.images || [],
          metrics: editingProject.metrics || [],
          featured: editingProject.featured || false,
          isPublic: true
        } as Omit<Project, 'id' | 'createdAt' | 'updatedAt'>;

        await createProject(projectData);
        toast.success('Project created');
      }
      resetForm();
    } catch (err) {
      toast.error('Failed to save project');
    }
  };


  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-2 border-amber/30 border-t-amber rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-display text-2xl font-semibold text-mist">
            Projects
          </h2>
          <p className="text-mist-dark mt-1">
            Manage your portfolio projects and case studies.
          </p>
        </div>
        <Button 
          onClick={() => { 
            setEditingId(null); 
            setEditingProject({ title: '', summary: '', description: '', technologies: [], skills: [], featured: false, metrics: [] }); 
            setShowModal(true); 
          }} 
          className="btn-accent"
        >
          <Plus className="w-4 h-4" />
          Add Project
        </Button>
      </div>

      {/* Projects Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {projects.map((project) => (
          <div key={project.id} className="portfolio-card overflow-hidden">
            <div className="h-40 bg-teal-light/50 relative">
              {project.thumbnail ? (
                <img src={project.thumbnail} alt={project.title} className="w-full h-full object-cover" />
              ) : (
                <div className="flex items-center justify-center h-full">
                  <FolderGit2 className="w-16 h-16 text-mist-dark/30" />
                </div>
              )}
              {project.featured && (
                <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-amber text-teal text-xs font-mono">
                  Featured
                </div>
              )}
            </div>
            <div className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-display text-lg font-semibold text-mist">
                    {project.title}
                  </h3>
                  <p className="text-mist-dark text-sm mt-1 line-clamp-2">
                    {project.summary}
                  </p>
                </div>
                <div className="flex items-center gap-1">
                  <button 
                    onClick={() => handleEdit(project)}
                    className="p-2 rounded-lg hover:bg-mist/5 text-mist-dark hover:text-amber transition-colors"
                  >
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => handleDelete(project.id)}
                    className="p-2 rounded-lg hover:bg-red-500/10 text-mist-dark hover:text-red-400 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 mt-4">
                {project.technologies.slice(0, 4).map((tech) => (
                  <span key={tech} className="px-2 py-1 rounded-full text-xs bg-mist/5 text-mist-dark border border-mist/10">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="portfolio-card w-full max-w-2xl p-8 max-h-[90vh] overflow-auto shadow-2xl">
            <div className="flex items-center justify-between mb-8 border-b border-mist/5 pb-4">
              <h3 className="font-display text-2xl font-bold text-mist">
                {editingId ? 'Edit Project' : 'Add Project'}
              </h3>
              <button 
                onClick={resetForm}
                className="p-2 rounded-full hover:bg-mist/5 text-mist-dark transition-colors"
              >
                <Plus className="w-6 h-6 rotate-45" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-mist-dark">Project Title *</label>
                  <input 
                    type="text" 
                    value={editingProject?.title || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                    className="w-full bg-teal-dark border border-mist/10 rounded-xl px-4 py-3 text-mist focus:border-amber/50 outline-none transition-all"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-mist-dark">Slug (URL identifier)</label>
                  <input 
                    type="text" 
                    value={editingProject?.slug || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, slug: e.target.value })}
                    placeholder="e.g. medical-dashboard"
                    className="w-full bg-teal-dark border border-mist/10 rounded-xl px-4 py-3 text-mist focus:border-amber/50 outline-none"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-mist-dark">Summary *</label>
                <input 
                  type="text" 
                  value={editingProject?.summary || ''}
                  onChange={(e) => setEditingProject({ ...editingProject, summary: e.target.value })}
                  className="w-full bg-teal-dark border border-mist/10 rounded-xl px-4 py-3 text-mist focus:border-amber/50 outline-none"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-mist-dark">Detailed Description</label>
                <textarea 
                  rows={4}
                  value={editingProject?.description || ''}
                  onChange={(e) => setEditingProject({ ...editingProject, description: e.target.value })}
                  className="w-full bg-teal-dark border border-mist/10 rounded-xl px-4 py-3 text-mist focus:border-amber/50 outline-none resize-none"
                />
              </div>

              {/* Metrics Section */}
              <div className="space-y-4 pt-4 border-t border-mist/5">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-mist-dark">Project Metrics</label>
                  <Button 
                    type="button" 
                    onClick={addMetric}
                    className="btn-secondary h-8 px-3 text-xs"
                  >
                    <Plus className="w-3 h-3 mr-1" />
                    Add Metric
                  </Button>
                </div>
                <div className="space-y-3">
                  {(editingProject?.metrics || []).map((metric, index) => (
                    <div key={index} className="flex gap-3 items-end p-4 rounded-xl bg-teal-light/20 border border-mist/5 relative group">
                      <div className="grid grid-cols-3 gap-3 flex-1">
                        <div>
                          <label className="text-[10px] text-mist-dark block mb-1">Label</label>
                          <input 
                            type="text" 
                            value={metric.label}
                            onChange={(e) => updateMetric(index, 'label', e.target.value)}
                            placeholder="e.g. Impact"
                            className="w-full bg-teal-dark border border-mist/10 rounded-lg px-3 py-2 text-sm text-mist"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] text-mist-dark block mb-1">Value</label>
                          <input 
                            type="text" 
                            value={metric.value}
                            onChange={(e) => updateMetric(index, 'value', e.target.value)}
                            placeholder="e.g. 95%"
                            className="w-full bg-teal-dark border border-mist/10 rounded-lg px-3 py-2 text-sm text-mist"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] text-mist-dark block mb-1">Icon</label>
                          <select 
                            value={metric.icon}
                            onChange={(e) => updateMetric(index, 'icon', e.target.value)}
                            className="w-full bg-teal-dark border border-mist/10 rounded-lg px-3 py-2 text-sm text-mist outline-none"
                          >
                            {iconOptions.map(opt => (
                              <option key={opt.value} value={opt.value}>{opt.label}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <button 
                        type="button"
                        onClick={() => removeMetric(index)}
                        className="p-2 text-red-400 hover:text-red-300 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                  {editingProject?.metrics?.length === 0 && (
                    <p className="text-xs text-center py-4 text-mist-dark italic">No metrics added yet.</p>
                  )}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-mist-dark">Live URL</label>
                  <input 
                    type="url" 
                    value={editingProject?.liveUrl || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, liveUrl: e.target.value })}
                    className="w-full bg-teal-dark border border-mist/10 rounded-xl px-4 py-3 text-mist focus:border-amber/50 outline-none"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-mist-dark">GitHub URL</label>
                  <input 
                    type="url" 
                    value={editingProject?.githubUrl || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, githubUrl: e.target.value })}
                    className="w-full bg-teal-dark border border-mist/10 rounded-xl px-4 py-3 text-mist focus:border-amber/50 outline-none"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <input 
                  type="checkbox" 
                  id="featured"
                  checked={editingProject?.featured || false}
                  onChange={(e) => setEditingProject({ ...editingProject, featured: e.target.checked })}
                  className="w-4 h-4 rounded border-mist/10 bg-teal-dark text-amber focus:ring-amber"
                />
                <label htmlFor="featured" className="text-sm font-medium text-mist">Feature this project on home page</label>
              </div>

              <div className="space-y-4 pt-4 border-t border-mist/5">
                <label className="text-sm font-medium text-mist-dark">Project Thumbnail</label>
                <div className="flex items-center gap-6">
                  <div className="w-32 h-20 rounded-xl bg-teal-dark border border-mist/10 flex items-center justify-center overflow-hidden">
                    {editingProject?.thumbnail ? (
                      <img src={editingProject.thumbnail} alt="Thumbnail" className="w-full h-full object-cover" />
                    ) : (
                      <FolderGit2 className="w-8 h-8 text-mist-dark/30" />
                    )}
                  </div>
                  <div className="flex-1 space-y-2">
                    <input 
                      type="file"
                      id="thumb-upload"
                      className="hidden"
                      accept="image/*"
                      onChange={async (e) => {
                        const file = e.target.files?.[0];
                        if (!file) return;
                        const toastId = toast.loading('Uploading thumbnail...');
                        try {
                          const { url } = await profileApi.uploadMedia(file);
                          setEditingProject({ ...editingProject, thumbnail: url });
                          toast.success('Thumbnail uploaded', { id: toastId });
                        } catch (err) {
                          toast.error('Upload failed', { id: toastId });
                        }
                      }}
                    />
                    <Button 
                      type="button"
                      onClick={() => document.getElementById('thumb-upload')?.click()}
                      className="btn-secondary"
                    >
                      <Upload className="w-4 h-4 mr-2" />
                      Select Image
                    </Button>
                    <p className="text-[10px] text-mist-dark">Recommended: 1200x800px (4:3 or 16:9)</p>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-6 border-t border-mist/5">
                <Button type="button" onClick={resetForm} className="bg-transparent text-mist-dark hover:text-mist">
                  Cancel
                </Button>
                <Button type="submit" className="btn-accent px-8">
                  {editingId ? 'Update Project' : 'Save Project'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}