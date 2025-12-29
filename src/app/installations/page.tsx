import { getProjectsByKind } from "@/lib/projects";
import { ProjectCard } from "@/components/project-card";

export default function InstallationsPage() {
  const installations = getProjectsByKind("installation");

  return (
    <div className="space-y-6">
      <section className="section pb-2">
        <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight mb-3">
          Installations &amp; Media
        </h1>
        <p className="text-sm text-neutral-600 dark:text-neutral-300 max-w-2xl">
          Artistic and computational-media projects that use AI, sensors, and
          visual media to explore perception, emotion, memory, and environment.
        </p>
      </section>

      <section className="section pt-0">
        <div className="grid gap-4 sm:grid-cols-2">
          {installations.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </section>
    </div>
  );
}
