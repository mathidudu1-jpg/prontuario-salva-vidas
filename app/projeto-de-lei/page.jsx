import SiteHeader from "../components/SiteHeader";
import SiteFooter from "../components/SiteFooter";

const PDF = "/prontuario-salva-vidas-pl.pdf";

export const metadata = {
  title: "Projeto de Lei",
  description:
    "Texto integral do Projeto de Lei do Prontuário Salva-Vidas: a Política Estadual de Interoperabilidade e Continuidade da Informação em Saúde do Paraná, artigo por artigo, com justificativa e fontes.",
  alternates: { canonical: "/projeto-de-lei" },
  openGraph: {
    title: "Projeto de Lei | Prontuário Salva-Vidas",
    description:
      "O texto integral da Política Estadual de Interoperabilidade e Continuidade da Informação em Saúde do Paraná.",
    url: "/projeto-de-lei",
    type: "article",
  },
};

export default function ProjetoDeLei() {
  return (
    <>
      <SiteHeader active="lei" />

      <main>
        {/* cabeçalho */}
        <section className="lei-hero">
          <div className="container container--narrow">
            <p className="section-label">Assembleia Legislativa do Estado do Paraná</p>
            <h1 className="lei-title">Prontuário Salva-Vidas</h1>
            <p className="lei-subtitle">
              Política Estadual de Interoperabilidade e Continuidade da Informação em
              Saúde — Projeto de Lei
            </p>
            <p className="lei-context">
              Este é o texto da proposta apresentada como projeto de lei estadual.
              Abaixo, cada artigo e a justificativa.
            </p>
            <a className="btn btn-primary" href={PDF} download>
              Baixar o PDF oficial
            </a>

            <div className="proj-ecg" aria-hidden="true">
              <svg viewBox="0 0 800 70" preserveAspectRatio="xMidYMid slice">
                <path d="M0,40 H330 l10,8 12,-40 14,52 10,-20 H800" fill="none"
                  stroke="var(--clay)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>
        </section>

        {/* o articulado */}
        <section className="lei-body">
          <div className="container container--narrow">

            <p className="lei-numero">Projeto de Lei nº _______ / 2026</p>

            <div className="lei-ementa">
              <p>
                Institui a Política Estadual de Interoperabilidade e Continuidade da
                Informação em Saúde — “Prontuário Salva-Vidas”, no âmbito do Sistema
                Único de Saúde do Estado do Paraná, para assegurar que a informação
                clínica acompanhe o paciente, em especial nas transferências entre
                estabelecimentos de saúde.
              </p>
            </div>

            <p className="lei-enact">
              A Assembleia Legislativa do Estado do Paraná decretou e eu, Governador do
              Estado, sanciono a seguinte lei:
            </p>

            <article className="lei-art">
              <p><span className="lei-art-num">Art. 1º</span> Fica instituída a Política Estadual de Interoperabilidade e Continuidade da Informação em Saúde, denominada “Prontuário Salva-Vidas”, com o objetivo de assegurar que a informação clínica do paciente acompanhe o seu cuidado ao longo da rede pública de saúde do Estado do Paraná, especialmente nos momentos de transferência entre estabelecimentos.</p>
              <p className="lei-par"><span className="lei-par-label">Parágrafo único.</span> São diretrizes da Política: a continuidade do cuidado, a segurança do paciente, a eficiência no uso dos recursos públicos, a proteção de dados pessoais e a transparência das informações de gestão.</p>
            </article>

            <article className="lei-art">
              <p><span className="lei-art-num">Art. 2º</span> Para os fins desta Lei, considera-se:</p>
              <ul className="lei-incisos">
                <li><span className="lei-inc-num">I –</span> interoperabilidade: a capacidade de sistemas de informação em saúde de trocar dados entre si e de utilizá-los de forma útil e segura, observados os padrões nacionais adotados pelo Ministério da Saúde;</li>
                <li><span className="lei-inc-num">II –</span> registro integral do episódio: o conjunto completo dos dados clínicos produzidos no atendimento de um paciente em um estabelecimento, incluindo exames e respectivos resultados, laudos de imagem, medicações administradas com horários, alergias, sinais vitais e evolução clínica;</li>
                <li><span className="lei-inc-num">III –</span> resumo clínico de transferência: o documento estruturado, gerado automaticamente, que acompanha o paciente transferido, contendo os dados do registro integral do episódio;</li>
                <li><span className="lei-inc-num">IV –</span> estabelecimento de origem e estabelecimento de destino: respectivamente, aquele que transfere e aquele que recebe o paciente.</li>
              </ul>
            </article>

            <article className="lei-art">
              <p><span className="lei-art-num">Art. 3º</span> Os estabelecimentos públicos de saúde do Estado, bem como os privados contratados ou conveniados ao Sistema Único de Saúde, ficam obrigados a adotar padrões nacionais de interoperabilidade em seus sistemas de informação, de modo que os dados clínicos possam ser compartilhados de forma estruturada com os demais entes do SUS.</p>
            </article>

            <article className="lei-art">
              <p><span className="lei-art-num">Art. 4º</span> Aprovada a transferência de um paciente pela regulação, o estabelecimento de origem disponibilizará automaticamente ao estabelecimento de destino o resumo clínico de transferência, antes da chegada do paciente.</p>
              <p className="lei-par"><span className="lei-par-label">Parágrafo único.</span> A disponibilização de que trata o caput não substitui os protocolos assistenciais de transferência, a eles se somando como instrumento de continuidade da informação.</p>
            </article>

            <article className="lei-art">
              <p><span className="lei-art-num">Art. 5º</span> A padronização de que trata esta Lei aplica-se aos fornecedores de sistemas e de equipamentos de saúde, que deverão adotar campos, formatos e terminologias uniformes, conforme o padrão nacional, como condição para a contratação e para a participação em licitações com o poder público estadual.</p>
              <p className="lei-par"><span className="lei-par-label">§ 1º</span> O registro do diagnóstico será feito mediante seleção estruturada na Classificação Internacional de Doenças (CID), e o dos exames e das medicações, nas respectivas tabelas oficiais, vedado o registro exclusivamente em texto livre para esses campos.</p>
              <p className="lei-par"><span className="lei-par-label">§ 2º</span> Os sistemas oferecerão o preenchimento assistido desses campos no momento do atendimento, de modo a padronizar a informação em sua origem.</p>
            </article>

            <article className="lei-art">
              <p><span className="lei-art-num">Art. 6º</span> O tratamento dos dados pessoais decorrente desta Lei observará a Lei federal nº 13.709, de 2018 (Lei Geral de Proteção de Dados Pessoais), organizando-se em dois níveis:</p>
              <ul className="lei-incisos">
                <li><span className="lei-inc-num">I –</span> na transferência de urgência, o resumo clínico é transmitido automaticamente ao estabelecimento de destino, para a finalidade de continuidade do cuidado;</li>
                <li><span className="lei-inc-num">II –</span> fora da situação de urgência, o histórico clínico do paciente permanece acessível ao profissional que o assiste, mediante vínculo de atendimento e registro de auditoria de cada acesso.</li>
              </ul>
            </article>

            <article className="lei-art">
              <p><span className="lei-art-num">Art. 7º</span> Fica assegurada a rastreabilidade dos acessos e das transferências de informação, com registro de autoria, data e finalidade.</p>
              <p className="lei-par"><span className="lei-par-label">Parágrafo único.</span> O Estado produzirá e divulgará indicadores públicos sobre o tempo de disponibilização da informação ao estabelecimento de destino e sobre a ocorrência de repetição de exames por indisponibilidade de dados.</p>
            </article>

            <article className="lei-art">
              <p><span className="lei-art-num">Art. 8º</span> O órgão de regulação estadual disporá de painel integrado com as informações clínicas essenciais das transferências, para apoio à decisão clínica e à gestão da rede de urgência e emergência.</p>
            </article>

            <article className="lei-art">
              <p><span className="lei-art-num">Art. 9º</span> O Poder Executivo regulamentará esta Lei no prazo de 180 (cento e oitenta) dias, contado da sua publicação, podendo estabelecer prazos escalonados de implementação conforme a capacidade técnica dos estabelecimentos.</p>
            </article>

            <article className="lei-art">
              <p><span className="lei-art-num">Art. 10.</span> Esta Lei entra em vigor na data de sua publicação.</p>
            </article>

            <div className="lei-assinatura">
              <p>Sala das Sessões, ____ de __________ de 2026.</p>
              <p className="lei-assinatura-cargo">Deputado(a) Estadual</p>
            </div>

            {/* justificativa */}
            <div className="lei-justificativa">
              <h2 className="h2">Justificativa</h2>

              <h3 className="lei-just-titulo">O problema</h3>
              <p>Todos os dias, no Paraná, pacientes em estado grave são transferidos de uma unidade de urgência para hospitais de maior complexidade. Na maioria desses casos, o que acompanha o paciente é um resumo escrito à mão, enquanto o registro clínico completo — exames, resultados, imagens e medicações — permanece retido no sistema da unidade de origem. O médico que recebe o paciente precisa, muitas vezes, recomeçar a avaliação do zero, repetindo exames já realizados e perdendo tempo precioso em situações nas quais cada minuto influencia o desfecho. Não se trata de falta de tecnologia ou de recursos, mas da ausência de uma regra que obrigue a informação a acompanhar o paciente.</p>

              <h3 className="lei-just-titulo">A dimensão no Paraná</h3>
              <p>Somente no primeiro semestre de 2024, o Estado registrou mais de 100 mil transferências terrestres de urgência, crescimento superior a 15% em relação ao ano anterior, segundo o Governo do Estado e a Secretaria de Estado da Saúde.<sup>1</sup> Cada uma dessas transferências é um ponto em que a informação clínica pode se perder. A literatura de segurança do paciente demonstra que mais da metade dos erros de medicação ocorre justamente nos momentos de alta e de transferência entre unidades,<sup>2</sup> e estima-se que cerca de um em cada cinco exames laboratoriais seja repetido sem necessidade,<sup>3</sup> desperdício que, em âmbito nacional, é medido em bilhões de reais por ano.<sup>4</sup> O Paraná, ademais, é o único Estado do país a aplicar trombolítico ainda no atendimento pré-hospitalar para ganhar minutos em infarto e acidente vascular cerebral;<sup>5</sup> esse mesmo esforço é comprometido quando o hospital de destino recebe o paciente sem o seu histórico.</p>

              <h3 className="lei-just-titulo">O que já existe e por que não basta</h3>
              <p>O País avançou na base tecnológica: em julho de 2025, um decreto federal tornou a Rede Nacional de Dados em Saúde (RNDS) a plataforma oficial de interoperabilidade do SUS, adotando padrão nacional de troca de informações,<sup>6</sup> e o Paraná já se integra a essa rede, tendo iniciado, em novembro de 2025, o processo de federalização com oficina realizada em Curitiba.<sup>7</sup> O Estado também unificou a regulação de urgência com o sistema Care.<sup>8</sup> Ocorre que essa infraestrutura resolve o registro de rotina e a informação da vaga, mas não obriga que o dado clínico completo chegue ao destino no momento crítico da transferência de urgência. É exatamente esse elo que a presente proposta busca fechar.</p>

              <h3 className="lei-just-titulo">Custo e benefício</h3>
              <p>A proposta não cria órgão, cargo ou despesa nova relevante. A exigência de padronização é implementada por meio dos contratos e das licitações de sistemas que o poder público já realiza, valendo-se do próprio poder de compra do Estado para induzir a adequação dos fornecedores. Em contrapartida, os ganhos são expressivos: mais segurança para o paciente, economia de recursos com a redução de exames repetidos e aproveitamento do tempo em atendimentos de urgência. Trata-se de fazer a estrutura existente render mais, e não de ampliá-la.</p>

              <h3 className="lei-just-titulo">Proteção de dados</h3>
              <p>A proposta foi desenhada em conformidade com a Lei Geral de Proteção de Dados. A transmissão automática limita-se ao necessário à continuidade do cuidado na urgência; fora dela, o acesso ao histórico depende de vínculo de atendimento e é integralmente registrado em trilha de auditoria. O modelo é, portanto, mais protetor da privacidade do que a prática atual, em que resumos clínicos circulam em papel, sem controle de acesso.</p>

              <h3 className="lei-just-titulo">Um modelo para o Brasil</h3>
              <p>Ao transformar a interoperabilidade clínica em obrigação de resultado, com prazo e indicadores, o Paraná pode tornar-se referência nacional, oferecendo um modelo replicável por outros Estados. A infraestrutura tecnológica nacional já existe; falta o exemplo de quem a faça funcionar na ponta, no momento em que a vida do paciente depende disso. Por essas razões, submete-se a presente proposição à apreciação desta Casa.</p>

              <div className="lei-fontes">
                <p className="lei-fontes-titulo">Fontes citadas na justificativa</p>
                <ol>
                  <li>Governo do Estado do Paraná / Sesa (transferências de urgência, 1º sem. 2024).</li>
                  <li>Rev. Latino-Americana de Enfermagem (2016), com base em literatura da OMS.</li>
                  <li>Associação Brasileira de Medicina Diagnóstica (Abramed).</li>
                  <li>Estudo EY / Instituto de Estudos de Saúde Suplementar (IESS), 2023.</li>
                  <li>Secretaria de Estado da Saúde do Paraná.</li>
                  <li>Ministério da Saúde / gov.br (Decreto de 23/07/2025).</li>
                  <li>Sesa-PR (Resolução nº 1603/2025).</li>
                  <li>Sesa-PR (Sistema Care, 2020).</li>
                </ol>
              </div>
            </div>

            <div className="lei-download-fim">
              <a className="btn btn-primary" href={PDF} download>
                Baixar o PDF oficial do Projeto de Lei
              </a>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
