"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Menu, X, Zap } from "lucide-react";
import { NAV_LINKS } from "@/lib/content";

/* ---------------- Magnetic wrapper ---------------- */
export function Magnetic({
  children,
  strength = 0.35,
  className = "",
}: {
  children: React.ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  return (
    <div
      ref={ref}
      className={`magnetic inline-block ${className}`}
      onMouseMove={(e) => {
        const el = ref.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        const x = e.clientX - (r.left + r.width / 2);
        const y = e.clientY - (r.top + r.height / 2);
        el.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
      }}
      onMouseLeave={() => {
        if (ref.current) ref.current.style.transform = "translate(0,0)";
      }}
    >
      {children}
    </div>
  );
}

/* ---------------- Custom cursor ---------------- */
export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState("");

  useEffect(() => {
    const dot = dotRef.current!;
    const ring = ringRef.current!;
    if (!dot || !ring) return;
    let mx = -100,
      my = -100,
      rx = -100,
      ry = -100;
    let raf = 0;
    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      dot.style.left = `${mx}px`;
      dot.style.top = `${my}px`;
      const t = (e.target as HTMLElement)?.closest?.("[data-cursor]");
      const v = (e.target as HTMLElement)?.closest?.("[data-cursor='view']");
      if (v) {
        ring.classList.add("is-view");
        ring.classList.remove("is-hover");
        setLabel("VIEW");
      } else if (t || (e.target as HTMLElement)?.closest?.("a,button")) {
        ring.classList.add("is-hover");
        ring.classList.remove("is-view");
        setLabel("");
      } else {
        ring.classList.remove("is-hover", "is-view");
        setLabel("");
      }
    };
    const loop = () => {
      rx += (mx - rx) * 0.16;
      ry += (my - ry) * 0.16;
      ring.style.left = `${rx}px`;
      ring.style.top = `${ry}px`;
      raf = requestAnimationFrame(loop);
    };
    window.addEventListener("mousemove", onMove);
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot hidden md:block" />
      <div
        ref={ringRef}
        className="cursor-ring hidden md:flex items-center justify-center"
      >
        {label && (
          <span className="text-[10px] font-black tracking-widest text-black">
            {label}
          </span>
        )}
      </div>
    </>
  );
}

/* ---------------- Preloader ---------------- */
export function Preloader({ onDone }: { onDone: () => void }) {
  const [count, setCount] = useState(0);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    let v = 0;
    const t = setInterval(() => {
      v += Math.floor(Math.random() * 12) + 4;
      if (v >= 100) {
        v = 100;
        clearInterval(t);
        setTimeout(() => {
          setLeaving(true);
          setTimeout(onDone, 650);
        }, 350);
      }
      setCount(v);
    }, 90);
    return () => clearInterval(t);
  }, [onDone]);

  return (
    <div
      className={`fixed inset-0 z-[300] flex flex-col justify-between bg-[#060607] px-6 py-6 transition-transform duration-[650ms] ease-[cubic-bezier(0.76,0,0.24,1)] md:px-12 md:py-8 ${
        leaving ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="grid h-8 w-8 place-items-center rounded-lg bg-[#D4FF3F] font-black text-black">
            <Zap size={18} strokeWidth={2.8} />
          </div>
          <span className="font-display text-sm font-bold tracking-[0.25em]">
            CODECRAFT
          </span>
        </div>
        <span className="font-mono text-xs text-white/40">
          LOADING EXPERIENCE
        </span>
      </div>
      <div className="flex flex-col gap-6">
        <div className="overflow-hidden">
          <h1 className="font-display text-[13vw] font-black leading-[0.9] tracking-tight md:text-[7vw]">
            CODECRAFT
            <br />
            <span className="text-stroke">CONCEPT</span>
          </h1>
        </div>
        <div className="flex items-end justify-between gap-6">
          <div className="h-[2px] flex-1 overflow-hidden rounded bg-white/10">
            <div
              className="h-full bg-[#D4FF3F] transition-all duration-150"
              style={{ width: `${count}%` }}
            />
          </div>
          <span className="font-display text-6xl font-black tabular-nums text-[#D4FF3F] md:text-7xl">
            {count}
          </span>
        </div>
      </div>
    </div>
  );
}

/* ---------------- Navbar + fullscreen menu ---------------- */
export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [time, setTime] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    const tick = () =>
      setTime(
        new Date().toLocaleTimeString("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );
    tick();
    const i = setInterval(tick, 1000);
    return () => {
      window.removeEventListener("scroll", onScroll);
      clearInterval(i);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open ]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-[150] transition-all duration-500 ${
          scrolled
            ? "border-b border-white/10 bg-[#060607]/80 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-[72px] max-w-[1440px] items-center justify-between px-5 md:px-10">
          <Link href="/" className="group flex items-center gap-2.5">
            <div className="grid h-9 w-9 place-items-center rounded-xl bg-[#D4FF3F] text-black transition-transform duration-300 group-hover:rotate-[-8deg] group-hover:scale-105">
              <Zap size={19} strokeWidth={2.8} />
            </div>
            <div className="leading-none">
              <div className="font-display text-[15px] font-black tracking-[0.18em]">
                CODECRAFT
              </div>
              <div className="text-[10px] font-medium tracking-[0.42em] text-white/50">
                CONCEPT
              </div>
            </div>
          </Link>

          <nav className="hidden items-center gap-8 lg:flex">
            {NAV_LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="group relative text-[13px] font-semibold tracking-[0.18em] text-white/70 transition-colors hover:text-white"
              >
                {l.label.toUpperCase()}
                <span className="absolute -bottom-1.5 left-0 h-[2px] w-0 bg-[#D4FF3F] transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <span className="hidden font-mono text-xs text-white/40 xl:block">
              {time} — LOCAL
            </span>
            <Magnetic>
              <Link
                href="/contact"
                className="group hidden items-center gap-2 rounded-full bg-[#F4F1E8] px-5 py-2.5 text-[13px] font-bold tracking-wide text-black transition-colors hover:bg-[#D4FF3F] sm:flex"
              >
                START A PROJECT
                <ArrowUpRight
                  size={16}
                  className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </Link>
            </Magnetic>
            <button
              onClick={() => setOpen(!open)}
              aria-label="Menu"
              className="grid h-11 w-11 place-items-center rounded-full border border-white/15 bg-white/5 backdrop-blur transition-colors hover:border-[#D4FF3F] hover:text-[#D4FF3F]"
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* fullscreen menu */}
      <div
        className={`fixed inset-0 z-[140] flex flex-col justify-end bg-[#0A0A0C]/95 backdrop-blur-2xl transition-all duration-[600ms] ease-[cubic-bezier(0.76,0,0.24,1)] ${
          open ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            background:
              "radial-gradient(600px 400px at 80% 20%, rgba(124,92,255,0.35), transparent), radial-gradient(500px 400px at 15% 85%, rgba(212,255,63,0.18), transparent)",
          }}
        />
        <div className="relative mx-auto w-full max-w-[1440px] px-6 pb-10 pt-28 md:px-10">
          <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr]">
            <nav className="flex flex-col">
              {[
                { label: "HOME", href: "/", n: "01" },
                { label: "WORK", href: "/work", n: "02" },
                { label: "SERVICES", href: "/services", n: "03" },
                { label: "ABOUT", href: "/about", n: "04" },
                { label: "CONTACT", href: "/contact", n: "05" },
                { label: "ADMIN", href: "/admin", n: "06" },
              ].map((l, i) => (
                <Link
                  key={l.href + l.label}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className={`group flex items-baseline gap-4 border-b border-white/10 py-3 transition-all duration-500 md:py-4 ${
                    open
                      ? "translate-y-0 opacity-100"
                      : "translate-y-8 opacity-0"
                  }`}
                  style={{ transitionDelay: open ? `${i * 70}ms` : "0ms" }}
                >
                  <span className="font-mono text-xs text-[#D4FF3F]">
                    {l.n}
                  </span>
                  <span className="font-display text-4xl font-black tracking-tight transition-all duration-300 group-hover:translate-x-3 group-hover:text-[#D4FF3F] md:text-6xl">
                    {l.label}
                  </span>
                  <ArrowUpRight
                    className="ml-auto opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:text-[#D4FF3F]"
                    size={28}
                  />
                </Link>
              ))}
            </nav>
            <div className="flex flex-col justify-end gap-6">
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
                <p className="text-xs font-bold tracking-[0.3em] text-white/40">
                  NEW BUSINESS
                </p>
                <a
                  href="mailto:hello@codecraft.concept"
                  className="mt-2 block font-display text-xl font-bold hover:text-[#D4FF3F]"
                >
                  hello@codecraft.concept
                </a>
                <p className="mt-4 text-sm text-white/50">
                  Currently booking — 2 slots left for Q4 2026. Premium builds
                  only.
                </p>
                <Link
                  href="/contact"
                  onClick={() => setOpen(false)}
                  className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#D4FF3F] px-6 py-3 text-sm font-black text-black"
                >
                  START A PROJECT <ArrowUpRight size={16} />
                </Link>
              </div>
              <div className="flex gap-4 text-xs font-semibold tracking-widest text-white/40">
                {["X", "INSTAGRAM", "DRIBBBLE", "LINKEDIN"].map((s) => (
                  <a key={s} href="#" className="hover:text-[#D4FF3F]">
                    {s}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

/* ---------------- Reveal on scroll ---------------- */
export function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setTimeout(() => el.classList.add("is-visible"), delay);
            io.unobserve(el);
          }
        });
      },
      { threshold: 0.12 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [delay]);
  return (
    <div ref={ref} className={`reveal ${className}`}>
      {children}
    </div>
  );
}

/* ---------------- Footer ---------------- */
export function Footer() {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const subscribers = JSON.parse(localStorage.getItem("cc-newsletter") || "[]");
    if (!subscribers.includes(email.toLowerCase())) {
      localStorage.setItem("cc-newsletter", JSON.stringify([...subscribers, email.toLowerCase()]));
    }
    setMsg("You're in. Welcome to the craft.");
    setEmail("");
  };
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-[#08080A]">
      <div className="mx-auto max-w-[1440px] px-5 pb-8 pt-16 md:px-10 md:pt-20">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-2.5">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-[#D4FF3F] text-black">
                <Zap size={20} strokeWidth={2.8} />
              </div>
              <div className="leading-none">
                <div className="font-display text-lg font-black tracking-[0.18em]">
                  CODECRAFT
                </div>
                <div className="text-[10px] tracking-[0.42em] text-white/50">
                  CONCEPT
                </div>
              </div>
            </div>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/50">
              A creative technology studio crafting websites, applications and
              digital experiences that combine design, technology and business.
            </p>
            <form onSubmit={submit} className="mt-6 flex max-w-sm gap-2">
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                required
                placeholder="your@email.com"
                className="field h-12 flex-1 rounded-full px-5 text-sm text-white"
              />
              <button className="h-12 rounded-full bg-[#D4FF3F] px-5 text-sm font-black text-black transition-transform hover:scale-105">
                JOIN
              </button>
            </form>
            {msg && <p className="mt-2 text-xs text-[#D4FF3F]">{msg}</p>}
          </div>
          <div>
            <p className="text-xs font-bold tracking-[0.3em] text-white/40">
              SITEMAP
            </p>
            <div className="mt-4 grid grid-cols-2 gap-2">
              {[
                ["Home", "/"],
                ["Work", "/work"],
                ["Services", "/services"],
                ["About", "/about"],
                ["Contact", "/contact"],
                ["Admin", "/admin"],
              ].map(([l, h]) => (
                <Link
                  key={h + l}
                  href={h}
                  className="py-1 text-sm text-white/70 hover:text-[#D4FF3F]"
                >
                  {l}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <p className="text-xs font-bold tracking-[0.3em] text-white/40">
              CONTACT
            </p>
            <div className="mt-4 space-y-2 text-sm text-white/70">
              <p>hello@codecraft.concept</p>
              <p>+1 (555) 010-2030</p>
              <p>WhatsApp — instant reply</p>
              <div className="flex gap-4 pt-2 text-xs font-bold tracking-widest text-white/40">
                {["X", "IG", "LI", "DR"].map((s) => (
                  <a key={s} href="#" className="hover:text-[#D4FF3F]">
                    {s}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="mt-14 select-none overflow-hidden">
          <div className="font-display text-[12.5vw] font-black leading-[0.85] tracking-tight text-white/[0.06]">
            CODECRAFT
          </div>
        </div>
        <div className="mt-6 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-xs text-white/35 md:flex-row">
          <span>© 2026 CodeCraft Concept. All rights reserved.</span>
          <span className="font-mono">WE DON'T BUILD WEBSITES — WE BUILD EXPERIENCES.</span>
        </div>
      </div>
    </footer>
  );
}
