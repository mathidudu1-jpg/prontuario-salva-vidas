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
    {
      url: `${siteUrl}/projeto-de-lei`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/depoimentos`,
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];
}
