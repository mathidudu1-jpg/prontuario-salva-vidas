"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

/* ícones de traço fino, na linguagem do site (o de "Problema" é o próprio ECG) */
const Icon = {
  problema: (
    <path d="M2 12 h4 l1.6 4.5 3.2 -11 2.4 7 1.4 -2 H22" />
  ),
  projeto: (
    <>
      <circle cx="12" cy="8" r="3.4" />
      <path d="M5.5 20 a6.5 6.5 0 0 1 13 0" />
    </>
  ),
  lei: (
    <>
      <path d="M13 3 H7 a1 1 0 0 0 -1 1 v16 a1 1 0 0 0 1 1 h10 a1 1 0 0 0 1 -1 V8 Z" />
      <path d="M13 3 v5 h5" />
      <path d="M9 13 h6 M9 16.5 h4" />
    </>
  ),
  assinar: (
    <>
      <path d="M4 20.5 h16" />
      <path d="M15 4.5 l4 4 -9.5 9.5 H5 v-4.5 Z" />
    </>
  ),
};

export default function SiteHeader({ active }) {
  const [scrolled, setScrolled] = useState(false);
  const isHome = active === "home";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const items = [
    { key: "problema", label: "O Problema", short: "Problema", icon: "problema",
      href: isHome ? "#a-dor" : "/#a-dor", hash: true, activeOn: "home" },
    { key: "projeto", label: "O Projeto", short: "Projeto", icon: "projeto",
      href: "/o-projeto", activeOn: "projeto" },
    { key: "lei", label: "Projeto de Lei", short: "Lei", icon: "lei",
      href: "/projeto-de-lei", activeOn: "lei" },
    { key: "assinar", label: "Assine o Manifesto", short: "Assinar", icon: "assinar",
      href: isHome ? "#assinar" : "/#assinar", hash: true, cta: true },
  ];

  // link do header (desktop, texto)
  const navLink = (it) => {
    const cls = it.cta ? "nav-link nav-cta" : "nav-link";
    const current = it.activeOn && it.activeOn === active ? "page" : undefined;
    return it.hash ? (
      <a key={it.key} href={it.href} className={cls}>{it.label}</a>
    ) : (
      <Link key={it.key} href={it.href} className={cls} aria-current={current}>{it.label}</Link>
    );
  };

  // aba da ilha inferior (mobile, ícone + rótulo curto)
  const bottomTab = (it) => {
    const isActive = it.activeOn && it.activeOn === active;
    const cls = `bn-tab${it.cta ? " bn-tab--cta" : ""}${isActive ? " is-active" : ""}`;
    const inner = (
      <>
        <svg className="bn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor"
          strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          {Icon[it.icon]}
        </svg>
        <span className="bn-label">{it.short}</span>
      </>
    );
    return it.hash ? (
      <a key={it.key} href={it.href} className={cls}>{inner}</a>
    ) : (
      <Link key={it.key} href={it.href} className={cls} aria-current={isActive ? "page" : undefined}>{inner}</Link>
    );
  };

  return (
    <>
      <header className={`site-header${scrolled ? " is-scrolled" : ""}`}>
        <Link href="/" className="logo" aria-label="Prontuário Salva-Vidas, página inicial">
          <svg className="logo-tick" viewBox="0 0 56 24" aria-hidden="true" focusable="false">
            <path d="M0 12 H16 l4 5 5 -14 5 18 4 -9 H56" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="logo-text">Prontuário <strong>Salva-Vidas</strong></span>
        </Link>

        <nav className="site-nav" aria-label="Principal">
          {items.map(navLink)}
        </nav>
      </header>

      {/* ilha de navegação — só no mobile */}
      <nav className="bottom-nav" aria-label="Navegação">
        {items.map(bottomTab)}
      </nav>
    </>
  );
}
