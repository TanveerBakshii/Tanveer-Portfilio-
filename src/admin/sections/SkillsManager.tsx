import { useState } from 'react';
import { Plus, Pencil, Trash2, Award, Wrench } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useSkills, useTools } from '@/hooks/useProfile';
import { toast } from 'sonner';
import type { Skill, Tool, SkillCategory } from '@/types';

export function SkillsManager() {
  const { skillsByCategory, loading: skillsLoading, deleteSkill, createSkill, updateSkill } = useSkills();
  const { tools, loading: toolsLoading, deleteTool, createTool, updateTool } = useTools();
  const [activeTab, setActiveTab] = useState<'skills' | 'tools'>('skills');
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingSkill, setEditingSkill] = useState<Partial<Skill> | null>(null);
  const [editingTool, setEditingTool] = useState<Partial<Tool> | null>(null);

  const resetForm = () => {
    setEditingId(null);
    setEditingSkill(null);
    setEditingTool(null);
    setShowModal(false);
  };


  const handleEditSkill = (skill: Skill) => {
    setEditingId(skill.id);
    setEditingSkill({ ...skill });
    setShowModal(true);
  };

  const handleEditTool = (tool: Tool) => {
    setEditingId(tool.id);
    setEditingTool({ ...tool });
    setShowModal(true);
  };

  const handleDeleteSkill = async (id: string) => {
    if (confirm('Are you sure?')) {
      await deleteSkill(id);
      toast.success('Skill deleted');
    }
  };

  const handleDeleteTool = async (id: string) => {
    if (confirm('Are you sure?')) {
      await deleteTool(id);
      toast.success('Tool deleted');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (activeTab === 'skills') {
        if (!editingSkill?.name || !editingSkill?.category) {
          toast.error('Please fill in required fields');
          return;
        }
        if (editingId) {
          await updateSkill(editingId, editingSkill);
          toast.success('Skill updated');
        } else {
          await createSkill({
            ...editingSkill,
            proficiency: editingSkill.proficiency || 80,
            order: 0,
            isPublic: true
          } as Omit<Skill, 'id' | 'createdAt' | 'updatedAt'>);
          toast.success('Skill created');
        }
      } else {
        if (!editingTool?.name || !editingTool?.category) {
          toast.error('Please fill in required fields');
          return;
        }
        if (editingId) {
          await updateTool(editingId, editingTool);
          toast.success('Tool updated');
        } else {
          await createTool({
            ...editingTool,
            proficiency: editingTool.proficiency || 90,
            order: 0,
            isPublic: true
          } as Omit<Tool, 'id' | 'createdAt' | 'updatedAt'>);
          toast.success('Tool created');
        }
      }
      resetForm();
    } catch (err) {
      toast.error('Failed to save data');
    }
  };


  if (skillsLoading || toolsLoading) {
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
            Skills & Tools
          </h2>
          <p className="text-mist-dark mt-1">
            Manage your technical skills and tools.
          </p>
        </div>
        <Button 
          onClick={() => { 
            setEditingId(null); 
            if (activeTab === 'skills') {
              setEditingSkill({ name: '', category: 'DATA_REPORTING', proficiency: 80 });
            } else {
              setEditingTool({ name: '', category: 'Development', proficiency: 90 });
            }
            setShowModal(true); 
          }} 
          className="btn-accent"
        >
          <Plus className="w-4 h-4" />
          Add {activeTab === 'skills' ? 'Skill' : 'Tool'}
        </Button>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 border-b border-mist/10">
        <button
          onClick={() => { setActiveTab('skills'); resetForm(); }}
          className={`pb-4 px-2 font-medium transition-colors ${
            activeTab === 'skills' ? 'text-amber border-b-2 border-amber' : 'text-mist-dark hover:text-mist'
          }`}
        >
          Skills
        </button>
        <button
          onClick={() => { setActiveTab('tools'); resetForm(); }}
          className={`pb-4 px-2 font-medium transition-colors ${
            activeTab === 'tools' ? 'text-amber border-b-2 border-amber' : 'text-mist-dark hover:text-mist'
          }`}
        >
          Tools
        </button>
      </div>

      {/* Skills Content */}
      {activeTab === 'skills' && (
        <div className="space-y-8">
          {Object.entries(skillsByCategory).map(([category, categorySkills]) => (
            <div key={category}>
              <h3 className="font-display text-lg font-semibold text-mist mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber" />
                {category.replace('_', ' ')}
              </h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {categorySkills.map((skill) => (
                  <div key={skill.id} className="portfolio-card-sm p-4 hover:border-amber/30 transition-colors group">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Award className="w-5 h-5 text-amber" />
                        <div>
                          <p className="text-mist font-medium">{skill.name}</p>
                          <p className="text-sm text-mist-dark">{skill.proficiency}%</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 opacity-Group-hover:opacity-100 transition-opacity">
                        <button 
                          onClick={() => handleEditSkill(skill)}
                          className="p-2 rounded-lg hover:bg-mist/5 text-mist-dark hover:text-amber transition-colors"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleDeleteSkill(skill.id)}
                          className="p-2 rounded-lg hover:bg-red-500/10 text-mist-dark hover:text-red-400 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tools Content */}
      {activeTab === 'tools' && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {tools.map((tool) => (
            <div key={tool.id} className="portfolio-card-sm p-4 hover:border-amber/30 transition-colors group">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Wrench className="w-5 h-5 text-amber" />
                  <div>
                    <p className="text-mist font-medium">{tool.name}</p>
                    <p className="text-sm text-mist-dark">{tool.category}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button 
                    onClick={() => handleEditTool(tool)}
                    className="p-2 rounded-lg hover:bg-mist/5 text-mist-dark hover:text-amber transition-colors"
                  >
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => handleDeleteTool(tool.id)}
                    className="p-2 rounded-lg hover:bg-red-500/10 text-mist-dark hover:text-red-400 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}


      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="portfolio-card w-full max-w-lg p-8 shadow-2xl">
            <div className="flex items-center justify-between mb-8 border-b border-mist/5 pb-4">
              <h3 className="font-display text-2xl font-bold text-mist">
                {editingId ? 'Edit' : 'Add'} {activeTab === 'skills' ? 'Skill' : 'Tool'}
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
                <label className="text-sm font-medium text-mist-dark">Name *</label>
                <input 
                  type="text" 
                  value={activeTab === 'skills' ? editingSkill?.name : editingTool?.name || ''}
                  onChange={(e) => activeTab === 'skills' ? 
                    setEditingSkill({ ...editingSkill, name: e.target.value }) : 
                    setEditingTool({ ...editingTool, name: e.target.value })
                  }
                  className="w-full bg-teal-dark border border-mist/10 rounded-xl px-4 py-3 text-mist focus:border-amber/50 outline-none transition-all"
                  required
                />
              </div>

              {activeTab === 'skills' ? (
                <div className="space-y-2">
                  <label className="text-sm font-medium text-mist-dark">Category *</label>
                  <select 
                    value={editingSkill?.category || ''}
                    onChange={(e) => setEditingSkill({ ...editingSkill, category: e.target.value as SkillCategory })}
                    className="w-full bg-teal-dark border border-mist/10 rounded-xl px-4 py-3 text-mist focus:border-amber/50 outline-none appearance-none"
                  >
                    <option value="HEALTHCARE_IT">Healthcare IT</option>
                    <option value="ANALYTICAL_TECH">Analytical & Tech</option>
                    <option value="SUPPORT_QUALITY">Support & Quality</option>
                    <option value="HEADLESS_SCRAPING">Headless Scraping</option>
                    <option value="AI_AUTOMATION">AI Automation</option>
                    <option value="TOOLS">Technical Tools</option>
                    <option value="ENGINEERING">Software Engineering</option>
                  </select>
                </div>
              ) : (
                <div className="space-y-2">
                  <label className="text-sm font-medium text-mist-dark">Category *</label>
                  <input 
                    type="text" 
                    value={editingTool?.category || ''}
                    onChange={(e) => setEditingTool({ ...editingTool, category: e.target.value })}
                    placeholder="e.g. Design, Development"
                    className="w-full bg-teal-dark border border-mist/10 rounded-xl px-4 py-3 text-mist focus:border-amber/50 outline-none transition-all"
                    required
                  />
                </div>
              )}

              <div className="space-y-4">
                <div className="flex justify-between">
                  <label className="text-sm font-medium text-mist-dark">Proficiency</label>
                  <span className="text-xs font-mono text-amber">
                    {activeTab === 'skills' ? editingSkill?.proficiency : editingTool?.proficiency}%
                  </span>
                </div>
                <input 
                  type="range" 
                  min="1" 
                  max="100"
                  value={activeTab === 'skills' ? editingSkill?.proficiency || 80 : editingTool?.proficiency || 90}
                  onChange={(e) => activeTab === 'skills' ?
                    setEditingSkill({ ...editingSkill, proficiency: parseInt(e.target.value) }) :
                    setEditingTool({ ...editingTool, proficiency: parseInt(e.target.value) })
                  }
                  className="w-full h-1.5 bg-teal-light rounded-lg appearance-none cursor-pointer accent-amber"
                />
              </div>

              <div className="flex justify-end gap-3 pt-6 border-t border-mist/5">
                <Button type="button" onClick={resetForm} className="bg-transparent text-mist-dark hover:text-mist">
                  Cancel
                </Button>
                <Button type="submit" className="btn-accent px-8">
                  Save Changes
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}