"use client";

import { useEffect, useRef, useState } from "react";
import { supabase, supabaseConfigurado } from "../lib/supabase";

const TIPOS = [
  { value: "cidadao", label: "Cidadão ou cidadã" },
  { value: "profissional", label: "Profissional de saúde" },
  { value: "medico", label: "Médico ou médica" },
  { value: "enfermagem", label: "Enfermeiro(a) ou técnico(a) de enfermagem" },
  { value: "gestor", label: "Gestor de saúde" },
  { value: "servidor", label: "Servidor público" },
  { value: "parlamentar", label: "Parlamentar ou assessor" },
  { value: "advogado", label: "Advogado(a) ou profissional do Direito" },
  { value: "tecnologia", label: "Profissional de tecnologia" },
  { value: "pesquisador", label: "Pesquisador(a) ou docente" },
  { value: "estudante", label: "Estudante" },
  { value: "jornalista", label: "Jornalista" },
  { value: "empreendedor", label: "Empresário(a) ou empreendedor(a)" },
  { value: "outro", label: "Outro" },
];

const formatarTotal = (n) => n.toLocaleString("pt-BR");

const soDigitos = (v) => (v || "").replace(/\D/g, "");

// máscara progressiva 000.000.000-00
function formatarCPF(v) {
  const d = soDigitos(v).slice(0, 11);
  if (d.length > 9) return `${d.slice(0, 3)}.${d.slice(3, 6)}.${d.slice(6, 9)}-${d.slice(9)}`;
  if (d.length > 6) return `${d.slice(0, 3)}.${d.slice(3, 6)}.${d.slice(6)}`;
  if (d.length > 3) return `${d.slice(0, 3)}.${d.slice(3)}`;
  return d;
}

// validação real de CPF (11 dígitos + dígitos verificadores)
function cpfValido(v) {
  const d = soDigitos(v);
  if (d.length !== 11 || /^(\d)\1{10}$/.test(d)) return false;
  let soma = 0;
  for (let i = 0; i < 9; i++) soma += Number(d[i]) * (10 - i);
  let resto = (soma * 10) % 11;
  if (resto === 10) resto = 0;
  if (resto !== Number(d[9])) return false;
  soma = 0;
  for (let i = 0; i < 10; i++) soma += Number(d[i]) * (11 - i);
  resto = (soma * 10) % 11;
  if (resto === 10) resto = 0;
  return resto === Number(d[10]);
}

export default function ManifestoForm() {
  const [form, setForm] = useState({ nome: "", cpf: "", email: "", cidade: "", tipo: "" });
  const [cpfInvalido, setCpfInvalido] = useState(false);
  const [status, setStatus] = useState("idle"); // idle | enviando | ok | erro
  const [total, setTotal] = useState(null);
  const agradecimentoRef = useRef(null);

  async function buscarTotal() {
    if (!supabaseConfigurado) return;
    const { data, error } = await supabase.rpc("total_apoiadores");
    if (!error && data != null) setTotal(Number(data));
  }

  // contador ao vivo: busca o total ao carregar
  useEffect(() => {
    let ativo = true;
    if (supabaseConfigurado) {
      supabase.rpc("total_apoiadores").then(({ data, error }) => {
        if (ativo && !error && data != null) setTotal(Number(data));
      });
    }
    return () => { ativo = false; };
  }, []);

  // acessibilidade: ao concluir, leva o foco para a confirmação
  useEffect(() => {
    if (status === "ok" && agradecimentoRef.current) {
      agradecimentoRef.current.focus();
    }
  }, [status]);

  const atualizar = (campo) => (e) => setForm((f) => ({ ...f, [campo]: e.target.value }));
  const atualizarCPF = (e) => {
    setCpfInvalido(false);
    setForm((f) => ({ ...f, cpf: formatarCPF(e.target.value) }));
  };

  async function enviar(e) {
    e.preventDefault();
    if (!supabaseConfigurado) return;

    if (!cpfValido(form.cpf)) {
      setCpfInvalido(true);
      return;
    }

    setStatus("enviando");

    // a função assinar() retorna void mesmo para CPF/e-mail repetido (não revela
    // quem já assinou); por isso o retorno é sempre o mesmo agradecimento.
    const { error } = await supabase.rpc("assinar", {
      p_nome: form.nome.trim(),
      p_cpf: soDigitos(form.cpf),
      p_email: form.email.trim().toLowerCase(),
      p_cidade: form.cidade.trim(),
      p_tipo: form.tipo,
    });

    if (error) {
      setStatus("erro");
      return;
    }

    setStatus("ok");
    buscarTotal(); // recontagem real (evita contagem dupla em reassinatura)
  }

  const contador =
    total != null ? (
      <p className="manifesto-count">
        <strong>{formatarTotal(total)}</strong> {total === 1 ? "pessoa já apoia" : "pessoas já apoiam"}
      </p>
    ) : null;

  if (status === "ok") {
    return (
      <div className="manifesto-box manifesto-box--ok" role="status">
        {contador}
        <p className="manifesto-thanks" ref={agradecimentoRef} tabIndex={-1}>
          Assinatura registrada. Obrigado por colocar seu nome nisso.
        </p>
        <p className="manifesto-share">Se puder, compartilhe a página com mais uma pessoa.</p>
      </div>
    );
  }

  return (
    <div className="manifesto-box">
      {contador}

      <form className="manifesto-form" onSubmit={enviar}>
        <div className="mf-row">
          <label className="mf-field">
            <span>Nome</span>
            <input type="text" required maxLength={120} value={form.nome} onChange={atualizar("nome")}
              autoComplete="name" placeholder="Seu nome" />
          </label>
          <label className="mf-field">
            <span>E-mail</span>
            <input type="email" required maxLength={200} value={form.email} onChange={atualizar("email")}
              autoComplete="email" placeholder="voce@email.com" />
          </label>
        </div>
        <div className="mf-row">
          <label className="mf-field">
            <span>CPF</span>
            <input type="text" inputMode="numeric" required maxLength={14}
              value={form.cpf} onChange={atualizarCPF} autoComplete="off"
              placeholder="000.000.000-00"
              aria-invalid={cpfInvalido || undefined}
              aria-describedby={cpfInvalido ? "cpf-erro" : undefined} />
            {cpfInvalido && (
              <small className="mf-erro" id="cpf-erro">Confira o CPF: precisa dos 11 dígitos.</small>
            )}
          </label>
          <label className="mf-field">
            <span>Cidade</span>
            <input type="text" required maxLength={120} value={form.cidade} onChange={atualizar("cidade")}
              autoComplete="address-level2" placeholder="Sua cidade" />
          </label>
        </div>
        <label className="mf-field">
          <span>Você é</span>
          <select required value={form.tipo} onChange={atualizar("tipo")}>
            <option value="" disabled>Selecione…</option>
            {TIPOS.map((t) => (
              <option key={t.value} value={t.value}>{t.label}</option>
            ))}
          </select>
        </label>

        <p className="manifesto-consent">
          Ao assinar, você concorda em receber atualizações sobre a proposta. O CPF é usado apenas para validar a assinatura e seus dados não serão compartilhados com terceiros.
        </p>

        {status === "erro" && (
          <p className="manifesto-erro" role="alert">
            Não consegui registrar agora. Tente de novo em instantes.
          </p>
        )}

        <button type="submit" className="btn btn-primary"
          disabled={!supabaseConfigurado || status === "enviando"}>
          {status === "enviando" ? "Assinando…" : "Assinar o manifesto"}
        </button>
      </form>
    </div>
  );
}
