import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";

const BASE_URL = "";

const entries = [
  { path: "/", priority: "1.0", changefreq: "weekly" as const },
  { path: "/our-story", priority: "0.9", changefreq: "monthly" as const },
  { path: "/about", priority: "0.7", changefreq: "monthly" as const },
  { path: "/about/team", priority: "0.6", changefreq: "monthly" as const },
  { path: "/programs", priority: "0.9", changefreq: "monthly" as const },
  { path: "/resources", priority: "0.8", changefreq: "weekly" as const },
  { path: "/contact", priority: "0.8", changefreq: "monthly" as const },
  { path: "/parents", priority: "0.9", changefreq: "weekly" as const },
  { path: "/learning-center", priority: "0.9", changefreq: "weekly" as const },
  { path: "/learning-center/basic", priority: "0.8", changefreq: "weekly" as const },
  { path: "/learning-center/intermediate", priority: "0.8", changefreq: "weekly" as const },
  { path: "/learning-center/advanced", priority: "0.8", changefreq: "weekly" as const },
  { path: "/survivors", priority: "0.9", changefreq: "weekly" as const },
  { path: "/support-request", priority: "0.7", changefreq: "monthly" as const },
  { path: "/sessions", priority: "0.6", changefreq: "weekly" as const },
  { path: "/referral", priority: "0.7", changefreq: "monthly" as const },
  { path: "/safety", priority: "0.7", changefreq: "monthly" as const },
  { path: "/consent", priority: "0.6", changefreq: "monthly" as const },
  { path: "/feedback", priority: "0.5", changefreq: "monthly" as const },
  { path: "/staff", priority: "0.4", changefreq: "monthly" as const },
];

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const urls = entries.map((e) =>
          `  <url>\n    <loc>${BASE_URL}${e.path}</loc>\n    <changefreq>${e.changefreq}</changefreq>\n    <priority>${e.priority}</priority>\n  </url>`
        );
        const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join("\n")}\n</urlset>`;
        return new Response(xml, {
          headers: { "Content-Type": "application/xml", "Cache-Control": "public, max-age=3600" },
        });
      },
    },
  },
});
