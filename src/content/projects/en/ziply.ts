import type { ProjectContent } from "../../types";

export default {
  title: "Ziply",
  theme: "dark",
  tags: ["rust", "tauri", "react", "typescript"],
  source: "https://github.com/faker6996/ziply",
  description:
    "A cross-platform desktop archive utility for macOS, Windows, and Linux, built from one Tauri + React codebase.<br/><br/>Ziply focuses on native archive handling, content previews, selective extraction, live job tracking, and operating-system integration.",
  components: [
    {
      type: "text",
      props: {
        title: "Native-first",
        text: "Every advertised format is handled directly by the app without silently calling an external archive utility. This keeps behavior consistent and controllable across all three operating systems.",
      },
    },
    {
      type: "architecture",
      props: {
        title: "A native archive engine behind one desktop workspace",
        nodes: [
          { label: "React workspace", detail: "Queue, preview, history, and conflict controls" },
          { label: "Tauri commands", detail: "Typed bridge between interface and native runtime" },
          { label: "Rust engine", detail: "Compression, extraction, encryption, and validation" },
          { label: "OS integration", detail: "Finder, Explorer, Linux launchers, and packaging" },
        ],
      },
    },
    {
      type: "list",
      props: {
        title: "Product scope",
        items: [
          "Compress, extract, and preview ZIP, TAR, 7Z, and multiple stream formats.",
          "Job queues, retries, operation history, and destination conflict handling.",
          "Password flows for ZIP/7Z plus native read support for multipart RAR5 archives.",
          "DMG, NSIS, and DEB packaging with Homebrew and APT installation paths.",
        ],
      },
    },
  ],
} as const satisfies ProjectContent;
