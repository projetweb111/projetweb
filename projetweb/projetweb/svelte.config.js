import vercel from '@sveltejs/adapter-vercel';
import { vitePreprocess } from '@sveltejs/kit/vite';
 
const config = {
  kit: {
    adapter: vercel()
  },
  preprocess: vitePreprocess()
};

export default config