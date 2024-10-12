import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import mockDevServerPlugin from "vite-plugin-mock-dev-server";
import pkg from "./package.json";

// https://vitejs.dev/config/
export default (configEnv) => {
  const { mode } = configEnv;
  console.log(configEnv.mode);
  return defineConfig({
    base: `/${pkg.name}`,
    plugins: [react(), ...(mode === "mock" ? [mockDevServerPlugin()] : [])],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
      },
    },
    server: {
      open: true,
      proxy: {
        "/sys": {
          target: "http://localhost:5317/", // 代理地址
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/sys/, ""),
        },
      },
    },
  });
};
