import { supabase } from '$lib/supabaseClient'



// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export async function load({ params }) {
  const { data:association, error } = await supabase
    .from('association')
    .select()
    .eq('name_association', params.name_association)
    .single()

  if (error) {
    console.log(error)
  }

  return { 
      association
  }
}


