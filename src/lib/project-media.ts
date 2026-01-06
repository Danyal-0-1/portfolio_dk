import "server-only";

import fs from "node:fs";
import path from "node:path";

export type ProjectMedia = {
  coverImage?: string;
  gallery: string[];
  video?: string;
  pdf?: string;
};

export type ProjectMediaOverrides = {
  coverImage?: string;
  gallery?: string[];
  video?: string;
  pdf?: string;
};

const coverCandidates = ["cover.webp", "cover.jpg", "cover.png"];
const videoCandidates = ["video.mp4", "demo.mp4"];
const galleryPattern = /^(\d{2})\.(webp|png|jpe?g)$/i;

const toPublicPath = (slug: string, value?: string) => {
  if (!value) return undefined;
  if (value.startsWith("/")) return value;
  return `/projects/${slug}/${value}`;
};

export function resolveProjectMedia(
  slug: string,
  overrides: ProjectMediaOverrides = {},
): ProjectMedia {
  const coverImage = toPublicPath(slug, overrides.coverImage);
  const video = toPublicPath(slug, overrides.video);
  const pdf = toPublicPath(slug, overrides.pdf);
  const gallery = (overrides.gallery ?? [])
    .map((item) => toPublicPath(slug, item))
    .filter((item): item is string => Boolean(item));

  const mediaFromOverrides: ProjectMedia = {
    coverImage,
    gallery,
    video,
    pdf,
  };

  const mediaDir = path.join(process.cwd(), "public", "projects", slug);
  let files: string[] = [];

  try {
    files = fs.readdirSync(mediaDir);
  } catch {
    return {
      ...mediaFromOverrides,
      gallery: mediaFromOverrides.gallery ?? [],
    };
  }

  const fileMap = new Map(files.map((file) => [file.toLowerCase(), file]));

  const resolveCandidate = (candidates: string[]) => {
    for (const candidate of candidates) {
      const match = fileMap.get(candidate);
      if (match) {
        return `/projects/${slug}/${match}`;
      }
    }
    return undefined;
  };

  const inferredCover = mediaFromOverrides.coverImage
    ? mediaFromOverrides.coverImage
    : resolveCandidate(coverCandidates);

  const inferredVideo = mediaFromOverrides.video
    ? mediaFromOverrides.video
    : resolveCandidate(videoCandidates);

  const pdfFile = files
    .filter((file) => file.toLowerCase().endsWith(".pdf"))
    .sort()[0];
  const inferredPdf = mediaFromOverrides.pdf ?? (pdfFile ? `/projects/${slug}/${pdfFile}` : undefined);

  const inferredGallery =
    mediaFromOverrides.gallery.length > 0
      ? mediaFromOverrides.gallery
      : files
          .map((file) => {
            const match = galleryPattern.exec(file);
            if (!match) return null;
            return { file, order: Number(match[1]) };
          })
          .filter((entry): entry is { file: string; order: number } => Boolean(entry))
          .sort((a, b) => a.order - b.order)
          .map((entry) => `/projects/${slug}/${entry.file}`);

  return {
    coverImage: inferredCover,
    gallery: inferredGallery,
    video: inferredVideo,
    pdf: inferredPdf,
  };
}
