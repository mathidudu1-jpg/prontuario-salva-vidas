"use client";

import { useRef, useState } from "react";

/**
 * Vídeo principal do herói. A capa (poster) fica na tela com um botão de play
 * vermelho até a pessoa clicar; então o vídeo começa do zero, com os controles
 * nativos. preload="none": a home só paga a capa; o mp4 só baixa ao dar play.
 */
export default function HeroVideo() {
  const [tocando, setTocando] = useState(false);
  const ref = useRef(null);

  function play() {
    setTocando(true);
    // depois de trocar o estado, dá play do início e move o foco para o vídeo
    requestAnimationFrame(() => {
      if (ref.current) {
        ref.current.currentTime = 0;
        ref.current.play();
        ref.current.focus();
      }
    });
  }

  return (
    <div className="hero-media" id="video">
      <video
        ref={ref}
        className="hero-video"
        poster="/videos/prontuario-principal-capa.jpg"
        preload="none"
        playsInline
        controls={tocando}
        onPlay={() => setTocando(true)}
        onEnded={() => setTocando(false)}
        aria-label="Vídeo: Matheus Vuicik explica o Prontuário Salva-Vidas"
      >
        <source src="/videos/prontuario-principal.mp4" type="video/mp4" />
        Seu navegador não reproduz vídeo.{" "}
        <a href="/videos/prontuario-principal.mp4">Baixe o arquivo</a>.
      </video>

      {!tocando && (
        <button
          type="button"
          className="hero-play"
          onClick={play}
          aria-label="Assistir ao vídeo: Matheus Vuicik explica o Prontuário Salva-Vidas"
        >
          <span className="hero-play-icon" aria-hidden="true" />
        </button>
      )}
    </div>
  );
}
