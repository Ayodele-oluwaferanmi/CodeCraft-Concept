import { NextResponse } from "next/server";
import { db } from "@/db";
import { projectRequests } from "@/db/schema";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, company, projectType, budget, timeline, description } = body;

    if (!name || !email || !description) {
      return NextResponse.json({ ok: false, error: "Name, email and details are required." }, { status: 400 });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ ok: false, error: "Invalid email address." }, { status: 400 });
    }
    if (String(description).length < 10) {
      return NextResponse.json({ ok: false, error: "Please tell us a bit more (10+ chars)." }, { status: 400 });
    }

    await db.insert(projectRequests).values({
      name: String(name).slice(0, 255),
      email: String(email).slice(0, 255),
      company: company ? String(company).slice(0, 255) : null,
      projectType: projectType ? String(projectType).slice(0, 120) : null,
      budget: budget ? String(budget).slice(0, 120) : null,
      timeline: timeline ? String(timeline).slice(0, 120) : null,
      description: String(description).slice(0, 5000),
    });

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("project-request error", e);
    return NextResponse.json({ ok: false, error: "Unable to save project request." }, { status: 500 });
  }
}

export async function GET() {
  try {
    const { desc } = await import("drizzle-orm");
    const rows = await db.select().from(projectRequests).orderBy(desc(projectRequests.id)).limit(100);
    return NextResponse.json({ ok: true, data: rows });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ ok: false, error: "DB unavailable" }, { status: 500 });
  }
}
