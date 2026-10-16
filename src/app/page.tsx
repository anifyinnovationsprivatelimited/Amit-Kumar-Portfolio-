"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { GalleryPopup } from "@/components/gallery/GalleryPopup";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,

  useMotionValue,
  useSpring,
  type Variants,
} from "framer-motion";
import {
  ArrowUpRight,
  Building2,
  Leaf,
  ChevronLeft,
  ChevronRight,  
  GraduationCap,
} from "lucide-react";
import {
  achievements,
  leadershipPillars,
  projects,
  testimonials,
  timeline,
  type ProjectItem,
} from "@/data/content";


const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

const HallOfExcellence = dynamic(
  () => import("@/components/HallOfExcellence").then((mod) => mod.HallOfExcellence),
  { ssr: false },
);


/* ──────────────────────────────────────────────────────────
   ZED CONSULTANT — MANUFACTURING UNIT DEVELOPMENT WORKFLOW
   Data + Section component, styled to match the rest of the page.
────────────────────────────────────────────────────────── */

type ZedPhase = {
  number: string;
  title: string;
  intro?: string;
  groupLabel?: string;
  items?: string[];
  resultLabel?: string;
  result?: string[];
  flow?: string[];
};

const zedPhases: ZedPhase[] = [
  {
    number: "01",
    title: "Initial Assessment",
    intro: "Understanding the current condition of the factory.",
    groupLabel: "Activities",
    items: [
      "Factory visit & management meeting",
      "Production process study",
      "Machine condition assessment",
      "Utility assessment (Electricity, Water, Air)",
      "Employee interviews",
      "ZED Gap Assessment",
    ],
    resultLabel: "Output",
    result: ["Current Score", "Strengths", "Weaknesses", "Improvement Opportunities"],
  },
  {
    number: "02",
    title: "Documentation & Compliance",
    intro: "Verifying and organizing legal and operational documents.",
    groupLabel: "Documents",
    items: [
      "Udyam Registration, GST, PAN",
      "Factory License, Pollution NOC, Fire NOC",
      "Electricity & Calibration Records",
      "Machine Maintenance Records",
      "Quality Records & HR Documents",
    ],
  },
  {
    number: "03",
    title: "Process Mapping",
    intro: "Mapping the production process step-by-step, defining inputs and outputs.",
    flow: ["Raw Material", "Inspection", "Production", "Quality Check", "Packing", "Dispatch"],
  },
  {
    number: "04",
    title: "Quality Improvement",
    groupLabel: "Consultant's Tasks",
    items: [
      "SOP & Work Instructions creation",
      "Process standardization",
      "Incoming / In-process / Final Inspection",
      "Rejection analysis",
    ],
    resultLabel: "Result",
    result: ["Reduced customer complaints", "Reduced rejection rate", "Better overall quality"],
  },
  {
    number: "05",
    title: "Lean Manufacturing Implementation",
    groupLabel: "Tools",
    items: ["5S", "Kaizen", "Visual Management", "Poka-Yoke", "Root Cause Analysis", "Value Stream Mapping"],
    resultLabel: "Result",
    result: ["Increased productivity", "Reduced waste", "Time savings"],
  },
  {
    number: "06",
    title: "Cost Reduction",
    intro: "Identifying where cost is being wasted across operations.",
    groupLabel: "Areas",
    items: ["Electricity", "Raw Material", "Rework & Scrap", "Machine Breakdown", "Overtime", "Inventory"],
    resultLabel: "Output",
    result: ["Annual Cost Saving Report"],
  },
  {
    number: "07",
    title: "Productivity Improvement",
    groupLabel: "Activities",
    items: [
      "Machine utilization improvement",
      "Cycle time & changeover reduction",
      "Bottleneck removal",
      "Layout improvement",
    ],
    resultLabel: "Result",
    result: ["More production with the same resources"],
  },
  {
    number: "08",
    title: "Maintenance System",
    groupLabel: "Activities",
    items: [
      "Preventive Maintenance Plan",
      "Breakdown Analysis",
      "Lubrication Schedule",
      "Spare Parts Management",
    ],
  },
  {
    number: "09",
    title: "Safety Improvement",
    groupLabel: "Activities",
    items: [
      "PPE implementation",
      "Fire Safety & Emergency Exit",
      "Electrical Safety",
      "Machine Guarding & Risk Assessment",
    ],
  },
  {
    number: "10",
    title: "Environmental Improvement",
    groupLabel: "Activities",
    items: ["Waste Segregation", "Water & Energy Saving", "Air Pollution Control", "Green Practices"],
  },
  {
    number: "11",
    title: "Human Resource Development",
    groupLabel: "Training",
    items: ["Quality Awareness", "5S & Kaizen", "Safety", "Skill Development", "SOP Training"],
  },
  {
    number: "12",
    title: "Digitalization",
    groupLabel: "Examples",
    items: ["Digital Records", "Barcode System", "ERP", "Production Dashboard", "Digital Maintenance Log"],
  },
  {
    number: "13",
    title: "KPI Monitoring",
    intro: "Tracking factory performance every month against key indicators.",
  },
  {
    number: "14",
    title: "ZED Documentation",
    groupLabel: "Evidence",
    items: [
      "Photos & SOPs",
      "Training Records",
      "Calibration & Maintenance Records",
      "Audit Reports & Improvement Projects",
    ],
  },
  {
    number: "15",
    title: "Internal Audit",
    groupLabel: "Activities",
    items: [
      "Gap verification & evidence check",
      "Corrective actions",
      "Management review",
      "Readiness assessment",
    ],
  },
  {
    number: "16",
    title: "Certification Support",
    groupLabel: "Activities",
    items: [
      "Assessor coordination",
      "Document presentation",
      "Shop-floor demonstration",
      "Query resolution",
    ],
  },
  {
    number: "17",
    title: "Continuous Improvement",
    intro: "Improvement continues even after certification is achieved.",
    groupLabel: "Long-term Activities",
    items: [
      "Kaizen & Lean projects",
      "Energy saving projects",
      "Automation & technology upgradation",
      "Export readiness & OEM vendor development",
    ],
  },
];

const zedKpis: [string, string][] = [
  ["Production", "Increase output"],
  ["Rejection", "Reduce defects"],
  ["Scrap", "Reduce waste"],
  ["Machine Downtime", "Improve availability"],
  ["OEE", "Improve equipment efficiency"],
  ["Customer Complaints", "Improve customer satisfaction"],
  ["On-Time Delivery", "Improve delivery performance"],
  ["Energy Consumption", "Reduce electricity usage"],
  ["Accident Rate", "Improve workplace safety"],
  ["Employee Productivity", "Increase efficiency"],
];

const zedKias: [string, string][] = [
  ["Quality Improvement", "Reduction in defects and customer complaints"],
  ["Cost Reduction", "Reduction in manufacturing cost and waste"],
  ["Productivity", "Increase in production and efficiency"],
  ["Delivery Performance", "Improved on-time delivery"],
  ["Safety", "Reduction in accidents and unsafe conditions"],
  ["Environmental Sustainability", "Energy and resource conservation"],
  ["Compliance", "Adherence to legal and regulatory requirements"],
  ["Employee Development", "Increase in skills and awareness"],
  ["Technology Upgradation", "Adoption of modern manufacturing practices"],
  ["Business Growth", "ZED certification, customer trust and new opportunities"],
];

type ZedStage = {
  id: string;
  label: string;
  title: string;
  description: string;
  range: string;
  icon: string;
  accent: string;
  glow: string;
  phaseNumbers: string[];
};

const zedStages: ZedStage[] = [
  {
    id: "diagnose",
    label: "Stage 01",
    title: "Diagnose & Plan",
    description: "Understanding where the unit stands today and what needs to change.",
    range: "Phases 01–03",
    icon: "🔍",
    accent: "cyan",
    glow: "rgba(103,232,249,",
    phaseNumbers: ["01", "02", "03"],
  },
  {
    id: "build",
    label: "Stage 02",
    title: "Build Core Systems",
    description: "Putting quality, lean, cost and productivity foundations in place.",
    range: "Phases 04–08",
    icon: "⚙️",
    accent: "indigo",
    glow: "rgba(129,140,248,",
    phaseNumbers: ["04", "05", "06", "07", "08"],
  },
  {
    id: "improve",
    label: "Stage 03",
    title: "Improve & Sustain",
    description: "Strengthening safety, sustainability, people and digital readiness.",
    range: "Phases 09–13",
    icon: "📈",
    accent: "emerald",
    glow: "rgba(52,211,153,",
    phaseNumbers: ["09", "10", "11", "12", "13"],
  },
  {
    id: "certify",
    label: "Stage 04",
    title: "Certify & Grow",
    description: "Locking in the rating and keeping the unit improving long after.",
    range: "Phases 14–17",
    icon: "🏆",
    accent: "amber",
    glow: "rgba(251,191,36,",
    phaseNumbers: ["14", "15", "16", "17"],
  },
];

const accentClasses: Record<
  string,
  { border: string; bg: string; text: string; bar: string }
> = {
  cyan: {
    border: "border-cyan-400/20",
    bg: "bg-cyan-500/10",
    text: "text-cyan-300",
    bar: "from-cyan-400 to-blue-400",
  },
  indigo: {
    border: "border-indigo-400/20",
    bg: "bg-indigo-500/10",
    text: "text-indigo-300",
    bar: "from-indigo-400 to-blue-400",
  },
  emerald: {
    border: "border-emerald-400/20",
    bg: "bg-emerald-500/10",
    text: "text-emerald-300",
    bar: "from-emerald-400 to-cyan-400",
  },
  amber: {
    border: "border-amber-400/20",
    bg: "bg-amber-500/10",
    text: "text-amber-300",
    bar: "from-amber-400 to-orange-400",
  },
};

function ZedConsultantWorkflow() {
  const [openStage, setOpenStage] = useState<string | null>("diagnose");

  const phaseByNumber = useMemo(() => {
    const map: Record<string, ZedPhase> = {};
    zedPhases.forEach((p) => {
      map[p.number] = p;
    });
    return map;
  }, []);

  const renderPhaseCard = (phase: ZedPhase, accent: string) => {
    const cls = accentClasses[accent];
    const span =
      (phase.result && phase.result.length > 2) || (phase.items && phase.items.length > 4)
        ? "lg:col-span-2"
        : "";

    return (
      <div
        key={phase.number}
        className={`group relative overflow-hidden rounded-2xl p-6 transition-all duration-500 hover:-translate-y-1 ${span}`}
        style={{
          background: "rgba(110,180,245,0.03)",
          border: "1px solid rgba(110,180,245,0.18)",
        }}
      >
        <div className={`absolute inset-x-0 top-0 h-[3px] rounded-t-2xl bg-gradient-to-r ${cls.bar}`} />

        <div className="flex items-start justify-between">
          <div
            className={`inline-flex items-center gap-1.5 rounded-full border ${cls.border} ${cls.bg} px-3 py-1 text-xs font-semibold uppercase tracking-[0.15em] ${cls.text}`}
          >
            Phase {phase.number}
          </div>
          <span className="text-4xl font-black leading-none" style={{ color: "rgba(255,255,255,0.06)" }}>
            {phase.number}
          </span>
        </div>

        <h3 className="mt-4 text-xl font-bold text-white">{phase.title}</h3>

        {phase.intro && <p className="mt-2 text-sm leading-6 text-slate-400">{phase.intro}</p>}

        {phase.flow && (
          <div className="mt-4 flex flex-wrap items-center gap-2">
            {phase.flow.map((step, idx) => (
              <span key={step} className="flex items-center gap-2">
                <span className={`rounded-full border ${cls.border} ${cls.bg} px-3 py-1 text-xs font-medium ${cls.text}`}>
                  {step}
                </span>
                {idx < phase.flow!.length - 1 && <span className="text-white/30">→</span>}
              </span>
            ))}
          </div>
        )}

        {phase.items && (
          <>
            <div className="my-4 h-px" style={{ background: "rgba(110,180,245,0.2)" }} />
            {phase.groupLabel && (
              <p className={`text-xs font-semibold uppercase tracking-wider ${cls.text}`}>{phase.groupLabel}</p>
            )}
            <ul className="mt-3 grid gap-2 sm:grid-cols-2">
              {phase.items.map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <svg className="mt-0.5 h-4 w-4 flex-shrink-0" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" className={cls.text} strokeWidth="1.5" strokeOpacity="0.5" />
                    <path d="M8 12l2.5 2.5L16 9" stroke="currentColor" className={cls.text} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span className="text-xs leading-5 text-slate-400">{item}</span>
                </li>
              ))}
            </ul>
          </>
        )}

        {phase.result && (
          <div className="mt-4 rounded-xl border border-emerald-400/15 bg-emerald-500/5 p-3">
            <p className="text-xs font-semibold uppercase tracking-wider text-emerald-300">{phase.resultLabel}</p>
            <p className="mt-1.5 text-xs leading-5 text-slate-400">{phase.result.join(" • ")}</p>
          </div>
        )}
      </div>
    );
  };

  return (
    <section
      id="zed-workflow"
      className="relative w-full overflow-hidden pt-12 pb-24 lg:pt-16 lg:pb-32"
      style={{ background: "#050608" }}
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute left-1/2 top-0 h-[600px] w-[600px] -translate-x-1/2 rounded-full opacity-15"
          style={{
            background:
              "radial-gradient(circle, rgba(103,232,249,0.5) 0%, rgba(103,232,249,0.1) 50%, transparent 75%)",
            filter: "blur(100px)",
          }}
        />
        <div
          className="absolute right-0 bottom-0 h-[450px] w-[450px] rounded-full opacity-10"
          style={{
            background: "radial-gradient(circle, rgba(129,140,248,0.4) 0%, transparent 70%)",
            filter: "blur(120px)",
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: "radial-gradient(circle, #67e8f9 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
      </div>

      <div className="relative mx-auto w-[min(1280px,92%)]">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="flex items-center justify-center gap-4">
            <div className="h-px flex-1 max-w-[80px]" style={{ background: "linear-gradient(to right, transparent, #67e8f9)" }} />
            <svg className="h-3 w-3" viewBox="0 0 24 24" fill="#67e8f9">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
            <span
              className="text-xs font-bold uppercase tracking-[0.35em]"
              style={{
                backgroundImage: "linear-gradient(90deg, #67e8f9, #818cf8)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              Key Contributions
            </span>
            <svg className="h-3 w-3" viewBox="0 0 24 24" fill="#818cf8">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
            <div className="h-px flex-1 max-w-[80px]" style={{ background: "linear-gradient(to left, transparent, #818cf8)" }} />
          </div>

          <h2
            className="mt-4 text-4xl font-black tracking-tight text-white md:text-5xl xl:text-6xl"
            style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
          >
            MSME {" "}
            <span
              style={{
                backgroundImage: "linear-gradient(135deg, #67e8f9, #818cf8)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              Development
            </span>
          </h2>

          <div
            className="mx-auto mt-4 h-[2px] w-24"
            style={{ background: "linear-gradient(to right, transparent, #67e8f9, #818cf8, transparent)" }}
          />

            <p className="mx-auto mt-5 max-w-3xl text-base leading-8 text-slate-400">
              As a Consultant associated with the <span className="font-semibold text-white">Ministry of MSME</span>, Dr. Amit Kumar helps manufacturing enterprises achieve sustainable growth through structured transformation and globally recognized best practices. His consulting approach focuses on{" "}
              <span className="text-cyan-300">
                Leadership, Quality, Productivity, Safety, Cost Optimization, Operational Excellence, and Sustainability
              </span>{" "}
              while fostering a culture of continuous improvement. The 17-phase implementation framework below is organized into four strategic stages, providing manufacturers with a clear roadmap toward operational excellence and long-term competitiveness.
            </p>
        </motion.div>

        <div className="mt-14 space-y-5">
          {zedStages.map((stage, i) => {
            const cls = accentClasses[stage.accent];
            const isOpen = openStage === stage.id;

            return (
              <motion.div
                key={stage.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                viewport={{ once: true }}
                className="relative overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.03] backdrop-blur-2xl"
              >
                <div className={`absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r ${cls.bar}`} />

                <button
                  type="button"
                  onClick={() => setOpenStage(isOpen ? null : stage.id)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-6 p-7 text-left transition-colors duration-300 hover:bg-white/[0.02]"
                >
                  <div className="flex items-center gap-5">
                    <div
                      className={`flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl text-2xl border ${cls.border} ${cls.bg}`}
                    >
                      {stage.icon}
                    </div>
                    <div>
                      <div className="flex flex-wrap items-center gap-3">
                        <span className={`text-xs font-semibold uppercase tracking-[0.2em] ${cls.text}`}>
                          {stage.label}
                        </span>
                        <span className="rounded-full border border-white/10 bg-white/5 px-3 py-0.5 text-[11px] font-medium text-slate-400">
                          {stage.range}
                        </span>
                      </div>
                      <h3 className="mt-1 text-2xl font-bold text-white">{stage.title}</h3>
                      <p className="mt-1 text-sm text-slate-400">{stage.description}</p>
                    </div>
                  </div>

                  <div
                    className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border ${cls.border} ${cls.bg} transition-transform duration-300 ${
                      isOpen ? "rotate-180" : "rotate-0"
                    }`}
                  >
                    <svg className={`h-4 w-4 ${cls.text}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="px-7 pb-7">
                        <div className="mb-5 h-px" style={{ background: "rgba(255,255,255,0.08)" }} />
                        <div className="grid gap-5 lg:grid-cols-2">
                          {stage.phaseNumbers.map((num) => {
                            const phase = phaseByNumber[num];
                            if (!phase) return null;
                            return renderPhaseCard(phase, stage.accent);
                          })}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-14 grid gap-8 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.03] p-7 backdrop-blur-2xl"
          >
            <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-cyan-400 to-blue-400" />
            <h3 className="text-2xl font-semibold text-white">KPI Monitoring</h3>
            <p className="mt-2 text-sm text-slate-400">Performance tracked every month against key indicators.</p>
            <div className="mt-5 overflow-hidden rounded-xl border border-white/10">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="bg-cyan-500/10 text-cyan-300">
                    <th className="px-4 py-3 font-semibold">KPI</th>
                    <th className="px-4 py-3 font-semibold">Objective</th>
                  </tr>
                </thead>
                <tbody>
                  {zedKpis.map(([kpi, obj], i) => (
                    <tr key={kpi} className={i % 2 === 0 ? "bg-white/[0.02]" : "bg-transparent"}>
                      <td className="px-4 py-2.5 text-slate-200">{kpi}</td>
                      <td className="px-4 py-2.5 text-slate-400">{obj}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.03] p-7 backdrop-blur-2xl"
          >
            <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-emerald-400 to-cyan-400" />
            <h3 className="text-2xl font-semibold text-white">Key Impact Areas</h3>
            <p className="mt-2 text-sm text-slate-400">Expected business impact delivered to client units.</p>
            <div className="mt-5 overflow-hidden rounded-xl border border-white/10">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="bg-emerald-500/10 text-emerald-300">
                    <th className="px-4 py-3 font-semibold">Impact Area</th>
                    <th className="px-4 py-3 font-semibold">Business Impact</th>
                  </tr>
                </thead>
                <tbody>
                  {zedKias.map(([area, impact], i) => (
                    <tr key={area} className={i % 2 === 0 ? "bg-white/[0.02]" : "bg-transparent"}>
                      <td className="px-4 py-2.5 text-slate-200">{area}</td>
                      <td className="px-4 py-2.5 text-slate-400">{impact}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-14 rounded-[36px] border border-cyan-500/10 bg-gradient-to-r from-cyan-500/5 via-blue-500/5 to-emerald-500/5 p-8 text-center backdrop-blur-xl"
        >
          <h3 className="text-2xl font-bold text-white md:text-3xl">
            A Business Improvement Partner — Not Just a Certifier
          </h3>
            <p className="mx-auto mt-4 max-w-3xl text-slate-300">
              Every successful manufacturing transformation begins with a clear strategy and disciplined execution. Through expert consulting, industry best practices, and a structured improvement framework, Dr. Amit Kumar helps organizations strengthen{" "}
              <span className="text-cyan-300">
                Quality, Cost, Delivery, Safety, Productivity, and Sustainability
              </span>, enabling them to achieve operational excellence, sustainable growth, and long-term global competitiveness.
            </p>
        </motion.div>
      </div>
    </section>
  );
}

function EVEcosystem() {
  const nodes = [
    { id: "msme", label: "MSME", x: 10, y: 45 },
    { id: "energy", label: "Clean Energy", x: 35, y: 20 },
    { id: "ev", label: "EV Charging", x: 62, y: 50 },
    { id: "india", label: "Sustainable India", x: 86, y: 32 },
  ];

  const links: Array<[string, string]> = [
    ["msme", "energy"],
    ["energy", "ev"],
    ["ev", "india"],
    ["msme", "ev"],
  ];

  const map = Object.fromEntries(nodes.map((n) => [n.id, n]));

  return (
    <div className="glass-card relative h-72 overflow-hidden p-6">
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 60" preserveAspectRatio="none">
        {links.map(([a, b]) => (
          <line
            key={`${a}-${b}`}
            x1={map[a].x}
            y1={map[a].y}
            x2={map[b].x}
            y2={map[b].y}
            stroke="rgba(58,141,255,0.55)"
            strokeWidth="0.4"
            strokeDasharray="2 1"
          />
        ))}
      </svg>
      {nodes.map((node, i) => (
        <motion.div
          key={node.id}
          className="absolute"
          style={{ left: `${node.x}%`, top: `${node.y}%`, transform: "translate(-50%, -50%)" }}
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ delay: i * 0.15, duration: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="relative rounded-full border border-[var(--color-primary)] bg-[rgba(0,255,157,0.15)] px-4 py-2 text-xs font-medium text-white">
            <span className="absolute -inset-2 rounded-full border border-[rgba(0,255,157,0.2)] animate-ping" />
            {node.label}
          </div>
        </motion.div>
      ))}
    </div>
  );
}

export default function Home() {
const [galleryProject, setGalleryProject] = useState<ProjectItem | null>(null);  
const [activeTimeline, setActiveTimeline] = useState(0);
const [activeProject, setActiveProject] = useState<ProjectItem | null>(null);
const [testimonialIndex, setTestimonialIndex] = useState(0);
const [openRole01, setOpenRole01] = useState(false);
const [openRole02, setOpenRole02] = useState(false);
  void testimonialIndex;


  const modalRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!activeProject) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveProject(null);
      }
      if (e.key === "Tab" && modalRef.current) {
        const focusableElements = modalRef.current.querySelectorAll(
          'a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])'
        );
        if (focusableElements.length === 0) return;
        const firstElement = focusableElements[0] as HTMLElement;
        const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            lastElement.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === lastElement) {
            firstElement.focus();
            e.preventDefault();
          }
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    
    const timer = setTimeout(() => {
      if (modalRef.current) {
        const closeBtn = modalRef.current.querySelector("button") as HTMLElement;
        if (closeBtn) {
          closeBtn.focus();
        } else {
          modalRef.current.focus();
        }
      }
    }, 100);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      clearTimeout(timer);
    };
  }, [activeProject]);

  const particlePoints = useMemo(
    () =>
      Array.from({ length: 28 }, (_, i) => ({
        left: `${(i * 13) % 100}%`,
        top: `${(i * 23) % 100}%`,
        delay: `${(i % 9) * 0.4}s`,
      })),
    [],
  );

  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 0.3], [0, -80]);
  const cursorX = useMotionValue(-200);
  const cursorY = useMotionValue(-200);
  const smoothX = useSpring(cursorX, { stiffness: 140, damping: 24, mass: 0.4 });
  const smoothY = useSpring(cursorY, { stiffness: 140, damping: 24, mass: 0.4 });

  useEffect(() => {
    const id = setInterval(() => {
      setTestimonialIndex((prev) => (prev + 1) % testimonials.length);
    }, 4500);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const onMouseMove = (event: MouseEvent) => {
      cursorX.set(event.clientX);
      cursorY.set(event.clientY);
    };

    const onMouseLeave = () => {
      cursorX.set(-200);
      cursorY.set(-200);
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseleave", onMouseLeave);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseleave", onMouseLeave);
    };
  }, [cursorX, cursorY]);

  return (
    <div className="relative overflow-x-hidden bg-[var(--color-bg)] text-white">
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-30 hidden h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-70 blur-3xl md:block"
        style={{
          x: smoothX,
          y: smoothY,
          background:
            "radial-gradient(circle, rgba(255,200,0,0.10) 0%, rgba(200,100,255,0.8) 42%, rgba(0,0,0,0) 74%)",
        }}
      />
      <div className="circuit-bg" aria-hidden="true">
        {particlePoints.map((p, i) => (
          <span
            key={i}
            className="particle"
            style={{ left: p.left, top: p.top, animationDelay: p.delay }}
          />
        ))}
      </div>

      <header className="sticky top-0 z-40 border-b border-white/10 bg-[rgba(11,15,26,0.7)] backdrop-blur-xl">
        <nav className="mx-auto flex w-[min(1120px,92%)] items-center justify-between py-4">
          <p className="font-semibold tracking-wide text-[var(--color-primary)]">Dr. Amit Kumar</p>
          <a
            href="#contact"
            className="rounded-full border border-[var(--color-primary)] px-4 py-2 text-xs font-semibold uppercase tracking-wide transition hover:bg-[rgba(0,255,157,0.15)]"
          >
            Collaborate
          </a>
        </nav>
      </header>

      <main>


      <section className="relative overflow-hidden py-16 lg:py-24">

        {/* ================= BACKGROUND ================= */}
        <div className="absolute inset-0 -z-30 bg-[#030712]" />

        {/* Ambient Lights */}
        <div className="absolute inset-0 -z-20">
          <div className="absolute left-1/2 top-0 h-[700px] w-[700px] -translate-x-1/2 rounded-full bg-cyan-500/10 blur-[160px]" />
          <div className="absolute right-0 top-20 h-[550px] w-[550px] rounded-full bg-blue-500/10 blur-[140px]" />
          <div className="absolute left-0 bottom-0 h-[450px] w-[450px] rounded-full bg-emerald-500/10 blur-[130px]" />
        </div>

        {/* Grid Overlay */}
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:80px_80px]" />

        <div className="mx-auto grid min-h-[680px] w-[min(1320px,92%)] items-center gap-20 lg:grid-cols-[1.05fr_0.95fr]">

          {/* ================= LEFT CONTENT ================= */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >

            {/* Badge */}
            <div className="inline-flex rounded-full border border-cyan-400/20 bg-cyan-400/10 px-5 py-2 text-sm font-medium text-cyan-300 backdrop-blur-xl">
              Founder • Consultant • Sustainability Leader
            </div>

            {/* Heading */}
            <h1 className="mt-8 text-4xl font-bold leading-[1.05] tracking-tight text-white md:text-6xl xl:text-[78px]">
              Dr. Amit Kumar
            </h1>

            {/* Designation */}
            <h2 className="mt-4 bg-gradient-to-r from-cyan-300 via-blue-400 to-emerald-300 bg-clip-text text-xl font-medium text-transparent md:text-2xl">
              Founder & Managing Director, SUN&apos;S SHINE INDIA & CMD of Anify Innovations Private Limited
            </h2>

            {/* Tagline */}
            <p className="mt-6 text-lg font-medium text-cyan-200">
              Driving Sustainable Growth Through Innovation,
              Renewable Energy & MSME Transformation
            </p>

            <div className="mt-10 flex flex-wrap gap-3">
              <div className="rounded-full border border-amber-400/20 bg-amber-500/10 px-4 py-2 text-sm text-amber-300">
                National Excellence Award 2023
              </div>

              <div className="rounded-full border border-cyan-400/20 bg-cyan-500/10 px-4 py-2 text-sm text-cyan-300">
                IIT Delhi EV Technology Expert
              </div>

              <div className="rounded-full border border-emerald-400/20 bg-emerald-500/10 px-4 py-2 text-sm text-emerald-300">
                QCI Certified ZED & LEAN Consultant
              </div>
              <div className="rounded-full border border-emerald-400/20 bg-emerald-500/10 px-4 py-2 text-sm text-emerald-300">
                 QMP Master Trainer 
              </div>
              <div className="rounded-full border border-emerald-400/20 bg-emerald-500/10 px-4 py-2 text-sm text-emerald-300">
                 Top 10 EV Consultant 
              </div>
            </div>

            {/* Executive Information Panel */}
            <div className="mt-10">

              <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-2xl">

                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-blue-500/5 to-emerald-500/5" />

                <div className="relative">

                  <div className="mb-6 flex items-center gap-3">
                    <div className="h-10 w-1 rounded-full bg-gradient-to-b from-cyan-400 to-emerald-400" />
                    <div>
                      <p className="text-xs uppercase tracking-[0.35em] text-cyan-300">
                        Executive Profile
                      </p>
                      <h3 className="text-lg font-semibold text-white">
                        Professional Information
                      </h3>
                    </div>
                  </div>

                  <div className="grid gap-5 md:grid-cols-2">

                    <div>
                      <p className="text-xs uppercase tracking-wider text-slate-500">
                        Name
                      </p>
                      <p className="mt-1 text-white">
                        Dr. Amit Kumar
                      </p>
                    </div>

                    <div>
                      <p className="text-xs uppercase tracking-wider text-slate-500">
                        Designation
                      </p>
                      <p className="mt-1 text-white">
                        Founder & Managing Director
                      </p>
                    </div>

                    <div>
                      <p className="text-xs uppercase tracking-wider text-slate-500">
                        Mobile Number
                      </p>
                      <p className="mt-1 text-slate-300">
                        +91 9205349739
                      </p>
                    </div>

                    <div>
                      <p className="text-xs uppercase tracking-wider text-slate-500">
                        Email Address
                      </p>
                      <p className="mt-1 text-slate-300">
                        director@sshineindia.com
                      </p>
                    </div>

                    <div>
                      <p className="text-xs uppercase tracking-wider text-slate-500">
                        Website
                      </p>
                      <p className="mt-1 text-cyan-300">
                        www.sunsshineindia.com
                      </p>
                    </div>

                    <div>
                      <p className="text-xs uppercase tracking-wider text-slate-500">
                        LinkedIn
                      </p>
                      <p className="mt-1 text-cyan-300">
                        linkedin.com/in/dr-amit-kumar
                      </p>
                    </div>

                  </div>

                </div>

              </div>

            </div>

          </motion.div>

          {/* ================= RIGHT IMAGE ================= */}
          <motion.div
            style={{
              y: heroY,
              perspective: 1200,
            }}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            whileHover={{
              rotateY: 6,
              rotateX: -3,
              scale: 1.02,
            }}
            className="relative mx-auto w-full max-w-[520px]"
          >

            <div className="absolute inset-0 rounded-[40px] bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-emerald-500/20 blur-[90px]" />

            <div
              className="relative overflow-hidden rounded-[40px] border border-white/10 bg-white/5 shadow-[0_20px_80px_rgba(0,0,0,0.35)] backdrop-blur-3xl"
              style={{ transformStyle: "preserve-3d" }}
            >

              <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-cyan-400 via-blue-400 to-emerald-400" />

              <div className="relative aspect-[4/5]">

                <Image
                  src="/profile.jpeg"
                  alt="Dr. Amit Kumar"
                  fill
                  sizes="(max-width:768px) 100vw, 50vw"
                  className="object-cover"
                />

              </div>

            </div>

          </motion.div>

        </div>

      </section>


      <section
        className="relative mx-auto w-[min(1280px,92%)] py-24"
        id="about"
      >
        {/* Background Glow */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute left-1/4 top-20 h-[500px] w-[500px] rounded-full bg-cyan-500/10 blur-[140px]" />
          <div className="absolute right-0 bottom-0 h-[400px] w-[400px] rounded-full bg-emerald-500/10 blur-[120px]" />
        </div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="mb-20 text-center"
        >
          <span className="inline-flex rounded-full border border-cyan-400/20 bg-cyan-400/10 px-5 py-2 text-sm font-medium text-cyan-300 backdrop-blur-xl">
            About Dr. Amit Kumar
          </span>

          <h2 className="mt-6 text-4xl font-bold leading-tight text-white md:text-5xl xl:text-6xl">
            Driving Sustainable Innovation
            <span className="block bg-gradient-to-r from-cyan-300 via-blue-400 to-emerald-300 bg-clip-text text-transparent">
              & Industrial Excellence
            </span>
          </h2>
        </motion.div>

        <div className="grid items-start gap-16 lg:grid-cols-[0.95fr_1.05fr]">

          {/* IMAGE SIDE */}
          <motion.div
            whileHover={{
              rotateY: 4,
              rotateX: -2,
              scale: 1.02,
            }}
            transition={{ duration: 0.4 }}
            className="relative"
            style={{ perspective: 1200 }}
          >
            <div className="absolute -inset-6 rounded-[36px] bg-gradient-to-r from-cyan-500/20 via-blue-500/10 to-emerald-500/20 blur-3xl" />

            <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-white/5 shadow-[0_30px_80px_rgba(0,0,0,0.45)] backdrop-blur-3xl">
              <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-cyan-400 via-blue-400 to-emerald-400" />

              <div className="relative aspect-[4/5]">
                <Image
                  src="/About.jpeg"
                  alt="Dr. Amit Kumar"
                  fill
                  sizes="(max-width:1024px)100vw,40vw"
                  className="object-cover"
                />
              </div>
            </div>
            <div className="mt-23 rounded-3xl border border-amber-500/20 bg-amber-500/[0.03] p-7 backdrop-blur-xl">

              <div className="mb-4 h-1 w-12 rounded-full bg-amber-400" />

              <h4 className="text-xl font-semibold text-white">
                Career Objective
              </h4>

              <p className="mt-4 leading-8 text-slate-300">
                To continue driving national progress by supporting industrial
                modernization, clean energy adoption, MSME transformation and
                sustainable infrastructure development while creating lasting
                value for businesses, communities and future generations.
              </p>

            </div>

          </motion.div>

          {/* CONTENT SIDE */}
          <div>

            {/* Professional Introduction */}
            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-7 backdrop-blur-xl">
              <div className="mb-4 h-1 w-14 rounded-full bg-cyan-400" />

              <h3 className="text-2xl font-semibold text-white">
                Professional Introduction
              </h3>

              <p className="mt-4 text-lg leading-8 text-slate-300">
                Dr. Amit Kumar is a visionary entrepreneur and industry
                transformation leader dedicated to empowering MSMEs through
                quality excellence, innovation, and sustainable growth. He is
                actively advancing industrial development, EV infrastructure,
                and renewable energy to support India's economic progress.
              </p>

              <p className="mt-4 text-lg leading-8 text-slate-300">
                As the Founder & Managing Director of SUN&apos;S SHINE INDIA,
                he has consistently worked towards enabling businesses to achieve
                sustainable growth, operational excellence, quality enhancement,
                and long-term competitiveness through strategic consulting and
                technology-driven solutions.
              </p>
            </div>

            {/* Vision & Mission */}
            <div className="mt-6 grid gap-6 md:grid-cols-2">

              <div className="rounded-3xl border border-cyan-500/20 bg-cyan-500/[0.03] p-6 backdrop-blur-xl">
                <div className="mb-4 h-1 w-12 rounded-full bg-cyan-400" />

                <h4 className="text-xl font-semibold text-white">
                  Vision Statement
                </h4>

                <p className="mt-3 leading-7 text-slate-300">
                  To build a globally competitive MSME ecosystem through quality excellence, innovation and sustainable growth while advancing renewable energy and electric mobility.
                </p>
              </div>

              <div className="rounded-3xl border border-emerald-500/20 bg-emerald-500/[0.03] p-6 backdrop-blur-xl">
                <div className="mb-4 h-1 w-12 rounded-full bg-emerald-400" />

                <h4 className="text-xl font-semibold text-white">
                  Mission Statement
                </h4>

                <p className="mt-3 leading-7 text-slate-300">
                  To empower MSMEs, industries and communities through quality consulting, operational excellence, sustainable infrastructure and clean energy solutions.
                </p>
              </div>

            </div>

            {/* Leadership Philosophy */}
            <div className="mt-6 rounded-3xl border border-blue-500/20 bg-blue-500/[0.03] p-7 backdrop-blur-xl">

              <div className="mb-4 h-1 w-12 rounded-full bg-blue-400" />

              <h4 className="text-xl font-semibold text-white">
                Leadership Philosophy
              </h4>

              <p className="mt-4 leading-8 text-slate-300">
                True leadership is not measured by authority, but by the ability
                to create opportunities, inspire innovation and drive meaningful
                impact. Dr. Amit Kumar believes in leading through integrity,
                collaboration, continuous learning and a strong commitment to
                sustainable development.
              </p>

            </div>

            {/* Career Objective */}

          </div>
        </div>
      </section>





        {/* ================= CURRENT POSITIONS & LEADERSHIP ROLES ================= */}
        <section
          id="leadership"
          className="relative mx-auto w-[min(1280px,92%)] py-24 lg:py-32"
        >
          {/* Background Effects */}
          <div className="absolute inset-0 -z-10 overflow-hidden">
            <div className="absolute left-0 top-0 h-[500px] w-[500px] rounded-full bg-cyan-500/10 blur-[160px]" />
            <div className="absolute right-0 bottom-0 h-[500px] w-[500px] rounded-full bg-emerald-500/10 blur-[160px]" />
          </div>

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="mb-24 text-center"
          >
            <h2 className="text-4xl font-bold text-white md:text-5xl xl:text-6xl">
              Current Positions &
              <span className="mt-2 block bg-gradient-to-r from-cyan-300 via-blue-400 to-emerald-300 bg-clip-text text-transparent">
                Leadership Roles
              </span>
            </h2>

            <p className="mx-auto mt-8 max-w-4xl text-lg leading-8 text-slate-400">
              Serving in strategic leadership roles across MSME development,
              quality excellence, EV infrastructure, and technology innovation,
              while driving organizational growth, industry collaboration,
              and sustainable progress.
            </p>
          </motion.div>

          {/* Leadership Timeline */}
          <div className="relative mx-auto max-w-6xl">

            {/* Center Line */}
            <div className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-gradient-to-b from-cyan-400 via-blue-400 to-emerald-400 lg:block" />

            {/* ================= ROLE 01 ================= */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
              className="relative mb-24 grid gap-10 lg:grid-cols-[1fr_auto_1fr]"
            >
              {/* Content */}
              <div className="lg:text-right">
                <div className="mb-4 text-7xl font-black text-cyan-500/20">
                  01
                </div>

                <div className="inline-flex rounded-full border border-cyan-400/20 bg-cyan-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-cyan-300">
                  Primary Leadership Role
                </div>

                <h3 className="mt-6 text-3xl font-bold text-white">
                  Founder & Managing Director
                </h3>

                <p className="mt-3 text-lg font-semibold text-cyan-300">
                  SUN'S SHINE INDIA
                </p>

                {/* More Button — Role 01 */}
                <div className="mt-4 lg:flex lg:justify-end">
                  <button
                    onClick={() => setOpenRole01((prev) => !prev)}
                    className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-500/10 px-5 py-2 text-sm font-semibold text-cyan-300 transition-all duration-300 hover:bg-cyan-500/20 hover:border-cyan-400/60"
                  >
                    {openRole01 ? "Less" : "More"}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className={`h-4 w-4 transition-transform duration-300 ${openRole01 ? "rotate-180" : "rotate-0"}`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                </div>

                <p className="mt-8 leading-8 text-slate-400">
                  Dr. Amit Kumar leads SUN'S SHINE INDIA in empowering MSMEs
                  through ZED Certification, LEAN Manufacturing, Quality
                  Excellence, and Sustainability initiatives.
                </p>

                {/* Expandable Details — Role 01 */}
                <div
                  className={`overflow-hidden transition-all duration-500 ease-in-out ${
                    openRole01 ? "max-h-[500px] opacity-100 mt-5" : "max-h-0 opacity-0"
                  }`}
                >
                  <p className="leading-8 text-slate-400">
                    As a Certified ZED and LEAN Consultant, he actively guides MSMEs in strengthening competitiveness, improving operational efficiency, and achieving sustainable business growth through structured quality and productivity improvement frameworks.
                  </p>

                  <p className="mt-5 leading-8 text-slate-400">
                    An Expert in EV Technology from IIT Delhi, he also contributes to EV infrastructure development and clean mobility initiatives, supporting India's transition toward sustainable transportation and future-ready industrial ecosystems.
                  </p>
                </div>
              </div>

              {/* Timeline Node */}
              <div className="relative hidden lg:flex items-start justify-center">
                <div className="relative mt-10">
                  <div className="h-6 w-6 rounded-full border-4 border-cyan-300 bg-slate-950" />
                  <div className="absolute inset-0 animate-ping rounded-full bg-cyan-400/30" />
                </div>
              </div>

              <div />
            </motion.div>

            {/* ================= ROLE 02 ================= */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              viewport={{ once: true }}
              className="relative grid gap-10 lg:grid-cols-[1fr_auto_1fr]"
            >
              <div />

              {/* Timeline Node */}
              <div className="relative hidden lg:flex items-start justify-center">
                <div className="relative mt-10">
                  <div className="h-6 w-6 rounded-full border-4 border-emerald-300 bg-slate-950" />
                  <div className="absolute inset-0 animate-ping rounded-full bg-emerald-400/30" />
                </div>
              </div>

              {/* Content */}
              <div>
                <div className="mb-4 text-7xl font-black text-emerald-500/20">
                  02
                </div>

                <div className="inline-flex rounded-full border border-emerald-400/20 bg-emerald-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-emerald-300">
                  Corporate Leadership
                </div>

                <h3 className="mt-6 text-3xl font-bold text-white">
                  Chairman & Managing Director
                </h3>

                <p className="mt-3 text-lg font-semibold text-emerald-300">
                  ANIFY INNOVATIONS PRIVATE LIMITED
                </p>

                {/* More Button — Role 02 */}
                <div className="mt-4">
                  <button
                    onClick={() => setOpenRole02((prev) => !prev)}
                    className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-500/10 px-5 py-2 text-sm font-semibold text-emerald-300 transition-all duration-300 hover:bg-emerald-500/20 hover:border-emerald-400/60"
                  >
                    {openRole02 ? "Less" : "More"}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className={`h-4 w-4 transition-transform duration-300 ${openRole02 ? "rotate-180" : "rotate-0"}`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                </div>

                <p className="mt-8 leading-8 text-slate-400">
                  At Anify Innovations, Dr. Amit Kumar drives growth in EV
                  solutions, digital transformation, and technology innovation.
                </p>

                {/* Expandable Details — Role 02 */}
                <div
                  className={`overflow-hidden transition-all duration-500 ease-in-out ${
                    openRole02 ? "max-h-[500px] opacity-100 mt-5" : "max-h-0 opacity-0"
                  }`}
                >
                  <p className="leading-8 text-slate-400">
                    He established the company's IT Division to deliver web
                    development, digital services, and business automation solutions
                    while supporting the advancement of India's EV ecosystem and
                    sustainable mobility initiatives.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>


      <section
        className="relative mx-auto w-[min(1280px,92%)] py-24"
        id="projects"
      >

        {/* Background Effects */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute left-0 top-20 h-[500px] w-[500px] rounded-full bg-cyan-500/10 blur-[160px]" />
          <div className="absolute right-0 bottom-0 h-[450px] w-[450px] rounded-full bg-emerald-500/10 blur-[160px]" />
          <div className="absolute left-1/2 top-1/3 h-[300px] w-[300px] -translate-x-1/2 rounded-full bg-blue-500/10 blur-[120px]" />
        </div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mx-auto max-w-4xl text-center"
        >

          <span className="inline-flex rounded-full border border-cyan-400/20 bg-cyan-500/10 px-5 py-2 text-sm font-medium text-cyan-300 backdrop-blur-xl">
            Core Expertise
          </span>

          <h2 className="mt-5 text-4xl font-bold text-white md:text-5xl xl:text-6xl">
            Areas of Professional
            <span className="bg-gradient-to-r from-cyan-300 via-blue-400 to-emerald-300 bg-clip-text text-transparent">
              {" "}Excellence
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-400">
            Delivering innovation, sustainability, industrial transformation,
            and infrastructure development through years of expertise and leadership.
          </p>

        </motion.div>

        {/* Projects Grid */}
        <div className="mt-10 grid gap-6 md:grid-cols-2">

          {projects.map((project, i) => (

            <motion.div
              key={project.title}
              role="button"
              tabIndex={0}
              aria-label={`View details for project: ${project.title}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: i * 0.08,
              }}
              viewport={{ once: true }}
              whileHover={{
                y: -10,
                rotateX: 4,
                rotateY: -4,
                scale: 1.02,
              }}
              onClick={() => setActiveProject(project)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setActiveProject(project);
                }
              }}
              className="group relative cursor-pointer overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.03] p-7 backdrop-blur-2xl"
              style={{
                transformStyle: "preserve-3d",
              }}
            >

              <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-cyan-400 via-blue-400 to-emerald-400" />

              <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-cyan-500/10 blur-3xl opacity-0 transition duration-500 group-hover:opacity-100" />

              <p className="text-xs uppercase tracking-[0.18em] text-cyan-300">
                {project.category}
              </p>

              <h3 className="mt-4 text-2xl font-semibold text-white">
                {project.title}
              </h3>

              <p className="mt-4 leading-7 text-slate-300">
                {project.description}
              </p>

              <div className="mt-6 flex items-center justify-between">

                <span className="rounded-full border border-emerald-400/20 bg-emerald-500/10 px-4 py-2 text-sm text-emerald-300">
                  Featured Solution
                </span>

                <span className="inline-flex items-center gap-2 text-cyan-300 transition group-hover:text-cyan-200">
                  View Project Details
                  <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-1 group-hover:-translate-y-1" />
                </span>

              </div>

            </motion.div>

          ))}

        </div>

      </section>


      <section
        id="achievements"
        className="relative w-full overflow-hidden py-24 lg:py-32"
        style={{ background: "#050608" }}
      >

        {/* ══════════════════════════════════════════
            GLOBAL BACKGROUND EFFECTS
        ══════════════════════════════════════════ */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          {/* Deep cyan center glow */}
          <div
            className="absolute left-1/2 top-0 h-[700px] w-[700px] -translate-x-1/2 rounded-full opacity-20"
            style={{
              background:
                "radial-gradient(circle, rgba(103,232,249,0.5) 0%, rgba(103,232,249,0.1) 50%, transparent 75%)",
              filter: "blur(80px)",
            }}
          />
          {/* Bottom indigo glow */}
          <div
            className="absolute bottom-0 left-1/2 h-[500px] w-[800px] -translate-x-1/2 rounded-full opacity-15"
            style={{
              background:
                "radial-gradient(circle, rgba(129,140,248,0.4) 0%, transparent 70%)",
              filter: "blur(100px)",
            }}
          />
          {/* Dot grid texture */}
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
                "radial-gradient(circle, #67e8f9 1px, transparent 1px)",
              backgroundSize: "28px 28px",
            }}
          />
          {/* Corner decorative map dots top-left (cyan) */}
          <div
            className="absolute left-0 top-0 h-64 w-64 opacity-10"
            style={{
              backgroundImage:
                "radial-gradient(circle, #67e8f9 1.5px, transparent 1.5px)",
              backgroundSize: "18px 18px",
              maskImage:
                "radial-gradient(ellipse at top left, black 30%, transparent 70%)",
            }}
          />
          {/* Corner decorative map dots top-right (indigo) */}
          <div
            className="absolute right-0 top-0 h-64 w-64 opacity-10"
            style={{
              backgroundImage:
                "radial-gradient(circle, #818cf8 1.5px, transparent 1.5px)",
              backgroundSize: "18px 18px",
              maskImage:
                "radial-gradient(ellipse at top right, black 30%, transparent 70%)",
            }}
          />
        </div>

        <div className="relative mx-auto w-[min(1200px,92%)]">

          {/* ══════════════════════════════════════════
              SECTION 1 — HEADER
          ══════════════════════════════════════════ */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
            className="text-center"
          >
            {/* Eyebrow with side lines — cyan flows in from the left, indigo from the right */}
            <div className="flex items-center justify-center gap-4">
              <div className="h-px flex-1 max-w-[80px]" style={{ background: "linear-gradient(to right, transparent, #67e8f9)" }} />
              {/* Star icon (cyan) */}
              <svg className="h-3 w-3" viewBox="0 0 24 24" fill="#67e8f9">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
              <span
                className="text-xs font-bold uppercase tracking-[0.35em]"
                style={{
                  backgroundImage: "linear-gradient(90deg, #67e8f9, #818cf8)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  color: "transparent",
                }}
              >
                Recognition of Excellence
              </span>
              {/* Star icon (indigo) */}
              <svg className="h-3 w-3" viewBox="0 0 24 24" fill="#818cf8">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
              <div className="h-px flex-1 max-w-[80px]" style={{ background: "linear-gradient(to left, transparent, #818cf8)" }} />
            </div>

            {/* Main title */}
            <h2
              className="mt-4 text-5xl font-black tracking-tight text-white md:text-6xl xl:text-7xl"
              style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
            >
              Awards &{" "}
              <span
                style={{
                  backgroundImage: "linear-gradient(135deg, #67e8f9, #818cf8)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  color: "transparent",
                }}
              >
                Recognitions
              </span>
            </h2>

            {/* Gradient underline */}
            <div className="mx-auto mt-4 h-[2px] w-24" style={{ background: "linear-gradient(to right, transparent, #67e8f9, #818cf8, transparent)" }} />

            <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-slate-400">
              Honored by Government Institutions, Industry Leaders and National Organizations
              for advancing sustainable infrastructure, empowering MSMEs and driving EV innovation.
            </p>
          </motion.div>

          {/* ══════════════════════════════════════════
              SECTION 2 — FEATURED AWARD + STATS
          ══════════════════════════════════════════ */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
            className="mt-14 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]"
          >

            {/* ── Featured Award Card ── */}
            <div
              className="relative overflow-hidden rounded-2xl p-px"
              style={{
                background:
                  "linear-gradient(135deg, rgba(103,232,249,0.6) 0%, rgba(129,140,248,0.15) 50%, rgba(129,140,248,0.3) 100%)",
              }}
            >
              <div
                className="relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-2xl p-8 sm:flex-row sm:items-center"
                style={{
                  background:
                    "linear-gradient(135deg, #0a0e18 0%, #090b14 50%, #0c0f1c 100%)",
                }}
              >
                {/* Cyan→indigo shimmer top */}
                <div
                  className="pointer-events-none absolute inset-x-0 top-0 h-px"
                  style={{
                    background:
                      "linear-gradient(to right, transparent, #67e8f9, #818cf8, transparent)",
                  }}
                />
                {/* Corner glow */}
                <div
                  className="pointer-events-none absolute -left-8 -top-8 h-48 w-48 rounded-full"
                  style={{
                    background:
                      "radial-gradient(circle, rgba(103,232,249,0.15) 0%, transparent 70%)",
                  }}
                />

                {/* Left: Trophy SVG illustration */}
                    <div className="flex flex-shrink-0 flex-col items-center gap-4">
                    {/* Trophy SVG */}
                    <div className="relative">
                      <svg
                        viewBox="0 0 120 140"
                        className="h-36 w-28 drop-shadow-2xl"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        {/* Golden Glow */}
                        <ellipse
                          cx="60"
                          cy="120"
                          rx="35"
                          ry="8"
                          fill="rgba(255,215,0,0.28)"
                        />

                        {/* Base */}
                        <rect
                          x="35"
                          y="115"
                          width="50"
                          height="8"
                          rx="2"
                          fill="url(#baseGrad)"
                        />
                        <rect
                          x="42"
                          y="108"
                          width="36"
                          height="10"
                          rx="2"
                          fill="url(#baseGrad)"
                        />

                        {/* Stem */}
                        <rect
                          x="52"
                          y="88"
                          width="16"
                          height="22"
                          rx="2"
                          fill="url(#stemGrad)"
                        />

                        {/* Trophy Cup */}
                        <path
                          d="M25 28 Q22 55 40 72 Q50 80 60 80 Q70 80 80 72 Q98 55 95 28 Z"
                          fill="url(#cupGrad)"
                        />

                        {/* Metallic Shine */}
                        <path
                          d="M32 32 Q30 50 42 64"
                          stroke="rgba(255,255,255,0.75)"
                          strokeWidth="3"
                          fill="none"
                          strokeLinecap="round"
                        />

                        {/* Left Handle */}
                        <path
                          d="M25 35 Q8 40 10 58 Q12 70 25 68"
                          stroke="url(#handleGrad)"
                          strokeWidth="5"
                          fill="none"
                          strokeLinecap="round"
                        />

                        {/* Right Handle */}
                        <path
                          d="M95 35 Q112 40 110 58 Q108 70 95 68"
                          stroke="url(#handleGrad)"
                          strokeWidth="5"
                          fill="none"
                          strokeLinecap="round"
                        />

                        {/* Gold Star */}
                        <polygon
                          points="60,20 63,30 74,30 65,37 68,47 60,41 52,47 55,37 46,30 57,30"
                          fill="url(#starGrad)"
                        />

                        {/* Trophy Plate */}
                        <rect
                          x="38"
                          y="55"
                          width="44"
                          height="20"
                          rx="3"
                          fill="rgba(60,35,0,0.35)"
                        />

                        <text
                          x="60"
                          y="63"
                          textAnchor="middle"
                          fill="#FFF8DC"
                          fontSize="4"
                          fontWeight="bold"
                          fontFamily="Arial"
                        >
                          NATIONAL
                        </text>

                        <text
                          x="60"
                          y="68"
                          textAnchor="middle"
                          fill="#FFF8DC"
                          fontSize="4"
                          fontWeight="bold"
                          fontFamily="Arial"
                        >
                          EXCELLENCE
                        </text>

                        <text
                          x="60"
                          y="73"
                          textAnchor="middle"
                          fill="#FFF8DC"
                          fontSize="4"
                          fontWeight="bold"
                          fontFamily="Arial"
                        >
                          AWARD
                        </text>

                        <defs>
                          {/* Premium Gold Trophy */}
                          <linearGradient
                            id="cupGrad"
                            x1="0%"
                            y1="0%"
                            x2="100%"
                            y2="100%"
                          >
                            <stop offset="0%" stopColor="#FFF7C2" />
                            <stop offset="15%" stopColor="#FFE98A" />
                            <stop offset="35%" stopColor="#FFD700" />
                            <stop offset="55%" stopColor="#F4C430" />
                            <stop offset="75%" stopColor="#D4AF37" />
                            <stop offset="100%" stopColor="#8B6914" />
                          </linearGradient>

                          {/* Stem */}
                          <linearGradient
                            id="stemGrad"
                            x1="0%"
                            y1="0%"
                            x2="100%"
                            y2="0%"
                          >
                            <stop offset="0%" stopColor="#8B6914" />
                            <stop offset="25%" stopColor="#C9A227" />
                            <stop offset="50%" stopColor="#FFD700" />
                            <stop offset="75%" stopColor="#C9A227" />
                            <stop offset="100%" stopColor="#8B6914" />
                          </linearGradient>

                          {/* Base */}
                          <linearGradient
                            id="baseGrad"
                            x1="0%"
                            y1="0%"
                            x2="100%"
                            y2="0%"
                          >
                            <stop offset="0%" stopColor="#4E3200" />
                            <stop offset="20%" stopColor="#8B6914" />
                            <stop offset="50%" stopColor="#D4AF37" />
                            <stop offset="80%" stopColor="#8B6914" />
                            <stop offset="100%" stopColor="#4E3200" />
                          </linearGradient>

                          {/* Handles */}
                          <linearGradient
                            id="handleGrad"
                            x1="0%"
                            y1="0%"
                            x2="100%"
                            y2="100%"
                          >
                            <stop offset="0%" stopColor="#FFF6C8" />
                            <stop offset="35%" stopColor="#FFE27A" />
                            <stop offset="60%" stopColor="#FFD700" />
                            <stop offset="100%" stopColor="#B8860B" />
                          </linearGradient>

                          {/* Star */}
                          <linearGradient
                            id="starGrad"
                            x1="0%"
                            y1="0%"
                            x2="100%"
                            y2="100%"
                          >
                            <stop offset="0%" stopColor="#FFFFFF" />
                            <stop offset="30%" stopColor="#FFF9D6" />
                            <stop offset="60%" stopColor="#FFE27A" />
                            <stop offset="100%" stopColor="#FFD700" />
                          </linearGradient>
                        </defs>
                      </svg>
                    </div>
                  </div>
                

                {/* Right: Award details */}
                <div className="flex-1">
                  {/* Featured badge */}
                  <div
                    className="inline-flex items-center gap-2 rounded-full px-4 py-1.5"
                    style={{
                      background: "rgba(103,232,249,0.12)",
                      border: "1px solid rgba(129,140,248,0.3)",
                    }}
                  >
                    <svg className="h-3 w-3" viewBox="0 0 24 24" fill="#67e8f9">
                      <path d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                    </svg>
                    <span className="text-xs font-bold uppercase tracking-[0.2em]" style={{ color: "#67e8f9" }}>
                      Featured Recognition
                    </span>
                  </div>

                  <h3
                    className="mt-4 text-4xl font-black leading-tight text-white"
                    style={{ fontFamily: "Georgia, serif" }}
                  >
                    National Excellence
                    <br />Award
                  </h3>

                  {/* Year with laurel decoration */}
                  <div className="mt-3 flex items-center gap-2">
                    <span style={{ color: "#67e8f9", fontSize: "18px" }}>❧</span>
                    <span className="text-lg font-bold" style={{ color: "#818cf8" }}>— 2023 —</span>
                    <span style={{ color: "#818cf8", fontSize: "18px", transform: "scaleX(-1)", display: "inline-block" }}>❧</span>
                  </div>

                  <p className="mt-4 text-sm leading-7 text-slate-300">
                    Recognized for outstanding contributions to industrial
                    development, sustainability initiatives, EV infrastructure
                    advancement and MSME transformation across India.
                  </p>
                </div>
              </div>
            </div>

            {/* ── Stats Column ── */}
            <div className="flex flex-col gap-4">
              {[
                {
                  icon: (
                    <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="#67e8f9" strokeWidth="1.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-4.5M7.5 18.75v-4.5M3 6.75V4.5h18v2.25M3 6.75A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 6.75" />
                    </svg>
                  ),
                  value: "10+",
                  label: "Years of Leadership\n& Excellence",
                  accent: "rgba(103,232,249,",
                },
                {
                  icon: (
                    <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="#818cf8" strokeWidth="1.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                    </svg>
                  ),
                  value: "10000+",
                  label: "MSMEs Guided\n& Transformed",
                  accent: "rgba(129,140,248,",
                },
                {
                  icon: (
                    <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="#67e8f9" strokeWidth="1.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z" />
                    </svg>
                  ),
                  value: "1000+",
                  label: "Projects Delivered\nAcross India",
                  accent: "rgba(103,232,249,",
                },
                {
                  icon: (
                    <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="#818cf8" strokeWidth="1.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                    </svg>
                  ),
                  value: "5+",
                  label: "National & Industry\nRecognitions",
                  accent: "rgba(129,140,248,",
                },
              ].map((stat, i) => (
                <motion.div
                  key={stat.value}
                  initial={{ opacity: 0, x: 24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  viewport={{ once: true }}
                  className="flex items-center gap-5 rounded-xl px-6 py-4"
                  style={{
                    background: "rgba(110,180,245,0.04)",
                    border: "1px solid rgba(110,180,245,0.15)",
                  }}
                >
                  {/* Icon circle */}
                  <div
                    className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full"
                    style={{
                      background: `${stat.accent}0.1)`,
                      border: `1px solid ${stat.accent}0.25)`,
                    }}
                  >
                    {stat.icon}
                  </div>
                  <div>
                    <p className="text-3xl font-black text-white">{stat.value}</p>
                    <p className="mt-0.5 text-xs leading-5 text-slate-400" style={{ whiteSpace: "pre-line" }}>
                      {stat.label}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
 
        </div>
      </section>


      <ZedConsultantWorkflow />

      <section
        className="relative mx-auto w-[min(1280px,92%)] pt-6 pb-20"
        id="timeline"
      >

        {/* Background Glow */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute left-0 top-20 h-[400px] w-[400px] rounded-full bg-cyan-500/10 blur-[140px]" />
          <div className="absolute right-0 bottom-0 h-[400px] w-[400px] rounded-full bg-emerald-500/10 blur-[140px]" />
        </div>

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mx-auto max-w-4xl text-center"
        >

          <span className="inline-flex rounded-full border border-cyan-400/20 bg-cyan-400/10 px-5 py-2 text-sm font-medium text-cyan-300 backdrop-blur-xl">
            Professional Journey
          </span>

          <h2 className="mt-5 text-4xl font-bold leading-tight text-white md:text-5xl xl:text-6xl">
            Experience Timeline &
            <span className="bg-gradient-to-r from-cyan-300 via-blue-400 to-emerald-300 bg-clip-text text-transparent">
              {" "}Leadership Journey
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-slate-400">
            A journey of leadership, innovation, sustainability,
            industrial transformation, and nation-building initiatives.
          </p>

        </motion.div>

        {/* Timeline Card */}
        <div className="mt-10 flex items-center gap-5">

          {/* Previous Button */}
          <button
            type="button"
            aria-label="Previous timeline item"
            onClick={() =>
              setActiveTimeline(
                (prev) => (prev - 1 + timeline.length) % timeline.length
              )
            }
            className="rounded-full border border-white/10 bg-white/5 p-4 backdrop-blur-xl transition-all hover:border-cyan-400/40 hover:bg-cyan-500/10"
          >
            <ChevronLeft className="h-5 w-5 text-white" />
          </button>

          <AnimatePresence mode="wait">

            <motion.article
              key={activeTimeline}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.4 }}
              className="relative flex-1 overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.03] p-8 backdrop-blur-3xl"
            >

              {/* Accent */}
              <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-cyan-400 via-blue-400 to-emerald-400" />

              {/* Glow */}
              <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-cyan-500/10 blur-3xl" />

              {/* Year Badge */}
              <div className="inline-flex rounded-full border border-cyan-400/20 bg-cyan-500/10 px-5 py-2 text-sm font-semibold text-cyan-300">
                {timeline[activeTimeline].period}
              </div>

              <h3 className="mt-6 text-3xl font-bold text-white">
                {timeline[activeTimeline].org}
              </h3>

              <h4 className="mt-2 text-lg font-medium text-cyan-300">
                {timeline[activeTimeline].role}
              </h4>

              <p className="mt-6 max-w-4xl text-lg leading-8 text-slate-300">
                {timeline[activeTimeline].details}
              </p>

            </motion.article>

          </AnimatePresence>

          {/* Next Button */}
          <button
            type="button"
            aria-label="Next timeline item"
            onClick={() =>
              setActiveTimeline(
                (prev) => (prev + 1) % timeline.length
              )
            }
            className="rounded-full border border-white/10 bg-white/5 p-4 backdrop-blur-xl transition-all hover:border-cyan-400/40 hover:bg-cyan-500/10"
          >
            <ChevronRight className="h-5 w-5 text-white" />
          </button>

        </div>

      </section>

        <section className="mx-auto w-[min(1120px,92%)] py-20">
          <h2 className="section-title">Thought Leadership</h2>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {leadershipPillars.map((pillar) => (
                <article
                  key={pillar.number}
                  className="glass-card p-5"
                >
                  <p className="text-xs uppercase tracking-[0.16em] text-cyan-300">
                    {pillar.number}
                  </p>

                  <h3 className="mt-2 text-lg font-semibold text-white">
                    {pillar.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-slate-400">
                    {pillar.description}
                  </p>
                </article>
              ))}
          </div>
        </section>

        <HallOfExcellence />

        <section className="relative overflow-hidden py-24">
          {/* Background Effects */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute left-1/2 top-0 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-cyan-500/10 blur-[140px]" />
            <div className="absolute left-0 top-1/3 h-[350px] w-[350px] rounded-full bg-blue-600/10 blur-[120px]" />
            <div className="absolute bottom-0 right-0 h-[350px] w-[350px] rounded-full bg-emerald-500/10 blur-[120px]" />
          </div>

          <div className="mx-auto w-[min(1400px,92%)]">
            {/* Badge */}
            <div className="mb-6 flex justify-center">
              <div className="rounded-full border border-cyan-500/20 bg-cyan-500/5 px-6 py-2 backdrop-blur-xl">
                <span className="text-sm font-semibold tracking-[0.2em] uppercase text-cyan-300">
                  Community • Sustainability • Education
                </span>
              </div>
            </div>

            {/* Heading */}
            <div className="mx-auto max-w-5xl text-center">
              <h2 className="text-5xl font-black leading-tight tracking-tight text-white md:text-6xl lg:text-7xl">
                <span className="bg-gradient-to-r from-cyan-300 via-sky-400 to-blue-500 bg-clip-text text-transparent">
                  Social Impact
                </span>
              </h2>

              <p className="mx-auto mt-8 max-w-3xl text-lg leading-relaxed text-slate-300 md:text-xl">
                <span className="font-semibold text-cyan-300">
                  Swachh Samaaj Abhiyan
                </span>{" "}
                is committed to building a strong, inclusive, and sustainable society
                through awareness, innovation, community participation, and leadership
                that creates lasting positive change for future generations.
              </p>
            </div>

            {/* Impact Cards */}
            <div className="mt-16 grid gap-8 md:grid-cols-3">
              {/* Education */}
              <div className="group relative overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.03] p-8 backdrop-blur-xl transition-all duration-500 hover:-translate-y-3 hover:border-cyan-400/40">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-blue-500/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                <div className="relative z-10">
                  <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-cyan-500/10">
                    <GraduationCap className="h-8 w-8 text-cyan-300" />
                  </div>

                  <h3 className="text-2xl font-bold text-white">
                    Education
                  </h3>

                  <p className="mt-4 leading-relaxed text-slate-300">
                    Empowering individuals through knowledge, skill development, and
                    access to quality learning opportunities that create brighter futures.
                  </p>
                </div>
              </div>

              {/* Sustainability */}
              <div className="group relative overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.03] p-8 backdrop-blur-xl transition-all duration-500 hover:-translate-y-3 hover:border-emerald-400/40">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-transparent to-green-500/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                <div className="relative z-10">
                  <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500/10">
                    <Leaf className="h-8 w-8 text-emerald-300" />
                  </div>

                  <h3 className="text-2xl font-bold text-white">
                    Sustainability
                  </h3>

                  <p className="mt-4 leading-relaxed text-slate-300">
                    Promoting environmental responsibility through sustainable practices,
                    innovation, and awareness for a greener tomorrow.
                  </p>
                </div>
              </div>

              {/* Community */}
              <div className="group relative overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.03] p-8 backdrop-blur-xl transition-all duration-500 hover:-translate-y-3 hover:border-blue-400/40">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-purple-500/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                <div className="relative z-10">
                  <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-500/10">
                    <Building2 className="h-8 w-8 text-blue-300" />
                  </div>

                  <h3 className="text-2xl font-bold text-white">
                    Community
                  </h3>

                  <p className="mt-4 leading-relaxed text-slate-300">
                    Strengthening communities by fostering collaboration, inclusivity,
                    leadership, and collective growth for meaningful social progress.
                  </p>
                </div>
              </div>
            </div>

            {/* Bottom Impact Banner */}
            <div className="mt-16 rounded-[36px] border border-cyan-500/10 bg-gradient-to-r from-cyan-500/5 via-blue-500/5 to-emerald-500/5 p-8 text-center backdrop-blur-xl">
              <h3 className="text-2xl font-bold text-white md:text-3xl">
                Creating Positive Change Through Collective Action
              </h3>

              <p className="mx-auto mt-4 max-w-3xl text-slate-300">
                Together, we are building resilient communities, advancing education,
                promoting sustainability, and inspiring social transformation that
                leaves a lasting impact on society.
              </p>
            </div>
          </div>
        </section>


        <section
          className="relative mx-auto w-[min(1280px,92%)] py-24"
          id="contact"
        >

          {/* Background Effects */}
          <div className="absolute inset-0 -z-10 overflow-hidden">

            <div className="absolute left-0 top-0 h-[450px] w-[450px] rounded-full bg-cyan-500/10 blur-[160px]" />

            <div className="absolute right-0 bottom-0 h-[450px] w-[450px] rounded-full bg-emerald-500/10 blur-[160px]" />

            <div className="absolute left-1/2 top-0 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-amber-500/10 blur-[180px]" />

          </div>

          {/* Header */}
          <div className="mx-auto max-w-4xl text-center">

            <span className="inline-flex rounded-full border border-cyan-400/20 bg-cyan-500/10 px-5 py-2 text-sm font-medium text-cyan-300 backdrop-blur-xl">
              Get In Touch
            </span>

            <h2 className="mt-5 text-4xl font-bold text-white md:text-5xl xl:text-6xl">
 Let&apos;s Build a
              <span className="bg-gradient-to-r from-cyan-300 via-emerald-300 to-amber-300 bg-clip-text text-transparent">
                {" "}Sustainable Future
              </span>
            </h2>

            <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-slate-400">
              Open to strategic partnerships, consulting engagements,
              sustainability initiatives, EV infrastructure projects,
              industrial transformation, and innovation-driven opportunities.
            </p>

          </div>

          {/* Recognition Banner */}

          {/* Main Grid */}
          <div className="mt-14 grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">

            {/* LEFT SIDE */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="rounded-[32px] border border-white/10 bg-white/[0.03] p-8 backdrop-blur-3xl"
            >

              <h3 className="text-2xl font-bold text-white">
                Contact Information
              </h3>

              <p className="mt-4 leading-7 text-slate-400">
                Connect for consulting, project collaboration,
                sustainability transformation, EV infrastructure,
                MSME development, and strategic business initiatives.
              </p>

              <div className="mt-8 space-y-5">

                {/* Phone */}
                <div className="rounded-2xl border border-cyan-500/15 bg-cyan-500/5 p-5 transition-all duration-300 hover:border-cyan-400/40">

                  <p className="text-xs uppercase tracking-wider text-cyan-300">
                    Phone
                  </p>

                  <a
                    href="tel:+918882235945"
                    className="mt-2 block text-lg font-medium text-white"
                  >
                    +91 8882235945
                  </a>

                </div>

                {/* Email */}
                <div className="rounded-2xl border border-emerald-500/15 bg-emerald-500/5 p-5 transition-all duration-300 hover:border-emerald-400/40">

                  <p className="text-xs uppercase tracking-wider text-emerald-300">
                    Email
                  </p>

                  <a
                    href="mailto:dr.mit2022@gmail.com"
                    className="mt-2 block break-all text-lg font-medium text-white"
                  >
                    director@sshineindia.com
                  </a>

                </div>

                {/* LinkedIn */}
                <div className="rounded-2xl border border-blue-500/15 bg-blue-500/5 p-5 transition-all duration-300 hover:border-blue-400/40">

                  <p className="text-xs uppercase tracking-wider text-blue-300">
                    LinkedIn
                  </p>

                  <a
                    href="https://www.linkedin.com/in/dr-amit-kumar"
                    target="_blank"
                    rel="noreferrer"
                    className="mt-2 block text-lg font-medium text-white"
                  >
                    linkedin.com/in/dr-amit-kumar
                  </a>

                </div>

                {/* Location */}
                <div className="rounded-2xl border border-amber-500/15 bg-amber-500/5 p-5 transition-all duration-300 hover:border-amber-400/40">

                  <p className="text-xs uppercase tracking-wider text-amber-300">
                    Location
                  </p>

                  <p className="mt-2 text-lg font-medium text-white">
                    India
                  </p>

                </div>

              </div>

              {/* CTA Buttons */}
              <div className="mt-8 flex flex-wrap gap-4">

                <a
                  href="tel:+918882235945"
                  className="rounded-full bg-gradient-to-r from-cyan-500 via-blue-500 to-emerald-500 px-7 py-3 font-medium text-white transition hover:scale-105"
                >
                  Call Now
                </a>

                <a
                  href="mailto:director@sshineindia.com"
                  className="rounded-full border border-white/10 bg-white/5 px-7 py-3 font-medium text-white backdrop-blur-xl transition hover:bg-white/10"
                >
                  Send Email
                </a>

              </div>

            </motion.div>

            {/* RIGHT SIDE */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              whileHover={{
                rotateY: 4,
                rotateX: -2,
                scale: 1.02
              }}
              style={{
                perspective: 1200
              }}
              className="relative"
            >

              {/* Glow */}
              <div className="absolute -inset-6 rounded-[40px] bg-gradient-to-r from-cyan-500/20 via-emerald-500/10 to-amber-500/20 blur-3xl" />

              <div
                className="relative overflow-hidden rounded-[36px] border border-white/10 bg-white/[0.04] shadow-[0_30px_90px_rgba(0,0,0,0.45)] backdrop-blur-3xl"
                style={{
                  transformStyle: "preserve-3d"
                }}
              >

                <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-cyan-400 via-emerald-400 to-amber-400" />

                <div className="relative h-[650px]">

                  <Image
                    src="/carousel/leader.jpeg"
                    alt="Dr. Amit Kumar Contact"
                    fill
                    className="object-cover object-center"
                    sizes="(max-width:1024px)100vw,50vw"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

                  {/* Content Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-8">

                    <span className="inline-flex rounded-full border border-emerald-400/20 bg-emerald-500/10 px-4 py-2 text-sm text-emerald-300 backdrop-blur-xl">
                      Available for Consulting
                    </span>

                    <h3 className="mt-5 text-3xl font-bold text-white">
                      Driving Innovation Through Leadership
                    </h3>

                    <p className="mt-3 max-w-lg leading-7 text-slate-300">
                      Partnering with industries, enterprises, MSMEs,
                      and organizations to create sustainable growth,
                      innovation, and long-term impact.
                    </p>

                  </div>

                </div>

              </div>

            </motion.div>

          </div>

        </section>
      </main>

      <footer className="border-t border-white/10 py-10">
        <div className="mx-auto flex w-[min(1120px,92%)] flex-wrap items-center justify-between gap-4 text-sm text-slate-400">
          <p className="font-semibold text-white">Dr. Amit Kumar</p>
          <div className="flex flex-wrap gap-4">
            <a href="#about" className="hover:text-[var(--color-primary)]">About</a>
            <a href="#expertise" className="hover:text-[var(--color-primary)]">Expertise</a>
            <a href="#projects" className="hover:text-[var(--color-primary)]">Projects</a>
            <a href="#contact" className="hover:text-[var(--color-primary)]">Contact</a>
          </div>
          <p>© {new Date().getFullYear()} Dr. Amit Kumar. All rights reserved.</p>
        </div>
      </footer>

      <AnimatePresence>
        {activeProject && (
          <motion.div
            className="fixed inset-0 z-50 grid place-items-center bg-black/70 p-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveProject(null)}
          >
            <motion.div
              ref={modalRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-title"
              tabIndex={-1}
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 25 }}
              className="glass-card w-full max-w-2xl p-8 focus-visible:outline-none"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Top accent */}
              <div className="absolute inset-x-0 top-0 h-[2px] rounded-t-[inherit] bg-gradient-to-r from-cyan-400 via-blue-400 to-emerald-400" />
      
              {/* Category */}
              <p className="text-xs uppercase tracking-[0.16em] text-[var(--color-accent)]">
                {activeProject.category}
              </p>
      
              {/* Title */}
              <h3
                id="modal-title"
                className="mt-2 text-2xl font-semibold text-white"
              >
                {activeProject.title}
              </h3>
      
              {/* Description */}
              <p className="mt-4 text-slate-300">
                {activeProject.description}
              </p>
      
              {/* Impact */}
              <p className="mt-4 text-[var(--color-primary)]">
                <span className="font-semibold">Impact:</span>{" "}
                {activeProject.impact}
              </p>
      
              {/* Buttons */}
              <div className="mt-8 flex items-center justify-between">
                {/* Close */}
                <button
                  onClick={() => setActiveProject(null)}
                  className="btn-primary"
                >
                  Close
                </button>
      
                {/* View — opens gallery */}
                <button
                  onClick={() => {
                    setGalleryProject(activeProject);
                    setActiveProject(null);
                  }}
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-500 via-blue-500 to-emerald-500 px-6 py-2.5 text-sm font-semibold text-white transition hover:scale-105"
                >
                  View Project
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* ── Gallery Popup ── */}
      <AnimatePresence>
        {galleryProject && (
            <GalleryPopup
            projectSlug={galleryProject.slug}
            projectTitle={galleryProject.title}
            totalImages={10}
            onClose={() => setGalleryProject(null)}
          />
        )}
      </AnimatePresence>

    </div>
  );
}