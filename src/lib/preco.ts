// Extrai o valor numérico de um preço: aceita número (1234.97) ou texto ("desde 1.234,97€", "350 €").
// Devolve null se não houver número (esses produtos ficam no fim ao ordenar por preço).
export function precoNumero(valor?: number | string | null): number | null {
  if (valor === undefined || valor === null || valor === '') return null;
  if (typeof valor === 'number') return Number.isFinite(valor) ? valor : null;
  const m = valor.match(/\d[\d.,\s]*/);
  if (!m) return null;
  let n = m[0].trim().replace(/\s/g, '');
  if (n.includes(',')) n = n.replace(/\./g, '').replace(',', '.');
  else if (/^\d{1,3}(\.\d{3})+$/.test(n)) n = n.replace(/\./g, '');
  const v = parseFloat(n);
  return Number.isFinite(v) ? v : null;
}

// Formata no estilo do site: 1234.97 -> "1.234,97€"
export function formatarPreco(v: number): string {
  const [inteiro, dec] = v.toFixed(2).split('.');
  return inteiro.replace(/\B(?=(\d{3})+(?!\d))/g, '.') + ',' + dec + '€';
}

export interface DadosPreco {
  preco?: number | string;
  precoCampanha?: number | string;
  precoDesde?: boolean;
}

// Decide o que mostrar. O preço de campanha só é usado enquanto o produto estiver numa campanha ativa;
// quando a campanha termina, volta automaticamente ao preço normal.
export function resolverPreco(d: DadosPreco, emCampanha: boolean) {
  const normal = precoNumero(d.preco);
  const campanha = emCampanha ? precoNumero(d.precoCampanha) : null;
  // Compatibilidade: textos antigos como "desde 1.234,97€" continuam a mostrar "desde".
  const desde = d.precoDesde || (typeof d.preco === 'string' && /^\s*desde\b/i.test(d.preco));
  return {
    normal,
    campanha,
    desde,
    atual: campanha ?? normal, // valor usado para ordenar por preço
  };
}
