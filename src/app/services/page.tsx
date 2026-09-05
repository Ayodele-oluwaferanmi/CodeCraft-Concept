import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import { Reveal } from "@/components/chrome";
import { SERVICES, PROCESS } from "@/lib/content";

export const metadata = { title: "Services — CodeCraft Concept" };

const PRICING: Record<string, string> = {
  "WEB DEVELOPMENT": "from $4k",
  "WEB APPLICATIONS": "from $8k",
  "UI / UX DESIGN": "from $3k",
  "E-COMMERCE": "from $6k",
  "DIGITAL EXPERIENCES": "from $7k",
  "SEO & GROWTH": "from $1.5k/mo",
};

export default function ServicesPage() {
  return (
    <main className="bg-[#060607] pt-[72px]">
      <div className="mx-auto max-w-[1440px] px-5 pb-24 pt-14 md:px-10 md:pt-20">
        <Reveal>
          <p className="font-mono text-xs tracking-[0.35em] text-[#D4FF3F]">( SERVICES — 06 )</p>
          <h1 className="mt-4 font-display text-[13vw] font-black leading-[0.9] tracking-tight md:text-[7vw]">
            CAPABILITIES,
            <br />
            <span className="text-stroke">NOT COMMODITIES.</span>
          </h1>
          <p className="mt-6 max-w-xl text-white/55">
            Six crafts, one standard: premium. Every engagement includes strategy, design, engineering and launch support.
          </p>
        </Reveal>

        <div className="mt-14 space-y-5">
          {SERVICES.map((s, i) => (
            <Reveal key={s.id} delay={0}>
              <div
                className="group grid gap-6 overflow-hidden rounded-3xl border border-white/10 bg-[#0C0C0F] p-7 transition-all duration-500 hover:border-white/25 md:grid-cols-[80px_1fr_300px] md:items-center md:p-9"
              >
                <span className="font-display text-5xl font-black text-white/15 transition-colors group-hover:text-white/30">
                  {s.id}
                </span>
                <div>
                  <h2 className="font-display text-3xl font-black tracking-tight md:text-4xl" style={{ ["--a" as string]: s.accent }}>
                    {s.title}
                  </h2>
                  <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-white/55">{s.desc}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {s.tags.map((t) => (
                      <span key={t} className="rounded-full border border-white/12 px-3 py-1 text-xs text-white/55">{t}</span>
                    ))}
                  </div>
                  <div className="mt-4 flex items-center gap-4 text-sm">
                    <span className="flex items-center gap-1.5 text-white/60"><Check size={14} className="text-[#D4FF3F]" /> Strategy included</span>
                    <span className="flex items-center gap-1.5 text-white/60"><Check size={14} className="text-[#D4FF3F]" /> 30-day support</span>
                  </div>
                </div>
                <div className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-black/40 p-6">
                  <span className="font-mono text-[11px] tracking-[0.3em] text-white/40">STARTING AT</span>
                  <span className="font-display text-3xl font-black" style={{ color: s.accent }}>{PRICING[s.title]}</span>
                  <Link href="/contact" className="mt-2 flex items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-black text-black transition-all hover:bg-[#D4FF3F]">
                    GET QUOTE <ArrowUpRight size={16} />
                  </Link>
                  <span className="text-center font-mono text-[11px] text-white/30">0{i + 1} — {s.short}</span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-20 rounded-3xl border border-[#D4FF3F]/25 bg-[#D4FF3F]/[0.04] p-8 md:p-12">
          <h2 className="font-display text-3xl font-black md:text-5xl">HOW WE DELIVER — {PROCESS.map((p) => p.name).join(" → ")}</h2>
          <p className="mt-4 max-w-2xl text-white/60">
            Fixed scope, weekly demos, performance budgets and a launch checklist with 60+ items. You always know what happens next.
          </p>
          <Link href="/contact" className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#D4FF3F] px-8 py-4 text-sm font-black text-black">
            START A PROJECT <ArrowUpRight size={18} />
          </Link>
        </div>
      </div>
    </main>
  );
}
