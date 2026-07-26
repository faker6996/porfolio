import type { ProjectContent } from "../../types";

export default {
  title: "MD & PDF Toolkit",
  theme: "light",
  tags: ["typescript", "vscode", "node"],
  live: "https://marketplace.visualstudio.com/items?itemName=bachtv.mdx-exporter-lite",
  source: "https://github.com/faker6996/md_extension",
  description:
    "A VS Code extension for previewing, exporting, and converting Markdown without leaving the editor.<br/><br/>The toolkit supports PDF, DOCX, PNG/JPEG, Mermaid, PlantUML, and KaTeX, with a low-friction setup and no telemetry.",
  components: [
    {
      type: "text",
      props: {
        title: "One workflow for technical documents",
        text: "Instead of switching between tools, users can preview, style, and export documents directly in VS Code. Quick-export commands shorten the path for frequently used formats.",
      },
    },
    {
      type: "architecture",
      props: {
        title: "One source, multiple document outputs",
        nodes: [
          { label: "Markdown", detail: "Text, diagrams, math, code, and local assets" },
          { label: "Render engine", detail: "Preview pipeline with custom styling" },
          { label: "Converters", detail: "Format-specific PDF, DOCX, and image output" },
          { label: "VS Code", detail: "Commands, shortcuts, preview, and viewer" },
        ],
      },
    },
    {
      type: "list",
      props: {
        title: "Core capabilities",
        items: [
          "Export Markdown to PDF, DOCX, PNG, and JPEG.",
          "Render Mermaid, PlantUML, KaTeX equations, and syntax-highlighted code.",
          "Built-in PDF viewer with search and page navigation.",
          "Custom CSS, page formats, margins, headers, and footers.",
        ],
      },
    },
  ],
} as const satisfies ProjectContent;
