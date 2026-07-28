import { list, get } from "@vercel/blob";

// Exportação das assinaturas como bloco de texto, para copiar e colar no
// sistema interno. Protegida por token (os registros têm CPF e e-mail).
//
//   /api/assinaturas?token=SEU_TOKEN            → tabela separada por TAB
//   /api/assinaturas?token=SEU_TOKEN&f=csv      → CSV (vírgula, com cabeçalho)
//   /api/assinaturas?token=SEU_TOKEN&f=json     → JSON
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const PREFIXO = "assinaturas/";
const COLUNAS = ["nome", "cpf", "email", "cidade", "tipo", "criado_em"];

const texto = (corpo, status = 200) =>
  new Response(corpo, {
    status,
    headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-store" },
  });

// CPF só com dígitos vira 000.000.000-00 na exportação
const cpfBonito = (c) =>
  String(c || "").length === 11 ? `${c.slice(0, 3)}.${c.slice(3, 6)}.${c.slice(6, 9)}-${c.slice(9)}` : c;

const dataBonita = (iso) => {
  const d = new Date(iso);
  return Number.isNaN(d.getTime()) ? iso : d.toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" });
};

export async function GET(req) {
  const esperado = process.env.ADMIN_TOKEN;
  const enviado = new URL(req.url).searchParams.get("token");

  if (!esperado) return texto("Exportação indisponível: ADMIN_TOKEN não configurado.", 503);
  if (enviado !== esperado) return texto("Não autorizado.", 401);
  if (!process.env.BLOB_READ_WRITE_TOKEN) return texto("Armazenamento não configurado.", 503);

  const formato = (new URL(req.url).searchParams.get("f") || "txt").toLowerCase();

  try {
    // varre todos os arquivos de assinatura
    const chaves = [];
    let cursor;
    do {
      const r = await list({ prefix: PREFIXO, cursor, limit: 1000 });
      chaves.push(...r.blobs.map((b) => b.pathname));
      cursor = r.hasMore ? r.cursor : undefined;
    } while (cursor);

    const registros = (
      await Promise.all(
        chaves.map(async (chave) => {
          try {
            const r = await get(chave, { access: "private", useCache: false });
            if (!r) return null;
            return JSON.parse(await new Response(r.stream).text());
          } catch {
            return null;
          }
        })
      )
    ).filter(Boolean);

    // mais antigas primeiro
    registros.sort((a, b) => String(a.criado_em).localeCompare(String(b.criado_em)));

    if (formato === "json") {
      return new Response(JSON.stringify(registros, null, 2), {
        headers: { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" },
      });
    }

    const linhas = registros.map((r) => [
      r.nome,
      cpfBonito(r.cpf),
      r.email,
      r.cidade,
      r.tipo,
      dataBonita(r.criado_em),
    ]);

    if (formato === "csv") {
      const escapa = (v) => `"${String(v ?? "").replace(/"/g, '""')}"`;
      const csv = [COLUNAS, ...linhas].map((l) => l.map(escapa).join(",")).join("\n");
      return new Response(csv, {
        headers: {
          "Content-Type": "text/csv; charset=utf-8",
          "Content-Disposition": 'attachment; filename="assinaturas.csv"',
          "Cache-Control": "no-store",
        },
      });
    }

    // padrão: bloco de texto separado por TAB (cola direto numa planilha)
    const cabecalho = COLUNAS.join("\t");
    const corpo = linhas.map((l) => l.join("\t")).join("\n");
    const rodape = `\n\nTotal: ${registros.length} ${registros.length === 1 ? "assinatura" : "assinaturas"}`;
    return texto(`${cabecalho}\n${corpo}${rodape}`);
  } catch {
    return texto("Falha ao ler as assinaturas.", 500);
  }
}
