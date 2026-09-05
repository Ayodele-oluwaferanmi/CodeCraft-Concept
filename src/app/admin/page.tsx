"use client";

import { useEffect, useState } from "react";
import { Inbox,Layers, Plus, RefreshCw, Lock, ArrowUpRight } from "lucide-react";

type Req = { id: number; name: string; email: string; company?: string | null; projectType?: string | null; budget?: string | null; timeline?: string | null; description: string; status?: string | null; createdAt?: string };
type Msg = { id: number; name: string; email: string; message: string; subject?: string | null; createdAt?: string };
type Proj = { id?: number; title: string; slug: string; category: string; tagline?: string | null; client?: string | null; year?: string | null };

const PASS = "craft-admin";

export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [pw, setPw] = useState("");
  const [tab, setTab] = useState<"requests" | "messages" | "projects">("requests");
  const [requests, setRequests] = useState<Req[]>([]);
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [projs, setProjs] = useState<Proj[]>([]);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ title: "", slug: "", category: "Web Application", tagline: "", client: "", year: "2026", description: "" });
  const [notice, setNotice] = useState("");

  useEffect(() => {
    if (sessionStorage.getItem("cc-admin") === "1") setAuthed(true);
  }, []);

  const login = (e: React.FormEvent) => {
    e.preventDefault();
    if (pw === PASS || pw === (process.env.NEXT_PUBLIC_ADMIN_KEY || "")) {
      sessionStorage.setItem("cc-admin", "1");
      setAuthed(true);
    } else setNotice("Wrong passcode. Hint: craft-admin");
  };

  const load = async () => {
    setLoading(true);
    setRequests(JSON.parse(localStorage.getItem("cc-project-requests") || "[]"));
    setMsgs(JSON.parse(localStorage.getItem("cc-messages") || "[]"));
    setProjs(JSON.parse(localStorage.getItem("cc-projects") || "[]"));
    setLoading(false);
  };

  useEffect(() => {
    if (authed) load();
  }, [authed ]);

  const createProject = async (e: React.FormEvent) => {
    e.preventDefault();
    const projects = JSON.parse(localStorage.getItem("cc-projects") || "[]");
    const project = { ...form, id: Date.now(), technologies: ["Next.js"], color: "#D4FF3F" };
    localStorage.setItem("cc-projects", JSON.stringify([...projects, project]));
    setNotice("Project created");
    setForm({ title: "", slug: "", category: "Web Application", tagline: "", client: "", year: "2026", description: "" });
    load();
  };

  if (!authed) {
    return (
      <main className="grid min-h-screen place-items-center bg-[#060607] px-6 pt-[72px]">
        <form onSubmit={login} className="w-full max-w-md rounded-3xl border border-white/10 bg-[#0E0E11] p-8">
          <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-[#D4FF3F] text-black"><Lock size={24} /></div>
          <h1 className="mt-5 text-center font-display text-3xl font-black">ADMIN ACCESS</h1>
          <p className="mt-2 text-center text-sm text-white/50">Demo passcode: <code className="rounded bg-white/10 px-2 py-0.5 font-mono text-[#D4FF3F]">craft-admin</code></p>
          <input type="password" value={pw} onChange={(e) => setPw(e.target.value)} placeholder="Enter passcode" className="field mt-6 w-full rounded-xl px-4 py-3.5 text-sm text-white" />
          <button className="mt-4 w-full rounded-full bg-[#D4FF3F] py-3.5 text-sm font-black text-black">UNLOCK DASHBOARD</button>
          {notice && <p className="mt-3 text-center text-sm text-red-400">{notice}</p>}
        </form>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#060607] pt-[72px]">
      <div className="mx-auto max-w-[1200px] px-5 py-10 md:px-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="font-mono text-xs tracking-[0.3em] text-[#D4FF3F]">( COMMAND CENTER )</p>
            <h1 className="mt-2 font-display text-4xl font-black md:text-5xl">DASHBOARD</h1>
          </div>
          <button onClick={load} className="flex items-center gap-2 rounded-full border border-white/15 px-5 py-2.5 text-sm font-bold hover:border-[#D4FF3F] hover:text-[#D4FF3F]">
            <RefreshCw size={15} className={loading ? "animate-spin" : ""} /> REFRESH
          </button>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {[
            ["PROJECT REQUESTS", requests.length, "#D4FF3F"],
            ["MESSAGES", msgs.length, "#4DE3FF"],
            ["PROJECTS", projs.length, "#FF7AD9"],
          ].map(([l, v, c]) => (
            <div key={l as string} className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
              <div className="font-display text-5xl font-black" style={{ color: c as string }}>{v as number}</div>
              <div className="mt-1 font-mono text-[11px] tracking-[0.25em] text-white/40">{l as string}</div>
            </div>
          ))}
        </div>

        <div className="mt-8 flex gap-2">
          {([["requests", "REQUESTS", Inbox], ["messages", "MESSAGES", Inbox], ["projects", "PROJECTS", Layers]] as const).map(([id, label, Icon]) => (
            <button key={id} onClick={() => setTab(id)} className={`flex items-center gap-2 rounded-full px-5 py-2.5 text-[13px] font-bold ${tab === id ? "bg-[#D4FF3F] text-black" : "border border-white/15 text-white/60"}`}>
              <Icon size={14} /> {label}
            </button>
          ))}
        </div>

        <div className="mt-6">
          {tab === "requests" && (
            <div className="space-y-3">
              {requests.map((r) => (
                <div key={r.id} className="rounded-2xl border border-white/10 bg-[#0D0D10] p-5">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <p className="font-bold">{r.name} <span className="font-normal text-white/40">— {r.email}</span></p>
                    <span className="rounded-full bg-[#D4FF3F]/15 px-3 py-1 font-mono text-[11px] text-[#D4FF3F]">{r.budget} • {r.projectType}</span>
                  </div>
                  <p className="mt-2 text-sm text-white/60">{r.description}</p>
                  <p className="mt-2 font-mono text-[11px] text-white/30">{r.company} • {r.timeline} • {r.createdAt ? new Date(r.createdAt).toLocaleString() : ""}</p>
                </div>
              ))}
              {!requests.length && <p className="rounded-2xl border border-dashed border-white/15 p-10 text-center text-white/40">No requests yet — submit the contact form to test.</p>}
            </div>
          )}
          {tab === "messages" && (
            <div className="space-y-3">
              {msgs.map((m) => (
                <div key={m.id} className="rounded-2xl border border-white/10 bg-[#0D0D10] p-5">
                  <p className="font-bold">{m.name} <span className="font-normal text-white/40">— {m.email}</span></p>
                  <p className="mt-1 text-xs text-[#4DE3FF]">{m.subject}</p>
                  <p className="mt-2 text-sm text-white/60">{m.message}</p>
                </div>
              ))}
              {!msgs.length && <p className="rounded-2xl border border-dashed border-white/15 p-10 text-center text-white/40">No messages yet.</p>}
            </div>
          )}
          {tab === "projects" && (
            <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
              <div className="space-y-3">
                {projs.map((p, i) => (
                  <a key={p.slug + i} href={`/work/${p.slug}`} className="flex items-center justify-between rounded-2xl border border-white/10 bg-[#0D0D10] p-5 hover:border-[#D4FF3F]/50">
                    <div>
                      <p className="font-bold">{p.title}</p>
                      <p className="text-xs text-white/40">/{p.slug} • {p.category}</p>
                    </div>
                    <ArrowUpRight size={18} className="text-[#D4FF3F]" />
                  </a>
                ))}
              </div>
              <form onSubmit={createProject} className="h-fit rounded-2xl border border-white/10 bg-[#0D0D10] p-6 lg:sticky lg:top-24">
                <p className="flex items-center gap-2 font-display text-lg font-black"><Plus size={18} /> NEW PROJECT</p>
                <div className="mt-4 space-y-3">
                  {(["title", "slug", "tagline", "client", "description"] as const).map((k) => (
                    <input key={k} placeholder={k} value={form[k]} onChange={(e) => setForm({ ...form, [k]: e.target.value })} className="field w-full rounded-xl px-4 py-3 text-sm text-white" required={k === "title" || k === "slug"} />
                  ))}
                  <div className="grid grid-cols-2 gap-3">
                    <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="field rounded-xl px-3 py-3 text-sm text-white">
                      {["Web Application", "E-Commerce", "SaaS Platform", "Digital Experience", "Website"].map((c) => <option key={c} className="bg-black">{c}</option>)}
                    </select>
                    <input placeholder="year" value={form.year} onChange={(e) => setForm({ ...form, year: e.target.value })} className="field rounded-xl px-4 py-3 text-sm text-white" />
                  </div>
                </div>
                <button className="mt-4 w-full rounded-full bg-[#D4FF3F] py-3 text-sm font-black text-black">CREATE</button>
                {notice && <p className="mt-2 text-center text-xs text-[#D4FF3F]">{notice}</p>}
              </form>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
