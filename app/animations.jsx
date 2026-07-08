"use client";

/* Prontuário Salva-Vidas — interação
   Regra de ouro (brief §4): animação serve à mensagem.
   Técnica das cenas de linha: uma timeline, tweens concorrentes
   (DrawSVG + MotionPath) com a mesma duração e ease "none". */

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { SplitText } from "gsap/SplitText";
import { Flip } from "gsap/Flip";

const VIRADA_CAPTIONS = {
  hoje: "Hoje: seus dados ficam presos onde foram criados.",
  depois: "Com a lei: seus dados chegam junto com você.",
};

export default function Animations() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin, MotionPathPlugin, SplitText, Flip);

    if (process.env.NODE_ENV !== "production") {
      window.gsap = gsap;
      window.ScrollTrigger = ScrollTrigger;
    }

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const cleanups = [];
    const listen = (el, ev, fn) => {
      el.addEventListener(ev, fn);
      cleanups.push(() => el.removeEventListener(ev, fn));
    };

    let viradaTouched = false;

    /* ---------- 4. a virada: Flip antes × depois ---------- */
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

    function initViradaToggle(animate) {
      document.querySelectorAll(".toggle-btn").forEach((btn) => {
        listen(btn, "click", () => {
          viradaTouched = true;
          setViradaState(btn.dataset.state, animate);
        });
      });
    }

    /* ---------- reduced motion: entrega o estado final, limpo ---------- */
    function staticFallback() {
      // jornada congelada no momento da mensagem: o dado barrado no muro
      gsap.set("#jor-dot", {
        motionPath: { path: "#jor-line2", align: "#jor-line2", alignOrigin: [0.5, 0.5], end: 1 },
        fill: "#A8432E",
        opacity: 0.55,
      });
      // a virada abre já na solução; a rota mostra o dado entregue
      setViradaState("depois", false);
      gsap.set("#route-dot", {
        motionPath: { path: "#route-path", align: "#route-path", alignOrigin: [0.5, 0.5], end: 1 },
        fill: "#7C9B76",
      });
    }

    /* ---------- 1. herói: ECG desenha, headline entra palavra a palavra ---------- */
    function heroIntro() {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

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

    /* ---------- 2. a jornada: a linha do ECG conta a história em 4 etapas ----
       As ilustrações (traço único) brotam dos picos quando o pacote passa;
       no muro, o dado fica — mas a linha (a vida) continua até o hospital. */
    function dorScene() {
      const caps = gsap.utils.toArray(".scene-caption");
      const replay = document.querySelector(".dor-stage .scene-replay");

      const D1 = 1.3, D2 = 1.6, D3 = 1.3; // durações dos três trechos da linha

      const tl = gsap.timeline({
        scrollTrigger: { trigger: "#dor-scene", start: "top 62%", once: true },
      });

      const draw = (sel, dur, pos, ease = "power1.inOut") =>
        tl.fromTo(sel, { drawSVG: "0% 0%" }, { drawSVG: "0% 100%", duration: dur, ease }, pos);
      const ride = (path, dur, pos) =>
        tl.to("#jor-dot", {
          motionPath: { path, align: path, alignOrigin: [0.5, 0.5] },
          duration: dur, ease: "none",
        }, pos);
      const tag = (sel, pos) =>
        tl.fromTo(sel, { autoAlpha: 0, y: 6 }, { autoAlpha: 1, y: 0, duration: 0.4, ease: "power2.out" }, pos);
      const caption = (idx, pos) => {
        tl.to(caps.filter((_, i) => i !== idx), { autoAlpha: 0, duration: 0.25 }, pos);
        tl.to(caps[idx], { autoAlpha: 1, duration: 0.35, ease: "power2.out", delay: 0.1 }, pos);
      };

      /* etapa 1 — entrada na UPA (pico a 44% do trecho 1) */
      tl.to(caps[0], { autoAlpha: 1, duration: 0.5, ease: "power2.out" })
        .addLabel("go1", "<+0.2")
        .to("#jor-dot", { autoAlpha: 1, duration: 0.2, ease: "none" }, "go1");
      draw("#jor-line1", D1, "go1", "none");
      ride("#jor-line1", D1, "go1");
      tl.addLabel("peak1", "go1+=0.58");
      draw("#il1-ground", 0.4, "peak1");
      draw("#il1-build", 0.5, "peak1+=0.3");
      draw("#il1-door", 0.35, "peak1+=0.7");
      draw("#il1-cross", 0.25, "peak1+=0.95");
      draw("#il1-human", 0.5, "peak1+=0.45");
      tag("#jor-tag1", "peak1+=0.3");

      /* etapa 2 — a ambulância (pico a 24% do trecho 2) */
      tl.addLabel("go2", `go1+=${D1 + 0.55}`);
      caption(1, "go2-=0.15");
      draw("#jor-line2", D2, "go2", "none");
      ride("#jor-line2", D2, "go2");
      tl.addLabel("peak2", "go2+=0.38");
      draw("#il2-road", 0.4, "peak2");
      draw("#il2-body", 0.5, "peak2+=0.3");
      draw("#il2-details", 0.4, "peak2+=0.65");
      draw("#il2-wheel1", 0.25, "peak2+=0.75");
      draw("#il2-wheel2", 0.25, "peak2+=0.85");
      tag("#jor-tag2", "peak2+=0.5");
      // a ambulância dirige pela estrada que a linha virou
      tl.to("#jor-amb", { x: 64, duration: 0.7, ease: "none" }, "go2+=1.15");

      /* etapa 3 — o muro sobe antes de o dado chegar */
      draw("#il3-wall", 0.35, "go2+=1.0");
      draw("#il3-bricks", 0.3, "go2+=1.2");
      tag("#jor-tag3", "go2+=1.25");
      tl.addLabel("hit", `go2+=${D2}`);
      caption(2, "hit");
      tl.to("#jor-et3", { keyframes: { x: [0, -5, 4, -3, 2, 0] }, duration: 0.45, ease: "power1.out" }, "hit")
        .to("#jor-dot", { fill: "#A8432E", scale: 1.45, transformOrigin: "50% 50%", duration: 0.12, ease: "power2.out" }, "hit")
        .to("#jor-dot", { x: "-=26", scale: 1, autoAlpha: 0.5, duration: 0.5, ease: "power3.out" }, "hit+=0.12");
      draw("#il3-x", 0.3, "hit+=0.1", "power2.out");

      /* etapa 4 — a vida continua sem o dado; o ciclo reinicia no hospital */
      tl.addLabel("go3", "hit+=0.9");
      caption(3, "go3-=0.1");
      draw("#jor-line3", D3, "go3", "none");
      tl.addLabel("peak4", "go3+=0.67");
      draw("#il4-ground", 0.4, "peak4");
      draw("#il4-build", 0.5, "peak4+=0.3");
      draw("#il4-door", 0.35, "peak4+=0.7");
      draw("#il4-cross", 0.25, "peak4+=0.95");
      draw("#il4-human", 0.5, "peak4+=0.45");
      draw("#il4-restart", 0.45, "peak4+=1.0", "power2.out");
      tag("#jor-tag4", "peak4+=0.5");
      // a seta de recomeço gira, inquieta
      tl.to("#il4-restart", { rotation: -35, transformOrigin: "50% 55%", duration: 0.5, ease: "power1.inOut", yoyo: true, repeat: 1 }, "peak4+=1.55")
        .to(replay, { autoAlpha: 1, duration: 0.4 }, "+=0.3");

      listen(replay, "click", () => {
        gsap.set(replay, { autoAlpha: 0 });
        gsap.set("#jor-dot", { scale: 1 });
        tl.restart();
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

    /* ---------- analogia do Netflix: revelação simples ---------- */
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

      listen(replay, "click", () => {
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

    /* ---------- Three.js só no desktop, nunca protagonista ---------- */
    function loadHeroBackground() {
      if (navigator.connection && navigator.connection.saveData) return;

      const mql = window.matchMedia("(min-width: 1024px)");
      let loaded = false;

      const loadOnce = () => {
        if (loaded || !mql.matches) return; // mobile fica com o fallback estático do CSS
        loaded = true;
        import("./hero-bg")
          .then((m) => m.initHeroBg(document.getElementById("hero-bg")))
          .catch(() => { /* sem WebGL/erro de rede → fallback estático já está no CSS */ });
      };

      loadOnce();
      listen(mql, "change", loadOnce);
    }

    /* ---------- boot ---------- */
    const ctx = gsap.context(() => {
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
    });

    return () => {
      ctx.revert();
      cleanups.forEach((fn) => fn());
      document.querySelector(".dor-stage")?.classList.remove("js-anim");
      document.getElementById("route-scene")?.classList.remove("js-anim");
    };
  }, []);

  return null;
}
