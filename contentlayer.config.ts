import { defineDocumentType, makeSource } from "contentlayer2/source-files";

export const Project = defineDocumentType(() => ({
  name: "Project",
  filePathPattern: "projects/**/*.mdx",
  contentType: "mdx",
  fields: {
    title: { type: "string", required: true },
    slug: { type: "string", required: true },
    kind: {
      type: "enum",
      options: ["research", "installation", "experiment"],
      required: true,
    },
    year: { type: "string", required: true },
    role: { type: "string", required: true },
    themes: { type: "list", of: { type: "string" } },
    tags: { type: "list", of: { type: "string" } },
    heroMetric: { type: "string", required: false },
    hook: { type: "string", required: false },
    featured: { type: "boolean", default: false },
    order: { type: "string", required: false },
    links: { type: "json", required: false },
  },
  computedFields: {
    url: {
      type: "string",
      resolve: (project) => `/projects/${project.slug}`,
    },
  },
}));

export const Writing = defineDocumentType(() => ({
  name: "Writing",
  filePathPattern: "writing/**/*.mdx",
  contentType: "mdx",
  fields: {
    title: { type: "string", required: true },
    slug: { type: "string", required: true },
    year: { type: "string", required: false },
    type: { type: "string", required: false },
  },
  computedFields: {
    url: {
      type: "string",
      resolve: (doc) => `/writing/${doc.slug}`,
    },
  },
}));

export default makeSource({
  contentDirPath: "content",
  documentTypes: [Project, Writing],
});
