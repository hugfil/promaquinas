import { getCollection } from 'astro:content';

// Campanhas cuja data de hoje está entre dataInicio e dataFim (inclusive).
export async function campanhasAtivas() {
  const hoje = new Date();
  const todas = await getCollection('campanhas');
  return todas
    .filter((c) => {
      const fim = new Date(c.data.dataFim);
      fim.setUTCHours(23, 59, 59, 999);
      return c.data.dataInicio <= hoje && hoje <= fim;
    })
    .sort((a, b) => a.data.dataFim.getTime() - b.data.dataFim.getTime());
}

// Chaves ("robots/slug" ou "produtos/slug") dos produtos incluídos em campanhas ativas.
export async function produtosEmCampanha() {
  const ativas = await campanhasAtivas();
  const chaves = new Set<string>();
  ativas.forEach((c) => c.data.produtos.forEach((p) => chaves.add(limpar(p))));
  return chaves;
}

const limpar = (p: string) => p.replace(/^\/+|\/+$/g, '');

// Transforma a lista "produtos" de uma campanha em dados prontos para mostrar em cartões.
export async function resolverProdutos(chaves: string[], campanha: string) {
  const [robots, outros] = await Promise.all([getCollection('robots'), getCollection('outros')]);
  const resultado = [];
  for (const bruto of chaves) {
    const [tipo, slug] = limpar(bruto).split('/');
    const entrada =
      tipo === 'robots' ? robots.find((r) => r.id === slug)
      : tipo === 'produtos' ? outros.find((o) => o.id === slug)
      : undefined;
    if (!entrada) {
      console.warn('\n[AVISO] Campanha "' + campanha + '": produto "' + bruto + '" não encontrado (use robots/nome ou produtos/nome).\n');
      continue;
    }
    resultado.push({
      href: '/' + tipo + '/' + entrada.id + '/',
      nome: entrada.data.nome,
      marca: entrada.data.marca,
      resumo: entrada.data.resumo,
      imagem: entrada.data.imagem,
      preco: entrada.data.preco,
    });
  }
  return resultado;
}
