import { NextResponse } from "next/server";
import { db } from "@/db";
import { projects } from "@/db/schema";
import { desc, eq } from "drizzle-orm";
import { FALLBACK_PROJECTS } from "@/lib/content";

export async function GET() {
  try {
    const rows = await db
      .select()
      .from(projects)
      .where(eq(projects.status, "published"))
      .orderBy(desc(projects.id));
    if (!rows.length) return NextResponse.json({ ok: true, data: FALLBACK_PROJECTS });
    return NextResponse.json({ ok: true, data: rows });
  } catch {
    return NextResponse.json({ ok: true, data: FALLBACK_PROJECTS });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, slug, category } = body;
    if (!title || !slug || !category) {
      return NextResponse.json({ ok: false, error: "title, slug, category required" }, { status: 400 });
    }
    const cleanSlug = String(slug).toLowerCase().replace(/[^a-z0-9-]+/g, "-");
    const [row] = await db
      .insert(projects)
      .values({
        title: String(title).slice(0, 255),
        slug: cleanSlug,
        category: String(category).slice(0, 120),
        tagline: body.tagline || null,
        description: body.description || null,
        challenge: body.challenge || null,
        idea: body.idea || null,
        design: body.design || null,
        development: body.development || null,
        results: body.results || null,
        technologies: body.technologies || [],
        client: body.client || null,
        year: body.year || "2026",
        status: body.status || "published",
        featured: !!body.featured,
        color: body.color || "#D4FF3F",
        stats: body.stats || [],
        timeline: body.timeline || null,
      })
      .returning();
    return NextResponse.json({ ok: true, data: row });
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : "Create failed";
    return NextResponse.json({ ok: false, error: msg }, { status: 500 });
  }
}
