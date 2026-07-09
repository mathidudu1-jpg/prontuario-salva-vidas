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
            <h1 className="proj-title">Sou o Matheus Vuicik, e esta é a ideia que não me saiu da cabeça.</h1>
            <p className="section-lead">Tenho 24 anos, sou empreendedor em Curitiba e passei os últimos meses estudando uma pergunta: por que o histórico de saúde de um paciente não anda junto com ele?</p>

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
            <p>Não sou médico nem político. Sou um empreendedor de 24 anos, de Curitiba, e trabalho com tecnologia. É desse lugar que essa ideia surgiu. No meu ramo, fazer sistemas diferentes conversarem entre si é o básico do básico: qualquer loja online integra estoque, pagamento e entrega em minutos. Foi por isso que travei quando entendi como funciona a transferência de um paciente no SUS.</p>
          </div>
        </section>

        <section className="proj-section">
          <div className="container container--narrow proj-prose">
            <h2 className="h2">Como a ideia nasceu</h2>
            <p>A situação é a seguinte. Um paciente em estado grave dá entrada na UPA, faz exames, recebe medicação, e tudo é registrado no sistema. Ele piora e é transferido para um hospital de maior complexidade. Os exames, porém, não vão junto. O médico que o recebe encontra uma pessoa passando mal e uma ficha em branco, e precisa começar tudo de novo. Perde-se um tempo que, em um infarto, é a diferença entre a recuperação e a sequela.</p>
            <p>O que me incomodou foi o contraste. Se o comércio faz seus sistemas se comunicarem sem esforço, por que a saúde, onde há vidas em jogo, não faz o mesmo?</p>
            <p>Fui atrás das respostas. Li os relatórios, estudei a RNDS e conversei com quem recebe pacientes todos os dias. Essa investigação se tornou meu trabalho de formação na Academia MBL, e quanto mais eu avançava, mais claro ficava: o Brasil já construiu a estrutura, só falta obrigar que ela seja usada onde mais importa. O problema tem solução, e ela cabe em uma lei curta e honesta. Foi assim que a proposta ganhou forma. Este site é a parte pública dela.</p>
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
                <p>Os sistemas de saúde passam a trocar dados no padrão nacional, o HL7 FHIR. É o mesmo que o decreto federal adotou para a RNDS.</p>
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
                <h3>O incômodo</h3>
                <p>Entender como funciona a transferência de um paciente no SUS vira um incômodo que não passa. Começo a anotar.</p>
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
                <p>Conversas com a gestão do Hospital de Clínicas para testar a proposta contra a realidade de quem recebe paciente todo dia.</p>
              </div>
              <div className="tl-item">
                <p className="tl-date">Jul/2026</p>
                <h3>O site e a campanha</h3>
                <p>Esta página entra no ar para explicar a proposta em linguagem simples.</p>
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
            <p>Se você é parlamentar, assessor, gestor de saúde ou jornalista e quer levar isso adiante, entre em contato. Respondo pessoalmente.</p>
            <p>Se você é qualquer outra pessoa, assinar o manifesto e compartilhar a página já ajuda a proposta a avançar.</p>
            <a className="btn btn-primary" href="mailto:matheuseduardovuicik@gmail.com?subject=Sobre%20o%20Prontu%C3%A1rio%20Salva-Vidas">matheuseduardovuicik@gmail.com</a>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
