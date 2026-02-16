import "server-only";

import fs from "node:fs";
import path from "node:path";

type ProjectGalleryImage = {
  src: string;
  alt: string;
};

export type ProjectMedia = {
  coverImage?: string;
  gallery: ProjectGalleryImage[];
  video?: string;
  pdf?: string;
};

const coverCandidates = ["cover.webp", "cover.jpg", "cover.png"];
const videoCandidates = ["video.mp4", "demo.mp4"];
const imageExtensions = new Set([
  ".jpg",
  ".jpeg",
  ".png",
  ".webp",
  ".gif",
  ".avif",
  ".svg",
]);
const naturalComparator = new Intl.Collator(undefined, {
  numeric: true,
  sensitivity: "base",
});

type MediaFile = {
  relativePath: string;
  baseNameLower: string;
};

function collectFilesRecursively(
  directory: string,
  relativePrefix = "",
): MediaFile[] {
  const entries = fs.readdirSync(path.join(directory, relativePrefix), {
    withFileTypes: true,
  });
  const files: MediaFile[] = [];

  for (const entry of entries) {
    const nextRelativePath = relativePrefix
      ? path.join(relativePrefix, entry.name)
      : entry.name;

    if (entry.isDirectory()) {
      files.push(...collectFilesRecursively(directory, nextRelativePath));
      continue;
    }

    if (!entry.isFile()) {
      continue;
    }

    files.push({
      relativePath: nextRelativePath,
      baseNameLower: entry.name.toLowerCase(),
    });
  }

  return files;
}

function toProjectUrl(slug: string, relativePath: string): string {
  const normalizedPath = relativePath.split(path.sep).join("/");
  const encodedPath = normalizedPath
    .split("/")
    .map((segment) => encodeURIComponent(segment))
    .join("/");
  return `/projects/${slug}/${encodedPath}`;
}

function toImageAltText(relativePath: string): string {
  const extension = path.extname(relativePath);
  const baseName = path.basename(relativePath, extension);
  const normalized = baseName
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();

  if (!normalized) {
    return "Project image";
  }

  return normalized.charAt(0).toUpperCase() + normalized.slice(1);
}

export function resolveProjectMedia(slug: string): ProjectMedia {
  const mediaDir = path.join(process.cwd(), "public", "projects", slug);
  let files: MediaFile[] = [];

  try {
    files = collectFilesRecursively(mediaDir);
  } catch {
    return {
      coverImage: undefined,
      gallery: [],
      video: undefined,
      pdf: undefined,
    };
  }

  const naturalSortFiles = (a: MediaFile, b: MediaFile) =>
    naturalComparator.compare(a.relativePath, b.relativePath);

  const resolveCandidate = (candidates: string[]) => {
    for (const candidate of candidates) {
      const match = files
        .filter((file) => file.baseNameLower === candidate)
        .sort(naturalSortFiles)[0];
      if (match) {
        return toProjectUrl(slug, match.relativePath);
      }
    }
    return undefined;
  };

  const inferredCover = resolveCandidate(coverCandidates);

  const inferredVideo = resolveCandidate(videoCandidates);

  const pdfFile = files
    .filter((file) => file.relativePath.toLowerCase().endsWith(".pdf"))
    .sort(naturalSortFiles)[0];
  const inferredPdf = pdfFile
    ? toProjectUrl(slug, pdfFile.relativePath)
    : undefined;
  const seenGallery = new Set<string>();

  const inferredGallery = files
    .filter((file) =>
      imageExtensions.has(path.extname(file.relativePath).toLowerCase()),
    )
    .sort(naturalSortFiles)
    .map((file) => ({
      src: toProjectUrl(slug, file.relativePath),
      alt: toImageAltText(file.relativePath),
    }))
    .filter((image) => {
      const imageKey = image.src.toLowerCase();
      if (seenGallery.has(imageKey)) return false;
      seenGallery.add(imageKey);
      return true;
    });

  const coverImage = inferredCover ?? inferredGallery[0]?.src;

  return {
    coverImage,
    gallery: inferredGallery,
    video: inferredVideo,
    pdf: inferredPdf,
  };
}
