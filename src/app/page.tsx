import { db } from "@/db";
import { projects } from "@/db/schema";
import { desc, eq } from "drizzle-orm";
import HomeClient from "@/components/home-client";
import { FALLBACK_PROJECTS } from "@/lib/content";

export const dynamic = "force-dynamic";

async function getProjects() {
  try {
    const rows = await db
      .select()
      .from(projects)
      .where(eq(projects.status, "published"))
      .orderBy(desc(projects.featured), desc(projects.id))
      .limit(6);
    if (rows.length) {
      return rows.map((r) => ({
        title: r.title,
        slug: r.slug,
        category: r.category,
        tagline: r.tagline,
        description: r.description,
        technologies: (r.technologies as string[]) || [],
        client: r.client,
        year: r.year,
        color: r.color,
        stats: (r.stats as { label: string; value: string }[]) || [],
      }));
    }
  } catch {
    // fall through to fallback
  }
  return FALLBACK_PROJECTS;
}

export default async function HomePage() {
  const data = await getProjects();
  return <HomeClient projects={data} />;
}
