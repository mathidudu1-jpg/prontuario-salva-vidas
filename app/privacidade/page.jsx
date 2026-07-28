import Link from "next/link";
import SiteHeader from "../components/SiteHeader";
import SiteFooter from "../components/SiteFooter";

const EMAIL = "matheuseduardovuicik@gmail.com";
const ATUALIZADO = "28 de julho de 2026";

export const metadata = {
  title: "Privacidade e proteção de dados",
  description:
    "Como o Prontuário Salva-Vidas trata os dados de quem assina o manifesto: o que é coletado, por quê, por quanto tempo, e como pedir acesso ou exclusão. Em conformidade com a LGPD.",
  alternates: { canonical: "/privacidade" },
  robots: { index: true, follow: true },
};

export default function Privacidade() {
  return (
    <>
      <SiteHeader active="privacidade" />

      <main>
        <section className="lei-hero">
          <div className="container container--narrow">
            <p className="section-label">Privacidade e proteção de dados</p>
            <h1 className="lei-title">Seus dados, aqui.</h1>
            <p className="lei-subtitle">
              Um site que defende o cuidado com dados de saúde tem a obrigação de
              cuidar dos seus.
            </p>
            <p className="lei-context">
              Esta página explica, sem juridiquês, o que acontece com as informações
              que você preenche ao assinar o manifesto. Ela segue a Lei Geral de
              Proteção de Dados (Lei nº 13.709/2018).
            </p>
            <p className="priv-data">Última atualização: {ATUALIZADO}</p>
          </div>
        </section>

        <section className="lei-body">
          <div className="container container--narrow">

            <div className="priv-resumo">
              <p className="priv-resumo-titulo">O resumo, se você tiver 20 segundos</p>
              <ul>
                <li>Só coletamos dados se você preencher o formulário do manifesto. Navegar no site não gera coleta.</li>
                <li>Não há cookies, nem Google Analytics, nem pixel de rede social. Nenhum rastreador.</li>
                <li>Não vendemos, não alugamos e não cedemos seus dados para ninguém fazer publicidade.</li>
                <li>Você pode pedir para ver ou apagar seus dados a qualquer momento, por e-mail, e não precisa justificar.</li>
              </ul>
            </div>

            <h2 className="priv-h2">Quem é o responsável</h2>
            <p className="priv-p">
              O responsável pelo tratamento dos dados (o &quot;controlador&quot;, no
              vocabulário da LGPD) é Matheus Eduardo Vuicik, pessoa física, de
              Curitiba, Paraná. O Prontuário Salva-Vidas é uma campanha cívica
              independente: não é órgão público, não é empresa, não tem patrocínio.
            </p>
            <p className="priv-p">
              Contato para qualquer assunto desta página:{" "}
              <a href={`mailto:${EMAIL}?subject=LGPD%20%E2%80%94%20Prontu%C3%A1rio%20Salva-Vidas`}>{EMAIL}</a>.
            </p>

            <h2 className="priv-h2">O que é coletado, e só quando você assina</h2>
            <p className="priv-p">
              Nenhum dado é coletado por você simplesmente visitar o site. A coleta
              acontece em um único lugar: o formulário de assinatura do manifesto.
              Nele pedimos cinco informações.
            </p>

            <table className="priv-tabela">
              <thead>
                <tr><th>Dado</th><th>Por que pedimos</th></tr>
              </thead>
              <tbody>
                <tr>
                  <td>Nome</td>
                  <td>Identificar quem apoia a proposta. Uma assinatura sem nome não sustenta nada.</td>
                </tr>
                <tr>
                  <td>CPF</td>
                  <td>Evitar que a mesma pessoa assine várias vezes e dar peso real à lista diante de uma autoridade pública. É o que diferencia um abaixo-assinado sério de uma contagem inflada.</td>
                </tr>
                <tr>
                  <td>E-mail</td>
                  <td>Enviar atualizações sobre o andamento da proposta, e permitir que você comprove ser o titular ao pedir acesso ou exclusão.</td>
                </tr>
                <tr>
                  <td>Cidade</td>
                  <td>Mostrar a distribuição do apoio pelo estado, que é um argumento em si.</td>
                </tr>
                <tr>
                  <td>Você é (ocupação)</td>
                  <td>Entender quem apoia: profissional de saúde, gestor, cidadão. Também é argumento.</td>
                </tr>
              </tbody>
            </table>

            <p className="priv-p">
              Junto com esses campos guardamos a data e a hora da assinatura. Só isso.
              Não guardamos endereço de IP, não gravamos sua navegação e não usamos
              nenhuma ferramenta de análise de audiência.
            </p>

            <h2 className="priv-h2">Com que base legal</h2>
            <p className="priv-p">
              O seu consentimento, dado ao enviar o formulário (art. 7º, inciso I, da
              LGPD). Não existe outra base aqui, e por isso o consentimento pode ser
              retirado quando você quiser, com o mesmo efeito de um pedido de
              exclusão.
            </p>

            <h2 className="priv-h2">Para que serve, e para que não serve</h2>
            <p className="priv-p">
              A finalidade é uma só: demonstrar apoio público à proposta de lei e
              manter quem assinou informado sobre o que acontece com ela.
            </p>
            <p className="priv-p">
              Se a proposta for apresentada a parlamentares ou a órgãos públicos, o
              que pode acompanhá-la é a <strong>quantidade</strong> de apoiadores e,
              quando for pedido formalmente, a lista com <strong>nome, cidade e
              ocupação</strong>, que é o que caracteriza um abaixo-assinado.{" "}
              <strong>CPF e e-mail não entram em nenhuma lista apresentada a
              terceiros</strong> — eles ficam apenas conosco, para os fins descritos
              acima.
            </p>
            <p className="priv-p">
              Seus dados não serão vendidos, alugados, cedidos ou usados para
              publicidade, de ninguém, em nenhuma hipótese.
            </p>

            <h2 className="priv-h2">Onde ficam guardados</h2>
            <p className="priv-p">
              Os registros ficam em armazenamento privado da Vercel, a plataforma que
              hospeda este site, com acesso restrito por chave. Não são páginas
              públicas: não há URL que exponha a lista.
            </p>
            <p className="priv-p">
              Os servidores dessa plataforma ficam nos Estados Unidos. Isso configura
              uma transferência internacional de dados, e a LGPD exige que ela seja
              informada — é o que estamos fazendo aqui. A transferência acontece com
              base no seu consentimento (art. 33, inciso VIII), e a proteção do
              conteúdo é feita por criptografia em trânsito e controle de acesso.
            </p>

            <h2 className="priv-h2">Por quanto tempo</h2>
            <p className="priv-p">
              Enquanto a campanha estiver ativa, ou seja, até que a proposta seja
              apreciada, arquivada ou abandonada. Encerrado esse ciclo, os dados de
              identificação são eliminados, e o que pode restar é apenas o número
              total de apoiadores, sem qualquer informação pessoal. Você não precisa
              esperar esse prazo: pode pedir a exclusão antes, a qualquer momento.
            </p>

            <h2 className="priv-h2">Seus direitos</h2>
            <p className="priv-p">
              O artigo 18 da LGPD garante a você, sobre os seus dados, o direito de:
            </p>
            <ul className="priv-lista">
              <li>confirmar que existe tratamento e acessar o que guardamos;</li>
              <li>corrigir dados incompletos, inexatos ou desatualizados;</li>
              <li>pedir a eliminação dos dados tratados com base no consentimento;</li>
              <li>solicitar a portabilidade dos dados;</li>
              <li>revogar o consentimento, o que leva à exclusão;</li>
              <li>ser informado sobre com quem os dados foram compartilhados;</li>
              <li>opor-se a um tratamento que considere irregular.</li>
            </ul>
            <p className="priv-p">
              Para exercer qualquer um deles, escreva para{" "}
              <a href={`mailto:${EMAIL}?subject=LGPD%20%E2%80%94%20direitos%20do%20titular`}>{EMAIL}</a>{" "}
              a partir do e-mail que você usou ao assinar, ou informando o CPF cadastrado,
              para que seja possível confirmar que o pedido é seu. Respondemos em até 15
              dias. Não é preciso explicar o motivo, e não perguntaremos.
            </p>

            <h2 className="priv-h2">Segurança, sem promessa vazia</h2>
            <p className="priv-p">
              Os dados trafegam por conexão criptografada (HTTPS), ficam em
              armazenamento privado com acesso por chave, e o CPF nunca aparece em
              endereço, link ou página. O acesso à lista completa é restrito ao
              responsável pela campanha.
            </p>
            <p className="priv-p">
              Dito isso, nenhum sistema é imune. Se algum dia ocorrer um incidente de
              segurança capaz de gerar risco relevante a você, será comunicado por
              e-mail a quem foi afetado, e à Autoridade Nacional de Proteção de Dados,
              como manda o artigo 48 da LGPD.
            </p>

            <h2 className="priv-h2">Menores de idade</h2>
            <p className="priv-p">
              O manifesto é destinado a maiores de 18 anos. Não coletamos dados de
              crianças e adolescentes de forma consciente. Se identificarmos um
              cadastro nessa situação, ele será excluído.
            </p>

            <h2 className="priv-h2">Mudanças nesta página</h2>
            <p className="priv-p">
              Se algo mudar no que coletamos ou em como tratamos os dados, esta página
              será atualizada e a data no topo passará a refletir a revisão. Mudanças
              que ampliem o uso dos dados dependem de novo consentimento.
            </p>

            <div className="priv-fecho">
              <p>
                Ficou alguma dúvida que esta página não respondeu? Escreva para{" "}
                <a href={`mailto:${EMAIL}?subject=D%C3%BAvida%20sobre%20privacidade`}>{EMAIL}</a>.
              </p>
              <p className="priv-voltar">
                <Link href="/#assinar">← Voltar para o manifesto</Link>
              </p>
            </div>

          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
