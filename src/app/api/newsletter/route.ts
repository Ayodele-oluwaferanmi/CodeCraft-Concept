import { NextResponse } from "next/server";
import { db } from "@/db";
import { newsletterSubscribers } from "@/db/schema";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ ok: false, error: "Valid email required." }, { status: 400 });
    }
    try {
      await db.insert(newsletterSubscribers).values({ email: String(email).toLowerCase().slice(0, 255) });
    } catch {
      // duplicate — treat as success
    }
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ ok: true, demo: true });
  }
}
