import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { FALLBACK_PROJECTS } from "@/lib/content";
import { Reveal } from "@/components/chrome";

type FullProject = {
  title: string; slug: string; category: string;
  tagline?: string | null; description?: string | null;
  challenge?: string | null; idea?: string | null; design?: string | null;
  development?: string | null; results?: string | null;
  technologies?: string[] | null; client?: string | null; year?: string | null;
  color?: string | null; timeline?: string | null;
  stats?: { label: string; value: string }[] | null;
  heroImage?: string | null;
  websiteUrl?: string | null;
};

async function getProject(slug: string): Promise<FullProject | null> {
  const fb = (FALLBACK_PROJECTS as unknown as FullProject[]).find((p) => p.slug === slug);
  return fb || null;
}

async function getNext(slug: string): Promise<FullProject | null> {
  const all = FALLBACK_PROJECTS as unknown as FullProject[];
  const idx = all.findIndex((p) => p.slug === slug);
  if (idx === -1) return null;
  return all[(idx + 1) % all.length];
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = await getProject(slug);
  if (!p) notFound();
  const next = await getNext(slug);
  const color = p.color || "#D4FF3F";

  const chapters: [string, string | null | undefined][] = [
    ["THE CHALLENGE", p.challenge],
    ["THE IDEA", p.idea],
    ["THE DESIGN", p.design],
    ["THE DEVELOPMENT", p.development],
    ["THE RESULTS", p.results],
  ];

  return (
    <main className="bg-[#060607] pt-[72px]">
      {/* hero */}
      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0" style={{ background: `radial-gradient(800px 400px at 50% 0%, ${color}26, transparent 70%)` }} />
        <div className="relative mx-auto max-w-[1440px] px-5 pb-14 pt-12 md:px-10 md:pt-16">
          <Link href="/work" className="inline-flex items-center gap-2 text-sm font-bold text-white/50 hover:text-white">
            <ArrowLeft size={16} /> ALL WORK
          </Link>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <span className="rounded-full px-4 py-1.5 text-xs font-black tracking-widest" style={{ background: `${color}22`, color, border: `1px solid ${color}55` }}>
              {p.category?.toUpperCase()}
            </span>
            <span className="font-mono text-xs text-white/40">{p.year} — {p.client} — {p.timeline || "6–10 weeks"}</span>
          </div>
          <h1 className="mt-6 font-display text-[11vw] font-black leading-[0.9] tracking-tight md:text-[5.5vw]">
            {p.title?.toUpperCase()}
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-white/65 md:text-xl">{p.tagline}</p>
          <div className="mt-8 flex flex-wrap gap-2">
            {(p.technologies || []).map((t) => (
              <span key={t} className="rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-[13px] text-white/70">{t}</span>
            ))}
          </div>
          {p.websiteUrl && (
            <a
              href={p.websiteUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-black text-black transition-transform hover:-translate-y-0.5"
            >
              VISIT SITE <ArrowUpRight size={17} />
            </a>
          )}
          {/* hero visual */}
          <div className="relative mt-10 overflow-hidden rounded-3xl border border-white/10" style={{ background: `linear-gradient(135deg, #101014, ${color}1F)` }}>
            {p.heroImage ? (
              <Image
                src={p.heroImage}
                alt={`${p.title} project preview`}
                width={1600}
                height={900}
                className="relative max-h-[620px] w-full object-cover"
                priority
              />
            ) : (
              <div className="grid place-items-center px-6 py-20 md:py-28">
                <span className="font-display text-[22vw] font-black leading-none text-white/[0.07] md:text-[10rem]">{p.title?.slice(0, 2).toUpperCase()}</span>
                <p className="mt-2 max-w-xl text-center font-mono text-xs tracking-[0.3em] text-white/40">FINAL PRODUCT — LIVE & MEASURABLE</p>
              </div>
            )}
            <div className="absolute -bottom-16 left-1/2 h-48 w-[600px] -translate-x-1/2 rounded-full blur-[80px]" style={{ background: `${color}55` }} />
          </div>
        </div>
      </div>

      {/* stats */}
      {!!p.stats?.length && (
        <div className="mx-auto max-w-[1440px] px-5 md:px-10">
          <div className="grid gap-4 sm:grid-cols-3">
            {p.stats.map((s) => (
              <div key={s.label} className="rounded-2xl border border-white/10 bg-white/[0.03] p-7 text-center">
                <div className="font-display text-4xl font-black md:text-5xl" style={{ color }}>{s.value}</div>
                <div className="mt-2 font-mono text-[11px] tracking-[0.25em] text-white/40">{s.label.toUpperCase()}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* chapters */}
      <div className="mx-auto max-w-[1100px] px-5 py-16 md:px-10 md:py-24">
        <Reveal>
          <p className="text-lg leading-relaxed text-white/75 md:text-xl">{p.description}</p>
        </Reveal>
        <div className="mt-12 space-y-6">
          {chapters.map(([title, body], i) => (
            <Reveal key={title} delay={0}>
              <div className="grid gap-4 rounded-3xl border border-white/10 bg-[#0C0C0F] p-7 md:grid-cols-[220px_1fr] md:p-10">
                <div>
                  <span className="font-mono text-xs" style={{ color }}>0{i + 1}</span>
                  <h2 className="mt-2 font-display text-2xl font-black tracking-tight">{title}</h2>
                </div>
                <p className="leading-relaxed text-white/60">{body || "—"}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 rounded-3xl border border-white/10 bg-white/[0.03] p-8 text-center md:flex-row md:text-left">
          <div>
            <p className="font-mono text-xs tracking-[0.3em] text-white/40">WANT RESULTS LIKE THESE?</p>
            <p className="mt-2 font-display text-2xl font-black md:text-3xl">Let&apos;s craft your story next.</p>
          </div>
          <Link href="/contact" className="flex items-center gap-2 rounded-full px-8 py-4 text-sm font-black text-black" style={{ background: color }}>
            START A PROJECT <ArrowUpRight size={18} />
          </Link>
        </div>

        {next && (
          <Link href={`/work/${next.slug}`} className="group mt-8 block overflow-hidden rounded-3xl border border-white/10 bg-[#0C0C0F] p-8 transition-colors hover:border-white/30 md:p-12">
            <p className="font-mono text-xs tracking-[0.3em] text-white/40">NEXT PROJECT →</p>
            <div className="mt-3 flex items-center justify-between gap-6">
              <h3 className="font-display text-3xl font-black tracking-tight group-hover:text-[#D4FF3F] md:text-5xl">{next.title}</h3>
              <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-[#D4FF3F] text-black transition-transform group-hover:rotate-45">
                <ArrowRight size={22} />
              </span>
            </div>
            <p className="mt-2 text-white/50">{next.tagline}</p>
          </Link>
        )}
      </div>
    </main>
  );
}
