"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import dynamic from "next/dynamic";
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
  const [activeTimeline, setActiveTimeline] = useState(0);
  const [activeProject, setActiveProject] = useState<ProjectItem | null>(null);
  const [testimonialIndex, setTestimonialIndex] = useState(0);
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



      <section className="relative overflow-hidden py-16 lg:py-20">

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

        <div className="mx-auto grid min-h-[620px] w-[min(1320px,92%)] items-center gap-20 lg:grid-cols-[1.05fr_0.95fr]">

          {/* ================= LEFT CONTENT ================= */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl -mt-8"
          >

            {/* Badge */}
            <div className="inline-flex rounded-full border border-cyan-400/20 bg-cyan-400/10 px-5 py-2 text-sm font-medium text-cyan-300 backdrop-blur-xl">
              Founder • Consultant • Sustainability Leader
            </div>

            {/* Heading */}
            <h1 className="mt-8 text-4xl font-bold leading-[1.05] tracking-tight text-white md:text-5xl xl:text-[72px]">
              Dr. Amit Kumar
            </h1>

            {/* Sub Heading */}
            <h2 className="mt-4 bg-gradient-to-r from-cyan-300 via-blue-400 to-emerald-300 bg-clip-text text-xl font-medium text-transparent md:text-2xl">
Founder & Managing Director, SUN&apos;S SHINE INDIA
            </h2>

            {/* Introduction */}
            <p className="mt-8 max-w-2xl text-base leading-8 text-slate-300 md:text-lg">
              Dr. Amit Kumar is a visionary entrepreneur and sustainability leader
              driving innovation in EV infrastructure, renewable energy, MSME
              transformation, and industrial excellence across India.
            </p>

            <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300 md:text-lg">
As the Founder & Managing Director of SUN&apos;S SHINE INDIA, he has played
              a significant role in supporting businesses through quality improvement,
              sustainable growth, and national development initiatives.
            </p>

            {/* Credentials */}
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

            </div>

          </motion.div>

          {/* ================= RIGHT SIDE ================= */}
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
            className="relative mx-auto -mt-8 w-full max-w-[500px]"
          >

            {/* Glow */}
            <div className="absolute inset-0 rounded-[36px] bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-emerald-500/20 blur-[80px]" />

            {/* Profile Card */}
            <div
              className="relative overflow-hidden rounded-[36px] border border-white/10 bg-white/5 shadow-[0_20px_80px_rgba(0,0,0,0.35)] backdrop-blur-3xl"
              style={{ transformStyle: "preserve-3d" }}
            >
              <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-cyan-400 via-blue-400 to-emerald-400" />

              <div className="relative aspect-[4/5]">
                  <Image
                    src="/profile.jpeg"
                    alt="Profile"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
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

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
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

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid items-start gap-16 lg:grid-cols-[0.95fr_1.05fr]"
        >

          {/* ================= IMAGE SIDE ================= */}
          <motion.div
            whileHover={{
              rotateY: 4,
              rotateX: -2,
              scale: 1.02,
            }}
            transition={{ duration: 0.4 }}
            className="relative pt-2"
            style={{
              perspective: 1200,
            }}
          >

            {/* Main Glow */}
            <div className="absolute -inset-6 rounded-[36px] bg-gradient-to-r from-cyan-500/20 via-blue-500/10 to-emerald-500/20 blur-3xl" />

            {/* Decorative Orb */}
            <div className="absolute -left-8 top-20 h-32 w-32 rounded-full bg-cyan-500/10 blur-3xl" />

            {/* Image Card */}
            <div
              className="relative overflow-hidden rounded-[32px] border border-white/10 bg-white/5 shadow-[0_30px_80px_rgba(0,0,0,0.45)] backdrop-blur-3xl"
              style={{
                transformStyle: "preserve-3d",
              }}
            >

              <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-cyan-400 via-blue-400 to-emerald-400" />

              <div className="relative aspect-[4/5]">
                <Image
                  src="/About.jpeg"
                  alt="Dr. Amit Kumar Portrait"
                  fill
                  className="object-cover object-center"
                  sizes="(max-width:1024px)100vw,40vw"
                />
              </div>

            </div>

          </motion.div>

          {/* ================= CONTENT SIDE ================= */}
          <div className="pt-2">

            <p className="text-lg leading-8 text-slate-300">
Dr. Amit Kumar is the Founder & Managing Director of SUN&apos;S SHINE INDIA
              and Founder & CMD of Anify Innovations. As a QCI Certified ZED & LEAN
              Consultant under the Ministry of MSME, he helps industries improve
              competitiveness through quality excellence, operational efficiency,
              and sustainable growth.
            </p>

            <p className="mt-5 text-lg leading-8 text-slate-300">
              An EV Technology Expert from IIT Delhi and recipient of the National
              Excellence Award 2023, he actively contributes to EV infrastructure,
              Solar EPC solutions, Aviation Ground Lighting projects, and MSME
              transformation initiatives while serving as National Secretary of
              Swachh Samaaj Abhiyan.
            </p>

            {/* Expertise Cards */}
            <div className="mt-10 grid gap-4 sm:grid-cols-2">

              <motion.div
                whileHover={{ y: -6 }}
                className="group rounded-2xl border border-cyan-500/20 bg-white/[0.03] p-5 backdrop-blur-xl transition-all duration-300 hover:border-cyan-400/40"
              >
                <div className="mb-3 h-1 w-12 rounded-full bg-cyan-400" />
                <h4 className="font-semibold text-white">
                  ZED & LEAN Consulting
                </h4>
                <p className="mt-2 text-sm leading-6 text-slate-400">
                  Driving MSME quality excellence, waste reduction,
                  productivity enhancement, and certification readiness.
                </p>
              </motion.div>

              <motion.div
                whileHover={{ y: -6 }}
                className="group rounded-2xl border border-blue-500/20 bg-white/[0.03] p-5 backdrop-blur-xl transition-all duration-300 hover:border-blue-400/40"
              >
                <div className="mb-3 h-1 w-12 rounded-full bg-blue-400" />
                <h4 className="font-semibold text-white">
                  EV Infrastructure
                </h4>
                <p className="mt-2 text-sm leading-6 text-slate-400">
                  Supporting sustainable mobility through EV charging
                  infrastructure and clean energy solutions.
                </p>
              </motion.div>

              <motion.div
                whileHover={{ y: -6 }}
                className="group rounded-2xl border border-emerald-500/20 bg-white/[0.03] p-5 backdrop-blur-xl transition-all duration-300 hover:border-emerald-400/40"
              >
                <div className="mb-3 h-1 w-12 rounded-full bg-emerald-400" />
                <h4 className="font-semibold text-white">
                  Solar EPC Solutions
                </h4>
                <p className="mt-2 text-sm leading-6 text-slate-400">
                  Delivering renewable energy projects with a focus
                  on efficiency, sustainability, and scalability.
                </p>
              </motion.div>

              <motion.div
                whileHover={{ y: -6 }}
                className="group rounded-2xl border border-cyan-500/20 bg-white/[0.03] p-5 backdrop-blur-xl transition-all duration-300 hover:border-cyan-400/40"
              >
                <div className="mb-3 h-1 w-12 rounded-full bg-cyan-400" />
                <h4 className="font-semibold text-white">
                  Aviation Ground Lighting
                </h4>
                <p className="mt-2 text-sm leading-6 text-slate-400">
                  Specialized expertise in airport infrastructure
                  and advanced ground lighting systems.
                </p>
              </motion.div>

            </div>

          </div>

        </motion.div>

      </section>




      <section
        className="relative mx-auto w-[min(1280px,92%)] pt-6 pb-20"
        id="expertise"
      >

        {/* Background Glow */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute left-0 top-20 h-[350px] w-[350px] rounded-full bg-cyan-500/10 blur-[120px]" />
          <div className="absolute right-0 bottom-0 h-[350px] w-[350px] rounded-full bg-emerald-500/10 blur-[120px]" />
        </div>

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mx-auto max-w-3xl text-center"
        >

          <span className="inline-flex rounded-full border border-cyan-400/20 bg-cyan-400/10 px-5 py-2 text-sm font-medium text-cyan-300 backdrop-blur-xl">
            Core Expertise
          </span>

          <h2 className="mt-6 text-4xl font-bold text-white md:text-5xl">
            Areas of Professional
            <span className="block bg-gradient-to-r from-cyan-300 via-blue-400 to-emerald-300 bg-clip-text text-transparent">
              Excellence
            </span>
          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-400">
            Delivering innovation, sustainability, industrial transformation,
            and infrastructure development through years of expertise and leadership.
          </p>

        </motion.div>

        {/* Expertise Grid */}
        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">

          {[
            {
              title: "ZED & LEAN Consulting",
              description:
                "Guiding MSMEs towards operational excellence, quality improvement, and sustainable growth."
            },
            {
              title: "EV Infrastructure",
              description:
                "Driving the development of EV charging ecosystems and green mobility solutions."
            },
            {
              title: "Solar EPC Solutions",
              description:
                "Delivering renewable energy projects focused on efficiency and sustainability."
            },
            {
              title: "MSME Development",
              description:
                "Supporting enterprises with transformation, certification, and competitiveness initiatives."
            },
            {
              title: "Aviation Ground Lighting",
              description:
                "Specialized expertise in airport infrastructure and advanced lighting systems."
            },
            {
              title: "Sustainability Transformation",
              description:
                "Helping industries adopt cleaner, smarter, and future-ready operational practices."
            }
          ].map((item, i) => (
            <motion.article
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                delay: i * 0.08,
                duration: 0.5,
              }}
              viewport={{ once: true }}
              whileHover={{
                y: -8,
                rotateX: 4,
                rotateY: -4,
                scale: 1.02,
              }}
              className="group relative overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.03] p-6 backdrop-blur-2xl"
              style={{
                transformStyle: "preserve-3d",
              }}
            >

              {/* Top Accent */}
              <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-cyan-400 via-blue-400 to-emerald-400 opacity-70" />

              {/* Glow */}
              <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-cyan-500/10 blur-3xl" />
              </div>

              {/* Number */}
              <div className="mb-5 text-3xl font-bold text-cyan-400">
                0{i + 1}
              </div>

              <h3 className="text-xl font-semibold text-white">
                {item.title}
              </h3>

              <p className="mt-3 leading-7 text-slate-400">
                {item.description}
              </p>

            </motion.article>
          ))}

        </div>

      </section>




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



      <section
        className="relative mx-auto w-[min(1280px,92%)] py-20"
        id="achievements"
      >

        {/* Background Glow */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute left-0 top-0 h-[400px] w-[400px] rounded-full bg-cyan-500/10 blur-[140px]" />
          <div className="absolute right-0 bottom-0 h-[400px] w-[400px] rounded-full bg-amber-500/10 blur-[140px]" />
        </div>

        {/* Header */}
        <div className="mx-auto max-w-4xl text-center">

          <span className="inline-flex rounded-full border border-amber-400/20 bg-amber-500/10 px-5 py-2 text-sm font-medium text-amber-300">
            Recognition & Excellence
          </span>

          <h2 className="mt-5 text-4xl font-bold text-white md:text-5xl">
            Achievements &
            <span className="bg-gradient-to-r from-amber-300 via-cyan-300 to-emerald-300 bg-clip-text text-transparent">
              {" "}Awards
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-slate-400">
            Recognitions earned through leadership, innovation,
            sustainability initiatives, and industrial transformation.
          </p>

        </div>

        {/* Awards Grid */}
        <div className="mt-14 grid gap-6 md:grid-cols-2">

          {achievements.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: index * 0.1
              }}
              viewport={{ once: true }}
              whileHover={{
                y: -8,
                rotateX: 3,
                rotateY: -3,
                scale: 1.02
              }}
              className="group relative overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.03] p-7 backdrop-blur-2xl"
            >

              <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-amber-400 via-cyan-400 to-emerald-400" />

              <div className="mb-5 text-4xl font-bold text-amber-400">
                0{index + 1}
              </div>

              <h3 className="text-2xl font-semibold text-white">
                {item.title}
              </h3>

              <p className="mt-2 text-cyan-300">
                {item.category}
              </p>

              <p className="mt-5 leading-7 text-slate-300">
                {item.description}
              </p>

            </motion.div>
          ))}

        </div>

        {/* Featured Recognition */}
        <div className="mt-10 rounded-[28px] border border-amber-400/20 bg-amber-500/10 p-6 backdrop-blur-xl">

          <p className="text-sm font-medium text-amber-300">
India Manufacturing Review • December 2025
          </p>

          <p className="mt-3 text-lg text-white">
SUN&apos;S SHINE INDIA recognized among India&apos;S
            Top 10 EV Consultant Organizations.
          </p>

        </div>

      </section>


      <section
        className="relative mx-auto w-[min(1280px,92%)] py-20"
        id="impact"
      >

        {/* Background Glow */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute left-0 top-0 h-[450px] w-[450px] rounded-full bg-cyan-500/10 blur-[140px]" />
          <div className="absolute right-0 bottom-0 h-[450px] w-[450px] rounded-full bg-emerald-500/10 blur-[140px]" />
        </div>

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mx-auto max-w-4xl text-center"
        >

          <span className="inline-flex rounded-full border border-cyan-400/20 bg-cyan-500/10 px-5 py-2 text-sm font-medium text-cyan-300 backdrop-blur-xl">
            Future Impact
          </span>

          <h2 className="mt-5 text-4xl font-bold text-white md:text-5xl">
            Impact &
            <span className="bg-gradient-to-r from-cyan-300 via-blue-400 to-emerald-300 bg-clip-text text-transparent">
              {" "}Vision
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-slate-400">
            Driving sustainable transformation, MSME excellence,
            electric mobility, renewable energy adoption,
            and future-ready infrastructure across India.
          </p>

        </motion.div>

        {/* Main Layout */}
        <div className="mt-16 grid items-start gap-12 lg:grid-cols-[1fr_1.08fr]">

          {/* ================= LEFT SIDE ================= */}
          <div className="space-y-6">

            {/* Mission */}
            <motion.div
              whileHover={{
                y: -8,
                scale: 1.01,
              }}
              className="relative overflow-hidden rounded-[28px] border border-cyan-400/20 bg-white/[0.03] p-7 backdrop-blur-2xl"
            >

              <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-cyan-400 to-blue-400" />

              <h3 className="text-2xl font-semibold text-white">
                Mission
              </h3>

              <p className="mt-4 leading-8 text-slate-300">
                To empower MSMEs through innovation, quality excellence,
                sustainability practices, and advanced technologies while
accelerating India&apos;s transition toward clean mobility and
                future-ready infrastructure.
              </p>

            </motion.div>

            {/* Vision */}
            <motion.div
              whileHover={{
                y: -8,
                scale: 1.01,
              }}
              className="relative overflow-hidden rounded-[28px] border border-emerald-400/20 bg-white/[0.03] p-7 backdrop-blur-2xl"
            >

              <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-emerald-400 to-cyan-400" />

              <h3 className="text-2xl font-semibold text-white">
                Vision
              </h3>

              <p className="mt-4 leading-8 text-slate-300">
                To build a future where sustainable industry,
                electric mobility, renewable energy, and technological
                innovation become accessible across every region of India.
              </p>

            </motion.div>

            {/* Leadership Impact */}
            <motion.div
              whileHover={{
                y: -8,
                scale: 1.01,
              }}
              className="relative overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.03] p-7 backdrop-blur-2xl"
            >

              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-transparent to-emerald-500/5" />

              <h3 className="text-2xl font-semibold text-white">
                Leadership Impact
              </h3>

              <p className="mt-4 leading-8 text-slate-300">
Through SUN&apos;S SHINE INDIA, Anify Innovations,
                MSME transformation initiatives, EV infrastructure,
                sustainability programs, and industrial consulting,
                Dr. Amit Kumar continues to contribute toward
                economic growth, environmental responsibility,
                and national development.
              </p>

            </motion.div>

          </div>

          {/* ================= RIGHT SIDE ================= */}
          <motion.div
            whileHover={{
              rotateY: 2,
              rotateX: -2,
              scale: 1.01,
            }}
            transition={{ duration: 0.4 }}
            className="relative"
            style={{ perspective: 1400 }}
          >

            {/* Outer Glow */}
            <div className="absolute -inset-8 rounded-[40px] bg-gradient-to-r from-cyan-500/15 via-blue-500/10 to-emerald-500/15 blur-3xl" />

            {/* Main Card */}
            <div className="relative overflow-hidden rounded-[36px] border border-white/10 bg-white/[0.03] p-7 backdrop-blur-3xl">

              <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-cyan-400 via-blue-400 to-emerald-400" />

              <div className="mb-6">

                <span className="inline-flex rounded-full border border-cyan-400/20 bg-cyan-500/10 px-4 py-2 text-xs font-medium uppercase tracking-[0.14em] text-cyan-300">
                  Ecosystem Leadership
                </span>

                <h3 className="mt-4 text-3xl font-bold text-white">
                  Building India&apos;s
                  <span className="block bg-gradient-to-r from-cyan-300 via-blue-400 to-emerald-300 bg-clip-text text-transparent">
                    Sustainable Ecosystem
                  </span>
                </h3>

              </div>

              <div className="rounded-[24px] border border-white/10 bg-black/20 p-5">
                <EVEcosystem />
              </div>

              <div className="mt-6 grid grid-cols-2 gap-4">

                <div className="rounded-2xl border border-cyan-400/20 bg-cyan-500/5 p-4">
                  <h4 className="text-xl font-bold text-cyan-300">EV</h4>
                  <p className="mt-1 text-sm text-slate-400">
                    Charging Infrastructure
                  </p>
                </div>

                <div className="rounded-2xl border border-blue-400/20 bg-blue-500/5 p-4">
                  <h4 className="text-xl font-bold text-blue-300">MSME</h4>
                  <p className="mt-1 text-sm text-slate-400">
                    ZED & LEAN Excellence
                  </p>
                </div>

                <div className="rounded-2xl border border-emerald-400/20 bg-emerald-500/5 p-4">
                  <h4 className="text-xl font-bold text-emerald-300">Solar</h4>
                  <p className="mt-1 text-sm text-slate-400">
                    Renewable Energy
                  </p>
                </div>

                <div className="rounded-2xl border border-violet-400/20 bg-violet-500/5 p-4">
                  <h4 className="text-xl font-bold text-violet-300">ESG</h4>
                  <p className="mt-1 text-sm text-slate-400">
                    Sustainability Focus
                  </p>
                </div>

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
            Projects & Work Showcase
          </span>

          <h2 className="mt-5 text-4xl font-bold text-white md:text-5xl xl:text-6xl">
            Transforming Industries Through
            <span className="bg-gradient-to-r from-cyan-300 via-blue-400 to-emerald-300 bg-clip-text text-transparent">
              {" "}Innovation & Execution
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-400">
            A showcase of flagship initiatives spanning EV infrastructure,
            MSME transformation, LEAN implementation, renewable energy,
            and aviation infrastructure development.
          </p>

        </motion.div>

        {/* Featured Project */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          whileHover={{
            y: -6,
            scale: 1.01,
          }}
          className="group relative mt-16 overflow-hidden rounded-[36px] border border-white/10 bg-white/[0.03] p-8 backdrop-blur-3xl"
        >

          <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-cyan-400 via-blue-400 to-emerald-400" />

          <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-cyan-500/10 blur-3xl transition-all duration-700 group-hover:scale-125" />

          <div className="grid items-center gap-10 lg:grid-cols-[1.2fr_0.8fr]">

            <div>

              <span className="rounded-full border border-cyan-400/20 bg-cyan-500/10 px-4 py-2 text-sm text-cyan-300">
                Featured Project
              </span>

              <h3 className="mt-6 text-3xl font-bold text-white md:text-4xl">
                EV Charging Infrastructure
              </h3>

              <p className="mt-5 text-lg leading-8 text-slate-300">
                End-to-end EV charging infrastructure consulting,
                planning, deployment, commissioning, and operational
support helping accelerate India&apos;s transition toward
                sustainable mobility and clean transportation.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">

                <span className="rounded-full border border-cyan-400/20 bg-cyan-500/10 px-4 py-2 text-sm text-cyan-300">
                  Site Survey
                </span>

                <span className="rounded-full border border-blue-400/20 bg-blue-500/10 px-4 py-2 text-sm text-blue-300">
                  Deployment
                </span>

                <span className="rounded-full border border-emerald-400/20 bg-emerald-500/10 px-4 py-2 text-sm text-emerald-300">
                  O&M Support
                </span>

              </div>

            </div>

            <div className="flex h-full items-center justify-center rounded-[28px] border border-white/10 bg-gradient-to-br from-cyan-500/10 via-blue-500/5 to-emerald-500/10 p-10">

              <div className="text-center">
                <div className="text-7xl font-black text-cyan-300">
                  EV
                </div>

                <p className="mt-3 text-lg text-white">
                  Sustainable Mobility Infrastructure
                </p>
              </div>

            </div>

          </div>

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
                    href="tel:+919205349739"
                    className="mt-2 block text-lg font-medium text-white"
                  >
                    +91 9205349739
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
                    dr.mit2022@gmail.com
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
                  href="tel:+919205349739"
                  className="rounded-full bg-gradient-to-r from-cyan-500 via-blue-500 to-emerald-500 px-7 py-3 font-medium text-white transition hover:scale-105"
                >
                  Call Now
                </a>

                <a
                  href="mailto:dr.mit2022@gmail.com"
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
              <p className="text-xs uppercase tracking-[0.16em] text-[var(--color-accent)]">{activeProject.category}</p>
              <h3 id="modal-title" className="mt-2 text-2xl font-semibold">{activeProject.title}</h3>
              <p className="mt-4 text-slate-300">{activeProject.description}</p>
              <p className="mt-4 text-[var(--color-primary)]">Impact: {activeProject.impact}</p>
              <button onClick={() => setActiveProject(null)} className="btn-primary mt-7">Close</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
