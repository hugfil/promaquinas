import { defineConfig } from 'astro/config';

// Domínio próprio ligado ao GitHub Pages (ficheiro public/CNAME e registos DNS no Cloudflare).
// Sem 'base': o site fica na raiz do domínio.
export default defineConfig({
  site: 'https://lojapromaquinas.com',
});
