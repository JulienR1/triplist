import typescript from "@rollup/plugin-typescript";
import { terser } from "rollup-plugin-terser";
import json from "@rollup/plugin-json";
import run from "@rollup/plugin-run";
import excludeDependencies from "rollup-plugin-exclude-dependencies-from-bundle";

const production = !process.env.ROLLUP_WATCH;
const externals = ["dotenv", "express", "mysql2", "cors", "common/"];

export default {
    input: "src/main.ts",
    output: {
        dir: "dist",
        format: "cjs",
    },
    onwarn: (warning, warn) => {
        if (warning.code === "UNRESOLVED_IMPORT" && externals.find((external) => warning.source.includes(external))) {
            return;
        }
        // if (warning.code === "EVAL") return;
        warn(warning);
    },
    plugins: [excludeDependencies(), json(), typescript(), !production && run(), production && terser()],
    watch: {
        clearScreen: false,
    },
};
