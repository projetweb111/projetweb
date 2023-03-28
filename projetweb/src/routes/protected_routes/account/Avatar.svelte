<script lang="ts">
    import { createEventDispatcher } from 'svelte'
    import { supabase } from '$lib/supabaseClient'
  
    export let size: number
    export let url: string | null = null
  
    let photo: string | null = null
    let uploading = false
    let files: FileList
  
    const dispatch = createEventDispatcher()
  
    const downloadImage = async (path: string) => {
      try {
        const { data, error } = await supabase.storage.from('public/avatars').download(path)
  
        if (error) {
          throw error
        }
  
        const url = URL.createObjectURL(data)
        photo = url
      } catch (error) {
        if (error instanceof Error) {
          console.log('Error downloading image: ', error.message)
        }
      }
    }
  
    const uploadAvatar = async () => {
      try {
        uploading = true
  
        if (!files || files.length === 0) {
          throw new Error('You must select an image to upload.')
        }
  
        const file = files[0]
        const fileExt = file.name.split('.').pop()
        const filePath = `${file.name.split('.')[0]}.${fileExt}` // `${Math.random()}.${fileExt}`
  
        let { error } = await supabase.storage.from('public/avatars').upload(filePath, file)
  
        if (error) {
          throw error
        }
  
        url = filePath
        dispatch('upload')
      } catch (error) {
        if (error instanceof Error) {
          alert(error.message)
        }
      } finally {
        uploading = false
      }
    }
  
    $: if (url) downloadImage(url)

    let url_test = "https://oqgfyjsoyozvcyfwctse.supabase.co/storage/v1/object/public/avatars/test.jpg?t=2023-03-27T21%3A16%3A33.853Z"
  </script>
  
  <img src={url_test} alt={url_test ? 'Avatar' : 'No image'} class="avatar image"
    style="height: {size}px, width: {size}px" />

  <div style="width: {size}px" aria-live="polite">
    {#if photo} <img src={photo} alt={photo ? 'Avatar' : 'No image'} class="avatar image"
    style="height: {size}px, width: {size}px" /> {:else}
    <div class="avatar no-image" style="height: {size}px, width: {size}px" />
    {/if}
    <div style="width: {size}px">
      <label class="button primary block" for="single">
        {uploading ? 'Uploading ...' : 'Upload avatar'}
      </label>
      <span style="display:none">
        <input
          type="file"
          id="single"
          accept="image/*"
          bind:files
          on:change="{uploadAvatar}"
          disabled="{uploading}"
        />
      </span>
    </div>
  </div>  