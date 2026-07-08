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
  title: "Prontuário Salva-Vidas | Teus exames existem. Só não chegam junto com você.",
  description:
    "Uma proposta de lei pra fazer teus dados de saúde viajarem contigo, da UPA ao hospital. Feita por um cidadão de Curitiba, com dados e fontes.",
  openGraph: {
    title: "Prontuário Salva-Vidas",
    description: "Teus exames existem. Só não chegam junto com você. Entenda a proposta.",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR" className={`${fraunces.variable} ${inter.variable} ${jetbrainsMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
