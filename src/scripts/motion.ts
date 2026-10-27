import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const root = document.documentElement;

// Smooth, weighted scrolling on wheel and trackpad; touch keeps the device's own scrolling
if (!reduced) {
	new Lenis({ lerp: 0.12, anchors: { offset: -16 }, autoRaf: true });
}

// Headings rise word by word: each word slides up out of its own mask
if (!reduced) {
	document.querySelectorAll<HTMLElement>('[data-split]').forEach((el) => {
		let index = 0;
		const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
		const nodes: Text[] = [];
		while (walker.nextNode()) nodes.push(walker.currentNode as Text);
		for (const node of nodes) {
			const parts = node.textContent?.split(/(\s+)/) ?? [];
			const frag = document.createDocumentFragment();
			for (const part of parts) {
				if (!part) continue;
				if (/^\s+$/.test(part)) {
					frag.append(part);
					continue;
				}
				const mask = document.createElement('span');
				mask.className = 'w';
				const word = document.createElement('span');
				word.textContent = part;
				word.style.setProperty('--wi', String(index++));
				mask.append(word);
				frag.append(mask);
			}
			node.replaceWith(frag);
		}
		el.classList.add('is-split');
	});
}

// Parts arrive once, in reading order, as they enter the viewport
const arrivals = new IntersectionObserver(
	(entries) => {
		for (const entry of entries) {
			if (!entry.isIntersecting) continue;
			entry.target.classList.add('is-in');
			arrivals.unobserve(entry.target);
		}
	},
	{ rootMargin: '0px 0px -10% 0px' },
);
document.querySelectorAll('.prose > *').forEach((el) => el.setAttribute('data-reveal', ''));
document.querySelectorAll('[data-reveal], [data-split], [data-wipe]').forEach((el) => arrivals.observe(el));

// Scroll-linked layer: parallax drift, a slow turn on the scrapbook prints, the hero easing away,
// and the reading progress bar on notes. One read of the scroll position per frame.
const drifters = [...document.querySelectorAll<HTMLElement>('[data-parallax]')];
const leaving = document.querySelector<HTMLElement>('[data-exit]');
const progress = document.querySelector<HTMLElement>('[data-progress]');

if (!reduced && (drifters.length || leaving || progress)) {
	let ticking = false;
	const update = () => {
		ticking = false;
		const vh = window.innerHeight;
		const scale = window.innerWidth < 768 ? 0.5 : 1;
		for (const el of drifters) {
			const box = el.getBoundingClientRect();
			if (box.bottom < -vh || box.top > vh * 2) continue;
			// Things on the first screen drift from where they rest; the rest from the middle of the viewport
			const offset = 'fromTop' in el.dataset ? -window.scrollY / vh : (box.top + box.height / 2 - vh / 2) / vh;
			const speed = Number(el.dataset.parallax) || 0;
			const spin = Number(el.dataset.spin) || 0;
			el.style.setProperty('--py', `${(offset * speed * vh * scale).toFixed(1)}px`);
			el.style.setProperty('--pr', `${(offset * spin).toFixed(2)}deg`);
		}
		if (leaving) {
			const span = leaving.closest('section')?.offsetHeight || vh;
			const p = Math.min(1, Math.max(0, window.scrollY / span));
			leaving.style.setProperty('--exit', p.toFixed(3));
		}
		if (progress) {
			const max = root.scrollHeight - vh;
			progress.style.setProperty('--progress', max > 0 ? (window.scrollY / max).toFixed(4) : '0');
		}
	};
	const request = () => {
		if (!ticking) {
			ticking = true;
			requestAnimationFrame(update);
		}
	};
	window.addEventListener('scroll', request, { passive: true });
	window.addEventListener('resize', request);
	update();
}
