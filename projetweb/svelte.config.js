import vercel from '@sveltejs/adapter-vercel';
import { vitePreprocess } from '@sveltejs/kit/vite';
import sveltePreprocess from 'svelte-preprocess';

 
const config = {
  kit: {
    adapter: vercel()
  },
  preprocess: vitePreprocess()
};

export default config



