import { defineConfig } from 'astro/config';

// Domínio próprio ligado ao GitHub Pages (ficheiro public/CNAME e registos DNS no Cloudflare).
// Sem 'base': o site fica na raiz do domínio.
export default defineConfig({
  site: 'https://lojapromaquinas.com',
  // Robots que já não se vendem: quem chegar aos endereços antigos (Google, ligações) vai para o modelo equivalente.
  redirects: {
    '/robots/automower-305': '/robots/automower-305e-nera/',
    '/robots/automower-310-mark-ii': '/robots/automower-310e-nera/',
  },
});
