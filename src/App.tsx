import { motion, AnimatePresence, type Variants } from "framer-motion";
import { Mail, Instagram, Linkedin, X } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { VisibilityVideo } from "./components/VisibilityVideo";
import {
  InstagramProfileSection,
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
    const html = document.documentElement;
    const shouldSnap = snapEnabled && !activePost;
    if (shouldSnap) html.dataset.scrollSnap = "on";
    else delete html.dataset.scrollSnap;
    return () => {
      delete html.dataset.scrollSnap;
    };
  }, [activePost, snapEnabled]);

  useEffect(() => {
    const body = document.body;
    const isModalOpen = Boolean(activePost);
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
  }, [activePost]);

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
              threshold={0.15}
              rootMargin="40% 0px"
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
          username="Pau Herbera"
          displayName="Pau Herbera"
          bio="Realizador y Operador Freelance con experiencia en grandes formatos y ficción. Especialista en tecnología de streaming (vMix), operación de cámara y soporte técnico en set"
          postsCount={instagramPosts.length}
          followersCount={9999}
          followingCount={9999}
          posts={instagramPosts}
          onOpenPost={(post) => setActivePost(post)}
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

    </>
  );
}

export default App;
