import { createHmac } from "crypto";
import { put, list, head } from "@vercel/blob";
import { cpfValido, soDigitos } from "../../lib/cpf";

// Assinaturas do manifesto no Vercel Blob (storage da própria Vercel).
// Uma assinatura = um arquivo JSON privado. Assim duas pessoas assinando ao
// mesmo tempo nunca sobrescrevem uma à outra (o que aconteceria com um único
// arquivo-lista), e o conteúdo (com CPF) não fica exposto por URL pública.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const armazenamentoAtivo = Boolean(process.env.BLOB_READ_WRITE_TOKEN);

const PREFIXO = "assinaturas/";
// Nome determinístico (reassinar não duplica), porém via HMAC com segredo: sem
// a chave, ninguém consegue derivar o nome do arquivo a partir de um CPF e
// descobrir se aquela pessoa assinou.
const chaveDe = (cpf) =>
  `${PREFIXO}${createHmac("sha256", process.env.ASSINATURAS_SECRET || "dev")
    .update(cpf)
    .digest("hex")
    .slice(0, 32)}.json`;

const jsonResp = (data, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json", "Cache-Control": "no-store" },
  });

async function contar() {
  let total = 0;
  let cursor;
  do {
    const r = await list({ prefix: PREFIXO, cursor, limit: 1000 });
    total += r.blobs.length;
    cursor = r.hasMore ? r.cursor : undefined;
  } while (cursor);
  return total;
}

// GET → { ativo, total }
export async function GET() {
  if (!armazenamentoAtivo) return jsonResp({ ativo: false, total: null });
  try {
    return jsonResp({ ativo: true, total: await contar() });
  } catch {
    return jsonResp({ ativo: false, total: null });
  }
}

// POST → registra. Responde igual para assinatura nova ou repetida
// (não revela quem já assinou).
export async function POST(req) {
  if (!armazenamentoAtivo) {
    return jsonResp({ ok: false, motivo: "armazenamento não configurado" }, 503);
  }

  let corpo;
  try {
    corpo = await req.json();
  } catch {
    return jsonResp({ ok: false, motivo: "corpo inválido" }, 400);
  }

  const nome = String(corpo?.nome ?? "").trim().slice(0, 120);
  const cpf = soDigitos(corpo?.cpf);
  const email = String(corpo?.email ?? "").trim().toLowerCase().slice(0, 200);
  const cidade = String(corpo?.cidade ?? "").trim().slice(0, 120);
  const tipo = String(corpo?.tipo ?? "").trim().slice(0, 40);

  const valido =
    nome.length >= 1 &&
    cpfValido(cpf) &&
    email.length >= 3 && email.includes("@") &&
    cidade.length >= 1 &&
    tipo.length >= 1;

  if (!valido) return jsonResp({ ok: false, motivo: "dados inválidos" }, 400);

  try {
    const chave = chaveDe(cpf);

    // já assinou? head() lança BlobNotFoundError quando não existe
    let jaExiste = false;
    try {
      await head(chave);
      jaExiste = true;
    } catch {
      jaExiste = false;
    }

    if (!jaExiste) {
      const registro = { nome, cpf, email, cidade, tipo, criado_em: new Date().toISOString() };
      await put(chave, JSON.stringify(registro), {
        access: "private",
        contentType: "application/json",
        addRandomSuffix: false,
        allowOverwrite: true,
      });
    }

    return jsonResp({ ok: true, total: await contar() });
  } catch {
    return jsonResp({ ok: false, motivo: "falha ao registrar" }, 500);
  }
}
