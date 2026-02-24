/**
 * Schema e helpers para envio de dados do quiz ao Airtable.
 *
 * Estrutura da tabela: docs/AIRTABLE_ESTRUTURA.md
 * Uso: buildAirtablePayload(contact, resultado, respostas) → objeto pronto para POST.
 */

/**
 * Nomes dos campos da tabela "Leads" no Airtable.
 * Use estes nomes ao configurar a base e ao enviar pela API.
 */
export const AIRTABLE_FIELDS = {
  email: "email",
  telefone: "telefone",
  genero: "genero",
  match_id: "match_id",
  match_nome: "match_nome",
  match_marca: "match_marca",
  outras_opcoes: "outras_opcoes",
  respostas: "respostas",
  perfil: "perfil",
  created_at: "created_at",
};

/**
 * Monta o objeto de campos para criar um registro na tabela Leads.
 *
 * @param {Object} contact - { email: string, telefone?: string }
 * @param {Object} resultado - { matchPerfeito, outrasOpcoes, perfil } (retorno de obterRecomendacoes)
 * @param {Object} respostas - { [perguntaId]: valor 1-5 }
 * @param {"masculino"|"feminino"} genero
 * @returns {Object} Campos no formato esperado pela API do Airtable (records[].fields)
 */
export function buildAirtablePayload(contact, resultado, respostas, genero) {
  const { matchPerfeito, outrasOpcoes, perfil } = resultado;

  return {
    [AIRTABLE_FIELDS.email]: contact.email?.trim() || "",
    [AIRTABLE_FIELDS.telefone]: contact.telefone?.trim() ?? "",
    [AIRTABLE_FIELDS.genero]: genero === "masculino" ? "Masculino" : "Feminino",
    [AIRTABLE_FIELDS.match_id]: matchPerfeito?.id ?? "",
    [AIRTABLE_FIELDS.match_nome]: matchPerfeito?.nome ?? "",
    [AIRTABLE_FIELDS.match_marca]: matchPerfeito?.marca ?? "",
    [AIRTABLE_FIELDS.outras_opcoes]: JSON.stringify(
      (outrasOpcoes || []).map((p) => ({
        id: p.id,
        nome: p.nome,
        marca: p.marca,
      }))
    ),
    [AIRTABLE_FIELDS.respostas]: JSON.stringify(respostas || {}),
    [AIRTABLE_FIELDS.perfil]: JSON.stringify(perfil || {}),
    [AIRTABLE_FIELDS.created_at]: new Date().toISOString(),
  };
}
