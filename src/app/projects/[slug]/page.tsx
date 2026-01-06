// src/app/projects/[slug]/page.tsx
import { notFound } from "next/navigation";
import { allProjects } from "contentlayer/generated";
import { getProjectBySlug } from "@/lib/projects";
import { MDXContent } from "@/components/mdx-content";
import { ProjectLinks, type ProjectLinkMap } from "@/components/project-links";
import { MediaGallery } from "@/components/MediaGallery";
import {
  resolveProjectMedia,
  type ProjectMediaOverrides,
} from "@/lib/project-media";

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
  const hasLinks = Boolean(links && Object.values(links).some(Boolean));
  const mediaOverrides = project as ProjectMediaOverrides;
  const media = resolveProjectMedia(project.slug, {
    coverImage: mediaOverrides.coverImage,
    gallery: mediaOverrides.gallery,
    video: mediaOverrides.video,
    pdf: mediaOverrides.pdf,
  });
  const items: Array<{ type: "image" | "video"; src: string; alt?: string }> =
    [];

  if (media.video) {
    items.push({ type: "video", src: media.video });
  }

  if (media.gallery.length > 0) {
    media.gallery.forEach((src, index) => {
      items.push({
        type: "image",
        src,
        alt: `${project.title} gallery image ${index + 1}`,
      });
    });
  } else if (media.coverImage) {
    items.push({ type: "image", src: media.coverImage, alt: project.title });
  }

  return (
    <article className="prose prose-sm sm:prose-base dark:prose-invert max-w-none">
      {items.length > 0 && (
        <div className="not-prose mb-8">
          <MediaGallery items={items} />
        </div>
      )}
      <header className="mb-6">
        <span className="badge mb-3 inline-block">
          {project.kind === "research"
            ? "Research System"
            : project.kind === "installation"
            ? "Installation"
            : "Experiment"}
        </span>
        <div className="flex flex-col gap-3">
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
          {(hasLinks || media.pdf) && (
            <div className="not-prose flex flex-wrap items-center gap-3 text-xs">
              <ProjectLinks links={links} className="justify-start" />
              {media.pdf && (
                <a
                  href={media.pdf}
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-3 py-1 text-xs font-medium text-slate-700 transition hover:border-accent/70 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/70 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-50 dark:border-slate-700 dark:bg-slate-900/60 dark:text-slate-200 dark:hover:text-white dark:focus-visible:ring-offset-slate-950"
                >
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    className="h-3.5 w-3.5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 3v12" />
                    <path d="m7 10 5 5 5-5" />
                    <path d="M5 21h14" />
                  </svg>
                  Download PDF
                </a>
              )}
            </div>
          )}
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
