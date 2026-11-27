import tseslint from "@typescript-eslint/eslint-plugin";
import astro from "eslint-plugin-astro";

export default [
  { ignores: [".astro/**", "dist/**"] },
  ...tseslint.configs["flat/recommended"].map((config) => ({
    ...config,
    files: ["src/**/*.{ts,tsx}"],
  })),
  ...astro.configs["flat/recommended"],
];
