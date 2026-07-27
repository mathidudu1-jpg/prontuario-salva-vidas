"use client";

import { useEffect, useRef, useState } from "react";
import { formatarCPF, cpfValido, soDigitos } from "../lib/cpf";

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

export default function ManifestoForm() {
  const [form, setForm] = useState({ nome: "", cpf: "", email: "", cidade: "", tipo: "" });
  const [cpfInvalido, setCpfInvalido] = useState(false);
  const [status, setStatus] = useState("idle"); // idle | enviando | ok | erro
  const [total, setTotal] = useState(null);
  const [ativo, setAtivo] = useState(null); // null: verificando | true/false: coleta ativa?
  const agradecimentoRef = useRef(null);

  // ao carregar: descobre se a coleta está ativa e busca o total
  useEffect(() => {
    let vivo = true;
    fetch("/api/assinar")
      .then((r) => r.json())
      .then((d) => {
        if (!vivo) return;
        setAtivo(Boolean(d?.ativo));
        if (d?.total != null) setTotal(Number(d.total));
      })
      .catch(() => vivo && setAtivo(false));
    return () => { vivo = false; };
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
    if (ativo !== true || status === "enviando") return;

    if (!cpfValido(form.cpf)) {
      setCpfInvalido(true);
      return;
    }

    setStatus("enviando");
    try {
      const res = await fetch("/api/assinar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nome: form.nome.trim(),
          cpf: soDigitos(form.cpf),
          email: form.email.trim().toLowerCase(),
          cidade: form.cidade.trim(),
          tipo: form.tipo,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok) {
        setStatus("erro");
        return;
      }
      if (data.total != null) setTotal(Number(data.total));
      setStatus("ok");
    } catch {
      setStatus("erro");
    }
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
          disabled={ativo !== true || status === "enviando"}>
          {status === "enviando" ? "Assinando…" : "Assinar o manifesto"}
        </button>
      </form>
    </div>
  );
}
