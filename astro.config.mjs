// @ts-check
import { defineConfig } from 'astro/config';

// If you name the repo `<username>.github.io`, `site` is all you need and there is
// no `base` to configure. If you ever move this to a project repo instead, add
// `base: '/repo-name'` here and every internal link will pick it up.
export default defineConfig({
  site: 'https://carminvuong.github.io',
  build: {
    // Emit `/projects/wimbledon/index.html` so links work without a trailing-slash
    // redirect on GitHub Pages.
    format: 'directory',
  },
});
