import type { ProjectContent } from "../../types";

export default {
  title: "IQ Tool",
  theme: "dark",
  tags: ["three", "typescript"],
  live: "https://3d.infiniq.com.vn",
  description:
    "A point-cloud and LiDAR visualization tool built with Three.js for technical teams at InfiniQ.<br/><br/>Bundles a Markdown editor with live Mermaid rendering, so teams can inspect 3D captures and document systems in one place.",
  components: [
    {
      type: "text",
      props: {
        title: "Why it exists",
        text: "Inspecting point-cloud captures and documenting systems meant switching between disconnected tools, so this merges both into one workspace.",
      },
    },
    {
      type: "architecture",
      props: {
        title: "One workspace, two views",
        nodes: [
          { label: "PCD / LiDAR input", detail: "Point-cloud captures loaded into the viewer" },
          { label: "Three.js renderer", detail: "Interactive camera controls and inspection" },
          { label: "Markdown editor", detail: "Documentation alongside the 3D view" },
          { label: "Mermaid rendering", detail: "Diagrams rendered live from Markdown" },
        ],
      },
    },
    {
      type: "list",
      props: {
        title: "Highlights",
        items: [
          "Interactive Three.js viewer for large point-cloud and LiDAR datasets.",
          "Markdown editing with live preview.",
          "Mermaid diagrams rendered directly from Markdown.",
          "Used internally by engineering teams across projects.",
        ],
      },
    },
  ],
} as const satisfies ProjectContent;
