// Dados da empresa usados no rodapé (e onde mais forem precisos).
// SUBSTITUIR / CONFIRMAR os dados reais antes de publicar.

export const contactos = {
  email: 'lojapromaquinas@gmail.com',
  telefone: '253 312 094',
  // Formato internacional, sem espaços, usado na ligação "tel:"
  telefoneLigacao: '+351253312094',
  // Obrigatório por lei junto a números de telefone (DL n.º 59/2021).
  // Para telemóveis use "Chamada para a rede móvel nacional".
  telefoneNota: 'Chamada para a rede fixa nacional',
};

// Horário de funcionamento.
// diasSemana: 0 = domingo, 1 = segunda, ..., 6 = sábado
// periodos: pares [abertura, fecho] no formato HH:MM; lista vazia = encerrado
// feriados: true na linha que também se aplica aos feriados (ver feriadosExtra abaixo)
export const horario: { dias: string; diasSemana: number[]; periodos: [string, string][]; feriados?: boolean }[] = [
  { dias: 'Segunda a sexta-feira', diasSemana: [1, 2, 3, 4, 5], periodos: [['08:30', '12:30'], ['14:00', '19:00']] },
  { dias: 'Sábado', diasSemana: [6], periodos: [['08:30', '12:30']] },
  { dias: 'Domingo / Feriado', diasSemana: [0], periodos: [], feriados: true },
];

// Feriados: a loja está encerrada em todos os feriados nacionais (calculados automaticamente,
// incluindo Sexta-feira Santa, Páscoa e Corpo de Deus).
// Acrescente aqui outros dias de encerramento, no formato 'MM-DD' (todos os anos) ou 'AAAA-MM-DD' (só nesse ano),
// ex.: feriado municipal, Carnaval, 24 de dezembro.
export const feriadosExtra: string[] = [
  '06-13', // Santo António (feriado municipal)
  // '06-24',
  // '2026-12-24',
];

// Redes sociais: preencha o endereço quando a página existir.
// Enquanto o endereço estiver vazio, o ícone aparece esbatido, com a indicação "Brevemente".
export const redes: { nome: 'Instagram' | 'YouTube'; url: string }[] = [
  { nome: 'Instagram', url: '' }, // ex.: 'https://www.instagram.com/promaquinas'
  { nome: 'YouTube', url: '' },   // ex.: 'https://www.youtube.com/@promaquinas'
];

// Ligações legais da última linha do rodapé
export const legais = [
  { href: '/cookies/', texto: 'Política de cookies' },
  { href: '/privacidade/', texto: 'Política de privacidade' },
  { href: '/aviso-legal/', texto: 'Aviso legal' },
  { href: '/termos/', texto: 'Termos e condições' },
];
