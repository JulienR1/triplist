import { nodeResolve } from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import commonjs from "@rollup/plugin-commonjs";
import { terser } from "rollup-plugin-terser";
import json from "@rollup/plugin-json";
import run from "@rollup/plugin-run";
import exclueDependencies from "rollup-plugin-exclude-dependencies-from-bundle";

const production = !process.env.ROLLUP_WATCH;

export default {
	input: "src/main.ts",
	output: {
		dir: "dist",
		format: "cjs",
	},
	onwarn: (warning, warn) => {
		if (warning.code === "EVAL") return;
		warn(warning);
	},
	plugins: [
		exclueDependencies(),
		json(),
		commonjs(),
		nodeResolve(),
		typescript(),
		!production && run(),
		production && terser(),
	],
	watch: {
		clearScreen: false,
	},
};
