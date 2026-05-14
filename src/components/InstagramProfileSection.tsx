import { Play, Settings } from "lucide-react";
import { forwardRef, useMemo, useState } from "react";

export type InstagramPost = {
  id: string;
  title: string;
  embedUrl: string;
  coverUrl?: string;
};

export type InstagramHighlightStory = {
  id: string;
  type: "image" | "video";
  src: string;
  durationMs?: number;
};

export type InstagramHighlight = {
  id: string;
  label: string;
  coverUrl?: string;
  stories: InstagramHighlightStory[];
};

type InstagramProfileSectionProps = {
  avatarUrl?: string;
  username: string;
  displayName: string;
  bio?: string;
  postsCount: number;
  followersCount: number;
  followingCount: number;
  highlights: InstagramHighlight[];
  posts: InstagramPost[];
  onOpenPost: (post: InstagramPost) => void;
  onOpenHighlight: (highlight: InstagramHighlight) => void;
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
      highlights,
      posts,
      onOpenPost,
      onOpenHighlight,
    },
    ref
  ) {
    const [avatarLoaded, setAvatarLoaded] = useState(true);
    const hasAvatar = useMemo(() => Boolean(avatarUrl) && avatarLoaded, [avatarLoaded, avatarUrl]);

    return (
      <section ref={ref} className="w-full bg-[#0a0a0a] text-white md:snap-start">
        <div className="mx-auto w-full max-w-5xl px-4 pb-6 pt-10 md:pb-10 md:pt-14">
          <div className="flex items-start gap-5 md:gap-10">
            <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-full bg-gradient-to-b from-neutral-700 to-neutral-900 md:h-36 md:w-36">
              {hasAvatar ? (
                <img
                  src={avatarUrl}
                  alt="Foto de perfil"
                  className="h-full w-full object-cover"
                  loading="lazy"
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
                <button
                  type="button"
                  className="rounded-full p-2 text-neutral-200 transition-colors hover:bg-white/10 hover:text-white"
                  aria-label="Ajustes"
                >
                  <Settings className="h-5 w-5" />
                </button>
              </div>

              <div className="mt-4 grid grid-cols-3 gap-3 text-center">
                <div>
                  <div className="text-base font-semibold text-white md:text-lg">{postsCount}</div>
                  <div className="text-xs text-neutral-300 md:text-sm">publicaciones</div>
                </div>
                <div>
                  <div className="text-base font-semibold text-white md:text-lg">{followersCount}</div>
                  <div className="text-xs text-neutral-300 md:text-sm">seguidores</div>
                </div>
                <div>
                  <div className="text-base font-semibold text-white md:text-lg">{followingCount}</div>
                  <div className="text-xs text-neutral-300 md:text-sm">seguidos</div>
                </div>
              </div>

              <div className="mt-4 space-y-1 text-sm leading-snug text-neutral-200">
                <div className="font-semibold text-white">{displayName}</div>
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
                  Ver archivo
                </a>
              </div>

              <div className="mt-6 flex gap-5">
                {highlights.map((highlight) => (
                  <button
                    key={highlight.id}
                    type="button"
                    onMouseDown={() => onOpenHighlight(highlight)}
                    onClick={() => onOpenHighlight(highlight)}
                    className="shrink-0 text-center"
                  >
                    <div className="mx-auto rounded-full bg-gradient-to-tr from-fuchsia-500 via-rose-500 to-amber-400 p-[2px]">
                      <div className="grid h-16 w-16 place-items-center rounded-full bg-[#0a0a0a] p-[2px] md:h-20 md:w-20">
                        <div className="relative h-full w-full overflow-hidden rounded-full bg-neutral-900">
                          {highlight.coverUrl ? (
                            <img
                              src={highlight.coverUrl}
                              alt=""
                              className="h-full w-full select-none object-cover pointer-events-none"
                              loading="lazy"
                              draggable={false}
                            />
                          ) : (
                            <div className="grid h-full w-full place-items-center text-lg text-white md:text-xl">
                              {highlight.label}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="mt-2 text-xs font-medium text-neutral-200">{highlight.label}</div>
                  </button>
                ))}
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
