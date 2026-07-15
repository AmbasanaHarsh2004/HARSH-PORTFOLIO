import { ResumeData } from './types';

export const resumeData: ResumeData = {
  profile: {
    name: "Harsh Ambasana",
    title: "Software Engineer & Full Stack Architect",
    email: "ambasanaharshvardhan1234@gmail.com",
    phone: "+91 8460602560",
    location: "Dhrol, Gujarat, India",
    github: "github.com/AmbasanaHarsh2004",
    summary: "Innovative Software Engineer with comprehensive expertise in full-stack development and robust software architecture. Adept at engineering scalable, offline-first desktop solutions (Electron) and dynamic web platforms utilizing the MERN stack, PHP, and MySQL. Demonstrated ability to lead engineering teams, deliver complex AI-integrated cloud ERP projects, and design secure database infrastructures. Passionate about leveraging advanced programming methodologies to build highly efficient, user-centric business applications."
  },
  education: [
    {
      degree: "B.Tech in Computer Engineering",
      year: "2022 - 2026",
      institution: "Atmiya University, Rajkot",
      score: "6 CGPA"
    },
    {
      degree: "HSC (Higher Secondary Certificate)",
      year: "2020 - 2022",
      institution: "Delta School, Dhrol",
      score: "54%"
    },
    {
      degree: "SSC (Secondary School Certificate)",
      year: "2018 - 2020",
      institution: "Innovative School, Dhrol",
      score: "74.97%"
    }
  ],
  skills: [
    {
      category: "Web & SAAS Development",
      skills: ["HTML", "CSS", "JavaScript", "TypeScript", "Node.js", "Express.js", "React (MERN Stack)", "PHP", "MySQL"]
    },
    {
      category: "Mobile Development",
      skills: ["Flutter", "Dart"]
    },
    {
      category: "Database Design",
      skills: ["SQL", "MySQL", "MongoDB", "SQLite"]
    },
    {
      category: "Architecture & Systems",
      skills: ["Electron Desktop Apps", "Offline-First Software Architecture", "Management Systems", "Computer Hardware & Diagnostics", "Team Leadership"]
    }
  ],
  experience: [
    {
      role: "Team Lead & Full Stack Architect",
      company: "Amdox Technologies",
      location: "Remote / Hybrid",
      period: "2026",
      bullets: [
        "Directed a 5-member engineering team through the end-to-end development lifecycle of an enterprise-level AI cloud ERP suite, ensuring on-time delivery of critical milestones.",
        "Architected robust and scalable infrastructure utilizing Node.js and Express.js for backend API development, seamlessly integrating with interactive React-based frontend dashboards."
      ]
    },
    {
      role: "Software Development Intern",
      company: "Clink Bridges",
      location: "Bangalore, India",
      period: "2026",
      bullets: [
        "Successfully completed a 2-month intensive internship, earning an official certification for technical proficiency.",
        "Developed and delivered a fully functional, client-based project, meeting all business requirements.",
        "Designed and developed a dynamic, multi-category online storefront using the MERN stack (MongoDB, Express.js, React, Node.js) as a final internship project."
      ]
    },
    {
      role: "Web Intern",
      company: "Ubrain Studios Pvt. Ltd.",
      location: "Rajkot, India",
      period: "2025",
      bullets: [
        "Developed a dynamic e-commerce website during the internship program.",
        "Collaborated with the senior development team to implement responsive frontend designs.",
        "Successfully completed the program and received an internship certification."
      ]
    }
  ],
  freelance: [
    {
      title: "Full Stack Developer (Computer Department)",
      client: "Ambar Hospital & SOHA MEDICINE",
      location: "Dhrol, India",
      year: "2025",
      bullets: [
        "Built custom desktop software (Hospital Management System) to manage patient records, doctor scheduling, and billing.",
        "Engineered a secure MySQL database to handle sensitive medical data and transaction history.",
        "Reduced manual paperwork by digitizing the hospital's daily operations and integrated custom architectural logic for tracking patient referrals."
      ],
      repo: "github.com/AmbasanaHarsh2004/AMBAR-hospital-management"
    },
    {
      title: "Personalized Web Application / Desktop Billing",
      client: "Kailash Engineering",
      location: "Dhrol, India",
      year: "2026",
      bullets: [
        "Designed and deployed a robust desktop billing application that is currently live and powering daily operations for commercial shops in Dhrol.",
        "Built a secure, high-performance offline PC application using Electron, Node.js, and an SQLite database, ensuring local shops operate smoothly without needing a constant internet connection."
      ]
    },
    {
      title: "Full Stack ELECTRON Webapp",
      client: "PM Enterprise & PM Angadiya",
      location: "Dhrol, India",
      year: "2026",
      bullets: [
        "Engineered and deployed custom desktop management systems tailored to the complex operational and ledger tracking needs of traditional business models.",
        "Developed secure, offline-first applications utilizing Electron and SQLite, ensuring uninterrupted daily processing, robust data security, and zero internet dependency.",
        "Digitized core business workflows, reducing manual entry errors and significantly accelerating daily transaction processing and reporting."
      ]
    },
    {
      title: "Full Stack ELECTRON Webapp",
      client: "Potter Garments",
      location: "Dhrol, India",
      year: "2026",
      bullets: [
        "Designed and deployed a custom retail management system optimized for garment inventory control, stock tracking, and sales analytics.",
        "Built automated billing and invoicing modules that handle multiple clothing categories, sizing variations, and seasonal discount structures seamlessly.",
        "Developed an intuitive user interface that streamlined the point-of-sale (POS) experience, reducing customer checkout times and improving daily sales reporting.",
        "Developed a centralized retail and inventory management system that synchronized daily operations, POS data, and automated billing across distributed store branches."
      ]
    }
  ]
};
