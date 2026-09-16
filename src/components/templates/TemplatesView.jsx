import React, { useState } from "react";
import { useIncidentContext } from "../../context/IncidentContext";
import { STORES_CATALOG } from "../../data/storesData";
import { FileCode, ArrowRight, Zap, Copy, Check } from "lucide-react";

export const TemplatesView = () => {
  const { templates, setActiveTab, setActiveCardDraft, showToast } = useIncidentContext();

  // Estado do Módulo de Loja Isolada (Energia & Link)
  const [selectedVd, setSelectedVd] = useState("VD 003");
  const [horaInicio, setHoraInicio] = useState("14:30");
  const [horaPrevisao, setHoraPrevisao] = useState("17:00");
  const [copiedKey, setCopiedKey] = useState(null);

  const selectedStoreObj = STORES_CATALOG.find(s => s.vd === selectedVd) || STORES_CATALOG[0];

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

  const handleCopyText = (text, keyName) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(keyName);
    if (showToast) showToast("Texto de informativo copiado para o WhatsApp!");
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const isoladaBlocks = [
    { key: "e_aberta", title: "⚡ Abertura: Falta de Energia", text: getEnergiaAberturaText(), color: "#f59e0b" },
    { key: "e_fechada", title: "🟢 Normalização: Energia Restabelecida", text: getEnergiaFechamentoText(), color: "#10b981" },
    { key: "l_aberta", title: "🌐 Abertura: Queda de Link / Internet", text: getLinkAberturaText(), color: "#387fef" },
    { key: "l_fechada", title: "🟢 Normalização: Link Restabelecido", text: getLinkFechamentoText(), color: "#10b981" }
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
            <select className="form-select" value={selectedVd} onChange={(e) => setSelectedVd(e.target.value)}>
              {STORES_CATALOG.slice(0, 50).map(s => (
                <option key={s.vd} value={s.vd}>
                  {s.vd} - {s.nomeLoja} ({s.regiao})
                </option>
              ))}
            </select>
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
              <pre style={{ margin: 0, whiteSpace: "pre-wrap", fontFamily: "var(--font-mono)", fontSize: "0.78rem", color: "var(--text-muted)", backgroundColor: "rgba(0,0,0,0.25)", padding: "10px", borderRadius: "8px", border: "1px solid var(--border-color)" }}>
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

