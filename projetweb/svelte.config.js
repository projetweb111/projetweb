import adapter from '@sveltejs/adapter-vercel';
import { vitePreprocess } from '@sveltejs/kit/vite';
 
export default {
  kit: {
    adapter: adapter({
		runtime : 'edge'
      // see the 'Deployment configuration' section below
    })
  }
};

