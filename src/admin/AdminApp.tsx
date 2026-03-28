import { useState } from 'react';
import { 
  LayoutDashboard, 
  User, 
  Briefcase, 
  FolderGit2, 
  Award, 
  BookOpen, 
  MessageSquare, 
  Settings,
  LogOut,
  Menu
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { toast } from 'sonner';

// Admin sections
import { DashboardOverview } from './sections/DashboardOverview';
import { ProfileManager } from './sections/ProfileManager';
import { ExperienceManager } from './sections/ExperienceManager';
import { ProjectsManager } from './sections/ProjectsManager';
import { SkillsManager } from './sections/SkillsManager';
import { BlogManager } from './sections/BlogManager';
import { MessagesManager } from './sections/MessagesManager';
import { SettingsManager } from './sections/SettingsManager';

type AdminSection = 
  | 'dashboard' 
  | 'profile' 
  | 'experience' 
  | 'projects' 
  | 'skills' 
  | 'blog' 
  | 'messages' 
  | 'settings';

const navItems = [
  { id: 'dashboard' as AdminSection, label: 'Dashboard', icon: LayoutDashboard },
  { id: 'profile' as AdminSection, label: 'Profile', icon: User },
  { id: 'experience' as AdminSection, label: 'Experience', icon: Briefcase },
  { id: 'projects' as AdminSection, label: 'Projects', icon: FolderGit2 },
  { id: 'skills' as AdminSection, label: 'Skills & Tools', icon: Award },
  { id: 'blog' as AdminSection, label: 'Blog', icon: BookOpen },
  { id: 'messages' as AdminSection, label: 'Messages', icon: MessageSquare },
  { id: 'settings' as AdminSection, label: 'Settings', icon: Settings },
];

export function AdminApp() {
  const [currentSection, setCurrentSection] = useState<AdminSection>('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginForm.email === 'tanveerbakshii@gmail.com' && loginForm.password === 'admin123') {
      setIsAuthenticated(true);
      toast.success('Welcome back, Tanveer!');
    } else {
      toast.error('Invalid credentials');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setLoginForm({ email: '', password: '' });
    toast.success('Logged out successfully');
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-teal flex items-center justify-center p-4">
        <div className="portfolio-card w-full max-w-md p-8">
          <div className="text-center mb-8">
            <h1 className="font-display text-2xl font-semibold text-mist mb-2">
              Portfolio OS Admin
            </h1>
            <p className="text-mist-dark">Sign in to manage your portfolio</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm text-mist-dark mb-2">Email</label>
              <input
                type="email"
                value={loginForm.email}
                onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-teal-light/50 border border-mist/10 text-mist placeholder:text-mist-dark/50 focus:border-amber/50 focus:outline-none"
                placeholder="admin@example.com"
                required
              />
            </div>
            <div>
              <label className="block text-sm text-mist-dark mb-2">Password</label>
              <input
                type="password"
                value={loginForm.password}
                onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-teal-light/50 border border-mist/10 text-mist placeholder:text-mist-dark/50 focus:border-amber/50 focus:outline-none"
                placeholder="••••••••"
                required
              />
            </div>
            <Button type="submit" className="w-full btn-accent">
              Sign In
            </Button>
          </form>

          <div className="mt-6 text-center text-xs text-mist-dark">
            <p>Demo credentials:</p>
            <p>Email: tanveerbakshii@gmail.com</p>
            <p>Password: admin123</p>
          </div>
        </div>
      </div>
    );
  }

  const renderSection = () => {
    switch (currentSection) {
      case 'dashboard':
        return <DashboardOverview />;
      case 'profile':
        return <ProfileManager />;
      case 'experience':
        return <ExperienceManager />;
      case 'projects':
        return <ProjectsManager />;
      case 'skills':
        return <SkillsManager />;
      case 'blog':
        return <BlogManager />;
      case 'messages':
        return <MessagesManager />;
      case 'settings':
        return <SettingsManager />;
      default:
        return <DashboardOverview />;
    }
  };

  return (
    <div className="min-h-screen bg-teal flex">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 bg-teal-dark border-r border-mist/10 fixed h-full">
        <div className="p-6 border-b border-mist/10">
          <h1 className="font-display text-xl font-semibold text-mist">
            Portfolio OS
          </h1>
          <p className="text-xs text-mist-dark mt-1">Admin Panel</p>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setCurrentSection(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all ${
                  currentSection === item.id
                    ? 'bg-amber/10 text-amber'
                    : 'text-mist-dark hover:text-mist hover:bg-mist/5'
                }`}
              >
                <Icon className="w-5 h-5" />
                {item.label}
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-mist/10">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left text-mist-dark hover:text-red-400 hover:bg-red-500/10 transition-all"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </aside>

      {/* Mobile Sidebar */}
      <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
        <SheetContent side="left" className="w-64 bg-teal-dark border-r border-mist/10 p-0">
          <div className="p-6 border-b border-mist/10">
            <h1 className="font-display text-xl font-semibold text-mist">
              Portfolio OS
            </h1>
            <p className="text-xs text-mist-dark mt-1">Admin Panel</p>
          </div>

          <nav className="p-4 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setCurrentSection(item.id);
                    setIsSidebarOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all ${
                    currentSection === item.id
                      ? 'bg-amber/10 text-amber'
                      : 'text-mist-dark hover:text-mist hover:bg-mist/5'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {item.label}
                </button>
              );
            })}
          </nav>

          <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-mist/10">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left text-mist-dark hover:text-red-400 hover:bg-red-500/10 transition-all"
            >
              <LogOut className="w-5 h-5" />
              Logout
            </button>
          </div>
        </SheetContent>
      </Sheet>

      {/* Main Content */}
      <main className="flex-1 lg:ml-64">
        {/* Mobile Header */}
        <header className="lg:hidden flex items-center justify-between p-4 bg-teal-dark border-b border-mist/10">
          <h1 className="font-display text-lg font-semibold text-mist">
            Portfolio OS
          </h1>
          <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
            <SheetTrigger asChild>
              <button className="p-2 text-mist">
                <Menu className="w-6 h-6" />
              </button>
            </SheetTrigger>
          </Sheet>
        </header>

        {/* Page Content */}
        <div className="p-6 lg:p-8">
          {renderSection()}
        </div>
      </main>
    </div>
  );
}