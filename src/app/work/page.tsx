import { FALLBACK_PROJECTS } from "@/lib/content";
import WorkClient from "./work-client";

export const metadata = { title: "Work — CodeCraft Concept" };

export default function WorkPage() {
  return <WorkClient projects={FALLBACK_PROJECTS} />;
}
