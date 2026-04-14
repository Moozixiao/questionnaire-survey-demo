import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/kit/vite';

export default {
  preprocess: vitePreprocess(),
  adapter: adapter()
};