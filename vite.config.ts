import { defineConfig } from "vite";
import { vite } from "@canmingir/link/vite";

export default defineConfig(async () => {
  const config = await vite();
  config.plugins = (config.plugins ?? []).filter(
    (p: { name?: string } | null | undefined | false) =>
      !(p && p.name === "vite:split-vendor-chunk"),
  );

  config.build.rollupOptions.output.manualChunks = (id: string) => {
    const inNodeModules = id.indexOf("node_modules") !== -1;
    if (id.indexOf("config.js") !== -1 && !inNodeModules) {
      return "config";
    }
    if (inNodeModules) {
      return "vendor";
    }
  };

  return config;
});
