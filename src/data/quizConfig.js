/**
 * Configuração do Quiz de Assinatura Olfativa — D&A Decants
 *
 * COMO FUNCIONA:
 * Cada pergunta é uma AFIRMAÇÃO DE VIBE. O usuário responde o quanto se identifica
 * numa escala de "Com certeza" (sim total) a "Nunca" (não, o oposto).
 *
 * Escala:
 *   1 = "Com certeza"        → forte identificação → pontos cheios na vibe da pergunta
 *   2 = "Provavelmente"      → identificação parcial → pontos parciais
 *   3 = "Talvez"             → neutro / equilíbrio entre os dois lados
 *   4 = "Provável que não"   → tende ao oposto → pontos parciais no oposto
 *   5 = "Nunca"              → rejeita totalmente → pontos cheios no oposto
 *
 * Para adicionar, remover ou reordenar: basta editar o array abaixo.
 * O motor do quiz se adapta automaticamente à quantidade de perguntas.
 */

export const escalaRespostas = [
  { valor: 1, label: "Com certeza" },
  { valor: 2, label: "Provavelmente" },
  { valor: 3, label: "Talvez" },
  { valor: 4, label: "Provável que não" },
  { valor: 5, label: "Nunca" },
];

export const perguntasMasculinas = [
  {
    id: "m_q01",
    texto: "Quero um perfume que projete presença e seja notado rapidamente.",
    subtexto: "Perfeito para chegar e marcar presença nos primeiros minutos.",
    imagem: "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?w=800&q=80",
    pesos: {
      1: { intenso: 4, noturno: 3, sensual: 2 },
      2: { intenso: 3, noturno: 2, sensual: 1 },
      3: { elegante: 1, amadeirado: 1 },
      4: { fresco: 2, citrico: 2, elegante: 1 },
      5: { fresco: 3, citrico: 3, elegante: 1 },
    },
  },
  {
    id: "m_q02",
    texto: "Prefiro fragrancias frescas/citricas para uso diario e clima quente.",
    subtexto: "Aquela sensacao limpa e energizante para o dia todo.",
    imagem: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80",
    pesos: {
      1: { fresco: 4, citrico: 3, elegante: 1 },
      2: { fresco: 3, citrico: 2, elegante: 1 },
      3: { fresco: 1, amadeirado: 1 },
      4: { amadeirado: 2, oriental: 2, sensual: 1 },
      5: { amadeirado: 3, oriental: 3, doce: 1 },
    },
  },
  {
    id: "m_q03",
    texto: "Gosto de perfumes amadeirados e sofisticados para eventos formais.",
    subtexto: "Perfume de postura, para reunioes e ocasioes elegantes.",
    imagem: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80",
    pesos: {
      1: { elegante: 4, amadeirado: 3, sensual: 1 },
      2: { elegante: 3, amadeirado: 2 },
      3: { elegante: 1, fresco: 1 },
      4: { doce: 2, noturno: 2, sensual: 1 },
      5: { doce: 3, noturno: 3, oriental: 1 },
    },
  },
  {
    id: "m_q04",
    texto: "Busco um perfume mais sensual para noite e encontros.",
    subtexto: "Algo que fique na memoria e combine com momentos a dois.",
    imagem: "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?w=800&q=80",
    pesos: {
      1: { sensual: 4, noturno: 3, doce: 2 },
      2: { sensual: 3, noturno: 2, doce: 1 },
      3: { sensual: 1, elegante: 1 },
      4: { fresco: 2, citrico: 2, elegante: 1 },
      5: { fresco: 3, citrico: 3, amadeirado: 1 },
    },
  },
  {
    id: "m_q05",
    texto: "Curto perfumes adocicados e especiados mais do que secos.",
    subtexto: "Notas de baunilha, tonka, canela e ambra me agradam.",
    imagem: "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=800&q=80",
    pesos: {
      1: { doce: 4, oriental: 3, sensual: 1 },
      2: { doce: 3, oriental: 2, sensual: 1 },
      3: { doce: 1, amadeirado: 1 },
      4: { amadeirado: 2, citrico: 2, elegante: 1 },
      5: { amadeirado: 3, citrico: 3, fresco: 1 },
    },
  },
  {
    id: "m_q06",
    texto: "Quero um perfume versatil para usar em quase qualquer ocasiao.",
    subtexto: "Do trabalho ao jantar, sem precisar trocar de fragrancia.",
    imagem: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=800&q=80",
    pesos: {
      1: { elegante: 3, amadeirado: 2, fresco: 2 },
      2: { elegante: 2, fresco: 2, amadeirado: 1 },
      3: { elegante: 1, doce: 1 },
      4: { intenso: 2, noturno: 2, sensual: 1 },
      5: { intenso: 3, noturno: 3, oriental: 2 },
    },
  },
  {
    id: "m_q07",
    texto: "Prefiro perfumes modernos e impactantes a classicos e discretos.",
    subtexto: "Curto assinatura atual, com mais personalidade e contraste.",
    imagem: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=800&q=80",
    pesos: {
      1: { intenso: 3, doce: 2, sensual: 2, noturno: 2 },
      2: { intenso: 2, sensual: 2, doce: 1 },
      3: { elegante: 1, amadeirado: 1 },
      4: { elegante: 3, amadeirado: 2, fresco: 1 },
      5: { elegante: 4, amadeirado: 3, citrico: 2 },
    },
  },
  {
    id: "m_q08",
    texto: "Nao curto perfume muito doce; prefiro algo mais seco e sofisticado.",
    subtexto: "Perfis mais limpos e refinados me representam melhor.",
    imagem: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?w=800&q=80",
    pesos: {
      1: { amadeirado: 4, elegante: 2, citrico: 2 },
      2: { amadeirado: 3, elegante: 2, citrico: 1 },
      3: { amadeirado: 1, doce: 1 },
      4: { doce: 2, oriental: 2, sensual: 1 },
      5: { doce: 4, oriental: 3, sensual: 2 },
    },
  },
];

export const perguntasFemininas = [
  {
    id: "f_q01",
    texto: "Quero um perfume marcante, que deixe rastro por onde eu passar.",
    subtexto: "Fragrancia com presenca para ser lembrada.",
    imagem: "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?w=800&q=80",
    pesos: {
      1: { intenso: 4, sensual: 3, noturno: 2 },
      2: { intenso: 3, sensual: 2, noturno: 1 },
      3: { elegante: 1, floral: 1 },
      4: { floral: 2, fresco: 2, elegante: 2 },
      5: { floral: 2, fresco: 3, citrico: 2, elegante: 1 },
    },
  },
  {
    id: "f_q02",
    texto: "Prefiro fragrancias florais leves e elegantes para o dia a dia.",
    subtexto: "Algo delicado e feminino para rotina e trabalho.",
    imagem: "https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?w=800&q=80",
    pesos: {
      1: { floral: 4, elegante: 3, fresco: 1, citrico: 1 },
      2: { floral: 3, elegante: 2, fresco: 1, citrico: 1 },
      3: { floral: 1, citrico: 1 },
      4: { doce: 2, oriental: 2, sensual: 1 },
      5: { doce: 3, oriental: 2, sensual: 2, noturno: 1 },
    },
  },
  {
    id: "f_q03",
    texto: "Gosto de perfumes doces/gourmand como baunilha e caramelo.",
    subtexto: "Acordes cremosos e envolventes combinam comigo.",
    imagem: "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=800&q=80",
    pesos: {
      1: { doce: 3, oriental: 3, sensual: 1, noturno: 2 },
      2: { doce: 3, oriental: 2, sensual: 1, noturno: 1 },
      3: { doce: 1, floral: 1 },
      4: { fresco: 2, citrico: 2, floral: 1 },
      5: { fresco: 3, citrico: 3, elegante: 1 },
    },
  },
  {
    id: "f_q04",
    texto: "Busco um perfume sensual e envolvente para noite e ocasioes especiais.",
    subtexto: "Quero aquele cheiro que cria atmosfera.",
    imagem: "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?w=800&q=80",
    pesos: {
      1: { sensual: 4, noturno: 3, oriental: 2 },
      2: { sensual: 3, noturno: 2, oriental: 1 },
      3: { sensual: 1, elegante: 1 },
      4: { floral: 2, elegante: 2, fresco: 1 },
      5: { floral: 3, fresco: 2, citrico: 2 },
    },
  },
  {
    id: "f_q05",
    texto: "Prefiro perfumes sofisticados e classicos em vez de joviais.",
    subtexto: "Mais refinamento e menos irreverencia.",
    imagem: "https://images.unsplash.com/photo-1664575602554-2087b04935a5?w=800&q=80",
    pesos: {
      1: { elegante: 4, floral: 2, amadeirado: 1 },
      2: { elegante: 3, floral: 2 },
      3: { elegante: 1, doce: 1 },
      4: { doce: 2, sensual: 2, noturno: 1 },
      5: { doce: 3, sensual: 3, noturno: 2 },
    },
  },
  {
    id: "f_q06",
    texto: "Quero um perfume fresco e clean para clima quente.",
    subtexto: "Sensacao de banho tomado e leveza durante o dia.",
    imagem: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80",
    pesos: {
      1: { fresco: 4, citrico: 3, floral: 1, elegante: 1 },
      2: { fresco: 3, citrico: 2, floral: 1, elegante: 1 },
      3: { fresco: 1, floral: 1 },
      4: { oriental: 2, doce: 2, sensual: 1 },
      5: { oriental: 3, doce: 3, intenso: 1, noturno: 1 },
    },
  },
  {
    id: "f_q07",
    texto: "Gosto de fragrancias com toque oriental/amadeirado mais quente.",
    subtexto: "Aquele fundo aconchegante, elegante e um pouco misterioso.",
    imagem: "https://images.unsplash.com/photo-1548690312-e3b507d8c110?w=800&q=80",
    pesos: {
      1: { oriental: 4, amadeirado: 3, sensual: 1 },
      2: { oriental: 3, amadeirado: 2, sensual: 1 },
      3: { oriental: 1, floral: 1 },
      4: { floral: 2, fresco: 2, citrico: 1, elegante: 1 },
      5: { fresco: 3, citrico: 2, floral: 1, elegante: 1 },
    },
  },
  {
    id: "f_q08",
    texto: "Quero um perfume assinatura de elegancia discreta, sem exagero.",
    subtexto: "Prefiro sofisticacao continua ao inves de impacto imediato.",
    imagem: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80",
    pesos: {
      1: { elegante: 4, amadeirado: 2, floral: 1, citrico: 1 },
      2: { elegante: 3, floral: 1, amadeirado: 1 },
      3: { elegante: 1, sensual: 1 },
      4: { sensual: 2, doce: 2, oriental: 1 },
      5: { sensual: 3, doce: 3, oriental: 2, noturno: 1 },
    },
  },
];

export const perguntasPorGenero = {
  masculino: perguntasMasculinas,
  feminino: perguntasFemininas,
};

export const perguntas = perguntasMasculinas;
