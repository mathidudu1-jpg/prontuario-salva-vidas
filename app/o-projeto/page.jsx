import SiteHeader from "../components/SiteHeader";
import SiteFooter from "../components/SiteFooter";

export const metadata = {
  title: "O projeto | Prontuário Salva-Vidas",
  description:
    "Quem está por trás do Prontuário Salva-Vidas, como a ideia nasceu, a proposta em detalhe e a pesquisa com fontes.",
};

export default function OProjeto() {
  return (
    <>
      <SiteHeader active="projeto" />

      <main>
        {/* quem sou eu */}
        <section className="proj-hero">
          <div className="container container--narrow">
            <p className="section-label">O projeto · Quem faz</p>
            <h1 className="proj-title">Oi, eu sou o Matheus. Isso aqui começou com uma pergunta boba.</h1>
            <p className="section-lead">Tenho 24 anos, empreendo em Curitiba e passei os últimos meses obcecado com uma coisa: por que teu histórico de saúde não anda contigo?</p>

            <div className="proj-ecg" aria-hidden="true">
              <svg viewBox="0 0 800 70" preserveAspectRatio="xMidYMid slice">
                <path d="M0,40 H330 l10,8 12,-40 14,52 10,-20 H800" fill="none"
                  stroke="var(--clay)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>
        </section>

        <section className="proj-section">
          <div className="container container--narrow proj-prose">
            <h2 className="h2">Quem sou eu</h2>
            {/* TODO(matheus): foto sua aqui, se quiser (funciona sem) */}
            <p>Vou ser direto: médico eu não sou, político muito menos. Sou um cara de 24 anos que trabalha com tecnologia e viu de perto como qualquer loja virtual integra estoque, pagamento e entrega sem drama nenhum.</p>
            <p>Aí eu descobri que dois hospitais públicos da mesma cidade muitas vezes não conseguem trocar um exame de sangue. <strong>Isso não saiu mais da minha cabeça.</strong></p>
          </div>
        </section>

        <section className="proj-section">
          <div className="container container--narrow proj-prose">
            <h2 className="h2">Como a ideia nasceu</h2>
            {/* TODO(matheus): ajustar os detalhes pessoais desta história como você quiser */}
            <p>Tudo começou com uma conversa sobre transferência de paciente e uma pergunta que eu achava boba: &quot;mas os exames não vão junto?&quot;. A resposta era pior do que eu imaginava.</p>
            <p>Fui atrás dos números. Li os relatórios, estudei a RNDS, conversei com quem vive isso na prática. E entendi o tamanho real do buraco: o Brasil já construiu a estrada, o que falta é obrigar o caminhão a passar por ela.</p>
            <p>Quando percebi que dava pra atacar isso com uma lei objetiva, curta e tecnicamente honesta, virou projeto. Este site é a parte pública dele.</p>
          </div>
        </section>

        <section className="proj-section">
          <div className="container container--narrow">
            <h2 className="h2">A proposta em detalhe</h2>
            <p className="section-lead">A lei é enxuta de propósito. Ela obriga quatro coisas:</p>

            <div className="bloco-grid">
              <article className="bloco-card">
                <p className="bloco-num">Bloco 01</p>
                <h3>Interoperar</h3>
                <p>Os sistemas de saúde passam a trocar dados no padrão nacional, o HL7 FHIR. É o mesmo que o decreto federal adotou pra RNDS.</p>
              </article>
              <article className="bloco-card">
                <p className="bloco-num">Bloco 02</p>
                <h3>Resumo de transferência</h3>
                <p>Toda transferência de urgência gera um resumo clínico que chega ao destino junto com o paciente.</p>
              </article>
              <article className="bloco-card">
                <p className="bloco-num">Bloco 03</p>
                <h3>Rastreabilidade</h3>
                <p>Todo acesso ao prontuário fica registrado: quem viu, o quê, quando. LGPD de ponta a ponta.</p>
              </article>
              <article className="bloco-card">
                <p className="bloco-num">Bloco 04</p>
                <h3>Painel de regulação</h3>
                <p>A regulação estadual ganha visão em tempo real das transferências e dos gargalos da rede.</p>
              </article>
            </div>

            {/* TODO(matheus): linkar o texto integral do PL quando finalizar */}
            <p className="waste-note">O texto integral do Projeto de Lei está em redação final e vai ser publicado nesta página.</p>
          </div>
        </section>

        <section className="proj-section">
          <div className="container container--narrow">
            <h2 className="h2">A pesquisa por trás</h2>
            <p className="section-lead">Nenhum número deste site foi inventado. Os que sustentam a proposta:</p>

            <ul className="pesquisa-list">
              <li><strong>~20%</strong> dos exames laboratoriais são repetidos sem necessidade.
                <span className="pesquisa-src">Abramed</span></li>
              <li><strong>R$ 12 bilhões</strong> consumidos com exames desnecessários; 25% a 40% dos exames não são necessários.
                <span className="pesquisa-src">EY / IESS, 2023</span></li>
              <li><strong>+50%</strong> dos erros de medicação acontecem na alta ou na transferência entre unidades.
                <span className="pesquisa-src">Rev. Latino-Americana de Enfermagem (2016), base OMS</span></li>
              <li><strong>46,19%</strong> é a maturidade digital média dos hospitais brasileiros; <strong>75%</strong> não têm sistemas integrados.
                <span className="pesquisa-src">Mapa da Transformação Digital dos Hospitais Brasileiros 2024, Folks</span></li>
              <li><strong>23/07/2025</strong>: decreto federal torna a RNDS a plataforma oficial de interoperabilidade do SUS, com mais de 2,8 bilhões de registros.
                <span className="pesquisa-src">Ministério da Saúde</span></li>
              <li><strong>Nov/2025</strong>: o Paraná inicia a federalização da RNDS, com a primeira oficina estadual em Curitiba.
                <span className="pesquisa-src">Sesa-PR, Resolução nº 1603/2025</span></li>
            </ul>

            {/* TODO(matheus): linkar o PDF do dossiê quando publicar */}
            <p className="waste-note">O dossiê completo, com metodologia e todas as referências, sai em PDF nesta página.</p>
          </div>
        </section>

        <section className="proj-section">
          <div className="container container--narrow">
            <h2 className="h2">A jornada até aqui</h2>

            <div className="timeline">
              <div className="tl-item">
                <p className="tl-date">2025</p>
                <h3>A pergunta</h3>
                <p>Uma conversa sobre transferência de paciente vira incômodo permanente. Começo a anotar.</p>
              </div>
              <div className="tl-item">
                <p className="tl-date">2025 → 2026</p>
                <h3>A pesquisa</h3>
                <p>Levantamento dos dados com fonte, estudo do marco legal da RNDS e do mapa de maturidade digital dos hospitais.</p>
              </div>
              <div className="tl-item">
                {/* TODO(matheus): confirmar período da validação com a gestão do HC */}
                <p className="tl-date">2026</p>
                <h3>Validação no HC</h3>
                <p>Conversas com a gestão do Hospital de Clínicas pra testar a proposta contra a realidade de quem recebe paciente todo dia.</p>
              </div>
              <div className="tl-item">
                <p className="tl-date">Jul/2026</p>
                <h3>O site e a campanha</h3>
                <p>Esta página entra no ar pra explicar a proposta em linguagem de gente.</p>
              </div>
              <div className="tl-item tl-item--next">
                <p className="tl-date">Próximo passo</p>
                <h3>O protocolo</h3>
                <p>Texto final do PL protocolado e busca de parlamentares dispostos a pautar.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="proj-section proj-cta">
          <div className="container container--narrow proj-prose">
            <h2 className="h2">Contato e apoio</h2>
            <p>Se você é parlamentar, assessor, gestor de saúde ou jornalista e quer pautar isso, me chama. Respondo tudo.</p>
            <p>Se você é qualquer outra pessoa: compartilhar este site já empurra a ideia pra frente.</p>
            <a className="btn btn-primary" href="mailto:contato@prontuariosalvavidas.com.br?subject=Sobre%20o%20Prontu%C3%A1rio%20Salva-Vidas">contato@prontuariosalvavidas.com.br</a>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
