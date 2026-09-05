"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronRight,
  Code2,
  LayoutDashboard,
  PenTool,
  ShoppingBag,
  Boxes,
  TrendingUp,
  Send,
  Loader2,
} from "lucide-react";
import { Magnetic, Reveal } from "./chrome";
import { PROCESS, SERVICES, TECH_STACK } from "@/lib/content";

export type HomeProject = {
  title: string;
  slug: string;
  category: string;
  tagline?: string | null;
  description?: string | null;
  technologies?: string[] | null;
  client?: string | null;
  year?: string | null;
  color?: string | null;
  stats?: { label: string; value: string }[] | null;
};

/* ============ HERO CONTENT ============ */
export function HeroContent() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 150);
    return () => clearTimeout(t);
  }, []);

  const lines = ["WE CRAFT", "DIGITAL", "EXPERIENCES."];
  return (
    <div className="pointer-events-none relative z-10 mx-auto flex min-h-[100svh] w-full max-w-[1440px] flex-col justify-end px-5 pb-10 pt-28 md:px-10 md:pb-14">
      <div className="mb-6 flex flex-wrap items-center gap-3">
        {["● AVAILABLE FOR Q4 2026", "BASED EVERYWHERE", "EST. 2019"].map(
          (t, i) => (
            <span
              key={t}
              className={`rounded-full border border-white/15 bg-white/5 px-4 py-1.5 font-mono text-[11px] tracking-widest text-white/70 backdrop-blur transition-all duration-700 ${
                visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
              }`}
              style={{ transitionDelay: `${i * 120}ms` }}
            >
              {t}
            </span>
          )
        )}
      </div>

      <h1 className="font-display font-black leading-[0.88] tracking-tight">
        {lines.map((line, li) => (
          <span key={line} className="block overflow-hidden pb-1">
            <span
              className={`block text-[15.5vw] transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] md:text-[9.5vw] lg:text-[8.2vw] ${
                visible ? "translate-y-0" : "translate-y-full"
              } ${li === 2 ? "text-[#D4FF3F]" : ""}`}
              style={{ transitionDelay: `${200 + li * 130}ms` }}
            >
              {line}
              {li === 2 && <span className="text-white">✳</span>}
            </span>
          </span>
        ))}
      </h1>

      <div className="mt-8 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <p
          className={`max-w-md text-[15px] leading-relaxed text-white/60 transition-all delay-700 duration-700 ${
            visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          }`}
        >
          CodeCraft Concept is a creative technology studio. We don&apos;t just
          build websites — we engineer{" "}
          <span className="text-white">scroll-stopping 3D worlds</span>, apps
          and brands that convert.
        </p>
        <div
          className={`pointer-events-auto flex items-center gap-4 transition-all delay-[850ms] duration-700 ${
            visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          }`}
        >
          <Magnetic>
            <Link
              href="/contact"
              className="group flex items-center gap-3 rounded-full bg-[#D4FF3F] px-7 py-4 text-sm font-black tracking-wide text-black transition-shadow hover:shadow-[0_0_50px_rgba(212,255,63,0.4)]"
            >
              START A PROJECT
              <ArrowUpRight
                size={18}
                className="transition-transform duration-300 group-hover:rotate-45"
              />
            </Link>
          </Magnetic>
          <Magnetic>
            <Link
              href="/work"
              className="flex items-center gap-2 rounded-full border border-white/20 px-7 py-4 text-sm font-bold text-white transition-colors hover:border-white hover:bg-white hover:text-black"
            >
              SEE WORK
            </Link>
          </Magnetic>
        </div>
      </div>

      <div className="mt-10 flex items-center justify-between border-t border-white/10 pt-5 font-mono text-[11px] tracking-[0.25em] text-white/40">
        <span className="flex items-center gap-2">
          <span className="h-2 w-2 animate-pulse rounded-full bg-[#D4FF3F]" />
          INTERACTIVE 3D — MOVE YOUR CURSOR
        </span>
        <span className="hidden sm:block">SCROLL TO EXPLORE ↓</span>
        <span className="hidden md:block">60FPS / WEBGL / GSAP</span>
      </div>
    </div>
  );
}

/* ============ BRAND STATEMENT ============ */
export function BrandStatement() {
  const ref = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const total = r.height - window.innerHeight;
      const p = Math.min(1, Math.max(0, -r.top / (total || 1)));
      setProgress(p);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const sentence =
    "We transform ideas into digital products that people remember.".split(" ");
  return (
    <section className="relative border-t border-white/10 bg-[#060607]">
      <div ref={ref} className="relative mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-36">
        <Reveal>
          <p className="font-mono text-xs tracking-[0.35em] text-[#D4FF3F]">
            ( BRAND STATEMENT )
          </p>
        </Reveal>
        <h2 className="mt-8 font-display text-[9vw] font-black leading-[1.02] tracking-tight md:text-[4.6vw]">
          {sentence.map((w, i) => {
            const threshold = (i + 1) / sentence.length;
            const active = progress * 1.15 >= threshold;
            return (
              <span
                key={i}
                className="mr-[0.28em] inline-block transition-all duration-500"
                style={{
                  color: active ? "#F4F1E8" : "rgba(244,241,232,0.14)",
                  transform: active ? "translateY(0)" : "translateY(8px)",
                }}
              >
                {w}
              </span>
            );
          })}
        </h2>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {[
            ["TECHNOLOGY", "Robust backends, clean architecture, edge performance."],
            ["DESIGN", "Editorial typography, motion systems, premium art direction."],
            ["EXPERIENCE", "3D, scroll cinema and micro-interactions with intent."],
          ].map(([t, d], i) => (
            <Reveal key={t} delay={i * 120}>
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
                <p className="font-display text-lg font-black tracking-wide text-[#D4FF3F]">
                  0{i + 1} — {t}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-white/55">{d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
      {/* marquee divider */}
      <div className="overflow-hidden border-y border-white/10 bg-[#D4FF3F] py-3">
        <div className="animate-marquee flex w-max gap-8 whitespace-nowrap font-display text-sm font-black tracking-[0.2em] text-black">
          {Array.from({ length: 12 }).map((_, i) => (
            <span key={i}>
              WE CRAFT DIGITAL EXPERIENCES ✳ NOT JUST WEBSITES ✳ CODECRAFT
              CONCEPT ✳
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============ SERVICES ============ */
const PREVIEW_ICONS = [Code2, LayoutDashboard, PenTool, ShoppingBag, Boxes, TrendingUp];

export function ServicesExperience() {
  const [active, setActive] = useState(0);
  const svc = SERVICES[active];
  const Icon = PREVIEW_ICONS[active];

  return (
    <section id="services" className="relative bg-[#08080A]">
      <div className="mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-32">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="font-mono text-xs tracking-[0.35em] text-[#D4FF3F]">
                ( OUR SERVICES — 06 )
              </p>
              <h2 className="mt-4 font-display text-5xl font-black tracking-tight md:text-7xl">
                WHAT WE <span className="text-stroke">CRAFT</span>
              </h2>
            </div>
            <Link
              href="/services"
              className="group flex items-center gap-2 text-sm font-bold text-white/60 hover:text-[#D4FF3F]"
            >
              ALL SERVICES <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-8 lg:grid-cols-[1.5fr_1fr]">
          <div>
            {SERVICES.map((s, i) => (
              <Reveal key={s.id} delay={Math.min(i * 60, 240)}>
                <button
                  onMouseEnter={() => setActive(i)}
                  onClick={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  className={`service-row group flex w-full items-center gap-5 border-b border-white/10 px-2 py-5 text-left md:gap-8 md:py-6 ${
                    active === i ? "md:pl-6" : ""
                  }`}
                >
                  <span
                    className="font-mono text-xs"
                    style={{ color: active === i ? s.accent : "rgba(255,255,255,0.3)" }}
                  >
                    {s.id}
                  </span>
                  <span
                    className={`font-display text-2xl font-black tracking-tight transition-all duration-300 md:text-4xl ${
                      active === i ? "text-white" : "text-white/35 group-hover:text-white/70"
                    }`}
                  >
                    {s.title}
                  </span>
                  <ChevronRight
                    size={22}
                    className="ml-auto shrink-0 transition-all duration-300"
                    style={{
                      color: s.accent,
                      opacity: active === i ? 1 : 0,
                      transform: active === i ? "translateX(0)" : "translateX(-12px)",
                    }}
                  />
                </button>
              </Reveal>
            ))}
          </div>

          {/* preview panel */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <div
              key={svc.id}
              className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#101013] p-7 transition-all duration-500"
              style={{ boxShadow: `0 20px 80px -20px ${svc.accent}55` }}
            >
              <div
                className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full blur-[80px]"
                style={{ background: `${svc.accent}44` }}
              />
              <div className="flex items-center justify-between">
                <div
                  className="grid h-14 w-14 place-items-center rounded-2xl"
                  style={{ background: svc.accent, color: "#000" }}
                >
                  <Icon size={26} strokeWidth={2.4} />
                </div>
                <span className="font-mono text-xs text-white/40">{svc.id} / 06</span>
              </div>
              <h3 className="mt-6 font-display text-2xl font-black">{svc.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-white/60">{svc.desc}</p>

              {/* faux window per type */}
              <div className="mt-6 overflow-hidden rounded-xl border border-white/10 bg-black/60">
                <div className="flex items-center gap-1.5 border-b border-white/10 px-4 py-2.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
                  <span className="ml-3 font-mono text-[10px] text-white/30">
                    codecraft — {svc.short.toLowerCase()}.live
                  </span>
                </div>
                <div className="p-4 font-mono text-[11px] leading-relaxed">
                  {svc.preview === "code" && (
                    <div className="space-y-1.5">
                      <p><span className="text-[#FF7AD9]">const</span> <span className="text-[#4DE3FF]">experience</span> <span className="text-white/50">=</span> <span className="text-[#D4FF3F]">await</span> <span className="text-white">craft</span><span className="text-white/50">({"{"}</span></p>
                      <p className="pl-4 text-white/70">design: <span className="text-[#FFB224]">&quot;premium&quot;</span>,</p>
                      <p className="pl-4 text-white/70">perf: <span className="code-glow text-[#D4FF3F]">100</span>,</p>
                      <p className="pl-4 text-white/70">wow: <span className="text-[#D4FF3F]">Infinity</span></p>
                      <p className="text-white/50">{"}"});</p>
                    </div>
                  )}
                  {svc.preview === "app" && (
                    <div className="grid grid-cols-3 gap-2">
                      {["$48k", "+212%", " live"].map((v, i) => (
                        <div key={i} className="rounded-lg bg-white/5 p-3 text-center">
                          <div className="font-display text-sm font-black" style={{ color: svc.accent }}>{v}</div>
                          <div className="mt-1 h-1 rounded bg-white/10"><div className="h-full w-3/4 rounded" style={{ background: svc.accent }} /></div>
                        </div>
                      ))}
                      <div className="col-span-3 flex items-center justify-between rounded-lg bg-white/5 p-3">
                        <span className="text-white/50">revenue.graph</span>
                        <span style={{ color: svc.accent }}>▲ realtime</span>
                      </div>
                    </div>
                  )}
                  {svc.preview === "design" && (
                    <div className="space-y-2">
                      <div className="flex gap-2">
                        {["Aa", "◼", "⬤"].map((g, i) => (
                          <div key={i} className="grid h-12 flex-1 place-items-center rounded-lg bg-white/5 font-display text-lg font-black" style={{ color: [svc.accent, "#fff", svc.accent][i] }}>{g}</div>
                        ))}
                      </div>
                      <div className="h-2 w-full rounded bg-white/10"><div className="h-full w-2/3 rounded" style={{ background: svc.accent }} /></div>
                      <div className="h-2 w-4/5 rounded bg-white/10" />
                    </div>
                  )}
                  {svc.preview === "shop" && (
                    <div className="grid grid-cols-2 gap-2">
                      {[1, 2].map((n) => (
                        <div key={n} className="rounded-lg bg-white/5 p-2">
                          <div className="h-14 rounded-md" style={{ background: `linear-gradient(135deg, ${svc.accent}55, transparent)` }} />
                          <div className="mt-2 h-1.5 w-3/4 rounded bg-white/15" />
                          <div className="mt-1 font-bold" style={{ color: svc.accent }}>$129 — ADD +</div>
                        </div>
                      ))}
                    </div>
                  )}
                  {svc.preview === "3d" && (
                    <div className="relative grid h-28 place-items-center overflow-hidden rounded-lg bg-[#0A0A1A]">
                      <div className="animate-spin-slow h-16 w-16 rounded-full border-2 border-dashed" style={{ borderColor: svc.accent }} />
                      <div className="absolute h-6 w-6 rounded-sm bg-[#D4FF3F] blur-[1px] animate-float-y" />
                      <span className="absolute bottom-2 font-mono text-[10px] text-white/40">three.js — 60fps</span>
                    </div>
                  )}
                  {svc.preview === "growth" && (
                    <div className="flex h-28 items-end gap-1.5">
                      {[35, 55, 42, 70, 62, 88, 100].map((h, i) => (
                        <div key={i} className="flex-1 rounded-t" style={{ height: `${h}%`, background: i === 6 ? svc.accent : "rgba(255,255,255,0.15)" }} />
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                {svc.tags.map((t) => (
                  <span key={t} className="rounded-full border border-white/15 px-3 py-1 text-[11px] font-semibold text-white/60">
                    {t}
                  </span>
                ))}
              </div>
              <Link href="/services" className="mt-6 inline-flex items-center gap-2 text-sm font-bold hover:gap-3 transition-all" style={{ color: svc.accent }}>
                Explore service <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============ SELECTED WORK ============ */
export function SelectedWork({ projects }: { projects: HomeProject[] }) {
  const [hovered, setHovered] = useState<number | null>(null);
  const list = projects.length ? projects : [];
  return (
    <section className="relative border-t border-white/10 bg-[#060607]">
      <div className="mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-32">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <h2 className="font-display text-5xl font-black tracking-tight md:text-7xl">
              SELECTED
              <br />
              <span className="text-stroke-lime">WORK ✳</span>
            </h2>
            <Link href="/work" className="group flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-bold hover:bg-[#D4FF3F] hover:text-black hover:border-[#D4FF3F] transition-all">
              VIEW ALL WORK <ArrowUpRight size={16} />
            </Link>
          </div>
        </Reveal>

        <div className="mt-14">
          {list.map((p, i) => (
            <Reveal key={p.slug} delay={0}>
              <Link
                href={`/work/${p.slug}`}
                data-cursor="view"
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                className="group relative block overflow-hidden border-t border-white/10 py-8 transition-all last:border-b md:py-10"
              >
                <div
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{
                    background: `linear-gradient(90deg, ${p.color || "#D4FF3F"}14, transparent 65%)`,
                  }}
                />
                <div className="relative flex flex-col gap-6 md:flex-row md:items-center">
                  <span className="font-mono text-sm text-white/30">
                    /{String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-3">
                      <span
                        className="rounded-full px-3 py-1 text-[11px] font-black tracking-widest"
                        style={{ background: `${p.color || "#D4FF3F"}22`, color: p.color || "#D4FF3F", border: `1px solid ${p.color || "#D4FF3F"}44` }}
                      >
                        {p.category?.toUpperCase()}
                      </span>
                      <span className="font-mono text-xs text-white/35">
                        {p.year} — {p.client}
                      </span>
                    </div>
                    <h3
                      className={`mt-3 font-display text-3xl font-black tracking-tight transition-all duration-500 md:text-5xl ${
                        hovered === i ? "translate-x-2" : ""
                      }`}
                      style={hovered === i ? { color: p.color || "#D4FF3F" } : {}}
                    >
                      {p.title}
                    </h3>
                    <p className="mt-2 max-w-xl text-sm text-white/50 md:text-[15px]">
                      {p.tagline}
                    </p>
                  </div>
                  {/* visual thumb */}
                  <div
                    className="relative h-44 w-full shrink-0 overflow-hidden rounded-2xl border border-white/10 transition-all duration-500 md:h-40 md:w-72 group-hover:scale-[1.02]"
                    style={{
                      background: `linear-gradient(135deg, #121214, ${p.color || "#D4FF3F"}22)`,
                    }}
                  >
                    <div className="absolute inset-0 grid place-items-center">
                      <span className="font-display text-6xl font-black text-white/10 transition-all duration-500 group-hover:text-white/20 group-hover:scale-110">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <div
                      className="absolute -bottom-8 -right-8 h-32 w-32 rounded-full blur-[40px] transition-all duration-500 group-hover:scale-150"
                      style={{ background: `${p.color || "#D4FF3F"}66` }}
                    />
                    <div className="absolute left-4 top-4 flex gap-1.5">
                      <span className="h-2 w-2 rounded-full bg-white/20" />
                      <span className="h-2 w-2 rounded-full bg-white/20" />
                      <span className="h-2 w-2 rounded-full" style={{ background: p.color || "#D4FF3F" }} />
                    </div>
                    <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                      <span className="font-mono text-[10px] tracking-widest text-white/50">
                        {(p.technologies || []).slice(0, 2).join(" • ")}
                      </span>
                      <span
                        className="grid h-10 w-10 place-items-center rounded-full text-black transition-transform duration-300 group-hover:rotate-45"
                        style={{ background: p.color || "#D4FF3F" }}
                      >
                        <ArrowUpRight size={18} />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============ PROCESS ============ */
export function Process() {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const idx = Number((e.target as HTMLElement).dataset.idx);
            setActive(idx);
          }
        });
      },
      { rootMargin: "-40% 0px -50% 0px" }
    );
    refs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  const cur = PROCESS[active];
  return (
    <section className="relative border-t border-white/10 bg-[#08080A]">
      <div className="mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-32">
        <Reveal>
          <p className="font-mono text-xs tracking-[0.35em] text-[#D4FF3F]">
            ( OUR PROCESS )
          </p>
          <h2 className="mt-4 font-display text-5xl font-black tracking-tight md:text-7xl">
            IDEA → <span className="text-stroke">ICONIC</span>
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-10 lg:grid-cols-[1fr_1.2fr]">
          {/* sticky visual */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <div
              className="overflow-hidden rounded-3xl border border-white/10 p-8 transition-colors duration-700 md:p-10"
              style={{ background: `linear-gradient(160deg, ${cur.color}1E, #0C0C0E 55%)` }}
            >
              <div className="flex items-center justify-between">
                <span className="font-display text-7xl font-black" style={{ color: cur.color }}>
                  {cur.id}
                </span>
                <div className="flex gap-1.5">
                  {PROCESS.map((_, i) => (
                    <span
                      key={i}
                      className="h-1.5 rounded-full transition-all duration-500"
                      style={{
                        width: i === active ? 28 : 8,
                        background: i === active ? cur.color : "rgba(255,255,255,0.15)",
                      }}
                    />
                  ))}
                </div>
              </div>
              <h3 className="mt-6 font-display text-4xl font-black tracking-tight md:text-5xl">
                {cur.name}
              </h3>
              <p className="mt-4 leading-relaxed text-white/60">{cur.desc}</p>
              <div className="mt-6 space-y-2">
                {cur.deliverables.map((d) => (
                  <div key={d} className="flex items-center gap-2 text-sm text-white/75">
                    <span className="grid h-5 w-5 place-items-center rounded-full" style={{ background: `${cur.color}22`, color: cur.color }}>
                      <Check size={12} strokeWidth={3} />
                    </span>
                    {d}
                  </div>
                ))}
              </div>
              <Link href="/contact" className="mt-8 inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-black text-black transition-transform hover:scale-105" style={{ background: cur.color }}>
                START WITH {cur.name} <ArrowRight size={16} />
              </Link>
            </div>
          </div>

          {/* steps */}
          <div className="relative">
            <div className="absolute bottom-8 left-[27px] top-8 w-[2px] bg-white/10">
              <div
                className="process-line-fill w-full bg-[#D4FF3F] transition-all duration-700"
                style={{ height: `${((active + 1) / PROCESS.length) * 100}%` }}
              />
            </div>
            <div className="space-y-4">
              {PROCESS.map((p, i) => (
                <div
                  key={p.id}
                  data-idx={i}
                  ref={(el) => {
                    refs.current[i] = el;
                  }}
                  onClick={() => setActive(i)}
                  className={`relative cursor-pointer rounded-2xl border p-6 pl-16 transition-all duration-500 md:p-7 md:pl-20 ${
                    active === i
                      ? "border-white/25 bg-white/[0.05]"
                      : "border-white/10 bg-transparent opacity-50 hover:opacity-90"
                  }`}
                >
                  <span
                    className="absolute left-4 top-6 grid h-7 w-7 place-items-center rounded-full border font-mono text-[11px] font-bold transition-all duration-500 md:left-5"
                    style={
                      active === i
                        ? { background: p.color, color: "#000", borderColor: p.color }
                        : { borderColor: "rgba(255,255,255,0.2)", color: "rgba(255,255,255,0.5)" }
                    }
                  >
                    {p.id}
                  </span>
                  <h4 className="font-display text-2xl font-black tracking-tight md:text-3xl">
                    {p.name}
                  </h4>
                  <p className={`mt-2 text-sm leading-relaxed transition-all duration-500 ${active === i ? "text-white/65" : "line-clamp-1 text-white/40"}`}>
                    {p.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============ TECH ============ */
export function TechEcosystem() {
  return (
    <section className="relative overflow-hidden border-t border-white/10 bg-[#060607]">
      <div className="mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-32">
        <Reveal>
          <p className="text-center font-mono text-xs tracking-[0.35em] text-[#D4FF3F]">
            ( POWERED BY )
          </p>
          <h2 className="mt-4 text-center font-display text-4xl font-black tracking-tight md:text-6xl">
            THE <span className="text-[#D4FF3F]">STACK</span> BEHIND THE MAGIC
          </h2>
        </Reveal>

        <div className="relative mx-auto mt-14 grid max-w-4xl place-items-center">
          {/* orbit visual */}
          <div className="pointer-events-none absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 md:block">
            <div className="h-[380px] w-[380px] animate-spin-slow rounded-full border border-dashed border-white/15" />
            <div className="absolute inset-8 animate-spin-slow rounded-full border border-white/10" style={{ animationDirection: "reverse", animationDuration: "22s" }} />
          </div>
          <div className="relative z-10 grid h-40 w-40 place-items-center rounded-full bg-[#D4FF3F] text-center shadow-[0_0_100px_rgba(212,255,63,0.35)] md:h-48 md:w-48">
            <div>
              <div className="font-display text-3xl font-black text-black md:text-4xl">CC</div>
              <div className="text-[10px] font-black tracking-[0.3em] text-black/70">CORE</div>
            </div>
          </div>
          <div className="mt-10 flex flex-wrap justify-center gap-2.5 md:max-w-2xl">
            {TECH_STACK.map((t, i) => (
              <span
                key={t}
                className="cursor-default rounded-full border border-white/12 bg-white/[0.04] px-4 py-2 text-[13px] font-semibold text-white/70 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-[#D4FF3F] hover:text-[#D4FF3F]"
                style={{ transitionDelay: `${(i % 8) * 20}ms` }}
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className="overflow-hidden border-t border-white/10 py-4 opacity-60">
        <div className="animate-marquee-fast flex w-max gap-10 whitespace-nowrap font-mono text-xs tracking-[0.3em] text-white/50">
          {Array.from({ length: 8 }).map((_, i) => (
            <span key={i}>PHP ✦ MYSQL ✦ THREE.JS ✦ GSAP ✦ NEXT.JS ✦ POSTGRES ✦ WEBGL ✦ TAILWIND ✦</span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============ ABOUT ============ */
export function AboutTeaser() {
  const [counts, setCounts] = useState([0, 0, 0]);
  const ref = useRef<HTMLDivElement>(null);
  const targets = [120, 68, 7];

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          const start = performance.now();
          const dur = 1600;
          const tick = (now: number) => {
            const p = Math.min(1, (now - start) / dur);
            const eased = 1 - Math.pow(1 - p, 3);
            setCounts(targets.map((t) => Math.round(t * eased)));
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
          io.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="relative border-t border-white/10 bg-[#08080A]">
      <div ref={ref} className="mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-32">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <Reveal>
              <p className="font-mono text-xs tracking-[0.35em] text-[#D4FF3F]">
                ( ABOUT CODECRAFT )
              </p>
              <h2 className="mt-4 font-display text-5xl font-black leading-[0.95] tracking-tight md:text-7xl">
                WE ARE
                <br />
                CODECRAFT
                <br />
                <span className="text-stroke">CONCEPT.</span>
              </h2>
            </Reveal>
            <Reveal delay={150}>
              <p className="mt-6 max-w-md leading-relaxed text-white/60">
                A creative technology studio obsessed with the intersection of
                design, code and business. No templates. No shortcuts. Just
                crafted digital products that outperform.
              </p>
              <Link href="/about" className="group mt-6 inline-flex items-center gap-2 text-sm font-bold text-[#D4FF3F]">
                OUR STORY <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </Link>
            </Reveal>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { v: counts[0], suffix: "+", label: "PROJECTS SHIPPED" },
              { v: counts[1], suffix: "+", label: "HAPPY CLIENTS" },
              { v: counts[2], suffix: "", label: "YEARS CRAFTING" },
              { v: "∞", suffix: "", label: "EXPERIENCES" },
            ].map((s, i) => (
              <Reveal key={s.label} delay={i * 100}>
                <div className="group rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-all duration-300 hover:border-[#D4FF3F]/60 hover:bg-[#D4FF3F]/[0.06] md:p-8">
                  <div className="font-display text-5xl font-black text-white transition-colors group-hover:text-[#D4FF3F] md:text-6xl">
                    {s.v}
                    {s.suffix}
                  </div>
                  <div className="mt-2 font-mono text-[11px] tracking-[0.25em] text-white/40">
                    {s.label}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============ FINAL CTA ============ */
export function FinalCTA() {
  return (
    <section className="relative overflow-hidden border-t border-white/10 bg-[#060607]">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(700px 420px at 50% 100%, rgba(212,255,63,0.16), transparent 70%), radial-gradient(500px 380px at 85% 10%, rgba(124,92,255,0.22), transparent 70%)",
        }}
      />
      <div className="relative mx-auto max-w-[1440px] px-5 py-28 text-center md:px-10 md:py-40">
        <Reveal>
          <p className="font-mono text-xs tracking-[0.4em] text-white/40">
            — THE FINALE —
          </p>
          <h2 className="mx-auto mt-6 font-display font-black leading-[0.88] tracking-tight">
            <span className="block text-[13vw] md:text-[7.5vw]">HAVE AN IDEA?</span>
            <span className="block text-[13vw] text-[#D4FF3F] md:text-[7.5vw]">
              LET&apos;S CRAFT IT.
            </span>
          </h2>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Magnetic strength={0.45}>
              <Link
                href="/contact"
                className="group flex items-center gap-3 rounded-full bg-[#D4FF3F] px-10 py-5 font-display text-base font-black text-black transition-shadow hover:shadow-[0_0_80px_rgba(212,255,63,0.5)]"
              >
                START A PROJECT
                <ArrowUpRight size={20} className="transition-transform duration-300 group-hover:rotate-45" />
              </Link>
            </Magnetic>
            <span className="font-mono text-xs text-white/40">
              AVG. REPLY — UNDER 24H
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ============ CONTACT / PROJECT REQUEST ============ */
export function ContactSection() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    projectType: "Web Development",
    budget: "$5k — $10k",
    timeline: "1–2 months",
    description: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [message, setMessage] = useState("");

  const set = (k: keyof typeof form) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    setMessage("");
    try {
      const r = await fetch("/api/project-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const j = await r.json();
      if (j.ok) {
        setStatus("done");
        setMessage("Request received. We'll reply within 24 hours.");
        setForm({ name: "", email: "", company: "", projectType: "Web Development", budget: "$5k — $10k", timeline: "1–2 months", description: "" });
      } else {
        setStatus("error");
        setMessage(j.error || "Something went wrong.");
      }
    } catch {
      setStatus("error");
      setMessage("Network error. Email us directly.");
    }
  };

  const inputCls =
    "field w-full rounded-xl px-4 py-3.5 text-sm text-white";

  return (
    <section id="contact" className="relative border-t border-white/10 bg-[#08080A]">
      <div className="mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-32">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr]">
          <div>
            <Reveal>
              <p className="font-mono text-xs tracking-[0.35em] text-[#D4FF3F]">
                ( CONTACT )
              </p>
              <h2 className="mt-4 font-display text-5xl font-black leading-[0.95] tracking-tight md:text-6xl">
                LET&apos;S BUILD
                <br />
                SOMETHING
                <br />
                <span className="text-[#D4FF3F]">GREAT.</span>
              </h2>
              <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/55">
                Tell us about your project. We reply to every serious enquiry
                within 24 hours with next steps + honest timeline.
              </p>
            </Reveal>
            <div className="mt-8 space-y-3">
              {[
                ["EMAIL", "hello@codecraft.concept"],
                ["WHATSAPP", "+1 (555) 010-2030"],
                ["PHONE", "+1 (555) 010-2030"],
              ].map(([k, v]) => (
                <div key={k} className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] px-5 py-4">
                  <span className="font-mono text-[11px] tracking-[0.3em] text-white/40">{k}</span>
                  <span className="text-sm font-bold">{v}</span>
                </div>
              ))}
            </div>
          </div>

          <Reveal delay={120}>
            <form
              onSubmit={submit}
              className="rounded-3xl border border-white/10 bg-[#0E0E11] p-6 md:p-9"
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-xs font-bold tracking-widest text-white/50">NAME *</label>
                  <input required value={form.name} onChange={set("name")} placeholder="Jane Cooper" className={inputCls} />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-bold tracking-widest text-white/50">EMAIL *</label>
                  <input required type="email" value={form.email} onChange={set("email")} placeholder="jane@company.com" className={inputCls} />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-bold tracking-widest text-white/50">COMPANY</label>
                  <input value={form.company} onChange={set("company")} placeholder="Company Inc." className={inputCls} />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-bold tracking-widest text-white/50">PROJECT TYPE</label>
                  <select value={form.projectType} onChange={set("projectType")} className={`${inputCls} appearance-none`}>
                    {["Web Development", "Web Application", "UI/UX Design", "E-Commerce", "Digital Experience / 3D", "SEO & Growth", "Other"].map((o) => (
                      <option key={o} className="bg-black">{o}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-bold tracking-widest text-white/50">BUDGET</label>
                  <select value={form.budget} onChange={set("budget")} className={`${inputCls} appearance-none`}>
                    {["< $3k", "$3k — $5k", "$5k — $10k", "$10k — $25k", "$25k+"].map((o) => (
                      <option key={o} className="bg-black">{o}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-bold tracking-widest text-white/50">TIMELINE</label>
                  <select value={form.timeline} onChange={set("timeline")} className={`${inputCls} appearance-none`}>
                    {["ASAP", "1–2 months", "2–4 months", "Flexible"].map((o) => (
                      <option key={o} className="bg-black">{o}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="mt-4">
                <label className="mb-1.5 block text-xs font-bold tracking-widest text-white/50">PROJECT DETAILS *</label>
                <textarea
                  required
                  rows={5}
                  value={form.description}
                  onChange={set("description")}
                  placeholder="What are you building? Goals, references, must-haves..."
                  className={`${inputCls} resize-none`}
                />
              </div>
              <button
                disabled={status === "sending"}
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-[#D4FF3F] py-4 font-display text-sm font-black tracking-wide text-black transition-all hover:shadow-[0_0_50px_rgba(212,255,63,0.4)] disabled:opacity-60"
              >
                {status === "sending" ? (
                  <>
                    <Loader2 size={18} className="animate-spin" /> SENDING...
                  </>
                ) : (
                  <>
                    SEND PROJECT REQUEST <Send size={16} />
                  </>
                )}
              </button>
              {message && (
                <p className={`mt-3 text-center text-sm ${status === "done" ? "text-[#D4FF3F]" : "text-red-400"}`}>
                  {message}
                </p>
              )}
              <p className="mt-3 text-center font-mono text-[11px] text-white/30">
                NDA-friendly • No spam • No commitment
              </p>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
