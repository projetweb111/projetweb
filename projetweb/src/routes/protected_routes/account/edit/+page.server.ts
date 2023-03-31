import { supabase } from '$lib/supabaseClient'
import type { PageServerLoad } from './$types';
 
export const load = (async ({ params }) => {
  return {
    asso: await supabase.from('members').select()
  };
}) satisfies PageServerLoad;