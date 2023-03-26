import * as server from '../entries/pages/_layout.server.ts.js';

export const index = 0;
export const component = async () => (await import('../entries/pages/_layout.svelte.js')).default;
export const file = '_app/immutable/entry/_layout.svelte.b5a5fb4c.js';
export { server };
export const server_id = "src/routes/+layout.server.ts";
export const imports = ["_app/immutable/entry/_layout.svelte.b5a5fb4c.js","_app/immutable/chunks/index.ce7212fb.js","_app/immutable/chunks/supabaseClient.e8e52d2c.js","_app/immutable/chunks/browser-ponyfill.10e9505f.js","_app/immutable/chunks/navigation.d267f952.js","_app/immutable/chunks/singletons.4e433b4b.js","_app/immutable/chunks/stores.37c6b56c.js"];
export const stylesheets = ["_app/immutable/assets/_layout.f0a34646.css"];
export const fonts = [];
