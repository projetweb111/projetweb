import * as client_hooks from '../../../src/hooks.client.ts';

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
	() => import('./nodes/11'),
	() => import('./nodes/12'),
	() => import('./nodes/13'),
	() => import('./nodes/14'),
	() => import('./nodes/15'),
	() => import('./nodes/16')
];

export const server_loads = [0];

export const dictionary = {
		"/": [3],
		"/protected_routes/account": [4,[2]],
		"/protected_routes/account/assos": [5,[2]],
		"/protected_routes/account/auth": [6,[2]],
		"/protected_routes/account/edit": [7,[2]],
		"/protected_routes/account/photo": [8,[2]],
		"/protected_routes/account/posts": [9,[2]],
		"/protected_routes/account/status": [10,[2]],
		"/protected_routes/account/update": [11,[2]],
		"/protected_routes/actualite": [12,[2]],
		"/protected_routes/message": [13,[2]],
		"/protected_routes/search": [14,[2]],
		"/signIn": [15],
		"/signUp": [16]
	};

export const hooks = {
	handleError: client_hooks.handleError || (({ error }) => { console.error(error) }),
};

export { default as root } from '../root.svelte';