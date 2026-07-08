/* Prontuário Salva-Vidas — interação
   Regra de ouro (brief §4): animação serve à mensagem. */

const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (window.gsap) {
  gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin, MotionPathPlugin, SplitText, Flip);

  if (reduced) {
    staticFallback();
    initViradaToggle(false);
  } else {
    document.querySelector(".dor-stage").classList.add("js-anim");
    initViradaToggle(true);
    // espera as fontes para o SplitText não quebrar palavras no lugar errado
    document.fonts.ready.then(() => {
      heroIntro();
      dorScene();
      netflixReveal();
      wasteCounters();
      viradaAutoPlay();
      routeScene();
      legoReveal();
      dicionarioReveal();
      lgpdReveal();
      rostoParallax();
      finalScene();
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
  // a virada abre já na solução; a rota mostra o dado entregue
  setViradaState("depois", false);
  gsap.set("#route-dot", {
    motionPath: { path: "#route-path", align: "#route-path", alignOrigin: [0.5, 0.5], end: 1 },
    fill: "#7C9B76",
  });
  // captions e demais seções ficam no estado final (CSS padrão), sem tweens
}

/* ---------- 4. a virada: Flip antes × depois ---------- */

const VIRADA_CAPTIONS = {
  hoje: "Hoje: seus dados ficam presos onde foram criados.",
  depois: "Com a lei: seus dados chegam junto com você.",
};

function setViradaState(state, animate) {
  const stage = document.getElementById("virada-stage");
  const target = document.getElementById(state === "depois" ? "slot-destino" : "slot-origem");
  const chips = gsap.utils.toArray(".data-chip");
  const caption = document.getElementById("virada-caption");

  const apply = () => {
    stage.dataset.state = state;
    chips.forEach((c) => target.appendChild(c));
    caption.textContent = VIRADA_CAPTIONS[state];
    document.querySelectorAll(".toggle-btn").forEach((b) => {
      const active = b.dataset.state === state;
      b.classList.toggle("is-active", active);
      b.setAttribute("aria-pressed", String(active));
    });
  };

  if (!animate) {
    apply();
    gsap.set("#ecg-jagged", { autoAlpha: state === "hoje" ? 1 : 0 });
    gsap.set("#ecg-smooth", { autoAlpha: state === "depois" ? 1 : 0 });
    return;
  }

  const flipState = Flip.getState(chips, { props: "borderColor,color" });
  apply();
  Flip.from(flipState, { duration: 0.9, ease: "power3.inOut", stagger: 0.07, absolute: true });

  // a linha tremida (hoje) vira contínua e sálvia (depois)
  if (state === "depois") {
    gsap.to("#ecg-jagged", { autoAlpha: 0, duration: 0.35 });
    gsap.set("#ecg-smooth", { autoAlpha: 1 });
    gsap.fromTo("#ecg-smooth", { drawSVG: "0% 0%" }, { drawSVG: "0% 100%", duration: 1.1, ease: "power2.inOut" });
  } else {
    gsap.to("#ecg-smooth", { autoAlpha: 0, duration: 0.3 });
    gsap.to("#ecg-jagged", { autoAlpha: 1, duration: 0.4 });
  }
}

let viradaTouched = false;

function initViradaToggle(animate) {
  document.querySelectorAll(".toggle-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      viradaTouched = true;
      setViradaState(btn.dataset.state, animate);
    });
  });
}

function viradaAutoPlay() {
  // a revelação acontece sozinha, uma vez, se o usuário ainda não mexeu
  ScrollTrigger.create({
    trigger: "#virada-stage",
    start: "top 65%",
    once: true,
    onEnter: () => gsap.delayedCall(0.9, () => {
      if (!viradaTouched) setViradaState("depois", true);
    }),
  });
}

/* ---------- 3. desperdícios: entrada + count-up ---------- */
function wasteCounters() {
  gsap.from(".waste-card", {
    y: 30, autoAlpha: 0, stagger: 0.14, duration: 0.7, ease: "power3.out",
    scrollTrigger: { trigger: ".waste-cards", start: "top 80%", once: true },
  });

  gsap.utils.toArray(".count").forEach((el) => {
    gsap.from(el, {
      textContent: 0,
      snap: { textContent: 1 },
      duration: 1.6,
      ease: "power2.out",
      scrollTrigger: { trigger: ".waste-cards", start: "top 80%", once: true },
    });
  });
}

/* ---------- 5. como funciona: rota UPA → API·FHIR → HOSPITAL ---------- */
function routeScene() {
  const scene = document.getElementById("route-scene");
  scene.classList.add("js-anim");
  const replay = scene.querySelector(".route-replay");

  const tl = gsap.timeline({
    scrollTrigger: { trigger: scene, start: "top 70%", once: true },
  });

  tl.from("#node-upa", { autoAlpha: 0, y: 16, duration: 0.4, ease: "power2.out" })
    .from("#node-fhir", { autoAlpha: 0, y: 16, duration: 0.4, ease: "power2.out" }, "<0.12")
    .from("#node-hc", { autoAlpha: 0, y: 16, duration: 0.4, ease: "power2.out" }, "<0.12")
    .fromTo("#route-path", { drawSVG: "0% 0%" }, { drawSVG: "0% 100%", duration: 1.7, ease: "power1.inOut" }, "+=0.15")
    .to("#route-dot", { autoAlpha: 1, duration: 0.2, ease: "none" }, "<")
    .to("#route-dot", {
      motionPath: { path: "#route-path", align: "#route-path", alignOrigin: [0.5, 0.5] },
      duration: 1.7,
      ease: "power1.inOut",
    }, "<")
    // o dado passa pela API: o chip pulsa
    .to("#node-fhir rect", { scale: 1.07, transformOrigin: "50% 50%", duration: 0.16, yoyo: true, repeat: 1, ease: "power1.inOut" }, "<0.72")
    // chegada: o hospital acende
    .to("#node-hc rect", { stroke: "#7C9B76", duration: 0.35 }, ">0.35")
    .to("#route-dot", { fill: "#7C9B76", scale: 1.5, transformOrigin: "50% 50%", duration: 0.3, ease: "back.out(2)" }, "<")
    .to(replay, { autoAlpha: 1, duration: 0.35 }, "+=0.25");

  replay.addEventListener("click", () => {
    gsap.set(replay, { autoAlpha: 0 });
    tl.restart();
  });
}

/* ---------- 5b. blocos FHIR encaixando ---------- */
function legoReveal() {
  gsap.from(".lego-block", {
    y: -38,
    autoAlpha: 0,
    rotation: (i) => (i % 2 ? 5 : -5),
    stagger: 0.13,
    duration: 0.6,
    ease: "back.out(1.6)",
    scrollTrigger: { trigger: "#lego-row", start: "top 82%", once: true },
  });
}

/* ---------- 5c. dicionário comum: palavras → um código ---------- */
function dicionarioReveal() {
  const tl = gsap.timeline({
    scrollTrigger: { trigger: "#dic-stage", start: "top 82%", once: true },
  });

  tl.from(".dic-word", { autoAlpha: 0, y: 14, stagger: 0.14, duration: 0.5, ease: "power2.out" })
    .from(".dic-arrow", { autoAlpha: 0, x: -8, duration: 0.35, ease: "power2.out" }, "-=0.1")
    // as palavras se inclinam para o código, e o código "assenta"
    .to(".dic-word", { x: 6, duration: 0.35, stagger: 0.05, ease: "power2.inOut" }, "<")
    .from(".dic-code", { autoAlpha: 0, scale: 0.6, transformOrigin: "50% 50%", duration: 0.5, ease: "back.out(1.8)" }, "<0.15")
    .to(".dic-word", { x: 0, duration: 0.4, ease: "power2.out" }, "<0.3");
}

/* ---------- 7. LGPD: princípios + trilha de auditoria ---------- */
function lgpdReveal() {
  gsap.from(".lgpd-list li", {
    x: -20, autoAlpha: 0, stagger: 0.12, duration: 0.5, ease: "power2.out",
    scrollTrigger: { trigger: ".lgpd-list", start: "top 82%", once: true },
  });

  const tl = gsap.timeline({
    scrollTrigger: { trigger: "#audit-card", start: "top 82%", once: true },
  });
  tl.from("#shield-path", { drawSVG: 0, duration: 0.7, ease: "power1.inOut" })
    .from("#shield-check", { drawSVG: 0, duration: 0.35, ease: "power2.out" })
    .from(".audit-log li", { x: 16, autoAlpha: 0, stagger: 0.13, duration: 0.45, ease: "power2.out" }, "-=0.1");
}

/* ---------- 8. rosto humano: parallax suave ---------- */
function rostoParallax() {
  gsap.fromTo(".rosto-inner", { yPercent: -7 }, {
    yPercent: 7,
    ease: "none",
    scrollTrigger: { trigger: ".rosto-media", start: "top bottom", end: "bottom top", scrub: true },
  });

  gsap.from(".rosto-quote p", {
    y: 30, autoAlpha: 0, duration: 0.8, ease: "power3.out",
    scrollTrigger: { trigger: ".rosto-quote", start: "top 88%", once: true },
  });
}

/* ---------- 9. chamada final: a linha contínua e viva ---------- */
function finalScene() {
  const tl = gsap.timeline({
    scrollTrigger: { trigger: ".final", start: "top 75%", once: true },
  });

  tl.from("#final-ecg-path", { drawSVG: 0, duration: 2, ease: "none" })
    .to("#final-ecg-dot", {
      motionPath: { path: "#final-ecg-path", align: "#final-ecg-path", alignOrigin: [0.5, 0.5] },
      duration: 2,
      ease: "none",
    }, "<")
    .add(() => {
      gsap.to("#final-ecg-dot", {
        motionPath: { path: "#final-ecg-path", align: "#final-ecg-path", alignOrigin: [0.5, 0.5] },
        duration: 10,
        ease: "none",
        repeat: -1,
        opacity: 0.75,
      });
    });

  gsap.from(".final-inner > *", {
    y: 24, autoAlpha: 0, stagger: 0.1, duration: 0.7, ease: "power3.out",
    scrollTrigger: { trigger: ".final-inner", start: "top 82%", once: true },
  });
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
