import { useState } from 'react';
import { Plus, Pencil, Trash2, Briefcase, Calendar, MapPin, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useExperience } from '@/hooks/useProfile';
import { toast } from 'sonner';
import { profileApi } from '@/lib/api';
import type { Experience } from '@/types';

export function ExperienceManager() {
  const { experiences, loading, deleteExperience, createExperience, updateExperience } = useExperience();
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingExp, setEditingExp] = useState<Partial<Experience> | null>(null);

  const resetForm = () => {
    setEditingId(null);
    setEditingExp(null);
    setShowModal(false);
  };

  const handleEdit = (exp: Experience) => {
    setEditingId(exp.id);
    setEditingExp({ ...exp });
    setShowModal(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this experience?')) {
      await deleteExperience(id);
      toast.success('Experience deleted');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingExp?.title || !editingExp?.company || !editingExp?.startDate) {
      toast.error('Please fill in required fields');
      return;
    }

    try {
      if (editingId) {
        await updateExperience(editingId, editingExp);
        toast.success('Experience updated');
      } else {
        await createExperience(editingExp as Omit<Experience, 'id' | 'createdAt' | 'updatedAt'>);
        toast.success('Experience created');
      }
      resetForm();
    } catch (err) {
      toast.error('Failed to save experience');
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
            Experience
          </h2>
          <p className="text-mist-dark mt-1">
            Manage your work history and career timeline.
          </p>
        </div>
        <Button 
          onClick={() => { 
            setEditingId(null); 
            setEditingExp({ 
              title: '', 
              company: '', 
              location: '', 
              startDate: '', 
              isCurrent: false, 
              description: '', 
              impact: [], 
              skills: [] 
            }); 
            setShowModal(true); 
          }}
          className="btn-accent"
        >
          <Plus className="w-4 h-4" />
          Add Experience
        </Button>
      </div>

      {/* Experience List */}
      <div className="space-y-4">
        {experiences.map((exp) => (
          <div key={exp.id} className="portfolio-card p-6">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-amber/10 flex items-center justify-center">
                  <Briefcase className="w-6 h-6 text-amber" />
                </div>
                <div>
                  <h3 className="font-display text-lg font-semibold text-mist">
                    {exp.title}
                  </h3>
                  <p className="text-amber">{exp.company}</p>
                  <div className="flex items-center gap-4 mt-2 text-sm text-mist-dark">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {exp.startDate ? new Date(exp.startDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : ''} - 
                      {exp.isCurrent ? ' Present' : exp.endDate ? ` ${new Date(exp.endDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}` : ''}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {exp.location}
                    </span>
                  </div>
                  <p className="text-mist-dark mt-3 text-sm line-clamp-2">{exp.description}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => handleEdit(exp)}
                  className="p-2 rounded-lg hover:bg-mist/5 text-mist-dark hover:text-amber transition-colors"
                >
                  <Pencil className="w-5 h-5" />
                </button>
                <button 
                  onClick={() => handleDelete(exp.id)}
                  className="p-2 rounded-lg hover:bg-red-500/10 text-mist-dark hover:text-red-400 transition-colors"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
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
                {editingId ? 'Edit Experience' : 'Add Experience'}
              </h3>
              <button 
                onClick={resetForm}
                className="p-2 rounded-full hover:bg-mist/5 text-mist-dark transition-colors"
              >
                <Plus className="w-6 h-6 rotate-45" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-mist-dark">Company Logo</label>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-xl bg-teal-dark border border-mist/10 flex items-center justify-center overflow-hidden">
                    {editingExp?.logo ? (
                      <img src={editingExp.logo} alt="Logo" className="w-full h-full object-cover" />
                    ) : (
                      <Briefcase className="w-6 h-6 text-mist-dark/30" />
                    )}
                  </div>
                  <div className="flex-1">
                    <input 
                      type="file"
                      id="logo-upload"
                      className="hidden"
                      accept="image/*"
                      onChange={async (e) => {
                        const file = e.target.files?.[0];
                        if (!file) return;
                        const toastId = toast.loading('Uploading logo...');
                        try {
                          const { url } = await profileApi.uploadMedia(file);
                          setEditingExp({ ...editingExp, logo: url });
                          toast.success('Logo uploaded', { id: toastId });
                        } catch (err) {
                          toast.error('Upload failed', { id: toastId });
                        }
                      }}
                    />
                    <Button 
                      type="button"
                      onClick={() => document.getElementById('logo-upload')?.click()}
                      className="btn-secondary text-xs py-2 h-auto"
                    >
                      <Upload className="w-3 h-3 mr-2" />
                      Upload Logo
                    </Button>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-mist-dark">Job Title *</label>
                  <input 
                    type="text" 
                    value={editingExp?.title || ''}
                    onChange={(e) => setEditingExp({ ...editingExp, title: e.target.value })}
                    className="w-full bg-teal-dark border border-mist/10 rounded-xl px-4 py-3 text-mist focus:border-amber/50 focus:ring-1 focus:ring-amber/50 outline-none transition-all"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-mist-dark">Company *</label>
                  <input 
                    type="text" 
                    value={editingExp?.company || ''}
                    onChange={(e) => setEditingExp({ ...editingExp, company: e.target.value })}
                    className="w-full bg-teal-dark border border-mist/10 rounded-xl px-4 py-3 text-mist focus:border-amber/50 focus:ring-1 focus:ring-amber/50 outline-none transition-all"
                    required
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-mist-dark">Location</label>
                  <input 
                    type="text" 
                    value={editingExp?.location || ''}
                    onChange={(e) => setEditingExp({ ...editingExp, location: e.target.value })}
                    className="w-full bg-teal-dark border border-mist/10 rounded-xl px-4 py-3 text-mist focus:border-amber/50 outline-none"
                  />
                </div>
                <div className="flex items-center gap-2 pt-8">
                  <input 
                    type="checkbox" 
                    id="isCurrent"
                    checked={editingExp?.isCurrent || false}
                    onChange={(e) => setEditingExp({ ...editingExp, isCurrent: e.target.checked, endDate: e.target.checked ? undefined : editingExp?.endDate })}
                    className="w-4 h-4 rounded border-mist/10 bg-teal-dark text-amber focus:ring-amber"
                  />
                  <label htmlFor="isCurrent" className="text-sm font-medium text-mist">Currently working here</label>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-mist-dark">Start Date *</label>
                  <input 
                    type="date" 
                    value={editingExp?.startDate ? editingExp.startDate.split('T')[0] : ''}
                    onChange={(e) => setEditingExp({ ...editingExp, startDate: e.target.value })}
                    className="w-full bg-teal-dark border border-mist/10 rounded-xl px-4 py-3 text-mist focus:border-amber/50 outline-none"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-mist-dark">End Date</label>
                  <input 
                    type="date" 
                    value={editingExp?.endDate ? editingExp.endDate.split('T')[0] : ''}
                    disabled={editingExp?.isCurrent}
                    onChange={(e) => setEditingExp({ ...editingExp, endDate: e.target.value })}
                    className="w-full bg-teal-dark border border-mist/10 rounded-xl px-4 py-3 text-mist focus:border-amber/50 outline-none disabled:opacity-50"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-mist-dark">Description</label>
                <textarea 
                  rows={4}
                  value={editingExp?.description || ''}
                  onChange={(e) => setEditingExp({ ...editingExp, description: e.target.value })}
                  className="w-full bg-teal-dark border border-mist/10 rounded-xl px-4 py-3 text-mist focus:border-amber/50 outline-none resize-none"
                />
              </div>

              <div className="flex justify-end gap-3 pt-6 border-t border-mist/5">
                <Button 
                  type="button" 
                  onClick={resetForm}
                  className="bg-transparent text-mist-dark hover:text-mist"
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  className="btn-accent px-8"
                >
                  {editingId ? 'Update Experience' : 'Save Experience'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}