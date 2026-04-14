import adapter from '@sveltejs/adapter-static';
const base = process.env.VITE_BASE_URL;

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    adapter: adapter({
      // 可选：指定构建输出目录（默认为 'build'）
      pages: 'build',
      assets: 'build',
      fallback: null, // 对于单页应用，可设置为 'index.html'
      precompress: false
    }),
    paths: {
      base
    },
    prerender: {
      handleHttpError: 'warn'
    }
  }
};

export default config;