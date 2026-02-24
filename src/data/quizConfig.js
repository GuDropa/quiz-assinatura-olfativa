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

export const perguntas = [
  // ─── 1. VIBE BALADA ───────────────────────────────────────────────────
  // SIM → perfume que chama atenção, projeção, noite
  // NÃO → perfume discreto, limpo, dia a dia
  {
    id: "q01",
    texto: "Quero um perfume que seja notado na balada.",
    subtexto: "Algo que deixe rastro na pista e faça perguntarem: \"o que você está usando?\"",
    imagem: "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?w=800&q=80",
    pesos: {
      1: { intenso: 4, noturno: 3, sensual: 3 },
      2: { intenso: 2, noturno: 2, sensual: 1 },
      3: { intenso: 1, elegante: 1 },
      4: { elegante: 2, fresco: 2 },
      5: { elegante: 3, fresco: 3, citrico: 2 },
    },
  },

  // ─── 2. VIBE DOCE / GOURMET ──────────────────────────────────────────
  // SIM → fragrâncias gourmand, baunilha, caramelo
  // NÃO → fragrâncias secas, frescas, herbais
  {
    id: "q02",
    texto: "Gosto de perfumes com cheiro de sobremesa.",
    subtexto: "Pense em chocolate, baunilha, caramelo e afins.",
    imagem: "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=800&q=80",
    pesos: {
      1: { doce: 4, oriental: 2, sensual: 2 },
      2: { doce: 3, oriental: 1 },
      3: { doce: 1, citrico: 1 },
      4: { citrico: 2, fresco: 2 },
      5: { citrico: 3, fresco: 3, amadeirado: 1 },
    },
  },

  // ─── 3. VIBE PRAIA / AR LIVRE ─────────────────────────────────────────
  // SIM → frescor, aquático, cítrico, leveza
  // NÃO → quente, encorpado, amadeirado, oriental
  {
    id: "q03",
    texto: "Me sinto mais eu em clima de praia do que em ambiente formal.",
    subtexto: "Sol na cara, brisa do mar, pé na areia — essa é a sua energia ideal?",
    imagem: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80",
    pesos: {
      1: { fresco: 4, citrico: 3, elegante: 1 },
      2: { fresco: 3, citrico: 2 },
      3: { fresco: 1, amadeirado: 1 },
      4: { amadeirado: 2, oriental: 2 },
      5: { amadeirado: 4, oriental: 3, intenso: 2 },
    },
  },

  // ─── 4. VIBE PODER / AUTORIDADE ──────────────────────────────────────
  // SIM → elegância clássica, amadeirado, couro
  // NÃO → leve, floral, despojado
  {
    id: "q04",
    texto: "Quero que meu perfume passe imagem de elegância e autoridade.",
    subtexto: "Como um terno bem cortado, relógio bonito e postura de quem sabe o que quer.",
    imagem: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80",
    pesos: {
      1: { elegante: 4, amadeirado: 3, intenso: 1 },
      2: { elegante: 3, amadeirado: 2 },
      3: { elegante: 1, floral: 1 },
      4: { floral: 2, fresco: 2 },
      5: { floral: 3, fresco: 3, citrico: 2 },
    },
  },

  // ─── 5. VIBE ROMÂNTICA / DATE ─────────────────────────────────────────
  // SIM → sensual, floral, envolvente
  // NÃO → esportivo, cítrico, arejado
  {
    id: "q05",
    texto: "Quero um perfume pensado para encontros românticos.",
    subtexto: "Jantar à luz de velas, clima de \"não quero ir embora\".",
    imagem: "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?w=800&q=80",
    pesos: {
      1: { sensual: 4, floral: 3, noturno: 2 },
      2: { sensual: 3, floral: 2 },
      3: { sensual: 1, fresco: 1 },
      4: { fresco: 2, citrico: 2 },
      5: { fresco: 3, citrico: 3, elegante: 1 },
    },
  },

  // ─── 6. VIBE MISTÉRIO / ORIENTE ──────────────────────────────────────
  // SIM → oud, incenso, especiarias, âmbar
  // NÃO → clean, transparente, floral leve
  {
    id: "q06",
    texto: "Gosto de perfumes com cheiro exótico e misterioso.",
    subtexto: "Pense em incenso, especiarias, oud, mercados árabes e tapetes persas.",
    imagem: "https://images.unsplash.com/photo-1548690312-e3b507d8c110?w=800&q=80",
    pesos: {
      1: { oriental: 4, amadeirado: 3, intenso: 2 },
      2: { oriental: 3, amadeirado: 2 },
      3: { oriental: 1, floral: 1 },
      4: { floral: 2, citrico: 1, fresco: 1 },
      5: { floral: 3, citrico: 2, fresco: 3 },
    },
  },

  // ─── 7. VIBE BARZINHO / CASUAL CHIQUE ────────────────────────────────
  // SIM → versátil, amadeirado suave, elegante casual
  // NÃO → extravagante, ultra-doce, pesado
  {
    id: "q07",
    texto: "Meu programa ideal é um barzinho com boa música e amigos.",
    subtexto: "Nada exagerado: só estar cheiroso e no clima certo.",
    imagem: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=800&q=80",
    pesos: {
      1: { amadeirado: 3, elegante: 3, fresco: 2 },
      2: { amadeirado: 2, elegante: 2 },
      3: { amadeirado: 1, intenso: 1 },
      4: { intenso: 2, doce: 2 },
      5: { intenso: 3, doce: 3, oriental: 2 },
    },
  },

  // ─── 8. VIBE INVESTIMENTO / LUXO x DIA A DIA ─────────────────────────
  // SIM → peça de luxo para momentos especiais
  // NÃO → algo bom e honesto para usar sempre
  {
    id: "q08",
    texto: "Prefiro ter um perfume mais especial do que só algo para o dia a dia.",
    subtexto: "Pense se você enxerga perfume mais como investimento em luxo ou só como item básico.",
    imagem: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=800&q=80",
    pesos: {
      // Mais aberto a investir em algo premium, assinatura
      1: { oriental: 3, amadeirado: 2, intenso: 2, elegante: 2 },
      2: { oriental: 2, amadeirado: 1, elegante: 1 },
      3: {},
      // Mais foco em custo-benefício e uso diário
      4: { fresco: 2, citrico: 2, doce: 1 },
      5: { fresco: 3, citrico: 3, doce: 1, sensual: 1 },
    },
  },
];
