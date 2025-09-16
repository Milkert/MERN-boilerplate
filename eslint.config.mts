import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    ignores: [".config/**", "**/jest.config.js", "**/*.config.js"],
  },
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
    plugins: { js },
    extends: ["js/recommended"],
    languageOptions: { globals: globals.browser },
  },
  { files: ["**/*.js"], languageOptions: { sourceType: "module" } },
  tseslint.configs.recommended,
  {
    ...pluginReact.configs.flat.recommended,
    settings: {
      react: {
        version: "19.1",
      },
    },
    rules: {
      "react/react-in-jsx-scope": "off", // Not needed with new JSX transform
    },
  },
  {
    rules: {
      semi: ["error", "always"], // Enfore semicolons
      quotes: ["error", "double"], // Use single quotes
      "object-curly-spacing": ["error", "always"], // space inside curly braces
      "array-bracket-spacing": ["error", "never"], // no space inside array brackets
      "comma-dangle": ["error", "always-multiline"], // trailing commas in multiline objects and arrays
      "no-multi-spaces": "error", // no multiple spaces
      "space-before-blocks": ["error", "always"], // space before blocks
      "space-in-parens": ["error", "never"], // no space inside parentheses
      "key-spacing": ["error", { beforeColon: false, afterColon: true }], // space after colon in object literals
      "eol-last": ["error", "always"], // newline at end of file
      camelcase: [
        "error",
        {
          properties: "never", // don't enforce on object property names
          ignoreDestructuring: true, // ignore destructured variables
        },
      ],
      "brace-style": ["error", "1tbs"], // one true brace style
      "react/jsx-curly-brace-presence": ["error", "never"], // disallow unnecessary curly braces in JSX
      "react/self-closing-comp": ["error", { component: true, html: false }], // self-close components without children
      "@typescript-eslint/consistent-type-definitions": ["error", "type"], // use 'type' for type definitions
      "@typescript-eslint/no-use-before-define": ["error", { functions: false, classes: true, variables: true }], // allow function use before define
      "@typescript-eslint/no-explicit-any": "error", // warn on use of 'any' type
      "react/jsx-key": ["error", { checkFragmentShorthand: true }], // enforce keys in lists and fragments
    },
  },
]);
