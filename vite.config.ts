import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import tsconfigPaths from "vite-tsconfig-paths";
import browserslistToEsbuild from "browserslist-to-esbuild";

// https://vitejs.dev/config/
export default ({ mode }: { mode: string }) => {
  // Load app-level env vars to node-level env vars.
  const env = loadEnv(mode, process.cwd(), "");

  return defineConfig({
    optimizeDeps: {
      include: ["@emotion/styled", "@mui/material/Tooltip"],
    },
    build: {
      // browserslist leverage plugin
      target: browserslistToEsbuild(),
      outDir: "build",
    },
    server: {
      port: 3000,
    },
    define: {
      "process.env": env,
    },
    assetsInclude: ["**/*.xlsx"],
    plugins: [tsconfigPaths(), react(), svgr()],
  });
};
