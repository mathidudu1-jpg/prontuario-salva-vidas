import { cpfValido, soDigitos } from "../../lib/cpf";

// Salva as assinaturas no armazenamento da própria Vercel (Redis/Upstash),
// enquanto não há Supabase. Lê tanto as variáveis KV_REST_API_* (nomes antigos
// do Vercel KV) quanto UPSTASH_REDIS_REST_* (integração atual do Marketplace).
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const REST_URL = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL || "";
const REST_TOKEN = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN || "";
const armazenamentoAtivo = Boolean(REST_URL && REST_TOKEN);

// chaves
const K_LISTA = "psv:apoiadores";
const K_CPF = "psv:cpf";
const K_EMAIL = "psv:email";

async function redis(command) {
  const res = await fetch(REST_URL, {
    method: "POST",
    headers: { Authorization: `Bearer ${REST_TOKEN}`, "Content-Type": "application/json" },
    body: JSON.stringify(command),
    cache: "no-store",
  });
  const json = await res.json();
  if (json.error) throw new Error(json.error);
  return json.result;
}

async function redisPipeline(commands) {
  const res = await fetch(`${REST_URL}/pipeline`, {
    method: "POST",
    headers: { Authorization: `Bearer ${REST_TOKEN}`, "Content-Type": "application/json" },
    body: JSON.stringify(commands),
    cache: "no-store",
  });
  const json = await res.json();
  if (json.error) throw new Error(json.error);
  return json; // array de { result } | { error }
}

const jsonResp = (data, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json", "Cache-Control": "no-store" },
  });

// GET → { ativo, total }. Sempre 200, para o formulário saber se pode coletar.
export async function GET() {
  if (!armazenamentoAtivo) return jsonResp({ ativo: false, total: null });
  try {
    const total = await redis(["LLEN", K_LISTA]);
    return jsonResp({ ativo: true, total: Number(total) || 0 });
  } catch {
    return jsonResp({ ativo: false, total: null });
  }
}

// POST → registra a assinatura. Retorna sempre o mesmo { ok, total } para
// CPF/e-mail novos ou repetidos (não revela quem já assinou).
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

  const nome = String(corpo?.nome ?? "").trim();
  const cpf = soDigitos(corpo?.cpf);
  const email = String(corpo?.email ?? "").trim().toLowerCase();
  const cidade = String(corpo?.cidade ?? "").trim();
  const tipo = String(corpo?.tipo ?? "").trim();

  const valido =
    nome.length >= 1 && nome.length <= 120 &&
    cpfValido(cpf) &&
    email.length >= 3 && email.length <= 200 && email.includes("@") &&
    cidade.length >= 1 && cidade.length <= 120 &&
    tipo.length >= 1 && tipo.length <= 40;

  if (!valido) return jsonResp({ ok: false, motivo: "dados inválidos" }, 400);

  try {
    // dedup atômico: SADD devolve 1 se novo, 0 se já existia
    const [addCpf, addEmail] = await redisPipeline([
      ["SADD", K_CPF, cpf],
      ["SADD", K_EMAIL, email],
    ]);
    const jaAssinou = addCpf?.result === 0 || addEmail?.result === 0;

    if (!jaAssinou) {
      const registro = JSON.stringify({
        nome: nome.slice(0, 120),
        cpf,
        email,
        cidade: cidade.slice(0, 120),
        tipo: tipo.slice(0, 40),
        criado_em: new Date().toISOString(),
      });
      await redis(["RPUSH", K_LISTA, registro]);
    }

    const total = await redis(["LLEN", K_LISTA]);
    return jsonResp({ ok: true, total: Number(total) || 0 });
  } catch {
    return jsonResp({ ok: false, motivo: "falha ao registrar" }, 500);
  }
}
