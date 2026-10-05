import { existsSync } from 'node:fs';

export type Midia = {
  tipo: 'imagem' | 'video' | 'youtube';
  src: string;
  poster?: string; // capa do vídeo (ficheiro com o mesmo nome do vídeo, em .jpg/.png/.webp)
  id?: string;     // identificador do vídeo do YouTube
};

// Reconhece, pelo texto, se um item da galeria é uma imagem, um vídeo (.mp4/.webm) ou uma ligação do YouTube.
export function resolverMidia(caminho: string): Midia {
  const yt = caminho.match(/(?:youtube\.com\/watch\?(?:[^#]*&)?v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/shorts\/)([\w-]{11})/);
  if (yt) return { tipo: 'youtube', src: caminho, id: yt[1] };
  if (/\.(mp4|webm|ogg)$/i.test(caminho.split('?')[0])) {
    const base = caminho.replace(/\.[^./]+$/, '');
    const poster = ['.jpg', '.jpeg', '.png', '.webp'].map((e) => base + e).find((p) => existsSync('./public' + p));
    return { tipo: 'video', src: caminho, poster };
  }
  return { tipo: 'imagem', src: caminho };
}
