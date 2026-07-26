import { readFileSync } from "fs";
import { join } from "path";
import Link from "next/link";
import SiteHeader from "../components/SiteHeader";
import SiteFooter from "../components/SiteFooter";
import { especialistas, uploadDate } from "../lib/especialistas.data";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://prontuario-salva-vidas.vercel.app";

// Caminhos relativos (ex.: "/videos/x.mp4") viram absolutos para o schema.org;
// se um dia a MEDIA_BASE virar uma URL do Supabase, ela já vem absoluta e passa direto.
const toAbsolute = (path) => (/^https?:\/\//.test(path) ? path : `${siteUrl}${path}`);

// Transcrições lidas do repositório no build (mesmo padrão do opengraph-image.js).
// Cada .txt já vem em parágrafos separados por linha em branco.
function lerTranscricao(slug) {
  const caminho = join(process.cwd(), "app", "depoimentos", "transcricoes", `transcricao-${slug}.txt`);
  return readFileSync(caminho, "utf-8")
    .split(/\n\s*\n/)
    .map((p) => p.replace(/\s+/g, " ").trim())
    .filter(Boolean);
}

const depoimentos = especialistas.map((e) => ({
  ...e,
  paragrafos: lerTranscricao(e.slug),
}));

export const metadata = {
  title: "Depoimentos de especialistas",
  description:
    "Médicos e gestores que vivem a rotina do SUS e dos hospitais explicam, em vídeo e com transcrição, por que o prontuário precisa acompanhar o paciente entre as unidades de saúde.",
  alternates: { canonical: "/depoimentos" },
  openGraph: {
    title: "Depoimentos de especialistas | Prontuário Salva-Vidas",
    description:
      "Quem trabalha dentro do sistema fala sobre o que muda quando o registro clínico viaja com o paciente.",
    url: "/depoimentos",
    type: "article",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": depoimentos.map((e) => ({
    "@type": "VideoObject",
    name: `Depoimento de ${e.nome} — ${e.cargo}`,
    description: `${e.nome}, ${e.cargo.toLowerCase()} (${e.local}), sobre a importância de o registro clínico do paciente acompanhá-lo entre as unidades de saúde.`,
    thumbnailUrl: [toAbsolute(e.poster)],
    uploadDate,
    duration: e.duracaoISO,
    contentUrl: toAbsolute(e.video),
    transcript: e.paragrafos.join("\n\n"),
    inLanguage: "pt-BR",
  })),
};

export default function Depoimentos() {
  return (
    <>
      <SiteHeader active="depoimentos" />

      <main>
        <section className="dep-hero">
          <div className="container">
            <p className="section-label">Opinião de especialistas</p>
            <h1 className="dep-title">Quem trabalha dentro do sistema já sabe o que falta.</h1>
            <p className="dep-sub">
              Profissionais que vivem a rotina do SUS e dos hospitais falam sobre o que muda
              quando o prontuário acompanha o paciente.
            </p>
            <p className="esp-enquadre dep-enquadre">
              Os três defendem que isso vire regra em todo o país. É exatamente o caminho da
              proposta: começar pelo Paraná, o estado que pode provar que funciona, para depois
              servir de modelo ao Brasil.
            </p>
            <p className="dep-context">
              Cada depoimento na íntegra, com a transcrição completa logo ao lado.
            </p>
          </div>
        </section>

        <section>
          <div className="container">
            <ul className="dep-lista">
              {depoimentos.map((e) => (
                <li key={e.slug} className="dep-item" id={e.slug}>
                  <figure className="dep-media">
                    <video
                      className="dep-video"
                      poster={e.poster}
                      preload="none"
                      playsInline
                      controls
                    >
                      <source src={e.video} type="video/mp4" />
                      Seu navegador não reproduz vídeo. <a href={e.video}>Baixe o arquivo</a>.
                    </video>
                  </figure>

                  <div className="dep-corpo">
                    <h2 className="dep-nome">{e.nome}</h2>
                    <p className="dep-cargo">
                      {e.cargo}
                      <span>{e.local}</span>
                    </p>
                    <blockquote className="dep-citacao">“{e.citacao}”</blockquote>

                    <p className="dep-transcricao-label">Transcrição</p>
                    <div className="dep-transcricao">
                      {e.paragrafos.map((p, i) => (
                        <p key={i}>{p}</p>
                      ))}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <div className="dep-voltar">
          <div className="container">
            <Link href="/#assinar">← Voltar e assinar o manifesto</Link>
          </div>
        </div>
      </main>

      <SiteFooter />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
