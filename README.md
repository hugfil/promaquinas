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
- Logos: `public/imagens/logo1.jpg` (cabeçalho e rodapé) e `logo2.jpg` (ícone do separador). Para trocar, substituir os ficheiros.
- Formulário: trocar `SEU_ID` em `src/pages/orcamento.astro` pelo ID do Formspree.
- Email de contacto: procurar `geral@exemplo.pt`.

## Domínio próprio
Settings > Pages > Custom domain, criar o registo DNS indicado pelo GitHub,
e depois mudar `site` e apagar `base` em `astro.config.mjs`.
