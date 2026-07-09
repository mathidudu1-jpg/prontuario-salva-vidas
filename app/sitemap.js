const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://prontuario-salva-vidas.vercel.app";

export default function sitemap() {
  return [
    {
      url: `${siteUrl}/`,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteUrl}/o-projeto`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];
}
