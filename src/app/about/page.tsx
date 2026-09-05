import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/chrome";
import { TECH_STACK } from "@/lib/content";

export const metadata = { title: "About — CodeCraft Concept" };

export default function AboutPage() {
  return (
    <main className="bg-[#060607] pt-[72px]">
      <div className="mx-auto max-w-[1440px] px-5 pb-24 pt-14 md:px-10 md:pt-20">
        <Reveal>
          <p className="font-mono text-xs tracking-[0.35em] text-[#D4FF3F]">( ABOUT CODECRAFT )</p>
          <h1 className="mt-4 font-display text-[13vw] font-black leading-[0.9] tracking-tight md:text-[7vw]">
            WE ARE
            <br />
            CODECRAFT <span className="text-[#D4FF3F]">CONCEPT.</span>
          </h1>
        </Reveal>

        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          <Reveal>
            <div className="rounded-3xl border border-white/10 bg-[#0C0C0F] p-8 md:p-10">
              <p className="text-lg leading-relaxed text-white/75">
                A creative technology studio focused on building websites, applications and digital experiences that combine{" "}
                <span className="text-[#D4FF3F] font-bold">design</span>,{" "}
                <span className="text-[#4DE3FF] font-bold">technology</span> and{" "}
                <span className="text-[#FF7AD9] font-bold">business</span>.
              </p>
              <p className="mt-5 text-[15px] leading-relaxed text-white/55">
                Founded in 2019, we&apos;ve shipped 120+ projects for startups, fashion houses, fintechs and festivals. Our rule is simple: if it doesn&apos;t move the metric and move the person — we don&apos;t ship it.
              </p>
              <div className="mt-8 grid grid-cols-3 gap-4 border-t border-white/10 pt-8">
                {[
                  ["120+", "Projects"],
                  ["68+", "Clients"],
                  ["7", "Years"],
                ].map(([v, l]) => (
                  <div key={l}>
                    <div className="font-display text-4xl font-black text-[#D4FF3F] md:text-5xl">{v}</div>
                    <div className="mt-1 font-mono text-[11px] tracking-[0.25em] text-white/40">{l.toUpperCase()}</div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
          <div className="space-y-4">
            {[
              ["CREATIVE", "We art-direct every pixel. Typography, motion and 3D are brand tools, not decoration."],
              ["TECHNICAL", "Clean architecture, typed code, tested backends. Next.js + Postgres is our default weapon."],
              ["BOLD", "We push clients past safe. Safe doesn't get remembered — or convert."],
              ["RELIABLE", "Fixed scopes, weekly demos, 30-day post-launch support. We answer fast."],
            ].map(([t, d], i) => (
              <Reveal key={t} delay={i * 80}>
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
                  <p className="font-display text-xl font-black tracking-wide"><span className="text-[#D4FF3F]">0{i + 1}</span> — {t}</p>
                  <p className="mt-2 text-sm text-white/55">{d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal>
          <h2 className="mt-20 font-display text-3xl font-black md:text-5xl">MANIFESTO</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {[
              "We don't do templates. Ever.",
              "Performance is a feature — 90+ or it doesn't launch.",
              "Motion must mean something. No decoration without direction.",
              "Content first, chrome second.",
              "Mobile is not a breakpoint. It's the audience.",
              "Launch is day one, not the finish line.",
            ].map((m, i) => (
              <div key={i} className="rounded-2xl bg-[#D4FF3F] p-6 font-display text-lg font-black leading-snug text-black">
                {m}
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal>
          <h2 className="mt-20 font-display text-3xl font-black md:text-4xl">STACK WE MASTER</h2>
          <div className="mt-6 flex flex-wrap gap-2.5">
            {TECH_STACK.map((t) => (
              <span key={t} className="rounded-full border border-white/12 bg-white/[0.04] px-4 py-2 text-sm text-white/70">{t}</span>
            ))}
          </div>
          <Link href="/contact" className="mt-10 inline-flex items-center gap-2 rounded-full bg-[#D4FF3F] px-8 py-4 text-sm font-black text-black">
            WORK WITH US <ArrowUpRight size={18} />
          </Link>
        </Reveal>
      </div>
    </main>
  );
}
