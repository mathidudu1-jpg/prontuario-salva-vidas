"use client";

import { useEffect, useRef, useState } from "react";
import { supabase, supabaseConfigurado } from "../lib/supabase";

const TIPOS = [
  { value: "cidadao", label: "Cidadão" },
  { value: "profissional", label: "Profissional de saúde" },
  { value: "gestor", label: "Gestor de saúde" },
  { value: "parlamentar", label: "Parlamentar ou assessor" },
  { value: "jornalista", label: "Jornalista" },
];

const formatarTotal = (n) => n.toLocaleString("pt-BR");

export default function ManifestoForm() {
  const [form, setForm] = useState({ nome: "", email: "", cidade: "", tipo: "" });
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

  async function enviar(e) {
    e.preventDefault();
    if (!supabaseConfigurado) return;
    setStatus("enviando");

    // a função assinar() retorna void mesmo para e-mail repetido (não revela
    // quem já assinou); por isso o retorno é sempre o mesmo agradecimento.
    const { error } = await supabase.rpc("assinar", {
      p_nome: form.nome.trim(),
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

      {!supabaseConfigurado && (
        <p className="manifesto-aviso" role="status">
          A coleta de assinaturas entra no ar assim que o back-end for configurado.
        </p>
      )}

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
            <span>Cidade</span>
            <input type="text" required maxLength={120} value={form.cidade} onChange={atualizar("cidade")}
              autoComplete="address-level2" placeholder="Sua cidade" />
          </label>
          <label className="mf-field">
            <span>Você é</span>
            <select required value={form.tipo} onChange={atualizar("tipo")}>
              <option value="" disabled>Selecione…</option>
              {TIPOS.map((t) => (
                <option key={t.value} value={t.value}>{t.label}</option>
              ))}
            </select>
          </label>
        </div>

        <p className="manifesto-consent">
          Ao assinar, você concorda em receber atualizações sobre a proposta. Seus dados não serão compartilhados com terceiros.
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
