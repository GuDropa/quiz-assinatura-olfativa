/**
 * Atributos olfativos usados no sistema de pontuação:
 *   doce, fresco, intenso, noturno, floral, amadeirado, oriental, citrico, sensual, elegante
 *
 * Cada perfume recebe valores de 0–10 nesses atributos.
 * As respostas do quiz somam/subtraem nesses eixos para gerar o match.
 */

const LABEL_NOTAS = {
  doce: "Doce",
  fresco: "Fresco",
  intenso: "Intenso",
  noturno: "Noturno",
  floral: "Floral",
  amadeirado: "Amadeirado",
  oriental: "Oriental",
  citrico: "Citrico",
  sensual: "Sensual",
  elegante: "Elegante",
};

function adicionarNotasPrincipais(lista) {
  return lista.map((perfume) => {
    const notasPrincipais = Object.entries(perfume.atributos || {})
      .sort(([, a], [, b]) => b - a)
      .slice(0, 4)
      .map(([atributo]) => LABEL_NOTAS[atributo] || atributo);

    return {
      ...perfume,
      notasPrincipais,
    };
  });
}

const perfumesMasculinosBase = [
  {
    id: "m01",
    nome: "Sauvage EDP",
    marca: "Dior",
    imagem: "/assets/perfumes_masculinos/sauvage_edp.png",
    atributos: { doce: 3, fresco: 8, intenso: 6, noturno: 4, floral: 2, amadeirado: 7, oriental: 3, citrico: 7, sensual: 5, elegante: 7 },
    descricao: "Selvagem e magnético, uma explosão fresca com fundo amadeirado."
  },
  {
    id: "m02",
    nome: "Bleu de Chanel",
    marca: "Chanel",
    imagem: "/assets/perfumes_masculinos/bleu_de_chanel.webp",
    atributos: { doce: 2, fresco: 6, intenso: 4, noturno: 3, floral: 2, amadeirado: 8, oriental: 2, citrico: 5, sensual: 4, elegante: 9 },
    descricao: "Elegância atemporal, versátil para qualquer ocasião."
  },
  {
    id: "m03",
    nome: "Stronger With You Intensely",
    marca: "Emporio Armani",
    imagem: "/assets/perfumes_masculinos/stronger_with_you_intensely.jpg",
    atributos: { doce: 9, fresco: 2, intenso: 8, noturno: 8, floral: 1, amadeirado: 5, oriental: 7, citrico: 1, sensual: 9, elegante: 6 },
    descricao: "Abraço quente e acolhedor, impossível de esquecer."
  },
  {
    id: "m04",
    nome: "Le Male Elixir",
    marca: "Jean Paul Gaultier",
    imagem: "/assets/perfumes_masculinos/le_male_elixir.webp",
    atributos: { doce: 7, fresco: 3, intenso: 9, noturno: 9, floral: 2, amadeirado: 6, oriental: 8, citrico: 2, sensual: 9, elegante: 7 },
    descricao: "Poder e sedução concentrados em um elixir irresistível."
  },
  {
    id: "m05",
    nome: "Eros EDP",
    marca: "Versace",
    imagem: "/assets/perfumes_masculinos/eros_edp.png",
    atributos: { doce: 7, fresco: 5, intenso: 7, noturno: 6, floral: 1, amadeirado: 5, oriental: 6, citrico: 4, sensual: 8, elegante: 6 },
    descricao: "Deus grego em forma de perfume — poderoso e sedutor."
  },
  {
    id: "m06",
    nome: "1 Million Parfum",
    marca: "Paco Rabanne",
    imagem: "/assets/perfumes_masculinos/1_million_parfum.png",
    atributos: { doce: 8, fresco: 3, intenso: 8, noturno: 7, floral: 1, amadeirado: 5, oriental: 7, citrico: 2, sensual: 8, elegante: 7 },
    descricao: "Luxuoso e ousado, para quem quer ser notado."
  },
  {
    id: "m07",
    nome: "Acqua di Giò Profondo",
    marca: "Giorgio Armani",
    imagem: "/assets/perfumes_masculinos/acqua_di_gio_profondo.webp",
    atributos: { doce: 1, fresco: 10, intenso: 3, noturno: 1, floral: 2, amadeirado: 4, oriental: 2, citrico: 9, sensual: 2, elegante: 5 },
    descricao: "Profundidade oceânica, brisa marítima sofisticada."
  },
  {
    id: "m08",
    nome: "MYSLF",
    marca: "Yves Saint Laurent",
    imagem: "/assets/perfumes_masculinos/myslf.png",
    atributos: { doce: 5, fresco: 6, intenso: 5, noturno: 4, floral: 6, amadeirado: 5, oriental: 4, citrico: 5, sensual: 5, elegante: 8 },
    descricao: "Moderno e floral masculino, quebrando barreiras."
  },
  {
    id: "m09",
    nome: "Gentleman Réserve Privée",
    marca: "Givenchy",
    imagem: "/assets/perfumes_masculinos/gentleman_reserve_privee.jpg",
    atributos: { doce: 6, fresco: 3, intenso: 6, noturno: 7, floral: 3, amadeirado: 8, oriental: 6, citrico: 2, sensual: 7, elegante: 9 },
    descricao: "O verdadeiro cavalheiro — refinado, quente e sofisticado."
  },
  {
    id: "m10",
    nome: "The Most Wanted Parfum",
    marca: "Azzaro",
    imagem: "/assets/perfumes_masculinos/the_most_wanted_parfum.webp",
    atributos: { doce: 8, fresco: 3, intenso: 8, noturno: 8, floral: 1, amadeirado: 5, oriental: 7, citrico: 2, sensual: 9, elegante: 6 },
    descricao: "O mais desejado — doce, intenso e irresistível."
  },
  {
    id: "m11",
    nome: "Bad Boy Cobalt",
    marca: "Carolina Herrera",
    imagem: "/assets/perfumes_masculinos/bad_boy_cobalt.webp",
    atributos: { doce: 4, fresco: 7, intenso: 5, noturno: 4, floral: 2, amadeirado: 6, oriental: 4, citrico: 6, sensual: 5, elegante: 7 },
    descricao: "Rebelde com classe, frescor eletrizante."
  },
  {
    id: "m12",
    nome: "Armani Code",
    marca: "Giorgio Armani",
    imagem: "/assets/perfumes_masculinos/armani_code.webp",
    atributos: { doce: 6, fresco: 3, intenso: 6, noturno: 7, floral: 3, amadeirado: 6, oriental: 7, citrico: 3, sensual: 8, elegante: 8 },
    descricao: "Código secreto da sedução — sofisticado e misterioso."
  },
  {
    id: "m13",
    nome: "212 VIP Black",
    marca: "Carolina Herrera",
    imagem: "/assets/perfumes_masculinos/212_vip_black.webp",
    atributos: { doce: 7, fresco: 4, intenso: 7, noturno: 7, floral: 1, amadeirado: 4, oriental: 6, citrico: 3, sensual: 7, elegante: 6 },
    descricao: "Noite VIP — fumado, doce e magnético."
  },
  {
    id: "m14",
    nome: "La Nuit de L'Homme",
    marca: "Yves Saint Laurent",
    imagem: "/assets/perfumes_masculinos/la_nuit_de_lhomme.jpg",
    atributos: { doce: 6, fresco: 3, intenso: 5, noturno: 9, floral: 3, amadeirado: 5, oriental: 6, citrico: 3, sensual: 8, elegante: 8 },
    descricao: "A essência da noite parisiense — elegante e sedutor."
  },
  {
    id: "m15",
    nome: "Invictus Victory",
    marca: "Paco Rabanne",
    imagem: "/assets/perfumes_masculinos/invictus_victory.webp",
    atributos: { doce: 7, fresco: 5, intenso: 7, noturno: 5, floral: 2, amadeirado: 5, oriental: 5, citrico: 4, sensual: 7, elegante: 6 },
    descricao: "Vitória garantida — aromático e poderoso."
  },
  {
    id: "m16",
    nome: "Boss Bottled Infinite",
    marca: "Hugo Boss",
    imagem: "/assets/perfumes_masculinos/boss_bottled_infinite.webp",
    atributos: { doce: 4, fresco: 5, intenso: 4, noturno: 3, floral: 2, amadeirado: 9, oriental: 3, citrico: 4, sensual: 4, elegante: 9 },
    descricao: "Infinitamente elegante — amadeirado e refinado."
  },
  {
    id: "m17",
    nome: "Man in Black",
    marca: "Bvlgari",
    imagem: "/assets/perfumes_masculinos/man_in_black.avif",
    atributos: { doce: 5, fresco: 2, intenso: 7, noturno: 8, floral: 2, amadeirado: 7, oriental: 8, citrico: 2, sensual: 8, elegante: 8 },
    descricao: "Mistério em preto — especiarias e couro sofisticado."
  },
  {
    id: "m18",
    nome: "Lattafa Asad",
    marca: "Lattafa",
    imagem: "/assets/perfumes_masculinos/lattafa_asad.webp",
    atributos: { doce: 5, fresco: 3, intenso: 8, noturno: 8, floral: 1, amadeirado: 8, oriental: 9, citrico: 2, sensual: 7, elegante: 6 },
    descricao: "Leão do deserto — poderoso, amadeirado e oriental."
  },
  {
    id: "m19",
    nome: "Fakhar Black",
    marca: "Lattafa",
    imagem: "/assets/perfumes_masculinos/fakhar_black.webp",
    atributos: { doce: 4, fresco: 5, intenso: 6, noturno: 6, floral: 2, amadeirado: 7, oriental: 7, citrico: 4, sensual: 6, elegante: 6 },
    descricao: "Orgulho em preto — rico e enigmático."
  },
  {
    id: "m20",
    nome: "Turathi Blue",
    marca: "Afnan",
    imagem: "/assets/perfumes_masculinos/turathi_blue.png",
    atributos: { doce: 4, fresco: 8, intenso: 4, noturno: 2, floral: 2, amadeirado: 5, oriental: 4, citrico: 8, sensual: 3, elegante: 6 },
    descricao: "Herança azul — frescor árabe com elegância moderna."
  },
  {
    id: "m21",
    nome: "Lattafa Khamrah",
    marca: "Lattafa",
    imagem: "/assets/perfumes_masculinos/17653114152069.webp",
    atributos: { doce: 9, fresco: 1, intenso: 9, noturno: 9, floral: 1, amadeirado: 6, oriental: 9, citrico: 1, sensual: 8, elegante: 7 },
    descricao: "Elixir do oriente — especiarias embriagantes e baunilha."
  },
  {
    id: "m22",
    nome: "Club de Nuit Iconic",
    marca: "Armaf",
    imagem: "/assets/perfumes_masculinos/club_de_nuit_iconic.webp",
    atributos: { doce: 4, fresco: 7, intenso: 5, noturno: 4, floral: 2, amadeirado: 7, oriental: 4, citrico: 6, sensual: 5, elegante: 7 },
    descricao: "Ícone noturno — frescor amadeirado impecável."
  },
  {
    id: "m23",
    nome: "Bade'e Al Oud",
    marca: "Lattafa",
    imagem: "/assets/perfumes_masculinos/badee_al_oud.webp",
    atributos: { doce: 6, fresco: 2, intenso: 8, noturno: 8, floral: 2, amadeirado: 8, oriental: 10, citrico: 1, sensual: 7, elegante: 7 },
    descricao: "Maravilha do Oud — profundo e imponente."
  },
  {
    id: "m24",
    nome: "Bareeq Al Dhahab",
    marca: "Lattafa",
    imagem: "/assets/perfumes_masculinos/bareeq_al_dhahab.jpeg",
    atributos: { doce: 7, fresco: 3, intenso: 7, noturno: 7, floral: 2, amadeirado: 6, oriental: 8, citrico: 2, sensual: 7, elegante: 7 },
    descricao: "Brilho do ouro — opulência oriental radiante."
  },
  {
    id: "m25",
    nome: "Attar Al Wesal",
    marca: "Lattafa",
    imagem: "/assets/perfumes_masculinos/attar_al_wesal.png",
    atributos: { doce: 6, fresco: 3, intenso: 7, noturno: 7, floral: 3, amadeirado: 7, oriental: 8, citrico: 2, sensual: 8, elegante: 6 },
    descricao: "Perfume da união — romântico e envolvente."
  },
  {
    id: "m26",
    nome: "Supremacy Incense",
    marca: "Afnan",
    imagem: "/assets/perfumes_masculinos/supremacy_incense.webp",
    atributos: { doce: 3, fresco: 4, intenso: 7, noturno: 7, floral: 1, amadeirado: 9, oriental: 8, citrico: 3, sensual: 6, elegante: 8 },
    descricao: "Supremacia do incenso — ritual de poder."
  },
  {
    id: "m27",
    nome: "EQAAB",
    marca: "Lattafa",
    imagem: "/assets/perfumes_masculinos/eqaab.webp",
    atributos: { doce: 5, fresco: 4, intenso: 7, noturno: 7, floral: 2, amadeirado: 7, oriental: 8, citrico: 3, sensual: 7, elegante: 6 },
    descricao: "Punição aromática — intenso e inesquecível."
  }
];

const perfumesFemininosBase = [
  {
    id: "f01",
    nome: "La Vie Est Belle",
    marca: "Lancôme",
    imagem: "/assets/perfumes_femininos/la_vie_est_belle.webp",
    atributos: { doce: 9, fresco: 2, intenso: 7, noturno: 6, floral: 5, amadeirado: 3, oriental: 6, citrico: 1, sensual: 8, elegante: 7 },
    descricao: "A vida é bela — doçura gourmand irresistível."
  },
  {
    id: "f02",
    nome: "Good Girl",
    marca: "Carolina Herrera",
    imagem: "/assets/perfumes_femininos/good_girl.webp",
    atributos: { doce: 7, fresco: 3, intenso: 7, noturno: 8, floral: 4, amadeirado: 4, oriental: 6, citrico: 2, sensual: 9, elegante: 8 },
    descricao: "Dualidade perfeita — doce e poderosa."
  },
  {
    id: "f03",
    nome: "Libre",
    marca: "Yves Saint Laurent",
    imagem: "/assets/perfumes_femininos/libre.webp",
    atributos: { doce: 4, fresco: 6, intenso: 6, noturno: 5, floral: 7, amadeirado: 4, oriental: 5, citrico: 6, sensual: 8, elegante: 9 },
    descricao: "Liberdade feminina — lavanda e flor de laranjeira."
  },
  {
    id: "f04",
    nome: "Paradoxe",
    marca: "Prada",
    imagem: "/assets/perfumes_femininos/paradoxe.webp",
    atributos: { doce: 6, fresco: 5, intenso: 6, noturno: 5, floral: 6, amadeirado: 5, oriental: 5, citrico: 3, sensual: 7, elegante: 8 },
    descricao: "Paradoxo encantador — múltiplas facetas em harmonia."
  },
  {
    id: "f05",
    nome: "My Way",
    marca: "Giorgio Armani",
    imagem: "/assets/perfumes_femininos/my_way.webp",
    atributos: { doce: 4, fresco: 8, intenso: 4, noturno: 3, floral: 8, amadeirado: 3, oriental: 3, citrico: 6, sensual: 4, elegante: 8 },
    descricao: "Meu caminho — floral branco luminoso e delicado."
  },
  {
    id: "f06",
    nome: "Chloé Le Parfum",
    marca: "Chloé",
    imagem: "/assets/perfumes_femininos/chloe_le_parfum.png",
    atributos: { doce: 4, fresco: 5, intenso: 5, noturno: 4, floral: 8, amadeirado: 3, oriental: 3, citrico: 3, sensual: 6, elegante: 9 },
    descricao: "Romantismo parisiense — rosas e peônia em véu."
  },
  {
    id: "f07",
    nome: "D&G Devotion",
    marca: "Dolce & Gabbana",
    imagem: "/assets/perfumes_femininos/d_g_devotion.webp",
    atributos: { doce: 8, fresco: 4, intenso: 5, noturno: 4, floral: 5, amadeirado: 3, oriental: 4, citrico: 3, sensual: 5, elegante: 7 },
    descricao: "Devoção doce — confeitaria italiana sofisticada."
  },
  {
    id: "f08",
    nome: "Dior J'adore",
    marca: "Dior",
    imagem: "/assets/perfumes_femininos/dior_j_adore.webp",
    atributos: { doce: 3, fresco: 6, intenso: 5, noturno: 4, floral: 8, amadeirado: 3, oriental: 2, citrico: 5, sensual: 6, elegante: 10 },
    descricao: "O ícone dourado — floral absoluto e luxuoso."
  },
  {
    id: "f09",
    nome: "Chloé Love Story",
    marca: "Chloé",
    imagem: "/assets/perfumes_femininos/chloe_love_story.avif",
    atributos: { doce: 3, fresco: 8, intenso: 2, noturno: 1, floral: 8, amadeirado: 2, oriental: 1, citrico: 7, sensual: 2, elegante: 6 },
    descricao: "História de amor — flor de laranjeira e jasmin."
  },
  {
    id: "f10",
    nome: "Nina Extra Rouge",
    marca: "Nina Ricci",
    imagem: "/assets/perfumes_femininos/nina_extra_rouge.png",
    atributos: { doce: 8, fresco: 3, intenso: 6, noturno: 6, floral: 4, amadeirado: 3, oriental: 5, citrico: 2, sensual: 7, elegante: 6 },
    descricao: "Vermelho extra — frutas vermelhas e caramelo viciante."
  },
  {
    id: "f11",
    nome: "Yara",
    marca: "Lattafa",
    imagem: "/assets/perfumes_femininos/yara.webp",
    atributos: { doce: 9, fresco: 3, intenso: 6, noturno: 6, floral: 4, amadeirado: 3, oriental: 6, citrico: 2, sensual: 7, elegante: 6 },
    descricao: "Rosa dourada — frutas tropicais e baunilha oriental."
  },
  {
    id: "f12",
    nome: "Sabah Al Ward",
    marca: "Lattafa",
    imagem: "/assets/perfumes_femininos/sabah_al_ward.webp",
    atributos: { doce: 6, fresco: 4, intenso: 5, noturno: 4, floral: 8, amadeirado: 3, oriental: 5, citrico: 3, sensual: 5, elegante: 7 },
    descricao: "Manhã das rosas — frescor floral encantador."
  },
  {
    id: "f13",
    nome: "Royal Amber",
    marca: "Lattafa",
    imagem: "/assets/perfumes_femininos/royal_amber.png",
    atributos: { doce: 6, fresco: 3, intenso: 7, noturno: 7, floral: 3, amadeirado: 6, oriental: 8, citrico: 2, sensual: 7, elegante: 7 },
    descricao: "Âmbar real — quente, rico e majestoso."
  },
  {
    id: "f14",
    nome: "Khamrah",
    marca: "Lattafa",
    imagem: "/assets/perfumes_femininos/khamrah.webp",
    atributos: { doce: 8, fresco: 1, intenso: 9, noturno: 9, floral: 2, amadeirado: 6, oriental: 9, citrico: 1, sensual: 8, elegante: 7 },
    descricao: "Elixir feminino — especiarias quentes e baunilha."
  },
  {
    id: "f15",
    nome: "Durrat Al Aroos",
    marca: "Ard Al Zaafaran",
    imagem: "/assets/perfumes_femininos/durrat_al_aroos.webp",
    atributos: { doce: 6, fresco: 3, intenso: 6, noturno: 6, floral: 5, amadeirado: 5, oriental: 8, citrico: 2, sensual: 6, elegante: 7 },
    descricao: "Pérola da noiva — oriental floral romântico."
  },
  {
    id: "f16",
    nome: "Ameerat Al Arab",
    marca: "Asdaaf",
    imagem: "/assets/perfumes_femininos/ameerat_al_arab.webp",
    atributos: { doce: 5, fresco: 3, intenso: 7, noturno: 7, floral: 4, amadeirado: 5, oriental: 8, citrico: 2, sensual: 8, elegante: 7 },
    descricao: "Princesa do oriente — mistério e sofisticação."
  },
  {
    id: "f17",
    nome: "Velvet Gold",
    marca: "Lattafa",
    imagem: "/assets/perfumes_femininos/velvet_gold.jpeg",
    atributos: { doce: 7, fresco: 2, intenso: 8, noturno: 8, floral: 3, amadeirado: 5, oriental: 8, citrico: 1, sensual: 9, elegante: 8 },
    descricao: "Veludo dourado — luxo oriental aveludado."
  },
  {
    id: "f18",
    nome: "Noor Al Sabah",
    marca: "Lattafa",
    imagem: "/assets/perfumes_femininos/noor_al_sabah.webp",
    atributos: { doce: 3, fresco: 7, intenso: 3, noturno: 2, floral: 6, amadeirado: 3, oriental: 4, citrico: 6, sensual: 3, elegante: 6 },
    descricao: "Luz da manhã — leveza floral radiante."
  },
  {
    id: "f19",
    nome: "Fakhar Rose",
    marca: "Lattafa",
    imagem: "/assets/perfumes_femininos/fakhar_rose.jpeg",
    atributos: { doce: 5, fresco: 4, intenso: 5, noturno: 4, floral: 8, amadeirado: 4, oriental: 5, citrico: 3, sensual: 6, elegante: 7 },
    descricao: "Orgulho em rosa — feminino e confiante."
  },
  {
    id: "f20",
    nome: "Watani",
    marca: "Al Wataniah",
    imagem: "/assets/perfumes_femininos/watani.webp",
    atributos: { doce: 6, fresco: 3, intenso: 7, noturno: 6, floral: 4, amadeirado: 6, oriental: 8, citrico: 2, sensual: 7, elegante: 6 },
    descricao: "Patriotismo olfativo — tradição e modernidade."
  }
];

export const perfumesMasculinos = adicionarNotasPrincipais(perfumesMasculinosBase);
export const perfumesFemininos = adicionarNotasPrincipais(perfumesFemininosBase);
