import React, { useState, useEffect, useRef } from "react";

// Auto-import all images from src/assets/photos
const images = import.meta.glob("../assets/photos/*.{jpg,png,jpeg}", { eager: true, import: 'default' });
const photoUrls = Object.values(images) as string[];

const SLIDE_DURATION = 400; // ms
const AUTOPLAY_INTERVAL = 5000; // ms

// Helper to chunk array into groups
function chunkArray<T>(arr: T[], size: number): T[][] {
  const res: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    res.push(arr.slice(i, i + size));
  }
  return res;
}

function getChunkSize(width: number) {
  if (width >= 1536) return 5; // 2xl
  if (width >= 1280) return 4; // xl
  if (width >= 1024) return 3; // lg
  if (width >= 768) return 2;  // md
  return 1; // sm
}

// Helper to chunk array into groups, repeating images for the last slide if needed
function getSlidesWithRepeat(arr: string[], size: number): string[][] {
  const slides: string[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    let chunk = arr.slice(i, i + size);
    if (chunk.length < size) {
      // Repeat images from the start to fill the last slide
      const needed = size - chunk.length;
      chunk = chunk.concat(arr.slice(0, needed));
    }
    slides.push(chunk);
  }
  return slides;
}

const PhotoCarousel: React.FC = () => {
  const [current, setCurrent] = useState(0); // index of the current slide (group)
  const [prevIndex, setPrevIndex] = useState<number | null>(null);
  const [direction, setDirection] = useState<'left' | 'right' | null>(null);
  const [isSliding, setIsSliding] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [chunkSize, setChunkSize] = useState(getChunkSize(window.innerWidth));
  const autoplayRef = useRef<NodeJS.Timeout | null>(null);
  const pauseTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Responsive: dynamic chunk size
  useEffect(() => {
    const checkSize = () => setChunkSize(getChunkSize(window.innerWidth));
    checkSize();
    window.addEventListener('resize', checkSize);
    return () => window.removeEventListener('resize', checkSize);
  }, []);

  const slides = getSlidesWithRepeat(photoUrls, chunkSize);
  const total = slides.length;

  // If chunk size changes, reset to first slide
  useEffect(() => {
    setCurrent(0);
  }, [chunkSize]);

  const goTo = (idx: number, dir: 'left' | 'right') => {
    if (isSliding || idx === current) return;
    setPrevIndex(current);
    setDirection(dir);
    setIsSliding(true);
    setIsPaused(true); // Pause autoplay on user interaction
    if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current);
    pauseTimeoutRef.current = setTimeout(() => setIsPaused(false), AUTOPLAY_INTERVAL * 2);
    setTimeout(() => {
      setCurrent(idx);
      setIsSliding(false);
      setPrevIndex(null);
      setDirection(null);
    }, SLIDE_DURATION);
  };

  const next = React.useCallback(() => goTo((current === slides.length - 1 ? 0 : current + 1), 'right'), [current, slides.length, isSliding]);
  const prev = React.useCallback(() => goTo((current === 0 ? slides.length - 1 : current - 1), 'left'), [current, slides.length, isSliding]);

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [prev, next]);

  // Autoplay effect
  useEffect(() => {
    if (isPaused || isSliding) return;
    autoplayRef.current = setTimeout(() => {
      next();
    }, AUTOPLAY_INTERVAL);
    return () => {
      if (autoplayRef.current) clearTimeout(autoplayRef.current);
    };
  }, [current, isPaused, isSliding, chunkSize, next]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (autoplayRef.current) clearTimeout(autoplayRef.current);
      if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current);
    };
  }, []);

  if (total === 0) return <div>No photos available.</div>;

  return (
    <section className="py-8 md:py-12 bg-gradient-to-b from-white to-slate-50">
      <div className="flex flex-col items-center">
        <div className="relative w-full max-w-6xl h-80 flex items-center justify-center">
          {/* Left Arrow */}
          {total > 1 && (
            <button
              onClick={prev}
              className="absolute left-0 z-10 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-primary hover:text-white transition rounded-full shadow-lg p-3 text-2xl"
              aria-label="Previous photo"
              disabled={isSliding}
            >
              &#8592;
            </button>
          )}
          {/* Slide Container */}
          <div className="w-full h-full flex items-center justify-center overflow-hidden rounded-2xl shadow-xl bg-white relative">
            {/* Previous Slide (for sliding out) */}
            {isSliding && prevIndex !== null && (
              <div
                className="absolute top-0 left-0 w-full h-full flex gap-4 px-2 md:px-6 transition-transform duration-400 justify-center"
                style={{
                  zIndex: 1,
                  animation: direction === 'left'
                    ? 'slideOutLeft 0.4s forwards'
                    : 'slideOutRight 0.4s forwards',
                }}
              >
                {slides[prevIndex].map((url, i) => (
                  <img
                    key={url}
                    src={url}
                    alt={`Aama Daycare photo ${prevIndex * chunkSize + i + 1}`}
                    className="object-cover w-full h-full rounded-xl shadow"
                    style={{ flex: 1 }}
                  />
                ))}
              </div>
            )}
            {/* Current Slide (for sliding in) */}
            <div
              className={`absolute top-0 left-0 w-full h-full flex gap-4 px-2 md:px-6 transition-transform duration-400 ${current === slides.length - 1 && slides[current].length < chunkSize ? 'justify-center' : ''}`}
              style={{
                zIndex: 2,
                animation: isSliding
                  ? direction === 'left'
                    ? 'slideInLeft 0.4s forwards'
                    : 'slideInRight 0.4s forwards'
                  : undefined,
              }}
            >
              {slides[current].map((url, i) => (
                <img
                  key={url}
                  src={url}
                  alt={`Aama Daycare photo ${current * chunkSize + i + 1}`}
                  className="object-cover w-full h-full rounded-xl shadow"
                  style={{ flex: 1 }}
                />
              ))}
            </div>
            {/* Caption */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 text-white text-sm px-4 py-1 rounded-full shadow">
              {slides[current].length > 1
                ? `Photos ${current * chunkSize + 1} - ${current * chunkSize + slides[current].length} of ${photoUrls.length}`
                : `Photo ${current * chunkSize + 1} of ${photoUrls.length}`}
            </div>
          </div>
          {/* Right Arrow */}
          {total > 1 && (
            <button
              onClick={next}
              className="absolute right-0 z-10 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-primary hover:text-white transition rounded-full shadow-lg p-3 text-2xl"
              aria-label="Next photo"
              disabled={isSliding}
            >
              &#8594;
            </button>
          )}
        </div>
        {/* Dots */}
        <div className="flex gap-2 mt-4">
          {slides.map((_, idx) => (
            <button
              key={idx}
              className={`w-3 h-3 rounded-full border-2 ${idx === current ? "bg-primary border-primary" : "bg-white border-muted-foreground"}`}
              onClick={() => goTo(idx, idx > current ? 'right' : 'left')}
              aria-label={`Go to photo group ${idx + 1}`}
              disabled={isSliding}
            />
          ))}
        </div>
      </div>
      {/* CSS Keyframes for sliding */}
      <style>{`
        @keyframes slideInLeft {
          from { transform: translateX(-100%); }
          to { transform: translateX(0); }
        }
        @keyframes slideOutLeft {
          from { transform: translateX(0); }
          to { transform: translateX(100%); }
        }
        @keyframes slideInRight {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
        @keyframes slideOutRight {
          from { transform: translateX(0); }
          to { transform: translateX(-100%); }
        }
      `}</style>
    </section>
  );
};

export default PhotoCarousel;
