import * as server from '../entries/pages/_layout.server.ts.js';

export const index = 0;
export const component = async () => (await import('../entries/pages/_layout.svelte.js')).default;
export const file = '_app/immutable/entry/_layout.svelte.5ef267e7.js';
export { server };
export const server_id = "src/routes/+layout.server.ts";
export const imports = ["_app/immutable/entry/_layout.svelte.5ef267e7.js","_app/immutable/chunks/index.0e58c74b.js","_app/immutable/chunks/supabaseClient.e8e52d2c.js","_app/immutable/chunks/browser-ponyfill.10e9505f.js","_app/immutable/chunks/navigation.2cfe3a99.js","_app/immutable/chunks/singletons.db562788.js","_app/immutable/chunks/stores.2f18ef1e.js"];
export const stylesheets = ["_app/immutable/assets/_layout.aca07f53.css"];
export const fonts = [];
