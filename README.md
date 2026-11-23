# Site Promaquinas (Astro)

Site da Promaquinas, revendedor oficial Husqvarna®, em Astro 7 (site estático, sem venda online): robots corta-relva Automower®, outros produtos, campanhas, pedido de orçamento e dados da loja. Endereço: https://lojapromaquinas.com

## Requisitos
Node.js 22.12 ou superior (verificar com `node -v`). Astro 7.

## Tipos de letra
Montserrat, Inter e Manrope vêm dos pacotes @fontsource-variable (instalados com `npm install`) e são servidos pelo próprio site, sem ligação ao Google.

## Correr localmente
    npm install
    npm run dev

Antes de publicar, corre sempre `npm run build` (tem de terminar sem erros).

## Publicação e domínio
- O site está no GitHub Pages (repositório `hugfil/promaquinas`, Settings > Pages > Source: **GitHub Actions**), com o domínio próprio `lojapromaquinas.com` (ficheiro `public/CNAME`).
- O domínio foi comprado no Cloudflare, que serve **só de DNS**: todos os registos estão em "DNS only" (sem proxy). Por isso não há redirecionamentos do lado do Cloudflare nem estatísticas dele; os redirecionamentos fazem-se no Astro (ver mais abaixo).
- `astro.config.mjs` tem `site: 'https://lojapromaquinas.com'` e não tem `base` (o site fica na raiz do domínio).
- O deploy está em `.github/workflows/deploy.yml` e corre em três situações: push para `main`, manualmente (`workflow_dispatch`) e **todos os dias às 00:05 UTC** (`cron`). O rebuild diário é o que faz as campanhas começarem e terminarem sozinhas, porque as datas só são avaliadas quando o site é compilado.
- Um push para uma branch que não seja a `main` não faz deploy.

## Rotina de trabalho (alterações ao site)
1. `git checkout main; git pull; git fetch --prune`
2. `git checkout -b nome-da-branch` (uma alteração de cada vez)
3. Fazer as alterações e testar com `npm run dev`; depois `npm run build`
4. `git status --short`, e adicionar só os ficheiros alterados, por nome (nunca `git add .`): `git add caminho\do\ficheiro`
5. `git commit -m "mensagem"` e `git push -u origin nome-da-branch`
6. No GitHub: abrir o PR, fazer o merge e esperar que o deploy nas Actions fique com ✓
7. Limpar: `git checkout main; git pull; git fetch --prune; git branch -d nome-da-branch` (só usar `-D` se tiveres a certeza de que não precisas da branch)

No GitHub, em Settings > General > Pull Requests, pode ativar-se "Automatically delete head branches" (apaga as branches remotas depois do merge). `git config --global fetch.prune true` faz o prune automático no computador.

## Dia a dia
- Novo robot: copiar uma ficha existente em `src/content/robots/` e editar. Campos principais: `nome`, `gama` (ex.: "Jardins pequenos", "Jardins médios", "Jardins grandes", "Grandes superfícies"), `resumo`, `areaMaxima` (m²), `decliveMaximo` (%), `ligacao` (lista), `preco`, `precoCampanha`, `imagem`, `galeria`, `destaque` e `ordem`. A marca é Husqvarna por defeito.
- Remover um robot: apagar a ficha, as suas imagens e vídeos (se mais nenhuma ficha os usar) e referências em campanhas (`produtos`). Se o endereço antigo estava indexado, acrescentar um redirecionamento em `astro.config.mjs`:
      redirects: {
        '/robots/nome-antigo': '/robots/nome-novo/',
      },
  O Astro gera uma página de redirecionamento (meta refresh, com canonical e `noindex`), porque o GitHub Pages não faz redirecionamentos 301 verdadeiros.
- Outro produto: `src/content/outros/`. Campos extra: `tipo` (ex.: Motosserra), `destaques` (números principais, ex.: "38,2 cm³ | Cilindrada") e `caracteristicas` (linhas com visto; uma linha pode abrir uma imagem da galeria).
- Marca: campo `marca` (o filtro por marca aparece quando há mais de uma). **Escrever a marca sempre igual** ("Husqvarna", sem ®): os filtros agrupam pelo texto exato.
- Ordem: `destaque: true` e `ordem` (menor primeiro). A ordem "Recomendados" nas páginas de robots, de outros produtos e de campanhas põe primeiro os destaques e depois a `ordem`; nas campanhas, os robots vêm antes dos outros produtos. Os carrosséis da página inicial seguem a mesma regra, até `MAXIMO_CARROSSEL` (8) em `src/pages/index.astro`.
- Campanha: ficheiro em `src/content/campanhas/` com `dataInicio` e `dataFim` (ver "Campanhas" mais abaixo).
- Imagens: colocar em `public/imagens/` e referir como `/imagens/nome.jpg`.
- Preço (opcional): na ficha do robot ou produto. Sem o campo `preco`, não aparece nada.
  - Só o preço: `preco: 1499` → **1.499,00€**
  - Com "desde": `preco: 1499` + `precoDesde: true` → **desde 1.499,00€**
  - Em campanha: `precoCampanha: 1299` → **1.299,00€** a vermelho e, por baixo, "antes ~~1.499,00€~~". O preço de campanha só aparece enquanto o produto estiver numa campanha ativa (lista `produtos` da campanha); quando a campanha termina, volta sozinho ao preço normal.
- Testemunhos: um ficheiro por testemunho em `src/content/testemunhos/`, com `texto`, `autor`, `localidade` e, opcionalmente, `estrelas: 5` (de 1 a 5, dado pelo próprio cliente). Os atuais são reais. Um testemunho com `exemplo: true` é provisório e o build avisa enquanto existir algum.
- Contactos, horário e redes: `src/lib/empresa.ts` (email, telefone e nota legal do telefone, horário, `feriadosExtra`, Instagram, YouTube e ligações legais do rodapé). O rodapé mostra "Aberto agora" ou "Fechado" (hora de Lisboa, feriados nacionais calculados automaticamente) e o mesmo indicador aparece no cartão do mapa.
- Nome da empresa ao lado do logo: guardar o SVG em `public/imagens/logo-nome.svg` (ou `logo-nome-cabecalho.svg` e `logo-nome-rodape.svg`, se precisarem de cores diferentes). Aparece sozinho à direita do ícone, no cabeçalho e no rodapé. O ícone está em `logo-icone-cabecalho.svg` (verde) e `logo-icone-rodape.svg` (cinzento); `logo-icone.svg` (original) é o ícone do separador do browser.
- Mapa no rodapé: editar a morada e as coordenadas em `src/lib/local.ts`. O cartão não carrega nada de terceiros até o visitante clicar; "Ampliar" abre o OpenStreetMap numa janela, e o ícone de seta abre o Google Maps num novo separador.
- Logos (antigo): `public/imagens/logo1.jpg` (cabeçalho e rodapé) e `logo2.jpg` (ícone do separador). Para trocar, substituir os ficheiros.
- Vídeos na galeria: na lista `galeria` junta ficheiros de vídeo (`"/videos/demo.mp4"`, em `public/videos/`) ou ligações do YouTube (`"https://www.youtube.com/watch?v=..."`). Para uma capa no vídeo, põe uma imagem com o mesmo nome (`/videos/demo.jpg`). Nos vídeos do YouTube, a capa do próprio vídeo é descarregada automaticamente quando o site é compilado (`npm run dev` ou GitHub Actions) e fica embutida na página: o visitante não faz nenhum pedido ao YouTube até carregar no vídeo. Para usar outra imagem, guarda-a em `public/videos/<código-do-vídeo>.jpg` (os 11 caracteres depois de `v=`), que tem prioridade; sem internet ao compilar, aparece o cartão verde. Ficheiros acima de ~15 MB: usar o YouTube.
- Página inicial: os carrosséis mostram primeiro os produtos com `destaque: true` e depois os restantes, até `MAXIMO_CARROSSEL` (8) em `src/pages/index.astro`. A ordem define-se com `ordem` (menor primeiro) nos robots e nos outros produtos.
- Folheto numa campanha: no ficheiro da campanha, `folheto: "/imagens/folheto.jpg"` (ou uma lista, para frente e verso: `folheto: ["/imagens/frente.jpg", "/imagens/verso.jpg"]`) e, opcionalmente, `folhetoPdf: "/folhetos/campanha.pdf"` (PDF em `public/folhetos/`). Na página de campanhas aparece com o botão "Ampliar"; no ecrã completo clica-se na imagem para ver ao tamanho real.
- PDF no folheto: `folheto: "/folhetos/campanha.pdf"` (ou `folhetoPdf: ...` sozinho). O PDF abre no mesmo visualizador das imagens: cada página é um slide (setas, teclado, deslizar com o dedo, zoom) e o botão de seta para baixo abre o PDF num novo separador. Para a miniatura mostrar a primeira página desde o início, guarda uma imagem com o mesmo nome na mesma pasta (`/folhetos/campanha.jpg`); sem ela, aparece um cartão com o ícone de PDF, que passa à primeira página depois de aberto. Podes misturar imagens e PDF na lista. O leitor é o PDF.js (Mozilla, Apache-2.0), em `src/vendor/pdfjs/` (código) e `public/vendor/pdfjs/` (descodificadores de imagem JPEG 2000/JBIG2, perfis de cor e tipos de letra padrão), e só é carregado quando alguém abre um PDF; se falhar, abre o leitor do navegador.
- Vídeo numa campanha: `video: "https://www.youtube.com/watch?v=XXXXXXXXXXX"` ou `video: "/videos/campanha.mp4"` (ficheiro em `public/videos/`); também aceita uma lista. Capa: imagem com o mesmo nome do vídeo (`/videos/campanha.jpg`); no YouTube, é automática (a do próprio vídeo), ou `public/videos/XXXXXXXXXXX.jpg` (o código do vídeo) para usar outra.
- Produtos de uma campanha: no ficheiro da campanha, `produtos: ["robots/nome-do-ficheiro", "produtos/nome-do-ficheiro"]` (o nome é o do ficheiro .md, sem .md). Mostra os cartões na página de campanhas e a etiqueta "Campanha" nesses produtos enquanto a campanha estiver ativa.
- Imagens de produto: `imagem: "/imagens/ficheiro.jpg"` (principal) e `galeria: ["/imagens/a.jpg", "/imagens/b.jpg"]` (extra, abre ampliada ao clicar). Campanhas também aceitam `imagem`.
- Legendas na galeria (opcional): em qualquer item de `galeria` (robots e produtos), `folheto` ou `video` (campanhas):
  - forma curta: `"/imagens/a.jpg | Vista lateral"` (caminho, espaço, `|`, espaço e o texto);
  - forma longa, mais prática para textos grandes: `- src: "/imagens/a.jpg"` e, na linha seguinte, `  legenda: "Pormenor da lâmina de 45 cm"`;
  - aparece por baixo da miniatura e na galeria em ecrã completo (num PDF, em todas as páginas); esconde-se quando o zoom está ligado;
  - serve também de texto alternativo da imagem (acessibilidade e motores de busca); itens sem legenda ficam como antes;
  - só a galeria entende legendas: não ponhas legenda numa imagem que uses noutro sítio (por exemplo, como `imagem` principal).

## Campanhas
- Começam e terminam pelas datas `dataInicio` e `dataFim` (o último dia conta até ao fim do dia, em UTC). Como o site é estático, a mudança acontece no primeiro rebuild depois da data: o rebuild diário das 00:05 UTC trata disso.
- Enquanto há campanha ativa: banner amarelo no topo (com a contagem dos dias), bloco "Campanhas ativas" na página inicial, etiqueta "Campanha" e preços de campanha nos produtos da lista `produtos`, e a página `/campanhas/` com folheto, vídeo e os produtos.
- A página `/campanhas/` tem filtros por tipo e marca e ordenação por preço (como nas páginas de robots e de outros produtos), e mostra o total de produtos da campanha.
- Quando termina: o banner e o bloco da página inicial desaparecem, os preços voltam ao normal e a página `/campanhas/` mostra uma mensagem a explicar que não há campanhas ativas, com a próxima campanha (se existir) ou a última, e botões para orçamento, robots e outros produtos. O item "Campanhas" do menu mantém-se.
- Depois de terminar, rever textos escritos à mão que mencionem a campanha (por exemplo notas nas fichas) e decidir se se arquiva o ficheiro.
- Cuidado: não repetir o mesmo produto na lista `produtos` de uma campanha (contaria duas vezes).

## Páginas especiais
- `src/pages/404.astro`: página de erro personalizada (robô a carregar na estação), com ligações para robots, outros produtos, campanhas e início. Está marcada `noindex`. O GitHub Pages usa-a para qualquer endereço inexistente.
- A página de outros produtos (`/produtos/`) tem o título "Equipamentos" antes dos filtros, como a de robots tem "Modelos".
- Páginas legais (cookies, privacidade, aviso legal, termos): ligadas a partir do rodapé (lista `legais` em `src/lib/empresa.ts`).

## Formulário de orçamento
O pedido de orçamento (`src/pages/orcamento.astro`) é enviado através do QList (https://qlist.io, FRISEMA d.o.o., Eslovénia, dados guardados na UE). Os pedidos chegam ao email configurado no painel do QList e ficam no histórico do formulário. Há um campo escondido contra spam e uma página de agradecimento. Os endereços e o email de destino configuram-se no QList e no início de `orcamento.astro`.

## SEO e estatísticas
- Cada página tem título, descrição, endereço canónico e imagem de partilha (`public/imagens/partilha.jpg`, ou a imagem do produto nas fichas). `Base.astro` aceita `noindex` para páginas que não devem aparecer no Google.
- Dados estruturados da empresa em `src/components/DadosEmpresa.astro`. Não se usam dados estruturados de produto, porque não há venda online.
- Sitemap e `robots.txt` publicados; o site está no Google Search Console e a empresa no Google Business Profile.
- Cloudflare Web Analytics ainda não está instalado (ideia na agenda de pendentes).

## Repositório público: cuidados
- Tudo o que está no repositório é público, incluindo o histórico do Git: nunca guardar palavras-passe, tokens, ficheiros `.env`, dados de clientes ou notas internas. O que se apaga continua no histórico.
- Uma campanha futura (textos e preços) fica visível no repositório assim que se faz o commit, mesmo que o site só a mostre na data de início. Fazer o commit só quando for para estar visível.
- Em repositórios públicos, o GitHub **desativa os workflows agendados após 60 dias sem atividade**. Se isso acontecer, o rebuild diário pára e as campanhas deixam de começar e terminar sozinhas. Verificar todos os meses no separador Actions (há um lembrete automático); reativar o workflow, ou fazer um commit pequeno na `main`, resolve.
- Ativar em Settings > Code security a análise de segredos e os alertas de dependências, e manter a autenticação em dois passos na conta do GitHub.
- As imagens e vídeos da Husqvarna que estão no repositório são descarregáveis por qualquer pessoa; usar só os que a Husqvarna autoriza.

## Direitos de autor e licenças
© 2026 Promaquinas. Todos os direitos reservados.

O código, os textos, o logótipo, as fotografias e o desenho deste site são da Promaquinas e não podem ser copiados, modificados nem reutilizados sem autorização por escrito. O repositório é público apenas para alojamento e consulta, e não concede nenhuma licença de utilização.

Husqvarna®, Automower® e as outras marcas, imagens, vídeos e textos de produto pertencem aos respetivos titulares e são usados pela Promaquinas na qualidade de revendedor autorizado. Esta nota não dá a terceiros nenhum direito sobre esse material.

Os componentes de terceiros mantêm as suas licenças: PDF.js (Mozilla, Apache-2.0, em `src/vendor/pdfjs/` e `public/vendor/pdfjs/`) e os tipos de letra Montserrat, Inter e Manrope (pacotes @fontsource-variable, SIL Open Font License 1.1).

## Pendentes
A lista de tarefas e ideias está na agenda de pendentes (documento no Claude: "Promaquinas – Agenda de pendentes").
