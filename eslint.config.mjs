import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';
import pluginQuery from '@tanstack/eslint-plugin-query';

const queryRecommended = pluginQuery.configs?.['flat/recommended'];
const queryRecommendedConfigs = Array.isArray(queryRecommended)
	? queryRecommended
	: queryRecommended
		? [queryRecommended]
		: [];

const eslintConfig = defineConfig([
	...nextVitals,
	...nextTs,
	...queryRecommendedConfigs,

	// Override default ignores of eslint-config-next.
	globalIgnores([
		// Default ignores of eslint-config-next:
		'.next/**',
		'out/**',
		'build/**',
		'next-env.d.ts',
	]),
]);

export default eslintConfig;
