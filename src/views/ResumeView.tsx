import { mockProfile, mockExperiences, mockSkills, mockTools, mockEducation } from '@/lib/mockData';
import { Mail, Globe, Linkedin, Github, MapPin, Calendar, Briefcase, GraduationCap, Award } from 'lucide-react';
import { format, parseISO } from 'date-fns';

export function ResumeView() {
  const profile = mockProfile;
  const experiences = mockExperiences;
  const tools = mockTools;
  const education = mockEducation;

  // Group skills by category
  const groupedSkills = mockSkills.reduce((acc, skill) => {
    const cat = skill.category.replace('_', ' ');
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(skill.name);
    return acc;
  }, {} as Record<string, string[]>);

  // Helper to format date range
  const formatPeriod = (start?: string, end?: string, isCurrent?: boolean) => {
    try {
      if (!start) return '';
      const startDate = format(parseISO(start), 'MMM yyyy');
      if (isCurrent) return `${startDate} — Present`;
      if (!end) return startDate;
      return `${startDate} — ${format(parseISO(end), 'MMM yyyy')}`;
    } catch (e) {
      return start || '';
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 p-8 md:p-16 max-w-5xl mx-auto shadow-none print:shadow-none print:p-0">
      {/* Print button - hidden during print */}
      <div className="mb-8 flex justify-end print:hidden">
        <button 
          onClick={() => window.print()}
          className="px-6 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors flex items-center gap-2"
        >
          <Award className="w-4 h-4" />
          Print to PDF
        </button>
      </div>

      {/* Header */}
      <header className="border-b-2 border-slate-900 pb-8 mb-8">
        <h1 className="text-4xl md:text-5xl font-bold uppercase tracking-tight mb-2 text-slate-900">
          {profile.name}
        </h1>
        <h2 className="text-xl md:text-2xl font-medium text-slate-600 mb-6 italic">
          {profile.role}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-3 gap-x-6 text-sm">
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4" />
            <span>{profile.email}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            <span>{profile.location}</span>
          </div>
          {profile.linkedin && (
            <div className="flex items-center gap-2">
              <Linkedin className="w-4 h-4" />
              <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
            </div>
          )}
          {profile.github && (
            <div className="flex items-center gap-2">
              <Github className="w-4 h-4" />
              <a href={profile.github} target="_blank" rel="noopener noreferrer">GitHub</a>
            </div>
          )}
          {profile.website && (
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4" />
              <a href={profile.website} target="_blank" rel="noopener noreferrer">Portfolio</a>
            </div>
          )}
        </div>
      </header>

      <div className="grid md:grid-cols-[2.5fr_1fr] gap-12">
        {/* Main Content */}
        <div className="space-y-10">
          {/* Summary */}
          <section>
            <h3 className="text-lg font-bold uppercase tracking-wider border-b border-slate-300 pb-1 mb-4 flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-slate-700" />
              Professional Summary
            </h3>
            <p className="text-slate-700 leading-relaxed text-sm lg:text-base">
              {profile.bio?.split('\n\n')[0]}
            </p>
          </section>

          {/* Experience */}
          <section>
            <h3 className="text-lg font-bold uppercase tracking-wider border-b border-slate-300 pb-1 mb-6 flex items-center gap-2 text-slate-900">
              <Calendar className="w-5 h-5 text-slate-700" />
              Work Experience
            </h3>
            <div className="space-y-8">
              {experiences.map((exp) => (
                <div key={exp.id} className="relative pl-4 border-l-2 border-slate-100 pb-2">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-2">
                    <h4 className="font-bold text-slate-900 text-lg">{exp.title}</h4>
                    <span className="text-sm font-medium text-slate-500 bg-slate-50 px-2 py-0.5 rounded">
                      {formatPeriod(exp.startDate, exp.endDate, exp.isCurrent)}
                    </span>
                  </div>
                  <div className="text-sm font-semibold text-slate-700 mb-3 uppercase tracking-wide">{exp.company}</div>
                  <div className="text-slate-600 text-sm italic mb-3">{exp.description}</div>
                  <ul className="list-disc list-inside space-y-1.5 text-sm text-slate-700">
                    {exp.impact.slice(0, 4).map((item, i) => (
                      <li key={i} className="leading-relaxed pl-2 -indent-5 ml-5">{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <div className="space-y-10">
          {/* Skills */}
          <section>
            <h3 className="text-lg font-bold uppercase tracking-wider border-b border-slate-300 pb-1 mb-4 flex items-center gap-2 text-slate-900">
              <Award className="w-5 h-5 text-slate-700" />
              Core Expertise
            </h3>
            <div className="space-y-6">
              {Object.entries(groupedSkills).map(([cat, items]) => (
                <div key={cat}>
                  <h4 className="text-xs font-bold text-slate-500 mb-3 uppercase tracking-widest">{cat}</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {items.map((skill, i) => (
                      <span key={i} className="text-[11px] px-2 py-1 bg-slate-50 text-slate-700 rounded border border-slate-200 font-medium">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Tools */}
          <section>
            <h3 className="text-lg font-bold uppercase tracking-wider border-b border-slate-300 pb-1 mb-4 text-slate-900">
              Toolbox
            </h3>
            <div className="flex flex-wrap gap-x-3 gap-y-2">
              {tools.map((tool) => (
                <span key={tool.id} className="text-xs font-medium text-slate-600 border-b border-slate-100 pb-0.5">
                  {tool.name}
                </span>
              ))}
            </div>
          </section>

          {/* Education */}
          <section>
            <h3 className="text-lg font-bold uppercase tracking-wider border-b border-slate-300 pb-1 mb-4 flex items-center gap-2 text-slate-900">
              <GraduationCap className="w-5 h-5 text-slate-700" />
              Education
            </h3>
            <div className="space-y-6">
              {education.map((edu) => (
                <div key={edu.id} className="space-y-1">
                  <h4 className="font-bold text-sm text-slate-900 leading-tight">{edu.degree}</h4>
                  <div className="text-xs text-slate-600 font-medium">{edu.institution}</div>
                  <div className="text-[10px] text-slate-400 font-mono italic">
                    {formatPeriod(edu.startDate, edu.endDate, edu.isCurrent)}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>

      <footer className="mt-16 pt-8 border-t border-slate-200 text-center text-[10px] text-slate-400 uppercase tracking-widest print:mt-12">
        Portfolio OS • Tanveer Bakshi • Authorized Resume
      </footer>
    </div>
  );
}

