import type { NextConfig } from "next";
import createMDX from "@next/mdx";
import remarkFrontmatter from "remark-frontmatter";

const nextConfig: NextConfig = {
  pageExtensions: ["ts", "tsx", "md", "mdx"],
  redirects: async () => [
    // Old Wix /blank slugs → new hub pages
    { source: "/blank", destination: "/diseases", permanent: true },
    { source: "/blank-1", destination: "/genes", permanent: true },
    { source: "/blank-2", destination: "/mechanisms", permanent: true },
    { source: "/blank-3", destination: "/interventions", permanent: true },
    // Old app /privacy and /terms → canonical Wix-style slugs
    { source: "/privacy", destination: "/privacy-statement", permanent: true },
    { source: "/terms", destination: "/terms-and-conditions", permanent: true },
  ],
};

const withMDX = createMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [remarkFrontmatter],
  },
});

export default withMDX(nextConfig);
