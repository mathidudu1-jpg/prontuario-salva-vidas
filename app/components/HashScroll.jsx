"use client";

import { useEffect } from "react";

/**
 * Faz os links âncora chegarem ao alvo mesmo vindos de outra página
 * (ex.: /projeto-de-lei → /#assinar).
 *
 * Sozinho, o salto nativo do navegador não sobrevive: o App Router restaura o
 * scroll para o topo quando hidrata, e a posição do alvo ainda muda enquanto
 * fontes e mídias assentam. Aqui reaplicamos o âncora em intervalos curtos até
 * ele ficar estável — e paramos assim que a pessoa encostar na rolagem.
 */
const TOLERANCIA = 4;    // px de folga para considerar que chegamos
const INTERVALO = 100;   // ms entre as correções
const LIMITE = 3000;     // ms de janela total (cobre hidratação lenta)

export default function HashScroll() {
  useEffect(() => {
    const hash = window.location.hash;
    if (!hash || hash.length < 2) return;

    let id;
    try {
      id = decodeURIComponent(hash.slice(1));
    } catch {
      id = hash.slice(1);
    }

    let parado = false;
    let acertosSeguidos = 0;
    const inicio = Date.now();

    // se a pessoa tomar o controle da rolagem, saímos do caminho na hora
    const desistir = () => {
      parado = true;
      clearInterval(timer);
    };
    const opcoes = { passive: true, once: true };
    window.addEventListener("wheel", desistir, opcoes);
    window.addEventListener("touchstart", desistir, opcoes);
    window.addEventListener("keydown", desistir, { once: true });

    const corrigir = () => {
      if (parado) return;

      const alvo = document.getElementById(id);
      if (!alvo) return; // pode ainda não ter sido renderizado

      const distancia = alvo.getBoundingClientRect().top - pegarMargem(alvo);

      if (Math.abs(distancia) <= TOLERANCIA) {
        // duas medições seguidas no lugar certo = layout estável, podemos sair
        if (++acertosSeguidos >= 2) desistir();
        return;
      }

      acertosSeguidos = 0;
      // "instant": é a chegada na página; um scroll animado atravessaria o site
      // inteiro. scrollIntoView respeita o scroll-margin-top do alvo, então ele
      // para logo abaixo do header fixo.
      alvo.scrollIntoView({ behavior: "instant", block: "start" });

      if (Date.now() - inicio > LIMITE) desistir();
    };

    // setInterval (e não requestAnimationFrame) porque rAF não roda em aba em
    // segundo plano, e o link pode muito bem ser aberto numa aba de fundo.
    const timer = setInterval(corrigir, INTERVALO);
    corrigir();
    document.fonts?.ready?.then(corrigir);

    return () => {
      parado = true;
      clearInterval(timer);
      window.removeEventListener("wheel", desistir);
      window.removeEventListener("touchstart", desistir);
      window.removeEventListener("keydown", desistir);
    };
  }, []);

  return null;
}

// o alvo pode declarar seu próprio scroll-margin-top (o header fixo cobre o topo)
function pegarMargem(el) {
  const valor = parseFloat(getComputedStyle(el).scrollMarginTop);
  return Number.isFinite(valor) ? valor : 0;
}
