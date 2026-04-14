export { matchers } from './matchers.js';

export const nodes = [
	() => import('./nodes/0'),
	() => import('./nodes/1'),
	() => import('./nodes/2'),
	() => import('./nodes/3'),
	() => import('./nodes/4'),
	() => import('./nodes/5'),
	() => import('./nodes/6'),
	() => import('./nodes/7'),
	() => import('./nodes/8'),
	() => import('./nodes/9'),
	() => import('./nodes/10'),
	() => import('./nodes/11')
];

export const server_loads = [];

export const dictionary = {
		"/": [3],
		"/login": [4,[2]],
		"/questionnaire": [5],
		"/questionnaire/logistics": [6],
		"/questionnaire/project-core": [7],
		"/questionnaire/technical": [8],
		"/report": [9],
		"/settings": [10],
		"/support": [11]
	};

export const hooks = {
	handleError: (({ error }) => { console.error(error) }),
};

export { default as root } from '../root.svelte';