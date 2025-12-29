import { getProjectsByKind } from "@/lib/projects";
import { ProjectCard } from "@/components/project-card";


export default function ResearchPage() {
  const researchProjects = getProjectsByKind("research");
  
  console.log("researchProjects", researchProjects.length);
  
  return (
    <div className="space-y-6">
      <section className="section pb-2">
        <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight mb-3">
          Research Systems
        </h1>
        <p className="text-sm text-neutral-600 dark:text-neutral-300 max-w-2xl">
          Systems-focused work in embodied perception, sensor fusion, low-cost
          motion capture, and temporal modeling. These projects emphasize robust
          hardware–software pipelines, reproducible benchmarks, and deployable
          prototypes.
        </p>
      </section>

      <section className="section pt-0">
        <div className="grid gap-4 sm:grid-cols-2">
          {researchProjects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </section>
    </div>
  );
}
