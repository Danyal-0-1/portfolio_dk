import { allProjects, type Project } from "contentlayer/generated";

export type ProjectKind = "research" | "installation" | "experiment";

export function getProjectBySlug(slug: string): Project | undefined {
  return allProjects.find((p) => p.slug === slug);
}

export function getProjectsByKind(kind: ProjectKind): Project[] {
  return allProjects
    .filter((p) => p.kind === kind)
    .sort((a, b) => {
      const aOrder = a.order ? Number(a.order) : 0;
      const bOrder = b.order ? Number(b.order) : 0;
      return aOrder - bOrder;
    });
}

export function getFeaturedProjects(): Project[] {
  return allProjects
    .filter((p) => p.featured)
    .sort((a, b) => {
      const aOrder = a.order ? Number(a.order) : 0;
      const bOrder = b.order ? Number(b.order) : 0;
      return aOrder - bOrder;
    });
}
