import resolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import terser from "@rollup/plugin-terser";

const production = process.env.NODE_ENV === "production";

export default {
  input: "src/heating-power-card.ts",

  output: {
    file: "dist/heating-power-card.js",
    format: "es",
    // Source maps in dev, not in production (keeps dist/ clean for HACS)
    sourcemap: !production,
  },

  plugins: [
    resolve(),
    typescript({ tsconfig: "./tsconfig.json", sourceMap: !production }),
    // Minify only in production builds
    production && terser({
      format: { comments: false },
      compress: { drop_console: true },
    }),
  ].filter(Boolean),
};
