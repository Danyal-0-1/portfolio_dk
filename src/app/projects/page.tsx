import { getProjectsByKind } from "@/lib/projects";
import { ProjectCard } from "@/components/project-card";

export default function ProjectsPage() {
  const researchProjects = getProjectsByKind("research");
  const installations = getProjectsByKind("installation");
  const experiments = getProjectsByKind("experiment");
  const projectCount =
    researchProjects.length + installations.length + experiments.length;

  return (
    <div className="space-y-6">
      <section className="section pb-2">
        <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight mb-3">
          Projects
        </h1>
        <p className="text-sm text-neutral-600 dark:text-neutral-300 max-w-2xl">
          Research systems, installations, and experiments spanning embodied
          perception, computational media, and AI-driven tools.
        </p>
        <p className="mt-2 text-xs text-neutral-500 dark:text-neutral-400">
          Projects count: {projectCount}
        </p>
        <div className="mt-4 flex flex-wrap gap-2 text-xs">
          <a
            href="#research-systems"
            className="rounded-full border border-slate-200 px-3 py-1 text-slate-700 transition hover:border-accent/70 hover:text-accent dark:border-slate-700 dark:text-slate-200"
          >
            Research Systems
          </a>
          <a
            href="#installations-media"
            className="rounded-full border border-slate-200 px-3 py-1 text-slate-700 transition hover:border-accent/70 hover:text-accent dark:border-slate-700 dark:text-slate-200"
          >
            Installations &amp; Media
          </a>
          <a
            href="#experiments"
            className="rounded-full border border-slate-200 px-3 py-1 text-slate-700 transition hover:border-accent/70 hover:text-accent dark:border-slate-700 dark:text-slate-200"
          >
            Experiments
          </a>
        </div>
      </section>

      <section id="research-systems" className="section pt-0 space-y-4">
        <div>
          <h2 className="section-title">Research Systems</h2>
          <p className="text-sm text-neutral-600 dark:text-neutral-300 max-w-2xl">
            Systems-focused work in embodied perception, sensor fusion, low-cost
            motion capture, and temporal modeling. These projects emphasize robust
            hardware-software pipelines, reproducible benchmarks, and deployable
            prototypes.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {researchProjects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </section>

      <section id="installations-media" className="section pt-0 space-y-4">
        <div>
          <h2 className="section-title">Installations &amp; Media</h2>
          <p className="text-sm text-neutral-600 dark:text-neutral-300 max-w-2xl">
            Artistic and computational-media projects that use AI, sensors, and
            visual media to explore perception, emotion, memory, and environment.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {installations.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </section>

      <section id="experiments" className="section pt-0 space-y-4">
        <div>
          <h2 className="section-title">Experiments</h2>
          <p className="text-sm text-neutral-600 dark:text-neutral-300 max-w-2xl">
            Smaller prototypes and course projects exploring deep learning, temporal
            models, and generative systems. These sketches inform larger research
            directions.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {experiments.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </section>
    </div>
  );
}
