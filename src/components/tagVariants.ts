export type TagVariant =
  | "three"
  | "websockets"
  | "react"
  | "typescript"
  | "tailwind"
  | "vscode"
  | "rust"
  | "tauri"
  | "dotnet"
  | "signalr"
  | "rabbitmq"
  | "blazor"
  | "ffmpeg"
  | "redis"
  | "gray"
  | "html"
  | "css"
  | "javascript"
  | "node"
  | "next"
  | "kubernetes"
  | "postgresql"
  | "ogl"
  | "glsl";

export const tagLabels = {
  three: "Three.js",
  websockets: "WebSockets",
  react: "React",
  typescript: "TypeScript",
  tailwind: "Tailwind CSS",
  vscode: "VS Code",
  rust: "Rust",
  tauri: "Tauri",
  dotnet: ".NET",
  signalr: "SignalR",
  rabbitmq: "RabbitMQ",
  blazor: "Blazor",
  ffmpeg: "FFmpeg",
  redis: "Redis",
  gray: "Gray",
  html: "HTML",
  css: "CSS",
  javascript: "JavaScript",
  node: "Node.js",
  next: "Next.js",
  kubernetes: "Kubernetes",
  postgresql: "PostgreSQL",
  ogl: "OGL.js",
  glsl: "GLSL",
} as const satisfies Record<TagVariant, string>;
