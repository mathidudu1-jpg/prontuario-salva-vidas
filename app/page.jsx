import Animations from "./animations";

export default function Home() {
  return (
    <>
      <header className="site-header">
        <a href="#topo" className="logo" aria-label="Prontuário Salva-Vidas — início">
          <svg className="logo-tick" viewBox="0 0 56 24" aria-hidden="true" focusable="false">
            <path d="M0 12 H16 l4 5 5 -14 5 18 4 -9 H56" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="logo-text">Prontuário <strong>Salva-Vidas</strong></span>
        </a>
        <a href="#apoie" className="header-cta">Apoie</a>
      </header>

      <main>
        {/* ============ 1. HERÓI — O SOCO ============ */}
        <section className="hero" id="topo">
          <div className="hero-bg" id="hero-bg" aria-hidden="true"></div>

          <div className="container hero-inner">
            <div className="hero-copy">
              <p className="section-label">Campanha cívica · Saúde pública</p>
              <h1 className="hero-title" id="hero-title">A informação que pode te salvar não{" "}chega a{" "}tempo.</h1>
              <p className="hero-sub">O Prontuário Salva-Vidas defende uma lei simples: seus dados de saúde viajando com você, da UPA ao hospital.</p>
              <div className="hero-cta">
                <a href="#a-dor" className="btn btn-primary">Entenda a proposta</a>
              </div>
            </div>

            {/* TODO(matheus): substituir pelo vídeo de reels (o do "Netflix") */}
            <div className="hero-media" aria-label="Vídeo da campanha (em breve)">
              <div className="media-placeholder">
                <svg viewBox="0 0 48 48" className="play-icon" aria-hidden="true" focusable="false">
                  <circle cx="24" cy="24" r="23" fill="none" stroke="currentColor" strokeWidth="2" />
                  <path d="M19 15 L34 24 L19 33 Z" fill="currentColor" />
                </svg>
                <p className="placeholder-label">Vídeo · Reels</p>
                <p className="placeholder-hint">asset a inserir</p>
              </div>
            </div>
          </div>

          <div className="hero-ecg" aria-hidden="true">
            <svg viewBox="0 0 1440 160" preserveAspectRatio="xMidYMid slice" className="ecg-svg">
              <path id="ecg-path" d="M0,90 H480 q12,-16 24,0 H660 l10,10 14,-72 16,96 12,-34 H900 q16,-22 32,0 H1440"
                fill="none" stroke="var(--clay)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
              <circle id="ecg-dot" cx="0" cy="90" r="5" fill="var(--clay)" />
            </svg>
          </div>
        </section>

        {/* ============ 2. A DOR — A JORNADA ============ */}
        <section className="dor" id="a-dor">
          <div className="container">
            <p className="section-label section-label--barro">A dor</p>
            <h2 className="dor-title">Toda transferência é um recomeço às{" "}cegas.</h2>
            <p className="dor-lead">Você dá entrada na UPA com dor no peito. Exames, medicação, suspeita diagnóstica — tudo registrado. O quadro piora e a ambulância te leva ao Hospital das Clínicas. Lá, <strong>ninguém sabe o que já foi feito</strong>: seus dados ficaram presos no sistema de{" "}origem.</p>
          </div>

          <div className="dor-stage" id="dor-scene">
            <div className="container">
              <svg viewBox="0 0 1000 400" className="dor-svg" role="img"
                aria-label="A jornada do paciente em quatro etapas sobre uma linha de eletrocardiograma: entrada na UPA, ambulância, bloqueio do sistema fechado e recomeço no hospital.">

                {/* ETAPA 1 · a chegada: do pico do batimento nascem o chão, a porta da UPA e o humano */}
                <g id="jor-et1" stroke="var(--clay)" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <path id="il1-ground" d="M138,294 Q138,262 152,262 H256" />
                  <path id="il1-door" d="M240,262 v-64 q0,-16 -16,-16 h-20 q-16,0 -16,16 v64" />
                  <path id="il1-cross" d="M206,170 h16 M214,162 v16" />
                  <path id="il1-human" d="M152,262 L164,236 L164,214 a7.5,7.5 0 1 1 0.01,-15 a7.5,7.5 0 1 1 -0.01,15 M164,220 L178,230 M164,236 L176,262" />
                </g>

                <text id="jor-tag1" x="138" y="378" textAnchor="middle" className="jor-tag">1 · UPA</text>

                <path id="jor-line1" d="M0,330 H120 l8,8 10,-44 12,58 8,-22 H330" fill="none"
                  stroke="var(--clay)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />

                <path id="jor-ghost" d="M330,330 H1000" fill="none" stroke="var(--linha)" strokeWidth="3"
                  strokeDasharray="7 9" strokeLinecap="round" />
                <g className="jor-ghost-stop">
                  <circle cx="480" cy="330" r="15" fill="var(--papel)" stroke="var(--linha)" strokeWidth="2.5" />
                  <text x="480" y="336" textAnchor="middle" className="jor-ghost-num">2</text>
                </g>
                <g className="jor-ghost-stop">
                  <circle cx="690" cy="330" r="15" fill="var(--papel)" stroke="var(--linha)" strokeWidth="2.5" />
                  <text x="690" y="336" textAnchor="middle" className="jor-ghost-num">3</text>
                </g>
                <g className="jor-ghost-stop">
                  <circle cx="900" cy="330" r="15" fill="var(--papel)" stroke="var(--linha)" strokeWidth="2.5" />
                  <text x="900" y="336" textAnchor="middle" className="jor-ghost-num">4</text>
                </g>

                <circle id="jor-dot" cx="0" cy="330" r="8" fill="var(--clay)" />
              </svg>

              <div className="scene-captions">
                <p className="scene-caption" data-step="1"><strong>Etapa 1 · Entrada na UPA.</strong> Dor no peito, exames, medicação — cada gesto vira registro.</p>
                <p className="scene-caption" data-step="2">Etapa 2 · A ambulância parte para o hospital.</p>
                <p className="scene-caption" data-step="3">Etapa 3 · O dado bate no sistema fechado.</p>
                <p className="scene-caption" data-step="4">Etapa 4 · No hospital, tudo recomeça do zero.</p>
              </div>

              <button type="button" className="scene-replay">↺ rever</button>
            </div>
          </div>

          <div className="netflix-band">
            <div className="container netflix-block">
              <p className="section-label section-label--band">A analogia</p>
              <blockquote className="netflix-quote">
                <p>No streaming, você continua <em>exatamente</em> de onde parou.<br />
                  Na sua saúde, cada tela te faz <em>recomeçar do zero</em>.</p>
              </blockquote>

              <div className="stream-cards">
                <figure className="stream-card tv-card tv-card--go">
                  <div className="tv-thumb tv-thumb--go" aria-hidden="true">
                    <svg viewBox="0 0 320 150" preserveAspectRatio="xMidYMid slice">
                      <path d="M0,112 q50,-38 95,-12 q40,22 78,-18 q42,-44 92,-16 q30,16 55,4"
                        fill="none" stroke="var(--salvia-bright)" strokeWidth="2.5" strokeLinecap="round" />
                      <circle cx="250" cy="38" r="16" fill="none" stroke="var(--salvia-bright)" strokeWidth="2.5" />
                      <path d="M250,14 v-6 M250,68 v-4 M226,38 h-6 M280,38 h-6" stroke="var(--salvia-bright)" strokeWidth="2.5" strokeLinecap="round" />
                    </svg>
                    <span className="tv-badge">EP 4</span>
                    <span className="tv-play">
                      <svg viewBox="0 0 24 24"><path d="M8 5 L19 12 L8 19 Z" fill="currentColor" /></svg>
                    </span>
                  </div>
                  <figcaption>
                    <p className="stream-label">Seu streaming</p>
                    <p className="stream-title">Continuar assistindo</p>
                    <div className="bar"><div className="bar-fill bar-fill--go"></div></div>
                    <p className="stream-sub">Ep. 4 · 32 min restantes · de onde você parou</p>
                  </figcaption>
                </figure>

                <figure className="stream-card tv-card tv-card--stop">
                  <div className="tv-thumb tv-thumb--stop" aria-hidden="true">
                    <svg viewBox="0 0 320 150" preserveAspectRatio="xMidYMid slice">
                      <path d="M0,75 H120 l8,8 10,-38 12,48 8,-18 H190 H320" fill="none"
                        stroke="var(--barro-bright)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.5" />
                    </svg>
                    <span className="tv-badge tv-badge--err">SEM REGISTRO</span>
                  </div>
                  <figcaption>
                    <p className="stream-label">Sua saúde</p>
                    <p className="stream-title">Recomeçar do zero</p>
                    <div className="bar"><div className="bar-fill bar-fill--stop"></div></div>
                    <p className="stream-sub">Histórico indisponível · conte tudo de novo</p>
                  </figcaption>
                </figure>
              </div>
            </div>
          </div>

          <div className="container">
            <p className="dor-bridge">Isso tem nome: <strong>transferência às cegas</strong>. E tem solução — mais barata do que você imagina.</p>
          </div>
        </section>

        {/* ============ 3. OS TRÊS DESPERDÍCIOS ============ */}
        <section className="desperdicios" id="desperdicios">
          <div className="container">
            <p className="section-label section-label--barro">Os três desperdícios</p>
            <h2 className="h2">Enquanto isso, todo dia, o país paga a{" "}conta.</h2>

            <div className="waste-cards">
              <article className="waste-card">
                <p className="waste-kicker">Tempo</p>
                <p className="waste-number"><span className="count" data-target="2">2</span>×</p>
                <p className="waste-text">O mesmo exame, refeito — porque o resultado não chega junto com você.</p>
              </article>
              <article className="waste-card">
                <p className="waste-kicker">Dinheiro</p>
                <p className="waste-number">~<span className="count" data-target="46">46</span>%</p>
                <p className="waste-text">De desperdício com exames repetidos e consultas perdidas por falta de informação.</p>
              </article>
              <article className="waste-card">
                <p className="waste-kicker">Segurança</p>
                <p className="waste-number"><span className="count" data-target="100">100</span>%</p>
                <p className="waste-text">Das decisões na chegada dependem da memória de quem está passando mal.</p>
              </article>
            </div>
            {/* TODO(matheus): validar números finais e citar fontes do dossiê */}
            <p className="waste-note">Números do dossiê da campanha — fontes citadas no PDF-guia.</p>
          </div>
        </section>

        {/* ============ 4. A VIRADA — ANTES × DEPOIS ============ */}
        <section className="virada" id="a-virada">
          <div className="container">
            <p className="section-label section-label--salvia">A virada</p>
            <h2 className="h2">Tem solução. E é mais barata que o{" "}problema.</h2>
            <p className="section-lead">Uma lei de interoperabilidade obriga os sistemas a conversarem. O prontuário deixa de ser refém de cada tela — e passa a chegar <strong>junto com você</strong>.</p>

            <div className="virada-stage" id="virada-stage" data-state="hoje">
              <svg viewBox="0 0 800 80" className="virada-ecg" aria-hidden="true">
                <path id="ecg-jagged" d="M0,40 l35,-10 28,16 24,-20 32,24 26,-18 30,12 28,-22 36,18 30,-10 34,16 28,-20 38,14 32,-16 40,18 36,-12 44,8 40,-10 48,12 51,-6 40,8 40,-2"
                  fill="none" stroke="var(--barro)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                <path id="ecg-smooth" d="M0,40 H330 l10,8 12,-40 14,52 10,-20 H800"
                  fill="none" stroke="var(--salvia)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" opacity="0" />
              </svg>

              <div className="virada-board">
                <div className="virada-panel virada-panel--origem">
                  <p className="virada-panel-label">UPA · onde você foi atendido</p>
                  <div className="chip-slot" id="slot-origem">
                    <span className="data-chip">Exames</span>
                    <span className="data-chip">Alergias</span>
                    <span className="data-chip">Medicações</span>
                    <span className="data-chip">Diagnóstico</span>
                  </div>
                </div>
                <div className="virada-panel virada-panel--destino">
                  <p className="virada-panel-label">Hospital · onde você chega</p>
                  <div className="chip-slot chip-slot--destino" id="slot-destino"></div>
                </div>
              </div>

              <div className="virada-controls">
                <div className="virada-toggle" role="group" aria-label="Comparar hoje e com a lei">
                  <button type="button" className="toggle-btn is-active" data-state="hoje" aria-pressed="true">Hoje</button>
                  <button type="button" className="toggle-btn" data-state="depois" aria-pressed="false">Com a lei</button>
                </div>
                <p className="virada-caption" id="virada-caption" aria-live="polite">Hoje: seus dados ficam presos onde foram criados.</p>
              </div>
            </div>
          </div>
        </section>

        {/* ============ BLOCO DOSSIÊ ============ */}

        {/* 5. COMO FUNCIONA */}
        <section className="funciona dossie" id="como-funciona">
          <div className="container">
            <p className="section-label">O dossiê · Como funciona</p>
            <h2 className="h2">O caminho do dado, do jeito{" "}certo.</h2>
            <p className="section-lead">Na transferência, o sistema da UPA publica um resumo padronizado — e o hospital lê na hora, por uma <code className="mono-inline">API</code>. Sem papel, sem telefone, sem recomeço.</p>

            <div className="route js-scene" id="route-scene">
              <svg viewBox="0 0 1000 250" className="route-svg" role="img" aria-label="Diagrama: o dado sai da UPA, passa pela API padrão FHIR e chega ao hospital.">
                <g id="node-upa">
                  <rect x="40" y="70" width="150" height="100" rx="14" fill="var(--superficie)" stroke="var(--tinta)" strokeWidth="3" />
                  <rect x="105" y="95" width="18" height="50" rx="4" fill="var(--clay)" />
                  <rect x="89" y="111" width="50" height="18" rx="4" fill="var(--clay)" />
                  <text x="115" y="205" textAnchor="middle" className="route-label">UPA</text>
                </g>
                <path id="route-path" d="M190,120 H300 l8,8 10,-40 12,52 8,-20 H810" fill="none"
                  stroke="var(--petroleo)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                <circle id="route-dot" cx="190" cy="120" r="8" fill="var(--petroleo)" />
                <g id="node-fhir">
                  <rect x="425" y="95" width="150" height="50" rx="25" fill="var(--petroleo)" />
                  <text x="500" y="127" textAnchor="middle" className="route-chip-label">API · FHIR</text>
                </g>
                <g id="node-hc">
                  <rect x="810" y="70" width="150" height="100" rx="14" fill="var(--superficie)" stroke="var(--tinta)" strokeWidth="3" />
                  <rect x="875" y="95" width="18" height="50" rx="4" fill="var(--petroleo)" />
                  <rect x="859" y="111" width="50" height="18" rx="4" fill="var(--petroleo)" />
                  <text x="885" y="205" textAnchor="middle" className="route-label">HOSPITAL</text>
                </g>
              </svg>
              <button type="button" className="scene-replay route-replay">↺ rever</button>
            </div>

            <div className="route-legend">
              <p className="route-legend-item route-legend-item--hoje"><span className="legend-line legend-line--hoje"></span>Hoje: cada sistema fala a própria língua — o dado não passa.</p>
              <p className="route-legend-item route-legend-item--lei"><span className="legend-line legend-line--lei"></span>Com a lei: uma língua comum — o dado flui.</p>
            </div>

            <div className="funciona-sub">
              <div className="lego">
                <h3 className="h3">Blocos que se encaixam</h3>
                <p>No padrão <code className="mono-inline">FHIR</code>, cada pedaço do prontuário é um bloco de formato universal — encaixa em qualquer sistema.</p>
                <div className="lego-row" id="lego-row">
                  <span className="lego-block"><strong>Paciente</strong><code>Patient</code></span>
                  <span className="lego-block"><strong>Exames</strong><code>DiagnosticReport</code></span>
                  <span className="lego-block"><strong>Medicações</strong><code>MedicationRequest</code></span>
                  <span className="lego-block"><strong>Alergias</strong><code>AllergyIntolerance</code></span>
                </div>
                <div className="lego-slotbar" aria-hidden="true"></div>
              </div>

              <div className="dicionario">
                <h3 className="h3">Um dicionário comum</h3>
                <p>&quot;Infarto&quot;, &quot;IAM&quot;, &quot;ataque cardíaco&quot; — três nomes, um só significado. Para a máquina, vira <strong>um código só</strong>.</p>
                <div className="dic-stage" id="dic-stage">
                  <div className="dic-words">
                    <span className="dic-word">infarto</span>
                    <span className="dic-word">IAM</span>
                    <span className="dic-word">ataque cardíaco</span>
                  </div>
                  <span className="dic-arrow" aria-hidden="true">→</span>
                  <span className="dic-code">I21 · CID-10</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 6. "MAS ISSO JÁ NÃO EXISTE?" */}
        <section className="rnds dossie">
          <div className="container container--narrow">
            <p className="section-label">O dossiê · Contexto</p>
            <h2 className="h2">&quot;Mas isso já não existe?&quot;</h2>
            <p className="section-lead">Quase — e é exatamente por isso que a proposta é viável. Falta obrigar a última ponta.</p>

            {/* TODO(matheus): conteúdo final destes 3 itens sai do guia (módulos RNDS/SP) */}
            <details className="faq">
              <summary>O Brasil já tem a RNDS. Por que ela não basta?</summary>
              <div className="faq-body"><p>A Rede Nacional de Dados em Saúde já existe e já conecta sistemas — mas o envio de dados assistenciais na transferência de pacientes não é obrigatório na ponta. Na prática, a infraestrutura está de pé e o dado que salvaria seu atendimento continua opcional. A proposta transforma esse fluxo em obrigação legal, usando o que já foi construído.</p></div>
            </details>
            <details className="faq">
              <summary>São Paulo já começou (2026)</summary>
              <div className="faq-body"><p>O precedente existe: São Paulo aprovou a obrigatoriedade de interoperabilidade entre os sistemas da sua rede. É a prova de que o caminho é jurídica e tecnicamente possível — falta levar a régua para o resto do país.</p></div>
            </details>
            <details className="faq">
              <summary>Por que uma lei, e não um aplicativo?</summary>
              <div className="faq-body"><p>Padrão técnico sem obrigação vira recomendação — e recomendação não integra sistema de hospital. A lei não inventa tecnologia nova: ela dá prazo e consequência para o que a tecnologia já sabe fazer.</p></div>
            </details>
          </div>
        </section>

        {/* 7. SEGURANÇA E LGPD */}
        <section className="lgpd dossie">
          <div className="container">
            <p className="section-label">O dossiê · Segurança</p>
            <h2 className="h2">Mais seguro que papel numa prancheta de{" "}ambulância.</h2>
            <p className="section-lead">Interoperar não é escancarar. É mover o dado certo, para a pessoa certa, com registro de tudo — dentro da LGPD.</p>

            <div className="lgpd-grid">
              <ul className="lgpd-list">
                <li><strong>Minimização</strong> — só viaja o essencial para o seu atendimento.</li>
                <li><strong>Finalidade assistencial</strong> — o dado serve para te tratar. Nada além disso.</li>
                <li><strong>Controle de acesso</strong> — só os profissionais envolvidos no seu caso.</li>
                <li><strong>Trilha de auditoria</strong> — todo acesso deixa rastro: quem viu, o quê, quando.</li>
              </ul>

              <div className="audit-card" id="audit-card">
                <p className="audit-title">
                  <svg viewBox="0 0 24 28" className="audit-shield" aria-hidden="true">
                    <path id="shield-path" d="M12 2 L22 6 V14 C22 20 17.5 24.5 12 26 C6.5 24.5 2 20 2 14 V6 Z"
                      fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
                    <path id="shield-check" d="M7.5 13.5 L11 17 L17 10.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  Trilha de auditoria
                </p>
                <ul className="audit-log">
                  <li><time>14:32</time> Dra. Ana L. · HC <em>visualizou alergias</em></li>
                  <li><time>14:31</time> Enf. Carlos M. · HC <em>visualizou medicações</em></li>
                  <li><time>14:20</time> Sistema UPA Central <em>publicou resumo clínico</em></li>
                  <li><time>14:19</time> Dr. João P. · UPA <em>autorizou transferência</em></li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* 8. O ROSTO HUMANO */}
        <section className="rosto">
          <div className="rosto-media" id="rosto-media">
            {/* TODO(matheus): inserir foto de idoso feliz/cuidado (banco com licença livre, brasileiro se possível) */}
            <div className="rosto-inner">
              <div className="rosto-placeholder">
                <p className="placeholder-label">Foto · idoso feliz, cuidado</p>
                <p className="placeholder-hint">asset a inserir</p>
              </div>
            </div>
            <blockquote className="rosto-quote">
              <p>Ninguém deveria recontar a própria história num momento em que mal consegue{" "}falar.</p>
            </blockquote>
          </div>
        </section>

        {/* 9. CHAMADA FINAL */}
        <section className="final" id="apoie">
          <div className="final-ecg" aria-hidden="true">
            <svg viewBox="0 0 1440 120" preserveAspectRatio="xMidYMid slice" className="ecg-svg ecg-svg--final">
              <path id="final-ecg-path" d="M0,70 H500 q12,-14 24,0 H660 l10,8 14,-56 16,74 12,-26 H900 q16,-18 32,0 H1440"
                fill="none" stroke="var(--salvia)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
              <circle id="final-ecg-dot" cx="0" cy="70" r="5" fill="var(--salvia)" />
            </svg>
          </div>
          <div className="container final-inner">
            <h2 className="final-title">Apoie o Prontuário Salva-Vidas.</h2>
            <p className="section-lead final-lead">Uma lei simples, uma tecnologia que já existe, um direito de todo paciente: chegar ao hospital com a própria história.</p>
            <a className="btn btn-primary" href="mailto:contato@prontuariosalvavidas.com.br?subject=Quero%20apoiar%20o%20Prontu%C3%A1rio%20Salva-Vidas">Quero apoiar</a>
            <div className="final-links">
              {/* TODO(matheus): linkar PDF do dossiê e texto do PL quando prontos */}
              <a href="#" className="final-link">Baixar o dossiê (PDF)</a>
              <a href="#" className="final-link">Texto do Projeto de Lei <span className="final-link-soon">em redação</span></a>
            </div>
            <p className="final-contact">contato@prontuariosalvavidas.com.br</p>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container">
          <svg className="logo-tick" viewBox="0 0 56 24" aria-hidden="true" focusable="false">
            <path d="M0 12 H16 l4 5 5 -14 5 18 4 -9 H56" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <p>Prontuário Salva-Vidas · <a href="mailto:contato@prontuariosalvavidas.com.br">contato@prontuariosalvavidas.com.br</a></p>
        </div>
      </footer>

      <Animations />
    </>
  );
}
