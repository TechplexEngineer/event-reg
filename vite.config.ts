import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';
import { svelteTesting } from '@testing-library/svelte/vite'

export default defineConfig({
	plugins: [sveltekit(), svelteTesting()],

	test: {
		include: ['src/**/*.{test,spec}.{js,ts}'],
		// reporter: 'verbose',
		// environment: 'happy-dom',
		environment: 'jsdom',
		setupFiles: ['./vitest-setup.js'],
		// setupFiles: ['./src/vitest/registerMatchers.ts']
	},

	css: {
		preprocessorOptions: {
			scss: {
				additionalData: '@use "src/variables.scss" as *;'
			}
		}
	}
});
