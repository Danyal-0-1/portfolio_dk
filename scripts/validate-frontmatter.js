const fs = require("node:fs");
const path = require("node:path");

const PROJECT_KEYS = new Set([
  "title",
  "slug",
  "kind",
  "year",
  "role",
  "themes",
  "tags",
  "heroMetric",
  "hook",
  "featured",
  "order",
  "links",
  "coverImage",
  "gallery",
  "video",
  "pdf",
]);

const WRITING_KEYS = new Set(["title", "slug", "year", "type"]);
const LINK_KEYS = new Set(["github", "paper", "acceptance", "demo", "video"]);
const KIND_OPTIONS = new Set(["research", "installation", "experiment"]);

const ROOT = path.join(__dirname, "..");
const CONTENT_DIRS = [
  { dir: path.join(ROOT, "content", "projects"), keys: PROJECT_KEYS },
  { dir: path.join(ROOT, "content", "writing"), keys: WRITING_KEYS },
];

const listKeys = new Set(["themes", "tags", "gallery"]);

const getFiles = (dir) => {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => path.join(dir, file));
};

const parseFrontmatter = (text) => {
  const lines = text.split(/\r?\n/);
  if (lines[0] !== "---") return { error: "missing frontmatter", lines: [] };
  const endIndex = lines.findIndex((line, index) => index > 0 && line === "---");
  if (endIndex === -1) return { error: "unterminated frontmatter", lines: [] };
  return { error: null, lines: lines.slice(1, endIndex) };
};

const validateFile = (filePath, keys) => {
  const text = fs.readFileSync(filePath, "utf8");
  const { error, lines } = parseFrontmatter(text);
  const issues = [];

  if (error) {
    issues.push(`${path.basename(filePath)}: ${error}`);
    return issues;
  }

  let currentKey = null;

  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i];
    if (!line.trim()) continue;

    if (line.startsWith("  ")) {
      if (currentKey === "links") {
        const match = /^\s+([\w-]+):/.exec(line);
        if (match && !LINK_KEYS.has(match[1])) {
          issues.push(`${path.basename(filePath)}: unknown links key ${match[1]}`);
        }
      }
      continue;
    }

    currentKey = null;
    if (!line.includes(":")) continue;

    const [rawKey, rawValue] = line.split(":", 2);
    const key = rawKey.trim();
    const value = rawValue.trim();
    currentKey = key;

    if (!keys.has(key)) {
      issues.push(`${path.basename(filePath)}: unexpected key ${key}`);
    }

    if (key === "kind") {
      const unquoted = value.replace(/^\"|\"$/g, "");
      if (unquoted && !KIND_OPTIONS.has(unquoted)) {
        issues.push(`${path.basename(filePath)}: invalid kind ${value}`);
      }
    }

    if (key === "order") {
      if (value.startsWith("\"") && value.endsWith("\"")) {
        issues.push(`${path.basename(filePath)}: order quoted ${value}`);
      } else if (!/^\d+$/.test(value)) {
        issues.push(`${path.basename(filePath)}: order not numeric ${value}`);
      }
    }

    if (key === "featured" && value && value !== "true" && value !== "false") {
      issues.push(`${path.basename(filePath)}: featured not boolean ${value}`);
    }

    if (listKeys.has(key) || key === "links") {
      if (value && value.startsWith("[")) continue;
      const nextLine = lines.slice(i + 1).find((next) => next.trim());

      if (listKeys.has(key)) {
        if (!nextLine || !nextLine.trim().startsWith("-")) {
          issues.push(`${path.basename(filePath)}: ${key} not list-like`);
        }
      }

      if (key === "links") {
        if (!nextLine || !nextLine.startsWith("  ")) {
          issues.push(`${path.basename(filePath)}: links not nested`);
        }
      }
    }
  }

  return issues;
};

const issues = [];

CONTENT_DIRS.forEach(({ dir, keys }) => {
  getFiles(dir).forEach((filePath) => {
    issues.push(...validateFile(filePath, keys));
  });
});

if (issues.length) {
  console.error("Frontmatter issues found:");
  issues.forEach((issue) => console.error(`- ${issue}`));
  process.exit(1);
}

console.log("Frontmatter checks passed.");
