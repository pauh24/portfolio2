import { Play } from "lucide-react";
import { forwardRef, useEffect, useMemo, useRef, useState } from "react";

export type InstagramPost = {
  id: string;
  title: string;
  embedUrl: string;
  coverUrl?: string;
};

type InstagramProfileSectionProps = {
  avatarUrl?: string;
  username: string;
  displayName: string;
  bio?: string;
  postsCount: number;
  followersCount: number;
  followingCount: number;
  posts: InstagramPost[];
  onOpenPost: (post: InstagramPost) => void;
};

export const InstagramProfileSection = forwardRef<HTMLElement, InstagramProfileSectionProps>(
  function InstagramProfileSection(
    {
      avatarUrl,
      username,
      displayName,
      bio,
      postsCount,
      followersCount,
      followingCount,
      posts,
      onOpenPost,
    },
    ref
  ) {
    const sectionRef = useRef<HTMLElement | null>(null);
    const [avatarLoaded, setAvatarLoaded] = useState(true);
    const hasAvatar = useMemo(() => Boolean(avatarUrl) && avatarLoaded, [avatarLoaded, avatarUrl]);

    const [animatedFollowersCount, setAnimatedFollowersCount] = useState(0);
    const [animatedFollowingCount, setAnimatedFollowingCount] = useState(0);
    const followersIntervalRef = useRef<number | null>(null);
    const followingIntervalRef = useRef<number | null>(null);
    const followersDelayRef = useRef<number | null>(null);
    const followingDelayRef = useRef<number | null>(null);
    const [countsShouldAnimate, setCountsShouldAnimate] = useState(false);

    useEffect(() => {
      const element = sectionRef.current;
      if (!element) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (!entry.isIntersecting) return;
          setCountsShouldAnimate(true);
          observer.disconnect();
        },
        { threshold: 0.35 }
      );

      observer.observe(element);
      return () => observer.disconnect();
    }, []);

    useEffect(() => {
      if (!countsShouldAnimate) {
        setAnimatedFollowersCount(0);
        return;
      }

      const startValue = 37;
      const endValue = followersCount;
      setAnimatedFollowersCount(startValue);

      if (followersIntervalRef.current !== null) window.clearInterval(followersIntervalRef.current);
      if (followersDelayRef.current !== null) window.clearTimeout(followersDelayRef.current);

      followersDelayRef.current = window.setTimeout(() => {
        followersIntervalRef.current = window.setInterval(() => {
          setAnimatedFollowersCount((current) => {
            if (current >= endValue) return startValue;
            return current + 1;
          });
        }, 35);
      }, 500);

      return () => {
        if (followersDelayRef.current !== null) window.clearTimeout(followersDelayRef.current);
        followersDelayRef.current = null;
        if (followersIntervalRef.current !== null) window.clearInterval(followersIntervalRef.current);
        followersIntervalRef.current = null;
      };
    }, [countsShouldAnimate, followersCount]);

    useEffect(() => {
      if (!countsShouldAnimate) {
        setAnimatedFollowingCount(0);
        return;
      }

      const startValue = 102;
      const endValue = followingCount;
      setAnimatedFollowingCount(startValue);

      if (followingIntervalRef.current !== null) window.clearInterval(followingIntervalRef.current);
      if (followingDelayRef.current !== null) window.clearTimeout(followingDelayRef.current);

      followingDelayRef.current = window.setTimeout(() => {
        followingIntervalRef.current = window.setInterval(() => {
          setAnimatedFollowingCount((current) => {
            if (current >= endValue) return startValue;
            return current + 1;
          });
        }, 45);
      }, 1400);

      return () => {
        if (followingDelayRef.current !== null) window.clearTimeout(followingDelayRef.current);
        followingDelayRef.current = null;
        if (followingIntervalRef.current !== null) window.clearInterval(followingIntervalRef.current);
        followingIntervalRef.current = null;
      };
    }, [countsShouldAnimate, followingCount]);

    useEffect(() => {
      setAvatarLoaded(true);
    }, [avatarUrl]);

    return (
      <section
        ref={(node) => {
          sectionRef.current = node;
          if (typeof ref === "function") ref(node);
          else if (ref) ref.current = node;
        }}
        className="w-full bg-[#0a0a0a] text-white md:snap-start"
      >
        <div className="mx-auto w-full max-w-5xl px-4 pb-6 pt-10 md:pb-10 md:pt-14">
          <div className="flex items-start gap-5 md:gap-10">
            <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-full bg-gradient-to-b from-neutral-700 to-neutral-900 md:h-36 md:w-36">
              {hasAvatar ? (
                <img
                  src={avatarUrl}
                  alt="Foto de perfil"
                  className="h-full w-full object-cover"
                  loading="lazy"
                  onLoad={() => setAvatarLoaded(true)}
                  onError={() => setAvatarLoaded(false)}
                />
              ) : (
                <div className="grid h-full w-full place-items-center text-xs font-semibold tracking-widest text-neutral-200 md:text-sm">
                  PH
                </div>
              )}
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-3">
                <div className="min-w-0 truncate text-2xl font-bold tracking-tight text-white md:text-3xl">
                  {username}
                </div>
              </div>

              <div className="mt-4 grid grid-cols-3 gap-3 text-center">
                <div>
                  <div className="text-base font-semibold text-white md:text-lg">{postsCount}</div>
                  <div className="text-xs text-neutral-300 md:text-sm">publicaciones</div>
                </div>
                <div>
                    <div className="text-base font-semibold text-white md:text-lg">
                      {animatedFollowersCount}
                    </div>
                    <div className="text-xs text-neutral-300 md:text-sm">ideas</div>
                </div>
                <div>
                    <div className="text-base font-semibold text-white md:text-lg">
                      {animatedFollowingCount}
                    </div>
                    <div className="text-xs text-neutral-300 md:text-sm">proyectos</div>
                </div>
              </div>

              <div className="mt-4 space-y-1 text-sm leading-snug text-neutral-200">
                {displayName && displayName !== username ? (
                  <div className="font-semibold text-white">{displayName}</div>
                ) : null}
                {bio ? <div>{bio}</div> : null}
              </div>

              <div className="mt-5 flex gap-3">
                <a
                  href="#contacto"
                  className="flex-1 rounded-xl bg-neutral-800 px-4 py-2 text-center text-sm font-semibold text-white transition-colors hover:bg-neutral-700"
                >
                  Contactar
                </a>
                <a
                  href="/cv.pdf"
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 rounded-xl bg-neutral-800 px-4 py-2 text-center text-sm font-semibold text-white transition-colors hover:bg-neutral-700"
                >
                  Ver CV
                </a>
              </div>
            </div>
          </div>

          <div className="mt-8 border-t border-neutral-800 pt-4">
            <div className="grid grid-cols-3 gap-[2px] md:gap-1">
              {posts.map((post, idx) => (
                <button
                  key={post.id}
                  type="button"
                  onClick={() => onOpenPost(post)}
                  className="group relative aspect-square w-full overflow-hidden bg-neutral-950"
                >
                  <div
                    className={[
                      "absolute inset-0",
                      idx % 3 === 0
                        ? "bg-gradient-to-br from-neutral-900 via-neutral-950 to-neutral-900"
                        : idx % 3 === 1
                          ? "bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950"
                          : "bg-gradient-to-br from-neutral-900 via-neutral-950 to-neutral-950",
                    ].join(" ")}
                  />
                  {post.coverUrl ? (
                    <div
                      className="absolute inset-0 bg-cover bg-center"
                      style={{ backgroundImage: `url(${post.coverUrl})` }}
                    />
                  ) : null}

                  <div className="absolute inset-0 bg-black/60 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                    <div className="flex h-full w-full flex-col items-center justify-center gap-3 px-3 text-center">
                      <Play className="h-9 w-9 fill-white text-white" />
                      <div className="text-xs font-semibold leading-snug text-white md:text-sm">
                        {post.title}
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }
);
