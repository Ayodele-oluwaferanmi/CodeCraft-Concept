import { NextResponse } from "next/server";
import { db } from "@/db";
import { messages } from "@/db/schema";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, company, phone, subject, message } = body;
    if (!name || !email || !message) {
      return NextResponse.json({ ok: false, error: "Name, email and message required." }, { status: 400 });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ ok: false, error: "Invalid email." }, { status: 400 });
    }
    await db.insert(messages).values({
      name: String(name).slice(0, 255),
      email: String(email).slice(0, 255),
      company: company ? String(company).slice(0, 255) : null,
      phone: phone ? String(phone).slice(0, 64) : null,
      subject: subject ? String(subject).slice(0, 255) : null,
      message: String(message).slice(0, 5000),
    });
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ ok: false, error: "Unable to save message." }, { status: 500 });
  }
}

export async function GET() {
  try {
    const { desc } = await import("drizzle-orm");
    const rows = await db.select().from(messages).orderBy(desc(messages.id)).limit(100);
    return NextResponse.json({ ok: true, data: rows });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ ok: false, error: "DB unavailable" }, { status: 500 });
  }
}
