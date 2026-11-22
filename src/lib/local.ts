// Localização da empresa (usada no mapa do rodapé).
// SUBSTITUIR pelos dados reais:
//  - morada: o texto que aparece no cartão e na janela do mapa;
//  - latitude e longitude: no Google Maps, clique com o botão direito no local e copie as coordenadas
//    (aparecem como "41.5454, -8.4264": o primeiro número é a latitude, o segundo a longitude);
//  - zoom: de 1 (mundo) a 19 (rua); 16 mostra o bairro.
export const local = {
  nome: 'Promaquinas',
  morada: 'Av. do Casal, 94 · 4730-570 Soutelo',
  latitude: 41.613918,
  longitude: -8.433020,
  zoom: 16,
  // Identificação do perfil da loja no Google Maps (faz os botões abrirem o perfil, com nome e morada certos)
  placeId: 'ChIJs6wiBAABJQ0RMgBylt7845w',
};
