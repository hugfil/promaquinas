// Junta o 'base' do Astro aos caminhos internos (funciona com e sem domínio próprio).
export const u = (p: string) => import.meta.env.BASE_URL.replace(/\/$/, '') + p;
export const data = (d: Date) =>
  d.toLocaleDateString('pt-PT', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });
