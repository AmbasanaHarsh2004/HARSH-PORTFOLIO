import { useState, useRef, useEffect, FormEvent } from 'react';
import { 
  Github, 
  Mail, 
  Phone, 
  MapPin, 
  Briefcase, 
  GraduationCap, 
  Cpu, 
  Send, 
  Sparkles, 
  Terminal, 
  ExternalLink, 
  Code, 
  FileText, 
  Download, 
  MessageSquare,
  Activity,
  Layers,
  ChevronRight,
  Database,
  User,
  Workflow
} from 'lucide-react';
import { resumeData } from './data';
import { ChatMessage } from './types';
import ThreeCanvas from './components/ThreeCanvas';

export default function App() {
  const [activeTab, setActiveTab] = useState<'profile' | 'experience' | 'freelance' | 'skills'>('profile');
  const [threeMode, setThreeMode] = useState<'network' | 'orbits' | 'helix'>('network');
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'ai',
      text: "Hello! I am Harsh's personal AI Assistant. Ask me anything about his expertise, Electron desktop apps, full-stack achievements, or schedule an interview!",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [isChatLoading, setIsChatLoading] = useState(false);
  const [chatOpen, setChatOpen] = useState(true);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom on new chat messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  const handleSendMessage = async (e: FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userMsg: ChatMessage = {
      id: Math.random().toString(),
      sender: 'user',
      text: chatInput,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChatMessages(prev => [...prev, userMsg]);
    const prompt = chatInput;
    setChatInput('');
    setIsChatLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: prompt,
          history: chatMessages
        })
      });

      const data = await response.json();
      const aiReply: ChatMessage = {
        id: Math.random().toString(),
        sender: 'ai',
        text: data.response || "I couldn't process that, please try again.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setChatMessages(prev => [...prev, aiReply]);
    } catch (err) {
      console.error(err);
      const errorMsg: ChatMessage = {
        id: Math.random().toString(),
        sender: 'ai',
        text: "I'm having a bit of trouble connecting to my brain server. Harsh is a fantastic Software Engineer anyway! Try checking your Secrets for GEMINI_API_KEY.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setChatMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsChatLoading(false);
    }
  };

  // Quick Chat questions
  const quickQuestions = [
    "What is Harsh's Electron experience?",
    "Show me projects built with the MERN stack.",
    "Summarize freelance work.",
    "How can I contact him?"
  ];

  const handleQuickQuestion = (question: string) => {
    setChatInput(question);
  };

  // Prints the portfolio styled for clean paper resumes
  const handlePrintResume = () => {
    window.print();
  };

  return (
    <div className="relative min-h-full overflow-x-hidden bg-[#050507] grid-overlay flex flex-col">
      {/* 3D background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <ThreeCanvas mode={threeMode} />
        {/* Soft background glow */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-900/10 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-cyan-950/20 rounded-full blur-[150px] pointer-events-none"></div>
      </div>

      {/* Main Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex-1 flex flex-col justify-between">
        {/* Header */}
        <header className="flex justify-between items-center mb-8 border-b border-white/5 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 glass flex items-center justify-center font-bold text-lg text-cyan tracking-wider rounded-lg border-cyan/20">
              HA
            </div>
            <div>
              <p className="text-sm font-bold tracking-widest uppercase text-white">Harsh Ambasana</p>
              <p className="text-[10px] text-[#00F5FF] uppercase tracking-wider font-semibold">Software Engineer & Architect</p>
            </div>
          </div>

          {/* Three.js Mode Controller */}
          <div className="flex items-center gap-1.5 glass bg-black/40 px-2 py-1.5 rounded-full border-white/5 text-xs">
            <span className="text-[10px] uppercase text-dim px-2 hidden md:inline">3D Grid:</span>
            <button 
              onClick={() => setThreeMode('network')}
              className={`px-3 py-1 rounded-full transition-all text-[11px] ${threeMode === 'network' ? 'bg-[#00F5FF]/10 text-[#00F5FF] font-medium border border-[#00F5FF]/20' : 'text-dim hover:text-white'}`}
            >
              Constellation
            </button>
            <button 
              onClick={() => setThreeMode('orbits')}
              className={`px-3 py-1 rounded-full transition-all text-[11px] ${threeMode === 'orbits' ? 'bg-[#BF00FF]/10 text-[#BF00FF] font-medium border border-[#BF00FF]/20' : 'text-dim hover:text-white'}`}
            >
              Orbits
            </button>
            <button 
              onClick={() => setThreeMode('helix')}
              className={`px-3 py-1 rounded-full transition-all text-[11px] ${threeMode === 'helix' ? 'bg-cyan-500/10 text-cyan font-medium border border-cyan-500/20' : 'text-dim hover:text-white'}`}
            >
              Helix
            </button>
          </div>
        </header>

        {/* Hero & Tab Section */}
        <main className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-8 flex-1">
          {/* Left Column: Hero Intro, Contact & AI Assistant */}
          <section className="lg:col-span-5 flex flex-col gap-6 h-full justify-start">
            <div className="space-y-4">
              <span className="text-[10px] uppercase tracking-[0.3em] text-[#00F5FF] font-bold">DIGITAL PORTFOLIO & RESUME</span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light tracking-tighter leading-none text-white">
                Scalable<br/>
                <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-[#00F5FF] to-[#BF00FF]">
                  Architectures
                </span>
              </h1>
              <p className="text-dim text-sm leading-relaxed max-w-md">
                Blending robust systems engineering with interactive interfaces. Specializing in offline-first desktop platforms (Electron), enterprise AI cloud products, and responsive SaaS stacks.
              </p>
            </div>

            {/* Quick Contacts */}
            <div className="glass p-5 rounded-2xl glow-cyan space-y-3.5 bg-black/40">
              <div className="flex justify-between items-center pb-2 border-b border-white/5">
                <span className="text-[10px] uppercase tracking-widest text-dim font-bold">Let's Connect</span>
                <span className="w-2 h-2 rounded-full bg-[#00F5FF] pulse-indicator"></span>
              </div>
              
              <div className="grid grid-cols-1 gap-2.5 text-xs">
                <a href={`mailto:${resumeData.profile.email}`} className="flex items-center gap-3 text-dim hover:text-white transition-colors group">
                  <div className="w-7 h-7 rounded-lg glass flex items-center justify-center group-hover:border-[#00F5FF]/30">
                    <Mail size={13} className="text-[#00F5FF]" />
                  </div>
                  <span>{resumeData.profile.email}</span>
                </a>
                <a href="tel:+918460602560" className="flex items-center gap-3 text-dim hover:text-white transition-colors group">
                  <div className="w-7 h-7 rounded-lg glass flex items-center justify-center group-hover:border-purple-500/30">
                    <Phone size={13} className="text-[#BF00FF]" />
                  </div>
                  <span>{resumeData.profile.phone}</span>
                </a>
                <div className="flex items-center gap-3 text-dim">
                  <div className="w-7 h-7 rounded-lg glass flex items-center justify-center">
                    <MapPin size={13} className="text-[#00F5FF]" />
                  </div>
                  <span>{resumeData.profile.location}</span>
                </div>
                <a href={`https://${resumeData.profile.github}`} target="_blank" rel="noreferrer" className="flex items-center gap-3 text-dim hover:text-white transition-colors group">
                  <div className="w-7 h-7 rounded-lg glass flex items-center justify-center group-hover:border-purple-500/30">
                    <Github size={13} className="text-[#BF00FF]" />
                  </div>
                  <span className="flex items-center gap-1.5">
                    GitHub Profile <ExternalLink size={10} className="opacity-50" />
                  </span>
                </a>
              </div>

              <div className="flex gap-2.5 pt-2">
                <button 
                  onClick={handlePrintResume}
                  className="flex-1 py-2.5 glass rounded-xl border-white/10 text-[10px] uppercase tracking-widest font-bold hover:bg-white/5 transition-all text-white flex items-center justify-center gap-2"
                >
                  <Download size={12} className="text-[#00F5FF]" /> Print / PDF Resume
                </button>
              </div>
            </div>

            {/* Interactive AI Chatbot Widget */}
            <div className={`glass rounded-2xl border-purple-500/10 glow-purple bg-black/60 flex flex-col transition-all ${chatOpen ? 'h-[360px]' : 'h-14'}`}>
              <div 
                className="flex justify-between items-center p-3.5 border-b border-white/5 cursor-pointer"
                onClick={() => setChatOpen(!chatOpen)}
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-[#BF00FF] to-[#00F5FF] flex items-center justify-center">
                    <Sparkles size={12} className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-[11px] uppercase tracking-widest font-bold text-white">Ask Harsh's Resume AI</h3>
                    <p className="text-[9px] text-[#00F5FF] tracking-tighter">Powered by Gemini 3.5 Flash</p>
                  </div>
                </div>
                <button className="text-xs text-dim hover:text-white uppercase tracking-wider text-[10px] font-semibold">
                  {chatOpen ? '[ Hide ]' : '[ Open ]'}
                </button>
              </div>

              {chatOpen && (
                <>
                  {/* Messages list */}
                  <div className="flex-1 overflow-y-auto p-3.5 space-y-3 text-xs">
                    {chatMessages.map((msg) => (
                      <div 
                        key={msg.id} 
                        className={`flex flex-col max-w-[85%] ${msg.sender === 'user' ? 'ml-auto items-end' : 'mr-auto items-start'}`}
                      >
                        <div className={`p-2.5 rounded-xl ${msg.sender === 'user' ? 'bg-[#00F5FF]/10 text-white border border-[#00F5FF]/20 rounded-tr-none' : 'bg-white/5 text-dim border border-white/5 rounded-tl-none'}`}>
                          <p className="leading-relaxed whitespace-pre-line">{msg.text}</p>
                        </div>
                        <span className="text-[8px] text-dim/60 mt-1 uppercase tracking-widest">{msg.timestamp}</span>
                      </div>
                    ))}
                    {isChatLoading && (
                      <div className="flex items-center gap-2 text-dim bg-white/5 border border-white/5 p-2.5 rounded-xl max-w-[60%] rounded-tl-none">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#00F5FF] animate-ping"></span>
                        <span className="text-[10px] tracking-widest uppercase">Analyzing...</span>
                      </div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>

                  {/* Suggestion tags */}
                  <div className="px-3.5 py-1.5 flex gap-1.5 overflow-x-auto border-t border-white/5 bg-black/20 scrollbar-none">
                    {quickQuestions.map((q, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleQuickQuestion(q)}
                        className="whitespace-nowrap px-2.5 py-1 rounded-full glass border-white/5 hover:border-[#00F5FF]/20 text-[9px] text-dim hover:text-white transition-all"
                      >
                        {q}
                      </button>
                    ))}
                  </div>

                  {/* Form input */}
                  <form onSubmit={handleSendMessage} className="p-2 border-t border-white/5 flex gap-2 bg-black/40">
                    <input 
                      type="text"
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      placeholder="Ask me: 'Where did he intern?' or 'His tech stack'"
                      className="flex-1 bg-white/5 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-[#00F5FF]/30 border border-white/5 text-white"
                    />
                    <button 
                      type="submit"
                      disabled={isChatLoading || !chatInput.trim()}
                      className="w-9 h-9 rounded-xl bg-[#00F5FF] text-black hover:bg-[#00F5FF]/80 flex items-center justify-center disabled:opacity-50 transition-all cursor-pointer"
                    >
                      <Send size={13} />
                    </button>
                  </form>
                </>
              )}
            </div>
          </section>

          {/* Right Column: Interactive Tabs Navigation & Content */}
          <section className="lg:col-span-7 flex flex-col gap-6">
            {/* Tab Switches */}
            <div className="flex border-b border-white/5 p-1 glass-card rounded-2xl bg-black/40 gap-1 overflow-x-auto">
              <button 
                onClick={() => setActiveTab('profile')}
                className={`flex-1 min-w-[90px] py-3 rounded-xl text-xs uppercase tracking-widest font-semibold transition-all flex items-center justify-center gap-2 ${activeTab === 'profile' ? 'bg-white/5 text-[#00F5FF] border border-white/10' : 'text-dim hover:text-white'}`}
              >
                <User size={13} /> Profile
              </button>
              <button 
                onClick={() => setActiveTab('skills')}
                className={`flex-1 min-w-[90px] py-3 rounded-xl text-xs uppercase tracking-widest font-semibold transition-all flex items-center justify-center gap-2 ${activeTab === 'skills' ? 'bg-white/5 text-[#BF00FF] border border-white/10' : 'text-dim hover:text-white'}`}
              >
                <Code size={13} /> Skills
              </button>
              <button 
                onClick={() => setActiveTab('experience')}
                className={`flex-1 min-w-[90px] py-3 rounded-xl text-xs uppercase tracking-widest font-semibold transition-all flex items-center justify-center gap-2 ${activeTab === 'experience' ? 'bg-white/5 text-[#00F5FF] border border-white/10' : 'text-dim hover:text-white'}`}
              >
                <Briefcase size={13} /> Experience
              </button>
              <button 
                onClick={() => setActiveTab('freelance')}
                className={`flex-1 min-w-[90px] py-3 rounded-xl text-xs uppercase tracking-widest font-semibold transition-all flex items-center justify-center gap-2 ${activeTab === 'freelance' ? 'bg-white/5 text-[#BF00FF] border border-white/10' : 'text-dim hover:text-white'}`}
              >
                <Workflow size={13} /> Freelance
              </button>
            </div>

            {/* TAB CONTENT */}
            <div className="glass-card p-6 sm:p-8 rounded-3xl glow-purple border-white/5 bg-black/40 min-h-[460px] flex flex-col justify-between">
              
              {/* Profile/About Tab */}
              {activeTab === 'profile' && (
                <div className="space-y-6 animate-fade-in">
                  <div className="space-y-2">
                    <h2 className="text-xs uppercase tracking-[0.2em] text-[#00F5FF]">Professional Summary</h2>
                    <p className="text-sm text-dim leading-relaxed font-light">
                      {resumeData.profile.summary}
                    </p>
                  </div>

                  {/* Education Grid */}
                  <div className="space-y-4 pt-4 border-t border-white/5">
                    <h2 className="text-xs uppercase tracking-[0.2em] text-[#BF00FF] flex items-center gap-2">
                      <GraduationCap size={15} /> Academic Background
                    </h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {resumeData.education.map((edu, idx) => (
                        <div key={idx} className="glass p-4 rounded-xl border-white/5 space-y-2 hover:border-purple-500/20 transition-all">
                          <p className="text-[10px] text-dim uppercase tracking-wider">{edu.year}</p>
                          <h4 className="text-sm font-bold text-white line-clamp-1">{edu.degree}</h4>
                          <p className="text-xs text-dim line-clamp-1">{edu.institution}</p>
                          <div className="pt-1.5 flex justify-between items-center">
                            <span className="text-[9px] uppercase tracking-widest text-[#00F5FF] font-semibold">Grade</span>
                            <span className="text-xs font-mono font-bold text-white px-2 py-0.5 rounded bg-white/5 border border-white/5">{edu.score}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Extra Profile Strengths */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-white/5">
                    <div className="glass p-4 rounded-xl border-white/5 space-y-1">
                      <h4 className="text-xs font-bold text-white">Full-Stack Core Proficiency</h4>
                      <p className="text-[11px] text-dim">Designing scalable REST APIs using Node/Express, seamlessly binding client Dashboards & real-time controls.</p>
                    </div>
                    <div className="glass p-4 rounded-xl border-white/5 space-y-1">
                      <h4 className="text-xs font-bold text-white">Offline-First Architectures</h4>
                      <p className="text-[11px] text-dim">Engineered desktop ecosystems incorporating Electron and SQLite to function autonomously without network access.</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Skills Tab */}
              {activeTab === 'skills' && (
                <div className="space-y-6 animate-fade-in">
                  <div className="space-y-2">
                    <h2 className="text-xs uppercase tracking-[0.2em] text-[#BF00FF]">Technical Proficiency</h2>
                    <p className="text-xs text-dim">Harsh possesses multi-tier engineering competence spanning client interfaces, native desktop modules, and secure database optimization.</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {resumeData.skills.map((group, idx) => (
                      <div key={idx} className="glass p-5 rounded-2xl border-white/5 space-y-3.5 hover:border-[#00F5FF]/10 transition-all">
                        <div className="flex justify-between items-center border-b border-white/5 pb-2">
                          <h3 className="text-xs uppercase tracking-widest font-bold text-[#00F5FF] flex items-center gap-2">
                            <Cpu size={12} className="text-[#00F5FF]" />
                            {group.category}
                          </h3>
                        </div>

                        <div className="flex flex-wrap gap-2">
                          {group.skills.map((skill, sIdx) => (
                            <span 
                              key={sIdx} 
                              className="text-[10px] font-mono px-2.5 py-1 rounded bg-white/5 border border-white/5 text-dim hover:text-white hover:border-[#00F5FF]/30 hover:bg-[#00F5FF]/5 transition-all"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>

                        {/* Visual proficiency bar */}
                        <div className="space-y-1 pt-1">
                          <div className="flex justify-between text-[9px] uppercase tracking-wider text-dim">
                            <span>Expertise Level</span>
                            <span className="font-bold text-[#BF00FF]">{92 - idx * 8}%</span>
                          </div>
                          <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-gradient-to-r from-[#00F5FF] to-[#BF00FF] rounded-full" 
                              style={{ width: `${92 - idx * 8}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Work Experience Tab */}
              {activeTab === 'experience' && (
                <div className="space-y-6 animate-fade-in">
                  <div className="space-y-1">
                    <h2 className="text-xs uppercase tracking-[0.2em] text-[#00F5FF]">Professional Timeline</h2>
                    <p className="text-xs text-dim">Solid experience leading workflows, designing cloud platforms and managing interns.</p>
                  </div>

                  <div className="space-y-6 relative pl-4 border-l border-white/5 ml-2 pt-2">
                    {resumeData.experience.map((exp, idx) => (
                      <div key={idx} className="relative group space-y-2">
                        {/* Glowing timeline knot */}
                        <div className={`absolute -left-[21px] top-1.5 w-2.5 h-2.5 rounded-full border-2 border-[#050507] group-hover:scale-125 transition-all ${idx === 0 ? 'bg-[#00F5FF] shadow-[0_0_10px_#00F5FF]' : 'bg-white/30'}`} />
                        
                        <div className="flex flex-col md:flex-row md:justify-between md:items-center text-xs">
                          <div>
                            <span className="text-[10px] font-mono text-[#00F5FF] uppercase tracking-widest">{exp.period}</span>
                            <h3 className="text-sm font-extrabold text-white group-hover:text-[#00F5FF] transition-colors">{exp.role}</h3>
                            <p className="text-xs text-dim">{exp.company} • <span className="italic opacity-80">{exp.location}</span></p>
                          </div>
                        </div>

                        <ul className="space-y-1.5 pl-4 list-disc text-dim text-[11px] leading-relaxed">
                          {exp.bullets.map((bullet, bIdx) => (
                            <li key={bIdx}>{bullet}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Freelance Tab */}
              {activeTab === 'freelance' && (
                <div className="space-y-6 animate-fade-in">
                  <div className="space-y-1">
                    <h2 className="text-xs uppercase tracking-[0.2em] text-[#BF00FF]">Custom Desktop & Client Deployments</h2>
                    <p className="text-xs text-dim">Highly functional desktop systems and billing infrastructures for commercial stores and healthcare centers.</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[380px] overflow-y-auto pr-1">
                    {resumeData.freelance.map((proj, idx) => (
                      <div key={idx} className="glass p-5 rounded-2xl border-white/5 space-y-2.5 hover:border-purple-500/20 transition-all flex flex-col justify-between">
                        <div className="space-y-1.5">
                          <div className="flex justify-between items-start text-xs">
                            <span className="text-[9px] font-mono text-[#BF00FF] uppercase tracking-widest font-semibold">{proj.year}</span>
                            <span className="text-[9px] text-dim/80">{proj.location}</span>
                          </div>
                          <h3 className="text-xs font-extrabold text-white uppercase tracking-wider">{proj.title}</h3>
                          <p className="text-[10px] text-dim">Client: <span className="text-white font-medium">{proj.client}</span></p>
                          <ul className="space-y-1 list-disc pl-3 text-[10px] text-dim/90 leading-relaxed">
                            {proj.bullets.slice(0, 2).map((bullet, bIdx) => (
                              <li key={bIdx} className="line-clamp-2">{bullet}</li>
                            ))}
                          </ul>
                        </div>

                        {proj.repo && (
                          <div className="pt-2 mt-2 border-t border-white/5 flex justify-between items-center">
                            <span className="text-[8px] font-mono text-[#00F5FF] uppercase">Open Source</span>
                            <a 
                              href={`https://${proj.repo}`} 
                              target="_blank" 
                              rel="noreferrer" 
                              className="text-[9px] text-dim hover:text-white flex items-center gap-1 hover:underline"
                            >
                              <Github size={11} /> Repository
                            </a>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Footer inside Content Box to complete structural design */}
              <div className="flex justify-between items-center mt-6 pt-4 border-t border-white/5 text-[9px] text-dim uppercase tracking-wider">
                <div className="flex items-center gap-1.5">
                  <Activity size={10} className="text-[#00F5FF] animate-pulse" />
                  <span>Interactive Live Platform</span>
                </div>
                <div>Available for Global Opportunities</div>
              </div>

            </div>
          </section>
        </main>

        {/* Global Footer */}
        <footer className="flex flex-col md:flex-row justify-between items-center border-t border-white/5 pt-4 text-[9px] text-dim uppercase tracking-[0.2em] gap-3">
          <div>Based in Gujarat, India — Delivering high performance globally</div>
          <div className="flex gap-4">
            <a href={`mailto:${resumeData.profile.email}`} className="hover:text-white transition-colors">Email</a>
            <span>•</span>
            <a href={`https://${resumeData.profile.github}`} target="_blank" rel="noreferrer" className="hover:text-white transition-colors">GitHub</a>
            <span>•</span>
            <span className="text-white">Active Internships 2026</span>
          </div>
        </footer>
      </div>
    </div>
  );
}
