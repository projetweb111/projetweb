import { createClient } from "@supabase/auth-helpers-sveltekit";
const PUBLIC_SUPABASE_URL = "https://oqgfyjsoyozvcyfwctse.supabase.co";
const PUBLIC_SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9xZ2Z5anNveW96dmN5ZndjdHNlIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzY0MTQ2NjYsImV4cCI6MTk5MTk5MDY2Nn0.23US3c0S7fnqmLGcrakYZmd7Ap9WYzQ23zWsCZWqQSY";
const supabase = createClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY);
export {
  supabase as s
};
