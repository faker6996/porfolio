import type { ProjectContent } from "../../types";

export default {
  title: "Stream & Detection",
  theme: "dark",
  tags: ["dotnet", "blazor", "signalr", "ffmpeg"],
  source: "https://github.com/faker6996/stream-and-detection",
  description:
    "A browser-based multi-camera surveillance system with AI bounding boxes updated directly over live video.<br/><br/>The ASP.NET Core backend converts RTSP to HLS with FFmpeg, sends frames to a detection API, and pushes results to the browser through SignalR.",
  components: [
    {
      type: "text",
      props: {
        title: "Processing flow",
        text: "Each camera feed becomes short HLS segments that modern browsers can play. A representative frame is sent to the AI API, then detection coordinates are broadcast through SignalR and drawn on a canvas over the video.",
      },
    },
    {
      type: "list",
      props: {
        title: "Technical highlights",
        items: [
          "A Blazor dashboard displaying multiple camera feeds at once.",
          "An RTSP → FFmpeg → HLS pipeline for modern browser playback.",
          "Real-time AI overlays using SignalR and HTML Canvas.",
          "Camera, FFmpeg, and AI endpoint configuration through appsettings.json.",
        ],
      },
    },
  ],
} as const satisfies ProjectContent;
