import React, { useState } from "react";
import { useIncidentContext } from "../../context/useIncidentContext";
import { STORES_CATALOG } from "../../data/storesData";
import { FileCode, ArrowRight, Zap, Copy, Check, PhoneCall } from "lucide-react";

export const TemplatesView = () => {
  const { templates, setActiveTab, setActiveCardDraft, showToast } = useIncidentContext();

  // Estado do Módulo de Loja Isolada (Energia & Link)
  const [selectedVd, setSelectedVd] = useState("VD 003");
  const [storeQuery, setStoreQuery] = useState("");
  const [horaInicio, setHoraInicio] = useState("14:30");
  const [horaPrevisao, setHoraPrevisao] = useState("17:00");
  const [copiedKey, setCopiedKey] = useState(null);

  // Estado do Gerador de Chamado Técnico (Vivo/Claro) — reaproveita a mesma loja selecionada acima
  const [solicitanteNome, setSolicitanteNome] = useState("");
  const [chamadoMotivo, setChamadoMotivo] = useState("Sem sinal de link/internet na loja");

  const selectedStoreObj = STORES_CATALOG.find(s => s.vd === selectedVd) || STORES_CATALOG[0];

  // O catálogo tem 1.670 lojas — um <select> nativo com todas as opções de uma vez
  // é ruim de navegar e pesado de renderizar. Filtra por VD/nome/região e limita a
  // 100 resultados por vez, garantindo que qualquer uma das 1.670 lojas seja
  // alcançável (não só as primeiras da lista).
  const q = storeQuery.trim().toLowerCase();
  const filteredStoreOptions = (q
    ? STORES_CATALOG.filter(s =>
        (s.vd || "").toLowerCase().includes(q) ||
        (s.nomeLoja || "").toLowerCase().includes(q) ||
        (s.regiao || "").toLowerCase().includes(q)
      )
    : STORES_CATALOG
  ).slice(0, 100);

  const handleUseTemplate = (tpl) => {
    setActiveCardDraft({
      type: tpl.type,
      title: tpl.headerTitle,
      system: "SAP",
      process: "Processo Exemplo",
      components: "Módulos Core",
      impact: "Descrição do impacto conforme o modelo...",
      scope: ["CDSP", "CDMG"],
      status: "Status conforme modelo...",
      action: "Ação em andamento...",
      contact: "Suporte TI"
    });
    setActiveTab("card-generator");
  };

  // Geradores de Textos Formatados de Loja Isolada (Regra de Negócios do Documento)
  const getEnergiaAberturaText = () => {
    return `⚡ *ATENÇÃO - INFORMAÇÃO DE LOJA ISOLADA (ENERGIA)*
📍 *Loja:* ${selectedStoreObj.vd} - ${selectedStoreObj.nomeLoja} (${selectedStoreObj.regiao})
🕒 *Início:* ${horaInicio}h | *Previsão de Retorno:* ${horaPrevisao}h
⚠️ *Motivo:* Queda no fornecimento de energia elétrica na região.
👤 *GGL:* ${selectedStoreObj.ggl} (${selectedStoreObj.gglPhone})
📞 *GR:* ${selectedStoreObj.gr}

*Orientação:* Manter contingência manual e acompanhar restabelecimento com a concessionária local.`;
  };

  const getEnergiaFechamentoText = () => {
    return `🟢 *NORMALIZAÇÃO - ENERGIA ELÉTRICA RESTABELECIDA*
📍 *Loja:* ${selectedStoreObj.vd} - ${selectedStoreObj.nomeLoja} (${selectedStoreObj.regiao})
🕒 *Horário da Normalização:* ${horaPrevisao}h
✅ *Status:* Energia restabelecida. Caixas PDV e sistemas operacionais totalmente liberados.
👤 *GGL:* ${selectedStoreObj.ggl}`;
  };

  const getLinkAberturaText = () => {
    return `🌐 *ATENÇÃO - INFORMAÇÃO DE LOJA ISOLADA (LINK INTERNET)*
📍 *Loja:* ${selectedStoreObj.vd} - ${selectedStoreObj.nomeLoja} (${selectedStoreObj.regiao})
🕒 *Início:* ${horaInicio}h | *Previsão de Solução:* ${horaPrevisao}h
⚠️ *Motivo:* Queda nos circuitos principal e backup de comunicação (Telecom/Fibra).
👤 *GGL:* ${selectedStoreObj.ggl} (${selectedStoreObj.gglPhone})
📞 *GR:* ${selectedStoreObj.gr}

*Orientação:* Operar vendas no modo contingência TEF/offline até restabelecimento dos circuitos.`;
  };

  const getLinkFechamentoText = () => {
    return `🟢 *NORMALIZAÇÃO - LINK DE COMUNICAÇÃO RESTABELECIDO*
📍 *Loja:* ${selectedStoreObj.vd} - ${selectedStoreObj.nomeLoja} (${selectedStoreObj.regiao})
🕒 *Horário da Normalização:* ${horaPrevisao}h
✅ *Status:* Circuitos de internet operacionais. Conectividade com a matriz e TEF reestabelecida.
👤 *GGL:* ${selectedStoreObj.ggl}`;
  };

  // Geradores de Texto de Abertura de Chamado Técnico (Vivo & Claro) — seção 3.2 da
  // documentação de referência: localizar a loja e gerar o texto pronto para abertura
  // de chamado junto à operadora, já com contatos de GGL/GR preenchidos.
  const getChamadoVivoText = () => {
    return `📋 *ABERTURA DE CHAMADO — OPERADORA VIVO*
📍 *Loja:* ${selectedStoreObj.vd} - ${selectedStoreObj.nomeLoja} (${selectedStoreObj.regiao})
👤 *Solicitante:* ${solicitanteNome || "Central de Comando DPSP"}
⚠️ *Motivo:* ${chamadoMotivo}
👤 *GGL:* ${selectedStoreObj.ggl}${selectedStoreObj.gglPhone && selectedStoreObj.gglPhone !== "-" ? ` (${selectedStoreObj.gglPhone})` : ""}
📞 *GR:* ${selectedStoreObj.gr}${selectedStoreObj.grPhone && selectedStoreObj.grPhone !== "-" ? ` (${selectedStoreObj.grPhone})` : ""}

*Solicitamos abertura de chamado técnico emergencial para verificação e correção do circuito da loja acima.*`;
  };

  const getChamadoClaroText = () => {
    return `📋 *ABERTURA DE CHAMADO — OPERADORA CLARO*
📍 *Loja:* ${selectedStoreObj.vd} - ${selectedStoreObj.nomeLoja} (${selectedStoreObj.regiao})
👤 *Solicitante:* ${solicitanteNome || "Central de Comando DPSP"}
⚠️ *Motivo:* ${chamadoMotivo}
👤 *GGL:* ${selectedStoreObj.ggl}${selectedStoreObj.gglPhone && selectedStoreObj.gglPhone !== "-" ? ` (${selectedStoreObj.gglPhone})` : ""}
📞 *GR:* ${selectedStoreObj.gr}${selectedStoreObj.grPhone && selectedStoreObj.grPhone !== "-" ? ` (${selectedStoreObj.grPhone})` : ""}

*Solicitamos abertura de chamado técnico emergencial para verificação e correção do circuito da loja acima.*`;
  };

  const handleCopyText = async (text, keyName) => {
    let success = false;
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(text);
        success = true;
      }
    } catch {
      // Fallback para contextos onde a Clipboard API é bloqueada
    }

    if (!success) {
      try {
        const textArea = document.createElement("textarea");
        textArea.value = text;
        textArea.style.position = "fixed";
        textArea.style.left = "-9999px";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        success = document.execCommand("copy");
        document.body.removeChild(textArea);
      } catch (err) {
        console.error("Erro ao copiar texto:", err);
      }
    }

    if (success) {
      setCopiedKey(keyName);
      setTimeout(() => setCopiedKey(null), 2000);
    }
    if (showToast) showToast(success ? "Texto de informativo copiado para o WhatsApp!" : "Não foi possível copiar automaticamente.", success ? "success" : "error");
  };

  const isoladaBlocks = [
    { key: "e_aberta", title: "⚡ Abertura: Falta de Energia", text: getEnergiaAberturaText(), color: "#f59e0b" },
    { key: "e_fechada", title: "🟢 Normalização: Energia Restabelecida", text: getEnergiaFechamentoText(), color: "#10b981" },
    { key: "l_aberta", title: "🌐 Abertura: Queda de Link / Internet", text: getLinkAberturaText(), color: "#387fef" },
    { key: "l_fechada", title: "🟢 Normalização: Link Restabelecido", text: getLinkFechamentoText(), color: "#10b981" }
  ];

  const chamadoBlocks = [
    { key: "c_vivo", title: "📋 Chamado — Operadora Vivo", text: getChamadoVivoText(), color: "#8b3fd1" },
    { key: "c_claro", title: "📋 Chamado — Operadora Claro", text: getChamadoClaroText(), color: "#dc2626" }
  ];

  return (
    <div className="animate-fade-in" style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      <div>
        <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "1.3rem", fontWeight: 400, color: "var(--text-main)", display: "flex", alignItems: "center", gap: "10px" }}>
          <FileCode style={{ color: "#387fef" }} />
          BIBLIOTECA DE TEMPLATES DE COMUNICAÇÃO
        </h2>
        <p style={{ color: "var(--text-muted)", fontSize: "0.85rem" }}>
          Modelos padronizados por contexto operacional e gerador de informativos de loja isolada.
        </p>
      </div>

      {/* MÓDULO INFORMATIVOS DE LOJA ISOLADA (Documentação de Referência) */}
      <div className="panel-card" style={{ display: "flex", flexDirection: "column", gap: "16px", borderLeft: "4px solid var(--accent-red)" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid var(--border-color)", paddingBottom: "12px" }}>
          <h3 style={{ fontSize: "1.05rem", fontWeight: 700, color: "var(--text-main)", display: "flex", alignItems: "center", gap: "8px" }}>
            <Zap size={18} style={{ color: "#f59e0b" }} />
            GERADOR DE INFORMATIVOS DE LOJA ISOLADA (ENERGIA & INTERNET)
          </h3>
          <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--accent-red)", backgroundColor: "rgba(200,55,45,0.1)", padding: "2px 8px", borderRadius: "99px" }}>
            Padronização NOC
          </span>
        </div>

        {/* Form Controls */}
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: "14px" }}>
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label" style={{ fontSize: "0.78rem" }}>Selecionar Loja / VD:</label>
            <input
              type="text"
              className="form-input"
              style={{ marginBottom: "6px" }}
              placeholder="Filtrar entre as 1.670 lojas por VD, nome ou região..."
              value={storeQuery}
              onChange={(e) => setStoreQuery(e.target.value)}
            />
            <select className="form-select" value={selectedVd} onChange={(e) => setSelectedVd(e.target.value)}>
              {filteredStoreOptions.map(s => (
                <option key={s.vd} value={s.vd}>
                  {s.vd} - {s.nomeLoja} ({s.regiao})
                </option>
              ))}
            </select>
            {filteredStoreOptions.length === 100 && (
              <span style={{ fontSize: "0.68rem", color: "var(--text-dim)", marginTop: "4px", display: "block" }}>
                Mostrando 100 de {STORES_CATALOG.length} lojas — refine a busca para ver outras.
              </span>
            )}
          </div>
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label" style={{ fontSize: "0.78rem" }}>Horário Início:</label>
            <input type="text" className="form-input" value={horaInicio} onChange={(e) => setHoraInicio(e.target.value)} />
          </div>
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label" style={{ fontSize: "0.78rem" }}>Previsão Retorno:</label>
            <input type="text" className="form-input" value={horaPrevisao} onChange={(e) => setHoraPrevisao(e.target.value)} />
          </div>
        </div>

        {/* 4 Generated Code Blocks */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px", marginTop: "8px" }}>
          {isoladaBlocks.map(block => (
            <div key={block.key} style={{ backgroundColor: "var(--bg-dark-hover)", border: "1px solid var(--border-color)", borderRadius: "12px", padding: "14px", display: "flex", flexDirection: "column", justifyContent: "space-between", gap: "10px" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span style={{ fontSize: "0.82rem", fontWeight: 700, color: block.color }}>{block.title}</span>
                <button className="btn btn-secondary btn-sm" onClick={() => handleCopyText(block.text, block.key)} style={{ padding: "4px 8px", fontSize: "0.72rem" }}>
                  {copiedKey === block.key ? <Check size={12} style={{ color: "#10b981" }} /> : <Copy size={12} />}
                  <span>{copiedKey === block.key ? "Copiado!" : "Copiar"}</span>
                </button>
              </div>
              <pre style={{ margin: 0, whiteSpace: "pre-wrap", fontFamily: "'SF Mono', 'Consolas', monospace", fontSize: "0.78rem", color: "var(--text-muted)", backgroundColor: "rgba(0,0,0,0.25)", padding: "10px", borderRadius: "8px", border: "1px solid var(--border-color)" }}>
                {block.text}
              </pre>
            </div>
          ))}
        </div>
      </div>

      {/* MÓDULO GERADOR DE CHAMADO TÉCNICO (VIVO & CLARO) */}
      <div className="panel-card" style={{ display: "flex", flexDirection: "column", gap: "16px", borderLeft: "4px solid #8b3fd1" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid var(--border-color)", paddingBottom: "12px" }}>
          <h3 style={{ fontSize: "1.05rem", fontWeight: 700, color: "var(--text-main)", display: "flex", alignItems: "center", gap: "8px" }}>
            <PhoneCall size={18} style={{ color: "#8b3fd1" }} />
            GERADOR DE CHAMADO TÉCNICO (VIVO & CLARO)
          </h3>
          <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "#8b3fd1", backgroundColor: "rgba(139,63,209,0.1)", padding: "2px 8px", borderRadius: "99px" }}>
            Usa a loja selecionada acima
          </span>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label" style={{ fontSize: "0.78rem" }}>Seu Nome (Solicitante):</label>
            <input
              type="text"
              className="form-input"
              placeholder="Opcional — aparece no texto do chamado"
              value={solicitanteNome}
              onChange={(e) => setSolicitanteNome(e.target.value)}
            />
          </div>
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label" style={{ fontSize: "0.78rem" }}>Motivo do Chamado:</label>
            <input
              type="text"
              className="form-input"
              value={chamadoMotivo}
              onChange={(e) => setChamadoMotivo(e.target.value)}
            />
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
          {chamadoBlocks.map(block => (
            <div key={block.key} style={{ backgroundColor: "var(--bg-dark-hover)", border: "1px solid var(--border-color)", borderRadius: "12px", padding: "14px", display: "flex", flexDirection: "column", justifyContent: "space-between", gap: "10px" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span style={{ fontSize: "0.82rem", fontWeight: 700, color: block.color }}>{block.title}</span>
                <button className="btn btn-secondary btn-sm" onClick={() => handleCopyText(block.text, block.key)} style={{ padding: "4px 8px", fontSize: "0.72rem" }}>
                  {copiedKey === block.key ? <Check size={12} style={{ color: "#10b981" }} /> : <Copy size={12} />}
                  <span>{copiedKey === block.key ? "Copiado!" : "Copiar"}</span>
                </button>
              </div>
              <pre style={{ margin: 0, whiteSpace: "pre-wrap", fontFamily: "'SF Mono', 'Consolas', monospace", fontSize: "0.78rem", color: "var(--text-muted)", backgroundColor: "rgba(0,0,0,0.25)", padding: "10px", borderRadius: "8px", border: "1px solid var(--border-color)" }}>
                {block.text}
              </pre>
            </div>
          ))}
        </div>
      </div>

      {/* TEMPLATES PADRÃO */}
      <div>
        <h3 style={{ fontSize: "1.05rem", fontWeight: 700, color: "var(--text-main)", marginBottom: "14px" }}>
          Templates Gerais de Comunicados
        </h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "20px" }}>
          {templates.map(tpl => (
            <div key={tpl.id} className="panel-card" style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", gap: "14px", borderTop: `4px solid ${tpl.accentColor}` }}>
              <div>
                <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--text-main)", marginBottom: "6px" }}>{tpl.name}</h3>
                <p style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>{tpl.description}</p>
              </div>

              <button className="btn btn-secondary btn-sm" onClick={() => handleUseTemplate(tpl)}>
                <span>Usar Template</span>
                <ArrowRight size={14} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

