// Extrai o valor numérico de um texto de preço como "desde 1.234,97€" ou "350 €".
// Devolve null se não houver número (esses produtos ficam no fim ao ordenar por preço).
export function precoNumero(texto?: string): number | null {
  if (!texto) return null;
  const m = texto.match(/\d[\d.,\s]*/);
  if (!m) return null;
  let n = m[0].trim().replace(/\s/g, '');
  if (n.includes(',')) n = n.replace(/\./g, '').replace(',', '.');
  else if (/^\d{1,3}(\.\d{3})+$/.test(n)) n = n.replace(/\./g, '');
  const v = parseFloat(n);
  return Number.isFinite(v) ? v : null;
}
