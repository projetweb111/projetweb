
<script lang="ts">
    import { onMount } from 'svelte'
    import type { AuthSession } from '@supabase/supabase-js'
    import { supabase } from '$lib/supabaseClient'
    
export let session: AuthSession
  
let com = '';
let loading = false
let association: string | null = null
let title: string | null = null
let content: string | null = null
let count_likes: number | null = null
const getPost= async () => {
  try {
    loading = true
    const { user } = session

    const { data, error, status } = await supabase
      .from('post')
      .select(`username, website, avatar_url, com, association, title, content, count_likes`)
      .eq('id', user.id)
      .single()

    if (data) {
    }

    if (error && status !== 406) throw error
  } catch (error) {
    if (error instanceof Error) {
      alert(error.message)
    }
  } finally {
    loading = false
  }
};

onMount(() => {
  getPost()
})

</script>
<title>Actualité</title>
<h1>Actualité</h1>
<div>
    <input class="inputField" type="com" placeholder="search for post" bind:value="{com}" />
    <button class="button block" on:click="{getPost}" >search</button>
  </div>
<p>Voici les dernières actualités</p>