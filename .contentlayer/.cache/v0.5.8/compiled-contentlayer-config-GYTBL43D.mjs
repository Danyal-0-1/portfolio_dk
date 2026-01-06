// contentlayer.config.ts
import {
  defineDocumentType,
  defineNestedType,
  makeSource
} from "contentlayer2/source-files";
var ProjectLinks = defineNestedType(() => ({
  name: "ProjectLinks",
  fields: {
    github: { type: "string", required: false },
    paper: { type: "string", required: false },
    acceptance: { type: "string", required: false },
    demo: { type: "string", required: false },
    video: { type: "string", required: false }
  }
}));
var Project = defineDocumentType(() => ({
  name: "Project",
  filePathPattern: "projects/**/*.mdx",
  contentType: "mdx",
  fields: {
    title: { type: "string", required: true },
    slug: { type: "string", required: true },
    kind: {
      type: "enum",
      options: ["research", "installation", "experiment"],
      required: true
    },
    year: { type: "string", required: true },
    role: { type: "string", required: true },
    // safer: avoid skipping if missing
    themes: { type: "list", of: { type: "string" }, required: false, default: [] },
    tags: { type: "list", of: { type: "string" }, required: false, default: [] },
    heroMetric: { type: "string", required: false },
    hook: { type: "string", required: false },
    featured: { type: "boolean", default: false },
    order: { type: "number", required: false },
    // correct nested usage
    links: { type: "nested", of: ProjectLinks, required: false }
  },
  computedFields: {
    url: {
      type: "string",
      resolve: (project) => `/projects/${project.slug}`
    }
  }
}));
var Writing = defineDocumentType(() => ({
  name: "Writing",
  filePathPattern: "writing/**/*.mdx",
  contentType: "mdx",
  fields: {
    title: { type: "string", required: true },
    slug: { type: "string", required: true },
    year: { type: "string", required: false },
    type: { type: "string", required: false }
  },
  computedFields: {
    url: {
      type: "string",
      resolve: (doc) => `/writing/${doc.slug}`
    }
  }
}));
var contentlayer_config_default = makeSource({
  contentDirPath: "content",
  documentTypes: [Project, Writing]
});
export {
  Project,
  Writing,
  contentlayer_config_default as default
};
//# sourceMappingURL=compiled-contentlayer-config-GYTBL43D.mjs.map
