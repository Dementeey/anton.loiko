import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import path from 'path';

/** @type {import('mdsvex').MdsvexOptions} */

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte'],
	kit: {
		alias: {
			$components: path.resolve('./src/components')
		},
		prerender: {
			handleHttpError: ({ path, referrer, message, referenceType, status }) => {
				console.error(
					{ path, referrer, message, referenceType, status },
					'<=== handleHttpError ==='
				);

				// otherwise fail the build
				throw new Error(message);
			}
		},

		// adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
		// If your environment is not supported, or you settled on a specific environment, switch out the adapter.
		// See https://kit.svelte.dev/docs/adapters for more information about adapters.
		adapter: adapter({
			fallback: undefined
		}),
		paths: {
			base: process.argv.includes('dev') ? '' : process.env.BASE_PATH
		}
	},
	preprocess: [vitePreprocess()]
};

export default config;
