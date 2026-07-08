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
  title: "Prontuário Salva-Vidas — A informação que pode te salvar não chega a tempo",
  description:
    "Campanha cívica por uma lei de interoperabilidade de dados de saúde. Da UPA ao hospital, seus dados devem viajar com você.",
  openGraph: {
    title: "Prontuário Salva-Vidas",
    description: "A informação que pode te salvar não chega a tempo. Entenda a proposta.",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR" className={`${fraunces.variable} ${inter.variable} ${jetbrainsMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
