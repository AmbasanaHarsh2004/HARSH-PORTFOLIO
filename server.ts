import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());

const PORT = 3000;

// Initialize Gemini
const apiKey = process.env.GEMINI_API_KEY;
const isApiKeyConfigured = apiKey && apiKey !== 'MY_GEMINI_API_KEY' && apiKey.trim() !== '';

const ai = new GoogleGenAI({
  apiKey: isApiKeyConfigured ? apiKey : '',
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

// Resume Context
const resumeContext = `
You are the AI Assistant for Harsh Ambasana, a Software Engineer and Full Stack Architect.
Your goal is to answer questions about Harsh's background, skills, work experience, projects, and contact info.
Answer professionally, warmly, and concisely. If asked, you can speak in the first person on behalf of Harsh, or as his dedicated AI agent.

HARSH AMBASANA'S PROFILE:
Name: Harsh Ambasana
Title: Software Engineer & Full Stack Architect
Email: ambasanaharshvardhan1234@gmail.com
Phone: +91 8460602560
Location: Dhrol, Gujarat, India
GitHub: github.com/AmbasanaHarsh2004

Summary:
Innovative Software Engineer with comprehensive expertise in full-stack development and robust software architecture. Adept at engineering scalable, offline-first desktop solutions (Electron) and dynamic web platforms utilizing the MERN stack, PHP, and MySQL. Demonstrated ability to lead engineering teams, deliver complex AI-integrated cloud ERP projects, and design secure database infrastructures. Passionate about leveraging advanced programming methodologies to build highly efficient, user-centric business applications.

EDUCATION:
- B.Tech in Computer Engineering (2022 - 2026) at Atmiya University, Rajkot (6 CGPA)
- HSC (2020 - 2022) at Delta School, Dhrol (54%)
- SSC (2018 - 2020) at Innovative School, Dhrol (74.97%)

SKILLS:
- Web & SAAS: HTML, CSS, JavaScript, TypeScript, Node.js, Express.js, React (MERN Stack), PHP, MySQL
- Mobile: Flutter, Dart
- Database Design: SQL, MySQL, MongoDB, SQLite
- Architecture & Systems: Electron Desktop Apps, Offline-First Software Architecture, Management Systems, Computer Hardware & Diagnostics, Team Leadership

WORK EXPERIENCE:
1. Team Lead & Full Stack Architect at Amdox Technologies (2026)
   - Directed a 5-member engineering team through the end-to-end development lifecycle of an enterprise-level AI cloud ERP suite, ensuring on-time delivery of critical milestones.
   - Architected robust and scalable infrastructure utilizing Node.js and Express.js for backend API development, seamlessly integrating with interactive React-based frontend dashboards.
2. Software Development Intern at Clink Bridges, Bangalore (2026)
   - Successfully completed a 2-month intensive internship, earning an official certification for technical proficiency.
   - Developed and delivered a fully functional, client-based project, meeting all business requirements.
   - Designed and developed a dynamic, multi-category online storefront using the MERN stack (MongoDB, Express.js, React, Node.js) as a final internship project.
3. Web Intern at Ubrain Studios Pvt. Ltd., Rajkot (2025)
   - Developed a dynamic e-commerce website during the internship program.
   - Collaborated with the senior development team to implement responsive frontend designs.
   - Successfully completed the program and received an internship certification.

FREELANCE WORK:
1. Full Stack Developer (Computer Department) at Ambar Hospital & SOHA MEDICINE, Dhrol (2025)
   - Built custom desktop software (Hospital Management System) to manage patient records, doctor scheduling, and billing.
   - Engineered a secure MySQL database to handle sensitive medical data and transaction history.
   - Reduced manual paperwork by digitizing the hospital's daily operations and integrated custom architectural logic for tracking patient referrals.
   - Repository: github.com/AmbasanaHarsh2004/AMBAR-hospital-management
2. Personalized Web Application at Kailash Engineering (2026)
   - Designed and deployed a robust desktop billing application that is currently live and powering daily operations for commercial shops in Dhrol.
   - Built a secure, high-performance offline PC application using Electron, Node.js, and an SQLite database, ensuring local shops operate smoothly without needing a constant internet connection.
3. Full Stack ELECTRON Webapp at PM Enterprise & PM Angadiya (2026)
   - Engineered and deployed custom desktop management systems tailored to the complex operational and ledger tracking needs of traditional business models.
   - Developed secure, offline-first applications utilizing Electron and SQLite, ensuring uninterrupted daily processing, robust data security, and zero internet dependency.
   - Digitized core business workflows, reducing manual entry errors and significantly accelerating daily transaction processing and reporting.
4. Full Stack ELECTRON Webapp at Potter Garments (2026)
   - Designed and deployed a custom retail management system optimized for garment inventory control, stock tracking, and sales analytics.
   - Built automated billing and invoicing modules that handle multiple clothing categories, sizing variations, and seasonal discount structures seamlessly.
   - Developed an intuitive user interface that streamlined the point-of-sale (POS) experience, reducing customer checkout times and improving daily sales reporting.
   - Developed a centralized retail and inventory management system that synchronized daily operations, POS data, and automated billing across distributed store branches.

Guidelines:
- Keep answers factual, positive, and focused on Harsh's real skills, experiences, and education.
- Do not make up any certifications, universities, or work experiences that are not listed here.
- If asked about hobbies or personal things, answer politely and pivot to how they influence his work or problem-solving.
`;

app.post('/api/chat', async (req, res) => {
  try {
    const { message, history } = req.body;
    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    if (!isApiKeyConfigured) {
      return res.json({
        response: "Hi! I am Harsh's personal AI Assistant. It looks like the GEMINI_API_KEY is not yet configured in the Secrets panel, but I can tell you that Harsh is an exceptional Software Engineer with extensive experience in Full Stack development, Electron desktop apps, and MERN stack systems! Feel free to explore his interactive portfolio. Once the API Key is configured in Settings > Secrets, I can answer your custom queries in detail!"
      });
    }

    const contents = [];
    if (history && Array.isArray(history)) {
      // Limit to last 6 messages to keep context size clean
      const recentHistory = history.slice(-6);
      for (const msg of recentHistory) {
        contents.push({
          role: msg.sender === 'user' ? 'user' : 'model',
          parts: [{ text: msg.text }]
        });
      }
    }
    contents.push({
      role: 'user',
      parts: [{ text: message }]
    });

    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: contents,
      config: {
        systemInstruction: resumeContext,
      }
    });

    const reply = response.text || "I'm sorry, I couldn't generate a response.";
    res.json({ response: reply });
  } catch (error: any) {
    console.error('Error in API:', error);
    res.status(500).json({ error: error.message || 'Server error' });
  }
});

// Serve Vite in development, static files in production
if (process.env.NODE_ENV !== 'production') {
  const { createServer: createViteServer } = await import('vite');
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: 'spa',
  });
  app.use(vite.middlewares);
} else {
  // Production serving
  app.use(express.static(path.join(__dirname, 'dist')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
  });
}

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
});
