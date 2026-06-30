import { useEffect, useRef, useState } from "react";
import videoAsset from "@/assets/land-to-house.mp4.asset.json";

const STAGES = [
  { at: 0, title: "Raw land", text: "We start with carefully selected parcels in high-growth corridors." },
  { at: 0.33, title: "Infrastructure", text: "Roads, drainage and utilities are laid before a single brick is set." },
  { at: 0.66, title: "Construction", text: "Foundations rise, frameworks form, communities take shape." },
  { at: 0.95, title: "Your home", text: "What was once an empty plot becomes a place to call your own." },
];

export function ScrollVideoStory() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [progress, setProgress] = useState(0);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.pause();

    const onReady = () => setReady(true);
    if (video.readyState >= 2) setReady(true);
    video.addEventListener("loadedmetadata", onReady);
    video.addEventListener("loadeddata", onReady);
    return () => {
      video.removeEventListener("loadedmetadata", onReady);
      video.removeEventListener("loadeddata", onReady);
    };
  }, []);

  useEffect(() => {
    if (!ready) return;
    const video = videoRef.current;
    const el = wrapRef.current;
    if (!video || !el) return;

    let raf = 0;
    let targetTime = 0;
    let smoothTime = video.currentTime;
    let lastApplied = -1;

    const computeTarget = () => {
      const rect = el.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      const scrolled = Math.min(Math.max(-rect.top, 0), total);
      const p = total > 0 ? scrolled / total : 0;
      setProgress(p);
      targetTime = p * (video.duration || 0);
    };

    const tick = () => {
      smoothTime += (targetTime - smoothTime) * 0.08;
      if (Math.abs(smoothTime - lastApplied) > 0.08) {
        try {
          video.currentTime = smoothTime;
          lastApplied = smoothTime;
        } catch {}
      }
      raf = requestAnimationFrame(tick);
    };

    const onScroll = () => computeTarget();
    computeTarget();
    smoothTime = targetTime;
    raf = requestAnimationFrame(tick);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [ready]);

  const activeIdx = STAGES.reduce(
    (acc, s, i) => (progress >= s.at ? i : acc),
    0,
  );

  return (
    <section
      ref={wrapRef}
      className="relative bg-navy text-white"
      style={{ height: "220vh" }}
      aria-label="From land to home"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <video
          ref={videoRef}
          src={videoAsset.url}
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-navy/70 via-navy/30 to-navy/80" />

        <div className="relative z-10 flex h-full flex-col justify-between container-page py-16 md:py-24">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-brand/20 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-white ring-1 ring-white/20">
              The Journey
            </span>
            <h2 className="mt-4 max-w-2xl text-4xl md:text-6xl font-semibold leading-[1.05] text-balance">
              From open land to a place called home.
            </h2>
            <p className="mt-4 max-w-xl text-white/70 text-pretty">
              Scroll to follow the transformation — every plot we develop walks this path.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6">
            {STAGES.map((s, i) => {
              const active = i === activeIdx;
              return (
                <div
                  key={s.title}
                  className={`rounded-xl p-4 ring-1 transition ${
                    active
                      ? "bg-white/10 ring-brand/60 backdrop-blur"
                      : "bg-white/0 ring-white/10"
                  }`}
                >
                  <div
                    className={`text-xs font-semibold uppercase tracking-widest ${
                      active ? "text-brand" : "text-white/50"
                    }`}
                  >
                    Stage {i + 1}
                  </div>
                  <div className="mt-2 font-semibold">{s.title}</div>
                  <p className="mt-1 text-xs text-white/60">{s.text}</p>
                </div>
              );
            })}
          </div>

          <div className="absolute left-0 right-0 bottom-0 h-1 bg-white/10">
            <div
              className="h-full bg-brand transition-[width] duration-100"
              style={{ width: `${progress * 100}%` }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
