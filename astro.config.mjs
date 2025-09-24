// @ts-check
import { defineConfig } from "astro/config";
import websiteSetting from "./src/features/websiteSetting.json";
import tailwindcss from "@tailwindcss/vite";
import partytown from "@astrojs/partytown";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  prefetch: true,
  site: websiteSetting.websiteUrl,
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [
    partytown({
      config: {
        forward: ["dataLayer.push"],
      },
    }),
    sitemap({
      filter: (page) => {
        const excludedPaths = websiteSetting.sitemapExcluded;
        const path = page.replace(websiteSetting.websiteUrl, "");
        return !excludedPaths.includes(path);
      },
    }),
  ],
  image: {
    domains: websiteSetting.listOfAuthrizedImgDomain,
  },
  devToolbar: {
    enabled: false,
  },
  experimental: {
    fonts: [
      {
        provider: "local",
        name: "InterLocal",
        cssVariable: "--font-inter",
        variants: [
          {
            weight: 400,
            style: "normal",
            src: ["./src/fonts/Inter-Regular.woff2"],
          },
          {
            weight: 600,
            style: "normal",
            src: ["./src/fonts/Inter-SemiBold.woff2"],
          },
          {
            weight: 700,
            style: "normal",
            src: ["./src/fonts/Inter-Bold.woff2"],
          },
        ],
      },
      {
        provider: "local",
        name: "InterLocalDisplay",
        cssVariable: "--font-inter-display",
        variants: [
          {
            weight: 400,
            style: "normal",
            src: ["./src/fonts/InterDisplay-Regular.woff2"],
          },
          {
            weight: 500,
            style: "normal",
            src: ["./src/fonts/InterDisplay-Medium.woff2"],
          },
          {
            weight: 600,
            style: "normal",
            src: ["./src/fonts/InterDisplay-SemiBold.woff2"],
          },
        ],
      },
    ],
  },
});
