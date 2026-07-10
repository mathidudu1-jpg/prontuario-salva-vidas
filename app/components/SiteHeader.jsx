"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

export default function SiteHeader({ active }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const isHome = active === "home";
  const toggleRef = useRef(null);
  const menuRef = useRef(null);

  const items = [
    { label: "O Problema", href: isHome ? "#a-dor" : "/#a-dor", hash: true },
    { label: "O Projeto", href: "/o-projeto", key: "projeto" },
    { label: "Proposta de Lei", href: "/projeto-de-lei", key: "lei" },
    { label: "Assine o Manifesto", href: isHome ? "#assinar" : "/#assinar", hash: true, cta: true },
  ];

  // header fica sólido ao rolar (fica fixo, então a nav está sempre acessível)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // menu aberto: trava o scroll (técnica iOS-safe), move o foco p/ dentro,
  // prende o Tab, esconde o fundo (inert) e devolve o foco ao fechar
  useEffect(() => {
    if (!open) return;
    const main = document.querySelector("main");
    const y = window.scrollY;

    document.body.style.position = "fixed";
    document.body.style.top = `-${y}px`;
    document.body.style.left = "0";
    document.body.style.right = "0";
    document.body.style.width = "100%";
    main?.setAttribute("inert", "");

    menuRef.current?.querySelector("a, button")?.focus();

    const onKey = (e) => {
      if (e.key === "Escape") { setOpen(false); return; }
      if (e.key === "Tab" && menuRef.current) {
        const f = menuRef.current.querySelectorAll("a[href], button");
        if (!f.length) return;
        const first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    document.addEventListener("keydown", onKey);

    return () => {
      document.removeEventListener("keydown", onKey);
      const restoreY = -parseInt(document.body.style.top || "0", 10) || 0;
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.width = "";
      window.scrollTo(0, restoreY);
      main?.removeAttribute("inert");
      toggleRef.current?.focus();
    };
  }, [open]);

  const renderLink = (item, base, ctaClass, onClick) => {
    const cls = item.cta ? `${base} ${ctaClass}` : base;
    const current = item.key && item.key === active ? "page" : undefined;
    if (item.hash) {
      return (
        <a key={item.label} href={item.href} className={cls} onClick={onClick}>
          {item.label}
        </a>
      );
    }
    return (
      <Link key={item.label} href={item.href} className={cls} aria-current={current} onClick={onClick}>
        {item.label}
      </Link>
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

        {/* nav desktop */}
        <nav className="site-nav" aria-label="Principal">
          {items.map((it) => renderLink(it, "nav-link", "nav-cta"))}
        </nav>

        {/* botão do menu (mobile) */}
        <button
          ref={toggleRef}
          type="button"
          className={`nav-toggle${open ? " is-open" : ""}`}
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </header>

      {/* menu mobile — irmão do header (fora do backdrop-filter, p/ o fixed
          continuar relativo à viewport) */}
      {open && <div className="mobile-menu-backdrop" onClick={() => setOpen(false)} aria-hidden="true" />}
      <nav
        ref={menuRef}
        id="mobile-menu"
        className={`mobile-menu${open ? " is-open" : ""}`}
        aria-label="Menu principal"
        aria-hidden={!open}
      >
        {items.map((it) =>
          renderLink(it, "mobile-link", "mobile-cta", () => setOpen(false))
        )}
      </nav>
    </>
  );
}
