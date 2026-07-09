import Link from "next/link";

export default function SiteHeader({ active }) {
  return (
    <header className="site-header">
      <Link href="/" className="logo" aria-label="Prontuário Salva-Vidas, página inicial">
        <svg className="logo-tick" viewBox="0 0 56 24" aria-hidden="true" focusable="false">
          <path d="M0 12 H16 l4 5 5 -14 5 18 4 -9 H56" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span className="logo-text">Prontuário <strong>Salva-Vidas</strong></span>
      </Link>
      <nav className="site-nav" aria-label="Principal">
        <Link
          href="/o-projeto"
          className="header-cta header-cta--clay"
          aria-current={active === "projeto" ? "page" : undefined}
        >
          O projeto
        </Link>
        <a href={active === "home" ? "#assinar" : "/#assinar"} className="header-cta">Assine o manifesto</a>
      </nav>
    </header>
  );
}
