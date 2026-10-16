"use client";

import Image from "next/image";
import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────

type GalleryPopupProps = {
  projectSlug: string;   // "zed" | "lean" | "ev" | "aviation"
  projectTitle: string;
  totalImages?: number;  // default 10
  onClose: () => void;
};

// ─── Helpers ─────────────────────────────────────────────────────────────────

function buildImages(slug: string, total: number) {
  return Array.from({ length: total }, (_, i) => ({
    src: `/projects/${slug}/${i + 1}.jpeg`,
    alt: `Project image ${i + 1}`,
  }));
}

// ─── Component ───────────────────────────────────────────────────────────────

export function GalleryPopup({
  projectSlug,
  projectTitle,
  totalImages = 10,
  onClose,
}: GalleryPopupProps) {
  const images = buildImages(projectSlug, totalImages);
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const thumbsRef = useRef<HTMLDivElement>(null);
  const popupRef = useRef<HTMLDivElement>(null);

  // ── navigate ──────────────────────────────────────────────────────────────
  const go = useCallback(
    (next: number) => {
      setDirection(next > active ? 1 : -1);
      setActive((next + images.length) % images.length);
    },
    [active, images.length]
  );

  const prev = useCallback(() => go(active - 1), [active, go]);
  const next = useCallback(() => go(active + 1), [active, go]);

  // ── keyboard ──────────────────────────────────────────────────────────────
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, prev, next]);

  // ── focus trap ────────────────────────────────────────────────────────────
  useEffect(() => {
    const el = popupRef.current;
    if (!el) return;
    const focusable = el.querySelectorAll<HTMLElement>(
      'button, [tabindex]:not([tabindex="-1"])'
    );
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    const trap = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      if (e.shiftKey ? document.activeElement === first : document.activeElement === last) {
        (e.shiftKey ? last : first).focus();
        e.preventDefault();
      }
    };
    el.addEventListener("keydown", trap);
    first?.focus();
    return () => el.removeEventListener("keydown", trap);
  }, []);

  // ── scroll active thumb into view ─────────────────────────────────────────
  useEffect(() => {
    const container = thumbsRef.current;
    if (!container) return;
    const thumb = container.children[active] as HTMLElement | undefined;
    thumb?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  }, [active]);

  // ── slide variants ────────────────────────────────────────────────────────
  const variants = {
    enter: (d: number) => ({ x: d * 80, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({ x: d * -80, opacity: 0 }),
  };

  return (
    <motion.div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/85 p-4 backdrop-blur-md"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      onClick={onClose}
      aria-modal="true"
      role="dialog"
      aria-label={`${projectTitle} gallery`}
    >
      {/* ── Panel ── */}
      <motion.div
        ref={popupRef}
        initial={{ scale: 0.94, opacity: 0, y: 24 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.94, opacity: 0, y: 24 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="relative flex w-full max-w-5xl flex-col overflow-hidden rounded-[32px] border border-white/10 bg-[#0b0f1a] shadow-[0_40px_120px_rgba(0,0,0,0.7)]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top accent */}
        <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-cyan-400 via-blue-400 to-emerald-400" />

        {/* ── Header ── */}
        <div className="flex items-center justify-between px-6 py-4">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-cyan-300">
              Project Gallery
            </p>
            <h3 className="mt-0.5 text-lg font-semibold text-white">
              {projectTitle}
            </h3>
          </div>

          <div className="flex items-center gap-3">
            {/* Counter */}
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-slate-400">
              {active + 1} / {images.length}
            </span>

            {/* Close */}
            <button
              onClick={onClose}
              aria-label="Close gallery"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-400 transition hover:border-red-400/40 hover:bg-red-500/10 hover:text-red-300"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* ── Main Image ── */}
        <div className="relative mx-4 overflow-hidden rounded-[20px] border border-white/10 bg-black/40">
          {/* Glow */}
          <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

          <div className="relative h-[420px] w-full sm:h-[480px]">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={active}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0"
              >
                <Image
                  src={images[active].src}
                  alt={images[active].alt}
                  fill
                  className="object-contain"
                  sizes="(max-width:768px) 100vw, 900px"
                  priority
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Prev / Next Arrows */}
          <button
            onClick={prev}
            aria-label="Previous image"
            className="absolute left-3 top-1/2 z-20 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-black/50 text-white backdrop-blur-sm transition hover:border-cyan-400/40 hover:bg-cyan-500/20"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <button
            onClick={next}
            aria-label="Next image"
            className="absolute right-3 top-1/2 z-20 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-black/50 text-white backdrop-blur-sm transition hover:border-cyan-400/40 hover:bg-cyan-500/20"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        {/* ── Dot Indicators ── */}
        <div className="flex items-center justify-center gap-1.5 py-4">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => go(i)}
              aria-label={`Go to image ${i + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === active
                  ? "w-6 bg-cyan-400"
                  : "w-1.5 bg-white/20 hover:bg-white/40"
              }`}
            />
          ))}
        </div>

        {/* ── Thumbnail Strip ── */}
        <div
          ref={thumbsRef}
          className="flex gap-3 overflow-x-auto px-4 pb-5 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/10"
          style={{ scrollbarWidth: "thin" }}
        >
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => go(i)}
              aria-label={`View image ${i + 1}`}
              className={`relative h-16 w-24 flex-shrink-0 overflow-hidden rounded-xl border-2 transition-all duration-300 ${
                i === active
                  ? "border-cyan-400 opacity-100 scale-105"
                  : "border-white/10 opacity-50 hover:opacity-80 hover:border-white/30"
              }`}
            >
              <Image
                src={img.src}
                alt={`Thumbnail ${i + 1}`}
                fill
                className="object-cover"
                sizes="96px"
              />
            </button>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}