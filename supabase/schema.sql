-- Prontuário Salva-Vidas — assinaturas do manifesto
-- Rode este script no Supabase (SQL Editor) do projeto novo.

-- 1. Tabela de apoiadores (com validação de tamanho e de formato no servidor)
create table if not exists public.apoiadores (
  id         uuid primary key default gen_random_uuid(),
  nome       text not null check (char_length(nome) between 1 and 120),
  cpf        text not null unique check (cpf ~ '^[0-9]{11}$'),
  email      text not null unique check (char_length(email) between 3 and 200),
  cidade     text not null check (char_length(cidade) between 1 and 120),
  -- tipo é um rótulo curto vindo de um <select> controlado; validamos só o
  -- tamanho para poder ampliar a lista de profissões sem migrar o banco.
  tipo       text not null check (char_length(tipo) between 1 and 40),
  criado_em  timestamptz not null default now()
);

-- 2. Liga o Row Level Security. Sem policies, todo acesso DIRETO (select/insert/
--    update/delete) fica negado ao papel anon. Nome, CPF e e-mail ficam protegidos.
alter table public.apoiadores enable row level security;

-- 3. Assinatura via função (SECURITY DEFINER). A função roda como dono e ignora
--    o RLS, mas só faz o insert. Retorna sempre void — mesmo para CPF ou e-mail
--    repetido (on conflict do nothing) — para não revelar quem já assinou.
drop function if exists public.assinar(text, text, text, text);        -- versão antiga (sem CPF)
drop function if exists public.assinar(text, text, text, text, text);  -- idempotência
create or replace function public.assinar(
  p_nome text, p_cpf text, p_email text, p_cidade text, p_tipo text
)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.apoiadores (nome, cpf, email, cidade, tipo)
  values (
    left(trim(p_nome), 120),
    regexp_replace(coalesce(p_cpf, ''), '\D', '', 'g'),  -- guarda só os 11 dígitos
    lower(trim(p_email)),
    left(trim(p_cidade), 120),
    left(trim(p_tipo), 40)
  )
  on conflict do nothing;  -- dedupe silencioso por CPF OU e-mail (privacidade)
end;
$$;

revoke all on function public.assinar(text, text, text, text, text) from public;
grant execute on function public.assinar(text, text, text, text, text) to anon;

-- 4. Contador público, sem expor as linhas.
create or replace function public.total_apoiadores()
returns bigint
language sql
security definer
set search_path = public
as $$
  select count(*) from public.apoiadores;
$$;

revoke all on function public.total_apoiadores() from public;
grant execute on function public.total_apoiadores() to anon;

-- Observação: isto protege privacidade e integridade básica. Para blindar o
-- contador contra bots (assinaturas falsas em massa), acople um CAPTCHA
-- (Cloudflare Turnstile) ou rate-limit via Edge Function antes de chamar assinar().

-- ---------------------------------------------------------------------------
-- MIGRAÇÃO — só se você JÁ rodou a versão anterior (sem CPF). Rode uma vez:
--
--   alter table public.apoiadores add column if not exists cpf text;
--   -- se já houver linhas, preencha o cpf delas antes dos passos abaixo
--   alter table public.apoiadores alter column cpf set not null;
--   create unique index if not exists apoiadores_cpf_key on public.apoiadores (cpf);
--   alter table public.apoiadores add constraint apoiadores_cpf_fmt check (cpf ~ '^[0-9]{11}$');
--   alter table public.apoiadores drop constraint if exists apoiadores_tipo_check;
--   alter table public.apoiadores add constraint apoiadores_tipo_check check (char_length(tipo) between 1 and 40);
--   -- em seguida rode o bloco 3 acima (drop + create da função assinar com CPF)
-- ---------------------------------------------------------------------------
