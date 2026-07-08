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
