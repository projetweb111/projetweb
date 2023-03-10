import '$lib/supabaseClient'
import redirects from './lib/redirects';
import type { Handle } from '@sveltejs/kit';

export const handle = (async ({ event, resolve }) => {
    const redirect = redirects.find((item) => event.url.pathname.startsWith(`${event.url.origin}${item.source}`));

    if (redirect) {
      return new Response(`${event.url.origin}${redirect.destination}`);
    }
   
    const response = await resolve(event);
    return response;
  }) satisfies Handle;