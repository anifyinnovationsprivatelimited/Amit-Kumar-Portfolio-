import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion, type PanInfo } from "framer-motion";

import { hallLeaderProfiles } from "@/data/content";

export function HallOfExcellence() {
  const [centerIndex, setCenterIndex] = useState(0);

  const [isPaused, setIsPaused] = useState(false);

  const total = hallLeaderProfiles.length;
  const leftIndex = (centerIndex - 1 + total) % total;
  const rightIndex = (centerIndex + 1) % total;


  const goNext = useCallback(() => {

    setCenterIndex((prev) => (prev + 1) % total);
  }, [total]);

  const goPrev = useCallback(() => {

    setCenterIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  useEffect(() => {
    if (isPaused) return;
    const id = setInterval(goNext, 2000);
    return () => clearInterval(id);
  }, [goNext, isPaused]);

  const onDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (info.offset.x <= -60) {
      goNext();
      return;
    }

    if (info.offset.x >= 60) {
      goPrev();
    }
  };

  return (
    <section
      className="w-full py-14"
      aria-roledescription="carousel"
      aria-label="Hall of Excellence Leaders Slider"
    >
      {/* Header */}
      <div className="mx-auto max-w-4xl px-4 text-center">
        <h2 className="text-5xl font-black leading-tight tracking-tight text-white md:text-6xl lg:text-7xl">
          Hall of{" "}
          <span className="bg-gradient-to-r from-cyan-300 via-sky-400 to-blue-500 bg-clip-text text-transparent">
            Excellence
          </span>
        </h2>

        <p className="mx-auto mt-6 max-w-3xl text-base leading-relaxed text-slate-300 md:text-lg">
          A tribute to the visionaries, innovators, and leaders who inspire progress and shape the future of
          technology and infrastructure.
        </p>
      </div>

      {/* Stage — full width, no border, no rounded corners, no max-width cap */}
      <motion.div
        className="relative mt-12 w-full overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-black"
        style={{ height: "clamp(22rem, 55vw, 32rem)" }}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setIsPaused(false)}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.08}
        onDragEnd={onDragEnd}
      >
        {/* Background Glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute left-1/2 top-0 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-cyan-500/20 blur-[180px]" />
          <div className="absolute bottom-0 left-0 h-[350px] w-[350px] rounded-full bg-blue-600/15 blur-[160px]" />
          <div className="absolute right-0 top-0 h-[350px] w-[350px] rounded-full bg-purple-600/15 blur-[160px]" />
        </div>

        {/* Gold Spotlight */}
        <div className="pointer-events-none absolute left-1/2 top-0 h-full w-[400px] -translate-x-1/2 bg-gradient-to-b from-yellow-400/10 via-transparent to-transparent blur-3xl" />

        <div
          className="relative h-full w-full"
          style={{ perspective: "2200px" }}
        >
          {/* ── Desktop: 3 cards ── */}
          <div className="absolute inset-0 hidden sm:block">
            <AnimatePresence initial={false} mode="popLayout">
              {[leftIndex, centerIndex, rightIndex].map((imageIndex, slotIndex) => {
                const card = hallLeaderProfiles[imageIndex];
                const slot = (["left", "center", "right"] as const)[slotIndex];


                const position =
                  slot === "left"
                    ? { x: "-115%", rotateY: 38,  scale: 0.82, zIndex: 5,  opacity: 0.6 }
                    : slot === "right"
                    ? { x: "115%",  rotateY: -38, scale: 0.82, zIndex: 5,  opacity: 0.6 }
                    : { x: "0%",    rotateY: 0,   scale: 1.06, zIndex: 20, opacity: 1   };

                return (
                  <motion.figure
                    key={`${card.image}-${imageIndex}`}
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={{
                      x: position.x,
                      rotateY: position.rotateY,
                      scale: position.scale,
                      opacity: position.opacity,
                      zIndex: position.zIndex,
                    }}
                    exit={{ opacity: 0, scale: 0.85 }}
                    transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                    className="group absolute left-1/2 top-1/2 h-[88%] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-[32px]"
                    style={{
                      width: "clamp(200px, 30vw, 380px)",
                      transformStyle: "preserve-3d",
                    }}
                  >
                    {/* Card Glow */}
                    <div className="absolute inset-0 rounded-[32px] bg-gradient-to-br from-cyan-400/20 via-blue-500/10 to-purple-500/20 blur-xl" />

                    {/* Main Card */}
                    <div className="relative h-full overflow-hidden rounded-[32px] border border-white/15 bg-white/5 backdrop-blur-xl">
                      <Image
                        src={card.image}
                        alt={`${card.name} - ${card.role}`}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        sizes="(max-width: 640px) 0vw, 30vw"
                      />

                      {/* Shine Effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
                    </div>

                    {/* Reflection */}
                    <div className="absolute -bottom-16 left-0 h-20 w-full bg-gradient-to-b from-white/10 to-transparent blur-xl opacity-40" />
                  </motion.figure>
                );
              })}
            </AnimatePresence>
          </div>

          {/* ── Mobile: single card ── */}
          <div className="absolute inset-0 sm:hidden">
            <AnimatePresence mode="wait">
              <motion.figure
                key={`${hallLeaderProfiles[centerIndex].image}-${centerIndex}`}
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{ duration: 0.8 }}
                className="absolute inset-4 overflow-hidden rounded-[28px] border border-white/15 bg-white/5 backdrop-blur-xl"
              >
                <Image
                  src={hallLeaderProfiles[centerIndex].image}
                  alt={`${hallLeaderProfiles[centerIndex].name} - ${hallLeaderProfiles[centerIndex].role}`}
                  fill
                  className="object-cover"
                  sizes="92vw"
                />


              </motion.figure>
            </AnimatePresence>
          </div>

          {/* ── Navigation Buttons ── */}
          <button
            onClick={goPrev}
            className="absolute left-[clamp(8px,2vw,20px)] top-1/2 z-50 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-black/40 text-white backdrop-blur-md transition hover:scale-110"
            aria-label="Previous slide"
          >
            ←
          </button>

          <button
            onClick={goNext}
            className="absolute right-[clamp(8px,2vw,20px)] top-1/2 z-50 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-black/40 text-white backdrop-blur-md transition hover:scale-110"
            aria-label="Next slide"
          >
            →
          </button>
        </div>
      </motion.div>
    </section>
  );
}