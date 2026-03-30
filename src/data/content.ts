export type TimelineItem = {
  org: string;
  role: string;
  period: string;
  details: string;
};

export type ProjectItem = {
  title: string;
  category: string;
  description: string;
  impact: string;
};

export type HallLeader = {
  name: string;
  role: string;
};

export const expertise = [
  "EV Charging Infrastructure",
  "Lean Manufacturing Consulting",
  "MSME Productivity Transformation",
  "Renewable Energy Solutions",
  "Sustainability Consulting",
  "Infrastructure Development",
];

export const timeline: TimelineItem[] = [
  {
    org: "Sun's Shine India",
    role: "Founder & Managing Director",
    period: "2019 - Present",
    details:
      "Driving national-scale EV charging and clean infrastructure initiatives with execution-focused project leadership. Leading the development and deployment of sustainable energy and mobility infrastructure across multiple regions. Spearheading strategic partnerships, operational excellence, and innovation to accelerate India's transition to clean mobility and sustainable industry.",
  },
  {
    org: "Anify Innovations Pvt Ltd",
    role: "Founder & CMD",
    period: "2024 - Present",
    details:
      "Building next-generation innovation programs connecting MSMEs, sustainability, and technology deployment. Driving integrated solutions across EV charging infrastructure and digital technologies to support future-ready industries. Leading strategic initiatives, operational execution, and partnership development to empower MSMEs and accelerate sustainable growth.",
  },
  {
    org: "Swachh Samaaj Abhiyan",
    role: "National Secretary",
    period: "Current",
    details:
      "Leading social impact initiatives for environmental awareness, inclusive development, and civic collaboration. Driving community engagement through education, sustainability programs, and grassroots participation. Committed to fostering responsible citizenship and building cleaner, healthier communities for future generations.",
  },
  {
    org: "Nutribarn Processing India Ltd",
    role: "Director",
    period: "Prior Leadership",
    details:
      "Supported strategy and operational development focused on scalable, quality-driven growth. Contributed to strengthening operational frameworks and improving process efficiency across key functions. Focused on sustainable expansion through innovation, quality assurance, and strong organizational leadership.",
  },
  {
    org: "Surya Kiran Technologies",
    role: "Manager Projects / Senior Engineer",
    period: "Early Career",
    details:
      "Managed technical delivery in engineering projects and built foundations for later infrastructure leadership. Led project execution, ensuring adherence to quality standards, timelines, and operational efficiency. Gained critical experience in project management, technical problem-solving, and cross-functional collaboration in high-stakes environments.",
  },
];

export const achievements = [
  "National Excellence Award",
  "Honorary Doctorate",
  "India's Top 10 EV Industry Consultants",
  "Lean Six Sigma Yellow Belt Certification",
];

export const projects: ProjectItem[] = [
  {
    title: "EV Charging Infrastructure Deployment",
    category: "Electric Mobility",
    description:
      "Designed and executed multi-site EV charging deployment models integrating demand analytics and operational planning.",
    impact: "Accelerated regional EV readiness and improved infrastructure accessibility.",
  },
  {
    title: "MSME Lean Implementation Projects",
    category: "Government Consulting",
    description:
      "Delivered Lean and ZED-aligned transformation programs for MSMEs with measurable productivity improvements.",
    impact: "Enhanced process efficiency, quality consistency, and cost optimization.",
  },
  {
    title: "Renewable Energy Systems",
    category: "Sustainability",
    description:
      "Implemented clean energy-driven technical solutions for industrial and institutional applications.",
    impact: "Reduced energy dependency and supported low-carbon operations.",
  },
  {
    title: "Aviation Ground Lighting Projects",
    category: "Infrastructure",
    description:
      "Executed precision-focused engineering projects in critical infrastructure environments.",
    impact: "Improved operational reliability and safety standards.",
  },
];

export const insights = [
  "Future of EV Infrastructure in India",
  "MSME Digital Transformation",
  "Clean Energy Economy",
  "Sustainable Industrial Development",
];

export const testimonials = [
  {
    name: "Industry Partner",
    text: "Dr. Amit Kumar consistently delivers strategic clarity and execution discipline across high-impact infrastructure programs.",
  },
  {
    name: "Government Official",
    text: "His MSME consulting approach is practical, outcomes-driven, and aligned with national development priorities.",
  },
  {
    name: "MSME Client",
    text: "The transformation roadmap he guided helped us improve productivity and build a future-ready operating model.",
  },
];

export const logos = ["IIT Delhi", "Ministry of MSME", "QCI", "Sun's Shine India", "Anify Innovations"];

export const stats = [
  { label: "Years Leadership", value: 7, suffix: "+" },
  { label: "MSMEs Supported", value: 100, suffix: "+" },
  { label: "Projects Delivered", value: 50, suffix: "+" },
  { label: "National Awards", value: 10, suffix: "+" },
];

export const counters = [
  { label: "Strategic Initiatives", value: 120, suffix: "+" },
  { label: "Consulting Engagements", value: 200, suffix: "+" },
  { label: "Impact Districts", value: 40, suffix: "+" },
];

export const hallLeaderDetails: HallLeader[] = [
  { name: "Dr. A.P.J. Abdul Kalam", role: "Visionary Scientist & Mentor" },
  { name: "Ratan Tata", role: "Industrial Leader & Nation Builder" },
  { name: "Nandan Nilekani", role: "Digital Infrastructure Architect" },
  { name: "Kiran Mazumdar-Shaw", role: "Innovation-Led Entrepreneur" },
  { name: "Narayana Murthy", role: "Technology Leadership Pioneer" },
  { name: "Amitabh Kant", role: "Policy & Transformation Catalyst" },
];

export const hallOfExcellenceImages = [
  "/carousel/1.jpeg",
  "/carousel/2.jpeg",
  "/carousel/3.jpeg",
  "/carousel/5.jpeg",
  "/carousel/6.jpeg",
  "/carousel/7.jpeg",
  "/carousel/8.jpeg",
  "/carousel/9.jpeg",
  "/carousel/10.jpeg",
  "/carousel/11.jpeg",
  "/carousel/12.jpeg",
  "/carousel/13.jpeg",
  "/carousel/14.jpeg",
  "/carousel/15.jpeg",
  "/carousel/16.jpeg",
  "/carousel/17.jpeg",
  "/carousel/18.jpeg",
  "/carousel/19.jpeg",
] as const;
