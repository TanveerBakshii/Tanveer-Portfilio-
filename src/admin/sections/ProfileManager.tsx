import { useState, useEffect } from 'react';
import { Save, User, Mail, Phone, MapPin, Linkedin, FileText, Upload, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { profileApi } from '@/lib/api';
import type { Profile } from '@/types';
import { toast } from 'sonner';

export function ProfileManager() {
  const [, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState<Partial<Profile>>({});

  useEffect(() => {
    profileApi.get().then((data) => {
      setProfile(data);
      setFormData(data);
      setLoading(false);
    });
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      await profileApi.update(formData);
      toast.success('Profile updated successfully');
    } catch (error) {
      toast.error('Failed to update profile');
    } finally {
      setSaving(false);
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
            Profile Management
          </h2>
          <p className="text-mist-dark mt-1">
            Manage your personal information and contact details.
          </p>
        </div>
        <Button 
          onClick={handleSave} 
          disabled={saving}
          className="btn-accent"
        >
          {saving ? (
            <>
              <div className="w-4 h-4 border-2 border-teal/30 border-t-teal rounded-full animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="w-4 h-4" />
              Save Changes
            </>
          )}
        </Button>
      </div>

      {/* Form */}
      <div className="portfolio-card p-6 space-y-8">
        {/* Profile Image Section */}
        <div className="flex flex-col md:flex-row items-center gap-8 pb-8 border-b border-mist/10">
          <div className="relative group">
            <div className="w-32 h-32 rounded-2xl overflow-hidden bg-teal-light/50 border-2 border-mist/10 group-hover:border-amber/50 transition-colors">
              {formData.avatar ? (
                <img src={formData.avatar} alt="Avatar Preview" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-teal-light/30 text-mist-dark">
                  <User className="w-12 h-12 opacity-20" />
                </div>
              )}
            </div>
            {formData.avatar && (
              <button
                onClick={() => setFormData({ ...formData, avatar: '' })}
                className="absolute -top-2 -right-2 p-1.5 rounded-full bg-red-500 text-white opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                title="Remove image"
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </div>
          <div className="space-y-4 flex-1 text-center md:text-left">
            <h3 className="text-lg font-medium text-mist">Profile Picture</h3>
            <p className="text-sm text-mist-dark">
              Upload a professional photo (recommended: square, at least 400x400px).
            </p>
            <div className="flex flex-wrap justify-center md:justify-start gap-4">
              <input
                type="file"
                id="avatar-upload"
                className="hidden"
                accept="image/*"
                onChange={async (e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;
                  const toastId = toast.loading('Uploading photo...');
                  try {
                    const { url } = await profileApi.uploadMedia(file);
                    setFormData({ ...formData, avatar: url });
                    toast.success('Photo uploaded', { id: toastId });
                  } catch (error) {
                    toast.error('Upload failed', { id: toastId });
                  }
                }}
              />
              <Button 
                onClick={() => document.getElementById('avatar-upload')?.click()}
                className="btn-secondary"
              >
                <Upload className="w-4 h-4" />
                Select Photo
              </Button>
            </div>
          </div>
        </div>

        {/* Basic Info */}
        <div className="grid md:grid-cols-2 gap-6 pt-4">
          <div>
            <label className="block text-sm text-mist-dark mb-2">Full Name</label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-mist-dark" />
              <input
                type="text"
                value={formData.name || ''}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full pl-12 pr-4 py-3 rounded-xl bg-teal-light/50 border border-mist/10 text-mist focus:border-amber/50 focus:outline-none"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm text-mist-dark mb-2">Role/Title</label>
            <input
              type="text"
              value={formData.role || ''}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-teal-light/50 border border-mist/10 text-mist focus:border-amber/50 focus:outline-none"
            />
          </div>
        </div>

        {/* Tagline & Experience */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm text-mist-dark mb-2">Tagline</label>
            <input
              type="text"
              value={formData.tagline || ''}
              onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-teal-light/50 border border-mist/10 text-mist focus:border-amber/50 focus:outline-none"
              placeholder="A short, catchy description"
            />
          </div>
          <div>
            <label className="block text-sm text-mist-dark mb-2">Experience</label>
            <input
              type="text"
              value={formData.experience || ''}
              onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-teal-light/50 border border-mist/10 text-mist focus:border-amber/50 focus:outline-none"
              placeholder="e.g., 7+ Years"
            />
          </div>
        </div>

        {/* Contact Info */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm text-mist-dark mb-2">Email</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-mist-dark" />
              <input
                type="email"
                value={formData.email || ''}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full pl-12 pr-4 py-3 rounded-xl bg-teal-light/50 border border-mist/10 text-mist focus:border-amber/50 focus:outline-none"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm text-mist-dark mb-2">Phone</label>
            <div className="relative">
              <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-mist-dark" />
              <input
                type="tel"
                value={formData.phone || ''}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full pl-12 pr-4 py-3 rounded-xl bg-teal-light/50 border border-mist/10 text-mist focus:border-amber/50 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Location & LinkedIn */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm text-mist-dark mb-2">Location</label>
            <div className="relative">
              <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-mist-dark" />
              <input
                type="text"
                value={formData.location || ''}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full pl-12 pr-4 py-3 rounded-xl bg-teal-light/50 border border-mist/10 text-mist focus:border-amber/50 focus:outline-none"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm text-mist-dark mb-2">LinkedIn URL</label>
            <div className="relative">
              <Linkedin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-mist-dark" />
              <input
                type="url"
                value={formData.linkedin || ''}
                onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                className="w-full pl-12 pr-4 py-3 rounded-xl bg-teal-light/50 border border-mist/10 text-mist focus:border-amber/50 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Bio */}
        <div>
          <label className="block text-sm text-mist-dark mb-2">Short Bio</label>
          <textarea
            value={formData.shortBio || ''}
            onChange={(e) => setFormData({ ...formData, shortBio: e.target.value })}
            rows={3}
            className="w-full px-4 py-3 rounded-xl bg-teal-light/50 border border-mist/10 text-mist focus:border-amber/50 focus:outline-none resize-none"
            placeholder="Brief description for cards and previews"
          />
        </div>

        {/* Full Bio */}
        <div>
          <label className="block text-sm text-mist-dark mb-2">Full Bio</label>
          <textarea
            value={formData.bio || ''}
            onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
            rows={8}
            className="w-full px-4 py-3 rounded-xl bg-teal-light/50 border border-mist/10 text-mist focus:border-amber/50 focus:outline-none resize-none"
            placeholder="Your full biography"
          />
        </div>

        {/* Resume Upload */}
        <div className="pt-4 border-t border-mist/10">
          <label className="block text-sm text-mist-dark mb-4">Resume / CV</label>
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="w-full sm:flex-1 relative">
              <FileText className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-mist-dark" />
              <input
                type="text"
                value={formData.resumeUrl || ''}
                readOnly
                className="w-full pl-12 pr-4 py-3 rounded-xl bg-teal-light/50 border border-mist/10 text-mist focus:outline-none cursor-default"
                placeholder="No resume uploaded yet"
              />
            </div>
            <div className="flex items-center gap-2">
              <input
                type="file"
                id="resume-upload"
                className="hidden"
                accept=".pdf,.doc,.docx"
                onChange={async (e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;
                  
                  const toastId = toast.loading('Uploading resume...');
                  try {
                    const { url } = await profileApi.uploadMedia(file);
                    setFormData({ ...formData, resumeUrl: url });
                    toast.success('Resume uploaded successfully', { id: toastId });
                  } catch (error) {
                    toast.error('Failed to upload resume', { id: toastId });
                  }
                }}
              />
              <Button 
                onClick={() => document.getElementById('resume-upload')?.click()}
                className="btn-accent whitespace-nowrap"
              >
                <Upload className="w-4 h-4" />
                Upload New
              </Button>
              {formData.resumeUrl && (
                <button
                  onClick={() => setFormData({ ...formData, resumeUrl: '' })}
                  className="p-3 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors"
                  title="Remove resume"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>
          <p className="mt-2 text-xs text-mist-dark">
            Upload your CV in PDF or Word format (max 5MB).
          </p>
        </div>


        {/* Visibility */}
        <div className="flex items-center gap-4 pt-4 border-t border-mist/10">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.isPublic}
              onChange={(e) => setFormData({ ...formData, isPublic: e.target.checked })}
              className="w-5 h-5 rounded border-mist/20 bg-teal-light text-amber focus:ring-amber"
            />
            <span className="text-mist">Make profile public</span>
          </label>
        </div>
      </div>
    </div>
  );
}