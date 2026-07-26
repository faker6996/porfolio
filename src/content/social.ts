export const social = [
  { url: "https://github.com/faker6996", name: "github" },
] as const satisfies { url: string; name: "mail" | "github" | "instagram" | "linkedin" | "x" }[];
