import { getServerSession } from "@supabase/auth-helpers-sveltekit";
const load = async (event) => {
  return { session: await getServerSession(event) };
};
export {
  load
};
