import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { u } from '../lib/url';

// Mapa do site para os motores de busca (gerado em cada build, por isso acompanha os produtos novos).
// A página /obrigado/ fica de fora de propósito.
const fixas = ['/', '/robots/', '/produtos/', '/campanhas/', '/orcamento/', '/privacidade/', '/cookies/', '/termos/', '/aviso-legal/'];

export const GET: APIRoute = async ({ site }) => {
  const robots = await getCollection('robots');
  const produtos = await getCollection('outros');
  const caminhos = [
    ...fixas,
    ...robots.map((r) => `/robots/${r.id}/`),
    ...produtos.map((p) => `/produtos/${p.id}/`),
  ];
  const raiz = site ?? new URL('https://lojapromaquinas.com');
  const urls = caminhos.map((c) => `  <url><loc>${new URL(u(c), raiz).href}</loc></url>`).join('\n');
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
