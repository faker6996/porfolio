import type { ProjectContent } from "../../types";

export default {
  title: "Underverse UI",
  theme: "dark",
  tags: ["react", "typescript", "tailwind"],
  live: "https://underverse.infiniq.com.vn/vi/docs/underverse",
  source: "https://github.com/faker6996/underverse",
  description:
    "A production-focused UI library for React 18+ with more than 60 fully typed components.<br/><br/>Underverse covers data-heavy interfaces, forms, overlays, scheduling, and rich-text editing, with dark mode and built-in English, Vietnamese, Korean, and Japanese messages.",
  components: [
    {
      type: "text",
      props: {
        title: "The goal",
        text: "Build a type-safe component system with a consistent API, flexible enough to reuse across React products without rebuilding the same interface foundations.",
      },
    },
    {
      type: "architecture",
      props: {
        title: "A typed path from tokens to product interfaces",
        nodes: [
          { label: "Design tokens", detail: "Semantic color, spacing, and border modes" },
          { label: "Core components", detail: "Accessible primitives with typed APIs" },
          { label: "Complex systems", detail: "DataTable, timelines, and rich-text editing" },
          { label: "Consumer apps", detail: "React products with shared configuration" },
        ],
      },
    },
    {
      type: "list",
      props: {
        title: "Highlights",
        items: [
          "More than 60 components, from basic controls to DataTable, CalendarTimeline, and UEditor.",
          "ESM and CommonJS outputs with support for React 18+ and Tailwind CSS 4.",
          "Keyboard interaction, ARIA behavior, public API, and bundle-budget checks.",
          "Published on npm with a dedicated documentation site.",
        ],
      },
    },
  ],
} as const satisfies ProjectContent;
