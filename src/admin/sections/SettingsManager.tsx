import { useState, useEffect } from 'react';
import { Save, Globe, Palette, Sliders, Zap, RotateCcw, Activity } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useSettings } from '@/components/ThemeProvider';
import { toast } from 'sonner';

export function SettingsManager() {
  const { settings, loading, updateSettings, resetSettings } = useSettings();
  const [formData, setFormData] = useState(settings);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (settings) {
      setFormData(settings);
    }
  }, [settings]);

  const handleSave = async () => {
    if (!formData) return;
    setSaving(true);
    try {
      await updateSettings(formData);
      toast.success('Settings saved and theme updated');
    } catch (err) {
      toast.error('Failed to save settings');
    } finally {
      setSaving(false);
    }
  };

  const handleReset = async () => {
    if (confirm('Reset to default system settings? This will revert all theme changes.')) {
      try {
        await resetSettings();
        toast.info('Settings restored to defaults');
      } catch (err) {
        toast.error('Reset failed');
      }
    }
  };

  if (loading || !formData) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-2 border-amber/30 border-t-amber rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-display text-2xl font-bold text-mist">
            System Intelligence
          </h2>
          <p className="text-mist-dark mt-1">
            Configure global OS parameters and visual identity.
          </p>
        </div>
        <div className="flex gap-3">
          <Button onClick={handleReset} variant="outline" className="border-mist/10 hover:bg-mist/5">
            <RotateCcw className="w-4 h-4" />
          </Button>
          <Button onClick={handleSave} disabled={saving} className="btn-accent">
            {saving ? (
              <>
                <div className="w-4 h-4 border-2 border-teal/30 border-t-teal rounded-full animate-spin mr-2" />
                Processing...
              </>
            ) : (
              <>
                <Save className="w-4 h-4 mr-2" />
                Deploy Config
              </>
            )}
          </Button>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <div className="space-y-8">
          {/* Site Settings */}
          <div className="portfolio-card p-8">
            <div className="flex items-center gap-3 mb-8 border-b border-mist/5 pb-4">
              <Globe className="w-5 h-5 text-amber" />
              <h3 className="font-display text-xl font-bold text-mist">
                Core Identity
              </h3>
            </div>
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-mist-dark">System Name</label>
                <input
                  type="text"
                  value={formData.siteTitle}
                  onChange={(e) => setFormData({ ...formData, siteTitle: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-teal-dark border border-mist/10 text-mist focus:border-amber/50 outline-none transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-mist-dark">Tagline / Mission</label>
                <input
                  type="text"
                  value={formData.siteDescription}
                  onChange={(e) => setFormData({ ...formData, siteDescription: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-teal-dark border border-mist/10 text-mist focus:border-amber/50 outline-none transition-all"
                />
              </div>
            </div>
          </div>

          {/* Appearance Settings */}
          <div className="portfolio-card p-8">
            <div className="flex items-center gap-3 mb-8 border-b border-mist/5 pb-4">
              <Palette className="w-5 h-5 text-amber" />
              <h3 className="font-display text-xl font-bold text-mist">
                Visual Engine
              </h3>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <label className="text-sm font-medium text-mist-dark">Primary Base</label>
                <div className="flex items-center gap-4">
                  <input
                    type="color"
                    value={formData.primaryColor}
                    onChange={(e) => setFormData({ ...formData, primaryColor: e.target.value })}
                    className="w-14 h-14 rounded-full border-4 border-mist/10 bg-transparent cursor-pointer overflow-hidden p-0"
                  />
                  <input
                    type="text"
                    value={formData.primaryColor}
                    onChange={(e) => setFormData({ ...formData, primaryColor: e.target.value })}
                    className="flex-1 font-mono text-sm px-4 py-3 rounded-xl bg-teal-dark border border-mist/10 text-mist outline-none"
                  />
                </div>
              </div>
              <div className="space-y-4">
                <label className="text-sm font-medium text-mist-dark">Accent Intelligence</label>
                <div className="flex items-center gap-4">
                  <input
                    type="color"
                    value={formData.accentColor}
                    onChange={(e) => setFormData({ ...formData, accentColor: e.target.value })}
                    className="w-14 h-14 rounded-full border-4 border-mist/10 bg-transparent cursor-pointer overflow-hidden p-0"
                  />
                  <input
                    type="text"
                    value={formData.accentColor}
                    onChange={(e) => setFormData({ ...formData, accentColor: e.target.value })}
                    className="flex-1 font-mono text-sm px-4 py-3 rounded-xl bg-teal-dark border border-mist/10 text-mist outline-none"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          {/* Advanced UI Physics */}
          <div className="portfolio-card p-8">
            <div className="flex items-center gap-3 mb-8 border-b border-mist/5 pb-4">
              <Sliders className="w-5 h-5 text-amber" />
              <h3 className="font-display text-xl font-bold text-mist">
                Advanced UI Physics
              </h3>
            </div>
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-medium text-mist-dark">Animation Orchestration</label>
                  <span className="text-xs font-mono text-amber">{(formData.animationSpeed * 100).toFixed(0)}% Intensity</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={formData.animationSpeed}
                  onChange={(e) => setFormData({ ...formData, animationSpeed: parseFloat(e.target.value) })}
                  className="w-full h-1.5 bg-teal-light rounded-lg appearance-none cursor-pointer accent-amber"
                />
                <div className="flex justify-between text-[10px] text-mist-dark/50 uppercase tracking-widest px-1">
                  <span>Static</span>
                  <span>Cinematic</span>
                  <span>Hyper</span>
                </div>
              </div>

              <div className="space-y-4">
                <label className="text-sm font-medium text-mist-dark">Spatial Density</label>
                <div className="grid grid-cols-3 gap-3">
                  {(['compact', 'comfortable', 'spacious'] as const).map((density) => (
                    <button
                      key={density}
                      onClick={() => setFormData({ ...formData, uiDensity: density })}
                      className={`px-4 py-2 rounded-xl text-xs font-medium transition-all border ${
                        formData.uiDensity === density 
                          ? 'bg-amber text-teal border-amber shadow-lg shadow-amber/20' 
                          : 'bg-teal-dark border-mist/10 text-mist-dark hover:border-amber/30'
                      }`}
                    >
                      {density.charAt(0).toUpperCase() + density.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* SEO Performance */}
          <div className="portfolio-card p-8">
            <div className="flex items-center gap-3 mb-8 border-b border-mist/5 pb-4">
              <Globe className="w-5 h-5 text-amber" />
              <h3 className="font-display text-xl font-bold text-mist">
                SEO & Search Indexing
              </h3>
            </div>
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-mist-dark">Search Discovery Title</label>
                <input
                  type="text"
                  value={formData.seoTitle || ''}
                  onChange={(e) => setFormData({ ...formData, seoTitle: e.target.value })}
                  placeholder="Appears in Google Search results"
                  className="w-full px-4 py-3 rounded-xl bg-teal-dark border border-mist/10 text-mist focus:border-amber/50 outline-none transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-mist-dark">Meta Description</label>
                <textarea
                  value={formData.seoDescription || ''}
                  onChange={(e) => setFormData({ ...formData, seoDescription: e.target.value })}
                  placeholder="Brief summary for search engines"
                  className="w-full px-4 py-3 rounded-xl bg-teal-dark border border-mist/10 text-mist focus:border-amber/50 outline-none transition-all h-24 resize-none"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-mist-dark">Index Keywords</label>
                <input
                  type="text"
                  value={formData.seoKeywords || ''}
                  onChange={(e) => setFormData({ ...formData, seoKeywords: e.target.value })}
                  placeholder="healthcare, it, emr, etc."
                  className="w-full px-4 py-3 rounded-xl bg-teal-dark border border-mist/10 text-mist focus:border-amber/50 outline-none transition-all"
                />
              </div>
            </div>
          </div>

          {/* Clinical Accuracy Metrics */}
          <div className="portfolio-card p-8">
            <div className="flex items-center gap-3 mb-8 border-b border-mist/5 pb-4">
              <Activity className="w-5 h-5 text-amber" />
              <h3 className="font-display text-xl font-bold text-mist">
                Clinical Accuracy Metrics
              </h3>
            </div>
            <div className="space-y-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-medium text-mist-dark">System Integrity (OPS)</label>
                  <span className="text-sm font-mono text-emerald-400">{formData.systemIntegrity}%</span>
                </div>
                <input
                  type="range"
                  min="90"
                  max="100"
                  step="0.01"
                  value={formData.systemIntegrity}
                  onChange={(e) => setFormData({ ...formData, systemIntegrity: parseFloat(e.target.value) })}
                  className="w-full h-1.5 bg-teal-light rounded-lg appearance-none cursor-pointer accent-emerald-400"
                />
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-medium text-mist-dark">UAT Acceptance Rate</label>
                  <span className="text-sm font-mono text-amber">{formData.uatRate}%</span>
                </div>
                <input
                  type="range"
                  min="80"
                  max="100"
                  step="0.1"
                  value={formData.uatRate}
                  onChange={(e) => setFormData({ ...formData, uatRate: parseFloat(e.target.value) })}
                  className="w-full h-1.5 bg-teal-light rounded-lg appearance-none cursor-pointer accent-amber"
                />
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-medium text-mist-dark">DQ Score (Data Quality)</label>
                  <span className="text-sm font-mono text-purple-400">{formData.dqScore}%</span>
                </div>
                <input
                  type="range"
                  min="80"
                  max="100"
                  step="0.1"
                  value={formData.dqScore}
                  onChange={(e) => setFormData({ ...formData, dqScore: parseFloat(e.target.value) })}
                  className="w-full h-1.5 bg-teal-light rounded-lg appearance-none cursor-pointer accent-purple-400"
                />
              </div>
            </div>
            <p className="text-[10px] text-mist-dark/50 mt-4 leading-relaxed uppercase tracking-widest">
              * These values drive the Clinical Intelligence Center metrics on the public portfolio.
            </p>
          </div>

          {/* Feature Integrations */}
          <div className="portfolio-card p-8">
            <div className="flex items-center gap-3 mb-8 border-b border-mist/5 pb-4">
              <Zap className="w-5 h-5 text-amber" />
              <h3 className="font-display text-xl font-bold text-mist">
                Cloud Synchronicity
              </h3>
            </div>
            <div className="space-y-4">
              {[
                { key: 'enableAnalytics', label: 'Biometric Analytics Tracking', icon: Globe },
                { key: 'enableContactForm', label: 'Neural Link Contact Interface', icon: Globe },
                { key: 'enableWebhooks', label: 'External Node Webhooks', icon: Globe },
              ].map((feature) => (
                <label key={feature.key} className="flex items-center justify-between p-4 rounded-2xl bg-teal-dark/50 border border-mist/5 cursor-pointer hover:border-amber/20 transition-all group">
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-mist group-hover:text-amber transition-colors">{feature.label}</span>
                  </div>
                  <div className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData[feature.key as keyof typeof formData] as boolean}
                      onChange={(e) => setFormData({ ...formData, [feature.key]: e.target.checked })}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-teal-light peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber"></div>
                  </div>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}