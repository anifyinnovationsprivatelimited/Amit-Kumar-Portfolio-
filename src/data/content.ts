export type TimelineItem = {
  org: string;
  role: string;
  period: string;
  details: string;
};

export type ProjectSlug = "zed" | "lean" | "ev" | "aviation";

export type ProjectItem = {
  slug: ProjectSlug;
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
    period: "2018 - Present",
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
    org: "Ministry of MSME (QCI)",
    role: "Certified ZED & LEAN Consultant",
    period: "2020 - Present",
    details:
      "Helping MSMEs improve competitiveness through quality excellence, productivity enhancement, waste reduction, and operational transformation. Supporting enterprises in achieving ZED Certification and adopting Lean manufacturing practices for sustainable growth.",
  },

  {
    org: "IIT Delhi",
    role: "EV Technology Expert",
    period: "2021 - Present",
    details:
      "Contributing to the advancement of EV technology and sustainable mobility solutions. Supporting EV charging infrastructure planning, implementation strategies, and green mobility initiatives across India.",
  },

  {
    org: "Swachh Samaaj Abhiyan",
    role: "National Secretary",
    period: "Current",
    details:
      "Leading social impact initiatives for environmental awareness, inclusive development, and civic collaboration. Driving community engagement through education, sustainability programs, and grassroots participation. Committed to fostering responsible citizenship and building cleaner, healthier communities for future generations.",
  },

  {
    org: "National Excellence Award",
    role: "Award Recipient",
    period: "2023",
    details:
      "Recognized for outstanding contributions to industrial development, sustainability initiatives, EV infrastructure advancement, and MSME transformation across India.",
  },

  {
    org: "India Manufacturing Review",
    role: "Top 10 EV Consultant Organization Recognition",
    period: "December 2025",
    details:
      "SUN'S SHINE INDIA was recognized among India's Top 10 EV Consultant Organizations for excellence in EV consulting, project planning, charging infrastructure development, and policy advisory services.",
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
  {
    title: "National Excellence Award 2023",
    category: "National Recognition",
    description:
      "Recognized for contributions to industrial excellence, sustainability, and innovation."
  },
  {
    title: "Top 10 EV Consultant Organization",
    category: "India Manufacturing Review 2025",
    description:
      "SUN'S SHINE INDIA recognized among India's leading EV consulting organizations."
  },
  {
    title: "QCI Certified ZED & LEAN Consultant",
    category: "Ministry of MSME",
    description:
      "Supporting MSMEs through operational excellence and quality transformation."
  },
  {
    title: "EV Technology Expert",
    category: "IIT Delhi",
    description:
      "Contributing to sustainable mobility and EV infrastructure development."
  }
];

export const projects: ProjectItem[] = [
  {
    slug: "zed",
    title: "Manufacturing Excellence & Business Transformation",
    category: "Industrial Consultant",
    description:
      "Helping manufacturing enterprises achieve world-class performance through structured business transformation.",
    impact:
      "Partnered with industries to strengthen operational excellence by improving quality, productivity, cost efficiency, delivery performance, workplace safety, lean operations, sustainability, and continuous improvement, enabling organizations to build resilient, competitive, and future-ready manufacturing ecosystems.",
  },

  {
    slug: "zed",
    title: "MSME Sustainable (ZED) Scheme",
    category: "Government Consultant",
    description:
      "Guiding MSMEs towards operational excellence, quality improvement, and sustainable growth.",
    impact:
      "MSME ZED (Zero Defect Zero Effect) is an initiative by the Ministry of Micro, Small and Medium Enterprises, Government of India. It helps MSMEs improve product quality, reduce waste, adopt eco-friendly manufacturing practices, enhance operational efficiency, and achieve sustainable business growth through the ZED Certification Scheme.",
  },
  {
    slug: "lean",
    title: "MSME Competitive (LEAN) Scheme",
    category: "Government Consultant",
    description:
      "Implementing Lean Manufacturing practices under the Ministry of MSME's Competitive (LEAN) Scheme.",
    impact:
      "Supported MSMEs in improving productivity, reducing operational waste, minimizing defects and rework, optimizing resource utilization, streamlining manufacturing processes, lowering production costs, improving delivery timelines, enhancing product quality through standardized practices, increasing customer satisfaction, and strengthening long-term competitiveness in domestic and global markets.",
  },
  {
    slug: "ev",
    title: "EV Infrastructure ",
    category: "Electric Vehicle Infrastructure",
    description:
      "Leading end-to-end EPC projects for EV charging infrastructure and sustainable energy solutions.",
    impact:
      "Successfully led the execution of turnkey EPC projects covering engineering, procurement, construction, commissioning, renewable energy integration, and smart EV charging technologies. Under Dr. Amit Kumar's leadership, SUN'S SHINE INDIA was recognized as one of India's Top 10 EV Consultants by the Indian Manufacturing Review (2025), demonstrating excellence in delivering innovative, reliable, and future-ready electric mobility infrastructure across India.",
  },
  {
    slug: "aviation",
    title: "Aviation Ground Lighting (AGL) Infrastructure Projects",
    category: "Airport Infrastructure & Aviation Solutions",
    description:
      "Delivering end-to-end EPC solutions for Aviation Ground Lighting, from design and installation to commissioning and maintenance.",
    impact:
      "Successfully executed Aviation Ground Lighting projects that enhance runway safety, aircraft navigation, and airport operational efficiency. By implementing ICAO and DGCA-compliant lighting systems, advanced LED technology, and precision engineering, these projects improve visibility, reduce maintenance costs, optimize energy efficiency, ensure regulatory compliance, and support safe, reliable, and uninterrupted airfield operations.",
  },
];

export const insights = [
  "Future of EV Infrastructure in India",
  "MSME Digital Transformation",
  "Clean Energy Economy",
  "Sustainable Industrial Development",
];

export const leadershipPillars = [
  {
    number: "01",
    title: "Sustainable Growth",
    description:
      "Building organizations that balance economic success with environmental responsibility."
  },
  {
    number: "02",
    title: "Innovation Leadership",
    description:
      "Driving meaningful transformation through technology, strategic thinking, and execution."
  },
  {
    number: "03",
    title: "Infrastructure Excellence",
    description:
      "Creating long-term value through quality-driven infrastructure and industrial development."
  },
  {
    number: "04",
    title: "Social Impact",
    description:
      "Promoting community development and responsible leadership for future generations."
  }
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
  { label: "Years Leadership", value: 10, suffix: "+" },
  { label: "MSMEs Supported", value: 100, suffix: "+" },
  { label: "Projects Delivered", value: 50, suffix: "+" },
  { label: "National Awards", value: 10, suffix: "+" },
];

export const counters = [
  { label: "Strategic Initiatives", value: 120, suffix: "+" },
  { label: "Consulting Engagements", value: 200, suffix: "+" },
  { label: "Impact Districts", value: 40, suffix: "+" },
];

export type HallLeaderProfile = {
  name: string;
  role: string;
  image: string;
};

export const hallLeaderProfiles: HallLeaderProfile[] = [
  { name: "Dr. A.P.J. Abdul Kalam", role: "Visionary Scientist & Mentor", image: "/carousel/1.jpeg" },
  { name: "Ratan Tata", role: "Industrial Leader & Nation Builder", image: "/carousel/2.jpeg" },
  { name: "Nandan Nilekani", role: "Digital Infrastructure Architect", image: "/carousel/3.jpeg" },
  { name: "Kiran Mazumdar-Shaw", role: "Innovation-Led Entrepreneur", image: "/carousel/5.jpeg" },
  { name: "Narayana Murthy", role: "Technology Leadership Pioneer", image: "/carousel/6.jpeg" },
  { name: "Amitabh Kant", role: "Policy & Transformation Catalyst", image: "/carousel/7.jpeg" },
  { name: "Dr. A.P.J. Abdul Kalam", role: "Visionary Scientist & Mentor", image: "/carousel/8.jpeg" },
  { name: "Ratan Tata", role: "Industrial Leader & Nation Builder", image: "/carousel/9.jpeg" },
  { name: "Nandan Nilekani", role: "Digital Infrastructure Architect", image: "/carousel/10.jpeg" },
  { name: "Kiran Mazumdar-Shaw", role: "Innovation-Led Entrepreneur", image: "/carousel/11.jpeg" },
  { name: "Narayana Murthy", role: "Technology Leadership Pioneer", image: "/carousel/12.jpeg" },
  { name: "Amitabh Kant", role: "Policy & Transformation Catalyst", image: "/carousel/13.jpeg" },
  { name: "Dr. A.P.J. Abdul Kalam", role: "Visionary Scientist & Mentor", image: "/carousel/14.jpeg" },
  { name: "Ratan Tata", role: "Industrial Leader & Nation Builder", image: "/carousel/15.jpeg" },
  { name: "Nandan Nilekani", role: "Digital Infrastructure Architect", image: "/carousel/16.jpeg" },
  { name: "Kiran Mazumdar-Shaw", role: "Innovation-Led Entrepreneur", image: "/carousel/17.jpeg" },
  { name: "Narayana Murthy", role: "Technology Leadership Pioneer", image: "/carousel/18.jpeg" },
  { name: "Amitabh Kant", role: "Policy & Transformation Catalyst", image: "/carousel/19.jpeg" },
];
