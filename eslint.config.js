import { fileURLToPath } from "node:url";
import { dirname } from "node:path";
import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js";
import globals from "globals";
import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
});

export default [
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "coverage/**",
      "package*.json",
      "migrations/**",
      "infra/**",
    ],
  },

  ...compat.extends(
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:jest/recommended",
    "prettier",
  ),

  ...nextCoreWebVitals,
  ...nextTypescript,

  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.jest,
      },
    },

    rules: {
      "no-unused-vars": "warn",
      "jest/no-conditional-expect": "off",
    },
  },
];
