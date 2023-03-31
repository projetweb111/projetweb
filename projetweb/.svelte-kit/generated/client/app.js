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
	() => import('./nodes/16'),
	() => import('./nodes/17'),
	() => import('./nodes/18'),
	() => import('./nodes/19')
];

export const server_loads = [0,3];

export const dictionary = {
		"/": [5],
		"/protected_routes/account": [6,[2]],
		"/protected_routes/account/assos": [7,[2]],
		"/protected_routes/account/auth": [8,[2]],
		"/protected_routes/account/photo": [9,[2]],
		"/protected_routes/account/posts": [10,[2]],
		"/protected_routes/account/status": [11,[2]],
		"/protected_routes/account/update": [12,[2]],
		"/protected_routes/actualite": [13,[2]],
		"/protected_routes/association": [14,[2]],
		"/protected_routes/association/[name_association]": [~15,[2,3]],
		"/protected_routes/association/[name_association]/logo": [16,[2,3,4]],
		"/protected_routes/search": [17,[2]],
		"/signIn": [18],
		"/signUp": [19]
	};

export const hooks = {
	handleError: client_hooks.handleError || (({ error }) => { console.error(error) }),
};

export { default as root } from '../root.svelte';