import { existsSync } from 'node:fs';

export type Midia = {
  tipo: 'imagem' | 'video' | 'youtube' | 'pdf';
  src: string;
  poster?: string; // capa do vídeo ou do PDF (ficheiro com o mesmo nome, em .jpg/.png/.webp)
  id?: string;     // identificador do vídeo do YouTube
};

// Reconhece, pelo texto, se um item da galeria é uma imagem, um vídeo (.mp4/.webm) ou uma ligação do YouTube.
export function resolverMidia(caminho: string): Midia {
  const yt = caminho.match(/(?:youtube\.com\/watch\?(?:[^#]*&)?v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/shorts\/)([\w-]{11})/);
  if (yt) {
    const base = '/videos/' + yt[1];
    const poster = ['.jpg', '.jpeg', '.png', '.webp'].map((e) => base + e).find((p) => existsSync('./public' + p));
    return { tipo: 'youtube', src: caminho, id: yt[1], poster };
  }
  if (/\.(mp4|webm|ogg)$/i.test(caminho.split('?')[0])) {
    const base = caminho.replace(/\.[^./]+$/, '');
    const poster = ['.jpg', '.jpeg', '.png', '.webp'].map((e) => base + e).find((p) => existsSync('./public' + p));
    return { tipo: 'video', src: caminho, poster };
  }
  if (/\.pdf$/i.test(caminho.split('?')[0])) {
    const base = caminho.replace(/\.[^./]+$/, '');
    const poster = ['.jpg', '.jpeg', '.png', '.webp'].map((e) => base + e).find((p) => existsSync('./public' + p));
    return { tipo: 'pdf', src: caminho, poster };
  }
  return { tipo: 'imagem', src: caminho };
}

// Capa automática de um vídeo do YouTube (quando não há imagem própria em public/videos/<id>.jpg).
// É descarregada pelo Astro ao compilar o site e fica embutida na página: o visitante não faz nenhum
// pedido ao YouTube até carregar no vídeo. Sem ligação à internet ao compilar, fica o cartão verde.
const capas = new Map<string, Promise<string | undefined>>();
export function capaYoutube(id: string): Promise<string | undefined> {
  if (!capas.has(id)) {
    capas.set(id, (async () => {
      try {
        // mqdefault: 320 × 180, no formato 16:9 do vídeo (sem as barras pretas das outras capas)
        const r = await fetch(`https://i.ytimg.com/vi/${id}/mqdefault.jpg`, { signal: AbortSignal.timeout(8000) });
        if (!r.ok) return undefined;
        return 'data:image/jpeg;base64,' + Buffer.from(await r.arrayBuffer()).toString('base64');
      } catch {
        return undefined;
      }
    })());
  }
  return capas.get(id)!;
}
