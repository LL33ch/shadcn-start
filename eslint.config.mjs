import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
  // Code copied from the shadcn/ui docs and registry: kept as published.
  {
    files: [
      "components/docs/examples/**",
      "components/ui/**",
      "components/preview-02/**",
      "hooks/use-mobile.ts",
    ],
    rules: {
      "react-hooks/refs": "off",
      "react-hooks/set-state-in-effect": "off",
      "@typescript-eslint/no-unused-vars": "off",
      "@next/next/no-img-element": "off",
    },
  },
]);

export default eslintConfig;
