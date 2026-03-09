/**
 * Vercel Serverless Function: proxy para salvar lead do quiz no Airtable.
 *
 * POST /api/save-lead
 * Body (JSON): objeto "fields" no formato do Airtable (ou o próprio objeto de campos).
 *
 * Env vars no Vercel:
 *   AIRTABLE_API_KEY  — token com acesso de escrita à base
 *   AIRTABLE_BASE_ID  — ID da base (ver URL da base no Airtable)
 */

const AIRTABLE_API_URL = "https://api.airtable.com/v0";

function corsHeaders(origin) {
  const allow = origin || "*";
  return {
    "Access-Control-Allow-Origin": allow,
    "Access-Control-Allow-Methods": "POST, PATCH, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Max-Age": "86400",
  };
}

export default async function handler(req, res) {
  const origin = req.headers.origin;

  if (req.method === "OPTIONS") {
    res.setHeader("Access-Control-Allow-Origin", origin || "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, PATCH, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    return res.status(204).end();
  }

  if (req.method !== "POST" && req.method !== "PATCH") {
    Object.entries(corsHeaders(origin)).forEach(([k, v]) => res.setHeader(k, v));
    return res.status(405).json({ error: "Method not allowed" });
  }

  const apiKey = process.env.AIRTABLE_API_KEY;
  const baseId = process.env.AIRTABLE_BASE_ID;
  const tableName = process.env.AIRTABLE_TABLE_NAME || "Leads";

  if (!apiKey || !baseId) {
    Object.entries(corsHeaders(origin)).forEach(([k, v]) => res.setHeader(k, v));
    return res.status(500).json({
      error: "Server misconfiguration",
      message: "AIRTABLE_API_KEY and AIRTABLE_BASE_ID must be set",
    });
  }

  let body;
  try {
    body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
  } catch {
    Object.entries(corsHeaders(origin)).forEach(([k, v]) => res.setHeader(k, v));
    return res.status(400).json({ error: "Invalid JSON body" });
  }

  if (req.method === "PATCH") {
    const recordId = body.recordId ?? body.id;
    const fields = body.fields ?? body;
    if (!recordId || typeof recordId !== "string") {
      Object.entries(corsHeaders(origin)).forEach(([k, v]) => res.setHeader(k, v));
      return res.status(400).json({ error: "PATCH requires 'recordId' with the Airtable record ID" });
    }
    if (!fields || typeof fields !== "object") {
      Object.entries(corsHeaders(origin)).forEach(([k, v]) => res.setHeader(k, v));
      return res.status(400).json({ error: "PATCH requires 'fields' with the fields to update" });
    }

    const url = `${AIRTABLE_API_URL}/${baseId}/${tableName}/${recordId}`;
    const options = {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ fields }),
    };

    try {
      const response = await fetch(url, options);
      const data = await response.json().catch(() => ({}));

      Object.entries(corsHeaders(origin)).forEach(([k, v]) => res.setHeader(k, v));

      if (!response.ok) {
        return res.status(response.status).json({
          error: "Airtable update failed",
          airtableError: data.error?.message ?? data,
        });
      }

      return res.status(200).json({ ok: true, id: data.id });
    } catch (err) {
      Object.entries(corsHeaders(origin)).forEach(([k, v]) => res.setHeader(k, v));
      return res.status(500).json({
        error: "Failed to update lead",
        message: err.message,
      });
    }
  }

  // POST: criar novo lead
  const fields = body.fields ?? body;
  if (!fields || typeof fields !== "object") {
    Object.entries(corsHeaders(origin)).forEach(([k, v]) => res.setHeader(k, v));
    return res.status(400).json({ error: "Body must contain 'fields' or be the fields object" });
  }

  const url = `${AIRTABLE_API_URL}/${baseId}/${tableName}`;
  const options = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ fields }),
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json().catch(() => ({}));

    Object.entries(corsHeaders(origin)).forEach(([k, v]) => res.setHeader(k, v));

    if (!response.ok) {
      return res.status(response.status).json({
        error: "Airtable request failed",
        airtableError: data.error?.message ?? data,
      });
    }

    return res.status(201).json({ ok: true, id: data.id });
  } catch (err) {
    Object.entries(corsHeaders(origin)).forEach(([k, v]) => res.setHeader(k, v));
    return res.status(500).json({
      error: "Failed to save lead",
      message: err.message,
    });
  }
}
