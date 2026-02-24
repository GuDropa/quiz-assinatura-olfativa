# Estrutura Airtable — D&A Decants Quiz

Use esta especificação para criar a base no Airtable. Cada campo está com nome interno (para API) e configuração exata.

---

## Base

- **Nome sugerido:** `D&A Decants — Quiz Leads`
- **Tabela principal:** `Leads`

---

## Tabela: `Leads`

| Campo (nome na API) | Nome exibido no Airtable | Tipo | Configuração / Observações |
|---------------------|---------------------------|------|----------------------------|
| `email` | Email | Email | Obrigatório. Primary field = não (use `created_at` ou um Single line text como ID se quiser). |
| `telefone` | Telefone | Phone number | Formato livre (ex.: +55 11 99999-9999). Pode ser opcional. |
| `genero` | Linha | Single select | Opções: `Masculino`, `Feminino`. |
| `match_id` | Match (ID) | Single line text | ID do perfume do match perfeito (ex.: `m03`, `f01`). |
| `match_nome` | Match — Perfume | Single line text | Nome do perfume (ex.: Stronger With You Intensely). |
| `match_marca` | Match — Marca | Single line text | Ex.: Emporio Armani. |
| `outras_opcoes` | Outras opções | Long text | JSON string com array dos outros 2 perfumes. Ex.: `[{"id":"m01","nome":"Sauvage EDP","marca":"Dior"},{"id":"m02",...}]` |
| `respostas` | Respostas do quiz | Long text | JSON object. Chave = id da pergunta (q01, q02...), valor = 1 a 5. Ex.: `{"q01":1,"q02":3,"q03":2,...}` |
| `perfil` | Perfil olfativo | Long text | JSON object com scores por atributo. Ex.: `{"doce":12,"fresco":5,"intenso":8,...}` |
| `created_at` | Data/Hora | Date with time | Usar “Created time” (automático) ou enviar do backend no formato ISO (ex.: 2025-02-23T21:00:00.000Z). |

---

## Resumo rápido para criar no Airtable

1. Crie uma base e uma tabela chamada **Leads**.
2. Deixe a primeira coluna como **Email** (tipo **Email**) ou renomeie o “Primary” para algo como **Email** e mude o tipo para Email.
3. Adicione as colunas na ordem abaixo (o “nome na API” é o **Field name** que você verá na API / automations; use exatamente esses nomes para bater com o schema do app):

| # | Field name (API) | Tipo no Airtable |
|---|------------------|------------------|
| 1 | `email` | Email |
| 2 | `telefone` | Phone number |
| 3 | `genero` | Single select (Masculino, Feminino) |
| 4 | `match_id` | Single line text |
| 5 | `match_nome` | Single line text |
| 6 | `match_marca` | Single line text |
| 7 | `outras_opcoes` | Long text |
| 8 | `respostas` | Long text |
| 9 | `perfil` | Long text |
| 10 | `created_at` | Date (incluir time) — ou use “Created time” nativo |

---

## Dados que o app envia (exemplo)

Quando você integrar o front com um backend que grava no Airtable, o payload deve seguir este formato:

```json
{
  "email": "cliente@email.com",
  "telefone": "+5511999999999",
  "genero": "masculino",
  "match_id": "m03",
  "match_nome": "Stronger With You Intensely",
  "match_marca": "Emporio Armani",
  "outras_opcoes": "[{\"id\":\"m01\",\"nome\":\"Sauvage EDP\",\"marca\":\"Dior\"},{\"id\":\"m02\",\"nome\":\"Bleu de Chanel\",\"marca\":\"Chanel\"}]",
  "respostas": "{\"q01\":1,\"q02\":2,\"q03\":4,\"q04\":1,\"q05\":2,\"q06\":5,\"q07\":3}",
  "perfil": "{\"doce\":12,\"fresco\":5,\"intenso\":8,\"noturno\":7,\"floral\":2,\"amadeirado\":4,\"oriental\":6,\"citrico\":1,\"sensual\":9,\"elegante\":4}"
}
```

**Nota:** No Airtable, campos Long text recebem string. Por isso `outras_opcoes`, `respostas` e `perfil` são enviados como **JSON stringificado** (e no Airtable você pode colar em um campo Long text; para análises, use extensões ou scripts que façam parse do JSON).

---

## Single select `genero`

- Valores exatos que o app pode enviar: `masculino` ou `feminino`.
- No Airtable, crie as opções como **Masculino** e **Feminino** (com M e F maiúsculos). No backend, ao enviar, você pode mandar `genero: "Masculino"` ou `genero: "Feminino"` para bater com o select, ou manter em minúsculo e usar uma fórmula/lookup depois.

Se quiser que o valor salvo seja exatamente como no app, use as opções `masculino` e `feminino` no Single select.
