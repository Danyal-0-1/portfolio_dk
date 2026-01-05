// src/app/projects/[slug]/page.tsx
import { notFound } from "next/navigation";
import { allProjects } from "contentlayer/generated";
import { getProjectBySlug } from "@/lib/projects";
import { MDXContent } from "@/components/mdx-content";
import { ProjectLinks, type ProjectLinkMap } from "@/components/project-links";

// for generateStaticParams – still fine to use allProjects here
export async function generateStaticParams() {
  return allProjects.map((project) => ({ slug: project.slug }));
}

// In Next 15/16 App Router, params is a Promise; unwrap it.
type ProjectParams = Promise<{ slug: string }>;

export default async function ProjectPage({
  params,
}: {
  params: ProjectParams;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const links = (project as { links?: ProjectLinkMap }).links;

  return (
    <article className="prose prose-sm sm:prose-base dark:prose-invert max-w-none">
      <header className="mb-6">
        <span className="badge mb-3 inline-block">
          {project.kind === "research"
            ? "Research System"
            : project.kind === "installation"
            ? "Installation"
            : "Experiment"}
        </span>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0">
            <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight mb-2">
              {project.title}
            </h1>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">
              {project.year} &middot; {project.role}
            </p>
            {project.heroMetric && (
              <p className="mt-2 text-xs text-neutral-600 dark:text-neutral-300">
                Key metric: {project.heroMetric}
              </p>
            )}
          </div>
          <ProjectLinks links={links} className="sm:justify-end" />
        </div>
        {project.hook && (
          <p className="mt-3 text-sm text-neutral-700 dark:text-neutral-200 max-w-2xl">
            {project.hook}
          </p>
        )}
        {project.tags && project.tags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-neutral-100 dark:bg-neutral-800 px-2 py-0.5 text-[0.65rem] text-neutral-600 dark:text-neutral-300"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </header>

      {/* ✅ Client MDX renderer */}
      <MDXContent code={project.body.code} />
    </article>
  );
}
