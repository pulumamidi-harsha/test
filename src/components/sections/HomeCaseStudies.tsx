"use client";

import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type PointerEvent as ReactPointerEvent,
} from "react";
import { portfolio } from "@/config/portfolio";
import {
  getWorkShowcaseColumns,
  getWorkShowcaseMaxProjects,
} from "@/config/work-showcase";
import { cn } from "@/lib/utils";

const GAP_PX = 28;

/**
 * agr.studio-style Work strip:
 * - Rounded media cards
 * - Title always under the image; description reveals on hover (right)
 * - Horizontal scroll: drag, arrows, keyboard ←/→
 * - Columns + max count from NEXT_PUBLIC_WORK_* env
 */
export function HomeCaseStudies() {
  const columns = getWorkShowcaseColumns();
  const maxProjects = getWorkShowcaseMaxProjects();
  const projects = portfolio.slice(0, maxProjects);

  const scrollerRef = useRef<HTMLDivElement>(null);
  const [cardWidth, setCardWidth] = useState(0);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  const dragRef = useRef({
    active: false,
    moved: false,
    startX: 0,
    scrollLeft: 0,
    pointerId: -1,
  });

  const measure = useCallback(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    const styles = getComputedStyle(scroller);
    const padL = parseFloat(styles.paddingLeft) || 0;
    const padR = parseFloat(styles.paddingRight) || 0;
    const inner = scroller.clientWidth - padL - padR;
    const width = Math.max(180, (inner - GAP_PX * (columns - 1)) / columns);
    setCardWidth(width);
  }, [columns]);

  const syncArrows = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setCanPrev(el.scrollLeft > 4);
    setCanNext(el.scrollLeft < max - 4);
  }, []);

  useEffect(() => {
    measure();
    syncArrows();
    const el = scrollerRef.current;
    const ro = new ResizeObserver(() => {
      measure();
      syncArrows();
    });
    if (el) ro.observe(el);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [measure, syncArrows]);

  const scrollByCard = useCallback(
    (dir: -1 | 1) => {
      const el = scrollerRef.current;
      if (!el || cardWidth <= 0) return;
      el.scrollBy({ left: dir * (cardWidth + GAP_PX), behavior: "smooth" });
    },
    [cardWidth],
  );

  const onKeyDown = (e: KeyboardEvent<HTMLElement>) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      scrollByCard(-1);
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      scrollByCard(1);
    }
  };

  const onPointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (e.button !== 0) return;
    const el = scrollerRef.current;
    if (!el) return;
    dragRef.current = {
      active: true,
      moved: false,
      startX: e.clientX,
      scrollLeft: el.scrollLeft,
      pointerId: e.pointerId,
    };
    el.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    const d = dragRef.current;
    if (!d.active) return;
    const el = scrollerRef.current;
    if (!el) return;
    const dx = e.clientX - d.startX;
    if (Math.abs(dx) > 6) d.moved = true;
    el.scrollLeft = d.scrollLeft - dx;
  };

  const endDrag = (e: ReactPointerEvent<HTMLDivElement>) => {
    const d = dragRef.current;
    if (!d.active) return;
    d.active = false;
    const el = scrollerRef.current;
    if (el && d.pointerId === e.pointerId) {
      try {
        el.releasePointerCapture(e.pointerId);
      } catch {
        /* already released */
      }
    }
  };

  return (
    <section
      id="work"
      tabIndex={0}
      aria-labelledby="home-case-studies-title"
      onKeyDown={onKeyDown}
      className="relative scroll-mt-20 bg-bg py-16 text-text outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary sm:py-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-6">
          <div>
            <p className="text-sm text-muted">
              <span className="text-primary">[</span> Work{" "}
              <span className="text-primary">]</span>
            </p>
            <h2
              id="home-case-studies-title"
              className="mt-3 font-heading text-[clamp(2rem,4vw,3.25rem)] tracking-tight"
            >
              Selected projects
            </h2>
          </div>

          {/* Arrows with the title row (top-right) */}
          <div className="flex shrink-0 items-center gap-2 pb-1">
            <button
              type="button"
              aria-label="Previous projects"
              disabled={!canPrev}
              onClick={() => scrollByCard(-1)}
              className={cn(
                "inline-flex h-11 w-11 items-center justify-center rounded-full border border-border transition",
                canPrev
                  ? "text-text hover:border-primary hover:text-primary"
                  : "cursor-not-allowed opacity-35",
              )}
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              aria-label="Next projects"
              disabled={!canNext}
              onClick={() => scrollByCard(1)}
              className={cn(
                "inline-flex h-11 w-11 items-center justify-center rounded-full border border-border transition",
                canNext
                  ? "text-text hover:border-primary hover:text-primary"
                  : "cursor-not-allowed opacity-35",
              )}
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      <div
        ref={scrollerRef}
        onScroll={syncArrows}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        className={cn(
          "mt-10 flex touch-pan-y overflow-x-auto overflow-y-hidden px-4 pb-2 sm:px-6 lg:px-8",
          "[-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
          "cursor-grab active:cursor-grabbing",
        )}
        style={{ gap: GAP_PX }}
      >
        {projects.map((project) => (
          <Link
            key={project.id}
            href={`/work/${project.id}`}
            draggable={false}
            onClick={(e) => {
              if (dragRef.current.moved) {
                e.preventDefault();
                dragRef.current.moved = false;
              }
            }}
            className="group shrink-0"
            style={
              cardWidth > 0
                ? { width: cardWidth, minWidth: cardWidth }
                : { width: `${100 / columns}%`, minWidth: `${Math.max(40, 100 / columns)}%` }
            }
          >
            <div
              className="relative aspect-[5/4] overflow-hidden rounded-[1.35rem] sm:aspect-[4/3]"
              style={{ background: project.accent }}
            >
              <div
                aria-hidden
                className="absolute inset-0"
                style={{
                  background: `linear-gradient(145deg, ${project.accent} 0%, ${project.accent}cc 45%, rgba(0,0,0,0.2) 100%)`,
                }}
              />
              <video
                src={project.videoDesktop}
                muted
                loop
                playsInline
                autoPlay
                preload="metadata"
                draggable={false}
                className="absolute inset-0 h-full w-full object-cover opacity-80 transition duration-700 group-hover:scale-[1.03]"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
              <span
                aria-hidden
                className="absolute bottom-4 left-4 font-heading text-[clamp(2.5rem,6vw,4rem)] font-bold leading-none tracking-[-0.05em] text-white/25"
              >
                {project.title.slice(0, 1)}
              </span>
            </div>

            <div className="mt-4 flex items-baseline justify-between gap-4 px-0.5">
              <h3 className="min-w-0 truncate font-heading text-base font-semibold tracking-tight text-text sm:text-lg">
                {project.title}
              </h3>
              <p
                className={cn(
                  "max-w-[55%] shrink-0 text-right text-xs font-normal leading-snug text-muted transition duration-300 sm:text-sm",
                  "translate-x-1 opacity-0 group-hover:translate-x-0 group-hover:opacity-100",
                  "group-focus-visible:translate-x-0 group-focus-visible:opacity-100",
                )}
              >
                {project.blurb}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
