export const manifest = {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["favicon.png"]),
	mimeTypes: {".png":"image/png"},
	_: {
		client: {"start":{"file":"_app/immutable/entry/start.712cb264.js","imports":["_app/immutable/entry/start.712cb264.js","_app/immutable/chunks/index.ce7212fb.js","_app/immutable/chunks/singletons.4e433b4b.js"],"stylesheets":[],"fonts":[]},"app":{"file":"_app/immutable/entry/app.f2b28245.js","imports":["_app/immutable/entry/app.f2b28245.js","_app/immutable/chunks/supabaseClient.e8e52d2c.js","_app/immutable/chunks/browser-ponyfill.10e9505f.js","_app/immutable/chunks/index.ce7212fb.js"],"stylesheets":[],"fonts":[]}},
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
			() => import('./nodes/13.js')
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
				id: "/protected_routes/account/posts",
				pattern: /^\/protected_routes\/account\/posts\/?$/,
				params: [],
				page: { layouts: [0,2], errors: [1,,], leaf: 7 },
				endpoint: null
			},
			{
				id: "/protected_routes/account/status",
				pattern: /^\/protected_routes\/account\/status\/?$/,
				params: [],
				page: { layouts: [0,2], errors: [1,,], leaf: 8 },
				endpoint: null
			},
			{
				id: "/protected_routes/account/update",
				pattern: /^\/protected_routes\/account\/update\/?$/,
				params: [],
				page: { layouts: [0,2], errors: [1,,], leaf: 9 },
				endpoint: null
			},
			{
				id: "/protected_routes/actualite",
				pattern: /^\/protected_routes\/actualite\/?$/,
				params: [],
				page: { layouts: [0,2], errors: [1,,], leaf: 10 },
				endpoint: null
			},
			{
				id: "/protected_routes/search",
				pattern: /^\/protected_routes\/search\/?$/,
				params: [],
				page: { layouts: [0,2], errors: [1,,], leaf: 11 },
				endpoint: null
			},
			{
				id: "/signIn",
				pattern: /^\/signIn\/?$/,
				params: [],
				page: { layouts: [0], errors: [1], leaf: 12 },
				endpoint: null
			},
			{
				id: "/signUp",
				pattern: /^\/signUp\/?$/,
				params: [],
				page: { layouts: [0], errors: [1], leaf: 13 },
				endpoint: null
			}
		],
		matchers: async () => {
			
			return {  };
		}
	}
};
