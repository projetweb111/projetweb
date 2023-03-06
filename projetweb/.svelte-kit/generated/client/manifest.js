import * as client_hooks from '../../../src/hooks.client.ts';

export { matchers } from './matchers.js';

export const nodes = [() => import('./nodes/0'),
	() => import('./nodes/1'),
	() => import('./nodes/2'),
	() => import('./nodes/3'),
	() => import('./nodes/4')];

export const server_loads = [];

export const dictionary = {
	"/home": [3,[2]],
	"/home/actualite": [4,[2]]
};

export const hooks = {
	handleError: client_hooks.handleError || (({ error }) => { console.error(error) }),
};