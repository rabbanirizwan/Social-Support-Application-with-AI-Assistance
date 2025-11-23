import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [
    tailwindcss(), // ✅ Vite plugin
    react({
      babel: {
        plugins: [
          ["babel-plugin-react-compiler"] // ✅ valid Babel plugin
        ],
      },
    }),
  ],
});
