// Syntax colours drawn from the site palette: teal and mint from the favicon, with sand and coral
// for contrast. No violet (house rule), and every colour reads at 4.5:1 or better on --surface.
export default {
	name: 'irving-swift',
	type: 'dark',
	colors: {
		'editor.background': '#213139',
		'editor.foreground': '#d4ebe6',
	},
	tokenColors: [
		{ settings: { foreground: '#d4ebe6' } },
		{ scope: ['comment', 'punctuation.definition.comment'], settings: { foreground: '#7fa39c', fontStyle: 'italic' } },
		{ scope: ['string', 'string.quoted', 'string.template', 'markup.inline.raw'], settings: { foreground: '#e9d48f' } },
		{ scope: ['constant.numeric', 'constant.language', 'constant.character', 'support.constant'], settings: { foreground: '#f3a98c' } },
		{ scope: ['keyword', 'storage', 'storage.type', 'keyword.operator.new', 'keyword.control'], settings: { foreground: '#2fd6c0' } },
		{ scope: ['entity.name.function', 'support.function', 'meta.function-call'], settings: { foreground: '#9cf0df' } },
		{ scope: ['entity.name.type', 'entity.name.class', 'support.type', 'support.class'], settings: { foreground: '#f3a98c' } },
		{ scope: ['entity.name.tag', 'meta.tag'], settings: { foreground: '#2fd6c0' } },
		{ scope: ['entity.other.attribute-name', 'support.type.property-name'], settings: { foreground: '#e9d48f' } },
		{ scope: ['variable', 'variable.other', 'variable.parameter'], settings: { foreground: '#d4ebe6' } },
		{ scope: ['variable.other.constant', 'variable.language'], settings: { foreground: '#f3a98c' } },
		{ scope: ['punctuation', 'meta.brace', 'keyword.operator'], settings: { foreground: '#9fbdb7' } },
		{ scope: ['markup.heading', 'entity.name.section'], settings: { foreground: '#2fd6c0', fontStyle: 'bold' } },
	],
};
