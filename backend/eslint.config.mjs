import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import prettier from "eslint-config-prettier";
import { defineConfig } from "eslint/config";

export default defineConfig([
    {
        ignores: ["dist/**", "node_modules/**"],
        files: ["**/*.{ts,mts,cts}"],
        languageOptions: {parser: tseslint.parser,parserOptions: {ecmaVersion: "latest",sourceType: "module",project: "./tsconfig.json"},globals: globals.node},
        plugins: {"@typescript-eslint": tseslint.plugin},
        rules: {
            ...js.configs.recommended.rules,
            ...tseslint.configs.recommended.rules,
            "indent": ["error", 4, { SwitchCase: 1 }],
            "semi": ["error", "always", { omitLastInOneLineBlock: true }],
            "semi-spacing": ["error", { before: false, after: true }],
            "quotes": ["error", "double", { avoidEscape: true, allowTemplateLiterals: true }],
            "no-console": ["warn", { allow: ["warn", "error"] }],
            "no-unused-vars": "off",
            "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
            "@typescript-eslint/no-floating-promises": "error",
            "@typescript-eslint/no-explicit-any": "warn"
        }
    },
    prettier
]);
