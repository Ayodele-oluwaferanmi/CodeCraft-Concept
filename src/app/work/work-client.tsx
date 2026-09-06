"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/chrome";

type P = {
  title: string;
  slug: string;
  category: string;
  tagline?: string | null;
  client?: string | null;
  year?: string | null;
  thumbnail?: string | null;
  color?: string | null;
  technologies?: string[] | null;
};

const FILTERS = ["All", "Web Application", "E-Commerce", "SaaS Platform", "Digital Experience"];

export default function WorkClient({ projects }: { projects: P[] }) {
  const [filter, setFilter] = useState("All");
  const [visibleProjects, setVisibleProjects] = useState(projects);

  useEffect(() => {
    const localProjects = JSON.parse(localStorage.getItem("cc-projects") || "[]") as P[];
    if (localProjects.length) setVisibleProjects([...projects, ...localProjects]);
  }, [projects]);

  const list = filter === "All" ? visibleProjects : visibleProjects.filter((p) => p.category === filter);

  return (
    <main className="bg-[#060607] pt-[72px]">
      <div className="mx-auto max-w-[1440px] px-5 pb-20 pt-14 md:px-10 md:pt-20">
        <Reveal>
          <p className="font-mono text-xs tracking-[0.35em] text-[#D4FF3F]">( SELECTED WORK — {visibleProjects.length} )</p>
          <h1 className="mt-4 font-display text-[13vw] font-black leading-[0.9] tracking-tight md:text-[7vw]">
            WORK THAT
            <br />
            <span className="text-stroke">SPEAKS LOUD.</span>
          </h1>
          <p className="mt-6 max-w-xl text-white/55">
            Every project is a story of problem → idea → craft → results. Click any case to see the full breakdown.
          </p>
        </Reveal>

        <div className="mt-10 flex flex-wrap gap-2">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`rounded-full border px-5 py-2.5 text-[13px] font-bold transition-all ${
                filter === f
                  ? "border-[#D4FF3F] bg-[#D4FF3F] text-black"
                  : "border-white/15 text-white/60 hover:border-white/40 hover:text-white"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {list.map((p, i) => (
            <Reveal key={p.slug} delay={(i % 2) * 100}>
              <Link
                href={`/work/${p.slug}`}
                data-cursor="view"
                className="group block overflow-hidden rounded-3xl border border-white/10 bg-[#0D0D10] transition-all duration-500 hover:border-white/25 hover:-translate-y-1.5"
              >
                <div
                  className="relative h-64 overflow-hidden md:h-72"
                  style={{ background: `linear-gradient(135deg, #141417, ${p.color || "#D4FF3F"}26)` }}
                >
                  {p.thumbnail && (
                    <Image
                      src={p.thumbnail}
                      alt={`${p.title} project preview`}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(min-width: 768px) 50vw, 100vw"
                    />
                  )}
                  <div className="absolute inset-0 bg-black/20" />
                  <div className="absolute inset-0 grid place-items-center">
                    <span className="font-display text-[7rem] font-black text-white/[0.07] transition-all duration-500 group-hover:scale-110 group-hover:text-white/[0.12]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <div
                    className="absolute -bottom-12 -right-12 h-48 w-48 rounded-full blur-[60px] transition-all duration-500 group-hover:scale-150"
                    style={{ background: `${p.color || "#D4FF3F"}55` }}
                  />
                  <div
                    className="absolute inset-x-8 top-1/2 hidden -translate-y-1/2 rounded-xl border border-white/15 bg-black/70 p-4 font-mono text-[11px] backdrop-blur transition-all duration-500 group-hover:-translate-y-[60%] md:block"
                  >
                    <div className="flex gap-1.5">
                      <span className="h-2 w-2 rounded-full bg-[#FF5F57]" />
                      <span className="h-2 w-2 rounded-full bg-[#FEBC2E]" />
                      <span className="h-2 w-2 rounded-full bg-[#28C840]" />
                    </div>
                    <p className="mt-3 text-white/70">{p.tagline || p.title}</p>
                    <p className="mt-1" style={{ color: p.color || "#D4FF3F" }}>→ open case study</p>
                  </div>
                  <span
                    className="absolute left-5 top-5 rounded-full px-3 py-1 text-[11px] font-black tracking-widest"
                    style={{ background: `${p.color || "#D4FF3F"}22`, color: p.color || "#D4FF3F", border: `1px solid ${p.color || "#D4FF3F"}44` }}
                  >
                    {p.category?.toUpperCase()}
                  </span>
                  <span className="absolute right-5 top-5 grid h-12 w-12 place-items-center rounded-full bg-white text-black opacity-0 transition-all duration-300 group-hover:opacity-100">
                    <ArrowUpRight size={20} />
                  </span>
                </div>
                <div className="p-6 md:p-7">
                  <div className="flex items-center justify-between font-mono text-xs text-white/35">
                    <span>{p.client}</span>
                    <span>{p.year}</span>
                  </div>
                  <h2 className="mt-2 font-display text-2xl font-black tracking-tight group-hover:text-[#D4FF3F] transition-colors md:text-3xl">
                    {p.title}
                  </h2>
                  <p className="mt-2 line-clamp-2 text-sm text-white/50">{p.tagline}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {(p.technologies || []).slice(0, 4).map((t) => (
                      <span key={t} className="rounded-full bg-white/5 px-3 py-1 text-[11px] text-white/55">{t}</span>
                    ))}
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        {list.length === 0 && (
          <p className="mt-16 text-center text-white/40">No projects in this category yet.</p>
        )}
      </div>
    </main>
  );
}
