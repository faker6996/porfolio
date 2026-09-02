import type { ProjectContent } from "../../types";

export default {
  title: "IQ NFFICE",
  theme: "dark",
  tags: ["next", "typescript", "dotnet", "postgresql", "signalr"],
  description:
    "An enterprise groupware platform with 27 business modules, built end-to-end as Technical Lead at InfiniQ.<br/><br/>Next.js and React on the frontend, .NET and PostgreSQL on the backend, with SignalR and Redis powering real-time features.",
  components: [
    {
      type: "text",
      props: {
        title: "27 modules, one platform",
        text: "RBAC, e-approvals, chat, notices, attendance, assets, and project management, all built on a shared architecture and design system.",
      },
    },
    {
      type: "architecture",
      props: {
        title: "From module to production",
        nodes: [
          { label: "Next.js + React", detail: "One design system across 27 modules" },
          { label: ".NET + PostgreSQL", detail: "Clean Architecture APIs with Dapper" },
          { label: "SignalR + Redis", detail: "Real-time notifications and shared state" },
          { label: "HA production", detail: "Load-balanced, active-active, replicated" },
        ],
      },
    },
    {
      type: "list",
      props: {
        title: "Highlights",
        items: [
          "Production infrastructure built from scratch: HA proxy, active-active nodes, replication, blue/green CI/CD.",
          "LLM-assisted search and workflow support, without compromising security.",
          "Commercial on-premise licensing with signed activation.",
          "Leads delivery across development, BA, design, and QA.",
        ],
      },
    },
  ],
} as const satisfies ProjectContent;
