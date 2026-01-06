import "server-only";

import fs from "node:fs";
import path from "node:path";

export type ProjectMedia = {
  coverImage?: string;
  gallery: string[];
  video?: string;
  pdf?: string;
};

const coverCandidates = ["cover.webp", "cover.jpg", "cover.png"];
const videoCandidates = ["video.mp4", "demo.mp4"];
const galleryPattern = /^(\d{2})\.(webp|png|jpe?g)$/i;

export function resolveProjectMedia(slug: string): ProjectMedia {
  const mediaDir = path.join(process.cwd(), "public", "projects", slug);
  let files: string[] = [];

  try {
    files = fs.readdirSync(mediaDir);
  } catch {
    return {
      coverImage: undefined,
      gallery: [],
      video: undefined,
      pdf: undefined,
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

  const inferredCover = resolveCandidate(coverCandidates);

  const inferredVideo = resolveCandidate(videoCandidates);

  const pdfFile = files
    .filter((file) => file.toLowerCase().endsWith(".pdf"))
    .sort()[0];
  const inferredPdf = pdfFile ? `/projects/${slug}/${pdfFile}` : undefined;

  const inferredGallery = files
    .map((file) => {
      const match = galleryPattern.exec(file);
      if (!match) return null;
      return { file, order: Number(match[1]) };
    })
    .filter((entry): entry is { file: string; order: number } => Boolean(entry))
    .sort((a, b) => a.order - b.order)
    .map((entry) => `/projects/${slug}/${entry.file}`);

  const coverImage = inferredCover ?? inferredGallery[0];

  return {
    coverImage,
    gallery: inferredGallery,
    video: inferredVideo,
    pdf: inferredPdf,
  };
}
