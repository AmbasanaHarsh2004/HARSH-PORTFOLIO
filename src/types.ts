export interface ProfileData {
  name: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  github: string;
  summary: string;
}

export interface EducationItem {
  degree: string;
  year: string;
  institution: string;
  score: string;
}

export interface SkillGroup {
  category: string;
  skills: string[];
}

export interface WorkExperienceItem {
  role: string;
  company: string;
  location: string;
  period: string;
  bullets: string[];
}

export interface FreelanceProjectItem {
  title: string;
  client: string;
  location: string;
  year: string;
  bullets: string[];
  repo?: string;
}

export interface ResumeData {
  profile: ProfileData;
  education: EducationItem[];
  skills: SkillGroup[];
  experience: WorkExperienceItem[];
  freelance: FreelanceProjectItem[];
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
}
