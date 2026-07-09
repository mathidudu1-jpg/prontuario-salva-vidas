import { Fraunces, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz"],
  variable: "--font-fraunces",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jbmono",
  display: "swap",
});

// Domínio canônico. Troque para o domínio final definindo NEXT_PUBLIC_SITE_URL
// no Vercel quando o prontuariosalvavidas.com.br estiver conectado.
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://prontuario-salva-vidas.vercel.app";

const TITULO = "Prontuário Salva-Vidas | Uma lei para seus dados de saúde chegarem com você";
const DESCRICAO =
  "Todo ano o Brasil desperdiça R$ 12 bilhões repetindo exames. A tecnologia que corrige isso já existe. Uma proposta de lei de Matheus Vuicik, de Curitiba, com dados e fontes.";

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: TITULO,
    template: "%s | Prontuário Salva-Vidas",
  },
  description: DESCRICAO,
  applicationName: "Prontuário Salva-Vidas",
  authors: [{ name: "Matheus Vuicik" }],
  creator: "Matheus Vuicik",
  publisher: "Prontuário Salva-Vidas",
  category: "Saúde pública",
  keywords: [
    "interoperabilidade em saúde",
    "prontuário eletrônico",
    "transferência de pacientes",
    "RNDS",
    "HL7 FHIR",
    "SUS",
    "saúde pública",
    "Paraná",
    "projeto de lei",
    "dados de saúde",
    "Prontuário Salva-Vidas",
    "Matheus Vuicik",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: siteUrl,
    siteName: "Prontuário Salva-Vidas",
    title: "Prontuário Salva-Vidas",
    description: "Seus exames existem, mas não chegam junto com você. Entenda a proposta.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Prontuário Salva-Vidas",
    description: "Seus exames existem, mas não chegam junto com você. Entenda a proposta.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: "Prontuário Salva-Vidas",
      description: DESCRICAO,
      inLanguage: "pt-BR",
    },
    {
      "@type": "Person",
      "@id": `${siteUrl}/#matheus`,
      name: "Matheus Vuicik",
      jobTitle: "Empreendedor",
      address: { "@type": "PostalAddress", addressLocality: "Curitiba", addressRegion: "PR", addressCountry: "BR" },
    },
    {
      "@type": "GovernmentService",
      name: "Prontuário Salva-Vidas — proposta de lei de interoperabilidade em saúde",
      description:
        "Proposta de lei que obriga sistemas de saúde a enviarem o resumo clínico do paciente no momento da transferência de urgência, usando o padrão nacional HL7 FHIR.",
      areaServed: { "@type": "Country", name: "Brasil" },
      audience: { "@type": "Audience", audienceType: "Pacientes do SUS" },
    },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR" className={`${fraunces.variable} ${inter.variable} ${jetbrainsMono.variable}`}>
      <body>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
