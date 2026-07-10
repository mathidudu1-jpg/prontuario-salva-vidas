import SiteHeader from "../components/SiteHeader";
import SiteFooter from "../components/SiteFooter";

export const metadata = {
  title: "O projeto",
  description:
    "A história por trás do Prontuário Salva-Vidas: como funciona a proposta, a pesquisa com fontes e quem está por trás dela.",
  alternates: { canonical: "/o-projeto" },
  openGraph: {
    title: "O projeto | Prontuário Salva-Vidas",
    description:
      "Como funciona a proposta, a pesquisa com fontes e quem está por trás dela.",
    url: "/o-projeto",
    type: "article",
  },
};

export default function OProjeto() {
  return (
    <>
      <SiteHeader active="projeto" />

      <main>
        {/* abertura: O Projeto */}
        <section className="proj-hero">
          <div className="container container--narrow">
            <p className="section-label">Campanha cívica · Saúde pública</p>
            <h1 className="proj-title">O Projeto</h1>

            <div className="proj-prose proj-narrative">
              <p>São três da manhã. Um homem chega à emergência com dor no peito, faz exames, um eletrocardiograma, recebe medicação. Piora, e precisa ser transferido às pressas para um hospital de maior complexidade. A ambulância corre. Com ele vai uma guia de transferência preenchida à mão, um resumo apressado do que aconteceu. Os exames, as imagens e os resultados completos ficam para trás, no sistema da unidade de origem.</p>
              <p>Do outro lado, o médico recebe um paciente grave e um papel manuscrito. Não tem acesso ao eletro que já foi feito, ao resultado do sangue, à dose exata que já foi aplicada. Na dúvida, refaz. Repete exame, repete espera, enquanto o relógio corre contra a vida daquele homem.</p>
              <p>Isso se repete todos os dias, no Paraná inteiro. Não por falta de tecnologia, nem de dinheiro. O prontuário eletrônico com toda a informação existe, ele só não atravessa de um hospital para o outro.</p>
              <p className="proj-punch">Este projeto faz o prontuário viajar junto com o paciente.</p>
            </div>

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
            <h2 className="h2">Como funciona</h2>
            <p>Hoje, quando um paciente é transferido, o hospital de destino recebe um resumo em papel e um telefonema. O registro completo, com exames, imagens e medicações, continua trancado no sistema de onde ele saiu. Cada hospital tem o seu próprio sistema, e esses sistemas não conversam entre si.</p>
            <p>A proposta corrige isso com uma regra simples. No momento em que a transferência é aprovada, o sistema de origem gera automaticamente um resumo clínico completo, com tudo o que foi feito, e o envia para o hospital de destino antes mesmo de a ambulância chegar. Quando o paciente entra pela porta, o médico já viu o histórico dele na tela.</p>
            <p>Para isso funcionar, os sistemas precisam falar a mesma língua. Essa língua já existe e é um padrão nacional adotado pelo Ministério da Saúde. O Brasil já construiu essa estrutura; o que falta é obrigá-la a ser usada no momento mais crítico, o da transferência de urgência. É exatamente isso que a lei faz.</p>
          </div>
        </section>

        <section className="proj-section">
          <div className="container container--narrow">
            <h2 className="h2">A proposta em detalhe</h2>
            <p className="section-lead">É uma proposta de lei estadual, do Paraná, enxuta de propósito. Ela obriga quatro coisas:</p>

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
          <div className="container container--narrow proj-prose">
            <h2 className="h2">Quem está por trás</h2>
            {/* TODO(matheus): foto sua aqui, se quiser (funciona sem) */}
            <p>Me chamo Matheus Vuicik, tenho 24 anos e sou empreendedor em Curitiba. Cheguei a esse tema pela tecnologia. Enquanto desenvolvia o site sobre a construção do HCzinho, o novo hospital pediátrico do Paraná, acabei em contato com pessoas que trabalham na gerência do Hospital de Clínicas. Num desses contatos, alguém comentou como um paciente transferido de uma unidade para outra costuma chegar sem o histórico clínico, obrigando a equipe a recomeçar exames que já tinham sido feitos. Aquilo me chamou a atenção. Fui atrás para entender o tamanho do problema e enxerguei uma melhoria possível, concreta e barata. Estudei a fundo, aprofundei durante minha formação na Academia MBL, e o que era uma curiosidade virou esta proposta de lei.</p>
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
                <p>Texto final do PL protocolado na Assembleia Legislativa do Paraná e busca de deputados estaduais dispostos a pautar.</p>
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
