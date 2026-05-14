import { motion, AnimatePresence, type Variants } from "framer-motion";
import { Mail, Phone, Instagram, Linkedin, X } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { VisibilityVideo } from "./components/VisibilityVideo";
import {
  InstagramProfileSection,
  type InstagramHighlight,
  type InstagramHighlightStory,
  type InstagramPost,
} from "./components/InstagramProfileSection";

const sections = [
  {
    id: 1,
    type: "hero",
    video: "/videos/showreel.mp4",
    title: "PAU HERBERA",
    subtitle: "Freelance Audiovisual",
    hoverSubtitle: "Realizador | Cámara | VMix"
  },
  {
    id: 2,
    type: "content",
    video: "/videos/broadcast.mp4",
    title: "OPERADOR DE CÁMARA BROADCAST",
  },
  {
    id: 3,
    type: "content",
    video: "/videos/vmix.mp4",
    title: "REALIZADOR VMIX",
  },
  {
    id: 4,
    type: "content",
    video: "/videos/ficciondocu.mp4",
    title: "CÁMARA FICCIÓN & DOCU",
  },
  {
    id: 5,
    type: "content",
    video: "/videos/rea.mp4",
    title: "REALIZADOR MULTICÁMARA",
  },
];

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
  }
};

const storyVariants: Variants = {
  enter: (dir: 1 | -1) => ({ opacity: 0, y: dir > 0 ? 36 : -36 }),
  center: { opacity: 1, y: 0 },
  exit: (dir: 1 | -1) => ({ opacity: 0, y: dir > 0 ? -36 : 36 }),
};

const instagramPosts: InstagramPost[] = [
  {
    id: "juniorgp-trackside",
    title: "Operador de cámara de pista (Trackside) en JuniorGP.",
    embedUrl: "https://youtu.be/zT_aD24yAa0?t=1062",
    coverUrl: "/covers/juniorgp.jpg",
  },
  {
    id: "ot-academia-ptz",
    title: "Realizador y operador PTZ en la Academia de Operación Triunfo.",
    embedUrl: "https://youtu.be/WjaLkORWgn8?t=283",
    coverUrl: "/covers/ot-academia.jpg",
  },
  {
    id: "ot-castings-vmix",
    title: "Streaming Manager con vMix para Castings OT.",
    embedUrl: "https://www.youtube.com/watch?v=bErVrr-ApsA",
    coverUrl: "/covers/castings-vmix.jpg",
  },
  {
    id: "culers-corner",
    title: 'Realizador programa "Culers Corner".',
    embedUrl: "https://youtu.be/F4WddHb92Yg?t=293",
    coverUrl: "/covers/culers-corner.jpg",
  },
  {
    id: "mochilas-conexiones",
    title: "Técnico de conexiones con mochilas.",
    embedUrl: "https://youtu.be/mAyt41zp4Z0?t=24803",
    coverUrl: "/covers/mochilas.jpg",
  },
  {
    id: "docu-auc",
    title: 'Operador de cámara Documental "Aüc".',
    embedUrl: "https://youtu.be/e3GHq23cAwY?t=1018",
    coverUrl: "/covers/auc.jpg",
  },
];

const highlightMediaFilenames = [
  "_DSF6189.jpeg",
  "_DSF6320.jpeg",
  "1e2c8688-3f3e-4f34-96f6-fb59ade25b9c.jpg",
  "26062022-012.JPEG",
  "7bfe83d8-cf90-4830-a02c-30ae22a9bfed.jpg",
  "84cb92bd-7585-4c71-ae1f-4bbe4ce0b755.jpg",
  "98899E3D-D48E-47D5-93E9-E1DFD5F3DB28.jpg",
  "C3_01011.jpeg",
  "IMG_0106.JPEG",
  "IMG_0106.MOV",
  "IMG_0146.JPEG",
  "IMG_0153.JPEG",
  "IMG_0226.JPEG",
  "IMG_0226.MOV",
  "IMG_0436.JPEG",
  "IMG_0437.JPEG",
  "IMG_0445.JPEG",
  "IMG_0445.MOV",
  "IMG_0475.JPEG",
  "IMG_0475.MOV",
  "IMG_0513.JPEG",
  "IMG_0526.JPEG",
  "IMG_0526.MOV",
  "IMG_0648.JPEG",
  "IMG_0648.MOV",
  "IMG_0657.JPEG",
  "IMG_0661.JPG",
  "IMG_0699.JPEG",
  "IMG_0699.MOV",
  "IMG_0841.JPEG",
  "IMG_0856.JPEG",
  "IMG_7872.JPEG",
  "IMG_7872.MOV",
  "IMG_7900.JPEG",
  "IMG_7900.MOV",
  "IMG_8002.JPEG",
  "IMG_8002.MOV",
  "IMG_8018.JPEG",
  "IMG_8018.MOV",
  "IMG_8038.JPEG",
  "IMG_8038.MOV",
  "IMG_8200.JPEG",
  "IMG_8230.JPEG",
  "IMG_8373.JPEG",
  "IMG_8399.JPEG",
  "IMG_8441.JPEG",
  "IMG_9012.jpeg",
  "IMG_9025.JPEG",
  "IMG_9046.JPEG",
  "IMG_9059.JPEG",
  "IMG_9078.JPEG",
  "IMG_9094.JPG",
  "IMG_9156.JPEG",
  "IMG_9282.JPEG",
  "IMG_9285.JPEG",
  "IMG_9291.JPEG",
  "IMG_9376.JPEG",
];

const highlightMediaFilenamesForStories = highlightMediaFilenames.filter(
  (filename) => filename.split(".").pop()?.toLowerCase() !== "mov"
);

const instagramHighlightCategories = [
  { id: "h1", label: "🎥" },
  { id: "h2", label: "📹" },
  { id: "h3", label: "📷" },
  { id: "h4", label: "🔵🔴" },
  { id: "h5", label: "✨" },
];

function toHighlightStoryType(filename: string): InstagramHighlightStory["type"] {
  const ext = filename.split(".").pop()?.toLowerCase();
  if (ext === "mp4" || ext === "webm") return "video";
  return "image";
}

const instagramHighlights: InstagramHighlight[] = instagramHighlightCategories.map((category, categoryIndex) => {
  const assigned = highlightMediaFilenamesForStories.filter(
    (_, idx) => idx % instagramHighlightCategories.length === categoryIndex
  );
  const stories: InstagramHighlightStory[] = assigned.map((filename, idx) => {
    const type = toHighlightStoryType(filename);
    const story: InstagramHighlightStory = {
      id: `${category.id}-${idx + 1}`,
      type,
      src: `/highlights/${filename}`,
    };
    if (type === "image") story.durationMs = 4500;
    return story;
  });

  return {
    id: category.id,
    label: category.label,
    coverUrl: stories[0]?.src,
    stories,
  };
});

function parseTimeToSeconds(value: string): number | null {
  const trimmed = value.trim();
  if (!trimmed) return null;
  if (/^\d+$/.test(trimmed)) return Math.max(0, parseInt(trimmed, 10));

  const match = trimmed.match(/^(?:(\d+)h)?(?:(\d+)m)?(?:(\d+)s)?$/i);
  if (!match) return null;

  const h = match[1] ? parseInt(match[1], 10) : 0;
  const m = match[2] ? parseInt(match[2], 10) : 0;
  const s = match[3] ? parseInt(match[3], 10) : 0;
  const total = h * 3600 + m * 60 + s;
  return Number.isFinite(total) ? Math.max(0, total) : null;
}

function toEmbedUrl(rawUrl: string): string {
  try {
    const u = new URL(rawUrl);
    const host = u.hostname.replace(/^www\./, "").toLowerCase();

    const isYouTube =
      host === "youtube.com" || host === "m.youtube.com" || host === "youtu.be" || host === "youtube-nocookie.com";
    const isVimeo = host === "vimeo.com" || host === "player.vimeo.com";

    if (isYouTube) {
      let id: string | null = null;

      if (host === "youtu.be") {
        id = u.pathname.split("/").filter(Boolean)[0] ?? null;
      } else if (u.pathname.startsWith("/watch")) {
        id = u.searchParams.get("v");
      } else if (u.pathname.startsWith("/embed/")) {
        id = u.pathname.split("/").filter(Boolean)[1] ?? null;
      } else if (u.pathname.startsWith("/shorts/")) {
        id = u.pathname.split("/").filter(Boolean)[1] ?? null;
      } else if (u.pathname.startsWith("/live/")) {
        id = u.pathname.split("/").filter(Boolean)[1] ?? null;
      }

      if (!id) return rawUrl;

      const t = u.searchParams.get("start") ?? u.searchParams.get("t");
      const start = t ? parseTimeToSeconds(t) : null;

      const embed = new URL(`https://www.youtube.com/embed/${id}`);
      embed.searchParams.set("rel", "0");
      embed.searchParams.set("modestbranding", "1");
      if (start !== null) embed.searchParams.set("start", String(start));
      return embed.toString();
    }

    if (isVimeo) {
      if (host === "player.vimeo.com" && u.pathname.startsWith("/video/")) return rawUrl;

      const pathParts = u.pathname.split("/").filter(Boolean);
      const numeric = [...pathParts].reverse().find((p) => /^\d+$/.test(p)) ?? null;
      if (!numeric) return rawUrl;

      const embed = new URL(`https://player.vimeo.com/video/${numeric}`);
      const h = u.searchParams.get("h");
      if (h) embed.searchParams.set("h", h);
      return embed.toString();
    }

    return rawUrl;
  } catch {
    return rawUrl;
  }
}

function App() {
  const [heroTextHover, setHeroTextHover] = useState(false);
  const [activePost, setActivePost] = useState<InstagramPost | null>(null);
  const [activeHighlight, setActiveHighlight] = useState<InstagramHighlight | null>(null);
  const [activeStoryIndex, setActiveStoryIndex] = useState(0);
  const [storyDirection, setStoryDirection] = useState<1 | -1>(1);
  const [snapEnabled, setSnapEnabled] = useState(true);
  const instagramRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const target = instagramRef.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setSnapEnabled(!entry.isIntersecting);
      },
      { threshold: 0.15, rootMargin: "-20% 0px -40% 0px" }
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!activePost) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActivePost(null);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activePost]);

  useEffect(() => {
    if (!activeHighlight) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveHighlight(null);
      if (e.key === "ArrowRight") {
        setStoryDirection(1);
        setActiveStoryIndex((v) => {
          const next = v + 1;
          if (next >= activeHighlight.stories.length) {
            setActiveHighlight(null);
            return v;
          }
          return next;
        });
      }
      if (e.key === "ArrowLeft") {
        setStoryDirection(-1);
        setActiveStoryIndex((v) => Math.max(v - 1, 0));
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activeHighlight]);

  useEffect(() => {
    const html = document.documentElement;
    const shouldSnap = snapEnabled && !activePost && !activeHighlight;
    if (shouldSnap) html.dataset.scrollSnap = "on";
    else delete html.dataset.scrollSnap;
    return () => {
      delete html.dataset.scrollSnap;
    };
  }, [activeHighlight, activePost, snapEnabled]);

  useEffect(() => {
    const body = document.body;
    const isModalOpen = Boolean(activePost) || Boolean(activeHighlight);
    if (!isModalOpen) return;

    const scrollY = window.scrollY;
    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.left = "0";
    body.style.right = "0";
    body.style.width = "100%";

    return () => {
      const top = body.style.top;
      body.style.position = "";
      body.style.top = "";
      body.style.left = "";
      body.style.right = "";
      body.style.width = "";
      const restoreY = top ? Math.abs(parseInt(top, 10)) : 0;
      window.scrollTo(0, restoreY);
    };
  }, [activeHighlight, activePost]);

  const activeStories = useMemo<InstagramHighlightStory[]>(() => {
    return activeHighlight?.stories ?? [];
  }, [activeHighlight]);

  const activeStoryDurationMs = useMemo(() => {
    const story = activeStories[activeStoryIndex];
    if (!story) return 4500;
    if (typeof story.durationMs === "number") return Math.max(1000, story.durationMs);
    return story.type === "image" ? 4500 : 8000;
  }, [activeStories, activeStoryIndex]);

  useEffect(() => {
    if (!activeHighlight) return;
    if (activeStoryIndex >= activeHighlight.stories.length) return;

    const timer = window.setTimeout(() => {
      setStoryDirection(1);
      setActiveStoryIndex((v) => {
        const next = v + 1;
        if (next >= activeHighlight.stories.length) {
          setActiveHighlight(null);
          return v;
        }
        return next;
      });
    }, activeStoryDurationMs);

    return () => window.clearTimeout(timer);
  }, [activeHighlight, activeStoryDurationMs, activeStoryIndex]);

  return (
    <>
      <div className="w-full bg-black text-white">

        {sections.map((section) => (
          <section
            key={section.id}
            className="relative flex min-h-[100svh] w-full flex-col items-center justify-center overflow-hidden md:snap-start"
          >
          {/* Background Video */}
          <div className="absolute inset-0 z-0">
            {/* Gradient Overlay for Text Readability - Less intrusive */}
            <div className="absolute inset-0 bg-black/20 z-10" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40 z-10" />
            
            <VisibilityVideo
              src={section.video}
              priority={section.type === "hero"}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Content */}
          <div className="z-20 w-full h-full flex flex-col items-center justify-center">
            {section.type === "hero" ? (
              <div className="flex flex-col items-center text-center">
                <motion.h1 
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className="text-6xl md:text-9xl font-bold tracking-tighter mb-8 text-white drop-shadow-2xl"
                >
                  {section.title}
                </motion.h1>
                
                <motion.div 
                  className="relative h-12 flex items-center justify-center cursor-pointer"
                  onMouseEnter={() => setHeroTextHover(true)}
                  onMouseLeave={() => setHeroTextHover(false)}
                >
                   <AnimatePresence mode="wait">
                    {heroTextHover ? (
                      <motion.p
                        key="hover"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                        className="absolute text-xl md:text-2xl font-bold tracking-[0.4em] uppercase text-white drop-shadow-lg"
                      >
                        {section.hoverSubtitle}
                      </motion.p>
                    ) : (
                      <motion.p
                        key="normal"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                        className="absolute text-xl md:text-2xl font-bold tracking-[0.4em] uppercase text-neutral-200 drop-shadow-lg"
                      >
                        {section.subtitle}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </motion.div>
              </div>
            ) : (
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false }}
                className="text-center px-4"
              >
                <motion.h2 
                  variants={fadeInUp}
                  className="text-5xl md:text-8xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/80 drop-shadow-[0_5px_5px_rgba(0,0,0,0.5)] uppercase max-w-6xl mx-auto leading-tight"
                >
                  {section.title}
                </motion.h2>
              </motion.div>
            )}
          </div>
        </section>
        ))}

        <InstagramProfileSection
          ref={instagramRef}
          avatarUrl="/perfil.jpg"
          username="pherbera24"
          displayName="Pau Herbera"
          bio="Mañana lo dejo, enserio."
          postsCount={instagramPosts.length}
          followersCount={1097}
          followingCount={507}
          highlights={instagramHighlights}
          posts={instagramPosts}
          onOpenPost={(post) => setActivePost(post)}
          onOpenHighlight={(highlight) => {
            setActiveHighlight(highlight);
            setActiveStoryIndex(0);
            setStoryDirection(1);
          }}
        />

      {/* Contact Section */}
        <section
          id="contacto"
          className="relative flex min-h-[100svh] w-full flex-col items-center justify-center bg-neutral-950 md:snap-start"
        >
         <div className="z-10 text-center px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-16"
            >
              <h2 className="text-5xl md:text-8xl font-bold tracking-tighter text-white">
                CONTACTO
              </h2>
              
              <div className="flex flex-col items-center gap-10">
                <a 
                  href="mailto:pauherbera@gmail.com"
                  className="text-2xl md:text-4xl font-light tracking-wider hover:text-neutral-400 transition-colors flex items-center gap-4"
                >
                  <Mail className="w-8 h-8 md:w-10 md:h-10" />
                  pauherbera@gmail.com
                </a>

                <a 
                  href="tel:+34674620288"
                  className="text-2xl md:text-4xl font-light tracking-wider hover:text-neutral-400 transition-colors flex items-center gap-4"
                >
                  <Phone className="w-8 h-8 md:w-10 md:h-10" />
                  +34 674 62 02 88
                </a>
              </div>

              <div className="flex gap-8 justify-center pt-8">
                <a
                  href="https://instagram.com/pherbera24"
                  target="_blank"
                  rel="noreferrer"
                  className="text-white transition-colors hover:text-neutral-400"
                  aria-label="Instagram"
                >
                  <Instagram className="w-8 h-8 md:w-10 md:h-10" />
                </a>
                <a
                  href="https://www.linkedin.com/in/pau-herbera/"
                  target="_blank"
                  rel="noreferrer"
                  className="text-white transition-colors hover:text-neutral-400"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-8 h-8 md:w-10 md:h-10" />
                </a>
              </div>
            </motion.div>
         </div>
        </section>
      </div>

      <AnimatePresence>
        {activePost ? (
          <motion.div
            key="post-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 grid place-items-center bg-black/80 px-4"
            onMouseDown={(e) => {
              if (e.target === e.currentTarget) setActivePost(null);
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className="w-full max-w-4xl overflow-hidden rounded-2xl border border-neutral-800 bg-[#0a0a0a]"
              role="dialog"
              aria-modal="true"
            >
              <div className="flex items-center justify-between gap-4 border-b border-neutral-800 px-4 py-3">
                <div className="min-w-0 truncate text-sm font-semibold text-white md:text-base">
                  {activePost.title}
                </div>
                <button
                  type="button"
                  onMouseDown={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setActivePost(null);
                  }}
                  onClick={() => setActivePost(null)}
                  className="rounded-lg p-2 text-neutral-300 transition-colors hover:bg-neutral-900 hover:text-white"
                  aria-label="Cerrar"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="w-full bg-black">
                <div className="aspect-video w-full">
                  <iframe
                    src={toEmbedUrl(activePost.embedUrl)}
                    title={activePost.title}
                    className="h-full w-full"
                    allow="autoplay; fullscreen; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <AnimatePresence>
        {activeHighlight ? (
          <motion.div
            key="highlight-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black"
          >
            <div className="absolute left-0 right-0 top-0 z-20 px-3 pt-3">
              <div className="flex items-center justify-between gap-3">
                <div className="flex min-w-0 flex-1 items-center gap-2">
                  <div className="text-sm font-semibold text-white">{activeHighlight.label}</div>
                  <div className="text-xs text-white/60">Destacadas</div>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveHighlight(null)}
                  className="rounded-lg p-2 text-neutral-300 transition-colors hover:bg-white/10 hover:text-white"
                  aria-label="Cerrar"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="mt-3 flex gap-1">
                {activeStories.map((s, i) => (
                  <div key={s.id} className="h-1 flex-1 overflow-hidden rounded-full bg-white/20">
                    {i < activeStoryIndex ? (
                      <div className="h-full w-full bg-white" />
                    ) : i === activeStoryIndex ? (
                      <motion.div
                        key={`${activeHighlight.id}-${activeStoryIndex}-${i}`}
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{ duration: activeStoryDurationMs / 1000, ease: "linear" }}
                        className="h-full bg-white"
                      />
                    ) : null}
                  </div>
                ))}
              </div>
            </div>

            <div className="relative h-dvh w-full bg-black">
              <AnimatePresence initial={false} custom={storyDirection}>
                {activeStories[activeStoryIndex] ? (
                  <motion.div
                    key={activeStories[activeStoryIndex].id}
                    custom={storyDirection}
                    variants={storyVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute inset-0 grid place-items-center px-6 pb-10 pt-24"
                  >
                    <div className="aspect-[9/16] w-full max-w-[420px] overflow-hidden rounded-2xl bg-black shadow-2xl">
                      {activeStories[activeStoryIndex].type === "video" ? (
                        <video
                          src={activeStories[activeStoryIndex].src}
                          className="h-full w-full object-cover"
                          autoPlay
                          muted
                          playsInline
                          onEnded={() => {
                            setStoryDirection(1);
                            setActiveStoryIndex((v) => {
                              const next = v + 1;
                              if (next >= activeStories.length) {
                                setActiveHighlight(null);
                                return v;
                              }
                              return next;
                            });
                          }}
                        />
                      ) : (
                        <img
                          src={activeStories[activeStoryIndex].src}
                          alt=""
                          className="h-full w-full object-cover"
                          loading="lazy"
                          draggable={false}
                        />
                      )}
                    </div>
                  </motion.div>
                ) : null}
              </AnimatePresence>

              <button
                type="button"
                className="absolute inset-y-0 left-0 w-1/2"
                onClick={() => {
                  setStoryDirection(-1);
                  setActiveStoryIndex((v) => Math.max(v - 1, 0));
                }}
                aria-label="Historia anterior"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 w-1/2"
                onClick={() => {
                  setStoryDirection(1);
                  setActiveStoryIndex((v) => {
                    const next = v + 1;
                    if (next >= activeStories.length) {
                      setActiveHighlight(null);
                      return v;
                    }
                    return next;
                  });
                }}
                aria-label="Historia siguiente"
              />
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}

export default App;
