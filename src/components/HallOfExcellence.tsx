import Image from "next/image";
import { useCallback, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, type PanInfo } from "framer-motion";

import { hallLeaderDetails, hallOfExcellenceImages } from "@/data/content";

export function HallOfExcellence() {
  const images = useMemo(
    () =>
      hallOfExcellenceImages.map((src, index) => ({
        src,
        ...hallLeaderDetails[index % hallLeaderDetails.length],
      })),
    [],
  );

  const [centerIndex, setCenterIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [isPaused, setIsPaused] = useState(false);

  const total = images.length;
  const leftIndex = (centerIndex - 1 + total) % total;
  const rightIndex = (centerIndex + 1) % total;

  const goNext = useCallback(() => {
    setDirection(1);
    setCenterIndex((prev) => (prev + 1) % total);
  }, [total]);

  const goPrev = useCallback(() => {
    setDirection(-1);
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
    <section className="mx-auto w-[min(1120px,92%)] py-14">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="section-title">Hall of Excellence</h2>
        <p className="section-copy mt-4 text-base md:text-lg">
          A tribute to the visionaries, innovators, and leaders who inspire progress and shape the future of
          technology and infrastructure.
        </p>
      </div>

      <motion.div
        className="glass-card mx-auto mt-10 h-[22rem] w-full max-w-[920px] overflow-hidden p-2 sm:h-[24rem]"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setIsPaused(false)}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.08}
        onDragEnd={onDragEnd}
      >
        <div className="relative h-full w-full">
          <div className="absolute inset-0 hidden sm:block">
            <AnimatePresence initial={false} mode="popLayout">
              {[leftIndex, centerIndex, rightIndex].map((imageIndex, slotIndex) => {
                const card = images[imageIndex];
                const slot = (["left", "center", "right"] as const)[slotIndex];
                const isCenter = slot === "center";

                const initialX = slot === "center" ? (direction === 1 ? "28%" : "-28%") : slot === "left" ? "-38%" : "38%";
                const animateX = slot === "center" ? "0%" : slot === "left" ? "-31%" : "31%";
                const exitX = slot === "center" ? (direction === 1 ? "-28%" : "28%") : slot === "left" ? "-42%" : "42%";

                return (
                  <motion.figure
                    key={`${card.src}-${imageIndex}`}
                    initial={{ x: initialX, opacity: 0, scale: 0.92 }}
                    animate={{
                      x: animateX,
                      scale: isCenter ? 1.1 : 0.9,
                      opacity: isCenter ? 1 : 0.6,
                      filter: isCenter ? "brightness(1)" : "brightness(0.75)",
                      zIndex: isCenter ? 10 : 5,
                    }}
                    exit={{ x: exitX, opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className={`group absolute left-1/2 top-1/2 h-[84%] w-[31%] min-w-[220px] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-2xl border border-white/20 bg-[rgba(15,23,42,0.55)] object-cover shadow-[0_18px_38px_rgba(2,6,23,0.45)] transition-all duration-500 ${
                      isCenter ? "hover:scale-[1.12] hover:shadow-[0_24px_48px_rgba(2,6,23,0.55)]" : ""
                    }`}
                  >
                    <Image
                      src={card.src}
                      alt={card.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 31vw, 30vw"
                    />
                  </motion.figure>
                );
              })}
            </AnimatePresence>
          </div>

          <div className="absolute inset-0 sm:hidden">
            <AnimatePresence initial={false} mode="wait">
              <motion.figure
                key={`${images[centerIndex].src}-${centerIndex}`}
                initial={{ x: direction === 1 ? 40 : -40, opacity: 0, scale: 0.95 }}
                animate={{ x: 0, opacity: 1, scale: 1 }}
                exit={{ x: direction === 1 ? -40 : 40, opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-5 overflow-hidden rounded-2xl border border-white/20 bg-[rgba(15,23,42,0.55)] shadow-[0_18px_38px_rgba(2,6,23,0.45)]"
              >
                <Image
                  src={images[centerIndex].src}
                  alt={images[centerIndex].name}
                  fill
                  className="object-cover"
                  sizes="92vw"
                />
              </motion.figure>
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
