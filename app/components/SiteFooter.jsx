import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container">
        <svg className="logo-tick" viewBox="0 0 56 24" aria-hidden="true" focusable="false">
          <path d="M0 12 H16 l4 5 5 -14 5 18 4 -9 H56" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <p>Prontuário Salva-Vidas · <a href="mailto:matheuseduardovuicik@gmail.com">matheuseduardovuicik@gmail.com</a></p>
        <nav className="footer-nav" aria-label="Rodapé">
          <Link href="/o-projeto">O projeto</Link>
        </nav>
      </div>
    </footer>
  );
}
