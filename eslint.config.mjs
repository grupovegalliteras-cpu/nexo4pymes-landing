import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    // Reglas del React Compiler: este proyecto no usa el compilador y la demo se
    // basa en el reloj (Date.now) y en efectos que reaccionan a eventos de la demo.
    rules: {
      "react-hooks/set-state-in-effect": "off",
      "react-hooks/purity": "off",
      "react-hooks/refs": "off",
    },
  },
  {
    // Los hooks de la web se llaman en castellano (usarConsentimiento, usarMovimientoReducido…)
    // y la regla solo reconoce el prefijo «use». Son hooks de verdad y se usan como tales.
    files: ["lib/consentimiento.ts", "components/motion/**"],
    rules: { "react-hooks/rules-of-hooks": "off" },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
