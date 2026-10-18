# Site Husqvarna (Astro)

## Requisitos
Node.js 22.12 ou superior (verificar com `node -v`). Astro 7.

## Tipos de letra
Montserrat, Inter e Manrope vêm dos pacotes @fontsource-variable (instalados com `npm install`) e são servidos pelo próprio site, sem ligação ao Google.

## Correr localmente
    npm install
    npm run dev

## Publicar no GitHub Pages
1. Edita `astro.config.mjs` (utilizador e nome do repositório).
2. No GitHub: Settings > Pages > Source: **GitHub Actions**.
3. Faz push para `main`. O deploy é automático e repete-se todos os dias (campanhas).

## Dia a dia
- Novo robot: copiar `src/content/robots/automower-exemplo.md` e editar.
- Outro produto: `src/content/outros/`.
- Campanha: ficheiro em `src/content/campanhas/` com `dataInicio` e `dataFim`.
  Para remover antes do fim, apaga o ficheiro (ou muda `dataFim`).
- Imagens: colocar em `public/imagens/` e referir como `/imagens/nome.jpg`.
- Preço (opcional): campo `preco` na ficha do robot ou produto, ex.: `preco: "desde 1.800 €"`. Sem o campo, não aparece nada.
- Marca: campo `marca` nos outros produtos (o filtro por marca aparece quando há mais de uma). Os robots são Husqvarna por defeito.
- Testemunhos: um ficheiro por testemunho em `src/content/testemunhos/`. O de exemplo tem `exemplo: true`
  e é provisório: **substituir por testemunhos reais antes de publicar** (o build avisa enquanto existirem provisórios).
- Estrelas no testemunho (opcional): `estrelas: 5` (valor de 1 a 5, dado pelo próprio cliente). Sem o campo, não aparecem.
- Nome da empresa ao lado do logo: guardar o SVG em `public/imagens/logo-nome.svg` (ou `logo-nome-cabecalho.svg` e `logo-nome-rodape.svg`, se precisarem de cores diferentes). Aparece sozinho à direita do ícone, no cabeçalho e no rodapé. O ícone está em `logo-icone-cabecalho.svg` (verde) e `logo-icone-rodape.svg` (cinzento); `logo-icone.svg` (original) é o ícone do separador do browser.
- Logos (antigo): `public/imagens/logo1.jpg` (cabeçalho e rodapé) e `logo2.jpg` (ícone do separador). Para trocar, substituir os ficheiros.
- Vídeos na galeria: na lista `galeria` junta ficheiros de vídeo (`"/videos/demo.mp4"`, em `public/videos/`) ou ligações do YouTube (`"https://www.youtube.com/watch?v=..."`). Para uma capa no vídeo, põe uma imagem com o mesmo nome (`/videos/demo.jpg`). Ficheiros acima de ~15 MB: usar o YouTube.
- Página inicial: os carrosséis mostram primeiro os produtos com `destaque: true` e depois os restantes, até `MAXIMO_CARROSSEL` (8) em `src/pages/index.astro`. A ordem define-se com `ordem` (menor primeiro) nos robots e nos outros produtos.
- Folheto numa campanha: no ficheiro da campanha, `folheto: "/imagens/folheto.jpg"` (ou uma lista, para frente e verso: `folheto: ["/imagens/frente.jpg", "/imagens/verso.jpg"]`) e, opcionalmente, `folhetoPdf: "/folhetos/campanha.pdf"` (PDF em `public/folhetos/`). Na página de campanhas aparece com o botão "Ampliar"; no ecrã completo clica-se na imagem para ver ao tamanho real.
- Vídeo numa campanha: `video: "https://www.youtube.com/watch?v=XXXXXXXXXXX"` ou `video: "/videos/campanha.mp4"` (ficheiro em `public/videos/`); também aceita uma lista. Capa opcional: imagem com o mesmo nome do vídeo (`/videos/campanha.jpg`) ou, no YouTube, `public/videos/XXXXXXXXXXX.jpg` (o código do vídeo).
- Produtos de uma campanha: no ficheiro da campanha, `produtos: ["robots/nome-do-ficheiro", "produtos/nome-do-ficheiro"]` (o nome é o do ficheiro .md, sem .md). Mostra os cartões na página de campanhas e a etiqueta "Campanha" nesses produtos enquanto a campanha estiver ativa.
- Imagens de produto: `imagem: "/imagens/ficheiro.jpg"` (principal) e `galeria: ["/imagens/a.jpg", "/imagens/b.jpg"]` (extra, abre ampliada ao clicar). Campanhas também aceitam `imagem`.
- Formulário: trocar `SEU_ID` em `src/pages/orcamento.astro` pelo ID do Formspree.
- Email de contacto: procurar `geral@exemplo.pt`.

## Domínio próprio
Settings > Pages > Custom domain, criar o registo DNS indicado pelo GitHub,
e depois mudar `site` e apagar `base` em `astro.config.mjs`.
