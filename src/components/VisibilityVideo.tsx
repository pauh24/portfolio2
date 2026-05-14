import { useEffect, useMemo, useRef, useState } from "react";

type VisibilityVideoProps = {
  src: string;
  className?: string;
  poster?: string;
  priority?: boolean;
  threshold?: number;
  rootMargin?: string;
};

export function VisibilityVideo({
  src,
  className,
  poster,
  priority = false,
  threshold = 0.35,
  rootMargin = "0px",
}: VisibilityVideoProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [shouldLoad, setShouldLoad] = useState<boolean>(priority);
  const [isInView, setIsInView] = useState<boolean>(priority);

  const prefersReducedMotion = useMemo(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const nextInView = entry.isIntersecting;
        setIsInView(nextInView);
        if (nextInView) setShouldLoad(true);
      },
      { threshold, rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [rootMargin, threshold]);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;

    if (!isInView || prefersReducedMotion || document.visibilityState === "hidden") {
      el.pause();
      return;
    }

    const play = async () => {
      try {
        await el.play();
      } catch {
        return;
      }
    };

    void play();
  }, [isInView, prefersReducedMotion, shouldLoad]);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;

    const onVisibilityChange = () => {
      if (document.visibilityState === "hidden") el.pause();
    };

    document.addEventListener("visibilitychange", onVisibilityChange);
    return () => document.removeEventListener("visibilitychange", onVisibilityChange);
  }, []);

  return (
    <video
      ref={videoRef}
      muted
      loop
      playsInline
      preload="none"
      poster={poster}
      className={className}
      aria-hidden="true"
    >
      {shouldLoad ? <source src={src} type="video/mp4" /> : null}
    </video>
  );
}
