import { ImageResponse } from "next/og";
import { readFileSync } from "fs";
import { join } from "path";

export const alt =
  "Prontuário Salva-Vidas — uma lei para seus dados de saúde chegarem com você";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Fontes lidas do repositório (sem depender de rede no build).
const fontDir = join(process.cwd(), "app", "fonts");
const fraunces = readFileSync(join(fontDir, "Fraunces-SemiBold.ttf"));
const inter = readFileSync(join(fontDir, "Inter-Medium.ttf"));

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#FAF6EE",
          padding: "70px 80px",
          position: "relative",
          fontFamily: "Inter",
        }}
      >
        {/* a assinatura: linha de ECG como divisor no terço inferior */}
        <svg
          width="1200"
          height="160"
          viewBox="0 0 1200 160"
          style={{ position: "absolute", left: 0, bottom: 74 }}
        >
          <path
            d="M0,100 H450 q10,-12 20,0 H620 l10,10 14,-58 18,88 12,-40 H860 q14,-16 28,0 H1200"
            fill="none"
            stroke="#C46B4A"
            strokeWidth="7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        {/* topo: traço do ECG + kicker */}
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <svg width="56" height="24" viewBox="0 0 56 24">
            <path
              d="M0 12 H16 l4 5 5 -14 5 18 4 -9 H56"
              fill="none"
              stroke="#C46B4A"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <div
            style={{
              fontSize: "24px",
              letterSpacing: "4px",
              color: "#2C5754",
              fontWeight: 700,
              textTransform: "uppercase",
            }}
          >
            Campanha cívica · Saúde pública
          </div>
        </div>

        {/* centro: título + tagline */}
        <div style={{ display: "flex", flexDirection: "column", position: "relative" }}>
          <div
            style={{
              fontSize: "80px",
              lineHeight: 1.02,
              color: "#241F19",
              fontFamily: "Fraunces",
              letterSpacing: "-1px",
            }}
          >
            Prontuário Salva-Vidas
          </div>
          <div
            style={{
              fontSize: "34px",
              lineHeight: 1.3,
              color: "rgba(36,31,25,0.82)",
              marginTop: "20px",
              maxWidth: "820px",
            }}
          >
            Seus exames existem. Só não chegam junto com você.
          </div>
        </div>

        {/* base: autoria + domínio */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            position: "relative",
          }}
        >
          <div style={{ fontSize: "25px", color: "rgba(36,31,25,0.55)" }}>
            Uma proposta de lei · Matheus Vuicik, Curitiba
          </div>
          <div style={{ fontSize: "25px", color: "#C46B4A", fontWeight: 700 }}>
            prontuariosalvavidas.com.br
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Fraunces", data: fraunces, weight: 600, style: "normal" },
        { name: "Inter", data: inter, weight: 500, style: "normal" },
      ],
    }
  );
}
