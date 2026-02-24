import { perfumesMasculinos, perfumesFemininos } from "../data/perfumes";

const ATRIBUTOS = [
  "doce", "fresco", "intenso", "noturno",
  "floral", "amadeirado", "oriental", "citrico",
  "sensual", "elegante"
];

export function calcularPerfil(respostas, perguntas) {
  const perfil = {};
  ATRIBUTOS.forEach((a) => (perfil[a] = 0));

  perguntas.forEach((pergunta) => {
    const valorResposta = respostas[pergunta.id];
    if (valorResposta == null) return;

    const pesosParaResposta = pergunta.pesos[valorResposta];
    if (!pesosParaResposta) return;

    Object.entries(pesosParaResposta).forEach(([atributo, peso]) => {
      if (perfil[atributo] !== undefined) {
        perfil[atributo] += peso;
      }
    });
  });

  return perfil;
}

function calcularSimilaridade(perfil, perfume) {
  let somaProdutos = 0;
  let somaPerfil2 = 0;
  let somaPerfume2 = 0;

  ATRIBUTOS.forEach((a) => {
    const pVal = perfil[a] || 0;
    const fVal = perfume.atributos[a] || 0;
    somaProdutos += pVal * fVal;
    somaPerfil2 += pVal * pVal;
    somaPerfume2 += fVal * fVal;
  });

  const denominador = Math.sqrt(somaPerfil2) * Math.sqrt(somaPerfume2);
  if (denominador === 0) return 0;

  return somaProdutos / denominador;
}

export function obterRecomendacoes(respostas, perguntas, genero) {
  const perfil = calcularPerfil(respostas, perguntas);
  const catalogo = genero === "masculino" ? perfumesMasculinos : perfumesFemininos;

  const ranking = catalogo
    .map((perfume) => ({
      ...perfume,
      score: calcularSimilaridade(perfil, perfume),
    }))
    .sort((a, b) => b.score - a.score);

  return {
    matchPerfeito: ranking[0],
    outrasOpcoes: ranking.slice(1, 3),
    perfil,
  };
}
