// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import codeTheme from './src/code-theme.mjs';

// https://astro.build/config
export default defineConfig({
	site: 'https://irving-swift.com',
	trailingSlash: 'always',
	integrations: [sitemap()],
	markdown: {
		shikiConfig: {
			theme: codeTheme,
			wrap: false,
		},
	},
	redirects: {
		// Old WordPress feed URL
		'/feed': '/rss.xml',
	},
});
