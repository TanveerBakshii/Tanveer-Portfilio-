import { useEffect, useState } from 'react';
import { 
  Eye, 
  Users, 
  Download, 
  FolderGit2, 
  TrendingUp,
  Activity
} from 'lucide-react';
import { dashboardStatsApi } from '@/lib/api';
import type { DashboardStats } from '@/types';

export function DashboardOverview() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dashboardStatsApi.get().then((data) => {
      setStats(data);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-2 border-amber/30 border-t-amber rounded-full animate-spin" />
      </div>
    );
  }

  const statCards = [
    { 
      label: 'Total Views', 
      value: stats?.totalViews.toLocaleString() || '0', 
      icon: Eye,
      trend: '+12%',
      color: 'amber'
    },
    { 
      label: 'Unique Visitors', 
      value: stats?.uniqueVisitors.toLocaleString() || '0', 
      icon: Users,
      trend: '+8%',
      color: 'emerald'
    },
    { 
      label: 'Resume Downloads', 
      value: stats?.resumeDownloads.toLocaleString() || '0', 
      icon: Download,
      trend: '+23%',
      color: 'blue'
    },
    { 
      label: 'Projects Viewed', 
      value: stats?.topProjects.reduce((acc, p) => acc + p.views, 0).toLocaleString() || '0', 
      icon: FolderGit2,
      trend: '+15%',
      color: 'purple'
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="font-display text-2xl font-semibold text-mist">
          Dashboard Overview
        </h2>
        <p className="text-mist-dark mt-1">
          Welcome back! Here's what's happening with your portfolio.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="portfolio-card-sm p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-mist-dark">{stat.label}</p>
                  <p className="text-3xl font-display font-semibold text-mist mt-2">
                    {stat.value}
                  </p>
                </div>
                <div className={`w-10 h-10 rounded-xl bg-${stat.color}-500/10 flex items-center justify-center`}>
                  <Icon className={`w-5 h-5 text-${stat.color}-400`} />
                </div>
              </div>
              <div className="flex items-center gap-1 mt-4">
                <TrendingUp className="w-4 h-4 text-emerald-400" />
                <span className="text-sm text-emerald-400">{stat.trend}</span>
                <span className="text-sm text-mist-dark">vs last month</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Content Grid */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Top Projects */}
        <div className="portfolio-card p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-display text-lg font-semibold text-mist">
              Top Projects
            </h3>
            <Activity className="w-5 h-5 text-amber" />
          </div>
          <div className="space-y-4">
            {stats?.topProjects.map((project, index) => (
              <div key={project.id} className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-lg bg-amber/10 flex items-center justify-center text-amber font-medium">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <p className="text-mist">{project.title}</p>
                  <p className="text-sm text-mist-dark">{project.views} views</p>
                </div>
                <div className="w-24 h-2 rounded-full bg-teal-light overflow-hidden">
                  <div 
                    className="h-full rounded-full bg-amber"
                    style={{ width: `${(project.views / (stats?.topProjects[0]?.views || 1)) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Page Views */}
        <div className="portfolio-card p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-display text-lg font-semibold text-mist">
              Page Views
            </h3>
            <Eye className="w-5 h-5 text-amber" />
          </div>
          <div className="space-y-4">
            {Object.entries(stats?.pageViews || {}).map(([page, views]) => (
              <div key={page} className="flex items-center gap-4">
                <div className="w-24 text-mist-dark text-sm">{page}</div>
                <div className="flex-1">
                  <div className="h-2 rounded-full bg-teal-light overflow-hidden">
                    <div 
                      className="h-full rounded-full bg-amber"
                      style={{ width: `${(views / (stats?.totalViews || 1)) * 100}%` }}
                    />
                  </div>
                </div>
                <div className="w-16 text-right text-mist text-sm">
                  {views.toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="portfolio-card p-6">
        <h3 className="font-display text-lg font-semibold text-mist mb-4">
          Quick Actions
        </h3>
        <div className="flex flex-wrap gap-4">
          <a href="/admin#/profile" className="btn-secondary">
            Edit Profile
          </a>
          <a href="/admin#/projects" className="btn-secondary">
            Add Project
          </a>
          <a href="/admin#/blog" className="btn-secondary">
            Write Blog Post
          </a>
          <a href="/" target="_blank" className="btn-accent">
            View Portfolio
          </a>
        </div>
      </div>
    </div>
  );
}