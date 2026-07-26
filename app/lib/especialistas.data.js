// Dados dos depoimentos — fonte única para a seção da home e a página /depoimentos.
// Módulo puro (sem tipos, sem dependências): pode ser importado tanto por
// componentes de servidor quanto de cliente.
//
// Ao migrar a mídia para o Supabase Storage, troque APENAS a MEDIA_BASE abaixo
// para a URL pública do bucket. Nenhum outro lugar precisa mudar — todos os
// caminhos de vídeo e poster são montados a partir dela.
export const MEDIA_BASE = "/videos";
// depois: "https://<projeto>.supabase.co/storage/v1/object/public/depoimentos"

// Data de publicação dos cortes (usada no VideoObject do schema.org).
// Datetime ISO 8601 completo com fuso (-03:00, horário de Brasília) — o Google
// recomenda hora + timezone no uploadDate do VideoObject.
export const uploadDate = "2026-07-25T09:00:00-03:00";

export const especialistas = [
  {
    slug: "rogerio",
    nome: "Rogério",
    cargo: "Médico e professor universitário",
    local: "Gestão pública e privada",
    citacao:
      "Ter a informação centralizada do paciente não só é desejável: deveria ser compulsória.",
    duracao: "1min40",
    duracaoISO: "PT1M40S",
    video: `${MEDIA_BASE}/depoimento-rogerio.mp4`,
    poster: `${MEDIA_BASE}/depoimento-rogerio.jpg`,
  },
  {
    slug: "simone",
    nome: "Simone",
    cargo: "Gerência de infraestrutura e finanças",
    local: "Hospital de ensino 100% SUS",
    citacao:
      "Quando você deixa de repetir exames, consegue investir para que a sociedade tenha uma assistência melhor.",
    duracao: "1min26",
    duracaoISO: "PT1M26S",
    video: `${MEDIA_BASE}/depoimento-simone.mp4`,
    poster: `${MEDIA_BASE}/depoimento-simone.jpg`,
  },
  {
    slug: "jessica",
    nome: "Jéssica",
    cargo: "Setor de contratualização e regulação",
    local: "Hospital universitário",
    citacao:
      "A gente desperdiça tempo e recursos caríssimos no retrabalho, por não ter acesso às informações.",
    duracao: "1min07",
    duracaoISO: "PT1M07S",
    video: `${MEDIA_BASE}/depoimento-jessica.mp4`,
    poster: `${MEDIA_BASE}/depoimento-jessica.jpg`,
  },
];
