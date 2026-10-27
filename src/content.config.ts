import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const posts = defineCollection({
	loader: glob({ base: './src/content/posts', pattern: '**/*.md' }),
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string(),
			pubDate: z.coerce.date(),
			updatedDate: z.coerce.date().optional(),
			categories: z.array(z.string()).default([]),
			cover: image().optional(),
			coverAlt: z.string().default(''),
			/** Credit line for a cover found in the open collections */
			coverCredit: z.string().optional(),
			draft: z.boolean().default(false),
		}),
});

const pages = defineCollection({
	loader: glob({ base: './src/content/pages', pattern: '**/*.md' }),
	schema: z.object({
		title: z.string(),
		description: z.string(),
		updatedDate: z.coerce.date().optional(),
	}),
});

export const collections = { posts, pages };
