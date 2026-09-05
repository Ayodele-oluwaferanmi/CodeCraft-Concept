import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center bg-[#060607] px-6 pt-[72px]">
      <div className="text-center">
        <p className="font-mono text-xs tracking-[0.4em] text-[#D4FF3F]">( 404 — LOST IN THE VOID )</p>
        <h1 className="mt-6 font-display text-[30vw] font-black leading-none tracking-tight text-white/10 md:text-[12rem]">
          404
        </h1>
        <p className="mx-auto mt-4 max-w-md text-white/55">
          This page drifted into another dimension. Let&apos;s get you back to the experience.
        </p>
        <div className="mt-8 flex items-center justify-center gap-3">
          <Link href="/" className="flex items-center gap-2 rounded-full bg-[#D4FF3F] px-8 py-4 text-sm font-black text-black">
            BACK HOME <ArrowUpRight size={16} />
          </Link>
          <Link href="/work" className="rounded-full border border-white/20 px-8 py-4 text-sm font-bold hover:bg-white hover:text-black">
            SEE WORK
          </Link>
        </div>
      </div>
    </main>
  );
}
