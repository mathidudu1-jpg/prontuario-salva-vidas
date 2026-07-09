# Prontuário Salva-Vidas

Landing page da campanha cívica por uma lei de interoperabilidade de dados de saúde (UPA → hospital), contra o "atendimento às cegas" na transferência de pacientes.

**Domínio:** prontuariosalvavidas.com.br

## Stack

- **Next.js 15** (App Router, JavaScript) — mobile-first
- [GSAP 3.13](https://gsap.com) via npm: ScrollTrigger, DrawSVG, MotionPath, SplitText, Flip (todos gratuitos)
- Three.js (fundo de nós do herói) — importado dinamicamente **só em desktop**, com fallback estático e respeito a `prefers-reduced-motion`
- Fontes via `next/font`: Fraunces (display) · Inter (corpo) · JetBrains Mono (dados)

## Rodar local

O projeto vive no OneDrive (caminho com acentos); use a junction para desenvolvimento:

```bash
cd C:\prontuario-dev   # junction → a pasta real do repositório
npm install            # só na primeira vez
npm run dev            # http://localhost:3300
```

## Deploy (Vercel)

1. Importe o repositório (`vercel.com/new`) — o preset **Next.js** é detectado automaticamente.
2. Nenhuma configuração extra: build padrão (`next build`).
3. Depois, aponte o domínio `prontuariosalvavidas.com.br` (Settings → Domains).

## Manifesto (assinaturas) — configurar o Supabase

O formulário de assinaturas usa o Supabase. Sem as chaves configuradas, o site
funciona normalmente e o formulário mostra um aviso de "em breve" (não quebra).

1. Crie um projeto em [supabase.com](https://supabase.com).
2. No **SQL Editor**, rode o script [`supabase/schema.sql`](supabase/schema.sql).
   Ele cria a tabela `apoiadores`, liga o RLS (só permite inserção pública) e
   cria a função `total_apoiadores()` para o contador (sem expor os dados).
3. Em **Project Settings → API**, copie a **Project URL** e a chave **anon public**.
4. No Vercel (**Project Settings → Environment Variables**), adicione:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`

   Localmente, crie um `.env.local` com as mesmas duas linhas (ver `.env.example`).
5. Redeploy. O contador "X pessoas já apoiam" passa a funcionar.

## Status

- [x] 1. Herói — ECG desenhando + SplitText + fundo Three.js
- [x] 2. A dor — jornada sobre a linha do ECG + analogia do Netflix (faixa escura)
- [x] 3. Os três desperdícios (count-up)
- [x] 4. A virada — antes × depois (Flip + toggle)
- [x] 5. Como funciona — UPA → API·FHIR → HC (DrawSVG + MotionPath) + blocos FHIR + dicionário
- [x] 6. "Mas isso já não existe?" (RNDS) — conteúdo provisório, trocar pelo guia
- [x] 7. Segurança e LGPD — trilha de auditoria
- [x] 8. O rosto humano — placeholder + parallax
- [x] 9. Chamada final
- [ ] Jornada ilustrada: etapa 1 (UPA) feita · etapas 2–4 (ambulância, parede, recomeço) em validação

## Assets pendentes

- [ ] Vídeo de reels (slot no herói: `.hero-media`)
- [ ] Foto de idoso feliz/cuidado (seção 8)
- [ ] Números do dossiê com fonte citada (seção 3)
- [ ] PDF do dossiê e texto do PL (seção 9)
