import Link from "next/link";
import Animations from "./animations";
import SiteHeader from "./components/SiteHeader";
import SiteFooter from "./components/SiteFooter";
import ManifestoForm from "./components/ManifestoForm";

export default function Home() {
  return (
    <>
      <SiteHeader active="home" />

      <main>
        {/* ============ 1. HERÓI — O SOCO ============ */}
        <section className="hero" id="topo">
          <div className="hero-bg" id="hero-bg" aria-hidden="true"></div>

          <div className="container hero-inner">
            <div className="hero-copy">
              <p className="section-label">Campanha cívica · Saúde pública</p>
              <h1 className="hero-title" id="hero-title">E se desse para economizar até R$ 12 bilhões por ano e salvar vidas, com uma solução que já existe?<br />Esta solução cabe em uma lei.</h1>
              <p className="hero-sub">Todo ano o Brasil desperdiça bilhões repetindo exames que já haviam sido feitos, e perde minutos decisivos no atendimento de um infarto, um AVC (Acidente Vascular Cerebral) e outras emergências. A tecnologia que corrige isso já existe. Implantá-la exige um investimento inicial, pequeno diante da economia que gera. Me chamo Matheus Vuicik, sou de Curitiba, e transformei esse problema em uma proposta de lei.</p>
              <div className="hero-cta">
                <a href="#a-dor" className="btn btn-primary">Me dá 30 segundos</a>
              </div>
              <p className="hero-source">Os R$ 12 bilhões são o desperdício anual do país com exames desnecessários, não apenas nas transferências. Fonte: EY/IESS, 2023.</p>
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
            <h2 className="dor-title">Trocou de hospital? Seu histórico ficou para trás.</h2>
            <p className="dor-lead">A situação é a seguinte: você dá entrada na UPA com dor no peito. Faz exames, recebe medicação, tudo fica registrado no sistema. O quadro piora e a ambulância leva você para um hospital de maior complexidade. Chegando lá, o médico consegue ver o que já foi feito? Nada. <strong>Você, passando mal, vira a única fonte de informação sobre si mesmo.</strong></p>
          </div>

          <div className="dor-stage" id="dor-scene">
            <div className="container">
              <svg viewBox="0 140 1000 250" className="dor-svg" role="img"
                aria-label="A jornada do paciente em quatro etapas sobre uma linha de eletrocardiograma: entrada na UPA, trajeto de ambulância, o dado barrado num muro, e o recomeço do zero no hospital.">

                {/* ETAPA 1 · entrada na UPA: do pico nascem o chão, o prédio e o humano */}
                <g id="jor-et1" stroke="var(--clay)" strokeWidth="3.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <path id="il1-ground" d="M138,294 Q138,262 152,262 H310" />
                  <path id="il1-build" d="M302,262 V180 H200 V262" />
                  <path id="il1-door" d="M208,262 v-42 h28 v42" />
                  <path id="il1-cross" d="M252,208 h20 M262,198 v20" />
                  <path id="il1-human" d="M158,262 L170,236 L170,208 a7.5,7.5 0 1 1 0.01,-15 a7.5,7.5 0 1 1 -0.01,15 M170,216 L184,226 M170,236 L182,262" />
                </g>
                <text id="jor-tag1" x="230" y="378" textAnchor="middle" className="jor-tag">1 · UPA</text>

                {/* ETAPA 2 · a linha vira o trajeto da ambulância */}
                <g id="jor-et2" stroke="var(--clay)" strokeWidth="3.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <path id="il2-road" d="M378,294 Q378,270 392,270 H556" />
                  <g id="jor-amb">
                    <path id="il2-body" d="M408,262 V228 H460 v12 h18 l12,14 v8" />
                    <path id="il2-details" d="M430,242 h14 M437,235 v14 M462,236 h12 v10 M436,228 v-6 h8 v6" />
                    <circle id="il2-wheel1" cx="428" cy="265" r="6.5" />
                    <circle id="il2-wheel2" cx="472" cy="265" r="6.5" />
                  </g>
                </g>
                <text id="jor-tag2" x="470" y="378" textAnchor="middle" className="jor-tag">2 · AMBULÂNCIA</text>

                {/* ETAPA 3 · o muro: o sistema fechado */}
                <g id="jor-et3" stroke="var(--barro)" strokeWidth="3.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <path id="il3-wall" d="M636,330 V244 H662 V330" />
                  <path id="il3-bricks" d="M636,301 h26 M636,272 h26 M649,330 v-29 M643,301 v-29 M655,272 v-28" />
                  <path id="il3-x" d="M642,213 L656,227 M656,213 L642,227" strokeWidth="4.5" />
                </g>
                <text id="jor-tag3" x="649" y="378" textAnchor="middle" className="jor-tag jor-tag--barro">3 · BLOQUEIO</text>

                {/* ETAPA 4 · o hospital grande: você é atendido — mas sem o seu histórico */}
                <g id="jor-et4" stroke="var(--clay)" strokeWidth="3.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <path id="il4-ground" d="M700,294 Q700,262 714,262 H998" />
                  <path id="il4-build" d="M724,262 V166 H976 V262" />
                  <path id="il4-roof" d="M724,166 L752,150 H948 L976,166" />
                  <path id="il4-cross" d="M841,190 h18 M850,181 v18" stroke="var(--petroleo)" />
                  <path id="il4-bed" d="M756,262 V250 H856 V262 M756,250 V234 Q756,230 760,230 H778" />
                  <circle id="il4-phead" cx="770" cy="222" r="7" />
                  <path id="il4-patient" d="M782,228 Q802,237 818,235 Q834,233 848,246" />
                  <g id="il4-doctor" stroke="var(--petroleo)">
                    <circle cx="900" cy="206" r="7.5" />
                    <path d="M900,214 V242 M900,242 L891,262 M900,242 L909,262 M900,222 L874,234" />
                  </g>
                  <path id="il4-q" d="M735,214 Q735,206 743,206 Q751,206 751,214 Q751,220 743,222 L743,226 M743,231 v0.6" stroke="var(--barro)" strokeWidth="3" />
                </g>
                <text id="jor-tag4" x="850" y="378" textAnchor="middle" className="jor-tag">4 · HOSPITAL</text>

                {/* a linha-jornada em três trechos (a vida continua; o dado fica no muro) */}
                <path id="jor-line1" d="M0,330 H120 l8,8 10,-44 12,58 8,-22 H300" fill="none"
                  stroke="var(--clay)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                <path id="jor-line2" d="M300,330 H360 l8,8 10,-44 12,58 8,-22 H520 l6,6 8,-28 10,36 6,-14 H636" fill="none"
                  stroke="var(--clay)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                <path id="jor-line3" d="M662,330 H830 l8,8 10,-44 12,58 8,-22 H1000" fill="none"
                  stroke="var(--clay)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />

                {/* o pacote de dados */}
                <circle id="jor-dot" cx="0" cy="330" r="8" fill="var(--clay)" />
              </svg>

              <div className="scene-captions">
                <p className="scene-caption" data-step="1"><strong>Etapa 1 · Entrada na UPA.</strong> Exame feito, tudo registrado.</p>
                <p className="scene-caption" data-step="2"><strong>Etapa 2 · Piorou.</strong> A ambulância leva você. Seus dados tentam ir junto.</p>
                <p className="scene-caption" data-step="3"><strong>Etapa 3 · O muro.</strong> O sistema do hospital fecha a porta para o dado.</p>
                <p className="scene-caption" data-step="4"><strong>Etapa 4 · Você chega sem passado.</strong> O médico começa do zero.</p>
              </div>

              <button type="button" className="scene-replay">↺ rever</button>
            </div>
          </div>

          <div className="netflix-band">
            <div className="container netflix-block">
              <p className="section-label section-label--band">A analogia</p>
              <blockquote className="netflix-quote">
                <p>
                  <span className="netflix-line">Na Netflix, você continua <em className="em-go">de onde parou</em>.</span>
                  <span className="netflix-line">Na saúde, cada hospital obriga você a <em className="em-stop">voltar ao episódio 1</em>.</span>
                </p>
              </blockquote>

              <div className="stream-cards">
                <figure className="stream-card tv-card tv-card--go">
                  <div className="tv-thumb tv-thumb--go" aria-hidden="true">
                    <svg viewBox="0 0 320 150" preserveAspectRatio="xMidYMid slice">
                      <path className="tv-scene" d="M0,122 q46,-30 92,-8 q40,20 74,-14 q42,-40 96,-14 q30,14 58,2"
                        fill="none" stroke="var(--salvia-bright)" strokeWidth="2.5" strokeLinecap="round" opacity="0.5" />
                      <circle className="tv-scene" cx="250" cy="44" r="15" fill="none" stroke="var(--salvia-bright)" strokeWidth="2.5" opacity="0.5" />
                    </svg>
                    <span className="tv-badge">EP 4 · SÉRIE</span>
                    <span className="tv-play">
                      <svg className="ic ic-pause" viewBox="0 0 24 24"><rect x="7" y="5" width="3.6" height="14" rx="1.2" /><rect x="13.4" y="5" width="3.6" height="14" rx="1.2" /></svg>
                      <svg className="ic ic-play" viewBox="0 0 24 24"><path d="M8 5 L19 12 L8 19 Z" /></svg>
                    </span>
                    <div className="tv-scrubber"><span className="tv-scrubber-fill"></span><span className="tv-playhead"></span></div>
                  </div>
                  <figcaption>
                    <p className="stream-label">Sua série</p>
                    <p className="stream-title">Continuar assistindo</p>
                    <div className="bar"><div className="bar-fill bar-fill--go"></div></div>
                    <p className="stream-sub">Ep. 4 · 32 min restantes · de onde você parou</p>
                  </figcaption>
                </figure>

                <figure className="stream-card tv-card tv-card--stop">
                  <div className="tv-thumb tv-thumb--stop" aria-hidden="true">
                    <svg viewBox="0 0 320 150" preserveAspectRatio="xMidYMid slice">
                      <path className="tv-flat" d="M0,60 H126 l8,9 10,-40 12,50 8,-19 H320" fill="none"
                        stroke="var(--barro-bright)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.32" />
                      <line x1="150" y1="120" x2="286" y2="120" stroke="var(--barro-bright)" strokeWidth="2" opacity="0.22" />
                      <path id="tv-reset" d="M214,78 a19,19 0 1 1 -19,-19 M195,59 l-9,-3 M195,59 l3,-9"
                        fill="none" stroke="var(--barro-bright)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" opacity="0" />
                      <g id="tv-walker" fill="none" stroke="var(--barro-bright)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M164,78 a5,5 0 1 1 0.01,-10 a5,5 0 1 1 -0.01,10 M164,78 V100 M164,86 L156,92 M164,86 L172,92 M164,100 L157,116 M164,100 L171,116" />
                      </g>
                    </svg>
                    <span className="tv-badge tv-badge--err">SEM REGISTRO</span>
                  </div>
                  <figcaption>
                    <p className="stream-label">Sua saúde</p>
                    <p className="stream-title">Recomeçar do zero</p>
                    <div className="bar"><div className="bar-fill bar-fill--stop"></div></div>
                    <p className="stream-sub">Histórico indisponível. Conte tudo de novo.</p>
                  </figcaption>
                </figure>
              </div>
            </div>
          </div>

          <div className="container">
            <p className="dor-bridge">Isso tem nome: <strong>transferência às cegas</strong>. E resolver sai mais barato que continuar pagando exame repetido.</p>
          </div>
        </section>

        {/* ============ 3. OS TRÊS DESPERDÍCIOS ============ */}
        <section className="desperdicios" id="desperdicios">
          <div className="container">
            <p className="section-label section-label--barro">Os três desperdícios</p>
            <h2 className="h2">Esse recomeço cobra caro. E quem paga é a gente.</h2>

            <div className="waste-cards">
              <article className="waste-card">
                <p className="waste-kicker">Tempo · Brasil</p>
                <p className="waste-number waste-number--word">tempo é músculo.</p>
                <p className="waste-text">É o que a medicina diz sobre infarto. Em AVC, tempo é cérebro. E na emergência, refazer tudo do zero joga o relógio contra o paciente.</p>
                <p className="waste-src">Fonte: OMS, Relatório Global de Segurança do Paciente (2024)</p>
              </article>
              <article className="waste-card">
                <p className="waste-kicker">Dinheiro · Brasil</p>
                <p className="waste-number waste-number--sm">1 em <span className="count" data-target="5">5</span></p>
                <p className="waste-text">exames de laboratório é repetido sem necessidade. Só com exame desnecessário, o país gasta cerca de R$ 12 bilhões por ano.</p>
                <p className="waste-src">Fontes: Abramed · EY/IESS (2023)</p>
              </article>
              <article className="waste-card">
                <p className="waste-kicker">Segurança · Brasil</p>
                <p className="waste-number">+<span className="count" data-target="50">50</span>%</p>
                <p className="waste-text">dos erros de medicação acontecem na alta ou na transferência entre unidades. Justamente quando o seu histórico some.</p>
                <p className="waste-src">Fonte: Rev. Latino-Am. de Enfermagem (2016), base OMS</p>
              </article>
            </div>
            <p className="waste-note">Todo número deste site tem fonte, sempre logo ao lado. Estes são os números do Brasil; abaixo, a dimensão disso no Paraná. O resto da pesquisa está na página <Link href="/o-projeto">O projeto</Link>.</p>
          </div>
        </section>

        {/* ============ 3B. A DIMENSÃO LOCAL — PARANÁ ============ */}
        <section className="parana" id="parana">
          <div className="container">
            <p className="section-label section-label--barro">A dimensão local · Paraná</p>
            <h2 className="h2">No Paraná, são mais de 100 mil chances de errar por semestre.</h2>
            <p className="section-lead">Cada transferência é um ponto onde o histórico do paciente pode se perder. E olha o volume disso por aqui.</p>

            <div className="pr-stats">
              <div className="pr-stat" data-reveal>
                <p className="pr-num">+100 mil</p>
                <div className="pr-body">
                  <p className="pr-text">transferências terrestres de urgência no Paraná apenas no primeiro semestre de 2024, mais de 15% acima do ano anterior. Em cada uma delas, o que acompanha o paciente é um resumo escrito à mão, enquanto o registro completo fica para trás.</p>
                  <p className="waste-src">Fonte: Governo do Paraná / Sesa</p>
                </div>
              </div>
              <div className="pr-stat" data-reveal>
                <p className="pr-num">+50%</p>
                <div className="pr-body">
                  <p className="pr-text">dos erros de medicação acontecem justamente no momento da transferência (OMS), e cerca de 1 em cada 5 exames é repetido sem necessidade (Abramed). Ou seja: mais de 100 mil vezes por semestre, no Paraná, o sistema depende de um papel para não errar em um dos momentos mais críticos do atendimento.</p>
                  <p className="waste-src">Fontes: OMS · Abramed (dados nacionais)</p>
                </div>
              </div>
              <div className="pr-stat" data-reveal>
                <p className="pr-num">R$ 8.371</p>
                <div className="pr-body">
                  <p className="pr-text">por dose: o Paraná é o único estado do país que aplica trombolítico ainda na ambulância, para ganhar minutos preciosos em infarto e AVC. Esses mesmos minutos são perdidos quando o hospital de destino recebe o paciente sem o histórico e precisa recomeçar do zero.</p>
                  <p className="waste-src">Fonte: Sesa-PR</p>
                </div>
              </div>
            </div>

            <blockquote className="pr-sintese" data-reveal>
              <p>O problema não é a falta de transferências. É que cada uma delas depende de papel, num estado que já investe pesado para ganhar tempo e depois o desperdiça na porta do hospital.</p>
            </blockquote>
          </div>
        </section>

        {/* ============ 4. A VIRADA — ANTES × DEPOIS ============ */}
        <section className="virada" id="a-virada">
          <div className="container">
            <p className="section-label section-label--salvia">A virada</p>
            <h2 className="h2">Tem conserto. E custa menos que o problema.</h2>
            <p className="section-lead">A proposta é uma lei estadual do Paraná que obriga os sistemas de saúde a conversarem entre si. Na prática, o seu prontuário chega ao hospital <strong>junto com você</strong>, sem depender da sua memória.</p>

            <div className="virada-stage" id="virada-stage" data-state="hoje">
              <svg viewBox="0 0 800 80" className="virada-ecg" aria-hidden="true">
                <path id="ecg-jagged" d="M0,40 l35,-10 28,16 24,-20 32,24 26,-18 30,12 28,-22 36,18 30,-10 34,16 28,-20 38,14 32,-16 40,18 36,-12 44,8 40,-10 48,12 51,-6 40,8 40,-2"
                  fill="none" stroke="var(--barro)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                <path id="ecg-smooth" d="M0,40 H330 l10,8 12,-40 14,52 10,-20 H800"
                  fill="none" stroke="var(--salvia)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" opacity="0" />
              </svg>

              <div className="virada-board">
                <div className="virada-wall" aria-hidden="true"></div>
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
                <p className="virada-caption" id="virada-caption" aria-live="polite">Hoje: o seu dado bate na parede e volta.</p>
              </div>
            </div>
          </div>
        </section>

        {/* ============ 4B. CURITIBA JÁ PROVOU QUE FUNCIONA ============ */}
        <section className="curitiba">
          <div className="container curitiba-inner">
            <div className="curitiba-copy">
              <p className="section-label section-label--band">Destaque municipal · Curitiba</p>
              <h2 className="h2 h2--light">Curitiba já provou que funciona.</h2>
              <p>Curitiba conectou a própria rede há mais de vinte anos. Desde 2000, o e-Saúde interliga as unidades de saúde e as UPAs do município, e o prontuário de quem é atendido numa unidade pode ser visto na outra. Dentro da rede municipal, a informação flui.</p>
              <p>O problema começa na fronteira: quando o paciente precisa de um hospital, a comunicação volta ao papel, com relatórios médicos impressos indo e voltando.</p>
              <p className="curitiba-punch">A cidade que provou que integrar funciona merece que a integração atravesse a porta do hospital.</p>
              <p className="waste-src waste-src--light">Fontes: Saúde em Debate, estudo sobre as UPAs do Paraná · Prefeitura de Curitiba (estimativa)</p>
            </div>
            <div className="curitiba-stat" data-reveal>
              <p className="curitiba-num">≈100 mil</p>
              <p className="curitiba-caption">atendimentos por mês nas UPAs de Curitiba</p>
              <p className="curitiba-since">e-Saúde interligando a rede municipal desde 2000</p>
            </div>
          </div>
        </section>

        {/* ============ BLOCO DOSSIÊ ============ */}

        {/* 5. COMO FUNCIONA */}
        <section className="funciona dossie" id="como-funciona">
          <div className="container">
            <p className="section-label">O dossiê · Como funciona</p>
            <h2 className="h2">O caminho do dado, do jeito{" "}certo.</h2>
            <p className="section-lead">Na transferência, o sistema da UPA publica um resumo clínico padronizado. O hospital lê esse resumo na hora, por uma <code className="mono-inline">API</code>. Ninguém imprime papel, ninguém fica pendurado no telefone.</p>

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
              <p className="route-legend-item route-legend-item--hoje"><span className="legend-line legend-line--hoje"></span>Hoje: cada sistema fala a própria língua e o dado não passa.</p>
              <p className="route-legend-item route-legend-item--lei"><span className="legend-line legend-line--lei"></span>Com a lei: todo mundo fala a mesma língua e o dado flui.</p>
            </div>

            <div className="funciona-sub">
              <div className="lego">
                <h3 className="h3">Blocos que se encaixam</h3>
                <p>O padrão <code className="mono-inline">FHIR</code> divide o prontuário em blocos de formato universal. Qualquer sistema moderno encaixa esses blocos. É o mesmo padrão que o decreto federal adotou para a RNDS.</p>
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
                <p>&quot;Infarto&quot;, &quot;IAM&quot; e &quot;ataque cardíaco&quot; são o mesmo diagnóstico com três nomes. Com um dicionário comum, a máquina lê os três como <strong>um código só</strong>.</p>
                <div className="dic-stage" id="dic-stage">
                  <div className="dic-words">
                    <span className="dic-word">infarto</span>
                    <span className="dic-word">IAM</span>
                    <span className="dic-word">ataque cardíaco</span>
                  </div>
                  <span className="dic-arrow" aria-hidden="true">→</span>
                  <span className="dic-code">I21 · CID-10</span>
                </div>
                <p className="dic-rule">Agora isso vira regra da lei: o diagnóstico passa a ser registrado pela seleção da lista oficial da CID no momento do atendimento, e não em texto livre. Ao escolher <strong>infarto</strong>, o sistema grava sozinho o código único correspondente — e o dado nasce padronizado, legível por qualquer sistema.</p>
              </div>
            </div>
          </div>
        </section>

        {/* 5B. O QUE VIAJA COM VOCÊ */}
        <section className="viaja dossie">
          <div className="container">
            <p className="section-label">O dossiê · O que viaja com você</p>
            <h2 className="h2">Não é um resumo de meia página. É o registro inteiro.</h2>
            <p className="section-lead">Hoje, isso tudo fica para trás. Com a lei, viaja junto, completo: o registro integral do episódio.</p>

            <div className="viaja-grid" data-reveal-group>
              <article className="viaja-card">
                <svg viewBox="0 0 32 32" aria-hidden="true"><path d="M12,4 h8 M14,4 v8 L8,23 a2.5,2.5 0 0 0 2.2,4 h11.6 a2.5,2.5 0 0 0 2.2,-4 L18,12 V4 M11,19 h10" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                <h3>Exames e resultados</h3>
              </article>
              <article className="viaja-card">
                <svg viewBox="0 0 32 32" aria-hidden="true"><rect x="5" y="6" width="22" height="20" rx="2.5" fill="none" stroke="currentColor" strokeWidth="2" /><path d="M11,11 v10 M16,10 v12 M21,11 v10" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
                <h3>Imagens: raio-X, tomografia</h3>
              </article>
              <article className="viaja-card">
                <svg viewBox="0 0 32 32" aria-hidden="true"><path d="M6,15 l7,-7 a4.2,4.2 0 0 1 6,6 l-7,7 a4.2,4.2 0 0 1 -6,-6 Z M9.5,11.5 l6,6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /><circle cx="23" cy="23" r="6" fill="none" stroke="currentColor" strokeWidth="2" /><path d="M23,20.5 v2.5 h2" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
                <h3>Medicações com horários</h3>
              </article>
              <article className="viaja-card">
                <svg viewBox="0 0 32 32" aria-hidden="true"><path d="M16,5 L28,26 H4 Z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" /><path d="M16,13 v6 M16,22.5 v0.6" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" /></svg>
                <h3>Alergias</h3>
              </article>
              <article className="viaja-card">
                <svg viewBox="0 0 32 32" aria-hidden="true"><path d="M5,26 h22 M5,26 V6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /><path d="M8,21 l5,-5 4,3 6,-8" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                <h3>Evolução clínica</h3>
              </article>
              <article className="viaja-card">
                <svg viewBox="0 0 32 32" aria-hidden="true"><rect x="7" y="6" width="18" height="21" rx="2.5" fill="none" stroke="currentColor" strokeWidth="2" /><rect x="12" y="4" width="8" height="4" rx="1.5" fill="none" stroke="currentColor" strokeWidth="2" /><path d="M12,14 h8 M12,18 h8 M12,22 h5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
                <h3>Atendimentos do episódio</h3>
              </article>
            </div>
          </div>
        </section>

        {/* 5C. A REGRA VALE PARA QUEM FABRICA O SOFTWARE */}
        <section className="regra dossie">
          <div className="container">
            <p className="section-label">O dossiê · A raiz do problema</p>
            <h2 className="h2">A regra vale para quem fabrica o software.</h2>

            <div className="regra-grid">
              <div className="regra-copy proj-prose">
                <p>Não adianta obrigar sistemas a conversar se cada fabricante inventa os próprios campos. A lei alcança a origem do problema: todo software de prontuário vendido ao poder público precisa usar os mesmos campos, com os mesmos nomes e os mesmos códigos, no padrão nacional.</p>
                <p>Sem criar infraestrutura nova: a exigência entra nos contratos e nas licitações que já acontecem. Há um custo de adaptação, pequeno perto do desperdício que evita.</p>
                <p>A proposta não se resume à tecnologia: além de integrar e padronizar os sistemas, ela prevê a capacitação das equipes, porque um sistema integrado só funciona se as informações forem registradas de forma completa e padronizada por quem atende.</p>
                <p className="regra-punch">Quem não segue a gramática, não vende para o SUS.</p>
              </div>
              <div className="regra-chips" data-reveal-group>
                <div className="regra-chip"><span>pressão arterial</span><span className="regra-arrow" aria-hidden="true">→</span><code>campo estruturado</code></div>
                <div className="regra-chip"><span>diagnóstico</span><span className="regra-arrow" aria-hidden="true">→</span><code>código único</code></div>
                <div className="regra-chip"><span>exame</span><span className="regra-arrow" aria-hidden="true">→</span><code>dicionário universal</code></div>
              </div>
            </div>
          </div>
        </section>

        {/* 6. "MAS ISSO JÁ NÃO EXISTE?" */}
        <section className="rnds dossie">
          <div className="container container--narrow">
            <p className="section-label">O dossiê · Contexto</p>
            <h2 className="h2">&quot;Mas isso já não existe?&quot;</h2>
            <p className="section-lead">Quase. O Brasil já construiu a base. O que falta é obrigar o último elo, que é justamente onde o paciente mais se machuca.</p>

            <blockquote className="rnds-quote"><p>Não falta computador. Falta os computadores conversarem.</p></blockquote>

            <details className="faq">
              <summary>A RNDS existe. Por que ela ainda não resolve?</summary>
              <div className="faq-body">
                <p>A Rede Nacional de Dados em Saúde é coisa séria: desde 23 de julho de 2025, um decreto federal a tornou a plataforma oficial de interoperabilidade do SUS, no padrão HL7 FHIR. Mais de 80% dos estados e 3.805 municípios já enviam registros, e a base passa de 2,8 bilhões de documentos. O próprio ministro da Saúde resumiu na cerimônia: &quot;dado é vida&quot;.</p>
                <p>Agora o outro lado da moeda: a maturidade digital média dos hospitais brasileiros está em 46,19%, e 75% deles seguem sem sistemas integrados entre si. O registro nacional existe. O resumo clínico chegando em tempo real numa transferência de urgência, esse ainda depende de boa vontade. É esse elo que a lei transforma em obrigação.</p>
                <p className="faq-src">Fontes: Ministério da Saúde (jul/2025) · Mapa da Transformação Digital dos Hospitais Brasileiros 2024, Folks</p>
              </div>
            </details>
            <details className="faq">
              <summary>Os estados já se mexeram. O Paraná inclusive.</summary>
              <div className="faq-body">
                <p>São Paulo determinou a integração dos sistemas da sua rede por portaria da Secretaria da Saúde. E aqui do lado: o Paraná já está integrado à RNDS e iniciou a federalização, com a primeira oficina estadual realizada em Curitiba, em novembro de 2025. A pauta está viva, e está viva aqui.</p>
                <p className="faq-src">Fontes: Secretaria da Saúde de SP · Sesa-PR, Resolução nº 1603/2025</p>
              </div>
            </details>
            <details className="faq">
              <summary>O Paraná já provou que integrar funciona.</summary>
              <div className="faq-body">
                <p>Desde 2020, o Paraná unificou a regulação de urgência de todo o estado com o sistema Care: a vaga, o leito e o transporte já são coordenados digitalmente, em rede única. O que falta é o próximo passo, fazer o dado clínico do paciente viajar junto, e não só a informação da vaga.</p>
                <p className="faq-src">Fonte: Sesa-PR</p>
              </div>
            </details>
            <details className="faq">
              <summary>Por que uma lei, e não um aplicativo?</summary>
              <div className="faq-body">
                <p>Porque computador já existe: 92% dos estabelecimentos de saúde usam sistema eletrônico e 97,6% das UBS registram no e-SUS. O problema é que padrão sem obrigação vira recomendação, e recomendação não integra sistema de hospital. A lei dá prazo e consequência para o que a tecnologia já sabe fazer.</p>
                <p className="faq-src">Fontes: TIC Saúde 2024, CETIC · Ministério da Saúde</p>
              </div>
            </details>
          </div>
        </section>

        {/* 6B. DOIS NÍVEIS, UMA REGRA DE OURO */}
        <section className="niveis dossie">
          <div className="container">
            <p className="section-label">O dossiê · Como o dado circula</p>
            <h2 className="h2">Dois níveis, uma regra de ouro.</h2>

            <div className="nivel-grid" data-reveal-group>
              <article className="nivel-card nivel-card--urgencia">
                <p className="bloco-num">Nível 01 · Na urgência</p>
                <p>Aprovada a transferência, o registro integral do episódio é enviado automaticamente ao hospital de destino, antes de a ambulância chegar.</p>
              </article>
              <article className="nivel-card nivel-card--dia">
                <p className="bloco-num">Nível 02 · No dia a dia</p>
                <p>O histórico completo do paciente fica acessível ao profissional que assume o cuidado, mediante vínculo de atendimento e com registro de cada acesso: quem viu, o quê, quando.</p>
              </article>
            </div>

            <p className="nivel-fecho" data-reveal>Disponível não é o mesmo que espalhado. Nada fica trancado, nada viaja sem necessidade e sem rastro.</p>
          </div>
        </section>

        {/* 7. SEGURANÇA E LGPD */}
        <section className="lgpd dossie">
          <div className="container">
            <p className="section-label">O dossiê · Segurança</p>
            <h2 className="h2">Mais seguro que papel numa prancheta de{" "}ambulância.</h2>
            <p className="section-lead">São duas camadas. Na urgência, os dados do episódio viajam automaticamente, porque a continuidade do cuidado exige. Fora dela, o histórico só se abre com vínculo de atendimento e trilha de auditoria. Nas duas, isso protege muito mais que o padrão atual: papel na prancheta da ambulância e telefonema sem registro.</p>

            <div className="lgpd-grid">
              <ul className="lgpd-list">
                <li><strong>Minimização</strong>: só viaja o essencial para o seu atendimento.</li>
                <li><strong>Finalidade assistencial</strong>: o dado serve para tratar você, e nada além disso.</li>
                <li><strong>Controle de acesso</strong>: apenas quem está cuidando do seu caso.</li>
                <li><strong>Trilha de auditoria</strong>: todo acesso fica registrado, com nome e hora.</li>
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
              <div className="rosto-glow" aria-hidden="true"></div>
              <div className="rosto-illo" aria-hidden="true">
                <svg viewBox="0 0 440 470" role="img" aria-label="Ilustração de uma pessoa idosa sorrindo, com a mão de um cuidador em seu ombro.">
                  {/* pessoa idosa — traço quente */}
                  <g fill="none" stroke="var(--tinta)" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round">
                    {/* cabelo */}
                    <path d="M158,152 C162,104 190,82 220,82 C250,82 278,104 282,152" />
                    <path d="M178,118 q10,-12 22,-9 M212,102 q11,-7 23,-1 M246,116 q10,-8 20,-1" />
                    {/* rosto */}
                    <ellipse cx="220" cy="196" rx="62" ry="74" />
                    {/* orelhas */}
                    <path d="M158,192 q-12,3 -9,17 q2,9 11,7" />
                    <path d="M282,192 q12,3 9,17 q-2,9 -11,7" />
                    {/* óculos */}
                    <ellipse cx="196" cy="188" rx="16" ry="14" />
                    <ellipse cx="244" cy="188" rx="16" ry="14" />
                    <path d="M212,186 q8,-5 16,0 M180,186 l-19,-4 M260,186 l19,-4" />
                    {/* olhos sorridentes */}
                    <path d="M189,190 q7,7 15,0 M236,190 q7,7 15,0" />
                    {/* nariz */}
                    <path d="M220,196 v18 q0,5 -7,6" />
                    {/* sorriso */}
                    <path d="M190,226 q30,26 60,0" />
                    <path d="M201,236 q19,10 38,0" />
                    {/* linhas de expressão */}
                    <path d="M181,216 q-8,11 -2,21 M259,216 q8,11 2,21" />
                    {/* pescoço + ombros */}
                    <path d="M203,270 v14 M237,270 v14" />
                    <path d="M120,346 C132,296 174,272 220,272 C266,272 308,296 320,346" />
                    <path d="M198,276 l22,22 l22,-22" />
                  </g>
                  {/* a mão que cuida — no ombro, em clay */}
                  <g fill="none" stroke="var(--clay)" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M291,306 q7,-17 25,-13 q17,4 16,17" />
                    <path d="M296,308 q-3,16 -10,22 M308,305 q-1,18 -8,25 M320,305 q1,17 -4,25 M331,309 q3,13 0,19" />
                    <path d="M332,310 q10,-3 16,5" />
                  </g>
                </svg>
              </div>
              <p className="rosto-note">Ilustração provisória. Troque por uma foto real quando tiver.</p>
            </div>
            <blockquote className="rosto-quote">
              <p>Ninguém deveria recontar a própria história num momento em que mal consegue{" "}falar.</p>
            </blockquote>
          </div>
        </section>

        {/* 8B. COMEÇA NO PARANÁ, SERVE PARA O BRASIL */}
        <section className="prbr">
          <div className="container container--narrow prbr-inner" data-reveal>
            <p className="section-label section-label--salvia">O horizonte</p>
            <h2 className="h2">Começa no Paraná, serve para o Brasil.</h2>
            <p className="section-lead">O Paraná já lidera em regulação integrada e em atendimento pré-hospitalar. Ao ser o primeiro estado a transformar a interoperabilidade clínica em obrigação, com prazo e indicadores, ele cria um modelo pronto para ser adotado por outros estados e, no limite, pelo país inteiro.</p>
            <p className="section-lead">A infraestrutura nacional já existe; falta o exemplo de quem faz funcionar na ponta. <strong>O Paraná pode ser esse exemplo.</strong></p>

            <svg className="prbr-net" viewBox="0 0 800 190" aria-hidden="true">
              <g stroke="var(--linha)" strokeWidth="2">
                <line x1="160" y1="95" x2="340" y2="40" />
                <line x1="160" y1="95" x2="380" y2="120" />
                <line x1="160" y1="95" x2="330" y2="160" />
                <line x1="340" y1="40" x2="520" y2="60" />
                <line x1="380" y1="120" x2="540" y2="140" />
                <line x1="520" y1="60" x2="680" y2="100" />
                <line x1="540" y1="140" x2="680" y2="100" />
                <line x1="340" y1="40" x2="380" y2="120" />
              </g>
              <g fill="var(--papel)" stroke="var(--petroleo)" strokeWidth="2.5">
                <circle cx="340" cy="40" r="11" />
                <circle cx="380" cy="120" r="11" />
                <circle cx="330" cy="160" r="11" />
                <circle cx="520" cy="60" r="11" />
                <circle cx="540" cy="140" r="11" />
                <circle cx="680" cy="100" r="11" />
              </g>
              <circle cx="160" cy="95" r="26" fill="var(--clay)" />
              <text x="160" y="102" textAnchor="middle" className="prbr-pr">PR</text>
            </svg>
          </div>
        </section>

        {/* 9. ASSINE O MANIFESTO */}
        <section className="final" id="assinar">
          <div className="final-ecg" aria-hidden="true">
            <svg viewBox="0 0 1440 120" preserveAspectRatio="xMidYMid slice" className="ecg-svg ecg-svg--final">
              <path id="final-ecg-path" d="M0,70 H500 q12,-14 24,0 H660 l10,8 14,-56 16,74 12,-26 H900 q16,-18 32,0 H1440"
                fill="none" stroke="var(--salvia)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
              <circle id="final-ecg-dot" cx="0" cy="70" r="5" fill="var(--salvia)" />
            </svg>
          </div>
          <div className="container final-inner">
            <p className="section-label section-label--salvia">O manifesto</p>
            <h2 className="final-title">Assine o manifesto.</h2>
            <p className="section-lead final-lead">O caminho técnico está pronto. O que falta é virar obrigação, e obrigação nasce de pressão pública. Assine abaixo para somar seu nome a essa proposta. Quanto mais gente, mais difícil de ignorar.</p>

            <ManifestoForm />

            <div className="final-links">
              <a href="/prontuario-salva-vidas-pl.pdf" download className="final-link">Baixar o dossiê (PDF)</a>
              <Link href="/projeto-de-lei" className="final-link">Texto do Projeto de Lei</Link>
              <Link href="/o-projeto" className="final-link">A história por trás do projeto</Link>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />

      <Animations />
    </>
  );
}
