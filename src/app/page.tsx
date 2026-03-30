"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import dynamic from "next/dynamic";
import {
  motion,
  AnimatePresence,
  useInView,
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
  GraduationCap,
  Sparkles,
  Phone,
  Mail,
  MapPin,
  Linkedin,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import {
  achievements,
  counters,
  expertise,
  insights,
  logos,
  projects,
  stats,
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

function AnimatedCounter({ end, label, suffix = "" }: { end: number; label: string; suffix?: string }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const duration = 1200;
    const stepTime = 16;
    const steps = Math.max(1, Math.floor(duration / stepTime));
    let current = 0;
    const increment = end / steps;
    const id = setInterval(() => {
      current += increment;
      if (current >= end) {
        setCount(end);
        clearInterval(id);
      } else {
        setCount(Math.floor(current));
      }
    }, stepTime);
    return () => clearInterval(id);
  }, [end, inView]);

  return (
    <div ref={ref} className="glass-card p-5 text-center">
      <p className="text-3xl font-semibold text-[var(--color-primary)]">{count}{suffix}</p>
      <p className="mt-2 text-sm text-slate-300">{label}</p>
    </div>
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
  const [activeTimeline, setActiveTimeline] = useState(0);
  const [activeProject, setActiveProject] = useState<ProjectItem | null>(null);
  const [testimonialIndex, setTestimonialIndex] = useState(0);

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
        <section className="relative mx-auto grid w-[min(1120px,92%)] grid-cols-1 items-center gap-12 py-20 lg:grid-cols-2">
          <motion.div variants={fadeUp} initial="hidden" animate="show">
            <p className="mb-3 text-sm uppercase tracking-[0.2em] text-[var(--color-accent)]">Leadership. Innovation. Sustainability.</p>
            <h1 className="font-space text-5xl font-bold leading-tight md:text-7xl">Dr. Amit Kumar</h1>
            <div className="mt-6 space-y-2 text-lg text-slate-200">
              <p>- Purpose Driven Entrepreneur</p>
              <p>- EV Infrastructure Leader</p>
              <p>- Quality Counselling of India</p>
              <p>- MSME Consultant (ZED & LEAN) - Ministry of MSME, Govt. of India</p>
            </div>
            <p className="mt-7 max-w-xl text-slate-300">
              Leading India&apos;s transition toward sustainable mobility, MSME transformation, and innovation-driven infrastructure.
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <a href="#projects" className="btn-primary">View Portfolio</a>
              <a href="https://www.linkedin.com" target="_blank" rel="noreferrer" className="btn-ghost">
                Connect on LinkedIn <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </motion.div>

          <motion.div style={{ y: heroY }} className="relative">
            <div className="absolute -inset-8 -z-10 rounded-[2.5rem] bg-[radial-gradient(circle_at_50%_50%,rgba(0,255,157,0.28),rgba(58,141,255,0.18),transparent_70%)] blur-2xl" />
            <div className="hero-orb group mx-auto h-[420px] w-[min(420px,92vw)]">
              <div className="absolute inset-0">
                <Image
                  src="/carousel/12.jpeg"
                  alt="Dr. Amit Kumar"
                  fill
                  className="object-cover object-center transition-opacity duration-500 group-hover:opacity-0 -rotate-90"
                  sizes="(max-width: 768px) 92vw, 420px"
                  priority
                />
                <Image
                  src="/profile.jpeg"
                  alt="Dr. Amit Kumar Profile"
                  fill
                  className="object-cover object-center opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  sizes="(max-width: 768px) 92vw, 420px"
                />
              </div>
            </div>
          </motion.div>
        </section>

        <section className="mx-auto w-[min(1120px,92%)] py-20" id="about">
          <motion.div className="grid gap-10 lg:grid-cols-2" variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <div className="relative">
              <div className="absolute -inset-8 -z-10 rounded-[2rem] bg-[radial-gradient(circle_at_40%_40%,rgba(0,255,157,0.24),rgba(58,141,255,0.14),transparent_72%)] blur-2xl" />
              <div className="glass-card relative min-h-80 overflow-hidden p-0">
              <div className="absolute -right-12 -top-10 h-40 w-40 rounded-full bg-[rgba(58,141,255,0.35)] blur-2xl" />
                <div className="relative h-full min-h-80 overflow-hidden rounded-[1.1rem]">
                  <Image
                    src="/About.jpeg"
                    alt="Dr. Amit Kumar Portrait"
                    fill
                    className="object-cover object-center"
                    sizes="(max-width: 1024px) 100vw, 40vw"
                  />
                </div>
            </div>
            </div>
            <div>
              <h2 className="section-title">About Dr. Amit Kumar</h2>
              <p className="section-copy mt-5">
                Founder & Managing Director of Sun&apos;s Shine India, Founder & CMD of Anify Innovations, National Secretary of Swachh Samaaj Abhiyan, and Government empanelled Lean & ZED Consultant under the MSME Ministry.
              </p>
              <div className="mt-6 grid gap-3 text-sm text-slate-300 sm:grid-cols-2">
                <p>- MSME development</p>
                <p>- EV charging infrastructure</p>
                <p>- Sustainability transformation</p>
                <p>- Industry consulting</p>
              </div>
              <div className="mt-7 grid gap-4 sm:grid-cols-2">
                {stats.map((s) => (
                  <AnimatedCounter key={s.label} end={s.value} suffix={s.suffix} label={s.label} />
                ))}
              </div>
            </div>
          </motion.div>
        </section>

        <section className="mx-auto w-[min(1120px,92%)] py-20" id="expertise">
          <h2 className="section-title">Expertise</h2>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {expertise.map((item, i) => (
              <motion.article
                key={item}
                className="glass-card expertise-card p-6"
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08, duration: 0.45 }}
                viewport={{ once: true }}
                whileHover={{ y: -6, rotateX: 4, rotateY: -4 }}
              >
                <Sparkles className="mb-4 h-6 w-6 text-[var(--color-primary)]" />
                <p className="text-lg font-medium">{item}</p>
              </motion.article>
            ))}
          </div>
        </section>

        <section className="mx-auto w-[min(1120px,92%)] py-20" id="timeline">
          <h2 className="section-title">Experience Timeline</h2>
          <div className="mt-8 flex items-center gap-3">
            <button
              type="button"
              aria-label="Previous timeline item"
              onClick={() =>
                setActiveTimeline((prev) => (prev - 1 + timeline.length) % timeline.length)
              }
              className="rounded-full border border-white/20 p-3 transition hover:border-[var(--color-primary)]"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <AnimatePresence mode="wait">
              <motion.article
                key={activeTimeline}
                initial={{ opacity: 0, x: 26 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -26 }}
                transition={{ duration: 0.35 }}
                className="glass-card min-h-[280px] w-full flex-1 p-7 md:min-h-[320px]"
              >
                <p className="text-xs uppercase tracking-[0.16em] text-[var(--color-accent)]">
                  {timeline[activeTimeline].period}
                </p>
                <p className="mt-3 text-2xl font-semibold">{timeline[activeTimeline].org}</p>
                <p className="mt-2 text-base text-slate-200">{timeline[activeTimeline].role}</p>
                <p className="mt-5 text-base leading-7 text-slate-300">
                  {timeline[activeTimeline].details}
                </p>
              </motion.article>
            </AnimatePresence>

            <button
              type="button"
              aria-label="Next timeline item"
              onClick={() =>
                setActiveTimeline((prev) => (prev + 1) % timeline.length)
              }
              className="rounded-full border border-white/20 p-3 transition hover:border-[var(--color-primary)]"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </section>

        <section className="mx-auto w-[min(1120px,92%)] py-20">
          <h2 className="section-title">Achievements & Awards</h2>
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {achievements.map((a, i) => (
              <motion.div
                key={a}
                className="glass-card p-6"
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <p className="text-lg font-medium text-white">{a}</p>
              </motion.div>
            ))}
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {counters.map((c) => (
              <AnimatedCounter key={c.label} end={c.value} suffix={c.suffix} label={c.label} />
            ))}
          </div>
        </section>

        <section className="mx-auto w-[min(1120px,92%)] py-20">
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <h2 className="section-title">Impact & Vision</h2>
              <h3 className="mt-6 text-lg font-semibold text-[var(--color-primary)]">Mission</h3>
              <p className="section-copy mt-2">
                To empower MSMEs with sustainable technology and accelerate India&apos;s transition to clean mobility.
              </p>
              <h3 className="mt-5 text-lg font-semibold text-[var(--color-primary)]">Vision</h3>
              <p className="section-copy mt-2">
                A future where sustainable industry and electric mobility are accessible across India.
              </p>
            </div>
            <div>
              <h3 className="mb-4 text-sm uppercase tracking-[0.16em] text-[var(--color-accent)]">EV Ecosystem</h3>
              <EVEcosystem />
            </div>
          </div>
        </section>

        <section className="mx-auto w-[min(1120px,92%)] py-20" id="projects">
          <h2 className="section-title">Projects & Work Showcase</h2>
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {projects.map((project, i) => (
              <motion.button
                key={project.title}
                type="button"
                className="glass-card group p-6 text-left"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: i * 0.08 }}
                viewport={{ once: true }}
                onClick={() => setActiveProject(project)}
              >
                <p className="text-xs uppercase tracking-[0.16em] text-[var(--color-accent)]">{project.category}</p>
                <p className="mt-3 text-xl font-semibold">{project.title}</p>
                <p className="mt-3 text-sm text-slate-300">{project.description}</p>
                <p className="mt-4 inline-flex items-center gap-2 text-sm text-[var(--color-primary)]">
                  Open details <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </p>
              </motion.button>
            ))}
          </div>
        </section>

        <section className="mx-auto w-[min(1120px,92%)] py-20">
          <h2 className="section-title">Thought Leadership</h2>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {insights.map((topic) => (
              <article key={topic} className="glass-card p-5">
                <p className="text-xs uppercase tracking-[0.16em] text-[var(--color-accent)]">Insight</p>
                <h3 className="mt-2 text-lg font-medium">{topic}</h3>
              </article>
            ))}
          </div>
        </section>

        <HallOfExcellence />

        <section className="mx-auto w-[min(1120px,92%)] py-20">
          <h2 className="section-title">Social Impact</h2>
          <p className="section-copy mt-4 max-w-2xl">
            Swachh Samaaj Abhiyan: Creating a strong, equal, and sustainable society through awareness, innovation, and community leadership.
          </p>
          <div className="mt-8 grid gap-5 sm:grid-cols-3">
            <div className="glass-card p-6 text-center"><GraduationCap className="mx-auto h-7 w-7 text-[var(--color-primary)]" /><p className="mt-3">Education</p></div>
            <div className="glass-card p-6 text-center"><Leaf className="mx-auto h-7 w-7 text-[var(--color-primary)]" /><p className="mt-3">Sustainability</p></div>
            <div className="glass-card p-6 text-center"><Building2 className="mx-auto h-7 w-7 text-[var(--color-primary)]" /><p className="mt-3">Community</p></div>
          </div>
        </section>

        <section className="mx-auto w-[min(1120px,92%)] py-20">
          <h2 className="section-title">Testimonials</h2>
          <div className="mt-8 glass-card p-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={testimonialIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.35 }}
              >
                <p className="text-lg text-slate-200">&ldquo;{testimonials[testimonialIndex].text}&rdquo;</p>
                <p className="mt-5 text-sm uppercase tracking-[0.15em] text-[var(--color-accent)]">{testimonials[testimonialIndex].name}</p>
              </motion.div>
            </AnimatePresence>
            <div className="mt-6 flex gap-3">
              <button
                onClick={() => setTestimonialIndex((testimonialIndex - 1 + testimonials.length) % testimonials.length)}
                className="rounded-full border border-white/20 p-2 transition hover:border-[var(--color-primary)]"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                onClick={() => setTestimonialIndex((testimonialIndex + 1) % testimonials.length)}
                className="rounded-full border border-white/20 p-2 transition hover:border-[var(--color-primary)]"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </section>

        <section className="mx-auto w-[min(1120px,92%)] py-20">
          <h2 className="section-title">Featured Associations</h2>
          <div className="mt-8 flex flex-wrap gap-3">
            {logos.map((logo) => (
              <div key={logo} className="glass-card px-5 py-3 text-sm text-slate-100">
                {logo}
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto w-[min(1120px,92%)] py-20" id="contact">
          <h2 className="section-title">Contact</h2>
          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            <div className="glass-card p-8">
              <p className="text-xl font-semibold">Let&apos;s collaborate to build a sustainable future.</p>
              <div className="mt-7 grid gap-3 text-slate-200">
                <div className="glass-card flex items-start gap-3 p-4">
                  <Phone className="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-primary)]" />
                  <a href="tel:+919205349739" className="text-sm leading-6 transition hover:text-[var(--color-primary)] md:text-base">
                    +91 9205349739
                  </a>
                </div>
                <div className="glass-card flex items-start gap-3 p-4">
                  <Mail className="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-primary)]" />
                  <a
                    href="mailto:dr.mit2022@gmail.com"
                    className="break-all text-sm leading-6 transition hover:text-[var(--color-primary)] md:text-base"
                  >
                    dr.mit2022@gmail.com
                  </a>
                </div>
                <div className="glass-card flex items-start gap-3 p-4">
                  <Linkedin className="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-primary)]" />
                  <a
                    href="https://www.linkedin.com/in/dr-amit-kumar"
                    target="_blank"
                    rel="noreferrer"
                    className="break-all text-sm leading-6 transition hover:text-[var(--color-primary)] md:text-base"
                  >
                    linkedin.com/in/dr-amit-kumar
                  </a>
                </div>
                <div className="glass-card flex items-start gap-3 p-4">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-primary)]" />
                  <p className="text-sm leading-6 md:text-base">India</p>
                </div>
              </div>
            </div>
            <div className="glass-card relative min-h-[360px] overflow-hidden">
              <Image
                src="/carousel/15.jpeg"
                alt="Dr. Amit Kumar Contact"
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
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
            className="fixed inset-0 z-50 grid place-items-center bg-black/70 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveProject(null)}
          >
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 25 }}
              className="glass-card w-full max-w-2xl p-8"
              onClick={(e) => e.stopPropagation()}
            >
              <p className="text-xs uppercase tracking-[0.16em] text-[var(--color-accent)]">{activeProject.category}</p>
              <h3 className="mt-2 text-2xl font-semibold">{activeProject.title}</h3>
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
