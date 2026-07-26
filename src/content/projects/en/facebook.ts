import type { ProjectContent } from "../../types";

export default {
  title: "Social Platform",
  theme: "light",
  tags: ["next", "typescript", "dotnet", "signalr", "postgresql"],
  source: "https://github.com/faker6996/facebook",
  description:
    "A full-stack social platform with real-time messaging, group chat, and a complete interface component system.<br/><br/>The frontend uses Next.js and TypeScript, while the .NET backend combines SignalR, RabbitMQ, PostgreSQL, and JWT for real-time workflows.",
  components: [
    {
      type: "text",
      props: {
        title: "A global real-time connection",
        text: "SignalR starts at the application level so users receive messages and notifications from every screen. A single global connection avoids duplicated per-component connections.",
      },
    },
    {
      type: "list",
      props: {
        title: "Features",
        items: [
          "Private and group chat with roles, permissions, and member management.",
          "Online presence, message status, reactions, replies, and file sharing.",
          "Email/password authentication plus Google and Facebook OAuth.",
          "More than 25 UI components, dark mode, and English/Vietnamese interfaces.",
          "Multi-environment Docker setup and a Jenkins CI/CD pipeline.",
        ],
      },
    },
  ],
} as const satisfies ProjectContent;
