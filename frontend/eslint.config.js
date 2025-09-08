import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import { defineConfig } from "eslint/config";

export default defineConfig([
    {
        files: ["**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
        plugins: {js, react: pluginReact},
        languageOptions: {globals: globals.browser, parser: tseslint.parser, parserOptions: {ecmaVersion: "latest",sourceType: "module", ecmaFeatures: {jsx: true}}},
        settings: {react: {version: "detect"}},
        rules: {
            ...js.configs.recommended.rules,
            ...tseslint.configs.recommended.rules,
            ...pluginReact.configs.flat.recommended.rules,
            "react/react-in-jsx-scope": "off",
            "indent": ["error", 4, { SwitchCase: 1 }],
            "semi": ["error", "always", { omitLastInOneLineBlock: true }],
            "semi-spacing": ["error", { before: false, after: true }]
        },
    },
]);