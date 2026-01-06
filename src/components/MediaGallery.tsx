"use client";

import Image from "next/image";
import type { MouseEvent, TouchEvent } from "react";
import { useCallback, useEffect, useRef, useState } from "react";

type MediaItem = {
  type: "image" | "video";
  src: string;
  alt?: string;
};

type MediaGalleryProps = {
  items: MediaItem[];
};

export function MediaGallery({ items }: MediaGalleryProps) {
  const [index, setIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const total = items.length;

  const openLightbox = useCallback((nextIndex: number) => {
    setIndex(nextIndex);
    setIsOpen(true);
  }, []);

  const closeLightbox = useCallback(() => {
    setIsOpen(false);
  }, []);

  const goTo = useCallback(
    (nextIndex: number) => {
      if (total === 0) return;
      const bounded = ((nextIndex % total) + total) % total;
      setIndex(bounded);
    },
    [total],
  );

  const goNext = useCallback(() => {
    goTo(index + 1);
  }, [goTo, index]);

  const goPrev = useCallback(() => {
    goTo(index - 1);
  }, [goTo, index]);

  useEffect(() => {
    setIndex(0);
    setIsOpen(false);
  }, [items]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen) {
        closeLightbox();
        return;
      }
      if (total <= 1) return;
      if (event.key === "ArrowRight") {
        goNext();
      }
      if (event.key === "ArrowLeft") {
        goPrev();
      }
    };

    if (!isOpen && total <= 1) return;
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [closeLightbox, goNext, goPrev, isOpen, total]);

  useEffect(() => {
    if (!isOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  const handleTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    touchStartX.current = event.touches[0]?.clientX ?? null;
  };

  const handleTouchEnd = (event: TouchEvent<HTMLDivElement>) => {
    if (touchStartX.current === null) return;
    const endX = event.changedTouches[0]?.clientX ?? 0;
    const deltaX = endX - touchStartX.current;
    touchStartX.current = null;

    if (Math.abs(deltaX) < 40) return;
    if (deltaX > 0) {
      goPrev();
    } else {
      goNext();
    }
  };

  const handleLightboxBackdropClick = (event: MouseEvent<HTMLDivElement>) => {
    if (event.target !== event.currentTarget) return;
    closeLightbox();
  };

  if (total === 0) return null;

  return (
    <>
      <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-950/40">
        <div
          className="relative h-[260px] w-full overflow-hidden bg-slate-50/80 sm:h-[320px] lg:h-[420px] dark:bg-slate-900/60"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          aria-label="Project media gallery"
        >
          {items.map((item, itemIndex) => {
            const isActive = itemIndex === index;
            return (
              <div
                key={`${item.type}-${item.src}`}
                aria-hidden={!isActive}
                className={`absolute inset-0 transition-opacity duration-500 ${
                  isActive ? "opacity-100" : "opacity-0 pointer-events-none"
                }`}
              >
                {item.type === "image" ? (
                  <button
                    type="button"
                    onClick={() => openLightbox(itemIndex)}
                    aria-label="Open media in lightbox"
                    className="relative h-full w-full cursor-zoom-in border-0 bg-transparent p-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/70 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-slate-950"
                  >
                    <Image
                      src={item.src}
                      alt={item.alt ?? "Project media"}
                      fill
                      sizes="(min-width: 1024px) 860px, (min-width: 768px) 90vw, 100vw"
                      className="object-contain"
                    />
                  </button>
                ) : (
                  <div className="relative h-full w-full">
                    <video
                      controls
                      playsInline
                      preload="metadata"
                      className="h-full w-full object-contain"
                    >
                      <source src={item.src} />
                    </video>
                    <button
                      type="button"
                      onClick={() => openLightbox(itemIndex)}
                      aria-label="Open media in lightbox"
                      className="absolute right-3 top-3 rounded-full border border-slate-200 bg-white/80 p-2 text-slate-700 shadow-sm transition hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/70 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-200 dark:hover:bg-slate-900 dark:focus-visible:ring-offset-slate-950"
                    >
                      <svg
                        aria-hidden="true"
                        viewBox="0 0 24 24"
                        className="h-4 w-4"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M7 17h10M7 7h10M12 7v10" />
                      </svg>
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {total > 1 && (
          <>
            <button
              type="button"
              onClick={goPrev}
              aria-label="Previous media"
              className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full border border-slate-200 bg-white/80 p-2 text-slate-700 shadow-sm transition hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/70 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-200 dark:hover:bg-slate-900 dark:focus-visible:ring-offset-slate-950"
            >
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <button
              type="button"
              onClick={goNext}
              aria-label="Next media"
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full border border-slate-200 bg-white/80 p-2 text-slate-700 shadow-sm transition hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/70 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-200 dark:hover:bg-slate-900 dark:focus-visible:ring-offset-slate-950"
            >
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M9 6l6 6-6 6" />
              </svg>
            </button>
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-2">
              {items.map((item, itemIndex) => (
                <button
                  key={`dot-${item.type}-${item.src}`}
                  type="button"
                  aria-label={`Go to item ${itemIndex + 1}`}
                  onClick={() => goTo(itemIndex)}
                  className={`h-2 w-2 rounded-full transition ${
                    itemIndex === index
                      ? "bg-slate-900 dark:bg-slate-100"
                      : "bg-slate-300/80 dark:bg-slate-700/80"
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 px-4 py-8 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label="Expanded media viewer"
          onClick={handleLightboxBackdropClick}
        >
          <div className="relative h-[80vh] w-[92vw] max-w-6xl overflow-hidden rounded-3xl border border-slate-200 bg-slate-50/90 shadow-2xl dark:border-slate-800 dark:bg-slate-950/80">
            {items.map((item, itemIndex) => {
              const isActive = itemIndex === index;
              return (
                <div
                  key={`lightbox-${item.type}-${item.src}`}
                  aria-hidden={!isActive}
                  className={`absolute inset-0 transition-opacity duration-300 ${
                    isActive ? "opacity-100" : "opacity-0 pointer-events-none"
                  }`}
                >
                  {item.type === "image" ? (
                    <div className="relative h-full w-full">
                      <Image
                        src={item.src}
                        alt={item.alt ?? "Project media"}
                        fill
                        sizes="100vw"
                        className="object-contain"
                      />
                    </div>
                  ) : (
                    <div className="flex h-full w-full items-center justify-center">
                      <video
                        controls
                        playsInline
                        preload="metadata"
                        className="h-full w-full object-contain"
                      >
                        <source src={item.src} />
                      </video>
                    </div>
                  )}
                </div>
              );
            })}

            <button
              type="button"
              onClick={closeLightbox}
              aria-label="Close lightbox"
              className="absolute right-4 top-4 rounded-full border border-slate-200 bg-white/80 p-2 text-slate-700 shadow-sm transition hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/70 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-200 dark:hover:bg-slate-900 dark:focus-visible:ring-offset-slate-950"
            >
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 6L6 18" />
                <path d="M6 6l12 12" />
              </svg>
            </button>

            {total > 1 && (
              <>
                <button
                  type="button"
                  onClick={goPrev}
                  aria-label="Previous media"
                  className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full border border-slate-200 bg-white/80 p-3 text-slate-700 shadow-sm transition hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/70 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-200 dark:hover:bg-slate-900 dark:focus-visible:ring-offset-slate-950"
                >
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M15 18l-6-6 6-6" />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={goNext}
                  aria-label="Next media"
                  className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full border border-slate-200 bg-white/80 p-3 text-slate-700 shadow-sm transition hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/70 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-200 dark:hover:bg-slate-900 dark:focus-visible:ring-offset-slate-950"
                >
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M9 6l6 6-6 6" />
                  </svg>
                </button>
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2">
                  {items.map((item, itemIndex) => (
                    <button
                      key={`lightbox-dot-${item.type}-${item.src}`}
                      type="button"
                      aria-label={`Go to item ${itemIndex + 1}`}
                      onClick={() => goTo(itemIndex)}
                      className={`h-2 w-2 rounded-full transition ${
                        itemIndex === index
                          ? "bg-slate-900 dark:bg-slate-100"
                          : "bg-slate-300/80 dark:bg-slate-700/80"
                      }`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
