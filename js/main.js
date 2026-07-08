/* Prontuário Salva-Vidas — interação
   Regra de ouro (brief §4): animação serve à mensagem. */

const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (window.gsap) {
  gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin, MotionPathPlugin, SplitText);

  if (reduced) {
    staticFallback();
  } else {
    document.querySelector(".dor-stage").classList.add("js-anim");
    // espera as fontes para o SplitText não quebrar palavras no lugar errado
    document.fonts.ready.then(() => {
      heroIntro();
      dorScene();
      netflixReveal();
      ScrollTrigger.refresh();
    });
    loadHeroBackground();
  }
}

/* ---------- reduced motion: entrega o estado final, limpo ---------- */
function staticFallback() {
  // cena da dor congelada no momento da mensagem: dado barrado no cadeado
  gsap.set("#dor-path1", { stroke: "var(--barro)" });
  gsap.set("#dor-packet", {
    motionPath: { path: "#dor-path1", align: "#dor-path1", alignOrigin: [0.5, 0.5], end: 1 },
    fill: "var(--barro)",
    opacity: 0.6,
  });
  // captions ficam empilhadas e visíveis (CSS padrão), sem pin, sem scrub
}

/* ---------- 1. herói: ECG desenha, headline entra palavra a palavra ---------- */
function heroIntro() {
  const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

  // a assinatura: linha desenhando com o ponto de dado na ponta
  tl.from("#ecg-path", { drawSVG: 0, duration: 2.4, ease: "none" }, 0)
    .to("#ecg-dot", {
      motionPath: { path: "#ecg-path", align: "#ecg-path", alignOrigin: [0.5, 0.5] },
      duration: 2.4,
      ease: "none",
    }, 0);

  const split = SplitText.create("#hero-title", { type: "words", aria: "auto" });
  tl.from(split.words, { y: 36, autoAlpha: 0, duration: 0.8, stagger: 0.07 }, 0.35)
    .from(".hero-sub", { y: 24, autoAlpha: 0, duration: 0.7 }, "-=0.55")
    .from(".hero-cta", { y: 20, autoAlpha: 0, duration: 0.6 }, "-=0.5")
    .from(".hero-media", { y: 28, autoAlpha: 0, duration: 0.8 }, "-=0.6");

  // depois da entrada, o pulso continua vivo, discreto
  tl.add(() => {
    gsap.to("#ecg-dot", {
      motionPath: { path: "#ecg-path", align: "#ecg-path", alignOrigin: [0.5, 0.5] },
      duration: 9,
      ease: "none",
      repeat: -1,
      opacity: 0.7,
    });
  });
}

/* ---------- 2. a dor: cena autônoma — dispara ao entrar na tela ----------
   Sem pin, sem scrub: o scroll flui livre e a animação tem ritmo próprio. */
function dorScene() {
  const caps = gsap.utils.toArray(".scene-caption");
  const replay = document.querySelector(".scene-replay");

  const tl = gsap.timeline({
    scrollTrigger: { trigger: "#dor-scene", start: "top 62%", once: true },
    defaults: { ease: "power2.inOut" },
  });

  // ato 1 — a UPA registra tudo
  tl.to(caps[0], { autoAlpha: 1, duration: 0.5, ease: "power2.out" })
    .fromTo("#dor-path1", { drawSVG: "0% 0%" }, { drawSVG: "0% 35%", duration: 1.0 }, "<+0.15")
    .to("#dor-packet", { autoAlpha: 1, duration: 0.25, ease: "power1.out" }, "<")
    .to("#dor-packet", {
      motionPath: { path: "#dor-path1", align: "#dor-path1", alignOrigin: [0.5, 0.5], end: 0.35 },
      duration: 1.0,
    }, "<")

    // ato 2 — a transferência (o pacote acelera rumo ao cadeado)
    .to(caps[0], { autoAlpha: 0, duration: 0.3 }, "+=0.55")
    .to(caps[1], { autoAlpha: 1, duration: 0.3, ease: "power2.out" }, "<+0.1")
    .to("#dor-path1", { drawSVG: "0% 100%", duration: 1.1, ease: "power1.in" }, "<+0.2")
    .to("#dor-packet", {
      motionPath: { path: "#dor-path1", align: "#dor-path1", alignOrigin: [0.5, 0.5], start: 0.35, end: 1 },
      duration: 1.1,
      ease: "power1.in",
    }, "<")

    // ato 3 — o impacto
    .addLabel("hit")
    .to("#dor-lock", {
      keyframes: { x: [0, -6, 5, -4, 3, -2, 0] },
      duration: 0.55,
      ease: "power1.out",
    }, "hit")
    .to("#dor-packet", { fill: "#A8432E", scale: 1.45, transformOrigin: "50% 50%", duration: 0.14, ease: "power2.out" }, "hit")
    .to("#dor-path1", { stroke: "#A8432E", duration: 0.45 }, "hit")
    .fromTo("#dor-x", { autoAlpha: 0, scale: 0.4, transformOrigin: "50% 50%" },
      { autoAlpha: 1, scale: 1, duration: 0.35, ease: "back.out(2.5)" }, "hit+=0.12")
    .to("#dor-packet", { x: -30, scale: 1, autoAlpha: 0.5, duration: 0.55, ease: "power3.out" }, "hit+=0.14")
    .to(caps[1], { autoAlpha: 0, duration: 0.3 }, "hit+=0.15")
    .to(caps[2], { autoAlpha: 1, duration: 0.45, ease: "power2.out" }, "hit+=0.35")
    .to(replay, { autoAlpha: 1, duration: 0.4 }, "+=0.4");

  replay.addEventListener("click", () => {
    gsap.set(replay, { autoAlpha: 0 });
    tl.restart();
  });
}

/* ---------- analogia do Netflix: revelação simples, sem pin ---------- */
function netflixReveal() {
  gsap.from(".netflix-quote", {
    scrollTrigger: { trigger: ".netflix-quote", start: "top 82%" },
    y: 30, autoAlpha: 0, duration: 0.9, ease: "power3.out",
  });

  gsap.from(".stream-card", {
    scrollTrigger: { trigger: ".stream-cards", start: "top 82%" },
    y: 30, autoAlpha: 0, duration: 0.7, stagger: 0.15, ease: "power3.out",
  });

  gsap.from(".bar-fill", {
    scrollTrigger: { trigger: ".stream-cards", start: "top 78%" },
    scaleX: 0, duration: 1.1, stagger: 0.15, ease: "power3.inOut",
  });

  gsap.from(".dor-bridge", {
    scrollTrigger: { trigger: ".dor-bridge", start: "top 85%" },
    y: 24, autoAlpha: 0, duration: 0.8, ease: "power3.out",
  });
}

/* ---------- Three.js só no desktop, nunca protagonista ---------- */
function loadHeroBackground() {
  if (navigator.connection && navigator.connection.saveData) return;

  const mql = window.matchMedia("(min-width: 1024px)");
  let loaded = false;

  const loadOnce = () => {
    if (loaded || !mql.matches) return; // mobile fica com o fallback estático do CSS
    loaded = true;
    import("./hero-bg.js")
      .then((m) => m.initHeroBg(document.getElementById("hero-bg")))
      .catch(() => { /* CDN fora do ar → fallback estático já está no CSS */ });
  };

  loadOnce();
  mql.addEventListener("change", loadOnce);
}
