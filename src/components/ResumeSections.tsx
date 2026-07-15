import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Briefcase, 
  GraduationCap, 
  Code2, 
  Database, 
  Smartphone, 
  Cpu, 
  Github, 
  Mail, 
  Phone, 
  MapPin, 
  ArrowUpRight, 
  ExternalLink,
  ChevronRight,
  Maximize2,
  X
} from 'lucide-react';
import { resumeData } from '../data';
import { WorkExperienceItem, FreelanceProjectItem } from '../types';

interface ResumeSectionsProps {
  onSectionVisible: (sectionId: string) => void;
}

export default function ResumeSections({ onSectionVisible }: ResumeSectionsProps) {
  const [selectedProject, setSelectedProject] = useState<FreelanceProjectItem | null>(null);
  const [activeTab, setActiveTab] = useState<'all' | 'experience' | 'freelance' | 'skills' | 'education'>('all');

  // Helper to trigger active section change in ThreeJS camera zoom
  const handleSectionFocus = (sectionId: string) => {
    onSectionVisible(sectionId);
  };

  const filteredExperience = resumeData.experience;
  const filteredFreelance = resumeData.freelance;
  const filteredSkills = resumeData.skills;

  return (
    <div className="space-y-16 py-8 px-4 sm:px-6 max-w-5xl mx-auto z-10 relative">
      {/* 1. HERO PROFILE SECTION */}
      <section 
        id="profile"
        className="pt-12 pb-6 scroll-mt-24"
        onMouseEnter={() => handleSectionFocus('profile')}
      >
        <div className="glass-panel rounded-3xl p-6 sm:p-8 md:p-10 relative overflow-hidden shadow-2xl transition-all duration-300 hover:border-cyan-500/20">
          <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col md:flex-row gap-6 md:gap-10 items-start md:items-center relative z-10">
            {/* Elegant Letter-based Logo Core */}
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-gradient-to-br from-cyan-500 to-sky-600 flex items-center justify-center shadow-xl shadow-cyan-500/20 shrink-0 select-none">
              <span className="text-4xl sm:text-5xl font-extrabold text-white tracking-tighter">HA</span>
            </div>

            <div className="space-y-4 flex-1">
              <div className="space-y-1">
                <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest font-semibold">Available for Opportunities</span>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white bg-clip-text">
                  {resumeData.profile.name}
                </h1>
                <p className="text-lg sm:text-xl font-medium text-slate-300 font-sans">
                  {resumeData.profile.title}
                </p>
              </div>

              {/* Direct Contacts Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm font-mono text-slate-400">
                <a 
                  href={`mailto:${resumeData.profile.email}`} 
                  className="flex items-center gap-2.5 hover:text-cyan-400 transition-colors w-fit"
                >
                  <Mail className="w-4 h-4 text-cyan-500" />
                  <span>{resumeData.profile.email}</span>
                </a>
                <a 
                  href={`tel:${resumeData.profile.phone}`} 
                  className="flex items-center gap-2.5 hover:text-cyan-400 transition-colors w-fit"
                >
                  <Phone className="w-4 h-4 text-cyan-500" />
                  <span>{resumeData.profile.phone}</span>
                </a>
                <div className="flex items-center gap-2.5 w-fit">
                  <MapPin className="w-4 h-4 text-cyan-500" />
                  <span>{resumeData.profile.location}</span>
                </div>
                <a 
                  href={`https://${resumeData.profile.github}`} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center gap-2.5 hover:text-cyan-400 transition-colors w-fit"
                >
                  <Github className="w-4 h-4 text-cyan-500" />
                  <span>github.com/AmbasanaHarsh2004</span>
                </a>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-slate-800">
            <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3">Professional Summary</h3>
            <p className="text-slate-300 leading-relaxed text-sm sm:text-base font-sans">
              {resumeData.profile.summary}
            </p>
          </div>
        </div>
      </section>

      {/* FILTER TABS */}
      <div className="flex flex-wrap gap-2 justify-center border-b border-slate-800 pb-4 sticky top-16 bg-gray-950/80 backdrop-blur-md z-40 py-2 rounded-lg px-2">
        {(['all', 'skills', 'experience', 'freelance', 'education'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-1.5 rounded-full text-xs font-mono capitalize transition-all duration-300 ${
              activeTab === tab 
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm shadow-cyan-500/10'
                : 'text-slate-400 hover:text-white border border-transparent'
            }`}
          >
            {tab === 'all' ? 'All Sections' : tab}
          </button>
        ))}
      </div>

      {/* 2. TECHNICAL SKILLS SECTION */}
      <AnimatePresence mode="popLayout">
        {(activeTab === 'all' || activeTab === 'skills') && (
          <motion.section 
            key="skills"
            id="skills" 
            className="scroll-mt-28"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            onMouseEnter={() => handleSectionFocus('skills')}
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2.5 bg-cyan-500/10 rounded-xl border border-cyan-500/20">
                <Code2 className="w-5 h-5 text-cyan-400" />
              </div>
              <div>
                <h2 className="text-2xl font-bold tracking-tight text-white">Technical Toolkit</h2>
                <p className="text-xs text-slate-400 font-mono mt-0.5">Categorized architecture & language stack</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredSkills.map((group, idx) => {
                const getIcon = (category: string) => {
                  if (category.includes('Web')) return <Cpu className="w-4 h-4 text-cyan-400" />;
                  if (category.includes('Database')) return <Database className="w-4 h-4 text-emerald-400" />;
                  if (category.includes('Mobile')) return <Smartphone className="w-4 h-4 text-rose-400" />;
                  return <Briefcase className="w-4 h-4 text-purple-400" />;
                };

                return (
                  <div 
                    key={idx}
                    className="glass-panel rounded-2xl p-6 transition-all duration-300 hover:border-cyan-500/25 group shadow-lg"
                  >
                    <div className="flex items-center gap-2.5 mb-4 border-b border-slate-800 pb-3">
                      {getIcon(group.category)}
                      <h3 className="font-semibold text-slate-200 text-sm sm:text-base tracking-tight">{group.category}</h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {group.skills.map((skill, sIdx) => (
                        <span 
                          key={sIdx}
                          className="px-3 py-1 bg-slate-900/60 border border-slate-800 rounded-lg text-xs font-mono text-slate-300 transition-colors hover:border-cyan-500/30 hover:text-white"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.section>
        )}

        {/* 3. EXPERIENCE SECTION */}
        {(activeTab === 'all' || activeTab === 'experience') && (
          <motion.section 
            key="experience"
            id="experience" 
            className="scroll-mt-28"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            onMouseEnter={() => handleSectionFocus('experience')}
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2.5 bg-cyan-500/10 rounded-xl border border-cyan-500/20">
                <Briefcase className="w-5 h-5 text-cyan-400" />
              </div>
              <div>
                <h2 className="text-2xl font-bold tracking-tight text-white">Professional Experience</h2>
                <p className="text-xs text-slate-400 font-mono mt-0.5">Corporate & startup milestones</p>
              </div>
            </div>

            <div className="space-y-6 relative border-l border-slate-800 ml-4 pl-6 sm:pl-8">
              {filteredExperience.map((job, idx) => (
                <div 
                  key={idx} 
                  className="relative group pb-2"
                >
                  {/* Timeline Dot */}
                  <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full bg-slate-950 border-2 border-cyan-500 glow-pulse group-hover:bg-cyan-400 transition-colors" />

                  <div className="glass-panel rounded-2xl p-5 sm:p-6 transition-all duration-300 hover:border-cyan-500/20 hover:shadow-xl shadow-lg">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 border-b border-slate-800 pb-3">
                      <div>
                        <h3 className="font-bold text-slate-100 text-base sm:text-lg tracking-tight group-hover:text-cyan-300 transition-colors">
                          {job.role}
                        </h3>
                        <p className="text-sm text-slate-400 font-sans flex items-center gap-1.5">
                          <span className="font-semibold text-slate-300">{job.company}</span>
                          <span>•</span>
                          <span>{job.location}</span>
                        </p>
                      </div>
                      <span className="px-3 py-1 bg-slate-900/80 border border-slate-800 rounded-full text-xs font-mono text-cyan-400 self-start sm:self-center">
                        {job.period}
                      </span>
                    </div>

                    <ul className="space-y-2.5 text-slate-300 text-xs sm:text-sm leading-relaxed">
                      {job.bullets.map((bullet, bIdx) => (
                        <li key={bIdx} className="flex gap-2">
                          <span className="text-cyan-500 select-none font-mono mt-0.5">▹</span>
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </motion.section>
        )}

        {/* 4. FREELANCE & PC APPLICATIONS SHOWCASE */}
        {(activeTab === 'all' || activeTab === 'freelance') && (
          <motion.section 
            key="freelance"
            id="freelance" 
            className="scroll-mt-28"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            onMouseEnter={() => handleSectionFocus('freelance')}
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2.5 bg-cyan-500/10 rounded-xl border border-cyan-500/20">
                <Cpu className="w-5 h-5 text-cyan-400" />
              </div>
              <div>
                <h2 className="text-2xl font-bold tracking-tight text-white">Freelance & PC Software Systems</h2>
                <p className="text-xs text-slate-400 font-mono mt-0.5">Production desktop software built for real businesses</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {filteredFreelance.map((proj, idx) => (
                <div 
                  key={idx}
                  className="glass-panel rounded-2xl p-5 sm:p-6 transition-all duration-300 hover:border-cyan-500/30 group flex flex-col justify-between shadow-lg hover:shadow-cyan-500/5 relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Maximize2 className="w-4 h-4 text-cyan-400 cursor-pointer" onClick={() => setSelectedProject(proj)} />
                  </div>

                  <div className="space-y-3">
                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider bg-cyan-950/55 px-2 py-0.5 rounded border border-cyan-500/20">
                          {proj.year}
                        </span>
                        <span className="text-xs font-mono text-slate-500">{proj.location}</span>
                      </div>
                      <h3 className="font-bold text-slate-150 text-base group-hover:text-cyan-300 transition-colors leading-tight">
                        {proj.title}
                      </h3>
                      <p className="text-xs text-slate-400 font-sans">
                        Client/Target: <span className="text-slate-300 font-medium">{proj.client}</span>
                      </p>
                    </div>

                    <p className="text-slate-300 text-xs line-clamp-3 leading-relaxed">
                      {proj.bullets[0]}
                    </p>
                  </div>

                  <div className="mt-5 pt-4 border-t border-slate-900 flex items-center justify-between">
                    <button 
                      onClick={() => setSelectedProject(proj)}
                      className="text-xs font-mono text-cyan-400 hover:text-cyan-300 flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <span>Explore Project Specs</span>
                      <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </button>

                    {proj.repo && (
                      <a 
                        href={`https://${proj.repo}`}
                        target="_blank"
                        rel="noreferrer"
                        className="text-slate-400 hover:text-white p-1 transition-colors"
                        title="View GitHub Repository"
                      >
                        <Github className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </motion.section>
        )}

        {/* 5. EDUCATION SECTION */}
        {(activeTab === 'all' || activeTab === 'education') && (
          <motion.section 
            key="education"
            id="education" 
            className="scroll-mt-28"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            onMouseEnter={() => handleSectionFocus('education')}
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2.5 bg-cyan-500/10 rounded-xl border border-cyan-500/20">
                <GraduationCap className="w-5 h-5 text-cyan-400" />
              </div>
              <div>
                <h2 className="text-2xl font-bold tracking-tight text-white">Education</h2>
                <p className="text-xs text-slate-400 font-mono mt-0.5">Academic background</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {resumeData.education.map((edu, idx) => (
                <div 
                  key={idx}
                  className="glass-panel rounded-2xl p-5 transition-all duration-300 hover:border-cyan-500/20 shadow-md flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <span className="text-xs font-mono text-cyan-400 bg-cyan-950/40 px-2 py-0.5 rounded border border-cyan-500/10">
                      {edu.year}
                    </span>
                    <h3 className="font-bold text-slate-100 text-sm sm:text-base tracking-tight leading-tight">
                      {edu.degree}
                    </h3>
                    <p className="text-xs text-slate-400 font-sans">
                      {edu.institution}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-900 flex justify-between items-center text-xs font-mono">
                    <span className="text-slate-500">Result</span>
                    <span className="text-cyan-300 font-bold">{edu.score}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* DETAIL MODAL FOR FREELANCE PROJECTS */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div 
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
            />

            {/* Modal Body */}
            <motion.div 
              className="glass-panel-accent w-full max-w-2xl rounded-3xl p-6 sm:p-8 relative z-10 shadow-2xl overflow-y-auto max-h-[90vh]"
              initial={{ scale: 0.95, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 10 }}
              transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            >
              <button 
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-900 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="flex flex-wrap gap-2 items-center">
                    <span className="text-xs font-mono text-cyan-400 bg-cyan-950/60 px-2.5 py-0.5 rounded border border-cyan-500/25">
                      {selectedProject.year}
                    </span>
                    <span className="text-xs font-mono text-slate-500">{selectedProject.location}</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                    {selectedProject.title}
                  </h3>
                  <div className="text-sm font-sans text-slate-350">
                    Client: <span className="font-semibold text-slate-200">{selectedProject.client}</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400">Project Highlights & Contributions</h4>
                  <ul className="space-y-3 text-slate-300 text-sm sm:text-base leading-relaxed">
                    {selectedProject.bullets.map((bullet, idx) => (
                      <li key={idx} className="flex gap-2.5">
                        <span className="text-cyan-400 select-none mt-1 font-mono text-xs">◆</span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Additional Spec Highlight */}
                <div className="p-4 rounded-2xl bg-cyan-950/10 border border-cyan-500/10 flex flex-col gap-2">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-400 font-semibold">Core Stack Spotlight</span>
                  <p className="text-xs text-slate-300 leading-normal">
                    Designed to function fully offline under an "Offline-First" desktop framework, leveraging low-latency SQLite caches, Electron runtime sandboxing, and high-performance React frontends to eliminate network bottlenecks.
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-900 flex justify-between items-center flex-wrap gap-3">
                  {selectedProject.repo ? (
                    <a 
                      href={`https://${selectedProject.repo}`}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-slate-200 hover:text-white rounded-xl text-xs font-mono border border-slate-800 transition-colors"
                    >
                      <Github className="w-4 h-4" />
                      <span>Explore Repository</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </a>
                  ) : (
                    <span className="text-xs font-mono text-slate-500 italic">Enterprise proprietary codebase</span>
                  )}

                  <button 
                    onClick={() => setSelectedProject(null)}
                    className="px-4 py-2 bg-cyan-500 hover:bg-cyan-600 text-slate-950 font-bold rounded-xl text-xs font-sans transition-colors cursor-pointer"
                  >
                    Close Specs
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
