export const manifest = {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["favicon.png"]),
	mimeTypes: {".png":"image/png"},
	_: {
		client: {"start":{"file":"_app/immutable/entry/start.4cf5dd56.js","imports":["_app/immutable/entry/start.4cf5dd56.js","_app/immutable/chunks/index.0e58c74b.js","_app/immutable/chunks/singletons.db562788.js"],"stylesheets":[],"fonts":[]},"app":{"file":"_app/immutable/entry/app.4989c9e0.js","imports":["_app/immutable/entry/app.4989c9e0.js","_app/immutable/chunks/supabaseClient.e8e52d2c.js","_app/immutable/chunks/browser-ponyfill.10e9505f.js","_app/immutable/chunks/index.0e58c74b.js"],"stylesheets":[],"fonts":[]}},
		nodes: [
			() => import('./nodes/0.js'),
			() => import('./nodes/1.js'),
			() => import('./nodes/2.js'),
			() => import('./nodes/3.js'),
			() => import('./nodes/4.js'),
			() => import('./nodes/5.js'),
			() => import('./nodes/6.js'),
			() => import('./nodes/7.js'),
			() => import('./nodes/8.js'),
			() => import('./nodes/9.js'),
			() => import('./nodes/10.js'),
			() => import('./nodes/11.js'),
			() => import('./nodes/12.js'),
			() => import('./nodes/13.js'),
			() => import('./nodes/14.js'),
			() => import('./nodes/15.js')
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0], errors: [1], leaf: 3 },
				endpoint: null
			},
			{
				id: "/protected_routes/account",
				pattern: /^\/protected_routes\/account\/?$/,
				params: [],
				page: { layouts: [0,2], errors: [1,,], leaf: 4 },
				endpoint: null
			},
			{
				id: "/protected_routes/account/assos",
				pattern: /^\/protected_routes\/account\/assos\/?$/,
				params: [],
				page: { layouts: [0,2], errors: [1,,], leaf: 5 },
				endpoint: null
			},
			{
				id: "/protected_routes/account/auth",
				pattern: /^\/protected_routes\/account\/auth\/?$/,
				params: [],
				page: { layouts: [0,2], errors: [1,,], leaf: 6 },
				endpoint: null
			},
			{
				id: "/protected_routes/account/photo",
				pattern: /^\/protected_routes\/account\/photo\/?$/,
				params: [],
				page: { layouts: [0,2], errors: [1,,], leaf: 7 },
				endpoint: null
			},
			{
				id: "/protected_routes/account/posts",
				pattern: /^\/protected_routes\/account\/posts\/?$/,
				params: [],
				page: { layouts: [0,2], errors: [1,,], leaf: 8 },
				endpoint: null
			},
			{
				id: "/protected_routes/account/status",
				pattern: /^\/protected_routes\/account\/status\/?$/,
				params: [],
				page: { layouts: [0,2], errors: [1,,], leaf: 9 },
				endpoint: null
			},
			{
				id: "/protected_routes/account/update",
				pattern: /^\/protected_routes\/account\/update\/?$/,
				params: [],
				page: { layouts: [0,2], errors: [1,,], leaf: 10 },
				endpoint: null
			},
			{
				id: "/protected_routes/actualite",
				pattern: /^\/protected_routes\/actualite\/?$/,
				params: [],
				page: { layouts: [0,2], errors: [1,,], leaf: 11 },
				endpoint: null
			},
			{
				id: "/protected_routes/message",
				pattern: /^\/protected_routes\/message\/?$/,
				params: [],
				page: { layouts: [0,2], errors: [1,,], leaf: 12 },
				endpoint: () => import('./entries/endpoints/protected_routes/message/_server.ts.js')
			},
			{
				id: "/protected_routes/search",
				pattern: /^\/protected_routes\/search\/?$/,
				params: [],
				page: { layouts: [0,2], errors: [1,,], leaf: 13 },
				endpoint: null
			},
			{
				id: "/signIn",
				pattern: /^\/signIn\/?$/,
				params: [],
				page: { layouts: [0], errors: [1], leaf: 14 },
				endpoint: null
			},
			{
				id: "/signUp",
				pattern: /^\/signUp\/?$/,
				params: [],
				page: { layouts: [0], errors: [1], leaf: 15 },
				endpoint: null
			}
		],
		matchers: async () => {
			
			return {  };
		}
	}
};
