import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import pluginPrettier from "eslint-plugin-prettier";
import configPrettier from "eslint-config-prettier";
/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  {
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    languageOptions: {
      globals: globals.browser,
    },
  },
  // JavaScript recommended rules
  pluginJs.configs.recommended,

  // TypeScript recommended rules
  ...tseslint.configs.recommended,

  // React recommended rules
  pluginReact.configs.flat.recommended,

  // Prettier integration:
  {
    // Add the Prettier plugin
    plugins: {
      prettier: pluginPrettier,
    },
    // The Prettier config disables formatting-related ESLint rules that conflict with Prettier
    rules: {
      ...configPrettier.rules,
      "prettier/prettier": [
        "error",
        {
          endOfLine: "crlf",
        },
      ],
      "linebreak-style": ["error", "windows"],
    },
  },
];
