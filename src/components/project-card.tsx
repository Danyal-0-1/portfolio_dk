import Link from "next/link";
import type { Project } from "contentlayer/generated";
import { ProjectLinks, type ProjectLinkMap } from "@/components/project-links";

export function ProjectCard({ project }: { project: Project }) {
  const links = (project as { links?: ProjectLinkMap }).links;

  return (
    <article className="group relative rounded-2xl border border-slate-200 bg-white/80 p-4 flex flex-col gap-3 shadow-sm hover:shadow-md hover:border-accent/70 hover:-translate-y-0.5 transition dark:border-slate-800 dark:bg-slate-900/40">
      <Link
        href={project.url}
        className="absolute inset-0 z-10 rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/70 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-50 dark:focus-visible:ring-offset-slate-950"
      >
        <span className="sr-only">View {project.title}</span>
      </Link>
      <div className="flex flex-col gap-3">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <h3 className="font-semibold text-sm sm:text-base group-hover:text-accent">
              {project.title}
            </h3>
            {project.hook && (
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
                {project.hook}
              </p>
            )}
          </div>

          {project.heroMetric && (
            <span
              className="
                badge
                text-[0.6rem]
                leading-tight
                whitespace-normal
                text-right
                max-w-[12rem]
                shrink-0
              "
            >
              {project.heroMetric}
            </span>
          )}
        </div>

        {project.tags && project.tags.length > 0 && (
          <div className="flex flex-wrap items-center gap-1 mt-1">
            {project.tags.slice(0, 6).map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-slate-100 dark:bg-slate-800 px-2 py-0.5 text-[0.65rem] text-slate-700 dark:text-slate-200"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className="mt-2 flex items-center justify-between gap-2">
          <p className="text-[0.7rem] text-slate-500 dark:text-slate-400">
            {project.year} &middot; {project.role}
          </p>
          <ProjectLinks links={links} variant="card" />
        </div>
      </div>
    </article>
  );
}
