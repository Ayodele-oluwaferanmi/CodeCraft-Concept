"use client";

import { useState } from "react";
import { Loader2, Send } from "lucide-react";
import { Reveal } from "@/components/chrome";
import { ContactSection } from "@/components/home-sections";

export default function ContactPage() {
  const [mini, setMini] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [msg, setMsg] = useState("");

  const submitMini = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    const messages = JSON.parse(localStorage.getItem("cc-messages") || "[]");
    localStorage.setItem("cc-messages", JSON.stringify([...messages, { ...mini, createdAt: new Date().toISOString() }]));
    setStatus("done");
    setMsg("Message saved. Talk soon.");
    setMini({ name: "", email: "", message: "" });
  };

  return (
    <main className="bg-[#060607] pt-[72px]">
      <div className="mx-auto max-w-[1440px] px-5 pt-14 md:px-10 md:pt-20">
        <Reveal>
          <p className="font-mono text-xs tracking-[0.35em] text-[#D4FF3F]">( CONTACT )</p>
          <h1 className="mt-4 font-display text-[13vw] font-black leading-[0.9] tracking-tight md:text-[7vw]">
            SAY HELLO.
            <br />
            <span className="text-stroke">WE REPLY FAST.</span>
          </h1>
        </Reveal>

        <div className="mt-12 grid gap-6 lg:grid-cols-[1fr_1fr]">
          <Reveal>
            <form onSubmit={submitMini} className="rounded-3xl border border-white/10 bg-[#0E0E11] p-7">
              <h2 className="font-display text-2xl font-black">QUICK MESSAGE</h2>
              <p className="mt-1 text-sm text-white/50">Just saying hi? Use this.</p>
              <div className="mt-5 space-y-4">
                <input required placeholder="Your name" value={mini.name} onChange={(e) => setMini({ ...mini, name: e.target.value })} className="field w-full rounded-xl px-4 py-3.5 text-sm text-white" />
                <input required type="email" placeholder="Email" value={mini.email} onChange={(e) => setMini({ ...mini, email: e.target.value })} className="field w-full rounded-xl px-4 py-3.5 text-sm text-white" />
                <textarea required rows={4} placeholder="Message..." value={mini.message} onChange={(e) => setMini({ ...mini, message: e.target.value })} className="field w-full resize-none rounded-xl px-4 py-3.5 text-sm text-white" />
              </div>
              <button disabled={status === "sending"} className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-white py-3.5 text-sm font-black text-black hover:bg-[#D4FF3F]">
                {status === "sending" ? <Loader2 className="animate-spin" size={16} /> : <Send size={16} />} SEND MESSAGE
              </button>
              {msg && <p className={`mt-2 text-center text-sm ${status === "done" ? "text-[#D4FF3F]" : "text-red-400"}`}>{msg}</p>}
            </form>
          </Reveal>
          <Reveal delay={120}>
            <div className="flex h-full flex-col justify-center rounded-3xl border border-[#D4FF3F]/25 bg-[#D4FF3F]/[0.05] p-7 md:p-10">
              <p className="font-mono text-xs tracking-[0.3em] text-[#D4FF3F]">PREFER A PROJECT BRIEF?</p>
              <h2 className="mt-3 font-display text-3xl font-black md:text-4xl">SCROLL DOWN FOR THE FULL PROJECT REQUEST FORM ↓</h2>
              <p className="mt-4 text-white/60">Budgets, timelines, project types — everything we need to quote accurately in one go.</p>
              <div className="mt-6 space-y-2 font-mono text-xs text-white/40">
                <p>EMAIL — bdev.codecraft@gmail.com</p>
                <p>RESPONSE — under 24h on weekdays</p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
      <ContactSection />
    </main>
  );
}
