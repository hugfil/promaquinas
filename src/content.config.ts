import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

const robots = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/robots' }),
  schema: z.object({
    nome: z.string(),
    marca: z.string().default('Husqvarna'), // robots: só Husqvarna
    gama: z.string(),
    resumo: z.string(),
    areaMaxima: z.number(),      // m²
    decliveMaximo: z.number(),   // %
    ligacao: z.array(z.string()).default([]),
    preco: z.string().optional(), // opcional, ex.: "desde 1.800 €". Sem este campo, o preço não aparece.
    imagem: z.string().optional(), // ex.: /imagens/automower-305.jpg (ficheiro em /public)
    galeria: z.array(z.string()).default([]), // imagens extra, mostradas na ficha
    destaque: z.boolean().default(false),
    ordem: z.number().default(100),
  }),
});

const outros = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/outros' }),
  schema: z.object({
    nome: z.string(),
    marca: z.string(),           // ex.: Husqvarna
    tipo: z.string().optional(), // ex.: Motosserra, Corta-sebes
    resumo: z.string(),
    preco: z.string().optional(), // opcional, ex.: "desde 350 €"
    imagem: z.string().optional(),
    galeria: z.array(z.string()).default([]),
    destaque: z.boolean().default(false),
  }),
});

const campanhas = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/campanhas' }),
  schema: z.object({
    titulo: z.string(),
    resumo: z.string(),
    dataInicio: z.coerce.date(),
    dataFim: z.coerce.date(),
    imagem: z.string().optional(),
    produtos: z.array(z.string()).default([]), // ex.: ["robots/automower-exemplo", "produtos/exemplo"]
    link: z.string().optional(), // destino à medida (opcional), ex.: /robots/automower-exemplo/
  }),
});

const testemunhos = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/testemunhos' }),
  schema: z.object({
    texto: z.string(),
    autor: z.string(),
    localidade: z.string().optional(),
    estrelas: z.number().int().min(1).max(5).optional(), // avaliação dada pelo cliente (1 a 5); sem o campo, não mostra estrelas
    exemplo: z.boolean().default(false), // true = texto provisório, a substituir por um real
  }),
});

export const collections = { robots, outros, campanhas, testemunhos };
