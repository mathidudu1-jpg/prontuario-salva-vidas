# Prontuário Salva-Vidas

Landing page da campanha cívica por uma lei de interoperabilidade de dados de saúde (UPA → hospital), contra o "atendimento às cegas" na transferência de pacientes.

**Domínio:** prontuariosalvavidas.com.br

## Stack

- HTML + CSS + JS puro, sem build — mobile-first
- [GSAP 3.13](https://gsap.com) via CDN: ScrollTrigger, DrawSVG, MotionPath, SplitText (todos gratuitos)
- Three.js (fundo de nós do herói) — carregado dinamicamente **só em desktop**, com fallback estático e respeito a `prefers-reduced-motion`
- Fontes: Fraunces (display) · Inter (corpo) · JetBrains Mono (dados)

## Rodar local

```bash
npm install   # só na primeira vez (instala o `serve`)
npm run dev
```

Abra http://localhost:3300. (Alternativa sem install: `npx serve . -l 3300`.)

## Deploy (Vercel)

Site 100% estático — **não há build**. Na Vercel:

1. Importe o repositório (`vercel.com/new` → Import Git Repository).
2. Framework Preset: **Other**. Não configure Build Command nem Output Directory (deixe vazio — a raiz é servida como está).
3. Deploy. O `vercel.json` já cuida de `cleanUrls`.

Depois, aponte o domínio `prontuariosalvavidas.com.br` no painel da Vercel (Settings → Domains).

## Status

- [x] 1. Herói — ECG desenhando + SplitText + fundo Three.js
- [x] 2. A dor — cena pinada UPA → cadeado + analogia do Netflix
- [ ] 3. Os três desperdícios (count-up)
- [ ] 4. A virada — antes × depois (Flip)
- [ ] 5. Como funciona — UPA → API·FHIR → HC (DrawSVG + MotionPath)
- [ ] 6. "Mas isso já não existe?" (RNDS)
- [ ] 7. Segurança e LGPD
- [ ] 8. O rosto humano (foto + parallax)
- [ ] 9. Chamada final

## Assets pendentes

- [ ] Vídeo de reels (slot no herói: `.hero-media`)
- [ ] Foto de idoso feliz/cuidado (seção 8)
- [ ] Números do dossiê com fonte citada
