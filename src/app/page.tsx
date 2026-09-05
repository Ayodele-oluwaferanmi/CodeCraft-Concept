import HomeClient from "@/components/home-client";
import { FALLBACK_PROJECTS } from "@/lib/content";

export default function HomePage() {
  return <HomeClient projects={FALLBACK_PROJECTS} />;
}
