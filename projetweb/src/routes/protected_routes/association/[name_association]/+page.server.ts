import { supabase } from '$lib/supabaseClient'


export async function load({ params }) {
  const { data: association, error } = await supabase
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


