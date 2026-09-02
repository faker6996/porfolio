import type { ProjectPreview } from "../../types";

const githubPreview = (repository: string) =>
  `https://opengraph.githubassets.com/portfolio-tran-van-bach/faker6996/${repository}`;

export default [
  {
    title: "IQ NFFICE",
    slug: "iq-nffice",
    thumbnail: "",
    description: "An enterprise groupware platform with 27 business modules",
  },
  {
    title: "IQ Tool",
    slug: "iq-tool",
    thumbnail: "",
    description: "A Three.js point-cloud and LiDAR visualization tool",
  },
  {
    title: "Enterprise Groupware (Korea)",
    slug: "enterprise-groupware-kr",
    thumbnail: "",
    description: "A localized multi-company groupware outsource engagement",
  },
  {
    title: "Underverse UI",
    slug: "underverse",
    thumbnail: githubPreview("underverse"),
    description: "A library of 60+ React components",
  },
  {
    title: "MD & PDF Toolkit",
    slug: "md-extension",
    thumbnail: githubPreview("md_extension"),
    description: "An all-in-one Markdown toolkit for VS Code",
  },
  {
    title: "Ziply",
    slug: "ziply",
    thumbnail: githubPreview("ziply"),
    description: "A cross-platform archive utility",
  },
  {
    title: "Social Platform",
    slug: "facebook",
    thumbnail: githubPreview("facebook"),
    description: "A full-stack real-time social platform",
  },
  {
    title: "Stream & Detection",
    slug: "stream-detection",
    thumbnail: githubPreview("stream-and-detection"),
    description: "Multi-camera surveillance with AI overlays",
  },
] as const satisfies ProjectPreview[];
