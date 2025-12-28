import { getProjectsByKind } from "@/lib/projects";
import { ProjectCard } from "@/components/project-card";

export default function ExperimentsPage() {
  const experiments = getProjectsByKind("experiment");

  return (
    <div className="space-y-6">
      <section className="section pb-2">
        <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight mb-3">
          Experiments
        </h1>
        <p className="text-sm text-neutral-600 dark:text-neutral-300 max-w-2xl">
          Smaller prototypes and course projects exploring deep learning, temporal
          models, and generative systems. These sketches inform larger research
          directions.
        </p>
      </section>

      <section className="section pt-0">
        <div className="grid gap-4 sm:grid-cols-2">
          {experiments.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </section>
    </div>
  );
}
