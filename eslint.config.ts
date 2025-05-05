import eslint from "@eslint/js";
// @ts-expect-error: lib error
import biome from "eslint-config-biome";
import pluginJest from "eslint-plugin-jest";
import tseslint, { type ConfigArray } from "typescript-eslint";

export default tseslint.config([
	{ ignores: ["**/build/**", "**/client/**", "**/dist/**", "**/node_modules/**"] },
	eslint.configs.recommended,
	// TS files
	{
		files: ["**/*.ts", "**/*.tsx"],
		extends: [tseslint.configs.strict, tseslint.configs.stylistic],
		languageOptions: {
			parser: tseslint.parser,
		},
		plugins: {
			"@typescript-eslint": tseslint.plugin,
		},
		rules: {
			"@typescript-eslint/array-type": "off",
			"@typescript-eslint/ban-ts-comment": "warn",
			"@typescript-eslint/no-confusing-void-expression": "off",
			"@typescript-eslint/no-duplicate-enum-values": "off",
			"@typescript-eslint/no-dynamic-delete": "off",
			"@typescript-eslint/no-empty-function": "warn",
		},
	},
	// JS files
	{
		files: ["**/*.js", "**/*.jsx"],
		extends: [tseslint.configs.disableTypeChecked],
	},
	// Test files
	{
		files: [
			"**/*.spec.js",
			"**/*.spec.ts",
			"**/*.test.js",
			"**/*.test.ts",
			"**/*.spec.jsx",
			"**/*.spec.tsx",
			"**/*.test.jsx",
			"**/*.test.tsx",
		],
		extends: [pluginJest.configs["flat/all"]],
		languageOptions: {
			globals: pluginJest.environments.globals.globals,
		},
		plugins: {
			jest: pluginJest,
		},
		rules: {
			"jest/no-deprecated-functions": "off",
		},
		settings: {
			jest: {
				globalPackage: "bun:test",
			},
		},
	},
	{
		extends: [biome],
		rules: {
			"@typescript-eslint/no-unused-vars": "off",
			"@typescript-eslint/require-await": "off",
			"jest/max-nested-describe": "off",
			"jest/no-disabled-tests": "off",
			"jest/no-done-callback": "off",
			"jest/no-duplicate-hooks": "off",
			"jest/no-export": "off",
			"jest/no-focused-tests": "off",
			"jest/no-standalone-expect": "off",
			"sort-imports": "off",
		},
	},
]) as unknown as ConfigArray;
