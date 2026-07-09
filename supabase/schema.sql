-- Prontuário Salva-Vidas — assinaturas do manifesto
-- Rode este script no Supabase (SQL Editor) do projeto novo.

-- 1. Tabela de apoiadores (com validação de tamanho e de tipo no servidor)
create table if not exists public.apoiadores (
  id         uuid primary key default gen_random_uuid(),
  nome       text not null check (char_length(nome) between 1 and 120),
  email      text not null unique check (char_length(email) between 3 and 200),
  cidade     text not null check (char_length(cidade) between 1 and 120),
  tipo       text not null check (tipo in ('cidadao','profissional','gestor','parlamentar','jornalista')),
  criado_em  timestamptz not null default now()
);

-- 2. Liga o Row Level Security. Sem policies, todo acesso DIRETO (select/insert/
--    update/delete) fica negado ao papel anon. Nome e e-mail ficam protegidos.
alter table public.apoiadores enable row level security;

-- 3. Assinatura via função (SECURITY DEFINER). A função roda como dono e ignora
--    o RLS, mas só faz o insert. Retorna sempre void — mesmo para e-mail repetido
--    (on conflict do nothing) — para não revelar quem já assinou (privacidade).
create or replace function public.assinar(
  p_nome text, p_email text, p_cidade text, p_tipo text
)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.apoiadores (nome, email, cidade, tipo)
  values (
    left(trim(p_nome), 120),
    lower(trim(p_email)),
    left(trim(p_cidade), 120),
    p_tipo
  )
  on conflict (email) do nothing;
end;
$$;

revoke all on function public.assinar(text, text, text, text) from public;
grant execute on function public.assinar(text, text, text, text) to anon;

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
