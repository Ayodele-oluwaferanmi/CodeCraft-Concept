"use client";

import { useEffect, useState } from "react";
import Hero3D from "./hero3d";
import { Preloader } from "./chrome";
import {
  HeroContent,
  BrandStatement,
  ServicesExperience,
  SelectedWork,
  Process,
  TechEcosystem,
  AboutTeaser,
  FinalCTA,
  ContactSection,
  type HomeProject,
} from "./home-sections";

export default function HomeClient({ projects }: { projects: HomeProject[] }) {
  const [loaded, setLoaded] = useState(false);
  const [visibleProjects, setVisibleProjects] = useState(projects);

  useEffect(() => {
    const localProjects = JSON.parse(localStorage.getItem("cc-projects") || "[]") as HomeProject[];
    if (localProjects.length) setVisibleProjects([...projects, ...localProjects]);
  }, [projects]);

  return (
    <>
      {!loaded && <Preloader onDone={() => setLoaded(true)} />}
      <main className="relative">
        {/* HERO */}
        <section className="relative min-h-[100svh] overflow-hidden bg-[#060607]">
          <Hero3D />
          <HeroContent />
        </section>

        <BrandStatement />
        <ServicesExperience />
        <SelectedWork projects={visibleProjects} />
        <Process />
        <TechEcosystem />
        <AboutTeaser />
        <FinalCTA />
        <ContactSection />
      </main>
    </>
  );
}
