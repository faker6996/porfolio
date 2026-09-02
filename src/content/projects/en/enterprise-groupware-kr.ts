import type { ProjectContent } from "../../types";

export default {
  title: "Enterprise Groupware (Korea)",
  theme: "dark",
  tags: ["next", "typescript", "dotnet", "postgresql", "signalr"],
  description:
    "An outsourced groupware engagement for a multi-company Korean organization, built on the IQ NFFICE foundation.<br/><br/>Leading architecture and delivery as outsource Technical Lead: localized workflows, multi-company portals, and cross-system integration.",
  components: [
    {
      type: "text",
      props: {
        title: "Adapting a platform for a new market",
        text: "The NFFICE foundation reshaped for multi-company operations and Korean-localized workflows, with room to grow toward AI-assisted search.",
      },
    },
    {
      type: "architecture",
      props: {
        title: "From shared foundation to localized platform",
        nodes: [
          { label: "NFFICE foundation", detail: "Shared modules and design system" },
          { label: "Multi-company portals", detail: "Isolated data per company" },
          { label: "Electronic approvals", detail: "Localized approval chains" },
          { label: "Cross-system integration", detail: "Data exchange with client systems" },
        ],
      },
    },
    {
      type: "list",
      props: {
        title: "Scope",
        items: [
          "Multi-company portal architecture on the NFFICE foundation.",
          "Electronic approval workflows adapted to local processes.",
          "Real-time integration and Korean-localized UX.",
          "An extensible path toward AI/LLM-assisted search.",
        ],
      },
    },
  ],
} as const satisfies ProjectContent;
