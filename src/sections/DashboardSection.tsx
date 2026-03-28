import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useSettings } from '@/components/ThemeProvider';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { TrendingUp, CheckCircle, Database, Activity, Github, Linkedin, ExternalLink, Terminal } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const lineData = [
  { name: 'Mon', value: 82 },
  { name: 'Tue', value: 88 },
  { name: 'Wed', value: 85 },
  { name: 'Thu', value: 92 },
  { name: 'Fri', value: 89 },
  { name: 'Sat', value: 94 },
  { name: 'Sun', value: 96 },
];

export function DashboardSection() {
  const { settings } = useSettings();
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const mainChartRef = useRef<HTMLDivElement>(null);
  const rightPanelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const card = cardRef.current;
    const header = headerRef.current;
    const sidebar = sidebarRef.current;
    const mainChart = mainChartRef.current;
    const rightPanel = rightPanelRef.current;

    if (!section || !card || !header || !sidebar || !mainChart || !rightPanel) return;

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=150%',
          pin: true,
          scrub: 0.6,
          pinSpacing: true,
          anticipatePin: 1,
        },
      });

      // ENTRANCE (0% - 35%)
      scrollTl.fromTo(
        card,
        { x: '100vw', opacity: 0, scale: 0.95 },
        { x: 0, opacity: 1, scale: 1, ease: 'power2.out' },
        0
      );

      scrollTl.fromTo(
        header,
        { y: -30, opacity: 0 },
        { y: 0, opacity: 1, ease: 'power2.out' },
        0.1
      );

      scrollTl.fromTo(
        sidebar.querySelectorAll('.nav-pill'),
        { x: -30, opacity: 0 },
        { x: 0, opacity: 1, stagger: 0.05, ease: 'power2.out' },
        0.15
      );

      scrollTl.fromTo(
        mainChart,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, ease: 'power2.out' },
        0.2
      );

      scrollTl.fromTo(
        rightPanel.children,
        { x: 40, opacity: 0 },
        { x: 0, opacity: 1, stagger: 0.1, ease: 'power2.out' },
        0.25
      );

      // EXIT (75% - 100%)
      scrollTl.to(
        card,
        { x: '-100vw', opacity: 0, scale: 0.95, ease: 'power2.in' },
        0.75
      );

      scrollTl.to(
        header,
        { y: -30, opacity: 0, ease: 'power2.in' },
        0.8
      );

      scrollTl.to(
        mainChart,
        { y: -40, opacity: 0, ease: 'power2.in' },
        0.82
      );

    }, section);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="dashboard"
      className="relative min-h-screen flex items-center justify-center overflow-hidden z-20"
    >
      <div className="container-custom w-full">
        {/* Dashboard Card */}
        <div
          ref={cardRef}
          className="portfolio-card w-full max-w-7xl mx-auto p-6 md:p-8"
        >
          {/* Header */}
          <div
            ref={headerRef}
            className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-10 pb-6 border-b border-mist/5"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-2xl bg-amber/10 border border-amber/20 shadow-[0_0_20px_rgba(246,199,109,0.15)]">
                <Terminal className="w-8 h-8 text-amber animate-pulse" />
              </div>
              <div>
                <h2 className="font-display text-3xl md:text-4xl font-semibold text-mist tracking-tight">
                  Portfolio <span className="text-amber text-glow-amber underline decoration-amber/30 underline-offset-8">Intelligence</span> Command
                </h2>
                <div className="flex items-center gap-2 mt-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                  <p className="text-xs font-mono text-mist-dark uppercase tracking-widest">
                    Real-time Activity Stream • v4.2.0 • Headless Scraping Active
                  </p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-3 px-6 py-3 rounded-2xl bg-teal-dark/50 border border-amber/20 backdrop-blur-xl shadow-inner">
               <div className="text-right">
                  <div className="text-[10px] text-mist-dark uppercase font-bold tracking-tighter">System Integrity</div>
                  <div className="text-emerald-400 font-mono font-bold">{settings?.systemIntegrity || 99.98}% OPS</div>
               </div>
            </div>
          </div>


          {/* Dashboard Grid */}
          <div className="grid lg:grid-cols-12 gap-6">
            {/* Sidebar */}
            <div ref={sidebarRef} className="lg:col-span-2">
              <div className="flex lg:flex-col gap-2">
                {['Activity View', 'Skills Matrix', 'Project Logs', 'Integrations'].map((item, i) => (
                  <button
                    key={item}
                    className={`nav-pill px-4 py-3 rounded-xl text-left text-sm transition-all font-mono font-medium border ${
                      i === 0
                        ? 'bg-amber/10 text-amber border-amber/20 shadow-[0_0_15px_rgba(246,199,109,0.1)]'
                        : 'text-mist-dark hover:text-mist hover:bg-mist/5 border-transparent'
                    }`}
                  >
                    <span className="opacity-50 mr-2">[{i}]</span>
                    {item}
                  </button>
                ))}
              </div>
            </div>


            {/* Main Chart Area */}
            <div ref={mainChartRef} className="lg:col-span-7">
              {/* Metric Tiles */}
              <div className="grid grid-cols-3 gap-6 mb-8">
                <div className="group p-5 rounded-3xl bg-teal-light/40 border border-mist/10 hover:border-amber/30 transition-all hover:bg-teal-light/60 hover:-translate-y-1">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-2 rounded-lg bg-teal-dark border border-mist/5 group-hover:bg-amber/10 group-hover:border-amber/20 transition-colors">
                      <Activity className="w-5 h-5 text-amber" />
                    </div>
                    <span className="text-[10px] font-bold text-mist-dark uppercase tracking-widest bg-mist/5 px-2 py-0.5 rounded">RCA • 24H</span>
                  </div>
                  <div className="text-3xl font-display font-bold text-mist mb-1">
                    24h
                  </div>
                  <div className="text-xs text-mist-dark flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                    Active Scraping
                  </div>
                </div>
                
                <div className="group p-5 rounded-3xl bg-teal-light/40 border border-mist/10 hover:border-amber/30 transition-all hover:bg-teal-light/60 hover:-translate-y-1">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-2 rounded-lg bg-teal-dark border border-mist/5 group-hover:bg-amber/10 group-hover:border-amber/20 transition-colors">
                      <CheckCircle className="w-5 h-5 text-emerald-400" />
                    </div>
                    <span className="text-[10px] font-bold text-mist-dark uppercase tracking-widest bg-emerald-500/5 px-2 py-0.5 rounded text-emerald-400">SUCCESS</span>
                  </div>
                  <div className="text-3xl font-display font-bold text-mist mb-1">
                    98.8<span className="text-lg opacity-40">%</span>
                  </div>
                  <div className="text-xs text-emerald-400 flex items-center gap-1">
                    <TrendingUp className="w-3.5 h-3.5" />
                    Task Completion
                  </div>
                </div>

                <div className="group p-5 rounded-3xl bg-teal-light/40 border border-mist/10 hover:border-amber/30 transition-all hover:bg-teal-light/60 hover:-translate-y-1">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-2 rounded-lg bg-teal-dark border border-mist/5 group-hover:bg-amber/10 group-hover:border-amber/20 transition-colors">
                      <Database className="w-5 h-5 text-amber" />
                    </div>
                    <span className="text-[10px] font-bold text-mist-dark uppercase tracking-widest bg-mist/5 px-2 py-0.5 rounded">DATA</span>
                  </div>
                  <div className="text-3xl font-display font-bold text-mist mb-1">
                    1.2<span className="text-lg opacity-40">M</span>
                  </div>
                  <div className="text-xs text-emerald-400 flex items-center gap-1">
                    <TrendingUp className="w-3.5 h-3.5" />
                    Nodes Analyzed
                  </div>
                </div>
              </div>


              {/* Main Chart */}
              <div className="h-64 md:h-84 rounded-2xl bg-teal-light/30 border border-mist/10 p-4">
                <div className="flex items-center justify-between mb-4 px-2">
                   <span className="text-xs font-mono text-mist-dark uppercase tracking-tighter">Contribution Frequency</span>
                   <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1.5">
                         <div className="w-2 h-2 rounded-full bg-amber shadow-[0_0_8px_rgba(246,199,109,0.5)]" />
                         <span className="text-[10px] text-mist-dark">Commits</span>
                      </div>
                   </div>
                </div>
                <ResponsiveContainer width="100%" height="85%">
                  <LineChart data={lineData}>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="rgba(243, 247, 248, 0.05)"
                      vertical={false}
                    />
                    <XAxis
                      dataKey="name"
                      stroke="#A9BDC2"
                      fontSize={10}
                      tickLine={false}
                      axisLine={false}
                    />
                    <YAxis
                      stroke="#A9BDC2"
                      fontSize={10}
                      tickLine={false}
                      axisLine={false}
                      domain={[70, 100]}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#082D36',
                        border: '1px solid rgba(243, 247, 248, 0.1)',
                        borderRadius: '12px',
                      }}
                      labelStyle={{ color: '#F3F7F8' }}
                      itemStyle={{ color: '#F6C76D' }}
                    />
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="#F6C76D"
                      strokeWidth={3}
                      dot={{ fill: '#F6C76D', strokeWidth: 0, r: 4 }}
                      activeDot={{ r: 6, fill: '#F6C76D' }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Right Panel - Activity Feeds */}
            <div ref={rightPanelRef} className="lg:col-span-3 space-y-6">
              {/* GitHub Insights */}
              <div className="p-5 rounded-3xl bg-teal-light/40 border border-mist/10 hover:border-amber/20 transition-all group">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Github className="w-5 h-5 text-mist" />
                    <h4 className="text-sm font-semibold text-mist uppercase tracking-wider">GitHub Insights</h4>
                  </div>
                  <a href="https://github.com/TanveerBakshii" target="_blank" rel="noreferrer">
                    <ExternalLink className="w-4 h-4 text-mist-dark hover:text-amber transition-colors" />
                  </a>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-mist-dark">Contribution Streak</span>
                    <span className="text-xs font-mono text-amber">42 Days</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-mist-dark">Active Repos</span>
                    <span className="text-xs font-mono text-mist">12</span>
                  </div>
                  <div className="pt-2 border-t border-mist/5">
                    <div className="text-[10px] text-mist-dark uppercase mb-2 font-bold tracking-widest">Recent Activity</div>
                    <div className="space-y-2">
                       <div className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-amber mt-1" />
                          <p className="text-[11px] text-mist leading-tight">Merged PR #45: Refactored EMR data scrapper</p>
                       </div>
                       <div className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-mist-dark mt-1" />
                          <p className="text-[11px] text-mist leading-tight">Pushed 4 commits to Portfolio-OS</p>
                       </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* LinkedIn Feed */}
              <div className="p-5 rounded-3xl bg-teal-light/40 border border-mist/10 hover:border-amber/20 transition-all group">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Linkedin className="w-5 h-5 text-[#0077b5]" />
                    <h4 className="text-sm font-semibold text-mist uppercase tracking-wider">LinkedIn Feed</h4>
                  </div>
                  <a href="https://linkedin.com/in/tanveerbakshii" target="_blank" rel="noreferrer">
                    <ExternalLink className="w-4 h-4 text-mist-dark hover:text-amber transition-colors" />
                  </a>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-mist-dark">Profile Views</span>
                    <span className="text-xs font-mono text-emerald-400">+24%</span>
                  </div>
                  <div className="p-3 rounded-xl bg-teal-dark/50 border border-mist/5">
                    <div className="flex items-center gap-2 mb-2">
                       <div className="w-6 h-6 rounded-full bg-mist/10" />
                       <span className="text-[10px] text-mist-dark font-mono">Posted 2 days ago</span>
                    </div>
                    <p className="text-[11px] text-mist line-clamp-2 italic">
                      "Excited to share my latest research on how Headless Scraping is revolutionizing healthcare data interoperability..."
                    </p>
                  </div>
                  <div className="flex items-center gap-3 text-mist-dark text-[10px]">
                     <span>128 Reactions</span>
                     <span>•</span>
                     <span>34 Comments</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}