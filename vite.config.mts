import copy from "rollup-plugin-copy";
import { defineConfig } from "vite";

export default defineConfig({
 build: {
   sourcemap: true,
   rollupOptions: {
     input: "src/module.tsx",
     output: {
        dir: undefined,
       file: "dist/scripts/module.js",
       format: "es",
     },
   },
 },
 plugins: [
   copy({
     targets: [{ src: "src/module.json", dest: "dist" }],
     hook: "writeBundle",
   }),
 ],
 
});