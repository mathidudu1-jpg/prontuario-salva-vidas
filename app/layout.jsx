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

export const metadata = {
  title: "Prontuário Salva-Vidas | Uma lei para seus dados de saúde chegarem com você",
  description:
    "Todo ano o Brasil desperdiça R$ 12 bilhões repetindo exames. A tecnologia que corrige isso já existe. Uma proposta de lei de Matheus Vuicik, de Curitiba, com dados e fontes.",
  openGraph: {
    title: "Prontuário Salva-Vidas",
    description: "Seus exames existem, mas não chegam junto com você. Entenda a proposta.",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR" className={`${fraunces.variable} ${inter.variable} ${jetbrainsMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
