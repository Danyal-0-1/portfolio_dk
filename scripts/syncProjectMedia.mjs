import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import matter from "gray-matter";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.join(__dirname, "..");
const contentDir = path.join(root, "content", "projects");
const mediaRoot = path.join(root, "public", "projects");

const coverCandidates = ["cover.webp", "cover.jpg", "cover.png"];
const galleryPattern = /^(0[1-9]|[1-9][0-9])\.(jpg|jpeg|png|webp)$/i;
const videoCandidates = ["video.mp4", "demo.mp4"];

const log = {
  warn: (...args) => console.warn("[sync:media][warn]", ...args),
  info: (...args) => console.log("[sync:media]", ...args),
};

const listMdxFiles = (dir) => {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...listMdxFiles(full));
    } else if (entry.isFile() && entry.name.endsWith(".mdx")) {
      files.push(full);
    }
  }
  return files;
};

const toPublicPath = (slug, filename) => `/projects/${slug}/${filename}`;

const resolveMediaForSlug = (slug) => {
  const mediaDir = path.join(mediaRoot, slug);
  if (!fs.existsSync(mediaDir) || !fs.statSync(mediaDir).isDirectory()) {
    log.warn(`Media folder missing for slug "${slug}" at ${mediaDir}`);
    return { coverImage: undefined, gallery: [], video: undefined, pdf: undefined };
  }

  const files = fs.readdirSync(mediaDir);

  const fileMap = new Map(files.map((file) => [file.toLowerCase(), file]));
  const cover = coverCandidates
    .map((candidate) => fileMap.get(candidate))
    .find(Boolean);
  const coverImage = cover ? toPublicPath(slug, cover) : undefined;

  const warnings = [];
  const gallery = files
    .map((file) => {
      const lower = file.toLowerCase();
      if (lower === "0.jpg" || lower === "00.jpg") {
        warnings.push(`Found ignored file ${file} in ${slug} (use 01..99)`);
        return null;
      }
      const match = galleryPattern.exec(file);
      if (!match) return null;
      if (cover && lower === cover.toLowerCase()) return null;
      return { file, order: Number(match[1]) };
    })
    .filter(Boolean)
    .sort((a, b) => a.order - b.order)
    .map((entry) => toPublicPath(slug, entry.file));

  warnings.forEach((w) => log.warn(w));

  const videoFile = videoCandidates
    .map((candidate) => fileMap.get(candidate))
    .find(Boolean);
  const video = videoFile ? toPublicPath(slug, videoFile) : undefined;

  const pdfFile = files
    .filter((file) => file.toLowerCase().endsWith(".pdf"))
    .sort()[0];
  const pdf = pdfFile ? toPublicPath(slug, pdfFile) : undefined;

  return { coverImage, gallery, video, pdf };
};

const updateFrontmatter = (filePath) => {
  const raw = fs.readFileSync(filePath, "utf8");
  const parsed = matter(raw);
  const data = parsed.data ?? {};
  const slug = data.slug;

  if (!slug) {
    log.warn(`Skipping ${filePath} (no slug)`);
    return false;
  }

  const media = resolveMediaForSlug(slug);

  const nextData = { ...data };
  delete nextData.coverImage;
  delete nextData.gallery;
  delete nextData.video;
  delete nextData.pdf;

  if (media.coverImage) {
    nextData.coverImage = media.coverImage;
  }
  nextData.gallery = media.gallery ?? [];

  if (media.video) {
    nextData.video = media.video;
  }

  if (media.pdf) {
    nextData.pdf = media.pdf;
  }

  const nextContent = matter.stringify(parsed.content, nextData);
  if (nextContent !== raw) {
    fs.writeFileSync(filePath, nextContent, "utf8");
    log.info(`Updated media frontmatter for ${path.relative(root, filePath)}`);
    return true;
  }

  return false;
};

const run = () => {
  const files = listMdxFiles(contentDir);
  if (files.length === 0) {
    log.warn("No project MDX files found.");
    return;
  }

  let updated = 0;
  for (const file of files) {
    if (updateFrontmatter(file)) {
      updated += 1;
    }
  }

  log.info(`Done. Updated ${updated} file(s).`);
};

run();
