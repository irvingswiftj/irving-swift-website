// schema.org helpers for the JSON-LD graph printed by layouts/Base.astro

/** Stable @id for a node shared across pages, e.g. the site's Person */
export function schemaId(name: string) {
	return new URL(`/#${name}`, import.meta.env.SITE).href;
}

/** BreadcrumbList from Home through each [name, path] crumb */
export function breadcrumbs(...crumbs: [name: string, path: string][]) {
	return {
		'@type': 'BreadcrumbList',
		itemListElement: [['Home', '/'] as const, ...crumbs].map(([name, path], i) => ({
			'@type': 'ListItem',
			position: i + 1,
			name,
			item: new URL(path, import.meta.env.SITE).href,
		})),
	};
}
