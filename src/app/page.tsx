import Image from "next/image";
import { getFeaturedProjects } from "@/lib/projects";
import { ProjectCard } from "@/components/project-card";

export default function HomePage() {
  const featured = getFeaturedProjects();

  return (
    <div className="space-y-10">
      {/* Hero with portrait + headline */}
      <section className="section pb-4">
        <div className="rounded-2xl border border-slate-200 bg-white/80 p-5 md:p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/40">
          <div className="flex flex-col md:flex-row items-start gap-6 md:gap-8">
            {/* Portrait */}
            <div className="flex-shrink-0">
              <div className="h-64 w-64 md:h-64 md:w-64 rounded-full overflow-hidden border-4 border-white shadow-md bg-slate-200 dark:border-slate-900">
                <Image
                  src="/images/danyal-portrait.jpg" // <-- change path/name if needed
                  alt="Danyal Khorami"
                  width={160}
                  height={160}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>

            {/* Text */}
            <div className="flex-1 space-y-4">
              {/* Name + qualification */}
              <div className="space-y-1">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight">
                  Danyal Khorami 
                </h1>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                </p>
              </div>

              {/* Main research headline */}
              <div className="space-y-2">
                <h3 className="text-md font-semibold tracking-tight text-slate-800 dark:text-slate-100">
                  Embodied perception, sensor fusion, and computational media
                  systems.
                </h3>
                <p className="text-sm sm:text-base text-slate-700 dark:text-slate-200 max-w-2xl">
                  I build low-cost motion capture, sensing platforms, and
                  AI-driven media installations to study how embodied systems
                  perceive and act in the physical world.
                </p>
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap gap-3">
                <a
                  href="/projects"
                  className="inline-flex items-center rounded-full bg-accent text-white px-4 py-2 text-xs font-medium hover:opacity-90"
                >
                  View Projects
                </a>
                <a
                  href="/about#cv-contact"
                  className="inline-flex items-center rounded-full border border-slate-300 dark:border-slate-700 px-4 py-2 text-xs font-medium hover:border-accent/70"
                >
                  CV &amp; Contact
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Research themes */}
      <section className="section pt-0">
        <h2 className="section-title">Research Themes</h2>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-2xl mb-4">
          My work spans computer vision, sensor fusion &amp; IoT, XR/motion
          capture, and computational media, with a focus on embodied and agentic
          AI.
        </p>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {[
            {
              title: "Embodied Perception & Sensor Fusion",
              text: "Heterogeneous sensors (IMUs, cameras, environmental data) fused into robust real-time perception.",
            },
            {
              title: "Low-Cost Motion Capture & XR Tools",
              text: "Affordable motion and volumetric capture using ESP32 nodes and smartphones.",
            },
            {
              title: "Temporal Models & Sequences",
              text: "Temporal models for noisy, mixed-frequency streams such as financial or sensor data.",
            },
            {
              title: "AI & Computational Media",
              text: "LLMs and perception models in installations exploring emotion, memory, and environment.",
            },
          ].map((t) => (
            <div
              key={t.title}
              className="rounded-xl border border-slate-200 bg-white/80 p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900/40"
            >
              <h3 className="text-sm font-semibold mb-1">{t.title}</h3>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                {t.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured projects */}
      <section className="section pt-0">
        <div className="flex items-center justify-between mb-3">
          <h2 className="section-title mb-0">Featured Projects</h2>
          <a href="/projects" className="text-xs text-accent hover:underline">
            View all projects
          </a>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {featured.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </section>

      {/* Snapshot */}
      <section className="section pt-0">
        <h2 className="section-title mb-3">Snapshot</h2>
        <div className="grid gap-4 sm:grid-cols-3 text-xs sm:text-sm">
          <div className="rounded-xl border border-slate-200 bg-white/80 p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900/40">
            <h3 className="font-semibold mb-1">Research Focus</h3>
            <p className="text-slate-600 dark:text-slate-300">
              Computer vision, temporal perception models, sensor fusion &amp;
              IoT, XR/motion capture, embodied AI, computational media.
            </p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white/80 p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900/40">
            <h3 className="font-semibold mb-1">Systems</h3>
            <p className="text-slate-600 dark:text-slate-300">
              Open-source mocap (Mesquite), environmental IoT (Opuntia),
              multi-phone 3D capture, Temporal Fusion Transformers for
              time-series.
            </p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white/80 p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900/40">
            <h3 className="font-semibold mb-1">Teaching</h3>
            <p className="text-slate-600 dark:text-slate-300">
              Instructor of record for photography &amp; digital media at ASU;
              8+ courses taught and TA roles in gallery and studio contexts.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
