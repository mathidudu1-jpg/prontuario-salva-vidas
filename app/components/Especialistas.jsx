"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { especialistas } from "../lib/especialistas.data";

/**
 * Seção "Opinião de especialistas" — vai na home, logo ANTES do #assinar.
 * Vídeos self-hosted, sem autoplay, preload="none": a home só paga os posters;
 * o vídeo em si só é baixado quando a pessoa dá play.
 */
export default function Especialistas() {
  return (
    <section id="especialistas" className="especialistas" aria-labelledby="especialistas-titulo">
      <div className="container">
        <p className="section-label">Opinião de especialistas</p>
        <h2 id="especialistas-titulo" className="h2 esp-titulo">
          Quem trabalha dentro do sistema já sabe o que falta.
        </h2>
        <p className="section-lead esp-intro">
          Profissionais que vivem a rotina do SUS e dos hospitais falam sobre o que
          muda quando o prontuário acompanha o paciente.
        </p>

        <ul className="esp-grade">
          {especialistas.map((e) => (
            <li key={e.slug}>
              <CardEspecialista pessoa={e} />
            </li>
          ))}
        </ul>

        <p className="esp-rodape">
          <Link href="/depoimentos" className="esp-link">
            Ver os depoimentos completos, com transcrição
          </Link>
        </p>
      </div>
    </section>
  );
}

function CardEspecialista({ pessoa }) {
  const [tocando, setTocando] = useState(false);
  const ref = useRef(null);

  function play() {
    setTocando(true);
    // o elemento já está no DOM; depois de trocar o estado, damos play e movemos
    // o foco do teclado para o vídeo — assim quem acionou o play com Enter/Espaço
    // cai direto nos controles nativos, em vez de perder o foco para o body.
    requestAnimationFrame(() => {
      ref.current?.play();
      ref.current?.focus();
    });
  }

  return (
    <figure className="esp-card">
      <div className="esp-moldura">
        <video
          ref={ref}
          className="esp-video"
          poster={pessoa.poster}
          preload="none"
          playsInline
          controls={tocando}
          onPlay={() => setTocando(true)}
          onEnded={() => setTocando(false)}
        >
          <source src={pessoa.video} type="video/mp4" />
          Seu navegador não reproduz vídeo. <a href={pessoa.video}>Baixe o arquivo</a>.
        </video>

        {!tocando && (
          <button
            type="button"
            className="esp-play"
            onClick={play}
            aria-label={`Assistir ao depoimento de ${pessoa.nome} (${pessoa.duracao})`}
          >
            <span className="esp-play-icone" aria-hidden="true" />
            <span className="esp-duracao">{pessoa.duracao}</span>
          </button>
        )}
      </div>

      <figcaption className="esp-legenda">
        <blockquote className="esp-citacao">“{pessoa.citacao}”</blockquote>
        <p className="esp-nome">{pessoa.nome}</p>
        <p className="esp-cargo">
          {pessoa.cargo}
          <span className="esp-local">{pessoa.local}</span>
        </p>
      </figcaption>
    </figure>
  );
}
