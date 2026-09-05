import { db } from "@/db";
import { projects } from "@/db/schema";
import { desc, eq } from "drizzle-orm";
import { FALLBACK_PROJECTS } from "@/lib/content";
import WorkClient from "./work-client";

export const dynamic = "force-dynamic";
export const metadata = { title: "Work — CodeCraft Concept" };

async function getData() {
  try {
    const rows = await db.select().from(projects).where(eq(projects.status, "published")).orderBy(desc(projects.id));
    if (rows.length) return rows as unknown as {
      title: string; slug: string; category: string; tagline?: string | null;
      client?: string | null; year?: string | null; color?: string | null;
      technologies?: string[] | null; description?: string | null;
    }[];
  } catch {}
  return FALLBACK_PROJECTS as unknown as {
    title: string; slug: string; category: string; tagline?: string | null;
    client?: string | null; year?: string | null; color?: string | null;
    technologies?: string[] | null; description?: string | null;
  }[];
}

export default async function WorkPage() {
  const data = (await getData()) as unknown as {
    title: string; slug: string; category: string; tagline?: string | null;
    client?: string | null; year?: string | null; color?: string | null;
    technologies?: string[] | null; description?: string | null;
  }[];
  return <WorkClient projects={data} />;
}
