import { getCollection } from 'astro:content';

export async function testemunhos() {
  const todos = await getCollection('testemunhos');
  if (todos.some((t) => t.data.exemplo)) {
    console.warn('\n[AVISO] Há testemunhos provisórios (exemplo: true). Substitua-os por testemunhos reais antes de publicar.\n');
  }
  return todos;
}
