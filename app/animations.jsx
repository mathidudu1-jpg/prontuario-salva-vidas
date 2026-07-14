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
  hoje: "Hoje: teu dado bate na parede e volta.",
  depois: "Com a lei: teu dado chega junto com você.",
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

    /* ---------- 4. a virada: dois modos animados ----------
       Hoje: o dado tenta cruzar, bate na parede e volta pra origem (barro).
       Com a lei: o dado surge na UPA, é transferido e fica verde no hospital. */
    function setViradaState(state, animate) {
      const stage = document.getElementById("virada-stage");
      const origem = document.getElementById("slot-origem");
      const destino = document.getElementById("slot-destino");
      const chips = gsap.utils.toArray(".data-chip");
      const caption = document.getElementById("virada-caption");
      const isDesktop = window.matchMedia("(min-width: 768px)").matches;

      const applyMeta = () => {
        stage.dataset.state = state;
        caption.textContent = VIRADA_CAPTIONS[state];
        document.querySelectorAll(".toggle-btn").forEach((b) => {
          const active = b.dataset.state === state;
          b.classList.toggle("is-active", active);
          b.setAttribute("aria-pressed", String(active));
        });
      };

      // estático (sem JS de animação): posiciona no slot certo
      if (!animate) {
        chips.forEach((c) => (state === "depois" ? destino : origem).appendChild(c));
        applyMeta();
        gsap.set("#ecg-jagged", { autoAlpha: state === "hoje" ? 1 : 0 });
        gsap.set("#ecg-smooth", { autoAlpha: state === "depois" ? 1 : 0 });
        return;
      }

      const inDestino = destino.contains(chips[0]);

      if (state === "depois") {
        // COM A LEI — os cards surgem na UPA e são transferidos com sucesso
        chips.forEach((c) => origem.appendChild(c)); // garante origem (snap se reexecutou)
        gsap.set(chips, { clearProps: "x,scale,opacity" });
        applyMeta();

        const tl = gsap.timeline();
        // 1) surgem/pulsam na UPA
        tl.fromTo(chips, { scale: 0.7, autoAlpha: 0.45 },
          { scale: 1, autoAlpha: 1, duration: 0.45, stagger: 0.08, ease: "back.out(2)" });
        // 2) transferência com sucesso: Flip origem → destino (ficam verdes ao chegar)
        tl.add(() => {
          const s = Flip.getState(chips, { props: "borderColor,color" });
          chips.forEach((c) => destino.appendChild(c));
          Flip.from(s, { duration: 0.95, ease: "power3.inOut", stagger: 0.09, absolute: true });
        }, "+=0.2");
        // 3) a linha tremida vira contínua e sálvia
        gsap.to("#ecg-jagged", { autoAlpha: 0, duration: 0.35, delay: 0.6 });
        gsap.set("#ecg-smooth", { autoAlpha: 1, delay: 0.6 });
        gsap.fromTo("#ecg-smooth", { drawSVG: "0% 0%" },
          { drawSVG: "0% 100%", duration: 1.1, ease: "power2.inOut", delay: 0.7 });
        return;
      }

      // HOJE — o dado tenta cruzar e é barrado
      const playBounce = () => {
        const lunge = isDesktop ? 46 : 22;
        gsap.timeline()
          .to(chips, { x: lunge, duration: 0.5, ease: "power2.in", stagger: 0.05 })
          .set(".virada-wall", { autoAlpha: 1 }, ">-0.06")
          .fromTo(".virada-wall", { scaleX: 1 }, { scaleX: 2.2, duration: 0.12, yoyo: true, repeat: 1, ease: "power1.out", transformOrigin: "50% 50%" }, "<")
          .to(chips, { x: 0, duration: 0.85, ease: "back.out(1.7)", stagger: 0.05 }, ">-0.02")
          .to(".virada-wall", { autoAlpha: 0, duration: 0.5 }, "<0.25");
        gsap.to("#ecg-smooth", { autoAlpha: 0, duration: 0.3 });
        gsap.to("#ecg-jagged", { autoAlpha: 1, duration: 0.4 });
      };

      if (inDestino) {
        // vinha do "com a lei": traz os cards de volta pra origem, depois a tentativa
        const s = Flip.getState(chips, { props: "borderColor,color" });
        chips.forEach((c) => origem.appendChild(c));
        applyMeta();
        Flip.from(s, { duration: 0.7, ease: "power3.inOut", stagger: 0.06, absolute: true, onComplete: playBounce });
      } else {
        applyMeta();
        playBounce();
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
      // telinha "continuar assistindo" mostra o play em repouso
      gsap.set(".tv-play .ic-pause", { autoAlpha: 0 });
      gsap.set(".tv-play .ic-play", { autoAlpha: 1 });
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

      const D1 = 2.0, D2 = 2.8, D3 = 2.0; // desenho de cada trecho (lento, p/ ler)
      const HOLD = 1.7;                    // pausa de leitura entre as etapas

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
        tl.to(caps.filter((_, i) => i !== idx), { autoAlpha: 0, duration: 0.3 }, pos);
        tl.to(caps[idx], { autoAlpha: 1, duration: 0.4, ease: "power2.out", delay: 0.15 }, pos);
      };

      /* etapa 1 — entrada na UPA */
      tl.to(caps[0], { autoAlpha: 1, duration: 0.5, ease: "power2.out" });
      tl.addLabel("go1", ">-=0.1");
      tl.to("#jor-dot", { autoAlpha: 1, duration: 0.2, ease: "none" }, "go1");
      draw("#jor-line1", D1, "go1", "none");
      ride("#jor-line1", D1, "go1");
      tl.addLabel("p1", "go1+=0.7");
      draw("#il1-ground", 0.5, "p1");
      draw("#il1-build", 0.6, "p1+=0.35");
      draw("#il1-door", 0.4, "p1+=0.85");
      draw("#il1-cross", 0.3, "p1+=1.15");
      draw("#il1-human", 0.6, "p1+=0.55");
      tag("#jor-tag1", "p1+=0.4");
      tl.addLabel("go2", `go1+=${D1 + HOLD}`); // pausa de leitura

      /* etapa 2 — a ambulância */
      caption(1, "go2-=0.2");
      draw("#jor-line2", D2, "go2", "none");
      ride("#jor-line2", D2, "go2");
      tl.addLabel("p2", "go2+=0.55");
      draw("#il2-road", 0.5, "p2");
      draw("#il2-body", 0.6, "p2+=0.35");
      draw("#il2-details", 0.45, "p2+=0.8");
      draw("#il2-wheel1", 0.3, "p2+=0.9");
      draw("#il2-wheel2", 0.3, "p2+=1.05");
      tag("#jor-tag2", "p2+=0.6");
      // a ambulância dirige pela estrada que a linha virou
      tl.to("#jor-amb", { x: 64, duration: 1.2, ease: "none" }, `go2+=${(D2 * 0.5).toFixed(2)}`);

      /* etapa 3 — o muro sobe antes de o dado chegar */
      tl.addLabel("wall", `go2+=${D2 - 0.9}`);
      draw("#il3-wall", 0.45, "wall");
      draw("#il3-bricks", 0.4, "wall+=0.25");
      tag("#jor-tag3", "wall+=0.3");
      tl.addLabel("hit", `go2+=${D2}`);
      caption(2, "hit");
      tl.to("#jor-et3", { keyframes: { x: [0, -5, 4, -3, 2, 0] }, duration: 0.5, ease: "power1.out" }, "hit")
        .to("#jor-dot", { fill: "#A8432E", scale: 1.45, transformOrigin: "50% 50%", duration: 0.14, ease: "power2.out" }, "hit")
        .to("#jor-dot", { x: "-=26", scale: 1, autoAlpha: 0.5, duration: 0.55, ease: "power3.out" }, "hit+=0.14");
      draw("#il3-x", 0.35, "hit+=0.12", "power2.out");
      tl.addLabel("go3", `hit+=${HOLD}`); // pausa de leitura

      /* etapa 4 — o hospital grande: você é atendido, mas sem histórico */
      caption(3, "go3-=0.2");
      draw("#jor-line3", D3, "go3", "none");
      tl.addLabel("p4", "go3+=0.7");
      draw("#il4-ground", 0.5, "p4");
      draw("#il4-build", 0.7, "p4+=0.35");
      draw("#il4-roof", 0.5, "p4+=0.9");
      draw("#il4-cross", 0.3, "p4+=1.2");
      draw("#il4-bed", 0.6, "p4+=0.75");
      draw("#il4-phead", 0.3, "p4+=1.25");
      draw("#il4-patient", 0.5, "p4+=1.35");
      draw("#il4-doctor circle", 0.3, "p4+=1.65");
      draw("#il4-doctor path", 0.6, "p4+=1.8");
      tag("#jor-tag4", "p4+=0.5");
      // a interrogação surge sobre o paciente: chega sem histórico
      tl.fromTo("#il4-q", { autoAlpha: 0, scale: 0.5, transformOrigin: "50% 50%" },
        { autoAlpha: 1, scale: 1, duration: 0.5, ease: "back.out(2)" }, "p4+=2.3");
      tl.to("#il4-q", { y: -4, duration: 0.6, ease: "power1.inOut", yoyo: true, repeat: 3 }, "p4+=2.8");
      tl.to(replay, { autoAlpha: 1, duration: 0.4 }, ">+0.3");

      listen(replay, "click", () => {
        gsap.set(replay, { autoAlpha: 0 });
        gsap.set("#jor-dot", { scale: 1 });
        gsap.set("#il4-q", { y: 0 });
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
      // once:true (como as demais revelações do arquivo): sem isso, o padrão
      // do ScrollTrigger reverte a animação (esconde de novo) se o scroll
      // passar do gatilho e voltar — fazendo a seção "sumir" ao rolar de volta.
      gsap.from(".netflix-quote", {
        scrollTrigger: { trigger: ".netflix-quote", start: "top 82%", once: true },
        y: 30, autoAlpha: 0, duration: 0.9, ease: "power3.out",
      });

      gsap.from(".stream-card", {
        scrollTrigger: { trigger: ".stream-cards", start: "top 82%", once: true },
        y: 30, autoAlpha: 0, duration: 0.7, stagger: 0.15, ease: "power3.out",
      });

      gsap.from(".bar-fill", {
        scrollTrigger: { trigger: ".stream-cards", start: "top 78%", once: true },
        scaleX: 0, duration: 1.1, stagger: 0.15, ease: "power3.inOut",
      });

      gsap.from(".dor-bridge", {
        scrollTrigger: { trigger: ".dor-bridge", start: "top 85%", once: true },
        y: 24, autoAlpha: 0, duration: 0.8, ease: "power3.out",
      });
    }

    /* ---------- as duas telinhas: o vídeo retoma × a vida recomeça ---------- */
    function streamingPlayers() {
      // GO — "continuar assistindo": despausa e o vídeo segue de onde parou
      gsap.set(".tv-play .ic-pause", { autoAlpha: 1 });
      gsap.set(".tv-play .ic-play", { autoAlpha: 0 });

      const go = gsap.timeline({ repeat: -1, repeatDelay: 0.7 });
      go.to(".tv-card--go .tv-play", { scale: 0.85, duration: 0.14, ease: "power2.in" }, 0.7)
        .to(".tv-card--go .tv-play", { scale: 1, duration: 0.32, ease: "back.out(3)" })
        .to(".tv-card--go .ic-pause", { autoAlpha: 0, duration: 0.18 }, "<")
        .to(".tv-card--go .ic-play", { autoAlpha: 1, duration: 0.18 }, "<")
        // o vídeo retoma: o scrubber avança de onde parou
        .to(".tv-scrubber-fill", { width: "85%", duration: 1.7, ease: "power1.inOut" }, ">-0.05")
        .to(".tv-playhead", { left: "85%", duration: 1.7, ease: "power1.inOut" }, "<")
        .to({}, { duration: 0.5 })
        // volta ao ponto de pausa para repetir a ideia
        .set(".tv-card--go .ic-play", { autoAlpha: 0 })
        .set(".tv-card--go .ic-pause", { autoAlpha: 1 })
        .set(".tv-scrubber-fill", { width: "62%" })
        .set(".tv-playhead", { left: "62%" });

      // STOP — "recomeçar do zero": o humano refaz o mesmo caminho, sempre do início
      const stop = gsap.timeline({ repeat: -1 });
      stop.set("#tv-walker", { x: 0, autoAlpha: 1 })
        .set("#tv-reset", { autoAlpha: 0, rotation: 0, transformOrigin: "50% 50%" })
        .to("#tv-walker", { x: 96, duration: 1.6, ease: "none" })
        .to("#tv-reset", { autoAlpha: 0.9, rotation: -300, duration: 0.55, ease: "power2.in" }, ">-0.05")
        .to("#tv-walker", { autoAlpha: 0, duration: 0.2 }, "<0.2")
        .set("#tv-walker", { x: 0 })
        .to("#tv-walker", { autoAlpha: 1, duration: 0.25 })
        .to("#tv-reset", { autoAlpha: 0, duration: 0.3 }, "<")
        .to({}, { duration: 0.4 });
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

    /* ---------- revelações genéricas dos blocos novos ---------- */
    function genericReveals() {
      gsap.utils.toArray("[data-reveal]").forEach((el) => {
        gsap.from(el, {
          y: 26, autoAlpha: 0, duration: 0.7, ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 85%", once: true },
        });
      });
      gsap.utils.toArray("[data-reveal-group]").forEach((grp) => {
        gsap.from(grp.children, {
          y: 26, autoAlpha: 0, duration: 0.6, stagger: 0.1, ease: "power3.out",
          scrollTrigger: { trigger: grp, start: "top 84%", once: true },
        });
      });
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
          streamingPlayers();
          wasteCounters();
          viradaAutoPlay();
          routeScene();
          legoReveal();
          dicionarioReveal();
          lgpdReveal();
          genericReveals();
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
