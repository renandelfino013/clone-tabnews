import js from "@eslint/js";
import globals from "globals";
import eslintConfigPrettier from "eslint-config-prettier";
import tsParser from "@typescript-eslint/parser";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "coverage/**",
      "package*.json",
      "migrations/**",
      "infra/**",
      "tests/**",
      "test/**",
      "__tests__/**",
    ],
  },
  {
    files: ["**/*.{js,mjs,cjs,jsx,ts,tsx}"],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      parser: tsParser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: { jsx: true },
      },
    },
    extends: [js.configs.recommended, eslintConfigPrettier],
  },
]);
