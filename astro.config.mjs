import { defineConfig } from 'astro/config';

// ENQUANTO USAS github.io: preenche utilizador e nome do repositório.
// QUANDO LIGARES O DOMÍNIO: muda 'site' para https://teudominio.pt e apaga a linha 'base'.
export default defineConfig({
  site: 'https://hugfil.github.io',
  base: '/promaquinas',
});
